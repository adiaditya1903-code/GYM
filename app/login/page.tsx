"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Dumbbell,
  ShieldCheck,
  User,
  ArrowRight,
  Lock,
  Mail,
  Phone,
  Sparkles,
  KeyRound,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { MEMBERSHIP_PLANS } from "@/data/memberships";
import { MockDb } from "@/lib/mock-db";
import { formatINR } from "@/lib/utils";
import confetti from "canvas-confetti";

function AuthContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const defaultTab = searchParams.get("tab") === "register" ? "register" : "login";

  // Tab: "login" | "register"
  const [activeTab, setActiveTab] = useState<"login" | "register">(defaultTab);

  useEffect(() => {
    const tabParam = searchParams.get("tab");
    if (tabParam === "register") {
      setActiveTab("register");
    } else if (tabParam === "login") {
      setActiveTab("login");
    }
  }, [searchParams]);

  // --- Login State ---
  const [loginRole, setLoginRole] = useState<"member" | "admin">("member");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isLoginLoading, setIsLoginLoading] = useState(false);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");

    if (!loginEmail || !loginPassword) {
      setLoginError("Please enter your email and password.");
      return;
    }

    setIsLoginLoading(true);

    setTimeout(() => {
      if (loginRole === "member") {
        const foundMember = MockDb.getMembers().find(
          (m) => m.email.toLowerCase() === loginEmail.trim().toLowerCase()
        );

        if (foundMember) {
          setIsLoginLoading(false);
          router.push("/member");
        } else {
          MockDb.registerNewMember({
            fullName: loginEmail.split("@")[0].toUpperCase() || "ATHLETE",
            email: loginEmail,
            phone: "+91 98765 00000",
            planId: "pro",
            billingCycle: "monthly",
          });
          setIsLoginLoading(false);
          router.push("/member");
        }
      } else {
        if (
          loginEmail.toLowerCase() === "admin@ditofitness.com" ||
          loginEmail.toLowerCase() === "admin@dito.fit" ||
          loginPassword === "admin123"
        ) {
          setIsLoginLoading(false);
          router.push("/admin");
        } else {
          setIsLoginLoading(false);
          setLoginError("Invalid credentials. For staff demo, use: admin@ditofitness.com (password: admin123)");
        }
      }
    }, 500);
  };

  // --- Registration State ---
  const [selectedPlanId, setSelectedPlanId] = useState("pro");
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
  const [regData, setRegData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    heightCm: 178,
    weightKg: 78,
    fitnessGoal: "Hypertrophy & Strength",
  });
  const [isRegLoading, setIsRegLoading] = useState(false);

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regData.fullName || !regData.email || !regData.phone) return;

    setIsRegLoading(true);

    setTimeout(() => {
      MockDb.registerNewMember({
        fullName: regData.fullName,
        email: regData.email,
        phone: regData.phone,
        planId: selectedPlanId,
        billingCycle: billingCycle,
        weightKg: regData.weightKg,
        heightCm: regData.heightCm,
        fitnessGoal: regData.fitnessGoal,
      });

      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });

      setIsRegLoading(false);
      router.push("/member");
    }, 550);
  };

  const selectedPlan =
    MEMBERSHIP_PLANS.find((p) => p.id === selectedPlanId) || MEMBERSHIP_PLANS[1];

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 py-12 bg-[#08090D] bg-grid-pattern relative">
      {/* Ambient background glow */}
      <div className="absolute w-[600px] h-[600px] bg-[#00F08B]/[0.025] rounded-full blur-[160px] pointer-events-none" />

      {/* Brand Header */}
      <Link href="/" className="flex items-center gap-3 mb-8 group select-none">
        <div className="w-10 h-10 rounded-xl bg-[#00F08B] flex items-center justify-center shadow-[0_0_20px_rgba(215,255,0,0.25)] group-hover:scale-105 transition-transform">
          <Dumbbell className="w-5 h-5 text-[#08090D] rotate-45 stroke-[2.5]" />
        </div>
        <div className="flex flex-col">
          <span className="text-2xl font-black tracking-tight text-white font-space uppercase">
            DITO <span className="text-[#00F08B]">FITNESS</span>
          </span>
          <span className="text-[10px] tracking-[0.25em] text-[#A3A3A3] uppercase -mt-1 font-semibold">
            Athletic Portal
          </span>
        </div>
      </Link>

      {/* Main Container */}
      <div className="w-full max-w-xl bg-[#121724] border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl relative z-10">

        {/* Main Tab Switcher: Sign In vs New Membership */}
        <div className="flex rounded-2xl bg-[#0E121B] border border-white/10 p-1.5 mb-8">
          <button
            type="button"
            onClick={() => setActiveTab("login")}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 ${
              activeTab === "login"
                ? "bg-[#00F08B] text-[#08090D] shadow-md"
                : "text-[#A3A3A3] hover:text-white"
            }`}
          >
            <KeyRound className="w-3.5 h-3.5" />
            <span>Sign In</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("register")}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 ${
              activeTab === "register"
                ? "bg-[#00F08B] text-[#08090D] shadow-md"
                : "text-[#A3A3A3] hover:text-white"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>New Membership</span>
          </button>
        </div>

        {/* --- 1. SIGN IN FLOW --- */}
        {activeTab === "login" && (
          <div>
            {/* Role Switcher */}
            <div className="flex rounded-xl bg-[#0E121B] border border-white/10 p-1 mb-6">
              <button
                type="button"
                onClick={() => {
                  setLoginRole("member");
                  setLoginError("");
                }}
                className={`flex-1 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  loginRole === "member"
                    ? "bg-white/10 text-white shadow-sm border border-white/10"
                    : "text-[#A3A3A3] hover:text-white"
                }`}
              >
                <User className="w-3.5 h-3.5 text-[#00F08B]" />
                <span>Member Access</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setLoginRole("admin");
                  setLoginError("");
                }}
                className={`flex-1 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  loginRole === "admin"
                    ? "bg-white/10 text-white shadow-sm border border-white/10"
                    : "text-[#A3A3A3] hover:text-white"
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5 text-white" />
                <span>Staff Console</span>
              </button>
            </div>

            <div className="mb-6 text-center">
              <h1 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white font-space">
                {loginRole === "member" ? "Athlete Portal Login" : "Staff Administration"}
              </h1>
              <p className="text-xs text-[#A3A3A3] mt-1">
                {loginRole === "member"
                  ? "Access your athlete pass, workouts, telemetry, and billing"
                  : "Review incoming tour leads, athlete records, and club management"}
              </p>
            </div>

            {loginError && (
              <div className="mb-5 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs">
                {loginError}
              </div>
            )}

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#A3A3A3] mb-1.5 font-space">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder={loginRole === "member" ? "alex.mercer@dito.fit" : "admin@ditofitness.com"}
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#0E121B] border border-white/10 text-white placeholder:text-neutral-500 focus:border-[#00F08B] focus:outline-none text-sm"
                  />
                  <Mail className="w-4 h-4 text-[#A3A3A3] absolute left-3.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#A3A3A3] mb-1.5 font-space">
                  Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    required
                    placeholder="••••••••••••"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#0E121B] border border-white/10 text-white placeholder:text-neutral-500 focus:border-[#00F08B] focus:outline-none text-sm"
                  />
                  <Lock className="w-4 h-4 text-[#A3A3A3] absolute left-3.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 text-[#A3A3A3] cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded accent-[#00F08B]" />
                  <span>Remember session</span>
                </label>
                <span className="text-[#00F08B] hover:underline cursor-pointer">
                  Forgot password?
                </span>
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  glow
                  className="w-full"
                  disabled={isLoginLoading}
                >
                  <span>
                    {isLoginLoading
                      ? "Verifying Telemetry..."
                      : loginRole === "member"
                        ? "Sign In to Member Portal"
                        : "Enter Staff Admin Suite"}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </form>

            <div className="mt-8 pt-6 border-t border-white/10 text-center text-xs text-[#A3A3A3]">
              <p>
                Don&apos;t have a membership yet?{" "}
                <button
                  type="button"
                  onClick={() => setActiveTab("register")}
                  className="text-[#00F08B] font-bold hover:underline cursor-pointer ml-1"
                >
                  Join DITO Fitness
                </button>
              </p>
            </div>
          </div>
        )}

        {/* --- 2. NEW MEMBERSHIP REGISTRATION FLOW --- */}
        {activeTab === "register" && (
          <div>
            <div className="mb-6 text-center">
              <h1 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white font-space">
                Activate Your Membership
              </h1>
              <p className="text-xs text-[#A3A3A3] mt-1">
                Instant digital athlete pass, facility access, and personalized training plan.
              </p>
            </div>

            <form onSubmit={handleRegisterSubmit} className="space-y-6">
              {/* Step 1: Select Plan & Billing */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#00F08B] font-space">
                    1. Select Tier & Billing
                  </label>
                  <div className="inline-flex items-center p-0.5 rounded-lg bg-[#0E121B] border border-white/10 text-[10px]">
                    <button
                      type="button"
                      onClick={() => setBillingCycle("monthly")}
                      className={`px-2 py-1 rounded-md font-bold uppercase transition-all ${
                        billingCycle === "monthly" ? "bg-[#00F08B] text-[#08090D]" : "text-[#A3A3A3]"
                      }`}
                    >
                      Monthly
                    </button>
                    <button
                      type="button"
                      onClick={() => setBillingCycle("yearly")}
                      className={`px-2 py-1 rounded-md font-bold uppercase transition-all ${
                        billingCycle === "yearly" ? "bg-[#00F08B] text-[#08090D]" : "text-[#A3A3A3]"
                      }`}
                    >
                      Annual (-17%)
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2.5">
                  {MEMBERSHIP_PLANS.map((plan) => {
                    const isSelected = plan.id === selectedPlanId;
                    const price = billingCycle === "monthly" ? plan.monthlyPrice : plan.yearlyPrice;
                    return (
                      <button
                        key={plan.id}
                        type="button"
                        onClick={() => setSelectedPlanId(plan.id)}
                        className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                          isSelected
                            ? "bg-[#00F08B]/15 border-[#00F08B] shadow-[0_0_15px_rgba(215,255,0,0.2)]"
                            : "bg-[#0E121B] border-white/10 hover:border-white/20"
                        }`}
                      >
                        <div className="text-[11px] font-black uppercase text-white font-space">
                          {plan.name}
                        </div>
                        <div className="text-xs font-bold text-[#00F08B] mt-0.5 font-space">
                          {formatINR(price)}
                        </div>
                        <div className="text-[9px] text-[#A3A3A3]">
                          {billingCycle === "monthly" ? "/ mo" : "/ yr"}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Personal Contact */}
              <div className="space-y-3">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#00F08B] font-space">
                  2. Athlete Information
                </label>

                <div>
                  <input
                    type="text"
                    required
                    placeholder="Full Legal Name"
                    value={regData.fullName}
                    onChange={(e) => setRegData({ ...regData, fullName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#0E121B] border border-white/10 text-white placeholder:text-neutral-500 focus:border-[#00F08B] focus:outline-none text-xs sm:text-sm"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="relative">
                    <input
                      type="email"
                      required
                      placeholder="Email Address"
                      value={regData.email}
                      onChange={(e) => setRegData({ ...regData, email: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#0E121B] border border-white/10 text-white placeholder:text-neutral-500 focus:border-[#00F08B] focus:outline-none text-xs sm:text-sm"
                    />
                    <Mail className="w-3.5 h-3.5 text-[#A3A3A3] absolute left-3 top-1/2 -translate-y-1/2" />
                  </div>

                  <div className="relative">
                    <input
                      type="tel"
                      required
                      placeholder="Phone Number"
                      value={regData.phone}
                      onChange={(e) => setRegData({ ...regData, phone: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#0E121B] border border-white/10 text-white placeholder:text-neutral-500 focus:border-[#00F08B] focus:outline-none text-xs sm:text-sm"
                    />
                    <Phone className="w-3.5 h-3.5 text-[#A3A3A3] absolute left-3 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                <div>
                  <input
                    type="password"
                    placeholder="Set Account Password"
                    value={regData.password}
                    onChange={(e) => setRegData({ ...regData, password: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#0E121B] border border-white/10 text-white placeholder:text-neutral-500 focus:border-[#00F08B] focus:outline-none text-xs sm:text-sm"
                  />
                </div>
              </div>

              {/* Step 3: Biometric Baseline */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#00F08B] mb-2.5 font-space">
                  3. Biometric Baseline & Goal
                </label>

                <div className="grid grid-cols-3 gap-2.5">
                  <div>
                    <span className="text-[10px] text-[#A3A3A3] block mb-1">Height (CM)</span>
                    <input
                      type="number"
                      value={regData.heightCm}
                      onChange={(e) => setRegData({ ...regData, heightCm: Number(e.target.value) })}
                      className="w-full px-3 py-2 rounded-xl bg-[#0E121B] border border-white/10 text-white text-xs focus:border-[#00F08B] focus:outline-none"
                    />
                  </div>

                  <div>
                    <span className="text-[10px] text-[#A3A3A3] block mb-1">Weight (KG)</span>
                    <input
                      type="number"
                      value={regData.weightKg}
                      onChange={(e) => setRegData({ ...regData, weightKg: Number(e.target.value) })}
                      className="w-full px-3 py-2 rounded-xl bg-[#0E121B] border border-white/10 text-white text-xs focus:border-[#00F08B] focus:outline-none"
                    />
                  </div>

                  <div>
                    <span className="text-[10px] text-[#A3A3A3] block mb-1">Goal</span>
                    <select
                      value={regData.fitnessGoal}
                      onChange={(e) => setRegData({ ...regData, fitnessGoal: e.target.value })}
                      className="w-full px-2 py-2 rounded-xl bg-[#0E121B] border border-white/10 text-white text-xs focus:border-[#00F08B] focus:outline-none cursor-pointer"
                    >
                      <option value="Hypertrophy & Strength">Hypertrophy</option>
                      <option value="Fat Loss & Tone">Fat Loss</option>
                      <option value="Athletic Power">Athletic</option>
                      <option value="General Health">Fitness</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  glow
                  className="w-full"
                  disabled={isRegLoading}
                >
                  <span>{isRegLoading ? "Generating Athlete Telemetry..." : `Confirm ${selectedPlan.name} Membership`}</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </form>

            <div className="mt-6 pt-5 border-t border-white/10 text-center text-xs text-[#A3A3A3]">
              <p>
                Already have an athlete account?{" "}
                <button
                  type="button"
                  onClick={() => setActiveTab("login")}
                  className="text-[#00F08B] font-bold hover:underline cursor-pointer ml-1"
                >
                  Sign In
                </button>
              </p>
            </div>
          </div>
        )}

      </div>

      <div className="mt-8 text-center">
        <Link href="/" className="text-xs text-[#A3A3A3] hover:text-white transition-colors">
          ← Back to DITO FITNESS Homepage
        </Link>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#08090D] text-white text-sm">
          Loading Authentication Portal...
        </div>
      }
    >
      <AuthContent />
    </Suspense>
  );
}
