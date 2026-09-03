import { useEffect, useRef, useState } from "react";

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

import {
  FaArrowDown,
  FaArrowRight,
  FaEnvelope,
  FaExternalLinkAlt,
  FaMapMarkerAlt,
  FaPaperPlane,
  FaPhoneAlt,
} from "react-icons/fa";

import heroBG from "../../assets/Images/contact/cadmax-contact-hero.png";

import Navbar from "../../components/Layout/Header/Navbar";
import Footer from "../../components/Layout/Footer/Footer";

import API from "../../api/axios";

/* =========================================================
   INITIAL FORM
========================================================= */

const INITIAL_FORM = {
  fullName: "",
  email: "",
  phone: "",
  message: "",
};

/* =========================================================
   CONTACT DATA
========================================================= */

const CONTACT_ITEMS = [
  {
    id: "phone",
    label: "Call our studio",
    value: "0141-411-3111",
    href: "tel:+911414113111",
    icon: FaPhoneAlt,
  },
  {
    id: "email",
    label: "Write to us",
    value: "cadmaxconsultancy@gmail.com",
    href: "mailto:cadmaxconsultancy@gmail.com",
    icon: FaEnvelope,
  },
];

const HERO_META = [
  {
    number: "01",
    label: "Architecture",
  },
  {
    number: "02",
    label: "Engineering",
  },
  {
    number: "03",
    label: "Project Delivery",
  },
];

/* =========================================================
   ANIMATION
========================================================= */

const REVEAL_CONTAINER = {
  hidden: {},

  visible: {
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.12,
    },
  },
};

