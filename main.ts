// Midnight Fridge Roast — make.fun entry (program/v1).
// The program writes exactly one roast line to $OUTPUT_DIR/entry.txt.
// The line is hardcoded: no randomness, no clock, no network, so every run
// produces the identical file.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The roast: the fridge refuses to open after midnight and, instead of
// feeding anyone, has taken up therapy — the petty rule itself is the joke.
const ROAST =
  "My fridge became a therapist at midnight: it won't open, it just asks how the snacking makes me feel.";

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
// One trailing newline; the gate counts the line, not the newline.
writeFileSync(join(outDir, "entry.txt"), ROAST + "\n", "utf8");
