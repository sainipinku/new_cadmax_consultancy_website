import React, { useState, useEffect } from "react";

const Preloader = ({ onDone }) => {
  const [phase, setPhase] = useState("in");
  const DURATION = 3000;

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("out"), DURATION);
    const t2 = setTimeout(onDone, DURATION + 1100);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [onDone]);

  const word1 = "CADMAX";
  const word2 = "CONSULTANCY";

  return (
    <div
      aria-hidden
      className="fixed inset-0 z-[100] overflow-hidden bg-[#171717] text-[#F8F5F1]"
      style={{
        transform: phase === "out" ? "scale(1.25)" : "scale(1)",
        opacity: phase === "out" ? 0 : 1,
        transition:
          "transform 1.1s cubic-bezier(0.76, 0, 0.24, 1), opacity 0.9s ease-in",
      }}
    >
      {/* Blueprint grid */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          animation: "blueprint-in 1.2s ease-out both",
        }}
      />

      {/* Radial glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 45%, rgba(201, 165, 106, 0.22), transparent 55%)",
          animation: "glow-pulse 3.2s ease-in-out infinite",
        }}
      />

      {/* Grain texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-30 mix-blend-overlay"
        style={{
          backgroundImage:
            "radial-gradient(rgba(0,0,0,0.35) 1px, transparent 1px)",
          backgroundSize: "3px 3px",
        }}
      />

      {/* Corner ticks */}
      {[
        "top-6 left-6",
        "top-6 right-6",
        "bottom-6 left-6",
        "bottom-6 right-6",
      ].map((pos, i) => (
        <div
          key={pos}
          className={`absolute ${pos} h-6 w-6`}
          style={{ animation: `reveal-up .8s ${0.2 + i * 0.08}s both` }}
        >
          <div className="absolute top-0 left-0 h-px w-full bg-[#CAAA79]/60" />
          <div className="absolute top-0 left-0 h-full w-px bg-[#CAAA79]/60" />
        </div>
      ))}

      {/* Top meta bar */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 flex items-center gap-6 text-xs text-[#F8F5F1]/60 font-mono">
        <span style={{ animation: "reveal-up .8s .1s both" }}>N 28.61°</span>
        <span
          className="h-px w-10 bg-[#CAAA79]/50"
          style={{ animation: "draw-line 1s .3s both", transformOrigin: "left" }}
        />
        <span style={{ animation: "reveal-up .8s .5s both" }}>EST · 2008</span>
        <span
          className="h-px w-10 bg-[#CAAA79]/50"
          style={{ animation: "draw-line 1s .7s both", transformOrigin: "left" }}
        />
        <span style={{ animation: "reveal-up .8s .9s both" }}>E 77.20°</span>
      </div>

      {/* Center stage */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-10 px-6">
        {/* 3D rotating cube (pure CSS 3D) */}
        <div
          className="relative"
          style={{
            width: 128,
            height: 128,
            perspective: 900,
          }}
        >
          <div
            className="relative h-full w-full"
            style={{
              transformStyle: "preserve-3d",
              animation: "cube-spin 5.5s linear infinite",
            }}
          >
            {(
              [
                ["translateZ(64px)", "front"],
                ["rotateY(180deg) translateZ(64px)", "back"],
                ["rotateY(90deg) translateZ(64px)", "right"],
                ["rotateY(-90deg) translateZ(64px)", "left"],
                ["rotateX(90deg) translateZ(64px)", "top"],
                ["rotateX(-90deg) translateZ(64px)", "bottom"],
              ]
            ).map(([t, key]) => (
              <div
                key={key}
                className="absolute inset-0 border border-[#CAAA79]/40"
                style={{
                  transform: t,
                  background:
                    "linear-gradient(135deg, rgba(34, 34, 34, 0.9), rgba(20, 20, 20, 0.95))",
                  boxShadow: "inset 0 0 40px rgba(201, 165, 106, 0.15)",
                }}
              >
                <div className="absolute inset-3 border border-[#CAAA79]/25" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span
                    className="text-mono text-[10px] tracking-[0.35em] text-[#CAAA79]/80"
                    style={{ fontFamily: "monospace" }}
                  >
                    CX
                  </span>
                </div>
              </div>
            ))}
          </div>
          {/* base plate shadow */}
          <div
            className="absolute -bottom-8 left-1/2 -translate-x-1/2 h-3 w-40 rounded-full"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(0,0,0,0.55), transparent 70%)",
              filter: "blur(4px)",
            }}
          />
        </div>

        {/* Wordmark */}
        <div className="text-center">
          <div className="flex justify-center overflow-hidden">
            {word1.split("").map((c, i) => (
              <span
                key={i}
                className="inline-block text-[clamp(2.5rem,7vw,5.5rem)] font-light"
                style={{
                  animation: `letter-rise .9s ${0.9 + i * 0.05}s cubic-bezier(0.2,0.7,0.15,1) both`,
                }}
              >
                {c}
              </span>
            ))}
          </div>
          <div className="mt-2 flex justify-center overflow-hidden">
            {word2.split("").map((c, i) => (
              <span
                key={i}
                className="inline-block text-xs text-[#CAAA79] tracking-[0.3em] uppercase"
                style={{
                  animation: `letter-rise .8s ${1.6 + i * 0.03}s cubic-bezier(0.2,0.7,0.15,1) both`,
                }}
              >
                {c === " " ? "\u00A0" : c}
              </span>
            ))}
          </div>
        </div>

        {/* Progress line */}
        <div className="w-[min(360px,70vw)]">
          <div className="relative h-px w-full bg-[#F8F5F1]/15 overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 w-full bg-[#CAAA79]"
              style={{
                transformOrigin: "left center",
                animation: `progress-fill ${DURATION - 800}ms cubic-bezier(0.65,0,0.35,1) 400ms both`,
              }}
            />
          </div>
          <div
            className="mt-3 flex justify-between text-[10px] text-[#F8F5F1]/50 font-mono"
            style={{ animation: "reveal-up .8s .8s both" }}
          >
            <span>Loading Studio</span>
            <span>Architecture · Engineering · Survey</span>
          </div>
        </div>
      </div>

      {/* Bottom credit */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] text-[#F8F5F1]/40 font-mono"
        style={{ animation: "reveal-up .8s 1.2s both" }}
      >
        A CADMAX PRODUCTION — MMXXVI
      </div>
    </div>
  );
};

export default Preloader;