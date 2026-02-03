/* eslint-disable @typescript-eslint/no-explicit-any */
import { google } from 'googleapis';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, phone, package: selectedPackage, message } = body;

        console.log('API Request received:', { name, email });
        console.log('Env Check:', {
            hasProjectId: !!process.env.GOOGLE_PROJECT_ID,
            hasClientEmail: !!process.env.GOOGLE_CLIENT_EMAIL,
            hasPrivateKey: !!process.env.GOOGLE_PRIVATE_KEY,
            hasSheetId: !!process.env.GOOGLE_SHEET_ID
        });

        if (!email || !name) {
            return NextResponse.json({ message: 'Name and Email are required' }, { status: 400 });
        }

        const serviceAccount = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON || '{}');

        const auth = new google.auth.GoogleAuth({
            credentials: serviceAccount,
            scopes: ["https://www.googleapis.com/auth/spreadsheets"],
        });

        const sheets = google.sheets({ version: "v4", auth });
        const spreadsheetId = process.env.GOOGLE_SHEET_ID;
        const range = "ContactInquiries!A:F";

        console.log('Attempting to append to sheet:', { spreadsheetId, range });

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

        console.log('Successfully appended to sheet');

        return NextResponse.json({ message: 'Success' }, { status: 200 });
    } catch (error: any) {
        console.error('Contact API Error Detail:', error);
        return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500 });
    }
}
