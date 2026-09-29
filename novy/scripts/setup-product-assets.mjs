import fs from "fs";
import path from "path";

const brainDir = "C:\\Users\\kh\\.gemini\\antigravity-ide\\brain\\5343b66f-6ba3-4a5c-8f7d-beb60261cdd6";
const targetDir = path.resolve("./public/products");

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const files = [
  {
    src: path.join(brainDir, "novax_cutis_dark_1789857060424.jpg"),
    dest: path.join(targetDir, "novax-cutis-dark.jpg"),
  },
  {
    src: path.join(brainDir, "novax_cutis_isolated_1789856999263.jpg"),
    dest: path.join(targetDir, "novax-cutis-light.jpg"),
  },
  {
    src: path.join(brainDir, ".user_uploaded", "media_1789856908097.jpg"),
    dest: path.join(targetDir, "novax-cutis-original.jpg"),
  },
];

for (const { src, dest } of files) {
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log(`✓ Copied: ${path.basename(dest)}`);
  } else {
    console.warn(`! Not found: ${src}`);
  }
}

// Also create default cutis.png / cutis.jpg alias
const defaultDark = path.join(targetDir, "novax-cutis-dark.jpg");
if (fs.existsSync(defaultDark)) {
  fs.copyFileSync(defaultDark, path.join(targetDir, "cutis.jpg"));
  fs.copyFileSync(defaultDark, path.join(targetDir, "cutis.png"));
  console.log("✓ Created default alias: cutis.jpg / cutis.png");
}
