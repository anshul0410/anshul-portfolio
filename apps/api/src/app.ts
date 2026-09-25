import express, { type NextFunction, type Request, type Response } from "express";
import helmet from "helmet";
import cors from "cors";
import { profile } from "./data/profile.js";
import { skillCategories } from "./data/skills.js";
import { work } from "./data/work.js";

function allowedOrigins(): string[] {
  return (process.env.CORS_ORIGIN ?? "http://localhost:3000")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
}

export function createApp() {
  const app = express();

  app.disable("x-powered-by");
  app.use(helmet());
  app.use(cors({ origin: allowedOrigins() }));
  app.use(express.json({ limit: "10kb" }));

  app.get("/api/health", (_req: Request, res: Response) => {
    res.json({ status: "ok", uptime: Math.round(process.uptime()) });
  });

  app.get("/api/profile", (_req: Request, res: Response) => {
    res.set("Cache-Control", "public, max-age=300");
    res.json(profile);
  });

  app.get("/api/skills", (_req: Request, res: Response) => {
    res.set("Cache-Control", "public, max-age=300");
    res.json(skillCategories);
  });

  app.get("/api/work", (_req: Request, res: Response) => {
    res.set("Cache-Control", "public, max-age=300");
    res.json(work);
  });

  app.use((_req: Request, res: Response) => {
    res.status(404).json({ error: "Not found" });
  });

  // Express recognises error handlers by their 4-argument signature.
  app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  });

  return app;
}
