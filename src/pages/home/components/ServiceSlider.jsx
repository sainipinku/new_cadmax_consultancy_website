import { useCallback, useEffect, useRef, useState } from "react";
import "./ServiceSlider.css";
import engineeringImage from "../../../assets/Images/EAIService/engineering/slide-1.png";
import architectureImage from "../../../assets/Images/EAIService/architecture/slide-1.png";
import infrastructureImage from "../../../assets/Images/EAIService/infrastructure/VIEW RENDER FILE_11zon.jpg";

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

const wrap = (index) => (index + slides.length) % slides.length;

function ServiceSlider() {
  const [centerIndex, setCenterIndex] = useState(0);
  const [motion, setMotion] = useState(null);
  const [moving, setMoving] = useState(false);

  const frameRef = useRef(null);
  const timerRef = useRef(null);

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

  const leftIndex = wrap(centerIndex - 1);
  const rightIndex = wrap(centerIndex + 1);

  const cards = motion
    ? motion.direction === "next"
      ? [
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
        ]
      : [
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
        ]
    : [
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

  return (
   <section
  className="flex min-h-screen w-full flex-col items-center overflow-x-hidden py-24 max-sm:py-16"
  style={{ background: "bg-[var(--secondary)]" }}
>
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
 <div className="relative w-full overflow-visible">

    {/* ===== Title Overlay ===== */}
    <div className="service-title-wrapper">
      {slides.map((slide, index) => (
        <h2
  className={`service-title ${
    index === (motion?.target ?? centerIndex)
      ? "is-active"
      : ""
  }`}
>
 

  <span className="title-mask">
    <span className="service-heading title-content">
      {slide.title}
    </span>
  </span>
</h2>
      ))}
    </div>

    {/* ===== Slider ===== */}
    <div
      className={`service-track ${
        moving ? "is-moving" : ""
      }`}
    >
      {cards.map(({ index, position }, order) => {
        const slide = slides[index];

        if (!slide) return null;

        return (
          <div
            key={`${motion ? "motion" : "idle"}-${position}-${slide.id}-${order}`}
            className={`service-card service-card--${position}`}
            onClick={() => {
              if (!motion && position === "right") {
                goTo("next");
              }

              if (!motion && position === "left") {
                goTo("prev");
              }
            }}
            aria-hidden={position.includes("out-")}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="block h-full w-full object-cover"
              loading={
                index === centerIndex ? "eager" : "lazy"
              }
              draggable={false}
            />
          </div>
        );
      })}
    </div>

  </div>
</section>
  );
}

export default ServiceSlider;