export function optimizeCloudinaryImage(url: string) {
  if (!url) return url;

  if (!url.includes("res.cloudinary.com")) {
    return url;
  }

  if (url.includes("/image/upload/f_auto,q_auto/")) {
    return url;
  }

  return url.replace(
    "/image/upload/",
    "/image/upload/f_auto,q_auto/"
  );
}