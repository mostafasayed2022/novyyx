import fs from "fs";
import path from "path";
import sharp from "sharp";

export async function setupDnaImage() {
  const brainFile = "C:\\Users\\kh\\.gemini\\antigravity-ide\\brain\\c2aab24f-f29c-42fd-82ad-c16dae3c8763\\novax_dna_helix_1789933426802.jpg";
  const targetDir = path.join(process.cwd(), "public", "images");
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  const targetJpg = path.join(targetDir, "novax_dna_helix.jpg");
  const targetPng = path.join(targetDir, "novax_dna_helix_transparent.png");

  if (fs.existsSync(brainFile)) {
    if (!fs.existsSync(targetJpg)) {
      fs.copyFileSync(brainFile, targetJpg);
    }

    if (!fs.existsSync(targetPng)) {
      try {
        const image = sharp(brainFile);
        const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });
        const { width, height, channels } = info;
        const out = Buffer.alloc(width * height * 4);

        for (let i = 0; i < width * height; i++) {
          const inIdx = i * channels;
          const outIdx = i * 4;
          const r = data[inIdx];
          const g = data[inIdx + 1];
          const b = data[inIdx + 2];
          const minC = Math.min(r, g, b);
          const lum = 0.299 * r + 0.587 * g + 0.114 * b;

          out[outIdx] = r;
          out[outIdx + 1] = g;
          out[outIdx + 2] = b;

          if (minC >= 250 || lum >= 250) {
            out[outIdx + 3] = 0;
          } else if (minC >= 235 || lum >= 235) {
            const factor = (250 - Math.max(minC, lum)) / 15;
            out[outIdx + 3] = Math.round(255 * factor);
          } else {
            out[outIdx + 3] = 255;
          }
        }

        await sharp(out, {
          raw: { width, height, channels: 4 }
        })
          .png()
          .toFile(targetPng);
      } catch (err) {
        console.error("Failed to make transparent DNA PNG:", err);
      }
    }
  }
}
