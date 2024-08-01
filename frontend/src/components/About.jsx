import React, { useEffect, useState } from 'react';
import { fetchLatestInfo } from "../services/api";

const ImageWithLoader = ({ src, alt }) => {
  const [loading, setLoading] = useState(true);

  return (
    <div className="relative w-full h-auto">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white">
          <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 border-gray-300 border-t-4 border-t-orange-600 rounded-full"></div>
        </div>
      )}
      <img
        src={src}
        alt={alt}
        onLoad={() => setLoading(false)}
        style={{ display: loading ? 'none' : 'block' }}
        className="w-full h-full object-cover"
      />
    </div>
  );
};

const About = () => {
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getInfo = async () => {
      try {
        const data = await fetchLatestInfo();
        setInfo(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    getInfo();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500">Error: {error.message}</div>;
  }

  return (
    <div className="container mx-auto p-6 mt-20 mb-10">
      <div className="mb-8">
        <div className="relative">
          <ImageWithLoader
            src={`https://bcc-82hu.onrender.com${info.teamImg}`} // Ensure correct URL
            alt="Bhairavnath Cricket Club"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-50 rounded-lg"></div>
        </div>
      </div>
      <div className="text-gray-800 space-y-8">
        <div>
          <h2 className="text-3xl font-bold mb-4">About {info.clubName}</h2>
          <p className="mb-4 text-lg">{info.description}</p>
          <p className="mb-4 text-lg italic">{info.tagline}</p>
          <div className="flex flex-col md:flex-row md:space-x-4 text-lg">
            <p>Email: <span className="font-semibold">{info.email}</span></p>
            <p>Contact Number: <span className="font-semibold">{info.contactNumber}</span></p>
          </div>
        </div>
        <div>
          <h2 className="text-3xl font-bold mb-4">About Jaoli Cricket Association</h2>
          <p className="mb-4 text-lg">
            The Jaoli Cricket Association provides a platform for teams like ours. 
            They organize matches in Mumbai and villages to provide opportunities for players and cricket enthusiasts 
            who are located in Mumbai for work purposes and those in villages.
          </p>
          <p className="mb-4 text-lg">
            The association plays a crucial role in the development of cricket in our region. 
            By hosting tournaments and training camps, they ensure that players have the resources and support needed to excel in the sport.
            Their efforts have led to the discovery of many talented cricketers who have gone on to represent higher leagues and teams.
          </p>
          <p className="text-lg">
            Additionally, the Jaoli Cricket Association fosters a sense of community among cricket lovers. 
            They bring together players, coaches, and fans, creating a vibrant and supportive cricketing environment.
            Their initiatives not only promote physical fitness but also encourage a love for the game among the youth.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
