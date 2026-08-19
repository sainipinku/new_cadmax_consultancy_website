import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { createReveal } from "../../../animations/scrollMotion";
import "./AwardSlider.css";

// Award images (PNG with transparent backgrounds)
import awardImg1 from "../../../assets/Images/award/awar_1.png";
import awardImg2 from "../../../assets/Images/award/award_2.png";
import awardImg3 from "../../../assets/Images/award/award_3.png";
import awardImg4 from "../../../assets/Images/award/award_4.png";

gsap.registerPlugin(ScrollTrigger);

const slides = [
  {
    id: 1,
    number: "01",
    title: "Design Excellence",
    year: "2025",
    image: awardImg1,
  },
  {
    id: 2,
    number: "02",
    title: "Innovation Award",
    year: "2024",
    image: awardImg2,
  },
  {
    id: 3,
    number: "03",
    title: "Best Architectural Practice",
    year: "2023",
    image: awardImg3,
  },
  {
    id: 4,
    number: "04",
    title: "Engineering Leadership",
    year: "2022",
    image: awardImg4,
  },
];

const wrap = (index) => (index + slides.length) % slides.length;

function AwardSlider() {
  const [centerIndex, setCenterIndex] = useState(0);
  const [motion, setMotion] = useState(null);
  const [moving, setMoving] = useState(false);

  const sectionRef = useRef(null);
  const frameRef = useRef(null);
  const timerRef = useRef(null);

  const goTo = (direction) => {
    if (motion) return;

    const target = wrap(centerIndex + (direction === "next" ? 1 : -1));

    setMotion({ direction, target });
    setMoving(false);

    frameRef.current = requestAnimationFrame(() => {
      frameRef.current = requestAnimationFrame(() => {
        setMoving(true);
      });
    });

    timerRef.current = setTimeout(() => {
      setCenterIndex(target);
      setMoving(false);
      setMotion(null);
    }, 920);
  };

  useEffect(() => {
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const titleWrapper = section.querySelector(".award-title-wrapper");
      if (titleWrapper) {
        createReveal([titleWrapper], {
          y: 40,
          opacity: true,
          duration: 1,
          ease: "power3.out",
          start: "top 85%",
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  const leftIndex = wrap(centerIndex - 1);
  const rightIndex = wrap(centerIndex + 1);

  let cards;

  if (motion) {
    if (motion.direction === "next") {
      cards = [
        { index: leftIndex, position: "left-to-out-left" },
        { index: centerIndex, position: "center-to-left" },
        { index: rightIndex, position: "right-to-center" },
        { index: wrap(rightIndex + 1), position: "out-right-to-right" },
      ];
    } else {
      cards = [
        { index: wrap(leftIndex - 1), position: "out-left-to-left" },
        { index: leftIndex, position: "left-to-center" },
        { index: centerIndex, position: "center-to-right" },
        { index: rightIndex, position: "right-to-out-right" },
      ];
    }
  } else {
    cards = [
      { index: leftIndex, position: "left" },
      { index: centerIndex, position: "center" },
      { index: rightIndex, position: "right" },
    ];
  }

  return (
    <section ref={sectionRef} className="award-slider-section">
      {/* Title */}
      <div className="award-title-wrapper">
        <span className="award-eyebrow">Recognitions & Achievements</span>
        <h2 className="award-heading">
          Our <span>Prestigious</span> Awards
        </h2>
      </div>

      {/* Slider Viewport */}
      <div className="award-slider-viewport">
        <div className={`award-track ${moving ? "is-moving" : ""}`}>
          {cards.map(({ index, position }, order) => {
            const slide = slides[index];
            if (!slide) return null;

            const isOut = position.includes("out-");

            return (
              <div
                key={`${motion ? "motion" : "idle"}-${position}-${slide.id}`}
                className={`award-card award-card--${position}`}
                onClick={() => {
                  if (motion) return;
                  if (position === "right") goTo("next");
                  if (position === "left") goTo("prev");
                }}
                aria-hidden={isOut}
              >
                <div className="award-card-inner">
                  <img
                    src={slide.image}
                    alt={`${slide.title} - CADMAX Consultancy`}
                    className="award-card-image"
                    loading={index === centerIndex ? "eager" : "lazy"}
                    draggable={false}
                  />

                  <span className="award-card-number">{slide.number}</span>
                  <i className="award-corner" />

                  <div className="award-card-overlay">
                    <span className="award-card-year">{slide.year}</span>
                    <h3 className="award-card-title">{slide.title}</h3>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation */}
      <div className="award-nav">
        <button
          type="button"
          aria-label="Previous award"
          onClick={() => goTo("prev")}
          disabled={Boolean(motion)}
          className="award-nav-btn"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          type="button"
          aria-label="Next award"
          onClick={() => goTo("next")}
          disabled={Boolean(motion)}
          className="award-nav-btn"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </section>
  );
}

export default AwardSlider;