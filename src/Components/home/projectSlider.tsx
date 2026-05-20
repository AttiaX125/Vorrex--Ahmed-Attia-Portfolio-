"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { homeProjects as projects } from "@/data/projects";
import Link from "next/link";
import MockUI from "./ShopMock";

/* ─────────────────────────────────────────
   INFINITE PROJECT SLIDER
   - Mobile: full-width single card stack
   - Desktop: fixed visible width slider
   - Infinite loop with seamless wrap
   - 3D tilt on desktop hover only
   - Auto-plays every 4 seconds, pauses on hover
───────────────────────────────────────── */

const CARD_GAP = 20;

/* Clone list for infinite loop */
const cloned = [
  { ...projects[projects.length - 1], id: -1,   _key: "clone-start" },
  ...projects.map((p) => ({ ...p, _key: `real-${p.id}` })),
  { ...projects[0],                   id: 9999, _key: "clone-end"   },
];

/* Card widths — responsive */
function getCardWidth(featured: boolean, isMobile: boolean): number {
  if (isMobile) return typeof window !== "undefined" ? Math.min(window.innerWidth - 48, 320) : 300;
  return featured ? 340 : 300;
}

function getOffset(index: number, isMobile: boolean): number {
  let offset = 0;
  for (let i = 0; i < index; i++) {
    const w = getCardWidth(cloned[i].featured, isMobile);
    offset += w + CARD_GAP;
  }
  return offset;
}

