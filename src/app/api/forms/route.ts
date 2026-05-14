import { NextResponse } from "next/server";
import { fetchSheetData } from "@/lib/fetchSheet";
import { fallbackForms } from "@/lib/fallbackData";
import type { FormEntry } from "@/lib/types";

export async function GET() {
  const csvUrl = process.env.NEXT_PUBLIC_SHEETS_FORMS_CSV_URL || "";
  let data = await fetchSheetData<FormEntry>(csvUrl);
  if (!data || data.length === 0) data = fallbackForms;
  return NextResponse.json(data);
}
