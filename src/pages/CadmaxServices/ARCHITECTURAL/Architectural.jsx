import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../../../components/Layout/Header/Navbar";
import Footer from "../../../components/Layout/Footer/Footer";

import archHero from "../../../assets/Images/CadmaxServices/ARCHITECTURAL/architectural-hero.png";
import planningImg from "../../../assets/Images/CadmaxServices/ARCHITECTURAL/planning-masterplan.png";
import facadeImg from "../../../assets/Images/CadmaxServices/ARCHITECTURAL/architectural-facade.png";
import interiorImg from "../../../assets/Images/CadmaxServices/ARCHITECTURAL/interior-design.png";
import contextImg from "../../../assets/Images/CadmaxServices/ARCHITECTURAL/context-detail.png";
import functionImg from "../../../assets/Images/CadmaxServices/ARCHITECTURAL/function-detail.png";
import identityImg from "../../../assets/Images/CadmaxServices/ARCHITECTURAL/identity-detail.png";
import galleryForm from "../../../assets/Images/CadmaxServices/ARCHITECTURAL/gallery-form.png";
import galleryLight from "../../../assets/Images/CadmaxServices/ARCHITECTURAL/gallery-light.png";
import galleryMaterial from "../../../assets/Images/CadmaxServices/ARCHITECTURAL/gallery-material.png";
import galleryCourtyard from "../../../assets/Images/CadmaxServices/ARCHITECTURAL/gallery-courtyard.png";
import galleryInterior from "../../../assets/Images/CadmaxServices/ARCHITECTURAL/gallery-interior-detail.png";
import ctaSpace from "../../../assets/Images/CadmaxServices/ARCHITECTURAL/cta-space.png";

import "./Architectural.css";

const services = [
  {
    number: "01",
    title: "Planning",
    description:
      "Strategic planning that organises relationships between site, programme, movement and future growth—creating a clear foundation for thoughtful development.",
    href: "/services/architectural/planning",
    image: planningImg,
    alt: "Detailed architectural masterplan model viewed from above",
    shape: "planning",
  },
  {
    number: "02",
    title: "Architectural Designing",
    description:
      "Architecture shaped through context, proportion, performance and material expression—transforming ideas into purposeful and recognisable built form.",
    href: "/services/architectural/architectural-designing",
    image: facadeImg,
    alt: "Sculptural contemporary architecture in warm stone and glass",
    shape: "facade",
  },
  {
    number: "03",
    title: "Interior Designing",
    description:
      "Interior environments that extend the architectural idea through material, light, comfort and detail—creating spaces that feel coherent, refined and human.",
    href: "/services/architectural/interior-designing",
    image: interiorImg,
    alt: "Refined interior composed with stone wood and warm ambient light",
    shape: "interior",
  },
];

const philosophy = [
  {
    title: "Context",
    copy: "Every project begins with its site, surroundings, climate and purpose.",
    image: contextImg,
  },
  {
    title: "Function",
    copy: "Spaces are organised to perform clearly, efficiently and intuitively.",
    image: functionImg,
  },
  {
    title: "Identity",
    copy: "Form, material and detail create a distinct and lasting sense of place.",
    image: identityImg,
  },
];

const gallery = [
  { src: galleryForm, alt: "Monolithic architectural form", className: "gallery-a" },
  { src: galleryLight, alt: "Natural light crossing a minimal interior", className: "gallery-b" },
  { src: galleryMaterial, alt: "Natural stone and metal architectural detail", className: "gallery-c" },
  { src: galleryCourtyard, alt: "Quiet contemporary courtyard", className: "gallery-d" },
  { src: galleryInterior, alt: "Travertine, timber and metal interior detail", className: "gallery-e" },
];

const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));

