"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

type FormState = "idle" | "loading" | "success" | "error";

type FormData = {
  name:    string;
  email:   string;
  subject: string;
  message: string;
};

const CONTACT_CONFIG = {
  FORM_ENDPOINT: "https://formspree.io/f/xjgzkppa",
  FORM_METHOD:   "formspree" as "formspree" | "api",
};

function FormField({
  label,
  name,
  type       = "text",
  placeholder,
  value,
  onChange,
  required   = true,
  textarea   = false,
}: {
  label:       string;
  name:        string;
  type?:       string;
  placeholder: string;
  value:       string;
  onChange:    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  required?:   boolean;
  textarea?:   boolean;
}) {
  const [focused, setFocused] = useState(false);

  const sharedStyle: React.CSSProperties = {
    width:        "100%",
    background:   "var(--color-bg-tertiary)",
    border:       focused
      ? "1px solid var(--color-gold-dim)"
      : "var(--border-default)",
    color:        "var(--color-ink-primary)",
    fontFamily:   "var(--font-body)",
    fontSize:     "var(--text-body)",
    fontWeight:   300,
    padding:      "12px 14px",
    outline:      "none",
    transition:   "border-color var(--anim-fast)",
    resize:       "none",
    borderRadius: 0,
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <label
        htmlFor={name}
        style={{
          fontSize:      "var(--text-tag)",
          letterSpacing: "var(--tracking-widest)",
          textTransform: "uppercase",
          color:         focused ? "var(--color-gold-dim)" : "var(--color-ink-muted)",
          transition:    "color var(--anim-fast)",
        }}
      >
        {label}{" "}
        {required && <span style={{ color: "var(--color-gold-dim)" }}>*</span>}
      </label>

      {textarea ? (
        <textarea
          id={name} name={name} placeholder={placeholder} value={value}
          onChange={onChange} required={required} rows={5}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          style={{ ...sharedStyle, resize: "vertical", minHeight: 120 }}
        />
      ) : (
        <input
          id={name} name={name} type={type} placeholder={placeholder}
          value={value} onChange={onChange} required={required}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          style={sharedStyle}
        />
      )}
    </div>
  );
}

function ContactItem({
  icon, label, value, href, delay,
}: {
  icon: string; label: string; value: string; href?: string; delay: number;
}) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  const content = (
    <div style={{ display:"flex", alignItems:"flex-start", gap:14, padding:"16px 0", borderBottom:"var(--border-default)" }}>
      <span style={{ fontSize:18, color:"var(--color-gold-dim)", flexShrink:0, marginTop:2 }}>
        {icon}
      </span>
      <div style={{ minWidth:0 }}>
        <div style={{ fontSize:"var(--text-tag)", letterSpacing:"var(--tracking-widest)", textTransform:"uppercase", color:"var(--color-gold-dim)", marginBottom:3 }}>
          {label}
        </div>
        <div style={{ fontSize:"var(--text-body-sm)", color:href ? "var(--color-ink-primary)" : "var(--color-ink-muted)", fontWeight:300, transition:"color var(--anim-fast)", wordBreak:"break-all" }}>
          {value}
        </div>
      </div>
    </div>
  );

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.23, 1, 0.32, 1] }}
    >
      {href ? (
        <Link
          href={href}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
          style={{ textDecoration: "none" }}
          onMouseEnter={(e) => {
            const val = e.currentTarget.querySelector("div > div:last-child") as HTMLElement;
            if (val) val.style.color = "var(--color-gold-primary)";
          }}
          onMouseLeave={(e) => {
            const val = e.currentTarget.querySelector("div > div:last-child") as HTMLElement;
            if (val) val.style.color = "var(--color-ink-primary)";
          }}
        >
          {content}
        </Link>
      ) : content}
    </motion.div>
  );
}

