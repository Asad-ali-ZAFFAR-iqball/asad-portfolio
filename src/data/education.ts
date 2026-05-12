import type { Education, Certification } from "@/types";

export const education: Education[] = [
  {
    id: "edu-1",
    institution: "The Islamia University of Bahawalpur",
    degree: "Bachelor of Computer Sciences",
    field: "Computer Software Engineering",
    startYear: "2018",
    endYear: "2022",
    description:
      "Studied core computer science fundamentals including software engineering, programming, databases, and web technologies. Built a strong foundation in problem-solving and software development practices.",
  },
  {
    id: "edu-2",
    institution: "Al Noor College Rahim Yar Khan",
    degree: "Intermediate",
    field: "ICS (Intermediate in Computer Science)",
    startYear: "2015",
    endYear: "2017",
    description:
      "Completed intermediate education with a focus on computer science subjects, building foundational knowledge in computing and mathematics.",
  },
  {
    id: "edu-3",
    institution: "Govt. Boys High School Chak 51P, Rahim Yar Khan",
    degree: "Matriculation",
    field: "Computer Science",
    startYear: "2013",
    endYear: "2014",
    description:
      "Completed matriculation with computer science as a core subject, gaining early exposure to computing concepts.",
  },
];

export const certifications: Certification[] = [
  {
    id: "cert-1",
    name: "Certification & Training Program (CIT)",
    issuer: "CIT Institute",
    issuedDate: "2021",
    skills: ["Web Development", "Programming", "IT Skills"],
  },
  {
    id: "cert-2",
    name: "Basic IT Literacy",
    issuer: "IT Training Program",
    issuedDate: "2020",
    skills: ["IT Fundamentals", "Computer Basics", "Digital Literacy"],
  },
];