export default function ArchitecturalExperience() {
  const heroRef = useRef(null);
  const servicesRef = useRef(null);
  const massingRef = useRef(null);
  const [activeService, setActiveService] = useState(0);
  const [serviceProgress, setServiceProgress] = useState(0);
  const [massingProgress, setMassingProgress] = useState(0);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const revealElements = document.querySelectorAll("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -8% 0px" },
    );
    revealElements.forEach((element) => observer.observe(element));

    if (reducedMotion) {
      revealElements.forEach((element) => element.classList.add("is-visible"));
      return () => observer.disconnect();
    }

    let ticking = false;
    const updateMotion = () => {
      const pageMax = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      document.documentElement.style.setProperty("--page-progress", String(window.scrollY / pageMax));

      if (servicesRef.current) {
        const rect = servicesRef.current.getBoundingClientRect();
        const travel = Math.max(servicesRef.current.offsetHeight - window.innerHeight, 1);
        const progress = clamp(-rect.top / travel);
        setServiceProgress(progress);
        setActiveService(Math.min(2, Math.floor(progress * 3)));
      }

      if (massingRef.current) {
        const rect = massingRef.current.getBoundingClientRect();
        const progress = clamp((window.innerHeight * 0.82 - rect.top) / (window.innerHeight + rect.height * 0.3));
        setMassingProgress(progress);
      }

      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(updateMotion);
      }
    };
    updateMotion();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const handleHeroPointer = (event) => {
    if (!heroRef.current || window.matchMedia("(pointer: coarse)").matches) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    heroRef.current.style.setProperty("--hero-x", x.toFixed(3));
    heroRef.current.style.setProperty("--hero-y", y.toFixed(3));
  };

  const jumpToService = (index) => {
    const section = servicesRef.current;
    if (!section) return;
    const travel = section.offsetHeight - window.innerHeight;
    window.scrollTo({ top: section.offsetTop + travel * ((index + 0.16) / 3), behavior: "smooth" });
  };

  const active = services[activeService];

  return (
    <>
      <Navbar />
      <main className="arch-page">
        <div className="page-progress" aria-hidden="true" />

        <section
          id="top"
          className="arch-hero"
          ref={heroRef}
          onPointerMove={handleHeroPointer}
          onPointerLeave={() => {
            heroRef.current?.style.setProperty("--hero-x", "0");
            heroRef.current?.style.setProperty("--hero-y", "0");
          }}
        >
          <img className="hero-image" src={archHero} alt="Sculptural contemporary architecture illuminated at dusk" />
          <div className="hero-overlay" />
          <div className="hero-grid" aria-hidden="true" />
         

          <div className="hero-content">
            <div className="hero-copy">
              <p className="eyebrow hero-eyebrow"><span>02</span> / Architectural</p>
              <h1>
                <span className="hero-line"><span>Architecture with</span></span>
                <span className="hero-line"><span>purpose.</span></span>
                <span className="hero-line hero-line-accent"><em>Context shaping</em></span>
                <span className="hero-line"><span>human experience.</span></span>
              </h1>
            </div>

            <div className="hero-aside">
              <p>
                From strategic planning and architectural design to refined interiors, we shape environments that respond to context, perform with purpose and create a lasting visual and human impact.
              </p>
              <a href="#services" className="text-link">Explore our practice <span>↓</span></a>
              <div className="hero-signature">Context / Function / Identity</div>
            </div>
          </div>

          <div className="hero-scroll" aria-hidden="true"><span>Scroll to explore</span><i /></div>
        </section>

        <section className="arch-intro section-pad">
          <div className="intro-rule" />
          <div className="intro-copy" data-reveal>
            <p className="eyebrow dark">Architectural practice</p>
            <h2>From the first line to the <em>lived experience.</em></h2>
            <p className="intro-body">
              Architecture begins with an understanding of place. We bring planning, form, material and interior experience together to create environments that are purposeful, coherent and built to endure.
            </p>
          </div>

          <div className="intro-spatial" aria-hidden="true">
            <span className="depth-word depth-context">Context</span>
            <span className="depth-word depth-function">Function</span>
            <span className="depth-word depth-identity">Identity</span>
            <figure className="floating-mask floating-one"><img src={planningImg} alt="" /></figure>
            <figure className="floating-mask floating-two"><img src={facadeImg} alt="" /></figure>
          </div>
        </section>

        <section id="services" className="services-scroll" ref={servicesRef}>
          <div className="services-stage">
            <div className="services-backdrop" aria-hidden="true"><span key={active.title}>{active.title}</span></div>
            <div className="services-head">
              <p className="eyebrow">Three disciplines / one idea</p>
              <p className="services-index">{active.number} — 03</p>
            </div>

            <div className="services-visuals" style={{ "--service-progress": serviceProgress }}>
              {services.map((service, index) => {
                const distance = index - activeService;
                return (
                  <figure
                    className={`service-mask mask-${service.shape} ${index === activeService ? "is-active" : ""} ${index < activeService ? "is-past" : ""}`}
                    key={service.title}
                    style={{ "--distance": distance, zIndex: 5 - Math.abs(distance) }}
                  >
                    <img src={service.image} alt={service.alt} />
                    <div className="service-image-shade" />
                  </figure>
                );
              })}
            </div>

            <div className="service-content" key={active.title}>
              <span className="service-number">{active.number}</span>
              <h2>{active.title}</h2>
              <p>{active.description}</p>
              <Link to={active.href} className="round-link" aria-label={`Explore ${active.title}`}>
                <span>Explore service</span><i>↗</i>
              </Link>
            </div>

            <div className="service-progress" role="tablist" aria-label="Architectural services">
              {services.map((service, index) => (
                <button
                  key={service.number}
                  type="button"
                  className={index === activeService ? "is-active" : ""}
                  onClick={() => jumpToService(index)}
                  role="tab"
                  aria-selected={index === activeService}
                  aria-label={`Show ${service.title}`}
                ><span>{service.number}</span><i /></button>
              ))}
            </div>
          </div>
          <div className="mobile-services">
            <p className="eyebrow">Three disciplines / one idea</p>
            {services.map((service) => (
              <article className={`mobile-service mobile-${service.shape}`} key={service.title} data-reveal>
                <span>{service.number}</span>
                <figure><img src={service.image} alt={service.alt} /></figure>
                <h2>{service.title}</h2>
                <p>{service.description}</p>
                <Link to={service.href}>Explore service <i>↗</i></Link>
              </article>
            ))}
          </div>
        </section>

        <section id="approach" className="massing-section section-pad" ref={massingRef}>
          <div className="massing-copy" data-reveal>
            <p className="eyebrow dark">Our approach</p>
            <h2>Planning clarity.<br />Architectural character.<br /><em>Interior experience.</em></h2>
            <ol className="approach-list">
              {["Understand the context", "Define spatial relationships", "Shape form and material", "Refine the human experience"].map((step, index) => (
                <li key={step}><span>0{index + 1}</span>{step}</li>
              ))}
            </ol>
          </div>

          <div className="massing-wrap" aria-label="Abstract architectural massing animation">
            <div className="massing-labels" aria-hidden="true"><span>Plan</span><span>Form</span><span>Experience</span></div>
            <div
              className="massing-scene"
              style={{
                "--massing": massingProgress,
                transform: `rotateX(${62 - massingProgress * 10}deg) rotateZ(${-33 + massingProgress * 7}deg) rotateY(${massingProgress * 5}deg)`,
              }}
            >
              <div className="site-plane"><i /><i /><i /><i /></div>
              {[
                { x: 9, y: 15, w: 26, h: 24, rise: 95, delay: 0.02 },
                { x: 39, y: 9, w: 20, h: 34, rise: 145, delay: 0.14 },
                { x: 63, y: 20, w: 28, h: 20, rise: 82, delay: 0.25 },
                { x: 18, y: 50, w: 21, h: 27, rise: 122, delay: 0.32 },
                { x: 44, y: 49, w: 36, h: 29, rise: 66, delay: 0.42 },
              ].map((block, index) => {
                const local = clamp((massingProgress - block.delay) / 0.45);
                return (
                  <div
                    key={index}
                    className={`massing-block block-${index + 1}`}
                    style={{
                      left: `${block.x}%`, top: `${block.y}%`, width: `${block.w}%`, height: `${block.h}%`,
                      transform: `translateZ(${local * block.rise}px)`, opacity: 0.2 + local * 0.8,
                      "--rise": `${local * block.rise}px`,
                    }}
                  />
                );
              })}
              <div className="interior-core" style={{ opacity: clamp((massingProgress - 0.62) / 0.2) }} />
            </div>
            <p className="massing-caption">A spatial study in proportion, light and material.</p>
          </div>
        </section>

        <section className="philosophy section-pad">
          <div className="philosophy-heading" data-reveal>
            <p className="eyebrow dark">Design philosophy</p>
            <h2>Three principles.<br /><em>One coherent place.</em></h2>
          </div>
          <div className="philosophy-list">
            {philosophy.map((item, index) => (
              <article className={`philosophy-row philosophy-${index + 1}`} key={item.title} data-reveal>
                <span className="philosophy-no">0{index + 1}</span>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
                <figure className="philosophy-media"><img src={item.image} alt="" /></figure>
                <span className="philosophy-arrow">↗</span>
              </article>
            ))}
          </div>
        </section>

        <section className="arch-gallery section-pad">
          <div className="gallery-heading" data-reveal>
            <p className="eyebrow">Spatial studies</p>
            <h2>Spaces shaped from <em>every scale.</em></h2>
            <p>From site planning and architectural form to material detail and interior atmosphere.</p>
          </div>
          <div className="gallery-grid">
            {gallery.map((image, index) => (
              <figure className={`gallery-item ${image.className}`} key={image.src} data-reveal>
                <img src={image.src} alt={image.alt} loading="lazy" />
                <span>0{index + 1}</span>
              </figure>
            ))}
          </div>
        </section>

        <section id="contact" className="arch-cta">
          <img className="cta-image" src={ctaSpace} alt="Atmospheric contemporary architecture at dusk" loading="lazy" />
          <div className="cta-overlay" />
          <div className="cta-content" data-reveal>
            <p className="eyebrow">Begin a conversation</p>
            <h2>Have a space<br />in mind?</h2>
            <p className="cta-script">Let's shape it with purpose.</p>
            <p className="cta-body">Share your project vision with our architectural team and begin a conversation around context, function and identity.</p>
            <Link className="cta-button" to="/contact"><span>Discuss your project</span><i>↗</i></Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}