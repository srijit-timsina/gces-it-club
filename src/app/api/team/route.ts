import { NextResponse } from "next/server";
import { fetchSheetData } from "@/lib/fetchSheet";
import { fallbackTeam } from "@/lib/fallbackData";
import type { TeamMember } from "@/lib/types";

export async function GET() {
  const csvUrl = process.env.NEXT_PUBLIC_SHEETS_TEAM_CSV_URL || "";
  let data = await fetchSheetData<TeamMember>(csvUrl);
  if (!data || data.length === 0) data = fallbackTeam;
  return NextResponse.json(data);
}
