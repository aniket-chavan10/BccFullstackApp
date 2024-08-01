import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UpdateFixtureCard from './UpdateFixtureCard';
import { fetchFixtures } from '../services/api'; // Adjust the import path as necessary

const UpdateFixtures = () => {
  const [fixtures, setFixtures] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadFixtures = async () => {
      try {
        const fixturesData = await fetchFixtures();
        setFixtures(fixturesData);
      } catch (error) {
        setError(error.message);
      }
    };

    loadFixtures();
  }, []);

  const handleEditClick = (id) => {
    navigate(`/admin-dashboard/fixtures/edit/${id}`);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Manage Fixtures</h2>
      {error && <p className="text-red-600">Error: {error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {fixtures.map((fixture) => (
          <UpdateFixtureCard key={fixture._id} fixture={fixture} onEditClick={handleEditClick} />
        ))}
      </div>
    </div>
  );
};

export default UpdateFixtures;
