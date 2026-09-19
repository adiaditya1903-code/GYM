"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ArrowRight, Dumbbell } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { number: "01", label: "ABOUT", href: "#about" },
    { number: "02", label: "PROGRAMS", href: "#programs" },
    { number: "03", label: "COACHES", href: "#trainers" },
    { number: "04", label: "HARDWARE", href: "#lab" },
    { number: "05", label: "MEMBERSHIP", href: "#membership" },
    { number: "06", label: "GALLERY", href: "#gallery" },
    { number: "07", label: "CONTACT", href: "#contact" },
  ];

  return (
    <>
      <header className="fixed top-2 sm:top-4 left-0 right-0 z-50 px-3 sm:px-6 pointer-events-none font-sans">
        <div className="max-w-6xl mx-auto flex items-center justify-between pointer-events-auto">
          
          {/* Header Bar */}
          <div className="w-full flex items-center justify-between px-4 sm:px-6 py-2.5 sm:py-3 bg-[#0A0A0C]/90 backdrop-blur-xl border border-white/10 rounded-full select-none shadow-[0_20px_40px_rgba(0,0,0,0.85)]">
            
            {/* Brand Logo & Active State */}
            <div className="flex items-center gap-3 sm:gap-5">
              <Link
                href="/"
                className="flex items-center gap-2 group select-none"
                aria-label="DITO FITNESS Root"
              >
                <div className="w-7 h-7 rounded-full bg-[#FF5E14] flex items-center justify-center text-white shadow-[0_0_12px_rgba(255,94,20,0.5)]">
                  <Dumbbell className="w-3.5 h-3.5 rotate-45 stroke-[2.5]" />
                </div>
                <span className="font-space font-black text-sm tracking-tight text-[#FFFFFF] group-hover:text-[#FF5E14] transition-colors uppercase">
                  DITO <span className="text-[#FF5E14]">FITNESS</span>
                </span>
              </Link>

              {/* Status indicator */}
              <div className="hidden sm:flex items-center gap-2 px-2.5 py-0.5 bg-[#121318] border border-white/10 rounded-full text-[10px] text-[#94A3B8]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF5E14] animate-pulse" />
                <span className="font-space font-bold tracking-wider text-[#FFF5EE]">FACILITY OPEN</span>
              </div>
            </div>

            {/* Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1.5" aria-label="Main Navigation">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="group flex items-center gap-1 px-3 py-1.5 text-xs font-space font-semibold text-[#94A3B8] hover:text-[#FFFFFF] hover:bg-white/[0.05] rounded-full transition-all tracking-wider"
                >
                  <span className="text-[10px] text-[#FF5E14]/70 group-hover:text-[#FF5E14] transition-colors">
                    {link.number}
                  </span>
                  <span>{link.label}</span>
                </a>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2.5 sm:gap-3">
              <Link
                href="/login"
                className="hidden sm:inline-flex text-xs font-space font-semibold text-[#94A3B8] hover:text-[#FFF5EE] transition-colors px-3 py-1.5 rounded-full hover:bg-white/[0.05]"
              >
                LOGIN
              </Link>

              <a
                href="#membership"
                data-cursor="go"
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#FF5E14] text-white font-space font-bold text-xs uppercase tracking-wider rounded-full hover:bg-[#FF7A00] transition-all shadow-[0_0_20px_rgba(255,94,20,0.45)] active:scale-95 border border-white/20"
              >
                <span>JOIN NOW</span>
                <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
              </a>

              {/* Mobile Menu Trigger */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-1.5 text-[#F8FAFC] hover:text-[#FF5E14] transition-colors focus:outline-none"
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Full-Screen Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#0A0A0C] flex flex-col justify-between p-6 sm:p-10 pt-24 lg:hidden font-sans animate-in fade-in duration-150">
          
          {/* Top metadata */}
          <div className="flex items-center justify-between border-b border-[#262933] pb-4 text-xs text-[#94A3B8]">
            <div className="flex items-center gap-2 text-[#FF5E14]">
              <span className="w-2 h-2 rounded-full bg-[#FF5E14] animate-pulse" />
              <span className="font-space font-bold tracking-wider">DITO PERFORMANCE FACILITY</span>
            </div>
            <span className="text-[11px]">ALMATTI, KARNATAKA</span>
          </div>

          {/* Links Index */}
          <div className="flex flex-col space-y-2 my-auto">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="group flex items-baseline justify-between border-b border-white/5 py-3"
              >
                <div className="flex items-baseline gap-4">
                  <span className="text-xs font-mono text-[#FF5E14]">
                    {link.number}
                  </span>
                  <span className="text-2xl sm:text-3xl font-space font-black tracking-tight text-[#F8FAFC] group-hover:text-[#FF5E14] transition-colors">
                    {link.label}
                  </span>
                </div>
                <ArrowRight className="w-4 h-4 text-[#94A3B8] group-hover:text-[#FF5E14] -translate-x-2 group-hover:translate-x-0 transition-transform" />
              </a>
            ))}
          </div>

          {/* Bottom Action */}
          <div className="pt-6 border-t border-[#262933] space-y-3">
            <a
              href="#membership"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#FF5E14] text-white font-space font-bold text-xs uppercase tracking-widest rounded-lg hover:bg-[#FF7A00] shadow-[0_0_20px_rgba(255,94,20,0.5)]"
            >
              <span>JOIN DITO FITNESS</span>
              <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </a>

            <div className="flex items-center justify-between text-xs text-[#94A3B8] pt-2">
              <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="hover:text-white">
                Member Portal
              </Link>
              <Link href="/admin" onClick={() => setMobileMenuOpen(false)} className="hover:text-white">
                Admin Console
              </Link>
            </div>
          </div>

        </div>
      )}
    </>
  );
}
