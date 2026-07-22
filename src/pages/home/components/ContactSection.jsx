import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useScrollReveal } from '../../../hooks/useScrollReveal';
import { Mail, Phone } from 'lucide-react';
import ctaBg from '../../../assets/Images/Other/cta-entrance.jpg';

gsap.registerPlugin(ScrollTrigger);

// Contact details from contact page
const CONTACT_EMAIL = 'cadmaxconsultancy@gmail.com';
const CONTACT_PHONE = '0141-411-3111';

const ContactSection = () => {
  const sectionRef = useScrollReveal({ start: 'top 80%' });
  const innerRef = useRef(null);

  // 3D slide-over effect as Contact scrolls over sticky Testimonials
  useEffect(() => {
    const el = innerRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { y: 80, rotateX: 6 },
        {
          y: 0,
          rotateX: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            end: 'top 40%',
            scrub: 1.2,
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="contact-section-home relative min-h-screen flex items-center overflow-hidden z-20" style={{ transformStyle: 'preserve-3d' }}>
      {/* Background Image */}
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${ctaBg})` }} />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      <div ref={innerRef} className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24 relative z-10 py-24 md:py-32 w-full">
        {/* Eyebrow */}
        <div className="flex items-start gap-4 mb-8">
          <div className="w-8 h-[1px] bg-[#CAAA79]" />
          <span className="text-xs font-general font-semibold text-[#CAAA79] uppercase tracking-[0.2em]">
            Start Your Project
          </span>
        </div>

        {/* Main Heading */}
        <h2 className="font-clash text-5xl md:text-7xl lg:text-8xl text-white mb-8 max-w-5xl leading-[1.1]">
          Let's Build <br />
          <span className="italic text-[#CAAA79]">Something Great.</span>
        </h2>

        {/* Description */}
        <p className="text-white/70 font-inter text-base md:text-lg leading-relaxed max-w-2xl mb-16">
          From precise land surveys to complete engineering solutions, we're here to transform your vision into reality. Whether you need DGPS mapping, topographical surveys, or infrastructure planning — our team delivers accuracy you can trust.
        </p>

        {/* CTA Buttons Row */}
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Email Button */}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="group inline-flex items-center gap-3 px-6 py-3.5 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl text-white font-general font-semibold text-sm transition-all duration-300 hover:bg-white/20 hover:border-white/30"
          >
            <Mail className="w-4 h-4 text-[#CAAA79]" />
            <span>{CONTACT_EMAIL}</span>
            <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>

          {/* Phone Button */}
          <a
            href={`tel:${CONTACT_PHONE.replace(/\D/g, '')}`}
            className="group inline-flex items-center gap-3 px-6 py-3.5 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl text-white font-general font-semibold text-sm transition-all duration-300 hover:bg-white/20 hover:border-white/30"
          >
            <Phone className="w-4 h-4 text-[#CAAA79]" />
            <span>{CONTACT_PHONE}</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;