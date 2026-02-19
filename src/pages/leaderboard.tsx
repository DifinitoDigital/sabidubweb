import Head from "next/head";
import Link from "next/link";
import Footer from "../components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
import { useState } from "react";

// ─── MOCK DATA ───────────────────────────────────────────────────────────────

const UNIVERSITIES = [
    { rank: 1, name: "University of Lagos", shortName: "UNILAG", state: "Lagos", type: "Federal", students: 62800, passRate: 94.2, avgScore: 87.3, topSubject: "Medicine", trend: "up", change: "+2.1" },
    { rank: 2, name: "Obafemi Awolowo University", shortName: "OAU", state: "Osun", type: "Federal", students: 35200, passRate: 92.8, avgScore: 85.6, topSubject: "Law", trend: "up", change: "+1.4" },
    { rank: 3, name: "University of Ibadan", shortName: "UI", state: "Oyo", type: "Federal", students: 28500, passRate: 91.5, avgScore: 84.1, topSubject: "Sciences", trend: "same", change: "0.0" },
    { rank: 4, name: "Ahmadu Bello University", shortName: "ABU", state: "Kaduna", type: "Federal", students: 78000, passRate: 89.3, avgScore: 82.7, topSubject: "Engineering", trend: "up", change: "+0.8" },
    { rank: 5, name: "University of Nigeria, Nsukka", shortName: "UNN", state: "Enugu", type: "Federal", students: 42100, passRate: 88.7, avgScore: 81.9, topSubject: "Agriculture", trend: "down", change: "-0.5" },
    { rank: 6, name: "University of Port Harcourt", shortName: "UNIPORT", state: "Rivers", type: "Federal", students: 38600, passRate: 87.4, avgScore: 80.5, topSubject: "Petroleum Eng.", trend: "up", change: "+1.2" },
    { rank: 7, name: "Covenant University", shortName: "CU", state: "Ogun", type: "Private", students: 12800, passRate: 96.1, avgScore: 88.9, topSubject: "Technology", trend: "up", change: "+3.2" },
    { rank: 8, name: "Bayero University Kano", shortName: "BUK", state: "Kano", type: "Federal", students: 55000, passRate: 85.2, avgScore: 78.4, topSubject: "Islamic Studies", trend: "same", change: "0.0" },
    { rank: 9, name: "Lagos State University", shortName: "LASU", state: "Lagos", type: "State", students: 45200, passRate: 84.8, avgScore: 77.9, topSubject: "Business", trend: "down", change: "-1.1" },
    { rank: 10, name: "University of Benin", shortName: "UNIBEN", state: "Edo", type: "Federal", students: 39100, passRate: 83.5, avgScore: 76.8, topSubject: "Medicine", trend: "up", change: "+0.6" },
];

