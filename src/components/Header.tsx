import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, Briefcase, BookOpen, Mail, Linkedin } from 'lucide-react';

const Header: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<'home' | 'work' | 'blogs'>('home');

  useEffect(() => {
    const handleScroll = () => {
      if (location.pathname !== '/') return;

      const workSection = document.getElementById('recent-work');
      const blogSection = document.getElementById('latest-article');

      let newActiveSection: 'home' | 'work' | 'blogs' = 'home';

      if (workSection) {
        const rect = workSection.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 2 && rect.bottom >= 0) {
          newActiveSection = 'work';
        }
      }

      if (blogSection) {
        const rect = blogSection.getBoundingClientRect();
        // If blog section is visible and higher up than work (or work is scrolled past)
        // Simple priority: if blog is in view, it takes precedence if it's below work
        if (rect.top <= window.innerHeight / 2 && rect.bottom >= 0) {
          newActiveSection = 'blogs';
        }
      }

      setActiveSection(newActiveSection);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isHomeActive = location.pathname === '/' && activeSection === 'home';
  const isWorkActive = location.pathname === '/' && activeSection === 'work';
  const isBlogsActive = location.pathname.startsWith('/blogs') || (location.pathname === '/' && activeSection === 'blogs');

  return (
    <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-center gap-2 px-2 py-2 bg-black/20 backdrop-blur-2xl border border-white/10 rounded-full shadow-2xl supports-[backdrop-filter]:bg-black/10">

        {/* Navigation Links */}
        <div className="flex items-center px-4 gap-6">
          <Link
            to="/"
            onClick={scrollToTop}
            className={`relative group flex items-center gap-2 text-sm font-medium transition-colors ${isHomeActive ? 'text-white' : 'text-gray-400 hover:text-white'}`}
          >
            <span className={`w-1.5 h-1.5 rounded-full bg-red-500 transition-opacity absolute -left-3 ${isHomeActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}></span>
            Home
          </Link>
          <a
            href="#recent-work"
            onClick={(e) => {
              e.preventDefault();
              if (location.pathname !== '/') {
                navigate('/', { state: { scrollTo: 'recent-work' } });
              } else {
                const element = document.getElementById('recent-work');
                element?.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className={`relative group flex items-center gap-2 text-sm font-medium transition-colors cursor-pointer ${isWorkActive ? 'text-white' : 'text-gray-400 hover:text-white'}`}
          >
            <span className={`w-1.5 h-1.5 rounded-full bg-red-500 transition-opacity absolute -left-3 ${isWorkActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}></span>
            Work
          </a>
          <Link
            to="/blogs"
            onClick={scrollToTop}
            className={`relative group flex items-center gap-2 text-sm font-medium transition-colors ${isBlogsActive ? 'text-white' : 'text-gray-400 hover:text-white'}`}
          >
            <span className={`w-1.5 h-1.5 rounded-full bg-red-500 transition-opacity absolute -left-3 ${isBlogsActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}></span>
            Blogs
          </Link>
        </div>

        {/* Divider */}
        <div className="w-px h-6 bg-white/10 mx-2"></div>

        {/* Social Icons */}
        <div className="flex items-center gap-2">
          <a href="mailto:vikramchaudhary.dev@gmail.com" className="p-2 rounded-full bg-pink-500/20 text-pink-500 hover:bg-pink-500 hover:text-white transition-all duration-300">
            <Mail size={18} />
          </a>
          <a href="https://www.linkedin.com/in/chaudharyvikram/" target="_blank" rel="noreferrer" className="p-2 rounded-full bg-blue-500/20 text-blue-500 hover:bg-blue-500 hover:text-white transition-all duration-300">
            <Linkedin size={18} />
          </a>
        </div>

      </div>
    </nav>
  );
};

export default Header;