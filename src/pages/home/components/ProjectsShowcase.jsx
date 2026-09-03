import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import { createCardStagger, createImageParallax } from '../../../animations/scrollMotion';
import CongoAfricaImage from "../../../assets/Images/home/congo_africa.png";
import DravyavatiRevierImage from "../../../assets/Images/home/dravyavati_revier.png";
import RingRoadImage from "../../../assets/Images/home/ring_road.png";
import VatikaImage from "../../../assets/Images/home/vatika_city.png";
gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: 'Congo africa',
    location: 'Congo, Africa',
    category: 'engineering survey,  master planing, architecture , structure.',
    image: CongoAfricaImage,
    size: 'large', // spans 7 columns
  },
  {
    title: 'Dravyavati River',
    location: 'Jaipur, Rajasthan',
    category: ' initial mapping, land planning, and engineering survey',
    image: DravyavatiRevierImage,
    size: 'medium', // spans 5 columns
  },
  {
    title: 'engineering survey',
    location: 'Jaipur, Rajasthan',
    category: 'engineering survey',
    image: RingRoadImage,
    size: 'medium', // spans 5 columns
  },
  {
    title: 'Vatika infotech',
    location: 'Jaipur, Rajasthan',
    category: 'engineering survey, master planning',
    image: VatikaImage,
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

      // Use reusable card stagger animation
      const cards = cardsRef.current.filter(Boolean);
      if (cards.length) {
        createCardStagger(cards, {
          y: 80,
          opacity: true,
          scale: true,
          rotateX: 2,
          stagger: 0.15,
          duration: 1.2,
          ease: 'power3.out',
          start: 'top 85%',
          intensity: 0.8,
        });
      }

      // Add parallax to each project image
      cards.forEach((card, i) => {
        if (!card) return;
        const image = card.querySelector('.project-image');
        if (image) {
          createImageParallax(image, card, {
            yPercent: 12,
            scale: 1.08,
            scrub: 1.2,
            intensity: 0.7,
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
      className="relative py-20 md:py-28 lg:py-32 bg-[var(--secondary)] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        {/* Section Header */}
        <div ref={headerRef} className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 md:gap-8 mb-12 md:mb-20">
          <div className="max-w-3xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-8 h-[1px] bg-[var(--accent)]" />
              <span className="text-xs font-general font-semibold text-[var(--accent)] uppercase tracking-[0.3em]">
                Featured Projects
              </span>
            </div>
            <h2 className="font-garamond text-5xl md:text-6xl lg:text-7xl text-[var(--foreground)] leading-[0.95]">
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
            const height = isLarge ? 'h-[400px] md:h-[450px] lg:h-[650px]' : 'h-[350px] md:h-[400px] lg:h-[550px]';

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
                  <h3 className="font-garamond text-3xl md:text-4xl lg:text-5xl text-white font-semibold mb-3 leading-tight">
                    {project.title}
                  </h3>

                  {/* Location */}
                  <p className="text-white/75 font-garamond text-sm md:text-base mb-6">
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