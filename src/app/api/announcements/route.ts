import { NextResponse } from "next/server";
import { fetchSheetData } from "@/lib/fetchSheet";
import { fallbackAnnouncements } from "@/lib/fallbackData";
import type { Announcement } from "@/lib/types";

export async function GET() {
  const csvUrl = process.env.NEXT_PUBLIC_SHEETS_ANNOUNCEMENTS_CSV_URL || "";
  let data = await fetchSheetData<Announcement>(csvUrl);
  if (!data || data.length === 0) data = fallbackAnnouncements;
  return NextResponse.json(data);
}
