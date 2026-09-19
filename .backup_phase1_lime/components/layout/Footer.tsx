import React from "react";
import Link from "next/link";
import { Dumbbell, ArrowUpRight, MapPin, Phone, Clock } from "lucide-react";
import { InstagramIcon, YoutubeIcon, FacebookIcon } from "@/components/ui/SocialIcons";

export default function Footer() {
  return (
    <footer className="bg-[#080808] border-t border-white/10 relative overflow-hidden">
      {/* Ambient gradient top highlight */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-[#D7FF00]/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#D7FF00] flex items-center justify-center shadow-[0_0_20px_rgba(215,255,0,0.25)]">
                <Dumbbell className="w-5 h-5 text-[#080808] rotate-45 stroke-[2.5]" />
              </div>
              <span className="text-2xl font-black tracking-tight text-white font-space uppercase">
                DITO <span className="text-[#D7FF00]">FITNESS</span>
              </span>
            </Link>
            <p className="text-lg font-bold tracking-tight text-white font-space uppercase mt-1">
              BUILD YOUR STRONGEST VERSION.
            </p>
            <p className="text-sm text-[#A3A3A3] max-w-sm leading-relaxed">
              Train Hard. Move Better. Become DITO. A state-of-the-art training sanctuary engineered with biomechanical precision and athletic performance science.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://www.instagram.com/fit.dito/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-[#171717] border border-white/10 flex items-center justify-center text-[#A3A3A3] hover:text-[#D7FF00] hover:border-[#D7FF00]/40 transition-all cursor-pointer"
                aria-label="Follow DITO FITNESS on Instagram @fit.dito"
              >
                <InstagramIcon className="w-5 h-5" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-[#171717] border border-white/10 flex items-center justify-center text-[#A3A3A3] hover:text-[#D7FF00] hover:border-[#D7FF00]/40 transition-all cursor-pointer"
                aria-label="Subscribe to DITO FITNESS on YouTube"
              >
                <YoutubeIcon className="w-5 h-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-[#171717] border border-white/10 flex items-center justify-center text-[#A3A3A3] hover:text-[#D7FF00] hover:border-[#D7FF00]/40 transition-all cursor-pointer"
                aria-label="Follow DITO FITNESS on Facebook"
              >
                <FacebookIcon className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#D7FF00] mb-4 font-space">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#A3A3A3]">
              <li>
                <a href="#home" className="hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#programs" className="hover:text-white transition-colors">
                  Programs
                </a>
              </li>
              <li>
                <a href="#membership" className="hover:text-white transition-colors">
                  Membership Plans
                </a>
              </li>
              <li>
                <a href="#trainers" className="hover:text-white transition-colors">
                  Elite Coaches
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-white transition-colors">
                  Club Facilities
                </a>
              </li>
              <li>
                <a href="#lab" className="hover:text-white transition-colors">
                  3D Equipment Lab
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">
                  Contact & Map
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Member Services */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#D7FF00] mb-4 font-space">
              Athletes & Tools
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#A3A3A3]">
              <li>
                <Link href="/member" className="hover:text-white transition-colors flex items-center gap-1">
                  <span>Athlete Dashboard</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#D7FF00]" />
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-white transition-colors">
                  Athlete Sign In
                </Link>
              </li>
              <li>
                <Link href="/login?tab=register" className="hover:text-white transition-colors">
                  Join The Gym
                </Link>
              </li>
              <li>
                <a href="#workout" className="hover:text-white transition-colors">
                  Today&apos;s Workout Routine
                </a>
              </li>
              <li>
                <a href="#calculator" className="hover:text-white transition-colors">
                  Biometric Assessment
                </a>
              </li>
              <li>
                <Link href="/admin" className="hover:text-white transition-colors text-white/40">
                  Staff Admin Console
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Location & Operating Hours */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#D7FF00] mb-4 font-space">
              Location & Hours
            </h4>
            <ul className="space-y-3 text-xs text-[#A3A3A3]">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#D7FF00] shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-medium">Almatti, Karnataka, India</p>
                  <p className="text-[#A3A3A3] text-[11px]">Almatti Pump, near Bus Stand</p>
                </div>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#D7FF00] shrink-0" />
                <a href="tel:+916363561751" className="text-white hover:text-[#D7FF00] transition-colors">
                  +91 63635 61751
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <InstagramIcon className="w-4 h-4 text-[#D7FF00] shrink-0" />
                <a
                  href="https://www.instagram.com/fit.dito/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-[#D7FF00] transition-colors"
                >
                  @fit.dito
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#D7FF00] shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-medium">Mon – Sat: 5:30 AM – 11:00 PM</p>
                  <p className="text-[#A3A3A3]">Sunday: 6:00 AM – 9:00 PM</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#A3A3A3]">
          <p>© 2026 DITO FITNESS. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-white transition-colors cursor-pointer">
              Privacy Policy
            </span>
            <span className="hover:text-white transition-colors cursor-pointer">
              Terms of Athletic Service
            </span>
            <span className="hover:text-white transition-colors cursor-pointer">
              Biomechanics Safety Guidelines
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
