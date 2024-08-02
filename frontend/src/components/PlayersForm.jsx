import React, { useState } from "react";
import { addPlayerData } from "../services/api";

const PlayersForm = () => {
  const initialFormData = {
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
  };

  const [formData, setFormData] = useState(initialFormData);
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const roles = ["Batsman", "Bowler", "All-rounder"]; // Define your roles here

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      const file = files[0];
      setFormData({ ...formData, image: file });
      setImagePreview(URL.createObjectURL(file));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    for (const key in formData) {
      if (key === "image") {
        data.append("image", formData.image);
      } else {
        data.append(key, formData[key]);
      }
    }

    try {
      const response = await addPlayerData(data);
      console.log("Player added successfully:", response);
      setFormData(initialFormData);
      setImagePreview(null);
      setSuccess("Player added successfully!");
      setError("");
    } catch (error) {
      console.error("Failed to add player:", error);
      setError("Failed to add player. Please try again.");
      setSuccess("");
    }
  };

  return (
    <div className="container mx-auto mt-12 p-8 bg-gradient-to-br from-orange-50 to-orange-200 rounded-lg shadow-md border border-orange-300 max-w-lg">
      <h2 className="text-2xl font-semibold mb-6 text-center text-orange-700">
        Add New Player
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Player Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-800">
            Player Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-200 transition duration-150 focus:outline-none"
          />
        </div>

        {/* Jersey Number */}
        <div>
          <label htmlFor="jerseyNo" className="block text-sm font-medium text-gray-800">
            Jersey Number
          </label>
          <input
            type="number"
            id="jerseyNo"
            name="jerseyNo"
            value={formData.jerseyNo}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-200 transition duration-150 focus:outline-none appearance-none"
            style={{ WebkitAppearance: "none", MozAppearance: "textfield" }}
          />
        </div>

        {/* Matches */}
        <div>
          <label htmlFor="matches" className="block text-sm font-medium text-gray-800">
            Matches
          </label>
          <input
            type="number"
            id="matches"
            name="matches"
            value={formData.matches}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-200 transition duration-150 focus:outline-none appearance-none"
            style={{ WebkitAppearance: "none", MozAppearance: "textfield" }}
          />
        </div>

        {/* Runs */}
        <div>
          <label htmlFor="runs" className="block text-sm font-medium text-gray-800">
            Runs
          </label>
          <input
            type="number"
            id="runs"
            name="runs"
            value={formData.runs}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-200 transition duration-150 focus:outline-none appearance-none"
            style={{ WebkitAppearance: "none", MozAppearance: "textfield" }}
          />
        </div>

        {/* Wickets */}
        <div>
          <label htmlFor="wickets" className="block text-sm font-medium text-gray-800">
            Wickets
          </label>
          <input
            type="number"
            id="wickets"
            name="wickets"
            value={formData.wickets}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-200 transition duration-150 focus:outline-none appearance-none"
            style={{ WebkitAppearance: "none", MozAppearance: "textfield" }}
          />
        </div>

        {/* Age */}
        <div>
          <label htmlFor="age" className="block text-sm font-medium text-gray-800">
            Age
          </label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-200 transition duration-150 focus:outline-none appearance-none"
            style={{ WebkitAppearance: "none", MozAppearance: "textfield" }}
          />
        </div>

        {/* Image Upload */}
        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-800">
            Image
          </label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleChange}
            required
            accept="image/*"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-200 transition duration-150 focus:outline-none"
          />
          {imagePreview && (
            <div className="mt-4">
              <img
                src={imagePreview}
                alt="Image preview"
                className="w-full h-48 object-cover rounded-md border border-gray-300"
              />
            </div>
          )}
        </div>

        {/* Role */}
        <div>
          <label htmlFor="role" className="block text-sm font-medium text-gray-800">
            Role
          </label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-200 transition duration-150 focus:outline-none"
          >
            <option value="" disabled>Select a role</option>
            {roles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>

        {/* Subrole */}
        <div>
          <label htmlFor="subrole" className="block text-sm font-medium text-gray-800">
            Subrole
          </label>
          <input
            type="text"
            id="subrole"
            name="subrole"
            value={formData.subrole}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-200 transition duration-150 focus:outline-none"
          />
        </div>

        {/* Best Score */}
        <div>
          <label htmlFor="bestScore" className="block text-sm font-medium text-gray-800">
            Best Score
          </label>
          <input
            type="number"
            id="bestScore"
            name="bestScore"
            value={formData.bestScore}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-200 transition duration-150 focus:outline-none appearance-none"
            style={{ WebkitAppearance: "none", MozAppearance: "textfield" }}
          />
        </div>

        {/* Instagram URL */}
        <div>
          <label htmlFor="instaUrl" className="block text-sm font-medium text-gray-800">
            Instagram URL
          </label>
          <input
            type="text"
            id="instaUrl"
            name="instaUrl"
            value={formData.instaUrl}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-200 transition duration-150 focus:outline-none"
          />
        </div>

        {/* Error Message */}
        {error && (
          <div className="text-red-600 text-sm mt-2">
            {error}
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="text-green-600 text-sm mt-2">
            {success}
          </div>
        )}

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full bg-orange-600 text-white py-3 px-4 rounded-md shadow-sm hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-150"
          >
            Add Player
          </button>
        </div>
      </form>
    </div>
  );
};

export default PlayersForm;
