"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { allProjects as projects } from "@/data/projects";
import MockUI from "@/Components/home/ShopMock";

/* ─────────────────────────────────────────
   PROJECT CARD — full cinematic horizontal
───────────────────────────────────────── */
function ProjectCard({
  project,
  index,
  reversed,
}: {
  project: (typeof projects)[0];
  index: number;
  reversed: boolean;
}) {
  const cardRef  = useRef<HTMLDivElement>(null);
  const wrapRef  = useRef<HTMLDivElement>(null);
  const inView   = useInView(wrapRef, { once: true, margin: "-80px" });

  /* ── 3D tilt ── */
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left  - r.width  / 2) / (r.width  / 2);
    const y = (e.clientY - r.top   - r.height / 2) / (r.height / 2);
    card.style.transform  = `perspective(1200px) rotateY(${x * 4}deg) rotateX(${-y * 3}deg) translateZ(4px)`;
    card.style.transition = "transform 0.08s linear, border-color 0.4s";
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform  = "perspective(1200px) rotateY(0deg) rotateX(0deg) translateZ(0px)";
    card.style.transition = "transform 0.5s cubic-bezier(0.23,1,0.32,1), border-color 0.4s";
  };

  return (
    <motion.div
      ref={wrapRef}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay: index * 0.1, ease: [0.23, 1, 0.32, 1] }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          border:      "var(--border-default)",
          background:  "var(--color-bg-secondary)",
          position:    "relative",
          overflow:    "hidden",
          willChange:  "transform",
          transition:  "border-color 0.4s",
          cursor:      "pointer",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.borderColor = "var(--color-gold-dim)")
        }
      >
        {/* Gold top rule on hover */}
        <div
          style={{
            position:   "absolute",
            top:        0,
            left:       0,
            right:      0,
            height:     1,
            background: "linear-gradient(90deg, transparent, var(--color-gold-dim) 40%, var(--color-gold-dim) 60%, transparent)",
            opacity:    0,
            transition: "opacity 0.4s",
            zIndex:     2,
          }}
          className="card-top-rule"
        />

        {/* Gold shimmer sweep */}
        <div
          style={{
            position:      "absolute",
            inset:         0,
            background:    "linear-gradient(105deg, transparent 40%, var(--color-gold-shimmer) 50%, transparent 60%)",
            transform:     "translateX(-100%)",
            transition:    "transform var(--anim-shimmer)",
            pointerEvents: "none",
            zIndex:        3,
          }}
          className="card-shimmer"
        />

        {/* Ghost roman numeral */}
        <div
          style={{
            position:      "absolute",
            right:         -16,
            bottom:        -28,
            fontFamily:    "var(--font-display)",
            fontSize:      140,
            fontWeight:    300,
            color:         "rgba(200, 169, 110, 0.03)",
            lineHeight:    1,
            pointerEvents: "none",
            zIndex:        1,
            userSelect:    "none",
            transition:    "color var(--anim-base)",
          }}
        >
          {project.index}
        </div>

        {/* ── CARD INNER GRID ── */}
        <div
          style={{
            display:             "grid",
            gridTemplateColumns: reversed ? "380px 1px 1fr" : "1fr 1px 380px",
            minHeight:           260,
          }}
        >
          {/* Info side */}
          {!reversed && (
            <CardInfo project={project} />
          )}

          {/* Vertical rule */}
          <div
            style={{
              background: "linear-gradient(180deg, transparent, var(--color-gold-line) 20%, var(--color-gold-line) 80%, transparent)",
            }}
          />

          {/* Visual side */}
          <div
            style={{
              background:   "var(--color-bg-tertiary)",
              overflow:     "hidden",
              minHeight:    260,
              position:     "relative",
              zIndex:       2,
            }}
          >
            {/*
              ── SWAP SCREENSHOT HERE ──
              Replace <MockUI> with:

              <Image
                src={`/projects/project-${project.id}.jpg`}
                alt={project.name}
                fill
                style={{ objectFit: "cover", opacity: 0.75 }}
              />
            */}
            <MockUI type={project.mockType} />
          </div>

          {/* Info side — reversed layout */}
          {reversed && (
            <CardInfo project={project} />
          )}
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   CARD INFO PANEL
───────────────────────────────────────── */
function CardInfo({ project }: { project: (typeof projects)[0] }) {
  return (
    <div
      style={{
        padding:        "36px 40px",
        display:        "flex",
        flexDirection:  "column",
        justifyContent: "space-between",
        position:       "relative",
        zIndex:         2,
      }}
    >
      {/* Top */}
      <div>
        {/* Num + year */}
        <div
          style={{
            display:        "flex",
            justifyContent: "space-between",
            alignItems:     "center",
            marginBottom:   20,
          }}
        >
          <span
            style={{
              fontFamily:    "var(--font-display)",
              fontStyle:     "italic",
              fontSize:      13,
              color:         "var(--color-gold-dim)",
              letterSpacing: "2px",
            }}
          >
            Project {project.num}
          </span>
          <span
            style={{
              fontSize:      "var(--text-micro)",
              letterSpacing: "var(--tracking-wide)",
              textTransform: "uppercase",
              color:         "var(--color-ink-muted)",
            }}
          >
            {project.year}
          </span>
        </div>

        {/* Title */}
        <h2
          style={{
            fontFamily:    "var(--font-display)",
            fontSize:      "clamp(32px, 3vw, 42px)",
            fontWeight:    300,
            lineHeight:    0.95,
            letterSpacing: "-0.5px",
            color:         "var(--color-ink-primary)",
            marginBottom:  14,
            transition:    "color var(--anim-base)",
          }}
        >
          {project.name}
          <em
            style={{
              fontStyle:   "italic",
              color:       "var(--color-gold-primary)",
              display:     "block",
              fontSize:    "clamp(28px, 2.5vw, 36px)",
            }}
          >
            {project.nameSub}
          </em>
        </h2>

        {/* Description */}
        <p
          style={{
            fontSize:   "var(--text-body-sm)",
            lineHeight: "var(--leading-body-sm)",
            color:      "var(--color-ink-muted)",
            fontWeight: 300,
            maxWidth:   340,
            marginBottom: 22,
          }}
        >
          {project.desc}
        </p>

        {/* Tags */}
        <div
          style={{
            display:  "flex",
            gap:      "var(--space-tag-gap)",
            flexWrap: "wrap",
          }}
        >
          {project.tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontSize:      "var(--text-tag)",
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                color:         "var(--color-gold-dim)",
                border:        "var(--border-default)",
                padding:       "var(--space-tag-y) var(--space-tag-x)",
                transition:    "border-color var(--anim-base), color var(--anim-base)",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom — link */}
      <Link
        href={project.link}
        style={{
          display:       "flex",
          alignItems:    "center",
          gap:           10,
          marginTop:     28,
          fontSize:      "var(--text-tag)",
          letterSpacing: "var(--tracking-wider)",
          textTransform: "uppercase",
          color:         "var(--color-gold-dim)",
          transition:    "color var(--anim-fast)",
          width:         "fit-content",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.color = "var(--color-gold-primary)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.color = "var(--color-gold-dim)")
        }
      >
        <span
          style={{
            display:    "inline-block",
            width:      24,
            height:     1,
            background: "currentColor",
            transition: "width var(--anim-base)",
            flexShrink: 0,
          }}
        />
        View Case Study
      </Link>
    </div>
  );
}

/* ─────────────────────────────────────────
   PROJECTS PAGE
───────────────────────────────────────── */
export default function ProjectsPage() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true });

  return (
    <div>

      {/* ── PAGE HEADER ── */}
      <div
        ref={headerRef}
        style={{
          padding:      "64px var(--space-page-x) 52px",
          borderBottom: "var(--border-default)",
          position:     "relative",
        }}
      >
        {/* Corner ornaments */}
        <span style={{ position:"absolute", top:20, left:20, width:28, height:28, borderTop:"1px solid var(--color-gold-dim)", borderLeft:"1px solid var(--color-gold-dim)" }} />
        <span style={{ position:"absolute", top:20, right:20, width:28, height:28, borderTop:"1px solid var(--color-gold-dim)", borderRight:"1px solid var(--color-gold-dim)" }} />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
          style={{
            fontSize:      "var(--text-tag)",
            letterSpacing: "var(--tracking-widest)",
            textTransform: "uppercase",
            color:         "var(--color-gold-dim)",
            display:       "flex",
            alignItems:    "center",
            gap:           12,
            marginBottom:  20,
          }}
        >
          <span style={{ display:"block", width:22, height:1, background:"var(--color-gold-dim)" }} />
          Selected Work · {projects.length} Projects
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
          style={{
            fontFamily:    "var(--font-display)",
            fontSize:      "clamp(48px, 6vw, 80px)",
            fontWeight:    300,
            lineHeight:    0.9,
            letterSpacing: "-1px",
            color:         "var(--color-ink-primary)",
          }}
        >
          Every project
          <em
            style={{
              fontStyle:   "italic",
              color:       "var(--color-gold-primary)",
              display:     "block",
            }}
          >
            tells a story.
          </em>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.35, ease: [0.23, 1, 0.32, 1] }}
          style={{
            fontSize:   "var(--text-body)",
            lineHeight: "var(--leading-body)",
            color:      "var(--color-ink-muted)",
            fontWeight: 300,
            maxWidth:   480,
            marginTop:  20,
          }}
        >
          A curated selection of my finest work — each one a collaboration
          between design precision, engineering craft, and motion that earns
          its place.
        </motion.p>
      </div>

      {/* ── PROJECT CARDS ── */}
      <div
        style={{
          display:       "flex",
          flexDirection: "column",
          gap:           0,
          padding:       "48px var(--space-page-x)",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
          {projects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              reversed={i % 2 !== 0}
            />
          ))}
        </div>
      </div>

      {/* ── BOTTOM CTA ── */}
      <div
        style={{
          borderTop:      "var(--border-default)",
          padding:        "52px var(--space-page-x)",
          display:        "flex",
          flexDirection:  "column",
          alignItems:     "center",
          gap:            16,
          background:     "var(--color-bg-secondary)",
          textAlign:      "center",
        }}
      >
        <span
          style={{
            fontSize:      "var(--text-tag)",
            letterSpacing: "var(--tracking-widest)",
            textTransform: "uppercase",
            color:         "var(--color-gold-dim)",
          }}
        >
          Like what you see?
        </span>
        <h3
          style={{
            fontFamily:  "var(--font-display)",
            fontSize:    "clamp(28px, 3vw, 40px)",
            fontWeight:  300,
            color:       "var(--color-ink-primary)",
            lineHeight:  1.2,
          }}
        >
          Let's build something{" "}
          <em style={{ fontStyle: "italic", color: "var(--color-gold-primary)" }}>
            together.
          </em>
        </h3>
        <div style={{ display: "flex", gap: 16, marginTop: 12 }}>
          <Link href="/contact" className="btn-gold">
            Get in Touch →
          </Link>
          <Link
            href="/about"
            style={{
              display:       "inline-flex",
              alignItems:    "center",
              fontSize:      "var(--text-tag)",
              letterSpacing: "var(--tracking-wider)",
              textTransform: "uppercase",
              color:         "var(--color-ink-muted)",
              transition:    "color var(--anim-fast)",
              fontFamily:    "var(--font-body)",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "var(--color-gold-primary)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "var(--color-ink-muted)")
            }
          >
            About me →
          </Link>
        </div>
      </div>

    </div>
  );
}
