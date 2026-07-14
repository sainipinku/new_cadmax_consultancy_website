import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useScrollReveal } from '../../../hooks/useScrollReveal';
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react';

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
  const scrollTriggerRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const ctx = gsap.context(() => {
      // Scroll-driven horizontal slide (kept as requested)
      const anim = gsap.to(track, {
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
      scrollTriggerRef.current = anim.scrollTrigger;
    });

    return () => ctx.revert();
  }, []);

  // Number of unique cards (not counting the duplicated set)
  const uniqueCount = testimonials.length;
  // Card step (gap between consecutive cards)
  let cachedStep = 0;

  const getStep = () => {
    if (cachedStep) return cachedStep;
    const children = trackRef.current?.children;
    if (!children || children.length < 2) return 0;
    cachedStep = children[1].getBoundingClientRect().left - children[0].getBoundingClientRect().left;
    return cachedStep;
  };

  // Move the track by one card width for prev/next buttons
  const slide = (dir) => {
    const track = trackRef.current;
    if (!track) return;
    const children = track.children;
    if (children.length < 2) return;

    const step = getStep();
    if (!step) return;

    const currentX = Number(gsap.getProperty(track, 'x')) || 0;
    // Clamp so we never scroll past the duplicated set
    const minX = -(track.scrollWidth - window.innerWidth + 100);
    let nextX = currentX - dir * step;

    // Infinite loop: if going forward past the end, wrap to start
    if (nextX < minX) {
      scrollTriggerRef.current?.disable();
      // Teleport to the beginning of the duplicate set so the animation feels infinite
      const resetX = -(uniqueCount * step);
      gsap.set(track, { x: resetX });
      nextX = resetX - dir * step;
    }
    // If going backward past the start, wrap to near the end
    if (nextX > 0) {
      scrollTriggerRef.current?.disable();
      const resetX = minX + uniqueCount * step;
      gsap.set(track, { x: resetX });
      nextX = resetX - dir * step;
    }

    nextX = Math.max(minX, Math.min(0, nextX));

    // Disable the scroll-trigger so the button animation doesn't fight it.
    scrollTriggerRef.current?.disable();

    gsap.to(track, {
      x: nextX,
      duration: 0.6,
      ease: 'power2.out',
      overwrite: 'auto',
    });

    // Re-enable the scroll-trigger only when the user starts scrolling again
    // (not on animation end, which would snap back immediately).
    const onScroll = () => {
      scrollTriggerRef.current?.enable();
      window.removeEventListener('scroll', onScroll);
    };
    window.addEventListener('scroll', onScroll, { once: true });
  };

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#F8F7F4] overflow-hidden sticky top-0 z-10 h-screen flex flex-col"
      style={{ perspective: '1200px' }}
    >
      {/* Background decorative */}
      <div className="absolute top-1/2 -left-32 w-96 h-96 bg-[#CAAA79]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24 pt-12 md:pt-14">
        {/* Section header */}
        <div ref={headerRef} className="mb-3 md:mb-4">
          <div className="flex items-start gap-4 mb-3">
            <div className="w-8 h-[1px] bg-[#CAAA79]" />
            <span className="text-xs font-general font-semibold text-[#CAAA79] uppercase tracking-[0.2em]">
              Proof of Performance
            </span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2 className="font-clash text-section text-[#151515] max-w-xl">
              What Our <span className="text-[#636363]">Clients Say</span>
            </h2>
             {/* Prev / Next controls — centered below the cards */}
      <div className="flex justify-end items-center gap-2 mt-2 pb-4 px-6 md:px-16 lg:px-24">
        <button
          type="button"
          aria-label="Previous testimonial"
          onClick={() => slide(-1)}
          className="group w-12 h-12 rounded-full border border-[#E8E4DD] bg-white hover:bg-[#CAAA79] flex items-center justify-center text-[#151515] shadow-sm hover:shadow-lg hover:shadow-[#CAAA79]/30  hover:text-white hover:border-[#CAAA79] transition-all duration-300"
        >
          <ChevronLeft className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-0.5" />
        </button>
        <button
          type="button"
          aria-label="Next testimonial"
          onClick={() => slide(1)}
          className="group w-12 h-12 rounded-full border border-[#E8E4DD] bg-white flex items-center justify-center text-[#151515] shadow-sm hover:shadow-lg hover:shadow-[#CAAA79]/30 hover:bg-[#CAAA79] hover:text-white hover:border-[#CAAA79] transition-all duration-300"
        >
          <ChevronRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5" />
        </button>
      </div>
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
              className="flex-shrink-0 w-[calc(100vw-3rem)] sm:w-[400px] bg-white rounded-2xl p-6 sm:p-8 border border-[#E8E4DD] hover:shadow-elevated transition-all duration-500 hover:-translate-y-1"
            >
              {/* Quote icon */}
              <Quote className="w-8 h-8 text-[#CAAA79]/20 mb-4" />

              {/* Rating */}
              <div className="flex gap-1 mb-3">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-[#CAAA79] text-[#CAAA79]" />
                ))}
              </div>

              {/* Text */}
              <p className="text-[#636363] font-inter text-sm leading-relaxed mb-6 line-clamp-5">
                "{t.text}"
              </p>

              {/* Author */}
              <div className="pt-3 border-t border-[#E8E4DD]">
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