import { NextResponse } from "next/server";
import { fetchSheetData } from "@/lib/fetchSheet";
import { fallbackGallery } from "@/lib/fallbackData";
import type { GalleryImage } from "@/lib/types";

export async function GET() {
  const csvUrl = process.env.NEXT_PUBLIC_SHEETS_GALLERY_CSV_URL || "";
  let data = await fetchSheetData<GalleryImage>(csvUrl);
  if (!data || data.length === 0) data = fallbackGallery;
  return NextResponse.json(data);
}
