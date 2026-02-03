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

        let serviceAccount: any;
        try {
            // Priority 1: Individual Environment Variables (as requested)
            if (process.env.GOOGLE_PROJECT_ID && process.env.GOOGLE_CLIENT_EMAIL && process.env.GOOGLE_PRIVATE_KEY) {
                serviceAccount = {
                    project_id: process.env.GOOGLE_PROJECT_ID,
                    client_email: process.env.GOOGLE_CLIENT_EMAIL,
                    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'), // Handle newline characters
                    client_id: process.env.GOOGLE_CLIENT_ID,
                    type: 'service_account',
                };
            }
            // Priority 2: Full JSON string
            else if (process.env.GOOGLE_SERVICE_ACCOUNT_JSON) {
                serviceAccount = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON);
            }
            // Priority 3: Base64 string
            else if (process.env.GOOGLE_SERVICE_ACCOUNT_B64) {
                const decoded = Buffer.from(process.env.GOOGLE_SERVICE_ACCOUNT_B64, 'base64').toString('utf8');
                serviceAccount = JSON.parse(decoded);
            } else {
                throw new Error('No Google credentials found in environment');
            }
        } catch (error: any) {
            console.error('Credential parsing error:', error);
            return NextResponse.json({ message: 'Server Configuration Error', error: 'Could not parse credentials' }, { status: 500 });
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
