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
    { name: "Programs", href: "#programs" },
    { name: "Membership", href: "#membership" },
    { name: "Trainers", href: "#trainers" },
    { name: "Gallery", href: "#gallery" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#080808]/90 backdrop-blur-xl border-b border-white/10 py-3.5 shadow-[0_10px_35px_rgba(0,0,0,0.7)]"
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
          <div className="w-9 h-9 rounded-xl bg-[#D7FF00] flex items-center justify-center shadow-[0_0_20px_rgba(215,255,0,0.25)] group-hover:scale-105 transition-transform duration-300">
            <Dumbbell className="w-5 h-5 text-[#080808] rotate-45 stroke-[2.5]" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl sm:text-2xl font-black tracking-tight text-white font-space uppercase">
              DITO <span className="text-[#D7FF00]">FITNESS</span>
            </span>
            <span className="text-[9px] tracking-[0.3em] text-[#A3A3A3] uppercase -mt-1 font-semibold">
              Athletic Club
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-7" aria-label="Main Navigation">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-xs font-bold text-[#A3A3A3] hover:text-white transition-colors tracking-widest uppercase relative group py-1"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#D7FF00] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Right CTA Actions */}
        <div className="hidden lg:flex items-center gap-3">
          <Link href="/member">
            <button
              type="button"
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-[#A3A3A3] hover:text-white hover:bg-white/5 transition-all cursor-pointer border border-white/5"
            >
              <User className="w-3.5 h-3.5 text-[#D7FF00]" />
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
        <div className="flex items-center gap-2.5 lg:hidden">
          <a href="#membership">
            <Button size="sm" variant="primary">
              JOIN
            </Button>
          </a>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-xl text-[#A3A3A3] hover:text-white hover:bg-white/10 transition-colors focus:outline-none cursor-pointer border border-white/10"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#080808]/98 backdrop-blur-2xl border-b border-white/10 px-6 py-6 transition-all duration-300">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-bold uppercase tracking-wider text-white hover:text-[#D7FF00] py-2.5 border-b border-white/5 flex items-center justify-between"
              >
                <span>{link.name}</span>
                <ArrowRight className="w-4 h-4 text-white/30" />
              </a>
            ))}

            <div className="pt-4 flex flex-col gap-2.5">
              <Link
                href="/member"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-4 py-3 rounded-xl bg-[#171717] border border-white/10 text-white font-bold uppercase tracking-wider text-xs"
              >
                <div className="flex items-center gap-2.5">
                  <User className="w-4 h-4 text-[#D7FF00]" />
                  <span>Member Dashboard</span>
                </div>
                <ArrowRight className="w-4 h-4 text-[#A3A3A3]" />
              </Link>

              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-4 py-3 rounded-xl bg-[#171717] border border-white/10 text-[#A3A3A3] font-bold uppercase tracking-wider text-xs hover:text-white"
              >
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-white" />
                  <span>Staff Admin</span>
                </div>
                <ArrowRight className="w-4 h-4 text-[#A3A3A3]" />
              </Link>

              <a
                href="#membership"
                onClick={() => setMobileMenuOpen(false)}
                className="pt-2"
              >
                <Button size="lg" variant="primary" glow className="w-full">
                  <span>JOIN DITO FITNESS</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
