import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./AmenitiesSection.css";

gsap.registerPlugin(ScrollTrigger);

const SLIDES = [
  {
    number: "01",
    title: "DGPS Survey",
    description:
      "High-precision DGPS surveying delivering centimeter-level accuracy for highways, railways, infrastructure, mining and large-scale development projects.",
    tagline: "Precision Positioning",
    big: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1600&q=80",
    smallTop: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=800&q=80",
    smallBottom: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80",
  },

  {
    number: "02",
    title: "Topographical Survey",
    description:
      "Comprehensive terrain mapping, contour generation, utility identification and elevation analysis for planning and engineering projects.",
    tagline: "Terrain Intelligence",
    big: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80",
    smallTop: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=800&q=80",
    smallBottom: "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=800&q=80",
  },

  {
    number: "03",
    title: "Engineering Survey",
    description:
      "Accurate engineering surveys supporting bridges, industrial plants, commercial developments and infrastructure execution.",
    tagline: "Engineering Excellence",
    big: "https://images.unsplash.com/photo-1509395176047-4a66953fd231?auto=format&fit=crop&w=1600&q=80",
    smallTop: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80",
    smallBottom: "https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&w=800&q=80",
  },

  {
    number: "04",
    title: "Land Surveying",
    description:
      "Professional land surveying for boundary demarcation, cadastral mapping, subdivision planning and legal land documentation.",
    tagline: "Boundary Accuracy",
    big: "https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1600&q=80",
    smallTop: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80",
    smallBottom: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80",
  },

  {
    number: "05",
    title: "Mobile Mapping & GIS",
    description:
      "Smart geospatial solutions combining mobile mapping, GIS analysis and digital asset management for modern infrastructure projects.",
    tagline: "Spatial Intelligence",
    big: "https://unsplash.com/photos/bottom-view-shot-of-airplane-flying-above-high-rise-building-KxCJXXGsv9I",
    smallTop: "https://images.unsplash.com/photo-1521295121783-8a321d551ad2?auto=format&fit=crop&w=800&q=80",
    smallBottom: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
  },
];
const SLICES = 30;

