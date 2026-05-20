"use client";

import Image from "next/image";
import img from "../../../public/Untitled (1).png";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close menu on route change
useEffect(() => {
  if (menuOpen) setMenuOpen(false);
}, [pathname]);
  const links = [
    { label: "Home",     href: "/"         },
    { label: "About",    href: "/about"    },
    { label: "Projects", href: "/projects" },
    { label: "Contact",  href: "/contact"  },
  ];

  return (
    <nav
      className={`
        sticky top-0 z-50 w-full
        transition-all duration-300
        border-b border-[#2A2820]
        ${scrolled ? "bg-[#09090A]/90 backdrop-blur-md" : "bg-[#09090A]"}
      `}
    >
      <div className="flex justify-between items-center h-[62px] px-5 md:px-12">

        {/* ── LOGO ── */}
        <Link href="/" className="flex-shrink-0">
          <Image
            src={img}
            alt="Vorrex Logo"
            height={60}
            width={200}
            priority
            style={{ width: "auto", height: "44px" }}
          />
        </Link>

        {/* ── NAV LINKS desktop ── */}
        <ul className="hidden md:flex items-center gap-9">
          {links.map(({ label, href }) => {
            const active = pathname === href;
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`
                    text-[10px] tracking-[2.5px] uppercase font-light
                    transition-colors duration-200
                    ${active ? "text-[#C8A96E]" : "text-[#5A5248] hover:text-[#E2C98A]"}
                  `}
                >
                  {label}
                  {active && (
                    <span className="block h-px w-full bg-[#C8A96E] mt-0.5 opacity-60" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* ── AVAILABLE BADGE desktop ── */}
        <div className="hidden md:flex items-center gap-2">
          <span className="relative flex h-[7px] w-[7px]">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4A7A3A] opacity-60" />
            <span className="relative inline-flex rounded-full h-[7px] w-[7px] bg-[#4A7A3A]" />
          </span>
          <span className="text-[9px] tracking-[2px] uppercase text-[#4A7A3A] font-light">
            Available for work
          </span>
        </div>

        {/* ── HAMBURGER mobile ── */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-[5px] p-2"
          aria-label="Toggle menu"
        >
          <span className={`block w-5 h-px bg-[#C8A96E] transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[6px]" : ""}`} />
          <span className={`block w-5 h-px bg-[#C8A96E] transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-5 h-px bg-[#C8A96E] transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[6px]" : ""}`} />
        </button>
      </div>

      {/* ── MOBILE MENU ── */}
      {menuOpen && (
        <div className="md:hidden border-t border-[#1A1810] py-6 px-5 flex flex-col gap-5 bg-[#09090A]">
          {links.map(({ label, href }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className={`
                  text-[11px] tracking-[3px] uppercase font-light
                  transition-colors duration-200
                  ${active ? "text-[#C8A96E]" : "text-[#5A5248]"}
                `}
              >
                {label}
              </Link>
            );
          })}
          <div className="flex items-center gap-2 pt-2 border-t border-[#1A1810]">
            <span className="relative flex h-[6px] w-[6px]">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4A7A3A] opacity-60" />
              <span className="relative inline-flex rounded-full h-[6px] w-[6px] bg-[#4A7A3A]" />
            </span>
            <span className="text-[9px] tracking-[2px] uppercase text-[#4A7A3A]">
              Available for work
            </span>
          </div>
        </div>
      )}
    </nav>
  );
}
