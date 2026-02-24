"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Head from "next/head";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import {
    Trophy,
    Users,
    Vote,
    TrendingUp,
    Clock,
    CheckCircle2,
    Share2,
    Crown,
    Medal,
    Award,
    Loader2,
    AlertCircle,
    Building2,
    Calendar,
} from "lucide-react";

// Colors for the top 3 ranks — adjusted for light background
const RANK_COLORS = [
    { bg: "from-yellow-400 to-amber-500", text: "text-yellow-600", border: "border-yellow-300", barBg: "bg-gradient-to-r from-yellow-400 to-amber-500", icon: Crown },
    { bg: "from-slate-300 to-slate-400", text: "text-slate-500", border: "border-slate-200", barBg: "bg-gradient-to-r from-slate-300 to-slate-400", icon: Medal },
    { bg: "from-amber-500 to-amber-600", text: "text-amber-600", border: "border-amber-200", barBg: "bg-gradient-to-r from-amber-500 to-amber-600", icon: Award },
];

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
    COMPLETED: { label: "FINAL RESULTS", color: "bg-green-500" },
    VOTING: { label: "LIVE VOTING", color: "bg-red-500 animate-pulse" },
    COUNTING: { label: "COUNTING VOTES", color: "bg-orange-500 animate-pulse" },
    UPCOMING: { label: "UPCOMING", color: "bg-blue-500" },
    NOMINATION: { label: "NOMINATIONS OPEN", color: "bg-purple-500" },
    CAMPAIGNING: { label: "CAMPAIGNING", color: "bg-indigo-500" },
    CANCELLED: { label: "CANCELLED", color: "bg-gray-400" },
};

function formatDate(d: string) {
    return new Date(d).toLocaleDateString("en-NG", {
        day: "numeric", month: "long", year: "numeric",
    });
}

function Avatar({ src, name, size = 64 }: { src?: string | null; name: string; size?: number }) {
    const initials = name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase();
    if (src) {
        return (
            <Image
                src={src}
                alt={name}
                width={size}
                height={size}
                className="rounded-full object-cover"
                style={{ width: size, height: size }}
                unoptimized
            />
        );
    }
    return (
        <div
            className="rounded-full bg-gradient-to-br from-[#014751] to-[#026372] flex items-center justify-center font-black text-white"
            style={{ width: size, height: size, fontSize: size * 0.35 }}
        >
            {initials}
        </div>
    );
}

