// src/components/Gallery.js

import React, { useState, useEffect } from "react";
import { fetchGalleryData } from "../services/api";
import { Link } from "react-router-dom";

const AllGallery = () => {
  const [galleryData, setGalleryData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleItemCount, setVisibleItemCount] = useState(8); // Adjust as per your design

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchGalleryData();
        // Ensure response is sorted by createdAt in descending order
        const sortedGallery = response.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setGalleryData(sortedGallery);
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
    setVisibleItemCount((prevCount) => prevCount + 8); // Increase by 8 items
  };

  return (
    <div className="container mx-auto py-10 mt-20 mb-10">
      <h2 className="text-2xl font-bold mb-4">Gallery</h2>
      {isLoading && <p>Loading gallery...</p>}
      {error && <p>Error fetching gallery: {error.message}</p>}
      {galleryData.length > 0 && (
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4">
          {galleryData.slice(0, visibleItemCount).map((item, index) => (
            <div
              key={index}
              className="break-inside-avoid shadow-md overflow-hidden mb-4"
            >
              <img
                src={`https://bccfullstackapp-1.onrender.com/${item.thumbnailImageUrl}`}
                alt={item.caption}
                className="w-full hover:scale-110 transition duration-1000 ease-in-out"
              />
              <div className="py-2 pr-10 relative">
                <h3 className="text-sm font-bold mb-2">{item.caption}</h3>
                <Link
                  to={`/gallery/${item._id}`}
                  className="inline-block mt-2 text-sm font-bold text-zinc-800 hover:text-orange-600 cursor-pointer"
                >
                  View More
                </Link>
                <span className="absolute top-0 right-0 p-1 text-xs font-bold bg-orange-600 text-white">
                  {formatDate(item.createdAt)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Load More Button */}
      {galleryData.length > visibleItemCount && (
        <button
          onClick={handleLoadMore}
          className="bg-zinc-950  text-orange-600 font-bold py-1 px-4 rounded mt-4 mx-auto block"
        >
          Load More
        </button>
      )}
    </div>
  );
};

export default AllGallery;
