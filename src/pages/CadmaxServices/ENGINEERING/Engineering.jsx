import { useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Navbar from "../../../components/Layout/Header/Navbar";
import Footer from "../../../components/Layout/Footer/Footer";

import engHeroImg from "../../../assets/Images/CadmaxServices/ENGINEERING/ENG-hero.png";
import mepImg from "../../../assets/Images/CadmaxServices/ENGINEERING/eng-mep.jpg";
import gisImg from "../../../assets/Images/CadmaxServices/ENGINEERING/eng-gis.jpg";
import geodeticImg from "../../../assets/Images/CadmaxServices/ENGINEERING/eng-geodetic.jpg";
import surveyingImg from "../../../assets/Images/CadmaxServices/ENGINEERING/eng-surveying.jpg";
import constructionImg from "../../../assets/Images/CadmaxServices/ENGINEERING/eng-construction.jpg";
import dprImg from "../../../assets/Images/CadmaxServices/ENGINEERING/eng-dpr.jpg";
import ctaImg from "../../../assets/Images/CadmaxServices/ENGINEERING/eng-cta.jpg";
import maskImg from "../../../assets/Images/CadmaxServices/ENGINEERING/eng-mask.png";

if (typeof window !== "undefined" && !gsap.core.globals().ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);
}

/* ------------------------------------------------------------------ data */

const SERVICES = [
  {
    num: "01",
    title: "MEP Design",
    description:
      "Integrated mechanical, electrical, plumbing and fire-protection systems designed for safe, efficient and coordinated building performance.",
    capabilities: [
      "Mechanical Design",
      "HVAC & Ventilation",
      "Power & Lighting",
      "Water Supply & Drainage",
      "Plumbing Systems",
      "Fire Protection",
    ],
    to: "/services/engineering/mep-design",
    image: mepImg,
    alt: "Coordinated HVAC ducting and electrical infrastructure inside a modern building services plant room",
    shape: "arch",
  },
  {
    num: "02",
    title: "Mobile Mapping & GIS",
    description:
      "Advanced LiDAR, aerial mapping and GIS solutions that transform complex spatial information into accurate and actionable geographic intelligence.",
    capabilities: [
      "LiDAR Survey",
      "UAV & Airborne Data",
      "Aerial Triangulation",
      "Terrain Modelling",
      "GIS & Remote Sensing",
      "Orthorectification",
      "Image Classification",
      "Data Conversion",
      "Mobile & Terrestrial LiDAR Processing",
    ],
    to: "/services/engineering/mobile-mapping-gis",
    image: gisImg,
    alt: "Aerial LiDAR point cloud mapping of a city corridor rendered in gold and charcoal tones",
    shape: "blade",
  },
  {
    num: "03",
    title: "Geodetic Mapping",
    description:
      "High-precision control and positioning services that establish reliable spatial references for surveying, planning and construction.",
    capabilities: [
      "DGPS Control Survey",
      "Primary Control Network",
      "Static Observation",
      "RTK Observation",
      "Control Point Fixing",
      "Geo-referencing",
      "Setting-out Survey",
    ],
    to: "/services/engineering/geodetic-mapping",
    image: geodeticImg,
    alt: "DGPS geodetic survey instrument on a tripod in an open landscape at golden hour",
    shape: "lens",
  },
  {
    num: "04",
    title: "Engineering Surveying",
    description:
      "Comprehensive land, corridor and infrastructure surveying services that deliver accurate data for planning, design and project execution.",
    capabilities: [
      "Topographical Survey",
      "Highway & Railway Survey",
      "Pipeline Survey",
      "Utility & GPR Survey",
      "Route Survey",
      "Cadastral Survey",
      "Plan & Profile Survey",
      "L-Section & Cross-Section",
      "Levelling & Alignment Survey",
    ],
    to: "/services/engineering/engineering-surveying",
    image: surveyingImg,
    alt: "Surveyor working along a highway and railway corridor under construction",
    shape: "arch",
  },
  {
    num: "05",
    title: "Construction Survey",
    description:
      "Precise construction layout, monitoring and verification services that maintain dimensional control throughout every stage of execution.",
    capabilities: [
      "As-built Survey",
      "Vertical Construction Monitoring",
      "Horizontal Control Monitoring",
      "Dam Site Monitoring",
      "Structural Footprint Layout",
      "Borehole & Test Pit Location",
      "Line & Grade Survey",
      "Route Alignment Marking",
    ],
    to: "/services/engineering/construction-survey",
    image: constructionImg,
    alt: "Survey control instrument and setting-out grid lines on a concrete slab of a structural site",
    shape: "blade",
  },
  {
    num: "06",
    title: "Detailed Project Reports",
    description:
      "End-to-end technical and commercial project documentation covering feasibility, planning, cost, compliance, execution strategy and long-term viability.",
    capabilities: [
      "Site & Feasibility Studies",
      "Market & Demand Analysis",
      "Development Potential",
      "Master Planning",
      "Cost Estimation & BOQ",
      "Financial Analysis",
      "Infrastructure Planning",
      "Statutory Compliance",
      "Project Scheduling",
      "Risk & Viability Assessment",
    ],
    to: "/services/engineering/detailed-project-reports",
    image: dprImg,
    alt: "Master plans, engineering drawings and project planning documents laid out on a desk",
    shape: "lens",
  },
];

