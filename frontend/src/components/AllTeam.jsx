import React, { useEffect, useState } from "react";
import { fetchPlayersData } from "../services/api"; // Adjust the import path as needed
import playerBg from "../assets/images/team_player_bg.jpg";

function AllTeam() {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getData() {
      try {
        const data = await fetchPlayersData(); // Fetch data from backend
        console.log("Players data:", data); // Log players data to check structure

        if (data.length === 0) {
          setError("No players data found");
        } else {
          setPlayers(data);
        }

        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch player data:", error);
        setError("Failed to fetch player data");
        setLoading(false);
      }
    }

    getData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  // Group players by role
  const batsmen = players.filter((player) => player.role === "Batsman");
  const bowlers = players.filter((player) => player.role === "Bowler");
  const allRounders = players.filter((player) => player.role === "All-rounder");
 
  const Card = ({ player }) => (
    <div
      className="relative overflow-hidden rounded-lg shadow-lg group w-full max-w-xs mx-auto sm:mx-2 xs:mx-1 xs:py-4 sm:py-2 sm:w-64 xs:w-full xs:h-72 sm:h-80"
      style={{ backgroundImage: `url(${playerBg})` }}
    >
      <img
        src={`http://localhost:4000/${player.image}`}
        alt={player.name}
        className="w-full h-full object-contain" // Ensure the image covers the card
      />
      <div className="absolute bottom-0 left-0 w-full bg-zinc-950 bg-opacity-80 text-white px-2 py-1 rounded-t-lg transform translate-y-28 sm:translate-y-28 group-hover:translate-y-0 transition-transform duration-300 ease-in-out">
        <h3 className="text-2xl sm:text-2xl font-semibold text-orange-600">
          {player.name}
        </h3>
        <hr className="border-t border-zinc-50 opacity-40" />
        <p className="text-zinc-50 text-md sm:text-base inline items-center">
          {player.role}
          <span className="border-l border-white mx-3 h-4 opacity-40"></span>
          Kuraloshi
        </p>
        <hr className="border-1 border-white opacity-40" />
        <div className="flex justify-between">
          <div className="flex items-center pt-1">
            <div className="text-center flex flex-col bg-yellow-200 rounded bg-opacity-20 w-20 sm:w-16">
              <span className="block text-lg font-bold">{player.matches}</span>
              <span className="text-xs sm:text-sm">Matches</span>
            </div>
            <div className="border-l border-white mx-3 h-8 opacity-40"></div>
            <div className="text-center flex flex-col bg-yellow-200 rounded bg-opacity-20 w-20 sm:w-16">
              <span className="block text-lg font-bold">{player.runs}</span>
              <span className="text-xs sm:text-sm">Runs</span>
            </div>
            <div className="border-l border-white mx-3 h-8 opacity-40"></div>
            <div className="text-center flex flex-col bg-yellow-200 rounded bg-opacity-20 w-20 sm:w-16">
              <span className="block text-lg font-bold">
                {player.role === "Batsman" ? "NA" : player.wickets || "-"}
              </span>
              <span className="text-xs sm:text-sm">Wickets</span>
            </div>
          </div>
        </div>
        <a
          href={player.instaUrl} // Link to Instagram profile
          target="_blank" // Open in a new tab
          rel="noopener noreferrer" // Security feature for external links
          className="mt-4 w-full block bg-orange-600 text-white px-2 sm:px-4 py-2 rounded hover:bg-orange-700 transition duration-300 text-center cursor-pointer"
        >
          View Profile
        </a>
      </div>
    </div>
  );
  
  
  return (
    <div className="container mx-auto py-10 mt-16 px-2 sm:px-4">
      {/* Batsmen Section */}
      {batsmen.length > 0 && (
        <div className="mb-8">
          <div className="text-center relative my-6">
            <hr className="styled-hr absolute left-0 right-0 mx-auto top-3 border-1 border-orange-400 -z-10" />
            <h3 className="font-bold inline-block bg-orange-600 text-white px-3 rounded-2xl text-base sm:text-lg">
              BATSMAN
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {batsmen.map((player) => (
              <Card key={player._id} player={player} />
            ))}
          </div>
        </div>
      )}

      {/* All-Rounders Section */}
      {allRounders.length > 0 && (
        <div className="mb-8">
          <div className="text-center relative mb-6">
            <hr className="styled-hr absolute left-0 right-0 mx-auto top-3 border-1 border-orange-400 -z-10" />
            <h3 className="font-bold inline-block bg-orange-600 text-white px-3 rounded-2xl text-base sm:text-lg">
              ALL-ROUNDERS
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {allRounders.map((player) => (
              <Card key={player._id} player={player} />
            ))}
          </div>
        </div>
      )}

      {/* Bowlers Section */}
      {bowlers.length > 0 && (
        <div>
          <div className="text-center relative mb-6">
            <hr className="styled-hr absolute left-0 right-0 mx-auto top-3 border-1 border-orange-400 -z-10" />
            <h3 className="font-bold inline-block bg-orange-600 text-white px-3 rounded-2xl text-base sm:text-lg">
              BOWLERS
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {bowlers.map((player) => (
              <Card key={player._id} player={player} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default AllTeam;
