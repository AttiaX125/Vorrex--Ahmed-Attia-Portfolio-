/* ─────────────────────────────────────────
   MOCK UI PREVIEWS
   One unique preview per project type.
   When you have real screenshots, replace
   the entire <MockUI /> with an <Image />.
───────────────────────────────────────── */

import { Project } from "@/data/projects";

/* ── shared mini primitives ── */
const Bar = ({
  w = "100%",
  gold = false,
  h = 5,
}: {
  w?: string;
  gold?: boolean;
  h?: number;
}) => (
  <div
    style={{
      width: w,
      height: h,
      background: gold
        ? "var(--color-gold-dim)"
        : "var(--color-ink-dim)",
      borderRadius: 1,
      marginBottom: 5,
    }}
  />
);

/* ── 1. Shop ── */
function ShopMock() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, height: "100%", padding: 14 }}>
      {/* browser bar */}
      <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 4 }}>
        {["#993C1D","#8A6010","#2A5020"].map((c) => (
          <div key={c} style={{ width: 6, height: 6, borderRadius: "50%", background: c }} />
        ))}
        <div style={{ flex: 1, height: 10, background: "var(--color-bg-primary)", borderRadius: 2, marginLeft: 8 }} />
      </div>
      {/* product grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6, flex: 1 }}>
        {[0,1,2].map((i) => (
          <div key={i} style={{ background: "var(--color-bg-primary)", border: "var(--border-default)", borderRadius: 1, padding: 6, display: "flex", flexDirection: "column", gap: 4 }}>
            <div style={{ flex: 1, minHeight: 36, background: "var(--color-ink-dim)", borderRadius: 1 }} />
            <div style={{ height: 5, background: "var(--color-gold-dim)", borderRadius: 1, width: "55%" }} />
            <div style={{ height: 4, background: "var(--color-ink-dim)", borderRadius: 1, width: "80%" }} />
            <div style={{ height: 11, background: i === 1 ? "var(--color-gold-dim)" : "var(--color-ink-dim)", borderRadius: 1 }} />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── 2. Dashboard ── */
function DashboardMock() {
  const barHeights = [35, 70, 50, 90, 45, 60, 80];
  const highlighted = [1, 3, 6];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, height: "100%", padding: 14, justifyContent: "space-between" }}>
      {/* header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ height: 8, background: "var(--color-ink-primary)", borderRadius: 1, width: 100, opacity: 0.15 }} />
        <div style={{ display: "flex", gap: 4 }}>
          {[true, false, false].map((active, i) => (
            <div key={i} style={{ height: 14, borderRadius: 7, background: active ? "var(--color-gold-dim)" : "var(--color-ink-dim)", width: active ? 50 : 40 }} />
          ))}
        </div>
      </div>
      {/* stat boxes */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6 }}>
        {[0,1,2].map((i) => (
          <div key={i} style={{ background: "var(--color-bg-primary)", border: "var(--border-default)", padding: "7px 9px", borderRadius: 1 }}>
            <div style={{ height: 10, background: "var(--color-gold-dim)", borderRadius: 1, width: "50%", marginBottom: 4 }} />
            <div style={{ height: 5, background: "var(--color-ink-dim)", borderRadius: 1, width: "70%" }} />
          </div>
        ))}
      </div>
      {/* bar chart */}
      <div style={{ background: "var(--color-bg-primary)", border: "var(--border-default)", borderRadius: 1, padding: 10, display: "flex", flexDirection: "column", justifyContent: "flex-end", flex: 1 }}>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 4, height: 60 }}>
          {barHeights.map((h, i) => (
            <div key={i} style={{ flex: 1, height: `${h}%`, background: highlighted.includes(i) ? "var(--color-gold-dim)" : "var(--color-ink-dim)", borderRadius: "1px 1px 0 0" }} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── 3. Design System ── */
function DesignSystemMock() {
  const swatches = ["#C8A96E","#6B5A35","#09090A","#F0EAE0","#3A3630","#5A5248"];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10, height: "100%", padding: 14 }}>
      {/* color tokens */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 4 }}>
        {swatches.map((c) => (
          <div key={c} style={{ height: 18, borderRadius: 9, background: c }} />
        ))}
      </div>
      {/* component row */}
      <div style={{ display: "flex", gap: 5 }}>
        {[
          { label: "Button", active: false },
          { label: "Primary", active: true },
          { label: "Ghost", active: false },
        ].map(({ label, active }) => (
          <div key={label} style={{ border: active ? "none" : "var(--border-default)", borderRadius: 1, padding: "4px 9px", fontSize: 9, color: active ? "var(--color-bg-primary)" : "var(--color-ink-muted)", background: active ? "var(--color-gold-dim)" : "transparent", fontFamily: "var(--font-body)" }}>
            {label}
          </div>
        ))}
      </div>
      {/* input row */}
      <div style={{ display: "flex", gap: 5 }}>
        <div style={{ flex: 1, height: 24, background: "var(--color-bg-primary)", border: "var(--border-default)", borderRadius: 1 }} />
        <div style={{ width: 52, height: 24, background: "var(--color-gold-dim)", borderRadius: 1 }} />
      </div>
      {/* type scale */}
      <div style={{ display: "flex", flexDirection: "column", gap: 4, flex: 1, justifyContent: "center" }}>
        <Bar w="80%" h={10} />
        <Bar w="60%" h={7} />
        <Bar w="70%" h={5} />
        <Bar w="50%" h={4} />
      </div>
    </div>
  );
}

