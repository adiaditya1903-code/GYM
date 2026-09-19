"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MEMBERSHIP_PLANS, MembershipPlan } from "@/data/memberships";
import { formatINR } from "@/lib/utils";
import { Check, Zap, Sparkles, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Modal } from "@/components/ui/Modal";
import { MockDb } from "@/lib/mock-db";
import confetti from "canvas-confetti";

export default function MembershipSection() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
  const [activeModalPlan, setActiveModalPlan] = useState<MembershipPlan | null>(null);
  const [registrationSubmitted, setRegistrationSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
  });

  const handleOpenEnroll = (plan: MembershipPlan) => {
    setActiveModalPlan(plan);
    setRegistrationSubmitted(false);
  };

  const handleEnrollSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !activeModalPlan) return;

    // Register into MockDb
    MockDb.registerNewMember({
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      planId: activeModalPlan.id,
      billingCycle: billingCycle,
    });

    setRegistrationSubmitted(true);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  return (
    <section id="membership" className="py-28 bg-[#08090D] border-t border-white/[0.08] relative">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00F08B]/[0.03] rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.1] mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#00F08B]" />
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#00F08B]">
              TRANSPARENT VALUE
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white font-space mb-4">
            CHOOSE YOUR <span className="text-[#00F08B]">PLAN</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300">
            Unrestricted access, zero hidden lock-ins. Upgrade or adapt your tier as your physical capacity compounds.
          </p>

          {/* Billing Cycle Switcher */}
          <div className="mt-8 inline-flex items-center p-1.5 rounded-2xl bg-[#0E121B] border border-white/[0.1] shadow-xl">
            <button
              type="button"
              onClick={() => setBillingCycle("monthly")}
              className={`px-6 py-2 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                billingCycle === "monthly"
                  ? "bg-gradient-to-r from-[#00F08B] to-[#00D488] text-[#08090D] shadow-md"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Monthly Billing
            </button>

            <button
              type="button"
              onClick={() => setBillingCycle("yearly")}
              className={`px-6 py-2 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                billingCycle === "yearly"
                  ? "bg-gradient-to-r from-[#00F08B] to-[#00D488] text-[#08090D] shadow-md"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <span>Annual Billing</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase bg-[#08090D] text-[#00F08B]">
                Save ~17%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {MEMBERSHIP_PLANS.map((plan) => {
            const price = billingCycle === "yearly" ? plan.yearlyPrice : plan.monthlyPrice;
            const cycleText = billingCycle === "yearly" ? "/ year" : "/ month";
            const isPopular = plan.isPopular;

            return (
              <div
                key={plan.id}
                className={`relative rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 ${
                  isPopular
                    ? "bg-[#111624] border-2 border-[#00F08B] shadow-[0_20px_50px_rgba(0,240,139,0.15)] z-20"
                    : "bg-[#0E121B] border border-white/[0.08] hover:border-white/20 shadow-xl"
                }`}
              >
                {/* Popular Badge */}
                {isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest bg-gradient-to-r from-[#00F08B] to-[#00D488] text-[#08090D] shadow-[0_0_15px_rgba(0,240,139,0.5)] flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 fill-current" />
                      MOST POPULAR
                    </span>
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant={isPopular ? "lime" : "silver"}>
                      {plan.badge || "MEMBERSHIP"}
                    </Badge>
                  </div>

                  <h3 className="text-2xl font-black uppercase tracking-tight text-white font-space mb-1">
                    {plan.name}
                  </h3>
                  
                  <p className="text-xs text-slate-400 min-h-[36px] mb-6 leading-relaxed">
                    {plan.tagline}
                  </p>

                  {/* Price */}
                  <div className="mb-8 pb-6 border-b border-white/[0.08]">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl sm:text-5xl font-black text-white font-space">
                        {formatINR(price)}
                      </span>
                      <span className="text-xs font-semibold uppercase text-slate-400">
                        {cycleText}
                      </span>
                    </div>
                    {billingCycle === "yearly" && (
                      <span className="text-[11px] text-[#00F08B] font-medium block mt-1">
                        Includes 2 months complimentary access
                      </span>
                    )}
                  </div>

                  {/* Features List */}
                  <div className="space-y-3.5 mb-8">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-300 block mb-3">
                      Tier Inclusions:
                    </span>
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-300">
                        <div className="w-5 h-5 rounded-full bg-[#00F08B]/10 flex items-center justify-center text-[#00F08B] shrink-0 mt-0.5">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Card CTA */}
                <div>
                  <Button
                    size="lg"
                    variant={isPopular ? "primary" : "outline"}
                    glow={isPopular}
                    className="w-full"
                    onClick={() => handleOpenEnroll(plan)}
                  >
                    <span>JOIN WITH {plan.name}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Enterprise & Corporate banner */}
        <div className="mt-14 rounded-2xl bg-[#0E121B] border border-white/[0.08] p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#00F08B]/10 border border-[#00F08B]/30 flex items-center justify-center text-[#00F08B] shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-white font-space">Corporate & Executive Wellness</h4>
              <p className="text-xs text-slate-400">Custom athletic conditioning cohorts for corporate teams, sports franchises, and executive groups.</p>
            </div>
          </div>
          <a href="#contact">
            <Button size="sm" variant="outline">
              Inquire Corporate Plans
            </Button>
          </a>
        </div>

      </div>

      {/* Enrollment Quick Modal */}
      {activeModalPlan && (
        <Modal
          isOpen={!!activeModalPlan}
          onClose={() => setActiveModalPlan(null)}
          title={`ENROLL IN ${activeModalPlan.name}`}
          maxWidth="lg"
        >
          {registrationSubmitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#00F08B]/20 border border-[#00F08B]/40 text-[#00F08B] flex items-center justify-center mx-auto">
                <Check className="w-8 h-8" />
              </div>
              <h4 className="text-2xl font-black uppercase text-white font-space">
                Membership Activated!
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 max-w-sm mx-auto">
                Welcome to DITO FITNESS. Your digital telemetry pass has been generated and provisioned.
              </p>
              <div className="pt-4">
                <Link href="/member">
                  <Button variant="primary" size="md" glow className="w-full">
                    Enter Athlete Dashboard
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleEnrollSubmit} className="space-y-4">
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400 block uppercase">Selected Tier</span>
                  <span className="text-base font-black text-white font-space">{activeModalPlan.name}</span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-400 block uppercase">Billed {billingCycle}</span>
                  <span className="text-base font-black text-[#00F08B] font-space">
                    {formatINR(billingCycle === "yearly" ? activeModalPlan.yearlyPrice : activeModalPlan.monthlyPrice)}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                  Full Legal Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Mercer"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#121724] border border-white/10 text-white placeholder:text-slate-500 focus:border-[#00F08B] focus:outline-none text-xs sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="alex.mercer@dito.fit"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#121724] border border-white/10 text-white placeholder:text-slate-500 focus:border-[#00F08B] focus:outline-none text-xs sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#121724] border border-white/10 text-white placeholder:text-slate-500 focus:border-[#00F08B] focus:outline-none text-xs sm:text-sm"
                />
              </div>

              <div className="pt-2">
                <Button type="submit" variant="primary" size="md" glow className="w-full">
                  Confirm & Provision Athlete Pass
                </Button>
              </div>

              <p className="text-[10px] text-slate-500 text-center">
                Instant digital telemetry activation. Cancel anytime or modify in member portal.
              </p>
            </form>
          )}
        </Modal>
      )}
    </section>
  );
}

