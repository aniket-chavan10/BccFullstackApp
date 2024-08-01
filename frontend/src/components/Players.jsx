import React, { useState, useEffect } from "react";
import { fetchPlayersData } from "../services/api";
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

function Players() {
  const [playersData, setPlayersData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const playersPerPage = isSmallScreen ? 1 : 4;

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchPlayersData();
        setPlayersData(data);
      } catch (error) {
        console.error("Error fetching player data:", error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextPage = () => {
    if (currentPage + playersPerPage < playersData.length) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div className="relative overflow-hidden w-full mx-auto py-10 container">
      <h2 className="text-2xl font-bold mb-4">Players</h2>
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{
          transform: `translateX(-${currentPage * (100 / playersPerPage)}%)`,
        }}
      >
        {playersData.map((player, index) => (
          <div
            key={index}
            className={`bg-zinc-50 ${isSmallScreen ? 'w-full' : 'w-1/4'} flex-shrink-0 px-2`}
            style={{ flex: isSmallScreen ? "0 0 100%" : "0 0 25%" }}
          >
            <div className="bg-gradient-to-b from-slate-50 to-slate-200 mb-5 flex flex-col items-center justify-center">
              <div className="relative h-72 w-full md:w-64 overflow-hidden flex justify-center items-center">
                <img
                  src={`https://bcc-82hu.onrender.com/${player.image}`}
                  alt={player.name}
                  className="object-contain max-h-full max-w-full"
                />
              </div>
              <hr className="w-full border-zinc-500 border-spacing-1" />
              <div className="text-center py-2">
                <h2 className="text-xl text-orange-600 font-bold uppercase leading-tight">
                  {player.name}
                </h2>
                <p className="text-zinc-800 uppercase font-extralight">
                  {player.role}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-3 items-center px-4 mb-4">
        <button
          className={`bg-gray-950 text-orange-600 p-1 rounded-full  ${
            currentPage === 0 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={prevPage}
          disabled={currentPage === 0}
        >
          <ChevronLeftIcon className="w-6 h-6" />
        </button>
        <button
          className={`bg-gray-950 text-orange-600 p-1 rounded-full ${
            currentPage + playersPerPage >= playersData.length
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
          onClick={nextPage}
          disabled={currentPage + playersPerPage >= playersData.length}
        >
          <ChevronRightIcon className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}

export default Players;
