"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { MockDb } from "@/lib/mock-db";
import { ArrowRight, Check, MapPin, Phone, Clock, ShieldCheck, Mail } from "lucide-react";
import confetti from "canvas-confetti";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
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
        goal: "Strength & Athletic Performance",
        preferredMembership: "DITO PRO",
        preferredDate: "Next Available Slot",
        message: formData.message || "Requested facility tour and initial kinetic screening.",
      });

      setIsSubmitting(false);
      setSubmitted(true);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    }, 450);
  };

  return (
    <section id="contact" className="py-24 sm:py-36 bg-[#0A0A0C] border-t border-[#262933] relative overflow-hidden font-sans">
      <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#262933] pb-5 mb-16 gap-6 select-none">
          <div>
            <div className="flex items-center gap-3 text-xs text-[#FF5E14] mb-1.5 font-space font-bold uppercase tracking-wider">
              <span>13 // DIRECT INTAKE</span>
              <span className="text-white/20">|</span>
              <span className="text-[#FFFFFF]">HEADQUARTERS & BOOKINGS</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-space font-black uppercase tracking-tight text-[#FFFFFF]">
              FACILITY <span className="text-[#FF5E14] orange-glow">CONTACT.</span>
            </h2>
          </div>

          <p className="text-xs text-[#94A3B8] max-w-sm">
            Submit your parameters to schedule a complimentary movement screening and physical walkthrough of the Almatti facility.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* LEFT: Physical Facility Location & Map */}
          <div className="lg:col-span-5 space-y-6 text-xs">
            
            <div className="space-y-4">
              <div className="p-6 bg-[#121318] border border-[#262933] rounded-2xl space-y-3 shadow-xl">
                <div className="text-[#FF5E14] font-space font-bold text-sm uppercase flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#FF5E14]" />
                  DITO HEADQUARTERS // ALMATTI SECTOR
                </div>
                <p className="text-[#94A3B8] leading-relaxed font-sans text-sm">
                  Near Almatti Dam Road, Almatti, Nidagundi Taluk, Vijayapura District, Karnataka 586201, India.
                </p>
                <div className="pt-2 text-xs text-[#94A3B8] space-y-1.5 font-space">
                  <div className="flex items-center gap-2">
                    <span className="text-white font-bold">COORDINATES:</span>
                    <span>16.3312° N, 75.8924° E</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-[#FF5E14]" />
                    <span className="text-white font-bold">+91 94480 12345 / +91 98800 54321</span>
                  </div>
                </div>
              </div>

              <div className="p-5 bg-[#121318] border border-[#262933] rounded-2xl flex items-center justify-between font-space">
                <div>
                  <span className="text-[#94A3B8] block text-[10px] uppercase font-bold">OPERATING HOURS</span>
                  <span className="text-[#FFFFFF] font-bold text-sm">05:00 — 23:00 IST DAILY</span>
                </div>
                <span className="px-3 py-1 bg-[#FF5E14]/15 border border-[#FF5E14]/40 rounded-full text-xs text-[#FF5E14] font-bold">
                  24/7 PRO ACCESS
                </span>
              </div>
            </div>

            {/* Embedded Dark Theme Google Map */}
            <div className="relative aspect-[16/9] w-full border border-[#262933] rounded-2xl overflow-hidden bg-[#121318] shadow-2xl">
              <iframe
                title="DITO FITNESS Almatti Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30560.10214691428!2d75.875!3d16.33!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc76bb06e000001%3A0x1!2sAlmatti%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) contrast(120%)" }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

          </div>

          {/* RIGHT: Large Numbered Interactive Intake Form */}
          <div className="lg:col-span-7 border border-[#262933] rounded-2xl bg-[#121318] p-8 sm:p-12 shadow-2xl">
            {submitted ? (
              <div className="py-12 text-center space-y-4 font-space">
                <div className="w-14 h-14 rounded-full bg-[#FF5E14]/15 border border-[#FF5E14]/30 flex items-center justify-center mx-auto text-[#FF5E14]">
                  <Check className="w-7 h-7 stroke-[2.5]" />
                </div>
                <h3 className="text-2xl font-space font-black uppercase text-[#FFFFFF]">
                  INQUIRY TRANSMITTED
                </h3>
                <p className="text-xs text-[#94A3B8] max-w-sm mx-auto font-sans">
                  A DITO Strength Coach will contact {formData.phone} within 4 operating hours to calibrate your screening.
                </p>
                <div className="pt-4">
                  <Button size="md" variant="outline" onClick={() => setSubmitted(false)}>
                    <span>SUBMIT ANOTHER INQUIRY</span>
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8 font-space">
                
                {/* 01 Field: Name */}
                <div className="group space-y-2 border-b border-[#262933] pb-4 focus-within:border-[#FF5E14] transition-colors">
                  <div className="flex items-center justify-between text-xs">
                    <label className="text-[#94A3B8] group-focus-within:text-[#FF5E14] transition-colors uppercase font-bold text-[11px]">
                      01 // ATHLETE FULL NAME
                    </label>
                    {formData.fullName && <Check className="w-4 h-4 text-[#FF5E14]" />}
                  </div>
                  <input
                    type="text"
                    required
                    placeholder="ENTER YOUR FULL NAME"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full bg-transparent text-xl sm:text-2xl font-space uppercase text-[#FFFFFF] placeholder:text-white/20 focus:outline-none"
                  />
                </div>

                {/* 02 Field: Phone */}
                <div className="group space-y-2 border-b border-[#262933] pb-4 focus-within:border-[#FF5E14] transition-colors">
                  <div className="flex items-center justify-between text-xs">
                    <label className="text-[#94A3B8] group-focus-within:text-[#FF5E14] transition-colors uppercase font-bold text-[11px]">
                      02 // CONTACT TELEPHONE
                    </label>
                    {formData.phone && <Check className="w-4 h-4 text-[#FF5E14]" />}
                  </div>
                  <input
                    type="tel"
                    required
                    placeholder="+91 00000 00000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-transparent text-xl sm:text-2xl font-space uppercase text-[#FFFFFF] placeholder:text-white/20 focus:outline-none"
                  />
                </div>

                {/* 03 Field: Email */}
                <div className="group space-y-2 border-b border-[#262933] pb-4 focus-within:border-[#FF5E14] transition-colors">
                  <div className="flex items-center justify-between text-xs">
                    <label className="text-[#94A3B8] group-focus-within:text-[#FF5E14] transition-colors uppercase font-bold text-[11px]">
                      03 // EMAIL ADDRESS
                    </label>
                    {formData.email && <Check className="w-4 h-4 text-[#FF5E14]" />}
                  </div>
                  <input
                    type="email"
                    required
                    placeholder="ATHLETE@DOMAIN.COM"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-transparent text-xl sm:text-2xl font-space uppercase text-[#FFFFFF] placeholder:text-white/20 focus:outline-none"
                  />
                </div>

                {/* 04 Field: Message */}
                <div className="group space-y-2 border-b border-[#262933] pb-4 focus-within:border-[#FF5E14] transition-colors">
                  <div className="flex items-center justify-between text-xs">
                    <label className="text-[#94A3B8] group-focus-within:text-[#FF5E14] transition-colors uppercase font-bold text-[11px]">
                      04 // TRAINING OBJECTIVE & NOTES
                    </label>
                    {formData.message && <Check className="w-4 h-4 text-[#FF5E14]" />}
                  </div>
                  <textarea
                    rows={2}
                    placeholder="HYPERTROPHY, POWERLIFTING, FAT LOSS, REHABILITATION..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-transparent text-lg sm:text-xl font-space uppercase text-[#FFFFFF] placeholder:text-white/20 focus:outline-none resize-none"
                  />
                </div>

                {/* Action Trigger */}
                <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <span className="text-[11px] text-[#94A3B8] flex items-center gap-1.5 font-space">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#FF5E14]" />
                    SECURE 256-BIT ENCRYPTED TRANSMISSION
                  </span>

                  <Button
                    size="lg"
                    variant="primary"
                    glow
                    disabled={isSubmitting}
                    className="gap-3 shadow-[0_0_25px_rgba(255,94,20,0.45)]"
                  >
                    <span>{isSubmitting ? "TRANSMITTING..." : "SCHEDULE CONSULTATION"}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>

              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
