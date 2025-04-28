import React from 'react';
import { User, Mail, Phone, Clock, Star, MapPin } from 'lucide-react';

const VolunteerCard = ({ volunteer }) => {
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  return (
    <div className="card">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-800">
            {volunteer.firstName} {volunteer.lastName}
          </h3>
          {volunteer.createdAt && (
            <p className="text-sm text-gray-500">
              Joined: {formatDate(volunteer.createdAt)}
            </p>
          )}
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-start">
          <Mail className="h-5 w-5 text-gray-500 mt-0.5 mr-2 flex-shrink-0" />
          <p className="text-gray-700 break-all">{volunteer.email}</p>
        </div>
        
        <div className="flex items-start">
          <Phone className="h-5 w-5 text-gray-500 mt-0.5 mr-2 flex-shrink-0" />
          <p className="text-gray-700">{volunteer.phone}</p>
        </div>
        
        <div className="flex items-start">
          <MapPin className="h-5 w-5 text-gray-500 mt-0.5 mr-2 flex-shrink-0" />
          <p className="text-gray-700">
            {volunteer.city}, {volunteer.state} {volunteer.zip}
          </p>
        </div>
        
        <div className="flex items-start">
          <Clock className="h-5 w-5 text-gray-500 mt-0.5 mr-2 flex-shrink-0" />
          <div>
            <p className="text-gray-700 font-medium">Availability</p>
            <div className="flex flex-wrap gap-1 mt-1">
              {volunteer.availability && volunteer.availability.map((time) => (
                <span 
                  key={time} 
                  className="bg-primary-50 text-primary-700 px-2 py-1 rounded text-xs font-medium"
                >
                  {time}
                </span>
              ))}
            </div>
          </div>
        </div>
        
        <div className="flex items-start">
          <Star className="h-5 w-5 text-gray-500 mt-0.5 mr-2 flex-shrink-0" />
          <div>
            <p className="text-gray-700 font-medium">Skills</p>
            <div className="flex flex-wrap gap-1 mt-1">
              {volunteer.skills && volunteer.skills.map((skill) => (
                <span 
                  key={skill} 
                  className="bg-secondary-50 text-secondary-700 px-2 py-1 rounded text-xs font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
        
        <div className="flex items-start">
          <User className="h-5 w-5 text-gray-500 mt-0.5 mr-2 flex-shrink-0" />
          <div>
            <p className="text-gray-700 font-medium">Interests</p>
            <p className="text-gray-600 text-sm mt-1">
              {volunteer.interests}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolunteerCard;