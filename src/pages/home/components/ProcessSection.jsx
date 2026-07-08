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
        const icon = card.querySelector('.process-icon');
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
      className="relative py-24 md:py-26 bg-[#F8F7F4] overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#CAAA79]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#CAAA79]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24 relative z-10">
        {/* Section header */}
        <div ref={headerRef} className="mb-20 md:mb-32">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-8 h-[1px] bg-[#CAAA79]" />
            <span className="text-xs font-general font-semibold text-[#CAAA79] uppercase tracking-[0.2em]">
              How We Work
            </span>
          </div>
          <h2 className="font-clash text-5xl md:text-6xl lg:text-7xl text-[#151515] max-w-4xl leading-[1.1]">
            From Vision to <span className="text-[#636363]">Reality</span>
          </h2>
          <p className="text-[#636363] font-inter text-base md:text-lg leading-relaxed max-w-2xl mt-6">
            A proven three-step process that transforms your ideas into precision-engineered realities
          </p>
        </div>

        {/* Process cards with 3D perspective */}
        <div className="relative" style={{ perspective: '1200px' }}>
          {/* Connecting line */}
          <div className="process-line hidden lg:block absolute top-24 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#CAAA79]/30 to-transparent origin-left" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 lg:gap-16">
            {PROCESS_STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.number}
                  ref={(el) => (cardsRef.current[i] = el)}
                  className="relative group"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* Large background number */}
                  <div
                    className="process-number absolute -top-8 -left-4 text-[120px] md:text-[150px] font-clash font-bold leading-none pointer-events-none select-none"
                    style={{ color: step.color }}
                  >
                    {step.number}
                  </div>

                  {/* Card content */}
                  <div className="relative bg-white rounded-3xl p-8 md:p-10 border border-[#E8E4DD] hover:shadow-2xl hover:shadow-[#CAAA79]/20 transition-all duration-500 hover:-translate-y-2 h-full">
                    {/* Icon */}
                    <div className="process-icon w-16 h-16 rounded-2xl bg-[#CAAA79]/10 flex items-center justify-center mb-6 group-hover:bg-[#CAAA79] group-hover:scale-110 transition-all duration-300">
                      <Icon className="w-8 h-8 text-[#CAAA79] group-hover:text-white transition-colors duration-300" />
                    </div>

                    {/* Title */}
                    <h3 className="font-clash text-3xl md:text-4xl text-[#151515] mb-2 group-hover:text-[#CAAA79] transition-colors duration-300">
                      {step.title}
                    </h3>

                    {/* Subtitle */}
                    <p className="text-sm font-general font-semibold text-[#CAAA79] uppercase tracking-wider mb-4">
                      {step.subtitle}
                    </p>

                    {/* Description */}
                    <p className="text-[#636363] font-inter text-sm leading-relaxed">
                      {step.description}
                    </p>

                    {/* Arrow indicator */}
                    <div className="mt-6 flex items-center gap-2 text-[#CAAA79] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-sm font-general font-semibold">Learn more</span>
                      <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>

                  {/* Step connector arrow (except last) */}
                  {i < PROCESS_STEPS.length - 1 && (
                    <div className="hidden md:flex absolute top-1/2 -right-6 lg:-right-[54px] transform -translate-y-1/2 z-20">
                      <div className="w-12 h-12 rounded-full bg-[#CAAA79] flex items-center justify-center shadow-lg">
                        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
        <div className="mt-20 md:mt-32 text-center">
          <p className="text-[#636363] font-inter text-base mb-6">
            Ready to start your project?
          </p>
         <button
  className="group relative overflow-hidden inline-flex items-center gap-3 px-8 py-4
  rounded-full
  bg-white/10
  backdrop-blur-2xl
  border border-white/40
  text-[#151515]
  text-sm font-semibold
  shadow-xl shadow-black/10
  transition-all duration-500
  hover:bg-[#CAAA79]/90
  hover:border-[#D4B383]
  hover:text-white
  hover:shadow-2xl hover:shadow-[#CAAA79]/40"
>
  <span className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/10 to-transparent opacity-70"></span>

  <span className="relative z-10 flex items-center gap-3 group-hover:gap-4 transition-all duration-500">
    Schedule a Consultation

    <svg
      className="w-4 h-4 transition-all duration-500 group-hover:translate-x-1"
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