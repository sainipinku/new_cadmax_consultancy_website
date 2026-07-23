import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import engineeringImg from "../../../assets/Images/home_service/service-engineering.jpg";
import architecturalImg from "../../../assets/Images/home_service/service-architectural.jpg";
import infrastructureImg from "../../../assets/Images/home_service/service-infrastructure.jpg";

const services = [
  {
    id: "engineering",
    index: "01",
    title: "Engineering",
    kicker: "Precision by design",
    description:
      "Structural, mechanical and systems engineering rooted in analysis, tolerance and buildable detail — from first calculation to last bolt.",
    image: engineeringImg,
    subservices: ["M.E.P DESIGN", "ENGINEERING SURVEY", "DETAIL PROJECT REPORTS"],
  },
  {
    id: "architectural",
    index: "02",
    title: "Architectural",
    kicker: "Form that holds meaning",
    description:
      "Considered architecture that reads a place before it speaks — quiet massing, honest materials, and light shaped into use.",
    image: architecturalImg,
    subservices: ["URBAN MASTER PLANNING", "ARCHITECTURAL DESIGNING", "INTERIOR DESIGNING"],
  },
  {
    id: "infrastructure",
    index: "03",
    title: "Infrastructure Development",
    kicker: "The systems beneath the skyline",
    description:
      "Roads, bridges, utilities and the civic backbone — planned for a century of service, built for the decade ahead.",
    image: infrastructureImg,
    subservices: [
      "BUILDING CONSTRUCTION",
      "ROAD CONSTRUCTION",
      "WATER INFRASTRUCTURE",
      "ELECTRICAL WORKS",
      "SITE DEVELOPMENT",
    ],
  },
];

const ease = [0.22, 1, 0.36, 1];

