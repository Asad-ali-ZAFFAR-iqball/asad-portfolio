import type { PersonalInfo, Stat } from "@/types";

export const personalInfo: PersonalInfo = {
  name: "Asad Ali Zafar",
  title: "Full Stack Developer",
  tagline: "Building robust web applications with Laravel, Vue, React & more.",
  bio: `I'm Asad Ali, a dedicated Full Stack Developer with a solid background in Laravel, Vue.js, React.js, Inertia.js, Livewire, Next.js, Nuxt.js, MySQL, and REST APIs.

  My primary focus is on Laravel, enabling me to construct robust and efficient web applications. By working with Vue.js, React.js, Inertia, Ajax and REST APIs, I can develop dynamic and interactive user experiences that enhance website functionality. Proficiency in PHP, HTML5, and CSS allows me to create visually appealing and responsive front-end designs.

  I am proficient in JavaScript, leveraging its capabilities to introduce interactivity and functionality to web pages. I also excel in managing databases with MySQL, ensuring smooth operations and data integrity. Experienced in version control using Git, team collaboration via Slack, and managing repositories on Bitbucket and Jira.

  Driven by a strong commitment to continuous learning and a dedication to delivering top-notch solutions, I am eager to tackle new projects and explore cutting-edge technologies in web development.`,
  location: "Rahim Yar Khan District, Punjab, Pakistan",
  email: "contactwithasad786@gmail.com",
  website: "https://asadlaraveldeveloper.my.canva.site/",
  openToWork: true,
  resumeUrl: "/asad-ali-zaffar.pdf",
  socials: [
    {
      platform: "LinkedIn",
      url: "https://www.linkedin.com/in/asad-ali-full-stack-developer",
      label: "LinkedIn Profile",
    },
    {
      platform: "GitHub",
      url: "https://github.com/asad-ali",
      label: "GitHub Profile",
    },
    {
      platform: "Email",
      url: "mailto:contactwithasad786@gmail.com",
      label: "Send Email",
    },
  ],
};

export const stats: Stat[] = [
  { label: "Years of Experience", value: "3", suffix: "+", icon: "calendar" },
  { label: "Projects Delivered", value: "20", suffix: "+", icon: "briefcase" },
  { label: "Clients Served", value: "12", suffix: "+", icon: "users" },
  { label: "Technologies", value: "15", suffix: "+", icon: "star" },
];
