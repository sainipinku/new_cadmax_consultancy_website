import React from "react";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * ProjectCard
 * Hover / focus: image zooms + darkens, then title, categories, accent line,
 * address, summary and "View project" button slide up one after another.
 * Touch devices (no hover): details are always visible.
 * Keyboard: Tab focuses the card, Enter / Space opens it.
 */
const ProjectCard = ({
    project,
    index,
    imageUrl,
    fallbackImage,
    sector,
    onOpen,
}) => {
    const reduceMotion = useReducedMotion();
    const category = project.subCategory || project.category || sector || "Project";
    const address = project.location || project.address || "";
    const summary = project.summary || project.description;

    // Staggered reveal for each text row (only runs when the card is hovered/focused)
    const reveal = (delay) =>
        `translate-y-4 opacity-0 transition-all duration-500 ease-out ${delay}
     group-hover:translate-y-0 group-hover:opacity-100
     group-focus-visible:translate-y-0 group-focus-visible:opacity-100
     [@media(hover:none)]:translate-y-0 [@media(hover:none)]:opacity-100
     motion-reduce:transition-none`;

    return (
        <motion.article
            role="button"
            tabIndex={0}
            aria-label={`View project ${project.title || ""}`}
            onClick={() => onOpen(project)}
            onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onOpen(project);
                }
            }}
            initial={reduceMotion ? false : { opacity: 0, y: 36 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.16 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: 18, transition: { duration: 0.2 } }}
            layout
            whileHover={reduceMotion ? undefined : {
                y: -8,
                boxShadow: "0 18px 42px rgba(24, 21, 16, 0.12)",
            }}
            transition={{
                duration: 0.5,
                delay: reduceMotion ? 0 : Math.min(index * 0.1, 0.45),
                ease: "easeOut",
                layout: { duration: 0.45, delay: 0 },
            }}
            className="group cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#cdb083] focus-visible:ring-offset-4 focus-visible:ring-offset-[#f2efe7]"
        >
            {/* ================= IMAGE ================= */}
            <div className="relative aspect-[4/5] overflow-hidden bg-[#ded8cd]">
                <img
                    src={imageUrl}
                    alt={project.title || "CADMAX Project"}
                    loading="lazy"
                    onError={(e) => {
                        e.currentTarget.src = fallbackImage;
                    }}
                    className="h-full w-full object-cover transition-[transform,filter] duration-500 ease-out
                     group-hover:scale-[1.06] group-hover:brightness-[0.84] group-focus-visible:scale-[1.06] group-focus-visible:brightness-[0.84]
                     [@media(hover:none)]:group-hover:scale-100 [@media(hover:none)]:group-hover:brightness-100
                     motion-reduce:transition-none"
                />

                {/* Base gradient (always on, keeps number readable) */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                {/* Dark hover overlay */}
                <div
                    className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0c0a08]/95 via-[#0c0a08]/45 to-transparent opacity-0 transition-opacity duration-500
                     group-hover:opacity-100 group-focus-visible:opacity-100
                     [@media(hover:none)]:opacity-100 [@media(hover:none)]:bg-gradient-to-t
                     [@media(hover:none)]:from-black/95 [@media(hover:none)]:via-black/45 [@media(hover:none)]:to-transparent"
                />

                {/* Number */}
                <span className="absolute left-5 top-5 text-[9px] tracking-[0.18em] text-white/85">
                    {String(index + 1).padStart(2, "0")}
                </span>

                {/* Corner bracket */}
                <span className="pointer-events-none absolute left-4 top-4 h-0 w-0 border-l border-t border-[#cdb083] opacity-0 transition-all duration-500 group-hover:h-6 group-hover:w-6 group-hover:opacity-100 group-focus-visible:h-6 group-focus-visible:w-6 group-focus-visible:opacity-100 [@media(hover:none)]:hidden" />

                <span aria-hidden="true" className="absolute bottom-5 right-5 z-10 grid h-12 w-12 place-items-center rounded-full border border-white/75 bg-black/10 text-white transition-all duration-300 group-hover:scale-105 group-hover:border-[#cdb083] group-hover:bg-[#cdb083] group-hover:text-[#151515] group-focus-visible:border-[#cdb083] group-focus-visible:bg-[#cdb083] group-focus-visible:text-[#151515] [@media(hover:none)]:border-[#cdb083] [@media(hover:none)]:bg-[#cdb083] [@media(hover:none)]:text-[#151515]">
                    <ArrowUpRight size={18} strokeWidth={1.7} />
                </span>

                {/* ============ HOVER DETAILS ============ */}
                <div className="absolute inset-x-0 top-0 flex flex-col p-6 pt-12 text-white">
                    {/* Title */}
                    <h3
                        className={`max-w-[92%] font-clash text-[1.65rem] font-medium leading-[1.05] tracking-[-0.02em] ${reveal(
                            "delay-[60ms]"
                        )}`}
                    >
                        {project.title || "CADMAX Project"}
                    </h3>

                    {/* Category */}
                    <p
                        className={`mt-2 font-inter text-[11px] uppercase tracking-[0.14em] text-[#e1c89f] ${reveal(
                            "delay-[120ms]"
                        )}`}
                    >
                        {category}
                        {project.sector && sector !== project.sector ? ` | ${project.sector}` : ""}
                    </p>

                    {/* Accent line grows from 0 → full */}
                    <span
                        className="mt-3 block h-[2px] w-0 bg-gradient-to-r from-[#cdb083] to-[#e1c89f] transition-all duration-700 delay-150 ease-out
                       group-hover:w-16 group-focus-visible:w-16 [@media(hover:none)]:w-16
                       motion-reduce:transition-none"
                    />

                    {/* Address */}
                    {address && (
                        <p
                            className={`mt-3 flex items-start gap-2 font-inter text-[12px] leading-5 text-white/85 ${reveal(
                                "delay-[200ms]"
                            )}`}
                        >
                            <svg
                                aria-hidden="true"
                                viewBox="0 0 24 24"
                                className="mt-[3px] h-3.5 w-3.5 shrink-0 fill-none stroke-[#cdb083]"
                                strokeWidth="1.8"
                            >
                                <path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21Z" />
                                <circle cx="12" cy="9.5" r="2.5" />
                            </svg>
                            <span>{address}</span>
                        </p>
                    )}

                    {/* Summary (2 lines max) */}
                    {summary && (
                        <p
                            className={`mt-2 line-clamp-2 max-w-[36ch] font-inter text-xs leading-5 text-white/70 ${reveal(
                                "delay-[260ms]"
                            )}`}
                        >
                            {summary}
                        </p>
                    )}

                    {/* View more button */}
                    <span
                        className={`group/view mt-5 inline-flex w-fit items-center gap-3 border-b border-white/60 pb-1 font-inter text-[11px] font-semibold uppercase tracking-[0.16em] transition-colors hover:border-[#cdb083] hover:text-[#cdb083] ${reveal(
                            "delay-[320ms]"
                        )}`}
                    >
                        View project
                        <ArrowUpRight size={15} className="transition-transform duration-300 group-hover/view:translate-x-1" />
                    </span>
                </div>
            </div>

            {/* ================= INFO BELOW IMAGE ================= */}
            <div className="pt-5">
                <div className="flex items-start justify-between gap-5">
                    <h3 className="min-h-[2.1em] max-w-[72%] overflow-hidden font-clash text-[clamp(1.35rem,1.7vw,1.65rem)] font-medium leading-[1.05] tracking-[-0.02em] text-[#181510] transition-colors duration-300 group-hover:text-[#a17d48] [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2]">
                        {project.title}
                    </h3>
                    <span className="mt-1 text-[8px] tracking-[0.16em] text-[#97836a]">
                        {category.toUpperCase()}
                    </span>
                </div>

                <div className="relative my-4 h-px bg-black/10">
                    {/* Underline sweeps across on hover */}
                    <span className="absolute left-0 top-0 h-px w-0 bg-[#cdb083] transition-all duration-700 group-hover:w-full group-focus-visible:w-full motion-reduce:transition-none" />
                </div>

                <div className="flex items-center justify-between gap-5 text-[9px] uppercase tracking-[0.15em] text-[#837b70]">
                    {address && <span>{address}</span>}
                    <span>{sector || project.sector || "CADMAX"}</span>
                </div>
            </div>
        </motion.article>
    );
};

export default ProjectCard;
