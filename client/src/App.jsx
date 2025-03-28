import './App.css';
import React from 'react';
import Navbar from './pages/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Skills from './pages/Skills';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import Footer from './pages/Footer';
import { Routes, Route, Navigate } from 'react-router-dom';

const App = () => {
  const isLoggedIn = localStorage.getItem('token');
  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  return (
    <div className="App">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={isLoggedIn ? <Navigate to="/" /> : <Login />} />
          {/* Admin Route - फक्त Admin ला दिसेल */}
          <Route
            path="/dashboard"
            element={isLoggedIn && isAdmin ? <AdminDashboard /> : <Navigate to="/login" />}
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
