import { useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { generateStripeMask, easeInOutCubic } from '../utils/generateStripeMask';

gsap.registerPlugin(ScrollTrigger);

/**
 * useAmenitiesAnimation
 *
 * Orchestrates the full editorial collage section:
 *  - 350vh scroll track
 *  - Sticky wrapper
 *  - Per-slide GSAP timelines driven by 100vh trigger blocks
 *  - requestAnimationFrame-driven stripe mask updates on big images
 *  - SplitText character reveals
 *  - Progress bar, slide counter
 *
 * @param {Object}   opts
 * @param {Object}   opts.sectionRef        - ref to <section>
 * @param {Object}   opts.trackRef          - ref to .anim-track
 * @param {Object}   opts.wrapRef           - ref to .amenities-wrap
 * @param {Object}   opts.bigImageRefs      - refs { current: Map[index] -> DOM element }
 * @param {Object}   opts.smallImageRefs    - refs { current: Map[index] -> DOM element }
 * @param {Object}   opts.textRefs          - refs { current: Map[index] -> DOM element }
 * @param {Object}   opts.progressFillRef   - ref to .progress-fill
 * @param {Object}   opts.slideCounterRef   - ref to .slide-counter
 * @param {Array}    opts.slides            - slide data array
 * @param {Object}   opts.triggerContainer  - ref to .amenities-triggers
 */
export function useAmenitiesAnimation({
  sectionRef,
  trackRef,
  wrapRef,
  bigImageRefs,
  smallImageRefs,
  textRefs,
  progressFillRef,
  slideCounterRef,
  slides,
  triggerContainer,
}) {
  const ctxRef = useRef(null);
  const rafIdRef = useRef(null);
  const maskProgressRef = useRef({});     // map: slideIndex -> progress 0-1
  const currentSlideRef = useRef(0);
  // Store active mask updates per slide: { big: [fn, fn], small: [fn, fn] }
  const maskUpdatersRef = useRef(new Map());

  // ─── Split text into characters ──────────────────────────────
  const splitText = useCallback((el) => {
    if (!el) return null;
    const text = el.textContent;
    if (!text) return [];

    // Wrap each character in <span class="char">
    const chars = text.split('').map((c, i) => {
      const span = document.createElement('span');
      span.className = 'char';
      span.textContent = c === ' ' ? '\u00A0' : c;
      span.style.display = 'inline-block';
      span.style.willChange = 'transform, opacity';
      return span;
    });

    el.textContent = '';
    chars.forEach((span) => el.appendChild(span));
    return chars;
  }, []);

  // ─── Per-frame mask updater ───────────────────────────────────
  const updateMasks = useCallback(() => {
    const updaters = maskUpdatersRef.current;
    if (updaters.size === 0) return;

    updaters.forEach((fn) => {
      if (typeof fn === 'function') fn();
    });

    rafIdRef.current = requestAnimationFrame(updateMasks);
  }, []);

  // ─── Build a mask updater function for a big image ────────────
  const createBigImageMaskUpdater = useCallback((imgEl, slideIndex) => {
    return () => {
      if (!imgEl) return;
      const progress = maskProgressRef.current[slideIndex] ?? 0;
      const gradient = generateStripeMask(progress);
      imgEl.style.setProperty('--mask-gradient', gradient);
      imgEl.style.setProperty('-webkit-mask-image', gradient);
      imgEl.style.setProperty('mask-image', gradient);
    };
  }, []);

  // ─── Build the clip-path updater for a small image ────────────
  // Small images use clip-path instead of mask.
  // We keep it simple: clip from bottom as progress increases.
  const createSmallImageClipUpdater = useCallback((imgEl, slideIndex) => {
    return () => {
      if (!imgEl) return;
      const key = `small-${slideIndex}`;
      const progress = Math.max(0, Math.min(1, maskProgressRef.current[key] ?? 0));
      // Clip from bottom upward
      const topPct = (1 - progress) * 100;
      imgEl.style.clipPath = `inset(${topPct}% 0% 0% 0%)`;
    };
  }, []);

  // ─── Setup all animations ─────────────────────────────────────
  useEffect(() => {
    if (!sectionRef.current || !trackRef.current || !wrapRef.current) return;

    const section = sectionRef.current;
    const track = trackRef.current;
    const wrap = wrapRef.current;
    const triggersEl = triggerContainer?.current;
    const progressFill = progressFillRef?.current;
    const slideCounter = slideCounterRef?.current;

    // Kill previous
    if (ctxRef.current) {
      ctxRef.current.revert();
    }
    if (rafIdRef.current) {
      cancelAnimationFrame(rafIdRef.current);
    }
    maskUpdatersRef.current = new Map();

    const ctx = gsap.context(() => {
      const numSlides = slides.length;
      if (numSlides === 0) return;

      // ── Create the 100vh trigger blocks ──
      // We already have them in the DOM, but we create ScrollTriggers for each.
      const triggers = [];
      for (let i = 0; i < numSlides; i++) {
        const triggerEl = triggersEl?.children[i] || document.createElement('div');
        triggers.push(triggerEl);
      }

      // ── Split text into characters ──
      textRefs.current.forEach((textRef, index) => {
        if (!textRef) return;
        // Split each title element that has class .title
        const titleEls = textRef.querySelectorAll('.title');
        titleEls.forEach((el) => splitText(el));
      });

      // ── Master timeline that scrubs with scroll ──
      const masterTL = gsap.timeline({
        scrollTrigger: {
          trigger: track,
          start: 'top top',
          end: () => `+=${track.offsetHeight - window.innerHeight}`,
          pin: wrap,
          scrub: 1.2,
          invalidateOnRefresh: true,
        },
      });

      // ── For each slide, add a sub-timeline ──
      slides.forEach((slide, i) => {
        const bigImageEl = bigImageRefs.current.get(i);
        const smallImageEl = smallImageRefs.current.get(i);
        const textEl = textRefs.current.get(i);

        // Create a label-based sub-timeline
        const subTL = gsap.timeline();

        // ── Text Out (previous slide) ──
        if (i > 0) {
          const prevTextEl = textRefs.current.get(i - 1);
          if (prevTextEl) {
            const chars = prevTextEl.querySelectorAll('.char');
            subTL.to(chars, {
              y: -15,
              opacity: 0,
              duration: 0.3,
              stagger: 0.008,
              ease: 'power2.in',
            }, 0);
            subTL.to(prevTextEl.querySelector('.description'), {
              y: -20,
              opacity: 0,
              duration: 0.25,
              ease: 'power2.in',
            }, 0);
            subTL.to(prevTextEl.querySelector('.btn-amenities'), {
              y: -10,
              opacity: 0,
              duration: 0.2,
              ease: 'power2.in',
            }, 0);
          }
        }

        // ── Progress Fill (0 → 100%) ──
        if (progressFill) {
          subTL.to(progressFill, {
            height: '100%',
            duration: 0.5,
            ease: 'power1.inOut',
          }, 0.2);
        }

        // Update slide counter
        if (slideCounter) {
          subTL.call(() => {
            slideCounter.textContent = `${String(i + 1).padStart(2, '0')} / ${String(numSlides).padStart(2, '0')}`;
          }, [], 0.1);
        }

        // ── Small Image Out (previous) ──
        if (i > 0) {
          const prevSmall = smallImageRefs.current.get(i - 1);
          if (prevSmall) {
            subTL.to(prevSmall, {
              scale: 0.94,
              opacity: 0,
              duration: 0.35,
              ease: 'power2.inOut',
            }, 0.25);
            subTL.to(prevSmall.parentElement?.parentElement, {
              y: -15,
              duration: 0.35,
              ease: 'power2.inOut',
            }, 0.25);
          }
        }

        // ── Big Image Incoming (new image) ──
        // The mask reveal is driven by requestAnimationFrame, but we need
        // to start it at the right moment. We animate a proxy value.
        if (bigImageEl) {
          // Set initial state
          gsap.set(bigImageEl, {
            scale: 1.08,
            y: 30,
            filter: 'brightness(0.8)',
          });

          // Animate scale, y, brightness via GSAP
          subTL.to(bigImageEl, {
            scale: 1,
            y: 0,
            filter: 'brightness(1)',
            duration: 0.7,
            ease: 'power2.out',
          }, 0.4);

          // The mask progress: we create a proxy object and animate it
          const proxy = { progress: 0 };
          maskProgressRef.current[i] = 0;

          // Register mask updater for this slide
          const updater = createBigImageMaskUpdater(bigImageEl, i);
          maskUpdatersRef.current.set(`big-${i}`, updater);

          // Animate proxy — the rAF loop reads it
          subTL.to(proxy, {
            progress: 1,
            duration: 0.9,
            ease: 'power2.out',
            onUpdate: () => {
              maskProgressRef.current[i] = easeInOutCubic(proxy.progress);
            },
          }, 0.45);
        }

        // ── Small Image Incoming ──
        if (smallImageEl) {
          gsap.set(smallImageEl, {
            scale: 0.94,
            y: 20,
            opacity: 0,
            clipPath: 'inset(100% 0% 0% 0%)',
          });

          // Animate scale, y, opacity
          subTL.to(smallImageEl, {
            scale: 1,
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: 'power2.out',
          }, 0.6);

          // Clip reveal via proxy
          const clipProxy = { progress: 0 };
          const clipUpdater = createSmallImageClipUpdater(smallImageEl, i);
          maskUpdatersRef.current.set(`small-${i}`, clipUpdater);

          subTL.to(clipProxy, {
            progress: 1,
            duration: 0.5,
            ease: 'power2.out',
            onUpdate: () => {
              maskProgressRef.current[`small-${i}`] = clipProxy.progress;
            },
          }, 0.6);
        }

        // ── Text In (current slide) ──
        if (textEl) {
          const chars = textEl.querySelectorAll('.char');
          gsap.set(chars, { y: 25, opacity: 0 });
          gsap.set(textEl.querySelector('.description'), { y: 20, opacity: 0 });
          gsap.set(textEl.querySelector('.btn-amenities'), { y: 15, opacity: 0 });
          gsap.set(textEl.querySelector('.eyebrow'), { y: 10, opacity: 0 });

          subTL.to(chars, {
            y: 0,
            opacity: 1,
            duration: 0.35,
            stagger: 0.012,
            ease: 'power2.out',
          }, 0.75);

          subTL.to(textEl.querySelector('.eyebrow'), {
            y: 0,
            opacity: 1,
            duration: 0.25,
            ease: 'power2.out',
          }, 0.7);

          subTL.to(textEl.querySelector('.description'), {
            y: 0,
            opacity: 1,
            duration: 0.3,
            ease: 'power2.out',
          }, 0.85);

          subTL.to(textEl.querySelector('.btn-amenities'), {
            y: 0,
            opacity: 1,
            duration: 0.25,
            ease: 'power2.out',
          }, 0.95);
        }

        // Add this sub-timeline to the master at the correct position
        // Each slide occupies scroll distance equivalent to 100vh
        masterTL.add(subTL, i * 1.0);
      });

      // ── Final small image fade out for last slide ──
      // (nothing extra needed)
    }, sectionRef);

    ctxRef.current = ctx;

    // ── Start the rAF loop for mask updates ──
    if (!rafIdRef.current) {
      rafIdRef.current = requestAnimationFrame(updateMasks);
    }

    // ── Cleanup ──
    return () => {
      if (ctxRef.current) {
        ctxRef.current.revert();
        ctxRef.current = null;
      }
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
      maskUpdatersRef.current = new Map();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slides]);
}