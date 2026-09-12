import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { createReveal } from "../../../animations/scrollMotion";
import "./AwardSlider.css";

import awardImg1 from "../../../assets/Images/award/award_5.png";
import awardImg2 from "../../../assets/Images/award/award_6.jpeg";

gsap.registerPlugin(ScrollTrigger);

const slides = [
  {
    id: 1,
    number: "01",
    title: "India pride awards New Delhi 2025",
    year: "2025",
    image: awardImg1,
  },
  {
    id: 2,
    number: "02",
    title: "Asia awards of excellence Hong kong 2026",
    year: "2026",
    image: awardImg2,
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

    const target = wrap(
      centerIndex + (direction === "next" ? 1 : -1)
    );

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
    }, 900);
  };

  useEffect(() => {
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }

      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const ctx = gsap.context(() => {
      const titleWrapper = section.querySelector(
        ".award-title-wrapper"
      );

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
        {
          index: leftIndex,
          position: "left-to-out-left",
        },
        {
          index: centerIndex,
          position: "center-to-left",
        },
        {
          index: rightIndex,
          position: "right-to-center",
        },
        {
          index: wrap(rightIndex + 1),
          position: "out-right-to-right",
        },
      ];
    } else {
      cards = [
        {
          index: wrap(leftIndex - 1),
          position: "out-left-to-left",
        },
        {
          index: leftIndex,
          position: "left-to-center",
        },
        {
          index: centerIndex,
          position: "center-to-right",
        },
        {
          index: rightIndex,
          position: "right-to-out-right",
        },
      ];
    }
  } else {
    cards = [
      {
        index: leftIndex,
        position: "left",
      },
      {
        index: centerIndex,
        position: "center",
      },
      {
        index: rightIndex,
        position: "right",
      },
    ];
  }

  return (
    <section
      ref={sectionRef}
      className="award-slider-section"
    >
      {/* Heading */}

      <div className="award-title-wrapper">
        <div className="award-eyebrow-row">
          <span></span>

          <p className="award-eyebrow">
            Recognitions & Achievements
          </p>

          <span></span>
        </div>

        <h2 className="award-heading">
          Our <em>Prestigious</em> Awards
        </h2>
      </div>

      {/* Slider */}

      <div className="award-slider-viewport">
        <div
          className={`award-track ${moving ? "is-moving" : ""
            }`}
        >
          {cards.map(({ index, position }) => {
            const slide = slides[index];

            if (!slide) return null;

            const isOut = position.includes("out-");

            const isCenter =
              position === "center" ||
              position === "right-to-center" ||
              position === "left-to-center";

            return (
              <article
                key={`${motion ? "motion" : "idle"
                  }-${position}-${slide.id}`}
                className={`award-card award-card--${position}`}
                onClick={() => {
                  if (motion) return;

                  if (position === "right") {
                    goTo("next");
                  }

                  if (position === "left") {
                    goTo("prev");
                  }
                }}
                aria-hidden={isOut}
              >
                <div className="award-card-shell">

                  {/* Image container */}

                  <div className="award-image-wrapper">
                    <img
                      src={slide.image}
                      alt={`${slide.title} - CADMAX Consultancy`}
                      className="award-card-image"
                      loading={
                        index === centerIndex
                          ? "eager"
                          : "lazy"
                      }
                      draggable={false}
                    />

                    <div className="award-image-gradient" />
                  </div>

                  {/* Bottom Award Badge */}

                  <div className="award-info-card">

                    <svg
                      className="award-laurel award-laurel-left"
                      viewBox="0 0 40 80"
                    >
                      <path
                        d="M30 72C12 55 9 28 25 8"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />

                      <ellipse
                        cx="20"
                        cy="60"
                        rx="4"
                        ry="8"
                        transform="rotate(-35 20 60)"
                        fill="currentColor"
                      />

                      <ellipse
                        cx="15"
                        cy="47"
                        rx="4"
                        ry="8"
                        transform="rotate(-25 15 47)"
                        fill="currentColor"
                      />

                      <ellipse
                        cx="15"
                        cy="33"
                        rx="4"
                        ry="8"
                        transform="rotate(-10 15 33)"
                        fill="currentColor"
                      />

                      <ellipse
                        cx="20"
                        cy="19"
                        rx="4"
                        ry="8"
                        transform="rotate(15 20 19)"
                        fill="currentColor"
                      />
                    </svg>

                    <div className="award-info-content">
                      <span className="award-card-year">
                        {slide.year}
                      </span>

                      <h3 className="award-card-title">
                        {slide.title}
                      </h3>
                    </div>

                    <svg
                      className="award-laurel award-laurel-right"
                      viewBox="0 0 40 80"
                    >
                      <path
                        d="M10 72C28 55 31 28 15 8"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />

                      <ellipse
                        cx="20"
                        cy="60"
                        rx="4"
                        ry="8"
                        transform="rotate(35 20 60)"
                        fill="currentColor"
                      />

                      <ellipse
                        cx="25"
                        cy="47"
                        rx="4"
                        ry="8"
                        transform="rotate(25 25 47)"
                        fill="currentColor"
                      />

                      <ellipse
                        cx="25"
                        cy="33"
                        rx="4"
                        ry="8"
                        transform="rotate(10 25 33)"
                        fill="currentColor"
                      />

                      <ellipse
                        cx="20"
                        cy="19"
                        rx="4"
                        ry="8"
                        transform="rotate(-15 20 19)"
                        fill="currentColor"
                      />
                    </svg>

                  </div>

                  {isCenter && (
                    <div className="award-active-border" />
                  )}

                </div>
              </article>
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
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <button
          type="button"
          aria-label="Next award"
          onClick={() => goTo("next")}
          disabled={Boolean(motion)}
          className="award-nav-btn"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>

      </div>
    </section>
  );
}

export default AwardSlider;