"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import myImage from "../../../public/images/ahmed-attia.jpeg";
/* ─────────────────────────────────────────
   ANIMATION VARIANTS
───────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0  },
};

const fadeIn = {
  hidden: { opacity: 0 },
  show:   { opacity: 1  },
};

/* ─────────────────────────────────────────
   STAT ITEM
───────────────────────────────────────── */
function StatItem({
  number,
  label,
  delay,
}: {
  number: string;
  label:  string;
  delay:  number;
}) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="show"
      transition={{ duration: 0.75, delay, ease: [0.23, 1, 0.32, 1] }}
      className="p-5 flex flex-col gap-1"
    >
      <span
        style={{
          fontFamily: "var(--font-display)",
          fontSize:   "var(--text-stat)",
          color:      "var(--color-gold-primary)",
          lineHeight: 1,
          fontWeight: 300,
        }}
      >
        {number}
      </span>
      <span
        style={{
          fontSize:      "var(--text-tag)",
          letterSpacing: "var(--tracking-wide)",
          color:         "var(--color-ink-muted)",
          textTransform: "uppercase",
        }}
      >
        {label}
      </span>
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   HERO
───────────────────────────────────────── */
export default function Hero() {
  return (
    <section
      style={{ borderBottom: "var(--border-default)" }}
      className="w-full"
    >
      <div
        className="grid"
        style={{ gridTemplateColumns: "1fr 1px 1fr" }}
      >

        {/* ══════════════ LEFT SIDE ══════════════ */}
        <div
          className="flex flex-col justify-between"
          style={{
            padding:  "52px var(--space-page-x) 48px",
            position: "relative",
          }}
        >
          {/* Corner ornaments */}
          <span style={{ position:"absolute", top:20, left:20, width:28, height:28, borderTop:"1px solid var(--color-gold-dim)", borderLeft:"1px solid var(--color-gold-dim)" }} />
          <span style={{ position:"absolute", bottom:20, right:0, width:28, height:28, borderBottom:"1px solid var(--color-gold-dim)", borderRight:"1px solid var(--color-gold-dim)" }} />

          {/* ── TOP BLOCK ── */}
          <div>

            {/* Eyebrow */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              transition={{ duration: 0.75, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
              className="flex items-center gap-3 mb-6"
              style={{
                fontSize:      "var(--text-tag)",
                letterSpacing: "var(--tracking-widest)",
                textTransform: "uppercase",
                color:         "var(--color-gold-dim)",
              }}
            >
              <span style={{ display:"block", width:22, height:1, background:"var(--color-gold-dim)" }} />
              Frontend Developer · Cairo, Egypt
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="show"
              transition={{ duration: 0.75, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
              className="mb-7"
              style={{
                fontFamily:    "var(--font-display)",
                fontSize:      "clamp(52px, 6vw, 80px)",
                fontWeight:    300,
                lineHeight:    "var(--leading-hero)",
                letterSpacing: "-1px",
                color:         "var(--color-ink-primary)",
              }}
            >
              <span style={{ color:"var(--color-ink-ghost)", display:"block" }}>The art</span>
              of building
              <em style={{ fontStyle:"italic", color:"var(--color-gold-primary)", display:"block" }}>
                beautiful
              </em>
              <span style={{ color:"var(--color-ink-ghost)", display:"block" }}>things.</span>
            </motion.h1>

          </div>

          {/* ── BOTTOM BLOCK ── */}
          <div>

            {/* Bio — from CV professional summary */}
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="show"
              transition={{ duration: 0.75, delay: 0.35, ease: [0.23, 1, 0.32, 1] }}
              className="mb-9"
              style={{
                fontSize:   "var(--text-body)",
                lineHeight: "var(--leading-body)",
                color:      "var(--color-ink-muted)",
                fontWeight: 300,
                maxWidth:   360,
              }}
            >
              Mechatronics engineer turned frontend developer — building
              responsive, accessible, and animated web experiences with
              React and Next.js. Every pixel deliberate, every interaction
              intentional.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              transition={{ duration: 0.75, delay: 0.45, ease: [0.23, 1, 0.32, 1] }}
              className="flex items-center gap-5"
            >
              {/* View work → scrolls to project slider */}
              <Link href="/projects" className="btn-gold">
                View Selected Work
              </Link>

              {/* Download CV — points to /public/Ahmed-Attia-CV.pdf */}
              <a
                href="/Ahmed-Attia-CV.pdf"
                download="Ahmed-Attia-CV.pdf"
                style={{
                  background:    "none",
                  border:        "none",
                  fontSize:      "var(--text-label)",
                  color:         "var(--color-ink-muted)",
                  letterSpacing: "var(--tracking-wide)",
                  cursor:        "pointer",
                  transition:    "color var(--anim-fast)",
                  fontFamily:    "var(--font-body)",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "var(--color-gold-primary)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "var(--color-ink-muted)")
                }
              >
                Download CV →
              </a>
            </motion.div>

          </div>
        </div>

        {/* ══════════════ VERTICAL RULE ══════════════ */}
        <div className="rule-gold-v" />

        {/* ══════════════ RIGHT SIDE ══════════════ */}
        <div
          className="flex flex-col justify-between"
          style={{
            background: "var(--color-bg-secondary)",
            padding:    "52px var(--space-page-x) 48px",
          }}
        >

          {/* ── STATS ── */}
          <div>
            <motion.div
              variants={fadeIn}
              initial="hidden"
              animate="show"
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              style={{
                fontSize:      "var(--text-tag)",
                letterSpacing: "var(--tracking-widest)",
                textTransform: "uppercase",
                color:         "var(--color-gold-dim)",
                marginBottom:  16,
              }}
            >
              At a glance
            </motion.div>

            {/* 2×2 stat grid */}
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", border:"var(--border-default)" }}>
              <div style={{ borderRight:"var(--border-default)", borderBottom:"var(--border-default)" }}>
                <StatItem number="1+" label="Year experience" delay={0.30} />
              </div>
              <div style={{ borderBottom:"var(--border-default)" }}>
                <StatItem number="15" label="Projects built"  delay={0.35} />
              </div>
              <div style={{ borderRight:"var(--border-default)" }}>
                <StatItem number="A+" label="Thesis grade"    delay={0.40} />
              </div>
              <div>
                <StatItem number="∞"  label="Passion driven"  delay={0.45} />
              </div>
            </div>
          </div>

          {/* ── PHOTO ── */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
            style={{ marginTop: 28 }}
          >
            <div
              style={{
                fontSize:      "var(--text-tag)",
                letterSpacing: "var(--tracking-widest)",
                textTransform: "uppercase",
                color:         "var(--color-gold-dim)",
                marginBottom:  12,
              }}
            >
              Ahmed Attia
            </div>

            {/*
              ── YOUR PHOTO ──
              1. Drop your photo into /public/images/ahmed-attia.jpg
              2. The Image tag below is ready — just make sure the file exists
              3. For best results: dark background, portrait orientation
                 recommended size: 600×520px minimum
            */}
            <div
              style={{
                width:    "100%",
                height:   "clamp(260px, 45vw, 600px)",
                position: "relative",
                overflow: "hidden",
                border:   "var(--border-default)",
              }}
            >
              <Image
                src={myImage}
                alt="Ahmed Attia — Frontend Developer"
                fill
                style={{
                  objectFit:   "cover",
                  objectPosition: "center top",
                  filter:      "brightness(0.75) contrast(1.1) grayscale(0.2)",
                  /*
                    filter breakdown:
                    brightness(0.75) — darkens to match dark gold palette
                    contrast(1.1)    — adds crispness
                    grayscale(0.2)   — slight desaturation for premium feel
                    Remove or adjust once you add your real photo
                  */
                }}
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />

              {/* Gold overlay tint */}
              <div
                style={{
                  position:   "absolute",
                  inset:      0,
                  background: "linear-gradient(to top, rgba(9,9,10,0.5) 0%, transparent 60%)",
                  zIndex:     1,
                }}
              />

              {/* Corner marks */}
              {(
                [
                  { top:12,    left:12,  borderTop:"1px solid var(--color-gold-dim)",    borderLeft:"1px solid var(--color-gold-dim)"   },
                  { top:12,    right:12, borderTop:"1px solid var(--color-gold-dim)",    borderRight:"1px solid var(--color-gold-dim)"  },
                  { bottom:12, left:12,  borderBottom:"1px solid var(--color-gold-dim)", borderLeft:"1px solid var(--color-gold-dim)"   },
                  { bottom:12, right:12, borderBottom:"1px solid var(--color-gold-dim)", borderRight:"1px solid var(--color-gold-dim)"  },
                ] as React.CSSProperties[]
              ).map((s, i) => (
                <span key={i} style={{ position:"absolute", width:20, height:20, zIndex:2, ...s }} />
              ))}

              {/* Name overlay at bottom */}
              <div
                style={{
                  position:      "absolute",
                  bottom:        16,
                  left:          16,
                  zIndex:        3,
                  fontFamily:    "var(--font-display)",
                  fontStyle:     "italic",
                  fontSize:      13,
                  color:         "var(--color-gold-dim)",
                  letterSpacing: "var(--tracking-wide)",
                }}
              >
                Ahmed Attia · Cairo
              </div>
            </div>
          </motion.div>

          {/* ── PULL QUOTE ── */}
          <motion.blockquote
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.75, delay: 0.6, ease: [0.23, 1, 0.32, 1] }}
            style={{
              fontFamily:  "var(--font-display)",
              fontStyle:   "italic",
              fontSize:    17,
              color:       "var(--color-ink-muted)",
              lineHeight:  "var(--leading-snug)",
              borderLeft:  "2px solid var(--color-gold-dim)",
              paddingLeft: 18,
              marginTop:   28,
            }}
          >
            &ldquo;Engineering precision meets creative craft — I build
            interfaces that feel inevitable, not accidental.&rdquo;
          </motion.blockquote>

        </div>
      </div>
    </section>
  );
}
