"use client";

import { useRef } from "react";
import { motion, useInView} from "framer-motion";

/* ─────────────────────────────────────────
   SCROLL REVEAL
   Reusable wrapper that gives any element
   a scroll-triggered entrance animation.

   EXAMPLES:

   // Default — fade up
   <ScrollReveal>
     <h2>Hello</h2>
   </ScrollReveal>

   // Fade from left with delay
   <ScrollReveal direction="left" delay={0.2}>
     <ProjectCard />
   </ScrollReveal>

   // Staggered children
   {items.map((item, i) => (
     <ScrollReveal key={i} delay={i * 0.1}>
       <Item {...item} />
     </ScrollReveal>
   ))}

   // No direction — just fade in
   <ScrollReveal direction="none" duration={1}>
     <HeroImage />
   </ScrollReveal>
───────────────────────────────────────── */

type Direction = "up" | "down" | "left" | "right" | "none";

/* Returns the starting position based on direction */
const getInitial = (direction: Direction, distance: number) => {
  switch (direction) {
    case "up":    return { opacity: 0, y:  distance };
    case "down":  return { opacity: 0, y: -distance };
    case "left":  return { opacity: 0, x:  distance };
    case "right": return { opacity: 0, x: -distance };
    case "none":  return { opacity: 0 };
    default:      return { opacity: 0, y:  distance };
  }
};

/* Returns the final visible state */
const getFinal = (direction: Direction) => {
  switch (direction) {
    case "up":
    case "down":  return { opacity: 1, y: 0 };
    case "left":
    case "right": return { opacity: 1, x: 0 };
    case "none":  return { opacity: 1 };
    default:      return { opacity: 1, y: 0 };
  }
};

type ScrollRevealProps = {
  children:   React.ReactNode;
  delay?:     number;          // seconds — default 0
  duration?:  number;          // seconds — default 0.7
  direction?: Direction;       // default "up"
  distance?:  number;          // px offset — default 24
  margin?: `${number}px`;          // when to trigger — default "-60px"
  once?:      boolean;         // animate once only — default true
  className?: string;
  style?:     React.CSSProperties;
};

export default function ScrollReveal({
  children,
  delay     = 0,
  duration  = 0.7,
  direction = "up",
  distance  = 24,
  margin    = "-60px",
  once      = true,
  className,
  style,
}: ScrollRevealProps) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin });

  return (
    <motion.div
      ref={ref}
      initial={getInitial(direction, distance)}
      animate={inView ? getFinal(direction) : getInitial(direction, distance)}
      transition={{
        duration,
        delay,
        ease: [0.23, 1, 0.32, 1],
      }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}
