import Head from "next/head";
import Link from "next/link";
import Footer from "../components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";

const RANK_MEDAL: Record<number, string> = { 1: "🥇", 2: "🥈", 3: "🥉" };

type Tab = "top50" | "universities" | "secondary";

interface LeaderboardEntry {
  id: string;
  rank: number;
  name: string;
  institution: string;
  category: 'Tertiary' | 'Secondary';
  department?: string;
  level?: string;
  class?: string;
  points: number;
  competitions: number;
  profileImage?: string;
}

export default function Leaderboard() {
    const [tab, setTab] = useState<Tab>("top50");
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState<{ top50?: LeaderboardEntry[]; tertiary: LeaderboardEntry[]; secondary: LeaderboardEntry[] }>({ tertiary: [], secondary: [] });

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/leaderboards`);
                const json = await res.json();
                
                // Set data if valid response
                if (json && Array.isArray(json.tertiary) && Array.isArray(json.secondary)) {
                    setData(json);
                } else {
                    setData({ top50: [], tertiary: [], secondary: [] });
                }
            } catch (err) {
                console.error("Failed to fetch leaderboard", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchLeaderboard();
    }, []);

    const uniData = data.tertiary || [];
    const secData = data.secondary || [];
    const top50Data = data.top50 || [];
    
    // Check if there are any students
    const hasAnyStudent = [...top50Data, ...uniData, ...secData].length > 0;

    const activeData = tab === "top50" ? top50Data : tab === "universities" ? uniData : secData;

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
                            🏆 Student Leaderboards
                        </motion.span>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl sm:text-6xl lg:text-7xl font-black text-gray-900 leading-[1.05] tracking-tight mb-6"
                        >
                            Nigeria&apos;s Top<br />
                            <span className="text-[#014751]">Performing Students</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.25 }}
                            className="text-gray-500 text-lg sm:text-xl max-w-2xl mx-auto font-medium mb-12"
                        >
                            Ranked by quiz engagement, academic scores, and competition victories across the nation. Updated dynamically.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.35 }}
                            className="flex flex-wrap justify-center gap-8 text-center"
                        >
                            {[
                                { value: uniData.length.toLocaleString(), label: "Tertiary Students" },
                                { value: secData.length.toLocaleString(), label: "Secondary Students" },
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
                <section className="sm:sticky sm:top-[64px] z-30 bg-white/95 backdrop-blur-md border-b border-gray-100 px-4 sm:px-6 py-4 shadow-sm">
                    <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-4">
                        {/* Tab toggle */}
                        {hasAnyStudent && (
                            <div className="flex bg-gray-100 rounded-2xl p-1 gap-1 w-full sm:w-auto overflow-x-auto hide-scrollbar">
                                <button
                                    onClick={() => setTab("top50")}
                                    className={`whitespace-nowrap flex-1 sm:flex-none px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all ${tab === "top50" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
                                        }`}
                                >
                                    🌟 Top 50 Students
                                </button>
                                <button
                                    onClick={() => setTab("universities")}
                                    className={`whitespace-nowrap flex-1 sm:flex-none px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all ${tab === "universities" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
                                        }`}
                                >
                                    🎓 Universities
                                </button>
                                <button
                                    onClick={() => setTab("secondary")}
                                    className={`whitespace-nowrap flex-1 sm:flex-none px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all ${tab === "secondary" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
                                        }`}
                                >
                                    🏫 Secondary
                                </button>
                            </div>
                        )}
                    </div>
                </section>

                {/* ── FULL TABLE ── */}
                <section className="px-6 pt-16 pb-12 bg-white min-h-[400px]">
                    <div className="max-w-6xl mx-auto">
                        <p className="text-[11px] font-extrabold uppercase tracking-[0.3em] text-gray-400 mb-8 text-center sm:text-left">
                            {tab === "top50" ? "Top 50 Students (Global)" : tab === "universities" ? "Tertiary Students Rankings" : "Secondary Students Rankings"}
                        </p>

                        <div className="space-y-3">
                            <AnimatePresence mode="wait">
                                {isLoading ? (
                                    <motion.div
                                        key="loading"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="py-20 text-center"
                                    >
                                        <div className="w-8 h-8 rounded-full border-4 border-gray-200 border-t-[#014751] animate-spin mx-auto mb-4" />
                                        <p className="text-sm font-bold text-gray-500">Loading live rankings...</p>
                                    </motion.div>
                                ) : !hasAnyStudent ? (
                                    <motion.div
                                        key="empty"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="py-24 text-center bg-gray-50 rounded-3xl border border-gray-100"
                                    >
                                        <div className="text-4xl mb-4">🏆</div>
                                        <p className="text-xl font-bold text-gray-900 mb-2">No rankings available yet!</p>
                                        <p className="text-sm text-gray-500">Take a quiz or participate in a competition to get on the leaderboard.</p>
                                    </motion.div>
                                ) : (
                                    activeData.map((student, i) => {
                                        const rowStyle =
                                            student.rank === 1
                                                ? "bg-[#014751]/5 border-[#014751]/25 shadow-sm"
                                                : student.rank === 2
                                                    ? "bg-gray-50 border-gray-300/60"
                                                    : student.rank === 3
                                                        ? "bg-amber-50/60 border-amber-200/60"
                                                        : "bg-white border-gray-100 hover:border-gray-200";

                                        return (
                                            <motion.div
                                                key={`${tab}-${student.id}`}
                                                initial={{ opacity: 0, y: 12 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: Math.min(i * 0.04, 0.4) }}
                                                className={`flex items-center gap-4 sm:gap-6 p-4 sm:p-5 rounded-2xl border transition-all hover:shadow-md ${rowStyle}`}
                                            >
                                                {/* Rank medal / number */}
                                                <div className="w-10 text-center flex-shrink-0">
                                                    {RANK_MEDAL[student.rank] ? (
                                                        <span className="text-2xl leading-none">{RANK_MEDAL[student.rank]}</span>
                                                    ) : (
                                                        <span className="text-sm font-black text-gray-400">#{student.rank}</span>
                                                    )}
                                                </div>

                                                {/* Student Info */}
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-2 flex-wrap mb-1">
                                                        <h3 className="font-black text-gray-900 text-sm sm:text-base truncate">{student.name}</h3>
                                                        <span className={`text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full ${student.category === "Tertiary" ? "bg-blue-100 text-blue-700" : "bg-green-100 text-green-700"}`}>
                                                            {student.category}
                                                        </span>
                                                    </div>
                                                    <p className="text-xs text-gray-500 font-bold truncate">🏫 {student.institution || 'Unknown Institution'}</p>
                                                    {(student.department || student.class) && (
                                                      <p className="text-[10px] text-gray-400 font-bold mt-1 uppercase tracking-wider">{student.department || student.class} {student.level ? `· Level ${student.level}` : ''}</p>
                                                    )}
                                                </div>

                                                {/* Stats – desktop */}
                                                <div className="hidden sm:flex items-center gap-8 flex-shrink-0">
                                                    <div className="text-center min-w-[60px]">
                                                        <p className="text-lg font-black text-[#014751]">{student.points.toLocaleString()}</p>
                                                        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Points</p>
                                                    </div>
                                                    <div className="text-center min-w-[60px]">
                                                        <p className="text-lg font-black text-gray-800">{student.competitions}</p>
                                                        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Wins</p>
                                                    </div>
                                                </div>

                                                {/* Stats – mobile */}
                                                <div className="sm:hidden flex-shrink-0 text-right">
                                                    <p className="text-lg font-black text-[#014751]">{student.points.toLocaleString()}</p>
                                                    <p className="text-[10px] font-bold text-gray-400 uppercase">Points</p>
                                                </div>
                                            </motion.div>
                                        );
                                    })
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </section>

                {/* ── CTA ── */}
                <section className="px-6 py-24">
                    <div className="max-w-4xl mx-auto bg-[#014751] rounded-[48px] p-10 sm:p-16 text-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#FFEDB1]/10 rounded-full blur-[60px] pointer-events-none" />
                        <p className="text-[11px] font-extrabold uppercase tracking-[0.3em] text-white/40 mb-4">Climb The Ranks</p>
                        <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight mb-6">
                            Start Taking Quizzes &<br />
                            <span className="text-[#FFEDB1]">Join the Leaderboard</span>
                        </h2>
                        <p className="text-white/60 max-w-md mx-auto mb-10 font-medium">
                            Compete with students nation-wide on SabiDub. Track your performance and rise to the top 50 today!
                        </p>
                        <Link
                            href="https://portal.sabidub.com/auth/signup"
                            className="inline-flex items-center gap-3 px-8 py-4 bg-[#FFEDB1] text-[#014751] rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-105 transition-all active:scale-95 shadow-xl"
                        >
                            Join the Challenge
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
