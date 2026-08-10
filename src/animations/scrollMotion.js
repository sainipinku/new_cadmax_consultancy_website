import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Check if user prefers reduced motion
 */
export const prefersReducedMotion = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Get responsive parallax intensity
 */
export const getParallaxIntensity = () => {
  if (typeof window === 'undefined') return 1;
  
  const width = window.innerWidth;
  if (width < 768) return 0.3; // Mobile
  if (width < 1024) return 0.6; // Tablet
  return 1; // Desktop
};

/**
 * Create image parallax effect
 * @param {HTMLElement} image - The image element
 * @param {HTMLElement} section - The section container
 * @param {Object} options - Configuration options
 */
export const createImageParallax = (image, section, options = {}) => {
  if (!image || !section || prefersReducedMotion()) return;

  const {
    yPercent = 15,
    scale = 1.08,
    scrub = 1,
    intensity = 1,
    blendOnScroll = false,
  } = options;

  const actualYPercent = yPercent * intensity * getParallaxIntensity();
  const actualScale = scale > 1 ? 1 + (scale - 1) * getParallaxIntensity() : scale;

  if (blendOnScroll) {
    // Cinematic blend: starts normal, moves up and fades out on scroll
    gsap.fromTo(
      image,
      { yPercent: 0, scale: 1, opacity: 1 },
      {
        yPercent: -actualYPercent,
        scale: actualScale,
        opacity: 0.3,
        ease: 'power2.in',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub,
        },
      }
    );
  } else {
    // Standard parallax
    gsap.fromTo(
      image,
      {
        yPercent: -actualYPercent,
        scale: actualScale,
      },
      {
        yPercent: actualYPercent,
        scale: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub,
        },
      }
    );
  }
};

/**
 * Create text parallax effect
 * @param {HTMLElement} element - The text element
 * @param {HTMLElement} section - The section container
 * @param {Object} options - Configuration options
 */
export const createTextParallax = (element, section, options = {}) => {
  if (!element || !section || prefersReducedMotion()) return;

  const {
    y = 60,
    opacity = true,
    scale = false,
    scrub = 1,
    start = 'top 85%',
    end = 'center center',
    intensity = 1,
    blendOnScroll = false,
  } = options;

  const actualY = y * getParallaxIntensity();

  if (blendOnScroll) {
    // Cinematic blend: starts visible, moves up and fades out on scroll
    gsap.fromTo(
      element,
      { y: 0, opacity: 1 },
      {
        y: -actualY,
        opacity: 0,
        ease: 'power2.in',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub,
        },
      }
    );
  } else {
    // Standard reveal
    const fromVars = {
      y: actualY,
    };

    if (opacity) fromVars.opacity = 0;
    if (scale) fromVars.scale = 0.95;

    const toVars = {
      y: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start,
        end,
        scrub,
      },
    };

    if (opacity) toVars.opacity = 1;
    if (scale) toVars.scale = 1;

    gsap.fromTo(element, fromVars, toVars);
  }
};

/**
 * Create reveal animation for section elements
 * @param {HTMLElement[]} elements - Array of elements to animate
 * @param {Object} options - Configuration options
 */
export const createReveal = (elements, options = {}) => {
  if (!elements || !elements.length || prefersReducedMotion()) return;

  const {
    y = 40,
    opacity = true,
    scale = false,
    stagger = 0.08,
    duration = 1,
    ease = 'power3.out',
    start = 'top 80%',
  } = options;

  const fromVars = { y };
  if (opacity) fromVars.opacity = 0;
  if (scale) fromVars.scale = 0.95;

  const toVars = {
    y: 0,
    duration,
    ease,
    stagger,
    scrollTrigger: {
      trigger: elements[0],
      start,
      toggleActions: 'play none none reverse',
    },
  };

  if (opacity) toVars.opacity = 1;
  if (scale) toVars.scale = 1;

  gsap.fromTo(elements, fromVars, toVars);
};

/**
 * Create 3D depth effect
 * @param {HTMLElement} element - The element to animate
 * @param {HTMLElement} section - The section container
 * @param {Object} options - Configuration options
 */
