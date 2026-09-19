"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Flame,
  ShieldCheck,
  User,
  ArrowRight,
  Lock,
  Mail,
  Phone,
  Sparkles,
  KeyRound,
  CheckCircle2,
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
    <div className="min-h-screen flex flex-col justify-center items-center px-4 py-12 bg-[#0A0A0C] relative selection:bg-[#FF5E14] selection:text-white">
      {/* Background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#FF5E14]/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Brand Header */}
      <Link href="/" className="flex items-center gap-3 mb-8 group select-none">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF5E14] to-[#FF7A00] flex items-center justify-center shadow-lg shadow-[#FF5E14]/30 group-hover:scale-105 transition-transform">
          <Flame className="w-5 h-5 text-white stroke-[2.5]" />
        </div>
        <div className="flex flex-col">
          <span className="text-2xl font-black tracking-tight text-[#FFF5EE] font-space uppercase">
            DITO<span className="text-[#FF5E14]">.</span>PORTAL
          </span>
          <span className="text-[10px] font-mono tracking-widest text-[#FF5E14] uppercase">
            SECURE ACCESS GATEWAY
          </span>
        </div>
      </Link>

      {/* Main Container */}
      <div className="w-full max-w-xl bg-[#121318] border border-[#262933] rounded-2xl p-6 sm:p-10 relative z-10 shadow-2xl shadow-black/80 backdrop-blur-sm">
        
        {/* Top Header */}
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#262933] text-[11px] font-mono text-[#64748B]">
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF5E14]" />
            <span className="text-[#FFF5EE] font-bold">ATHLETIC AUTHENTICATION</span>
          </span>
          <span className="text-[#FF7A00] font-bold">256-BIT ENCRYPTED</span>
        </div>

        {/* Main Tab Switcher: Sign In vs New Membership */}
        <div className="flex bg-[#1A1C24] border border-[#262933] rounded-xl p-1 mb-6 text-xs">
          <button
            type="button"
            onClick={() => setActiveTab("login")}
            className={`flex-1 py-2.5 rounded-lg uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 font-mono font-bold ${
              activeTab === "login"
                ? "bg-[#FF5E14] text-white shadow-lg shadow-[#FF5E14]/25"
                : "text-[#94A3B8] hover:text-[#FFF5EE]"
            }`}
          >
            <KeyRound className="w-3.5 h-3.5" />
            <span>MEMBER LOGIN</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("register")}
            className={`flex-1 py-2.5 rounded-lg uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 font-mono font-bold ${
              activeTab === "register"
                ? "bg-[#FF5E14] text-white shadow-lg shadow-[#FF5E14]/25"
                : "text-[#94A3B8] hover:text-[#FFF5EE]"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>NEW ATHLETE PASS</span>
          </button>
        </div>

        {/* --- 1. SIGN IN FLOW --- */}
        {activeTab === "login" && (
          <div>
            {/* Role Switcher */}
            <div className="flex bg-[#1A1C24] border border-[#262933] rounded-lg p-1 mb-6 text-xs">
              <button
                type="button"
                onClick={() => {
                  setLoginRole("member");
                  setLoginError("");
                }}
                className={`flex-1 py-2 rounded-md uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1.5 font-mono ${
                  loginRole === "member"
                    ? "bg-[#121318] text-[#FF5E14] border border-[#FF5E14]/30 font-bold shadow"
                    : "text-[#64748B] hover:text-[#FFF5EE]"
                }`}
              >
                <User className="w-3.5 h-3.5 text-[#FF5E14]" />
                <span>Athlete Portal</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setLoginRole("admin");
                  setLoginError("");
                }}
                className={`flex-1 py-2 rounded-md uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1.5 font-mono ${
                  loginRole === "admin"
                    ? "bg-[#121318] text-[#FFF5EE] border border-[#262933] font-bold shadow"
                    : "text-[#64748B] hover:text-[#FFF5EE]"
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#FF7A00]" />
                <span>Staff Admin</span>
              </button>
            </div>

            <div className="mb-6 text-center">
              <h1 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-[#FFF5EE] font-space">
                {loginRole === "member" ? "ATHLETE PORTAL ACCESS" : "STAFF ADMIN CONSOLE"}
              </h1>
              <p className="text-xs text-[#94A3B8] mt-1.5 font-sans">
                {loginRole === "member"
                  ? "Access your digital pass, workouts, telemetry, and club metrics"
                  : "Manage incoming athlete registrations, memberships, and facility schedules"}
              </p>
            </div>

            {loginError && (
              <div className="mb-5 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono">
                {loginError}
              </div>
            )}

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#94A3B8] font-mono mb-1.5">
                  REGISTERED EMAIL ADDRESS
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder={loginRole === "member" ? "athlete@dito.fit" : "admin@ditofitness.com"}
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#1A1C24] border border-[#262933] text-[#FFF5EE] placeholder:text-[#64748B]/50 focus:border-[#FF5E14] focus:outline-none text-xs sm:text-sm transition-colors"
                  />
                  <Mail className="w-4 h-4 text-[#64748B] absolute left-3.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#94A3B8] font-mono mb-1.5">
                  ACCOUNT PASSKEY / PASSWORD
                </label>
                <div className="relative">
                  <input
                    type="password"
                    required
                    placeholder="••••••••••••"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#1A1C24] border border-[#262933] text-[#FFF5EE] placeholder:text-[#64748B]/50 focus:border-[#FF5E14] focus:outline-none text-xs sm:text-sm transition-colors"
                  />
                  <Lock className="w-4 h-4 text-[#64748B] absolute left-3.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-1 font-mono">
                <label className="flex items-center gap-2 text-[#94A3B8] cursor-pointer">
                  <input type="checkbox" defaultChecked className="accent-[#FF5E14] rounded" />
                  <span>Remember session</span>
                </label>
                <span className="text-[#FF5E14] hover:underline cursor-pointer">
                  Forgot passkey?
                </span>
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full justify-center shadow-lg shadow-[#FF5E14]/25"
                  disabled={isLoginLoading}
                >
                  <span>
                    {isLoginLoading
                      ? "AUTHENTICATING..."
                      : loginRole === "member"
                        ? "ENTER ATHLETE PORTAL"
                        : "AUTHENTICATE STAFF"}
                  </span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </form>

            <div className="mt-8 pt-6 border-t border-[#262933] text-center text-xs text-[#94A3B8]">
              <p>
                No active athlete pass?{" "}
                <button
                  type="button"
                  onClick={() => setActiveTab("register")}
                  className="text-[#FF5E14] font-bold hover:underline cursor-pointer ml-1"
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
              <h1 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-[#FFF5EE] font-space">
                CREATE ATHLETE MEMBERSHIP
              </h1>
              <p className="text-xs text-[#94A3B8] mt-1.5 font-sans">
                Instant digital athlete pass, facility access, and personalized training plan.
              </p>
            </div>

            <form onSubmit={handleRegisterSubmit} className="space-y-6">
              {/* Step 1: Select Plan & Billing */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#FF5E14] font-mono">
                    01 // SELECT MEMBERSHIP TIER
                  </label>
                  <div className="inline-flex items-center p-0.5 rounded-lg bg-[#1A1C24] border border-[#262933] text-[10px] font-mono">
                    <button
                      type="button"
                      onClick={() => setBillingCycle("monthly")}
                      className={`px-2.5 py-1 rounded font-bold uppercase transition-all ${
                        billingCycle === "monthly" ? "bg-[#FF5E14] text-white" : "text-[#94A3B8]"
                      }`}
                    >
                      Monthly
                    </button>
                    <button
                      type="button"
                      onClick={() => setBillingCycle("yearly")}
                      className={`px-2.5 py-1 rounded font-bold uppercase transition-all ${
                        billingCycle === "yearly" ? "bg-[#FF5E14] text-white" : "text-[#94A3B8]"
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
                        className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                          isSelected
                            ? "bg-[#1A1C24] border-[#FF5E14] shadow-[0_0_15px_rgba(255,94,20,0.25)] ring-1 ring-[#FF5E14]"
                            : "bg-[#1A1C24]/60 border-[#262933] hover:border-[#262933]/80"
                        }`}
                      >
                        <div className="text-[11px] font-black uppercase text-[#FFF5EE] font-space">
                          {plan.name}
                        </div>
                        <div className="text-sm font-black text-[#FF5E14] mt-0.5 font-space">
                          {formatINR(price)}
                        </div>
                        <div className="text-[9px] text-[#64748B] font-mono">
                          {billingCycle === "monthly" ? "/ mo" : "/ yr"}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Personal Contact */}
              <div className="space-y-3">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#FF5E14] font-mono">
                  02 // ATHLETE PROFILE
                </label>

                <div>
                  <input
                    type="text"
                    required
                    placeholder="FULL LEGAL NAME"
                    value={regData.fullName}
                    onChange={(e) => setRegData({ ...regData, fullName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#1A1C24] border border-[#262933] text-[#FFF5EE] placeholder:text-[#64748B]/50 focus:border-[#FF5E14] focus:outline-none text-xs sm:text-sm font-sans transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="relative">
                    <input
                      type="email"
                      required
                      placeholder="EMAIL ADDRESS"
                      value={regData.email}
                      onChange={(e) => setRegData({ ...regData, email: e.target.value })}
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-[#1A1C24] border border-[#262933] text-[#FFF5EE] placeholder:text-[#64748B]/50 focus:border-[#FF5E14] focus:outline-none text-xs sm:text-sm font-sans transition-colors"
                    />
                    <Mail className="w-4 h-4 text-[#64748B] absolute left-3 top-1/2 -translate-y-1/2" />
                  </div>

                  <div className="relative">
                    <input
                      type="tel"
                      required
                      placeholder="PHONE NUMBER"
                      value={regData.phone}
                      onChange={(e) => setRegData({ ...regData, phone: e.target.value })}
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-[#1A1C24] border border-[#262933] text-[#FFF5EE] placeholder:text-[#64748B]/50 focus:border-[#FF5E14] focus:outline-none text-xs sm:text-sm font-sans transition-colors"
                    />
                    <Phone className="w-4 h-4 text-[#64748B] absolute left-3 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                <div>
                  <input
                    type="password"
                    placeholder="SET ACCOUNT PASSWORD"
                    value={regData.password}
                    onChange={(e) => setRegData({ ...regData, password: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#1A1C24] border border-[#262933] text-[#FFF5EE] placeholder:text-[#64748B]/50 focus:border-[#FF5E14] focus:outline-none text-xs sm:text-sm font-sans transition-colors"
                  />
                </div>
              </div>

              {/* Step 3: Biometric Baseline */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#FF5E14] font-mono mb-2.5">
                  03 // BIOMETRIC BASELINE
                </label>

                <div className="grid grid-cols-3 gap-2.5">
                  <div>
                    <span className="text-[10px] text-[#64748B] font-mono block mb-1">HEIGHT (CM)</span>
                    <input
                      type="number"
                      value={regData.heightCm}
                      onChange={(e) => setRegData({ ...regData, heightCm: Number(e.target.value) })}
                      className="w-full px-3 py-2 rounded-lg bg-[#1A1C24] border border-[#262933] text-[#FFF5EE] text-xs focus:border-[#FF5E14] focus:outline-none font-mono"
                    />
                  </div>

                  <div>
                    <span className="text-[10px] text-[#64748B] font-mono block mb-1">WEIGHT (KG)</span>
                    <input
                      type="number"
                      value={regData.weightKg}
                      onChange={(e) => setRegData({ ...regData, weightKg: Number(e.target.value) })}
                      className="w-full px-3 py-2 rounded-lg bg-[#1A1C24] border border-[#262933] text-[#FFF5EE] text-xs focus:border-[#FF5E14] focus:outline-none font-mono"
                    />
                  </div>

                  <div>
                    <span className="text-[10px] text-[#64748B] font-mono block mb-1">TARGET GOAL</span>
                    <select
                      value={regData.fitnessGoal}
                      onChange={(e) => setRegData({ ...regData, fitnessGoal: e.target.value })}
                      className="w-full px-2 py-2 rounded-lg bg-[#1A1C24] border border-[#262933] text-[#FFF5EE] text-xs focus:border-[#FF5E14] focus:outline-none cursor-pointer font-sans"
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
                  className="w-full justify-center shadow-lg shadow-[#FF5E14]/25"
                  disabled={isRegLoading}
                >
                  <span>{isRegLoading ? "ACTIVATING PASS..." : `CONFIRM ${selectedPlan.name.toUpperCase()} MEMBERSHIP`}</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </form>

            <div className="mt-6 pt-5 border-t border-[#262933] text-center text-xs text-[#94A3B8]">
              <p>
                Already have an athlete pass?{" "}
                <button
                  type="button"
                  onClick={() => setActiveTab("login")}
                  className="text-[#FF5E14] font-bold hover:underline cursor-pointer ml-1"
                >
                  Member Sign In
                </button>
              </p>
            </div>
          </div>
        )}

      </div>

      <div className="mt-8 text-center font-mono">
        <Link href="/" className="text-xs text-[#94A3B8] hover:text-[#FF5E14] transition-colors flex items-center gap-1">
          <span>&larr;</span> Return to DITO Fitness Homepage
        </Link>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#0A0A0C] text-[#FF5E14] font-mono text-sm">
          Loading authentication gateway...
        </div>
      }
    >
      <AuthContent />
    </Suspense>
  );
}

