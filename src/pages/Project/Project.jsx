import React, { useEffect, useState } from "react";

import Navbar from "../../components/Layout/Header/Navbar";
import Footer from "../../components/Layout/Footer/Footer";
import API, { resolveFileUrl } from "../../api/axios";

import heroBG from "../../../src/assets/Images/project/project_bg_img.png";

const noImagePlaceholder =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'%3E%3Crect width='800' height='600' fill='%23e9e5dd'/%3E%3Ctext x='400' y='300' font-family='Arial' font-size='28' fill='%23938b7c' text-anchor='middle'%3ENo Project Image%3C/text%3E%3C/svg%3E";

const getProjectCategory = (project) =>
  String(project.category || project.subCategory || project.sector || "Other").trim();

const formatCategory = (category) =>
  category.toLowerCase().replace(/\b\w/g, (letter) => letter.toUpperCase());

const Project = () => {
  const [projects, setProjects] = useState([]);
  const [visibleCount, setVisibleCount] = useState(9);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("ALL");

  // Project details modal
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [activeImage, setActiveImage] = useState(0);

  /* =========================================================
     FETCH PROJECTS
  ========================================================= */

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);

        const res = await API.get("/projects?type=cards");

        const data = res.data?.data || res.data || [];

        setProjects(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Project fetch error:", error);

        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const categories = Array.from(
    new Set(projects.map(getProjectCategory).filter(Boolean))
  ).sort((first, second) => first.localeCompare(second));

  const filteredProjects =
    selectedCategory === "ALL"
      ? projects
      : projects.filter((project) => getProjectCategory(project) === selectedCategory);

  /* =========================================================
     DETAILS MODAL LOGIC
  ========================================================= */

  const shownCount = Math.min(visibleCount, filteredProjects.length);

  const selectedProject =
    selectedIndex !== null ? filteredProjects[selectedIndex] : null;

  const openProject = (index) => {
    setActiveImage(0);
    setSelectedIndex(index);
  };

  const closeProject = () => setSelectedIndex(null);

  const goPrev = () => {
    setActiveImage(0);
    setSelectedIndex((i) => (i > 0 ? i - 1 : i));
  };

  const goNext = () => {
    setActiveImage(0);
    setSelectedIndex((i) => (i < shownCount - 1 ? i + 1 : i));
  };

  // Esc closes, ← → switch project, page scroll is locked while open
  useEffect(() => {
    if (selectedIndex === null) return;

    const onKey = (e) => {
      if (e.key === "Escape") closeProject();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedIndex, shownCount]);

  const scrollToProjects = () => {
    document.getElementById("projects-list")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <>
      <Navbar />

      <main className="w-full overflow-x-hidden bg-[#F3F0E9] font-inter text-[#151515]">
        {/* =====================================================
            HERO
        ====================================================== */}

        <section className="relative isolate min-h-[76svh] overflow-hidden bg-[#29251F] text-[#F3F0E9]">
          {/* HERO IMAGE */}
          <div
            className="absolute inset-0 -z-50 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${heroBG})` }}
          />

          {/* DARK OVERLAY */}
          <div className="absolute inset-0 -z-40 bg-[linear-gradient(90deg,rgba(27,24,20,.90)_0%,rgba(27,24,20,.74)_28%,rgba(27,24,20,.38)_52%,rgba(27,24,20,.05)_74%,rgba(27,24,20,.12)_100%),linear-gradient(180deg,rgba(22,20,17,.25)_0%,transparent_40%,rgba(22,20,17,.40)_100%)] max-md:bg-[linear-gradient(90deg,rgba(24,22,18,.84)_0%,rgba(24,22,18,.58)_65%,rgba(24,22,18,.20)_100%)]" />

          {/* ARCHITECTURAL GRID */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-30 opacity-[.13] [mask-image:linear-gradient(90deg,#000,transparent_66%)] [background-image:linear-gradient(rgba(201,173,130,.22)_1px,transparent_1px),linear-gradient(90deg,rgba(201,173,130,.22)_1px,transparent_1px)] [background-size:82px_82px]"
          />

          {/* VERTICAL DETAIL LINE */}
          <div
            aria-hidden="true"
            className="absolute bottom-[12%] left-[4.5vw] top-[92px] z-10 w-px bg-white/10 max-md:left-[18px] max-md:top-20"
          />

          {/* RIGHT META */}
          <div className="absolute right-[4.5vw] top-[128px] z-20 hidden items-center gap-3 font-inter text-[9px] font-semibold uppercase tracking-[.18em] text-white/55 md:flex">
            <span className="h-px w-10 bg-[#C9AD82]" />
            JAIPUR / INDIA
          </div>

          {/* HERO CONTENT */}
          <div className="relative z-20 mx-auto flex min-h-[76svh] w-[91vw] max-w-[1500px] flex-col justify-center pb-28 pt-24 max-md:w-[calc(100%_-_36px)]">
            <div className="w-full max-w-[700px] max-xl:max-w-[640px] max-lg:max-w-[580px]">
              {/* EYEBROW */}
              <div className="mb-[clamp(1.7rem,3vw,2.7rem)] flex items-center gap-4 font-inter text-[10px] font-semibold uppercase tracking-[.24em] text-[#C9AD82]">
                <span className="h-px w-11 bg-current" />
                05 / PROJECTS
              </div>

              {/* HERO TITLE */}
              <h1 className="m-0 font-clash text-[clamp(3.9rem,5.8vw,6.3rem)] font-medium leading-[.82] tracking-[-.052em] text-[#F3F0E9] [text-shadow:0_18px_42px_rgba(0,0,0,.28)] max-xl:text-[clamp(3.7rem,5.5vw,5.7rem)] max-md:text-[clamp(3.8rem,12vw,5.8rem)] max-sm:text-[clamp(3.1rem,15vw,4.5rem)] max-sm:leading-[.87]">
                Built with
                <em className="block font-medium text-[#C9AD82]">purpose.</em>
                <span className="block">Designed to</span>
                <em className="block font-medium text-[#C9AD82]">endure.</em>
              </h1>

              {/* DESCRIPTION */}
              <p className="mt-[clamp(1.5rem,2.5vw,2.2rem)] max-w-[540px] font-inter text-[clamp(.82rem,1vw,.95rem)] font-light leading-[1.75] tracking-[.01em] text-white/75 max-sm:text-[.8rem] max-sm:leading-6">
                Explore a selection of CADMAX projects shaped through
                architecture, engineering and precise project delivery.
              </p>

              {/* CTA */}
              <button
                onClick={scrollToProjects}
                className="group mt-7 inline-flex min-h-[52px] items-center gap-5 border border-[#C9AD82] bg-[#C9AD82] px-2 pl-6 font-inter text-[9px] font-semibold uppercase tracking-[.2em] text-[#151515] outline-none transition-colors duration-300 hover:bg-[#F3F0E9]"
              >
                Explore Projects
                <span className="grid h-10 w-10 place-items-center border-l border-[#151515]/25">
                  <span className="transition-transform duration-300 group-hover:translate-y-1">
                    ↓
                  </span>
                </span>
              </button>
            </div>
          </div>

          {/* =================================================
              BOTTOM STRIP
          ================================================= */}
          <div className="absolute bottom-0 left-0 right-0 z-30 border-t border-[#151515]/15 bg-[#F3F0E9]/95 text-[#151515] backdrop-blur-sm">
            <div className="mx-auto grid w-[91vw] max-w-[1500px] grid-cols-[1.15fr_1fr_1fr_1fr] max-md:w-full max-md:grid-cols-3 max-md:px-[18px]">
              {/* INTRO */}
              <div className="flex min-h-[74px] items-center border-r border-[#151515]/15 pr-8 max-md:hidden">
                <p className="font-inter text-[8px] font-semibold uppercase leading-5 tracking-[.2em] text-[#151515]/50">
                  Architecture · Engineering
                  <span className="block text-[#C9AD82]">Project Delivery</span>
                </p>
              </div>

              {[
                ["01", "Architecture", true],
                ["02", "Engineering", true],
                ["03", "Project Delivery", false],
              ].map(([num, label, border]) => (
                <div
                  key={num}
                  className={`group flex min-h-[74px] items-center gap-4 px-[clamp(.8rem,2.2vw,2rem)] max-sm:min-h-[68px] max-sm:flex-col max-sm:items-start max-sm:justify-center max-sm:gap-1 ${border ? "border-r border-[#151515]/15" : ""
                    }`}
                >
                  <span className="font-clash text-2xl italic text-[#C9AD82] transition-transform duration-300 group-hover:-translate-y-1 max-sm:text-xl">
                    {num}
                  </span>

                  <span className="font-inter text-[8px] font-semibold uppercase tracking-[.16em] text-[#151515]/60 max-sm:text-[7px] max-sm:leading-4">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =====================================================
            PROJECT LIST
        ====================================================== */}

        <section
          id="projects-list"
          className="relative isolate overflow-hidden bg-[#F3F0E9] px-[max(4.5vw,calc((100vw_-_1500px)/2))] py-[clamp(4.5rem,7vw,7rem)] max-sm:px-[18px] max-sm:py-16"
        >
          {/* BACKGROUND GRID */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-20 opacity-[.16] [background-image:linear-gradient(rgba(21,21,21,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(21,21,21,.08)_1px,transparent_1px)] [background-size:86px_86px]"
          />

          <div className="mx-auto w-full max-w-[1500px]">
            {/* =================================================
                SECTION HEADER
            ================================================= */}

            <div className="mb-[clamp(3rem,5vw,5rem)] grid grid-cols-[1fr_.65fr] items-end gap-[clamp(2rem,7vw,7rem)] max-lg:grid-cols-1 max-lg:gap-6">
              <div>
                <p className="mb-5 flex items-center gap-3 font-inter text-[9px] font-semibold uppercase tracking-[.22em] text-[#B89462]">
                  <span className="h-px w-9 bg-current" />
                  PROJECT SHOWCASE
                </p>

                <h2 className="m-0 font-clash text-[clamp(3.4rem,5vw,5.6rem)] font-medium leading-[.84] tracking-[-.048em] text-[#24211D] max-sm:text-[clamp(3.1rem,15vw,4.6rem)]">
                  Projects that
                  <em className="block font-medium text-[#B89462]">
                    shape places.
                  </em>
                </h2>
              </div>

              <p className="mb-1 max-w-[520px] font-inter text-[clamp(.84rem,1vw,.95rem)] leading-[1.75] text-[#625E57]">
                From architectural planning to engineering execution, every
                project reflects our commitment to precision, functionality and
                enduring design.
              </p>
            </div>

            {/* CATEGORY FILTER */}
            <nav
              aria-label="Project categories"
              className="mb-9 flex gap-6 overflow-x-auto border-b border-[#151515]/10 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {[
                { value: "ALL", label: "Show All" },
                ...categories.map((category) => ({
                  value: category,
                  label: formatCategory(category),
                })),
              ].map((category) => (
                <button
                  key={category.value}
                  type="button"
                  aria-pressed={selectedCategory === category.value}
                  onClick={() => {
                    setSelectedCategory(category.value);
                    setVisibleCount(9);
                    setSelectedIndex(null);
                  }}
                  className={`relative shrink-0 pb-1 font-inter text-[10px] uppercase tracking-[.08em] transition-colors after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-left after:transition-transform ${selectedCategory === category.value
                      ? "text-[#24211D] after:scale-x-100 after:bg-[#B89462]"
                      : "text-[#625E57] after:scale-x-0 after:bg-[#B89462] hover:text-[#24211D] hover:after:scale-x-100"
                    }`}
                >
                  {category.label}
                </button>
              ))}
            </nav>

            {/* =================================================
                LOADING SKELETON
            ================================================= */}

            {loading && (
              <div className="grid grid-cols-1 gap-x-7 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} className="animate-pulse">
                    <div className="aspect-[4/5] w-full bg-[#DED8CD]" />
                    <div className="mt-5 h-6 w-2/3 bg-[#DED8CD]" />
                    <div className="mt-3 h-3 w-1/3 bg-[#DED8CD]" />
                  </div>
                ))}
              </div>
            )}

            {/* =================================================
                EMPTY STATE
            ================================================= */}

            {!loading && filteredProjects.length === 0 && (
              <div className="flex min-h-[320px] flex-col items-center justify-center text-center">
                <p className="mb-3 font-inter text-[9px] font-semibold uppercase tracking-[.22em] text-[#B89462]">
                  PROJECTS
                </p>

                <h3 className="font-clash text-[clamp(2.3rem,4vw,3.4rem)] font-medium tracking-[-.035em] text-[#24211D]">
                  No projects found.
                </h3>
              </div>
            )}

            {/* =================================================
                PROJECT GRID
                Hover = dark panel slides up from the bottom.
                Click = opens project details.
            ================================================= */}

            {!loading && filteredProjects.length > 0 && (
              <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
                {filteredProjects.slice(0, visibleCount).map((item, index) => {
                  const projectImage = item.image
                    ? resolveFileUrl(item.image?.url || item.image)
                    : noImagePlaceholder;
                  const projectLocation = item.location || item.address || "";

                  return (
                    <article
                      key={item._id || item.id || item.title}
                      role="button"
                      tabIndex={0}
                      aria-label={`View project ${item.title || ""}`}
                      onClick={() => openProject(index)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          openProject(index);
                        }
                      }}
                      className="group relative block aspect-[4/5] cursor-pointer overflow-hidden bg-[#DED8CD] outline-none focus-visible:ring-2 focus-visible:ring-[#C9AD82] focus-visible:ring-offset-4 focus-visible:ring-offset-[#F3F0E9]"
                    >
                      {/* IMAGE */}
                      <img
                        src={projectImage}
                        alt={item.title || "CADMAX Project"}
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.src = noImagePlaceholder;
                        }}
                        className="h-full w-full object-cover"
                      />

                      {/* SLIDING PROJECT DETAILS PANEL */}
                      <div
                        className="pointer-events-none absolute inset-0 z-20 flex translate-y-full flex-col justify-end bg-[#0f0d0a]/75 p-6 text-white
                       transition-transform duration-[600ms] ease-[cubic-bezier(0.65,0,0.35,1)]
                       group-hover:translate-y-0 group-focus-visible:translate-y-0
                       [@media(hover:none)]:translate-y-0
                       [@media(hover:none)]:bg-gradient-to-t [@media(hover:none)]:from-black/90
                       [@media(hover:none)]:via-black/45 [@media(hover:none)]:to-transparent
                       motion-reduce:translate-y-0 motion-reduce:transition-none md:p-7"
                      >
                        <h3 className="line-clamp-2 font-clash text-[clamp(1.5rem,2vw,1.9rem)] font-semibold leading-[1.05] tracking-[-.02em]">
                          {item.title || "Untitled Project"}
                        </h3>
                        {projectLocation && (
                          <p className="mt-3 flex items-start gap-2 font-inter text-[12px] leading-5 text-white/85">
                            <svg
                              aria-hidden="true"
                              viewBox="0 0 24 24"
                              className="mt-[3px] h-3.5 w-3.5 shrink-0 fill-none stroke-[#C9AD82]"
                              strokeWidth="1.8"
                            >
                              <path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21Z" />
                              <circle cx="12" cy="9.5" r="2.5" />
                            </svg>
                            {projectLocation}
                          </p>
                        )}
                        <span className="mt-5 inline-flex w-fit items-center gap-2 border-b border-white/80 pb-1 font-inter text-[11px] font-semibold uppercase tracking-[.14em]">
                          View Project
                          <span className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                            ↗
                          </span>
                        </span>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}

            {/* =================================================
                LOAD MORE
            ================================================= */}

            {!loading && visibleCount < filteredProjects.length && (
              <div className="mt-[clamp(4rem,6vw,6rem)] flex justify-center">
                <button
                  onClick={() => setVisibleCount((prev) => prev + 9)}
                  className="group inline-flex min-h-[52px] min-w-[235px] items-center justify-between gap-6 border border-[#24211D] bg-transparent pl-6 pr-2 font-inter text-[9px] font-semibold uppercase tracking-[.18em] text-[#24211D] transition-all duration-300 hover:bg-[#24211D] hover:text-[#F3F0E9]"
                >
                  Load More Projects
                  <span className="grid h-10 w-10 place-items-center border-l border-current/20 transition-transform duration-300 group-hover:translate-y-1">
                    ↓
                  </span>
                </button>
              </div>
            )}
          </div>
        </section>

        {/* =====================================================
            PROJECT DETAILS MODAL
        ====================================================== */}

        {selectedProject &&
          (() => {
            const p = selectedProject;

            // main image + optional extra images (images / gallery arrays)
            const rawImages = [
              p.image,
              ...(Array.isArray(p.images) ? p.images : []),
              ...(Array.isArray(p.gallery) ? p.gallery : []),
            ].filter(Boolean);

            const images = rawImages.length
              ? rawImages.map((img) => resolveFileUrl(img?.url || img))
              : [noImagePlaceholder];

            const cat = formatCategory(getProjectCategory(p));
            const sec = p.sector ? formatCategory(String(p.sector)) : "";
            const location = p.location || p.address || "";

            const facts = [
              ["Location", location],
              ["Area", p.area],
              ["Year", p.year],
              ["Client", p.client],
              ["Status", p.status],
            ].filter(([, value]) => value);

            return (
              <div
                role="dialog"
                aria-modal="true"
                aria-label={p.title || "Project details"}
                onClick={closeProject}
                className="fixed inset-0 z-[99999] flex items-center justify-center bg-[#0c0a08]/90 p-0 backdrop-blur-md sm:p-6"
              >
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="relative grid max-h-[100dvh] w-full max-w-[1180px] grid-cols-1 overflow-y-auto bg-[#F3F0E9] sm:max-h-[92vh] lg:grid-cols-[1.25fr_.75fr]"
                >
                  {/* IMAGE SIDE */}
                  <div className="relative bg-[#DED8CD]">
                    <div className="relative aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-[620px]">
                      <img
                        key={images[activeImage]}
                        src={images[activeImage]}
                        alt={p.title || "CADMAX Project"}
                        onError={(e) => {
                          e.currentTarget.src = noImagePlaceholder;
                        }}
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                      {/* counter */}
                      <span className="absolute left-5 top-5 font-inter text-[9px] font-semibold tracking-[.18em] text-white/85">
                        {String(selectedIndex + 1).padStart(2, "0")} /{" "}
                        {String(shownCount).padStart(2, "0")}
                      </span>

                      {/* thumbnails */}
                      {images.length > 1 && (
                        <div className="absolute bottom-4 left-4 right-4 flex gap-2 overflow-x-auto">
                          {images.map((src, i) => (
                            <button
                              key={src + i}
                              type="button"
                              onClick={() => setActiveImage(i)}
                              aria-label={`Show image ${i + 1}`}
                              className={`h-14 w-20 shrink-0 overflow-hidden border-2 transition-all ${i === activeImage
                                  ? "border-[#C9AD82]"
                                  : "border-white/40 opacity-70 hover:opacity-100"
                                }`}
                            >
                              <img
                                src={src}
                                alt=""
                                className="h-full w-full object-cover"
                              />
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* DETAILS SIDE */}
                  <div className="flex flex-col px-6 py-8 sm:px-9 lg:px-10 lg:py-12">
                    {/* close */}
                    <button
                      type="button"
                      onClick={closeProject}
                      aria-label="Close project details"
                      className="absolute right-4 top-4 z-10 grid h-11 w-11 place-items-center border border-white/60 bg-black/30 text-[26px] leading-none text-white transition-colors hover:border-[#C9AD82] hover:bg-[#C9AD82] hover:text-[#151515] lg:border-[#151515]/30 lg:bg-transparent lg:text-[#151515]"
                    >
                      ×
                    </button>

                    <p className="mb-4 flex items-center gap-3 font-inter text-[9px] font-semibold uppercase tracking-[.22em] text-[#B89462]">
                      <span className="h-px w-9 bg-current" />
                      {cat}
                      {sec && sec.toLowerCase() !== cat.toLowerCase() && (
                        <>
                          <span className="text-[#151515]/30">|</span>
                          {sec}
                        </>
                      )}
                    </p>

                    <h2 className="m-0 pr-10 font-clash text-[clamp(2.2rem,3.4vw,3.2rem)] font-medium leading-[.95] tracking-[-.04em] text-[#24211D]">
                      {p.title || "Untitled Project"}
                    </h2>

                    <span className="mt-5 block h-[2px] w-16 bg-gradient-to-r from-[#E5B94F] to-[#C9AD82]" />

                    {/* quick facts */}
                    {facts.length > 0 && (
                      <dl className="mt-7 border-t border-[#151515]/10">
                        {facts.map(([label, value]) => (
                          <div
                            key={label}
                            className="flex items-start justify-between gap-6 border-b border-[#151515]/10 py-4"
                          >
                            <dt className="font-inter text-[9px] font-semibold uppercase tracking-[.16em] text-[#837b70]">
                              {label}
                            </dt>
                            <dd className="m-0 text-right font-inter text-[13px] font-medium text-[#24211D]">
                              {value}
                            </dd>
                          </div>
                        ))}
                      </dl>
                    )}

                    {/* description */}
                    {(p.description || p.summary || p.details) && (
                      <div className="mt-7">
                        <p className="mb-3 font-inter text-[9px] font-semibold uppercase tracking-[.18em] text-[#B89462]">
                          Project Overview
                        </p>
                        <p className="m-0 font-inter text-[13.5px] leading-[1.8] text-[#625E57]">
                          {p.description || p.summary || p.details}
                        </p>
                      </div>
                    )}

                    {/* download (only if the API sends a file) */}
                    {p.file && (
                      <a
                        href={resolveFileUrl(p.file)}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-8 inline-flex min-h-[48px] w-full items-center justify-between border border-[#24211D] px-5 font-inter text-[10px] font-semibold uppercase tracking-[.16em] text-[#24211D] transition-colors hover:bg-[#24211D] hover:text-[#F3F0E9]"
                      >
                        Download project file <span>↓</span>
                      </a>
                    )}

                    {/* prev / next */}
                    <div className="mt-auto flex items-center justify-between gap-4 pt-10">
                      <button
                        type="button"
                        onClick={goPrev}
                        disabled={selectedIndex === 0}
                        className="font-inter text-[10px] font-semibold uppercase tracking-[.16em] text-[#24211D] transition-colors hover:text-[#B89462] disabled:opacity-30 disabled:hover:text-[#24211D]"
                      >
                        ← Previous
                      </button>
                      <button
                        type="button"
                        onClick={goNext}
                        disabled={selectedIndex >= shownCount - 1}
                        className="font-inter text-[10px] font-semibold uppercase tracking-[.16em] text-[#24211D] transition-colors hover:text-[#B89462] disabled:opacity-30 disabled:hover:text-[#24211D]"
                      >
                        Next →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}
      </main>

      <Footer />
    </>
  );
};

export default Project;
