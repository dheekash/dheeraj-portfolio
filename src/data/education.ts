import type { Education } from "@/types";

export const educationList: Education[] = [
  {
    id: "deakin-msc",
    degree: "Master of Science",
    field: "Data Science",
    institution: "Deakin University",
    location: "Melbourne, Australia",
    period: "2022 – 2024",
    description:
      "Advanced studies in machine learning, statistical modelling, big data analytics, and data-driven decision making.",
    achievements: [
      "Specialization in predictive modelling and time-series analysis",
      "Research focus on lakehouse architectures and modern data stack",
      "Applied ML techniques to real-world enterprise datasets",
    ],
  },
  {
    id: "reva-be",
    degree: "Bachelor of Engineering",
    field: "Information Science",
    institution: "REVA University",
    location: "Bengaluru, India",
    period: "2015 – 2019",
    description:
      "Foundation in computer science, database systems, software engineering, and information management.",
    achievements: [
      "Core competencies in database design and SQL",
      "Projects in software development and system analysis",
      "Strong foundation in algorithms and data structures",
    ],
  },
];