export default function ContactPage() {
  const heroRef  = useRef<HTMLDivElement>(null);
  const heroView = useInView(heroRef, { once: true });

  const [formData, setFormData] = useState<FormData>({ name:"", email:"", subject:"", message:"" });
  const [status, setStatus]     = useState<FormState>("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch(CONTACT_CONFIG.FORM_ENDPOINT, {
        method:  "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body:    JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Error");
      setStatus("success");
      setFormData({ name:"", email:"", subject:"", message:"" });
    } catch {
      setStatus("error");
    }
  };

  const contactItems = [
    { icon:"✉",  label:"Email",    value:"AttiaX125@gmail.com",                   href:"mailto:AttiaX125@gmail.com" },
    { icon:"◈",  label:"GitHub",   value:"github.com/AttiaX125",                  href:"https://github.com/AttiaX125" },
    { icon:"⬡",  label:"LinkedIn", value:"linkedin.com/in/ahmed-attia-b299952b0", href:"https://linkedin.com/in/ahmed-attia-b299952b0" },
    { icon:"◇",  label:"Phone",    value:"+20 110 007 4690",                       href:"tel:+201100074690" },
    { icon:"○",  label:"Location", value:"Hadayek El Ahram, Giza, Egypt · Available worldwide" },
  ];

  return (
    <div>

      {/* ── PAGE HERO ── */}
      <div
        ref={heroRef}
        style={{ padding:"52px var(--space-page-x) 44px", borderBottom:"var(--border-default)", position:"relative" }}
      >
        <span className="hidden md:block" style={{ position:"absolute", top:20, left:20, width:28, height:28, borderTop:"1px solid var(--color-gold-dim)", borderLeft:"1px solid var(--color-gold-dim)" }} />
        <span className="hidden md:block" style={{ position:"absolute", top:20, right:20, width:28, height:28, borderTop:"1px solid var(--color-gold-dim)", borderRight:"1px solid var(--color-gold-dim)" }} />

        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={heroView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
          style={{ fontSize:"var(--text-tag)", letterSpacing:"var(--tracking-widest)", textTransform:"uppercase", color:"var(--color-gold-dim)", display:"flex", alignItems:"center", gap:12, marginBottom:20 }}
        >
          <span style={{ display:"block", width:22, height:1, background:"var(--color-gold-dim)" }} />
          Get in touch
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }} animate={heroView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
          style={{ fontFamily:"var(--font-display)", fontSize:"clamp(36px, 8vw, 72px)", fontWeight:300, lineHeight:0.92, letterSpacing:"-1px", color:"var(--color-ink-primary)", marginBottom:20 }}
        >
          Let&apos;s build
          <em style={{ fontStyle:"italic", color:"var(--color-gold-primary)", display:"block" }}>
            something great.
          </em>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }} animate={heroView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.35, ease: [0.23, 1, 0.32, 1] }}
          style={{ fontSize:"var(--text-body)", lineHeight:"var(--leading-body)", color:"var(--color-ink-muted)", fontWeight:300, maxWidth:480 }}
        >
          Whether you have a project in mind, want to discuss a collaboration,
          or just want to say hello — my inbox is always open. I typically
          respond within 24 hours.
        </motion.p>
      </div>

      {/* ── MAIN BODY — stacks on mobile ── */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_1px_1fr]" style={{ borderBottom:"var(--border-default)" }}>

        {/* ── LEFT — Contact Form ── */}
        <div style={{ padding: "44px var(--space-page-x)" }}>
          <div style={{ fontSize:"var(--text-tag)", letterSpacing:"var(--tracking-widest)", textTransform:"uppercase", color:"var(--color-gold-dim)", display:"flex", alignItems:"center", gap:12, marginBottom:28 }}>
            <span style={{ display:"block", width:22, height:1, background:"var(--color-gold-dim)" }} />
            Send a message
          </div>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>

            {/* Name + Email — stack on mobile */}
            <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: 16 }}>
              <FormField label="Your name" name="name" placeholder="John Smith" value={formData.name} onChange={handleChange} />
              <FormField label="Email address" name="email" type="email" placeholder="hello@example.com" value={formData.email} onChange={handleChange} />
            </div>

            <FormField label="Subject" name="subject" placeholder="Project inquiry, collaboration, etc." value={formData.subject} onChange={handleChange} />
            <FormField label="Message" name="message" placeholder="Tell me about your project..." value={formData.message} onChange={handleChange} textarea />

            <div style={{ display:"flex", alignItems:"center", gap:16, flexWrap:"wrap" }}>
              <button
                type="submit"
                disabled={status === "loading"}
                className="btn-gold"
                style={{ opacity:status==="loading"?0.6:1, cursor:status==="loading"?"not-allowed":"pointer", minWidth:160 }}
              >
                {status === "loading" ? "Sending..." : "Send Message →"}
              </button>

              {status === "success" && (
                <motion.span initial={{ opacity:0, x:-10 }} animate={{ opacity:1, x:0 }}
                  style={{ fontSize:"var(--text-tag)", letterSpacing:"var(--tracking-wide)", textTransform:"uppercase", color:"var(--color-status-available)" }}>
                  ✓ Message sent — I&apos;ll be in touch soon.
                </motion.span>
              )}

              {status === "error" && (
                <motion.span initial={{ opacity:0, x:-10 }} animate={{ opacity:1, x:0 }}
                  style={{ fontSize:"var(--text-tag)", letterSpacing:"var(--tracking-wide)", textTransform:"uppercase", color:"#A04040" }}>
                  Something went wrong — email me at{" "}
                  <Link href="mailto:AttiaX125@gmail.com" style={{ color:"inherit", textDecoration:"underline" }}>
                    AttiaX125@gmail.com
                  </Link>
                </motion.span>
              )}
            </div>
          </form>
        </div>

        <div className="rule-gold-v hidden md:block" />

        {/* ── RIGHT — Contact Info ── */}
        <div style={{ padding:"44px var(--space-page-x)", background:"var(--color-bg-secondary)", display:"flex", flexDirection:"column", gap:0, borderTop:"var(--border-default)" }}
             className="md:border-t-0">
          <div style={{ fontSize:"var(--text-tag)", letterSpacing:"var(--tracking-widest)", textTransform:"uppercase", color:"var(--color-gold-dim)", display:"flex", alignItems:"center", gap:12, marginBottom:28 }}>
            <span style={{ display:"block", width:22, height:1, background:"var(--color-gold-dim)" }} />
            Direct channels
          </div>

          {contactItems.map((item, i) => (
            <ContactItem key={item.label} icon={item.icon} label={item.label} value={item.value} href={item.href} delay={i * 0.08} />
          ))}

          {/* Response time */}
          <motion.div
            initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }}
            transition={{ duration:0.6, delay:0.5, ease:[0.23,1,0.32,1] }}
            style={{ marginTop:28, padding:"16px 18px", border:"var(--border-default)", background:"var(--color-bg-tertiary)", display:"flex", alignItems:"center", gap:14 }}
          >
            <span style={{ position:"relative", display:"flex", width:7, height:7, flexShrink:0 }}>
              <span style={{ position:"absolute", inset:0, borderRadius:"50%", background:"var(--color-status-available)", opacity:0.6, animation:"ping-slow 2s ease-in-out infinite" }} />
              <span style={{ position:"relative", display:"inline-flex", borderRadius:"50%", width:7, height:7, background:"var(--color-status-available)" }} />
            </span>
            <div>
              <div style={{ fontSize:"var(--text-tag)", letterSpacing:"var(--tracking-widest)", textTransform:"uppercase", color:"var(--color-gold-dim)", marginBottom:3 }}>Response time</div>
              <div style={{ fontSize:"var(--text-body-sm)", color:"var(--color-ink-muted)", fontWeight:300 }}>Typically within 24 hours</div>
            </div>
          </motion.div>

          {/* Availability */}
          <motion.div
            initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }}
            transition={{ duration:0.6, delay:0.6, ease:[0.23,1,0.32,1] }}
            style={{ marginTop:14, padding:"16px 18px", border:"1px solid var(--color-gold-dim)", background:"var(--color-gold-faint)" }}
          >
            <div style={{ fontSize:"var(--text-tag)", letterSpacing:"var(--tracking-widest)", textTransform:"uppercase", color:"var(--color-gold-dim)", marginBottom:6 }}>Currently available</div>
            <div style={{ fontSize:"var(--text-body-sm)", color:"var(--color-ink-muted)", fontWeight:300, lineHeight:"var(--leading-body-sm)" }}>
              Open to freelance projects, full-time front-end roles, and long-term collaborations — starting immediately.
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