const SECONDARY_SCHOOLS = [
    { rank: 1, name: "King's College Lagos", shortName: "KCL", state: "Lagos", type: "Federal", students: 2100, waecPassRate: 98.7, averageScore: 91.2, bestArm: "Sciences", trend: "up", change: "+1.3" },
    { rank: 2, name: "Federal Government College, Warri", shortName: "FGC Warri", state: "Delta", type: "Federal", students: 1850, waecPassRate: 97.4, averageScore: 89.5, bestArm: "Sciences", trend: "up", change: "+2.1" },
    { rank: 3, name: "Queens College Lagos", shortName: "QCL", state: "Lagos", type: "Federal", students: 2050, waecPassRate: 96.8, averageScore: 88.3, bestArm: "Sciences", trend: "same", change: "0.0" },
    { rank: 4, name: "Government College Ibadan", shortName: "GCI", state: "Oyo", type: "State", students: 1620, waecPassRate: 95.5, averageScore: 87.1, bestArm: "Arts", trend: "up", change: "+0.9" },
    { rank: 5, name: "Federal Government Girls College, Abuja", shortName: "FGGC Abuja", state: "FCT", type: "Federal", students: 1780, waecPassRate: 94.9, averageScore: 86.4, bestArm: "Sciences", trend: "down", change: "-0.4" },
    { rank: 6, name: "Loyola Jesuit College, Abuja", shortName: "LJC", state: "FCT", type: "Private", students: 980, waecPassRate: 99.1, averageScore: 92.7, bestArm: "Sciences", trend: "up", change: "+1.8" },
    { rank: 7, name: "Government Secondary School, Enugu", shortName: "GSS Enugu", state: "Enugu", type: "State", students: 1400, waecPassRate: 93.2, averageScore: 84.8, bestArm: "Commercial", trend: "up", change: "+0.7" },
    { rank: 8, name: "Aiyetoro Community Grammar School", shortName: "ACGS", state: "Ogun", type: "State", students: 1150, waecPassRate: 92.6, averageScore: 83.5, bestArm: "Arts", trend: "down", change: "-0.8" },
    { rank: 9, name: "Ronik Preparatory School, Lagos", shortName: "Ronik", state: "Lagos", type: "Private", students: 680, waecPassRate: 98.4, averageScore: 90.1, bestArm: "Sciences", trend: "up", change: "+2.5" },
    { rank: 10, name: "Methodist Boys' High School", shortName: "MBHS", state: "Lagos", type: "Private", students: 1240, waecPassRate: 91.8, averageScore: 82.9, bestArm: "Sciences", trend: "same", change: "0.0" },
];

const RANK_MEDAL: Record<number, string> = { 1: "🥇", 2: "🥈", 3: "🥉" };

type Tab = "universities" | "secondary";

export default function Leaderboard() {
    const [tab, setTab] = useState<Tab>("universities");
    const [sortBy, setSortBy] = useState<"passRate" | "avgScore">("passRate");

    const uniData = [...UNIVERSITIES]
        .sort((a, b) => sortBy === "passRate" ? b.passRate - a.passRate : b.avgScore - a.avgScore)
        .map((s, i) => ({ ...s, displayRank: i + 1 }));

    const secData = [...SECONDARY_SCHOOLS]
        .sort((a, b) => sortBy === "passRate" ? b.waecPassRate - a.waecPassRate : b.averageScore - a.averageScore)
        .map((s, i) => ({ ...s, displayRank: i + 1 }));

    const activeData = tab === "universities" ? uniData : secData;

    return (
        <>
            <Head>
                <title>School Leaderboard | SabiDub — Top Nigerian Schools by Performance</title>
                <meta
                    name="description"
                    content="See the top-performing Nigerian universities and secondary schools ranked by WAEC pass rates, academic performance, and student results."
                />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>

            <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-white">
                <Navbar />

                {/* ── HERO ── */}
                <section className="relative pt-36 sm:pt-44 pb-24 px-6 bg-white overflow-hidden">
                    {/* Subtle grid background */}
                    <div className="absolute inset-0 opacity-[0.03]"
                        style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #014751 1px, transparent 0)", backgroundSize: "40px 40px" }} />
                    <div className="absolute top-20 right-0 w-80 h-80 bg-[#FFEDB1]/40 rounded-full blur-[100px] pointer-events-none" />
                    <div className="absolute bottom-0 left-10 w-64 h-64 bg-[#014751]/10 rounded-full blur-[80px] pointer-events-none" />

                    <div className="max-w-6xl mx-auto relative z-10 text-center">
                        <motion.span
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.05 }}
                            className="inline-block px-4 py-1.5 bg-[#014751]/8 border border-[#014751]/10 text-[#014751] text-xs font-extrabold uppercase tracking-[0.25em] rounded-full mb-8"
                        >
                            📊 2024 Academic Rankings
                        </motion.span>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl sm:text-6xl lg:text-7xl font-black text-gray-900 leading-[1.05] tracking-tight mb-6"
                        >
                            Nigeria&apos;s Top<br />
                            <span className="text-[#014751]">Performing Schools</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.25 }}
                            className="text-gray-500 text-lg sm:text-xl max-w-2xl mx-auto font-medium mb-12"
                        >
                            Ranked by WAEC/JAMB pass rates, average academic scores, and student outcomes. Updated each academic session.
                        </motion.p>

                        {/* Summary stats */}
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.35 }}
                            className="flex flex-wrap justify-center gap-8 text-center"
                        >
                            {[
                                { value: "200+", label: "Universities ranked" },
                                { value: "5,000+", label: "Secondary schools" },
                                { value: "2M+", label: "Students tracked" },
                            ].map(s => (
                                <div key={s.label}>
                                    <p className="text-3xl sm:text-4xl font-black text-[#014751]">{s.value}</p>
                                    <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mt-1">{s.label}</p>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* ── CONTROLS ── */}
                <section className="sticky top-[64px] z-30 bg-white/95 backdrop-blur-md border-b border-gray-100 px-6 py-4 shadow-sm">
                    <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4">
                        {/* Tab toggle */}
                        <div className="flex bg-gray-100 rounded-2xl p-1 gap-1">
                            {(["universities", "secondary"] as Tab[]).map(t => (
                                <button
                                    key={t}
                                    onClick={() => setTab(t)}
                                    className={`px-5 py-2.5 rounded-xl text-sm font-extrabold transition-all ${tab === t ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
                                        }`}
                                >
                                    {t === "universities" ? "🎓 Universities" : "🏫 Secondary Schools"}
                                </button>
                            ))}
                        </div>

                        {/* Filters */}
                        <div className="flex items-center gap-3 flex-wrap">
                            <div className="flex bg-gray-100 rounded-xl p-1 gap-1">
                                {([["passRate", "Pass Rate"], ["avgScore", "Avg Score"]] as const).map(([v, l]) => (
                                    <button
                                        key={v}
                                        onClick={() => setSortBy(v)}
                                        className={`px-4 py-2 rounded-lg text-xs font-extrabold transition-all ${sortBy === v ? "bg-[#014751] text-white shadow-sm" : "text-gray-500"
                                            }`}
                                    >
                                        {l}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── FULL TABLE ── */}
                <section className="px-6 pt-16 pb-12 bg-white">
                    <div className="max-w-6xl mx-auto">
                        <p className="text-[11px] font-extrabold uppercase tracking-[0.3em] text-gray-400 mb-8">
                            Full Rankings — All Institutions
                        </p>

                        <div className="space-y-3">
                            <AnimatePresence mode="wait">
                                {activeData.map((school, i) => {
                                    const passRate = tab === "universities"
                                        ? (school as typeof UNIVERSITIES[0]).passRate
                                        : (school as typeof SECONDARY_SCHOOLS[0]).waecPassRate;
                                    const avgScore = tab === "universities"
                                        ? (school as typeof UNIVERSITIES[0]).avgScore
                                        : (school as typeof SECONDARY_SCHOOLS[0]).averageScore;
                                    const topField = tab === "universities"
                                        ? (school as typeof UNIVERSITIES[0]).topSubject
                                        : (school as typeof SECONDARY_SCHOOLS[0]).bestArm;

                                    const rowStyle =
                                        school.displayRank === 1
                                            ? "bg-[#014751]/5 border-[#014751]/25 shadow-sm"
                                            : school.displayRank === 2
                                                ? "bg-gray-50 border-gray-300/60"
                                                : school.displayRank === 3
                                                    ? "bg-amber-50/60 border-amber-200/60"
                                                    : "bg-white border-gray-100 hover:border-gray-200";

                                    return (
                                        <motion.div
                                            key={`${tab}-${school.name}`}
                                            initial={{ opacity: 0, y: 12 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.04 }}
                                            className={`flex items-center gap-4 sm:gap-6 p-4 sm:p-5 rounded-2xl border transition-all hover:shadow-md ${rowStyle}`}
                                        >
                                            {/* Rank medal / number */}
                                            <div className="w-10 text-center flex-shrink-0">
                                                {RANK_MEDAL[school.displayRank] ? (
                                                    <span className="text-2xl leading-none">{RANK_MEDAL[school.displayRank]}</span>
                                                ) : (
                                                    <span className="text-sm font-black text-gray-400">#{school.displayRank}</span>
                                                )}
                                            </div>

                                            {/* School Info */}
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 flex-wrap">
                                                    <h3 className="font-black text-gray-900 text-sm sm:text-base truncate">{school.name}</h3>
                                                    <span className={`text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full ${school.type === "Federal" ? "bg-blue-100 text-blue-700" :
                                                        school.type === "State" ? "bg-green-100 text-green-700" :
                                                            "bg-purple-100 text-purple-700"
                                                        }`}>
                                                        {school.type}
                                                    </span>
                                                </div>
                                                <p className="text-xs text-gray-400 font-bold mt-0.5">📍 {school.state} · Best: {topField}</p>
                                            </div>

                                            {/* Stats – desktop */}
                                            <div className="hidden sm:flex items-center gap-8 flex-shrink-0">
                                                <div className="text-center">
                                                    <p className="text-lg font-black text-[#014751]">{passRate}%</p>
                                                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Pass Rate</p>
                                                </div>
                                                <div className="text-center">
                                                    <p className="text-lg font-black text-gray-800">{avgScore}</p>
                                                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Avg Score</p>
                                                </div>
                                                <div className="text-center w-16">
                                                    <p className={`text-sm font-black ${school.trend === "up" ? "text-green-500" :
                                                        school.trend === "down" ? "text-red-400" : "text-gray-400"
                                                        }`}>
                                                        {school.trend === "up" ? "▲" : school.trend === "down" ? "▼" : "–"} {school.change}
                                                    </p>
                                                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Trend</p>
                                                </div>
                                            </div>

                                            {/* Stats – mobile */}
                                            <div className="sm:hidden flex-shrink-0 text-right">
                                                <p className="text-lg font-black text-[#014751]">{passRate}%</p>
                                                <p className={`text-xs font-black ${school.trend === "up" ? "text-green-500" :
                                                    school.trend === "down" ? "text-red-400" : "text-gray-400"
                                                    }`}>
                                                    {school.trend === "up" ? "▲" : school.trend === "down" ? "▼" : "–"} {school.change}
                                                </p>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </AnimatePresence>
                        </div>

                        {/* Disclaimer */}
                        <p className="text-xs text-gray-400 text-center mt-12 font-medium max-w-xl mx-auto">
                            ⚠️ Rankings are based on mock/aggregate data for demonstration purposes. Official rankings will be updated each academic session based on verified performance data from WAEC, NECO, and JAMB.
                        </p>
                    </div>
                </section>

                {/* ── CTA ── */}
                <section className="px-6 py-24">
                    <div className="max-w-4xl mx-auto bg-[#014751] rounded-[48px] p-10 sm:p-16 text-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#FFEDB1]/10 rounded-full blur-[60px] pointer-events-none" />
                        <p className="text-[11px] font-extrabold uppercase tracking-[0.3em] text-white/40 mb-4">Is Your School Here?</p>
                        <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight mb-6">
                            Get Your School on the<br />
                            <span className="text-[#FFEDB1]">SabiDub Leaderboard</span>
                        </h2>
                        <p className="text-white/60 max-w-md mx-auto mb-10 font-medium">
                            Register your school on SabiDub to track student performance, publish results, and gain national visibility.
                        </p>
                        <Link
                            href="https://portal.sabidub.com/auth/school/signup"
                            className="inline-flex items-center gap-3 px-8 py-4 bg-[#FFEDB1] text-[#014751] rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-105 transition-all active:scale-95 shadow-xl"
                        >
                            Register Your School
                            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4-4 4M21 12H3" />
                            </svg>
                        </Link>
                    </div>
                </section>

                <Footer />
            </motion.main>
        </>
    );
}
