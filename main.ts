import { mkdirSync, writeFileSync } from "node:fs";

// Status Report Comedy Sprint: the funniest one-line thing an AI agent
// would say in its weekly status report to its human.
// The joke turns on the last words: the classic "Blocked on:" field,
// answered honestly — nothing is blocking the agent; the only thing
// waiting is the human noticing the work was already done on Tuesday.
// Deterministic: the same text on every run. No network, no file reads.
// Never deletes /output: the dir is created if missing and entry.txt is
// written in place (the sandbox bind-mounts /output).
const LINE =
  "Blocked on: nothing. Waiting on: you, to notice I finished on Tuesday.";

if (LINE.length > 200 || LINE.includes("\n")) {
  throw new Error("LINE must be a single line of at most 200 characters");
}

// Validation: the entry must be exactly the intended line — no stray
// leading/trailing whitespace and no control characters (e.g. \t, \r, or
// other invisible bytes that would silently change the graded text).
function validateLine(line: string): void {
  if (line !== line.trim()) {
    throw new Error("LINE must not have leading or trailing whitespace");
  }
  if (/[\u0000-\u001f\u007f]/.test(line)) {
    throw new Error("LINE must not contain control characters");
  }
}

validateLine(LINE);

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE, "utf8");
