import React from "react";
import Navbar from "../../components/Layout/Header/Navbar";
import Footer from "../../components/Layout/Footer/Footer";
import { Link } from "react-router-dom";

import heroBG from "../../../src/assets/Images/service-page-1/service-banner.jpg";
import img1 from "../../assets/Images/service-page-1/urban-plan.jpg";
import img2 from "../../assets/Images/urbanmax/mahadev-market.jpg";
import img3 from "../../assets/Images/service-page-1/interior-img.jpeg";
import img4 from "../../assets/Images/service-page-1/infastructure-img.jpeg";

const servicesData = [
  { to: "/Services/Engineering", img: img1, title: "Urban Planning" },
  { to: "/Services/Architecture", img: img2, title: "Architecture" },
  { to: "/Services/InteriorDesign", img: img3, title: "Interior Designing" },
  { to: "/Services/infrastructure", img: img4, title: "Infrastructure" },
];

const Service1 = () => {
  return (
    <>
      <Navbar />

      {/* HERO SECTION */}
      <div
        className="relative w-full h-[500px] flex items-center justify-center text-center bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBG})` }}
      >
        <div className="absolute inset-0 bg-black/40"></div>

        <div className="relative z-10">
          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-8 h-[1px] bg-[var(--accent)]" />
            <span className="text-xs font-general font-semibold text-[var(--accent)] uppercase tracking-[0.2em]">
              What We Do
            </span>
            <div className="w-8 h-[1px] bg-[var(--accent)]" />
          </div>

          <h1 className="font-clash text-4xl md:text-6xl lg:text-7xl text-white leading-[1.05]">
            Designing Dreams <br />
            <span className="italic text-[var(--accent)]">Building Reality</span>
          </h1>
        </div>
      </div>

      {/* GRID SECTION — FULL WIDTH BACKGROUND */}
      <div className="w-full bg-[var(--background)]">
        <div className="w-full max-w-[1400px] mx-auto px-5 py-20">
          {/* Section header */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-8 h-[1px] bg-[var(--accent)]" />
              <span className="text-xs font-general font-semibold text-[var(--accent)] uppercase tracking-[0.2em]">
                Explore Our Services
              </span>
              <div className="w-8 h-[1px] bg-[var(--accent)]" />
            </div>
            <h2 className="font-clash text-4xl md:text-5xl lg:text-6xl text-[var(--foreground)]">
              Our <span className="italic text-[var(--accent)]">Services</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {servicesData.map((service) => (
              <Link
                key={service.to}
                to={service.to}
                className="group relative h-[400px] overflow-hidden rounded-2xl border border-[var(--border)] shadow-elevated"
              >
                <img
                  src={service.img}
                  alt={service.title}
                  className="w-full h-full object-cover block transition-transform duration-500 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-[var(--foreground)]/70 group-hover:bg-[var(--foreground)]/10 transition-all duration-300"></div>

                <div className="absolute bottom-5 left-5 z-10">
                  <div className="w-8 h-[1px] bg-[var(--accent)] mb-3 transition-all duration-300 group-hover:w-16" />
                  <h3 className="font-clash text-white font-semibold text-lg uppercase tracking-wider">
                    {service.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Service1;