export interface Trainer {
  id: string;
  name: string;
  role: string;
  specialization: string;
  experienceYears: number;
  certifications: string[];
  bio: string;
  imageUrl: string;
  socials: {
    instagram?: string;
    linkedin?: string;
    twitter?: string;
  };
  clientRating: number;
  activeAthletes: number;
}

export const TRAINERS: Trainer[] = [
  {
    id: "arjun-rao",
    name: "Arjun Rao",
    role: "Head Strength Coach",
    specialization: "Powerlifting & Barbell Biomechanics",
    experienceYears: 8,
    certifications: ["CSCS (Certified Strength & Conditioning)", "USAW Level 2", "Precision Nutrition L1"],
    bio: "Specializing in raw bar power and mechanical leverage optimization. Arjun has conditioned competitive powerlifters and high-level corporate athletes across South Asia.",
    imageUrl: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80",
    socials: {
      instagram: "@arjun.strength",
      linkedin: "arjun-rao-strength",
    },
    clientRating: 4.9,
    activeAthletes: 42,
  },
  {
    id: "rahul-shetty",
    name: "Rahul Shetty",
    role: "Senior Hypertrophy Coach",
    specialization: "Muscle Building & Body Composition",
    experienceYears: 7,
    certifications: ["ACE Certified Personal Trainer", "ISSA Master Trainer", "Hypertrophy Science Cert"],
    bio: "Obsessed with tension curves and muscle fiber recruitment. Rahul crafts science-backed hypertrophy regimes that deliver symmetrical, balanced, and aesthetic physiques.",
    imageUrl: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&w=800&q=80",
    socials: {
      instagram: "@shetty_hypertrophy",
      linkedin: "rahul-shetty-fitness",
    },
    clientRating: 4.95,
    activeAthletes: 38,
  },
  {
    id: "sneha-patil",
    name: "Sneha Patil",
    role: "Performance & Conditioning Coach",
    specialization: "Metabolic Conditioning & Functional Mobility",
    experienceYears: 6,
    certifications: ["NASM-CPT", "FMS Level 2 (Functional Movement Screen)", "CrossFit L2"],
    bio: "Dedicated to elevating cardiovascular work capacity, rotational mobility, and sustained conditioning. Sneha helps athletes build resilience against fatigue and joint injuries.",
    imageUrl: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80",
    socials: {
      instagram: "@sneha_kondition",
      linkedin: "sneha-patil-performance",
    },
    clientRating: 5.0,
    activeAthletes: 45,
  },
  {
    id: "vikram-malhotra",
    name: "Vikram Malhotra",
    role: "Athletic Mobility & Rehab Coach",
    specialization: "Kinetic Chain Alignment & Plyometrics",
    experienceYears: 9,
    certifications: ["B.Sc. Exercise Science", "EXOS Performance Specialist", "FRC (Functional Range Conditioning)"],
    bio: "Former track-and-field strength advisor focusing on multi-planar force transfer, reactive sprint speed, and bulletproof joint longevity.",
    imageUrl: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=800&q=80",
    socials: {
      instagram: "@vikram_kinetic",
      linkedin: "vikram-malhotra-exos",
    },
    clientRating: 4.88,
    activeAthletes: 35,
  },
];

