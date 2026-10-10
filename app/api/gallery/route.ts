import { NextResponse } from "next/server";
import { getGalleryImages } from "@/lib/gallery";

export async function GET() {
  return NextResponse.json(getGalleryImages());
}
