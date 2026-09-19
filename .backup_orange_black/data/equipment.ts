export interface EquipmentItem {
  id: "dumbbell" | "barbell" | "kettlebell" | "weight-plate";
  name: string;
  tagline: string;
  category: string;
  weightRange: string;
  targetMuscles: string[];
  specs: {
    material: string;
    gripDiameter: string;
    tolerance: string;
    finish: string;
  };
  description: string;
  keyBenefits: string[];
}

export const EQUIPMENT_ITEMS: EquipmentItem[] = [
  {
    id: "dumbbell",
    name: "DUMBBELL",
    tagline: "Precision strength. Maximum control.",
    category: "Free Weight Isolation & Hypertrophy",
    weightRange: "5 – 40 KG",
    targetMuscles: ["Arms (Biceps/Triceps)", "Shoulders (Deltoids)", "Chest (Pectorals)", "Upper Back"],
    specs: {
      material: "High-Tensile Steel & Molded Urethane",
      gripDiameter: "32mm Ergonomic Knurled Handle",
      tolerance: "± 10 grams Calibrated",
      finish: "Hard Chrome Shaft + Matte Armor Black",
    },
    description: "",
    keyBenefits: [
      "Unilateral balance prevents muscle compensation",
      "Greater range of motion than fixed barbells",
      "Ergonomic handle contours relieve wrist torque",
    ],
  },
  {
    id: "barbell",
    name: "OLYMPIC BARBELL",
    tagline: "The absolute benchmark of compound power.",
    category: "Maximal Force & Neuromuscular Recruitment",
    weightRange: "20 – 250+ KG (Bar + Plates)",
    targetMuscles: ["Posterior Chain (Glutes/Hamstrings)", "Quads", "Spinal Erectors", "Core & Lats"],
    specs: {
      material: "215,000 PSI High-Yield Alloy Steel",
      gripDiameter: "28.5mm Olympic Standard",
      tolerance: "± 0.05% Straightness Tolerance",
      finish: "Cerakote & Hard Chrome Needle Bearings",
    },
    description: "Built to handle massive bend without permanent deflection. 5 needle bearings per sleeve deliver whisper-smooth spin during cleans, snatches, and heavy presses.",
    keyBenefits: [
      "Highest total kinetic load capacity in training",
      "Stimulates systemic testosterone & growth response",
      "Standardized benchmark for powerlifting & Olympic lifting",
    ],
  },
  {
    id: "kettlebell",
    name: "COMPETITION KETTLEBELL",
    tagline: "Explosive hip hinge. Unrivaled work capacity.",
    category: "Ballistic Power & Core Dynamics",
    weightRange: "8 – 32 KG",
    targetMuscles: ["Hips & Glutes", "Shoulder Stabilizers", "Core Rotators", "Forearms & Grip"],
    specs: {
      material: "Solid Monobloc Ductile Cast Iron",
      gripDiameter: "35mm Uniform Window Handle",
      tolerance: "Zero Hollow Core / Uniform Dimensions",
      finish: "Raw Micro-Textured Steel Handle",
    },
    description: "Uniform dimensions across all weight categories preserve consistent muscle memory. Flawlessly smooth bare-metal handle prevents blister friction during high-rep swings and snatches.",
    keyBenefits: [
      "Dynamic center-of-mass shifts accelerate stabilizer recruitment",
      "Unlocks multi-planar rotational velocity",
      "Cardiovascular VO2 max boost alongside muscular hypertrophy",
    ],
  },
  {
    id: "weight-plate",
    name: "CALIBRATED BUMPER PLATE",
    tagline: "Dead bounce. Exacting competition calibration.",
    category: "Olympic Loading & Floor Protection",
    weightRange: "5 – 25 KG",
    targetMuscles: ["Compound Load Progression", "Full Kinetic Chain"],
    specs: {
      material: "100% Virgin High-Durometer Rubber",
      gripDiameter: "50.4mm Olympic Precision Collar Ring",
      tolerance: "± 10 grams IPF Standard",
      finish: "Triple Chrome Center Hub with Matte Emboss",
    },
    description: "Forged with dual-sided ergonomic recessed grip handles for seamless racking and un-racking, paired with a solid steel hub to ensure minimal bounce upon heavy drop.",
    keyBenefits: [
      "Thin-profile profile enables 280kg+ bar loading",
      "Zero oil sheen or foul chemical odor",
      "Protects flooring and barbell sleeves from shock damage",
    ],
  },
];
