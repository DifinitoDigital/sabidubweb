import Head from "next/head";
import Link from "next/link";
import Footer from "../components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";

const RANK_MEDAL: Record<number, string> = { 1: "🥇", 2: "🥈", 3: "🥉" };

type StudentTab = "top50" | "universities" | "secondary";
type SchoolTab = "topUniversities" | "topSecondarySchools";

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
  previousRank: number;
  profileImage?: string;
}

interface SchoolLeaderboardEntry {
  id: string;
  rank: number;
  name: string;
  shortName?: string;
  state: string;
  type: string;
  category: 'University' | 'Secondary';
  totalStudents: number;
  totalPoints: number;
  avgPoints: number;
}

interface LeaderboardData {
  top50?: LeaderboardEntry[];
  tertiary: LeaderboardEntry[];
  secondary: LeaderboardEntry[];
  topUniversities?: SchoolLeaderboardEntry[];
  topSecondarySchools?: SchoolLeaderboardEntry[];
}

export default function Leaderboard() {
    const [mainTab, setMainTab] = useState<"students" | "schools">("students");
    const [studentTab, setStudentTab] = useState<StudentTab>("top50");
    const [schoolTab, setSchoolTab] = useState<SchoolTab>("topUniversities");
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState<LeaderboardData>({ tertiary: [], secondary: [] });

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/leaderboards`);
                const json = await res.json();
                if (json && Array.isArray(json.tertiary) && Array.isArray(json.secondary)) {
                    setData(json);
                    
                    // Auto-switch to schools if user clicked a school-related stat or if students are empty
                    // (Just a helper, not necessary)
                } else {
                    setData({ top50: [], tertiary: [], secondary: [], topUniversities: [], topSecondarySchools: [] });
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
    const topUniversities = data.topUniversities || [];
    const topSecondarySchools = data.topSecondarySchools || [];

    const hasAnyStudent = [...top50Data, ...uniData, ...secData].length > 0;
    const hasAnySchool = [...topUniversities, ...topSecondarySchools].length > 0;

    const activeStudentData = studentTab === "top50" ? top50Data : studentTab === "universities" ? uniData : secData;
    const activeSchoolData: SchoolLeaderboardEntry[] = schoolTab === "topUniversities" ? topUniversities : topSecondarySchools;

    return (
        <>
            <Head>
                <title>Leaderboard | SabiDub — Top Nigerian Students & Schools</title>
                <meta name="description" content="See the top-performing Nigerian students and schools ranked by academic performance, quiz points, and competition results." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>

            <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-white">
                <Navbar />

                {/* ── HERO ── */}
                <section className="relative pt-36 sm:pt-44 pb-20 px-6 bg-white overflow-hidden border-b border-gray-50">
                    <div className="absolute inset-0 opacity-[0.03]"
                        style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #014751 1px, transparent 0)", backgroundSize: "40px 40px" }} />
                    <div className="absolute top-20 right-0 w-80 h-80 bg-[#FFEDB1]/40 rounded-full blur-[100px] pointer-events-none" />
                    <div className="absolute bottom-0 left-10 w-64 h-64 bg-[#014751]/10 rounded-full blur-[80px] pointer-events-none" />

                    <div className="max-w-6xl mx-auto relative z-10 text-center">
                        <motion.span initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
                            className="inline-block px-4 py-1.5 bg-[#014751]/8 border border-[#014751]/10 text-[#014751] text-xs font-extrabold uppercase tracking-[0.25em] rounded-full mb-8">
                            🏆 Live Rankings
                        </motion.span>
                        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                            className="text-4xl sm:text-6xl lg:text-7xl font-black text-gray-900 leading-[1.05] tracking-tight mb-6">
                            Nigeria&apos;s Top<br />
                            <span className="text-[#014751]">Students & Schools</span>
                        </motion.h1>
                        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}
                            className="text-gray-500 text-lg sm:text-xl max-w-2xl mx-auto font-medium mb-12">
                            Real-time rankings powered by quiz performance, academic scores, and competition results.
                        </motion.p>

                        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
                            className="flex flex-wrap justify-center gap-8 text-center mb-16">
                            {[
                                { value: uniData.length.toLocaleString(), label: "Tertiary Students", key: "students" as const },
                                { value: secData.length.toLocaleString(), label: "Secondary Students", key: "students" as const },
                                { value: topUniversities.length.toLocaleString(), label: "Universities Ranked", key: "schools" as const },
                                { value: topSecondarySchools.length.toLocaleString(), label: "Schools Ranked", key: "schools" as const },
                            ].map(s => (
                                <button key={s.label} onClick={() => setMainTab(s.key)} className="group hover:scale-105 transition-transform">
                                    <p className="text-3xl sm:text-4xl font-black text-[#014751] group-hover:text-[#016d7a] transition-colors">{isLoading ? "—" : s.value}</p>
                                    <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mt-1">{s.label}</p>
                                </button>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* ── STICKY NAVIGATION ── */}
                <div className="sticky top-[64px] z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all duration-300">
                    <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                        {/* Main Toggle */}
                        <div className="flex bg-gray-100 rounded-[20px] p-1 gap-1 border border-gray-200/50 shadow-inner">
                            <button onClick={() => setMainTab("students")}
                                className={`px-6 py-2.5 rounded-[16px] text-xs sm:text-sm font-black transition-all flex items-center gap-2 ${mainTab === "students" ? "bg-white text-[#014751] shadow-md scale-100" : "text-gray-400 hover:text-gray-600 grayscale active:scale-95 text-[11px]"}`}>
                                👤 Students
                            </button>
                            <button onClick={() => setMainTab("schools")}
                                className={`px-6 py-2.5 rounded-[16px] text-xs sm:text-sm font-black transition-all flex items-center gap-2 ${mainTab === "schools" ? "bg-white text-[#014751] shadow-md scale-100" : "text-gray-400 hover:text-gray-600 grayscale active:scale-95 text-[11px]"}`}>
                                🏛️ Schools
                            </button>
                        </div>

                        {/* Sub-Tabs (Conditional) */}
                        <AnimatePresence mode="wait">
                            {mainTab === "students" ? (
                                <motion.div key="st" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}
                                    className="flex bg-gray-50 border border-gray-100 rounded-2xl p-1 gap-1">
                                    {([
                                        { key: "top50", label: "🌟 Top 50" },
                                        { key: "universities", label: "🎓 Tertiary" },
                                        { key: "secondary", label: "🏫 Secondary" },
                                    ] as { key: StudentTab; label: string }[]).map(t => (
                                        <button key={t.key} onClick={() => setStudentTab(t.key)}
                                            className={`whitespace-nowrap px-4 py-1.5 rounded-xl text-[10px] sm:text-xs font-extrabold transition-all ${studentTab === t.key ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}>
                                            {t.label}
                                        </button>
                                    ))}
                                </motion.div>
                            ) : (
                                <motion.div key="sc" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}
                                    className="flex bg-gray-50 border border-gray-100 rounded-2xl p-1 gap-1">
                                    {([
                                        { key: "topUniversities", label: "🎓 Universities" },
                                        { key: "topSecondarySchools", label: "🏫 Secondary" },
                                    ] as { key: SchoolTab; label: string }[]).map(t => (
                                        <button key={t.key} onClick={() => setSchoolTab(t.key)}
                                            className={`whitespace-nowrap px-4 py-1.5 rounded-xl text-[10px] sm:text-xs font-extrabold transition-all ${schoolTab === t.key ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}>
                                            {t.label}
                                        </button>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* ══════════════════════════════════════════════
                    RANKING LIST SECTION
                ══════════════════════════════════════════════ */}
                <section className="px-6 pt-10 pb-20 bg-white min-h-[500px]">
                    <div className="max-w-6xl mx-auto">
                        <AnimatePresence mode="wait">
                            {mainTab === "students" ? (
                                <motion.div key="students-list" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-3">
                                    <div className="mb-6">
                                        <h2 className="text-2xl font-black text-gray-900">World-Class Students</h2>
                                        <p className="text-sm text-gray-500 font-medium">Nigerian students ranked by academic performance and quiz excellence.</p>
                                    </div>

                                    {isLoading ? (
                                        <div className="py-20 text-center">
                                            <div className="w-8 h-8 rounded-full border-4 border-gray-200 border-t-[#014751] animate-spin mx-auto mb-4" />
                                            <p className="text-sm font-bold text-gray-500">Loading student rankings...</p>
                                        </div>
                                    ) : !hasAnyStudent ? (
                                        <div className="py-20 text-center bg-gray-50 rounded-3xl border border-gray-100">
                                            <div className="text-4xl mb-4">📊</div>
                                            <p className="text-lg font-bold text-gray-900 mb-1">No student rankings yet</p>
                                            <p className="text-sm text-gray-500">Take a quiz to appear on the leaderboard.</p>
                                        </div>
                                    ) : (
                                        activeStudentData.map((student, i) => {
                                            const rank = student.rank;
                                            const rowStyle = rank === 1 ? "bg-[#014751]/5 border-[#014751]/25 shadow-sm"
                                                : rank === 2 ? "bg-gray-50 border-gray-300/60"
                                                : rank === 3 ? "bg-amber-50/60 border-amber-200/60"
                                                : "bg-white border-gray-100 hover:border-gray-200";
                                            const diff = (student.previousRank || rank) - rank;

                                            return (
                                                <motion.div key={`s-${studentTab}-${student.id}`}
                                                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: Math.min(i * 0.015, 0.2) }}
                                                    className={`flex items-center gap-4 sm:gap-6 p-4 sm:p-5 rounded-2xl border transition-all hover:shadow-md ${rowStyle}`}>
                                                    <div className="w-10 text-center flex-shrink-0">
                                                        {RANK_MEDAL[rank] ? <span className="text-2xl leading-none">{RANK_MEDAL[rank]}</span> : <span className="text-sm font-black text-gray-400">#{rank}</span>}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center gap-2 flex-wrap mb-0.5">
                                                            <h3 className="font-black text-gray-900 text-sm sm:text-base truncate">{student.name}</h3>
                                                            <span className={`text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full ${student.category === "Tertiary" ? "bg-blue-100 text-blue-700" : "bg-green-100 text-green-700"}`}>
                                                                {student.category}
                                                            </span>
                                                        </div>
                                                        <p className="text-xs text-gray-500 font-bold truncate">🏫 {student.institution || "Unknown"}</p>
                                                        {(student.department || student.class) && (
                                                            <p className="text-[10px] text-gray-400 font-bold mt-0.5 uppercase tracking-wider">
                                                                {student.department || student.class}{student.level ? ` · Level ${student.level}` : ""}
                                                            </p>
                                                        )}
                                                    </div>
                                                    <div className="hidden sm:flex items-center gap-6 flex-shrink-0">
                                                        <div className="text-center min-w-[60px]">
                                                            <p className="text-lg font-black text-[#014751]">{student.points.toLocaleString()}</p>
                                                            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Points</p>
                                                        </div>
                                                        <div className="text-center min-w-[50px]">
                                                            <p className="text-lg font-black text-gray-800">{student.competitions}</p>
                                                            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Wins</p>
                                                        </div>
                                                        <div className="text-center min-w-[50px]">
                                                            {diff > 0 ? <p className="text-sm font-black text-green-500">▲ {diff}</p> : diff < 0 ? <p className="text-sm font-black text-red-400">▼ {Math.abs(diff)}</p> : <p className="text-sm font-black text-gray-400">–</p>}
                                                            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Trend</p>
                                                        </div>
                                                    </div>
                                                    <div className="sm:hidden flex-shrink-0 text-right">
                                                        <p className="text-lg font-black text-[#014751]">{student.points.toLocaleString()}</p>
                                                        {diff > 0 ? <p className="text-xs font-black text-green-500">▲ {diff}</p> : diff < 0 ? <p className="text-xs font-black text-red-400">▼ {Math.abs(diff)}</p> : <p className="text-xs font-black text-gray-400">–</p>}
                                                    </div>
                                                </motion.div>
                                            );
                                        })
                                    )}
                                </motion.div>
                            ) : (
                                <motion.div key="schools-list" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-3">
                                    <div className="mb-6">
                                        <h2 className="text-2xl font-black text-gray-900">Academic Institutions</h2>
                                        <p className="text-sm text-gray-500 font-medium">Schools ranked by their students&apos; combined quiz performance.</p>
                                    </div>

                                    {isLoading ? (
                                        <div className="py-20 text-center">
                                            <div className="w-8 h-8 rounded-full border-4 border-gray-200 border-t-[#014751] animate-spin mx-auto mb-4" />
                                            <p className="text-sm font-bold text-gray-500">Loading school rankings...</p>
                                        </div>
                                    ) : !hasAnySchool ? (
                                        <div className="py-20 text-center bg-white rounded-3xl border border-gray-100">
                                            <div className="text-4xl mb-4">🏛️</div>
                                            <p className="text-lg font-bold text-gray-900 mb-1">No school rankings yet</p>
                                            <p className="text-sm text-gray-500">Schools will appear here once their students start taking quizzes.</p>
                                        </div>
                                    ) : (
                                        activeSchoolData.map((school, i) => {
                                            const rank = school.rank;
                                            const rowStyle = rank === 1 ? "bg-[#014751]/5 border-[#014751]/25 shadow-sm"
                                                : rank === 2 ? "bg-gray-100 border-gray-300/60"
                                                : rank === 3 ? "bg-amber-50/60 border-amber-200/60"
                                                : "bg-white border-gray-100 hover:border-gray-200";

                                            return (
                                                <motion.div key={`sch-${schoolTab}-${school.id}`}
                                                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: Math.min(i * 0.015, 0.2) }}
                                                    className={`flex items-center gap-4 sm:gap-6 p-4 sm:p-5 rounded-2xl border transition-all hover:shadow-md ${rowStyle}`}>
                                                    <div className="w-10 text-center flex-shrink-0">
                                                        {RANK_MEDAL[rank] ? <span className="text-2xl leading-none">{RANK_MEDAL[rank]}</span> : <span className="text-sm font-black text-gray-400">#{rank}</span>}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center gap-2 flex-wrap mb-0.5">
                                                            <h3 className="font-black text-gray-900 text-sm sm:text-base truncate">{school.name}</h3>
                                                            {school.type && school.type !== 'Unknown' && (
                                                                <span className={`text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full ${school.type === "Federal" ? "bg-blue-100 text-blue-700" : school.type === "State" ? "bg-green-100 text-green-700" : "bg-purple-100 text-purple-700"}`}>
                                                                    {school.type}
                                                                </span>
                                                            )}
                                                        </div>
                                                        <p className="text-xs text-gray-400 font-bold">📍 {school.state} · {school.totalStudents.toLocaleString()} students</p>
                                                    </div>
                                                    <div className="hidden sm:flex items-center gap-8 flex-shrink-0">
                                                        <div className="text-center min-w-[70px]">
                                                            <p className="text-lg font-black text-[#014751]">{school.totalPoints.toLocaleString()}</p>
                                                            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Total Pts</p>
                                                        </div>
                                                        <div className="text-center min-w-[70px]">
                                                            <p className="text-lg font-black text-gray-800">{school.avgPoints.toLocaleString()}</p>
                                                            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Avg Pts</p>
                                                        </div>
                                                    </div>
                                                    <div className="sm:hidden flex-shrink-0 text-right">
                                                        <p className="text-lg font-black text-[#014751]">{school.totalPoints.toLocaleString()}</p>
                                                        <p className="text-[10px] font-bold text-gray-400 uppercase">Total Pts</p>
                                                    </div>
                                                </motion.div>
                                            );
                                        })
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </section>

                {/* ── CTA ── */}
                <section className="px-6 py-24 bg-white">
                    <div className="max-w-4xl mx-auto bg-[#014751] rounded-[48px] p-10 sm:p-16 text-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#FFEDB1]/10 rounded-full blur-[60px] pointer-events-none" />
                        <p className="text-[11px] font-extrabold uppercase tracking-[0.3em] text-white/40 mb-4">Climb The Ranks</p>
                        <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight mb-6">
                            Start Taking Quizzes &<br />
                            <span className="text-[#FFEDB1]">Join the Leaderboard</span>
                        </h2>
                        <p className="text-white/60 max-w-md mx-auto mb-10 font-medium">
                            Compete with students nationwide. Track your performance and put your school on the map!
                        </p>
                        <Link href="https://student.portal.sabidub.com"
                            className="inline-flex items-center gap-3 px-8 py-4 bg-[#FFEDB1] text-[#014751] rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-105 transition-all active:scale-95 shadow-xl">
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
