export interface Testimonial {
  id: string;
  name: string;
  role: string;
  program: string;
  rating: number;
  quote: string;
  highlight: string;
  timeframe: string;
  stats: {
    label: string;
    value: string;
  };
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Karan Singhania",
    role: "Software Architect",
    program: "Strength & Conditioning",
    rating: 5,
    quote: "DITO completely changed how I approach training. The equipment quality, telemetry tracking, and coach guidance helped me add 40kg to my deadlift while staying injury-free.",
    highlight: "Shattered my plateau in 12 weeks",
    timeframe: "Member for 14 months",
    stats: {
      label: "Deadlift Max",
      value: "+40 KG",
    },
  },
  {
    id: "t2",
    name: "Ananya Deshmukh",
    role: "Product Designer",
    program: "Fat Loss & Hybrid Athlete",
    rating: 5,
    quote: "The environment is intensely motivating without any of the typical gym chaos. Every coach knows their biomechanics inside out, and the facility feels like a futuristic training lab.",
    highlight: "Unmatched athletic atmosphere",
    timeframe: "Member for 9 months",
    stats: {
      label: "Body Fat",
      value: "-7.8%",
    },
  },
  {
    id: "t3",
    name: "Rohan Varma",
    role: "Entrepreneur",
    program: "DITO Elite 1-on-1",
    rating: 5,
    quote: "With 60+ hour work weeks, efficiency is non-negotiable. DITO PRO eliminated guesswork with bespoke nutrition and structured 45-minute sessions that deliver tangible weekly results.",
    highlight: "Maximum ROI on training time",
    timeframe: "Member for 2 years",
    stats: {
      label: "Consistency",
      value: "94% Attendance",
    },
  },
];

export interface TransformationStory {
  id: string;
  headline: string;
  protocol: string;
  duration: string;
  strengthGain: string;
  consistency: string;
  workoutsCompleted: number;
  bodyCompChange: string;
  imageUrlBefore: string;
  imageUrlAfter: string;
  notes: string;
}

export const TRANSFORMATIONS: TransformationStory[] = [
  {
    id: "tr1",
    headline: "Recomposition & Kinetic Power",
    protocol: "Hypertrophy + Heavy Barbell Periodization",
    duration: "16 Weeks",
    strengthGain: "+32% Compound Load",
    consistency: "91% Session Rate",
    workoutsCompleted: 64,
    bodyCompChange: "-8.4% Body Fat",
    imageUrlBefore: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=800&q=80",
    imageUrlAfter: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=800&q=80",
    notes: "Demonstration progress case. Individual outcomes vary based on adherence, genetic baseline, and clinical recovery.",
  },
  {
    id: "tr2",
    headline: "Endurance & Lean Functional Density",
    protocol: "Metabolic Conditioning & Functional Turf Work",
    duration: "12 Weeks",
    strengthGain: "+25% Work Capacity",
    consistency: "87% Session Rate",
    workoutsCompleted: 48,
    bodyCompChange: "-6.2% Body Fat",
    imageUrlBefore: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80",
    imageUrlAfter: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80",
    notes: "Demonstration progress case. Structured progressive load with nutrition protocol.",
  },
];
