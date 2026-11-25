"use client";

import { useState } from "react";
import { CheckCircle2, Loader2, Search, Send, Smartphone, AlertTriangle } from "lucide-react";
import { whatsappUrl } from "@/lib/site";

type Report = {
    url: string;
    scores: { performance: number | null; seo: number | null; accessibility: number | null; bestPractices: number | null };
    metrics: { label: string; value: string }[];
    mobileFriendly: boolean | null;
    issues: { title: string; category: string; detail?: string }[];
};

const SCORE_LABELS: [keyof Report["scores"], string][] = [
    ["performance", "Speed"],
    ["seo", "SEO"],
    ["accessibility", "Accessibility"],
    ["bestPractices", "Best practices"],
];

function scoreColour(score: number | null) {
    if (score === null) return "text-primary/40 border-primary/10";
    if (score >= 90) return "text-green-700 border-green-600";
    if (score >= 50) return "text-amber-700 border-amber-500";
    return "text-red-700 border-red-600";
}

function verdict(report: Report) {
    const perf = report.scores.performance ?? 0;
    if (perf >= 90) return "Your site is fast on mobile. The items below are the remaining polish.";
    if (perf >= 50) return "Your site works, but it is slower than it should be on a phone — and most of your customers are on phones.";
    return "Your site is slow on mobile. Visitors on a phone connection are likely leaving before it loads.";
}

