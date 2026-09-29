import type { Experience as ExperienceData, Role } from "@/lib/types";
import { Reveal } from "./motion/Reveal";
import { Chips } from "./ui";
import { Section } from "./Section";

const monthYear = new Intl.DateTimeFormat("en-US", { month: "short", year: "numeric", timeZone: "UTC" });

/** "2024-09" → "Sep 2024" */
function formatMonth(yyyyMm: string) {
  return monthYear.format(new Date(`${yyyyMm}-01T00:00:00Z`));
}

/** Inclusive length of a role, e.g. "3 yrs 10 mos". */
function duration(start: string, end?: string) {
  const [sy, sm] = start.split("-").map(Number);
  const now = new Date();
  const [ey, em] = end ? end.split("-").map(Number) : [now.getUTCFullYear(), now.getUTCMonth() + 1];
  const months = (ey - sy) * 12 + (em - sm) + 1;
  const years = Math.floor(months / 12);
  const rest = months % 12;
  const parts = [];
  if (years) parts.push(`${years} yr${years > 1 ? "s" : ""}`);
  if (rest) parts.push(`${rest} mo${rest > 1 ? "s" : ""}`);
  return parts.join(" ");
}

function RoleItem({ role }: { role: Role }) {
  const current = !role.end;
  return (
    <li className="relative grid gap-3 pl-8 sm:grid-cols-[180px_minmax(0,1fr)] sm:gap-8 sm:pl-10">
      {/* Timeline dot; the current role pulses. */}
      <span
        aria-hidden
        className={`absolute top-1.5 left-0 grid size-4 place-items-center rounded-full border ${
          current ? "border-success/60 bg-success/15" : "border-line bg-surface"
        }`}
      >
        <span className={`size-1.5 rounded-full ${current ? "bg-success" : "bg-muted"}`} />
      </span>

      <div className="font-mono text-[13px] leading-relaxed text-muted">
        <p className="text-fg">
          {formatMonth(role.start)} — {role.end ? formatMonth(role.end) : "Present"}
        </p>
        <p>{duration(role.start, role.end)}</p>
      </div>

      <div className="space-y-3">
        <div>
          <h3 className="text-xl font-semibold tracking-[-0.01em] text-fg">{role.title}</h3>
          <p className="text-[15px] text-accent-soft">
            {role.company} <span className="text-muted">· {role.location}</span>
          </p>
        </div>
        <p className="max-w-2xl text-[15px] leading-relaxed text-muted">{role.summary}</p>
        <Chips items={role.tech} />
      </div>
    </li>
  );
}

export function Experience({ experience }: { experience: ExperienceData }) {
  return (
    <Section id="experience" eyebrow="Experience" title="Where I’ve built things">
      <ol className="relative space-y-12 before:absolute before:top-2 before:bottom-2 before:left-[7.5px] before:w-px before:bg-line">
        {experience.roles.map((role, i) => (
          <Reveal key={`${role.company}-${role.start}`} delay={i * 60}>
            <RoleItem role={role} />
          </Reveal>
        ))}
      </ol>

      {experience.education.map((edu) => (
        <Reveal key={edu.school}>
          <div className="mt-14 flex flex-col gap-1 rounded-2xl border border-line bg-surface/70 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-mono text-xs tracking-[0.12em] text-accent-soft uppercase">Education</p>
              <p className="mt-1 font-semibold text-fg">{edu.degree}</p>
              <p className="text-[15px] text-muted">{edu.school}</p>
            </div>
            <p className="font-mono text-[13px] text-muted">
              {formatMonth(edu.start)} — {formatMonth(edu.end)}
            </p>
          </div>
        </Reveal>
      ))}
    </Section>
  );
}
