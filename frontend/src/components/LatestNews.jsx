import React, { useState, useEffect } from "react";
import { fetchNewsData } from "../services/api";
import { Link } from "react-router-dom";

const LatestNews = () => {
  const [newsData, setNewsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleNewsCount, setVisibleNewsCount] = useState(7);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchNewsData();
        setNewsData(response);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    return `${day} ${month}`;
  };

  const handleLoadMore = () => {
    setVisibleNewsCount((prevCount) => prevCount + 3);
  };

  const ImageWithLoader = ({ src, alt }) => {
    const [loading, setLoading] = useState(true);

    return (
      <div className="relative w-full h-80">
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

  return (
    <div className="container mx-auto py-10 mt-20 px-4 md:px-0">
      <h2 className="text-2xl font-bold mb-4">Latest News</h2>
      {isLoading && <p>Loading news...</p>}
      {error && <p>Error fetching news: {error.message}</p>}
      {newsData.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Large news item */}
          <div className="md:col-span-2 shadow-md overflow-hidden">
            <ImageWithLoader
              src={`https://bccfullstackapp-1.onrender.com/${newsData[0].imageUrl}`}
              alt={newsData[0].title}
            />
            <div className="py-2 relative">
              <h3 className="text-lg font-bold mb-2">{newsData[0].title}</h3>
              <p className="text-gray-700 truncate overflow-hidden">{newsData[0].description}</p>
              <Link
                to={`/news/${newsData[0]._id}`}
                className="inline-block mt-2 text-sm font-bold text-black hover:text-orange-600 cursor-pointer"
              >
                Read More
              </Link>
              <span className="absolute top-0 right-0 p-1 text-xs font-bold bg-orange-600 text-white">
                {formatDate(newsData[0].createdAt)}
              </span>
            </div>
          </div>

          {/* Smaller news items */}
          {newsData.slice(1, visibleNewsCount).map((newsItem) => (
            <div
              key={newsItem._id}
              className="shadow-md overflow-hidden md:col-span-1 col-span-full flex flex-col"
            >
              <ImageWithLoader
                src={`https://bccfullstackapp-1.onrender.com/${newsItem.imageUrl}`}
                alt={newsItem.title}
              />
              <div className="py-2 pr-10 relative flex flex-col">
                <h3 className="text-sm font-bold mb-2">{newsItem.title}</h3>
                <p className="text-gray-700 truncate overflow-hidden text-xs">{newsItem.description}</p>
                <Link
                  to={`/news/${newsItem._id}`}
                  className="inline-block mt-2 text-sm font-bold text-black hover:text-orange-600 cursor-pointer"
                >
                  Read More
                </Link>
                <span className="absolute top-0 right-0 p-1 text-xs font-bold bg-orange-600 text-white">
                  {formatDate(newsItem.createdAt)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Load More Button */}
      {newsData.length > visibleNewsCount && (
        <button
          onClick={handleLoadMore}
          className="bg-zinc-950 text-orange-600 font-bold py-1 px-4 rounded mt-4 mx-auto block"
        >
          Load More
        </button>
      )}
    </div>
  );
};

export default LatestNews;