export default function AuditSection() {
    const [url, setUrl] = useState("");
    const [isRunning, setIsRunning] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [report, setReport] = useState<Report | null>(null);

    const [email, setEmail] = useState("");
    const [trap, setTrap] = useState("");
    const [isSending, setIsSending] = useState(false);
    const [isSent, setIsSent] = useState(false);
    const [leadError, setLeadError] = useState<string | null>(null);

    const runAudit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsRunning(true);
        setError(null);
        try {
            const res = await fetch("/api/audit", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ url }),
            });
            const data = await res.json().catch(() => ({}));
            if (res.ok) setReport(data);
            else setError((data.message || "Something went wrong. Please try again.") + (data.ref ? ` (ref ${data.ref})` : ""));
        } catch {
            setError("Couldn't connect. Please check your internet and try again.");
        } finally {
            setIsRunning(false);
        }
    };

    const sendLead = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!report) return;
        setIsSending(true);
        setLeadError(null);
        const s = report.scores;
        try {
            const res = await fetch("/api/audit/lead", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email,
                    website: trap,
                    url: report.url,
                    summary: `Speed ${s.performance ?? "-"} / SEO ${s.seo ?? "-"} / Accessibility ${s.accessibility ?? "-"} / Best practices ${s.bestPractices ?? "-"}`,
                    issues: report.issues.map((i) => `[${i.category}] ${i.title}`).join("; "),
                }),
            });
            const data = await res.json().catch(() => ({}));
            if (res.ok) setIsSent(true);
            else setLeadError(data.message || "Something went wrong. Please try again.");
        } catch {
            setLeadError("Couldn't connect. Please check your internet and try again.");
        } finally {
            setIsSending(false);
        }
    };

    const reset = () => {
        setReport(null);
        setIsSent(false);
        setError(null);
        setLeadError(null);
    };

    if (!report) {
        return (
            <div className="max-w-xl mx-auto glass-card p-8 md:p-10 rounded-2xl shadow-xl text-center bg-white">
                <form onSubmit={runAudit} className="space-y-4">
                    <label htmlFor="audit-url" className="block text-lg font-bold font-heading">
                        Enter your website address
                    </label>
                    <input
                        id="audit-url"
                        type="text"
                        inputMode="url"
                        autoCapitalize="none"
                        autoCorrect="off"
                        required
                        disabled={isRunning}
                        placeholder="yourbusiness.co.za"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border-2 border-primary/10 focus:border-accent outline-none text-sm transition-all"
                    />
                    <button
                        disabled={isRunning}
                        className="w-full glass-button-dark text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all disabled:opacity-60"
                    >
                        {isRunning ? <Loader2 className="animate-spin" size={20} /> : <Search size={20} />}
                        {isRunning ? "Testing your site on a mobile connection…" : "Run Free Audit"}
                    </button>
                </form>

                <div aria-live="polite">
                    {isRunning && <p className="text-xs opacity-60 mt-4">This is a real test and usually takes 20–40 seconds.</p>}
                    {error && (
                        <p className="mt-4 bg-red-50 text-red-700 p-3 rounded-xl text-sm font-medium border border-red-100">{error}</p>
                    )}
                </div>

                <p className="text-xs opacity-60 mt-6">
                    No website yet?{" "}
                    <a
                        href={whatsappUrl("Hello eNani Digital Tools! I don't have a website yet and would like one.")}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-bold underline"
                    >
                        WhatsApp us
                    </a>{" "}
                    and we&apos;ll get you started.
                </p>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto glass-card p-6 md:p-10 rounded-2xl shadow-xl bg-white border-t-4 border-accent">
            <div className="text-center">
                <h3 className="text-2xl font-bold font-heading text-primary">Your mobile audit</h3>
                <p className="text-xs opacity-60 break-all mt-1">{report.url}</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-8">
                {SCORE_LABELS.map(([key, label]) => (
                    <div key={key} className="text-center">
                        <div className={`mx-auto w-16 h-16 rounded-full border-4 flex items-center justify-center text-xl font-bold ${scoreColour(report.scores[key])}`}>
                            {report.scores[key] ?? "–"}
                        </div>
                        <div className="text-xs font-bold mt-2">{label}</div>
                    </div>
                ))}
            </div>
            <p className="text-center text-[10px] opacity-50 -mt-4 mb-6">Scores out of 100. 90+ good · 50–89 needs work · below 50 poor</p>

            <p className="text-sm text-center mb-6">{verdict(report)}</p>

            {report.mobileFriendly !== null && (
                <p className="flex items-center justify-center gap-2 text-sm font-medium mb-6">
                    <Smartphone size={18} />
                    {report.mobileFriendly ? "Set up to fit phone screens" : "Not set up to fit phone screens"}
                </p>
            )}

            {report.metrics.length > 0 && (
                <dl className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
                    {report.metrics.map((m) => (
                        <div key={m.label} className="bg-secondary/40 rounded-xl p-3 text-center">
                            <dt className="text-[10px] uppercase font-bold opacity-60">{m.label}</dt>
                            <dd className="text-sm font-bold mt-1">{m.value}</dd>
                        </div>
                    ))}
                </dl>
            )}

            {report.issues.length > 0 && (
                <div className="mb-8">
                    <h4 className="font-bold mb-3 text-sm">Top things to fix</h4>
                    <ul className="space-y-2">
                        {report.issues.map((issue, i) => (
                            <li key={i} className="flex items-start gap-3 text-sm">
                                <AlertTriangle size={16} className="shrink-0 mt-0.5 text-amber-600" />
                                <span>
                                    {issue.title}
                                    <span className="block text-xs opacity-60">
                                        {issue.category}
                                        {issue.detail ? ` · ${issue.detail}` : ""}
                                    </span>
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <div className="bg-secondary/40 rounded-2xl p-6 text-center">
                {!isSent ? (
                    <form onSubmit={sendLead} className="space-y-3">
                        <label htmlFor="audit-email" className="block text-sm font-bold">
                            Want us to explain these results and quote on fixing them?
                        </label>
                        <input
                            id="audit-email"
                            type="email"
                            required
                            placeholder="your@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border-2 border-primary/10 focus:border-accent outline-none text-sm bg-white"
                        />
                        {/* Honeypot: hidden from people, filled in by bots */}
                        <input
                            type="text"
                            name="website"
                            tabIndex={-1}
                            autoComplete="off"
                            aria-hidden="true"
                            value={trap}
                            onChange={(e) => setTrap(e.target.value)}
                            className="hidden"
                        />
                        <button
                            disabled={isSending}
                            className="w-full glass-button-dark text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 disabled:opacity-60"
                        >
                            {isSending ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} />}
                            Contact Me About My Results
                        </button>
                        {leadError && <p role="alert" className="text-red-700 text-sm font-medium">{leadError}</p>}
                    </form>
                ) : (
                    <div className="py-2" role="status">
                        <CheckCircle2 className="mx-auto text-primary mb-3" size={40} />
                        <h4 className="font-bold mb-1 text-primary">Thanks — we&apos;ve got your results.</h4>
                        <p className="text-sm opacity-70">We&apos;ll email you within one business day.</p>
                    </div>
                )}
            </div>

            <div className="text-center">
                <button onClick={reset} className="mt-6 text-xs font-bold opacity-60 hover:opacity-100 transition-opacity underline">
                    Audit another website
                </button>
            </div>
        </div>
    );
}
