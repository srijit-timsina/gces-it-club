// ============================================
// CSV fetching and parsing utility
// Fetches Google Sheets "Publish to Web" CSV data
// ============================================

/**
 * Parse a CSV string into an array of objects.
 * Handles quoted fields, commas within quotes, and newlines within quotes.
 */
function parseCSV<T>(csv: string): T[] {
  const lines: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < csv.length; i++) {
    const char = csv[i];
    if (char === '"') {
      current += '"';
      if (inQuotes && csv[i + 1] === '"') {
        current += '"';
        i++; // skip escaped quote
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === "\n" && !inQuotes) {
      if (current.trim()) {
        lines.push(current);
      }
      current = "";
    } else if (char === "\r" && !inQuotes) {
      // skip carriage return
    } else {
      current += char;
    }
  }
  if (current.trim()) {
    lines.push(current);
  }

  if (lines.length < 2) return [];

  // Parse header
  const headers = parseCSVLine(lines[0]);

  // Parse rows
  const results: T[] = [];
  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i]);
    const obj: Record<string, string | number> = {};
    headers.forEach((header, index) => {
      const key = header.trim().toLowerCase().replace(/\s+/g, "_");
      obj[key] = values[index]?.trim() || "";
    });
    results.push(obj as unknown as T);
  }

  return results;
}

function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === "," && !inQuotes) {
      result.push(current);
      current = "";
    } else {
      current += char;
    }
  }
  result.push(current);
  return result;
}

/**
 * Fetch and parse a Google Sheet CSV URL.
 * Uses Next.js fetch caching with revalidation.
 */
export async function fetchSheetData<T>(csvUrl: string): Promise<T[]> {
  if (!csvUrl || csvUrl.trim() === "") {
    return [];
  }

  try {
    const response = await fetch(csvUrl, {
      next: { revalidate: 60 }, // Cache for 60 seconds
    });

    if (!response.ok) {
      console.error(`Failed to fetch sheet: ${response.status} ${response.statusText}`);
      return [];
    }

    const csvText = await response.text();
    
    // Validate that the response is actually a CSV and not an HTML error/login page
    if (csvText.trim().toLowerCase().startsWith('<!doctype html>') || csvText.trim().toLowerCase().startsWith('<html')) {
      console.error("Invalid CSV format. The URL returned an HTML page instead of a CSV. Make sure you published to web as CSV.");
      return [];
    }

    return parseCSV<T>(csvText);
  } catch (error) {
    console.error("Error fetching sheet data:", error);
    return [];
  }
}
