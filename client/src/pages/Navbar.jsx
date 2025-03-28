import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaMoon, FaSun, FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md fixed w-full top-0 left-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex justify-between h-16 items-center">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            <a href="#home" className="hover:text-blue-500 transition duration-300">Portfolio</a>
          </div>
          <div className="hidden md:flex space-x-6">
            {["Home", "About","Skills", "Projects", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-500 transition duration-300"
              >
                {item}
              </a>
            ))}
            {isAuthenticated ? (
              <>
                <a
                  href="#admin"
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-500 transition duration-300"
                >
                  Admin
                </a>
                <button
                  onClick={handleLogout}
                  className="text-red-500 hover:text-red-700 font-semibold transition duration-300"
                >
                  Logout
                </button>
              </>
            ) : (
              <a
                href="#login"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-500 transition duration-300"
              >
                Login
              </a>
            )}
          </div>
          <div className="flex items-center gap-4">
            <button onClick={toggleDarkMode} className="text-gray-700 dark:text-gray-300 transition duration-300">
              {darkMode ? <FaSun size={24} /> : <FaMoon size={24} />}
            </button>
            <button className="md:hidden text-gray-700 dark:text-gray-300" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>
      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 shadow-lg p-4 absolute top-16 left-0 w-full z-40">
          {["Home", "About", "Skills", "Projects", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="block text-gray-700 dark:text-gray-300 py-2 text-center hover:text-blue-500 transition duration-300"
              onClick={() => setMenuOpen(false)}
            >
              {item}
            </a>
          ))}
          {isAuthenticated ? (
            <>
              <a
                href="#admin"
                className="block text-gray-700 dark:text-gray-300 py-2 text-center hover:text-blue-500 transition duration-300"
                onClick={() => setMenuOpen(false)}
              >
                Admin
              </a>
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="block text-red-500 py-2 text-center hover:text-red-700 font-semibold transition duration-300 w-full"
              >
                Logout
              </button>
            </>
          ) : (
            <a
              href="#login"
              className="block text-gray-700 dark:text-gray-300 py-2 text-center hover:text-blue-500 transition duration-300"
              onClick={() => setMenuOpen(false)}
            >
              Login
            </a>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;