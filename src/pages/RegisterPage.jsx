import React from 'react';
import VolunteerForm from '../components/form/VolunteerForm';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const navigate = useNavigate();

  const handleFormSubmitSuccess = () => {
    setTimeout(() => {
      navigate('/volunteers');
    }, 2000);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Join Our Volunteer Team</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Fill out the form below to register as a volunteer. Your information helps us
          match you with opportunities that align with your skills and interests.
        </p>
      </div>

      <VolunteerForm onSubmitSuccess={handleFormSubmitSuccess} />
    </div>
  );
};

export default RegisterPage;