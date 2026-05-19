"use client";

import Link from "next/link";
import Image from "next/image";
import img from "../../../public/Untitled (1).png";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

/* ─────────────────────────────────────────
   FOOTER LINK
───────────────────────────────────────── */
function FooterLink({
  href,
  label,
  external = false,
}: {
  href: string;
  label: string;
  external?: boolean;
}) {
  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      style={{
        fontSize: "var(--text-tag)",
        letterSpacing: "var(--tracking-wide)",
        textTransform: "uppercase",
        color: "var(--color-ink-muted)",
        textDecoration: "none",
        transition: "color var(--anim-fast)",
        fontFamily: "var(--font-body)",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.color = "var(--color-gold-primary)")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.color = "var(--color-ink-muted)")
      }
    >
      {label}
    </Link>
  );
}

/* ─────────────────────────────────────────
   FOOTER
───────────────────────────────────────── */
export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const navLinks = [
    { label: "Home",     href: "/"         },
    { label: "About",    href: "/about"    },
    { label: "Projects", href: "/projects" },
    { label: "Contact",  href: "/contact"  },
  ];

  const socialLinks = [
    { label: "GitHub",   href: "https://github.com/AttiaX125",                          external: true  },
    { label: "LinkedIn", href: "https://linkedin.com/in/ahmed-attia-b299952b0",         external: true  },
    { label: "Email",    href: "mailto:AttiaX125@gmail.com",                            external: false },
    { label: "Phone",    href: "tel:+201100074690",                                     external: false },
  ];

  return (
    <footer
      ref={ref}
      style={{
        background:  "var(--color-bg-secondary)",
        borderTop:   "var(--border-default)",
        position:    "relative",
      }}
    >
      {/* ── TOP GOLD RULE ── */}
      <div
        style={{
          position:   "absolute",
          top:        0,
          left:       "var(--space-page-x)",
          right:      "var(--space-page-x)",
          height:     1,
          background: "linear-gradient(90deg, transparent, var(--color-gold-dim) 30%, var(--color-gold-dim) 70%, transparent)",
        }}
      />

      {/* ── MAIN FOOTER BODY ── */}
      <div
        style={{
          padding:  "52px var(--space-page-x) 40px",
          display:  "grid",
          gridTemplateColumns: "1fr 1px 1fr 1px 1fr",
          gap:      0,
          minHeight: 200,
        }}
      >

        {/* ── COL 1 — Logo + tagline ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
          style={{
            display:        "flex",
            flexDirection:  "column",
            justifyContent: "space-between",
            paddingRight:   40,
          }}
        >
          {/* Logo */}
          <Link href="/">
            <Image
              src={img}
              alt="Vorrex Logo"
              height={60}
              width={200}
              style={{ opacity: 0.9 }}
            />
          </Link>

          {/* Tagline */}
          <div>
            <p
              style={{
                fontFamily:  "var(--font-display)",
                fontStyle:   "italic",
                fontSize:    17,
                color:       "var(--color-ink-muted)",
                lineHeight:  "var(--leading-snug)",
                marginBottom: 20,
              }}
            >
              "Open to new projects —<br />let's build something."
            </p>

            {/* Available badge — uses Tailwind animate-ping */}
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span className="relative flex" style={{ width: 7, height: 7 }}>
                <span
                  className="animate-ping absolute inline-flex h-full w-full rounded-full"
                  style={{ background: "var(--color-status-available)", opacity: 0.6 }}
                />
                <span
                  className="relative inline-flex rounded-full"
                  style={{ width: 7, height: 7, background: "var(--color-status-available)" }}
                />
              </span>
              <span
                style={{
                  fontSize:      "var(--text-tag)",
                  letterSpacing: "var(--tracking-wide)",
                  textTransform: "uppercase",
                  color:         "var(--color-status-available)",
                }}
              >
                Available for work
              </span>
            </div>

            {/* CV Download */}
            <div style={{ marginTop: 16 }}>
              <a
                href="/Ahmed-Attia-CV.pdf"
                download="Ahmed-Attia-CV.pdf"
                style={{
                  fontSize:      "var(--text-tag)",
                  letterSpacing: "var(--tracking-wide)",
                  textTransform: "uppercase",
                  color:         "var(--color-gold-dim)",
                  textDecoration: "none",
                  transition:    "color var(--anim-fast)",
                  fontFamily:    "var(--font-body)",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "var(--color-gold-primary)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "var(--color-gold-dim)")
                }
              >
                Download CV →
              </a>
            </div>
          </div>
        </motion.div>

        {/* ── VERTICAL RULE 1 ── */}
        <div className="rule-gold-v" />

        {/* ── COL 2 — Nav links ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
          style={{
            padding:       "0 40px",
            display:       "flex",
            flexDirection: "column",
            gap:           4,
          }}
        >
          <span
            style={{
              fontSize:      "var(--text-tag)",
              letterSpacing: "var(--tracking-widest)",
              textTransform: "uppercase",
              color:         "var(--color-gold-dim)",
              marginBottom:  16,
            }}
          >
            Navigation
          </span>
          {navLinks.map((link) => (
            <FooterLink key={link.href} href={link.href} label={link.label} />
          ))}
        </motion.div>

        {/* ── VERTICAL RULE 2 ── */}
        <div className="rule-gold-v" />

        {/* ── COL 3 — Social + location ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
          style={{
            paddingLeft:    40,
            display:        "flex",
            flexDirection:  "column",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <span
              style={{
                fontSize:      "var(--text-tag)",
                letterSpacing: "var(--tracking-widest)",
                textTransform: "uppercase",
                color:         "var(--color-gold-dim)",
                marginBottom:  16,
              }}
            >
              Connect
            </span>
            {socialLinks.map((link) => (
              <FooterLink
                key={link.href}
                href={link.href}
                label={link.label}
                external={link.external}
              />
            ))}
          </div>

          {/* Location */}
          <div
            style={{
              marginTop:     32,
              paddingTop:    20,
              borderTop:     "var(--border-default)",
            }}
          >
            <span
              style={{
                fontSize:      "var(--text-tag)",
                letterSpacing: "var(--tracking-widest)",
                textTransform: "uppercase",
                color:         "var(--color-ink-dim)",
                display:       "block",
                marginBottom:  4,
              }}
            >
              Based in
            </span>
            <span
              style={{
                fontFamily:    "var(--font-display)",
                fontSize:      20,
                color:         "var(--color-ink-muted)",
                fontWeight:    300,
              }}
            >
              Giza, Egypt
            </span>
            <span
              style={{
                display:       "block",
                fontSize:      "var(--text-tag)",
                letterSpacing: "1px",
                color:         "var(--color-ink-dim)",
                marginTop:     4,
              }}
            >
              Hadayek El Ahram
            </span>
          </div>
        </motion.div>

      </div>

      {/* ── BOTTOM BAR ── */}
      <div
        style={{
          borderTop:     "var(--border-default)",
          padding:       "14px var(--space-page-x)",
          display:       "flex",
          justifyContent: "space-between",
          alignItems:    "center",
          background:    "var(--color-bg-primary)",
        }}
      >
        <span
          style={{
            fontSize:      "var(--text-tag)",
            letterSpacing: "var(--tracking-wide)",
            color:         "var(--color-ink-dim)",
          }}
        >
          © {new Date().getFullYear()} Ahmed Attia — All rights reserved
        </span>

        <span
          style={{
            fontSize:      "var(--text-tag)",
            letterSpacing: "var(--tracking-wide)",
            color:         "var(--color-ink-dim)",
          }}
        >
          Built with Next.js · Framer Motion · TailwindCSS
        </span>
      </div>

    </footer>
  );
}
