// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Team from './pages/Team';
import AdminDashboard from './pages/AdminDashboard';
import Schedule from './pages/Schedule';
import AboutUs from './pages/AboutUs';
import Gallery from './pages/Gallery';
import GalleryDetails from './pages/GalleryDetails';
import NewsDetails from './pages/NewsDetails';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/team" element={<Team />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/gallery/:id" element={<GalleryDetails />} />
        <Route path="/news/:id" element={<NewsDetails />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />

        {/* Protected Route for Admin Dashboard */}
        <Route element={<ProtectedRoute />}>
          <Route path="/admin-dashboard/*" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