const REVEAL_ITEM = {
  hidden: {
    opacity: 0,
    y: 42,
    rotateX: -12,
  },

  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,

    transition: {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

/* =========================================================
   INPUT STYLES
========================================================= */

const inputClass = `
  min-h-11
  w-full
  rounded-md
  border
  border-[#151515]/20
  bg-transparent
  px-3.5
  py-2.5
  font-inter
  text-[14px]
  md:text-[15px]
  text-[#24211D]
  outline-none
  placeholder:text-[#151515]/30
  transition-all
  duration-300
  focus:border-[#B89462]
  focus:ring-1
  focus:ring-[#B89462]/30
`;

const labelClass = `
  mb-1.5
  block

  font-inter
  text-[9px]

  font-semibold
  uppercase

  tracking-[0.18em]

  text-[#151515]/45

  transition-colors
  duration-300

  group-focus-within:text-[#B89462]
`;

/* =========================================================
   COMPONENT
========================================================= */

const Contact = () => {
  const heroRef = useRef(null);

  const successTimerRef = useRef(null);

  const reduceMotion =
    useReducedMotion();

  const [form, setForm] =
    useState(INITIAL_FORM);

  const [loading, setLoading] =
    useState(false);

  const [success, setSuccess] =
    useState("");

  const [error, setError] =
    useState("");

  /* =======================================================
     CARD TILT
  ======================================================= */

  const cardXMotion =
    useMotionValue(0);

  const cardYMotion =
    useMotionValue(0);

  const cardRotateX =
    useSpring(cardXMotion, {
      stiffness: 150,
      damping: 24,
      mass: 0.7,
    });

  const cardRotateY =
    useSpring(cardYMotion, {
      stiffness: 150,
      damping: 24,
      mass: 0.7,
    });

  /* =======================================================
     HERO SCROLL
  ======================================================= */

  const {
    scrollYProgress,
  } = useScroll({
    target: heroRef,

    offset: [
      "start start",
      "end start",
    ],
  });

  const imageY =
    useTransform(
      scrollYProgress,
      [0, 1],
      ["0%", "10%"]
    );

  const imageScale =
    useTransform(
      scrollYProgress,
      [0, 1],
      [1.08, 1]
    );

  const heroTextY =
    useTransform(
      scrollYProgress,
      [0, 1],
      [0, 80]
    );

  const heroTextOpacity =
    useTransform(
      scrollYProgress,
      [0, 0.74],
      [1, 0]
    );

  const gridY =
    useTransform(
      scrollYProgress,
      [0, 1],
      [0, 110]
    );

  /* =======================================================
     CLEANUP
  ======================================================= */

  useEffect(() => {
    return () => {
      if (
        successTimerRef.current
      ) {
        window.clearTimeout(
          successTimerRef.current
        );
      }
    };
  }, []);

  /* =======================================================
     FORM CHANGE
  ======================================================= */

  const handleChange = (
    event
  ) => {
    const {
      name,
      value,
    } = event.target;

    setForm(
      (current) => ({
        ...current,
        [name]: value,
      })
    );

    if (error) {
      setError("");
    }
  };

  /* =======================================================
     FORM SUBMIT
  ======================================================= */

  const handleSubmit = async (
    event
  ) => {
    event.preventDefault();

    setLoading(true);

    setSuccess("");
    setError("");

    try {
      await API.post(
        "/inquiries",
        form
      );

      setSuccess(
        "Thank you. Your inquiry has been sent successfully."
      );

      setForm(
        INITIAL_FORM
      );

      if (
        successTimerRef.current
      ) {
        window.clearTimeout(
          successTimerRef.current
        );
      }

      successTimerRef.current =
        window.setTimeout(
          () => {
            setSuccess("");
          },
          4000
        );
    } catch (
    requestError
    ) {
      console.error(
        "Contact inquiry failed:",
        requestError
      );

      setError(
        requestError
          ?.response
          ?.data
          ?.message ||
        "We could not send your inquiry. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  /* =======================================================
     TILT EFFECT
  ======================================================= */

  const handleCardTilt = (
    event
  ) => {
    if (
      reduceMotion ||
      event.pointerType !==
      "mouse"
    ) {
      return;
    }

    const bounds =
      event.currentTarget
        .getBoundingClientRect();

    const x =
      (event.clientX -
        bounds.left) /
      bounds.width -
      0.5;

    const y =
      (event.clientY -
        bounds.top) /
      bounds.height -
      0.5;

    cardYMotion.set(
      x * 5
    );

    cardXMotion.set(
      y * -5
    );
  };

  const resetCardTilt =
    () => {
      cardXMotion.set(0);
      cardYMotion.set(0);
    };

  return (
    <>
      <Navbar />

      <main
        className="
          w-full
          overflow-x-clip

          bg-[#F3F0E9]

          font-inter
          text-[#151515]
        "
      >
        {/* =================================================
            HERO
        ================================================= */}

        <section
          ref={heroRef}
          aria-labelledby="contact-title"
          className="
            relative
            isolate

            min-h-[76svh]

            overflow-hidden

            bg-[#29251F]

            text-[#F3F0E9]

            [perspective:1500px]
          "
        >
          {/* Hero Image */}

          <motion.div
            className="
              absolute
              inset-0
              -z-50
              overflow-hidden
            "
            initial={
              reduceMotion
                ? false
                : {
                  clipPath:
                    "inset(0 100% 0 0)",
                }
            }
            animate={{
              clipPath:
                "inset(0 0% 0 0)",
            }}
            transition={{
              duration: 1.45,
              ease: [
                0.76,
                0,
                0.24,
                1,
              ],
            }}
          >
            <motion.img
              src={heroBG}
              alt=""
              aria-hidden="true"
              fetchPriority="high"
              className="
                h-[110%]
                w-full

                object-cover
                object-[58%_center]

                brightness-[.92]
                contrast-105
                saturate-[.82]

                max-lg:object-[61%_center]
                max-md:object-[64%_center]

                max-sm:object-[67%_center]
                max-sm:brightness-[.72]
              "
              style={
                reduceMotion
                  ? undefined
                  : {
                    y: imageY,
                    scale:
                      imageScale,
                  }
              }
            />
          </motion.div>

          {/* Architectural grid */}

          <motion.div
            aria-hidden="true"
            className="
              absolute
              inset-0
              -z-30

              opacity-[.16]

              [mask-image:linear-gradient(90deg,#000,transparent_58%)]
            "
            style={{
              ...(reduceMotion
                ? {}
                : {
                  y: gridY,
                }),

              backgroundImage:
                "linear-gradient(rgba(201,173,130,.22) 1px, transparent 1px), linear-gradient(90deg, rgba(201,173,130,.22) 1px, transparent 1px)",

              backgroundSize:
                "82px 82px",
            }}
          />

          {/* Vertical line */}

          <div
            aria-hidden="true"
            className="
              absolute
              bottom-[12%]
              left-[4.5vw]
              top-[92px]
              z-10

              w-px

              bg-white/05

              max-md:left-[18px]
              max-md:top-20
            "
          />

          {/* Coordinates */}

          <motion.div
            aria-hidden="true"
            className="
              absolute
              right-[4.5vw]
              top-[128px]
              z-20

              hidden
              items-center
              gap-3

              font-inter
              text-[9px]
              font-semibold

              tracking-[.18em]

              text-white/55

              md:flex
            "
            initial={
              reduceMotion
                ? false
                : {
                  opacity: 0,
                  x: 20,
                }
            }
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              delay: 1.05,
              duration: 0.7,
            }}
          >
            <span
              className="
                h-px
                w-10
                bg-[#C9AD82]
              "
            />

            26.9124° N /
            75.7873° E
          </motion.div>

          {/* =================================================
              HERO TEXT
          ================================================= */}

          <motion.div
            className="
              relative
              z-20

              mx-auto

              flex
              min-h-[76svh]

              w-[91vw]
              max-w-[1500px]

              flex-col
              justify-center

              pb-24
              pt-24

              max-md:w-[calc(100%_-_36px)]
            "
            style={
              reduceMotion
                ? undefined
                : {
                  y: heroTextY,
                  opacity:
                    heroTextOpacity,
                }
            }
          >
            <motion.div
              className="
                w-full
                max-w-[660px]

                [transform-style:preserve-3d]

                max-xl:max-w-[590px]
                max-lg:max-w-[540px]
              "
              variants={
                REVEAL_CONTAINER
              }
              initial={
                reduceMotion
                  ? false
                  : "hidden"
              }
              animate="visible"
            >
              {/* Eyebrow */}

              <motion.div
                variants={
                  REVEAL_ITEM
                }
                className="
                  mb-[clamp(1.7rem,3vw,2.7rem)]

                  flex
                  items-center
                  gap-4

                  font-inter
                  text-[10px]
                  font-semibold

                  uppercase

                  tracking-[.24em]

                  text-[#C9AD82]

                  [transform:translateZ(70px)]
                "
              >
                <span
                  className="
                    h-px
                    w-11
                    bg-current
                  "
                />

                04 / CONTACT
              </motion.div>

              {/* Main Hero Heading */}

              <motion.h1
                id="contact-title"
                variants={
                  REVEAL_ITEM
                }
                className="
                  m-0

                  font-clash

                  text-[clamp(3.6rem,5.6vw,6rem)]

                  font-medium

                  leading-[.86]

                  tracking-[-.05em]

                  text-[#F3F0E9]

                  [text-shadow:0_18px_42px_rgba(0,0,0,.28)]

                  [transform:translateZ(110px)]

                  max-xl:text-[clamp(3.5rem,5.3vw,5.5rem)]

                  max-md:text-[clamp(3.5rem,11vw,5.2rem)]

                  max-sm:text-[clamp(3rem,14vw,4.4rem)]

                  max-sm:leading-[.9]
                "
              >
                Every project

                <span className="block">
                  begins with
                </span>

                <em
                  className="
                    mt-[.12em]
                    block

                    font-medium

                    text-[#C9AD82]
                  "
                >
                  a clear
                </em>

                <em
                  className="
                    block

                    font-medium

                    text-[#C9AD82]
                  "
                >
                  conversation.
                </em>
              </motion.h1>

              {/* Description */}

              <motion.p
                variants={
                  REVEAL_ITEM
                }
                className="
                  mt-[clamp(1.5rem,2.5vw,2.2rem)]

                  max-w-[540px]

                  font-inter

                  text-[14px]
                  md:text-[15px]

                  font-light

                  leading-[1.75]

                  tracking-[.01em]

                  text-white/75

                  [transform:translateZ(65px)]

                  max-sm:text-[13px]
                  max-sm:leading-6
                "
              >
                Share your site,
                data or project vision
                with CADMAX. We will
                help translate it into
                a precise, practical
                and build-ready
                direction.
              </motion.p>

              {/* CTA */}

              <motion.a
                variants={
                  REVEAL_ITEM
                }
                href="#contact-form"
                className="
                  group

                  mt-7

                  inline-flex
                  min-h-[52px]

                  items-center

                  gap-5

                  border
                  border-[#C9AD82]

                  bg-[#C9AD82]

                  px-2
                  pl-6

                  font-inter
                  text-[9px]
                  font-semibold

                  uppercase

                  tracking-[.18em]

                  text-[#151515]

                  outline-none

                  transition-colors
                  duration-300

                  hover:bg-[#F3F0E9]

                  focus-visible:ring-2
                  focus-visible:ring-[#F3F0E9]

                  focus-visible:ring-offset-4
                  focus-visible:ring-offset-[#151515]

                  [transform:translateZ(80px)]
                "
              >
                Start your inquiry

                <span
                  className="
                    grid
                    h-10
                    w-10
                    place-items-center

                    border-l
                    border-[#151515]/25
                  "
                >
                  <FaArrowDown
                    className="
                      transition-transform
                      duration-300

                      group-hover:translate-y-1
                    "
                  />
                </span>
              </motion.a>
            </motion.div>
          </motion.div>

          {/* =================================================
              HERO BOTTOM INFO
          ================================================= */}

          <div
            className="
              absolute
              bottom-0
              left-0
              right-0
              z-30

              border-t
              border-[#151515]/15

              bg-[#F3F0E9]/95

              text-[#151515]
            "
          >
            <div
              className="
                mx-auto

                grid

                w-[91vw]
                max-w-[1500px]

                grid-cols-[1.15fr_1fr_1fr_1fr]

                max-md:w-full
                max-md:grid-cols-3
                max-md:px-[18px]
              "
            >
              {/* Intro */}

              <div
                className="
                  flex
                  min-h-[74px]

                  items-center

                  border-r
                  border-[#151515]/15

                  pr-8

                  max-md:hidden
                "
              >
                <p
                  className="
                    font-inter

                    text-[10px]

                    font-semibold
                    uppercase

                    leading-5

                    tracking-[.18em]

                    text-[#151515]/50
                  "
                >
                  Architecture ·Engineering

                  <span
                    className="
                      block
                      text-[#C9AD82]
                    "
                  >
                    Jaipur, India
                  </span>
                </p>
              </div>

              {/* Meta */}

              {HERO_META.map(
                (item) => (
                  <div
                    key={
                      item.number
                    }
                    className="
                      group

                      flex
                      min-h-[74px]

                      items-center

                      gap-4

                      border-r
                      border-[#151515]/15

                      px-[clamp(.8rem,2.2vw,2rem)]

                      last:border-r-0

                      max-sm:min-h-[68px]

                      max-sm:flex-col
                      max-sm:items-start
                      max-sm:justify-center

                      max-sm:gap-1
                    "
                  >
                    <span
                      className="
                        font-clash

                        text-2xl

                        italic

                        text-[#C9AD82]

                        transition-transform
                        duration-300

                        group-hover:-translate-y-1

                        max-sm:text-xl
                      "
                    >
                      {
                        item.number
                      }
                    </span>

                    <span
                      className="
                        font-inter

                        text-[10px]

                        font-semibold

                        uppercase

                        tracking-[.14em]

                        text-[#151515]/60

                        max-sm:text-[8px]
                        max-sm:leading-4
                      "
                    >
                      {
                        item.label
                      }
                    </span>
                  </div>
                )
              )}
            </div>
          </div>
        </section>

        {/* =================================================
            CONTACT / INQUIRY
        ================================================= */}

        <section
          id="contact-form"
          aria-labelledby="inquiry-title"
          className="
            relative
            isolate

            overflow-hidden

            bg-[#EEE9DF]

            px-[max(4.5vw,calc((100vw_-_1500px)/2))]

            py-[clamp(4rem,6vw,5.5rem)]

            max-sm:px-[18px]
            max-sm:py-14
          "
        >
          {/* Background Shape */}

          <div
            aria-hidden="true"
            className="
              absolute
              -left-72
              top-12
              -z-10

              aspect-square
              w-[48rem]

              rotate-[16deg]

              rounded-[45%_55%_38%_62%/58%_35%_65%_42%]

              border
              border-[#151515]/10

              shadow-[0_0_0_48px_rgba(21,21,21,.018),0_0_0_96px_rgba(21,21,21,.012)]
            "
          />

          {/* Grid */}

          <div
            aria-hidden="true"
            className="
              absolute
              inset-0
              -z-20

              opacity-[.24]

              [mask-image:linear-gradient(90deg,#000,transparent_48%)]
            "
            style={{
              backgroundImage:
                "linear-gradient(rgba(21,21,21,.09) 1px, transparent 1px), linear-gradient(90deg, rgba(21,21,21,.09) 1px, transparent 1px)",

              backgroundSize:
                "72px 72px",
            }}
          />

          <div
            className="
              mx-auto

              grid

              w-full
              max-w-[1500px]

              grid-cols-[minmax(0,.82fr)_minmax(500px,1fr)]

              items-center

              gap-[clamp(3.5rem,7vw,7rem)]

              max-lg:grid-cols-1
              max-lg:gap-14
            "
          >
            {/* =================================================
                CONTACT INFORMATION
            ================================================= */}

            <motion.div
              initial={
                reduceMotion
                  ? false
                  : {
                    opacity: 0,
                    y: 60,
                  }
              }
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.2,
              }}
              transition={{
                duration: 0.9,
                ease: [
                  0.22,
                  1,
                  0.36,
                  1,
                ],
              }}
              className="
                relative
                max-w-[610px]
              "
            >
              {/* Eyebrow */}

              <p
                className="
                  mb-5

                  flex
                  items-center
                  gap-3

                  font-inter
                  text-[10px]
                  font-semibold

                  uppercase

                  tracking-[.2em]

                  text-[#B89462]
                "
              >
                <span
                  className="
                    h-px
                    w-9
                    bg-current
                  "
                />

                PROJECT INQUIRY
              </p>

              {/* Heading */}

              <h2
                id="inquiry-title"
                className="
                  m-0

                  font-clash

                  text-[clamp(3.2rem,4.8vw,5.2rem)]

                  font-medium

                  leading-[.88]

                  tracking-[-.045em]

                  text-[#24211D]

                  max-sm:text-[clamp(3rem,14vw,4.5rem)]
                "
              >
                Tell us where

                <em
                  className="
                    block
                    font-medium
                    text-[#B89462]
                  "
                >
                  you&apos;re headed.
                </em>
              </h2>

              {/* Body */}

              <p
                className="
                  mt-6
                  max-w-[520px]

                  font-inter

                  text-[14px]
                  md:text-[15px]

                  leading-[1.75]

                  text-[#625E57]
                "
              >
                Contact CADMAX
                directly for clear
                communication, expert
                guidance and a project
                response shaped around
                your actual
                requirements.
              </p>

              {/* Contact List */}

              <div
                className="
                  mt-8

                  border-t
                  border-[#151515]/15
                "
              >
                {CONTACT_ITEMS.map(
                  (item) => {
                    const Icon =
                      item.icon;

                    return (
                      <a
                        key={
                          item.id
                        }
                        href={
                          item.href
                        }
                        className="
                          group
                          relative

                          grid
                          min-h-[76px]

                          grid-cols-[42px_1fr_24px]

                          items-center

                          gap-3.5

                          overflow-hidden

                          border-b
                          border-[#151515]/15

                          px-1

                          outline-none

                          transition-[padding]
                          duration-300

                          hover:px-3.5

                          focus-visible:px-3.5
                        "
                      >
                        <span
                          className="
                            absolute
                            inset-0

                            origin-left
                            scale-x-0

                            bg-[#B89462]/10

                            transition-transform
                            duration-500
                            ease-out

                            group-hover:scale-x-100

                            group-focus-visible:scale-x-100
                          "
                        />

                        {/* Icon */}

                        <span
                          className="
                            relative
                            z-10

                            grid
                            h-10
                            w-10

                            place-items-center

                            rounded-full

                            border
                            border-[#B89462]/55

                            text-[13px]
                            text-[#B89462]

                            transition-transform
                            duration-300

                            group-hover:-translate-y-1
                          "
                        >
                          <Icon
                            aria-hidden="true"
                          />
                        </span>

                        {/* Text */}

                        <span
                          className="
                            relative
                            z-10

                            flex
                            min-w-0

                            flex-col

                            gap-1.5
                          "
                        >
                          <small
                            className="
                              font-inter

                              text-[9px]

                              font-semibold

                              uppercase

                              tracking-[.18em]

                              text-[#151515]/45
                            "
                          >
                            {
                              item.label
                            }
                          </small>

                          <strong
                            className="
                              break-all

                              font-inter

                              text-[14px]
                              md:text-[15px]

                              font-semibold

                              tracking-[.01em]

                              text-[#151515]
                            "
                          >
                            {
                              item.value
                            }
                          </strong>
                        </span>

                        <FaArrowRight
                          className="
                            relative
                            z-10

                            text-xs

                            text-[#B89462]

                            transition-transform
                            duration-300

                            group-hover:translate-x-1.5
                          "
                        />
                      </a>
                    );
                  }
                )}
              </div>

              {/* Address */}

              <div
                className="
                  mt-7

                  grid

                  grid-cols-[28px_1fr]

                  items-start

                  gap-3

                  text-[#625E57]
                "
              >
                <FaMapMarkerAlt
                  className="
                    mt-1
                    text-sm
                    text-[#B89462]
                  "
                />

                <p
                  className="
                    m-0

                    font-inter

                    text-[11px]

                    uppercase

                    leading-[1.8]

                    tracking-[.07em]
                  "
                >
                  Ground Floor 1,
                  2, 3 &amp; 302,
                  3rd Floor,
                  Prism Tower,

                  <span className="block">
                    Opp. Rajasthan
                    Police Headquarters,
                    Lalkothi, Jaipur.
                  </span>
                </p>
              </div>
            </motion.div>

            {/* =================================================
                CONTACT FORM CARD
            ================================================= */}

            <motion.div
              initial={
                reduceMotion
                  ? false
                  : {
                    opacity: 0,
                    x: 80,
                    rotateY: -8,
                  }
              }
              whileInView={{
                opacity: 1,
                x: 0,
                rotateY: 0,
              }}
              viewport={{
                once: true,
                amount: 0.15,
              }}
              transition={{
                duration: 1,

                ease: [
                  0.22,
                  1,
                  0.36,
                  1,
                ],
              }}
              className="
                relative

                mx-auto

                w-full
                max-w-[690px]

                [perspective:1300px]

                [transform-style:preserve-3d]
              "
            >
              {/* Back layers */}

              <div
                aria-hidden="true"
                className="
                  absolute

                  -bottom-6
                  -right-6
                  -top-6
                  left-9

                  -z-20

                  rotate-[2deg]

                  border
                  border-[#B89462]/30

                  bg-[#C9AD82]/20

                  shadow-[0_30px_70px_rgba(34,30,23,.14)]

                  [transform:translateZ(-75px)]

                  max-sm:hidden
                "
              />

              <div
                aria-hidden="true"
                className="
                  absolute

                  -bottom-4
                  -left-4
                  -right-4
                  top-14

                  -z-10

                  -rotate-[1.2deg]

                  border
                  border-[#151515]/15

                  bg-[#F3F0E9]

                  [transform:translateZ(-35px)]

                  max-sm:hidden
                "
              />

              {/* Main Form Card */}

              <motion.div
                onPointerMove={
                  handleCardTilt
                }
                onPointerLeave={
                  resetCardTilt
                }
                onPointerCancel={
                  resetCardTilt
                }
                style={
                  reduceMotion
                    ? undefined
                    : {
                      rotateX:
                        cardRotateX,

                      rotateY:
                        cardRotateY,

                      transformPerspective:
                        1300,
                    }
                }
                className="
                  relative
                  isolate

                  overflow-hidden

                  border
                  border-[#151515]/15

                  bg-[#FBF8F1]

                  p-[clamp(1.5rem,3vw,2.7rem)]

                  text-[#24211D]

                  shadow-[0_32px_75px_rgba(34,30,23,.16)]

                  [transform-style:preserve-3d]

                  max-sm:-mx-1
                  max-sm:p-5
                "
              >
                {/* Top Line */}

                <div
                  className="
                    absolute
                    left-0
                    top-0

                    h-[3px]
                    w-1/3

                    bg-[#C9AD82]
                  "
                />

                <div
                  className="
                    absolute
                    right-0
                    top-0

                    h-px
                    w-2/3

                    bg-[#151515]/15
                  "
                />

                {/* Card Grid */}

                <div
                  aria-hidden="true"
                  className="
                    absolute
                    inset-0
                    -z-20

                    opacity-[.18]

                    [mask-image:radial-gradient(circle_at_100%_0%,#000,transparent_65%)]
                  "
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(21,21,21,.12) 1px, transparent 1px), linear-gradient(90deg, rgba(21,21,21,.12) 1px, transparent 1px)",

                    backgroundSize:
                      "42px 42px",
                  }}
                />

                {/* Decorative Ring */}

                <motion.div
                  aria-hidden="true"
                  className="
                    absolute

                    -right-20
                    -top-20

                    -z-10

                    aspect-square
                    w-64

                    rounded-full

                    border
                    border-[#C9AD82]/20

                    shadow-[0_0_0_28px_rgba(201,173,130,.025),0_0_0_58px_rgba(201,173,130,.018)]

                    max-sm:hidden
                  "
                  animate={
                    reduceMotion
                      ? undefined
                      : {
                        rotate:
                          360,
                      }
                  }
                  transition={{
                    duration: 18,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <span
                    className="
                      absolute
                      -left-1
                      top-1/2

                      h-2
                      w-2

                      rounded-full

                      bg-[#C9AD82]

                      shadow-[0_0_16px_rgba(201,173,130,.7)]
                    "
                  />
                </motion.div>

                {/* Form Heading */}

                <div
                  className="
                    relative
                    z-10

                    mb-5

                    flex
                    items-start
                    justify-between

                    gap-5

                    border-b
                    border-[#151515]/15

                    pb-4

                    [transform:translateZ(50px)]

                    max-sm:mb-4
                    max-sm:pb-3
                  "
                >
                  <div>
                    <p
                      className="
                        mb-3

                        font-inter

                        text-[9px]

                        font-semibold

                        uppercase

                        tracking-[.2em]

                        text-[#C9AD82]
                      "
                    >
                      DIRECT PROJECT
                      INQUIRY
                    </p>

                    <h3
                      className="
                        m-0

                        max-w-[430px]

                        font-clash

                        text-[clamp(2.2rem,3.2vw,3rem)]

                        font-medium

                        leading-[.95]

                        tracking-[-.035em]

                        text-[#24211D]

                        max-sm:text-[2rem]
                      "
                    >
                      Share the
                      essentials.

                      <em
                        className="
                          block

                          font-medium

                          text-[#C9AD82]
                        "
                      >
                        We&apos;ll take
                        it forward.
                      </em>
                    </h3>
                  </div>

                  <span
                    className="
                      font-inter

                      text-[9px]

                      tracking-[.18em]

                      text-[#151515]/30
                    "
                  >
                    01—04
                  </span>
                </div>

                {/* =================================================
                    FORM
                ================================================= */}

                <form
                  onSubmit={
                    handleSubmit
                  }
                  className="
                    relative
                    z-20

                    [transform:translateZ(34px)]
                  "
                >
                  {/* Name + Email */}

                  <div
                    className="
                      grid
                      grid-cols-2

                      gap-5

                      max-sm:grid-cols-1
                      max-sm:gap-0
                    "
                  >
                    <label
                      className="
                        group
                        mb-4
                        block
                      "
                    >
                      <span
                        className={
                          labelClass
                        }
                      >
                        Full name
                      </span>

                      <input
                        className={
                          inputClass
                        }
                        type="text"
                        name="fullName"
                        value={
                          form.fullName
                        }
                        onChange={
                          handleChange
                        }
                        placeholder="Your name"
                        autoComplete="name"
                        maxLength={80}
                        required
                      />
                    </label>

                    <label
                      className="
                        group
                        mb-4
                        block
                      "
                    >
                      <span
                        className={
                          labelClass
                        }
                      >
                        Email address
                      </span>

                      <input
                        className={
                          inputClass
                        }
                        type="email"
                        name="email"
                        value={
                          form.email
                        }
                        onChange={
                          handleChange
                        }
                        placeholder="name@company.com"
                        autoComplete="email"
                        maxLength={120}
                        required
                      />
                    </label>
                  </div>

                  {/* Phone */}

                  <label
                    className="
                      group
                      mb-4
                      block
                    "
                  >
                    <span
                      className={
                        labelClass
                      }
                    >
                      Phone number
                    </span>

                    <input
                      className={
                        inputClass
                      }
                      type="tel"
                      name="phone"
                      value={
                        form.phone
                      }
                      onChange={
                        handleChange
                      }
                      placeholder="+91 00000 00000"
                      autoComplete="tel"
                      inputMode="tel"
                      minLength={7}
                      maxLength={18}
                      required
                    />
                  </label>

                  {/* Project Brief */}

                  <label
                    className="
                      group
                      relative
                      mb-4
                      block
                    "
                  >
                    <span
                      className={
                        labelClass
                      }
                    >
                      Project brief
                    </span>

                    <textarea
                      className={`
                        ${inputClass}

                        min-h-[95px]

                        resize-y

                        pr-16
                      `}
                      name="message"
                      value={
                        form.message
                      }
                      onChange={
                        handleChange
                      }
                      placeholder="Project type, location, scope and timeline..."
                      maxLength={1500}
                      rows={3}
                      required
                    />

                    <small
                      className="
                        pointer-events-none

                        absolute
                        bottom-2
                        right-0

                        font-inter

                        text-[8px]

                        tracking-[.1em]

                        text-[#151515]/30
                      "
                    >
                      {
                        form.message
                          .length
                      }{" "}
                      / 1500
                    </small>
                  </label>

                  {/* Message */}

                  <div
                    className="
                      min-h-6
                    "
                    aria-live="polite"
                  >
                    <AnimatePresence
                      mode="wait"
                      initial={false}
                    >
                      {success && (
                        <motion.p
                          key="success"
                          initial={{
                            opacity: 0,
                            y: 8,
                          }}
                          animate={{
                            opacity: 1,
                            y: 0,
                          }}
                          exit={{
                            opacity: 0,
                            y: -8,
                          }}
                          className="
                            mb-3

                            border-l-2
                            border-[#5E8A51]

                            bg-[#5E8A51]/10

                            px-3
                            py-2.5

                            font-inter

                            text-[11px]

                            leading-5

                            text-[#466B3D]
                          "
                        >
                          {success}
                        </motion.p>
                      )}

                      {error && (
                        <motion.p
                          key="error"
                          initial={{
                            opacity: 0,
                            y: 8,
                          }}
                          animate={{
                            opacity: 1,
                            y: 0,
                          }}
                          exit={{
                            opacity: 0,
                            y: -8,
                          }}
                          className="
                            mb-3

                            border-l-2
                            border-[#B65D52]

                            bg-[#B65D52]/10

                            px-3
                            py-2.5

                            font-inter

                            text-[11px]

                            leading-5

                            text-[#97473E]
                          "
                        >
                          {error}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Submit */}

                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={
                      reduceMotion
                        ? undefined
                        : {
                          y: -2,
                        }
                    }
                    whileTap={
                      reduceMotion
                        ? undefined
                        : {
                          scale:
                            0.985,
                        }
                    }
                    className="
                      group
                      relative

                      flex
                      min-h-[50px]
                      w-full

                      items-center
                      justify-between

                      gap-4

                      overflow-hidden

                      border
                      border-[#B89462]

                      bg-[#C9AD82]

                      py-0
                      pl-6
                      pr-2

                      text-left

                      font-inter

                      text-[10px]

                      font-semibold

                      uppercase

                      tracking-[.18em]

                      text-[#151515]

                      outline-none

                      disabled:cursor-wait
                      disabled:opacity-60

                      focus-visible:ring-2
                      focus-visible:ring-[#151515]

                      focus-visible:ring-offset-4
                      focus-visible:ring-offset-[#FBF8F1]
                    "
                  >
                    <span
                      className="
                        absolute
                        inset-0

                        -translate-x-full

                        bg-[#F7F4ED]

                        transition-transform
                        duration-500
                        ease-out

                        group-hover:translate-x-0

                        group-focus-visible:translate-x-0
                      "
                    />

                    <span
                      className="
                        relative
                        z-10
                      "
                    >
                      {loading
                        ? "SENDING INQUIRY"
                        : "SEND INQUIRY"}
                    </span>

                    <span
                      className="
                        relative
                        z-10

                        grid

                        h-9
                        w-9

                        place-items-center

                        border-l
                        border-[#151515]/25

                        text-xs
                      "
                    >
                      {loading ? (
                        <i
                          className="
                            h-4
                            w-4

                            animate-spin

                            rounded-full

                            border-2
                            border-[#151515]/30

                            border-t-[#151515]
                          "
                        />
                      ) : (
                        <FaPaperPlane />
                      )}
                    </span>
                  </motion.button>

                  {/* Privacy */}

                  <p
                    className="
                      mt-2.5

                      font-inter

                      text-[9px]

                      leading-5

                      tracking-[.06em]

                      text-[#151515]/40
                    "
                  >
                    Your details are
                    used only to respond
                    to this inquiry.
                  </p>
                </form>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* =================================================
            MAP / LOCATION
        ================================================= */}

        <section
          aria-labelledby="map-title"
          className="
            relative
            isolate

            overflow-hidden

            bg-[#F7F4ED]

            px-[max(4.5vw,calc((100vw_-_1500px)/2))]

            py-[clamp(4rem,6vw,5.5rem)]

            text-[#24211D]

            max-sm:px-[18px]
            max-sm:py-14
          "
        >
          {/* Grid */}

          <div
            aria-hidden="true"
            className="
              absolute
              inset-0
              -z-20

              opacity-[.16]
            "
            style={{
              backgroundImage:
                "linear-gradient(rgba(21,21,21,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(21,21,21,.08) 1px, transparent 1px)",

              backgroundSize:
                "86px 86px",
            }}
          />

          {/* Map Header */}

          <div
            className="
              mx-auto

              mb-[clamp(2.5rem,4vw,3.8rem)]

              grid

              w-full
              max-w-[1500px]

              grid-cols-[1fr_.68fr]

              items-end

              gap-[clamp(2rem,7vw,7rem)]

              max-lg:grid-cols-1
              max-lg:gap-6
            "
          >
            <div>
              <p
                className="
                  mb-5

                  flex
                  items-center

                  gap-3

                  font-inter

                  text-[10px]

                  font-semibold

                  uppercase

                  tracking-[.2em]

                  text-[#C9AD82]
                "
              >
                <span
                  className="
                    h-px
                    w-9
                    bg-current
                  "
                />

                VISIT OUR STUDIO
              </p>

              <h2
                id="map-title"
                className="
                  m-0

                  font-clash

                  text-[clamp(3.2rem,5vw,5.4rem)]

                  font-medium

                  leading-[.88]

                  tracking-[-.045em]

                  text-[#24211D]

                  max-sm:text-[clamp(3rem,14vw,4.5rem)]
                "
              >
                Meet us in

                <em
                  className="
                    block

                    font-medium

                    text-[#C9AD82]
                  "
                >
                  Jaipur.
                </em>
              </h2>
            </div>

            <p
              className="
                mb-2
                max-w-[520px]

                font-inter

                text-[14px]
                md:text-[15px]

                leading-[1.75]

                text-[#625E57]
              "
            >
              Our studio is at
              Prism Tower, opposite
              Rajasthan Police
              Headquarters in
              Lalkothi. Open the
              exact route before
              your visit.
            </p>
          </div>

          {/* =================================================
              MAP CARD
          ================================================= */}

          <motion.div
            initial={
              reduceMotion
                ? false
                : {
                  opacity: 0,
                  y: 80,
                  rotateX: 7,
                }
            }
            whileInView={{
              opacity: 1,
              y: 0,
              rotateX: 0,
            }}
            viewport={{
              once: true,
              amount: 0.15,
            }}
            transition={{
              duration: 1,

              ease: [
                0.22,
                1,
                0.36,
                1,
              ],
            }}
            className="
              relative

              mx-auto

              grid
              min-h-[440px]

              w-full
              max-w-[1500px]

              grid-cols-[320px_1fr]

              overflow-hidden

              border
              border-[#151515]/15

              bg-[#EEE9DF]

              shadow-[0_24px_60px_rgba(52,45,35,.14)]

              [perspective:1300px]

              max-lg:grid-cols-[290px_1fr]

              max-md:grid-cols-1
              max-md:grid-rows-[auto_360px]

              max-sm:grid-rows-[auto_300px]
            "
          >
            {/* Location Card */}

            <div
              className="
                relative
                z-20

                flex
                flex-col
                justify-between

                border-r
                border-[#151515]/15

                bg-[#EEE7DA]

                p-[clamp(1.5rem,2.5vw,2.4rem)]

                text-[#24211D]

                max-md:border-b
                max-md:border-r-0
              "
            >
              <div>
                {/* Icon */}

                <span
                  className="
                    mb-7

                    grid

                    h-11
                    w-11

                    place-items-center

                    rounded-full

                    border
                    border-[#B89462]/60

                    text-[14px]
                    text-[#B89462]
                  "
                >
                  <FaMapMarkerAlt
                    aria-hidden="true"
                  />
                </span>

                {/* Label */}

                <p
                  className="
                    mb-3

                    font-inter

                    text-[9px]

                    font-semibold

                    uppercase

                    tracking-[.18em]

                    text-[#C9AD82]
                  "
                >
                  CADMAX CONSULTANCY
                </p>

                {/* Title */}

                <h3
                  className="
                    mb-4

                    font-clash

                    text-[clamp(2.1rem,3vw,3rem)]

                    font-medium

                    leading-[.95]

                    tracking-[-.03em]

                    text-[#24211D]
                  "
                >
                  Prism Tower,

                  <em
                    className="
                      block

                      font-medium

                      text-[#C9AD82]
                    "
                  >
                    Lalkothi.
                  </em>
                </h3>

                {/* Address */}

                <p
                  className="
                    font-inter

                    text-[10px]

                    uppercase

                    leading-[1.8]

                    tracking-[.07em]

                    text-[#625E57]
                  "
                >
                  Ground Floor 1,
                  2, 3 &amp; 302,
                  3rd Floor,

                  <span className="block">
                    Jaipur, Rajasthan.
                  </span>
                </p>
              </div>

              {/* Buttons */}

              <div
                className="
                  mt-8

                  grid

                  grid-cols-[1fr_48px]

                  gap-2.5
                "
              >
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Prism+Tower+Lalkothi+Jaipur+Rajasthan"
                  target="_blank"
                  rel="noreferrer"
                  className="
                    flex
                    min-h-12

                    items-center
                    justify-center

                    gap-3

                    border
                    border-[#B89462]

                    px-4

                    font-inter

                    text-[9px]

                    font-semibold

                    uppercase

                    tracking-[.14em]

                    text-[#8F6D41]

                    outline-none

                    transition-all
                    duration-300

                    hover:-translate-y-0.5
                    hover:bg-[#B89462]
                    hover:text-[#151515]

                    focus-visible:-translate-y-0.5
                    focus-visible:bg-[#B89462]
                    focus-visible:text-[#151515]
                  "
                >
                  Directions

                  <FaExternalLinkAlt
                    aria-hidden="true"
                  />
                </a>

                <a
                  href="tel:+911414113111"
                  aria-label="Call CADMAX Consultancy"
                  className="
                    grid
                    min-h-12

                    place-items-center

                    border
                    border-[#B89462]

                    text-[#8F6D41]

                    outline-none

                    transition-all
                    duration-300

                    hover:-translate-y-0.5
                    hover:bg-[#B89462]
                    hover:text-[#151515]

                    focus-visible:-translate-y-0.5
                    focus-visible:bg-[#B89462]
                    focus-visible:text-[#151515]
                  "
                >
                  <FaPhoneAlt
                    aria-hidden="true"
                  />
                </a>
              </div>
            </div>

            {/* Map */}

            <div
              className="
                relative

                min-h-[440px]

                overflow-hidden

                max-md:min-h-0
              "
            >
              <iframe
                title="CADMAX Consultancy office location in Jaipur"
                src="https://www.google.com/maps?q=Prism%20Tower%20Lalkothi%20Jaipur%20Rajasthan&output=embed"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="
                  h-full
                  w-full

                  border-0

                  [filter:grayscale(1)_sepia(.18)_saturate(.7)_contrast(1.1)_brightness(.92)]
                "
              />

              {/* Coordinates */}

              <div
                className="
                  pointer-events-none

                  absolute
                  right-0
                  top-0

                  flex
                  gap-px

                  font-inter

                  text-[8px]

                  tracking-[.12em]

                  text-[#24211D]

                  max-sm:hidden
                "
              >
                <span
                  className="
                    bg-[#F7F4ED]/90

                    px-3.5
                    py-3
                  "
                >
                  26°54′45″N
                </span>

                <span
                  className="
                    bg-[#F7F4ED]/90

                    px-3.5
                    py-3
                  "
                >
                  75°47′14″E
                </span>
              </div>
            </div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Contact;