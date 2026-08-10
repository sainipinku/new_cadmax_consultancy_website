import { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { createReveal } from "../../../animations/scrollMotion";
import "./ServiceSlider.css";

import engineeringImage from "../../../assets/Images/EAIService/engineering/slide-1.png";
import architectureImage from "../../../assets/Images/EAIService/architecture/slide-1.png";
import infrastructureImage from "../../../assets/Images/EAIService/infrastructure/VIEW RENDER FILE_11zon.jpg";

gsap.registerPlugin(ScrollTrigger);

const slides = [
  {
    id: 1,
    number: "01",
    title: "Engineering",
    image: engineeringImage,
  },
  {
    id: 2,
    number: "02",
    title: "Architectural",
    image: architectureImage,
  },
  {
    id: 3,
    number: "03",
    title: "Infrastructure Development",
    image: infrastructureImage,
  },
];

const wrap = (index) =>
  (index + slides.length) % slides.length;

function ServiceSlider() {
  const [centerIndex, setCenterIndex] = useState(0);
  const [motion, setMotion] = useState(null);
  const [moving, setMoving] = useState(false);

  const sectionRef = useRef(null);
  const frameRef = useRef(null);
  const timerRef = useRef(null);

  /* ======================================================
     SLIDER NAVIGATION
  ====================================================== */

  const goTo = useCallback(
    (direction) => {
      if (motion) return;

      const target = wrap(
        centerIndex + (direction === "next" ? 1 : -1)
      );

      setMotion({
        direction,
        target,
      });

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
    },
    [centerIndex, motion]
  );

  /* ======================================================
     CLEANUP
  ====================================================== */

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

  /* ======================================================
     TITLE REVEAL ONLY
     
     IMPORTANT:
     Never transform the complete section.
  ====================================================== */

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const ctx = gsap.context(() => {
      const titleWrapper =
        section.querySelector(".service-title-wrapper");

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

  /* ======================================================
     CARD POSITIONS
  ====================================================== */

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
      className="service-slider-section"
    >
      {/* ==================================================
          MOBILE NAVIGATION
      ================================================== */}

      <div className="service-mobile-nav">
        <button
          type="button"
          aria-label="Previous slide"
          onClick={() => goTo("prev")}
          disabled={Boolean(motion)}
          className="service-nav-btn"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <button
          type="button"
          aria-label="Next slide"
          onClick={() => goTo("next")}
          disabled={Boolean(motion)}
          className="service-nav-btn"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      {/* ==================================================
          TITLE
      ================================================== */}

      <div className="service-title-wrapper">
        {slides.map((slide, index) => (
          <h2
            key={slide.id}
            className={`service-title ${
              index ===
              (motion?.target ?? centerIndex)
                ? "is-active"
                : ""
            }`}
          >
            <span className="service-number">
              {slide.number}
            </span>

            <span className="service-heading">
              {slide.title}
            </span>
          </h2>
        ))}
      </div>

      {/* ==================================================
          SLIDER VIEWPORT
      ================================================== */}

      <div className="service-slider-viewport">
        <div
          className={`service-track ${
            moving ? "is-moving" : ""
          }`}
        >
          {cards.map(
            ({ index, position }, order) => {
              const slide = slides[index];

              if (!slide) return null;

              const isOut =
                position.includes("out-");

              return (
                <div
                  key={`${motion ? "motion" : "idle"}-${position}-${slide.id}-${order}`}
                  className={`service-card service-card--${position}`}
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
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="service-card-image"
                    loading={
                      index === centerIndex
                        ? "eager"
                        : "lazy"
                    }
                    draggable={false}
                  />
                </div>
              );
            }
          )}
        </div>
      </div>
    </section>
  );
}

export default ServiceSlider;