import React, { useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '../../components/Layout/Header/Navbar';
import Footer from '../../components/Layout/Footer/Footer';
import {
  ArrowRight,
  ArrowUpRight,
  BriefcaseBusiness,
  Building2,
  Clock3,
  DraftingCompass,
  HardHat,
  MapPin,
  Plus,
  Ruler,
  Sparkles,
  Users,
} from 'lucide-react';
import { Link } from 'react-router-dom';

import heroBg from '../../assets/Images/careerpath/cadmax-careers-hero.png';
import ctaBg from '../../assets/Images/careerpath/cadmax-careers-cta.png';
import siteImg from '../../assets/Images/careerpath/career-site.jpg';
import studioImg from '../../assets/Images/careerpath/career-studio.jpg';
import detailImg from '../../assets/Images/careerpath/career-detail.jpg';

import './Careerpath.css';

gsap.registerPlugin(ScrollTrigger);

const DISCIPLINES = [
  {
    id: 'engineering',
    number: '01',
    title: 'Engineering',
    eyebrow: 'Systems that make buildings work',
    roles: ['MEP Engineer', 'Civil Engineer', 'Survey Engineer', 'BIM Modeler'],
    description:
      'Work across building systems, surveying, coordination and technical delivery. We value engineers who can move confidently between drawings, data and site reality.',
    icon: Ruler,
    image: siteImg,
  },
  {
    id: 'architecture',
    number: '02',
    title: 'Architecture & Interiors',
    eyebrow: 'Ideas translated into buildable spaces',
    roles: ['Architect', 'Interior Designer', '3D Visualizer', 'Urban Planner'],
    description:
      'Shape spaces from concept through coordination and detail. Design here stays connected to material, execution, context and the people who will ultimately use it.',
    icon: DraftingCompass,
    image: studioImg,
  },
  {
    id: 'surveying',
    number: '03',
    title: 'Surveying & Geospatial',
    eyebrow: 'Precision from ground truth',
    roles: ['Land Surveyor', 'GIS Engineer', 'Mobile Mapping Engineer', 'CAD Technician'],
    description:
      'Capture, interpret and convert real-world information into dependable project intelligence for planning, design, construction and asset delivery.',
    icon: Building2,
    image: detailImg,
  },
  {
    id: 'delivery',
    number: '04',
    title: 'Project Delivery',
    eyebrow: 'From coordinated drawings to completed work',
    roles: ['Site Engineer', 'Project Coordinator', 'Quantity Surveyor', 'Construction Manager'],
    description:
      'Join teams responsible for coordination, quality, programme, cost and on-site execution across real estate and infrastructure assignments.',
    icon: HardHat,
    image: siteImg,
  },
];

const PRINCIPLES = [
  {
    number: '01',
    title: 'Own the outcome',
    copy: 'Your contribution stays connected to the final result. We value people who take responsibility beyond their immediate task.',
  },
  {
    number: '02',
    title: 'Detail matters',
    copy: 'Accuracy in drawings, surveys, coordination and site decisions compounds into better projects.',
  },
  {
    number: '03',
    title: 'Work across disciplines',
    copy: 'Architecture, engineering, surveying and execution are strongest when teams solve problems together instead of in silos.',
  },
  {
    number: '04',
    title: 'Keep learning',
    copy: 'Tools change quickly. Curiosity, technical depth and the ability to learn from real project constraints matter more.',
  },
];

const JOBS = [
  { title: 'Senior Architect', dept: 'Architecture', location: 'Jaipur', type: 'Full-time', slug: 'senior-architect' },
  { title: 'MEP Design Engineer', dept: 'Engineering', location: 'Jaipur', type: 'Full-time', slug: 'mep-design-engineer' },
  { title: 'Civil Site Engineer', dept: 'Delivery', location: 'Rajasthan', type: 'Site-based', slug: 'civil-site-engineer' },
  { title: 'BIM Modeler', dept: 'Engineering', location: 'Jaipur', type: 'Hybrid', slug: 'bim-modeler' },
  { title: 'Survey Engineer', dept: 'Surveying', location: 'Rajasthan', type: 'Site-based', slug: 'survey-engineer' },
  { title: 'Interior Designer', dept: 'Architecture', location: 'Jaipur', type: 'Full-time', slug: 'interior-designer' },
];

const FILTERS = ['All', 'Engineering', 'Architecture', 'Surveying', 'Delivery'];

const PROCESS = [
  {
    number: '01',
    title: 'Apply',
    copy: 'Share your profile, portfolio or relevant project work for the role that fits your experience.',
  },
  {
    number: '02',
    title: 'Conversation',
    copy: 'We talk about what you have worked on, how you think and the kind of work you want to grow into.',
  },
  {
    number: '03',
    title: 'Work Review',
    copy: 'For technical and design roles, we review practical work, drawings, models, coordination or project decisions together.',
  },
  {
    number: '04',
    title: 'Final Discussion',
    copy: 'We align on responsibilities, team fit, location, expectations and the next step toward joining CADMAX.',
  },
];

function Eyebrow({ children, light = false }) {
  return (
    <div className={`cp-eyebrow ${light ? 'cp-eyebrow-light' : ''}`}>
      <span className="cp-eyebrow-dot" />
      <span>{children}</span>
    </div>
  );
}

export default function CareersPage() {
  const rootRef = useRef(null);
  const heroRef = useRef(null);
  const heroBgRef = useRef(null);
  const previewRef = useRef(null);
  const previewImgRef = useRef(null);

  const [activeDiscipline, setActiveDiscipline] = useState('engineering');
  const [expandedMobile, setExpandedMobile] = useState('engineering');
  const [filter, setFilter] = useState('All');

  const filteredJobs = useMemo(
    () => (filter === 'All' ? JOBS : JOBS.filter((job) => job.dept === filter)),
    [filter],
  );

  const active = DISCIPLINES.find((item) => item.id === activeDiscipline) ?? DISCIPLINES[0];

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) return undefined;

    const ctx = gsap.context(() => {
      const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      heroTl
        .fromTo('.cp-hero-kicker', { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.6 })
        .fromTo(
          '.cp-hero-title .cp-mask-line > span',
          { yPercent: 112 },
          { yPercent: 0, duration: 1, stagger: 0.08 },
          '-=0.3',
        )
        .fromTo('.cp-hero-copy', { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.7 }, '-=0.55')
        .fromTo('.cp-hero-actions', { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.7 }, '-=0.55')
        .fromTo('.cp-hero-meta', { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.65 }, '-=0.4');

      gsap.to(heroBgRef.current, {
        scale: 1.08,
        yPercent: 5,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      gsap.utils.toArray('[data-cp-reveal]').forEach((element) => {
        gsap.fromTo(
          element,
          { autoAlpha: 0, y: 34 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: { trigger: element, start: 'top 88%' },
          },
        );
      });

      gsap.utils.toArray('.cp-image-parallax').forEach((image) => {
        gsap.fromTo(
          image,
          { yPercent: -5, scale: 1.06 },
          {
            yPercent: 5,
            scale: 1.06,
            ease: 'none',
            scrollTrigger: {
              trigger: image.parentElement,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          },
        );
      });

      gsap.fromTo(
        '.cp-cta-inner',
        { autoAlpha: 0, y: 34 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.cp-cta', start: 'top 78%' },
        },
      );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const showPreview = (job, event) => {
    if (!previewRef.current || !previewImgRef.current) return;
    if (!window.matchMedia('(pointer: fine) and (min-width: 900px)').matches) return;

    const discipline = DISCIPLINES.find((item) => item.title.startsWith(job.dept) || item.id === job.dept.toLowerCase());
    previewImgRef.current.src = discipline?.image || siteImg;
    previewRef.current.classList.add('is-visible');
    movePreview(event);
  };

  const movePreview = (event) => {
    if (!previewRef.current) return;
    previewRef.current.style.left = `${event.clientX}px`;
    previewRef.current.style.top = `${event.clientY}px`;
  };

  const hidePreview = () => previewRef.current?.classList.remove('is-visible');

  return (
    <>
      <Navbar />
      <main className="careers-page" ref={rootRef}>
      {/* HERO */}
      <section className="cp-hero" ref={heroRef}>
        <img
          ref={heroBgRef}
          className="cp-hero-bg"
          src={heroBg}
          alt="CADMAX engineers, architects and survey professionals working on a modern real estate project"
          loading="eager"
        />
        <div className="cp-hero-shade" />
        <div className="cp-hero-grid" />

        <div className="cp-shell cp-hero-content">
          <div className="cp-hero-main">
            <p className="cp-hero-kicker">Careers at CADMAX Consultancy</p>

            <h1 className="cp-hero-title cp-serif">
              <span className="cp-mask-line"><span>Build places.</span></span>
              <span className="cp-mask-line"><span>Build expertise.</span></span>
              <span className="cp-mask-line"><span className="cp-hero-accent">Build what comes next.</span></span>
            </h1>

            <p className="cp-hero-copy">
              Join teams working across real estate, engineering, architecture, surveying and project delivery — where technical depth meets work that is visible in the real world.
            </p>

            <div className="cp-hero-actions">
              <a href="#open-positions" className="cp-btn cp-btn-primary">
                View open positions <ArrowUpRight size={16} />
              </a>
              <a href="#career-disciplines" className="cp-btn cp-btn-ghost-light">
                Explore disciplines <ArrowRight size={15} />
              </a>
            </div>
          </div>

          <div className="cp-hero-meta">
            <div>
              <span>Practice</span>
              <strong>Engineering + Design</strong>
            </div>
            <div>
              <span>Projects</span>
              <strong>Real Estate + Infrastructure</strong>
            </div>
            <div>
              <span>Approach</span>
              <strong>Studio to Site</strong>
            </div>
          </div>
        </div>

        <a href="#career-intro" className="cp-scroll-cue" aria-label="Scroll to careers overview">
          <span>Scroll</span>
          <i />
        </a>
      </section>

      {/* INTRO */}
      <section id="career-intro" className="cp-section cp-section-light">
        <div className="cp-shell cp-intro-grid">
          <div data-cp-reveal>
            <Eyebrow>Why CADMAX</Eyebrow>
            <h2 className="cp-display cp-serif">
              The best careers grow where <em>design thinking</em> meets real project responsibility.
            </h2>
          </div>

          <div className="cp-intro-copy" data-cp-reveal>
            <p>
              CADMAX works across the built environment — from surveys and engineering systems to architecture, coordination and execution support. That means the work rarely stays inside one discipline.
            </p>
            <p>
              You will learn from real constraints, collaborate with specialists and see how decisions made in drawings, models and meetings affect what eventually gets built.
            </p>

            <div className="cp-intro-stats">
              <div><strong>04</strong><span>Core disciplines</span></div>
              <div><strong>360°</strong><span>Project exposure</span></div>
              <div><strong>01</strong><span>Shared standard</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* VISUAL STORY */}
      <section className="cp-story-section">
        <div className="cp-shell">
          <div className="cp-story-grid">
            <div className="cp-story-card cp-story-card-large" data-cp-reveal>
              <img className="cp-image-parallax" src={siteImg} alt="CADMAX engineer reviewing construction progress on site" loading="lazy" />
              <div className="cp-story-caption"><span>01</span><p>Site intelligence</p></div>
            </div>
            <div className="cp-story-card" data-cp-reveal>
              <img className="cp-image-parallax" src={studioImg} alt="Design and engineering team collaborating in studio" loading="lazy" />
              <div className="cp-story-caption"><span>02</span><p>Collaborative design</p></div>
            </div>
            <div className="cp-story-card" data-cp-reveal>
              <img className="cp-image-parallax" src={detailImg} alt="Technical construction drawings and detail coordination" loading="lazy" />
              <div className="cp-story-caption"><span>03</span><p>Technical precision</p></div>
            </div>
          </div>
        </div>
      </section>

      {/* DISCIPLINES */}
      <section id="career-disciplines" className="cp-section cp-disciplines">
        <div className="cp-shell">
          <div className="cp-section-head" data-cp-reveal>
            <div>
              <Eyebrow>Where you can grow</Eyebrow>
              <h2 className="cp-display cp-serif">Different disciplines. One connected practice.</h2>
            </div>
            <p>
              Choose the path closest to your experience. The strongest work happens when those paths intersect.
            </p>
          </div>

          <div className="cp-discipline-desktop" data-cp-reveal>
            <div className="cp-discipline-nav">
              {DISCIPLINES.map((item) => {
                const Icon = item.icon;
                const isActive = activeDiscipline === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    className={`cp-discipline-tab ${isActive ? 'is-active' : ''}`}
                    onClick={() => setActiveDiscipline(item.id)}
                    aria-pressed={isActive}
                  >
                    <span className="cp-discipline-tab-icon"><Icon size={18} /></span>
                    <span className="cp-discipline-tab-copy"><small>{item.number}</small><strong>{item.title}</strong></span>
                    <ArrowRight size={17} className="cp-discipline-arrow" />
                  </button>
                );
              })}
            </div>

            <div className="cp-discipline-stage">
              <div className="cp-discipline-image-wrap">
                <img key={active.id} src={active.image} alt={active.title} />
                <div className="cp-discipline-image-overlay" />
                <span className="cp-discipline-stage-number cp-serif">{active.number}</span>
              </div>
              <div className="cp-discipline-content">
                <p className="cp-discipline-kicker">{active.eyebrow}</p>
                <h3 className="cp-serif">{active.title}</h3>
                <p className="cp-discipline-description">{active.description}</p>
                <div className="cp-role-list">
                  {active.roles.map((role) => <span key={role}>{role}</span>)}
                </div>
              </div>
            </div>
          </div>

          <div className="cp-discipline-mobile" data-cp-reveal>
            {DISCIPLINES.map((item) => {
              const Icon = item.icon;
              const isOpen = expandedMobile === item.id;
              return (
                <div className={`cp-mobile-discipline ${isOpen ? 'is-open' : ''}`} key={item.id}>
                  <button type="button" onClick={() => setExpandedMobile(isOpen ? null : item.id)} aria-expanded={isOpen}>
                    <span><Icon size={18} /><strong>{item.title}</strong></span>
                    <Plus size={18} className={isOpen ? 'rotate-45' : ''} />
                  </button>
                  <div className="cp-mobile-discipline-content">
                    <div>
                      <img src={item.image} alt={item.title} />
                      <p>{item.description}</p>
                      <div className="cp-role-list">{item.roles.map((role) => <span key={role}>{role}</span>)}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CULTURE / PRINCIPLES */}
      <section className="cp-section cp-culture">
        <div className="cp-shell">
          <div className="cp-culture-grid">
            <div className="cp-culture-sticky" data-cp-reveal>
              <Eyebrow light>How we work</Eyebrow>
              <h2 className="cp-display cp-serif">A culture built around clarity, craft and accountability.</h2>
              <p>
                We want people who can think independently, communicate clearly and care about the quality of the final outcome.
              </p>
            </div>

            <div className="cp-principles">
              {PRINCIPLES.map((principle) => (
                <article className="cp-principle" key={principle.number} data-cp-reveal>
                  <span className="cp-principle-number cp-serif">{principle.number}</span>
                  <div>
                    <h3 className="cp-serif">{principle.title}</h3>
                    <p>{principle.copy}</p>
                  </div>
                  <Sparkles size={18} />
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* OPEN POSITIONS */}
      {/* <section id="open-positions" className="cp-section cp-jobs">
        <div className="cp-shell">
          <div className="cp-jobs-head" data-cp-reveal>
            <div>
              <Eyebrow light>Open positions</Eyebrow>
              <h2 className="cp-display cp-serif">Find the role where your perspective can make a difference.</h2>
            </div>
            <div className="cp-filter-row">
              {FILTERS.map((item) => (
                <button
                  type="button"
                  key={item}
                  className={`cp-filter ${filter === item ? 'is-active' : ''}`}
                  onClick={() => setFilter(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="cp-job-list" onMouseLeave={hidePreview} data-cp-reveal>
            {filteredJobs.map((job, index) => (
              <Link
                key={job.slug}
                to={`/careers/apply?role=${job.slug}`}
                className="cp-job-row"
                onMouseEnter={(event) => showPreview(job, event)}
                onMouseMove={movePreview}
              >
                <span className="cp-job-index">{String(index + 1).padStart(2, '0')}</span>
                <span className="cp-job-title cp-serif">{job.title}</span>
                <span className="cp-job-meta"><BriefcaseBusiness size={14} /> {job.dept}</span>
                <span className="cp-job-meta"><MapPin size={14} /> {job.location}</span>
                <span className="cp-job-meta"><Clock3 size={14} /> {job.type}</span>
                <ArrowUpRight className="cp-job-arrow" size={20} />
              </Link>
            ))}

            {filteredJobs.length === 0 && (
              <div className="cp-job-empty">No current opening in this discipline. You can still send an open application.</div>
            )}
          </div>
        </div>

        <div className="cp-job-preview" ref={previewRef} aria-hidden="true">
          <img ref={previewImgRef} src={siteImg} alt="" />
        </div>
      </section> */}

      {/* APPLICATION PROCESS */}
      <section className="cp-section cp-process-section">
        <div className="cp-shell">
          <div className="cp-process-heading" data-cp-reveal>
            <Eyebrow>What happens next</Eyebrow>
            <h2 className="cp-display cp-serif">A straightforward path from application to first day.</h2>
          </div>

          <div className="cp-process-grid">
            {PROCESS.map((step) => (
              <article className="cp-process-card" key={step.number} data-cp-reveal>
                <span className="cp-process-number cp-serif">{step.number}</span>
                <div>
                  <h3 className="cp-serif">{step.title}</h3>
                  <p>{step.copy}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FULL-WIDTH IMAGE CTA */}
      <section className="cp-cta">
        <img className="cp-cta-bg" src={ctaBg} alt="A completed modern real estate development at golden hour" loading="lazy" />
        <div className="cp-cta-overlay" />
        <div className="cp-shell cp-cta-inner">
          <div className="cp-cta-copy">
            <Eyebrow light>Start a conversation</Eyebrow>
            <h2 className="cp-serif">Your next project could be the one that changes your career.</h2>
            <p>
              If your experience sits somewhere between engineering, design, surveying and delivery, we would still like to hear from you.
            </p>
            <div className="cp-cta-actions">
              <Link to="/careers/apply" className="cp-btn cp-btn-light">
                Send an open application <ArrowUpRight size={16} />
              </Link>
              <Link to="/services" className="cp-btn cp-btn-ghost-light">
                Explore CADMAX services <ArrowRight size={15} />
              </Link>
            </div>
          </div>

          <div className="cp-cta-note">
            <Users size={18} />
            <span>Architecture · Engineering · Surveying · Project Delivery</span>
          </div>
        </div>
      </section>
      </main>
      <Footer />
    </>
  );
}
