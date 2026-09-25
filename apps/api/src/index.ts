import { createApp } from "./app.js";

const port = Number(process.env.PORT ?? 4000);
const server = createApp().listen(port, () => {
  console.log(`API listening on http://localhost:${port}`);
});

function shutdown(signal: string) {
  console.log(`${signal} received, shutting down`);
  server.close(() => process.exit(0));
}

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));
