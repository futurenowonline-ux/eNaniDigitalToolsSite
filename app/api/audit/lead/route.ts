import { NextResponse } from "next/server";
import { appendRow, timestamp } from "@/lib/sheets";
import { notifyLead } from "@/lib/notify";
import { normaliseUrl } from "@/lib/pagespeed";
import { clean, isEmail, rateLimited, readJson, tooMany } from "@/lib/guard";

export async function POST(req: Request) {
    if (rateLimited(req, "audit-lead", 5, 10 * 60 * 1000)) return tooMany();

    const body = await readJson(req);
    if (!body) return NextResponse.json({ message: "Invalid request" }, { status: 400 });
    if (clean(body.website, 200)) return NextResponse.json({ message: "Success" }); // honeypot

    const email = clean(body.email, 254);
    const url = normaliseUrl(clean(body.url, 300));
    const summary = clean(body.summary, 200);
    const issues = clean(body.issues, 1500);

    if (!isEmail(email) || !url) {
        return NextResponse.json({ message: "Please enter a valid email address." }, { status: 400 });
    }

    // Columns: Date | Email | Website | Scores | Top issues
    const [saved, notified] = await Promise.all([
        appendRow("AuditLeads!A:E", [timestamp(), email, url, summary, issues])
            .then(() => true)
            .catch((error) => {
                console.error("Audit lead sheet error:", error);
                return false;
            }),
        notifyLead(`Website audit lead: ${url}`, { Email: email, Website: url, Scores: summary, "Top issues": issues }, email),
    ]);

    if (!saved && !notified) {
        return NextResponse.json({ message: "We couldn't save your request. Please WhatsApp us instead." }, { status: 500 });
    }
    return NextResponse.json({ message: "Success" });
}
