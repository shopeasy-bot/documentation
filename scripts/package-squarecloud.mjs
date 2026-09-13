// Copies the pieces Next's `output: 'standalone'` build doesn't include on
// its own (public assets, static chunks, the SquareCloud app config) into
// .next/standalone, so that folder is a complete, deployable app: SquareCloud
// gets a zip with a pre-built server.js and already-populated node_modules,
// and never has to run `next build` inside the memory-capped container.
import { cpSync, existsSync, rmSync } from "node:fs";
import { execFileSync } from "node:child_process";
import path from "node:path";

const root = process.cwd();
const standaloneDir = path.join(root, ".next", "standalone");
const zipPath = path.join(root, "squarecloud-deploy.zip");

if (!existsSync(standaloneDir)) {
    console.error("`.next/standalone` not found — run `npm run build` first.");
    process.exit(1);
}

cpSync(path.join(root, "public"), path.join(standaloneDir, "public"), { recursive: true });
cpSync(path.join(root, ".next", "static"), path.join(standaloneDir, ".next", "static"), { recursive: true });
cpSync(path.join(root, "squarecloud.app"), path.join(standaloneDir, "squarecloud.app"));

rmSync(zipPath, { force: true });

// Zip standaloneDir's CONTENTS at the archive root (not the folder itself) —
// SquareCloud extracts to /application, so server.js/squarecloud.app must sit
// at the zip root or MAIN/START can't find them.
if (process.platform === "win32") {
    execFileSync("powershell", [
        "-NoProfile",
        "-Command",
        `Compress-Archive -Path '${standaloneDir}\\*' -DestinationPath '${zipPath}' -Force`,
    ], { stdio: "inherit" });
} else {
    execFileSync("zip", ["-r", zipPath, "."], { cwd: standaloneDir, stdio: "inherit" });
}

console.log(`Deploy zip ready at ${zipPath}`);
console.log("Upload this file to SquareCloud as-is.");
