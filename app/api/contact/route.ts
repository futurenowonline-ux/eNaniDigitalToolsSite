import { NextResponse } from "next/server";
import { appendRow, timestamp } from "@/lib/sheets";
import { notifyLead } from "@/lib/notify";
import { clean, isEmail, rateLimited, readJson, tooMany } from "@/lib/guard";

export async function POST(req: Request) {
    if (rateLimited(req, "contact", 5, 10 * 60 * 1000)) return tooMany();

    const body = await readJson(req);
    if (!body) return NextResponse.json({ message: "Invalid request" }, { status: 400 });

    // Honeypot: real visitors never see or fill this field. Pretend it worked.
    if (clean(body.website, 200)) return NextResponse.json({ message: "Success" });

    const name = clean(body.name, 100);
    const email = clean(body.email, 254);
    const phone = clean(body.phone, 30);
    const selectedPackage = clean(body.package, 60);
    const message = clean(body.message, 2000);

    if (!name || !isEmail(email)) {
        return NextResponse.json({ message: "Please enter your name and a valid email address." }, { status: 400 });
    }

    const [saved, notified] = await Promise.all([
        appendRow("ContactInquiries!A:F", [timestamp(), name, email, phone || "N/A", selectedPackage, message])
            .then(() => true)
            .catch((error) => {
                console.error("Contact sheet error:", error);
                return false;
            }),
        notifyLead(`New website inquiry: ${name}`, { Name: name, Email: email, Phone: phone, Package: selectedPackage, Message: message }, email),
    ]);

    // The lead is safe if it reached either the sheet or the inbox.
    if (!saved && !notified) {
        return NextResponse.json(
            { message: "We couldn't send your inquiry. Please WhatsApp or call us instead." },
            { status: 500 },
        );
    }
    return NextResponse.json({ message: "Success" });
}
