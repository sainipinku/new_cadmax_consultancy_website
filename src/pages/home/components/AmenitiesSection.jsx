import React, { useEffect, useRef, useState } from 'react';

import dgpsbig from '../../../assets/AmenitiesSection/dgps-big.png';
import dgpssmall from '../../../assets/AmenitiesSection/dgps-small.png';
import topobig from '../../../assets/AmenitiesSection/TOPOGRAPHICAL-BIG.png';
import toposmall from '../../../assets/AmenitiesSection/TOPOGRAPHICAL-SMALL.png';
import engineeringbig from '../../../assets/AmenitiesSection/ENGINEERING-BIG.png';
import engineeringsmall from '../../../assets/AmenitiesSection/ENGINEERING-SMALL.png';
import landbig from '../../../assets/AmenitiesSection/LAND-BIG.png';
import landsmall from '../../../assets/AmenitiesSection/LAND-SMALL.png';
import mobilebig from '../../../assets/AmenitiesSection/MOBILE-MAPPING-BIG.png';
import mobilesmall from '../../../assets/AmenitiesSection/MOBILE-MAPPING-SMALL.png';

const STRIPES = 30;

function stripeMask(local) {
  const stops = [];
  for (let i = 0; i < STRIPES; i++) {
    const start = (i / STRIPES) * 100;
    const end = ((i + 1) / STRIPES) * 100;
    const stripeStart = i / STRIPES;
    const stripeEnd = (i + 1) / STRIPES;
    const t = Math.min(Math.max((local - stripeStart) / (stripeEnd - stripeStart), 0), 1);
    const mid = start + (end - start) * t;
    stops.push(`black ${start}% ${mid}%`);
    stops.push(`transparent ${mid}% ${end}%`);
  }
  return `linear-gradient(0deg, ${stops.join(', ')})`;
}

