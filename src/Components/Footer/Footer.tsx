"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

function FooterLink({ href, label, external = false }: { href: string; label: string; external?: boolean }) {
  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      style={{ fontSize:"var(--text-tag)", letterSpacing:"var(--tracking-wide)", textTransform:"uppercase", color:"var(--color-ink-muted)", textDecoration:"none", transition:"color var(--anim-fast)", fontFamily:"var(--font-body)", display:"block", paddingBottom:6 }}
      onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-gold-primary)")}
      onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-ink-muted)")}
    >
      {label}
    </Link>
  );
}

export default function Footer() {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const navLinks = [
    { label:"Home",     href:"/"         },
    { label:"About",    href:"/about"    },
    { label:"Projects", href:"/projects" },
    { label:"Contact",  href:"/contact"  },
  ];

  const socialLinks = [
    { label:"GitHub",   href:"https://github.com/AttiaX125",                    },
    { label:"LinkedIn", href:"https://linkedin.com/in/ahmed-attia-b299952b0",   },
    { label:"Email",    href:"mailto:AttiaX125@gmail.com",                      },
    { label:"Phone",    href:"tel:+201100074690",                                },
  ];

  return (
    <footer ref={ref} style={{ background:"var(--color-bg-secondary)", borderTop:"var(--border-default)", position:"relative" }}>

      {/* Top gold rule */}
      <div style={{ position:"absolute", top:0, left:"var(--space-page-x)", right:"var(--space-page-x)", height:1, background:"linear-gradient(90deg, transparent, var(--color-gold-dim) 30%, var(--color-gold-dim) 70%, transparent)" }} />

      {/* ── MAIN BODY ── */}
      <div
        className="grid grid-cols-1 md:grid-cols-[1fr_1px_1fr_1px_1fr] gap-8 md:gap-0"
        style={{ padding:"52px var(--space-page-x) 40px" }}
      >

        {/* Col 1 — Logo + tagline */}
        <motion.div
          initial={{ opacity:0, y:20 }} animate={inView ? { opacity:1, y:0 } : {}}
          transition={{ duration:0.6, delay:0.1, ease:[0.23,1,0.32,1] }}
          style={{ display:"flex", flexDirection:"column", justifyContent:"space-between", gap:24 }}
        >
          <Link href="/">
            <div style={{ fontFamily:"var(--font-display)", fontSize:22, fontWeight:300, color:"var(--color-gold-primary)", letterSpacing:"4px", textTransform:"uppercase" }}>
              Vorrex
            </div>
          </Link>

          <div>
            <p style={{ fontFamily:"var(--font-display)", fontStyle:"italic", fontSize:16, color:"var(--color-ink-muted)", lineHeight:"var(--leading-snug)", marginBottom:20 }}>
              &ldquo;Open to new projects —<br />let&apos;s build something great.&rdquo;
            </p>
            <div style={{ display:"flex", alignItems:"center", gap:8 }}>
              <span style={{ position:"relative", display:"flex", width:7, height:7 }}>
                <span style={{ position:"absolute", inset:0, borderRadius:"50%", background:"var(--color-status-available)", opacity:0.6, animation:"ping-slow 2s ease-in-out infinite" }} />
                <span style={{ position:"relative", display:"inline-flex", borderRadius:"50%", width:7, height:7, background:"var(--color-status-available)" }} />
              </span>
              <span style={{ fontSize:"var(--text-tag)", letterSpacing:"var(--tracking-wide)", textTransform:"uppercase", color:"var(--color-status-available)" }}>
                Available for work
              </span>
            </div>
          </div>
        </motion.div>

        {/* Vertical rule 1 — desktop only */}
        <div className="rule-gold-v hidden md:block" />

        {/* Col 2 — Navigation */}
        <motion.div
          initial={{ opacity:0, y:20 }} animate={inView ? { opacity:1, y:0 } : {}}
          transition={{ duration:0.6, delay:0.2, ease:[0.23,1,0.32,1] }}
          className="md:px-10"
        >
          <span style={{ fontSize:"var(--text-tag)", letterSpacing:"var(--tracking-widest)", textTransform:"uppercase", color:"var(--color-gold-dim)", marginBottom:20, display:"block" }}>
            Navigation
          </span>
          {navLinks.map((link) => (
            <FooterLink key={link.href} href={link.href} label={link.label} />
          ))}
        </motion.div>

        {/* Vertical rule 2 — desktop only */}
        <div className="rule-gold-v hidden md:block" />

        {/* Col 3 — Social + location */}
        <motion.div
          initial={{ opacity:0, y:20 }} animate={inView ? { opacity:1, y:0 } : {}}
          transition={{ duration:0.6, delay:0.3, ease:[0.23,1,0.32,1] }}
          className="md:pl-10 flex flex-col justify-between gap-6"
        >
          <div>
            <span style={{ fontSize:"var(--text-tag)", letterSpacing:"var(--tracking-widest)", textTransform:"uppercase", color:"var(--color-gold-dim)", marginBottom:20, display:"block" }}>
              Connect
            </span>
            {socialLinks.map((link) => (
              <FooterLink key={link.href} href={link.href} label={link.label} external={link.href.startsWith("http")} />
            ))}
          </div>

          <div style={{ paddingTop:20, borderTop:"var(--border-default)" }}>
            <span style={{ fontSize:"var(--text-tag)", letterSpacing:"var(--tracking-widest)", textTransform:"uppercase", color:"var(--color-ink-dim)", display:"block", marginBottom:6 }}>Based in</span>
            <span style={{ fontFamily:"var(--font-display)", fontSize:18, color:"var(--color-ink-muted)", fontWeight:300, display:"block", marginBottom:4 }}>Cairo, Egypt</span>
            <span style={{ fontSize:"var(--text-tag)", color:"var(--color-ink-dim)", letterSpacing:"1px" }}>Hadayek El Ahram, Giza</span>
          </div>
        </motion.div>

      </div>

      {/* ── BOTTOM BAR ── */}
      <div
        style={{ borderTop:"var(--border-default)", padding:"14px var(--space-page-x)", display:"flex", justifyContent:"space-between", alignItems:"center", background:"var(--color-bg-primary)", flexWrap:"wrap", gap:8 }}
      >
        <span style={{ fontSize:"var(--text-tag)", letterSpacing:"var(--tracking-wide)", color:"var(--color-ink-dim)" }}>
          © {new Date().getFullYear()} Ahmed Attia — All rights reserved
        </span>
        <span style={{ fontSize:"var(--text-tag)", letterSpacing:"var(--tracking-wide)", color:"var(--color-ink-dim)" }}>
          B.Sc. Mechatronics · Nile University
        </span>
      </div>

    </footer>
  );
}
