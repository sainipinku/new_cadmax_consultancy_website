import React from 'react';
import Navbar from '../../components/Layout/Header/Navbar';
import HeroSection from './components/HeroSection';
import CompanyShowcase from './components/company';
import AboutSection from './components/AboutSection';
import ServicesSection from './components/ServicesSection';
import ProjectsShowcase from './components/ProjectsShowcase';
import TestimonialsSection from './components/TestimonialsSection';
import ContactSection from './components/ContactSection';
import Footer from '../../components/Layout/Footer/Footer';

function Home() {
  return (
    <div className="min-h-screen bg-[#F8F7F4] font-inter">
      <Navbar />
      <HeroSection />
      <CompanyShowcase />
      <AboutSection />
      <ServicesSection />
      <ProjectsShowcase />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}

export default Home;
