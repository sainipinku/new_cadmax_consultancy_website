import React from "react";
import Navbar from "../../components/Layout/Header/Navbar";
import Footer from "../../components/Layout/Footer/Footer";
import "./Engineering.css";
// import { Link } from "react-router-dom";

import heroBG from "../../../src/assets/Images/service-page-2/urban-planning.jpeg";
// import overlapImg from "../../../src/assets/Images/service-page-2/survey-img.jpg";

import collage1 from "../../../src/assets/Images/service-page-2/COLLAGE-1.jpeg";
import collage2 from "../../../src/assets/Images/service-page-2/COLLAGE-2.jpeg";
import collage3 from "../../../src/assets/Images/service-page-2/COLLAGE-3.jpeg";
import collage4 from "../../../src/assets/Images/service-page-2/MDP-2025.jpg";
import collage5 from "../../../src/assets/Images/service-page-2/Zonal-development.jpg";
import collage6 from "../../../src/assets/Images/service-page-2/kanakvrindavanSIRSI.jpg.jpeg";
import collage7 from "../../../src/assets/Images/service-page-2/VATIKAINFOTECHCITYAJMERROAD.jpg.jpeg";
import collage8 from "../../../src/assets/Images/service-page-2/Padam-vatika.jpeg";

const Engineering = () => {


  const collageImages = [
    { img: collage1, title: "MOUNTAIN LIFE  FARM HOUSE SCHEME AT MANPUR MACHEDI JAIPUR. " },
    { img: collage2, title: "NAVSAAR VALLEY RESIDENTIAL TOWNSHIP  AT CHANDLAI VILLAGE JAIPUR." },
    { img: collage3, title: " INDUSTRIAL PLANNING AT MOTUKA VILLAGE TONK. " },
    { img: collage4, title: "MASTER DEVELOPMENT PLAN 2025." },
    { img: collage5, title: "Zonal Development Plan Planning Zone-15" },
    { img: collage6, title: "kanak Vrindavan RESIDENTIAL SCHEME AT SIRSI JAIPUR. " },
    { img: collage7, title: "VATIKA INFOTECH CITY AT AJMER ROAD JAIPUR. " },
    { img: collage8, title: "PADAM VATIKA RESIDENTIAL SCHEME AT VATIKA JAIPUR." }
  ];

  return (
    <>
      <Navbar />

     <div
  className="service1-hero relative"
  style={{ backgroundImage: `url(${heroBG})` }}
>
  {/* Dark Overlay */}
  <div className="absolute inset-0 bg-black/40"></div>

  {/* Content */}
  <div className="hero-overlay relative z-10 text-white flex items-end justify-center h-full pb-16">
    {/* Eyebrow */}
    <div className="text-center">
      <div className="flex items-center justify-center gap-4 mb-6">
        <div className="w-8 h-[1px] bg-[var(--accent)]" />
        <span className="text-xs font-general font-semibold text-[var(--accent)] uppercase tracking-[0.2em]">
          Our Service
        </span>
        <div className="w-8 h-[1px] bg-[var(--accent)]" />
      </div>
      <h1 className="font-clash text-5xl md:text-7xl font-semibold">
        URBAN <span className="italic text-[var(--accent)]">PLANNING</span>
      </h1>
    </div>
  </div>
</div>

      {/* BLACK BOX — dark overview section matching Home theme */}
      <div className="relative bg-[var(--foreground)] overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[var(--accent)]/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-6 py-20">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-8 h-[1px] bg-[var(--accent)]" />
            <span className="text-xs font-general font-semibold text-[var(--accent)] uppercase tracking-[0.2em]">
              Overview
            </span>
            <div className="w-8 h-[1px] bg-[var(--accent)]" />
          </div>
          <p className="max-w-5xl mx-auto text-center font-inter text-white/85 text-base md:text-lg leading-relaxed">
            An architectural and engineering company plays a vital role in planning and designing essential infrastructure such as water supply systems, road networks, and electricity distribution. Engineers in the company analyze site conditions, safety standards, and community needs to design reliable water supply systems that ensure clean and efficient delivery. They also plan and develop road networks that support smooth transportation, proper drainage, and long-term durability. In addition, electrical engineers design and coordinate electricity layouts to ensure safe, efficient, and sustainable power distribution. Together, these services contribute to well-organized, functional, and sustainable built environments.
          </p>
        </div>
      </div>

      {/* Projects Collage — FULL WIDTH BACKGROUND */}
      <div className="w-full bg-[var(--background)]">
        <div className="w-full max-w-7xl mx-auto px-6 py-20">
          {/* Section header */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-8 h-[1px] bg-[var(--accent)]" />
              <span className="text-xs font-general font-semibold text-[var(--accent)] uppercase tracking-[0.2em]">
                Our Projects
              </span>
              <div className="w-8 h-[1px] bg-[var(--accent)]" />
            </div>
            <h2 className="font-clash text-4xl md:text-5xl lg:text-6xl text-[var(--foreground)]">
              Featured <span className="italic text-[var(--accent)]">Work</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {collageImages.map((item, index) => (
              <div key={index} className="group">
                {/* Image */}
                <div className="relative overflow-hidden rounded-2xl border border-[var(--border)] shadow-elevated">
                  <img
                    src={item.img}
                    alt=""
                    className="w-full h-[320px] object-cover transition duration-700 group-hover:scale-105"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-[var(--foreground)]/50 group-hover:bg-[var(--foreground)]/10 transition duration-500"></div>

                  {/* Index number */}
                  <span className="absolute top-4 left-4 font-garamond text-sm text-[var(--accent)] tracking-[0.3em]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Title BELOW */}
                <h3 className="mt-4 font-general font-semibold text-base md:text-lg text-[var(--foreground)] uppercase tracking-wide">
                  {item.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Engineering;