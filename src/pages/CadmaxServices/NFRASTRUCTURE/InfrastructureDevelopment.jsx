
import { useLayoutEffect, useRef } from "react";
import {
  ArrowDown,
  ArrowLeft,
  ArrowUpRight,
  Building2,
  Droplets,
  Route,
  Trees,
  Zap,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Navbar from "../../../components/Layout/Header/Navbar";
import Footer from "../../../components/Layout/Footer/Footer";

import "./InfrastructureDevelopment.css";

// Local infrastructure images — src/assets/Images/CadmaxServices/INFRASTRUCTURE
import infraHeroImg from "../../../assets/Images/CadmaxServices/INFRASTRUCTURE/infra-hero.webp";
import infraBuildingImg from "../../../assets/Images/CadmaxServices/INFRASTRUCTURE/infra-building.png";
import infraRoadImg from "../../../assets/Images/CadmaxServices/INFRASTRUCTURE/infra-road.webp";
import infraWaterImg from "../../../assets/Images/CadmaxServices/INFRASTRUCTURE/infra-utilities.webp";
import infraElectricalImg from "../../../assets/Images/CadmaxServices/INFRASTRUCTURE/infra-electrical.png";
import infraPublicImg from "../../../assets/Images/CadmaxServices/INFRASTRUCTURE/infra-public.png";
import infraCtaImg from "../../../assets/Images/CadmaxServices/INFRASTRUCTURE/infrastructure-cta.webp";

export default function InfrastructureDevelopment() {
  const pageRef = useRef(null);
  const heroRef = useRef(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return undefined;

    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".idp-hero-word > span",
        { yPercent: 112, rotate: 2 },
        {
          yPercent: 0,
          rotate: 0,
          duration: 1.25,
          stagger: 0.11,
          ease: "power4.out",
        },
      );

      gsap.fromTo(
        ".idp-hero-fade",
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          delay: 0.45,
          stagger: 0.08,
          ease: "power3.out",
        },
      );

      gsap.fromTo(
        ".idp-hero-media",
        { clipPath: "polygon(48% 0,48% 0,48% 100%,48% 100%)", scale: 1.09 },
        {
          clipPath: "polygon(0 0,100% 0,100% 100%,0 100%)",
          scale: 1,
          duration: 1.5,
          ease: "power4.inOut",
        },
      );

      gsap.utils.toArray("[data-idp-reveal]").forEach((element) => {
        gsap.fromTo(
          element,
          { opacity: 0, y: 48 },
          {
            opacity: 1,
            y: 0,
            duration: 0.95,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });

      gsap.utils.toArray("[data-idp-image]").forEach((element, index) => {
        gsap.fromTo(
          element,
          {
            clipPath:
              index % 2 === 0
                ? "polygon(0 0,0 0,0 100%,0 100%)"
                : "polygon(100% 0,100% 0,100% 100%,100% 100%)",
          },
          {
            clipPath: "polygon(0 0,100% 0,100% 100%,0 100%)",
            duration: 1.25,
            ease: "power4.inOut",
            scrollTrigger: { trigger: element, start: "top 84%" },
          },
        );
      });

      gsap.fromTo(
        ".idp-road-line",
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".idp-road",
            start: "top 75%",
            end: "bottom 45%",
            scrub: 1,
          },
        },
      );

      gsap.fromTo(
        ".idp-pipe-ring",
        { scale: 0.55, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          stagger: 0.13,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: ".idp-water", start: "top 70%" },
        },
      );

      gsap.fromTo(
        ".idp-wire",
        { strokeDashoffset: 900 },
        {
          strokeDashoffset: 0,
          duration: 2.1,
          ease: "power2.inOut",
          scrollTrigger: { trigger: ".idp-electrical", start: "top 72%" },
        },
      );

      mm.add("(min-width: 1024px)", () => {
        gsap.to(".idp-hero-img", {
          yPercent: 12,
          scale: 1.08,
          ease: "none",
          scrollTrigger: {
            trigger: ".idp-hero",
            start: "top top",
            end: "bottom top",
            scrub: 1.1,
          },
        });

        gsap.to(".idp-building-img", {
          yPercent: 11,
          rotateZ: 0.8,
          ease: "none",
          scrollTrigger: {
            trigger: ".idp-building",
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        });

        gsap.to(".idp-road-img", {
          xPercent: -7,
          scale: 1.1,
          ease: "none",
          scrollTrigger: {
            trigger: ".idp-road",
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        });

        gsap.to(".idp-water-img", {
          yPercent: 13,
          scale: 1.08,
          ease: "none",
          scrollTrigger: {
            trigger: ".idp-water",
            start: "top bottom",
            end: "bottom top",
            scrub: 1.15,
          },
        });

        gsap.to(".idp-public-img", {
          scale: 1.12,
          ease: "none",
          scrollTrigger: {
            trigger: ".idp-public",
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        });

        gsap.to(".idp-cta-img", {
          scale: 1.12,
          ease: "none",
          scrollTrigger: {
            trigger: ".idp-cta",
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        });
      });
    }, pageRef);

    return () => {
      mm.revert();
      ctx.revert();
    };
  }, []);

  const handleHeroMove = (event) => {
    if (!heroRef.current || event.pointerType === "touch") return;
    const bounds = heroRef.current.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    heroRef.current.style.setProperty("--pointer-x", `${x * 14}px`);
    heroRef.current.style.setProperty("--pointer-y", `${y * 10}px`);
  };

  const resetHero = () => {
    heroRef.current?.style.setProperty("--pointer-x", "0px");
    heroRef.current?.style.setProperty("--pointer-y", "0px");
  };

  return (
    <>
      <Navbar />
      <main ref={pageRef} className="idp-page overflow-clip bg-[#f4f1eb] text-[#171817]">
      {/* Existing website header stays outside this component. */}
      <section
        ref={heroRef}
        onPointerMove={handleHeroMove}
        onPointerLeave={resetHero}
        className="idp-hero relative min-h-[92svh] overflow-hidden bg-[#121312] text-[#f4f1eb]"
      >
        <div className="idp-blueprint absolute inset-0" aria-hidden="true" />

        <figure className="idp-hero-media absolute inset-y-0 right-0 w-full overflow-hidden lg:w-[62%]">
          <img
            src={infraHeroImg}
            alt="Aerial view of integrated roads, public spaces and urban infrastructure"
            className="idp-hero-img h-[112%] w-full -translate-y-[6%] object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,#121312_0%,rgba(18,19,18,.78)_26%,rgba(18,19,18,.15)_70%)]" />
          <span className="idp-image-frame" aria-hidden="true" />
        </figure>

        <span className="idp-hero-index idp-serif absolute right-[-.03em] top-[12%] text-[clamp(13rem,35vw,40rem)] leading-none text-white/[.045]" aria-hidden="true">03</span>

        <div className="relative z-10 mx-auto flex min-h-[92svh] max-w-[1800px] flex-col justify-between px-5 pb-10 pt-28 sm:px-8 lg:px-12 lg:pb-14 xl:px-16">
          <a href="/services" className="idp-hero-fade inline-flex w-fit items-center gap-3 text-[9px] font-semibold uppercase tracking-[.24em] text-white/60 transition-colors hover:text-[#d5b177]">
            <ArrowLeft size={14} /> All services
          </a>

          <div>
            <p className="idp-hero-fade mb-6 flex items-center gap-3 text-[9px] font-semibold uppercase tracking-[.3em] text-[#d5b177]">
              <span className="h-px w-9 bg-[#c9a56a]" />03 / Scale · Connection · Progress
            </p>
            <h1 className="idp-serif max-w-[1320px] text-[clamp(4.2rem,10.4vw,12rem)] leading-[.76] tracking-[-.055em]">
              <span className="idp-hero-word block overflow-hidden pb-[.08em]"><span className="block">Infrastructure</span></span>
              <span className="idp-hero-word block overflow-hidden pb-[.1em]"><span className="block italic text-[#d5b177]">Development.</span></span>
            </h1>

            <div className="mt-8 grid gap-7 border-t border-white/25 pt-6 lg:grid-cols-[1.2fr_.8fr_auto] lg:items-end">
              <p className="idp-hero-fade max-w-2xl text-sm leading-7 text-white/68 sm:text-base">
                CADMAX coordinates construction, mobility, utilities and public spaces as one dependable development system—built for performance today and growth tomorrow.
              </p>
              <p className="idp-hero-fade text-[8px] font-semibold uppercase leading-6 tracking-[.2em] text-white/48 lg:text-center">05 connected sub-services<br />01 integrated delivery vision</p>
              <a href="#infrastructure-sub-services" className="idp-hero-fade group inline-flex w-fit items-center gap-3 rounded-full bg-[#f4f1eb] px-6 py-4 text-[9px] font-semibold uppercase tracking-[.2em] text-[#121312] transition-colors hover:bg-[#c9a56a]">
                Explore sub-services <ArrowDown size={14} className="transition-transform group-hover:translate-y-1" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-24 sm:px-8 lg:px-12 lg:py-36 xl:px-16">
        <div className="mx-auto grid max-w-[1700px] gap-10 border-b border-black/15 pb-20 lg:grid-cols-[.35fr_1.25fr_.55fr] lg:items-start">
          <p data-idp-reveal className="text-[9px] font-semibold uppercase tracking-[.28em] text-[#9a7d55]">The infrastructure brief</p>
          <h2 data-idp-reveal className="idp-serif text-[clamp(3.5rem,7vw,8.2rem)] leading-[.86] tracking-[-.045em]">Not separate works. <em className="text-[#aa895b]">One living network.</em></h2>
          <p data-idp-reveal className="text-sm leading-7 text-[#666] lg:pt-24">From the first structural grid to the final entrance gate, every layer is planned around access, capacity, safety, serviceability and long-term value.</p>
        </div>
      </section>

      <section id="infrastructure-sub-services" className="pb-24 lg:pb-40">
        <div className="px-5 sm:px-8 lg:px-12 xl:px-16">
          <div className="mx-auto flex max-w-[1700px] flex-col gap-5 pb-16 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p data-idp-reveal className="text-[9px] font-semibold uppercase tracking-[.28em] text-[#9a7d55]">Infrastructure sub-services</p>
              <h2 data-idp-reveal className="idp-serif mt-5 text-[clamp(3.6rem,7vw,8rem)] leading-[.86] tracking-[-.045em]">Five scopes.<br /><em className="text-[#aa895b]">One outcome.</em></h2>
            </div>
            <p data-idp-reveal className="max-w-md text-sm leading-7 text-[#666]">Each discipline has its own visual language below—connected by the same technical and delivery intelligence.</p>
          </div>
        </div>

        {/* 01 — BUILDING CONSTRUCTION */}
        <article className="idp-building relative px-5 py-20 sm:px-8 lg:px-12 lg:py-28 xl:px-16">
          <div className="idp-structural-grid absolute inset-0" aria-hidden="true" />
          <div className="relative mx-auto grid max-w-[1700px] gap-12 lg:grid-cols-[.78fr_1.22fr] lg:items-center">
            <div className="relative z-10 lg:pr-10">
              <div data-idp-reveal className="mb-12 flex items-center justify-between border-b border-black/15 pb-5">
                <span className="text-[9px] font-semibold uppercase tracking-[.24em] text-[#9a7d55]">01 / Structure · Coordination · Delivery</span>
                <Building2 size={18} strokeWidth={1.35} />
              </div>
              <span className="idp-serif text-[clamp(7rem,13vw,14rem)] leading-none text-black/[.06]">01</span>
              <h3 data-idp-reveal className="idp-serif -mt-12 text-[clamp(4rem,7vw,8.4rem)] leading-[.82] tracking-[-.045em]">Building<br /><em className="text-[#aa895b]">Construction</em></h3>
              <p data-idp-reveal className="mt-8 max-w-xl text-sm leading-7 text-[#666] sm:text-base">Coordinated construction delivery for residential, commercial and institutional buildings—from structural execution and material planning to integrated services and finishing control.</p>
              <div data-idp-reveal className="mt-8 flex flex-wrap gap-2 text-[8px] font-semibold uppercase tracking-[.15em]">
                {["Civil works", "Structural execution", "MEP coordination", "Quality control"].map((item) => <span key={item} className="rounded-full border border-black/15 px-4 py-2.5">{item}</span>)}
              </div>
            </div>

            <figure data-idp-image className="idp-building-frame relative h-[520px] overflow-hidden lg:h-[720px]">
              <img src={infraBuildingImg} alt="Multi-storey building under organized construction" loading="lazy" className="idp-building-img h-[115%] w-full -translate-y-[7%] object-cover" />
              <span className="idp-image-frame" aria-hidden="true" />
              <figcaption className="absolute bottom-7 left-8 z-10 text-[8px] font-semibold uppercase tracking-[.24em] text-white">Structure translated into certainty</figcaption>
            </figure>
          </div>
        </article>

        {/* 02 — ROAD CONSTRUCTION */}
        <article className="idp-road relative overflow-hidden bg-[#dcd3c6] py-24 lg:py-36">
          <div className="mx-auto max-w-[1800px] px-5 sm:px-8 lg:px-12 xl:px-16">
            <div className="mb-10 grid gap-6 lg:grid-cols-[.7fr_1.3fr] lg:items-end">
              <div data-idp-reveal className="flex items-center gap-3 text-[9px] font-semibold uppercase tracking-[.24em] text-[#856b49]"><Route size={17} strokeWidth={1.35} />02 / Movement · Access · Longevity</div>
              <h3 data-idp-reveal className="idp-serif text-[clamp(4rem,8vw,9.5rem)] leading-[.8] tracking-[-.05em]">Road <em className="text-[#957447]">Construction</em></h3>
            </div>

            <figure data-idp-image className="idp-road-window relative h-[440px] overflow-hidden lg:h-[650px]">
              <img src={infraRoadImg} alt="Completed divided urban road with drainage and street lighting" loading="lazy" className="idp-road-img h-full w-[114%] max-w-none object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <span className="idp-image-frame" aria-hidden="true" />
            </figure>

            <div className="idp-road-line mt-7 h-px origin-left bg-[#171817]" />
            <div className="mt-7 grid gap-7 lg:grid-cols-[1fr_.8fr]">
              <p data-idp-reveal className="idp-serif max-w-4xl text-[clamp(2.3rem,4vw,4.8rem)] leading-[.95]">Movement networks shaped around safety, drainage, durability and the rhythm of everyday access.</p>
              <div data-idp-reveal className="grid grid-cols-2 gap-x-6 gap-y-4 text-[8px] font-semibold uppercase tracking-[.15em] text-[#5f584e]">
                <span>Earthwork & grading</span><span>Pavement systems</span><span>Junction planning</span><span>Road drainage</span><span>Kerbs & footpaths</span><span>Street lighting</span>
              </div>
            </div>
          </div>
        </article>

        {/* 03 — WATER / SEWER / RAIN WATER */}
        <article className="idp-water relative overflow-hidden bg-[#111312] px-5 py-24 text-[#f4f1eb] sm:px-8 lg:px-12 lg:py-36 xl:px-16">
          <div className="mx-auto grid max-w-[1700px] gap-16 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
            <figure data-idp-image className="idp-water-frame relative h-[560px] overflow-hidden rounded-t-[48%] lg:h-[780px]">
              <img src={infraWaterImg} alt="Coordinated water, sewer and rainwater infrastructure under construction" loading="lazy" className="idp-water-img h-[116%] w-full -translate-y-[8%] object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/10" />
              <span className="idp-image-frame" aria-hidden="true" />
              <div className="absolute inset-x-0 bottom-12 z-10 flex justify-center gap-4" aria-hidden="true">
                <span className="idp-pipe-ring h-20 w-20 rounded-full border border-white/45" />
                <span className="idp-pipe-ring h-20 w-20 rounded-full border border-[#d5b177]" />
                <span className="idp-pipe-ring h-20 w-20 rounded-full border border-white/45" />
              </div>
            </figure>

            <div>
              <div data-idp-reveal className="flex items-center gap-3 text-[9px] font-semibold uppercase tracking-[.24em] text-[#d5b177]"><Droplets size={17} strokeWidth={1.35} />03 / Flow · Resilience · Public health</div>
              <h3 data-idp-reveal className="idp-serif mt-8 text-[clamp(3.8rem,6.5vw,7.6rem)] leading-[.82] tracking-[-.045em]">Water / Sewer /<br /><em className="text-[#d5b177]">Rain Water Systems</em><br />Construction</h3>
              <p data-idp-reveal className="mt-9 max-w-xl text-sm leading-7 text-white/60 sm:text-base">Capacity, gradients, crossings and maintenance access are coordinated before execution—creating reliable networks that protect health, manage water and keep the development resilient.</p>
              <div className="mt-12 border-t border-white/15">
                {["Water supply network", "Sewer collection system", "Rainwater drainage", "Inspection & maintenance access"].map((item, index) => (
                  <div key={item} className="group flex items-center justify-between border-b border-white/15 py-5">
                    <span className="text-[9px] font-semibold uppercase tracking-[.17em] text-white/65 transition-colors group-hover:text-[#d5b177]">0{index + 1} · {item}</span>
                    <span className="h-px w-10 bg-[#c9a56a] transition-all duration-500 group-hover:w-20" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </article>

        {/* 04 — ELECTRICAL SYSTEM INSTALLATION */}
        <article className="idp-electrical relative overflow-hidden bg-[#ece6dc] px-5 py-24 sm:px-8 lg:px-12 lg:py-36 xl:px-16">
          <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-25" viewBox="0 0 1600 900" preserveAspectRatio="none" aria-hidden="true">
            <path className="idp-wire" d="M-80 160 C310 160 250 440 610 440 S1020 245 1680 690" fill="none" stroke="#8c6b3e" strokeWidth="1.5" strokeDasharray="900" strokeDashoffset="900" />
            <path className="idp-wire" d="M-80 210 C310 210 250 490 610 490 S1020 295 1680 740" fill="none" stroke="#171817" strokeWidth="1" strokeDasharray="900" strokeDashoffset="900" />
          </svg>

          <div className="relative mx-auto grid max-w-[1700px] gap-12 lg:grid-cols-[.85fr_1.15fr] lg:items-center">
            <div className="order-2 lg:order-1">
              <div data-idp-reveal className="flex items-center gap-3 text-[9px] font-semibold uppercase tracking-[.24em] text-[#8d714b]"><Zap size={17} strokeWidth={1.35} />04 / Power · Safety · Reliability</div>
              <h3 data-idp-reveal className="idp-serif mt-8 text-[clamp(4rem,7vw,8.4rem)] leading-[.82] tracking-[-.045em]">Electrical System<br /><em className="text-[#aa895b]">Installation</em></h3>
              <p data-idp-reveal className="mt-8 max-w-xl text-sm leading-7 text-[#666] sm:text-base">Safe, serviceable electrical distribution coordinated with roads, buildings and utility corridors—from underground cabling and panels to street lighting and common-area power.</p>
              <div data-idp-reveal className="mt-10 grid max-w-xl grid-cols-2 gap-px overflow-hidden border border-black/15 bg-black/15 text-[8px] font-semibold uppercase tracking-[.14em]">
                {[
                  "Underground cabling",
                  "Distribution panels",
                  "Street lighting",
                  "Earthing systems",
                ].map((item) => <span key={item} className="bg-[#ece6dc] px-5 py-5">{item}</span>)}
              </div>
            </div>

            <figure data-idp-image className="idp-electric-frame order-1 relative h-[480px] overflow-hidden lg:order-2 lg:h-[680px]">
              <img src={infraElectricalImg} alt="Organized electrical corridor and street lighting installation" loading="lazy" className="h-full w-full object-cover transition-transform duration-1000 hover:scale-[1.04]" />
              <span className="idp-image-frame" aria-hidden="true" />
              <span className="idp-serif absolute bottom-2 right-5 text-[clamp(9rem,18vw,19rem)] leading-none text-white/15" aria-hidden="true">04</span>
            </figure>
          </div>
        </article>

        {/* 05 — BOUNDARY WALL / CLUB HOUSE / PARK / MAIN GATE */}
        <article className="idp-public relative min-h-[92svh] overflow-hidden text-[#f4f1eb]">
          <img src={infraPublicImg} alt="Modern main gate, boundary wall, clubhouse and landscaped park" loading="lazy" className="idp-public-img absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(15,16,15,.92)_0%,rgba(15,16,15,.68)_42%,rgba(15,16,15,.12)_78%)]" />
          <span className="absolute inset-5 border border-white/30 sm:inset-8 lg:inset-12" aria-hidden="true" />

          <div className="relative z-10 mx-auto flex min-h-[92svh] max-w-[1700px] flex-col justify-between px-10 py-14 sm:px-14 lg:px-20 lg:py-20">
            <div data-idp-reveal className="flex items-center justify-between border-b border-white/25 pb-5 text-[9px] font-semibold uppercase tracking-[.22em] text-white/70">
              <span className="flex items-center gap-3"><Trees size={17} strokeWidth={1.35} />05 / Identity · Community · Arrival</span>
              <span>Public realm</span>
            </div>

            <div className="max-w-5xl">
              <h3 data-idp-reveal className="idp-serif text-[clamp(3.8rem,7.2vw,8.5rem)] leading-[.82] tracking-[-.045em]">Boundary Wall, Club House, Park &amp; <em className="text-[#d5b177]">Main Gate Construction</em></h3>
              <div className="mt-8 grid gap-7 border-t border-white/25 pt-7 lg:grid-cols-[1fr_.7fr]">
                <p data-idp-reveal className="max-w-2xl text-sm leading-7 text-white/68 sm:text-base">The edges, shared spaces and arrival sequence that give a development security, identity and everyday community value—designed and delivered as one coherent experience.</p>
                <div data-idp-reveal className="grid grid-cols-2 gap-x-5 gap-y-4 text-[8px] font-semibold uppercase tracking-[.16em] text-white/65"><span>Boundary wall</span><span>Club house</span><span>Landscape park</span><span>Main entrance gate</span></div>
              </div>
            </div>
          </div>
        </article>
      </section>

      <section className="idp-cta relative min-h-[78svh] overflow-hidden bg-[#111312] px-5 py-16 text-[#f4f1eb] sm:px-8 lg:px-12 xl:px-16">
        <img src={infraCtaImg} alt="Integrated infrastructure development at sunset" loading="lazy" className="idp-cta-img absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(12,13,12,.96)_0%,rgba(12,13,12,.72)_52%,rgba(12,13,12,.28)_100%)]" />
        <span className="absolute inset-5 border border-white/25 sm:inset-8 lg:inset-12" aria-hidden="true" />

        <div className="relative z-10 mx-auto flex min-h-[calc(78svh-8rem)] max-w-[1700px] flex-col justify-between py-7">
          <div className="flex items-center justify-between text-[8px] font-semibold uppercase tracking-[.23em] text-white/58"><span>CADMAX Consultancy</span><span>Infrastructure / 03</span></div>
          <div className="max-w-5xl">
            <p data-idp-reveal className="text-[9px] font-semibold uppercase tracking-[.28em] text-[#d5b177]">Start a conversation</p>
            <h2 data-idp-reveal className="idp-serif mt-7 text-[clamp(4rem,8vw,9.4rem)] leading-[.8] tracking-[-.05em]">Build the network behind lasting growth.</h2>
            <div className="mt-9 flex flex-col gap-6 border-t border-white/25 pt-7 sm:flex-row sm:items-end sm:justify-between">
              <p data-idp-reveal className="max-w-xl text-sm leading-7 text-white/65 sm:text-base">Connect construction, movement, utilities and community infrastructure through one coordinated delivery vision.</p>
              <a href="/contact" className="group inline-flex w-fit items-center gap-3 rounded-full bg-[#c9a56a] px-7 py-4 text-[9px] font-semibold uppercase tracking-[.2em] text-[#121312] transition-colors hover:bg-[#f4f1eb]">
                Discuss your project <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>
            </div>
          </div>
          <a href="/services" className="inline-flex w-fit items-center gap-3 text-[8px] font-semibold uppercase tracking-[.22em] text-white/55 transition-colors hover:text-[#d5b177]"><ArrowLeft size={13} /> Back to all services</a>
        </div>
      </section>
      </main>
      <Footer />
    </>
  );
}
