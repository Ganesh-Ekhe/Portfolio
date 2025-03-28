import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-10">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-6">
        
        {/* ✅ Logo & Branding */}
        <div className="mb-6 md:mb-0">
          <h2 className="text-3xl font-extrabold text-blue-400 tracking-wide">
            MyPortfolio
          </h2>
          <p className="text-sm text-gray-400 mt-1">Crafting Digital Experiences</p>
        </div>

        {/* ✅ Navigation Links */}
        <ul className="flex space-x-6 text-gray-400 text-sm">
          <li className="hover:text-blue-400 transition duration-300 cursor-pointer">Home</li>
          <li className="hover:text-blue-400 transition duration-300 cursor-pointer">Projects</li>
          <li className="hover:text-blue-400 transition duration-300 cursor-pointer">About</li>
          <li className="hover:text-blue-400 transition duration-300 cursor-pointer">Skills</li>
          <li className="hover:text-blue-400 transition duration-300 cursor-pointer">Contact</li>
        </ul>

        {/* ✅ Social Media Icons */}
        <div className="flex space-x-5 mt-4 md:mt-0">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition duration-300 text-xl">
            <FaGithub />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500 transition duration-300 text-xl">
            <FaLinkedin />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition duration-300 text-xl">
            <FaTwitter />
          </a>
          <a href="mailto:your-email@example.com" className="text-gray-400 hover:text-red-500 transition duration-300 text-xl">
            <FaEnvelope />
          </a>
        </div>
      </div>

      {/* ✅ Copyright */}
      <div className="mt-6 text-center text-gray-500 text-xs">
        © {new Date().getFullYear()} MyPortfolio. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
