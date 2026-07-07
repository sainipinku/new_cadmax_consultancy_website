import React, { useEffect, useRef, useState } from 'react';

import topoBig from '../../../assets/Images/collage/TOPOGRAPHICAL.jpg';
import dgpsSmall from '../../../assets/Images/collage/DGPS.jpg';
import engBig from '../../../assets/Images/collage/ENGINEERING.jpg';
import landSmall from '../../../assets/Images/collage/LAND.jpg';
import mobilBig from '../../../assets/Images/collage/MOBILR.jpg';

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
    titleLines: ['Topographical', 'Surveys'],
    tagline: 'Centimeter-level precision',
    description:
      'High-accuracy topographical mapping using advanced DGPS and LiDAR technology for comprehensive terrain analysis and land development planning.',
    bigImage: topoBig,
    smallImage: dgpsSmall,
  },
  {
    titleLines: ['Land', 'Engineering'],
    tagline: 'Built on precise data',
    description:
      'End-to-end land engineering solutions from feasibility studies to infrastructure design, ensuring sustainable and cost-effective project execution.',
    bigImage: engBig,
    smallImage: landSmall,
  },
  {
    titleLines: ['Urban & Rural', 'Planning'],
    tagline: 'Strategic vision, practical execution',
    description:
      'Integrated urban and rural planning services that balance growth with environmental stewardship, creating vibrant and resilient communities.',
    bigImage: mobilBig,
    smallImage: landSmall,
  },
  {
    titleLines: ['Digital', 'Solutions'],
    tagline: 'Data-driven spatial intelligence',
    description:
      'Cutting-edge digital transformation for infrastructure projects, leveraging BIM, GIS, and AI-driven analytics for smarter decision-making.',
    bigImage: engBig,
    smallImage: topoBig,
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
    <section className="bg-[#0e1210] text-neutral-100 font-inter">
      <div ref={trackRef} style={{ height: `${n * 100}vh` }} className="relative">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <div className="mx-auto grid h-full max-w-[1400px] grid-cols-1 md:grid-cols-12 md:gap-6 px-4 py-8 md:px-12">
            {/* LEFT: text */}
            <div className="relative flex flex-col justify-center md:col-span-5">
              <div className="relative pl-5 md:pl-8">
                <span className="absolute left-0 top-2 h-20 w-px bg-neutral-500/70 md:h-24" />

                <div className="relative min-h-[200px] md:min-h-[320px]">
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
                          className="font-serif uppercase leading-tight tracking-tight text-neutral-50"
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
                          className="mt-3 max-w-sm text-xs leading-relaxed text-neutral-300 md:mt-5 md:text-sm"
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
                          className="mt-2 text-[10px] uppercase tracking-[0.18em] text-[#CAAA79] md:mt-3"
                          style={{ fontFamily: "'Inter', sans-serif", opacity: showOpacity }}
                        >
                          {s.tagline}
                        </p>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-5 flex items-center gap-3">
                  <div className="h-px w-24 bg-neutral-700 md:w-36">
                    <div className="h-px bg-neutral-100" style={{ width: `${progress * 100}%` }} />
                  </div>
                  <span className="text-[10px] tracking-widest text-neutral-400" style={{ fontFamily: "'Inter', sans-serif" }}>
                    {String(Math.min(Math.floor(scaled) + 1, n)).padStart(2, '0')}
                    <span className="mx-1 text-neutral-600">/</span>
                    {String(n).padStart(2, '0')}
                  </span>
                </div>
              </div>
            </div>

            {/* RIGHT: images */}
            <div className="relative flex items-center justify-center md:col-span-7">
              <div className="relative mx-auto h-[60vh] w-full max-w-[600px] md:h-[70vh]">
                {/* BIG image — right side, 60% so no overlap with small image */}
                <div className="absolute right-0 top-0 h-[80vh] w-[80%] overflow-hidden rounded-sm bg-[#0e1210]">
                  {SLIDES.map((s, i) => {
                    const local = Math.min(Math.max(scaled - i, 0), 1);
                    const isFirst = i === 0;
                    return (
                      <img
                        key={`big-${i}`}
                        src={s.bigImage}
                        alt={s.titleLines.join(' ')}
                        loading={i === 0 ? 'eager' : 'lazy'}
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

                {/* SMALL image — absolute positioned, no overflow */}
                <div className="absolute bottom-[6%] left-0 h-[75%] w-[38%] overflow-hidden shadow-2xl shadow-black/60 ring-1 ring-black/20 rounded-sm bg-[#0e1210]">
                  {SLIDES.map((s, i) => {
                    const local = Math.min(Math.max(scaled - i, 0), 1);
                    const isFirst = i === 0;
                    return (
                      <img
                        key={`small-${i}`}
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
    </section>
  );
};

export default AmenitiesSection;