import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useScrollReveal } from '../../../hooks/useScrollReveal';
import { Quote, Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: 'RAVI KUMAWAT',
    role: 'SHREE RAM GROUP',
    text: 'A professional architectural practice with strong design expertise and excellent project coordination. Their commitment to quality, clear communication, and client satisfaction is evident at every stage of their work.',
    rating: 5,
  },
  {
    name: 'MUKESH SHARMA',
    role: 'HOMELAND GROUP',
    text: 'We were highly satisfied with the firm design approach and exceptional attention to detail. The architects balanced creativity with practicality, delivering a solution that was both visually strong and highly functional.',
    rating: 5,
  },
  {
    name: 'SANWAR MAL',
    role: 'ASHIANA HOUSING LTD',
    text: 'Working with the Cadmax Group architects was a thoroughly positive experience. They listened carefully to our requirements and provided clear, professional guidance at each stage of the process.',
    rating: 5,
  },
  {
    name: 'CHARAN KHANGAROAT',
    role: 'FS REALITY GROUP',
    text: 'The firm managed the project efficiently, maintaining agreed timelines and delivering high-quality, well-structured documentation. Their reliability and organized workflow gave us confidence throughout.',
    rating: 5,
  },
];

const TestimonialsSection = () => {
  const sectionRef = useRef(null);
  const headerRef = useScrollReveal({ start: 'top 80%' });
  const trackRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const cards = track.children;
    if (!cards.length) return;

    const ctx = gsap.context(() => {
      // Auto-scroll animation
      gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth + 100),
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 20%',
          end: 'bottom top',
          scrub: 1.5,
          invalidateOnRefresh: true,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-[#F8F7F4] overflow-hidden"
    >
      {/* Background decorative */}
      <div className="absolute top-1/2 -left-32 w-96 h-96 bg-[#CAAA79]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24">
        {/* Section header */}
        <div ref={headerRef} className="mb-16">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-8 h-[1px] bg-[#CAAA79]" />
            <span className="text-xs font-general font-semibold text-[#CAAA79] uppercase tracking-[0.2em]">
              Proof of Performance
            </span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2 className="font-clash text-section text-[#151515] max-w-xl">
              What Our <span className="text-[#636363]">Clients Say</span>
            </h2>
            <p className="text-[#636363] font-inter text-sm max-w-md">
              Trusted by leading real estate and construction companies across India for precision, reliability, and excellence.
            </p>
          </div>
        </div>
      </div>

      {/* Horizontal scrolling testimonials */}
      <div className="overflow-hidden cursor-grab active:cursor-grabbing">
        <div
          ref={trackRef}
          className="flex gap-6 px-6 md:px-16 lg:px-24"
          style={{ width: 'max-content' }}
        >
          {[...testimonials, ...testimonials].map((t, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-[400px] bg-white rounded-2xl p-8 border border-[#E8E4DD] hover:shadow-elevated transition-all duration-500 hover:-translate-y-1"
            >
              {/* Quote icon */}
              <Quote className="w-8 h-8 text-[#CAAA79]/20 mb-6" />

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-[#CAAA79] text-[#CAAA79]" />
                ))}
              </div>

              {/* Text */}
              <p className="text-[#636363] font-inter text-sm leading-relaxed mb-6 line-clamp-5">
                "{t.text}"
              </p>

              {/* Author */}
              <div className="pt-6 border-t border-[#E8E4DD]">
                <p className="font-general font-semibold text-[#151515]">{t.name}</p>
                <p className="text-xs text-[#CAAA79] font-general tracking-wider">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;