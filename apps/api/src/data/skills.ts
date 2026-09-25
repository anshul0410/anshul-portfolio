import type { SkillCategory } from "../types.js";

export const skillCategories: SkillCategory[] = [
  {
    id: "frontend",
    title: "Frontend",
    description: "Fast, accessible interfaces for web and mobile.",
    skills: ["React", "Next.js", "React Native", "TypeScript", "JavaScript (ES2023+)", "HTML & CSS", "Web performance"],
  },
  {
    id: "backend",
    title: "Backend & APIs",
    description: "Services and contracts the frontend can trust.",
    skills: ["Node.js", "REST APIs", "GraphQL", "Middleware", "API design"],
  },
  {
    id: "ai",
    title: "AI & Agents",
    description: "LLM features that ship to production.",
    skills: [
      "Agentic workflows",
      "Orchestrator / sub-agent design",
      "Model Context Protocol (MCP)",
      "Gemini on Vertex AI",
      "Multimodal input (text, image, video, voice)",
      "Human-in-the-loop guardrails",
    ],
  },
  {
    id: "cloud",
    title: "Cloud & Delivery",
    description: "From commit to production, repeatably.",
    skills: ["GitHub Actions", "Artifactory", "OpenShift", "AWS EKS", "Google Cloud (GCP)", "Multi-environment deployments"],
  },
  {
    id: "observability",
    title: "Observability",
    description: "Knowing what production is doing.",
    skills: ["Kibana dashboards", "Dynatrace", "Alerting on failure rates", "Mobile session tracking"],
  },
  {
    id: "leadership",
    title: "Leadership",
    description: "Making the team better, not just the code.",
    skills: ["Technical leadership", "Mentoring", "Architecture docs", "Engineering process"],
  },
];
