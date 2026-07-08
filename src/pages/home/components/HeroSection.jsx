import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import heroImg from '../../../assets/Images/header/hero.jpg';
import { MoveRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const textLinesRef = useRef([]);
  const ctaRef = useRef(null);
  const imageRef = useRef(null);
  const overlayRef = useRef(null);
  const badgeRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=2000',
          scrub: 0.5,
          pin: true,
          anticipatePin: 1,
          // Lower z-index when menu might be open
          pinSpacing: true,
        },
        defaults: { ease: 'power2.out' },
      });

      // Initial entrance
      tl.fromTo(
        textLinesRef.current,
        { y: 120, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.15 },
        0
      )
        .fromTo(
          ctaRef.current,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          0.6
        )
        .fromTo(
          badgeRef.current,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.7)' },
          0.4
        );

      // Parallax image movement during scroll
      tl.to(
        imageRef.current,
        { scale: 0.9, duration: 2 },
        1
      );

      // Overlay darken
      tl.to(
        overlayRef.current,
        { opacity: 0.9, duration: 1 },
        1
      );

      // Text fade out
      tl.to(
        textRef.current,
        { opacity: 0, y: -80, duration: 0.8 },
        1.5
      );

      // Final reveal - split and reveal new text
      tl.to(
        '.hero-reveal-layer',
        { clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', duration: 1.2, ease: 'power4.inOut' },
        2.2
      );
    }, sectionRef);

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden bg-[#F8F7F4]"
      style={{ zIndex: 1 }}
    >
      {/* Background image */}
      <div ref={imageRef} className="absolute inset-0 w-full h-full overflow-hidden">
        <img
          src={heroImg}
          alt="Cadmax Hero"
          className="w-full h-full object-cover"
          draggable={false}
        />
      </div>

      {/* Overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black/40"
      />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center px-6 md:px-16 lg:px-24">
        {/* Badge */}
        <div
          ref={badgeRef}
          className="inline-flex items-center gap-2 px-4 py-2 mt-4 p-4 rounded-full border border-white/30 backdrop-blur-sm bg-white/10 text-white text-sm font-general mb-8 w-fit"
        >
          <span className="w-2 h-2  rounded-full bg-[#CAAA79] animate-pulse" />
          Surveying & Engineering
        </div>

        {/* Main heading */}
        <div ref={textRef} className="max-w-5xl">
          <h1 className="font-clash text-hero text-white leading-[0.95] -tracking-[0.04em]">
            {['Precision', 'Engineering,', 'Built for', 'Excellence'].map((line, i) => (
              <span key={i} className="block overflow-hidden">
                <span
                  ref={(el) => (textLinesRef.current[i] = el)}
                  className="inline-block"
                >
                  {line}
                </span>
              </span>
            ))}
          </h1>
        </div>

        {/* CTA */}
        <div ref={ctaRef} className="mt-10 flex items-center gap-6">
          <button className="group inline-flex items-center gap-3 px-8 py-3 bg-[#CAAA79] text-[#F8F5F1] rounded-full text-sm font-general font-semibold transition-all duration-300 hover:bg-[#c09c66] hover:gap-4 hover:shadow-xl hover:shadow-[#151515]/20">
            Explore Our Work
            <MoveRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </div>

      {/* Bottom gradient scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <span className="text-white/50 text-xs font-general uppercase tracking-widest">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white/50 to-transparent overflow-hidden">
          <div className="w-full h-full bg-white/80 animate-scroll-down" style={{ animation: 'scrollDown 1.5s ease-in-out infinite' }} />
        </div>
      </div>

      <style>{`
        @keyframes scrollDown {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        .animate-scroll-down {
          animation: scrollDown 1.5s ease-in-out infinite;
        }
        .hero-reveal-layer {
          clip-path: polygon(0 0, 100% 0, 100% 0, 0 0);
        }
      `}</style>
    </section>
  );
};

export default HeroSection;