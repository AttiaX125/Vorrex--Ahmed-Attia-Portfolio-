/* ─────────────────────────────────────────
   VORREX — Projects Data
   Ahmed Attia · Frontend Developer

   ✅ LINKS — verify each repo name matches
      your actual GitHub repo URL.
      Go to github.com/AttiaX125 and confirm
      the exact repo slugs, then update below.

   HOW TO ADD SCREENSHOTS:
   1. Drop images in /public/projects/
   2. Add  image: "/projects/filename.jpg"
      to each project object
   3. In ProjectSlider.tsx and projects/page.tsx
      replace <MockUI> with <Image src={project.image} .../>
───────────────────────────────────────── */

export type Project = {
  id:         number;
  index:      string;       // Roman numeral — I, II, III...
  num:        string;       // "01", "02"...
  year:       string;
  name:       string;       // First line of title
  nameSub:    string;       // Second line — italic gold
  desc:       string;
  tags:       string[];
  link:       string;
  liveUrl?:   string;       // optional deployed URL
  featured:   boolean;      // First card is wider + pre-highlighted
  mockType:   "shop" | "dashboard" | "designsystem" | "travel" | "mobile";
  showOnHome: boolean;      // true = appears in home slider
};

export const projects: Project[] = [

  /* ── 1. E-Commerce ── */
  {
    id:       1,
    index:    "I",
    num:      "01",
    year:     "2024",
    name:     "E-Commerce",
    nameSub:  "Product Page",
    desc:     "Fully responsive storefront with dynamic product listing, real-time search, and category filtering. Persistent cart via localStorage — items survive page refresh without a backend. Keyboard-navigable and WCAG-compliant.",
    tags:     ["React", "JavaScript", "CSS3", "Local Storage"],
    link:     "https://github.com/AttiaX125/e-commerce-product-page", // ← verify repo name
    featured: true,
    mockType: "shop",
    showOnHome: true,
  },

  /* ── 2. Admin Dashboard ── */
  {
    id:       2,
    index:    "II",
    num:      "02",
    year:     "2024",
    name:     "Admin",
    nameSub:  "Dashboard",
    desc:     "Responsive dashboard with 4+ interactive Chart.js chart types, KPI cards, and live REST API data. Production-grade UX with loading states, error boundaries, and empty-state fallbacks.",
    tags:     ["React", "Chart.js", "REST API", "Bootstrap"],
    link:     "https://github.com/AttiaX125/admin-dashboard", // ← verify repo name
    featured: false,
    mockType: "dashboard",
    showOnHome: true,
  },

  /* ── 3. Task Manager ── */
  {
    id:       3,
    index:    "III",
    num:      "03",
    year:     "2024",
    name:     "Task Manager",
    nameSub:  "Kanban App",
    desc:     "Full-featured Kanban board with drag-and-drop, priority tagging, due-date tracking, and filter/search. Written in strict TypeScript with 80%+ test coverage using Jest and React Testing Library.",
    tags:     ["React", "TypeScript", "Redux Toolkit", "Jest"],
    link:     "https://github.com/AttiaX125/task-manager", // ← verify repo name
    featured: false,
    mockType: "designsystem",
    showOnHome: true,
  },

  /* ── 4. Andalusia Village ── */
  {
    id:       4,
    index:    "IV",
    num:      "04",
    year:     "2024",
    name:     "Andalusia",
    nameSub:  "Village Platform",
    desc:     "Real estate tech platform built at Andalusia Village. Reduced UI bugs by ~40%, built 10+ reusable components, integrated live property listings via RESTful APIs. Serving 1,000+ monthly visitors.",
    tags:     ["React", "Tailwind CSS", "REST API", "Node.js"],
    link:     "https://github.com/AttiaX125/andalusia-village", // ← verify repo name / swap for live URL if public
    featured: false,
    mockType: "travel",
    showOnHome: true,
  },

  /* ── 5. Portfolio ── */
  {
    id:       5,
    index:    "V",
    num:      "05",
    year:     "2025",
    name:     "Vorrex",
    nameSub:  "Portfolio",
    desc:     "This portfolio — built with Next.js SSG, Framer Motion animations, and a custom dark gold design system. Targeting 95+ Lighthouse score across Performance, Accessibility, Best Practices, and SEO.",
    tags:     ["Next.js", "TypeScript", "Framer Motion", "Tailwind"],
    link:     "https://github.com/AttiaX125/vorrex-portfolio", // ← verify repo name
    featured: false,
    mockType: "mobile",
    showOnHome: true,
  },

  /* ────────────────────────────────────────
     PROJECTS PAGE ONLY — not in home slider
  ──────────────────────────────────────── */

  /* ── 6. Weather App ── */
  {
    id:       6,
    index:    "VI",
    num:      "06",
    year:     "2023",
    name:     "Weather",
    nameSub:  "App",
    desc:     "Real-time weather data from OpenWeatherMap API with city search, 5-day forecast, and robust error handling. Mobile-first layout with skeleton loading states. Deployed via GitHub Pages with CI/CD.",
    tags:     ["JavaScript", "OpenWeatherMap API", "CSS3", "GitHub Actions"],
    link:     "https://github.com/AttiaX125/weather-app", // ← verify repo name
    featured: false,
    mockType: "travel",
    showOnHome: false,
  },

  /* ── 7. Auth System ── */
  {
    id:       7,
    index:    "VII",
    num:      "07",
    year:     "2023",
    name:     "Auth",
    nameSub:  "System",
    desc:     "Sign in / Sign up with real-time inline validation, password strength meter, and session persistence via localStorage. WCAG 2.1 AA compliant with secure field masking and accessible form labels.",
    tags:     ["HTML5", "CSS3", "JavaScript", "Local Storage"],
    link:     "https://github.com/AttiaX125/auth-system", // ← verify repo name
    featured: false,
    mockType: "mobile",
    showOnHome: false,
  },

  /* ── 8. EEG Prosthetic Arm (Thesis) ── */
  {
    id:       8,
    index:    "VIII",
    num:      "08",
    year:     "2024",
    name:     "EEG",
    nameSub:  "Prosthetic Arm",
    desc:     "Thesis project — Middle East's first EEG-controlled smart prosthetic arm. Real-time EEG signal processing pipeline for gesture recognition. Ergonomic 3D-printed prototype. Grade: A+.",
    tags:     ["Python", "Arduino", "EEG Processing", "3D Printing"],
    link:     "https://github.com/AttiaX125/prosthetic-arm-eeg", // ← verify repo name
    featured: false,
    mockType: "dashboard",
    showOnHome: false,
  },

];

/* ─────────────────────────────────────────
   FILTERED EXPORTS
───────────────────────────────────────── */

/** Projects shown in home page slider */
export const homeProjects = projects.filter((p) => p.showOnHome);

/** All projects for the projects page */
export const allProjects = projects;