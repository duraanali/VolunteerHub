import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { RefreshCw, Filter } from 'lucide-react';
import VolunteerCard from './VolunteerCard';

const VolunteerList = ({ refresh, onRefreshComplete }) => {
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({});
  const [showFilters, setShowFilters] = useState(false);
  
  const skillOptions = [
    'All',
    'Teaching',
    'Event planning',
    'Administrative',
    'Technology',
    'Marketing',
    'Fundraising',
    'Construction',
    'Healthcare',
    'Cooking',
    'Transportation'
  ];
  
  const availabilityOptions = [
    'All',
    'Weekday mornings',
    'Weekday afternoons',
    'Weekday evenings',
    'Weekend mornings',
    'Weekend afternoons',
    'Weekend evenings'
  ];

  const fetchVolunteers = async () => {
    setLoading(true);
    setError('');
    
    try {
      const params = {};
      
      if (filters.skill && filters.skill !== 'All') {
        params.skill = filters.skill;
      }
      
      if (filters.availability && filters.availability !== 'All') {
        params.availability = filters.availability;
      }
      
      const response = await axios.get('http://localhost:3002/api/volunteers', { params });
      
      setVolunteers(response.data);
    } catch (error) {
      console.error('Error fetching volunteers:', error);
      setError('Failed to load volunteers. Please try again later.');
    } finally {
      setLoading(false);
      if (refresh) {
        onRefreshComplete();
      }
    }
  };

  useEffect(() => {
    fetchVolunteers();
  }, [filters]);
  
  useEffect(() => {
    if (refresh) {
      fetchVolunteers();
    }
  }, [refresh]);



  return (
    <div className="bg-white rounded-xl shadow-md p-6 md:p-8 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Volunteer Directory</h2>
        
        <div className="flex items-center space-x-3 mt-3 sm:mt-0">

          <button 
            onClick={fetchVolunteers}
            className="flex items-center text-gray-600 hover:text-primary-600 text-sm font-medium"
            disabled={loading}
          >
            <RefreshCw className={`h-4 w-4 mr-1 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>
      </div>
      
      
      {loading && (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
        </div>
      )}
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 rounded-md p-4 mb-6">
          <p>{error}</p>
        </div>
      )}
      
      {!loading && !error && volunteers.length === 0 && (
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <p className="text-gray-600">No volunteers found. Be the first to register!</p>
        </div>
      )}
      
      {!loading && !error && volunteers.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-slide-up">
          {volunteers.map((volunteer) => (
            <VolunteerCard key={volunteer.id} volunteer={volunteer} />
          ))}
        </div>
      )}
    </div>
  );
};

export default VolunteerList;