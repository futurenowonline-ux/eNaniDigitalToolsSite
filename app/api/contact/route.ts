/* eslint-disable @typescript-eslint/no-explicit-any */
import { google } from 'googleapis';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, phone, package: selectedPackage, message } = body;

        if (!email || !name) {
            return NextResponse.json({ message: 'Name and Email are required' }, { status: 400 });
        }

        let serviceAccount;
        try {
            const b64 = process.env.GOOGLE_SERVICE_ACCOUNT_B64;
            if (b64) {
                const jsonStr = Buffer.from(b64, 'base64').toString('utf8');
                serviceAccount = JSON.parse(jsonStr);
            } else {
                // Fallback for legacy format if needed
                serviceAccount = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON || '{}');
            }
        } catch (error: any) {
            console.error('Credential Decode Error:', error);
            return NextResponse.json({ message: 'Server Configuration Error', error: 'Invalid Credentials Format' }, { status: 500 });
        }

        const auth = new google.auth.GoogleAuth({
            credentials: serviceAccount,
            scopes: ["https://www.googleapis.com/auth/spreadsheets"],
        });

        const sheets = google.sheets({ version: "v4", auth });
        const spreadsheetId = process.env.GOOGLE_SHEET_ID;
        const range = "ContactInquiries!A:F";

        await sheets.spreadsheets.values.append({
            spreadsheetId,
            range,
            valueInputOption: "USER_ENTERED",
            requestBody: {
                values: [
                    [
                        new Date().toLocaleString('en-ZA', { timeZone: 'Africa/Johannesburg' }),
                        name,
                        email,
                        phone || 'N/A',
                        selectedPackage,
                        message
                    ],
                ],
            },
        });

        return NextResponse.json({ message: 'Success' }, { status: 200 });
    } catch (error: any) {
        console.error('Contact API Error:', error);
        return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500 });
    }
}
