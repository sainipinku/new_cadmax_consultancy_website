import React from "react";
import Navbar from "../../components/Layout/Header/Navbar";
import HeroSection from "./components/HeroSection";
import CompanyShowcase from "./components/company";
import EAIService from "./components/EAIService";
import AboutSection from "./components/AboutSection";
import ProjectsShowcase from "./components/ProjectsShowcase";
import ProcessSection from "./components/ProcessSection";
import AwardSlider from "./components/AwardSlider";
import TestimonialsSection from "./components/TestimonialsSection";
import StatsSection from "./components/StatsSection";
import ContactSection from "./components/ContactSection";
import Footer from "../../components/Layout/Footer/Footer";
import ScrollProgress from "../../components/ScrollProgress";

import { useLenis } from "../../hooks/useLenis";

function Home() {
  useLenis();

  return (
    <>
      <ScrollProgress />

      <div className="min-h-screen bg-[var(--background)]">
        <Navbar />

        <main className="font-garamond">
          <HeroSection />
          <CompanyShowcase />
          <EAIService />
          <AboutSection />
          <StatsSection />
          <ProjectsShowcase />
          <ProcessSection />
          <AwardSlider />
          <TestimonialsSection />
          <ContactSection />
        </main>
      </div>

      {/* Footer outside Home page typography */}
      <Footer />
    </>
  );
}

export default Home;