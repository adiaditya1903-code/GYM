"use client";

import { MEMBERSHIP_PLANS, MembershipPlan } from "@/data/memberships";

export interface TourInquiry {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  goal: string;
  preferredMembership: string;
  preferredDate: string;
  message: string;
  createdAt: string;
  status: "New" | "Contacted" | "Tour Scheduled" | "Converted";
}

export interface MemberProfile {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  membershipPlanId: string;
  membershipPlanName: string;
  billingCycle: "monthly" | "yearly";
  status: "Active" | "Expiring" | "Inactive";
  joinedDate: string;
  expiryDate: string;
  daysRemaining: number;
  qrCodeToken: string;
  trainerName: string;
  assignedWorkout: string;
  currentWeightKg: number;
  targetWeightKg: number;
  heightCm: number;
  bmi: number;
  attendanceStreak: number;
  workoutsCompleted: number;
  invoices: {
    id: string;
    date: string;
    amount: number;
    plan: string;
    status: "Paid" | "Pending";
  }[];
}

const INITIAL_INQUIRIES: TourInquiry[] = [
  {
    id: "inq-101",
    fullName: "Pooja Hegde",
    phone: "+91 98765 43210",
    email: "pooja.h@example.com",
    goal: "Muscle Gain",
    preferredMembership: "DITO PRO",
    preferredDate: "Tomorrow at 6:00 PM",
    message: "Interested in the hypertrophy coaching protocol and strength zone equipment.",
    createdAt: "2026-09-17T14:30:00Z",
    status: "New",
  },
  {
    id: "inq-102",
    fullName: "Devraj Sengupta",
    phone: "+91 98112 34567",
    email: "devraj.s@example.com",
    goal: "Strength & Powerlifting",
    preferredMembership: "DITO ELITE",
    preferredDate: "Saturday at 11:00 AM",
    message: "Looking for dedicated competition prep coaching with coach Arjun Rao.",
    createdAt: "2026-09-16T18:15:00Z",
    status: "Contacted",
  },
  {
    id: "inq-103",
    fullName: "Meera Krishnan",
    phone: "+91 97234 56789",
    email: "meera.k@example.com",
    goal: "Fat Loss & Conditioning",
    preferredMembership: "DITO PRO",
    preferredDate: "Friday at 7:30 AM",
    message: "Want to try the functional turf track and recovery sauna suite.",
    createdAt: "2026-09-15T09:40:00Z",
    status: "Tour Scheduled",
  },
];

const INITIAL_MEMBERS: MemberProfile[] = [
  {
    id: "mem-001",
    fullName: "Alex Mercer",
    email: "alex.mercer@dito.fit",
    phone: "+91 99887 76655",
    membershipPlanId: "pro",
    membershipPlanName: "DITO PRO",
    billingCycle: "monthly",
    status: "Active",
    joinedDate: "2026-01-15",
    expiryDate: "2026-10-15",
    daysRemaining: 27,
    qrCodeToken: "DITO-PASS-PRO-98421",
    trainerName: "Rahul Shetty",
    assignedWorkout: "Chest + Triceps Hypertrophy",
    currentWeightKg: 78.4,
    targetWeightKg: 82.0,
    heightCm: 182,
    bmi: 23.7,
    attendanceStreak: 14,
    workoutsCompleted: 58,
    invoices: [
      { id: "INV-2026-09", date: "15 Sep 2026", amount: 1999, plan: "DITO PRO (Monthly)", status: "Paid" },
      { id: "INV-2026-08", date: "15 Aug 2026", amount: 1999, plan: "DITO PRO (Monthly)", status: "Paid" },
      { id: "INV-2026-07", date: "15 Jul 2026", amount: 1999, plan: "DITO PRO (Monthly)", status: "Paid" },
    ],
  },
  {
    id: "mem-002",
    fullName: "Sunita Roy",
    email: "sunita.roy@example.com",
    phone: "+91 91234 56780",
    membershipPlanId: "elite",
    membershipPlanName: "DITO ELITE",
    billingCycle: "yearly",
    status: "Active",
    joinedDate: "2025-11-10",
    expiryDate: "2026-11-10",
    daysRemaining: 53,
    qrCodeToken: "DITO-PASS-ELITE-11029",
    trainerName: "Arjun Rao",
    assignedWorkout: "Deadlift & Kinetic Posterior Chain",
    currentWeightKg: 62.1,
    targetWeightKg: 60.0,
    heightCm: 168,
    bmi: 22.0,
    attendanceStreak: 21,
    workoutsCompleted: 114,
    invoices: [
      { id: "INV-2025-11", date: "10 Nov 2025", amount: 34990, plan: "DITO ELITE (Annual)", status: "Paid" },
    ],
  },
  {
    id: "mem-003",
    fullName: "Kabir Mehta",
    email: "kabir.m@example.com",
    phone: "+91 94567 89012",
    membershipPlanId: "starter",
    membershipPlanName: "DITO STARTER",
    billingCycle: "monthly",
    status: "Expiring",
    joinedDate: "2026-06-20",
    expiryDate: "2026-09-22",
    daysRemaining: 4,
    qrCodeToken: "DITO-PASS-START-44589",
    trainerName: "Self-Guided (Floor Support)",
    assignedWorkout: "Full Body Compound Push/Pull",
    currentWeightKg: 85.0,
    targetWeightKg: 78.0,
    heightCm: 175,
    bmi: 27.7,
    attendanceStreak: 6,
    workoutsCompleted: 32,
    invoices: [
      { id: "INV-2026-08", date: "20 Aug 2026", amount: 999, plan: "DITO STARTER (Monthly)", status: "Paid" },
    ],
  },
];

