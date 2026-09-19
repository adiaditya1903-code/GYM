export interface Program {
  id: string;
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
    id: "strength",
    name: "STRENGTH",
    category: "Progressive Overload",
    shortDescription: "Build serious raw strength with structured progressive barbell and compound training.",
    fullDescription: "Designed for individuals looking to shatter plateaus. Combines conjugate periodization with scientific bar speed metrics to maximize force output across squat, bench press, deadlift, and overhead movements.",
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
    name: "MUSCLE BUILDING",
    category: "Hypertrophy Science",
    shortDescription: "Training programs meticulously engineered for targeted muscle hypertrophy and aesthetics.",
    fullDescription: "Utilizes optimized mechanical tension, peak muscle contraction angles, and metabolic stress techniques. Every rep range is customized to induce maximal myofibrillar protein synthesis.",
    difficulty: "All Levels",
    duration: "16 Weeks",
    schedule: "5 Days / Week",
    focusAreas: ["Hypertrophy", "V-Taper Aesthetics", "Sarcoplasmic Volume", "Mind-Muscle Connection"],
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
    name: "FAT LOSS",
    category: "Metabolic Conditioning",
    shortDescription: "Combine heavy compound lifting, high-intensity intervals, and nutrition-focused pacing.",
    fullDescription: "Torch visceral and subcutaneous fat while fiercely preserving lean muscle mass. Our dual-phase protocol spikes post-exercise oxygen consumption (EPOC) for elevated 24-hour caloric burn.",
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
    id: "athletic-performance",
    name: "ATHLETIC PERFORMANCE",
    category: "Kinetic Velocity & Agility",
    shortDescription: "Improve explosive speed, rotational power, work capacity, and joint mobility.",
    fullDescription: "Train like a hybrid professional athlete. Integrates plyometrics, unilateral balance, reactive agility drills, and multi-planar velocity training to build a body that looks fast and moves powerfully.",
    difficulty: "Advanced",
    duration: "12 Weeks",
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
  {
    id: "personal-training",
    name: "PERSONAL TRAINING",
    category: "1-on-1 Bespoke Protocol",
    shortDescription: "One-to-one coaching based entirely on your individual goals, lifestyle, and biomechanics.",
    fullDescription: "Receive an elite training architect dedicated to your transformation. Includes continuous bio-feedback monitoring, weekly form biomechanics auditing, tailored lifestyle adaptations, and direct 24/7 coach messaging.",
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
];

