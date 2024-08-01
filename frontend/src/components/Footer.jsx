import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import Logo from "../assets/images/logo.png"; // Adjust the path to your logo image

function Footer() {
  return (
    <footer className="bg-zinc-900 text-white py-6 md:py-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
        <div className="flex flex-col items-center md:items-start border-b md:border-none border-zinc-600 pb-4 md:pb-0 px-4">
          <img src={Logo} alt="Logo" className="h-16 md:h-20 w-auto mb-4" />
          <p className="text-xs md:text-sm text-center md:text-left">
            Bhairavnath Cricket Club Kuraloshi. Dedicated to promoting cricket and fostering sportsmanship.
          </p>
        </div>
        <div className="flex flex-col border-b md:border-none border-zinc-600 pb-4 md:pb-0 px-4">
          <h5 className="text-lg font-bold mb-1">About Us</h5>
          <p className="text-xs md:text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur malesuada sem vel diam pretium, at pulvinar neque laoreet.
          </p>
        </div>
        <div className="flex flex-col border-b md:border-none border-zinc-600 pb-4 md:pb-0 px-4">
          <h5 className="text-lg font-bold mb-1">Useful Links</h5>
          <ul className="list-none space-y-1">
            <li>
              <a href="/privacy-policy" className="text-white hover:text-zinc-400 text-xs md:text-sm">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="/terms-of-service" className="text-white hover:text-zinc-400 text-xs md:text-sm">
                Terms of Service
              </a>
            </li>
            <li>
              <a href="/contact-us" className="text-white hover:text-zinc-400 text-xs md:text-sm">
                Contact Us
              </a>
            </li>
          </ul>
        </div>
        <div className="flex flex-col px-4">
          <h5 className="text-lg font-bold mb-1">Contact</h5>
          <ul className="list-none space-y-1">
            <li>
              <a href="mailto:kuruloshi.bcc.11@gmail.com" className="text-white hover:text-zinc-400 text-xs md:text-sm">
                kuruloshi.bcc.11@gmail.com
              </a>
            </li>
            <li>
              <a href="tel:+1234567890" className="text-white hover:text-zinc-400 text-xs md:text-sm">
                +91 89754 89506
              </a>
            </li>
          </ul>
          <h5 className="text-lg font-bold mt-4 mb-1">Follow Us On</h5>
          <ul className="list-none flex space-x-2">
            <li>
              <a href="https://www.facebook.com/" className="text-white text-xl hover:text-zinc-400">
                <FaFacebookF />
              </a>
            </li>
            <li>
              <a href="https://www.twitter.com/" className="text-white text-xl hover:text-zinc-400">
                <FaTwitter />
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/" className="text-white text-xl hover:text-zinc-400">
                <FaInstagram />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto mt-4 md:mt-6 border-t border-zinc-600 pt-4 px-4">
        <p className="text-center text-xs md:text-sm">
          &copy; {new Date().getFullYear()} Bhairavnath Cricket Club Kuraloshi | All Rights Reserved
        </p>
      </div>
    </footer>
  );
}

export default Footer;
