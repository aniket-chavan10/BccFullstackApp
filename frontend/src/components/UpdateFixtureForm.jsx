import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchFixtureById, updateFixture } from '../services/api';

const UpdateFixtureForm = () => {
  const { id } = useParams();
  const [fixtureData, setFixtureData] = useState({
    matchStatus: '',
    matchResult: '',
    team1: { name: '', score: '' },
    team2: { name: '', score: '' },
    date: '',
    venue: '',
    matchTime: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const getFixture = async () => {
      try {
        const data = await fetchFixtureById(id);
        setFixtureData({
          matchStatus: data.matchStatus || '',
          matchResult: data.matchResult || '',
          team1: { name: data.team1.name || '', score: data.team1.score || '' },
          team2: { name: data.team2.name || '', score: data.team2.score || '' },
          date: data.date || '',
          venue: data.venue || '',
          matchTime: data.matchTime || '',
        });
      } catch (error) {
        console.error('Error fetching fixture data:', error);
        setErrorMessage('Failed to load fixture data. Please try again.');
      }
    };

    getFixture();
  }, [id]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);

    try {
      const updatedFixture = await updateFixture(id, fixtureData);
      console.log('Fixture updated successfully:', updatedFixture);
      setSuccessMessage('Fixture updated successfully!');
      setErrorMessage('');
    } catch (error) {
      console.error('Error updating fixture:', error);
      setErrorMessage(`Failed to update fixture. ${error.message}`);
      setSuccessMessage('');
    } finally {
      setSubmitting(false);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name.includes('team1.') || name.includes('team2.')) {
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
    <div className="container mx-auto mt-12 p-8 bg-gradient-to-br from-orange-50 to-orange-200 rounded-lg shadow-md border border-orange-300 max-w-lg">
      <h2 className="text-3xl font-bold mb-8 text-center text-orange-600">Update Fixture</h2>
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
      <form onSubmit={handleFormSubmit} className="max-w-xl mx-auto space-y-6">
        {/* Match Status */}
        <div>
          <label htmlFor="matchStatus" className="block text-sm font-medium text-gray-700">Match Status</label>
          <select
            id="matchStatus"
            name="matchStatus"
            value={fixtureData.matchStatus}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-200 transition duration-150 focus:outline-none"
          >
            <option value="upcoming">Upcoming</option>
            <option value="completed">Completed</option>
            <option value="ongoing">Ongoing</option>
          </select>
        </div>

        {/* Match Result */}
        <div>
          <label htmlFor="matchResult" className="block text-sm font-medium text-gray-700">Match Result</label>
          <input
            type="text"
            id="matchResult"
            name="matchResult"
            value={fixtureData.matchResult}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-200 transition duration-150 focus:outline-none"
          />
        </div>

        {/* Team 1 Score */}
        <div>
          <label htmlFor="team1.score" className="block text-sm font-medium text-gray-700">
            {fixtureData.team1.name || 'Team 1'} Score
          </label>
          <input
            type="text"
            id="team1.score"
            name="team1.score"
            value={fixtureData.team1.score}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-200 transition duration-150 focus:outline-none"
          />
        </div>

        {/* Team 2 Score */}
        <div>
          <label htmlFor="team2.score" className="block text-sm font-medium text-gray-700">
            {fixtureData.team2.name || 'Team 2'} Score
          </label>
          <input
            type="text"
            id="team2.score"
            name="team2.score"
            value={fixtureData.team2.score}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-200 transition duration-150 focus:outline-none"
          />
        </div>

        {/* Non-Editable Fields */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Match Date</label>
          <p className="mt-1 block w-full bg-gray-100 border-gray-300 rounded-md p-2">{fixtureData.date || 'N/A'}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Venue</label>
          <p className="mt-1 block w-full bg-gray-100 border-gray-300 rounded-md p-2">{fixtureData.venue || 'N/A'}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Match Time</label>
          <p className="mt-1 block w-full bg-gray-100 border-gray-300 rounded-md p-2">{fixtureData.matchTime || 'N/A'}</p>
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 bg-orange-600 border border-transparent rounded-md font-semibold text-sm text-white uppercase tracking-widest hover:bg-orange-700 focus:outline-none focus:border-orange-700 focus:ring focus:ring-orange-600 disabled:opacity-50"
            disabled={submitting}
          >
            {submitting ? (
              <svg className="animate-spin h-5 w-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V2.5a.5.5 0 011 0V4a8 8 0 01-8 8z"></path>
              </svg>
            ) : (
              'Update Fixture'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateFixtureForm;
