import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { createHeroCinematic } from "../../../animations/scrollMotion";
import heroImage from "../../../assets/Hero-video/home_bg_img.jpeg";
gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const sectionRef = useRef(null);

  const charReveal = (text) => {
    return text.split("").map((char, i) => (
      <span
        key={`${char}-${i}`}
        className="char-mask"
        aria-hidden="true"
      >
        <span
          className="char"
          style={{
            animationDelay: `${1.4 + i * 0.08}s`,
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      </span>
    ));
  };

  const lineReveal = (text) => {
    return text.split("").map((char, i) => (
      <span key={i} className="char-mask" aria-hidden="true">
        <span
          className="char"
          style={{ animationDelay: `${3 + i * 0.015}s` }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      </span>
    ));
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      createHeroCinematic(sectionRef.current, {
        backgroundSelector: "video",
        headingSelector: "[data-hero-heading]",
        subtitleSelector: "[data-hero-subtitle]",
        ctaSelector: "[data-hero-cta]",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-[#0d0d0c]"
    >
      {/* Background Video */}
      {/* <video
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
      </video> */}
      {/* Background Image */}
      <img
        src={heroImage}
        alt="CADMAX Consultancy"
        className="absolute inset-0 h-full w-full object-cover"
      />
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/25" />

      {/* Luxury Warm Overlay */}
      <div
        className="
          absolute inset-0
          bg-gradient-to-r
          from-black/45
          via-black/10
          to-black/30
        "
      />

      {/* Bottom Gradient */}
      <div
        className="
          absolute inset-0
          bg-gradient-to-t
          from-black/80
          via-black/5
          to-black/20
        "
      />

      {/* Hero Content */}
      <div className="relative z-20 h-full w-full">

        {/* BIG CADMAX TYPOGRAPHY */}
        <div className="absolute bottom-8 left-0 w-full px-[1vw]">
          {/* BIG CADMAX TYPOGRAPHY */}
          <div
            className="
    absolute
    bottom-[5vh]
    left-[4vw]
    z-20
    w-[72vw]
    overflow-hidden

    max-lg:w-[82vw]
    max-md:bottom-[8vh]
    max-md:left-[5vw]
    max-md:w-[90vw]
  "
          >
            <h1
              data-hero-heading
              aria-label="CADMAX"
              className="
      m-0
      whitespace-nowrap
      font-garamond
      text-[clamp(70px,13vw,210px)]
      font-normal
      uppercase
      leading-[0.78]
      tracking-[-0.045em]
      text-[#f4efe5]

      drop-shadow-[0_5px_35px_rgba(0,0,0,0.35)]

      select-none
      pointer-events-none

      max-lg:text-[clamp(70px,13vw,170px)]
      max-md:text-[clamp(64px,17vw,130px)]
      max-sm:text-[clamp(54px,17vw,90px)]
    "
            >
              {charReveal("CADMAX")}
            </h1>
          </div>
        </div>

        {/* Right Caption */}
        <div
          data-hero-subtitle
          className="
            absolute
            right-[2vw]
            top-[68%]
            z-10
            max-w-[390px]
            -translate-y-1/2

            max-lg:right-[3vw]
            max-lg:top-[55%]
            max-lg:max-w-[350px]

            max-md:left-[5vw]
            max-md:right-auto
            max-md:top-[45%]
            max-md:max-w-[90%]
            max-md:-translate-y-0

            max-sm:left-[4vw]
            max-sm:top-[40%]
            max-sm:max-w-[92%]
          "
        >
          {/* Small Gold Label */}
          <div className="mb-4 flex items-center gap-3">
            <span className="h-px w-8 bg-[var(--accent)]" />

            <span
              className="
                text-[9px]
                font-semibold
                uppercase
                tracking-[0.3em]
                text-[var(--accent)]
                sm:text-[10px]
              "
            >
              Built for the future
            </span>
          </div>

          {/* Heading */}
          <h3
            className="
              font-garamond
              uppercase
              leading-[1.15]
            "
            style={{
              fontSize: "clamp(16px, 1.7vw, 26px)",
              fontStyle: "italic",
            }}
          >
            {/* Ivory */}
            <span className="text-[#f4efe5]">
              {lineReveal("ENGINEERING EXCELLENCE")}
            </span>

            <br />

            {/* Gold Highlight */}
            <span className="text-[var(--accent)]">
              {lineReveal("ARCHITECTURAL INNOVATION")}
            </span>

            <br />

            {/* Ivory */}
            <span className="text-[#f4efe5]">
              {lineReveal("GLOBAL IMPACT")}
            </span>
          </h3>

          {/* Divider */}
          <div className="my-5 h-px w-full bg-[#f4efe5]/20" />

          {/* Description */}
          <p
            className="
              text-[12px]
              font-light
              leading-[1.7]
              text-[#f4efe5]/70

              max-lg:text-[clamp(13px,1.5vw,16px)]
              max-lg:leading-[1.8]

              max-md:text-[clamp(12px,3.2vw,15px)]
              max-md:leading-[1.6]

              max-sm:mt-[12px]
              max-sm:text-[clamp(10px,3vw,12px)]
            "
            style={{
              opacity: "0",
              transform: "translateY(20px)",
              animation:
                "heroFadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) 3.5s forwards",
            }}
          >
            For over 25 years, CADMAX Consultancy has delivered integrated
            solutions in engineering, architecture, urban planning, and
            infrastructure development—transforming ideas into sustainable,
            future-ready projects across India and around the world.
          </p>
        </div>
      </div>

      {/* Animations */}
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
          animation: charReveal 0.7s
            cubic-bezier(0.16, 1, 0.3, 1) forwards;
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