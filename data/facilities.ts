export interface FacilityZone {
  id: string;
  name: string;
  tag: string;
  subtitle: string;
  description: string;
  specs: {
    area: string;
    equipmentCount: string;
    temperature: string;
    ventilation: string;
  };
  highlights: string[];
  imageUrl: string;
}

export const FACILITIES: FacilityZone[] = [
  {
    id: "strength-zone",
    name: "Strength Zone",
    tag: "Heavy Compound Lifting",
    subtitle: "Custom calibrated power racks & competition platforms",
    description: "Equipped with 8 Eleiko IPF-certified power cages, calibrated steel plates, band pegs, and safety spotter arms built to support heavy deadlifts, squats, and bench presses.",
    specs: {
      area: "3,500 sq.ft",
      equipmentCount: "45+ Stations",
      temperature: "19°C Controlled",
      ventilation: "Hospital-Grade HEPA Filtration",
    },
    highlights: ["Eleiko IPF Power Cages", "Specialty Bars (Safety Squat, Swiss, Trap)", "Laser-leveled shock absorption platforms"],
    imageUrl: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "free-weights",
    name: "Free Weights Lab",
    tag: "Dumbbells & Calibrated Iron",
    subtitle: "Custom urethane dumbbells from 2.5kg to 60kg",
    description: "A wide, uninterrupted free-weight line flanked by custom-angled zero-wobble incline/decline benches and full-length mirrors with anti-glare studio lighting.",
    specs: {
      area: "2,800 sq.ft",
      equipmentCount: "120+ Pairs",
      temperature: "20°C Constant",
      ventilation: "Quad Dynamic Airflow",
    },
    highlights: ["Urethane Hex & Round Dumbbells up to 60kg", "12 Adjustable heavy-gauge benches", "Rubberized acoustic floor damping"],
    imageUrl: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "functional-training",
    name: "Functional Arena",
    tag: "Agility, Turf & Conditioning",
    subtitle: "30-meter indoor sprint turf with sled push lanes",
    description: "Designed for explosive kinetic work, plyometrics, medicine ball throws, and sled drag intervals. Open-concept floor for functional group performance.",
    specs: {
      area: "2,500 sq.ft",
      equipmentCount: "30+ Toolsets",
      temperature: "20°C Flowing",
      ventilation: "Fresh-Air Exchange System",
    },
    highlights: ["Sprint Turf Track", "Torque Tank M4 Resistance Sleds", "Gymnastic Rings & High Rigging"],
    imageUrl: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "cardio-zone",
    name: "High-Tech Cardio",
    tag: "Bio-Telemetry & Endurance",
    subtitle: "Interactive telemetry consoles with live heart-rate sync",
    description: "Curved manual woodway treadmills, Concept2 PM5 Rowers, SkiErgs, and Wattbikes connected to your personal DITO telemetry profile for real-time output tracking.",
    specs: {
      area: "2,000 sq.ft",
      equipmentCount: "35 Machines",
      temperature: "18°C Rapid Chill",
      ventilation: "Dual High-Volume Air Scrubbers",
    },
    highlights: ["Woodway Curve Non-Motorized Treadmills", "Concept2 RowErg & SkiErg Stations", "Wattbike Pro Cycling Simulators"],
    imageUrl: "https://images.unsplash.com/photo-1576678927484-cc907957088c?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "recovery-area",
    name: "Recovery & Bio-Regen",
    tag: "Cryo & Infrared Wellness",
    subtitle: "Accelerate recovery with infrared heat & cold therapy",
    description: "Featuring full-spectrum infrared saunas, custom ice immersion plunge baths at 4°C, and NormaTec pneumatic compression boots to restore CNS freshness.",
    specs: {
      area: "1,800 sq.ft",
      equipmentCount: "12 Recovery Suites",
      temperature: "Custom Ambient Suites",
      ventilation: "Aromatherapy Ozone Purified",
    },
    highlights: ["Sub-zero cold plunge tubs", "Full-spectrum infrared cedar saunas", "NormaTec 3 air compression lounge"],
    imageUrl: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "locker-room",
    name: "Executive Locker Suites",
    tag: "Privacy & Refresh",
    subtitle: "Spacious private rain showers & biometric digital lockers",
    description: "Luxurious matte-black aesthetic with rainfall showers, Dyson hair styling bars, towel valet service, and biometric smart lockers for seamless visits.",
    specs: {
      area: "2,200 sq.ft",
      equipmentCount: "160 Lockers",
      temperature: "22°C Gentle Warmth",
      ventilation: "Humidity Balanced HVAC",
    },
    highlights: ["RFID & Biometric keyless lockers", "Rain showers with organic grooming essentials", "Complimentary towel & laundry valet"],
    imageUrl: "https://images.unsplash.com/photo-1598970434795-0c54fe7c0648?auto=format&fit=crop&w=1200&q=80",
  },
];

