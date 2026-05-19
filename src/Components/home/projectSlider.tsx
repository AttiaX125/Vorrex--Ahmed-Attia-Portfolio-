"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { homeProjects as projects } from "@/data/projects";
import Link from "next/link";
import MockUI from "./ShopMock";


/* ─────────────────────────────────────────
   INFINITE PROJECT SLIDER
   - Fixed visible width so cards don't all
     show at once on desktop
   - Infinite loop: after last card wraps
     back to first seamlessly
   - 3D tilt on hover
   - Auto-plays every 4 seconds
   - Pauses on hover
───────────────────────────────────────── */

const CARD_WIDTH_FEATURED = 340;
const CARD_WIDTH_DEFAULT  = 300;
const CARD_GAP            = 20;

/* Clone list for infinite loop — original + clone at end + clone at start */
const cloned = [
  { ...projects[projects.length - 1], id: -1,   _key: "clone-start" },
  ...projects.map((p) => ({ ...p, _key: `real-${p.id}` })),
  { ...projects[0],                   id: 9999, _key: "clone-end"   },
];

function getCardWidth(featured: boolean) {
  return featured ? CARD_WIDTH_FEATURED : CARD_WIDTH_DEFAULT;
}

/* Total offset to reach card at index i in cloned array */
function getOffset(index: number): number {
  let offset = 0;
  for (let i = 0; i < index; i++) {
    offset += getCardWidth(cloned[i].featured) + CARD_GAP;
  }
  return offset;
}

