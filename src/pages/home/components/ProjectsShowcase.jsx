import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: 'Shyamashish Brij Vatika',
    location: 'Kalwar Road, Jaipur',
    category: 'Township',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80',
    size: 'large', // spans 7 columns
  },
  {
    title: 'Club House',
    location: 'Bichpadi, Ajmer Road, Jaipur',
    category: 'Architecture',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
    size: 'medium', // spans 5 columns
  },
  {
    title: 'Dipendra Ji House',
    location: 'Goner Road, Jaipur',
    category: 'Residential',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80',
    size: 'medium', // spans 5 columns
  },
  {
    title: 'Sandeep Saraswat Ji',
    location: 'Beelwa Tonk Road, Jaipur',
    category: 'Residential',
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80',
    size: 'large', // spans 7 columns
  },
];

const ProjectsShowcase = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Cards staggered reveal with alternating directions
      cardsRef.current.forEach((card, i) => {
        if (!card) return;

        const isEven = i % 2 === 0;
        const xOffset = isEven ? -100 : 100;

        gsap.fromTo(
          card,
          {
            opacity: 0,
            x: xOffset,
            y: 80,
            scale: 0.95,
          },
          {
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        // Parallax effect on image
        const image = card.querySelector('.project-image');
        if (image) {
          gsap.to(image, {
            yPercent: -15,
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
            },
          });
        }
      });
    }, sectionRef);

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-32 md:py-40 bg-[var(--secondary)] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        {/* Section Header */}
        <div ref={headerRef} className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-20 md:mb-32">
          <div className="max-w-3xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-8 h-[1px] bg-[var(--accent)]" />
              <span className="text-xs font-general font-semibold text-[var(--accent)] uppercase tracking-[0.3em]">
                Featured Projects
              </span>
            </div>
            <h2 className="font-clash text-5xl md:text-6xl lg:text-7xl text-[var(--foreground)] leading-[0.95]">
              Projects that define
              <br />
              <span className="text-[var(--muted-foreground)]">spaces.</span>
            </h2>
          </div>
          <button className="group inline-flex items-center gap-3 text-sm font-general font-semibold text-[var(--muted-foreground)] hover:text-[var(--accent)] transition-colors w-fit">
            <span className="uppercase tracking-wider">View All Projects</span>
            <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </button>
        </div>

        {/* Asymmetrical Masonry Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
          {projects.map((project, i) => {
            const isLarge = project.size === 'large';
            const colSpan = isLarge ? 'lg:col-span-7' : 'lg:col-span-5';
            const height = isLarge ? 'h-[600px] md:h-[700px]' : 'h-[500px] md:h-[600px]';

            return (
              <div
                key={i}
                ref={(el) => (cardsRef.current[i] = el)}
                className={`group relative ${colSpan} ${height} rounded-[28px] overflow-hidden cursor-pointer`}
              >
                {/* Project Image */}
                <img
                  src={project.image}
                  alt={project.title}
                  className="project-image absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Subtle gradient overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                {/* Content */}
                <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-end">
                  {/* Category */}
                  <div className="mb-4">
                    <span className="inline-block text-xs font-general font-semibold text-white/90 uppercase tracking-[0.2em]">
                      {project.category}
                    </span>
                  </div>

                  {/* Project Name */}
                  <h3 className="font-clash text-3xl md:text-4xl lg:text-5xl text-white font-semibold mb-3 leading-tight">
                    {project.title}
                  </h3>

                  {/* Location */}
                  <p className="text-white/75 font-inter text-sm md:text-base mb-6">
                    {project.location}
                  </p>

                  {/* View Project Link */}
                  <div className="flex items-center gap-2 text-white/90 group/link">
                    <span className="text-sm font-general font-semibold uppercase tracking-wider">
                      View Project
                    </span>
                    <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1 group-hover/link:-translate-y-1" />
                  </div>
                </div>

                {/* Hover shadow effect */}
                <div className="absolute inset-0 rounded-[28px] shadow-[0_20px_60px_rgba(0,0,0,0)] group-hover:shadow-[0_30px_80px_rgba(0,0,0,0.3)] transition-shadow duration-600 pointer-events-none" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProjectsShowcase;