// Copies the pieces Next's `output: 'standalone'` build doesn't include on
// its own (public assets, static chunks, the SquareCloud app config) into
// .next/standalone, so that folder is a complete, deployable app: SquareCloud
// gets a zip with a pre-built server.js and already-populated node_modules,
// and never has to run `next build` inside the memory-capped container.
import { cpSync, existsSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const standaloneDir = path.join(root, ".next", "standalone");

if (!existsSync(standaloneDir)) {
    console.error("`.next/standalone` not found — run `npm run build` first.");
    process.exit(1);
}

cpSync(path.join(root, "public"), path.join(standaloneDir, "public"), { recursive: true });
cpSync(path.join(root, ".next", "static"), path.join(standaloneDir, ".next", "static"), { recursive: true });
cpSync(path.join(root, "squarecloud.app"), path.join(standaloneDir, "squarecloud.app"));

console.log(`Standalone app ready at ${standaloneDir}`);
console.log("Zip that folder's contents (squarecloud.app at the zip root) and upload it to SquareCloud.");
