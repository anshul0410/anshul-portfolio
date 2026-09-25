import type { WorkItem } from "../types.js";

// Order matters: the featured item is shown large, the rest fill the grid in order.
export const work: WorkItem[] = [
  {
    id: "service-triage",
    eyebrow: "Flagship",
    meta: "Best Buy India · Lead engineer",
    title: "Service Triage platform",
    summary:
      "An LLM-powered, agentic post-purchase support experience. It replaced a rigid menu flow with context-aware routing — remote support, chat, in-store or in-home appointments, or repair through our insurance partner.",
    metrics: [
      { value: "$20–25M", label: "saved / year" },
      { value: "8M+", label: "customers / year" },
      { value: "5", label: "touchpoints" },
    ],
    tags: ["Next.js", "React Native", "Node.js", "Gemini · Vertex AI", "Web · App · Chatbot · IVR"],
    featured: true,
  },
  {
    id: "agentic-ai",
    eyebrow: "Agentic AI",
    title: "Multimodal agents + MCP",
    summary:
      "Orchestrator with sub-agents for text, photos, video, live camera and voice. MCP servers expose internal services to other teams.",
    tags: ["MCP", "Sub-agents"],
  },
  {
    id: "scale",
    eyebrow: "Scale",
    title: "Holiday-peak ready",
    summary: "Close to a billion requests at peak, with service abandonment down from 50% to 30%.",
    tags: [],
  },
  {
    id: "delivery",
    eyebrow: "Delivery",
    title: "Commit → production",
    summary: "Multi-environment pipelines across OpenShift, AWS EKS and GCP.",
    tags: ["GitHub Actions", "OpenShift", "AWS EKS"],
  },
  {
    id: "observability",
    eyebrow: "Observability",
    title: "Knowing what prod is doing",
    summary: "Dashboards and alerts on failure rates, plus mobile session tracking.",
    tags: ["Kibana", "Dynatrace"],
  },
  {
    id: "leadership",
    eyebrow: "Leadership",
    title: "Making the team better",
    summary: "Mentoring engineers, leading the team, and writing the architecture docs and processes.",
    tags: ["Mentoring", "Architecture docs"],
  },
];
