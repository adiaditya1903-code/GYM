export interface Program {
  id: string;
  number: string;
  name: string;
  category: string;
  shortDescription: string;
  fullDescription: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced" | "All Levels";
  duration: string;
  schedule: string;
  focusAreas: string[];
  sampleSession: {
    warmup: string[];
    main: { exercise: string; sets: string; rpe: string }[];
    cooldown: string[];
  };
  iconName: string;
}

export const PROGRAMS: Program[] = [
  {
    id: "strength-training",
    number: "01",
    name: "STRENGTH TRAINING",
    category: "Progressive Overload",
    shortDescription: "Build raw bar power and mechanical force production through structured progressive compound lifting.",
    fullDescription: "Designed for lifters looking to shatter plateaus. Combines conjugate periodization with bar speed telemetry to maximize neuromuscular efficiency across squat, bench press, deadlift, and overhead press.",
    difficulty: "Intermediate",
    duration: "12 Weeks",
    schedule: "4 Days / Week",
    focusAreas: ["Compound Power", "Neuromuscular Efficiency", "Tendon Density", "Core Rigidity"],
    sampleSession: {
      warmup: ["90/90 Hip Flow (3 mins)", "Band Pull-Aparts (3x20)", "Barbell Complex Warmup"],
      main: [
        { exercise: "Competition Barbell Squat", sets: "5 sets × 3 reps", rpe: "RPE 8.5" },
        { exercise: "Romanian Deadlifts", sets: "4 sets × 6 reps", rpe: "RPE 8.0" },
        { exercise: "Barbell Pendlay Rows", sets: "4 sets × 8 reps", rpe: "RPE 7.5" },
        { exercise: "Hanging Leg Raises", sets: "3 sets × 15 reps", rpe: "RPE 8.0" },
      ],
      cooldown: ["Couch Stretch (2 min/side)", "Thoracic Extension Roller"],
    },
    iconName: "Flame",
  },
  {
    id: "muscle-building",
    number: "02",
    name: "MUSCLE BUILDING",
    category: "Hypertrophy Science",
    shortDescription: "Precision hypertrophy protocols engineered for maximum mechanical tension and balanced aesthetic development.",
    fullDescription: "Utilizes optimized resistance curves, peak contraction angles, and metabolic stress techniques. Every rep range and volume load is customized to stimulate maximal myofibrillar protein synthesis.",
    difficulty: "All Levels",
    duration: "16 Weeks",
    schedule: "5 Days / Week",
    focusAreas: ["Mechanical Tension", "V-Taper Aesthetics", "Sarcoplasmic Volume", "Mind-Muscle Recruitment"],
    sampleSession: {
      warmup: ["Shoulder Dislocates", "Scapular Pull-ups (2x10)", "Light Cable Flyes"],
      main: [
        { exercise: "Incline Dumbbell Press", sets: "4 sets × 8–10 reps", rpe: "RPE 8.5" },
        { exercise: "High-to-Low Cable Fly", sets: "3 sets × 12–15 reps", rpe: "RPE 9.0" },
        { exercise: "Seated Dumbbell Lateral Raise", sets: "4 sets × 15 reps (Drop Set)", rpe: "RPE 9.5" },
        { exercise: "Dual Rope Triceps Pushdown", sets: "3 sets × 12 reps", rpe: "RPE 8.5" },
      ],
      cooldown: ["Chest Wall Stretch", "Child's Pose Breathing"],
    },
    iconName: "Zap",
  },
  {
    id: "fat-loss",
    number: "03",
    name: "FAT LOSS",
    category: "Metabolic Conditioning",
    shortDescription: "Dense compound lifting paired with high-intensity interval conditioning for sustainable caloric expenditure.",
    fullDescription: "Torch body fat while fiercely protecting lean muscle mass. Our dual-phase protocol spikes excess post-exercise oxygen consumption (EPOC) for elevated 24-hour metabolic expenditure without sacrificing strength.",
    difficulty: "All Levels",
    duration: "8 Weeks",
    schedule: "4–5 Days / Week",
    focusAreas: ["EPOC Caloric Burn", "Insulin Sensitivity", "Lean Preservation", "Cardiovascular Pacing"],
    sampleSession: {
      warmup: ["Jump Rope Intervals (4 mins)", "World's Greatest Stretch", "Bodyweight Squats"],
      main: [
        { exercise: "Trap Bar Deadlift", sets: "4 sets × 8 reps", rpe: "RPE 8.0" },
        { exercise: "Dumbbell Thrusters", sets: "4 sets × 12 reps", rpe: "RPE 8.5" },
        { exercise: "Kettlebell Swing Intervals", sets: "5 rounds × 45s work / 15s rest", rpe: "RPE 9.0" },
        { exercise: "Assault Bike Sprint Finisher", sets: "6 intervals × 20s Max Wattage", rpe: "RPE 10.0" },
      ],
      cooldown: ["Light Treadmill Walk (5 mins)", "Static Quad & Hamstring Stretch"],
    },
    iconName: "Activity",
  },
  {
    id: "personal-training",
    number: "04",
    name: "PERSONAL TRAINING",
    category: "1-on-1 Bespoke Protocol",
    shortDescription: "Dedicated private coaching tailored entirely to your structural leverage, lifestyle, and individual goals.",
    fullDescription: "Receive an elite training architect dedicated to your transformation. Includes continuous bio-feedback monitoring, weekly form biomechanics auditing, tailored lifestyle adaptations, and direct coach telemetry.",
    difficulty: "All Levels",
    duration: "Flexible / Monthly",
    schedule: "Custom (2–5 Days)",
    focusAreas: ["Tailored Biomechanics", "Accountability", "Injury Mitigation", "Accelerated Milestones"],
    sampleSession: {
      warmup: ["Individualized Pre-hab Mobility Protocol", "Activation Band Matrix"],
      main: [
        { exercise: "Coach-Supervised Primary Compound Lift", sets: "Individualized", rpe: "Targeted" },
        { exercise: "Unilateral Asymmetry Correction", sets: "3–4 sets", rpe: "Guided" },
        { exercise: "Hypertrophy Accessory Circuit", sets: "3 sets × 12 reps", rpe: "Form Focused" },
        { exercise: "Targeted Core Anti-Extension", sets: "3 sets", rpe: "Controlled" },
      ],
      cooldown: ["Assisted PNF Stretching with Coach", "Breathwork Down-regulation"],
    },
    iconName: "Trophy",
  },
  {
    id: "conditioning",
    number: "05",
    name: "CONDITIONING",
    category: "Kinetic Velocity & Agility",
    shortDescription: "Elevate explosive speed, multi-planar agility, anaerobic capacity, and athletic resilience.",
    fullDescription: "Train like a hybrid professional athlete. Integrates plyometrics, unilateral power, reactive sprint drills, and functional velocity work to build a physique that moves with unmatched athleticism and durability.",
    difficulty: "Advanced",
    duration: "10 Weeks",
    schedule: "4 Days / Week",
    focusAreas: ["Rate of Force Development", "Rotational Torque", "Multi-Planar Agility", "Joint Durability"],
    sampleSession: {
      warmup: ["Dynamic Pogo Hops", "Ankle Mobility Drill", "Lateral Band Walks"],
      main: [
        { exercise: "Hang Power Cleans", sets: "5 sets × 3 reps", rpe: "RPE 8.0" },
        { exercise: "Medicine Ball Rotational Slams", sets: "4 sets × 6/side", rpe: "Max Velocity" },
        { exercise: "Bulgarian Split Squats (Dumbbells)", sets: "4 sets × 8/leg", rpe: "RPE 8.5" },
        { exercise: "Sprint Deceleration Stops", sets: "6 sets × 20 meters", rpe: "Explosive" },
      ],
      cooldown: ["Foam Rolling Calves & Quads", "Banded Hip Distraction"],
    },
    iconName: "Shield",
  },
];
