import React, { useState, useEffect } from "react";
import { fetchFixtures } from "../services/api";
import { FaInstagram, FaYoutube } from "react-icons/fa";

const RecentFixture = () => {
  const [fixtures, setFixtures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const BASE_URL = "https://bccfullstackapp-1.onrender.com";

  useEffect(() => {
    const getFixtures = async () => {
      try {
        const data = await fetchFixtures();
        setFixtures(data.reverse());
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    getFixtures();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="bg-gray-950 text-orange-600 p-4 min-h-full flex flex-col">
      {fixtures.slice(0, 1).map((fixture) => {
        const date = new Date(fixture.date);
        const formattedDate = `${date.getDate()} ${date.toLocaleString(
          "default",
          { month: "long" }
        )}, ${date.getFullYear()}`;
        const formattedDay = date.toLocaleDateString("en-US", {
          weekday: "long",
        });

        return (
          <div key={fixture._id} className="flex flex-col items-center flex-grow">
            <div className="text-center mb-2 sm:mb-4">
              <h3 className="text-xs sm:text-sm uppercase">{formattedDate}</h3>
              <p className="text-xs text-gray-400">{formattedDay}</p>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-between mb-2 sm:mb-4 w-full">
              <div className="flex items-center justify-center gap-2 sm:gap-3 w-full sm:w-auto">
                <div className="flex items-center gap-1">
                  <img
                    className="w-10 h-auto sm:w-12 sm:h-12 object-contain"
                    src={`${BASE_URL}/${fixture.team1.logo}`}
                    alt={`${fixture.team1.name} logo`}
                  />
                  <p className="text-sm sm:text-xl bg-gradient-to-tr from-slate-800 p-1 sm:p-2 bg-slate-900 text-white">
                    {fixture.team1.score}
                  </p>
                </div>
                <div className="text-center p-1 sm:p-1">
                  <h3 className="text-xs sm:text-sm">VS</h3>
                </div>
                <div className="flex items-center gap-1">
                  <p className="text-sm sm:text-xl bg-gradient-to-tr from-slate-800 p-1 sm:p-2 bg-slate-900 text-white">
                    {fixture.team2.score}
                  </p>
                  <img
                    className="w-10 h-auto sm:w-12 sm:h-12 object-cover"
                    src={`${BASE_URL}/${fixture.team2.logo}`}
                    alt={`${fixture.team2.name} logo`}
                  />
                </div>
              </div>
            </div>
            <div className="text-center uppercase leading-tight font-semibold mb-4 sm:mb-8">
              <p className="text-xs sm:text-sm opacity-80">{fixture.matchResult}</p>
            </div>
            <div className="flex flex-col text-center my-4 sm:my-5">
              <h1 className="text-zinc-100 text-lg sm:text-2xl font-medium">STAY CONNECTED</h1>
              <h1 className="font-bold text-lg sm:text-2xl">WITH BCC KURALOSHI FAMILY</h1>
            </div>

            <div className="flex flex-col text-center mt-4 sm:mt-8">
              <h1 className="text-xs sm:text-sm text-white uppercase mb-2">Follow us on</h1>
              <div className="flex flex-row sm:flex-col justify-center items-center gap-2 sm:gap-4">
                <a
                  href="https://www.instagram.com/"
                  className="flex items-center text-white bg-gradient-to-r from-amber-500 to-pink-500 py-1 px-2 sm:py-1 sm:px-4 rounded"
                >
                  <FaInstagram className="mr-1 sm:mr-2 text-xl sm:text-2xl" />
                  <span className="text-xs sm:text-base">Instagram</span>
                </a>
                <a
                  href="https://www.youtube.com/@BCCKURULOSHI"
                  className="flex items-center text-white bg-red-600 py-1 px-2 sm:py-1 sm:px-4 rounded"
                >
                  <FaYoutube className="mr-1 sm:mr-2 text-xl sm:text-2xl" />
                  <span className="text-xs sm:text-base">YouTube</span>
                </a>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RecentFixture;