export default function EAIService() {
  const [active, setActive] = useState(0);
  const current = services[active];

  return (
    <section id="services" className="relative bg-[var(--secondary)]">
      {/* marquee ribbon */}
      <div className="overflow-hidden border-b border-[color:var(--hairline)] py-4">
        <div className="flex w-max animate-marquee gap-16 whitespace-nowrap font-garamond text-2xl text-foreground/70">
          {Array.from({ length: 2 }).map((_, r) => (
            <div key={r} className="flex gap-16">
              {["Engineering", "Architectural", "Infrastructure", "Development", "Est. Practice"].map(
                (w, i) => (
                  <span key={i} className="flex items-center gap-16">
                    <span className="italic">{w}</span>
                    <span className="text-[var(--accent)]">✦</span>
                  </span>
                ),
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-32 lg:px-10">
        {/* section header */}
        <div className="mb-16 flex flex-col gap-6 md:mb-24 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
             <div className="flex items-center gap-4 mb-6">
          <div className="w-8 h-[1px] bg-[var(--accent)]" />
          <span className="text-xs font-general font-semibold text-[var(--accent)] uppercase tracking-[0.2em]">
            What we do
          </span>
        </div>
            <h2 className="font-garamond text-4xl leading-[1.05] tracking-tight text-foreground md:text-6xl lg:text-7xl">
              Three disciplines,
              <br />
              <span className="italic  text-[var(--accent)]">one continuous</span> practice.
            </h2>
          </div>
          <p className="max-w-sm text-base leading-relaxed text-muted-foreground">
            We hold engineering, architecture and infrastructure inside a single studio — so ideas
            survive the walk from sketch to site.
          </p>
        </div>
        {/* main showcase */}
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          {/* image column */}
          <div className="relative lg:col-span-7">
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-secondary md:aspect-[5/4]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ scale: 1.08, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 1.02, opacity: 0 }}
                  transition={{ duration: 0.9, ease }}
                  className="absolute inset-0"
                >
                  <img
                    src={current.image}
                    alt={current.title}
                    loading="lazy"
                    width={1280}
                    height={1600}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-charcoal/10 to-transparent" style={{ background: "linear-gradient(to top, oklch(19.8% 0 0 / 0.6), transparent 60%)" }} />
                </motion.div>
              </AnimatePresence>
              {/* framing corners */}
              <div className="pointer-events-none absolute inset-4 border border-white/20" />
              {/* floating index badge */}
              <div className="absolute left-6 top-6 flex items-center gap-3 text-white/90">
                <span className="h-px w-8 bg-accent" />
                <span className="font-garamond text-sm tracking-[0.3em]">
                  {current.index} / 03
                </span>
              </div>
              {/* bottom caption */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`cap-${current.id}`}
                  initial={{ y: 24, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -12, opacity: 0 }}
                  transition={{ duration: 0.6, ease, delay: 0.1 }}
                  className="absolute bottom-6 left-6 right-6 text-white"
                >
                  <div className="text-[11px] uppercase tracking-[0.3em] text-accent">
                    {current.kicker}
                  </div>
                  <div className="mt-2 font-garamond text-3xl italic md:text-4xl">
                    {current.title}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
            {/* meta strip below image */}
            <div className="mt-4 flex items-center justify-between text-xs uppercase tracking-[0.24em] text-muted-foreground">
              <span>Field study — {current.id}</span>
              <span className="flex items-center gap-2">
                <span className="inline-block h-1 w-1 rounded-full bg-accent animate-float-y" />
                Live portfolio
              </span>
            </div>
          </div>
          {/* content column */}
          <div className="lg:col-span-5">
            <ul className="divide-y divide-[color:var(--hairline)] border-y border-[color:var(--hairline)]">
              {services.map((s, i) => {
                const isActive = i === active;
                return (
                  <li key={s.id}>
                    <button
                      onMouseEnter={() => setActive(i)}
                      onFocus={() => setActive(i)}
                      onClick={() => setActive(i)}
                      className="group relative flex w-full items-start gap-6 py-7 text-left transition-colors"
                    >
                      <span className="font-garamond text-sm text-muted-foreground">
                        {s.index}
                      </span>
                      <div className="flex-1">
                        <div className="flex items-baseline justify-between gap-4">
                          <motion.h3
                            animate={{
                              x: isActive ? 6 : 0,
                              color: isActive
                                ? "oklch(75.5% 0.075 78)"
                                : "oklch(19.5% 0 0)",
                            }}
                            transition={{ duration: 0.5, ease }}
                            className="font-garamond text-3xl md:text-4xl"
                          >
                            {s.title}
                          </motion.h3>
                          <motion.span
                            animate={{
                              rotate: isActive ? 45 : 0,
                              opacity: isActive ? 1 : 0.35,
                            }}
                            transition={{ duration: 0.4, ease }}
                            className="text-2xl leading-none text-foreground"
                            aria-hidden
                          >
                            +
                          </motion.span>
                        </div>
                        <AnimatePresence initial={false}>
                          {isActive && (
                            <motion.div
  initial={{ height: 0, opacity: 0 }}
  animate={{ height: "auto", opacity: 1 }}
  exit={{ height: 0, opacity: 0 }}
  transition={{ duration: 0.55, ease }}
  className="overflow-hidden"
>
  <p className="mt-4 max-w-md text-[15px] leading-relaxed text-muted-foreground">
    {s.description}
  </p>

  <ul className="mt-5 grid grid-cols-2 gap-2.5 max-w-2xl">
    {s.subservices.map((sub, si) => (
      <motion.li
        key={sub}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.4,
          ease,
          delay: 0.15 + si * 0.06,
        }}
      >
        <div
          className="
            relative overflow-hidden
            flex items-center justify-center
            rounded-lg
            border border-[#D4B383]/30
            bg-[#171717]
            px-3 py-2
            min-h-[42px]
            transition-all duration-300
            hover:bg-[#D4B383]
            hover:border-[#D4B383]
          "
        >
          {/* Shine */}
          <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-lg">
            <span className="absolute inset-y-0 -left-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-all duration-700 hover:left-[140%]" />
          </span>

          <span
            className="relative z-10 text-center text-[11px] md:text-xs font-medium tracking-[0.08em]"
            style={{
              color: "#F5E7C4",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#000";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#F5E7C4";
            }}
          >
            {sub}
          </span>
        </div>
      </motion.li>
    ))}
  </ul>
</motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                      {/* underline reveal */}
                      <motion.span
                        className="absolute bottom-0 left-0 h-px bg-accent"
                        initial={false}
                        animate={{ width: isActive ? "100%" : "0%" }}
                        transition={{ duration: 0.6, ease }}
                      />
                    </button>
                  </li>
                );
              })}
            </ul>
            {/* CTA */}
            {/* <div className="mt-10 flex items-center gap-4">
              <a
                href="#contact"
                className="group inline-flex items-center gap-3 rounded-full bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground transition-transform duration-500 ease-out hover:-translate-y-0.5"
              >
                Start a project
                <span className="grid h-6 w-6 place-items-center rounded-full bg-accent text-accent-foreground transition-transform duration-500 ease-out group-hover:rotate-45">
                  →
                </span>
              </a>
              <a
                href="#work"
                className="text-sm tracking-wide text-foreground underline-offset-4 hover:underline"
              >
                See selected works
              </a>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
}