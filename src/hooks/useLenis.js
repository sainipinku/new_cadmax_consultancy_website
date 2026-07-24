import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useLenis = () => {
  useEffect(() => {
    // Disable lag smoothing for better ScrollTrigger sync
    gsap.ticker.lagSmoothing(0);
    
    return () => {
      // Cleanup if needed
    };
  }, []);
};

export default useLenis;
