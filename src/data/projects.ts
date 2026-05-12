import type { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "proj-1",
    title: "NexoPay — Core Banking Platform",
    subtitle: "Enterprise Fintech Infrastructure",
    description:
      "A cloud-native core banking platform processing 10M+ daily financial transactions across Pakistan and the Middle East. Built with microservices architecture, real-time fraud detection, and multi-currency support.",
    longDescription:
      "Architected and led development of NexoPay's transaction processing engine — a distributed system capable of handling peak loads of 50K TPS. Implemented event-sourcing patterns for auditability, real-time Kafka-based fraud signals, and a React-powered operations dashboard.",
    tags: ["Fintech", "Enterprise", "Microservices"],
    technologies: ["Node.js", "TypeScript", "React", "Kafka", "PostgreSQL", "Redis", "Kubernetes", "AWS"],
    liveUrl: "https://nexopay.pk",
    featured: true,
    status: "Live",
    metrics: ["10M+ daily transactions", "62% latency reduction", "99.99% uptime SLA", "50K TPS peak"],
    year: "2022–Present",
  },
  {
    id: "proj-2",
    title: "EduFlow LMS",
    subtitle: "EdTech Platform at Scale",
    description:
      "Contributed to edX.org's learner platform serving 35M+ students worldwide. Built course recommendation engine, interactive dashboards, and enterprise SSO integrations with WCAG 2.1 accessibility compliance.",
    longDescription:
      "Extended the open-source edX platform with advanced recommendation models, performance-optimized Django APIs, and a refreshed React-based learner UI. Delivered SAML/OAuth SSO for Fortune 500 enterprise clients.",
    tags: ["EdTech", "Open Source", "Scale"],
    technologies: ["Python", "Django", "React", "Celery", "Elasticsearch", "PostgreSQL", "GCP"],
    githubUrl: "https://github.com/openedx/edx-platform",
    liveUrl: "https://edx.org",
    featured: true,
    status: "Open Source",
    metrics: ["35M+ learners", "40% API throughput increase", "WCAG 2.1 compliant", "Zero-downtime migration"],
    year: "2020–2021",
  },
  {
    id: "proj-3",
    title: "TeleMed Connect",
    subtitle: "HIPAA-Compliant Telemedicine",
    description:
      "A HIPAA-compliant telemedicine platform with real-time video consultations, HL7 FHIR integrations, electronic prescriptions, and offline-first React Native mobile app. Helped client secure $3.2M Series A.",
    tags: ["Healthcare", "Mobile", "HIPAA"],
    technologies: ["Node.js", "React Native", "MongoDB", "HL7 FHIR", "WebRTC", "Stripe", "Azure", "Firebase"],
    featured: true,
    status: "Live",
    metrics: ["$3.2M Series A enabled", "Crash rate 4.2% → 0.3%", "HIPAA compliant", "iOS & Android"],
    year: "2018–2020",
  },
  {
    id: "proj-4",
    title: "LogiTrack Pro",
    subtitle: "Real-time Supply Chain Dashboard",
    description:
      "A real-time logistics and supply chain management platform with live GPS tracking, automated dispatch, and analytics dashboards. Served 500+ fleet operators across 3 countries.",
    tags: ["Logistics", "Real-time", "Analytics"],
    technologies: ["React", "Node.js", "PostgreSQL", "WebSockets", "MapboxGL", "Redis", "Docker"],
    featured: false,
    status: "Live",
    metrics: ["500+ fleet operators", "Real-time GPS tracking", "3 countries", "35% ops efficiency gain"],
    year: "2019",
  },
  {
    id: "proj-5",
    title: "OpenCart Analytics Engine",
    subtitle: "E-commerce Intelligence Layer",
    description:
      "A pluggable analytics engine for e-commerce platforms providing real-time conversion funnels, cohort analysis, A/B testing infrastructure, and revenue attribution dashboards.",
    tags: ["E-commerce", "Analytics", "SaaS"],
    technologies: ["Python", "FastAPI", "React", "ClickHouse", "Redis", "Celery", "AWS", "Terraform"],
    githubUrl: "https://github.com/asad-ali-zaffar/opencart-analytics",
    featured: false,
    status: "Open Source",
    metrics: ["Real-time analytics", "A/B testing infra", "Revenue attribution", "50+ shops integrated"],
    year: "2021",
  },
  {
    id: "proj-6",
    title: "DevOps Pipeline Accelerator",
    subtitle: "Internal DevTools CLI & Platform",
    description:
      "An internal developer platform (IDP) with a CLI toolkit automating CI/CD pipeline generation, secret rotation, environment provisioning, and deployment observability — adopted by 15 engineering teams.",
    tags: ["DevOps", "Developer Tools", "Automation"],
    technologies: ["Go", "TypeScript", "Terraform", "GitHub Actions", "Kubernetes", "Vault", "Prometheus"],
    githubUrl: "https://github.com/asad-ali-zaffar/devops-accelerator",
    featured: false,
    status: "Open Source",
    metrics: ["Adopted by 15 teams", "Deployment time −82%", "Automated secret rotation", "IaC compliant"],
    year: "2023",
  },
];
