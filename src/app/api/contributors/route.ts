import { NextResponse } from "next/server";
import { fetchSheetData } from "@/lib/fetchSheet";
import { fallbackContributors } from "@/lib/fallbackData";
import type { Contributor } from "@/lib/types";

export async function GET() {
  const csvUrl = process.env.NEXT_PUBLIC_SHEETS_CONTRIBUTORS_CSV_URL || "";
  let data = await fetchSheetData<Contributor>(csvUrl);
  if (!data || data.length === 0) data = fallbackContributors;
  return NextResponse.json(data);
}
