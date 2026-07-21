import React, { useRef } from 'react';
import { useScrollReveal } from '../../../hooks/useScrollReveal';

// Company logo imports - keep the same imports as original company.jsx
import img5 from "../../../assets/Images/company logo/aai.png";
import img6 from "../../../assets/Images/company logo/adani.png";
import img7 from "../../../assets/Images/company logo/Ananta_logo_new_ivatuw.png";
import img8 from "../../../assets/Images/company logo/aryan buildmart.png";
import img9 from "../../../assets/Images/company logo/ashiyana.jpg";
import img10 from "../../../assets/Images/company logo/b3b group.png";
import img11 from "../../../assets/Images/company logo/ceg.png";
import img12 from "../../../assets/Images/company logo/Chiripal-Logo.png";
import img13 from "../../../assets/Images/company logo/chordia.png";
import img14 from "../../../assets/Images/company logo/cityhome_logo.png";
import img15 from "../../../assets/Images/company logo/cropped-aashish-Logp-01-e1689245512900-2048x570.webp";
import img16 from "../../../assets/Images/company logo/cropped-Kedia_logo-1024x183.png";
import img17 from "../../../assets/Images/company logo/dda delhi.png";
import img18 from "../../../assets/Images/company logo/derewala.png";
import img19 from "../../../assets/Images/company logo/first india.webp";
import img20 from "../../../assets/Images/company logo/flipcart.svg";
import img21 from "../../../assets/Images/company logo/fs realty.png";
import img22 from "../../../assets/Images/company logo/galaxy.png";
import img23 from "../../../assets/Images/company logo/gkb group.png";
import img24 from "../../../assets/Images/company logo/grill-logo.png";
import img25 from "../../../assets/Images/company logo/gulshan-fashions.jpg";
import img26 from "../../../assets/Images/company logo/gyan vihar.png";
import img27 from "../../../assets/Images/company logo/hg infra.png";
import img28 from "../../../assets/Images/company logo/home land group.png";
import img29 from "../../../assets/Images/company logo/jda.png";
import img30 from "../../../assets/Images/company logo/JWM_Logo_Vertical_wRMark_4C.webp";
import img31 from "../../../assets/Images/company logo/KGK-Realty-logo.png";
import img32 from "../../../assets/Images/company logo/logo.jpg";
import img33 from "../../../assets/Images/company logo/Logo_Final-With-celebrating.png";
import img34 from "../../../assets/Images/company logo/Logo_of_Pride_Hotels_Group.png";
import img35 from "../../../assets/Images/company logo/logo-1.jpg";
import img36 from "../../../assets/Images/company logo/logo-mojikagroup.png";
import img37 from "../../../assets/Images/company logo/Logo-Saffron-Group-Web.jpg";
import img38 from "../../../assets/Images/company logo/mahimagroup_logoblue.png";
import img39 from "../../../assets/Images/company logo/mircle group.png";
import img40 from "../../../assets/Images/company logo/nirwana.webp";
//import img41 from "../../../assets/Images/company logo/om logistic.png";
import img42 from "../../../assets/Images/company logo/onerealty.webp";
//import img43 from "../../../assets/Images/company logo/oswal group.png";
//import img44 from "../../../assets/Images/company logo/patrika.png";
//import img45 from "../../../assets/Images/company logo/Pragati_300x300_High Res copy 2.png";
// import img46 from "../../../assets/Images/company logo/pratapuniversity.png";
// import img47 from "../../../assets/Images/company logo/purple-logo.png";
// import img48 from "../../../assets/Images/company logo/rana_logo.png";
// import img49 from "../../../assets/Images/company logo/Ravi-Surya-Group-Logo-1.png";
import img50 from "../../../assets/Images/company logo/reliance.png";
//import img51 from "../../../assets/Images/company logo/riico.png";
//import img52 from "../../../assets/Images/company logo/sallem papers.png";
import img53 from "../../../assets/Images/company logo/samurai.png";
//import img54 from "../../../assets/Images/company logo/saras.png";
import img55 from "../../../assets/Images/company logo/shivalik group.png";
import img56 from "../../../assets/Images/company logo/shivgyan.png";
//import img57 from "../../../assets/Images/company logo/shubhashish group.png";
import img58 from "../../../assets/Images/company logo/shyam ashish.png";
import img59 from "../../../assets/Images/company logo/Siddarth-logo-1.pdf.png";
//import img60 from "../../../assets/Images/company logo/tata.projects-logo.png";
// import img61 from "../../../assets/Images/company logo/torrent.png";
import img62 from "../../../assets/Images/company logo/UB-logo.png";
import img63 from "../../../assets/Images/company logo/urban gaon.png";
import img64 from "../../../assets/Images/company logo/vardhman.png";
import img65 from "../../../assets/Images/company logo/vidhyasharam.png";

const images = [
  img5,
  img6,
  img7,
  img8,
  img9,
  img10,
  img11,
  img12,
  img13,
  img14,
  img15,
  img16,
  img17,
  img18,
  img19,
  img20,
  img21,
  img22,
  img23,
  img24,
  img25,
  img26,
  img27,
  img28,
  img29,
  img30,
  img31,
  img32,
  img33,
  img34,
  img35,
  img36,
  img37,
  img38,
  img39,
  img40,
  // img41,
  img42,
  //img43,
  //img44,
  // img45,
  // img46,
  // img47,
  // img48,
  // img49,
  img50,
  //img51,
  //img52,
  img53,
  //img54,
  img55,
  img56,
  //img57,
  img58,
  img59,
  //img60,
  // img61,
  img62,
  img63,
  img64,
  img65,
];
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