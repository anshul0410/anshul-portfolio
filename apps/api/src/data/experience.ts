import type { Experience } from "../types.js";

// Newest first. Keep summaries to 1–2 lines; the résumé has the full detail.
export const experience: Experience = {
  roles: [
    {
      company: "Best Buy India",
      location: "Bengaluru",
      title: "Senior Software Engineer",
      start: "2024-09",
      summary:
        "Lead the LLM-powered post-purchase support platform serving 8M+ customers a year, from React / React Native / Next.js front ends to Node.js services. Built a multi-agent, multimodal AI system on Gemini via Vertex AI, with an MCP layer now reused by other teams.",
      tech: ["React", "React Native", "Next.js", "Node.js", "Gemini · Vertex AI", "MCP", "GCP", "AWS EKS"],
    },
    {
      company: "MFine",
      location: "Bengaluru",
      title: "Senior Software Engineer",
      start: "2020-11",
      end: "2024-09",
      summary:
        "Built MFine’s healthcare app and web platform (1M+ downloads) for doctor consults over chat, audio and video. Led a 12-person team on Corporate Wallet: 60+ corporates onboarded, +47% daily active users, +$500K ARR.",
      tech: ["React Native", "React", "Node.js", "Payments (UPI)", "SSL pinning"],
    },
    {
      company: "HED Experts",
      location: "Bengaluru",
      title: "Product Engineer",
      start: "2017-06",
      end: "2020-11",
      summary:
        "Built the Xcelerator skills platform from scratch: React web app and Elixir/Phoenix services. Designed a microservices architecture that cut deployment time by 70%, and SEO work that lifted organic traffic by 15%.",
      tech: ["React", "Elixir", "Phoenix", "Microservices", "SEO"],
    },
    {
      company: "Publicis Sapient",
      location: "Noida",
      title: "Web Development Trainee",
      start: "2017-01",
      end: "2017-05",
      summary: "Built a trading app with real-time stock market data and D3 visualisations.",
      tech: ["AngularJS", "Node.js", "PostgreSQL", "D3"],
    },
  ],
  education: [
    {
      degree: "B.Tech, Computer Science and Engineering",
      school: "Vellore Institute of Technology",
      start: "2013-06",
      end: "2017-05",
    },
  ],
};
