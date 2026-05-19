"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import myImage from "../../../public/images/ahmed-attia.jpeg";

/* ─────────────────────────────────────────
   TIMELINE ITEM
───────────────────────────────────────── */
function TimelineItem({
  year,
  title,
  sub,
  desc,
  delay,
}: {
  year: string;
  title: string;
  sub: string;
  desc: string;
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.23, 1, 0.32, 1] }}
      style={{
        display: "grid",
        gridTemplateColumns: "72px 1px 1fr",
        gap: 0,
        minHeight: 80,
      }}
    >
      <div style={{ paddingTop: 4, paddingRight: 16, textAlign: "right" }}>
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontStyle: "italic",
            fontSize: 13,
            color: "var(--color-gold-dim)",
            letterSpacing: "1px",
          }}
        >
          {year}
        </span>
      </div>
      <div
        style={{
          position: "relative",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: 1,
            height: "100%",
            background: "var(--color-ink-dim)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 6,
            width: 7,
            height: 7,
            borderRadius: "50%",
            background: "var(--color-gold-primary)",
            border: "2px solid var(--color-bg-primary)",
            zIndex: 1,
          }}
        />
      </div>
      <div style={{ paddingLeft: 24, paddingBottom: 36 }}>
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 20,
            fontWeight: 300,
            color: "var(--color-ink-primary)",
            marginBottom: 2,
            lineHeight: 1.2,
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontSize: "var(--text-tag)",
            letterSpacing: "var(--tracking-wide)",
            textTransform: "uppercase",
            color: "var(--color-gold-dim)",
            marginBottom: 8,
          }}
        >
          {sub}
        </div>
        <p
          style={{
            fontSize: "var(--text-body-sm)",
            lineHeight: "var(--leading-body-sm)",
            color: "var(--color-ink-muted)",
            fontWeight: 300,
            maxWidth: 380,
          }}
        >
          {desc}
        </p>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   TOOL BADGE
───────────────────────────────────────── */
function ToolBadge({ label }: { label: string }) {
  return (
    <span
      style={{
        fontSize: "var(--text-tag)",
        letterSpacing: "1.5px",
        textTransform: "uppercase",
        color: "var(--color-gold-dim)",
        border: "var(--border-default)",
        padding: "6px 14px",
        transition: "border-color var(--anim-base), color var(--anim-base)",
        fontFamily: "var(--font-body)",
        cursor: "default",
        display: "inline-block",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "var(--color-gold-dim)";
        e.currentTarget.style.color = "var(--color-gold-primary)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--color-ink-dim)";
        e.currentTarget.style.color = "var(--color-gold-dim)";
      }}
    >
      {label}
    </span>
  );
}

