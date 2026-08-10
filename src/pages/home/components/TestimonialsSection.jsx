import React, { useRef } from 'react';
import { gsap } from 'gsap';
import {
  Quote,
  Star,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

const testimonials = [
  {
    name: 'RAVI KUMAWAT',
    role: 'SHREE RAM GROUP',
    text: 'A professional architectural practice with strong design expertise and excellent project coordination. Their commitment to quality, clear communication, and client satisfaction is evident at every stage of their work.',
    rating: 5,
  },
  {
    name: 'MUKESH SHARMA',
    role: 'HOMELAND GROUP',
    text: 'We were highly satisfied with the firm design approach and exceptional attention to detail. The architects balanced creativity with practicality, delivering a solution that was both visually strong and highly functional.',
    rating: 5,
  },
  {
    name: 'SANWAR MAL',
    role: 'ASHIANA HOUSING LTD',
    text: 'Working with the Cadmax Group architects was a thoroughly positive experience. They listened carefully to our requirements and provided clear, professional guidance at each stage of the process.',
    rating: 5,
  },
  {
    name: 'CHARAN KHANGAROAT',
    role: 'FS REALITY GROUP',
    text: 'The firm managed the project efficiently, maintaining agreed timelines and delivering high-quality, well-structured documentation. Their reliability and organized workflow gave us confidence throughout.',
    rating: 5,
  },
];

const TestimonialsSection = () => {
  const trackRef = useRef(null);
  const currentIndexRef = useRef(0);

  /*
   * We duplicate the testimonials so the track has enough
   * content for smooth navigation.
   */
  const cards = [...testimonials, ...testimonials];

  /*
   * Move exactly one card.
   *
   * IMPORTANT:
   * We calculate the actual card position from the DOM.
   * No window.innerWidth.
   * No 100vw.
   * No ScrollTrigger.
   * No page-level scroll manipulation.
   */
  const slide = (direction) => {
    const track = trackRef.current;

    if (!track) return;

    const card = track.children[0];

    if (!card) return;

    const cardWidth = card.getBoundingClientRect().width;

    const computedStyle = window.getComputedStyle(track);
    const gap =
      parseFloat(computedStyle.columnGap) ||
      parseFloat(computedStyle.gap) ||
      0;

    const step = cardWidth + gap;

    const total = testimonials.length;

    let nextIndex =
      currentIndexRef.current + direction;

    /*
     * Infinite loop.
     */
    if (nextIndex >= total) {
      nextIndex = 0;
    }

    if (nextIndex < 0) {
      nextIndex = total - 1;
    }

    currentIndexRef.current = nextIndex;

    const nextX = -(nextIndex * step);

    gsap.to(track, {
      x: nextX,
      duration: 0.7,
      ease: 'power3.out',
      overwrite: true,
    });
  };

  return (
    <section
      className="
        relative
        min-h-[200vh]
        bg-[var(--secondary)]
      "
    >
      {/*
        =====================================================
        STICKY VIEWPORT
        =====================================================

        This is the important part.

        The testimonial section stays visually fixed while
        the next section continues to scroll over it.

        There is NO vertical overflow here.
      */}
      <div
        className="
          sticky
          top-0
          h-screen
          w-full
          max-w-full
          overflow-hidden
          flex
          flex-col
          justify-center
          bg-[var(--secondary)]
        "
      >
        {/* =================================================
            HEADER
        ================================================= */}

        <div
          className="
            w-full
            max-w-7xl
            mx-auto
            px-6
            md:px-16
            lg:px-24
            pt-8
            md:pt-14
            pb-6
            shrink-0
          "
        >
          {/* Small label */}
          <div className="flex items-start gap-4 mb-3">
            <div className="w-8 h-[1px] bg-[var(--accent)] shrink-0 mt-[7px]" />

            <span
              className="
                text-xs
                font-general
                font-semibold
                text-[var(--accent)]
                uppercase
                tracking-[0.2em]
              "
            >
              Proof of Performance
            </span>
          </div>

          {/* Heading + controls */}
          <div
            className="
              flex
              flex-col
              md:flex-row
              md:items-end
              md:justify-between
              gap-6
            "
          >
            <h2
              className="
                font-garamond
                text-section
                text-[var(--foreground)]
                max-w-xl
              "
            >
              What Our{' '}
              <span className="text-[var(--muted-foreground)]">
                Clients Say
              </span>
            </h2>

            {/* Navigation */}
            <div
              className="
                flex
                justify-end
                items-center
                gap-2
                shrink-0
              "
            >
              {/* Previous */}
              <button
                type="button"
                aria-label="Previous testimonial"
                onClick={() => slide(-1)}
                className="
                  group
                  w-12
                  h-12
                  rounded-full
                  border
                  border-[var(--border)]
                  bg-[var(--card)]
                  flex
                  items-center
                  justify-center
                  text-[var(--foreground)]
                  shadow-sm
                  hover:bg-[var(--accent)]
                  hover:text-white
                  hover:border-[var(--accent)]
                  hover:shadow-lg
                  hover:shadow-[var(--accent)]/30
                  transition-all
                  duration-300
                  shrink-0
                "
              >
                <ChevronLeft
                  className="
                    w-5
                    h-5
                    transition-transform
                    duration-300
                    group-hover:-translate-x-0.5
                  "
                />
              </button>

              {/* Next */}
              <button
                type="button"
                aria-label="Next testimonial"
                onClick={() => slide(1)}
                className="
                  group
                  w-12
                  h-12
                  rounded-full
                  border
                  border-[var(--border)]
                  bg-[var(--card)]
                  flex
                  items-center
                  justify-center
                  text-[var(--foreground)]
                  shadow-sm
                  hover:bg-[var(--accent)]
                  hover:text-white
                  hover:border-[var(--accent)]
                  hover:shadow-lg
                  hover:shadow-[var(--accent)]/30
                  transition-all
                  duration-300
                  shrink-0
                "
              >
                <ChevronRight
                  className="
                    w-5
                    h-5
                    transition-transform
                    duration-300
                    group-hover:translate-x-0.5
                  "
                />
              </button>
            </div>
          </div>
        </div>

        {/* =================================================
            TESTIMONIAL VIEWPORT
        =================================================

        IMPORTANT:

        This viewport clips the wide track.

        The track can be wider than the viewport,
        but the page itself will NOT become horizontally
        scrollable.
        */}

        <div
          className="
            relative
            w-full
            max-w-full
            min-w-0
            overflow-hidden
            shrink-0
          "
        >
          {/* =================================================
              TESTIMONIAL TRACK
          ================================================= */}

          <div
            ref={trackRef}
            className="
              flex
              gap-6
              w-max
              max-w-none
              min-w-0
              px-6
              md:px-0
              will-change-transform
            "
          >
            {cards.map((testimonial, index) => (
              <article
                key={`${testimonial.name}-${index}`}
                className="
                  group
                  flex-shrink-0
                  w-[calc(100vw_-_3rem)]
                  sm:w-[400px]
                  bg-[var(--card)]
                  rounded-2xl
                  p-6
                  sm:p-8
                  border
                  border-[var(--border)]
                  hover:shadow-elevated
                  transition-shadow
                  duration-500
                  overflow-hidden
                "
              >
                {/* Quote */}
                <Quote
                  className="
                    w-8
                    h-8
                    text-[var(--accent)]/20
                    mb-4
                  "
                />

                {/* Rating */}
                <div className="flex gap-1 mb-3">
                  {Array.from({
                    length: testimonial.rating,
                  }).map((_, starIndex) => (
                    <Star
                      key={starIndex}
                      className="
                        w-4
                        h-4
                        fill-[var(--accent)]
                        text-[var(--accent)]
                      "
                    />
                  ))}
                </div>

                {/* Text */}
                <p
                  className="
                    text-[var(--muted-foreground)]
                    font-garamond
                    text-sm
                    leading-relaxed
                    mb-6
                    line-clamp-5
                  "
                >
                  "{testimonial.text}"
                </p>

                {/* Author */}
                <div
                  className="
                    pt-3
                    border-t
                    border-[var(--border)]
                  "
                >
                  <p
                    className="
                      font-general
                      font-semibold
                      text-[var(--foreground)]
                    "
                  >
                    {testimonial.name}
                  </p>

                  <p
                    className="
                      text-xs
                      text-[var(--accent)]
                      font-general
                      tracking-wider
                    "
                  >
                    {testimonial.role}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Small bottom breathing space */}
        <div className="h-8 md:h-12 shrink-0" />
      </div>
    </section>
  );
};

export default TestimonialsSection;