/* ------------------------------------------------------------- internals */

function Arrow({ className }) {
  return (
    <svg
      className={className}
      width="34"
      height="12"
      viewBox="0 0 34 12"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M0 6h31" stroke="currentColor" strokeWidth="1" />
      <path d="M26 1l6 5-6 5" stroke="currentColor" strokeWidth="1" fill="none" />
    </svg>
  );
}

function ContourLayer({ variant }) {
  return (
    <svg
      className={"eng-contour eng-contour--" + variant}
      viewBox="0 0 600 600"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      <g fill="none" stroke="currentColor" strokeWidth="0.7">
        <path d="M-20 120C120 60 260 190 400 130s180-30 240-70" />
        <path d="M-20 190C120 130 260 260 400 200s180-30 240-70" />
        <path d="M-20 260C120 200 260 330 400 270s180-30 240-70" />
        <path d="M-20 330C120 270 260 400 400 340s180-30 240-70" />
        <path d="M-20 400C120 340 260 470 400 410s180-30 240-70" />
        <path d="M-20 470C120 410 260 540 400 480s180-30 240-70" />
      </g>
      <g stroke="currentColor" strokeWidth="0.4" opacity="0.6">
        <path d="M150 0v600M300 0v600M450 0v600" />
      </g>
    </svg>
  );
}