/* ─────────────────────────────────────────
   VALUE CARD
───────────────────────────────────────── */
function ValueCard({
  icon,
  title,
  desc,
  delay,
}: {
  icon: string;
  title: string;
  desc: string;
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.23, 1, 0.32, 1] }}
      style={{
        border: "var(--border-default)",
        padding: "24px",
        background: "var(--color-bg-secondary)",
        position: "relative",
        overflow: "hidden",
        transition: "border-color var(--anim-base)",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.borderColor = "var(--color-gold-dim)")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.borderColor = "var(--color-ink-dim)")
      }
    >
      <div
        style={{
          fontSize: 24,
          marginBottom: 12,
          color: "var(--color-gold-dim)",
          lineHeight: 1,
        }}
      >
        {icon}
      </div>
      <div
        style={{
          fontFamily: "var(--font-display)",
          fontSize: 18,
          fontWeight: 300,
          color: "var(--color-ink-primary)",
          marginBottom: 6,
        }}
      >
        {title}
      </div>
      <p
        style={{
          fontSize: "var(--text-body-sm)",
          lineHeight: "var(--leading-body-sm)",
          color: "var(--color-ink-muted)",
          fontWeight: 300,
        }}
      >
        {desc}
      </p>
      <span
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          width: 20,
          height: 20,
          borderBottom: "1px solid var(--color-gold-dim)",
          borderRight: "1px solid var(--color-gold-dim)",
          opacity: 0.5,
        }}
      />
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   ABOUT PAGE
───────────────────────────────────────── */
export default function AboutPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroView = useInView(heroRef, { once: true });
  const toolsRef = useRef<HTMLDivElement>(null);
  const toolsView = useInView(toolsRef, { once: true, margin: "-60px" });

  /* ── Timeline — real CV data + Route diploma ── */
  const timeline = [
    {
      year: "2025",
      title: "Frontend Development Diploma",
      sub: "Route Academy · Egypt",
      desc: "Intensive frontend diploma covering React.js, JavaScript ES6+, TypeScript, REST API integration, responsive design, and modern tooling. Hands-on project-based curriculum with real-world deliverables.",
    },
    {
      year: "2025",
      title: "STEM Instructor",
      sub: "Core West College · El Sheikh Zayed",
      desc: "Delivering STEM workshops in coding, robotics, and critical thinking to 25+ students per semester — achieving 95%+ student satisfaction rating. Guiding students through hands-on Arduino and sensor projects.",
    },
    {
      year: "2024",
      title: "Frontend Developer",
      sub: "Andalusia Village · Egypt",
      desc: "Building responsive, WCAG-compliant web interfaces with React, JavaScript, and Tailwind CSS. Reduced UI bugs by ~40%, built 10+ reusable components, and integrated live property listings via RESTful APIs for 1,000+ monthly visitors.",
    },
    {
      year: "2024",
      title: "B.Sc. Mechatronics Engineering",
      sub: "Nile University · Egypt · Grade A+",
      desc: "Graduated with distinction. Thesis: Middle East's first EEG-controlled smart prosthetic arm — real-time signal processing pipeline for gesture recognition with a 3D-printed ergonomic prototype.",
    },
    {
      year: "2022",
      title: "Team Leader — Suspension & Steering",
      sub: "EVER · National Electric Vehicle Competition",
      desc: "Led a 6-member team to design and fabricate suspension and steering systems using SolidWorks CAD. Secured 1st place in Egypt's national EVER Electric Vehicle Rally — team's first national championship.",
    },
    {
      year: "2022",
      title: "Embedded Systems Diploma",
      sub: "IMT · Egypt",
      desc: "C++, Microcontroller Architecture, Real-Time Systems, and Hardware Debugging. Foundation for engineering-first approach to software development.",
    },
    {
      year: "2018",
      title: "Flight Maintenance Trainee",
      sub: "EASA · 6th of October Airport",
      desc: "Intensive training in aircraft mechanical, electrical, and electronic systems under strict safety procedures. Built the attention to detail that defines my code quality today.",
    },
  ];

  /* ── Tools — real from CV ── */
  const tools = [
    "React.js",
    "Next.js",
    "TypeScript",
    "JavaScript ES6+",
    "Tailwind CSS",
    "Bootstrap",
    "Sass",
    "CSS3",
    "HTML5",
    "Framer Motion",
    "Redux Toolkit",
    "Zustand",
    "Context API",
    "React Router",
    "React Hooks",
    "Jest",
    "React Testing Library",
    "REST APIs",
    "Node.js",
    "Chart.js",
    "Figma",
    "Git",
    "GitHub",
    "Vite",
    "Webpack",
    "GitHub Actions",
    "Arduino",
    "Python",
    "SolidWorks",
    "C++",
    ".NET (Learning)",
    "C#",
    "ASP.NET Core",
  ];

  /* ── Values ── */
  const values = [
    {
      icon: "◈",
      title: "Engineering precision",
      desc: "A Mechatronics degree means I solve problems systematically. Every bug is a puzzle. Every feature is a system. I don't guess — I diagnose.",
    },
    {
      icon: "⬡",
      title: "Accessibility first",
      desc: "WCAG compliance isn't a checkbox for me — it's a baseline. Every interface I build is keyboard-navigable, screen-reader friendly, and tested.",
    },
    {
      icon: "◇",
      title: "Motion with purpose",
      desc: "Every animation I add earns its place. If it doesn't serve the user or guide attention, it doesn't ship.",
    },
    {
      icon: "○",
      title: "Always learning",
      desc: "Currently mastering backend .NET with Route Academy alongside GraphQL, Docker, and Web Vitals. The web moves fast — I stay ahead.",
    },
  ];

  /* ── Certifications ── */
  const certs = [
    {
      title: "Frontend Dev with React.js",
      year: "2025",
      desc: "React, JS ES6+, HTML5, CSS3, Git, API integration, React Hooks, React Router",
    },
    {
      title: "Backend Development with .NET",
      year: "2025 — Present",
      desc: "ASP.NET Core, C#, Entity Framework, REST API development, SQL Server — currently in progress at Route Academy.",
    },
    {
      title: "Embedded Systems Diploma",
      year: "2022",
      desc: "C++, Microcontroller Architecture, Real-Time Systems, Hardware Debugging — IMT Egypt.",
    },
  ];

  return (
    <div>
      {/* ── PAGE HERO ── */}
      <div
        ref={heroRef}
        style={{
          padding: "64px var(--space-page-x) 56px",
          borderBottom: "var(--border-default)",
          display: "grid",
          gridTemplateColumns: "1fr 1px 1fr",
          position: "relative",
        }}
      >
        <span
          style={{
            position: "absolute",
            top: 20,
            left: 20,
            width: 28,
            height: 28,
            borderTop: "1px solid var(--color-gold-dim)",
            borderLeft: "1px solid var(--color-gold-dim)",
          }}
        />
        <span
          style={{
            position: "absolute",
            top: 20,
            right: 20,
            width: 28,
            height: 28,
            borderTop: "1px solid var(--color-gold-dim)",
            borderRight: "1px solid var(--color-gold-dim)",
          }}
        />

        {/* Left */}
        <div
          style={{
            paddingRight: "var(--space-page-x)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            gap: 28,
          }}
        >
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={heroView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: 0.1,
                ease: [0.23, 1, 0.32, 1],
              }}
              style={{
                fontSize: "var(--text-tag)",
                letterSpacing: "var(--tracking-widest)",
                textTransform: "uppercase",
                color: "var(--color-gold-dim)",
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginBottom: 24,
              }}
            >
              <span
                style={{
                  display: "block",
                  width: 22,
                  height: 1,
                  background: "var(--color-gold-dim)",
                }}
              />
              About me
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={heroView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.75,
                delay: 0.2,
                ease: [0.23, 1, 0.32, 1],
              }}
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(44px, 5vw, 68px)",
                fontWeight: 300,
                lineHeight: 0.92,
                letterSpacing: "-1px",
                color: "var(--color-ink-primary)",
                marginBottom: 24,
              }}
            >
              Ahmed
              <em
                style={{
                  fontStyle: "italic",
                  color: "var(--color-gold-primary)",
                  display: "block",
                }}
              >
                Attia.
              </em>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={heroView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: 0.3,
                ease: [0.23, 1, 0.32, 1],
              }}
              style={{
                fontSize: "var(--text-body)",
                lineHeight: "var(--leading-body)",
                color: "var(--color-ink-muted)",
                fontWeight: 300,
                maxWidth: 400,
              }}
            >
              Frontend developer and Mechatronics engineer based in Cairo,
              Egypt. I build premium, animated, and accessible web experiences
              with React and Next.js — where engineering precision meets
              creative craft. Currently expanding into full-stack with .NET
              backend development.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={heroView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.6,
              delay: 0.45,
              ease: [0.23, 1, 0.32, 1],
            }}
            style={{ display: "flex", gap: 16, flexWrap: "wrap" }}
          >
            <Link href="/contact" className="btn-gold">
              Get in Touch
            </Link>
            <a
              href="/Ahmed-Attia-CV.pdf"
              download="Ahmed-Attia-CV.pdf"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                fontSize: "var(--text-tag)",
                letterSpacing: "var(--tracking-wider)",
                textTransform: "uppercase",
                color: "var(--color-ink-muted)",
                transition: "color var(--anim-fast)",
                fontFamily: "var(--font-body)",
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

        {/* Vertical rule */}
        <div className="rule-gold-v" />

        {/* Right — photo + facts */}
        <div
          style={{
            paddingLeft: "var(--space-page-x)",
            display: "flex",
            flexDirection: "column",
            gap: 24,
          }}
        >
          {/*
            ── PHOTO SLOT ──
            Drop your photo at: /public/images/ahmed-attia.jpg
            Then change src to: "/images/ahmed-attia.jpg"
          */}
          <div
            style={{
              width: "100%",
              height: "clamp(300px, 45vw, 600px)",
              position: "relative",
              overflow: "hidden",
              border: "var(--border-default)",
            }}
          >
            <Image
              src={myImage}
              alt="Ahmed Attia — Frontend Developer"
              fill
              style={{
                objectFit: "cover",
                objectPosition: "center top", // keeps your face in frame
                filter: "brightness(0.8) contrast(1.05)",
              }}
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to top, rgba(9,9,10,0.5) 0%, transparent 60%)",
                zIndex: 1,
              }}
            />
            {[
              {
                top: 12,
                left: 12,
                borderTop: "1px solid var(--color-gold-dim)",
                borderLeft: "1px solid var(--color-gold-dim)",
              },
              {
                top: 12,
                right: 12,
                borderTop: "1px solid var(--color-gold-dim)",
                borderRight: "1px solid var(--color-gold-dim)",
              },
              {
                bottom: 12,
                left: 12,
                borderBottom: "1px solid var(--color-gold-dim)",
                borderLeft: "1px solid var(--color-gold-dim)",
              },
              {
                bottom: 12,
                right: 12,
                borderBottom: "1px solid var(--color-gold-dim)",
                borderRight: "1px solid var(--color-gold-dim)",
              },
            ].map((s, i) => (
              <span
                key={i}
                style={{
                  position: "absolute",
                  width: 20,
                  height: 20,
                  zIndex: 2,
                  ...s,
                }}
              />
            ))}
            <div
              style={{
                position: "absolute",
                bottom: 14,
                left: 16,
                zIndex: 3,
                fontFamily: "var(--font-display)",
                fontStyle: "italic",
                fontSize: 13,
                color: "var(--color-gold-dim)",
                letterSpacing: "var(--tracking-wide)",
              }}
            >
              Ahmed Attia · Cairo, Egypt
            </div>
          </div>

          {/* Quick facts */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              border: "var(--border-default)",
            }}
          >
            {[
              { label: "Location", value: "Cairo, Egypt" },
              { label: "Experience", value: "1+ Year Production" },
              { label: "Education", value: "B.Sc. Mechatronics A+" },
              { label: "Availability", value: "Open to Work" },
            ].map((fact, i) => (
              <div
                key={fact.label}
                style={{
                  padding: "14px 16px",
                  borderRight: i % 2 === 0 ? "var(--border-default)" : "none",
                  borderBottom: i < 2 ? "var(--border-default)" : "none",
                }}
              >
                <div
                  style={{
                    fontSize: "var(--text-tag)",
                    letterSpacing: "var(--tracking-widest)",
                    textTransform: "uppercase",
                    color: "var(--color-gold-dim)",
                    marginBottom: 4,
                  }}
                >
                  {fact.label}
                </div>
                <div
                  style={{
                    fontSize: "var(--text-body-sm)",
                    color: "var(--color-ink-primary)",
                    fontWeight: 300,
                  }}
                >
                  {fact.value}
                </div>
              </div>
            ))}
          </div>

          {/* Contact strip */}
          <div
            style={{
              border: "var(--border-default)",
              padding: "14px 16px",
              display: "flex",
              flexDirection: "column",
              gap: 6,
            }}
          >
            <div
              style={{
                fontSize: "var(--text-tag)",
                letterSpacing: "var(--tracking-widest)",
                textTransform: "uppercase",
                color: "var(--color-gold-dim)",
                marginBottom: 4,
              }}
            >
              Contact
            </div>
            {[
              {
                label: "AttiaX125@gmail.com",
                href: "mailto:AttiaX125@gmail.com",
              },
              { label: "+20 110 007 4690", href: "tel:+201100074690" },
            ].map(({ label, href }) => (
              <a
                key={href}
                href={href}
                style={{
                  fontSize: "var(--text-body-sm)",
                  color: "var(--color-ink-muted)",
                  fontWeight: 300,
                  textDecoration: "none",
                  transition: "color var(--anim-fast)",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "var(--color-gold-primary)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "var(--color-ink-muted)")
                }
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── EXPERIENCE + VALUES ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1px 1fr",
          borderBottom: "var(--border-default)",
        }}
      >
        {/* Timeline */}
        <div style={{ padding: "52px var(--space-page-x)" }}>
          <div
            style={{
              fontSize: "var(--text-tag)",
              letterSpacing: "var(--tracking-widest)",
              textTransform: "uppercase",
              color: "var(--color-gold-dim)",
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 36,
            }}
          >
            <span
              style={{
                display: "block",
                width: 22,
                height: 1,
                background: "var(--color-gold-dim)",
              }}
            />
            Experience & Education
          </div>
          {timeline.map((item, i) => (
            <TimelineItem
              key={item.year + item.title}
              year={item.year}
              title={item.title}
              sub={item.sub}
              desc={item.desc}
              delay={i * 0.08}
            />
          ))}
        </div>

        <div className="rule-gold-v" />

        {/* Values */}
        <div
          style={{
            padding: "52px var(--space-page-x)",
            background: "var(--color-bg-secondary)",
          }}
        >
          <div
            style={{
              fontSize: "var(--text-tag)",
              letterSpacing: "var(--tracking-widest)",
              textTransform: "uppercase",
              color: "var(--color-gold-dim)",
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 36,
            }}
          >
            <span
              style={{
                display: "block",
                width: 22,
                height: 1,
                background: "var(--color-gold-dim)",
              }}
            />
            What I believe
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {values.map((v, i) => (
              <ValueCard
                key={v.title}
                icon={v.icon}
                title={v.title}
                desc={v.desc}
                delay={i * 0.1}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ── TOOLS ── */}
      <div
        ref={toolsRef}
        style={{
          padding: "52px var(--space-page-x)",
          borderBottom: "var(--border-default)",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={toolsView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
          style={{
            fontSize: "var(--text-tag)",
            letterSpacing: "var(--tracking-widest)",
            textTransform: "uppercase",
            color: "var(--color-gold-dim)",
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 28,
          }}
        >
          <span
            style={{
              display: "block",
              width: 22,
              height: 1,
              background: "var(--color-gold-dim)",
            }}
          />
          Tools & Technologies
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={toolsView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
          style={{ display: "flex", flexWrap: "wrap", gap: 10 }}
        >
          {tools.map((tool) => (
            <ToolBadge key={tool} label={tool} />
          ))}
        </motion.div>
      </div>

      {/* ── CERTIFICATIONS ── */}
      <div
        style={{
          padding: "52px var(--space-page-x)",
          borderBottom: "var(--border-default)",
          background: "var(--color-bg-secondary)",
        }}
      >
        <div
          style={{
            fontSize: "var(--text-tag)",
            letterSpacing: "var(--tracking-widest)",
            textTransform: "uppercase",
            color: "var(--color-gold-dim)",
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 28,
          }}
        >
          <span
            style={{
              display: "block",
              width: 22,
              height: 1,
              background: "var(--color-gold-dim)",
            }}
          />
          Certifications & Diplomas
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 16,
          }}
        >
          {certs.map((cert) => (
            <div
              key={cert.title}
              style={{
                border: "var(--border-default)",
                padding: "20px 22px",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: 8,
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 18,
                    fontWeight: 300,
                    color: "var(--color-ink-primary)",
                    lineHeight: 1.2,
                    maxWidth: "70%",
                  }}
                >
                  {cert.title}
                </div>
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontStyle: "italic",
                    fontSize: 12,
                    color: "var(--color-gold-dim)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {cert.year}
                </span>
              </div>
              <p
                style={{
                  fontSize: "var(--text-body-sm)",
                  color: "var(--color-ink-muted)",
                  fontWeight: 300,
                  lineHeight: "var(--leading-body-sm)",
                }}
              >
                {cert.desc}
              </p>
              <span
                style={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  width: 16,
                  height: 16,
                  borderBottom: "1px solid var(--color-gold-dim)",
                  borderRight: "1px solid var(--color-gold-dim)",
                  opacity: 0.4,
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* ── BOTTOM CTA ── */}
      <div
        style={{
          padding: "52px var(--space-page-x)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
          textAlign: "center",
        }}
      >
        <span
          style={{
            fontSize: "var(--text-tag)",
            letterSpacing: "var(--tracking-widest)",
            textTransform: "uppercase",
            color: "var(--color-gold-dim)",
          }}
        >
          Ready to work together?
        </span>
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(28px, 3vw, 44px)",
            fontWeight: 300,
            color: "var(--color-ink-primary)",
            lineHeight: 1.15,
          }}
        >
          Let&apos;s create something{" "}
          <em
            style={{ fontStyle: "italic", color: "var(--color-gold-primary)" }}
          >
            extraordinary.
          </em>
        </h3>
        <Link href="/contact" className="btn-gold" style={{ marginTop: 12 }}>
          Start a Conversation →
        </Link>
      </div>
    </div>
  );
}
