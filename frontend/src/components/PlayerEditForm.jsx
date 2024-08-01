import React, { useState, useEffect } from "react";

const PlayerEditForm = ({ player, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: "",
    jerseyNo: "",
    matches: "",
    runs: "",
    wickets: "",
    age: "",
    image: null,
    role: "",
    subrole: "",
    bestScore: "",
    instaUrl: "",
  });

  useEffect(() => {
    setFormData({
      name: player.name || "",
      jerseyNo: player.jerseyNo || "",
      matches: player.matches || "",
      runs: player.runs || "",
      wickets: player.wickets || "",
      age: player.age || "",
      image: player.image || null,
      role: player.role || "",
      subrole: player.subrole || "",
      bestScore: player.bestScore || "",
      instaUrl: player.instaUrl || "",
    });
  }, [player]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 overflow-auto flex items-center justify-center p-10 h-screen">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl mt-80">
        <div className="flex">
          <div className="w-2/3">
            <img
              src={`http://localhost:4000/${player.image}`}
              alt={player.name}
              className="w-full h-full object-cover rounded-l-lg"
            />
          </div>
          <div className="w-1/2 p-4">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Edit Player</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Player Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Player Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-500 focus:ring-opacity-50"
                />
              </div>

              {/* Jersey Number */}
              <div>
                <label
                  htmlFor="jerseyNo"
                  className="block text-sm font-medium text-gray-700"
                >
                  Jersey Number
                </label>
                <input
                  type="number"
                  id="jerseyNo"
                  name="jerseyNo"
                  value={formData.jerseyNo}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-500 focus:ring-opacity-50"
                />
              </div>

              {/* Matches */}
              <div>
                <label
                  htmlFor="matches"
                  className="block text-sm font-medium text-gray-700"
                >
                  Matches
                </label>
                <input
                  type="number"
                  id="matches"
                  name="matches"
                  value={formData.matches}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-500 focus:ring-opacity-50"
                />
              </div>

              {/* Runs */}
              <div>
                <label
                  htmlFor="runs"
                  className="block text-sm font-medium text-gray-700"
                >
                  Runs
                </label>
                <input
                  type="number"
                  id="runs"
                  name="runs"
                  value={formData.runs}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-500 focus:ring-opacity-50"
                />
              </div>

              {/* Wickets */}
              <div>
                <label
                  htmlFor="wickets"
                  className="block text-sm font-medium text-gray-700"
                >
                  Wickets
                </label>
                <input
                  type="number"
                  id="wickets"
                  name="wickets"
                  value={formData.wickets}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-500 focus:ring-opacity-50"
                />
              </div>

              {/* Age */}
              <div>
                <label
                  htmlFor="age"
                  className="block text-sm font-medium text-gray-700"
                >
                  Age
                </label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-500 focus:ring-opacity-50"
                />
              </div>

              {/* Image Upload */}
              <div>
                <label
                  htmlFor="image"
                  className="block text-sm font-medium text-gray-700"
                >
                  Image
                </label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  onChange={handleChange}
                  accept="image/*"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-500 focus:ring-opacity-50"
                />
              </div>

              {/* Role */}
              <div>
                <label
                  htmlFor="role"
                  className="block text-sm font-medium text-gray-700"
                >
                  Role
                </label>
                <input
                  type="text"
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-500 focus:ring-opacity-50"
                />
              </div>

              {/* Sub Role */}
              <div>
                <label
                  htmlFor="subrole"
                  className="block text-sm font-medium text-gray-700"
                >
                  Sub Role
                </label>
                <input
                  type="text"
                  id="subrole"
                  name="subrole"
                  value={formData.subrole}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-500 focus:ring-opacity-50"
                />
              </div>

              {/* Best Score */}
              <div>
                <label
                  htmlFor="bestScore"
                  className="block text-sm font-medium text-gray-700"
                >
                  Best Score
                </label>
                <input
                  type="number"
                  id="bestScore"
                  name="bestScore"
                  value={formData.bestScore}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-500 focus:ring-opacity-50"
                />
              </div>

              {/* Instagram URL */}
              <div>
                <label
                  htmlFor="instaUrl"
                  className="block text-sm font-medium text-gray-700"
                >
                  Instagram URL
                </label>
                <input
                  type="url"
                  id="instaUrl"
                  name="instaUrl"
                  value={formData.instaUrl}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-500 focus:ring-opacity-50"
                />
              </div>

              {/* Form Actions */}
              <div className="flex justify-end space-x-4 pt-4">
                <button
                  type="button"
                  onClick={onCancel}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-600"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerEditForm;
