import type { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "proj-1",
    title: "Keen — AI-Based HR System",
    subtitle: "Developed at Invictus Hub",
    description:
      "A multi-tenant, AI-based HR platform with localization support, featuring AI interview automation — chat and call interviews with scoring of candidate fit for the job.",
    longDescription:
      "Used Redis and Laravel Horizon for queues and background processing, Sentry for error monitoring, AWS for infrastructure, and GitHub Actions for CI/CD. Integrated third-party platforms including Facebook, Instagram, LinkedIn, Google, Twilio, and VONQ.",
    tags: ["HR Tech", "AI", "Multi-tenant"],
    technologies: ["Laravel", "Vue.js", "Inertia.js", "Redis", "Laravel Horizon", "Sentry", "AWS", "GitHub Actions", "Twilio", "VONQ"],
    liveUrl: "https://app.keen.cc",
    featured: true,
    status: "Live",
    metrics: ["AI chat & call interviews", "Candidate fit scoring", "Multi-tenant + localization", "Social & job-board integrations"],
    year: "Invictus Hub",
  },
  {
    id: "proj-2",
    title: "Josoor Admin",
    subtitle: "Developed at Invictus Hub",
    description:
      "A multi-tenant admin application with localization support. Worked with a team on UI design and API integrations.",
    longDescription:
      "Applied structured frontend architecture, using Zod for schema validation and TypeScript for type safety.",
    tags: ["Admin Panel", "Multi-tenant", "Frontend"],
    technologies: ["Next.js", "TypeScript", "Zod", "React.js"],
    featured: true,
    status: "Live",
    metrics: ["Multi-tenant", "Localization support", "Zod schema validation", "Type-safe architecture"],
    year: "Invictus Hub",
  },
  {
    id: "proj-3",
    title: "Trueleads — LinkedIn Lead Generation",
    subtitle: "Developed at Invictus Hub",
    description:
      "Backend of a LinkedIn lead generation application — building APIs and services in Laravel using a service-based architecture.",
    tags: ["Lead Generation", "Backend", "APIs"],
    technologies: ["Laravel", "PHP", "REST APIs", "MySQL"],
    liveUrl: "https://trueleads.com",
    featured: true,
    status: "Live",
    metrics: ["Service-based architecture", "LinkedIn lead generation", "Laravel APIs"],
    year: "Invictus Hub",
  },
  {
    id: "proj-4",
    title: "MedLink — Healthcare Recall & Monitoring",
    subtitle: "Developed at Invictus Hub",
    description:
      "Worked on the Online Reviews feature: structured questionnaires personalized to each patient's needs, completed by patients from home.",
    longDescription:
      "Built using Laravel, Vue.js, and Inertia.js with a service-based architecture.",
    tags: ["Healthcare", "Full-Stack"],
    technologies: ["Laravel", "Vue.js", "Inertia.js", "MySQL"],
    liveUrl: "https://medlink.co.uk",
    featured: true,
    status: "Live",
    metrics: ["Personalized patient questionnaires", "Remote online reviews", "Service-based architecture"],
    year: "Invictus Hub",
  },
];
