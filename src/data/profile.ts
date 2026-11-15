import type { PersonalInfo, Stat } from "@/types";
import { projects } from "./projects";
import { withBasePath } from "@/lib/utils";

export const personalInfo: PersonalInfo = {
  name: "Asad Ali Zaffar",
  title: "Laravel Developer | Full-Stack Engineer",
  tagline:
    "Building scalable web applications with PHP, Laravel, TypeScript, Vue.js and React.js — from database design to production release.",
  bio: `Laravel and full-stack developer with 3+ years of experience building scalable web applications across the PHP/Laravel ecosystem and modern JavaScript frameworks (Vue.js, React.js) using TypeScript.

  Hands-on experience with Eloquent ORM, RESTful API design, Laravel Queues/Jobs monitored via Laravel Horizon, Redis caching, Docker containerization, and CI/CD pipeline setup with SSH-managed deployments.

  Comfortable owning features end-to-end, from database design through third-party integrations (Google, Facebook, Twilio, Google Maps) and production release.`,
  location: "Lahore, Punjab, Pakistan",
  email: "contactwithasad226@gmail.com",
  phone: "+92 308 3962198",
  openToWork: true,
  resumeUrl: withBasePath("/asad-ali-zaffar.pdf"),
  socials: [
    {
      platform: "LinkedIn",
      url: "https://www.linkedin.com/in/asad-ali-full-stack-developer",
      label: "LinkedIn Profile",
    },
    {
      platform: "GitHub",
      url: "https://github.com/Asad-ali-ZAFFAR-iqball",
      label: "GitHub Profile",
    },
    {
      platform: "Email",
      url: "mailto:contactwithasad226@gmail.com",
      label: "Send Email",
    },
  ],
};

export const stats: Stat[] = [
  { label: "Years of Experience", value: "3", suffix: "+", icon: "calendar" },
  { label: "Projects Built", value: String(projects.length), suffix: "", icon: "briefcase" },
  { label: "Third-party Integrations", value: "10", suffix: "+", icon: "users" },
  { label: "Technologies", value: "25", suffix: "+", icon: "star" },
];
