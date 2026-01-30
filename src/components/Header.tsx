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
          <a
            href="mailto:vikramchaudhary.dev@gmail.com"
            className="relative group p-2 rounded-full bg-pink-500/20 text-pink-500 hover:bg-pink-500 hover:text-white transition-all duration-300"
          >
            <Mail size={18} />
            <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-black/90 text-white text-xs rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
              Send Email
            </span>
          </a>
          <a
            href="https://www.linkedin.com/in/chaudharyvikram/"
            target="_blank"
            rel="noreferrer"
            className="relative group p-2 rounded-full bg-blue-500/20 text-blue-500 hover:bg-blue-500 hover:text-white transition-all duration-300"
          >
            <Linkedin size={18} />
            <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-black/90 text-white text-xs rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
              View LinkedIn Profile
            </span>
          </a>
          <a
            href="https://www.upwork.com/freelancers/vikramchaudhary"
            target="_blank"
            rel="noreferrer"
            className="relative group p-2 rounded-full bg-green-500/20 text-green-500 hover:bg-green-500 hover:text-white transition-all duration-300"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.112c-.002 1.406-1.141 2.546-2.547 2.548-1.405-.002-2.543-1.143-2.545-2.548V3.492H0v7.112c0 2.914 2.37 5.303 5.281 5.303 2.913 0 5.283-2.389 5.283-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109 3 0 5.439-2.452 5.439-5.45 0-3-2.439-5.439-5.439-5.439z" />
            </svg>
            <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-black/90 text-white text-xs rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
              View Upwork Profile
            </span>
          </a>
        </div>

      </div>
    </nav>
  );
};

export default Header;