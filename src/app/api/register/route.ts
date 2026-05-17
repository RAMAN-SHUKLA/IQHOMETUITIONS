import { google } from "googleapis";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // 1. Check if Google Apps Script Web App URL is configured (easiest & highly recommended)
    if (process.env.GOOGLE_APPS_SCRIPT_URL) {
      try {
        const response = await fetch(process.env.GOOGLE_APPS_SCRIPT_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            timestamp: new Date().toISOString(),
            fullName: body.fullName,
            whatsapp: body.whatsapp,
            gender: body.gender,
            residenceArea: body.residenceArea,
            experience: body.experience,
            subjects: Array.isArray(body.subjects) ? body.subjects.join(", ") : (body.subjects || ""),
            classes: Array.isArray(body.classes) ? body.classes.join(", ") : (body.classes || ""),
            boards: Array.isArray(body.boards) ? body.boards.join(", ") : (body.boards || ""),
            teachingMode: body.teachingMode,
            qualification: body.qualification,
            introduction: body.introduction,
            status: "Pending"
          })
        });

        if (response.ok) {
          return NextResponse.json({ success: true, method: "Apps Script" });
        }
        
        const errText = await response.text();
        console.error("Google Apps Script returned an error:", errText);
      } catch (err: any) {
        console.error("Failed to POST to Google Apps Script URL:", err.message);
      }
    }

    // 2. Fallback to standard Google Sheets Service Account JWT API
    if (process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL && process.env.GOOGLE_PRIVATE_KEY && process.env.GOOGLE_SHEETS_ID) {
      const auth = new google.auth.JWT({
        email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
        scopes: ["https://www.googleapis.com/auth/spreadsheets"],
      });

      const sheets = google.sheets({ version: "v4", auth });

      await sheets.spreadsheets.values.append({
        spreadsheetId: process.env.GOOGLE_SHEETS_ID,
        range: "Sheet1!A:P", // Adjust target sheet range as needed
        valueInputOption: "USER_ENTERED",
        requestBody: {
          values: [
            [
              new Date().toISOString(),
              body.fullName,
              body.whatsapp,
              body.gender,
              body.residenceArea,
              body.experience,
              Array.isArray(body.subjects) ? body.subjects.join(", ") : (body.subjects || ""),
              Array.isArray(body.classes) ? body.classes.join(", ") : (body.classes || ""),
              Array.isArray(body.boards) ? body.boards.join(", ") : (body.boards || ""),
              body.teachingMode,
              body.qualification,
              body.introduction,
              "Pending", // Default review status
            ],
          ],
        },
      });

      return NextResponse.json({ success: true, method: "Service Account" });
    }

    // 3. Fallback for Dev mode simulation if no configs are active
    console.warn("No active Google Sheets integration configured in environment variables.");
    if (process.env.NODE_ENV === "development") {
      return NextResponse.json({ success: true, message: "Dev Mode: Submission simulated." });
    }

    return NextResponse.json(
      { success: false, error: "Google Sheets integration is not configured." },
      { status: 500 }
    );
  } catch (error: any) {
    console.error("Error submitting to Google Sheets:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