export default function AmenitiesSection() {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    // Preload
    SLIDES.forEach((s) => {
      [s.big, s.smallTop, s.smallBottom].forEach((src) => {
        const i = new Image();
        i.src = src;
      });
    });

    const ctx = gsap.context(() => {
      const section = root.querySelector(".am-section");
      const pin = root.querySelector(".am-pin");

      const numbers = gsap.utils.toArray(".am-number");
      const blocks = gsap.utils.toArray(".am-block");
      const bigLayers = gsap.utils.toArray(".am-big-layer");
      const smallTopLayers = gsap.utils.toArray(".am-small-top .am-small-layer");
      const smallBotLayers = gsap.utils.toArray(".am-small-bottom .am-small-layer");
      const progressFill = root.querySelector(".am-progress-fill");
      const counterCurrent = root.querySelector(".am-counter b");

      // Init state
      gsap.set(numbers, { yPercent: 100, opacity: 0 });
      gsap.set(numbers[0], { yPercent: 0, opacity: 1 });

      blocks.forEach((b, i) => {
        const title = b.querySelector(".am-title");
        const desc = b.querySelector(".am-desc");
        const tag = b.querySelector(".am-tag");
        const btn = b.querySelector(".am-btn");
        if (i === 0) {
          gsap.set(b, { opacity: 1 });
          gsap.set([title, desc, tag, btn], { y: 0, opacity: 1 });
        } else {
          gsap.set(b, { opacity: 0 });
          gsap.set(title, { y: 40, opacity: 1 });
          gsap.set(desc, { y: 20, opacity: 0 });
          gsap.set(tag, { opacity: 0 });
          gsap.set(btn, { opacity: 0 });
        }
      });

      // Big image slices — each slide has SLICES slice layers
      bigLayers.forEach((layer, slideIdx) => {
        const slices = layer.querySelectorAll(".am-slice");
        slices.forEach((s) => {
          if (slideIdx === 0) {
            gsap.set(s, { clipPath: "inset(0% 0% 0% 0%)" });
          } else {
            gsap.set(s, { clipPath: "inset(100% 0% 0% 0%)" });
          }
        });
        gsap.set(layer, { zIndex: slideIdx });
      });

      // Small images
      [smallTopLayers, smallBotLayers].forEach((layers) => {
        layers.forEach((l, i) => {
          if (i === 0) gsap.set(l, { yPercent: 0 });
          else gsap.set(l, { yPercent: 100 });
        });
      });

      const total = SLIDES.length;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "center center",
          end: () => "+=" + window.innerHeight * total,
          pin: pin,
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Progress line + counter
      tl.to(
        progressFill,
        {
          height: "100%",
          ease: "none",
          duration: total,
        },
        0
      );

      // Counter update via onUpdate
      ScrollTrigger.create({
        trigger: section,
        start: "center center",
        end: () => "+=" + window.innerHeight * total,
        onUpdate: (self) => {
          const idx = Math.min(total - 1, Math.floor(self.progress * total + 0.0001));
          const label = String(idx + 1).padStart(2, "0");
          if (counterCurrent.textContent !== label) counterCurrent.textContent = label;
        },
      });

      // Per slide: hold 0-0.6, transition 0.6-1 (each slide occupies 1 unit)
      for (let i = 0; i < total - 1; i++) {
        const start = i + 0.6;
        const dur = 0.4;
        const next = i + 1;

        // Number swap
        tl.to(numbers[i], { yPercent: -100, opacity: 0, ease: "power2.inOut", duration: dur * 0.5 }, start);
        tl.fromTo(
          numbers[next],
          { yPercent: 100, opacity: 0 },
          { yPercent: 0, opacity: 1, ease: "power2.inOut", duration: dur * 0.5 },
          start + dur * 0.5
        );

        // Text blocks — old exits fully first, new enters
        const oldBlock = blocks[i];
        const newBlock = blocks[next];
        const oldTitle = oldBlock.querySelector(".am-title");
        const oldDesc = oldBlock.querySelector(".am-desc");
        const oldTag = oldBlock.querySelector(".am-tag");
        const oldBtn = oldBlock.querySelector(".am-btn");
        const nTitle = newBlock.querySelector(".am-title");
        const nDesc = newBlock.querySelector(".am-desc");
        const nTag = newBlock.querySelector(".am-tag");
        const nBtn = newBlock.querySelector(".am-btn");

        // Old exit (first half)
        tl.to(oldTag, { opacity: 0, duration: dur * 0.2, ease: "power1.out" }, start);
        tl.to(oldBtn, { opacity: 0, duration: dur * 0.2, ease: "power1.out" }, start);
        tl.to(oldDesc, { opacity: 0, y: -20, duration: dur * 0.35, ease: "power2.in" }, start);
        tl.to(oldTitle, { y: -40, duration: dur * 0.4, ease: "power2.in" }, start);
        tl.set(oldBlock, { opacity: 0 }, start + dur * 0.45);
        // reset old for potential replay
        tl.set(oldTitle, { y: 40, opacity: 1 }, start + dur * 0.45);
        tl.set(oldDesc, { y: 20, opacity: 0 }, start + dur * 0.45);

        // New enter (second half)
        tl.set(newBlock, { opacity: 1 }, start + dur * 0.5);
        tl.fromTo(
          nTitle,
          { y: 40 },
          { y: 0, duration: dur * 0.5, ease: "power3.out" },
          start + dur * 0.5
        );
        tl.fromTo(
          nDesc,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: dur * 0.5, ease: "power2.out" },
          start + dur * 0.55
        );
        tl.fromTo(nTag, { opacity: 0 }, { opacity: 1, duration: dur * 0.3, ease: "power1.out" }, start + dur * 0.7);
        tl.fromTo(nBtn, { opacity: 0 }, { opacity: 1, duration: dur * 0.3, ease: "power1.out" }, start + dur * 0.75);

        // Big image slice reveal bottom -> top
        const nextLayer = bigLayers[next];
        const slices = nextLayer.querySelectorAll(".am-slice");
        // reversed so bottom index reveals first
        const orderedSlices = Array.from(slices).reverse();
        tl.to(
          orderedSlices,
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: dur * 0.7,
            ease: "power2.inOut",
            stagger: (dur * 0.7) / SLICES,
          },
          start + dur * 0.2
        );

        // Small images — old up, new up from bottom
        tl.to(smallTopLayers[i], { yPercent: -100, duration: dur * 0.6, ease: "power3.inOut" }, start + dur * 0.25);
        tl.fromTo(
          smallTopLayers[next],
          { yPercent: 100 },
          { yPercent: 0, duration: dur * 0.6, ease: "power3.inOut" },
          start + dur * 0.25
        );
        tl.to(smallBotLayers[i], { yPercent: -100, duration: dur * 0.6, ease: "power3.inOut" }, start + dur * 0.3);
        tl.fromTo(
          smallBotLayers[next],
          { yPercent: 100 },
          { yPercent: 0, duration: dur * 0.6, ease: "power3.inOut" },
          start + dur * 0.3
        );
      }

      // Final hold segment (last slide) — tiny tween to consume remaining duration
      tl.to({}, { duration: 0.4 }, total - 0.4);
    }, root);

    return () => ctx.revert();
  }, []);

  const sliceStyle = (i) => {
    const top = (i / SLICES) * 100;
    const height = 100 / SLICES;
    return {
      top: top + "%",
      height: "calc(" + height + "% + 0.6px)", // avoid subpixel gaps
    };
  };

  return (
    <div ref={rootRef} className="am-root">
      <section className="am-section" aria-label="Amenities">
        <div className="am-pin">
          <div className="am-grid">
            {/* LEFT */}
            <div className="am-left">
              <div>
                
                <div className="am-eyebrow text-lg font-bold tracking-[0.2em] text-[var(--accent)] uppercase">Amenities</div>
                <div className="am-number-wrap">
                  {SLIDES.map((s, i) => (
                    <div className="am-number" key={i}>
                      {s.number}
                    </div>
                  ))}
                </div>

                <div className="am-textblocks">
                  {SLIDES.map((s, i) => (
                    <div className={"am-block" + (i === 0 ? " is-active" : "")} key={i}>
                      <h2 className="am-title">{s.title}</h2>
                      <p className="am-desc">{s.description}</p>
                      <div className="am-tag">{s.tagline}</div>
                      <button className="am-btn" type="button">
                        Explore <span className="arrow">→</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="am-footer-left">
                <div className="am-progress">
                  <div className="am-progress-fill" />
                </div>
                <div className="am-counter">
                  <b>01</b> / {String(SLIDES.length).padStart(2, "0")}
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <div className="am-right">
              <div className="am-big">
                {SLIDES.map((s, idx) => (
                  <div className="am-big-layer" key={idx} style={{ position: "absolute", inset: 0 }}>
                    {Array.from({ length: SLICES }).map((_, i) => (
                      <div className="am-slice" key={i} style={sliceStyle(i)}>
                        <img
                          src={s.big}
                          alt={s.title}
                          loading={idx === 0 ? "eager" : "lazy"}
                          style={{ height: SLICES * 100 + "%", top: -(i * 100) + "%" }}
                          draggable={false}
                        />
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              <div className="am-small-col">
                <div className="am-small am-small-top">
                  {SLIDES.map((s, i) => (
                    <div className="am-small-layer" key={i}>
                      <img src={s.smallTop} alt="" loading={i === 0 ? "eager" : "lazy"} draggable={false} />
                    </div>
                  ))}
                </div>
                <div className="am-small am-small-bottom">
                  {SLIDES.map((s, i) => (
                    <div className="am-small-layer" key={i}>
                      <img src={s.smallBottom} alt="" loading={i === 0 ? "eager" : "lazy"} draggable={false} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
