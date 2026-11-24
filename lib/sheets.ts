import { google } from "googleapis";

type ServiceAccount = Record<string, string | undefined>;

/**
 * Reads Google service-account credentials from the environment.
 * Supported, in order: individual GOOGLE_* variables, GOOGLE_SERVICE_ACCOUNT_JSON,
 * GOOGLE_SERVICE_ACCOUNT_B64. Shared by every route so they cannot drift apart.
 */
function loadServiceAccount(): ServiceAccount {
    const { GOOGLE_PROJECT_ID, GOOGLE_CLIENT_EMAIL, GOOGLE_PRIVATE_KEY, GOOGLE_CLIENT_ID } = process.env;
    if (GOOGLE_PROJECT_ID && GOOGLE_CLIENT_EMAIL && GOOGLE_PRIVATE_KEY) {
        return {
            type: "service_account",
            project_id: GOOGLE_PROJECT_ID,
            client_email: GOOGLE_CLIENT_EMAIL,
            private_key: GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
            client_id: GOOGLE_CLIENT_ID,
        };
    }
    if (process.env.GOOGLE_SERVICE_ACCOUNT_JSON) {
        return JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON);
    }
    if (process.env.GOOGLE_SERVICE_ACCOUNT_B64) {
        return JSON.parse(Buffer.from(process.env.GOOGLE_SERVICE_ACCOUNT_B64, "base64").toString("utf8"));
    }
    throw new Error("No Google credentials found in environment");
}

/** Stops a submitted value from being interpreted as a spreadsheet formula. */
function safeCell(value: unknown): string {
    const text = String(value ?? "");
    return /^[=+\-@\t\r]/.test(text) ? `'${text}` : text;
}

export function timestamp(): string {
    return new Date().toLocaleString("en-ZA", { timeZone: "Africa/Johannesburg" });
}

export async function appendRow(range: string, values: unknown[]): Promise<void> {
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;
    if (!spreadsheetId) throw new Error("GOOGLE_SHEET_ID is not set");

    const auth = new google.auth.GoogleAuth({
        credentials: loadServiceAccount(),
        scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });
    const sheets = google.sheets({ version: "v4", auth });

    await sheets.spreadsheets.values.append({
        spreadsheetId,
        range,
        valueInputOption: "RAW",
        requestBody: { values: [values.map(safeCell)] },
    });
}
