import React, { useRef } from 'react';
import { useScrollReveal } from '../../../hooks/useScrollReveal';

// Company logo imports - keep the same imports as original company.jsx
import img5 from "../../../assets/Images/company logo/ANUKAMPA LOGO.jpg";
import img6 from "../../../assets/Images/company logo/FS REALITY COMPANY LOGO.jpg";
import img7 from "../../../assets/Images/company logo/HG INFRA.jpg";
import img8 from "../../../assets/Images/company logo/HOMELAND GROUP LOGO.jpg";
import img9 from "../../../assets/Images/company logo/JAIPUR DEVELOPMENT AUTHORITY LOGO.jpg";
import img11 from "../../../assets/Images/company logo/Shriram-Group-Logo.png";
import img12 from "../../../assets/Images/company logo/UDAY GAJRAJ logo.jpg";
import img13 from "../../../assets/Images/company logo/chiripal-logo.jpg";
import img14 from "../../../assets/Images/company logo/Frame 1.jpg";
import img15 from "../../../assets/Images/company logo/Frame 2.jpg";
import img16 from "../../../assets/Images/company logo/Frame 3.jpg";
import img17 from "../../../assets/Images/company logo/Frame 4.jpg";
import img18 from "../../../assets/Images/company logo/Frame 5.jpg";
import img19 from "../../../assets/Images/company logo/Frame 6.jpg";
import img20 from "../../../assets/Images/company logo/Frame 7.jpg";
import img21 from "../../../assets/Images/company logo/Frame 8.jpg";
import img22 from "../../../assets/Images/company logo/Frame 9.jpg";
import img23 from "../../../assets/Images/company logo/Frame 10.jpg";
import img24 from "../../../assets/Images/company logo/Frame 11.jpg";
import img25 from "../../../assets/Images/company logo/Frame 12.jpg";
import img26 from "../../../assets/Images/company logo/Frame 13.jpg";
import img27 from "../../../assets/Images/company logo/Frame 14.jpg";
import img28 from "../../../assets/Images/company logo/Frame 15.jpg";
import img29 from "../../../assets/Images/company logo/Frame 16.jpg";
import img30 from "../../../assets/Images/company logo/Frame 18.jpg";
import img31 from "../../../assets/Images/company logo/Frame 19.jpg";
import img33 from "../../../assets/Images/company logo/Frame 35.jpg";
import img34 from "../../../assets/Images/company logo/Frame 22.jpg";
import img35 from "../../../assets/Images/company logo/Frame 23.jpg";
import img36 from "../../../assets/Images/company logo/Frame 24.jpg";
import img37 from "../../../assets/Images/company logo/Frame 25.jpg";
import img38 from "../../../assets/Images/company logo/Frame 26.jpg";
import img39 from "../../../assets/Images/company logo/Frame 27.jpg";
import img40 from "../../../assets/Images/company logo/Frame 28.jpg";
import img41 from "../../../assets/Images/company logo/Frame 29.jpg";
import img42 from "../../../assets/Images/company logo/Frame 30.jpg";
import img43 from "../../../assets/Images/company logo/Frame 31.jpg";
import img44 from "../../../assets/Images/company logo/Frame 32.jpg";
import img45 from "../../../assets/Images/company logo/Frame 33.jpg";
import img46 from "../../../assets/Images/company logo/Frame 34.jpg";
import img47 from "../../../assets/Images/company logo/Frame 21.jpg";

const images = [img5, img6, img7, img8, img9, img11, img12, img13, img14, img15, img16, img17, img18, img19, img20, img21, img22, img23, img24, img25, img26, img27, img28, img29, img30, img31, img33, img34, img35, img36, img37, img38, img39, img40, img41, img42, img43, img44, img45, img46, img47];

const CompanyMarquee = () => {
  const sectionRef = useScrollReveal({ start: 'top 85%' });

  const allLogos = [...images, ...images, ...images];

  return (
    <section
      ref={sectionRef}
      className="relative py-16 md:py-20 bg-[#F8F5F1] overflow-hidden border-y border-[#E8E4DD]"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24 mb-10">
        <div className="flex items-center gap-4">
          <div className="w-8 h-[1px] bg-[#CAAA79]" />
          <span className="text-xs font-general font-semibold text-[#CAAA79] uppercase tracking-[0.2em]">
            Trusted By
          </span>
          <div className="flex-1 h-[1px] bg-gradient-to-r from-[#E8E4DD] to-transparent" />
        </div>
      </div>

      {/* Marquee row 1 - left to right */}
      <div className="relative mb-4">
        <div className="flex gap-8 animate-marquee" style={{ width: 'max-content' }}>
          {allLogos.map((img, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-[120px] h-[60px] md:w-[140px] md:h-[70px] bg-white rounded-lg p-3 flex items-center justify-center shadow-card hover:shadow-card-hover transition-all duration-300 hover:scale-105"
            >
              <img
                src={img}
                alt={`Client ${i + 1}`}
                className="w-full h-full object-contain grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Marquee row 2 - right to left */}
      <div className="relative">
        <div className="flex gap-8 animate-marquee-reverse" style={{ width: 'max-content' }}>
          {allLogos.reverse().map((img, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-[120px] h-[60px] md:w-[140px] md:h-[70px] bg-white rounded-lg p-3 flex items-center justify-center shadow-card hover:shadow-card-hover transition-all duration-300 hover:scale-105"
            >
              <img
                src={img}
                alt={`Client ${i + 1}`}
                className="w-full h-full object-contain grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CompanyMarquee;