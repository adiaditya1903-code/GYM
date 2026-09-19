"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, ShieldCheck, Flame, Compass, Dumbbell } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0A0A0C] border-t border-[#262933] relative overflow-hidden select-none text-xs">
      
      {/* Top Accent Scanline */}
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#FF5E14]/50 to-transparent" />

      <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-10 py-16 sm:py-20">
        
        {/* Main Footer Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 pb-14 border-b border-[#262933] items-start">
          
          {/* Brand & Mission Statement */}
          <div className="lg:col-span-6 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#FF5E14] to-[#FF7A00] flex items-center justify-center text-white font-black shadow-lg shadow-[#FF5E14]/25">
                <Flame className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-space font-black tracking-tighter uppercase text-[#FFF5EE]">
                DITO<span className="text-[#FF5E14]">.</span>FITNESS
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#1A1C24] border border-[#FF5E14]/30 text-[9px] text-[#FF5E14] font-mono font-bold tracking-widest">
                FACILITY ONLINE
              </span>
            </div>

            <p className="font-sans text-sm text-[#94A3B8] max-w-md leading-relaxed">
              Discipline. Movement. Strength. Progress. Precision. Almatti's premier human performance facility engineered for continuous biological adaptation and athletic superiority.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4 text-[11px] text-[#64748B] font-mono">
              <span className="text-[#FFF5EE]">ALMATTI DAM ROAD, KA 586201</span>
              <span className="text-[#FF5E14]">•</span>
              <span className="text-[#FFF5EE]">TEL: +91 94480 12345</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-3 font-mono">
            <span className="text-[#FF5E14] font-bold text-[10px] uppercase tracking-widest block">
              // ATHLETIC DIRECTORY
            </span>
            <ul className="space-y-2 text-[#94A3B8]">
              <li>
                <a href="#programs" className="hover:text-[#FF5E14] transition-colors flex items-center gap-2">
                  <span className="text-[#FF5E14]">&gt;</span> 01_Training Protocols
                </a>
              </li>
              <li>
                <a href="#membership" className="hover:text-[#FF5E14] transition-colors flex items-center gap-2">
                  <span className="text-[#FF5E14]">&gt;</span> 02_Membership Passes
                </a>
              </li>
              <li>
                <a href="#trainers" className="hover:text-[#FF5E14] transition-colors flex items-center gap-2">
                  <span className="text-[#FF5E14]">&gt;</span> 03_Coaching Faculty
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-[#FF5E14] transition-colors flex items-center gap-2">
                  <span className="text-[#FF5E14]">&gt;</span> 04_Facility Gallery
                </a>
              </li>
              <li>
                <a href="#equipment" className="hover:text-[#FF5E14] transition-colors flex items-center gap-2">
                  <span className="text-[#FF5E14]">&gt;</span> 05_3D Equipment Lab
                </a>
              </li>
            </ul>
          </div>

          {/* Telemetry Coordinates Box */}
          <div className="lg:col-span-3 p-5 rounded-xl bg-[#121318] border border-[#262933] space-y-3 font-mono">
            <div className="text-[10px] text-[#FF5E14] font-bold uppercase tracking-wider flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-[#FF5E14]" /> GEODETIC POSITION
              </span>
              <span className="w-2 h-2 rounded-full bg-[#FF5E14] animate-ping" />
            </div>
            
            <div className="text-[11px] text-[#94A3B8] space-y-1">
              <div>lat: <span className="text-[#FFF5EE]">16.3312° N</span></div>
              <div>lon: <span className="text-[#FFF5EE]">75.8924° E</span></div>
              <div>elevation: <span className="text-[#FFF5EE]">534m AMSL</span></div>
              <div>sector: <span className="text-[#FF7A00]">ALMATTI // BIJAPUR</span></div>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://www.instagram.com/fit.dito/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-[10px] text-[#94A3B8] hover:text-[#FF5E14] transition-colors"
              >
                <span>INSTAGRAM</span>
                <ArrowUpRight className="w-3 h-3 text-[#FF5E14]" />
              </a>
              <span className="text-[#262933]">•</span>
              <a
                href="https://wa.me/919448012345"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-[10px] text-[#94A3B8] hover:text-[#FF5E14] transition-colors"
              >
                <span>WHATSAPP</span>
                <ArrowUpRight className="w-3 h-3 text-[#FF5E14]" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Status Bar */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-[#64748B] font-mono">
          <div className="flex flex-wrap items-center gap-3">
            <span className="flex items-center gap-1.5 text-[#FF5E14] font-bold">
              <span className="w-2 h-2 rounded-full bg-[#FF5E14]" />
              FACILITY: 100% OPERATIONAL
            </span>
            <span className="text-[#262933]">|</span>
            <span className="flex items-center gap-1 text-[#FFF5EE]">
              <Dumbbell className="w-3.5 h-3.5 text-[#FF7A00]" /> DITO PERFORMANCE
            </span>
            <span className="text-[#262933]">|</span>
            <span>ALMATTI, KARNATAKA</span>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/login" className="text-[#FFF5EE] hover:text-[#FF5E14] transition-colors">
              MEMBER PORTAL
            </Link>
            <span className="text-[#262933]">|</span>
            <Link href="/admin" className="text-[#FFF5EE] hover:text-[#FF5E14] transition-colors">
              ADMIN CONSOLE
            </Link>
            <span className="text-[#262933]">|</span>
            <span className="text-[#94A3B8]">© {new Date().getFullYear()} DITO FITNESS</span>
          </div>
        </div>

      </div>

    </footer>
  );
}
