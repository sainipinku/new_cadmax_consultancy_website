import React from 'react';
import Navbar from '../../components/Layout/Header/Navbar';
import HeroSection from './components/HeroSection';
import CompanyShowcase from './components/company';
// import ServiceSlider from './components/ServiceSlider';
import EAIService from './components/EAIService';
import AboutSection from './components/AboutSection';
import ProjectsShowcase from './components/ProjectsShowcase';
import AmenitiesSection from './components/AmenitiesSection';
import ProcessSection from './components/ProcessSection';
import AwardSlider from './components/AwardSlider';
import TestimonialsSection from './components/TestimonialsSection';
// import Testimonial from './components/testimonial';
import StatsSection from './components/StatsSection';
import ContactSection from './components/ContactSection';
import Footer from '../../components/Layout/Footer/Footer';
import ScrollProgress from '../../components/ScrollProgress';

import { useLenis } from '../../hooks/useLenis';

function Home() {
  useLenis();

  return (
    <>
      <ScrollProgress />
      <div className="min-h-screen bg-[var(--background)] font-garamond">
        <Navbar />
      <HeroSection />
      <CompanyShowcase />
      {/* <ServiceSlider /> */}
      
      <EAIService />
      <AboutSection />
      <StatsSection />
        <AmenitiesSection />
        <ProjectsShowcase />
        <ProcessSection />
        <AwardSlider />
        <TestimonialsSection />
        <ContactSection />
        <Footer />
        {/* <Testimonial /> */}
      </div>
    </>
  );
}

export default Home;