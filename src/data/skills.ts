import type { SkillCategory } from "@/types";

export const skillCategories: SkillCategory[] = [
  {
    id: "frontend",
    category: "Frontend",
    icon: "monitor",
    color: "from-blue-500 to-cyan-500",
    skills: [
      { name: "React.js", level: "Advanced", proficiency: 85 },
      { name: "Vue.js", level: "Expert", proficiency: 92 },
      { name: "Next.js", level: "Advanced", proficiency: 80 },
      { name: "Nuxt.js", level: "Advanced", proficiency: 80 },
      { name: "Tailwind CSS", level: "Expert", proficiency: 95 },
      { name: "Inertia.js", level: "Expert", proficiency: 90 },
      { name: "Livewire", level: "Expert", proficiency: 88 },
      { name: "jQuery", level: "Expert", proficiency: 90 },
      { name: "HTML5 / CSS3", level: "Expert", proficiency: 95 },
      { name: "JavaScript", level: "Advanced", proficiency: 85 },
    ],
  },
  {
    id: "backend",
    category: "Backend",
    icon: "server",
    color: "from-violet-500 to-purple-500",
    skills: [
      { name: "Laravel", level: "Expert", proficiency: 95 },
      { name: "PHP", level: "Expert", proficiency: 93 },
      { name: "REST APIs", level: "Expert", proficiency: 92 },
      { name: "Ajax", level: "Advanced", proficiency: 85 },
      { name: "MVC Pattern", level: "Expert", proficiency: 93 },
      { name: "OOP", level: "Expert", proficiency: 90 },
    ],
  },
  {
    id: "databases",
    category: "Databases",
    icon: "database",
    color: "from-emerald-500 to-teal-500",
    skills: [
      { name: "MySQL", level: "Expert", proficiency: 92 },
      { name: "SQL", level: "Expert", proficiency: 90 },
    ],
  },
  {
    id: "tools",
    category: "Tools & Collaboration",
    icon: "cloud",
    color: "from-amber-500 to-orange-500",
    skills: [
      { name: "Git", level: "Advanced", proficiency: 88 },
      { name: "Bitbucket", level: "Advanced", proficiency: 82 },
      { name: "Jira", level: "Proficient", proficiency: 75 },
      { name: "Slack", level: "Proficient", proficiency: 80 },
      { name: "Stack Overflow", level: "Advanced", proficiency: 85 },
    ],
  },
];
