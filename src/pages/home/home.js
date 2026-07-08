import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../../components/Layout/Header/Navbar';
import HeroSection from './components/HeroSection';
import CompanyShowcase from './components/company';
import AboutSection from './components/AboutSection';
// import ServiceSection from './components/ServiceSection';
import ProjectsShowcase from './components/ProjectsShowcase';
import AmenitiesSection from './components/AmenitiesSection';
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
  // Home content is mounted ONLY after the preloader fully finishes (first load).
  // On client-side nav back, introPlayed is already true -> show immediately.
  const [homeVisible, setHomeVisible] = useState(introPlayed);
  const contentRef = useRef(null);
  // True only on the very first page load (when the preloader will play).
  const firstLoad = useRef(!introPlayed);

  useEffect(() => {
    // Lock body scroll during loading
    document.body.style.overflow = loading ? 'hidden' : '';
    // Restore the cream background once loading is done (preloader used dark bg)
    document.body.style.backgroundColor = loading ? '#171717' : '#F8F5F1';
    return () => {
      document.body.style.overflow = '';
    };
  }, [loading]);

  // Play the zoom/fade entrance once after mount, then CLEAR the transform so it
  // doesn't create a containing block that breaks GSAP ScrollTrigger pinning.
  useEffect(() => {
    if (!homeVisible) return;
    const el = contentRef.current;
    if (!el) return;
    if (!firstLoad.current) return; // nav-back: no entrance animation
    el.classList.add('home-enter');
    const onEnd = () => {
      el.classList.remove('home-enter');
      el.style.opacity = '1';
      // Recalculate GSAP pin positions now that layout is stable.
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        ScrollTrigger.refresh();
      });
    };
    el.addEventListener('animationend', onEnd, { once: true });
    // Fallback in case animationend doesn't fire
    const t = setTimeout(onEnd, 1000);
    return () => {
      el.removeEventListener('animationend', onEnd);
      clearTimeout(t);
    };
  }, [homeVisible]);

  const handlePreloaderComplete = () => {
    introPlayed = true;
    setLoading(false);
    setHomeVisible(true);
  };

  return (
    <div className="min-h-screen bg-[#F8F7F4] font-inter">
      {loading && <Preloader onDone={handlePreloaderComplete} />}
      {homeVisible && (
        <div ref={contentRef} style={firstLoad.current ? { opacity: 0 } : undefined}>
          <Navbar />
          <HeroSection />
          <CompanyShowcase />
          <AboutSection />
          {/* <ServiceSection /> */}
          <AmenitiesSection />
          <ProjectsShowcase />
          <TestimonialsSection />
          <ContactSection />
          <Footer />
        </div>
      )}
    </div>
  );
}

export default Home;