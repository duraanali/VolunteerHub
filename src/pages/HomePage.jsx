import React from 'react';
import { Link } from 'react-router-dom';
import { UserPlus, Users } from 'lucide-react';

const HomePage = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">Welcome to VolunteerHub</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Make a difference in your community by sharing your time and skills.
          Join our network of dedicated volunteers today!
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <Link 
          to="/volunteers" 
          className="group bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-all duration-300"
        >
          <div className="flex items-center mb-4">
            <Users className="h-8 w-8 text-primary-600 mr-3" />
            <h2 className="text-2xl font-semibold text-gray-800">View Volunteers</h2>
          </div>
          <p className="text-gray-600 mb-4">
            Browse our network of dedicated volunteers and their skills.
          </p>
          <span className="text-primary-600 font-medium group-hover:text-primary-700">
            Browse volunteers →
          </span>
        </Link>

        <Link 
          to="/register" 
          className="group bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-all duration-300"
        >
          <div className="flex items-center mb-4">
            <UserPlus className="h-8 w-8 text-secondary-600 mr-3" />
            <h2 className="text-2xl font-semibold text-gray-800">Become a Volunteer</h2>
          </div>
          <p className="text-gray-600 mb-4">
            Register as a volunteer and start making a difference today.
          </p>
          <span className="text-secondary-600 font-medium group-hover:text-secondary-700">
            Register now →
          </span>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;