/* ── 4. Travel ── */
function TravelMock() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 7, height: "100%", padding: 12 }}>
      {/* hero image */}
      <div style={{ flex: 1.5, background: "var(--color-ink-dim)", borderRadius: 1, position: "relative", overflow: "hidden", display: "flex", alignItems: "flex-end" }}>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(9,9,10,0.75), transparent)" }} />
        <div style={{ position: "relative", zIndex: 1, padding: 8, display: "flex", flexDirection: "column", gap: 4, width: "100%" }}>
          <div style={{ height: 7, background: "var(--color-ink-primary)", borderRadius: 1, width: "70%", opacity: 0.7 }} />
          <div style={{ height: 5, background: "var(--color-ink-primary)", borderRadius: 1, width: "45%", opacity: 0.35 }} />
        </div>
      </div>
      {/* thumbnails */}
      <div style={{ display: "flex", gap: 5 }}>
        {[0,1,2,3].map((i) => (
          <div key={i} style={{ height: 32, flex: 1, background: "var(--color-ink-dim)", borderRadius: 1, border: i === 1 ? "1px solid var(--color-gold-dim)" : "var(--border-default)" }} />
        ))}
      </div>
    </div>
  );
}

/* ── 5. Mobile ── */
function MobileMock() {
  return (
    <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ width: 64, height: 130, border: "var(--border-default)", borderRadius: 10, padding: "8px 6px", display: "flex", flexDirection: "column", gap: 4, background: "var(--color-bg-primary)" }}>
        <div style={{ width: 20, height: 4, background: "var(--color-ink-dim)", borderRadius: 2, margin: "0 auto 4px" }} />
        <Bar w="90%" />
        <Bar w="55%" gold />
        <div style={{ height: 28, background: "var(--color-ink-dim)", borderRadius: 1, marginBottom: 4 }} />
        <Bar w="90%" />
        <Bar w="70%" />
        <Bar w="40%" gold />
        <Bar w="55%" />
        <div style={{ height: 14, background: "var(--color-gold-dim)", borderRadius: 7, marginTop: 4 }} />
      </div>
    </div>
  );
}

/* ── MAIN EXPORT ── */
export default function MockUI({ type }: { type: Project["mockType"] }) {
  switch (type) {
    case "shop":         return <ShopMock />;
    case "dashboard":    return <DashboardMock />;
    case "designsystem": return <DesignSystemMock />;
    case "travel":       return <TravelMock />;
    case "mobile":       return <MobileMock />;
    default:             return null;
  }
}
