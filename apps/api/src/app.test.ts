import { after, before, describe, it } from "node:test";
import assert from "node:assert/strict";
import type { AddressInfo } from "node:net";
import type { Server } from "node:http";
import { createApp } from "./app.js";

describe("portfolio API", () => {
  let server: Server;
  let base: string;

  before(async () => {
    server = createApp().listen(0);
    await new Promise<void>((resolve) => server.once("listening", () => resolve()));
    base = `http://127.0.0.1:${(server.address() as AddressInfo).port}`;
  });

  after(() => {
    server.close();
  });

  it("GET /api/health returns ok", async () => {
    const res = await fetch(`${base}/api/health`);
    assert.equal(res.status, 200);
    assert.equal((await res.json()).status, "ok");
  });

  it("GET /api/profile returns the profile", async () => {
    const res = await fetch(`${base}/api/profile`);
    assert.equal(res.status, 200);
    const body = await res.json();
    assert.equal(body.name, "Anshul Akotkar");
    assert.ok(body.about.length > 0);
  });

  it("GET /api/skills returns skill categories", async () => {
    const res = await fetch(`${base}/api/skills`);
    assert.equal(res.status, 200);
    const body = await res.json();
    assert.ok(Array.isArray(body) && body.length > 0);
  });

  it("GET /api/work returns exactly one featured item", async () => {
    const res = await fetch(`${base}/api/work`);
    assert.equal(res.status, 200);
    const body = await res.json();
    assert.ok(Array.isArray(body) && body.length > 0);
    assert.equal(body.filter((item: { featured?: boolean }) => item.featured).length, 1);
  });

  it("unknown routes return 404 JSON", async () => {
    const res = await fetch(`${base}/api/nope`);
    assert.equal(res.status, 404);
  });
});