function ServiceSection({ service, index }) {
  const rootRef = useRef(null);
  const figureRef = useRef(null);
  const imgRef = useRef(null);
  const bodyRef = useRef(null);
  const arrowRef = useRef(null);
  const reversed = index % 2 === 1;

  useLayoutEffect(() => {
    const el = rootRef.current;
    if (!el) return undefined;

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse =
      typeof window !== "undefined" &&
      window.matchMedia("(hover: none), (pointer: coarse)").matches;

    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set(
          [".eng-anim-line", ".eng-figure", ".eng-num", ".eng-chip"],
          { clearProps: "all", opacity: 1, y: 0, rotateX: 0, z: 0, clipPath: "none" },
        );
        return;
      }

      gsap.from(el.querySelectorAll(".eng-anim-line"), {
        yPercent: 115,
        rotateX: -32,
        z: -90,
        opacity: 0,
        duration: 1.05,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: { trigger: el, start: "top 78%" },
      });

      gsap.from(el.querySelector(".eng-num"), {
        opacity: 0,
        y: 40,
        z: -160,
        duration: 1.1,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 82%" },
      });

      gsap.from(el.querySelectorAll(".eng-chip"), {
        opacity: 0,
        y: 18,
        duration: 0.7,
        ease: "power2.out",
        stagger: 0.035,
        scrollTrigger: { trigger: el, start: "top 68%" },
      });

      gsap.fromTo(
        figureRef.current,
        {
          clipPath: "inset(0% 0% 100% 0%)",
          rotateY: reversed ? -7 : 7,
          rotateX: 5,
          z: -140,
          opacity: 0.2,
        },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          rotateY: 0,
          rotateX: 0,
          z: 0,
          opacity: 1,
          duration: 1.4,
          ease: "power3.out",
          scrollTrigger: { trigger: figureRef.current, start: "top 85%" },
        },
      );

      gsap.fromTo(
        imgRef.current,
        { scale: 1.16, yPercent: -5 },
        {
          scale: 1,
          yPercent: 5,
          ease: "none",
          scrollTrigger: {
            trigger: figureRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );

      gsap.fromTo(
        bodyRef.current,
        { y: 60 },
        {
          y: -30,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );

      if (!coarse) {
        const quickRY = gsap.quickTo(figureRef.current, "rotateY", {
          duration: 0.6,
          ease: "power3.out",
        });
        const quickRX = gsap.quickTo(figureRef.current, "rotateX", {
          duration: 0.6,
          ease: "power3.out",
        });
        const quickTZ = gsap.quickTo(bodyRef.current, "z", {
          duration: 0.6,
          ease: "power3.out",
        });

        const onMove = (event) => {
          const rect = el.getBoundingClientRect();
          const px = (event.clientX - rect.left) / rect.width - 0.5;
          const py = (event.clientY - rect.top) / rect.height - 0.5;
          quickRY(-px * 8);
          quickRX(py * 6);
          quickTZ(26);
        };
        const onLeave = () => {
          quickRY(0);
          quickRX(0);
          quickTZ(0);
        };

        el.addEventListener("pointermove", onMove);
        el.addEventListener("pointerleave", onLeave);

        const arrow = arrowRef.current;
        const quickAX = arrow
          ? gsap.quickTo(arrow, "x", { duration: 0.45, ease: "power3.out" })
          : null;
        const onArrowMove = (event) => {
          const rect = arrow.getBoundingClientRect();
          quickAX((event.clientX - (rect.left + rect.width / 2)) * 0.35);
        };
        const onArrowLeave = () => quickAX && quickAX(0);
        if (arrow) {
          arrow.parentElement.addEventListener("pointermove", onArrowMove);
          arrow.parentElement.addEventListener("pointerleave", onArrowLeave);
        }

        return () => {
          el.removeEventListener("pointermove", onMove);
          el.removeEventListener("pointerleave", onLeave);
          if (arrow) {
            arrow.parentElement.removeEventListener("pointermove", onArrowMove);
            arrow.parentElement.removeEventListener("pointerleave", onArrowLeave);
          }
        };
      }

      return undefined;
    }, el);

    return () => ctx.revert();
  }, [reversed]);

  return (
    <article
      ref={rootRef}
      className={
        "eng-service" +
        (reversed ? " eng-service--reversed" : "") +
        " eng-shape-" +
        service.shape
      }
      aria-labelledby={"svc-" + service.num}
    >
      <div className="eng-service__media">
        <Link
          to={service.to}
          className="eng-figure-link"
          tabIndex={-1}
          aria-hidden="true"
        >
          <div ref={figureRef} className="eng-figure">
            <img
              ref={imgRef}
              src={service.image}
              alt={service.alt}
              width={1280}
              height={1600}
              loading="lazy"
              decoding="async"
            />
            <span className="eng-figure__frame" aria-hidden="true" />
          </div>
        </Link>
        <ContourLayer variant={service.shape} />
      </div>

      <div ref={bodyRef} className="eng-service__body">
        <span className="eng-num">{service.num}</span>

        <h2 id={"svc-" + service.num} className="eng-service__title">
          <span className="eng-line">
            <Link to={service.to} className="eng-title-link eng-anim-line">
              {service.title}
            </Link>
          </span>
        </h2>

        <p className="eng-service__desc">
          <span className="eng-line">
            <span className="eng-anim-line">{service.description}</span>
          </span>
        </p>

        <ul className="eng-caps">
          {service.capabilities.map((cap) => (
            <li key={cap} className="eng-chip">
              {cap}
            </li>
          ))}
        </ul>

        <Link to={service.to} className="eng-explore">
          <span>Explore Service</span>
          <span ref={arrowRef} className="eng-explore__arrow">
            <Arrow />
          </span>
        </Link>
      </div>
    </article>
  );
}