const SLIDES = [
  {
    titleLines: ['DGPS', 'Survey'],
    tagline: 'Centimeter-Level Accuracy',
    description:
      'High-precision DGPS surveying solutions for infrastructure, construction, highways, railways, mining, and land development projects. Delivering reliable geospatial data with unmatched field accuracy.',
    bigImage: dgpsbig,
    smallImage: dgpssmall,
  },
  {
    titleLines: ['Topographical', 'Survey'],
    tagline: 'Detailed Terrain Mapping',
    description:
      'Comprehensive topographical surveys capturing natural and man-made features, contours, elevations, and utilities for planning, engineering, and development projects.',
    bigImage: topobig,
    smallImage: toposmall,
  },
  {
    titleLines: ['Engineering', 'Survey'],
    tagline: 'Precision for Every Project',
    description:
      'Accurate engineering survey services supporting roads, bridges, industrial plants, buildings, and infrastructure with precise layout, alignment, and construction control.',
    bigImage: engineeringbig,
    smallImage: engineeringsmall,
  },
  {
    titleLines: ['Land', 'Surveying'],
    tagline: 'Accurate Boundary Solutions',
    description:
      'Professional land surveying services including boundary determination, land subdivision, cadastral surveys, and site measurements to ensure legal and engineering accuracy.',
    bigImage: landbig,
    smallImage: landsmall,
  },
  {
    titleLines: ['Mobile Mapping', '& GIS'],
    tagline: 'Smart Spatial Intelligence',
    description:
      'Advanced mobile mapping and GIS solutions for asset management, utility mapping, digital twins, corridor mapping, and intelligent geospatial data visualization.',
    bigImage: mobilebig,
    smallImage: mobilesmall,
  },
];
const AmenitiesSection = () => {
  const trackRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = trackRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight;
        const total = rect.height - vh;
        const scrolled = Math.min(Math.max(-rect.top, 0), total);
        setProgress(total > 0 ? scrolled / total : 0);
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const n = SLIDES.length;
  const scaled = progress * n;

  return (
    <section data-section="amenities" className="bg-[var(--secondary)] text-[var(--foreground)] font-inter">
      <div ref={trackRef} style={{ height: `${n * 100}vh` }} className="relative">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <div className="mx-auto grid h-full max-w-[1400px] grid-cols-1 md:grid-cols-12 md:gap-6 px-4 py-8 md:px-12">
            {/* LEFT: text */}
            <div className="relative flex flex-col justify-center md:col-span-5 lg:col-span-5">
              <div className="relative pl-5 md:pl-8">
                <span className="absolute left-0 top-2 h-20 w-px bg-[var(--border)] md:h-24" />

                <div className="relative min-h-[180px] md:min-h-[320px]">
                  {SLIDES.map((s, i) => {
                    const textStart = i + 0.5;
                    const textEnd = i + 1.5;

                    const visible = scaled >= textStart;
                    const textLocal = i === 0 && scaled < textStart 
                      ? 1
                      : Math.min(Math.max((scaled - textStart) / 0.4, 0), 1);

                    if (!visible && i !== 0) return null;
                    if (i > 0 && scaled < textStart - 0.3) return null;

                    let showOpacity = textLocal;
                    let showTranslate = (1 - textLocal) * 110;
                    let descOpacity = textLocal;
                    let descTranslate = (1 - textLocal) * 14;

                    if (i === 0 && scaled > textStart) {
                      const fadeOut = Math.min(Math.max((scaled - textStart) / 0.3, 0), 1);
                      showOpacity = 1 - fadeOut;
                      showTranslate = fadeOut * 110;
                      descOpacity = 1 - fadeOut;
                      descTranslate = fadeOut * 14;
                    }

                    if (i > 0 && scaled > textEnd) {
                      const fadeOut = Math.min(Math.max((scaled - textEnd) / 0.3, 0), 1);
                      showOpacity = (1 - fadeOut) * textLocal;
                      showTranslate = (1 - textLocal) * 110 + fadeOut * 110;
                      descOpacity = (1 - fadeOut) * textLocal;
                      descTranslate = (1 - textLocal) * 14 + fadeOut * 14;
                    }

                    return (
                      <div key={s.titleLines.join(' ')} className="absolute inset-0" style={{ pointerEvents: showOpacity > 0.01 ? 'auto' : 'none' }}>
                        <h2
                          className="font-serif uppercase leading-tight tracking-tight text-[var(--foreground)]"
                          style={{
                            fontFamily: "'Cormorant Garamond', serif",
                            fontWeight: 500,
                            fontSize: 'clamp(1.5rem, 3.5vw, 2.8rem)',
                          }}
                        >
                          {s.titleLines.map((line, li) => (
                            <span key={li} className="block overflow-hidden">
                              <span
                                className="block"
                                style={{
                                  transform: `translateY(${showTranslate}%)`,
                                  transition: 'transform 0.1s linear',
                                }}
                              >
                                {line}
                              </span>
                            </span>
                          ))}
                        </h2>

                        <p
                          className="mt-3 max-w-sm text-xs leading-relaxed text-[var(--muted-foreground)] md:mt-5 md:text-sm"
                          style={{
                            fontFamily: "'Inter', sans-serif",
                            opacity: descOpacity,
                            transform: `translateY(${descTranslate}px)`,
                            transition: 'opacity 0.1s linear, transform 0.1s linear',
                          }}
                        >
                          {s.description}
                        </p>

                        <p
                          className="mt-2 text-[10px] uppercase tracking-[0.18em] text-[var(--accent)] md:mt-3"
                          style={{ fontFamily: "'Inter', sans-serif", opacity: showOpacity }}
                        >
                          {s.tagline}
                        </p>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-5 flex items-center gap-3">
                  <div className="h-px w-24 bg-[var(--border)] md:w-36">
                    <div className="h-px bg-[var(--foreground)]" style={{ width: `${progress * 100}%` }} />
                  </div>
                  <span className="text-[10px] tracking-widest text-[var(--muted-foreground)]" style={{ fontFamily: "'Inter', sans-serif" }}>
                    {String(Math.min(Math.floor(scaled) + 1, n)).padStart(2, '0')}
                    <span className="mx-1 text-[var(--muted-foreground)]">/</span>
                    {String(n).padStart(2, '0')}
                  </span>
                </div>
              </div>
            </div>

            {/* RIGHT: images */}
            <div className="relative flex items-center justify-center md:col-span-7 lg:col-span-7">
              {/* Desktop Layout (lg and above) */}
              <div className="hidden lg:block relative mx-auto h-[70vh] w-full max-w-[600px]">
                {/* BIG image — right side, 80% width */}
                <div className="absolute right-0 top-[-3.5rem] h-[90vh] w-[80%] overflow-hidden rounded-sm bg-[var(--muted)]">
                  {SLIDES.map((s, i) => {
                    const local = Math.min(Math.max(scaled - i, 0), 1);
                    const isFirst = i === 0;
                    return (
                      <img
                        key={`big-${i}`}
                        src={s.bigImage}
                        alt={s.titleLines.join(' ')}
                        loading={i === 0 ? 'eager' : 'lazy'}
                        className="absolute inset-0 h-full w-full border-1 border-gray-600 object-cover"
                        style={{
                          opacity: local > 0 ? 1 : 0,
                          zIndex: i,
                          WebkitMaskImage: isFirst ? 'none' : stripeMask(local),
                          maskImage: isFirst ? 'none' : stripeMask(local),
                          WebkitMaskSize: '100% 100%',
                          maskSize: '100% 100%',
                        }}
                      />
                    );
                  })}
                </div>

                {/* SMALL image — left corner, overlapping big image */}
                <div className="absolute bottom-[6%] left-0 z-20 h-[75%] w-[38%] overflow-hidden shadow-2xl shadow-black/60 ring-1 ring-black/20 rounded-sm bg-[var(--muted)]">
                  {SLIDES.map((s, i) => {
                    const local = Math.min(Math.max(scaled - i, 0), 1);
                    const isFirst = i === 0;
                    return (
                      <img
                        key={`small-${i}`}
                        src={s.smallImage}
                        alt={s.titleLines.join(' ')}
                        loading="lazy"
                        className="absolute inset-0 h-full w-full border-1 border-gray-600 object-cover"
                        style={{
                          opacity: isFirst ? 1 : local > 0 ? 1 : 0,
                          zIndex: i,
                          WebkitMaskImage: isFirst ? 'none' : stripeMask(local),
                          maskImage: isFirst ? 'none' : stripeMask(local),
                          WebkitMaskSize: '100% 100%',
                          maskSize: '100% 100%',
                        }}
                      />
                    );
                  })}
                </div>
              </div>

              {/* Tablet Layout (md to lg) - Collage style like mobile */}
              <div className="hidden md:block lg:hidden relative w-full px-6">
                {/* Collage layout for tablet */}
                <div className="relative mx-auto w-full max-w-[600px]" style={{ height: '560px' }}>
                  {/* BIG image — 105% width */}
                  <div className="absolute -right-[5.5%] top-0 h-[520px] w-[105%] overflow-hidden rounded-sm shadow-2xl shadow-black/60 bg-[var(--muted)]">
                    {SLIDES.map((s, i) => {
                      const local = Math.min(Math.max(scaled - i, 0), 1);
                      const isFirst = i === 0;
                      return (
                        <img
                          key={`big-tablet-${i}`}
                          src={s.bigImage}
                          alt={s.titleLines.join(' ')}
                          loading={i === 0 ? 'eager' : 'lazy'}
                          className="absolute inset-0 h-full w-full object-cover"
                          style={{
                            opacity: local > 0 ? 1 : 0,
                            zIndex: i,
                            WebkitMaskImage: isFirst ? 'none' : stripeMask(local),
                            maskImage: isFirst ? 'none' : stripeMask(local),
                            WebkitMaskSize: '100% 100%',
                            maskSize: '100% 100%',
                          }}
                        />
                      );
                    })}
                  </div>

                  {/* SMALL image — left corner, 55% width */}
                  <div className="absolute bottom-[-80px] left-[-100px] z-20 h-[360px] w-[75%] overflow-hidden shadow-2xl shadow-black/60 ring-1 ring-black/20 rounded-sm bg-[var(--muted)]">
                    {SLIDES.map((s, i) => {
                      const local = Math.min(Math.max(scaled - i, 0), 1);
                      const isFirst = i === 0;
                      return (
                        <img
                          key={`small-tablet-${i}`}
                          src={s.smallImage}
                          alt={s.titleLines.join(' ')}
                          loading="lazy"
                          className="absolute inset-0 h-full w-full object-cover"
                          style={{
                            opacity: isFirst ? 1 : local > 0 ? 1 : 0,
                            zIndex: i,
                            WebkitMaskImage: isFirst ? 'none' : stripeMask(local),
                            maskImage: isFirst ? 'none' : stripeMask(local),
                            WebkitMaskSize: '100% 100%',
                            maskSize: '100% 100%',
                          }}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Mobile Layout (below md) - Collage style */}
              <div className="md:hidden relative w-full px-4">
                {/* Collage layout for mobile */}
                <div className="relative mx-auto h-[45vh] w-full max-w-[400px]">
                  {/* BIG image — 95% width */}
                  <div className="absolute right-0 top-0 h-[42vh] w-[95%] overflow-hidden rounded-sm shadow-2xl shadow-black/60 bg-[var(--muted)]">
                    {SLIDES.map((s, i) => {
                      const local = Math.min(Math.max(scaled - i, 0), 1);
                      const isFirst = i === 0;
                      return (
                        <img
                          key={`big-mobile-${i}`}
                          src={s.bigImage}
                          alt={s.titleLines.join(' ')}
                          loading={i === 0 ? 'eager' : 'lazy'}
                          className="absolute inset-0 h-full w-full object-cover"
                          style={{
                            opacity: local > 0 ? 1 : 0,
                            zIndex: i,
                            WebkitMaskImage: isFirst ? 'none' : stripeMask(local),
                            maskImage: isFirst ? 'none' : stripeMask(local),
                            WebkitMaskSize: '100% 100%',
                            maskSize: '100% 100%',
                          }}
                        />
                      );
                    })}
                  </div>

                  {/* SMALL image — left corner, 45% width */}
                  <div className="absolute bottom-0 left-0 z-20 h-[48%] w-[45%] overflow-hidden shadow-2xl shadow-black/60 ring-1 ring-black/20 rounded-sm bg-[var(--muted)]">
                    {SLIDES.map((s, i) => {
                      const local = Math.min(Math.max(scaled - i, 0), 1);
                      const isFirst = i === 0;
                      return (
                        <img
                          key={`small-mobile-${i}`}
                          src={s.smallImage}
                          alt={s.titleLines.join(' ')}
                          loading="lazy"
                          className="absolute inset-0 h-full w-full object-cover"
                          style={{
                            opacity: isFirst ? 1 : local > 0 ? 1 : 0,
                            zIndex: i,
                            WebkitMaskImage: isFirst ? 'none' : stripeMask(local),
                            maskImage: isFirst ? 'none' : stripeMask(local),
                            WebkitMaskSize: '100% 100%',
                            maskSize: '100% 100%',
                          }}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AmenitiesSection;