import { z } from "zod";

export const imageSourceSchema = z.string().refine((value) => {
  if (!value) return true;
  if (/^\/(?!\/)[^\\\s?#]+$/.test(value)) return true;
  try {
    const url = new URL(value);
    return url.protocol === "https:" && url.hostname === "res.cloudinary.com" && !url.username && !url.password && (!url.port || url.port === "443");
  } catch { return false; }
}, "Use a local /image path or an HTTPS Cloudinary image URL.");