export default function ProjectSlider() {
  const total = projects.length;

  /*
    clonedIndex: position in cloned array
    starts at 1 — skips the clone-start, lands on real first card
  */
  const [clonedIndex, setClonedIndex]     = useState(1);
  const [realIndex,   setRealIndex]       = useState(0);
  const [animating,   setAnimating]       = useState(false);
  const [paused,      setPaused]          = useState(false);
  const trackRef                          = useRef<HTMLDivElement>(null);

  /* ── apply transform ── */
  const applyTransform = useCallback(
    (index: number, animated: boolean) => {
      const track = trackRef.current;
      if (!track) return;
      track.style.transition = animated
        ? "transform 0.6s cubic-bezier(0.77, 0, 0.18, 1)"
        : "none";
      track.style.transform = `translateX(-${getOffset(index)}px)`;
    },
    []
  );

  /* ── initialize position ── */
  useEffect(() => {
    applyTransform(1, false);
  }, [applyTransform]);

  /* ── go to a real index (0-based) ── */
  const goTo = useCallback(
    (nextReal: number) => {
      if (animating) return;
      setAnimating(true);

      const nextCloned = nextReal + 1; // offset by 1 because of clone-start
      setClonedIndex(nextCloned);
      setRealIndex(nextReal);
      applyTransform(nextCloned, true);
    },
    [animating, applyTransform]
  );

  const goNext = useCallback(() => {
    if (animating) return;
    const nextCloned = clonedIndex + 1;

    setAnimating(true);
    setClonedIndex(nextCloned);
    applyTransform(nextCloned, true);

    /* If we hit the clone-end, jump back to real first */
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

    /* If we hit the clone-start, jump back to real last */
    if (nextCloned === 0) {
      setTimeout(() => {
        const lastReal = total; // cloned index of last real card
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

  /* ── auto-play ── */
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
          padding:        "var(--space-section-head-y) var(--space-page-x)",
          borderBottom:   "var(--border-default)",
        }}
      >
        {/* Left label */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span style={{ fontSize:"var(--text-tag)", letterSpacing:"var(--tracking-widest)", textTransform:"uppercase", color:"var(--color-gold-dim)" }}>
            Selected Work
          </span>
          <span style={{ display:"block", width:40, height:1, background:"linear-gradient(90deg, var(--color-gold-dim), transparent)" }} />
          <span style={{ fontFamily:"var(--font-display)", fontStyle:"italic", fontSize:13, color:"var(--color-ink-muted)" }}>
            {total} projects
          </span>
        </div>

        {/* Right: counter + arrows */}
        <div style={{ display:"flex", alignItems:"center", gap:14 }}>
          <span style={{ fontSize:"var(--text-micro)", letterSpacing:"var(--tracking-wide)", color:"var(--color-ink-muted)", minWidth:48, textAlign:"center" }}>
            {String(realIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>

          {/* Prev */}
          <button
            onClick={goPrev}
            style={{
              width:36, height:36,
              border:"var(--border-default)",
              background:"transparent",
              color:"var(--color-ink-muted)",
              cursor:"pointer",
              display:"flex", alignItems:"center", justifyContent:"center",
              fontSize:14,
              transition:"border-color var(--anim-fast), color var(--anim-fast), background var(--anim-fast)",
              fontFamily:"var(--font-body)",
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

          {/* Next */}
          <button
            onClick={goNext}
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
      {/*
        max-width + overflow:hidden is what fixes the desktop issue.
        The stage clips everything outside its bounds.
      */}
      <div
        style={{
          padding:   "48px 0 48px var(--space-page-x)",
          overflow:  "hidden",           /* ← clips cards outside view */
          position:  "relative",
          width:     "100%",
          maxWidth:  "100vw",
        }}
      >
        {/* Right peek fade mask */}
        <div
          style={{
            position:"absolute", top:0, right:0, bottom:0,
            width:140,
            background:"linear-gradient(270deg, var(--color-bg-primary) 20%, transparent)",
            zIndex:10,
            pointerEvents:"none",
          }}
        />

        {/* Track — contains all cloned cards in a row */}
        <div
          ref={trackRef}
          style={{
            display:   "flex",
            gap:       CARD_GAP,
            willChange:"transform",
            /* transition is set imperatively via JS */
          }}
        >
          {cloned.map((project, i) => (
            <SliderCard
              key={project._key}
              project={project}
              isActive={i - 1 === realIndex}
            />
          ))}
        </div>
      </div>

      {/* ── DOTS ── */}
      <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:8, paddingBottom:40 }}>
        {projects.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            style={{
              width:      i === realIndex ? 40 : 20,
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
      <div style={{ display:"flex", justifyContent:"center", paddingBottom:48 }}>
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
}: {
  project: (typeof cloned)[0];
  isActive: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const width   = getCardWidth(project.featured);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left  - r.width  / 2) / (r.width  / 2);
    const y = (e.clientY - r.top   - r.height / 2) / (r.height / 2);
    card.style.transform  = `perspective(900px) rotateY(${x * 5}deg) rotateX(${-y * 4}deg) translateY(-6px)`;
    card.style.transition = "transform 0.08s linear, border-color 0.35s";
  };

  const handleMouseLeave = () => {
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
        {/*
          ── SWAP SCREENSHOT HERE ──
          <Image
            src={`/projects/project-${project.id}.jpg`}
            alt={project.name}
            width={width}
            height={project.featured ? 200 : 180}
            className="w-full h-full object-cover"
            style={{ opacity: 0.8 }}
          />
        */}
        <MockUI type={project.mockType} />
      </div>

      {/* Card body */}
      <div style={{ padding:"22px 22px 20px", display:"flex", flexDirection:"column", flex:1, position:"relative", zIndex:2 }}>

        {/* Num + year */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
          <span style={{ fontSize:"var(--text-tag)", letterSpacing:"2.5px", textTransform:"uppercase", color:"var(--color-gold-dim)" }}>
            Project {project.num}
          </span>
          <span style={{ fontSize:"var(--text-micro)", letterSpacing:"1.5px", color:"var(--color-ink-dim)" }}>
            {project.year}
          </span>
        </div>

        {/* Title */}
        <div style={{ fontFamily:"var(--font-display)", fontSize:"var(--text-card-title-sm)", fontWeight:300, lineHeight:1, letterSpacing:"-0.3px", color:"var(--color-ink-primary)", marginBottom:8 }}>
          {project.name}
          <em style={{ fontStyle:"italic", color:"var(--color-gold-primary)", display:"block", fontSize:22 }}>
            {project.nameSub}
          </em>
        </div>

        {/* Description */}
        <p style={{ fontSize:"var(--text-body-xs)", lineHeight:"var(--leading-body-xs)", color:"var(--color-ink-muted)", fontWeight:300, marginBottom:16, flex:1 }}>
          {project.desc}
        </p>

        {/* Tags */}
        <div style={{ display:"flex", gap:"var(--space-tag-gap)", flexWrap:"wrap", marginBottom:16 }}>
          {project.tags.map((tag) => (
            <span key={tag} style={{ fontSize:"var(--text-tag)", letterSpacing:"1.5px", textTransform:"uppercase", color:"var(--color-gold-dim)", border:"var(--border-default)", padding:"var(--space-tag-y) var(--space-tag-x)" }}>
              {tag}
            </span>
          ))}
        </div>

        {/* Link */}
        <Link
          href={project.link}
          style={{ display:"flex", alignItems:"center", gap:8, fontSize:"var(--text-tag)", letterSpacing:"2.5px", textTransform:"uppercase", color:"var(--color-ink-muted)", transition:"color var(--anim-fast)", width:"fit-content" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-gold-primary)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-ink-muted)")}
        >
          <span style={{ display:"inline-block", width:18, height:1, background:"currentColor", transition:"width var(--anim-base)" }} />
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
