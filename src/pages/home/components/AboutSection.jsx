import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useScrollReveal } from '../../../hooks/useScrollReveal';
import accuracyImg from '../../../assets/Images/Other/accuracy-part.jpg.jpeg';

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
    { label: 'Years Experience', value: 20, suffix: '+' },
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
      className="relative py-24 md:py-32 bg-[#F8F7F4] overflow-hidden"
    >
      {/* Background decorative element */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#CAAA79]/5 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#CAAA79]/5 rounded-full translate-y-1/2 -translate-x-1/4 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-8 h-[1px] bg-[#CAAA79]" />
          <span className="text-xs font-general font-semibold text-[#CAAA79] uppercase tracking-[0.2em]">
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
            <div className="absolute -bottom-6 -right-6 bg-[#141111] rounded-2xl p-6 shadow-elevated hidden md:block">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full  bg-[#CAAA79] flex items-center justify-center">
                  <span className="text-white font-clash text-lg font-bold">20+</span>
                </div>
                <div>
                  <p className="text-sm font-general font-semibold text-white">Years of</p>
                  <p className="text-sm font-general text-white">Excellence</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Content */}
          <div ref={textRef} className="space-y-8">
            <h2 className="font-clash text-section text-[#151515]">
              How CADMAX <br />
              <span className="text-[#636363]">Maintains Accuracy</span>
            </h2>

            <div className="space-y-4 text-[#636363] font-inter leading-relaxed">
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

            <button className="group inline-flex items-center gap-3 px-6 py-3 bg-[#151515] text-[#F8F5F1] rounded-full text-sm font-general font-semibold transition-all duration-300 hover:bg-[#2a2a2a] hover:gap-4 hover:shadow-xl">
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
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-24 pt-16 border-t border-[#E8E4DD]"
        >
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-4xl md:text-5xl font-clash font-bold text-[#151515] mb-2">
                <span
                  ref={(el) => (counterRefs.current[i] = el)}
                  data-value={stat.value}
                >
                  0
                </span>
                <span className="text-[#CAAA79]">{stat.suffix}</span>
              </div>
              <p className="text-sm font-general text-[#636363]">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;