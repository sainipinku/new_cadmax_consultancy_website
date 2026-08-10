import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useScrollReveal } from '../../../hooks/useScrollReveal';
import {
  createImageParallax,
  createDepthMotion,
} from '../../../animations/scrollMotion';

import accuracyImg from '../../../assets/Images/Other/accuracy-part.jpg.jpeg';
import './AboutSection.css';

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const sectionRef = useRef(null);
  const textRef = useScrollReveal({ start: 'top 80%' });
  const imageContainerRef = useRef(null);
  const imageImgRef = useRef(null);

  useEffect(() => {
    const container = imageContainerRef.current;
    const img = imageImgRef.current;

    if (!container || !img) return;

    const ctx = gsap.context(() => {
      // Image reveal
      gsap.set(img, {
        clipPath: 'inset(0 0 0 100%)',
      });

      gsap.to(img, {
        clipPath: 'inset(0 0 0 0%)',
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: container,
          start: 'top 85%',
          end: 'top 30%',
          scrub: 1.2,
        },
      });

      // Image parallax
      createImageParallax(img, container, {
        yPercent: 10,
        scale: 1.05,
        scrub: 1.5,
        intensity: 0.7,
      });

      // Subtle 3D depth
      createDepthMotion(container, sectionRef.current, {
        rotateX: 1.5,
        rotateY: 1.5,
        translateZ: 15,
        scale: 1.02,
        scrub: 1.5,
        intensity: 0.6,
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="about-section-home relative overflow-hidden"
    >
      {/* Decorative background */}
      <div className="about-bg-decoration" />

      <div className="about-container max-w-7xl mx-auto px-5 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 3xl:px-24">

        {/* Section Label */}
        <div className="about-eyebrow flex items-center gap-3 sm:gap-4 mb-5 sm:mb-6 lg:mb-8">
          <div className="about-eyebrow-line w-6 sm:w-8 lg:w-10 h-[1px] bg-[var(--accent)]" />

          <span className="about-eyebrow-text">
         About Cadmax
          </span>
        </div>

        {/* Main Grid */}
        <div className="about-grid grid grid-cols-1 lg:grid-cols-5 items-center">

          {/* ================= IMAGE ================= */}
          <div
            ref={imageContainerRef}
            className="about-image-column relative lg:col-span-3"
          >
            <div className="about-image-wrapper relative overflow-hidden rounded-xl sm:rounded-2xl">
              <img
                ref={imageImgRef}
                src={accuracyImg}
                alt="Cadmax Precision"
                className="about-main-image w-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
            </div>

            {/* Floating Experience Card */}
            <div className="about-experience-card absolute bg-[var(--card-foreground)] rounded-xl sm:rounded-2xl shadow-elevated border border-[var(--border)]">
              <div className="flex items-center gap-2.5 sm:gap-3">

                <div className="about-experience-number rounded-full bg-[var(--accent)] flex items-center justify-center shrink-0">
                  <span className="text-[var(--card-foreground)] font-clash font-bold">
                    26+
                  </span>
                </div>

                <div className="leading-tight">
                  <p className="about-experience-label font-general font-semibold text-[var(--card)]">
                    Years of
                  </p>

                  <p className="about-experience-label font-general text-[var(--card)]">
                    Excellence
                  </p>
                </div>

              </div>
            </div>
          </div>

          {/* ================= CONTENT ================= */}
          <div
            ref={textRef}
            className="about-content lg:col-span-2"
            data-motion="text"
          >

            {/* Heading */}
            <h2 className="about-heading font-garamond text-[var(--foreground)]">
              How CADMAX
              <br />
              <span className="text-[var(--muted-foreground)]">
                Maintains Accuracy
              </span>
            </h2>

            {/* Description */}
            <div className="about-description text-[var(--muted-foreground)] font-garamond leading-relaxed">

              <p>
                Established in 2000, Cadmax Consultancy has built a legacy of
                over 25 years in engineering, planning, and design consultancy.
                What began with specialized services in MEP Engineering Design,
                Engineering Surveys, Detailed Project Reports (DPRs), and Urban
                Planning has evolved into a multidisciplinary practice offering
                Architecture and Infrastructure Development solutions.
              </p>

              <p>
                Recognized as a leading urban planning consultancy in Rajasthan,
                Cadmax combines technical expertise, innovation, and precision
                to deliver integrated solutions for projects of every scale.
                Today, we proudly serve clients across India and internationally,
                providing sustainable, future-ready engineering and design
                services that transform ideas into resilient infrastructure and
                inspiring built environments.
              </p>

            </div>

            {/* CTA */}
            <button className="about-cta group inline-flex items-center justify-center gap-3 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-full font-general font-semibold transition-all duration-300 hover:gap-4 hover:shadow-xl">
              <span>Learn More About Us</span>

              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </button>

          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;