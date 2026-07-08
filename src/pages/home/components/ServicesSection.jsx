import React, { useRef, useEffect, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import heroImg from '../../../assets/Images/Other/dgps-survey.png';
import floatImg from '../../../assets/Images/Other/dgps-survey1.png';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: 'dgps',
    number: '01',
    title: 'DGPS Survey',
    tagline: 'Centimeter-level precision',
    description: 'High-precision Differential GPS surveying for accurate land measurement and boundary determination.',
  },
  {
    id: 'topographical',
    number: '02',
    title: 'Topographical Survey',
    tagline: 'Detailed terrain intelligence',
    description: 'Comprehensive terrain mapping and elevation data collection for informed design and planning decisions.',
  },
  {
    id: 'engineering',
    number: '03',
    title: 'Engineering Survey',
    tagline: 'Built on precise data',
    description: 'Professional engineering surveys supporting infrastructure and construction projects.',
  },
  {
    id: 'land',
    number: '04',
    title: 'Land Surveying',
    tagline: 'Defining boundaries with accuracy',
    description: 'Expert land surveying services for property boundaries, subdivisions, and development projects.',
  },
  {
    id: 'gis',
    number: '05',
    title: 'Mobile Mapping & GIS',
    tagline: 'Data-driven spatial solutions',
    description: 'Advanced mobile mapping solutions integrated with GIS for comprehensive spatial data analysis.',
  },
  {
    id: 'planning',
    number: '06',
    title: 'Planning & Design',
    tagline: 'Strategic vision, practical execution',
    description: 'Strategic planning and architectural design services for sustainable development.',
  },
];

const ACCENT = '#CAAA79';
const TOTAL_SERVICES = services.length;

// ─── Grain overlay SVG (tiny noise texture) ────────────────────
const GrainOverlay = () => (
  <div className="absolute inset-0 pointer-events-none z-30 mix-blend-overlay opacity-[0.015]">
    <svg className="w-full h-full">
      <filter id="grain">
        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#grain)" />
    </svg>
  </div>
);

