import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useScrollReveal } from '../../../hooks/useScrollReveal';
import { MessageSquare, PenTool, Rocket } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const PROCESS_STEPS = [
  {
    number: '01',
    title: 'Consultation',
    subtitle: 'Understanding Your Vision',
    description: 'We begin with an in-depth consultation to understand your goals, requirements, and vision. Our team listens carefully to ensure every detail is captured.',
    icon: MessageSquare,
    color: '#CAAA79',
  },
  {
    number: '02',
    title: 'Design',
    subtitle: 'Crafting Precision Plans',
    description: 'Our experts create detailed, accurate designs using cutting-edge technology. Every measurement, every line, every detail is meticulously planned.',
    icon: PenTool,
    color: '#CAAA79',
  },
  {
    number: '03',
    title: 'Execution',
    subtitle: 'Delivering Excellence',
    description: 'We bring designs to life with precision execution. Our team ensures timely delivery while maintaining the highest standards of quality.',
    icon: Rocket,
    color: '#CAAA79',
  },
];

const ProcessSection = () => {
  const sectionRef = useRef(null);
  const headerRef = useScrollReveal({ start: 'top 80%' });
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Cards 3D reveal animation
      cardsRef.current.forEach((card, i) => {
        if (!card) return;

        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 100,
            rotateX: 15,
            scale: 0.9,
          },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
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

        // Icon animation
        const icon = card.querySelector('.process-icon-wrapper');
        if (icon) {
          gsap.fromTo(
            icon,
            { scale: 0, rotation: -180 },
            {
              scale: 1,
              rotation: 0,
              duration: 0.8,
              ease: 'back.out(1.7)',
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }

        // Number counter animation
        const number = card.querySelector('.process-number');
        if (number) {
          gsap.fromTo(
            number,
            { opacity: 0, x: -50 },
            {
              opacity: 0.15,
              x: 0,
              duration: 1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }
      });

      // Connecting line animation
      const line = document.querySelector('.process-line');
      if (line) {
        gsap.fromTo(
          line,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.5,
            ease: 'power2.inOut',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-16 md:py-20 lg:py-26 bg-[var(--secondary)] overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[var(--accent)]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[var(--accent)]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-8xl mx-auto px-6 md:px-10 lg:px-24 relative z-10">
        {/* Section header */}
        <div ref={headerRef} className="mb-12 md:mb-16 lg:mb-32">
          <div className="flex items-center gap-4 mb-4 md:mb-6">
            <div className="w-8 h-[1px] bg-[var(--accent)]" />
            <span className="text-xs font-general font-semibold text-[var(--accent)] uppercase tracking-[0.2em]">
              How We Work
            </span>
          </div>
          <h2 className="font-clash text-4xl md:text-5xl lg:text-7xl text-[var(--foreground)] max-w-4xl leading-[1.1]">
            From Vision to <span className="text-[var(--muted-foreground)]">Reality</span>
          </h2>
          <p className="text-[var(--muted-foreground)] font-inter text-sm md:text-base lg:text-lg leading-relaxed max-w-2xl mt-4 md:mt-6">
            A proven three-step process that transforms your ideas into precision-engineered realities
          </p>
        </div>

        {/* Process cards */}
        <div className="relative" style={{ perspective: '1200px' }}>
          {/* Connecting line */}
          <div className="process-line hidden lg:block absolute top-24 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--accent)]/30 to-transparent origin-left" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-6 lg:gap-16">
            {PROCESS_STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.number}
                  ref={(el) => (cardsRef.current[i] = el)}
                  className="relative"
                >
                  {/* Large background number */}
                  <div
                    className="process-number absolute -top-6 md:-top-6 -left-2 md:-left-3 text-[100px] md:text-[110px] lg:text-[150px] font-clash font-bold leading-none pointer-events-none select-none z-0"
                    style={{ color: step.color, opacity: 0.15 }}
                  >
                    {step.number}
                  </div>

                  {/* Card content */}
                  <div className="relative bg-[var(--card)] rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-10 border border-[var(--border)] h-full z-[1]">
                    {/* Icon */}
                    <div className="process-icon-wrapper w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-xl md:rounded-2xl bg-[var(--accent)]/10 flex items-center justify-center mb-4 md:mb-5 lg:mb-6">
                      <Icon className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-[var(--accent)]" />
                    </div>

                    {/* Title */}
                    <h3 className="font-clash text-2xl md:text-2xl lg:text-4xl text-[var(--foreground)] mb-1 md:mb-2">
                      {step.title}
                    </h3>

                    {/* Subtitle */}
                    <p className="text-xs md:text-sm font-general font-semibold text-[var(--accent)] uppercase tracking-wider mb-2 md:mb-4">
                      {step.subtitle}
                    </p>

                    {/* Description */}
                    <p className="text-[var(--muted-foreground)] font-inter text-xs md:text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Step connector arrow (except last) */}
                  {i < PROCESS_STEPS.length - 1 && (
                    <div className="hidden md:hidden lg:flex absolute top-1/2 -right-[54px] transform -translate-y-1/2 z-20">
                      <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-[var(--accent)] flex items-center justify-center shadow-lg">
                        <svg className="w-5 h-5 lg:w-6 lg:h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 md:mt-16 lg:mt-32 text-center">
          <p className="text-[var(--muted-foreground)] font-inter text-sm md:text-base mb-4 md:mb-6">
            Ready to start your project?
          </p>
         <button
  className="group relative inline-flex items-center gap-3 overflow-hidden
  rounded-full border border-white/15
  bg-black px-6 md:px-8 py-3 md:py-4
  text-white font-semibold
  transition-all duration-500 ease-out
  hover:border-[#D4B383]
  hover:bg-[#D4B383]
  hover:text-black
  hover:shadow-[0_15px_45px_rgba(212,179,131,0.45)]"
>
  {/* Animated Shine */}
  <span
    className="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-full"
  >
    <span
      className="absolute inset-y-0 -left-[120%] w-1/2
      skew-x-[-20deg]
      bg-gradient-to-r from-transparent via-white/40 to-transparent
      transition-all duration-1000
      group-hover:left-[130%]"
    />
  </span>

  {/* Content */}
  <span className="relative z-10 flex items-center gap-3 transition-all duration-300 group-hover:gap-4">
    Schedule a Consultation

    <svg
      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M17 8l4 4m0 0l-4 4m4-4H3"
      />
    </svg>
  </span>
</button>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;