/* ------------------------------------------------------------------ page */

export default function Engineering() {
  const pageRef = useRef(null);
  const ctaRef = useRef(null);
  const ctaBgRef = useRef(null);

  useLayoutEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (reduce) return;

      gsap.from(".eng-hero .eng-anim-line", {
        yPercent: 120,
        rotateX: -40,
        z: -140,
        opacity: 0,
        duration: 1.15,
        ease: "power3.out",
        stagger: 0.09,
        delay: 0.08,
      });

      gsap.from(".eng-hero__aside > *", {
        opacity: 0,
        y: 26,
        z: -60,
        duration: 1,
        ease: "power3.out",
        stagger: 0.1,
        delay: 0.35,
      });

      gsap.fromTo(
        ".eng-hero__media img",
        { scale: 1.12, yPercent: -4 },
        {
          scale: 1,
          yPercent: 8,
          ease: "none",
          scrollTrigger: {
            trigger: ".eng-hero",
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        },
      );

      gsap.to(".eng-hero__deco", {
        yPercent: -18,
        ease: "none",
        scrollTrigger: {
          trigger: ".eng-hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      /* CTA background - same as ServicesPage.jsx */
      gsap.fromTo(
        ctaBgRef.current,
        { scale: 1.16, yPercent: -4 },
        {
          scale: 1.02,
          yPercent: 4,
          ease: "none",
          scrollTrigger: { trigger: ctaRef.current, start: "top bottom", end: "bottom top", scrub: true },
        },
      );

      /* CTA text reveal - same as ServicesPage.jsx (.sv-line + .sv-fade) */
      gsap.from(".eng-cta .eng-line span", {
        yPercent: 110,
        duration: 1.05,
        ease: "expo.out",
        stagger: 0.09,
        scrollTrigger: { trigger: ctaRef.current, start: "top 88%", toggleActions: "play reverse play reverse" },
      });

      gsap.from(".eng-cta .eng-fade", {
        opacity: 0,
        y: 30,
        duration: 0.95,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: { trigger: ctaRef.current, start: "top 90%", toggleActions: "play reverse play reverse" },
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <Navbar />
      <div ref={pageRef} className="eng-page">
      <style>{CSS}</style>

      {/* ------------------------------------------------------------ hero */}
      <section className="eng-hero" aria-labelledby="eng-hero-title">
        <div className="eng-hero__media">
          <img
            src={engHeroImg}
            alt="Engineering hero visual"
            width={1920}
            height={1088}
            fetchPriority="high"
            decoding="async"
          />
        </div>
        <img
          className="eng-hero__deco"
          src={maskImg}
          alt=""
          aria-hidden="true"
          width={1536}
          height={1536}
          loading="lazy"
        />
        <div className="eng-shell eng-hero__grid">
          <div className="eng-hero__head">
            <span className="eng-line eng-eyebrow-wrap">
              <span className="eng-eyebrow eng-anim-line">01 / ENGINEERING</span>
            </span>
            <h1 id="eng-hero-title" className="eng-hero__title">
              <span className="eng-line">
                <span className="eng-anim-line">Engineering intelligence.</span>
              </span>
              <span className="eng-line">
                <span className="eng-anim-line">
                  <em>Precision shaping</em> the
                </span>
              </span>
              <span className="eng-line">
                <span className="eng-anim-line">built environment.</span>
              </span>
            </h1>
          </div>

          <div className="eng-hero__aside">
            <p className="eng-hero__lede">
              From coordinated MEP systems and geospatial intelligence to engineering
              surveys, construction control and detailed project reports, we translate
              complex technical data into accurate, efficient and build-ready outcomes.
            </p>
            <p className="eng-discipline">PRECISION / PERFORMANCE / INNOVATION</p>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------- services */}
      <section className="eng-services eng-shell" aria-label="Engineering sub-services">
        {SERVICES.map((service, index) => (
          <ServiceSection key={service.num} service={service} index={index} />
        ))}
      </section>

      {/* ------------------------------------------------------------- cta */}
      <section ref={ctaRef} className="eng-cta" aria-labelledby="eng-cta-title">
        <div className="eng-cta__mask">
          <img
            ref={ctaBgRef}
            className="eng-cta__bg"
            src={ctaImg}
            alt="Aerial dusk view of a bridge and highway interchange crossing a river valley"
            width={1920}
            height={1088}
            loading="lazy"
            decoding="async"
          />
          <span className="eng-cta__scrim" aria-hidden="true" />
          <ContourLayer variant="cta" />
        </div>

        <div className="eng-cta__content eng-shell">
          <span className="eng-eyebrow eng-eyebrow--onDark eng-fade">START A PROJECT</span>
          <h2 id="eng-cta-title" className="eng-cta__title">
            <span className="eng-line">
              <span>Let&rsquo;s engineer</span>
            </span>
            <span className="eng-line">
              <span>
                what comes <em>next.</em>
              </span>
            </span>
          </h2>
          <p className="eng-cta__caption eng-fade">
            Bring us your site, data or project vision. We will help transform it into a
            precise, practical and build-ready solution.
          </p>
          <Link to="/contact" className="eng-btn eng-fade">
            <span>Discuss Your Project</span>
            <Arrow className="eng-btn__arrow" />
          </Link>
        </div>
      </section>
      </div>
      <Footer />
    </>
  );
}

/* ---------------------------------------------------------------- styles */

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Manrope:wght@300;400;500;600&display=swap');

.eng-page {
  --eng-bg: #F3F0E9;
  --eng-bg-2: #ECE7DE;
  --eng-black: #151515;
  --eng-charcoal: #34322F;
  --eng-body: #5F5A52;
  --eng-gold: #B89462;
  --eng-gold-light: #C9AD82;
  --eng-border: rgba(21, 21, 21, 0.14);
  --eng-ivory: #FAF8F3;
  --eng-display: 'Cormorant Garamond', 'Times New Roman', serif;
  --eng-sans: 'Manrope', 'Inter', system-ui, sans-serif;

  background: var(--eng-bg);
  color: var(--eng-body);
  font-family: var(--eng-sans);
  overflow-x: clip;
  perspective: 1200px;
  perspective-origin: 50% 30%;
}

.eng-page *,
.eng-page *::before,
.eng-page *::after { box-sizing: border-box; }

.eng-shell {
  width: min(92vw, 1680px);
  margin-inline: auto;
}

.eng-line { display: block; overflow: hidden; }
.eng-anim-line { display: inline-block; transform-origin: 50% 100%; will-change: transform; }

.eng-eyebrow {
  display: inline-block;
  font-family: var(--eng-sans);
  font-size: clamp(0.62rem, 0.7vw, 0.78rem);
  letter-spacing: 0.34em;
  text-transform: uppercase;
  color: var(--eng-gold);
  font-weight: 500;
}
.eng-eyebrow--onDark { color: var(--eng-gold-light); }

.eng-page a:focus-visible,
.eng-page button:focus-visible {
  outline: 1px solid var(--eng-gold);
  outline-offset: 6px;
}

/* ---- hero ---- */
.eng-hero {
  position: relative;
  min-height: 100svh;
  padding: clamp(5rem, 12vh, 9rem) 0 clamp(2.5rem, 6vh, 4rem);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  overflow: hidden;
  isolation: isolate;
  transform-style: preserve-3d;
}

.eng-hero__media {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  overflow: hidden;
}
.eng-hero__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transform: scale(1.08);
  will-change: transform;
}
.eng-hero__media::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(200deg, rgba(10, 14, 12, 0.55), rgba(10, 14, 12, 0.75));
}

.eng-hero__deco {
  position: absolute;
  inset: -10% -20% auto auto;
  width: min(70vw, 1100px);
  opacity: 0.5;
  pointer-events: none;
  mix-blend-mode: multiply;
  z-index: 0;
}
.eng-hero__grid {
  display: grid;
  grid-template-columns: minmax(0, 1.35fr) minmax(0, 0.85fr);
  gap: clamp(2rem, 6vw, 7rem);
  align-items: end;
  position: relative;
  z-index: 1;
  margin-top: auto;
  padding-top: clamp(2rem, 5vh, 4rem);
  transform-style: preserve-3d;
}
.eng-eyebrow-wrap { margin-bottom: clamp(1.5rem, 3vw, 2.75rem); }

.eng-hero__title {
  font-family: var(--eng-display);
  font-weight: 400;
  color: var(--eng-ivory);
  font-size: clamp(2.6rem, 6.4vw, 7rem);
  line-height: 0.98;
  letter-spacing: -0.015em;
  margin: 0;
  text-shadow: 0 2px 20px rgba(0, 0, 0, 0.4);
  transform: translateZ(70px);
}
.eng-hero__title em {
  font-style: italic;
  color: var(--eng-gold);
  font-weight: 300;
}
.eng-hero__lede {
  font-size: clamp(0.95rem, 1.05vw, 1.12rem);
  line-height: 1.75;
  color: rgba(250, 248, 243, 0.85);
  max-width: 46ch;
  margin: 0 0 clamp(1.5rem, 3vw, 2.5rem);
  transform: translateZ(30px);
}
.eng-discipline {
  font-size: clamp(0.6rem, 0.72vw, 0.74rem);
  letter-spacing: 0.32em;
  text-transform: uppercase;
  color: rgba(250, 248, 243, 0.7);
  margin: 0;
  padding-top: 1.25rem;
  border-top: 1px solid rgba(250, 248, 243, 0.25);
}

/* ---- services ---- */
.eng-services {
  padding: clamp(5rem, 12vw, 12rem) 0 clamp(4rem, 9vw, 9rem);
  display: flex;
  flex-direction: column;
  gap: clamp(6rem, 14vw, 16rem);
}

.eng-service {
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
  gap: clamp(2rem, 6vw, 7rem);
  align-items: center;
  position: relative;
  perspective: 1200px;
  transform-style: preserve-3d;
  border-top: 1px solid var(--eng-border);
  padding-top: clamp(2rem, 4vw, 4rem);
}
.eng-service--reversed .eng-service__media { order: 2; }
.eng-service--reversed .eng-service__body { order: 1; }

.eng-service__media { position: relative; transform-style: preserve-3d; }
.eng-figure-link { display: block; text-decoration: none; }

.eng-figure {
  position: relative;
  overflow: hidden;
  background: var(--eng-bg-2);
  transform-style: preserve-3d;
  will-change: transform, clip-path;
  height: clamp(360px, 62vh, 760px);
}
.eng-figure img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  will-change: transform;
}
.eng-figure__frame {
  position: absolute;
  inset: 14px;
  border: 1px solid rgba(250, 248, 243, 0.35);
  pointer-events: none;
  transition: inset 0.6s cubic-bezier(0.22, 1, 0.36, 1),
    border-color 0.6s ease;
}
.eng-service:hover .eng-figure__frame {
  inset: 22px;
  border-color: var(--eng-gold-light);
}

.eng-shape-arch .eng-figure { border-radius: 260px 260px 6px 6px; }
.eng-shape-blade .eng-figure { border-radius: 6px 200px 6px 200px; }
.eng-shape-lens .eng-figure { border-radius: 999px 999px 999px 999px / 180px 180px 180px 180px; }

.eng-shape-arch .eng-figure-link { width: 92%; }
.eng-shape-blade .eng-figure-link { width: 100%; margin-left: auto; }
.eng-shape-lens .eng-figure-link { width: 86%; margin-left: 7%; }

.eng-contour {
  position: absolute;
  color: var(--eng-gold);
  opacity: 0.28;
  pointer-events: none;
  width: 60%;
  height: 60%;
}
.eng-contour--arch { right: -8%; bottom: -8%; }
.eng-contour--blade { left: -10%; top: -6%; }
.eng-contour--lens { right: -12%; top: -10%; }
.eng-contour--cta {
  inset: auto 0 0 0;
  width: 100%;
  height: 55%;
  color: var(--eng-ivory);
  opacity: 0.16;
}

.eng-service__body { transform-style: preserve-3d; will-change: transform; }

.eng-num {
  display: block;
  font-family: var(--eng-display);
  font-size: clamp(2.4rem, 4vw, 4.2rem);
  line-height: 1;
  color: var(--eng-gold);
  opacity: 0.55;
  margin-bottom: clamp(0.75rem, 1.5vw, 1.5rem);
  transform: translateZ(20px);
}

.eng-service__title {
  font-family: var(--eng-display);
  font-weight: 400;
  font-size: clamp(1.6rem, 3.2vw, 3.2rem);
  line-height: 0.95;
  letter-spacing: -0.02em;
  text-transform: uppercase;
  color: var(--eng-black);
  margin: 0 0 clamp(1rem, 2vw, 1.75rem);
  transform: translateZ(45px);
  transition: color 0.5s ease;
}
.eng-title-link {
  color: inherit;
  text-decoration: none;
  background-image: linear-gradient(var(--eng-gold), var(--eng-gold));
  background-repeat: no-repeat;
  background-size: 0% 1px;
  background-position: 0 100%;
  transition: background-size 0.6s cubic-bezier(0.22, 1, 0.36, 1), color 0.4s ease;
}
.eng-service:hover .eng-title-link,
.eng-service:hover .eng-service__title { color: var(--eng-gold); }
.eng-service:hover .eng-title-link { background-size: 100% 1px; }

.eng-service__desc {
  font-size: clamp(0.94rem, 1.02vw, 1.06rem);
  line-height: 1.75;
  color: var(--eng-body);
  max-width: 46ch;
  margin: 0 0 clamp(1.5rem, 3vw, 2.5rem);
  transform: translateZ(20px);
}

.eng-caps {
  list-style: none;
  padding: 0;
  margin: 0 0 clamp(1.75rem, 3vw, 2.75rem);
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 0.55rem;
  transform: translateZ(14px);
}
.eng-chip {
  font-size: 0.66rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--eng-ivory);
  border: 1px solid transparent;
  border-radius: 999px;
  padding: 0.5rem 0.95rem;
  background: var(--eng-black);
  transition: background 0.4s ease, color 0.4s ease, border-color 0.4s ease;
}
.eng-chip:hover { background: var(--eng-gold); color: var(--eng-black); border-color: rgba(23, 24, 23, 0.3); }

