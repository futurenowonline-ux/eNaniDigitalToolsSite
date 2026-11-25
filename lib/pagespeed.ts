// Runs a real Lighthouse audit through Google's PageSpeed Insights API.
// Set PAGESPEED_API_KEY (free, from Google Cloud Console) — the keyless quota is
// shared across the internet and is usually exhausted.

export type AuditScores = { performance: number | null; seo: number | null; accessibility: number | null; bestPractices: number | null };
export type AuditIssue = { title: string; category: string; detail?: string };
export type AuditReport = {
    url: string;
    scores: AuditScores;
    metrics: { label: string; value: string }[];
    mobileFriendly: boolean | null;
    issues: AuditIssue[];
};

export class AuditError extends Error {
    status: number;
    /** Short, non-sensitive code shown beside the error so the cause can be identified without server logs. */
    ref?: string;
    constructor(message: string, status: number, ref?: string) {
        super(message);
        this.status = status;
        this.ref = ref;
    }
}

/** Accepts "example.co.za" or a full URL; returns a normalised public http(s) URL or null. */
export function normaliseUrl(input: string): string | null {
    const raw = input.trim();
    if (!raw || raw.length > 300 || /\s/.test(raw)) return null;
    let url: URL;
    try {
        url = new URL(/^https?:\/\//i.test(raw) ? raw : `https://${raw}`);
    } catch {
        return null;
    }
    const host = url.hostname.toLowerCase();
    const isIp = /^[\d.]+$/.test(host) || host.includes(":");
    if (!["http:", "https:"].includes(url.protocol) || url.username || url.port) return null;
    if (isIp || !host.includes(".") || /\.(local|internal|localhost)$/.test(host)) return null;
    url.hash = "";
    return url.toString();
}

const CATEGORIES = [
    ["performance", "Speed"],
    ["seo", "SEO"],
    ["accessibility", "Accessibility"],
    ["best-practices", "Best practices"],
] as const;

const METRICS = [
    ["largest-contentful-paint", "Main content visible"],
    ["first-contentful-paint", "First content visible"],
    ["speed-index", "Speed index"],
    ["total-blocking-time", "Time page is frozen"],
    ["cumulative-layout-shift", "Layout shift"],
] as const;

/* eslint-disable @typescript-eslint/no-explicit-any */
export function buildReport(url: string, data: any): AuditReport {
    const lh = data?.lighthouseResult;
    if (!lh?.categories) throw new AuditError("We couldn't analyse that website. Please check the address.", 422);

    const pct = (id: string) => (typeof lh.categories[id]?.score === "number" ? Math.round(lh.categories[id].score * 100) : null);
    const audits = lh.audits || {};

    const issues: AuditIssue[] = [];
    const seen = new Set<string>();
    for (const [id, label] of CATEGORIES) {
        const failing = (lh.categories[id]?.auditRefs || [])
            .map((ref: any) => ({ ref, audit: audits[ref.id] }))
            .filter(({ ref, audit }: any) =>
                audit && ref.group !== "metrics" && !seen.has(ref.id) &&
                typeof audit.score === "number" && audit.score < 0.9 &&
                ["binary", "numeric", "metricSavings"].includes(audit.scoreDisplayMode))
            .sort((a: any, b: any) => a.audit.score - b.audit.score || (b.ref.weight || 0) - (a.ref.weight || 0))
            .slice(0, 3);
        for (const { ref, audit } of failing) {
            seen.add(ref.id);
            issues.push({ title: String(audit.title).slice(0, 160), category: label, detail: audit.displayValue ? String(audit.displayValue).slice(0, 80) : undefined });
        }
    }

    const viewport = audits["viewport"]?.score;
    return {
        url: lh.finalDisplayedUrl || lh.finalUrl || url,
        scores: { performance: pct("performance"), seo: pct("seo"), accessibility: pct("accessibility"), bestPractices: pct("best-practices") },
        metrics: METRICS.filter(([id]) => audits[id]?.displayValue).map(([id, label]) => ({ label, value: String(audits[id].displayValue) })),
        mobileFriendly: typeof viewport === "number" ? viewport === 1 : null,
        issues,
    };
}
/* eslint-enable @typescript-eslint/no-explicit-any */

export async function runAudit(url: string): Promise<AuditReport> {
    const api = new URL("https://www.googleapis.com/pagespeedonline/v5/runPagespeed");
    api.searchParams.set("url", url);
    api.searchParams.set("strategy", "mobile");
    for (const [id] of CATEGORIES) api.searchParams.append("category", id);
    // Trim: a stray space or newline pasted into the hosting dashboard makes Google reject the key.
    const key = process.env.PAGESPEED_API_KEY?.trim();
    if (key) api.searchParams.set("key", key);
    else console.error("PAGESPEED_API_KEY is not set for this deployment; using the shared keyless quota.");

    let res: Response;
    try {
        res = await fetch(api, { signal: AbortSignal.timeout(55_000), cache: "no-store" });
    } catch {
        throw new AuditError("The audit took too long. Your site may be very slow or offline — WhatsApp us and we'll check it by hand.", 504, "T1");
    }

    if (res.status === 429 || res.status === 403 || (res.status === 400 && key)) {
        const body = (await res.text()).slice(0, 500);
        console.error("PageSpeed quota/key problem:", res.status, body);
        // K1: no key configured. K2: Google refused the key. K3: the key's own quota is used up.
        // K4: Google says the key is invalid (wrong or mangled value).
        let ref = "K3";
        if (!key) ref = "K1";
        else if (res.status === 403) ref = "K2";
        else if (res.status === 400) {
            if (!/API key not valid|API_KEY_INVALID/i.test(body)) {
                throw new AuditError("We couldn't reach that website. Please check the address and try again.", 422);
            }
            ref = "K4";
        }
        throw new AuditError("Our audit tool is busy right now. Please try again shortly, or WhatsApp us your website address and we'll audit it for you.", 503, ref);
    }
    if (!res.ok) {
        console.error("PageSpeed error:", res.status, (await res.text()).slice(0, 300));
        throw new AuditError("We couldn't reach that website. Please check the address and try again.", 422);
    }
    return buildReport(url, await res.json());
}
