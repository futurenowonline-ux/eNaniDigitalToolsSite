"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Loader2, Send, Globe, Zap, Smartphone } from "lucide-react";

const steps = [
    {
        icon: <Globe className="text-primary" />,
        question: "When was the last time your website was updated?",
        options: [
            { text: "More than 2 years ago", score: 0 },
            { text: "Within the last year", score: 2 },
            { text: "It's brand new / No site yet", score: 3 }
        ]
    },
    {
        icon: <Zap className="text-primary" />,
        question: "How fast does your current site load on a mobile phone?",
        options: [
            { text: "Very slow / Frustrating", score: 0 },
            { text: "Average (3-5 seconds)", score: 1 },
            { text: "Instant / Very Fast", score: 3 }
        ]
    },
    {
        icon: <Smartphone className="text-primary" />,
        question: "Does your site look good and work well on small phones?",
        options: [
            { text: "No, it's hard to read", score: 0 },
            { text: "It works, but it's not great", score: 1 },
            { text: "Perfect on all devices", score: 3 }
        ]
    }
];

export default function AuditSection() {
    const [currentStep, setCurrentStep] = useState(0);
    const [scores, setScores] = useState<number[]>([]);
    const [isFinished, setIsFinished] = useState(false);
    const [email, setEmail] = useState("");
    const [isSending, setIsSending] = useState(false);
    const [isSent, setIsSent] = useState(false);

    const handleOptionSelect = (score: number) => {
        const newScores = [...scores, score];
        setScores(newScores);

        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            setIsFinished(true);
        }
    };

    const totalScore = scores.reduce((a, b) => a + b, 0);
    const maxScore = steps.length * 3;
    const percentage = Math.round((totalScore / maxScore) * 100);

    let message = "";
    if (percentage > 80) message = "Your site is in great shape! We can help with advanced SEO and speed tuning.";
    else if (percentage > 40) message = "A technical upgrade will significantly improve your conversion rate.";
    else message = "Your site is outdated. A modern Next.js upgrade will transform your business presence.";

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;
        setIsSending(true);

        try {
            const res = await fetch("/api/audit", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email,
                    auditType: "Website Audit",
                    totalScore,
                    percentage,
                    message
                })
            });

            if (res.ok) {
                setIsSent(true);
            }
        } catch (error) {
            console.error("Audit submission failed", error);
        } finally {
            setIsSending(false);
        }
    };

    return (
        <div className="max-w-xl mx-auto">
            <AnimatePresence mode="wait">
                {!isFinished ? (
                    <motion.div
                        key="step"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="glass-card p-10 rounded-2xl shadow-xl text-center"
                    >
                        <div className="flex justify-center mb-6">
                            {steps[currentStep].icon}
                        </div>
                        <span className="inline-block px-3 py-1 bg-primary/5 text-primary text-[10px] font-bold uppercase rounded-full mb-4">
                            Question {currentStep + 1} of {steps.length}
                        </span>
                        <h3 className="text-2xl font-bold mb-8 font-heading">{steps[currentStep].question}</h3>
                        <div className="flex flex-col gap-3">
                            {steps[currentStep].options.map((opt, i) => (
                                <button
                                    key={i}
                                    onClick={() => handleOptionSelect(opt.score)}
                                    className="w-full text-left px-6 py-4 rounded-xl glass-button text-sm font-medium"
                                >
                                    {opt.text}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="result"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="glass-card p-10 rounded-2xl shadow-xl text-center border-t-4 border-accent bg-white"
                    >
                        <h3 className="text-3xl font-bold mb-2 font-heading text-primary">Health Score: {percentage}%</h3>
                        <p className="opacity-70 text-sm mb-10">{message}</p>

                        {!isSent ? (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <p className="text-sm font-medium">Enter your email for your free technical upgrade report:</p>
                                <input
                                    type="email"
                                    required
                                    placeholder="your@email.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl border-2 border-primary/5 focus:border-accent outline-none text-sm transition-all"
                                />
                                <button
                                    disabled={isSending}
                                    className="w-full glass-button-dark text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all"
                                >
                                    {isSending ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} />}
                                    Get My Report
                                </button>
                            </form>
                        ) : (
                            <div className="py-6 fade-in">
                                <CheckCircle2 className="mx-auto text-primary mb-4" size={48} />
                                <h4 className="font-bold mb-1 text-primary">Report Requested!</h4>
                                <p className="text-sm opacity-60">We&apos;re analyzing your site. Check your inbox within 10 minutes.</p>
                            </div>
                        )}

                        <button
                            onClick={() => {
                                setCurrentStep(0);
                                setIsFinished(false);
                                setIsSent(false);
                                setScores([]);
                            }}
                            className="mt-8 text-xs font-bold opacity-30 hover:opacity-100 transition-opacity"
                        >
                            Restart Audit
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
