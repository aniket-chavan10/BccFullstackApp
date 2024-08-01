import React, { useState, useEffect } from "react";
import PlayerEditForm from "../components/PlayerEditForm";
import { fetchPlayersData, updatePlayerData } from "../services/api";

const PlayersList = () => {
  const [playersData, setPlayersData] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchPlayersData();
        setPlayersData(data);
      } catch (error) {
        console.error("Failed to fetch players:", error);
      }
    };

    fetchData();
  }, []);

  const handleEditClick = (player) => {
    setSelectedPlayer(player);
  };

  const handleSave = async (updatedPlayer) => {
    try {
      console.log("Updating player with ID:", selectedPlayer._id); // Debug
      await updatePlayerData(selectedPlayer._id, updatedPlayer);
      setPlayersData((prevData) =>
        prevData.map((player) =>
          player._id === selectedPlayer._id
            ? { ...player, ...updatedPlayer }
            : player
        )
      );
      setSelectedPlayer(null);
    } catch (error) {
      console.error("Failed to update player:", error);
    }
  };

  const handleCancel = () => {
    setSelectedPlayer(null);
  };

  return (
    <div className="container mx-auto mt-12 p-8 bg-gradient-to-br from-orange-50 to-orange-200 rounded-lg shadow-md border border-orange-300">
      <h2 className="text-3xl font-bold mb-8 text-center text-orange-600">
        Edit Players
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {playersData.map((player) => (
          <div
            key={player._id}
            className="relative flex bg-white rounded-lg shadow-md w-72 h-60"
          >
            <button
              onClick={() => handleEditClick(player)}
              className="absolute top-2 right-2 bg-orange-600 text-white px-3 rounded hover:bg-orange-700 transition duration-300"
            >
              Edit
            </button>
            <div className="w-4/5">
              <img
                src={`https://bccfullstackapp-1.onrender.com/${player.image}`}
                alt={player.name}
                className="w-fit h-full object-cover rounded-l-lg"
              />
            </div>
            <div className="mt-5 py-5 w-2/3">
              <h3 className="text-lg font-bold mb-2 text-wrap leading-tight underline underline-offset-4">
                {player.name}
              </h3>
              <p className="text-sm mb-1 font-bold">Role: <span className="font-normal">{player.role}</span> </p>
              <p className="text-sm mb-1 font-bold">Matches: <span className="font-normal">{player.matches}</span> </p>
              <p className="text-sm mb-1 font-bold">Runs: <span className="font-normal">{player.runs}</span> </p>
              <p className="text-sm mb-1 font-bold">Wickets: <span className="font-normal">{player.wickets}</span> </p>
              <p className="text-sm mb-1 font-bold">Best Score: <span className="font-normal">{player.bestScore}</span> </p>
            </div>
          </div>
        ))}
      </div>
      {selectedPlayer && (
        <PlayerEditForm
          player={selectedPlayer}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
};

export default PlayersList;