.eng-explore {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  color: var(--eng-black);
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  padding-bottom: 0.55rem;
  border-bottom: 1px solid var(--eng-border);
  transform: translateZ(40px);
  transition: color 0.4s ease, border-color 0.4s ease;
}
.eng-explore:hover { color: var(--eng-gold); border-color: var(--eng-gold); }
.eng-explore__arrow { display: inline-flex; will-change: transform; }
.eng-service:hover .eng-explore svg { transform: translate(5px, -5px); }
.eng-explore__arrow { transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1); }

/* ---- cta ---- */
.eng-cta {
  position: relative;
  min-height: 88svh;
  display: flex;
  align-items: center;
  padding: clamp(4rem, 12vh, 9rem) 0;
  isolation: isolate;
  transform-style: preserve-3d;
  overflow: hidden;
}
.eng-cta__mask {
  position: absolute;
  inset: 0;
  z-index: -2;
  overflow: hidden;
}
.eng-cta__bg {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transform: scale(1.12);
  will-change: transform;
}
.eng-cta__mask::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(10,14,12,0.72), rgba(10,14,12,0.86));
}
.eng-cta__scrim {
  position: absolute;
  inset: clamp(0.9rem, 2vw, 2rem);
  border: 1px solid rgba(244, 239, 229, 0.28);
  pointer-events: none;
}
.eng-cta__content {
  position: relative;
  z-index: 1;
  max-width: 60rem;
  margin-inline: auto;
  padding: 0 clamp(1.25rem, 5vw, 7rem);
  transform-style: preserve-3d;
}
.eng-cta__title {
  font-family: var(--eng-display);
  font-weight: 400;
  color: #f4efe5;
  font-size: clamp(2.1rem, 5.6vw, 5.4rem);
  line-height: 0.98;
  letter-spacing: -0.02em;
  margin: 1.6rem 0;
  transform: translateZ(60px);
}
.eng-cta__title em {
  font-style: italic;
  color: var(--eng-gold);
}
.eng-cta__caption {
  color: rgba(244, 239, 229, 0.72);
  font-size: clamp(0.95rem, 1.1vw, 1.1rem);
  line-height: 1.75;
  max-width: 44ch;
  margin: 0;
  transform: translateZ(30px);
}
.eng-btn {
  display: inline-flex;
  align-items: center;
  gap: 1.1rem;
  text-decoration: none;
  color: var(--eng-black);
  background: var(--eng-gold);
  border: 1px solid var(--eng-gold);
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  padding: 1rem 1.6rem;
  border-radius: 999px;
  margin-top: clamp(2rem, 4vw, 3rem);
  transform: translateZ(80px);
  transition: background 0.45s ease, color 0.45s ease, border-color 0.45s ease;
}
.eng-btn:hover {
  background: #f4efe5;
  border-color: #f4efe5;
  color: var(--eng-black);
}
.eng-btn__arrow { transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1); }
.eng-btn:hover .eng-btn__arrow { transform: translateX(6px); }

