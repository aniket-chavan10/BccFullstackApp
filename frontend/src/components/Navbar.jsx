import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaBars, FaFacebookF, FaInstagram, FaYoutube, FaSearch, FaShoppingCart, FaWhatsapp } from "react-icons/fa";
import { fetchNewsData } from "../services/api";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [newsTitles, setNewsTitles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const newsData = await fetchNewsData();
        console.log("Fetched News Data:", newsData);
        if (Array.isArray(newsData)) {
          const titles = newsData.map(news => ({
            id: news._id,
            title: news.title
          }));
          setNewsTitles(titles);
        } else {
          console.error("Unexpected data format:", newsData);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []);

  const handleMenuClick = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 w-full z-10 bg-gradient-to-r from-orange-700 to-orange-600 text-white">
      <div className="flex items-center">
        {/* Logo */}
        <div className="flex-shrink-0 w-28 h-full flex items-center md:border-r px-3">
          {/* Placeholder for logo */}
          <div className="h-full w-20 bg-gray-900"></div>
        </div>

        {/* Main Content */}
        <div className="flex-grow flex flex-col">
          {/* Top Bar */}
          <div className="hidden md:flex bg-gradient-to-r from-orange-700 to-orange-600 text-white py-2 text-sm justify-between items-center relative px-5">
            <div className="ticker-container overflow-hidden whitespace-nowrap relative w-1/3 h-6 border-l border-zinc-300 border-opacity-60">
              <div className="ticker-text absolute whitespace-nowrap will-change-transform animate-marquee text-white z-50">
                {newsTitles.length > 0 ? (
                  <NavLink
                    key={newsTitles[0].id}
                    to={`/news/${newsTitles[0].id}`}
                    className="inline-block mr-4"
                    onClick={closeMenu}
                  >
                    {newsTitles[0].title}
                  </NavLink>
                ) : (
                  "Loading latest news..."
                )}
              </div>
            </div>
            <div className="social-icons flex space-x-4">
              {/* Social links can be added here if needed */}
              <button className="login-btn font-semibold" onClick={handleLoginClick}>Login</button>
            </div>
            {/* Horizontal Line */}
            <div className="absolute bottom-0 left-0 right-0 border-t border-white"></div>
          </div>

          {/* Main Navbar */}
          <div className="bg-gradient-to-r from-orange-700 to-orange-600 flex justify-between items-center py-2 px-5">
            <div className="hidden md:flex items-center space-x-6 text-zinc-200">
              <NavLink to="/" className="font-montserrat font-semibold" onClick={closeMenu}>Home</NavLink>
              <NavLink to="/team" className="font-montserrat font-semibold" onClick={closeMenu}>Team</NavLink>
              <NavLink to="/schedule" className="font-montserrat font-semibold" onClick={closeMenu}>Schedule</NavLink>
              <NavLink to="/gallery" className="font-montserrat font-bold" onClick={closeMenu}>Gallery</NavLink>
              <NavLink to="/about" className="font-montserrat font-semibold" onClick={closeMenu}>About</NavLink>
              <NavLink to="/contact-us" className="font-montserrat font-semibold" onClick={closeMenu}>Contact</NavLink>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <FaSearch className="cursor-pointer" />
              <FaShoppingCart className="cursor-pointer" />
              <FaWhatsapp className="cursor-pointer" />
            </div>

            <div className="md:hidden flex items-center ml-auto">
              <button onClick={handleMenuClick} className="text-3xl focus:outline-none">
                <FaBars />
              </button>
            </div>
            {/* Vertical Line */}
            <div className="absolute top-0 bottom-0 left-0 border-l-2 border-white"></div>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden flex flex-col items-center mt-2 space-y-2">
          <NavLink to="/" className="font-montserrat font-semibold" onClick={closeMenu}>Home</NavLink>
          <NavLink to="/team" className="font-montserrat font-semibold" onClick={closeMenu}>Team</NavLink>
          <NavLink to="/schedule" className="font-montserrat font-semibold" onClick={closeMenu}>Schedule</NavLink>
          <NavLink to="/gallery" className="font-montserrat font-bold" onClick={closeMenu}>Gallery</NavLink>
          <NavLink to="/about" className="font-montserrat font-semibold" onClick={closeMenu}>About</NavLink>
          <NavLink to="/contact-us" className="font-montserrat font-semibold" onClick={closeMenu}>Contact</NavLink>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
