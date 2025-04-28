import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import VolunteerList from '../components/volunteers/VolunteerList';

const VolunteersPage = () => {
  const [refreshVolunteers, setRefreshVolunteers] = useState(false);

  const handleRefreshComplete = () => {
    setRefreshVolunteers(false);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Volunteers</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Meet our amazing team of volunteers making a difference in the community.
          <br />
          <Link to="/register" className="text-primary-600 hover:text-primary-700">
            Want to join? Register here →
          </Link>
        </p>
      </div>

      <VolunteerList 
        refresh={refreshVolunteers}
        onRefreshComplete={handleRefreshComplete}
      />
    </div>
  );
};

export default VolunteersPage;