export default function PublicElectionResultsPage() {
    const router = useRouter();
    const { id } = router.query;
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

    useEffect(() => {
        if (!id) return;

        const fetchResults = async () => {
            try {
                const res = await axios.get(`${BASE_URL}/elections/${id}/public-results`);
                setData(res.data);
                setError(null);
            } catch (err: any) {
                setError(err.response?.data?.message || "Failed to load results. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchResults();

        const interval = setInterval(() => {
            if (data?.status === "VOTING" || data?.status === "COUNTING") {
                fetchResults();
            }
        }, 30000);

        return () => clearInterval(interval);
    }, [id, data?.status, BASE_URL]);

    function handleShare() {
        const url = window.location.href;
        if (navigator.share) {
            navigator.share({ title: data?.title || "Election Results", text: `Check out the results for: ${data?.title} on SabiDub`, url });
        } else {
            navigator.clipboard.writeText(url);
            alert("Link copied to clipboard!");
        }
    }

    if (!id || loading) {
        return (
            <div className="min-h-screen bg-white flex flex-col items-center justify-center">
                <Navbar />
                <div className="text-center space-y-4 pt-20">
                    <Loader2 className="w-12 h-12 text-[#014751] animate-spin mx-auto" />
                    <p className="text-gray-500 font-medium">Loading results...</p>
                </div>
            </div>
        );
    }

    if (error || !data) {
        return (
            <div className="min-h-screen bg-white flex flex-col">
                <Navbar />
                <div className="flex-1 flex items-center justify-center p-8 pt-32">
                    <div className="text-center space-y-4 max-w-md">
                        <AlertCircle className="w-16 h-16 text-red-400 mx-auto" />
                        <h2 className="text-2xl font-black text-gray-900">Results Not Found</h2>
                        <p className="text-gray-500">{error || "The requested election results are not available or the ID is incorrect."}</p>
                        <button
                            onClick={() => router.push('/')}
                            className="mt-6 px-6 py-3 bg-gray-100 hover:bg-gray-200 border border-gray-200 rounded-xl text-sm font-bold transition-all text-gray-700"
                        >
                            Return to Homepage
                        </button>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    const statusInfo = STATUS_LABELS[data.status] || { label: data.status, color: "bg-gray-400" };
    const isLive = data.status === "VOTING" || data.status === "COUNTING";
    const isCompleted = data.status === "COMPLETED";

    return (
        <div className="min-h-screen bg-white text-gray-900 flex flex-col">
            <Head>
                <title>{data.title} | Election Results | SabiDub</title>
                <meta name="description" content={`View live results for ${data.title}. Secure and transparent election results powered by SabiDub.`} />
            </Head>

            <Navbar />

            {/* Subtle background decoration */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#014751]/5 rounded-full blur-3xl" />
                <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#FFEDB1]/30 rounded-full blur-3xl" />
                {isCompleted && (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-yellow-400/5 rounded-full blur-3xl" />
                )}
            </div>

            <div className="relative z-10 w-full max-w-4xl mx-auto px-4 py-32 space-y-10 flex-1">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center space-y-4"
                >
                    {/* Institution */}
                    <div className="flex items-center justify-center gap-2 text-[#014751]">
                        <Building2 className="w-4 h-4" />
                        <span className="text-sm font-bold uppercase tracking-widest">{data.institution || "SabiDub"}</span>
                    </div>

                    {/* Status Badge */}
                    <div className="flex justify-center">
                        <span className={`${statusInfo.color} text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-md`}>
                            {isLive && <span className="inline-block w-1.5 h-1.5 bg-white rounded-full mr-2 animate-ping" />}
                            {statusInfo.label}
                        </span>
                    </div>

                    <h1 className="text-3xl sm:text-5xl font-black leading-tight tracking-tight text-gray-900">
                        {data.title}
                    </h1>

                    {data.department && (
                        <p className="text-gray-400 font-medium text-lg italic">{data.department} {data.facultyName ? `· ${data.facultyName}` : ""}</p>
                    )}

                    <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500 bg-gray-50 py-3 px-6 rounded-2xl border border-gray-100 max-w-fit mx-auto">
                        <span className="flex items-center gap-1.5">
                            <Vote className="w-4 h-4 text-[#014751]" />
                            <span className="font-bold text-gray-800">{data.totalVotes.toLocaleString()}</span> votes
                        </span>
                        <span className="flex items-center gap-1.5">
                            <Users className="w-4 h-4 text-[#014751]" />
                            <span className="font-bold text-gray-800">{data.totalVoters.toLocaleString()}</span> voters
                        </span>
                        {data.votingEndDate && (
                            <span className="flex items-center gap-1.5">
                                <Calendar className="w-4 h-4 text-[#014751]" />
                                {formatDate(data.votingEndDate)}
                            </span>
                        )}
                    </div>

                    <button
                        onClick={handleShare}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#014751] hover:bg-[#026372] text-white text-sm font-black uppercase tracking-widest transition-all shadow-lg active:scale-95"
                    >
                        <Share2 className="w-4 h-4" />
                        Share Results
                    </button>
                </motion.div>

                {/* Winner Spotlight */}
                {isCompleted && data.winner && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-yellow-50 via-amber-50 to-white border border-yellow-200 p-8 text-center shadow-sm"
                    >
                        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-400/60 to-transparent" />
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-32 h-32 bg-yellow-300/20 rounded-full blur-2xl" />

                        <Crown className="w-10 h-10 text-yellow-500 mx-auto mb-4" />
                        <p className="text-yellow-600/80 text-xs font-black uppercase tracking-widest mb-3">Winner</p>

                        <div className="flex justify-center mb-4">
                            <div className="ring-4 ring-yellow-300 rounded-full shadow-xl">
                                <Avatar src={data.winner.profilePicture} name={data.winner.name} size={110} />
                            </div>
                        </div>

                        <h2 className="text-3xl font-black text-gray-900">{data.winner.name}</h2>
                        <p className="text-yellow-600 font-bold text-2xl mt-1">
                            {data.winner.voteCount.toLocaleString()} votes · {data.winner.percentage}%
                        </p>

                        <div className="mt-6 flex items-center justify-center gap-2 text-green-600">
                            <CheckCircle2 className="w-5 h-5" />
                            <span className="font-black uppercase text-sm tracking-widest">Elected</span>
                        </div>
                    </motion.div>
                )}

                {/* All Candidates Ranked */}
                <div className="space-y-4">
                    <h2 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 flex items-center gap-2 px-2">
                        <TrendingUp className="w-4 h-4" />
                        Final Standings
                    </h2>

                    <div className="grid gap-4">
                        {data.results.map((candidate: any, idx: number) => {
                            const rankStyle = RANK_COLORS[idx] || { bg: "from-gray-200 to-gray-300", text: "text-gray-500", border: "border-gray-200", barBg: "bg-gradient-to-r from-gray-200 to-gray-300", icon: null };
                            const RankIcon = rankStyle.icon;
                            const barWidth = data.results[0]?.voteCount > 0 ? (candidate.voteCount / data.results[0].voteCount) * 100 : 0;

                            return (
                                <motion.div
                                    key={candidate.candidateId}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 * idx }}
                                    className={`relative overflow-hidden rounded-2xl border ${rankStyle.border} bg-white shadow-sm p-5`}
                                >
                                    {/* subtle bg bar */}
                                    <div
                                        className={`absolute inset-y-0 left-0 ${rankStyle.barBg} opacity-[0.04] transition-all duration-1000`}
                                        style={{ width: `${barWidth}%` }}
                                    />

                                    <div className="relative flex items-center gap-4">
                                        {/* Rank */}
                                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${rankStyle.bg} flex items-center justify-center flex-shrink-0 shadow-md`}>
                                            {RankIcon ? (
                                                <RankIcon className="w-5 h-5 text-white" />
                                            ) : (
                                                <span className="font-black text-white text-sm">#{candidate.rank}</span>
                                            )}
                                        </div>

                                        {/* Avatar */}
                                        <Avatar src={candidate.profilePicture} name={candidate.name} size={48} />

                                        {/* Info */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2">
                                                <h3 className="font-black text-gray-900 truncate text-base sm:text-lg">{candidate.name}</h3>
                                                {candidate.isWinner && (
                                                    <span className="flex-shrink-0 text-[8px] font-black uppercase bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full border border-yellow-200">
                                                        ELECTED
                                                    </span>
                                                )}
                                            </div>
                                            {candidate.campaignSlogan && (
                                                <p className="text-xs text-gray-400 italic truncate mt-0.5">&quot;{candidate.campaignSlogan}&quot;</p>
                                            )}

                                            {/* Progress bar */}
                                            <div className="mt-3 w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${barWidth}%` }}
                                                    transition={{ duration: 1.5, delay: 0.3 + idx * 0.1, ease: "easeOut" }}
                                                    className={`h-full ${rankStyle.barBg}`}
                                                />
                                            </div>
                                        </div>

                                        {/* Vote count */}
                                        <div className="text-right flex-shrink-0">
                                            <p className={`text-xl sm:text-2xl font-black ${rankStyle.text}`}>{candidate.percentage}%</p>
                                            <p className="text-xs text-gray-400 font-bold uppercase tracking-tighter">{candidate.voteCount.toLocaleString()} votes</p>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>

                    {data.results.length === 0 && (
                        <div className="text-center py-20 bg-gray-50 rounded-3xl border border-gray-100 border-dashed">
                            <Vote className="w-12 h-12 mx-auto mb-4 opacity-20 text-gray-400" />
                            <p className="font-bold text-gray-400 uppercase tracking-widest text-sm">No results available yet</p>
                        </div>
                    )}
                </div>

                {/* Verification Footer */}
                <div className="text-center pt-10 border-t border-gray-100 space-y-4">
                    <div className="flex items-center justify-center gap-3">
                        <div className="w-8 h-8 bg-[#014751] rounded-xl shadow-lg flex items-center justify-center">
                            <Vote className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-black text-gray-900 text-lg tracking-tight">SabiDub Elections</span>
                    </div>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-[0.3em]">Secure · Transparent · Verified</p>
                    {isLive && (
                        <p className="text-xs text-[#014751] flex items-center justify-center gap-2 bg-[#014751]/5 py-2 px-4 rounded-full max-w-fit mx-auto">
                            <Clock className="w-3 h-3" />
                            Auto-refreshing live data...
                        </p>
                    )}
                </div>
            </div>

            <Footer />
        </div>
    );
}
