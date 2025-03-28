// Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const admin = localStorage.getItem('isAdmin');
    setIsLoggedIn(!!token);
    setIsAdmin(admin === 'true');
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('isAdmin');
    setIsLoggedIn(false);
    setIsAdmin(false);
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/projects', label: 'Projects' },
    { path: '/about', label: 'About' },
    { path: '/skills', label: 'Skills' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <nav className="bg-gray-800 p-4 sticky top-0 w-full z-50 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-white text-2xl font-bold">Portfolio</Link>

        {/* Mobile Menu Button */}
        <button className="text-white md:hidden" onClick={toggleMenu}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-gray-300 hover:text-white transition duration-300 ${location.pathname === link.path ? 'text-white border-b-2 border-blue-500' : ''}`}
            >
              {link.label}
            </Link>
          ))}
          {isLoggedIn ? (
            <>
              {isAdmin && <Link to="/admin" className="text-gray-300 hover:text-white">Admin Dashboard</Link>}
              <button onClick={handleLogout} className="text-gray-300 hover:text-white">Logout</button>
            </>
          ) : (
            <Link to="/login" className="text-gray-300 hover:text-white">Login</Link>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-700 p-4 space-y-4">
          {navLinks.map((link) => (
            <Link key={link.path} to={link.path} onClick={toggleMenu} className="block text-gray-300 hover:text-white">
              {link.label}
            </Link>
          ))}
          {isLoggedIn ? (
            <>
              {isAdmin && <Link to="/admin" onClick={toggleMenu} className="block text-gray-300 hover:text-white">Admin Dashboard</Link>}
              <button onClick={handleLogout} className="block text-gray-300 hover:text-white">Logout</button>
            </>
          ) : (
            <Link to="/login" onClick={toggleMenu} className="block text-gray-300 hover:text-white">Login</Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
