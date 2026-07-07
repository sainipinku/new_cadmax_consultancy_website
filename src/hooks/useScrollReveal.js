import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Custom hook for scroll-triggered reveal animations using GSAP + ScrollTrigger.
 * @param {Object} options
 * @param {string} options.start - ScrollTrigger start position (default: 'top 80%')
 * @param {string} options.end - ScrollTrigger end position (default: 'top 30%')
 * @param {number} options.y - Starting Y offset (default: 60)
 * @param {number} options.duration - Animation duration in seconds (default: 0.8)
 * @returns {React.RefObject} ref to attach to the element
 */
export function useScrollReveal({ start = 'top 80%', end = 'top 30%', y = 60, duration = 0.8 } = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start,
            end: 'bottom top',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    return () => ctx.revert();
  }, [start, end, y, duration]);

  return ref;
}