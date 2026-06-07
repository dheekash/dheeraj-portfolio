export interface Profile {
  name: string;
  role: string;
  tagline: string;
  bio: string;
  location: string;
  email: string;
  phone?: string;
  avatar: string;
  resumeUrl: string;
  calendlyUrl: string;
  stats: Stat[];
}

export interface Stat {
  value: string;
  label: string;
  suffix?: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface Skill {
  name: string;
  level?: number;
  icon?: string;
}

export interface SkillCategory {
  category: string;
  icon: string;
  color: string;
  skills: Skill[];
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  summary: string;
  problem: string;
  solution: string;
  challenges: string[];
  results: string[];
  businessImpact: string;
  techStack: string[];
  metrics: Metric[];
  tags: string[];
  featured: boolean;
  confidential?: boolean;
  clientLabel?: string;
  color: string;
  gradient: string;
}

export interface Metric {
  value: string;
  label: string;
  icon?: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  startYear: number;
  endYear: number | null;
  location: string;
  description: string;
  highlights: string[];
  techStack: string[];
  type: "full-time" | "contract" | "consulting";
}

export interface Education {
  id: string;
  degree: string;
  field: string;
  institution: string;
  location: string;
  period: string;
  description?: string;
  achievements?: string[];
}

export interface Certification {
  id: string;
  name: string;
  shortName: string;
  issuer: string;
  issuedDate: string;
  expiryDate?: string;
  credentialId?: string;
  verificationUrl?: string;
  skills: string[];
  category: CertCategory;
  logo?: string;
  status: "active" | "expired" | "in-progress";
  featured?: boolean;
}

export type CertCategory =
  | "Data Engineering"
  | "Analytics"
  | "Cloud"
  | "AI & ML"
  | "Business Intelligence"
  | "Security"
  | "Productivity";

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar?: string;
  quote: string;
  placeholder?: boolean;
}

export interface ConsultingService {
  id: string;
  title: string;
  description: string;
  icon: string;
  deliverables: string[];
  color: string;
}

export interface NavItem {
  label: string;
  href: string;
}
