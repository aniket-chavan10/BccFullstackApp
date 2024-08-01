import React, { useState } from 'react';
import { addCarouselData } from '../services/api'; // Adjust the path if necessary

const AddCarouselForm = () => {
  const [caption, setCaption] = useState('');
  const [image, setImage] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('caption', caption);
    if (image) formData.append('imageUrl', image);

    try {
      await addCarouselData(formData);
      setSuccessMessage('Carousel item added successfully!');
      // Clear form fields
      setCaption('');
      setImage(null);
    } catch (error) {
      console.error('Error adding carousel data:', error);
    }
  };

  return (
    <div className="container mx-auto mt-12 p-8 bg-gradient-to-br from-orange-50 to-orange-200 rounded-lg shadow-md border border-orange-300 max-w-lg">
      <h2 className="text-3xl font-bold mb-8 text-center text-orange-600">Add Carousel Item</h2>
      {successMessage && (
        <div className="mb-4 text-green-600 text-center">
          {successMessage}
        </div>
      )}
      <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-6">
        {/* Caption */}
        <div>
          <label htmlFor="caption" className="block text-sm font-medium text-gray-800">Caption</label>
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

        {/* Image Upload */}
        <div>
          <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">Image</label>
          <input
            type="file"
            id="imageUrl"
            onChange={handleFileChange}
            accept="image/*"
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-orange-600 focus:ring focus:ring-orange-600 focus:ring-opacity-50"
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full bg-orange-600 text-white py-2 px-4 rounded hover:bg-orange-700 transition duration-300"
          >
            Add Carousel Item
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCarouselForm;
