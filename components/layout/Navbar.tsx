"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Dumbbell, ShieldCheck, User, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Training Goal", href: "#programs" },
    { name: "Lab 3D", href: "#lab" },
    { name: "Plans", href: "#membership" },
    { name: "Calculators", href: "#calculator" },
    { name: "Workout", href: "#workout" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-[#08090D]/85 backdrop-blur-2xl border-b border-white/[0.08] py-3.5 shadow-[0_10px_35px_rgba(0,0,0,0.6)]"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 group select-none"
          aria-label="DITO FITNESS Homepage"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#00F08B] to-[#00A862] flex items-center justify-center shadow-[0_0_20px_rgba(0,240,139,0.35)] group-hover:scale-105 transition-transform duration-300">
            <Dumbbell className="w-5 h-5 text-[#08090D] rotate-45" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl sm:text-2xl font-black tracking-wider text-white font-space">
              DITO <span className="text-[#00F08B]">FITNESS</span>
            </span>
            <span className="text-[9px] tracking-[0.25em] text-slate-400 uppercase -mt-1 font-semibold">
              Athletic Club
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-5 xl:gap-6" aria-label="Main Navigation">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-xs font-semibold text-slate-300 hover:text-[#00F08B] transition-colors tracking-wider uppercase relative group py-1"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#00F08B] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Right CTA Actions */}
        <div className="hidden lg:flex items-center gap-3">
          <Link href="/member">
            <button
              type="button"
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-slate-300 hover:text-white hover:bg-white/5 transition-all cursor-pointer border border-white/5"
            >
              <User className="w-3.5 h-3.5 text-[#00F08B]" />
              <span className="tracking-wider uppercase">Portal</span>
            </button>
          </Link>

          <a href="#membership">
            <Button size="sm" variant="primary" glow>
              <span>JOIN NOW</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center gap-2 lg:hidden">
          <a href="#membership">
            <Button size="sm" variant="primary">
              JOIN
            </Button>
          </a>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors focus:outline-none cursor-pointer"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#08090D]/95 backdrop-blur-2xl border-b border-white/10 px-6 py-6 transition-all duration-300">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-semibold uppercase tracking-wider text-slate-200 hover:text-[#00F08B] py-2 border-b border-white/5"
              >
                {link.name}
              </a>
            ))}

            <div className="pt-3 flex flex-col gap-2.5">
              <Link
                href="/member"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white font-bold uppercase tracking-wider text-xs"
              >
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-[#00F08B]" />
                  <span>Member Dashboard</span>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </Link>

              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-slate-300 font-bold uppercase tracking-wider text-xs"
              >
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#00D4FF]" />
                  <span>Admin Management</span>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </Link>

              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-slate-300 font-bold uppercase tracking-wider text-xs"
              >
                <span>Sign In / Create Account</span>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

