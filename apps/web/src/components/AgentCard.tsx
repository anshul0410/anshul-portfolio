// Illustrative trace of the Service Triage orchestrator. On larger screens rows
// light up in sequence via the `trace` keyframes in globals.css.
const rows = [
  { label: "customer.intent", detail: "“My laptop won’t charge” + order history", color: "#a5b4fc", depth: 0 },
  { label: "orchestrator.agent", detail: "Gemini on Vertex AI — plans & routes", color: "#6366f1", depth: 0 },
  { label: "├─ vision.subagent", detail: "photo · video · live camera", color: "#22d3ee", depth: 1 },
  { label: "├─ voice.subagent", detail: "IVR · speech", color: "#22d3ee", depth: 1 },
  { label: "└─ mcp.tools", detail: "orders · warranty · scheduling", color: "#22d3ee", depth: 1 },
  { label: "→ resolution", detail: "In-home repair appointment booked", color: "#34d399", depth: 0 },
];

export function AgentCard() {
  return (
    <figure
      aria-label="Diagram: a customer request flows through an orchestrator agent and sub-agents to a resolution"
      className="overflow-hidden rounded-[20px] border border-line bg-surface/95 shadow-[0_30px_60px_-10px_rgb(99_102_241/0.25)] md:bg-surface/85 md:backdrop-blur-xl transition duration-500 hover:-translate-y-1 hover:shadow-[0_40px_80px_-10px_rgb(99_102_241/0.35)]"
    >
      <div className="flex items-center gap-2 border-b border-line px-4 py-3">
        <span className="size-2.5 rounded-full bg-red-400/80" />
        <span className="size-2.5 rounded-full bg-amber-400/80" />
        <span className="size-2.5 rounded-full bg-emerald-400/80" />
        <span className="ml-1 font-mono text-xs text-muted">service-triage / orchestrator</span>
      </div>
      <ol className="space-y-2.5 px-5 pt-5 pb-3">
        {rows.map((row, i) => (
          <li
            key={row.label}
            className="flex items-center gap-3 rounded-xl border border-[color-mix(in_oklab,var(--row)_35%,transparent)] bg-raised py-2.5 pr-3 md:animate-trace"
            style={
              {
                "--row": row.color,
                paddingLeft: 12 + row.depth * 16,
                animationDelay: `${i * 0.45}s`,
              } as React.CSSProperties
            }
          >
            <span className="size-2 shrink-0 rounded-full" style={{ background: row.color }} />
            <span className="min-w-0">
              <span className="block font-mono text-[13px] font-medium text-fg">{row.label}</span>
              <span className="block truncate text-xs text-muted">{row.detail}</span>
            </span>
          </li>
        ))}
      </ol>
      <figcaption className="flex justify-between px-5 pt-2 pb-4 font-mono text-xs text-muted">
        <span>~1B requests at holiday peak</span>
        <span className="text-success">● live</span>
      </figcaption>
    </figure>
  );
}