/* ---- responsive ---- */
@media (max-width: 1024px) {
  .eng-hero__grid { grid-template-columns: 1fr; align-items: start; }
  .eng-service,
  .eng-service--reversed { grid-template-columns: 1fr; }
  .eng-service--reversed .eng-service__media,
  .eng-service--reversed .eng-service__body { order: initial; }
  .eng-shape-arch .eng-figure-link,
  .eng-shape-blade .eng-figure-link,
  .eng-shape-lens .eng-figure-link { width: 100%; margin: 0; }
  .eng-figure { height: clamp(300px, 46vh, 460px); }
  .eng-hero__figure { height: clamp(300px, 46vh, 480px); border-radius: 140px 140px 6px 6px; }
  .eng-shape-arch .eng-figure { border-radius: 160px 160px 6px 6px; }
  .eng-shape-lens .eng-figure { border-radius: 999px 999px 999px 999px / 120px 120px 120px 120px; }
  .eng-contour { display: none; }
  .eng-hero__deco { opacity: 0.35; }
}

@media (max-width: 640px) {
  .eng-shell { width: 90vw; }
  .eng-hero__title { font-size: clamp(2.2rem, 10.5vw, 3.2rem); }
  .eng-figure { height: clamp(260px, 42vh, 380px); }
  .eng-chip { font-size: 0.6rem; padding: 0.42rem 0.75rem; }
}

@media (prefers-reduced-motion: reduce) {
  .eng-page * {
    animation: none !important;
    transition: none !important;
  }
  .eng-anim-line,
  .eng-figure,
  .eng-hero__figure,
  .eng-cta__mask { clip-path: none !important; opacity: 1 !important; transform: none !important; }
}
`;
