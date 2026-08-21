import { useEffect, useRef } from "react";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Navbar from "../../components/Layout/Header/Navbar";
import Footer from "../../components/Layout/Footer/Footer";

// Images — replace these imports with your own local assets any time.
import heroImg from "../../assets/Images/CadmaxServices/hero-development.jpg";
import engImg from "../../assets/Images/CadmaxServices/service-engineering.jpg";
import archImg from "../../assets/Images/CadmaxServices/service-architectural.jpg";
import infraImg from "../../assets/Images/CadmaxServices/service-infrastructure.jpg";
import ctaImg from "../../assets/Images/CadmaxServices/cta-architecture.jpg";

import "./ServicesPage.css";

gsap.registerPlugin(ScrollTrigger);

/* ---------- SERVICE DATA ----------
   Replace `image` and `to` (route) values here as the site grows. */
const SERVICES = [
  {
    num: "01",
    label: "PRECISION / PERFORMANCE / INNOVATION",
    title: "ENGINEERING",
    description:
      "Engineering solutions developed with technical accuracy, practical intelligence and a clear understanding of how every system contributes to the complete built environment.",
    capabilities: [
      "MEP Design",
      "MOBILE MAPPING & GIS ",
      "GEODETIC MAPPING",
      "ENGINEERING SURVEYING ",
      "CONSTRUCTION SURVEY",
      "DETAILED PROJECT REPORTS ",
    ],
    to: "/services/engineering", // route
    image: engImg, // image url
    alt: "Modern commercial building facade with exposed steel bracing and layered glass curtain wall",
    caption: "PRECISION IN EVERY SYSTEM",
    reverse: false,
  },
  {
    num: "02",
    label: "SPACE / FORM / EXPERIENCE",
    title: "ARCHITECTURAL",
    description:
      "Architecture that balances context, functionality and identity—transforming ideas into purposeful environments with a lasting visual and human impact.",
    capabilities: [
      "PLANING",
      "Architectural Designing",
      "Interior Designing",
      
    ],
    to: "/services/architectural", // route
    image: archImg, // image url
    alt: "Luxury modern villa in concrete, stone and glass with reflecting pool at dusk",
    caption: "FORM SHAPED BY PURPOSE",
    reverse: true,
  },
  {
    num: "03",
    label: "SCALE / CONNECTION / PROGRESS",
    title: "INFRASTRUCTURE DEVELOPMENT",
    description:
      "Integrated development solutions that connect communities, strengthen urban systems and deliver reliable infrastructure prepared for future growth.",
    capabilities: [
      "BUILDING CONSTRUCTION ",
      "ROAD CONSTRUCTION",
      "ELECTRICAL SYSTEM INSTALLATION",
      " WATER/SEWER/RAIN WATER SYSTEMS CONSTRUCTION ",
      "BOUNDARY WALL,CLUB HOUSE, PARK, MAIN GATE CONSTRUCTION",
    ],
    to: "/services/infrastructure-development", // route
    image: infraImg, // image url
    alt: "Aerial view of a large highway interchange and cable bridge across a developing urban region",
    caption: "CONNECTING FUTURE GROWTH",
    reverse: false,
  },
];

const MARQUEE_WORDS = [
  "ENGINEERING",
  "ARCHITECTURE",
  "MASTER PLANNING",
  "INFRASTRUCTURE",
  "MEP DESIGN",
  "INTERIOR DESIGN",
  "SITE DEVELOPMENT",
];

