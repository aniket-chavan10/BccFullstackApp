import React, { useState } from 'react';
import { addGalleryData } from '../services/api'; // Ensure this path is correct
import { FaPlus } from 'react-icons/fa'; // Import the plus icon from react-icons

const AddGalleryForm = () => {
  const [caption, setCaption] = useState('');
  const [thumbnailImage, setThumbnailImage] = useState(null);
  const [images, setImages] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleThumbnailChange = (e) => {
    setThumbnailImage(e.target.files[0]);
  };

  const handleImagesChange = (index, e) => {
    const newImages = [...images];
    newImages[index] = e.target.files[0];
    setImages(newImages);
  };

  const addImageInput = () => {
    setImages([...images, null]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the FormData object
    const formData = new FormData();
    formData.append('caption', caption);
    if (thumbnailImage) formData.append('thumbnailImageUrl', thumbnailImage);
    images.forEach((image, index) => {
      if (image) formData.append('imageUrls', image);
    });

    try {
      await addGalleryData(formData);
      setSuccessMessage('Gallery item added successfully!');
      setErrorMessage('');
      // Clear form fields and reset states
      setCaption('');
      setThumbnailImage(null);
      setImages([]);
    } catch (error) {
      setSuccessMessage('');
      setErrorMessage('Failed to add gallery item. Please try again.');
    }
  };

  return (
    <div className="container mx-auto mt-12 p-8 bg-gradient-to-br from-orange-50 to-orange-200 rounded-lg shadow-md border border-orange-300 max-w-lg">
      <h2 className="text-3xl font-bold mb-8 text-center text-orange-600">Add Gallery Item</h2>
      <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-6">
        {/* Caption */}
        <div>
          <label htmlFor="caption" className="block text-sm font-medium text-gray-700">Caption</label>
          <input
            type="text"
            id="caption"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Caption"
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-200 transition duration-150 focus:outline-none"
          />
        </div>

        {/* Thumbnail Image Upload */}
        <div>
          <label htmlFor="thumbnailImageUrl" className="block text-sm font-medium text-gray-700">Thumbnail Image</label>
          <input
            type="file"
            id="thumbnailImageUrl"
            onChange={handleThumbnailChange}
            accept="image/*"
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-orange-600 focus:ring focus:ring-orange-600 focus:ring-opacity-50"
          />
        </div>

        {/* Additional Images Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Additional Images</label>
          {images.map((_, index) => (
            <div key={index} className="mt-2">
              <label htmlFor={`imageUrl-${index}`} className="block text-sm font-medium text-gray-700">
                Image {index + 1}
              </label>
              <input
                type="file"
                id={`imageUrl-${index}`}
                onChange={(e) => handleImagesChange(index, e)}
                accept="image/*"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-orange-600 focus:ring focus:ring-orange-600 focus:ring-opacity-50"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={addImageInput}
            className="mt-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-600"
          >
            <FaPlus className="mr-2" />
            Add More Images
          </button>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
            <strong className="font-bold">Success!</strong>
            <span className="block sm:inline"> {successMessage}</span>
          </div>
        )}

        {/* Error Message */}
        {errorMessage && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline"> {errorMessage}</span>
          </div>
        )}

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full bg-orange-600 text-white py-2 px-4 rounded hover:bg-orange-700 transition duration-300"
          >
            Add Gallery Item
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddGalleryForm;
