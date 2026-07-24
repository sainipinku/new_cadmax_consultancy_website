import React from "react";

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
          <h1 
            className="font-garamond text-white uppercase"
            style={{
              fontSize: 'clamp(80px, 16vw, 310px)',
              fontWeight: '500',
              lineHeight: '0.75',
              letterSpacing: '-8px',
              textShadow: '0 5px 40px rgba(0, 0, 0, 0.35)'
            }}
            aria-label="CADMAX"
          >
            {charReveal("CADMAX")}
          </h1>
        </div>

        {/* Right Caption */}
        <div 
          className="absolute right-[2vw] top-[75%] -translate-y-1/2 max-w-[320px] z-10
                     max-lg:right-[3vw] max-lg:top-[55%] max-lg:max-w-[350px]
                     max-md:right-auto max-md:left-[5vw] max-md:top-[22%] max-md:-translate-y-0 max-md:max-w-[90%]
                     max-sm:top-[20%] max-sm:left-[4vw] max-sm:max-w-[92%]"
        >
          <h3 
            className="font-garamond text-white uppercase"
            style={{
              fontSize: 'clamp(18px, 1.9vw, 34px)',
              fontStyle: 'italic',
              lineHeight: '1.1'
            }}
            aria-label="ENGINEERING EXCELLENCE WITH COMPLETE PRECISION"
          >
            {lineReveal("ENGINEERING EXCELLENCE")}
            <br />
            {lineReveal("WITH COMPLETE")}
            {lineReveal("PRECISION")}
          </h3>

          <p 
            className="mt-[18px] text-white font-light leading-[1.7] text-[12px]
                       max-lg:text-[clamp(13px,1.5vw,16px)] max-lg:leading-[1.8]
                       max-md:text-[clamp(12px,3.2vw,15px)] max-md:leading-[1.6]
                       max-sm:text-[clamp(10px,3vw,12px)] max-sm:mt-[12px]"
            style={{
              opacity: '0',
              transform: 'translateY(20px)',
              animation: 'heroFadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) 3.5s forwards'
            }}
          >
            Cadmax Consultancy delivers premium land surveying,
            engineering consultancy and geospatial solutions with
            unmatched precision. From DGPS, topographical and engineering
            surveys to GIS mapping and infrastructure planning, we provide
            reliable insights that empower confident decisions.
          </p>
        </div>

      </div>

      {/* Custom Animations */}
      <style jsx>{`
        .char-mask {
          position: relative;
          display: inline-block;
          overflow: hidden;
          vertical-align: top;
          line-height: inherit;
          font-family: inherit;
        }

        .char {
          position: relative;
          display: inline-block;
          transform: translateY(110%);
          opacity: 0;
          animation: charReveal 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          font-family: inherit;
        }

        @keyframes charReveal {
          0% {
            transform: translateY(110%);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .hero-right-caption .char-mask {
          display: inline;
          overflow: visible;
        }

        .hero-right-caption .char {
          display: inline;
          transform: translateY(60%);
          animation: charReveal 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes heroFadeIn {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 768px) {
          .char {
            animation-duration: 0.5s;
          }
        }
      `}</style>

    </section>
  );
};

export default HeroSection;
