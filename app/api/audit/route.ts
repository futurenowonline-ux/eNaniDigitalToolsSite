import { NextResponse } from "next/server";
import { AuditError, normaliseUrl, runAudit } from "@/lib/pagespeed";
import { clean, rateLimited, readJson, tooMany } from "@/lib/guard";

// A Lighthouse run on a slow site can take 30s+.
export const maxDuration = 60;

export async function POST(req: Request) {
    if (rateLimited(req, "audit", 4, 10 * 60 * 1000)) return tooMany();

    const body = await readJson(req);
    const url = normaliseUrl(clean(body?.url, 300));
    if (!url) {
        return NextResponse.json({ message: "Please enter a valid website address, e.g. yourbusiness.co.za" }, { status: 400 });
    }

    try {
        return NextResponse.json(await runAudit(url));
    } catch (error) {
        if (error instanceof AuditError) {
            return NextResponse.json({ message: error.message }, { status: error.status });
        }
        console.error("Audit API error:", error);
        return NextResponse.json({ message: "Something went wrong running the audit. Please try again." }, { status: 500 });
    }
}
