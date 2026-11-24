import { NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function isEmail(value: unknown): value is string {
    return typeof value === "string" && value.length <= 254 && EMAIL_RE.test(value);
}

/** Trims a submitted value to a string of at most `max` characters. */
export function clean(value: unknown, max: number): string {
    return typeof value === "string" ? value.trim().slice(0, max) : "";
}

// Best-effort limiter. Memory is per server instance, so on serverless hosting it
// slows bursts rather than enforcing a hard cap; the honeypot covers basic bots.
const hits = new Map<string, number[]>();

export function rateLimited(req: Request, bucket: string, limit: number, windowMs: number): boolean {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    const key = `${bucket}:${ip}`;
    const now = Date.now();
    const recent = (hits.get(key) || []).filter((t) => now - t < windowMs);
    if (recent.length >= limit) {
        hits.set(key, recent);
        return true;
    }
    recent.push(now);
    hits.set(key, recent);
    if (hits.size > 5000) hits.clear();
    return false;
}

export function tooMany() {
    return NextResponse.json({ message: "Too many requests. Please try again in a few minutes." }, { status: 429 });
}

export async function readJson(req: Request): Promise<Record<string, unknown> | null> {
    try {
        const body = await req.json();
        return body && typeof body === "object" && !Array.isArray(body) ? body : null;
    } catch {
        return null;
    }
}
