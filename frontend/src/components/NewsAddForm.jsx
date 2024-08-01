import React, { useState } from 'react';
import { addNewsData } from '../services/api'; // Ensure this path is correct

const NewsAddForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the FormData object
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    if (image) formData.append('image', image);

    try {
      const result = await addNewsData(formData);
      console.log('News added:', result);
    } catch (error) {
      console.error('Error adding news data:', error.message);
    }
  };

  return (
    <div className="container mx-auto mt-12 p-8 bg-gradient-to-br from-orange-50 to-orange-200 rounded-lg shadow-md border border-orange-300 max-w-lg">
      <h2 className="text-3xl font-bold mb-8 text-center text-orange-600">Add News</h2>
      <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-6">
        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-200 transition duration-150 focus:outline-none"
          />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-orange-600 focus:ring focus:ring-orange-600 focus:ring-opacity-50"
          />
        </div>

        {/* Image Upload */}
        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image</label>
          <input
            type="file"
            id="image"
            onChange={handleFileChange}
            accept="image/*"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-orange-600 focus:ring focus:ring-orange-600 focus:ring-opacity-50"
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full bg-orange-600 text-white py-2 px-4 rounded hover:bg-orange-700 transition duration-300"
          >
            Add News
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewsAddForm;
