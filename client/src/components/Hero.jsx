import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="bg-gradient-to-r from-purple-500 to-blue-600 text-white h-screen flex items-center justify-center text-center p-8">
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.h1 
          className="text-6xl font-extrabold mb-6"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2 }}
        >
          Hi, I'm a <span className="text-yellow-300">Full Stack MERN Developer</span>
        </motion.h1>

        <motion.p 
          className="text-xl mb-8"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          Crafting modern, scalable, and user-friendly applications.
        </motion.p>

        <motion.div
          className="space-x-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1 }}
        >
          <a 
            href="/resume.pdf" 
            download 
            className="bg-white text-blue-600 font-bold py-3 px-8 rounded-full shadow-lg hover:bg-yellow-300 transition duration-300"
          >
            Download Resume
          </a>
          <a 
            href="/contact" 
            className="bg-gray-800 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-gray-700 transition duration-300"
          >
            Contact Me
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
