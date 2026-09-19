"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MEMBERSHIP_PLANS, MembershipPlan } from "@/data/memberships";
import { formatINR } from "@/lib/utils";
import { Check, ArrowRight, ShieldCheck, Flame, Zap } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { MockDb } from "@/lib/mock-db";
import confetti from "canvas-confetti";

export default function MembershipSection() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "quarterly" | "yearly">("monthly");
  const [selectedPlanId, setSelectedPlanId] = useState<string>("pro");
  const [activeModalPlan, setActiveModalPlan] = useState<MembershipPlan | null>(null);
  const [registrationSubmitted, setRegistrationSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
  });

  const selectedPlan = MEMBERSHIP_PLANS.find((p) => p.id === selectedPlanId) || MEMBERSHIP_PLANS[1];

  // Pricing calculation
  const getPrice = (plan: MembershipPlan) => {
    if (billingCycle === "monthly") return plan.monthlyPrice;
    if (billingCycle === "quarterly") return Math.round(plan.monthlyPrice * 3 * 0.92);
    return plan.yearlyPrice;
  };

  const getCycleLabel = () => {
    if (billingCycle === "monthly") return "/ MONTH";
    if (billingCycle === "quarterly") return "/ QUARTER";
    return "/ YEAR";
  };

  const handleOpenEnroll = (plan: MembershipPlan) => {
    setActiveModalPlan(plan);
    setRegistrationSubmitted(false);
  };

  const handleEnrollSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !activeModalPlan) return;

    MockDb.registerNewMember({
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      planId: activeModalPlan.id,
      billingCycle: billingCycle === "yearly" ? "yearly" : "monthly",
    });

    setRegistrationSubmitted(true);
    confetti({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  return (
    <section id="membership" className="py-24 sm:py-32 bg-[#0A0A0C] border-t border-[#262933] relative overflow-hidden font-sans">
      <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#262933] pb-5 mb-12 gap-6 select-none">
          <div>
            <div className="flex items-center gap-3 text-xs text-[#FF5E14] mb-1.5 font-space font-bold uppercase tracking-wider">
              <span>07 // MEMBERSHIP PLANS</span>
              <span className="text-white/20">|</span>
              <span className="text-[#FFFFFF]">TIER ARCHITECTURE</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-space font-black uppercase tracking-tight text-[#FFFFFF]">
              ACCESS <span className="text-[#FF5E14] orange-glow">TIERS.</span>
            </h2>
          </div>

          {/* Billing Cycle Selector */}
          <div className="inline-flex p-1.5 bg-[#121318] border border-[#262933] rounded-full font-space text-xs font-bold">
            {(["monthly", "quarterly", "yearly"] as const).map((cycle) => (
              <button
                key={cycle}
                type="button"
                onClick={() => setBillingCycle(cycle)}
                className={`px-5 py-2 uppercase tracking-wider rounded-full transition-all ${
                  billingCycle === cycle
                    ? "bg-[#FF5E14] text-white shadow-[0_0_15px_rgba(255,94,20,0.5)]"
                    : "text-[#94A3B8] hover:text-[#FFFFFF]"
                }`}
              >
                {cycle}
              </button>
            ))}
          </div>
        </div>

        {/* Horizontal Tier Tabs Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 border border-[#262933] rounded-xl divide-y md:divide-y-0 md:divide-x divide-[#262933] mb-8 font-space select-none bg-[#121318] overflow-hidden shadow-xl">
          {MEMBERSHIP_PLANS.map((plan, idx) => {
            const isSelected = selectedPlanId === plan.id;
            return (
              <button
                key={plan.id}
                type="button"
                onClick={() => setSelectedPlanId(plan.id)}
                className={`p-6 sm:p-7 text-left transition-all relative ${
                  isSelected ? "bg-[#1A1C24] border-t-2 md:border-t-0 md:border-l-4 border-l-[#FF5E14]" : "hover:bg-white/[0.02]"
                }`}
              >
                <div className="flex items-center justify-between mb-2 text-xs">
                  <span className={isSelected ? "text-[#FF5E14] font-bold" : "text-[#94A3B8]"}>
                    TIER // 0{idx + 1}
                  </span>
                  {plan.isPopular && (
                    <span className="px-2.5 py-0.5 bg-[#FFF5EE] text-[#0A0A0C] font-bold text-[10px] rounded-full shadow-sm">
                      RECOMMENDED
                    </span>
                  )}
                </div>
                <div className="text-xl sm:text-2xl font-space font-black uppercase text-[#FFFFFF]">
                  {plan.name}
                </div>
                <div className="text-xs text-[#94A3B8] mt-1 font-sans">
                  {plan.tagline}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Product Transform Matrix */}
        <div className="border border-[#262933] bg-[#121318] rounded-2xl p-8 sm:p-12 relative shadow-2xl">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left Price Display */}
            <div className="lg:col-span-5 space-y-6">
              <div className="font-space text-xs text-[#FF5E14] font-bold uppercase tracking-wider flex items-center gap-2">
                <Flame className="w-4 h-4 text-[#FF5E14]" />
                COMMITTED SANCTUARY ACCESS // {selectedPlan.name}
              </div>

              <div>
                <div className="text-6xl sm:text-7xl xl:text-8xl font-space font-black tracking-tight text-[#FFFFFF]">
                  {formatINR(getPrice(selectedPlan))}
                </div>
                <div className="font-space text-xs text-[#FF5E14] font-bold mt-2">
                  {getCycleLabel()} {billingCycle === "yearly" ? "• 2 MONTHS COMPLIMENTARY" : ""}
                </div>
              </div>

              <p className="text-sm text-[#94A3B8] font-normal leading-relaxed font-sans">
                {selectedPlan.tagline}. All memberships include full access to digital member portal, RFID check-in tokens, movement screening, and towel service.
              </p>

              <div className="pt-2">
                <Button
                  size="lg"
                  variant="primary"
                  glow
                  className="w-full sm:w-auto"
                  onClick={() => handleOpenEnroll(selectedPlan)}
                >
                  <span>JOIN WITH {selectedPlan.name}</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Right Matrix Breakdown */}
            <div className="lg:col-span-7 divide-y divide-[#262933] border-y border-[#262933] font-space text-xs">
              
              <div className="py-4.5 grid grid-cols-1 sm:grid-cols-3 gap-2">
                <span className="text-[#FF5E14] font-bold uppercase">ACCESS SCOPE:</span>
                <span className="sm:col-span-2 text-[#FFFFFF] font-medium">
                  {selectedPlan.id === "starter"
                    ? "Full Gym Floor • Standard Locker & Recovery Zone"
                    : "Unlimited 24/7 Access • Priority Turf Booking • Full Locker & Steam"}
                </span>
              </div>

              <div className="py-4.5 grid grid-cols-1 sm:grid-cols-3 gap-2">
                <span className="text-[#FF5E14] font-bold uppercase">COACHING ALLOCATION:</span>
                <span className="sm:col-span-2 text-[#FFFFFF] font-medium">
                  {selectedPlan.id === "elite"
                    ? "Weekly 1-on-1 Master Coach • Bespoke Kinetic Programming • Macro Planning"
                    : selectedPlan.id === "pro"
                    ? "Bi-weekly Coach Assessment • Progressive Routine • Functional Classes"
                    : "Self-Guided Floor • Baseline Screening & Orientation"}
                </span>
              </div>

              <div className="py-4.5 grid grid-cols-1 sm:grid-cols-3 gap-2">
                <span className="text-[#FF5E14] font-bold uppercase">FEATURE SUITE:</span>
                <div className="sm:col-span-2 space-y-2">
                  {selectedPlan.features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-[#94A3B8] text-xs font-sans">
                      <Check className="w-3.5 h-3.5 text-[#FF5E14] shrink-0 stroke-[2.5]" />
                      <span className="text-[#FFFFFF]/90 font-medium">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>

      {/* Enrollment Checkout Modal */}
      {activeModalPlan && (
        <Modal
          isOpen={!!activeModalPlan}
          onClose={() => setActiveModalPlan(null)}
          title={`MEMBERSHIP ENROLLMENT // ${activeModalPlan.name}`}
          maxWidth="md"
        >
          {registrationSubmitted ? (
            <div className="text-center py-8 space-y-4 font-space">
              <div className="w-14 h-14 rounded-full bg-[#FF5E14]/15 border border-[#FF5E14]/30 flex items-center justify-center mx-auto text-[#FF5E14]">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h4 className="text-xl font-space font-black uppercase text-[#FFFFFF]">
                ENROLLMENT CONFIRMED
              </h4>
              <p className="text-xs text-[#94A3B8] max-w-xs mx-auto font-sans">
                Athlete profile initialized. Access pass and RFID token are ready in your Member Portal.
              </p>
              <div className="pt-4 flex justify-center gap-3">
                <Link href="/member">
                  <Button size="md" variant="primary" glow>
                    <span>ENTER MEMBER PORTAL</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleEnrollSubmit} className="space-y-4 font-space text-xs">
              <div className="p-4 bg-[#1A1C24] border border-[#262933] rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-[#FF5E14] font-bold block text-sm">{activeModalPlan.name}</span>
                  <span className="text-xs text-[#94A3B8]">{billingCycle.toUpperCase()} BILLING</span>
                </div>
                <div className="text-right">
                  <span className="text-xl font-space font-black text-[#FFFFFF]">
                    {formatINR(getPrice(activeModalPlan))}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-[#94A3B8] text-xs uppercase mb-1 font-semibold">ATHLETE FULL NAME</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Vikramaditya Rathore"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full bg-[#1A1C24] border border-[#262933] rounded-lg p-3 text-[#FFFFFF] focus:border-[#FF5E14] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[#94A3B8] text-xs uppercase mb-1 font-semibold">EMAIL ADDRESS</label>
                <input
                  type="email"
                  required
                  placeholder="athlete@domain.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-[#1A1C24] border border-[#262933] rounded-lg p-3 text-[#FFFFFF] focus:border-[#FF5E14] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[#94A3B8] text-xs uppercase mb-1 font-semibold">TELEPHONE NUMBER</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-[#1A1C24] border border-[#262933] rounded-lg p-3 text-[#FFFFFF] focus:border-[#FF5E14] focus:outline-none"
                />
              </div>

              <div className="pt-2">
                <Button size="md" variant="primary" glow className="w-full justify-center">
                  <span>CONFIRM & INITIALIZE PASS</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </form>
          )}
        </Modal>
      )}

    </section>
  );
}
