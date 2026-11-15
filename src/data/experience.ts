import type { ExperienceItem } from "@/types";

export const experiences: ExperienceItem[] = [
  {
    id: "exp-1",
    company: "Invictus Hub",
    companyUrl: "https://invictushub.com",
    role: "Laravel Developer",
    type: "Full-time",
    location: "Lahore, Pakistan",
    locationType: "On-site",
    startDate: "Dec 2023",
    endDate: "Present",
    summary:
      "Building and scaling multi-tenant SaaS products with Laravel, Vue.js, React.js and TypeScript — owning features end-to-end from backend architecture and integrations to deployment.",
    responsibilities: [
      "Improved application performance by implementing Redis caching across high-traffic Eloquent queries and endpoints.",
      "Architected asynchronous background workflows using Laravel Queues and Jobs, monitored via Laravel Horizon, reducing bottlenecks in time-intensive processes.",
      "Built and maintained REST API integrations with Google, Facebook, Twilio, and Google Maps, connecting Laravel backend services to external platforms.",
      "Set up CI/CD pipelines and managed server access via SSH for automated, consistent deployments.",
      "Containerized the application stack with Docker to standardize environments and streamline deployment consistency.",
      "Built full-stack features end-to-end using Vue.js and React.js with TypeScript alongside Laravel and Inertia.js, focused on clean, maintainable code and responsive UI.",
    ],
    achievements: [
      "Contributed to Keen (AI-based HR system), Josoor Admin, Trueleads and MedLink.",
      "Reduced bottlenecks in time-intensive processes through queued background workflows.",
    ],
    technologies: [
      "Laravel", "PHP", "Vue.js", "React.js", "TypeScript", "Inertia.js",
      "Redis", "Laravel Horizon", "Docker", "GitHub Actions", "AWS", "MySQL",
    ],
  },
  {
    id: "exp-2",
    company: "Freelance",
    role: "Remote Developer",
    type: "Freelance",
    location: "Islamabad, Pakistan",
    locationType: "Remote",
    startDate: "Aug 2022",
    endDate: "Nov 2023",
    summary:
      "Delivered custom web applications for clients, managing end-to-end development from API design through database optimization.",
    responsibilities: [
      "Delivered custom web applications for clients, managing end-to-end development from API design through database optimization using Laravel and MySQL.",
      "Maintained clear client communication and consistent deadline delivery across concurrent freelance projects.",
    ],
    achievements: [
      "Consistently delivered on deadlines across concurrent client projects.",
    ],
    technologies: ["Laravel", "PHP", "MySQL", "REST APIs", "JavaScript", "Git"],
  },
  {
    id: "exp-3",
    company: "KFUEIT",
    companyUrl: "https://www.kfueit.edu.pk",
    role: "Laravel Developer (Assistant Programmer)",
    type: "Full-time",
    location: "Rahim Yar Khan, Pakistan",
    locationType: "On-site",
    startDate: "Nov 2022",
    endDate: "Aug 2023",
    summary:
      "Developed and maintained university-wide software systems at Khawaja Fareed University of Engineering & Information Technology.",
    responsibilities: [
      "Implemented Laravel Queues and Jobs to improve reliability of scheduled and background university software processes.",
      "Collaborated on feature design and code reviews, contributing to the maintenance of university-wide software systems.",
    ],
    achievements: [
      "Improved the reliability of scheduled and background processes across university systems.",
    ],
    technologies: ["Laravel", "PHP", "MySQL", "Laravel Queues", "JavaScript", "Git"],
  },
  {
    id: "exp-4",
    company: "Devicon Software House",
    role: "Web Developer Intern",
    type: "Internship",
    location: "Rahim Yar Khan, Pakistan",
    locationType: "On-site",
    startDate: "Sep 2021",
    endDate: "Oct 2022",
    summary:
      "Gained hands-on full-stack development experience on real-world client projects.",
    responsibilities: [
      "Gained hands-on full-stack development experience on real-world client projects.",
    ],
    achievements: [],
    technologies: ["Laravel", "PHP", "HTML5", "CSS3", "JavaScript", "jQuery", "MySQL"],
  },
];
