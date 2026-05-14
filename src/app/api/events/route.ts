import { NextResponse } from "next/server";
import { fetchSheetData } from "@/lib/fetchSheet";
import { fallbackEvents } from "@/lib/fallbackData";
import type { Event } from "@/lib/types";

export async function GET() {
  const csvUrl = process.env.NEXT_PUBLIC_SHEETS_EVENTS_CSV_URL || "";
  let data = await fetchSheetData<Event>(csvUrl);
  if (!data || data.length === 0) data = fallbackEvents;
  return NextResponse.json(data);
}
