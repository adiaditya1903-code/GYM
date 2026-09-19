import React from "react";
import Link from "next/link";
import { Dumbbell, ArrowUpRight, MapPin, Phone, Mail, Clock } from "lucide-react";
import { InstagramIcon, YoutubeIcon, FacebookIcon } from "@/components/ui/SocialIcons";

export default function Footer() {
  return (
    <footer className="bg-[#06070A] border-t border-white/[0.08] relative overflow-hidden">
      {/* Ambient gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-[#00F08B]/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-white/[0.06]">
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00F08B] to-[#00A862] flex items-center justify-center shadow-[0_0_20px_rgba(0,240,139,0.3)]">
                <Dumbbell className="w-5 h-5 text-[#08090D] rotate-45" />
              </div>
              <span className="text-2xl font-black tracking-wider text-white font-space">
                DITO <span className="text-[#00F08B]">FITNESS</span>
              </span>
            </Link>
            <p className="text-xl font-bold tracking-tight text-slate-100 font-space uppercase mt-1">
              BUILD YOUR STRONGEST VERSION.
            </p>
            <p className="text-sm text-slate-300 max-w-sm leading-relaxed">
              Train Hard. Move Better. Become DITO. A state-of-the-art training sanctuary engineered with biomedical precision and athletic performance science.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://www.instagram.com/fit.dito/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-slate-300 hover:text-[#00F08B] hover:border-[#00F08B]/40 hover:bg-[#00F08B]/5 transition-all cursor-pointer"
                aria-label="Follow DITO FITNESS on Instagram @fit.dito"
              >
                <InstagramIcon className="w-5 h-5" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-slate-300 hover:text-[#00F08B] hover:border-[#00F08B]/40 hover:bg-[#00F08B]/5 transition-all cursor-pointer"
                aria-label="Subscribe to DITO FITNESS on YouTube"
              >
                <YoutubeIcon className="w-5 h-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-slate-300 hover:text-[#00F08B] hover:border-[#00F08B]/40 hover:bg-[#00F08B]/5 transition-all cursor-pointer"
                aria-label="Follow DITO FITNESS on Facebook"
              >
                <FacebookIcon className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#00F08B] mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300">
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  About DITO
                </a>
              </li>
              <li>
                <a href="#programs" className="hover:text-white transition-colors">
                  Training Goal
                </a>
              </li>
              <li>
                <a href="#lab" className="hover:text-white transition-colors">
                  3D Equipment Lab
                </a>
              </li>
              <li>
                <a href="#membership" className="hover:text-white transition-colors">
                  Membership Plans
                </a>
              </li>
              <li>
                <a href="#calculator" className="hover:text-white transition-colors">
                  Personal Details & Calculator
                </a>
              </li>
              <li>
                <a href="#workout" className="hover:text-white transition-colors">
                  7-Day Workout Routine
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">
                  Location & Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Quick Utilities */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#00F08B] mb-4">
              Member Services
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300">
              <li>
                <Link href="/member" className="hover:text-white transition-colors flex items-center gap-1">
                  <span>Athlete Dashboard</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#00F08B]" />
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-white transition-colors">
                  Athlete Sign In
                </Link>
              </li>
              <li>
                <Link href="/login?tab=register" className="hover:text-white transition-colors">
                  New Membership
                </Link>
              </li>
              <li>
                <a href="#workout" className="hover:text-white transition-colors">
                  Today&apos;s Workout
                </a>
              </li>
              <li>
                <a href="#calculator" className="hover:text-white transition-colors">
                  Biometric Assessment
                </a>
              </li>
              <li>
                <Link href="/admin" className="hover:text-white transition-colors text-slate-400">
                  Staff Admin
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Location & Operating Hours */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#00F08B] mb-4">
              Club Location & Contact
            </h4>
            <ul className="space-y-3 text-xs text-slate-300">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#00F08B] shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-medium">Almatti, Karnataka, India</p>
                  <p className="text-slate-400 text-[11px]">Almatti Pump, near Bus Stand</p>
                </div>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#00F08B] shrink-0" />
                <a href="tel:+916363561751" className="text-white hover:text-[#00F08B] transition-colors">
                  +91 63635 61751
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <InstagramIcon className="w-4 h-4 text-[#00F08B] shrink-0" />
                <a
                  href="https://www.instagram.com/fit.dito/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-[#00F08B] transition-colors"
                >
                  Instagram: @fit.dito
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#00F08B] shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-medium">Mon – Sat: 5:30 AM – 11:00 PM</p>
                  <p className="text-slate-400">Sunday: 6:00 AM – 9:00 PM</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© 2026 DITO FITNESS. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-200 transition-colors cursor-pointer">
              Privacy Policy
            </span>
            <span className="hover:text-slate-200 transition-colors cursor-pointer">
              Terms & Conditions
            </span>
            <span className="hover:text-slate-200 transition-colors cursor-pointer">
              Safety Guidelines
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

