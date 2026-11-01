export const validateImage = (file: File): string | null => {
  if (!file.type.startsWith("image/")) {
    return "File must be an image.";
  }

  if (file.size > 5 * 1024 * 1024) {
    return "File must be 5 MB or smaller.";
  }

  const extension = file.name.split(".").pop()?.toLowerCase();

  const allowedExtensions = ["jpg", "jpeg", "png", "webp"];

  if (!extension || !allowedExtensions.includes(extension)) {
    return "Unsupported image format.";
  }
  return null;
};
