import { NextResponse } from "next/server";
import { fetchSheetData } from "@/lib/fetchSheet";
import { fallbackResources } from "@/lib/fallbackData";
import type { Resource } from "@/lib/types";

export async function GET() {
  const csvUrl = process.env.NEXT_PUBLIC_SHEETS_RESOURCES_CSV_URL || "";
  let data = await fetchSheetData<Resource>(csvUrl);
  if (!data || data.length === 0) data = fallbackResources;
  return NextResponse.json(data);
}
