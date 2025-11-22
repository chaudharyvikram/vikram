import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <nav className="w-full fixed top-0 z-20 bg-transparent backdrop-blur px-6 py-4 flex items-center justify-between">
      <Link to="/" className="text-xl font-bold text-white">Vikram Chaudhary</Link>
      <div className="flex gap-6">
        <Link to="/" className="text-gray-300 hover:text-white transition-colors">Home</Link>
        <Link to="/work" className="text-gray-300 hover:text-white transition-colors">Work</Link>
        <Link to="/blogs" className="text-gray-300 hover:text-white transition-colors">Blogs</Link>
      </div>
    </nav>
  );
};

export default Header;