function MarqueeRow({ variant, rtl }) {
  const items = [...MARQUEE_WORDS, ...MARQUEE_WORDS];
  return (
    <div className={`sv-marquee-row ${variant}${rtl ? " rtl" : ""}`} aria-hidden="true">
      <div className="sv-marquee-inner">
        {items.map((w, i) => (
          <span key={`${w}-${i}`} className={i % 4 === 2 ? "gold" : undefined}>
            {w} <span className="gold">•</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function ServicesPage() {
  const root = useRef(null);

  useEffect(() => {
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context((self) => {
      const q = self.selector;

      if (reduced) {
        gsap.set(
          q(".sv-line span, .sv-fade, .sv-media-main, .sv-rule"),
          { clearProps: "all", opacity: 1, y: 0, x: 0, scaleX: 1, clipPath: "none" },
        );
        return;
      }

      /* ---- HERO ---- */
      const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });
      heroTl
        .from(q(".sv-hero .sv-eyebrow"), { opacity: 0, letterSpacing: "0.6em", duration: 1 })
        .from(
          q(".sv-hero-line span"),
          { yPercent: 115, duration: 1.15, stagger: 0.11, ease: "expo.out" },
          0.15,
        )
        .from(q(".sv-hero-reveal"), { opacity: 0, y: 26, duration: 0.9, stagger: 0.12 }, 0.55)
        .to(q(".sv-hero-media img"), { scale: 1, duration: 2.4, ease: "power2.out" }, 0);

      gsap.to(q(".sv-hero-media img"), {
        yPercent: 12,
        ease: "none",
        scrollTrigger: { trigger: ".sv-hero", start: "top top", end: "bottom top", scrub: true },
      });

      gsap.fromTo(
        q(".sv-scroll-track span"),
        { yPercent: -100 },
        { yPercent: 250, duration: 2.1, repeat: -1, ease: "power1.inOut" },
      );

      /* ---- shared reveals ---- */
      q(".sv-rule-anim").forEach((el) => {
        gsap.from(el, {
          scaleX: 0,
          duration: 1.2,
          ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play reverse play reverse" },
        });
      });

      q(".sv-line").forEach((el) => {
        gsap.from(el.querySelectorAll("span"), {
          yPercent: 110,
          duration: 1.05,
          ease: "expo.out",
          stagger: 0.09,
          scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play reverse play reverse" },
        });
      });

      q(".sv-fade").forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 30,
          duration: 0.95,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 90%", toggleActions: "play reverse play reverse" },
        });
      });

      /* ---- SERVICE PANELS: layered depth ---- */
      q(".sv-panel").forEach((panel, i) => {
        const media = panel.querySelector(".sv-media-main");
        const stack = panel.querySelector(".sv-media-stack");
        const num = panel.querySelector(".sv-panel-num");
        const detail = panel.querySelector(".sv-media-detail");
        const dir = i % 2 === 0 ? 1 : -1;

        gsap.fromTo(
          media,
          { clipPath: "inset(0% 0% 100% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.5,
            ease: "expo.out",
            scrollTrigger: { trigger: panel, start: "top 78%", toggleActions: "play reverse play reverse" },
          },
        );

        gsap.fromTo(
          stack,
          { rotateY: 2.4 * dir, rotateX: 1.4, y: 60, z: -80 },
          {
            rotateY: 0,
            rotateX: 0,
            y: -50,
            z: 0,
            ease: "none",
            scrollTrigger: { trigger: panel, start: "top bottom", end: "bottom top", scrub: 1 },
          },
        );

        if (num) {
          gsap.to(num, {
            yPercent: 34 * dir,
            ease: "none",
            scrollTrigger: { trigger: panel, start: "top bottom", end: "bottom top", scrub: true },
          });
        }

        if (detail) {
          gsap.to(detail, {
            yPercent: -18,
            ease: "none",
            scrollTrigger: { trigger: panel, start: "top bottom", end: "bottom top", scrub: true },
          });
        }
      });

      /* ---- CTA background ---- */
      gsap.fromTo(
        q(".sv-cta-bg img"),
        { scale: 1.16, yPercent: -4 },
        {
          scale: 1.02,
          yPercent: 4,
          ease: "none",
          scrollTrigger: { trigger: ".sv-cta", start: "top bottom", end: "bottom top", scrub: true },
        },
      );

      /* ---- single pointer listener: hero parallax, image glow, CTA drift ---- */
      const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
      if (fine) {
        const heroImgEl = q(".sv-hero-media img")[0];
        const ctaImgEl = q(".sv-cta-bg img")[0];
        const onMove = (e) => {
          const nx = e.clientX / window.innerWidth - 0.5;
          const ny = e.clientY / window.innerHeight - 0.5;
          if (heroImgEl) gsap.to(heroImgEl, { x: nx * -26, duration: 1.1, ease: "power2.out" });
          if (ctaImgEl) gsap.to(ctaImgEl, { x: nx * -22, duration: 1.2, ease: "power2.out", overwrite: "auto" });
          const target = e.target instanceof Element ? e.target.closest(".sv-media-main") : null;
          if (target) {
            const r = target.getBoundingClientRect();
            const glow = target.querySelector(".sv-glow");
            if (glow) {
              gsap.to(glow, {
                x: e.clientX - r.left,
                y: e.clientY - r.top,
                duration: 0.6,
                ease: "power2.out",
              });
            }
          }
          void ny;
        };
        window.addEventListener("pointermove", onMove, { passive: true });
        self.add(() => window.removeEventListener("pointermove", onMove));
      }
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <Navbar />
      <main className="sv-page" ref={root}>
      {/* ================= 1. CINEMATIC HERO ================= */}
      <section className="sv-hero" aria-labelledby="sv-hero-title">
        {/* Hero image — replace src with your own asset */}
        <div className="sv-hero-media">
          <img src={heroImg} alt="Master-planned luxury residential development at dusk" width={1600} height={1008} />
        </div>

        <div className="sv-hero-top">
          <span className="sv-eyebrow">Our Expertise / Built for the Future</span>
          <div className="sv-hero-panel sv-hero-reveal">
            <span className="num">03</span>
            <span className="sv-eyebrow" style={{ marginLeft: "0.6rem" }}>
              Core SERVICES
            </span>
            <ul>
              <li>Engineering</li>
              <li>Architecture</li>
              <li>Infrastructure</li>
            </ul>
          </div>
        </div>

        <div className="sv-hero-grid">
          <h1 id="sv-hero-title">
            <span className="sv-mask sv-hero-line">
              <span>Designing</span>
            </span>
            <span className="sv-mask sv-hero-line">
              <span>What Comes</span>
            </span>
            <span className="sv-mask sv-hero-line">
              <span>
                <em>Next.</em>
              </span>
            </span>
          </h1>

          <div className="sv-hero-side">
            <div className="sv-rule sv-hero-reveal" />
            <p className="sv-body sv-hero-reveal">
              From technical precision to architectural vision and large-scale infrastructure, we
              create environments that perform, inspire and endure.
            </p>
            <div className="sv-hero-reveal">
              <a className="sv-btn" href="#services-showcase">
                Explore Our Services <ArrowRight size={15} strokeWidth={1.5} aria-hidden="true" />
              </a>
            </div>
            <div className="sv-scroll sv-hero-reveal">
              <div className="sv-scroll-track" aria-hidden="true">
                <span />
              </div>
              <span className="sv-eyebrow">Scroll to Discover</span>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 2. INTRODUCTORY STATEMENT ================= */}
      <section className="sv-intro" aria-labelledby="sv-intro-title">
        <div className="sv-rule sv-rule-anim" />
        <div className="sv-intro-grid">
          <span className="sv-eyebrow gold sv-fade">01 / The Practice</span>
          <h2 id="sv-intro-title">
            <span className="sv-mask sv-line">
              <span>One integrated vision.</span>
            </span>
            <span className="sv-mask sv-line">
              <span>
                <em>Three disciplines</em> shaping
              </span>
            </span>
            <span className="sv-mask sv-line">
              <span>the built environment.</span>
            </span>
          </h2>
          <p className="sv-body sv-fade">
            We combine technical intelligence, human-centred design and development expertise to
            deliver spaces and infrastructure that remain relevant far beyond completion.
          </p>
        </div>
      </section>

      {/* ================= 3. IMMERSIVE SERVICES SHOWCASE ================= */}
      <div className="sv-services" id="services-showcase">
        {SERVICES.map((s) => (
          <section
            key={s.num}
            className={`sv-panel${s.reverse ? " reverse" : ""}`}
            aria-labelledby={`sv-service-${s.num}`}
          >
            <span className="sv-panel-num" aria-hidden="true">
              {s.num}
            </span>

            <div className="sv-panel-content">
              <div className="sv-panel-label sv-fade">
                <span className="idx">{s.num}</span>
                <span className="sv-eyebrow">{s.label}</span>
              </div>

              <a href={s.to} className="sv-panel-title-link">
                <h3 id={`sv-service-${s.num}`} className="sv-mask sv-line">
                  <span>{s.title}</span>
                </h3>
              </a>

              <div className="sv-underline" aria-hidden="true" />

              <p className="sv-body sv-fade">{s.description}</p>

              <ul className="sv-pills sv-fade">
                {s.capabilities.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>

              <div className="sv-fade">
                <a
                  href={s.to}
                  className="sv-explore"
                  aria-label={`Explore our ${s.title.toLowerCase()} service`}
                >
                  Explore Service <ArrowUpRight size={16} strokeWidth={1.5} aria-hidden="true" />
                </a>
              </div>
            </div>

            <div className="sv-panel-media">
              <div className="sv-media-stack">
                <span className="sv-media-frame" aria-hidden="true" />
                <span className="sv-media-line" aria-hidden="true" />
                <a
                  href={s.to}
                  className="sv-media-main"
                  aria-label={`View ${s.title.toLowerCase()} service`}
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.href = s.to;
                  }}
                >
                  <img src={s.image} alt={s.alt} loading="lazy" width={1408} height={1008} />
                  <span className="sv-shade" />
                  <span className="sv-glow" />
                </a>
                <span className="sv-media-detail" aria-hidden="true">
                  <img src={s.image} alt="" loading="lazy" />
                </span>
              </div>
              <div className="sv-caption sv-fade">
                <span aria-hidden="true" />
                <span className="sv-eyebrow">{s.caption}</span>
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* ================= 4. CAPABILITIES MARQUEE ================= */}
      <section className="sv-marquee-section" aria-label="Our capabilities">
        <MarqueeRow variant="filled" rtl={false} />
        <MarqueeRow variant="outline" rtl={true} />
      </section>

      {/* ================= 5. FINAL CTA ================= */}
      <section className="sv-cta" aria-labelledby="sv-cta-title">
        {/* CTA background image — replace src with your own asset */}
        <div className="sv-cta-bg">
          <img src={ctaImg} alt="Sunlit concrete colonnade casting long architectural shadows" loading="lazy" width={1600} height={912} />
        </div>
        <span className="sv-cta-frame" aria-hidden="true" />
        <div className="sv-cta-inner">
          <span className="sv-eyebrow gold sv-fade">Start a Conversation</span>
          <h2 id="sv-cta-title" className="sv-mask sv-line">
            <span>Have a project that demands</span>
            <span>
              more than <em>the expected?</em>
            </span>
          </h2>
          <p className="sv-fade">
            Let's bring engineering intelligence, architectural clarity and development expertise
            together.
          </p>
          <div className="sv-cta-actions sv-fade">
            {/* CTA route */}
            <a className="sv-btn" href="/contact">
              Discuss Your Project <ArrowUpRight size={15} strokeWidth={1.5} aria-hidden="true" />
            </a>
            <a className="sv-btn ghost" href="#services-showcase">
              View All Services
            </a>
          </div>
        </div>
      </section>
      </main>
      <Footer />
    </>
  );
}
