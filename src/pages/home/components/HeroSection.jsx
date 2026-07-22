import React from "react";
import "./HeroSection.css";

const HeroSection = () => {

  // Helper: split text into characters wrapped in mask divs
  const charReveal = (text) => {
    return text.split("").map((char, i) => (
      <span key={i} className="char-mask" aria-hidden="true">
        <span className="char" style={{ animationDelay: `${2 + i * 0.04}s` }}>
          {char === " " ? "\u00A0" : char}
        </span>
      </span>
    ));
  };

  // For lines that should reveal line-by-line instead of char-by-char
  const lineReveal = (text) => {
    return text.split("").map((char, i) => (
      <span key={i} className="char-mask" aria-hidden="true">
        <span className="char" style={{ animationDelay: `${3 + i * 0.015}s` }}>
          {char === " " ? "\u00A0" : char}
        </span>
      </span>
    ));
  };

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">

      {/* Background Video */}
      <video
        autoPlay
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
        onEnded={(e) => e.target.pause()}
      >
        <source
          src={require("../../../assets/Hero-video/Hero-video.mp4")}
          type="video/mp4"
        />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/10"></div>

      {/* Bottom Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/5 to-black/10"></div>

      {/* Hero Content */}
      <div className="relative z-20 h-full w-full">

        {/* BIG TYPOGRAPHY */}
        <div className="absolute bottom-8 left-0 w-full px-[3vw]">

          <h1 className="hero-title" aria-label="CADMAX">
            {charReveal("CADMAX")}
          </h1>

         

        </div>

       {/* Right Caption */}
<div className="hero-right-caption">

  <h3 className="hero-right-title" aria-label="ENGINEERING EXCELLENCE WITH COMPLETE PRECISION">
    {lineReveal("ENGINEERING EXCELLENCE")}
    <br />
    {lineReveal("WITH COMPLETE")}
    
    {lineReveal("PRECISION")}
  </h3>

  <p className="hero-right-text">
    Cadmax Consultancy delivers premium land surveying,
    engineering consultancy and geospatial solutions with
    unmatched precision. From DGPS, topographical and engineering
    surveys to GIS mapping and infrastructure planning, we provide
    reliable insights that empower confident decisions.
  </p>

</div>

      </div>

    </section>
  );
};

export default HeroSection;