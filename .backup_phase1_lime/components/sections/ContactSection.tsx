"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { MockDb } from "@/lib/mock-db";
import { MapPin, Phone, Clock, Send, CheckCircle2, Navigation, Sparkles, ExternalLink } from "lucide-react";
import { InstagramIcon } from "@/components/ui/SocialIcons";
import confetti from "canvas-confetti";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    goal: "Muscle Gain",
    preferredMembership: "DITO PRO",
    preferredDate: "Tomorrow at 6:00 PM",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone || !formData.email) return;

    setIsSubmitting(true);
    setTimeout(() => {
      MockDb.addInquiry({
        fullName: formData.fullName,
        phone: formData.phone,
        email: formData.email,
        goal: formData.goal,
        preferredMembership: formData.preferredMembership,
        preferredDate: formData.preferredDate,
        message: formData.message || "Requested complimentary VIP facility tour and assessment.",
      });

      setIsSubmitting(false);
      setSubmitted(true);
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
      });
    }, 400);
  };

  return (
    <section id="contact" className="py-28 bg-[#111111] border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#171717] border border-white/10 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#D7FF00]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#D7FF00]">
              VIP EXPERIENCE PASS
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white font-space mb-4">
            READY TO <span className="text-[#D7FF00]">START?</span>
          </h2>

          <p className="text-sm sm:text-base text-[#A3A3A3]">
            Book a private walkthrough of our facility, test the calibrated competition equipment, and receive an initial kinetic mobility consultation.
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Form */}
          <div className="lg:col-span-7 bg-[#171717] border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center justify-between font-space">
              <span>Book Your Free Club Tour</span>
              <Badge variant="lime">Complimentary Pass</Badge>
            </h3>

            {submitted ? (
              <div className="py-10 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#D7FF00]/20 border border-[#D7FF00] text-[#D7FF00] flex items-center justify-center mx-auto shadow-[0_0_25px_rgba(215,255,0,0.3)]">
                  <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
                </div>
                <h4 className="text-2xl font-black text-white font-space uppercase">
                  VIP Tour Reserved!
                </h4>
                <p className="text-sm text-[#A3A3A3] max-w-md mx-auto leading-relaxed">
                  Thank you, <strong className="text-white">{formData.fullName}</strong>. Our head coach has reserved your slot for <strong className="text-[#D7FF00]">{formData.preferredDate}</strong>. Confirmation details dispatched to your contact information.
                </p>
                <div className="pt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        fullName: "",
                        phone: "",
                        email: "",
                        goal: "Muscle Gain",
                        preferredMembership: "DITO PRO",
                        preferredDate: "Tomorrow at 6:00 PM",
                        message: "",
                      });
                    }}
                  >
                    Submit Another Inquiry
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#A3A3A3] mb-1.5 font-space">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Arjun Kapoor"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#111111] border border-white/10 text-white placeholder:text-neutral-500 focus:border-[#D7FF00] focus:outline-none text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#A3A3A3] mb-1.5 font-space">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#111111] border border-white/10 text-white placeholder:text-neutral-500 focus:border-[#D7FF00] focus:outline-none text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#A3A3A3] mb-1.5 font-space">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="arjun.k@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#111111] border border-white/10 text-white placeholder:text-neutral-500 focus:border-[#D7FF00] focus:outline-none text-sm"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#A3A3A3] mb-1.5 font-space">
                      Target Training Goal
                    </label>
                    <select
                      value={formData.goal}
                      onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#111111] border border-white/10 text-white focus:border-[#D7FF00] focus:outline-none text-sm cursor-pointer"
                    >
                      <option value="Muscle Gain">Hypertrophy & Muscle Gain</option>
                      <option value="Strength & Power">Strength & Powerlifting</option>
                      <option value="Fat Loss">Fat Loss & Conditioning</option>
                      <option value="Athletic Performance">Athletic Performance</option>
                      <option value="Mobility & Rehab">Mobility & Rehabilitation</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#A3A3A3] mb-1.5 font-space">
                      Preferred Membership
                    </label>
                    <select
                      value={formData.preferredMembership}
                      onChange={(e) => setFormData({ ...formData, preferredMembership: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#111111] border border-white/10 text-white focus:border-[#D7FF00] focus:outline-none text-sm cursor-pointer"
                    >
                      <option value="DITO STARTER">DITO STARTER (₹2,999/mo)</option>
                      <option value="DITO PRO">DITO PRO (₹4,999/mo)</option>
                      <option value="DITO ELITE">DITO ELITE (₹7,999/mo)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#A3A3A3] mb-1.5 font-space">
                    Preferred Time Slot
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Tomorrow at 6:30 PM"
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#111111] border border-white/10 text-white placeholder:text-neutral-500 focus:border-[#D7FF00] focus:outline-none text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#A3A3A3] mb-1.5 font-space">
                    Additional Notes or Medical Considerations
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Tell us about previous training history, joint injuries, or specific athletic goals..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#111111] border border-white/10 text-white placeholder:text-neutral-500 focus:border-[#D7FF00] focus:outline-none text-sm resize-none"
                  />
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    glow
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    <span>{isSubmitting ? "Dispatching VIP Pass..." : "Confirm Free VIP Tour & Assessment"}</span>
                    <Send className="w-4 h-4 ml-1" />
                  </Button>
                </div>

                <p className="text-[11px] text-[#A3A3A3] text-center pt-1">
                  🔒 Zero spam policy. We only dispatch tour credentials and club schedule updates.
                </p>
              </form>
            )}
          </div>

          {/* Right Column: Club Location & Map */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-[#171717] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
              <h3 className="text-xl font-bold text-white uppercase font-space tracking-tight">
                LOCATION & CONTACT
              </h3>

              <div className="space-y-4 text-xs sm:text-sm text-[#A3A3A3]">
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-[#D7FF00]/10 border border-[#D7FF00]/30 flex items-center justify-center text-[#D7FF00] shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-bold text-white uppercase tracking-wider text-xs mb-0.5 font-space">LOCATION</h5>
                    <p className="text-white font-semibold leading-relaxed">
                      Almatti, Karnataka, India
                    </p>
                    <p className="text-[#A3A3A3] text-xs mt-0.5">
                      Almatti Pump, near Bus Stand, Almatti, Karnataka
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-[#D7FF00]/10 border border-[#D7FF00]/30 flex items-center justify-center text-[#D7FF00] shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-bold text-white uppercase tracking-wider text-xs mb-0.5 font-space">PHONE</h5>
                    <a
                      href="tel:+916363561751"
                      className="text-white font-bold hover:text-[#D7FF00] transition-colors"
                    >
                      +91 63635 61751
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-[#D7FF00]/10 border border-[#D7FF00]/30 flex items-center justify-center text-[#D7FF00] shrink-0 mt-0.5">
                    <InstagramIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-bold text-white uppercase tracking-wider text-xs mb-0.5 font-space">INSTAGRAM</h5>
                    <a
                      href="https://www.instagram.com/fit.dito/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#D7FF00] font-bold hover:underline inline-flex items-center gap-1"
                    >
                      <span>@fit.dito</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-[#D7FF00]/10 border border-[#D7FF00]/30 flex items-center justify-center text-[#D7FF00] shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-bold text-white uppercase tracking-wider text-xs mb-0.5 font-space">CLUB HOURS</h5>
                    <p className="text-white font-semibold">Monday – Saturday: 5:30 AM – 11:00 PM</p>
                    <p className="text-[#A3A3A3]">Sunday: 6:00 AM – 9:00 PM</p>
                  </div>
                </div>
              </div>

              {/* Map Section: Almatti Pump, near Bus Stand */}
              <div className="space-y-2 pt-2 border-t border-white/10">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#A3A3A3] flex items-center gap-1.5 font-space">
                    <Navigation className="w-3.5 h-3.5 text-[#D7FF00]" />
                    <span>Club Map & Directions</span>
                  </span>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Almatti+Pump+near+Bus+Stand+Almatti+Karnataka"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] font-bold text-[#D7FF00] hover:underline flex items-center gap-1"
                  >
                    <span>Open in Maps</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <div className="w-full h-44 rounded-2xl overflow-hidden border border-white/10 bg-[#080808] relative">
                  <iframe
                    title="Almatti Location Map"
                    src="https://maps.google.com/maps?q=Almatti+Pump,+near+Bus+Stand,+Almatti,+Karnataka&t=&z=14&ie=UTF8&iwloc=&output=embed"
                    className="w-full h-full border-0 filter grayscale contrast-125 opacity-90 hover:opacity-100 transition-opacity"
                    loading="lazy"
                  />
                </div>
                <p className="text-[11px] text-[#A3A3A3]">
                  Almatti Pump, near Bus Stand, Almatti, Karnataka
                </p>
              </div>
            </div>

            {/* Quick Staff Login card */}
            <div className="p-6 rounded-3xl bg-[#171717] border border-white/10 flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-white uppercase font-space">Staff Member?</h4>
                <p className="text-xs text-[#A3A3A3]">Access the internal admin console and tour manager.</p>
              </div>
              <Link href="/login">
                <Button size="sm" variant="outline">
                  Staff Sign In
                </Button>
              </Link>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
