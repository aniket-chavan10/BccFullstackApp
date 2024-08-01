import React from 'react';

const UpdateFixtureCard = ({ fixture, onEditClick }) => {
  if (!fixture) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 max-w-md mx-auto">
      <h3 className="text-2xl font-bold mb-4 text-gray-800">{fixture.matchNumber}</h3>
      <p className="text-gray-600 mb-2"><strong className="font-medium">Date:</strong> {fixture.date}</p>
      <p className="text-gray-600 mb-2"><strong className="font-medium">Match Status:</strong> {fixture.matchStatus}</p>
      <p className="text-gray-600 mb-2"><strong className="font-medium">Team 1:</strong> {fixture.team1.name} - {fixture.team1.score}</p>
      <p className="text-gray-600 mb-2"><strong className="font-medium">Team 2:</strong> {fixture.team2.name} - {fixture.team2.score}</p>
      <p className="text-gray-600 mb-2"><strong className="font-medium">Venue:</strong> {fixture.venue}</p>
      <p className="text-gray-600 mb-4"><strong className="font-medium">Match Time:</strong> {fixture.matchTime}</p>
      <p className="text-gray-600 mb-4"><strong className="font-medium">Match Result:</strong> {fixture.matchResult}</p>
      <div className="flex justify-end">
        <button
          onClick={() => onEditClick(fixture._id)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default UpdateFixtureCard;
