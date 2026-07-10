import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../../components/Layout/Header/Navbar';
import HeroSection from './components/HeroSection';
import CompanyShowcase from './components/company';
import AboutSection from './components/AboutSection';
// import ServiceSection from './components/ServiceSection';
import ProjectsShowcase from './components/ProjectsShowcase';
import AmenitiesSection from './components/AmenitiesSection';
import ProcessSection from './components/ProcessSection';
import TestimonialsSection from './components/TestimonialsSection';
import ContactSection from './components/ContactSection';
import Footer from '../../components/Layout/Footer/Footer';
import Preloader from '../../components/Preloader/Preloader';

// Module-level flag: resets on a full page load/reload (so the preloader shows
// when the site is opened), but persists across client-side navigation (so
// clicking "Home" doesn't re-trigger it).
let introPlayed = false;

function Home() {
  const [loading, setLoading] = useState(!introPlayed);
  const contentRef = useRef(null);
  // True only on the very first page load (when the preloader will play).
  //const firstLoad = useRef(!introPlayed);

  useEffect(() => {
    // Lock body scroll during loading
    document.body.style.overflow = loading ? 'hidden' : '';
    // Match the preloader's dark bg during load; restore cream afterwards.
    document.body.style.backgroundColor = loading ? '#171717' : '#F8F5F1';
    return () => {
      document.body.style.overflow = '';
    };
  }, [loading]);

  const handlePreloaderComplete = () => {
    introPlayed = true;
    setLoading(false);
    // Recalculate GSAP pin positions now that the preloader is gone.
    import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
      ScrollTrigger.refresh();
    });
  };

  return (
    <div className="min-h-screen bg-[#F8F7F4] font-inter">
      {/* Home content is mounted immediately (behind the opaque preloader) so it
          is fully loaded by the time the preloader finishes. It shows in place
          with no extra entrance animation. */}
      <div ref={contentRef}>
        <Navbar />
        <HeroSection />
        <CompanyShowcase />
        <AboutSection />
        {/* <ServiceSection /> */}
        <AmenitiesSection />
        <ProjectsShowcase />
        <ProcessSection />
        <TestimonialsSection />
        <ContactSection />
        <Footer />
      </div>
      {loading && <Preloader onDone={handlePreloaderComplete} />}
    </div>
  );
}

export default Home;