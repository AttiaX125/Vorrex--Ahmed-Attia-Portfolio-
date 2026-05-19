"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

/* ─────────────────────────────────────────
   SKILL ROW
───────────────────────────────────────── */
function SkillRow({ label, percent, delay }: { label: string; percent: number; delay: number }) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div
      ref={ref}
      style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"11px 0", borderBottom:"var(--border-default)" }}
    >
      <span style={{ fontSize:"var(--text-body-sm)", color:"var(--color-ink-muted)", fontWeight:300, letterSpacing:"0.5px" }}>
        {label}
      </span>
      <div style={{ width:120, height:2, background:"var(--color-ink-dim)", position:"relative", overflow:"hidden" }}>
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${percent}%` } : { width: 0 }}
          transition={{ duration: 1, delay, ease: [0.23, 1, 0.32, 1] }}
          style={{ position:"absolute", top:0, left:0, height:"100%", background:"var(--color-gold-primary)" }}
        />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   ABOUT STRIP
───────────────────────────────────────── */
export default function AboutStrip() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView     = useInView(sectionRef, { once: true, margin: "-80px" });

  const skills = [
    { label: "React.js / Next.js",   percent: 95 },
    { label: "TypeScript / JS",      percent: 90 },
    { label: "Framer Motion / GSAP", percent: 85 },
    { label: "UI / UX & Figma",      percent: 80 },
    { label: "Testing (Jest / RTL)", percent: 75 },
  ];

  const pillars = [
    { icon:"⬡", title:"Frontend",  sub:"React · Next.js · TypeScript" },
    { icon:"◈", title:"Motion",    sub:"Framer Motion · GSAP"         },
    { icon:"◇", title:"Quality",   sub:"WCAG · Jest · A11y"           },
  ];

  const learning = [
    "Backend .NET · Route",
    "GraphQL",
    "Docker",
    "Storybook",
    "PWA",
    "Web Vitals",
  ];

  return (
    <section ref={sectionRef} style={{ borderBottom:"var(--border-default)" }}>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1px 1fr" }}>

        {/* ══════════════ LEFT — Story ══════════════ */}
        <div style={{ padding:"52px var(--space-page-x)", display:"flex", flexDirection:"column", justifyContent:"space-between", gap:32 }}>

          {/* Label */}
          <motion.div
            initial={{ opacity:0, y:16 }} animate={inView ? { opacity:1, y:0 } : {}}
            transition={{ duration:0.6, delay:0.1, ease:[0.23,1,0.32,1] }}
            style={{ fontSize:"var(--text-tag)", letterSpacing:"var(--tracking-widest)", textTransform:"uppercase", color:"var(--color-gold-dim)", display:"flex", alignItems:"center", gap:12 }}
          >
            <span style={{ display:"block", width:22, height:1, background:"var(--color-gold-dim)" }} />
            About me
          </motion.div>

          {/* Story */}
          <motion.div
            initial={{ opacity:0, y:24 }} animate={inView ? { opacity:1, y:0 } : {}}
            transition={{ duration:0.75, delay:0.2, ease:[0.23,1,0.32,1] }}
          >
            <h2 style={{ fontFamily:"var(--font-display)", fontSize:"clamp(28px, 3vw, 40px)", fontWeight:300, lineHeight:1.25, color:"var(--color-ink-primary)", marginBottom:20 }}>
              Mechatronics engineer turned{" "}
              <em style={{ fontStyle:"italic", color:"var(--color-gold-primary)" }}>frontend developer</em>{" "}
              — building the web with precision and craft.
            </h2>

            <p style={{ fontSize:"var(--text-body)", lineHeight:"var(--leading-body)", color:"var(--color-ink-muted)", fontWeight:300, maxWidth:400, marginBottom:20 }}>
              Based in Cairo, Egypt — I bring an engineering problem-solving
              mindset to every interface I build. From a B.Sc. in Mechatronics
              at Nile University to production React apps serving 1,000+
              monthly visitors at Andalusia Village.
            </p>

            <p style={{ fontSize:"var(--text-body)", lineHeight:"var(--leading-body)", color:"var(--color-ink-muted)", fontWeight:300, maxWidth:400 }}>
              Currently expanding into full-stack development — learning
              backend .NET with Route Academy while teaching STEM at
              Core West College.
            </p>
          </motion.div>

          {/* Language badges */}
          <motion.div
            initial={{ opacity:0, y:16 }} animate={inView ? { opacity:1, y:0 } : {}}
            transition={{ duration:0.6, delay:0.3, ease:[0.23,1,0.32,1] }}
            style={{ display:"flex", flexDirection:"column", gap:12 }}
          >
            <div style={{ fontSize:"var(--text-tag)", letterSpacing:"var(--tracking-widest)", textTransform:"uppercase", color:"var(--color-gold-dim)" }}>
              Languages
            </div>
            <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
              {[
                { lang:"Arabic",  level:"Native"       },
                { lang:"English", level:"Professional"  },
                { lang:"German",  level:"Beginner (A2)" },
              ].map(({ lang, level }) => (
                <div key={lang} style={{ border:"var(--border-default)", padding:"6px 14px", display:"flex", flexDirection:"column", gap:2 }}>
                  <span style={{ fontSize:"var(--text-body-sm)", color:"var(--color-ink-primary)", fontWeight:300 }}>{lang}</span>
                  <span style={{ fontSize:"var(--text-tag)", letterSpacing:"1px", color:"var(--color-gold-dim)", textTransform:"uppercase" }}>{level}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity:0, y:16 }} animate={inView ? { opacity:1, y:0 } : {}}
            transition={{ duration:0.6, delay:0.4, ease:[0.23,1,0.32,1] }}
          >
            <Link href="/about" className="btn-gold">Read Full Story →</Link>
          </motion.div>

        </div>

        {/* ══════════════ VERTICAL RULE ══════════════ */}
        <div className="rule-gold-v" />

        {/* ══════════════ RIGHT — Skills ══════════════ */}
        <div style={{ padding:"52px var(--space-page-x)", background:"var(--color-bg-secondary)", display:"flex", flexDirection:"column", gap:32 }}>

          {/* Proficiency label */}
          <motion.div
            initial={{ opacity:0, y:16 }} animate={inView ? { opacity:1, y:0 } : {}}
            transition={{ duration:0.6, delay:0.15, ease:[0.23,1,0.32,1] }}
            style={{ fontSize:"var(--text-tag)", letterSpacing:"var(--tracking-widest)", textTransform:"uppercase", color:"var(--color-gold-dim)", display:"flex", alignItems:"center", gap:12 }}
          >
            <span style={{ display:"block", width:22, height:1, background:"var(--color-gold-dim)" }} />
            Proficiency
          </motion.div>

          {/* Skill bars */}
          <div style={{ display:"flex", flexDirection:"column" }}>
            {skills.map((skill, i) => (
              <SkillRow key={skill.label} label={skill.label} percent={skill.percent} delay={0.2 + i * 0.08} />
            ))}
          </div>

          <div className="rule-gold" />

          {/* Currently learning */}
          <motion.div
            initial={{ opacity:0, y:16 }} animate={inView ? { opacity:1, y:0 } : {}}
            transition={{ duration:0.6, delay:0.35, ease:[0.23,1,0.32,1] }}
          >
            <div style={{ fontSize:"var(--text-tag)", letterSpacing:"var(--tracking-widest)", textTransform:"uppercase", color:"var(--color-gold-dim)", marginBottom:14, display:"flex", alignItems:"center", gap:10 }}>
              <span style={{ display:"block", width:14, height:1, background:"var(--color-gold-dim)" }} />
              Currently learning
            </div>
            <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
              {learning.map((item) => (
                <span
                  key={item}
                  style={{
                    fontSize:"var(--text-tag)", letterSpacing:"1.5px", textTransform:"uppercase",
                    color: item === "Backend .NET · Route" ? "var(--color-gold-primary)" : "var(--color-gold-dim)",
                    border: item === "Backend .NET · Route" ? "1px solid var(--color-gold-dim)" : "var(--border-default)",
                    padding:"4px 10px", fontFamily:"var(--font-body)",
                    fontWeight: item === "Backend .NET · Route" ? 500 : 400,
                  }}
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>

          <div className="rule-gold" />

          {/* Three pillars */}
          <motion.div
            initial={{ opacity:0, y:16 }} animate={inView ? { opacity:1, y:0 } : {}}
            transition={{ duration:0.6, delay:0.5, ease:[0.23,1,0.32,1] }}
            style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:0, border:"var(--border-default)" }}
          >
            {pillars.map((item, i) => (
              <div
                key={item.title}
                style={{ padding:"18px 16px", borderRight:i<2?"var(--border-default)":"none", textAlign:"center", display:"flex", flexDirection:"column", gap:6 }}
              >
                <span style={{ fontSize:20, color:"var(--color-gold-dim)", lineHeight:1 }}>{item.icon}</span>
                <span style={{ fontSize:"var(--text-label)", letterSpacing:"var(--tracking-wide)", textTransform:"uppercase", color:"var(--color-ink-primary)", fontWeight:400 }}>{item.title}</span>
                <span style={{ fontSize:"var(--text-tag)", color:"var(--color-ink-muted)", lineHeight:1.5 }}>{item.sub}</span>
              </div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
