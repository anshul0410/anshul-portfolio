import type { Profile } from "../types.js";

// TODO(anshul): review the copy.
export const profile: Profile = {
  name: "Anshul Akotkar",
  title: "Senior Software Engineer",
  tagline: "Frontend-heavy full-stack engineer building AI-powered experiences at scale.",
  location: "Bengaluru, India",
  yearsOfExperience: 9,
  currentRole: { title: "Senior Software Engineer", company: "Best Buy India" },
  summary:
    "I build web and mobile products that millions of people rely on. At Best Buy I lead the post-purchase Service Triage platform — an LLM-powered, agentic support experience that serves 8M+ customers a year across web, app, chatbot, IVR and associate tools.",
  about: [
    "I've spent 9 years building products with React, Next.js, React Native and Node.js. My sweet spot is the frontend, but I own features end to end — from API design and middleware to CI/CD pipelines, deployments and production monitoring.",
    "At Best Buy India I work on the Self Service Rapport team. We replaced a rigid, menu-driven support flow with a context-aware experience grounded in each customer's purchase history and intent. It routes people to the right option — remote support, chat, an in-store or in-home appointment, or a repair through our insurance partner — and handles close to a billion requests at holiday peak.",
    "Lately I've been going deep on agentic AI: an orchestrator agent with sub-agents that understand text, photos, video, live camera and voice, built on Gemini via Vertex AI, plus MCP clients and servers that connect our agents to internal services and let other teams reuse them.",
    "I also enjoy the people side of engineering — mentoring engineers, leading the team, and writing the docs and processes that make everyone faster.",
  ],
  highlights: [
    { value: "$20–25M", label: "Annual support cost saved by Service Triage" },
    { value: "8M+", label: "Customers a year across 5 touchpoints" },
    { value: "~1B", label: "Requests handled at holiday peak" },
    { value: "50% → 30%", label: "Drop in service abandonment" },
  ],
  links: [
    { label: "GitHub", href: "https://github.com/anshul0410" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/anshul-akotkar/" },
    { label: "Email", href: "mailto:anshul041094@gmail.com" },
  ],
};