const STORAGE_KEYS = {
  INQUIRIES: "dito_inquiries_db",
  MEMBERS: "dito_members_db",
  ACTIVE_USER: "dito_active_member",
  PLANS: "dito_plans_db",
};

export const MockDb = {
  getInquiries(): TourInquiry[] {
    if (typeof window === "undefined") return INITIAL_INQUIRIES;
    const stored = localStorage.getItem(STORAGE_KEYS.INQUIRIES);
    if (!stored) {
      localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(INITIAL_INQUIRIES));
      return INITIAL_INQUIRIES;
    }
    try {
      return JSON.parse(stored);
    } catch {
      return INITIAL_INQUIRIES;
    }
  },

  addInquiry(inquiry: Omit<TourInquiry, "id" | "createdAt" | "status">): TourInquiry {
    const list = this.getInquiries();
    const newInq: TourInquiry = {
      ...inquiry,
      id: `inq-${Date.now().toString().slice(-4)}`,
      createdAt: new Date().toISOString(),
      status: "New",
    };
    const updated = [newInq, ...list];
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(updated));
    }
    return newInq;
  },

  updateInquiryStatus(id: string, status: TourInquiry["status"]) {
    const list = this.getInquiries();
    const updated = list.map((inq) => (inq.id === id ? { ...inq, status } : inq));
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(updated));
    }
    return updated;
  },

  getMembers(): MemberProfile[] {
    if (typeof window === "undefined") return INITIAL_MEMBERS;
    const stored = localStorage.getItem(STORAGE_KEYS.MEMBERS);
    if (!stored) {
      localStorage.setItem(STORAGE_KEYS.MEMBERS, JSON.stringify(INITIAL_MEMBERS));
      return INITIAL_MEMBERS;
    }
    try {
      return JSON.parse(stored);
    } catch {
      return INITIAL_MEMBERS;
    }
  },

  getActiveMember(): MemberProfile {
    const members = this.getMembers();
    return members[0] || INITIAL_MEMBERS[0];
  },

  registerNewMember(memberData: {
    fullName: string;
    email: string;
    phone: string;
    planId: string;
    billingCycle: "monthly" | "yearly";
    heightCm?: number;
    weightKg?: number;
    fitnessGoal?: string;
  }): MemberProfile {
    const members = this.getMembers();
    const plan = MEMBERSHIP_PLANS.find((p) => p.id === memberData.planId) || MEMBERSHIP_PLANS[1];
    const amount = memberData.billingCycle === "yearly" ? plan.yearlyPrice : plan.monthlyPrice;

    const newMember: MemberProfile = {
      id: `mem-${(members.length + 1).toString().padStart(3, "0")}`,
      fullName: memberData.fullName,
      email: memberData.email,
      phone: memberData.phone,
      membershipPlanId: plan.id,
      membershipPlanName: plan.name,
      billingCycle: memberData.billingCycle,
      status: "Active",
      joinedDate: new Date().toISOString().split("T")[0],
      expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      daysRemaining: 30,
      qrCodeToken: `DITO-PASS-${plan.id.toUpperCase()}-${Math.floor(10000 + Math.random() * 90000)}`,
      trainerName: plan.id === "elite" ? "Arjun Rao (Assigned)" : "DITO Coaching Staff",
      assignedWorkout: "Introductory Kinetic Movement Evaluation",
      currentWeightKg: memberData.weightKg || 74,
      targetWeightKg: (memberData.weightKg || 74) - 3,
      heightCm: memberData.heightCm || 176,
      bmi: Number(((memberData.weightKg || 74) / Math.pow((memberData.heightCm || 176) / 100, 2)).toFixed(1)),
      attendanceStreak: 1,
      workoutsCompleted: 1,
      invoices: [
        {
          id: `INV-${new Date().getFullYear()}-${Date.now().toString().slice(-4)}`,
          date: "Today",
          amount,
          plan: `${plan.name} (${memberData.billingCycle === "yearly" ? "Annual" : "Monthly"})`,
          status: "Paid",
        },
      ],
    };

    const updated = [newMember, ...members];
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEYS.MEMBERS, JSON.stringify(updated));
    }
    return newMember;
  },

  getPlans(): MembershipPlan[] {
    if (typeof window === "undefined") return MEMBERSHIP_PLANS;
    const stored = localStorage.getItem(STORAGE_KEYS.PLANS);
    if (!stored) {
      localStorage.setItem(STORAGE_KEYS.PLANS, JSON.stringify(MEMBERSHIP_PLANS));
      return MEMBERSHIP_PLANS;
    }
    try {
      return JSON.parse(stored);
    } catch {
      return MEMBERSHIP_PLANS;
    }
  },

  updatePlanPrice(planId: string, monthlyPrice: number, yearlyPrice: number) {
    const plans = this.getPlans();
    const updated = plans.map((p) =>
      p.id === planId ? { ...p, monthlyPrice, yearlyPrice } : p
    );
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEYS.PLANS, JSON.stringify(updated));
    }
    return updated;
  },
};
