/**
 * Fails the build if the homepage payload grows past budget.
 *
 * The bundle reached 1.08 MB in a single chunk before anyone noticed, because
 * nothing was watching. This measures what a first-time homepage visitor
 * actually downloads -- the entry chunk plus the vendor chunks it imports --
 * not the total size of dist/.
 */

import { readdirSync, readFileSync, statSync } from "node:fs";
import { gzipSync } from "node:zlib";
import { join } from "node:path";

// Chunks a homepage visitor loads before the page is interactive.
const EAGER = [/^index-.*\.js$/, /^react-.*\.js$/, /^motion-.*\.js$/];
const BUDGET_KB = 260;

const assetsDir = join(process.cwd(), "dist", "assets");

let total = 0;
const rows = [];

for (const file of readdirSync(assetsDir)) {
  if (!EAGER.some((pattern) => pattern.test(file))) continue;
  const gzipped = gzipSync(readFileSync(join(assetsDir, file))).length;
  total += gzipped;
  rows.push([file, gzipped]);
}

if (rows.length === 0) {
  console.error("No eager chunks matched — has the chunking config changed?");
  process.exit(1);
}

const kb = (bytes) => (bytes / 1024).toFixed(1);

console.log("Homepage initial JS (gzipped):");
for (const [file, size] of rows.sort((a, b) => b[1] - a[1])) {
  console.log(`  ${file.padEnd(34)} ${kb(size).padStart(7)} KB`);
}
console.log(`  ${"TOTAL".padEnd(34)} ${kb(total).padStart(7)} KB  (budget ${BUDGET_KB} KB)`);

if (total / 1024 > BUDGET_KB) {
  console.error(
    `\nOver budget by ${kb(total - BUDGET_KB * 1024)} KB. Either justify the ` +
      `growth and raise BUDGET_KB, or move the new code behind a dynamic import.`,
  );
  process.exit(1);
}

console.log("\nWithin budget.");
