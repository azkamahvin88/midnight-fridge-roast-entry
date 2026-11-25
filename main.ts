// Midnight Fridge Roast — make.fun entry (program/v1).
// The program writes exactly one roast line to $OUTPUT_DIR/entry.txt.
// The line is hardcoded: no randomness, no clock, no network, so every run
// produces the identical file.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The roast: the fridge refuses to open after midnight and, instead of
// feeding anyone, has taken up therapy — the petty rule itself is the joke.
const ROAST =
  "My fridge became a therapist at midnight: it won't open, it just asks how the snacking makes me feel.";

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
// One trailing newline; the gate counts the line, not the newline.
const entryPath = join(outDir, "entry.txt");
writeFileSync(entryPath, ROAST + "\n", "utf8");

// Read-back verification: the file on disk must be exactly the roast plus
// one trailing newline (102 bytes: 101 roast chars + "\n"), and the roast
// itself must stay one line of 101 characters.
function verify(path: string): void {
  if (ROAST.length !== 101) {
    throw new Error(`roast must be 101 characters, got ${ROAST.length}`);
  }
  if (ROAST.includes("\n")) {
    throw new Error("roast must be a single line");
  }
  const data = readFileSync(path);
  const expected = Buffer.from(ROAST + "\n", "utf8");
  if (data.length !== 102 || !data.equals(expected)) {
    throw new Error(
      `entry.txt must be 102 bytes (roast + one newline), got ${data.length}`,
    );
  }
}

verify(entryPath);
