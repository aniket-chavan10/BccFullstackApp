import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchGalleryItemById } from "../services/api"; // Adjust the import path as needed

const GalleryDetail = () => {
  const { id } = useParams();
  const [galleryItem, setGalleryItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchGalleryItemById(id);
        setGalleryItem(response);
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

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching gallery item: {error.message}</p>;

  return (
    <div className="container mx-auto py-10 mt-20 mb-10 max-w-8xl">
      {galleryItem && (
        <div className="bg-white shadow-lg">
          {/* Small Sized Images */}
          <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="relative w-full h-0 pb-[56.25%]">
              <img
                src={`http://localhost:4000/${galleryItem.thumbnailImageUrl}`}
                alt={galleryItem.caption}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            {galleryItem.additionalImageUrls.map((url, index) => (
              <div key={index} className="relative w-full h-0 pb-[56.25%]">
                <img
                  src={`http://localhost:4000/${url}`}
                  alt={`Additional image ${index + 1}`}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
          {/* Photos Label */}
          <div className="mb-6">
            <h2 className="text-md font-bold text-gray-700">PHOTOS</h2>
          </div>
          {/* Main Image */}
          <div className="w-full mb-10">
            <div className="relative w-full h-0 pb-[56.25%]">
              <img
                src={`http://localhost:4000/${galleryItem.thumbnailImageUrl}`}
                alt={galleryItem.caption}
                className="absolute inset-0 w-full h-auto object-cover "
              />
            </div>
          </div>
          {/* Additional Large Images */}
          <div className="w-full grid grid-cols-1 gap-16">
            {galleryItem.additionalImageUrls.map((url, index) => (
              <div key={index} className="relative w-full h-full pb-[56.25%]">
                <img
                  src={`http://localhost:4000/${url}`}
                  alt={`Additional image ${index + 1}`}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryDetail;
