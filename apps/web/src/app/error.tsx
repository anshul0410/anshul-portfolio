"use client";

import { buttonClass } from "@/components/ui";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <main className="mx-auto flex min-h-screen max-w-xl flex-col items-center justify-center gap-4 px-4 text-center">
      <h1 className="text-2xl font-semibold text-fg">Couldn&apos;t load the portfolio</h1>
      <p className="text-muted">
        The API didn&apos;t respond. If you&apos;re running locally, start it with{" "}
        <code className="rounded bg-raised px-1.5 py-0.5 font-mono text-sm text-fg">npm run dev:api</code>.
      </p>
      <button onClick={reset} className={buttonClass("primary")}>
        Try again
      </button>
    </main>
  );
}
