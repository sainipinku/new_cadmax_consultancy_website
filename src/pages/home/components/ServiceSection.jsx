import React, { useRef, useState, useEffect } from 'react';

import img1 from '../../../assets/Images/collage/DGPS.jpg';
import img2 from '../../../assets/Images/collage/TOPOGRAPHICAL.jpg';
import img3 from '../../../assets/Images/collage/ENGINEERING.jpg';
import img4 from '../../../assets/Images/collage/LAND.jpg';
import img5 from '../../../assets/Images/collage/MOBILR.jpg';
import img6 from '../../../assets/Images/collage/ENGINEERING.jpg';

import float1 from '../../../assets/Images/Other/dgps-survey.png';
import float2 from '../../../assets/Images/Other/dgps-survey1.png';
import float3 from '../../../assets/Images/Other/cta-entrance.jpg';
import float4 from '../../../assets/Images/Other/Accuracy.jpg';
import float5 from '../../../assets/Images/Other/dgps-survey.png';
import float6 from '../../../assets/Images/Other/dgps-survey1.png';

const SLIDES = [
  {
    titleLines: ['DGPS', 'Survey'],
    tagline: 'Centimeter-level precision',
    description:
      'High-precision Differential GPS surveying for accurate land measurement and boundary determination across any terrain.',
    bigImage: img1,
    smallImage: float1,
    bigAlt: 'DGPS survey equipment in the field.',
    smallAlt: 'Surveyor using DGPS instrumentation.',
  },
  {
    titleLines: ['Topographical', 'Survey'],
    tagline: 'Detailed terrain intelligence',
    description:
      'Comprehensive terrain mapping and elevation data collection for informed design and planning decisions.',
    bigImage: img2,
    smallImage: float2,
    bigAlt: 'Topographical terrain mapping view.',
    smallAlt: 'Elevation and contour data collection.',
  },
  {
    titleLines: ['Engineering', 'Survey'],
    tagline: 'Built on precise data',
    description:
      'Professional engineering surveys supporting infrastructure and construction projects from groundbreaking to completion.',
    bigImage: img3,
    smallImage: float3,
    bigAlt: 'Engineering survey on a construction site.',
    smallAlt: 'Surveying for infrastructure development.',
  },
  {
    titleLines: ['Land', 'Surveying'],
    tagline: 'Defining boundaries with accuracy',
    description:
      'Expert land surveying services for property boundaries, subdivisions, and development projects of every scale.',
    bigImage: img4,
    smallImage: float4,
    bigAlt: 'Land boundary survey marker.',
    smallAlt: 'Property boundary determination.',
  },
  {
    titleLines: ['Mobile Mapping', '& GIS'],
    tagline: 'Data-driven spatial solutions',
    description:
      'Advanced mobile mapping solutions integrated with GIS for comprehensive spatial data analysis and insight.',
    bigImage: img5,
    smallImage: float5,
    bigAlt: 'Mobile mapping vehicle capturing spatial data.',
    smallAlt: 'GIS spatial data visualization.',
  },
  {
    titleLines: ['Planning &', 'Design'],
    tagline: 'Strategic vision, practical execution',
    description:
      'Strategic planning and architectural design services for sustainable, future-ready development.',
    bigImage: img6,
    smallImage: float6,
    bigAlt: 'Architectural planning and design studio.',
    smallAlt: 'Sustainable development design concept.',
  },
];

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

const ServiceSection = () => {
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
  const scaled = progress * n; // 0..n

  return (
    <section className="services-section-sticky bg-[#0e1210] text-neutral-100">
      <div ref={trackRef} style={{ height: `${n * 100}vh` }} className="relative">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <div className="mx-auto grid h-full max-w-[1400px] grid-cols-1 md:grid-cols-12 md:gap-6 px-4 py-8 md:px-12">
            {/* LEFT: text — vertically centered */}
            <div className="relative flex flex-col justify-center md:col-span-5">
              <div className="relative pl-5 md:pl-8">
                <span className="absolute left-0 top-2 h-20 w-px bg-neutral-500/70 md:h-24" />

                <div className="relative min-h-[200px] md:min-h-[320px]">
                  {SLIDES.map((s, i) => {
                    const local = Math.min(Math.max(scaled - i, 0), 1);
                    // Switch text at 50% of each slide region
                    const current = Math.floor(scaled + 0.5);
                    const visible = current === i;
                    if (!visible) return null;
                    const isFirst = i === 0;
                    // For non-first slides, text progress = how far past the 50% threshold
                    // At threshold (local ≈ 0.5), textLocal = 0 (hidden)
                    // At full (local = 1), textLocal = 1 (fully visible)
                    const textLocal = isFirst ? 1 : Math.min(Math.max((scaled - (i - 0.5)), 0), 1);
                    return (
                      <div key={s.titleLines.join(' ')} className="absolute inset-0">
                        <h2
                          className="font-serif uppercase leading-tight tracking-tight text-neutral-50"
                          style={{
                            fontFamily: "'Cormorant Garamond', serif",
                            fontWeight: 500,
                            fontSize: 'clamp(1.5rem, 3.5vw, 2.8rem)',
                          }}
                        >
                          {s.titleLines.map((line, li) => {
                            const translate = isFirst ? '0%' : `${(1 - textLocal) * 110}%`;
                            return (
                              <span key={li} className="block overflow-hidden">
                                <span
                                  className="block"
                                  style={{
                                    transform: `translateY(${translate})`,
                                    transition: `transform 800ms cubic-bezier(0.7,0,0.2,1) ${li * 90}ms`,
                                  }}
                                >
                                  {line}
                                </span>
                              </span>
                            );
                          })}
                        </h2>

                        <p
                          className="mt-3 max-w-sm text-xs leading-relaxed text-neutral-300 md:mt-5 md:text-sm"
                          style={{
                            fontFamily: "'Inter', sans-serif",
                            opacity: isFirst ? 1 : textLocal,
                            transform: `translateY(${isFirst ? 0 : (1 - textLocal) * 14}px)`,
                            transition: 'opacity 600ms ease 200ms, transform 600ms cubic-bezier(0.7,0,0.2,1) 200ms',
                          }}
                        >
                          {s.description}
                        </p>

                        <p
                          className="mt-2 text-[10px] uppercase tracking-[0.18em] text-[#CAAA79] md:mt-3"
                          style={{ fontFamily: "'Inter', sans-serif" }}
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
                {/* BIG image */}
                <div className="absolute right-0 top-0 h-full w-[85%] overflow-hidden rounded-sm">
                  {SLIDES.map((s, i) => {
                    const local = Math.min(Math.max(scaled - i, 0), 1);
                    const isFirst = i === 0;
                    return (
                      <img
                        key={s.bigImage}
                        src={s.bigImage}
                        alt={s.bigAlt}
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

                {/* SMALL image */}
                <div className="absolute bottom-[8%] left-0 h-[50%] w-[46%] overflow-hidden shadow-2xl shadow-black/60 ring-1 ring-black/20 rounded-sm">
                  {SLIDES.map((s, i) => {
                    const local = Math.min(Math.max(scaled - i, 0), 1);
                    const isFirst = i === 0;
                    return (
                      <img
                        key={s.smallImage}
                        src={s.smallImage}
                        alt={s.smallAlt}
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

export default ServiceSection;