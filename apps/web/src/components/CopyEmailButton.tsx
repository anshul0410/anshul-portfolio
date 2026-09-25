"use client";

import { useState } from "react";
import { buttonClass } from "./ui";

export function CopyEmailButton({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  }

  return (
    <button type="button" onClick={copy} className={buttonClass("ghost", "min-w-28")} aria-live="polite">
      {copied ? "Copied ✓" : "Copy email"}
    </button>
  );
}
