import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchNewsItemById } from "../services/api";

const NewsDetails = () => {
  const { id } = useParams();
  const [newsItem, setNewsItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchNewsItemById(id);
        setNewsItem(response);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    return `${day} ${month}`;
  };

  if (isLoading) return <p className="text-center py-4">Loading...</p>;
  if (error) return <p className="text-center py-4 text-red-600">Error fetching news item: {error.message}</p>;

  return (
    <div className="container mx-auto py-10 mt-20 px-4 md:px-0">
      {newsItem && (
        <div>
          {/* Title and Date */}
          <div className="mb-6">
            <h1 className="text-4xl font-bold mb-2 text-gray-900">{newsItem.title}</h1>
            <span className="text-sm text-gray-600">{formatDate(newsItem.createdAt)}</span>
          </div>
          {/* Main Image */}
          <div className="relative w-full mb-6">
            <div className="relative w-full h-0 pb-[56.25%]">
              <img
                src={`http://localhost:4000/${newsItem.imageUrl}`}
                alt={newsItem.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
          {/* Caption Text */}
          <div className="prose lg:prose-xl text-gray-800">
            <p>{newsItem.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsDetails;
