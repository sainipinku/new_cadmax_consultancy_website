import { useState } from "react";

// ===== Engineering images =====
import engSlide1 from "../../../assets/Images/EAIService/engineering/slide-1.png";
// import engSlide2 from "../../../assets/Images/EAIService/engineering/slide-2.png";

// ===== Architecture images =====
import archSlide1 from "../../../assets/Images/EAIService/architecture/slide-1.png";
// import archSlide2 from "../../../assets/Images/EAIService/architecture/slide-2.jpeg";
// import archSlide3 from "../../../assets/Images/EAIService/architecture/slide-3.png";

// ===== Infrastructure images =====
import infraImg1 from "../../../assets/Images/EAIService/infrastructure/image 1_14 - Photo_11zon.jpg";
// import infraTopView from "../../../assets/Images/EAIService/infrastructure/top view 1_17 - Photo_11zon.jpg";
// import infraViewRender from "../../../assets/Images/EAIService/infrastructure/VIEW RENDER FILE_11zon.jpg";

const services = [
  {
    id: "engineering",
    index: "01",
    title: "Engineering",
    kicker: "Precision by design",
    description:
      "Structural, mechanical and systems engineering rooted in analysis, tolerance and buildable detail — from first calculation to final bolt.",
    image: engSlide1,
    subservices: ["M.E.P DESIGN", "ENGINEERING SURVEY", "DETAIL PROJECT REPORTS"],
  },
  {
    id: "architectural",
    index: "02",
    title: "Architectural",
    kicker: "Form that holds meaning",
    description:
      "Considered architecture that reads a place before it speaks — quiet massing, honest materials, and light shaped into use.",
    image: archSlide1,
    subservices: ["URBAN MASTER PLANNING", "ARCHITECTURAL DESIGNING", "INTERIOR DESIGNING"],
  },
  {
    id: "infrastructure",
    index: "03",
    title: "Infrastructure Development",
    kicker: "The systems beneath the skyline",
    description:
      "Roads, bridges, utilities and the civic backbone — planned for a century of service, built for the decade ahead.",
    image: infraImg1,
    subservices: [
      "BUILDING CONSTRUCTION",
      "ROAD CONSTRUCTION",
      "WATER INFRASTRUCTURE",
      "ELECTRICAL WORKS",
      "SITE DEVELOPMENT",
    ],
  },
];

export default function EAIService() {
  const [active, setActive] = useState(0);
  const current = services[active];

  return (
    <section id="services" className="relative bg-[var(--secondary)]">
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-32 lg:px-10">
        {/* section header */}
        {/* <div className="mb-16 flex flex-col gap-6 md:mb-24 md:flex-row md:items-end md:justify-between">
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
        </div> */}

        {/* main showcase */}
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          {/* image column */}
          <div className="relative lg:col-span-7">
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-secondary md:aspect-[5/4]">
              <div className="relative h-full w-full overflow-hidden">
                <img
                  src={current.image}
                  alt={`${current.title} - ${active + 1}`}
                  loading="lazy"
                  width={1280}
                  height={1600}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, oklch(19.8% 0 0 / 0.6), transparent 60%)" }} />
              </div>
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
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <div className="text-[11px] uppercase tracking-[0.3em] text-accent">
                  {current.kicker}
                </div>
                <div className="mt-2 font-garamond text-3xl italic md:text-4xl">
                  {current.title}
                </div>
              </div>
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
                          <h3
                            className="font-garamond text-3xl md:text-4xl"
                            style={{
                              color: isActive ? "#B8A284" : "#1A1A1A",
                              transform: isActive ? "translateX(6px)" : "translateX(0)",
                              transition: "all 0.4s ease",
                            }}
                          >
                            {s.title}
                          </h3>
                          <span
                            aria-hidden
                            style={{
                              rotate: isActive ? "45deg" : "0deg",
                              opacity: isActive ? 1 : 0.35,
                            }}
                            className="text-2xl leading-none text-foreground"
                          >
                            +
                          </span>
                        </div>
                        {isActive && (
                          <div className="overflow-hidden">
                            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-muted-foreground">
                              {s.description}
                            </p>
                            <ul className="mt-5 grid grid-cols-2 gap-2.5 max-w-2xl">
                              {s.subservices.map((sub, si) => (
                                <li
                                  key={sub}
                                  className="relative overflow-hidden flex items-center justify-center rounded-lg border border-[#D4B383]/30 bg-[#171717] px-3 py-2 min-h-[42px] transition-all duration-300 hover:bg-[#D4B383] hover:border-[#D4B383]"
                                >
                                  {/* shine */}
                                  <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-lg">
                                    <span className="absolute inset-y-0 -left-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-all duration-700 hover:left-[140%]" />
                                  </span>
                                  <span
                                    className="relative z-10 text-center text-[11px] md:text-xs font-medium tracking-[0.08em]"
                                    style={{ color: "#F5E7C4" }}
                                    onMouseEnter={(e) => { e.currentTarget.style.color = "#000"; }}
                                    onMouseLeave={(e) => { e.currentTarget.style.color = "#F5E7C4"; }}
                                  >
                                    {sub}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                      {/* underline reveal */}
                      <span
                        className="absolute bottom-0 left-0 h-px bg-accent"
                        style={{ width: isActive ? "100%" : "0%", transition: "width .6s ease" }}
                      />
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}