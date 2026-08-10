import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone } from 'lucide-react';
import ctaBg from '../../../assets/Images/Other/cta-entrance.jpg';

gsap.registerPlugin(ScrollTrigger);

const CONTACT_EMAIL = 'cadmaxconsultancy@gmail.com';
const CONTACT_PHONE = '0141-411-3111';

const ContactSection = () => {
  const sectionRef = useRef(null);
  const innerRef = useRef(null);
  const backgroundRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const inner = innerRef.current;
    const background = backgroundRef.current;

    if (!section || !inner || !background) return;

    const ctx = gsap.context(() => {
      /*
       * =====================================================
       * CONTACT CONTENT — CINEMATIC 3D ENTRY
       * =====================================================
       *
       * IMPORTANT:
       * We animate ONLY the inner content.
       *
       * The main section itself is NOT transformed.
       * This prevents horizontal overflow and avoids
       * conflicts with the sticky Testimonials section.
       */

      gsap.fromTo(
        inner,
        {
          y: 80,
          rotateX: 5,
          scale: 0.98,
          opacity: 0.85,
          transformPerspective: 1200,
        },
        {
          y: 0,
          rotateX: 0,
          scale: 1,
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top 90%',
            end: 'top 35%',
            scrub: 1.2,
            invalidateOnRefresh: true,
          },
        }
      );

      /*
       * =====================================================
       * BACKGROUND IMAGE PARALLAX
       * =====================================================
       *
       * The image moves slightly slower than the page.
       *
       * overflow-hidden on the section clips the scaled image,
       * so it cannot create horizontal page overflow.
       */

      gsap.fromTo(
        background,
        {
          scale: 1.08,
          yPercent: -4,
        },
        {
          scale: 1.14,
          yPercent: 4,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
            invalidateOnRefresh: true,
          },
        }
      );

      /*
       * =====================================================
       * SUBTLE CONTENT DEPTH
       * =====================================================
       *
       * Small movement only.
       * No large translateX / rotateY on the section itself.
       */

      gsap.to(inner, {
        yPercent: -3,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 2,
          invalidateOnRefresh: true,
        },
      });
    }, section);

    /*
     * Refresh ScrollTrigger after layout/images are ready.
     */
    const refresh = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener('load', refresh);

    const timeout = setTimeout(refresh, 300);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener('load', refresh);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="
        contact-section-home
        relative
        z-20
        w-full
        max-w-full
        min-w-0
        min-h-screen
        flex
        items-center
        overflow-hidden
        bg-black
      "
    >
      {/* =====================================================
          BACKGROUND IMAGE
      ===================================================== */}

      <div
        ref={backgroundRef}
        className="
          absolute
          inset-0
          w-full
          h-full
          max-w-full
          pointer-events-none
          will-change-transform
        "
        style={{
          backgroundImage: `url(${ctaBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* =====================================================
          DARK OVERLAY
      ===================================================== */}

      <div
        className="
          absolute
          inset-0
          bg-black/60
          pointer-events-none
        "
      />

      {/* =====================================================
          CONTACT CONTENT
      ===================================================== */}

      <div
        ref={innerRef}
        className="
          relative
          z-10
          w-full
          max-w-7xl
          mx-auto
          px-6
          md:px-16
          lg:px-24
          py-20
          md:py-28
          lg:py-32
          min-w-0
          will-change-transform
        "
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        {/* ===================================================
            EYEBROW
        =================================================== */}

        <div className="flex items-start gap-4 mb-8">
          <div
            className="
              w-8
              h-[1px]
              bg-[#CAAA79]
              shrink-0
              mt-[7px]
            "
          />

          <span
            className="
              text-xs
              font-general
              font-semibold
              text-[#CAAA79]
              uppercase
              tracking-[0.2em]
            "
          >
            Start Your Project
          </span>
        </div>

        {/* ===================================================
            MAIN HEADING
        =================================================== */}

        <h2
          className="
            font-garamond
            text-5xl
            md:text-7xl
            lg:text-8xl
            text-white
            mb-8
            max-w-5xl
            leading-[1.1]
          "
        >
          Let's Build
          <br />

          <span className="italic text-[#CAAA79]">
            Something Great.
          </span>
        </h2>

        {/* ===================================================
            DESCRIPTION
        =================================================== */}

        <p
          className="
            text-white/70
            font-garamond
            text-base
            md:text-lg
            leading-relaxed
            max-w-2xl
            mb-16
          "
        >
          From precise land surveys to complete engineering
          solutions, we're here to transform your vision into
          reality. Whether you need DGPS mapping, topographical
          surveys, or infrastructure planning — our team
          delivers accuracy you can trust.
        </p>

        {/* ===================================================
            CTA BUTTONS
        =================================================== */}

        <div
          className="
            flex
            flex-col
            sm:flex-row
            gap-4
            min-w-0
          "
        >
          {/* EMAIL */}

          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="
              group
              inline-flex
              items-center
              gap-3
              px-6
              py-3.5
              bg-white/10
              backdrop-blur-xl
              border
              border-white/20
              rounded-xl
              text-white
              font-general
              font-semibold
              text-sm
              transition-all
              duration-300
              hover:bg-white/20
              hover:border-white/30
              max-w-full
              min-w-0
            "
          >
            <Mail
              className="
                w-4
                h-4
                text-[#CAAA79]
                shrink-0
              "
            />

            <span className="truncate">
              {CONTACT_EMAIL}
            </span>

            <svg
              className="
                w-4
                h-4
                shrink-0
                transition-transform
                duration-300
                group-hover:translate-x-1
              "
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>

          {/* PHONE */}

          <a
            href={`tel:${CONTACT_PHONE.replace(/\D/g, '')}`}
            className="
              group
              inline-flex
              items-center
              gap-3
              px-6
              py-3.5
              bg-white/10
              backdrop-blur-xl
              border
              border-white/20
              rounded-xl
              text-white
              font-general
              font-semibold
              text-sm
              transition-all
              duration-300
              hover:bg-white/20
              hover:border-white/30
              max-w-full
              shrink-0
            "
          >
            <Phone
              className="
                w-4
                h-4
                text-[#CAAA79]
                shrink-0
              "
            />

            <span>
              {CONTACT_PHONE}
            </span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;