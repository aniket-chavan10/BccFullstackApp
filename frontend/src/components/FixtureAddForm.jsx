import React, { useState } from 'react';
import { addFixtureData } from '../services/api'; // Adjust path as per your project structure

const FixtureAddForm = () => {
  const [fixtureData, setFixtureData] = useState({
    date: '',
    matchNumber: '',
    matchStatus: 'upcoming', // Default match status
    team1: {
      name: '',
      score: '0/0', // Default score
      logo: null, // File object for logo
    },
    team2: {
      name: '',
      score: '0/0', // Default score
      logo: null, // File object for logo
    },
    matchResult: 'Match is yet to begin', // Default match result
    venue: '',
    matchTime: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);

    try {
      const addedFixture = await addFixtureData(fixtureData);
      console.log('Fixture added successfully:', addedFixture);
      setSuccessMessage('Fixture added successfully!');
      setErrorMessage('');
      setFixtureData({
        date: '',
        matchNumber: '',
        matchStatus: 'upcoming',
        team1: {
          name: '',
          score: '0/0',
          logo: null,
        },
        team2: {
          name: '',
          score: '0/0',
          logo: null,
        },
        matchResult: 'Match is yet to begin',
        venue: '',
        matchTime: '',
      });
    } catch (error) {
      console.error('Error adding fixture:', error);
      setErrorMessage('Failed to add fixture. Please try again.');
      setSuccessMessage('');
    } finally {
      setSubmitting(false);
    }
  };

  const handleInputChange = (event) => {
    const { name, value, files } = event.target;

    if (name === 'team1.logo' || name === 'team2.logo') {
      const [team, field] = name.split('.');
      setFixtureData({
        ...fixtureData,
        [team]: {
          ...fixtureData[team],
          [field]: files[0], // Assuming single file upload per field
        },
      });
    } else if (name.includes('team1.') || name.includes('team2.')) {
      const [team, field] = name.split('.');
      setFixtureData({
        ...fixtureData,
        [team]: {
          ...fixtureData[team],
          [field]: value,
        },
      });
    } else {
      setFixtureData({
        ...fixtureData,
        [name]: value,
      });
    }
  };

  return (
    <div className="container mx-auto mt-6 p-6 bg-gradient-to-br from-orange-50 to-orange-200 rounded-lg shadow-md border border-orange-300 max-w-xl">
      <h2 className="text-2xl font-semibold mb-6 text-center text-orange-700">
        Add New Fixture
      </h2>
      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
          <strong className="font-bold">Success!</strong>
          <span className="block sm:inline"> {successMessage}</span>
        </div>
      )}
      {errorMessage && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {errorMessage}</span>
        </div>
      )}
      <form onSubmit={handleFormSubmit} className="space-y-6">
        {/* Date */}
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-800">
            Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={fixtureData.date}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:outline-none focus:border-orange-500 focus:ring focus:ring-orange-200 transition duration-150"
          />
        </div>

        {/* Match Number */}
        <div>
          <label htmlFor="matchNumber" className="block text-sm font-medium text-gray-800">
            Match Number
          </label>
          <input
            type="text"
            id="matchNumber"
            name="matchNumber"
            value={fixtureData.matchNumber}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:outline-none focus:border-orange-500 focus:ring focus:ring-orange-200 transition duration-150"
          />
        </div>

        {/* Match Status */}
        <div>
          <label htmlFor="matchStatus" className="block text-sm font-medium text-gray-800">
            Match Status
          </label>
          <select
            id="matchStatus"
            name="matchStatus"
            value={fixtureData.matchStatus}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:outline-none focus:border-orange-500 focus:ring focus:ring-orange-200 transition duration-150"
          >
            <option value="upcoming">Upcoming</option>
            <option value="completed">Completed</option>
            <option value="ongoing">Ongoing</option>
          </select>
        </div>

        {/* Team 1 Name */}
        <div>
          <label htmlFor="team1.name" className="block text-sm font-medium text-gray-800">
            Team 1 Name
          </label>
          <input
            type="text"
            id="team1.name"
            name="team1.name"
            value={fixtureData.team1.name}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:outline-none focus:border-orange-500 focus:ring focus:ring-orange-200 transition duration-150"
          />
        </div>

        {/* Team 1 Score */}
        <div>
          <label htmlFor="team1.score" className="block text-sm font-medium text-gray-800">
            Team 1 Score
          </label>
          <input
            type="text"
            id="team1.score"
            name="team1.score"
            value={fixtureData.team1.score}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:outline-none focus:border-orange-500 focus:ring focus:ring-orange-200 transition duration-150"
          />
        </div>

        {/* Team 1 Logo */}
        <div>
          <label htmlFor="team1.logo" className="block text-sm font-medium text-gray-800">
            Team 1 Logo
          </label>
          <input
            type="file"
            id="team1.logo"
            name="team1.logo"
            onChange={handleInputChange}
            required
            accept="image/*"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:outline-none focus:border-orange-500 focus:ring focus:ring-orange-200 transition duration-150"
          />
        </div>

        {/* Team 2 Name */}
        <div>
          <label htmlFor="team2.name" className="block text-sm font-medium text-gray-800">
            Team 2 Name
          </label>
          <input
            type="text"
            id="team2.name"
            name="team2.name"
            value={fixtureData.team2.name}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:outline-none focus:border-orange-500 focus:ring focus:ring-orange-200 transition duration-150"
          />
        </div>

        {/* Team 2 Score */}
        <div>
          <label htmlFor="team2.score" className="block text-sm font-medium text-gray-800">
            Team 2 Score
          </label>
          <input
            type="text"
            id="team2.score"
            name="team2.score"
            value={fixtureData.team2.score}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:outline-none focus:border-orange-500 focus:ring focus:ring-orange-200 transition duration-150"
          />
        </div>

        {/* Team 2 Logo */}
        <div>
          <label htmlFor="team2.logo" className="block text-sm font-medium text-gray-800">
            Team 2 Logo
          </label>
          <input
            type="file"
            id="team2.logo"
            name="team2.logo"
            onChange={handleInputChange}
            required
            accept="image/*"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:outline-none focus:border-orange-500 focus:ring focus:ring-orange-200 transition duration-150"
          />
        </div>

        {/* Match Result */}
        <div>
          <label htmlFor="matchResult" className="block text-sm font-medium text-gray-800">
            Match Result
          </label>
          <input
            type="text"
            id="matchResult"
            name="matchResult"
            value={fixtureData.matchResult}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:outline-none focus:border-orange-500 focus:ring focus:ring-orange-200 transition duration-150"
          />
        </div>

        {/* Venue */}
        <div>
          <label htmlFor="venue" className="block text-sm font-medium text-gray-800">
            Venue
          </label>
          <input
            type="text"
            id="venue"
            name="venue"
            value={fixtureData.venue}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:outline-none focus:border-orange-500 focus:ring focus:ring-orange-200 transition duration-150"
          />
        </div>

        {/* Match Time */}
        <div>
          <label htmlFor="matchTime" className="block text-sm font-medium text-gray-800">
            Match Time
          </label>
          <input
            type="text"
            id="matchTime"
            name="matchTime"
            value={fixtureData.matchTime}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:outline-none focus:border-orange-500 focus:ring focus:ring-orange-200 transition duration-150"
          />
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-end">
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 bg-orange-600 border border-transparent rounded-md font-semibold text-sm text-white uppercase tracking-widest hover:bg-orange-700 focus:outline-none focus:border-orange-700 focus:ring focus:ring-orange-200 transition duration-150 disabled:opacity-50"
            disabled={submitting}
          >
            {submitting ? (
              <svg className="animate-spin h-5 w-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V2.5a.5.5 0 011 0V4a8 8 0 01-8 8z"></path>
              </svg>
            ) : (
              'Add Fixture'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FixtureAddForm;
