import React, { useEffect, useState } from "react";

import Navbar from "../../components/Layout/Header/Navbar";
import Footer from "../../components/Layout/Footer/Footer";

import API, { resolveFileUrl } from "../../api/axios";

import heroBG from "../../../src/assets/Images/project/project-banner.png";

const noImagePlaceholder =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'%3E%3Crect width='800' height='600' fill='%23e9e5dd'/%3E%3Ctext x='400' y='300' font-family='Arial' font-size='28' fill='%23938b7c' text-anchor='middle'%3ENo Project Image%3C/text%3E%3C/svg%3E";

const Project = () => {
  const [projects, setProjects] = useState([]);
  const [visibleCount, setVisibleCount] = useState(9);
  const [loading, setLoading] = useState(true);

  /* =========================================================
     FETCH PROJECTS
  ========================================================= */

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);

        const res = await API.get("/projects?type=cards");

        const data =
          res.data?.data ||
          res.data ||
          [];

        setProjects(
          Array.isArray(data)
            ? data
            : []
        );
      } catch (error) {
        console.error(
          "Project fetch error:",
          error
        );

        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const scrollToProjects = () => {
    document
      .getElementById("projects-list")
      ?.scrollIntoView({
        behavior: "smooth",
      });
  };

  return (
    <>
      <Navbar />

      <main
        className="
          w-full
          overflow-x-hidden
          bg-[#F3F0E9]
          font-inter
          text-[#151515]
        "
      >
        {/* =====================================================
            HERO
        ====================================================== */}

        <section
          className="
            relative
            isolate
            min-h-[76svh]
            overflow-hidden
            bg-[#29251F]
            text-[#F3F0E9]
          "
        >
          {/* HERO IMAGE */}

          <div
            className="
              absolute
              inset-0
              -z-50
              bg-cover
              bg-center
              bg-no-repeat
            "
            style={{
              backgroundImage: `url(${heroBG})`,
            }}
          />

          {/* DARK OVERLAY */}

          <div
            className="
              absolute
              inset-0
              -z-40
              bg-[linear-gradient(90deg,rgba(27,24,20,.90)_0%,rgba(27,24,20,.74)_28%,rgba(27,24,20,.38)_52%,rgba(27,24,20,.05)_74%,rgba(27,24,20,.12)_100%),linear-gradient(180deg,rgba(22,20,17,.25)_0%,transparent_40%,rgba(22,20,17,.40)_100%)]
              max-md:bg-[linear-gradient(90deg,rgba(24,22,18,.84)_0%,rgba(24,22,18,.58)_65%,rgba(24,22,18,.20)_100%)]
            "
          />

          {/* ARCHITECTURAL GRID */}

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              inset-0
              -z-30
              opacity-[.13]
              [mask-image:linear-gradient(90deg,#000,transparent_66%)]
              [background-image:linear-gradient(rgba(201,173,130,.22)_1px,transparent_1px),linear-gradient(90deg,rgba(201,173,130,.22)_1px,transparent_1px)]
              [background-size:82px_82px]
            "
          />

          {/* VERTICAL DETAIL LINE */}

          <div
            aria-hidden="true"
            className="
              absolute
              bottom-[12%]
              left-[4.5vw]
              top-[92px]
              z-10
              w-px
              bg-white/10
              max-md:left-[18px]
              max-md:top-20
            "
          />

          {/* RIGHT META */}

          <div
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
              uppercase
              tracking-[.18em]
              text-white/55
              md:flex
            "
          >
            <span className="h-px w-10 bg-[#C9AD82]" />

            JAIPUR / INDIA
          </div>

          {/* HERO CONTENT */}

          <div
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
              pb-28
              pt-24
              max-md:w-[calc(100%_-_36px)]
            "
          >
            <div
              className="
                w-full
                max-w-[700px]
                max-xl:max-w-[640px]
                max-lg:max-w-[580px]
              "
            >
              {/* EYEBROW */}

              <div
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
                "
              >
                <span className="h-px w-11 bg-current" />

                05 / PROJECTS
              </div>

              {/* HERO TITLE */}

              <h1
                className="
                  m-0
                  font-clash
                  text-[clamp(3.9rem,5.8vw,6.3rem)]
                  font-medium
                  leading-[.82]
                  tracking-[-.052em]
                  text-[#F3F0E9]
                  [text-shadow:0_18px_42px_rgba(0,0,0,.28)]
                  max-xl:text-[clamp(3.7rem,5.5vw,5.7rem)]
                  max-md:text-[clamp(3.8rem,12vw,5.8rem)]
                  max-sm:text-[clamp(3.1rem,15vw,4.5rem)]
                  max-sm:leading-[.87]
                "
              >
                Built with

                <em
                  className="
                    block
                    font-medium
                    text-[#C9AD82]
                  "
                >
                  purpose.
                </em>

                <span className="block">
                  Designed to
                </span>

                <em
                  className="
                    block
                    font-medium
                    text-[#C9AD82]
                  "
                >
                  endure.
                </em>
              </h1>

              {/* DESCRIPTION */}

              <p
                className="
                  mt-[clamp(1.5rem,2.5vw,2.2rem)]
                  max-w-[540px]
                  font-inter
                  text-[clamp(.82rem,1vw,.95rem)]
                  font-light
                  leading-[1.75]
                  tracking-[.01em]
                  text-white/75
                  max-sm:text-[.8rem]
                  max-sm:leading-6
                "
              >
                Explore a selection of CADMAX projects shaped
                through architecture, engineering and precise
                project delivery.
              </p>

              {/* CTA */}

              <button
                onClick={scrollToProjects}
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
                  tracking-[.2em]
                  text-[#151515]
                  outline-none
                  transition-colors
                  duration-300
                  hover:bg-[#F3F0E9]
                "
              >
                Explore Projects

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
                  <span
                    className="
                      transition-transform
                      duration-300
                      group-hover:translate-y-1
                    "
                  >
                    ↓
                  </span>
                </span>
              </button>
            </div>
          </div>

          {/* =================================================
              BOTTOM STRIP
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
              backdrop-blur-sm
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
              {/* INTRO */}

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
                    text-[8px]
                    font-semibold
                    uppercase
                    leading-5
                    tracking-[.2em]
                    text-[#151515]/50
                  "
                >
                  Architecture · Engineering

                  <span
                    className="
                      block
                      text-[#C9AD82]
                    "
                  >
                    Project Delivery
                  </span>
                </p>
              </div>

              {/* ARCHITECTURE */}

              <div
                className="
                  group
                  flex
                  min-h-[74px]
                  items-center
                  gap-4
                  border-r
                  border-[#151515]/15
                  px-[clamp(.8rem,2.2vw,2rem)]
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
                  01
                </span>

                <span
                  className="
                    font-inter
                    text-[8px]
                    font-semibold
                    uppercase
                    tracking-[.16em]
                    text-[#151515]/60
                    max-sm:text-[7px]
                    max-sm:leading-4
                  "
                >
                  Architecture
                </span>
              </div>

              {/* ENGINEERING */}

              <div
                className="
                  group
                  flex
                  min-h-[74px]
                  items-center
                  gap-4
                  border-r
                  border-[#151515]/15
                  px-[clamp(.8rem,2.2vw,2rem)]
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
                  02
                </span>

                <span
                  className="
                    font-inter
                    text-[8px]
                    font-semibold
                    uppercase
                    tracking-[.16em]
                    text-[#151515]/60
                    max-sm:text-[7px]
                    max-sm:leading-4
                  "
                >
                  Engineering
                </span>
              </div>

              {/* DELIVERY */}

              <div
                className="
                  group
                  flex
                  min-h-[74px]
                  items-center
                  gap-4
                  px-[clamp(.8rem,2.2vw,2rem)]
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
                  03
                </span>

                <span
                  className="
                    font-inter
                    text-[8px]
                    font-semibold
                    uppercase
                    tracking-[.16em]
                    text-[#151515]/60
                    max-sm:text-[7px]
                    max-sm:leading-4
                  "
                >
                  Project Delivery
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            PROJECT LIST
        ====================================================== */}

        <section
          id="projects-list"
          className="
            relative
            isolate
            overflow-hidden
            bg-[#F3F0E9]
            px-[max(4.5vw,calc((100vw_-_1500px)/2))]
            py-[clamp(4.5rem,7vw,7rem)]
            max-sm:px-[18px]
            max-sm:py-16
          "
        >
          {/* BACKGROUND GRID */}

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              inset-0
              -z-20
              opacity-[.16]
              [background-image:linear-gradient(rgba(21,21,21,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(21,21,21,.08)_1px,transparent_1px)]
              [background-size:86px_86px]
            "
          />

          <div
            className="
              mx-auto
              w-full
              max-w-[1500px]
            "
          >
            {/* =================================================
                SECTION HEADER
            ================================================= */}

            <div
              className="
                mb-[clamp(3rem,5vw,5rem)]
                grid
                grid-cols-[1fr_.65fr]
                items-end
                gap-[clamp(2rem,7vw,7rem)]
                max-lg:grid-cols-1
                max-lg:gap-6
              "
            >
              <div>
                {/* EYEBROW */}

                <p
                  className="
                    mb-5
                    flex
                    items-center
                    gap-3
                    font-inter
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[.22em]
                    text-[#B89462]
                  "
                >
                  <span className="h-px w-9 bg-current" />

                  SELECTED WORK
                </p>

                {/* TITLE */}

                <h2
                  className="
                    m-0
                    font-clash
                    text-[clamp(3.4rem,5vw,5.6rem)]
                    font-medium
                    leading-[.84]
                    tracking-[-.048em]
                    text-[#24211D]
                    max-sm:text-[clamp(3.1rem,15vw,4.6rem)]
                  "
                >
                  Projects that

                  <em
                    className="
                      block
                      font-medium
                      text-[#B89462]
                    "
                  >
                    shape places.
                  </em>
                </h2>
              </div>

              {/* RIGHT DESCRIPTION */}

              <p
                className="
                  mb-1
                  max-w-[520px]
                  font-inter
                  text-[clamp(.84rem,1vw,.95rem)]
                  leading-[1.75]
                  text-[#625E57]
                "
              >
                From architectural planning to engineering
                execution, every project reflects our commitment
                to precision, functionality and enduring design.
              </p>
            </div>

            {/* =================================================
                LOADING SKELETON
            ================================================= */}

            {loading && (
              <div
                className="
                  grid
                  grid-cols-1
                  gap-x-7
                  gap-y-14
                  md:grid-cols-2
                  lg:grid-cols-3
                "
              >
                {Array.from({
                  length: 6,
                }).map((_, index) => (
                  <div
                    key={index}
                    className="animate-pulse"
                  >
                    <div
                      className="
                        aspect-[4/5]
                        w-full
                        bg-[#DED8CD]
                      "
                    />

                    <div
                      className="
                        mt-5
                        h-6
                        w-2/3
                        bg-[#DED8CD]
                      "
                    />

                    <div
                      className="
                        mt-3
                        h-3
                        w-1/3
                        bg-[#DED8CD]
                      "
                    />
                  </div>
                ))}
              </div>
            )}

            {/* =================================================
                EMPTY STATE
            ================================================= */}

            {!loading &&
              projects.length === 0 && (
                <div
                  className="
                    flex
                    min-h-[320px]
                    flex-col
                    items-center
                    justify-center
                    text-center
                  "
                >
                  <p
                    className="
                      mb-3
                      font-inter
                      text-[9px]
                      font-semibold
                      uppercase
                      tracking-[.22em]
                      text-[#B89462]
                    "
                  >
                    PROJECTS
                  </p>

                  <h3
                    className="
                      font-clash
                      text-[clamp(2.3rem,4vw,3.4rem)]
                      font-medium
                      tracking-[-.035em]
                      text-[#24211D]
                    "
                  >
                    No projects found.
                  </h3>
                </div>
              )}

            {/* =================================================
                PROJECT GRID
            ================================================= */}

            {!loading &&
              projects.length > 0 && (
                <div
                  className="
                    grid
                    grid-cols-1
                    gap-x-7
                    gap-y-16
                    md:grid-cols-2
                    lg:grid-cols-3
                  "
                >
                  {projects
                    .slice(
                      0,
                      visibleCount
                    )
                    .map(
                      (
                        item,
                        index
                      ) => {
                        const projectImage =
                          item.image
                            ? resolveFileUrl(
                              item.image
                                ?.url ||
                              item.image
                            )
                            : noImagePlaceholder;

                        return (
                          <article
                            key={
                              item._id ||
                              item.id ||
                              item.title
                            }
                            className="
                              group
                              cursor-pointer
                            "
                          >
                            {/* IMAGE */}

                            <div
                              className="
                                relative
                                aspect-[4/5]
                                overflow-hidden
                                bg-[#DED8CD]
                              "
                            >
                              <img
                                src={
                                  projectImage
                                }
                                alt={
                                  item.title ||
                                  "CADMAX Project"
                                }
                                className="
                                  h-full
                                  w-full
                                  object-cover
                                  transition-transform
                                  duration-700
                                  ease-out
                                  group-hover:scale-[1.055]
                                "
                                onError={(
                                  e
                                ) => {
                                  e.currentTarget.src =
                                    noImagePlaceholder;
                                }}
                              />

                              {/* OVERLAY */}

                              <div
                                className="
                                  absolute
                                  inset-0
                                  bg-gradient-to-t
                                  from-black/55
                                  via-transparent
                                  to-transparent
                                "
                              />

                              {/* NUMBER */}

                              <span
                                className="
                                  absolute
                                  left-5
                                  top-5
                                  font-inter
                                  text-[9px]
                                  font-semibold
                                  tracking-[.18em]
                                  text-white/80
                                "
                              >
                                {String(
                                  index + 1
                                ).padStart(
                                  2,
                                  "0"
                                )}
                              </span>

                              {/* ARROW */}

                              <span
                                className="
                                  absolute
                                  bottom-5
                                  right-5
                                  grid
                                  h-12
                                  w-12
                                  place-items-center
                                  border
                                  border-white/70
                                  text-lg
                                  text-white
                                  transition-all
                                  duration-300
                                  group-hover:border-[#C9AD82]
                                  group-hover:bg-[#C9AD82]
                                  group-hover:text-[#151515]
                                "
                              >
                                ↗
                              </span>
                            </div>

                            {/* PROJECT INFORMATION */}

                            <div className="pt-5">
                              <div
                                className="
                                  flex
                                  items-start
                                  justify-between
                                  gap-5
                                "
                              >
                                {/* TITLE */}

                                <h3
                                  className="
                                    m-0
                                    max-w-[75%]
                                    font-clash
                                    text-[clamp(1.35rem,1.7vw,1.65rem)]
                                    font-medium
                                    leading-[1.05]
                                    tracking-[-.025em]
                                    text-[#24211D]
                                    transition-colors
                                    duration-300
                                    group-hover:text-[#B89462]
                                  "
                                >
                                  {item.title ||
                                    "Untitled Project"}
                                </h3>

                                {/* CATEGORY */}

                                <span
                                  className="
                                    mt-1
                                    shrink-0
                                    font-inter
                                    text-[8px]
                                    font-semibold
                                    uppercase
                                    tracking-[.18em]
                                    text-[#B89462]
                                  "
                                >
                                  {item.category ||
                                    "Architecture"}
                                </span>
                              </div>

                              {/* DIVIDER */}

                              <div
                                className="
                                  my-4
                                  h-px
                                  w-full
                                  bg-[#151515]/15
                                "
                              />

                              {/* META */}

                              <div
                                className="
                                  flex
                                  items-center
                                  justify-between
                                  gap-5
                                  font-inter
                                  text-[9px]
                                  font-semibold
                                  uppercase
                                  tracking-[.12em]
                                  text-[#151515]/45
                                "
                              >
                                <span>
                                  {item.location ||
                                    "Jaipur, India"}
                                </span>

                                <span>
                                  CADMAX
                                </span>
                              </div>
                            </div>
                          </article>
                        );
                      }
                    )}
                </div>
              )}

            {/* =================================================
                LOAD MORE
            ================================================= */}

            {!loading &&
              visibleCount <
              projects.length && (
                <div
                  className="
                    mt-[clamp(4rem,6vw,6rem)]
                    flex
                    justify-center
                  "
                >
                  <button
                    onClick={() =>
                      setVisibleCount(
                        (prev) =>
                          prev + 9
                      )
                    }
                    className="
                      group
                      inline-flex
                      min-h-[52px]
                      min-w-[235px]
                      items-center
                      justify-between
                      gap-6
                      border
                      border-[#24211D]
                      bg-transparent
                      pl-6
                      pr-2
                      font-inter
                      text-[9px]
                      font-semibold
                      uppercase
                      tracking-[.18em]
                      text-[#24211D]
                      transition-all
                      duration-300
                      hover:bg-[#24211D]
                      hover:text-[#F3F0E9]
                    "
                  >
                    Load More Projects

                    <span
                      className="
                        grid
                        h-10
                        w-10
                        place-items-center
                        border-l
                        border-current/20
                        transition-transform
                        duration-300
                        group-hover:translate-y-1
                      "
                    >
                      ↓
                    </span>
                  </button>
                </div>
              )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Project;