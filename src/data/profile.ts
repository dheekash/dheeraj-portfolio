import type { Profile } from "@/types";

export const profile: Profile = {
  name: "Dheeraj Kashyap",
  role: "Business Intelligence & Analytics Engineer",
  tagline: "Transforming complex business data into scalable analytics solutions, automated workflows, and executive-ready insights.",
  bio: `Business Intelligence & Analytics Engineer at Amplify Analytix and 13×-certified data professional. I design Lakehouse platforms, build CI/CD data environments, and deliver end-to-end analytics — from raw ingestion through to executive-ready reporting that global teams depend on daily.`,
  location: "Greater Bengaluru Area, India",
  email: "kash.dheeraj.yap@gmail.com",
  avatar: "/images/avatar.jpg",
  resumeUrl: "/api/resume",
  calendlyUrl: "https://calendly.com/dheerajkashyap",
  linkedinUrl: "https://linkedin.com/in/kashyap-dheeraj",
  githubUrl: "https://github.com/dheekash",
  stats: [
    { value: "5",   label: "Records processed daily",     suffix: "M+" },
    { value: "188", label: "Pipelines built",              suffix: "+"  },
    { value: "100", label: "Stakeholders supported",       suffix: "+"  },
    { value: "180", label: "Reporting efficiency gain",    suffix: "%"  },
    { value: "6",   label: "Years of experience",          suffix: "+"  },
    { value: "13",  label: "Certifications",               suffix: ""   },
  ],
};