export const createDepthMotion = (element, section, options = {}) => {
  if (!element || !section || prefersReducedMotion()) return;

  const {
    rotateX = 2,
    rotateY = 2,
    translateZ = 20,
    scale = 1.05,
    scrub = 1,
    intensity = 1,
  } = options;

  const actualRotateX = rotateX * intensity * getParallaxIntensity();
  const actualRotateY = rotateY * intensity * getParallaxIntensity();
  const actualTranslateZ = translateZ * getParallaxIntensity();
  const actualScale = 1 + (scale - 1) * getParallaxIntensity();

  gsap.fromTo(
    element,
    {
      rotateX: -actualRotateX,
      rotateY: -actualRotateY,
      translateZ: -actualTranslateZ,
      scale: actualScale,
    },
    {
      rotateX: actualRotateX,
      rotateY: actualRotateY,
      translateZ: actualTranslateZ,
      scale: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub,
      },
    }
  );
};

/**
 * Create card stagger animation
 * @param {HTMLElement[]} cards - Array of card elements
 * @param {Object} options - Configuration options
 */
export const createCardStagger = (cards, options = {}) => {
  if (!cards || !cards.length || prefersReducedMotion()) return;

  const {
    y = 60,
    opacity = true,
    scale = true,
    rotateX = 3,
    stagger = 0.1,
    duration = 1,
    ease = 'power3.out',
    start = 'top 85%',
    intensity = 1,
  } = options;

  const actualY = y * getParallaxIntensity();
  const actualRotateX = rotateX * getParallaxIntensity();

  cards.forEach((card, index) => {
    if (!card) return;

    const fromVars = {
      y: actualY + index * 10,
      opacity: 0,
      rotateX: actualRotateX,
    };

    if (scale) fromVars.scale = 0.95;

    const toVars = {
      y: 0,
      opacity: 1,
      rotateX: 0,
      duration,
      ease,
      delay: index * stagger,
      scrollTrigger: {
        trigger: card,
        start,
        toggleActions: 'play none none reverse',
      },
    };

    if (scale) toVars.scale = 1;

    gsap.fromTo(card, fromVars, toVars);
  });
};

/**
 * Create hero cinematic effect
 * @param {HTMLElement} section - The hero section
 * @param {Object} options - Configuration options
 */
export const createHeroCinematic = (section, options = {}) => {
  if (!section || prefersReducedMotion()) return;

  const {
    backgroundSelector = '[data-hero-bg]',
    headingSelector = '[data-hero-heading]',
    subtitleSelector = '[data-hero-subtitle]',
    ctaSelector = '[data-hero-cta]',
  } = options;

  const bg = section.querySelector(backgroundSelector);
  const heading = section.querySelector(headingSelector);
  const subtitle = section.querySelector(subtitleSelector);
  const cta = section.querySelector(ctaSelector);

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: 'top top',
      end: 'bottom top',
      scrub: 1,
    },
  });

  // Background slow zoom out and slight upward movement
  if (bg) {
    tl.fromTo(
      bg,
      { scale: 1.15, y: 0 },
      { scale: 1, y: -50, ease: 'none' },
      0
    );
  }

  // Heading moves up and fades out smoothly (blend effect)
  if (heading) {
    tl.fromTo(
      heading,
      { y: 0, opacity: 1 },
      { y: -150, opacity: 0, ease: 'power2.in' },
      0
    );
  }

  // Subtitle moves up at different speed and fades
  if (subtitle) {
    tl.fromTo(
      subtitle,
      { y: 0, opacity: 1 },
      { y: -100, opacity: 0, ease: 'power2.in' },
      0
    );
  }

  // CTA moves up and fades
  if (cta) {
    tl.fromTo(
      cta,
      { y: 0, opacity: 1 },
      { y: -80, opacity: 0, ease: 'power2.in' },
      0
    );
  }
};

/**
 * Create section pin for cinematic storytelling
 * @param {HTMLElement} section - The section to pin
 * @param {Object} options - Configuration options
 */
export const createSectionPin = (section, options = {}) => {
  if (!section || prefersReducedMotion()) return null;

  const {
    end = '+=100%',
    scrub = true,
  } = options;

  return ScrollTrigger.create({
    trigger: section,
    start: 'top top',
    end,
    pin: true,
    scrub,
    anticipatePin: 1,
  });
};

/**
 * Cleanup all ScrollTriggers in a context
 * @param {Function} context - GSAP context cleanup function
 */
export const cleanupAnimations = (context) => {
  if (context) {
    context.revert();
  }
};

export default {
  prefersReducedMotion,
  getParallaxIntensity,
  createImageParallax,
  createTextParallax,
  createReveal,
  createDepthMotion,
  createCardStagger,
  createHeroCinematic,
  createSectionPin,
  cleanupAnimations,
};