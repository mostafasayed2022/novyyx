import fs from "node:fs";
import path from "node:path";

const rootDir = path.resolve("./");
const log = [];

const pathsToDelete = [
  // Obsolete routes
  path.join(rootDir, "src", "app", "science"),
  path.join(rootDir, "src", "app", "quality"),
  path.join(rootDir, "src", "app", "professionals"),

  // Obsolete component folders
  path.join(rootDir, "src", "components", "science"),
  path.join(rootDir, "src", "components", "quality"),
  path.join(rootDir, "src", "components", "sections"),

  // Redundant home sections
  path.join(rootDir, "src", "components", "home", "portfolio-section.tsx"),
  path.join(rootDir, "src", "components", "home", "portfolio-preview-tabs.tsx"),
  path.join(rootDir, "src", "components", "home", "product-spotlight-cutis.tsx"),
  path.join(rootDir, "src", "components", "home", "quality-section.tsx"),
  path.join(rootDir, "src", "components", "home", "science-section.tsx"),

  // Temporary API routes
  path.join(rootDir, "src", "app", "api", "cleanup"),
  path.join(rootDir, "src", "app", "api", "setup-assets"),

  // Temporary inspection script
  path.join(rootDir, "scripts", "inspect-image.mjs"),
];

console.log("Starting NOVYX cleanup of obsolete files & directories...");

for (const targetPath of pathsToDelete) {
  if (fs.existsSync(targetPath)) {
    const stats = fs.statSync(targetPath);
    if (stats.isDirectory()) {
      fs.rmSync(targetPath, { recursive: true, force: true });
      console.log(`✓ Removed directory: ${path.relative(rootDir, targetPath)}`);
    } else {
      fs.unlinkSync(targetPath);
      console.log(`✓ Removed file: ${path.relative(rootDir, targetPath)}`);
    }
  } else {
    console.log(`- Already removed: ${path.relative(rootDir, targetPath)}`);
  }
}

// Clean up empty src/app/api folder
const apiDir = path.join(rootDir, "src", "app", "api");
if (fs.existsSync(apiDir) && fs.readdirSync(apiDir).length === 0) {
  fs.rmdirSync(apiDir);
  console.log("✓ Removed empty folder: src/app/api");
}

console.log("\nCleanup complete! Project structure strictly aligns with 5 core pages.");
