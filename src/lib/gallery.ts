import fs from "fs";
import path from "path";

const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

export interface GalleryImage {
  src: string;
  alt: string;
}

/** Fotografiile din public/gallery, în ordinea numelui de fișier. */
export function getGalleryImages(): GalleryImage[] {
  const dir = path.join(process.cwd(), "public", "gallery");
  try {
    return fs
      .readdirSync(dir)
      .filter((f) => IMAGE_EXTENSIONS.has(path.extname(f).toLowerCase()))
      .sort((a, b) => a.localeCompare(b))
      .map((f) => ({ src: `/gallery/${f}`, alt: "Fotografie de la atelierul de predicare expozitivă" }));
  } catch {
    return [];
  }
}
