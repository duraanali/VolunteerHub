import React from 'react';
import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <Heart className="h-6 w-6 text-primary-400 mr-2" />
            <span className="text-lg font-semibold">VolunteerHub</span>
          </div>
          <div className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} VolunteerHub. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;