import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-md">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Heart className="h-8 w-8 text-white" />
            <h1 className="text-2xl font-bold">VolunteerHub</h1>
          </Link>
          <nav>
            <ul className="flex space-x-6">
              <li className="hover:text-primary-200 transition-colors duration-200">
                <Link to="/volunteers">Volunteers</Link>
              </li>
              <li className="hover:text-primary-200 transition-colors duration-200">
                <Link to="/register">Register</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;