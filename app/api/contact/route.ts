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

        // Format the private key
        let privateKey = process.env.GOOGLE_PRIVATE_KEY || "";
        privateKey = privateKey.trim();
        if (privateKey.startsWith('"') && privateKey.endsWith('"')) {
            privateKey = privateKey.substring(1, privateKey.length - 1);
        }
        privateKey = privateKey.replace(/\\n/g, "\n");

        const auth = new google.auth.GoogleAuth({
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            credentials: {
                client_email: process.env.GOOGLE_CLIENT_EMAIL,
                private_key: privateKey,
                project_id: process.env.GOOGLE_PROJECT_ID,
            } as any,
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
