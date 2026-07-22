import React from 'react';
import Navbar from '../../components/Layout/Header/Navbar';
import HeroSection from './components/HeroSection';
import CompanyShowcase from './components/company';
import AboutSection from './components/AboutSection';
import ProjectsShowcase from './components/ProjectsShowcase';
import AmenitiesSection from './components/AmenitiesSection';
import ProcessSection from './components/ProcessSection';
import TestimonialsSection from './components/TestimonialsSection';
import ContactSection from './components/ContactSection';
import Footer from '../../components/Layout/Footer/Footer';
import ScrollProgress from '../../components/ScrollProgress';
import { useLenis } from '../../hooks/useLenis';

function Home() {
  useLenis();

  return (
    <>
      <ScrollProgress />
      <div className="min-h-screen bg-[var(--background)] font-inter">
        <Navbar />
        <HeroSection />
        <CompanyShowcase />
        <AboutSection />
        <AmenitiesSection />
        <ProjectsShowcase />
        <ProcessSection />
        <TestimonialsSection />
        <ContactSection />
        <Footer />
      </div>
    </>
  );
}

export default Home;