// ─── Component ──────────────────────────────────────────────────
const ServicesSection = () => {
  const sectionRef = useRef(null);
  const pinWrapRef = useRef(null);
  const leftPanelRef = useRef(null);

  // Left side layer refs
  const heroWrapRef = useRef(null);
  const heroClipRef = useRef(null);
  const heroImgRef = useRef(null);
  const heroOverlayRef = useRef(null);
  const floatWrapRef = useRef(null);
  const floatImgRef = useRef(null);
  const glassRef = useRef(null);
  const shadowRef = useRef(null);
  const progressRef = useRef(null);
  const sectionIndexRef = useRef(null);
  const radialBgRef = useRef(null);
  const accentLineRef = useRef(null);

  // Right side refs
  const rightPanelRef = useRef(null);
  const itemsRef = useRef([]);
  const numbersRef = useRef([]);
  const titlesRef = useRef([]);
  const taglinesRef = useRef([]);
  const descsRef = useRef([]);
  const dividersRef = useRef([]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(true);

  const checkScreen = useCallback(() => {
    setIsDesktop(window.innerWidth >= 1024);
  }, []);

  useEffect(() => {
    checkScreen();
    window.addEventListener('resize', checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
  }, [checkScreen]);

  // ─── Main GSAP ──────────────────────────────────────────────
  useEffect(() => {
    if (!isDesktop) return;

    let prevIndex = 0;

    const ctx = gsap.context(() => {
      // ── Pin ──
      ScrollTrigger.create({
        trigger: pinWrapRef.current,
        start: 'top top',
        end: () => `+=${pinWrapRef.current.offsetHeight - window.innerHeight}`,
        pin: leftPanelRef.current,
        pinSpacing: false,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      });

      // ── Progress ──
      gsap.set(progressRef.current, { scaleY: 0, transformOrigin: 'top center' });
      ScrollTrigger.create({
        trigger: pinWrapRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.5,
        onUpdate: (self) => {
          gsap.to(progressRef.current, { scaleY: self.progress, duration: 0.1 });
        },
      });

      // ── Section label entrance ──
      gsap.fromTo(
        [sectionIndexRef.current, accentLineRef.current],
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 1.2, ease: 'power3.out', stagger: 0.15,
          scrollTrigger: {
            trigger: sectionIndexRef.current,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // ── Per-service triggers ──
      itemsRef.current.forEach((item, i) => {
        if (!item) return;

        const tl = gsap.timeline({ paused: true });
        const tlLeave = gsap.timeline({ paused: true });

        // ── BUILD ENTER TIMELINE ──
        // Hero image: clip-path from bottom + scale + brightness flash
        tl
          .set(heroClipRef.current, { clipPath: 'inset(100% 0% 0% 0%)' })
          .set(heroImgRef.current, { scale: 1.15 })
          .to(heroClipRef.current, {
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 1.4,
            ease: 'power3.inOut',
          }, 0)
          .to(heroImgRef.current, {
            scale: 1,
            duration: 1.8,
            ease: 'power4.out',
          }, 0)
          // Brightness flash
          .to(heroImgRef.current, {
            filter: 'brightness(1.6) contrast(1.2) saturate(1.1)',
            duration: 0.6,
            ease: 'power2.out',
          }, 0)
          .to(heroImgRef.current, {
            filter: 'brightness(0.85) contrast(1.1) saturate(0.9)',
            duration: 1.2,
            ease: 'power3.out',
          }, 0.5)
          // Overlay
          .set(heroOverlayRef.current, { opacity: 0.5 })
          .to(heroOverlayRef.current, {
            opacity: 0,
            duration: 1.4,
            ease: 'power3.out',
          }, 0.3)
          // Glass backdrop
          .set(glassRef.current, { opacity: 0, scale: 0.9 })
          .to(glassRef.current, {
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: 'power3.out',
          }, 0.4)
          // Shadow
          .set(shadowRef.current, { opacity: 0 })
          .to(shadowRef.current, {
            opacity: 0.6,
            duration: 0.8,
            ease: 'power2.out',
          }, 0.5)
          // Floating image entrance — clip-path from right + scale + slight rotation
          .set(floatWrapRef.current, { clipPath: 'inset(0% 0% 0% 100%)', opacity: 0 })
          .to(floatWrapRef.current, {
            clipPath: 'inset(0% 0% 0% 0%)',
            opacity: 1,
            duration: 1.2,
            ease: 'power3.inOut',
          }, 0.6)
          .to(floatImgRef.current, {
            rotation: 0,
            duration: 1.2,
            ease: 'power3.out',
          }, 0.7)
          // Radial background shift
          .to(radialBgRef.current, {
            backgroundPosition: `${30 + (i / TOTAL_SERVICES) * 40}% ${40 + (i / TOTAL_SERVICES) * 30}%`,
            duration: 1.6,
            ease: 'power3.out',
          }, 0);

        // ── BUILD LEAVE TIMELINE ──
        tlLeave
          .to(heroClipRef.current, {
            clipPath: 'inset(0% 0% 100% 0%)',
            duration: 1,
            ease: 'power3.inOut',
          }, 0)
          .to(heroImgRef.current, {
            scale: 1.1,
            filter: 'brightness(1.3) blur(6px)',
            duration: 0.8,
            ease: 'power2.in',
          }, 0)
          .to(floatWrapRef.current, {
            clipPath: 'inset(0% 100% 0% 0%)',
            opacity: 0.3,
            duration: 0.8,
            ease: 'power3.inOut',
          }, 0.1)
          .to(glassRef.current, {
            opacity: 0,
            scale: 0.9,
            duration: 0.6,
            ease: 'power2.in',
          }, 0.1)
          .to(shadowRef.current, {
            opacity: 0,
            duration: 0.5,
            ease: 'power2.in',
          }, 0.1);

        // ── Right side text timeline ──
        const textTl = gsap.timeline({ paused: true });
        textTl
          .to(numbersRef.current[i], {
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: 'power3.out',
          }, 0)
          .to(titlesRef.current[i], {
            color: ACCENT,
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
          }, 0.1)
          .to(taglinesRef.current[i], {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
          }, 0.2)
          .to(descsRef.current[i], {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
          }, 0.3)
          .to(dividersRef.current[i], {
            scaleX: 1,
            duration: 1.2,
            ease: 'power3.inOut',
          }, 0.25);

        // ── ScrollTrigger ──
        const trigger = ScrollTrigger.create({
          trigger: item,
          start: 'top 55%',
          end: 'top 25%',
          onEnter: () => {
            setActiveIndex(i);
            if (prevIndex !== i) {
              prevIndex = i;
            }
            tl.play(0);
            textTl.play(0);
            // Deactivate others
            itemsRef.current.forEach((_, j) => {
              if (j === i) return;
              gsap.to(numbersRef.current[j], { opacity: 0.15, scale: 0.85, duration: 0.6, ease: 'power2.out' });
              gsap.to(titlesRef.current[j], { color: '#444444', y: 4, opacity: 0.4, duration: 0.6, ease: 'power2.out' });
              gsap.to(taglinesRef.current[j], { opacity: 0, y: 8, duration: 0.5, ease: 'power2.out' });
              gsap.to(descsRef.current[j], { opacity: 0, y: 12, duration: 0.5, ease: 'power2.out' });
              gsap.to(dividersRef.current[j], { scaleX: 0, duration: 0.6, ease: 'power2.inOut' });
            });
          },
          onEnterBack: () => {
            setActiveIndex(i);
            if (prevIndex !== i) {
              prevIndex = i;
            }
            tl.play(0);
            textTl.play(0);
            itemsRef.current.forEach((_, j) => {
              if (j === i) return;
              gsap.to(numbersRef.current[j], { opacity: 0.15, scale: 0.85, duration: 0.6, ease: 'power2.out' });
              gsap.to(titlesRef.current[j], { color: '#444444', y: 4, opacity: 0.4, duration: 0.6, ease: 'power2.out' });
              gsap.to(taglinesRef.current[j], { opacity: 0, y: -8, duration: 0.5, ease: 'power2.out' });
              gsap.to(descsRef.current[j], { opacity: 0, y: -12, duration: 0.5, ease: 'power2.out' });
              gsap.to(dividersRef.current[j], { scaleX: 0, duration: 0.6, ease: 'power2.inOut' });
            });
          },
          onLeave: () => {
            if (i === TOTAL_SERVICES - 1) return;
            tlLeave.play(0);
          },
          onLeaveBack: () => {
            if (i === 0) return;
            tlLeave.play(0);
          },
        });

        // Set initial states
        gsap.set(numbersRef.current[i], { opacity: 0.15, scale: 0.85 });
        gsap.set(titlesRef.current[i], { color: '#444444', y: 4, opacity: 0.4 });
        gsap.set(taglinesRef.current[i], { opacity: 0, y: 8 });
        gsap.set(descsRef.current[i], { opacity: 0, y: 12 });
        gsap.set(dividersRef.current[i], { scaleX: 0, transformOrigin: 'left center' });
      });

      // Set initial collage state for first item on page load (no scroll trigger)
      // This is handled by the first scroll trigger onEnter
      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, [isDesktop]);

  // ─── Render ──────────────────────────────────────────────────
  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ backgroundColor: ' #e0cfb4' }}
    >
      {/* Subtle radial gradient background */}
      <div
        ref={radialBgRef}
        className="fixed inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 30% 40%, rgba(202,170,121,0.03) 0%, transparent 60%),
            radial-gradient(ellipse 60% 50% at 70% 60%, rgba(255,255,255,0.02) 0%, transparent 50%)
          `,
          backgroundSize: '100% 100%',
          backgroundPosition: '30% 40%',
          transition: 'background-position 1.6s cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      />

      {/* Grain overlay */}
      <GrainOverlay />

      {/* ─── Desktop Layout ─── */}
      {isDesktop ? (
        <div ref={pinWrapRef} className="relative flex" style={{ minHeight: `${TOTAL_SERVICES * 110}vh` }}>
          {/* ===== LEFT: Editorial Collage ===== */}
          <div
            ref={leftPanelRef}
            className="relative overflow-hidden will-change-transform"
            style={{ width: '42%', height: '80vh', top: '10vh' }}
          >
            {/* Hero Image */}
            <div
              ref={heroWrapRef}
              className="absolute inset-0"
            >
              <div
                ref={heroClipRef}
                className="absolute inset-0"
                style={{ clipPath: 'inset(100% 0% 0% 0%)' }}
              >
                <img
                  ref={heroImgRef}
                  src={heroImg}
                  alt=""
                  className="absolute w-full h-full object-cover will-change-transform"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectPosition: '50% 30%',
                    filter: 'brightness(0.85) contrast(1.1) saturate(0.9)',
                    transform: 'scale(1.15)',
                  }}
                />

                {/* Multi-layer gradient overlay */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: `
                      linear-gradient(135deg, rgba(0,0,0,0.45) 0%, transparent 45%),
                      linear-gradient(0deg, rgba(0,0,0,0.7) 0%, transparent 50%),
                      linear-gradient(180deg, rgba(0,0,0,0.25) 0%, transparent 35%)
                    `,
                  }}
                />

                {/* Gold overlay flash */}
                <div
                  ref={heroOverlayRef}
                  className="absolute inset-0 pointer-events-none"
                  style={{ backgroundColor: ACCENT, opacity: 0 }}
                />
              </div>
            </div>

            {/* Glass backdrop behind floating image */}
            <div
              ref={glassRef}
              className="absolute pointer-events-none z-10"
              style={{
                top: '14%',
                right: '-2%',
                width: '32%',
                height: '28%',
                background: 'rgba(202, 170, 121, 0.05)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                borderRadius: '28px',
                border: '1px solid rgba(202, 170, 121, 0.08)',
                opacity: 0,
                transform: 'scale(0.9)',
              }}
            />

            {/* Shadow under floating image */}
            <div
              ref={shadowRef}
              className="absolute pointer-events-none z-10"
              style={{
                top: '15%',
                right: '-1%',
                width: '30%',
                height: '26%',
                background: 'rgba(0,0,0,0.5)',
                borderRadius: '24px',
                filter: 'blur(40px)',
                opacity: 0,
              }}
            />

            {/* Floating Image */}
            <div
              ref={floatWrapRef}
              className="absolute z-20 overflow-hidden will-change-transform"
              style={{
                top: '14%',
                right: '-2%',
                width: '32%',
                height: '28%',
                borderRadius: '28px',
                border: '1px solid rgba(202, 170, 121, 0.12)',
                boxShadow: '0 30px 80px rgba(0,0,0,0.6)',
                clipPath: 'inset(0% 0% 0% 100%)',
                opacity: 0,
              }}
            >
              <img
                ref={floatImgRef}
                src={floatImg}
                alt=""
                className="w-full h-full object-cover will-change-transform"
                style={{
                  objectPosition: '50% 35%',
                  filter: 'brightness(0.9) contrast(1.05) saturate(0.95)',
                  transform: 'rotate(-2deg) scale(1.08)',
                }}
              />
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(135deg, rgba(202,170,121,0.06) 0%, transparent 50%)',
                }}
              />
            </div>

            {/* Decorative concentric rings */}
            <div
              className="absolute pointer-events-none z-10"
              style={{
                top: '5%',
                right: '5%',
                width: '80px',
                height: '80px',
                border: '1px solid rgba(202, 170, 121, 0.1)',
                borderRadius: '50%',
              }}
            />
            <div
              className="absolute pointer-events-none z-10"
              style={{
                top: 'calc(5% + 10px)',
                right: 'calc(5% + 10px)',
                width: '60px',
                height: '60px',
                border: '1px solid rgba(202, 170, 121, 0.06)',
                borderRadius: '50%',
              }}
            />
            <div
              className="absolute pointer-events-none z-10"
              style={{
                top: 'calc(5% + 20px)',
                right: 'calc(5% + 20px)',
                width: '40px',
                height: '40px',
                border: '1px solid rgba(202, 170, 121, 0.04)',
                borderRadius: '50%',
              }}
            />

            {/* Bottom fade */}
            <div
              className="absolute bottom-0 left-0 right-0 pointer-events-none z-10"
              style={{
                height: '35%',
                background: 'linear-gradient(0deg, #0a0a0a 0%, transparent 100%)',
              }}
            />

            {/* Section label */}
            <div className="absolute bottom-14 left-12 z-20">
              <div
                ref={accentLineRef}
                className="flex items-center gap-4 mb-4"
              >
                <div
                  className="w-10 h-px"
                  style={{ backgroundColor: ACCENT }}
                />
                <span
                  className="text-[10px] font-inter font-medium tracking-[0.3em] uppercase"
                  style={{ color: ACCENT }}
                >
                  Our Services
                </span>
              </div>
              <h2
                className="font-clash text-4xl font-semibold text-white leading-[1.05]"
                style={{ letterSpacing: '-0.03em' }}
              >
                Precision<br />
                <span style={{ color: ACCENT }}>Engineering</span>
              </h2>
            </div>

            {/* Progress indicator */}
            <div
              ref={progressRef}
              className="absolute right-0 top-0 w-[2px] h-full z-20 origin-top"
              style={{
                background: `linear-gradient(180deg, ${ACCENT} 0%, ${ACCENT}77 100%)`,
                transform: 'scaleY(0)',
              }}
            />

            {/* Active index */}
            <div
              ref={sectionIndexRef}
              className="absolute top-14 right-14 z-20 font-clash font-bold leading-none"
              style={{
                color: 'rgba(202,170,121,0.06)',
                fontSize: 'clamp(5rem, 10vw, 10rem)',
              }}
            >
              {String(activeIndex + 1).padStart(2, '0')}
            </div>
          </div>

          {/* ===== RIGHT: Editorial Typography ===== */}
          <div
            ref={rightPanelRef}
            className="relative z-10"
            style={{ width: '45%', padding: '0 5vw 0 4.5vw' }}
          >
            {/* Spacer top */}
            <div style={{ height: '35vh' }} />

            {services.map((service, i) => (
              <div
                key={service.id}
                ref={(el) => (itemsRef.current[i] = el)}
                className="relative"
                style={{ marginBottom: i === TOTAL_SERVICES - 1 ? '45vh' : '28vh' }}
              >
                {/* Number */}
                <div
                  ref={(el) => (numbersRef.current[i] = el)}
                  className="font-clash font-bold leading-none mb-5"
                  style={{
                    fontSize: 'clamp(4rem, 7vw, 8rem)',
                    color: 'rgba(202, 170, 121, 0.08)',
                    letterSpacing: '-0.05em',
                    opacity: 0.15,
                    transform: 'scale(0.85)',
                  }}
                >
                  {service.number}
                </div>

                {/* Title */}
                <h3
                  ref={(el) => (titlesRef.current[i] = el)}
                  className="font-clash font-semibold leading-[1.05] mb-4"
                  style={{
                    fontSize: 'clamp(2rem, 4vw, 3.6rem)',
                    color: '#444444',
                    letterSpacing: '-0.025em',
                    opacity: 0.4,
                    transform: 'translateY(4px)',
                  }}
                >
                  {service.title}
                </h3>

                {/* Tagline */}
                <p
                  ref={(el) => (taglinesRef.current[i] = el)}
                  className="font-inter text-sm font-medium mb-4"
                  style={{
                    color: ACCENT,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    opacity: 0,
                    transform: 'translateY(8px)',
                  }}
                >
                  {service.tagline}
                </p>

                {/* Description */}
                <p
                  ref={(el) => (descsRef.current[i] = el)}
                  className="font-inter leading-relaxed"
                  style={{
                    color: 'rgba(255,255,255,0.4)',
                    fontSize: 'clamp(0.875rem, 1.1vw, 1.05rem)',
                    lineHeight: '1.8',
                    maxWidth: '400px',
                    opacity: 0,
                    transform: 'translateY(12px)',
                  }}
                >
                  {service.description}
                </p>

                {/* Divider */}
                <div
                  ref={(el) => (dividersRef.current[i] = el)}
                  className="mt-10 h-px"
                  style={{
                    background: `linear-gradient(90deg, ${ACCENT}33 0%, transparent 100%)`,
                    width: '100%',
                    maxWidth: '280px',
                    transform: 'scaleX(0)',
                    transformOrigin: 'left center',
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* ─── Mobile / Tablet ─── */
        <div className="relative px-5 sm:px-8 py-16 sm:py-20">
          <div className="mb-12 sm:mb-16">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-6 h-px" style={{ backgroundColor: ACCENT }} />
              <span
                className="text-[10px] font-inter font-semibold tracking-[0.2em] uppercase"
                style={{ color: ACCENT }}
              >
                Our Services
              </span>
            </div>
            <h2
              className="font-clash text-2xl sm:text-3xl font-semibold text-white leading-tight"
              style={{ letterSpacing: '-0.02em' }}
            >
              Precision<br />
              <span style={{ color: ACCENT }}>Engineering</span>
            </h2>
          </div>

          <div className="space-y-24 sm:space-y-28">
            {services.map((service, i) => (
              <div key={service.id} className="group">
                {/* Image collage */}
                <div className="relative mb-7">
                  <div
                    className="w-full overflow-hidden rounded-[20px]"
                    style={{ aspectRatio: '4/3' }}
                  >
                    <img
                      src={heroImg}
                      alt={service.title}
                      className="w-full h-full object-cover"
                      style={{
                        objectPosition: '50% 30%',
                        filter: 'brightness(0.8) contrast(1.1)',
                      }}
                    />
                    <div
                      className="absolute inset-0 rounded-[20px]"
                      style={{
                        background: 'linear-gradient(0deg, rgba(0,0,0,0.6) 0%, transparent 50%)',
                      }}
                    />
                  </div>
                  <div
                    className="absolute -bottom-4 -right-3 w-[45%] overflow-hidden rounded-[16px] shadow-2xl"
                    style={{ aspectRatio: '3/2' }}
                  >
                    <img
                      src={floatImg}
                      alt=""
                      className="w-full h-full object-cover"
                      style={{
                        objectPosition: '50% 35%',
                        filter: 'brightness(0.85) contrast(1.05)',
                      }}
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background: 'linear-gradient(135deg, rgba(202,170,121,0.08) 0%, transparent 60%)',
                      }}
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="relative">
                  <div
                    className="font-clash font-bold leading-none mb-3"
                    style={{
                      fontSize: 'clamp(3rem, 10vw, 5rem)',
                      color: 'rgba(202, 170, 121, 0.1)',
                      letterSpacing: '-0.05em',
                    }}
                  >
                    {service.number}
                  </div>
                  <h3
                    className="font-clash font-semibold text-white text-xl sm:text-2xl mb-2 leading-tight"
                    style={{ letterSpacing: '-0.025em' }}
                  >
                    {service.title}
                  </h3>
                  <p
                    className="font-inter text-xs sm:text-sm font-medium mb-3"
                    style={{
                      color: ACCENT,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                    }}
                  >
                    {service.tagline}
                  </p>
                  <p
                    className="font-inter text-sm leading-relaxed"
                    style={{ color: 'rgba(255,255,255,0.4)', lineHeight: '1.8' }}
                  >
                    {service.description}
                  </p>
                  <div
                    className="mt-6 h-px"
                    style={{
                      background: `linear-gradient(90deg, ${ACCENT}33 0%, transparent 100%)`,
                      width: '100%',
                      maxWidth: '180px',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default ServicesSection;