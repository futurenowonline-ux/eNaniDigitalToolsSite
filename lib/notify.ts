/**
 * Emails the business owner when a lead arrives, via Resend (https://resend.com).
 * Requires RESEND_API_KEY and LEAD_NOTIFY_EMAIL. Optional LEAD_FROM_EMAIL
 * (defaults to Resend's shared sender, which can only deliver to the address
 * that owns the Resend account).
 *
 * Returns false when not configured or when sending fails; never throws.
 */
export async function notifyLead(subject: string, lines: Record<string, string>, replyTo?: string): Promise<boolean> {
    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.LEAD_NOTIFY_EMAIL;
    if (!apiKey || !to) {
        console.warn("Lead notification skipped: RESEND_API_KEY / LEAD_NOTIFY_EMAIL not set");
        return false;
    }

    const text = Object.entries(lines)
        .map(([label, value]) => `${label}: ${value || "-"}`)
        .join("\n");

    try {
        const res = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
            body: JSON.stringify({
                from: process.env.LEAD_FROM_EMAIL || "eNani Website <onboarding@resend.dev>",
                to: to.split(",").map((s) => s.trim()).filter(Boolean),
                subject,
                text,
                ...(replyTo ? { reply_to: replyTo } : {}),
            }),
            signal: AbortSignal.timeout(8000),
        });
        if (!res.ok) {
            console.error("Lead notification failed:", res.status, await res.text());
            return false;
        }
        return true;
    } catch (error) {
        console.error("Lead notification failed:", error);
        return false;
    }
}
