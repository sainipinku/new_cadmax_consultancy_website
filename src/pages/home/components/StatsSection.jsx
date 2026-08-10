import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { createImageParallax, createReveal } from '../../../animations/scrollMotion';
import stateImage from '../../../assets/Images/stats/stats-image.png';
import './StatsSection.css';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { label: 'Projects Delivered', value: 500, suffix: '+' },
  { label: 'Years Experience', value: 26, suffix: '+' },
  { label: 'Happy Clients', value: 200, suffix: '+' },
  { label: 'Client Rating', value: 4.9, suffix: '/5' },
];

const StatsSection = () => {
  const counterRefs = useRef([]);
  const statsRef = useRef(null);
  const imageRef = useRef(null);

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
        const target = parseFloat(counter.dataset.value);
        const suffix = counter.dataset.suffix || '';
        const obj = { val: 0 };
        tl.to(
          obj,
          {
            val: target,
            duration: 2,
            ease: 'power2.out',
            onUpdate: () => {
              if (suffix === '/5') {
                counter.textContent = obj.val.toFixed(1) + suffix;
              } else {
                counter.textContent = Math.round(obj.val).toLocaleString() + suffix;
              }
            },
          },
          0
        );
      });

      // Add cinematic parallax to stats image
      if (imageRef.current) {
        createImageParallax(imageRef.current, statsRef.current, {
          yPercent: 8,
          scale: 1.05,
          scrub: 1.2,
          intensity: 0.6,
        });
      }

      // Reveal animation for stats items
      const statItems = statsRef.current.querySelectorAll('.about-stat-item');
      if (statItems.length) {
        createReveal(Array.from(statItems), {
          y: 50,
          opacity: true,
          scale: true,
          stagger: 0.1,
          duration: 1,
          ease: 'power3.out',
          start: 'top 85%',
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative py-16 md:py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
          
          {/* Left Side - Stats (2/5 width) */}
          <div className="space-y-8 lg:col-span-2">
            <div>
              <h2 className="font-garamond text-section text-[var(--foreground)] mb-4">
                Numbers That
                <br />
                <span className="text-[var(--accent)]">Speak Volumes</span>
              </h2>
              <div className="h-1 w-24 " />
            </div>

            <p className="text-[var(--muted-foreground)] font-garamond text-lg leading-relaxed">
              With over two decades of excellence, Cadmax Consultancy has established itself as a trusted name in surveying, planning, and real estate consultancy across Rajasthan and beyond.
            </p>

            {/* Stats Grid */}
            <div 
              ref={statsRef}
              className="grid grid-cols-2 gap-6"
            >
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className="about-stat-item group"
                >
                  <div className="about-stats-number-wrapper transition-all duration-350 ease-out group-hover:scale-[1.03]">
                    <span className="about-stats-number">
                      <span
                        ref={(el) => (counterRefs.current[index] = el)}
                        data-value={stat.value}
                        data-suffix={stat.suffix}
                      >
                        0
                      </span>
                      {/* <svg className="about-stats-suffix-icon" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                      </svg> */}
                    </span>
                  </div>
                  <p className="about-stats-text">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Image (3/5 width) */}
          <div className="relative lg:h-[650px] h-[400px] md:h-[500px] w-full lg:col-span-3">
            {/* Main Image Container */}
            <div className="relative h-full w-full rounded-2xl overflow-hidden">
              <img
                ref={imageRef}
                src={stateImage}
                alt="Cadmax State"
                className="w-full h-full object-cover"
              />
              
              {/* Gradient Overlay */}
              <div className=" " />
            </div>

            {/* Floating Badge */}
            {/* <div className="absolute -bottom-6 -left-6 bg-[var(--accent)] text-white rounded-2xl p-6 shadow-2xl">
              <div className="text-center">
                <div className="font-clash text-4xl font-bold mb-1">26+</div>
                <div className="text-sm font-general font-medium uppercase tracking-wider">Years of</div>
                <div className="text-sm font-general font-medium uppercase tracking-wider">Excellence</div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;