export default function ProjectSlider() {
  const total = projects.length;
  const [clonedIndex, setClonedIndex] = useState(1);
  const [realIndex,   setRealIndex]   = useState(0);
  const [animating,   setAnimating]   = useState(false);
  const [paused,      setPaused]      = useState(false);
  const [isMobile,    setIsMobile]    = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  /* Detect mobile */
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const applyTransform = useCallback(
    (index: number, animated: boolean) => {
      const track = trackRef.current;
      if (!track) return;
      track.style.transition = animated
        ? "transform 0.6s cubic-bezier(0.77, 0, 0.18, 1)"
        : "none";
      track.style.transform = `translateX(-${getOffset(index, isMobile)}px)`;
    },
    [isMobile]
  );

  /* Initialize + re-init on mobile change */
  useEffect(() => {
    applyTransform(clonedIndex, false);
  }, [isMobile]); // eslint-disable-line

  useEffect(() => {
    applyTransform(1, false);
  }, [applyTransform]);

  const goTo = useCallback(
    (nextReal: number) => {
      if (animating) return;
      setAnimating(true);
      const nextCloned = nextReal + 1;
      setClonedIndex(nextCloned);
      setRealIndex(nextReal);
      applyTransform(nextCloned, true);
      setTimeout(() => setAnimating(false), 640);
    },
    [animating, applyTransform]
  );

  const goNext = useCallback(() => {
    if (animating) return;
    const nextCloned = clonedIndex + 1;
    setAnimating(true);
    setClonedIndex(nextCloned);
    applyTransform(nextCloned, true);

    if (nextCloned === cloned.length - 1) {
      setTimeout(() => {
        applyTransform(1, false);
        setClonedIndex(1);
        setRealIndex(0);
        setAnimating(false);
      }, 620);
    } else {
      setRealIndex((prev) => (prev + 1) % total);
      setTimeout(() => setAnimating(false), 640);
    }
  }, [animating, clonedIndex, applyTransform, total]);

  const goPrev = useCallback(() => {
    if (animating) return;
    const nextCloned = clonedIndex - 1;
    setAnimating(true);
    setClonedIndex(nextCloned);
    applyTransform(nextCloned, true);

    if (nextCloned === 0) {
      setTimeout(() => {
        const lastReal = total;
        applyTransform(lastReal, false);
        setClonedIndex(lastReal);
        setRealIndex(total - 1);
        setAnimating(false);
      }, 620);
    } else {
      setRealIndex((prev) => (prev - 1 + total) % total);
      setTimeout(() => setAnimating(false), 640);
    }
  }, [animating, clonedIndex, applyTransform, total]);

  /* Touch swipe support */
  const touchStartX = useRef<number | null>(null);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? goNext() : goPrev();
    }
    touchStartX.current = null;
  };

  /* Auto-play */
  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => goNext(), 4000);
    return () => clearInterval(timer);
  }, [paused, goNext]);

  return (
    <section
      style={{ borderBottom: "var(--border-default)" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >

      {/* ── SECTION HEADER ── */}
      <div
        style={{
          display:        "flex",
          justifyContent: "space-between",
          alignItems:     "center",
          padding:        "36px var(--space-page-x)",
          borderBottom:   "var(--border-default)",
          gap:            12,
        }}
      >
        {/* Left label */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, minWidth: 0, overflow: "hidden" }}>
          <span style={{ fontSize:"var(--text-tag)", letterSpacing:"var(--tracking-widest)", textTransform:"uppercase", color:"var(--color-gold-dim)", whiteSpace:"nowrap" }}>
            Selected Work
          </span>
          <span className="hidden md:block" style={{ display:"block", width:40, height:1, background:"linear-gradient(90deg, var(--color-gold-dim), transparent)", flexShrink:0 }} />
          <span className="hidden md:block" style={{ fontFamily:"var(--font-display)", fontStyle:"italic", fontSize:13, color:"var(--color-ink-muted)", whiteSpace:"nowrap" }}>
            {total} projects
          </span>
        </div>

        {/* Right: counter + arrows */}
        <div style={{ display:"flex", alignItems:"center", gap:12, flexShrink:0 }}>
          <span style={{ fontSize:"var(--text-micro)", letterSpacing:"var(--tracking-wide)", color:"var(--color-ink-muted)", minWidth:40, textAlign:"center" }}>
            {String(realIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>

          <button
            onClick={goPrev}
            aria-label="Previous project"
            style={{
              width:36, height:36,
              border:"var(--border-default)",
              background:"transparent",
              color:"var(--color-ink-muted)",
              cursor:"pointer",
              display:"flex", alignItems:"center", justifyContent:"center",
              fontSize:14,
              transition:"border-color var(--anim-fast), color var(--anim-fast)",
              fontFamily:"var(--font-body)",
              flexShrink:0,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--color-gold-dim)";
              e.currentTarget.style.color = "var(--color-gold-primary)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--color-ink-dim)";
              e.currentTarget.style.color = "var(--color-ink-muted)";
            }}
          >
            ←
          </button>

          <button
            onClick={goNext}
            aria-label="Next project"
            style={{
              width:36, height:36,
              border:"1px solid var(--color-gold-dim)",
              background:"transparent",
              color:"var(--color-gold-primary)",
              cursor:"pointer",
              display:"flex", alignItems:"center", justifyContent:"center",
              fontSize:14,
              transition:"border-color var(--anim-fast), color var(--anim-fast), background var(--anim-fast)",
              fontFamily:"var(--font-body)",
              flexShrink:0,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--color-gold-primary)";
              e.currentTarget.style.color = "var(--color-bg-primary)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "var(--color-gold-primary)";
            }}
          >
            →
          </button>
        </div>
      </div>

      {/* ── SLIDER STAGE ── */}
      <div
        style={{
          padding:   "36px 0 36px var(--space-page-x)",
          overflow:  "hidden",
          position:  "relative",
          width:     "100%",
          maxWidth:  "100vw",
        }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Right peek fade mask */}
        <div
          style={{
            position:"absolute", top:0, right:0, bottom:0,
            width: isMobile ? 40 : 120,
            background:"linear-gradient(270deg, var(--color-bg-primary) 20%, transparent)",
            zIndex:10,
            pointerEvents:"none",
          }}
        />

        <div
          ref={trackRef}
          style={{
            display:   "flex",
            gap:       CARD_GAP,
            willChange:"transform",
          }}
        >
          {cloned.map((project, i) => (
            <SliderCard
              key={project._key}
              project={project}
              isActive={i - 1 === realIndex}
              isMobile={isMobile}
            />
          ))}
        </div>
      </div>

      {/* ── DOTS ── */}
      <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:8, paddingBottom:32 }}>
        {projects.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to project ${i + 1}`}
            style={{
              width:      i === realIndex ? 32 : 16,
              height:     2,
              background: i === realIndex ? "var(--color-gold-primary)" : "var(--color-ink-dim)",
              border:     "none",
              cursor:     "pointer",
              transition: "width 0.3s ease, background 0.3s ease",
              padding:    0,
            }}
          />
        ))}
      </div>

      {/* ── VIEW ALL ── */}
      <div style={{ display:"flex", justifyContent:"center", paddingBottom:40 }}>
        <Link href="/projects" className="btn-gold">
          View All Projects →
        </Link>
      </div>

    </section>
  );
}

/* ─────────────────────────────────────────
   SLIDER CARD
───────────────────────────────────────── */
function SliderCard({
  project,
  isActive,
  isMobile,
}: {
  project: (typeof cloned)[0];
  isActive: boolean;
  isMobile: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const width   = getCardWidth(project.featured, isMobile);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) return;
    const card = cardRef.current;
    if (!card) return;
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left  - r.width  / 2) / (r.width  / 2);
    const y = (e.clientY - r.top   - r.height / 2) / (r.height / 2);
    card.style.transform  = `perspective(900px) rotateY(${x * 5}deg) rotateX(${-y * 4}deg) translateY(-6px)`;
    card.style.transition = "transform 0.08s linear, border-color 0.35s";
  };

  const handleMouseLeave = () => {
    if (isMobile) return;
    const card = cardRef.current;
    if (!card) return;
    card.style.transform  = "perspective(900px) rotateY(0deg) rotateX(0deg) translateY(0px)";
    card.style.transition = "transform 0.5s cubic-bezier(0.23,1,0.32,1), border-color 0.35s";
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        flexShrink:    0,
        width,
        background:    "var(--color-bg-secondary)",
        border:        isActive
          ? "1px solid var(--color-gold-dim)"
          : "var(--border-default)",
        position:      "relative",
        overflow:      "hidden",
        display:       "flex",
        flexDirection: "column",
        cursor:        "pointer",
        willChange:    "transform",
        transition:    "border-color 0.35s",
      }}
    >
      {/* Gold shimmer */}
      <div style={{ position:"absolute", inset:0, background:"linear-gradient(110deg, transparent 35%, var(--color-gold-shimmer) 50%, transparent 65%)", transform:"translateX(-100%)", transition:"transform var(--anim-shimmer)", pointerEvents:"none", zIndex:3 }} />

      {/* Active top rule */}
      {isActive && (
        <div style={{ position:"absolute", top:0, left:0, right:0, height:1, background:"linear-gradient(90deg, transparent, var(--color-gold-dim) 40%, var(--color-gold-dim) 60%, transparent)", zIndex:2 }} />
      )}

      {/* Visual area */}
      <div style={{ height: project.featured ? 200 : 180, background:"var(--color-bg-tertiary)", borderBottom:"var(--border-default)", overflow:"hidden", flexShrink:0 }}>
        <MockUI type={project.mockType} />
      </div>

      {/* Card body */}
      <div style={{ padding:"20px 20px 18px", display:"flex", flexDirection:"column", flex:1, position:"relative", zIndex:2 }}>

        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
          <span style={{ fontSize:"var(--text-tag)", letterSpacing:"2.5px", textTransform:"uppercase", color:"var(--color-gold-dim)" }}>
            Project {project.num}
          </span>
          <span style={{ fontSize:"var(--text-micro)", letterSpacing:"1.5px", color:"var(--color-ink-dim)" }}>
            {project.year}
          </span>
        </div>

        <div style={{ fontFamily:"var(--font-display)", fontSize:"var(--text-card-title-sm)", fontWeight:300, lineHeight:1, letterSpacing:"-0.3px", color:"var(--color-ink-primary)", marginBottom:8 }}>
          {project.name}
          <em style={{ fontStyle:"italic", color:"var(--color-gold-primary)", display:"block", fontSize:22 }}>
            {project.nameSub}
          </em>
        </div>

        <p style={{ fontSize:"var(--text-body-xs)", lineHeight:"var(--leading-body-xs)", color:"var(--color-ink-muted)", fontWeight:300, marginBottom:14, flex:1 }}>
          {project.desc}
        </p>

        <div style={{ display:"flex", gap:"var(--space-tag-gap)", flexWrap:"wrap", marginBottom:14 }}>
          {project.tags.slice(0, 3).map((tag) => (
            <span key={tag} style={{ fontSize:"var(--text-tag)", letterSpacing:"1.5px", textTransform:"uppercase", color:"var(--color-gold-dim)", border:"var(--border-default)", padding:"var(--space-tag-y) var(--space-tag-x)" }}>
              {tag}
            </span>
          ))}
        </div>

        <Link
          href={project.link}
          style={{ display:"flex", alignItems:"center", gap:8, fontSize:"var(--text-tag)", letterSpacing:"2.5px", textTransform:"uppercase", color:"var(--color-ink-muted)", transition:"color var(--anim-fast)", width:"fit-content" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-gold-primary)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-ink-muted)")}
        >
          <span style={{ display:"inline-block", width:18, height:1, background:"currentColor", flexShrink:0 }} />
          Case Study
        </Link>
      </div>

      {/* Ghost numeral */}
      <div style={{ position:"absolute", right:-10, bottom:-20, fontFamily:"var(--font-display)", fontSize:120, fontWeight:300, color:"rgba(200, 169, 110, 0.03)", lineHeight:1, pointerEvents:"none", zIndex:1, userSelect:"none" }}>
        {project.index}
      </div>
    </div>
  );
}
