// ─── Core Profile Types ────────────────────────────────────────────────────────

export interface SocialLink {
  platform: string;
  url: string;
  label: string;
}

export interface PersonalInfo {
  name: string;
  title: string;
  tagline: string;
  bio: string;
  location: string;
  email: string;
  phone?: string;
  website?: string;
  avatar?: string;
  socials: SocialLink[];
  resumeUrl?: string;
  openToWork: boolean;
}

// ─── Experience Types ──────────────────────────────────────────────────────────

export interface ExperienceItem {
  id: string;
  company: string;
  companyUrl?: string;
  logo?: string;
  role: string;
  type: "Full-time" | "Part-time" | "Contract" | "Freelance" | "Internship";
  location: string;
  locationType: "Remote" | "On-site" | "Hybrid";
  startDate: string;
  endDate: string | "Present";
  summary: string;
  responsibilities: string[];
  achievements: string[];
  technologies: string[];
}

// ─── Skills Types ──────────────────────────────────────────────────────────────

export type SkillLevel = "Expert" | "Advanced" | "Proficient" | "Familiar";

export interface Skill {
  name: string;
  level: SkillLevel;
  proficiency: number; // 0-100
  icon?: string;
}

export interface SkillCategory {
  id: string;
  category: string;
  icon: string;
  color: string;
  skills: Skill[];
}

// ─── Project Types ─────────────────────────────────────────────────────────────

export type ProjectStatus = "Live" | "In Development" | "Archived" | "Open Source";

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription?: string;
  image?: string;
  tags: string[];
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  caseStudyUrl?: string;
  featured: boolean;
  status: ProjectStatus;
  metrics?: string[];
  year: string;
}

// ─── Education & Certification Types ──────────────────────────────────────────

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startYear: string;
  endYear: string;
  grade?: string;
  description?: string;
  logo?: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  issuerLogo?: string;
  issuedDate: string;
  expiryDate?: string;
  credentialId?: string;
  credentialUrl?: string;
  skills: string[];
}

// ─── Testimonial Types ─────────────────────────────────────────────────────────

export interface Testimonial {
  id: string;
  name: string;
  title: string;
  company: string;
  avatar?: string;
  relationship: string;
  content: string;
  linkedinUrl?: string;
  rating: number;
}

// ─── Stat Types ────────────────────────────────────────────────────────────────

export interface Stat {
  label: string;
  value: string;
  suffix?: string;
  icon: string;
}
