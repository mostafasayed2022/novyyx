import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/server/admin-auth";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ detail: "Unauthorized." }, { status: 401 });
  }

  const cloudName = process.env.CLOUDINARY_CLOUD_NAME?.trim();
  const apiKey = process.env.CLOUDINARY_API_KEY?.trim();
  const apiSecret = process.env.CLOUDINARY_API_SECRET?.trim();
  const folder = process.env.CLOUDINARY_FOLDER?.trim() || "novyx/products";

  if (!cloudName || !apiKey || !apiSecret) {
    return NextResponse.json(
      { detail: "Cloudinary is not configured in the environment." },
      { status: 503 },
    );
  }

  const form = await request.formData();
  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ detail: "Image file is required." }, { status: 400 });
  }
  if (!file.type.startsWith("image/")) {
    return NextResponse.json({ detail: "Only image files are allowed." }, { status: 415 });
  }
  if (file.size > 10 * 1024 * 1024) {
    return NextResponse.json({ detail: "Image must be 10 MB or smaller." }, { status: 413 });
  }

  const upload = new FormData();
  upload.set("file", file);
  upload.set("folder", folder);
  upload.set("overwrite", "false");
  upload.set("unique_filename", "true");

  const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${apiKey}:${apiSecret}`).toString("base64")}`,
    },
    body: upload,
  });

  const data = (await response.json().catch(() => null)) as
    | { secure_url?: string; public_id?: string; width?: number; height?: number; error?: { message?: string } }
    | null;

  if (!response.ok || !data?.secure_url) {
    return NextResponse.json(
      { detail: data?.error?.message || "Cloudinary upload failed." },
      { status: 502 },
    );
  }

  return NextResponse.json({
    url: data.secure_url,
    publicId: data.public_id,
    width: data.width,
    height: data.height,
  });
}
