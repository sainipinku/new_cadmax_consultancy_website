import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import heroImg from "../../../assets/Images/header/hero.jpg";
import storefrontImg from "../../../assets/Images/urbanmax/urbanmax-banner.jpg";
import "./HeroScrollSection.css";

gsap.registerPlugin(ScrollTrigger);

const STRIP_COUNT = 18;
const GOLD_COLOR = "#A8916B";
const CREAM_COLOR = "#F5F0E8";

const HeroScrollSection = () => {
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const ctaRef = useRef(null);
  const stripsContainerRef = useRef(null);
  const stripsRef = useRef([]);
  const circleRef = useRef(null);
  const circleHeadingRef = useRef(null);
  const circleLogoRef = useRef(null);
  const storefrontOverlayRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      let endDistance = isMobile ? "+=2000" : "+=3500";

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: endDistance,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
        defaults: { ease: "none" },
      });

      // --- Stage 1: Hero (0% to 25%) ---
      tl.to({}, { duration: 0.25 });

      if (isMobile) {
        // --- Mobile: Simplify blinds to straight opacity crossfade ---
        tl.addLabel("blinds", ">");
        tl.to(
          [headlineRef.current, ctaRef.current],
          { opacity: 0, y: -20, duration: 0.3 },
          "blinds"
        );
        tl.to(
          stripsContainerRef.current,
          { opacity: 1, duration: 0.3 },
          "blinds"
        );

        // Circle grow
        tl.addLabel("circleGrow", "+=0.05");
        tl.to(
          circleRef.current,
          {
            scale: 1,
            duration: 0.45,
            transformOrigin: "center bottom",
            ease: "power2.inOut",
          },
          "circleGrow"
        );

        tl.addLabel("textReveal", "circleGrow+=0.18");
        tl.to(
          [circleLogoRef.current, circleHeadingRef.current],
          {
            opacity: 1,
            y: 0,
            duration: 0.15,
            stagger: 0.05,
            ease: "power2.out",
          },
          "textReveal"
        );

        tl.addLabel("bgReveal", "circleGrow+=0.35");
        tl.to(
          storefrontOverlayRef.current,
          { opacity: 1, duration: 0.1 },
          "bgReveal"
        );
      } else {
        // --- Desktop: Full staggered strip reveal ---
        tl.addLabel("blinds", ">");
        tl.to(
          [headlineRef.current, ctaRef.current],
          { opacity: 0, y: -20, duration: 0.3 },
          "blinds"
        );
        tl.to(
          stripsRef.current,
          {
            scaleX: 1,
            duration: 0.3,
            stagger: 0.025,
            transformOrigin: "left center",
            ease: "power2.inOut",
          },
          "blinds"
        );

        // Circle grow
        tl.addLabel("circleGrow", "+=0.05");
        tl.to(
          circleRef.current,
          {
            scale: 1,
            duration: 0.45,
            transformOrigin: "center bottom",
            ease: "power2.inOut",
          },
          "circleGrow"
        );

        tl.addLabel("textReveal", "circleGrow+=0.18");
        tl.to(
          [circleLogoRef.current, circleHeadingRef.current],
          {
            opacity: 1,
            y: 0,
            duration: 0.15,
            stagger: 0.05,
            ease: "power2.out",
          },
          "textReveal"
        );

        tl.addLabel("bgReveal", "circleGrow+=0.35");
        tl.to(
          storefrontOverlayRef.current,
          { opacity: 1, duration: 0.1 },
          "bgReveal"
        );
      }
    }, sectionRef);

    ScrollTrigger.refresh();

    return () => ctx.revert();
  }, [isMobile]);

  const setStripRef = (el, index) => {
    stripsRef.current[index] = el;
  };

  return (
    <section
      ref={sectionRef}
      className="hero-scroll-section"
    >
      <div className="hero-scroll-container">

        {/* === STAGE 1 & 2: Hero Image + Gold Blinds === */}
        <div className="hero-bg-layer">
          <img
            src={heroImg}
            alt="Hero background"
            className="hero-bg-img"
            draggable={false}
          />
          <div className="hero-overlay" />
        </div>

        {/* Hero content (headline + CTA) */}
        <div className="hero-content">
          <h1
            ref={headlineRef}
            className="hero-headline"
          >
            Precision<br />Engineering
          </h1>
          <div ref={ctaRef} className="hero-cta-wrapper">
            <button className="hero-cta-btn">
              Explore Our Work
            </button>
          </div>
        </div>

        {/* Gold blinds/strips overlay */}
        <div
          ref={stripsContainerRef}
          className="hero-strips"
          style={isMobile ? { opacity: 0 } : undefined}
        >
          {Array.from({ length: STRIP_COUNT }).map((_, i) => (
            <div
              key={i}
              ref={(el) => setStripRef(el, i)}
              className="hero-strip"
              style={{
                width: `${100 / STRIP_COUNT}%`,
                backgroundColor: GOLD_COLOR,
                transform: "scaleX(0)",
                transformOrigin: "left center",
                willChange: "transform",
              }}
            />
          ))}
        </div>

        {/* === STAGE 3: Circle/Iris Reveal === */}
        {/* Storefront background image */}
        <div
          ref={storefrontOverlayRef}
          className="hero-storefront"
          style={{ opacity: 0, willChange: "opacity" }}
        >
          <img
            src={storefrontImg}
            alt="Storefront"
            className="hero-storefront-img"
            draggable={false}
          />
          <div className="hero-storefront-overlay" />
        </div>

        {/* Circle element */}
        <div
          ref={circleRef}
          className="hero-circle"
          style={{
            width: "200vw",
            height: "200vw",
            maxWidth: "200vh",
            maxHeight: "200vh",
            borderRadius: "50%",
            backgroundColor: CREAM_COLOR,
            left: "50%",
            bottom: "0",
            transform: "translateX(-50%) scale(0)",
            transformOrigin: "center bottom",
            willChange: "transform",
          }}
        >
          <div className="hero-circle-inner">
            {/* Logo icon SVG */}
            <svg
              ref={circleLogoRef}
              className="hero-circle-logo"
              width="64"
              height="64"
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ opacity: 0, willChange: "transform, opacity" }}
            >
              <circle cx="32" cy="32" r="30" stroke={GOLD_COLOR} strokeWidth="2" fill="none" />
              <path
                d="M22 32 L30 40 L42 24"
                stroke={GOLD_COLOR}
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>

            <h2
              ref={circleHeadingRef}
              className="hero-circle-heading"
              style={{
                opacity: 0,
                willChange: "transform, opacity",
                color: GOLD_COLOR,
              }}
            >
              Winnipeg's Premiere<br />Nail Spa
            </h2>
          </div>
        </div>

      </div>
    </section>
  );
};

export default HeroScrollSection;