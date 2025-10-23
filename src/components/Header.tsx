import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <nav className="w-full fixed top-0 z-20 bg-transparent backdrop-blur px-6 py-4 flex items-center justify-between">
      <div className="logo font-ubuntu font-bold text-lg">Vikram Chaudhary</div>
      <ul className="flex items-center gap-6">
        <li>
          <Link to="/" className="text-gray-800 hover:text-pink-500">Home</Link>
        </li>
        <li>
          <Link to="/blogs" className="text-gray-800 hover:text-pink-500">Blogs</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Header;