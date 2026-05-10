// frontend/src/pages/LandingPage.js
import React from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import ProblemObjectives from '../components/ProblemObjectives';
import FeaturesSection from '../components/FeaturesSection';
import TechStackSection from '../components/TechStackSection';


const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <HeroSection />
      <ProblemObjectives />
      <FeaturesSection />
      <TechStackSection />
    </div>
  );
};

export default LandingPage;