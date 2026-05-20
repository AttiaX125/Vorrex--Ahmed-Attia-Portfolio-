"use client";

const items = [
  { text:"React.js",           highlight:true  },
  { text:"Next.js",            highlight:false },
  { text:"TypeScript",         highlight:false },
  { text:"JavaScript ES6+",    highlight:false },
  { text:"Framer Motion",      highlight:true  },
  { text:"Tailwind CSS",       highlight:false },
  { text:"Redux Toolkit",      highlight:false },
  { text:"REST APIs",          highlight:false },
  { text:"Figma",              highlight:false },
  { text:"Jest",               highlight:false },
  { text:"Node.js",            highlight:false },
  { text:"Git & GitHub",       highlight:false },
  { text:"Available for Work", highlight:true  },
  { text:"Cairo, Egypt",       highlight:false },
  { text:"WCAG Accessibility", highlight:false },
  { text:"Vercel",             highlight:false },
];

function Diamond() {
  return (
    <span style={{ display:"inline-block", width:4, height:4, background:"var(--color-bg-primary)", transform:"rotate(45deg)", opacity:0.4, flexShrink:0 }} />
  );
}

function TickerItem({ text, highlight }: { text: string; highlight: boolean }) {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:28, flexShrink:0 }}>
      <span style={{ fontSize:"var(--text-tag)", letterSpacing:"var(--tracking-wider)", textTransform:"uppercase", color:highlight?"var(--color-bg-primary)":"rgba(9,9,10,0.45)", fontWeight:highlight?500:400, fontFamily:"var(--font-body)", whiteSpace:"nowrap" }}>
        {text}
      </span>
      <Diamond />
    </div>
  );
}

export default function GoldTicker() {
  return (
    <div style={{ background:"var(--color-gold-primary)", height:"var(--space-ticker-height)", borderBottom:"var(--border-default)", borderTop:"var(--border-default)", overflow:"hidden", position:"relative", display:"flex", alignItems:"center" }}>

      {/* Left fade */}
      <div style={{ position:"absolute", left:0, top:0, bottom:0, width:60, background:"linear-gradient(90deg, var(--color-gold-primary), transparent)", zIndex:2, pointerEvents:"none" }} />

      {/* Right fade */}
      <div style={{ position:"absolute", right:0, top:0, bottom:0, width:60, background:"linear-gradient(270deg, var(--color-gold-primary), transparent)", zIndex:2, pointerEvents:"none" }} />

      {/* Track — doubled for seamless loop */}
      <div className="animate-ticker" style={{ display:"flex", alignItems:"center", gap:28, paddingLeft:28, willChange:"transform" }}>
        {items.map((item, i) => <TickerItem key={`a-${i}`} text={item.text} highlight={item.highlight} />)}
        {items.map((item, i) => <TickerItem key={`b-${i}`} text={item.text} highlight={item.highlight} />)}
      </div>
    </div>
  );
}
