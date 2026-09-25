"use client";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <main className="mx-auto flex min-h-screen max-w-xl flex-col items-center justify-center gap-4 px-4 text-center">
      <h1 className="text-2xl font-semibold">Couldn&apos;t load the portfolio</h1>
      <p className="text-slate-500 dark:text-slate-400">
        The API didn&apos;t respond. If you&apos;re running locally, start it with{" "}
        <code className="rounded bg-slate-100 px-1.5 py-0.5 dark:bg-slate-800">npm run dev:api</code>.
      </p>
      <button
        onClick={reset}
        className="rounded-lg bg-accent px-4 py-2 font-medium text-white hover:bg-accent-soft"
      >
        Try again
      </button>
    </main>
  );
}
