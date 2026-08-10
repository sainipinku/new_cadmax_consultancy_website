import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useScrollReveal } from '../../../hooks/useScrollReveal';
import { createImageParallax, createTextParallax, createDepthMotion } from '../../../animations/scrollMotion';
import accuracyImg from '../../../assets/Images/Other/accuracy-part.jpg.jpeg';
import './AboutSection.css';

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const sectionRef = useRef(null);
  const textRef = useScrollReveal({ start: 'top 80%' });
  const imageContainerRef = useRef(null);
  const imageImgRef = useRef(null);

  // Image reveal: starts clipped from left, reveals to the right on scroll
  useEffect(() => {
    const container = imageContainerRef.current;
    const img = imageImgRef.current;
    if (!container || !img) return;

    const ctx = gsap.context(() => {
      // Start with image hidden (clipped from left)
      gsap.set(img, { clipPath: 'inset(0 0 0 100%)' });
      
      // Reveal to the right smoothly on scroll
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

      // Add cinematic parallax to image
      createImageParallax(img, container, {
        yPercent: 10,
        scale: 1.05,
        scrub: 1.5,
        intensity: 0.7,
      });

      // Add subtle depth motion to image container
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
      className="relative py-8 md:py-12 lg:py-32 bg-[var(--secondary)] overflow-hidden"
    >
      {/* Background decorative element */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[var(--accent)]/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[var(--accent)]/10 rounded-full translate-y-1/2 -translate-x-1/4 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-24">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-4 md:mb-6">
          <div className="w-8 h-[1px] bg-[var(--accent)]" />
          <span className="text-xs font-general font-semibold text-[var(--accent)] uppercase tracking-[0.2em]">
            About Cadmax
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 md:gap-8 lg:gap-24 items-center">
          {/* Left - Image (3/5 width) */}
          <div ref={imageContainerRef} className="relative lg:col-span-3">
            <div className="relative overflow-hidden rounded-2xl max-md:mb-4">
              <img
                ref={imageImgRef}
                src={accuracyImg}
                alt="Cadmax Precision"
              className="w-full h-[300px] md:h-[350px] lg:h-[550px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
            {/* Floating card */}
            <div className="absolute -bottom-6 -right-6   bg-[var(--card-foreground)] rounded-2xl p-6 shadow-elevated hidden md:block border border-[var(--border)]">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[var(--accent)] flex items-center justify-center">
                  <span className="text-[var(--card-foreground)] font-clash text-lg font-bold">26+</span>
                </div>
                <div>
                  <p className="text-sm font-general font-semibold text-[var(--card)] ">Years of</p>
                  <p className="text-sm font-general text-[var(--card)]">Excellence</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Content (2/5 width) */}
          <div ref={textRef} className="space-y-4 md:space-y-6 lg:space-y-8 lg:col-span-2" data-motion="text">
            <h2 className="font-garamond text-section text-[var(--foreground)]">
              How CADMAX <br />
              <span className="text-[var(--muted-foreground)]">Maintains Accuracy</span>
            </h2>

            <div className="space-y-2 text-[var(--muted-foreground)] font-garamond leading-relaxed">
              <p>
                Established in 2000, Cadmax Consultancy has built a legacy of over 25 years in engineering, planning, and design consultancy. What began with specialized services in MEP Engineering Design, Engineering Surveys, Detailed Project Reports (DPRs), and Urban Planning has evolved into a multidisciplinary practice offering Architecture and Infrastructure Development solutions.
              </p>
              <p>
               Recognized as a leading urban planning consultancy in Rajasthan, Cadmax combines technical expertise, innovation, and precision to deliver integrated solutions for projects of every scale. Today, we proudly serve clients across India and internationally, providing sustainable, future-ready engineering and design services that transform ideas into resilient infrastructure and inspiring built environments. Our commitment to quality, integrity, and excellence continues to define every project we undertake.
              </p>
             
            </div>

            <button className="group inline-flex items-center gap-3 px-6 py-3 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-full text-sm font-general font-semibold transition-all duration-300 hover:bg-[var(--primary)] hover:gap-4 hover:shadow-xl">
              Learn More About Us
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;