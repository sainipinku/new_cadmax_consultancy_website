import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useScrollReveal } from '../../../hooks/useScrollReveal';
import accuracyImg from '../../../assets/Images/Other/accuracy-part.jpg.jpeg';
import './AboutSection.css';

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const sectionRef = useRef(null);
  const textRef = useScrollReveal({ start: 'top 80%' });
  const imageContainerRef = useRef(null);
  const imageImgRef = useRef(null);
  const counterRefs = useRef([]);
  const statsRef = useRef(null);

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
    });

    return () => ctx.revert();
  }, []);

  const stats = [
    { label: 'Projects Delivered', value: 500, suffix: '+' },
    { label: 'Years Experience', value: 26, suffix: '+' },
    { label: 'Happy Clients', value: 200, suffix: '+' },
    { label: 'Team Members', value: 80, suffix: '+' },
  ];

  useEffect(() => {
    const counters = counterRefs.current.filter(Boolean);
    if (!counters.length || !statsRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: statsRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });

      counters.forEach((counter) => {
        const target = parseInt(counter.dataset.value, 10);
        const obj = { val: 0 };
        tl.to(
          obj,
          {
            val: target,
            duration: 2,
            ease: 'power2.out',
            onUpdate: () => {
              counter.textContent = Math.round(obj.val).toLocaleString();
            },
          },
          0
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-[var(--secondary)] overflow-hidden"
    >
      {/* Background decorative element */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[var(--accent)]/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[var(--accent)]/10 rounded-full translate-y-1/2 -translate-x-1/4 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-8 h-[1px] bg-[var(--accent)]" />
          <span className="text-xs font-general font-semibold text-[var(--accent)] uppercase tracking-[0.2em]">
            About Cadmax
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left - Image */}
          <div ref={imageContainerRef} className="relative">
            <div className="relative overflow-hidden rounded-2xl">
              <img
                ref={imageImgRef}
                src={accuracyImg}
                alt="Cadmax Precision"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
            {/* Floating card */}
            <div className="absolute -bottom-6 -right-6 bg-[var(--card)] rounded-2xl p-6 shadow-elevated hidden md:block border border-[var(--border)]">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[var(--accent)] flex items-center justify-center">
                  <span className="text-[var(--card-foreground)] font-clash text-lg font-bold">26+</span>
                </div>
                <div>
                  <p className="text-sm font-general font-semibold text-[var(--card-foreground)]">Years of</p>
                  <p className="text-sm font-general text-[var(--muted-foreground)]">Excellence</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Content */}
          <div ref={textRef} className="space-y-8">
            <h2 className="font-clash text-section text-[var(--foreground)]">
              How CADMAX <br />
              <span className="text-[var(--muted-foreground)]">Maintains Accuracy</span>
            </h2>

            <div className="space-y-4 text-[var(--muted-foreground)] font-inter leading-relaxed">
              <p>
                We build trust before we build structures. That's the CadMax difference. 
                Customers choose CadMax because we turn complex ideas into precise, 
                buildable designs on time, every time.
              </p>
              <p>
                CadMax is where accuracy meets creativity and is trusted by clients who 
                value quality, innovation and flawless execution. We don't just design 
                spaces, CadMax designs solutions.
              </p>
              <p>
                From 2D to 3D perfection, customers choose CadMax for designs that are 
                accurate, clear and construction-ready because CadMax delivers plans that 
                save time, reduce errors and cut construction costs.
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

        {/* Stats */}
        <div
          ref={statsRef}
          className="mt-12 md:mt-6 pt-16 md:pt-24 relative"
        >
          {/* Row 1: Stats 2 & 3 on top right */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8 mb-4 md:mb-6">
            {/* Empty left space on desktop */}
            <div className="hidden md:block"></div>
            
            {/* Stats 2 & 3 - Right side */}
            <div className="grid grid-cols-2 gap-4 md:gap-6">
              {/* Stat 2 - Years Experience */}
              <div className="about-stat-item group">
                <div className="about-stats-number-wrapper transition-all duration-350 ease-out group-hover:scale-[1.03]">
                  <span className="about-stats-number">
                    <span
                      ref={(el) => (counterRefs.current[1] = el)}
                      data-value={stats[1].value}
                    >
                      0
                    </span>
                    <svg className="about-stats-suffix-icon" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                    </svg>
                  </span>
                </div>
                <p className="about-stats-text">{stats[1].label}</p>
              </div>

              {/* Stat 3 - Happy Clients */}
              <div className="about-stat-item group">
                <div className="about-stats-number-wrapper transition-all duration-350 ease-out group-hover:scale-[1.03]">
                  <span className="about-stats-number">
                    <span
                      ref={(el) => (counterRefs.current[2] = el)}
                      data-value={stats[2].value}
                    >
                      0
                    </span>
                    <svg className="about-stats-suffix-icon" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                    </svg>
                  </span>
                </div>
                <p className="about-stats-text">{stats[2].label}</p>
              </div>
            </div>
          </div>

          {/* Row 2: Stat 1 (500+) centered */}
          <div className="flex justify-center md:justify-start mb-4 md:mb-6">
            <div className="about-stat-item group">
              <div className="about-stats-number-wrapper transition-all duration-350 ease-out group-hover:scale-[1.03]">
                <span className="about-stats-number">
                  <span
                    ref={(el) => (counterRefs.current[0] = el)}
                    data-value={stats[0].value}
                  >
                    0
                  </span>
                  <svg className="about-stats-suffix-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                  </svg>
                </span>
              </div>
              <p className="about-stats-text">{stats[0].label}</p>
            </div>
          </div>

          {/* Row 3: Stat 4 (80+ Team Members) centered below */}
          <div className="flex justify-center">
            <div className="about-stat-item group">
              <div className="about-stats-number-wrapper transition-all duration-350 ease-out group-hover:scale-[1.03]">
                <span className="about-stats-number">
                  <span
                    ref={(el) => (counterRefs.current[3] = el)}
                    data-value={stats[3].value}
                  >
                    0
                  </span>
                  <svg className="about-stats-suffix-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                  </svg>
                </span>
              </div>
              <p className="about-stats-text">{stats[3].label}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;