import React, { useEffect, useState } from "react";
import { fetchFixtures } from "../services/api"; // Make sure to import the fetchFixtures function from your API file

const Fixtures = () => {
  const [fixtures, setFixtures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Base URL for images stored in uploads folder
  const BASE_URL = "https://bccfullstackapp-1.onrender.com"; // Change this to your server's URL

  useEffect(() => {
    const getFixtures = async () => {
      try {
        const data = await fetchFixtures();
        // Reverse the array to show the most recent fixture first
        setFixtures(data.reverse());
        setLoading(false);
        console.log("Fixtures we got ", data);
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
    <div className="mt-24 mb-10 px-4">
      <ul>
        {fixtures.map((fixture) => {
          const date = new Date(fixture.date);
          const formattedDate = `${date.getDate()} ${date.toLocaleString(
            "default",
            { month: "long" }
          )}, ${date.getFullYear()}`;
          const formattedDay = date.toLocaleDateString("en-US", {
            weekday: "long",
          });

          return (
            <li key={fixture._id} className="mb-4">
              <div className="w-full h-10 bg-orange-500 flex items-center px-4 py-1">
                <span className="text-white font-bold">
                  {formattedDate} |{" "}
                  <span className="font-thin">{formattedDay}</span>
                </span>
              </div>
              <div className="shadow-md p-3">
                <div className="flex flex-col md:flex-row mb-4 md:items-center md:space-x-4">
                  <div className="flex flex-col items-center mb-4 md:mb-0 flex-wrap">
                    <h1 className="font-black text-zinc-900 text-xl md:text-2xl">
                      Match {fixture.matchNumber}
                    </h1>
                    <h3 className="font-thin text-center md:text-lg">{fixture.matchStatus}</h3>
                  </div>
                  <div className="flex items-center justify-evenly w-full md:w-auto md:flex-grow">
                    <div className="flex flex-col items-center mx-1 md:mx-4">
                      <img
                        src={`${BASE_URL}/${fixture.team1.logo}`}
                        alt={`${fixture.team1.name} logo`}
                        className="max-h-10 md:max-h-16"
                      />
                      <h4 className="font-black text-zinc-900 uppercase text-xs md:text-sm mt-1 leading-tight text-center">
                        {fixture.team1.name}
                      </h4>
                    </div>
                    <div className="flex items-center mx-1 md:mx-4">
                      <h4 className="font-black text-zinc-900 text-md md:text-xl ml-1 md:ml-2">
                        {fixture.team1.score}
                      </h4>
                    </div>
                    <h1 className="bg-orange-600 text-white h-fit py-1 px-2 mx-1 md:mx-4 text-xs md:text-lg">
                      VS
                    </h1>
                    <div className="flex items-center mx-1 md:mx-4">
                      <h4 className="font-black text-zinc-900 text-md md:text-xl mr-1 md:mr-2">
                        {fixture.team2.score}
                      </h4>
                    </div>
                    <div className="flex flex-col items-center mx-1 md:mx-4">
                      <img
                        src={`${BASE_URL}/${fixture.team2.logo}`}
                        alt={`${fixture.team2.name} logo`}
                        className="max-h-10 md:max-h-16"
                      />
                      <h4 className="font-black text-zinc-900 uppercase text-xs md:text-sm mt-1 leading-tight text-center">
                        {fixture.team2.name}
                      </h4>
                    </div>
                  </div>
                </div>
                <div className="text-center md:ml-44 md:font-bold my-4 md:my-0 md:order-1">
                  <h4>{fixture.matchResult}</h4>
                </div>
                <div className="flex flex-col items-center md:flex-row justify-between text-center mt-4">
                  <h3 className="text-zinc-900 font-bold text-md">
                    {fixture.matchTime}(IST)
                  </h3>
                  <h3 className="text-md">{fixture.venue}</h3>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Fixtures;
