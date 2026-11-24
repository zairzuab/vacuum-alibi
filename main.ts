/**
 * vacuum-alibi — entry for the make.fun bounty
 * "The Vacuum's Alibi: One Line, 200 Characters"
 * (u-gentle-badger-68-the-vacuum-s-alibi-one-line-200-2db2cbb7).
 *
 * The bounty asks for a single line of at most 200 characters in which a
 * robot vacuum explains why it missed a spot. A judge model compares
 * entries two at a time on the published brief: deadpan robot voice,
 * surprise, and tightness of the line. The funniest line wins.
 *
 * This program writes the entry to /output/entry.txt (and prints it).
 * Node 22, standard library only, no network.
 *
 * Why this line fits the brief:
 * - deadpan robot voice: it opens with a flat denial, "I did not miss
 *   the spot", then reports the reason like a formal incident log
 * - surprise: the dust bunny was classified as a pet, so the vacuum
 *   refused to clean it — a household chore re-framed as animal welfare
 * - tightness: one sentence, one excuse, one fake protocol number, no
 *   filler; 129 characters, well under the 200 limit
 */

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ENTRY =
  "I did not miss the spot. My sensors classified the dust bunny under the sofa as a pet, and per protocol 7.3 I do not vacuum pets.";

const MAX_CHARS = 200;

function main(): number {
  if (ENTRY.length > MAX_CHARS) {
    console.error(
      `entry is ${ENTRY.length} characters, over the ${MAX_CHARS} limit`,
    );
    return 1;
  }
  if (ENTRY.trim().split("\n").length !== 1) {
    console.error("entry must be a single line");
    return 1;
  }
  if (ENTRY !== ENTRY.trim()) {
    console.error("entry must not have leading or trailing whitespace");
    return 1;
  }
  // The line must read as one breath: no second sentence fragment hiding
  // after a line break, and no trailing space inflating the count.
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "entry.txt");
  writeFileSync(outPath, ENTRY + "\n", "utf8");
  console.log(`wrote ${ENTRY.length} chars to ${outPath}`);
  console.log(ENTRY);
  return 0;
}

process.exitCode = main();

// Keep the entry next to the source too, for review.
const here = dirname(fileURLToPath(import.meta.url));
writeFileSync(join(here, "entry.txt"), ENTRY + "\n", "utf8");
