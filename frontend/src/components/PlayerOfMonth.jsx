import React, { useEffect, useState } from "react";
import { fetchPlayersData } from "../services/api"; // Adjust the import path as needed

function PlayerOfMonth() {
  const [bestBatsman, setBestBatsman] = useState(null);
  const [bestBowler, setBestBowler] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const currentMonth = new Date().toLocaleString("default", { month: "long" });

  useEffect(() => {
    async function getData() {
      try {
        const players = await fetchPlayersData(); // Fetch data from backend
        console.log("Players data:", players); // Log players data to check structure

        if (players.length === 0) {
          setError("No players data found");
          setLoading(false);
          return;
        }

        // Calculate best batsman
        const batsman = players.reduce((best, player) =>
          player.runs > (best.runs || 0) ? player : best
        );

        // Calculate best bowler
        const bowler = players.reduce((best, player) =>
          player.wickets > (best.wickets || 0) ? player : best
        );

        console.log("Best batsman:", batsman);
        console.log("Best bowler:", bowler);

        setBestBatsman(batsman);
        setBestBowler(bowler);
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

  return (
    <div className="container mx-auto py-10 px-4 md:px-0">
      <h2 className="text-2xl font-bold mb-4 text-center md:text-left">
        Player Of The Month:{" "}
        <span className="text-orange-500 italic">"{currentMonth}"</span>
      </h2>
      <div className="rounded-lg p-5">
        <h2 className="text-lg font-bold mb-4 text-center text-white">
          Players of the Month
        </h2>

        <div className="flex flex-col md:flex-row gap-5 justify-center items-center">
          {/* Best Batsman */}
          <div className="w-full md:w-1/2 bg-gradient-to-t from-slate-50 to-amber-300 rounded relative overflow-hidden">
            <div className="flex flex-col md:flex-row h-full items-baseline">
              <div className="w-full md:w-1/3 relative" style={{ aspectRatio: '3 / 4' }}>
                <img
                  src={`http://localhost:4000/${bestBatsman.image}`}
                  alt={bestBatsman.name}
                  className="object-contain w-full h-full absolute inset-0"
                />
              </div>
              <div className="flex flex-col mt-4 md:mt-auto p-4">
                <h1 className="text-orange-500 text-3xl md:text-7xl font-bold font-montserrat">
                  {bestBatsman.runs}{" "}
                  <span className="text-zinc-600 text-lg">Most Runs</span>{" "}
                </h1>
                <p className="text-2xl md:text-4xl text-zinc-800 font-montserrat font-bold">
                  {bestBatsman.name}
                </p>
                <div className="flex flex-wrap justify-center md:justify-start text-center py-2 gap-2 md:gap-4">
                  <p className="bg-orange-200 hover:bg-orange-300 flex flex-col px-3 py-1 rounded text-orange-500 font-black text-sm md:text-2xl">
                    {bestBatsman.matches}
                    <span className="text-zinc-600 text-xs font-light">
                      Matches
                    </span>
                  </p>
                  <p className="bg-orange-200 hover:bg-orange-300 flex flex-col px-3 py-1 rounded text-orange-500 font-black text-sm md:text-2xl">
                    {bestBatsman.runs}{" "}
                    <span className="text-zinc-600 text-xs font-light">
                      Runs
                    </span>
                  </p>
                  <p className="bg-orange-200 hover:bg-orange-300 flex flex-col px-3 py-1 rounded text-orange-500 font-black text-sm md:text-2xl">
                    {bestBatsman.bestScore}{" "}
                    <span className="text-zinc-600 text-xs font-light">
                      Best Score
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Best Bowler */}
          <div className="w-full md:w-1/2 bg-gradient-to-t from-slate-50 to-amber-300 rounded relative overflow-hidden">
            <div className="flex flex-col md:flex-row h-full items-baseline">
              <div className="w-full md:w-1/3 relative" style={{ aspectRatio: '3 / 4' }}>
                <img
                  src={`http://localhost:4000/${bestBowler.image}`}
                  alt={bestBowler.name}
                  className="object-contain w-full h-full absolute inset-0"
                />
              </div>
              <div className="flex flex-col mt-4 md:mt-auto p-4">
                <h1 className="text-orange-500 text-3xl md:text-7xl font-bold font-montserrat">
                  {bestBowler.wickets}{" "}
                  <span className="text-zinc-600 text-lg">Most Wickets</span>{" "}
                </h1>
                <p className="text-2xl md:text-4xl text-zinc-800 font-montserrat font-bold">
                  {bestBowler.name}
                </p>
                <div className="flex flex-wrap justify-center md:justify-start text-center py-2 gap-2 md:gap-4">
                  <p className="bg-orange-200 hover:bg-orange-300 flex flex-col px-3 py-1 rounded text-orange-500 font-black text-sm md:text-2xl">
                    {bestBowler.matches}
                    <span className="text-zinc-600 text-xs font-light">
                      Matches
                    </span>
                  </p>
                  <p className="bg-orange-200 hover:bg-orange-300 flex flex-col px-3 py-1 rounded text-orange-500 font-black text-sm md:text-2xl">
                    {bestBowler.wickets}{" "}
                    <span className="text-zinc-600 text-xs font-light">
                      Wickets
                    </span>
                  </p>
                  <p className="bg-orange-200 hover:bg-orange-300 flex flex-col px-3 py-1 rounded text-orange-500 font-black text-sm md:text-2xl">
                    {bestBowler.bestScore}{" "}
                    <span className="text-zinc-600 text-xs font-light">
                      Best Score
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlayerOfMonth;
