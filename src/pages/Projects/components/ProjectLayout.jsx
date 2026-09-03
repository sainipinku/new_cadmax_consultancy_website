import React, { useEffect, useState } from "react";
import Navbar from "../../../components/Layout/Header/Navbar";
import Footer from "../../../components/Layout/Footer/Footer";
import API, { resolveFileUrl } from "../../../api/axios";

const noImagePlaceholder =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'%3E%3Crect width='800' height='600' fill='%23e9e4da'/%3E%3Ctext x='400' y='300' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='26' fill='%238b8276'%3ENo Project Image%3C/text%3E%3C/svg%3E";

const ProjectLayout = ({
  heroImage,
  title,
  subtitle,
  description,
  sector,
  subCategory = null,
  showProjectList = true,
  noProjectContent = null,
}) => {
  const [cardProjects, setCardProjects] = useState([]);
  const [listProjects, setListProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);

        // Project Cards
        let cardUrl = `/projects?sector=${sector}&type=cards`;

        if (subCategory) {
          cardUrl += `&subCategory=${subCategory}`;
        }

        const cardRes = await API.get(cardUrl);

        const cards =
          cardRes.data?.data ||
          cardRes.data ||
          [];

        setCardProjects(
          Array.isArray(cards) ? cards : []
        );

        // Project List
        let listUrl = `/projects?sector=${sector}&type=list`;

        if (subCategory) {
          listUrl += `&subCategory=${subCategory}`;
        }

        const listRes = await API.get(listUrl);

        const list =
          listRes.data?.data ||
          listRes.data ||
          [];

        setListProjects(
          Array.isArray(list) ? list : []
        );
      } catch (error) {
        console.error(
          "Project fetch error:",
          error
        );

        setCardProjects([]);
        setListProjects([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [sector, subCategory]);

  const handleDownload = async (
    url,
    filename
  ) => {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(
          "Network response was not ok"
        );
      }

      const blob =
        await response.blob();

      const blobUrl =
        window.URL.createObjectURL(blob);

      const link =
        document.createElement("a");

      link.href = blobUrl;

      link.download =
        filename ||
        url.split("/").pop() ||
        "download";

      document.body.appendChild(link);

      link.click();

      document.body.removeChild(link);

      window.URL.revokeObjectURL(
        blobUrl
      );
    } catch (error) {
      console.error(
        "Download failed:",
        error
      );

      window.open(url, "_blank");
    }
  };

  const scrollToProjects = () => {
    document
      .getElementById(
        "cadmax-projects"
      )
      ?.scrollIntoView({
        behavior: "smooth",
      });
  };

  return (
    <>
      <Navbar />

      {/* =====================================================
          HERO
      ====================================================== */}

      <section
        className="
          relative
          min-h-[660px]
          lg:min-h-[760px]
          flex
          items-center
          overflow-hidden
          bg-cover
          bg-center
          bg-no-repeat
        "
        style={{
          backgroundImage: `url(${heroImage})`,
        }}
      >
        {/* Overlay */}

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-r
            from-[#120f0c]/95
            via-[#18130f]/75
            to-[#0c0a08]/20
          "
        />

        {/* Architectural Grid */}

        <div
          className="
            absolute
            inset-0
            opacity-[0.08]
            pointer-events-none
            [background-image:linear-gradient(rgba(255,255,255,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.15)_1px,transparent_1px)]
            [background-size:75px_75px]
          "
        />

        {/* Hero Content */}

        <div
          className="
            relative
            z-10
            w-full
            max-w-[1240px]
            mx-auto
            px-5
            md:px-10
            pt-[130px]
            pb-[160px]
          "
        >
          {/* Eyebrow */}

          <div
            className="
              flex
              items-center
              gap-4
              mb-8
              text-[#cdb083]
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.24em]
            "
          >
            <span
              className="
                block
                w-9
                h-px
                bg-[#cdb083]
              "
            />

            {sector || "PROJECTS"}
          </div>

          {/* Heading */}

          <h1
            className="
              max-w-[850px]
              m-0
              text-white
              font-clash
              font-normal
              text-[clamp(3.9rem,5.8vw,6.3rem)]
              max-xl:text-[clamp(3.7rem,5.5vw,5.7rem)]
              max-md:text-[clamp(3.8rem,12vw,5.8rem)]
              max-sm:text-[clamp(3.2rem,15vw,4.6rem)]
              leading-[0.84]
              max-sm:leading-[0.88]
              tracking-[-0.055em]
            "
          >
            {title}
          </h1>

          {subtitle && (
            <p
              className="
                max-w-[540px]
                mt-8
                mb-9
                font-inter
                text-[clamp(.82rem,1vw,.95rem)]
                max-sm:text-[.8rem]
                leading-[1.8]
                text-white/75
              "
            >
              {subtitle}
            </p>
          )}

          {/* Button */}

          <button
            onClick={
              scrollToProjects
            }
            className="
              group
              h-[54px]
              min-w-[230px]
              inline-flex
              items-center
              justify-between
              bg-[#cdb083]
              text-[#181510]
              text-[9px]
              font-bold
              tracking-[0.18em]
              transition-all
              duration-300
            "
          >
            <span className="px-6">
              EXPLORE PROJECTS
            </span>

            <span
              className="
                h-[54px]
                w-[54px]
                flex
                items-center
                justify-center
                border-l
                border-black/20
                text-lg
                group-hover:bg-[#181510]
                group-hover:text-white
                transition-all
                duration-300
              "
            >
              ↓
            </span>
          </button>
        </div>

        {/* Top Right */}

        <div
          className="
            hidden
            lg:flex
            absolute
            top-[170px]
            right-16
            z-10
            items-center
            gap-4
            text-[8px]
            tracking-[0.18em]
            text-white/60
          "
        >
          <span
            className="
              w-9
              h-px
              bg-[#cdb083]
            "
          />

          CADMAX / JAIPUR
        </div>

        {/* Hero Bottom Strip */}

        <div
          className="
            absolute
            bottom-0
            left-0
            right-0
            z-20
            min-h-[90px]
            grid
            grid-cols-3
            lg:grid-cols-[1.5fr_repeat(3,1fr)]
            bg-[#f6f3ed]/95
            backdrop-blur-md
          "
        >
          <div
            className="
              hidden
              lg:flex
              px-10
              flex-col
              items-start
              justify-center
              gap-1
            "
          >
            <span
              className="
                text-[10px]
                tracking-[0.18em]
                text-[#837b70]
              "
            >
              ARCHITECTURE · ENGINEERING
            </span>

            <strong
              className="
                text-[10px]
                tracking-[0.18em]
                text-[#cdb083]
              "
            >
              {sector ||
                "PROJECT DELIVERY"}
            </strong>
          </div>

          {[
            [
              "01",
              "ARCHITECTURE",
            ],
            [
              "02",
              "ENGINEERING",
            ],
            [
              "03",
              "PROJECT DELIVERY",
            ],
          ].map(
            (
              item,
              index
            ) => (
              <div
                key={index}
                className="
                  flex
                  flex-col
                  lg:flex-row
                  items-center
                  justify-center
                  lg:justify-start
                  gap-1
                  lg:gap-5
                  px-3
                  lg:px-7
                  border-l
                  border-black/10
                "
              >
                <span
                  className="
                    text-[18px]
                    lg:text-[22px]
                    italic
                    text-[#cdb083]
                  "
                >
                  {item[0]}
                </span>

                <span
                  className="
                    text-center
                    lg:text-left
                    text-[9px]
                    md:text-[10px]
                    tracking-[0.15em]
                    text-[#766f66]
                  "
                >
                  {item[1]}
                </span>
              </div>
            )
          )}
        </div>
      </section>

      {/* =====================================================
          OVERVIEW
      ====================================================== */}

      <section
        className="
          relative
          py-20
          lg:py-28
          bg-[#f2efe7]
          overflow-hidden
        "
      >
        {/* Grid */}

        <div
          className="
            absolute
            inset-0
            opacity-[0.2]
            pointer-events-none
            [background-image:linear-gradient(rgba(35,30,24,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(35,30,24,0.12)_1px,transparent_1px)]
            [background-size:145px_145px]
          "
        />

        <div
          className="
            relative
            z-10
            max-w-[1240px]
            mx-auto
            px-5
            md:px-10
          "
        >
          <div
            className="
              grid
              grid-cols-1
              lg:grid-cols-[1.45fr_.75fr]
              gap-10
              lg:gap-24
              items-end
            "
          >
            <div>
              <div
                className="
                  flex
                  items-center
                  gap-4
                  text-[#cdb083]
                  text-[9px]
                  font-semibold
                  tracking-[0.22em]
                  uppercase
                "
              >
                <span
                  className="
                    w-9
                    h-px
                    bg-[#cdb083]
                  "
                />

                PROJECT OVERVIEW
              </div>

              <h2
                className="
                  mt-6
                  font-clash
                  font-normal
                  text-[#181510]
                  text-[clamp(3.4rem,5vw,5.6rem)]
                  max-sm:text-[clamp(3.1rem,15vw,4.6rem)]
                  leading-[0.86]
                  tracking-[-0.055em]
                "
              >
                {title}

                <br />

                <span
                  className="
                    italic
                    text-[#cdb083]
                  "
                >
                  shaped with purpose.
                </span>
              </h2>
            </div>

            <div>
              {subtitle && (
                <h3
                  className="
                    mb-5
                    font-clash
                    text-[17px]
                    font-medium
                    leading-[1.5]
                    text-[#181510]
                  "
                >
                  {subtitle}
                </h3>
              )}

              {description && (
                <p
                  className="
                    font-inter
                    text-[clamp(.84rem,1vw,.95rem)]
                    leading-[1.8]
                    text-[#7c7469]
                  "
                >
                  {description}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          PROJECTS
      ====================================================== */}

      {showProjectList && (
        <section
          id="cadmax-projects"
          className="
            bg-[#f2efe7]
            py-20
            lg:py-28
          "
        >
          <div
            className="
              max-w-[1240px]
              mx-auto
              px-5
              md:px-10
            "
          >
            {/* Loading */}

            {loading ? (
              <div
                className="
                  min-h-[300px]
                  flex
                  flex-col
                  items-center
                  justify-center
                  gap-4
                "
              >
                <div
                  className="
                    w-11
                    h-11
                    rounded-full
                    border-2
                    border-[#cdb083]/30
                    border-t-[#cdb083]
                    animate-spin
                  "
                />

                <p
                  className="
                    font-inter
                    text-sm
                    text-[#7c7469]
                  "
                >
                  Loading projects...
                </p>
              </div>
            ) : (
              <>
                {/* ==========================================
                    PROJECT CARDS
                =========================================== */}

                {cardProjects.length >
                  0 && (
                    <div className="mb-28">

                      {/* Header */}

                      <div
                        className="
                        grid
                        grid-cols-1
                        lg:grid-cols-[1.5fr_.7fr]
                        gap-8
                        lg:gap-20
                        items-end
                        mb-14
                        lg:mb-16
                      "
                      >
                        <div>
                          <div
                            className="
                            flex
                            items-center
                            gap-4
                            text-[#cdb083]
                            text-[9px]
                            font-semibold
                            tracking-[0.22em]
                          "
                          >
                            <span
                              className="
                              w-9
                              h-px
                              bg-[#cdb083]
                            "
                            />

                            SELECTED WORK
                          </div>

                          <h2
                            className="
                            mt-5
                            font-clash
                            font-normal
                            text-[#181510]
                            text-[clamp(3.4rem,5vw,5.6rem)]
                            max-sm:text-[clamp(3.1rem,15vw,4.6rem)]
                            leading-[0.86]
                            tracking-[-0.05em]
                          "
                          >
                            Projects that
                            <br />

                            <span
                              className="
                              italic
                              text-[#cdb083]
                            "
                            >
                              shape places.
                            </span>
                          </h2>
                        </div>

                        <p
                          className="
                          font-inter
                          text-[clamp(.84rem,1vw,.95rem)]
                          leading-[1.8]
                          text-[#7c7469]
                        "
                        >
                          Selected architectural
                          and engineering work
                          representing CADMAX&apos;s
                          approach to precision,
                          function and project
                          delivery.
                        </p>
                      </div>

                      {/* Grid */}

                      <div
                        className="
                        grid
                        grid-cols-1
                        md:grid-cols-2
                        lg:grid-cols-3
                        gap-x-7
                        gap-y-14
                      "
                      >
                        {cardProjects.map(
                          (
                            project,
                            index
                          ) => {
                            const imageUrl =
                              project.image
                                ? resolveFileUrl(
                                  project
                                    .image
                                    ?.url ||
                                  project.image
                                )
                                : noImagePlaceholder;

                            return (
                              <article
                                key={
                                  project._id ||
                                  project.id ||
                                  index
                                }
                                onClick={() =>
                                  setSelectedProject(
                                    project
                                  )
                                }
                                className="
                                group
                                cursor-pointer
                              "
                              >
                                {/* Image */}

                                <div
                                  className="
                                  relative
                                  aspect-[4/5]
                                  overflow-hidden
                                  bg-[#ded8cd]
                                "
                                >
                                  <img
                                    src={
                                      imageUrl
                                    }
                                    alt={
                                      project.title ||
                                      "CADMAX Project"
                                    }
                                    className="
                                    w-full
                                    h-full
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

                                  {/* Image Overlay */}

                                  <div
                                    className="
                                    absolute
                                    inset-0
                                    bg-gradient-to-t
                                    from-black/50
                                    via-transparent
                                    to-transparent
                                  "
                                  />

                                  {/* Number */}

                                  <span
                                    className="
                                    absolute
                                    top-5
                                    left-5
                                    text-white/85
                                    text-[9px]
                                    tracking-[0.18em]
                                  "
                                  >
                                    {String(
                                      index + 1
                                    ).padStart(
                                      2,
                                      "0"
                                    )}
                                  </span>

                                  {/* Arrow */}

                                  <span
                                    className="
                                    absolute
                                    right-5
                                    bottom-5
                                    w-12
                                    h-12
                                    flex
                                    items-center
                                    justify-center
                                    border
                                    border-white/70
                                    text-white
                                    text-lg
                                    transition-all
                                    duration-300
                                    group-hover:bg-[#cdb083]
                                    group-hover:text-[#181510]
                                    group-hover:border-[#cdb083]
                                  "
                                  >
                                    ↗
                                  </span>
                                </div>

                                {/* Info */}

                                <div className="pt-5">
                                  <div
                                    className="
                                    flex
                                    items-start
                                    justify-between
                                    gap-5
                                  "
                                  >
                                    <h3
                                      className="
                                      font-clash
                                      text-[clamp(1.35rem,1.7vw,1.65rem)]
                                      font-medium
                                      leading-[1.05]
                                      text-[#181510]
                                      tracking-[-0.02em]
                                    "
                                    >
                                      {
                                        project.title
                                      }
                                    </h3>

                                    <span
                                      className="
                                      mt-1
                                      text-[#97836a]
                                      text-[8px]
                                      tracking-[0.16em]
                                    "
                                    >
                                      PROJECT
                                    </span>
                                  </div>

                                  <div
                                    className="
                                    h-px
                                    bg-black/10
                                    my-4
                                  "
                                  />

                                  <div
                                    className="
                                    flex
                                    items-center
                                    justify-between
                                    gap-5
                                    text-[9px]
                                    uppercase
                                    tracking-[0.15em]
                                    text-[#837b70]
                                  "
                                  >
                                    <span>
                                      {project.location ||
                                        "Jaipur, India"}
                                    </span>

                                    <span>
                                      {sector ||
                                        "CADMAX"}
                                    </span>
                                  </div>
                                </div>
                              </article>
                            );
                          }
                        )}
                      </div>
                    </div>
                  )}

                {/* ==========================================
                    PROJECT LIST
                =========================================== */}

                {listProjects.length >
                  0 && (
                    <div>

                      {/* Heading */}

                      <div className="mb-12">
                        <div
                          className="
                          flex
                          items-center
                          gap-4
                          text-[#cdb083]
                          text-[9px]
                          font-semibold
                          tracking-[0.22em]
                        "
                        >
                          <span
                            className="
                            w-9
                            h-px
                            bg-[#cdb083]
                          "
                          />

                          PROJECT DIRECTORY
                        </div>

                        <h2
                          className="
                          mt-5
                          font-clash
                          font-normal
                          text-[#181510]
                          text-[clamp(3.4rem,5vw,5.6rem)]
                          max-sm:text-[clamp(3.1rem,15vw,4.6rem)]
                          leading-[0.86]
                          tracking-[-0.05em]
                        "
                        >
                          Project{" "}

                          <span
                            className="
                            italic
                            text-[#cdb083]
                          "
                          >
                            List.
                          </span>
                        </h2>
                      </div>

                      {/* Table */}

                      <div
                        className="
                        overflow-x-auto
                        border-t
                        border-[#181510]
                      "
                      >
                        <table
                          className="
                          w-full
                          min-w-[850px]
                          border-collapse
                        "
                        >
                          <thead>
                            <tr>
                              {[
                                "NO.",
                                "PROJECT NAME",
                                "LOCATION",
                                "AREA",
                                "DOCUMENT",
                              ].map(
                                (
                                  heading
                                ) => (
                                  <th
                                    key={
                                      heading
                                    }
                                    className="
                                    text-left
                                    py-5
                                    px-4
                                    border-b
                                    border-black/10
                                    text-[#837b70]
                                    text-[9px]
                                    font-semibold
                                    tracking-[0.17em]
                                  "
                                  >
                                    {
                                      heading
                                    }
                                  </th>
                                )
                              )}
                            </tr>
                          </thead>

                          <tbody>
                            {listProjects.map(
                              (
                                project,
                                index
                              ) => (
                                <tr
                                  key={
                                    project._id ||
                                    project.id ||
                                    index
                                  }
                                  className="
                                  border-b
                                  border-black/10
                                  hover:bg-[#cdb083]/[0.08]
                                  transition-colors
                                  duration-300
                                "
                                >
                                  <td
                                    className="
                                    py-5
                                    px-4
                                    text-[17px]
                                    italic
                                    text-[#cdb083]
                                  "
                                  >
                                    {String(
                                      index + 1
                                    ).padStart(
                                      2,
                                      "0"
                                    )}
                                  </td>

                                  <td className="py-5 px-4">
                                    <button
                                      onClick={() =>
                                        setSelectedProject(
                                          project
                                        )
                                      }
                                      className="
                                      font-clash
                                      text-[16px]
                                      font-medium
                                      text-[#181510]
                                      hover:text-[#cdb083]
                                      transition-colors
                                    "
                                    >
                                      {
                                        project.title
                                      }
                                    </button>
                                  </td>

                                  <td
                                    className="
                                    py-5
                                    px-4
                                    font-inter
                                    text-[13px]
                                    md:text-[14px]
                                    text-[#6f675e]
                                  "
                                  >
                                    {project.location ||
                                      "—"}
                                  </td>

                                  <td
                                    className="
                                    py-5
                                    px-4
                                    font-inter
                                    text-[13px]
                                    md:text-[14px]
                                    text-[#6f675e]
                                  "
                                  >
                                    {project.area ||
                                      "—"}
                                  </td>

                                  <td className="py-5 px-4">
                                    {project.file ||
                                      project.image ? (
                                      <button
                                        onClick={(
                                          e
                                        ) => {
                                          e.stopPropagation();

                                          const file =
                                            project.file ||
                                            project
                                              .image
                                              ?.url ||
                                            project.image;

                                          handleDownload(
                                            resolveFileUrl(
                                              file
                                            ),
                                            project.fileName ||
                                            project.title ||
                                            "project"
                                          );
                                        }}
                                        className="
                                        group
                                        min-w-[140px]
                                        h-[42px]
                                        inline-flex
                                        items-center
                                        justify-between
                                        gap-5
                                        px-4
                                        border
                                        border-[#181510]
                                        text-[#181510]
                                        text-[9px]
                                        font-bold
                                        tracking-[0.15em]
                                        hover:bg-[#181510]
                                        hover:text-white
                                        transition-all
                                        duration-300
                                      "
                                      >
                                        DOWNLOAD

                                        <span>
                                          ↓
                                        </span>
                                      </button>
                                    ) : (
                                      <span
                                        className="
                                        text-[#837b70]
                                      "
                                      >
                                        —
                                      </span>
                                    )}
                                  </td>
                                </tr>
                              )
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                {/* ==========================================
                    EMPTY
                =========================================== */}

                {cardProjects.length ===
                  0 &&
                  listProjects.length ===
                  0 && (
                    <div
                      className="
                      min-h-[300px]
                      flex
                      flex-col
                      justify-center
                      items-center
                      text-center
                    "
                    >
                      {noProjectContent || (
                        <>
                          <span
                            className="
                            text-[#cdb083]
                            text-[9px]
                            tracking-[0.18em]
                          "
                          >
                            PROJECTS
                          </span>

                          <h3
                            className="
                            mt-4
                            font-clash
                            text-[clamp(2.3rem,4vw,3.4rem)]
                            font-normal
                            text-[#181510]
                          "
                          >
                            No projects found.
                          </h3>
                        </>
                      )}
                    </div>
                  )}
              </>
            )}
          </div>
        </section>
      )}

      {/* =====================================================
          PROJECT DETAIL MODAL
      ====================================================== */}

      {selectedProject && (
        <div
          onClick={() =>
            setSelectedProject(null)
          }
          className="
            fixed
            inset-0
            z-[99999]
            flex
            items-center
            justify-center
            p-4
            md:p-8
            bg-[#0c0a08]/90
            backdrop-blur-md
          "
        >
          <div
            onClick={(e) =>
              e.stopPropagation()
            }
            className="
              w-full
              max-w-[1080px]
              max-h-[90vh]
              overflow-y-auto
              grid
              grid-cols-1
              lg:grid-cols-[1.2fr_.8fr]
              bg-[#f2efe7]
            "
          >
            {/* Modal Image */}

            <div
              className="
                relative
                min-h-[380px]
                lg:min-h-[600px]
                overflow-hidden
              "
            >
              <img
                src={
                  selectedProject.image
                    ? resolveFileUrl(
                      selectedProject
                        .image?.url ||
                      selectedProject.image
                    )
                    : noImagePlaceholder
                }
                alt={
                  selectedProject.title
                }
                className="
                  absolute
                  inset-0
                  w-full
                  h-full
                  object-cover
                "
                onError={(e) => {
                  e.currentTarget.src =
                    noImagePlaceholder;
                }}
              />

              <div
                className="
                  absolute
                  inset-0
                  bg-gradient-to-t
                  from-black/80
                  via-transparent
                  to-transparent
                "
              />

              {/* Close */}

              <button
                onClick={() =>
                  setSelectedProject(
                    null
                  )
                }
                className="
                  absolute
                  top-5
                  right-5
                  w-11
                  h-11
                  flex
                  items-center
                  justify-center
                  border
                  border-white/60
                  bg-black/20
                  text-white
                  text-[28px]
                  hover:bg-[#cdb083]
                  hover:text-[#181510]
                  hover:border-[#cdb083]
                  transition-all
                  duration-300
                "
              >
                ×
              </button>

              {/* Image Heading */}

              <div
                className="
                  absolute
                  z-10
                  left-6
                  md:left-9
                  bottom-7
                  md:bottom-9
                "
              >
                <span
                  className="
                    text-[#cdb083]
                    text-[9px]
                    tracking-[0.18em]
                  "
                >
                  CADMAX PROJECT
                </span>

                <h2
                  className="
                    max-w-[520px]
                    mt-3
                    font-clash
                    text-white
                    text-[clamp(2.8rem,4vw,4.4rem)]
                    leading-[0.9]
                    font-normal
                    tracking-[-0.04em]
                  "
                >
                  {
                    selectedProject.title
                  }
                </h2>
              </div>
            </div>

            {/* Modal Detail */}

            <div
              className="
                px-6
                md:px-10
                lg:px-11
                py-10
                lg:py-14
              "
            >
              <div
                className="
                  flex
                  items-center
                  gap-4
                  text-[#cdb083]
                  text-[9px]
                  tracking-[0.18em]
                "
              >
                <span
                  className="
                    w-9
                    h-px
                    bg-[#cdb083]
                  "
                />

                PROJECT INFORMATION
              </div>

              <div
                className="
                  mt-8
                  border-t
                  border-black/10
                "
              >
                {selectedProject.location && (
                  <div
                    className="
                      flex
                      items-start
                      justify-between
                      gap-6
                      py-5
                      border-b
                      border-black/10
                    "
                  >
                    <span
                      className="
                        text-[#8c8479]
                        text-[9px]
                        tracking-[0.16em]
                      "
                    >
                      LOCATION
                    </span>

                    <strong
                      className="
                        font-inter
                        text-[clamp(.82rem,1vw,.95rem)]
                        font-medium
                        text-[#181510]
                        text-right
                      "
                    >
                      {
                        selectedProject.location
                      }
                    </strong>
                  </div>
                )}

                {selectedProject.area && (
                  <div
                    className="
                      flex
                      items-start
                      justify-between
                      gap-6
                      py-5
                      border-b
                      border-black/10
                    "
                  >
                    <span
                      className="
                        text-[#8c8479]
                        text-[9px]
                        tracking-[0.16em]
                      "
                    >
                      AREA
                    </span>

                    <strong
                      className="
                        font-inter
                        text-[clamp(.82rem,1vw,.95rem)]
                        font-medium
                        text-[#181510]
                        text-right
                      "
                    >
                      {
                        selectedProject.area
                      }
                    </strong>
                  </div>
                )}

                {sector && (
                  <div
                    className="
                      flex
                      items-start
                      justify-between
                      gap-6
                      py-5
                      border-b
                      border-black/10
                    "
                  >
                    <span
                      className="
                        text-[#8c8479]
                        text-[9px]
                        tracking-[0.16em]
                      "
                    >
                      SECTOR
                    </span>

                    <strong
                      className="
                        font-inter
                        text-[clamp(.82rem,1vw,.95rem)]
                        font-medium
                        text-[#181510]
                        text-right
                      "
                    >
                      {sector}
                    </strong>
                  </div>
                )}
              </div>

              {selectedProject.description && (
                <div className="mt-10">
                  <span
                    className="
                      text-[#cdb083]
                      text-[9px]
                      tracking-[0.17em]
                    "
                  >
                    PROJECT OVERVIEW
                  </span>

                  <p
                    className="
                      mt-4
                      font-inter
                      text-[clamp(.84rem,1vw,.95rem)]
                      leading-[1.8]
                      text-[#7c7469]
                    "
                  >
                    {
                      selectedProject.description
                    }
                  </p>
                </div>
              )}

              {(selectedProject.file ||
                selectedProject.image) && (
                  <button
                    onClick={() => {
                      const file =
                        selectedProject.file ||
                        selectedProject
                          .image?.url ||
                        selectedProject.image;

                      handleDownload(
                        resolveFileUrl(
                          file
                        ),
                        selectedProject.fileName ||
                        selectedProject.title ||
                        "project"
                      );
                    }}
                    className="
                    w-full
                    h-[52px]
                    mt-9
                    px-5
                    flex
                    items-center
                    justify-between
                    border
                    border-[#181510]
                    text-[#181510]
                    text-[9px]
                    font-bold
                    tracking-[0.15em]
                    hover:bg-[#181510]
                    hover:text-white
                    transition-all
                    duration-300
                  "
                  >
                    <span>
                      DOWNLOAD PROJECT FILE
                    </span>

                    <span>
                      ↓
                    </span>
                  </button>
                )}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default ProjectLayout;