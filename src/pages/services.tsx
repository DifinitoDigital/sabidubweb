import Head from "next/head";
import Link from "next/link";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import { useState } from "react";

const services = [
    {
        id: "admission",
        tag: "01 — Admissions",
        title: "Admission Checker",
        headline: "Know Your Chances Before You Apply",
        description:
            "Our real-time admission checker analyses your JAMB score, O'Level results, and chosen course against thousands of Nigerian universities — giving you a precise picture of where you stand.",
        color: "#014751",
        light: "#E8F5F0",
        link: "/admission-checker",
        cta: "Check Now",
        stats: [
            { value: "200+", label: "Universities covered" },
            { value: "95%", label: "Accuracy rate" },
            { value: "30s", label: "Average check time" },
        ],
        features: [
            "Instant JAMB score analysis",
            "O'Level subject verification",
            "Department cut-off comparison",
            "Personalised institution recommendations",
        ],
    },
    {
        id: "elearning",
        tag: "02 — Learning",
        title: "E-Learning Platform",
        headline: "World-Class Lessons, Nigerian Curriculum",
        description:
            "Access thousands of video lessons, interactive quizzes, past questions, and AI-powered study plans crafted specifically for WAEC, NECO, JAMB, and Post-UTME — anytime, anywhere.",
        color: "#F59E0B",
        light: "#FFFBEB",
        link: "https://student.portal.sabidub.com",
        cta: "Start Learning",
        stats: [
            { value: "5,000+", label: "Admission Checker" },
            { value: "100k+", label: "Past questions" },
            { value: "24/7", label: "Always available" },
        ],
        features: [
            "Adaptive practice tests & quizzes",
            "Past question bank (2000–2024)",
            "Offline access via mobile app",
        ],
    },
    {
        id: "school",
        tag: "03 — Schools",
        title: "School Management",
        headline: "Run Your School, Digitally",
        description:
            "A full-suite digital platform for secondary and tertiary institutions — handling everything from student records and result processing to parent communication and fee management.",
        color: "#10B981",
        light: "#ECFDF5",
        link: "https://portal.sabidub.com/auth/school/signin",
        cta: "Register School",
        stats: [
            { value: "500+", label: "Schools onboard" },
            { value: "1M+", label: "Results processed" },
            { value: "99.9%", label: "Uptime" },
        ],
        features: [
            "Instant result computation & publishing",
            "Comprehensive student database",
            "Automated parent notifications",
            "Fee collection & financial reports",
        ],
    },
    {
        id: "ambassador",
        tag: "04 — Community",
        title: "Ambassador Program",
        headline: "Lead. Represent. Earn.",
        description:
            "Become a SabiDub Campus Ambassador and be part of the movement transforming Nigerian education. Gain exclusive leadership training, grow your network, and earn rewards for your impact.",
        color: "#3B82F6",
        light: "#EFF6FF",
        link: "/ambassador",
        cta: "Join the Movement",
        stats: [
            { value: "300+", label: "Active ambassadors" },
            { value: "50+", label: "Campuses represented" },
            { value: "₦M+", label: "Earned by members" },
        ],
        features: [
            "Exclusive leadership & skill workshops",
            "Performance-based financial rewards",
            "National networking events",
            "Career acceleration opportunities",
        ],
    },
    {
        id: "ecosystem",
        tag: "05 — Network",
        title: "Community & Network",
        headline: "Connect. Compete. Commemorate.",
        description:
            "Experience a unified network connecting students across departments, institutions, and countries. From real-time world challenges to digital yearbooks, SabiDub is your gateway to a global academic community.",
        color: "#6366F1",
        light: "#EEF2FF",
        link: "https://student.portal.sabidub.com",
        cta: "Explore Ecosystem",
        stats: [
            { value: "Global", label: "1vs1 Challenges" },
            { value: "24/7", label: "Community access" },
            { value: "Forever", label: "Memory storage" },
        ],
        features: [
            "1vs1 World Competitions (Cross-country)",
            "Digital Yearbooks & Publication Storage",
            "Inter-departmental & Inter-school Hubs",
            "Student-led Academic Societies",
        ],
    },
    {
        id: "academic",
        tag: "06 — Academic Admin",
        title: "Academic Services",
        headline: "Stay Informed. Stay Engaged.",
        description:
            "From secure digital elections and voting to real-time academic calendar notifications and collaborative study circles, SabiDub provides the infrastructure for a modern student experience.",
        color: "#F97316",
        light: "#FFF7ED",
        link: "https://student.portal.sabidub.com/dashboard",
        cta: "Access Hub",
        stats: [
            { value: "Secure", label: "Election Voting" },
            { value: "Live", label: "Calendar Sync" },
            { value: "Active", label: "Study Circles" },
        ],
        features: [
            "Secure Digital Voting & Election Systems",
            "Real-time Academic Calendar Push Notifications",
            "Collaborative Study Circles & Group Hubs",
            "Exam & Academic Event Reminders",
        ],
    },
];

export default function Services() {
    const [activeService, setActiveService] = useState(0);
    const active = services[activeService];

    return (
        <>
            <Head>
                <title>Services | SabiDub — Tools Built for Nigerian Students</title>
                <meta
                    name="description"
                    content="Explore SabiDub's suite of educational services — from admission checking and e-learning to school management and the ambassador program."
                />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>

            <motion.main
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="min-h-screen bg-white"
            >
                <Navbar />

                {/* ─── HERO ─── */}
                <section className="relative pt-36 sm:pt-48 pb-20 px-6 overflow-hidden bg-white">
                    {/* Background radial glow */}
                    <div
                        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full blur-[140px] opacity-20 pointer-events-none"
                        style={{ background: "radial-gradient(circle, #FFEDB1 0%, #014751 60%, transparent 100%)" }}
                    />
                    <div className="max-w-6xl mx-auto relative z-10 text-center">
                        <motion.span
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="inline-block px-4 py-1.5 rounded-full border border-[#014751]/15 bg-[#014751]/8 text-[#014751] text-xs font-extrabold uppercase tracking-[0.25em] mb-8"
                        >
                            What We Build
                        </motion.span>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-4xl sm:text-6xl lg:text-8xl font-black text-gray-900 leading-[1.0] tracking-tight mb-8"
                        >
                            Every Tool a<br />
                            <span className="text-[#014751]">Student Needs.</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.35 }}
                            className="text-gray-500 text-lg sm:text-xl max-w-2xl mx-auto font-medium"
                        >
                            From checking your admission chances to managing an entire school — SabiDub has you covered.
                        </motion.p>
                    </div>
                </section>

                {/* ─── INTERACTIVE SERVICE TABS ─── */}
                <section className="px-6 pb-8 pt-16 bg-white">
                    <div className="max-w-6xl mx-auto">
                        {/* Tab Switcher */}
                        <div className="flex flex-wrap gap-3 mb-20 justify-center">
                            {services.map((s, i) => (
                                <button
                                    key={s.id}
                                    onClick={() => setActiveService(i)}
                                    className={`px-6 py-3 rounded-2xl text-sm font-extrabold transition-all duration-300 border ${activeService === i
                                        ? "text-white border-transparent shadow-lg scale-105"
                                        : "text-gray-500 border-gray-100 bg-gray-50 hover:border-gray-200"
                                        }`}
                                    style={
                                        activeService === i
                                            ? { backgroundColor: s.color }
                                            : {}
                                    }
                                >
                                    {s.title}
                                </button>
                            ))}
                        </div>

                        {/* Active Service Panel */}
                        <motion.div
                            key={active.id}
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.45 }}
                            className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center"
                        >
                            {/* Left: Text */}
                            <div>
                                <span
                                    className="text-xs font-extrabold uppercase tracking-[0.25em] mb-4 block"
                                    style={{ color: active.color }}
                                >
                                    {active.tag}
                                </span>
                                <h2 className="text-3xl sm:text-5xl font-black text-gray-900 leading-tight tracking-tight mb-6">
                                    {active.headline}
                                </h2>
                                <p className="text-gray-500 text-lg leading-relaxed mb-10 font-medium">
                                    {active.description}
                                </p>

                                <ul className="space-y-4 mb-12">
                                    {active.features.map((f) => (
                                        <li key={f} className="flex items-start gap-3">
                                            <span
                                                className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                                                style={{ backgroundColor: active.light }}
                                            >
                                                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                                                    <path
                                                        d="M1.5 5.5L3.5 7.5L8.5 2.5"
                                                        stroke={active.color}
                                                        strokeWidth="1.5"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </svg>
                                            </span>
                                            <span className="text-sm font-bold text-gray-600">{f}</span>
                                        </li>
                                    ))}
                                </ul>

                                <Link
                                    href={active.link}
                                    className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl text-white font-black text-sm uppercase tracking-widest hover:scale-105 transition-all active:scale-95 shadow-xl"
                                    style={{ backgroundColor: active.color }}
                                >
                                    {active.cta}
                                    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4-4 4M21 12H3" />
                                    </svg>
                                </Link>
                            </div>

                            {/* Right: Stats card */}
                            <div className="relative">
                                <div
                                    className="absolute -inset-4 rounded-[48px] opacity-10 blur-2xl"
                                    style={{ backgroundColor: active.color }}
                                />
                                <div
                                    className="relative rounded-[40px] p-10 sm:p-14 overflow-hidden"
                                    style={{ backgroundColor: active.light }}
                                >
                                    <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10 -translate-y-1/3 translate-x-1/3"
                                        style={{ backgroundColor: active.color }} />
                                    <div className="relative z-10">
                                        <p
                                            className="text-[10px] font-extrabold uppercase tracking-[0.25em] mb-10"
                                            style={{ color: active.color }}
                                        >
                                            By the Numbers
                                        </p>
                                        <div className="grid grid-cols-3 divide-x"
                                            style={{ borderColor: `${active.color}20` }}
                                        >
                                            {active.stats.map((s) => (
                                                <div key={s.label} className="px-6 first:pl-0 last:pr-0 text-center">
                                                    <div
                                                        className="text-3xl sm:text-4xl font-black mb-1"
                                                        style={{ color: active.color }}
                                                    >
                                                        {s.value}
                                                    </div>
                                                    <div className="text-[11px] font-bold text-gray-500 uppercase tracking-widest leading-tight">
                                                        {s.label}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        <div
                                            className="mt-12 h-px w-full"
                                            style={{ backgroundColor: `${active.color}20` }}
                                        />

                                        <div className="mt-10 space-y-3">
                                            {active.features.slice(0, 2).map((f) => (
                                                <div
                                                    key={f}
                                                    className="flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-white/60 backdrop-blur-sm"
                                                >
                                                    <div
                                                        className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                                                        style={{ backgroundColor: `${active.color}18` }}
                                                    >
                                                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                                            <path
                                                                d="M2 7.5L5 10.5L12 3.5"
                                                                stroke={active.color}
                                                                strokeWidth="2"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                            />
                                                        </svg>
                                                    </div>
                                                    <span className="text-sm font-bold text-gray-700">{f}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* ─── ALL SERVICES OVERVIEW STRIP ─── */}
                <section className="px-6 py-32 bg-gray-50/60">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-20">
                            <p className="text-[11px] font-extrabold uppercase tracking-[0.3em] text-gray-400 mb-4">
                                The Full Picture
                            </p>
                            <h2 className="text-3xl sm:text-5xl font-black text-gray-900 tracking-tight">
                                One Platform. Infinite Possibilities.
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                            {services.map((s, i) => (
                                <Link
                                    key={s.id}
                                    href={s.link}
                                    className="text-left p-8 rounded-[28px] bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group cursor-pointer block"
                                >
                                    <div
                                        className="w-12 h-12 rounded-2xl mb-6 flex items-center justify-center transition-transform group-hover:scale-110"
                                        style={{ backgroundColor: s.light }}
                                    >
                                        <span className="text-lg font-black" style={{ color: s.color }}>
                                            {String(i + 1).padStart(2, "0")}
                                        </span>
                                    </div>
                                    <h3 className="text-base font-black text-gray-900 mb-2">{s.title}</h3>
                                    <p className="text-sm text-gray-500 font-medium leading-relaxed line-clamp-3">
                                        {s.description}
                                    </p>
                                    <div
                                        className="mt-6 text-xs font-extrabold uppercase tracking-widest flex items-center gap-2 group-hover:gap-3 transition-all"
                                        style={{ color: s.color }}
                                    >
                                        Explore
                                        <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4-4 4M21 12H3" />
                                        </svg>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ─── CTA ─── */}
                <section className="px-6 py-28 bg-white">
                    <div className="max-w-5xl mx-auto">
                        <div className="relative overflow-hidden bg-[#011F24] rounded-[48px] p-10 sm:p-20 text-center">
                            {/* Decorative glow spots */}
                            <div className="absolute top-0 left-1/4 w-64 h-64 bg-[#FFEDB1]/20 rounded-full blur-[80px] pointer-events-none" />
                            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-[#014751]/80 rounded-full blur-[80px] pointer-events-none" />

                            <div className="relative z-10">
                                <p className="text-[11px] font-extrabold uppercase tracking-[0.3em] text-[#FFEDB1]/70 mb-6">
                                    Ready to Start?
                                </p>
                                <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white mb-8 leading-tight tracking-tight">
                                    Your Education,<br />
                                    <span className="text-[#FFEDB1]">Upgraded.</span>
                                </h2>
                                <p className="text-white/50 text-lg mb-14 max-w-xl mx-auto font-medium">
                                    A unified gateway for <span className="text-white">Schools, Ambassadors, and Students</span>. Join the ecosystem building the future of Nigerian education.
                                </p>
                                <div className="flex flex-col lg:flex-row gap-4 justify-center items-center">
                                    <Link
                                        href="https://portal.sabidub.com/auth/school/signin"
                                        className="w-full lg:w-auto px-8 py-5 bg-[#FFEDB1] text-[#011F24] rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-all active:scale-95 shadow-xl text-center"
                                    >
                                        Register School
                                    </Link>
                                    <Link
                                        href="https://portal.sabidub.com/ambassador/login"
                                        className="w-full lg:w-auto px-8 py-5 bg-white text-[#011F24] rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-all active:scale-95 shadow-xl text-center"
                                    >
                                        Join as Ambassador
                                    </Link>
                                    <Link
                                        href="#download-app"
                                        className="w-full lg:w-auto px-8 py-5 bg-teal-500 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-all active:scale-95 shadow-xl text-center flex items-center justify-center gap-2"
                                    >
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.5 2H6.5C5.12 2 4 3.12 4 4.5v15C4 20.88 5.12 22 6.5 22h11c1.38 0 2.5-1.12 2.5-2.5v-15C20 3.12 18.88 2 17.5 2zM12 20c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm5-4H7V5h10v11z" /></svg>
                                        Download / Login
                                    </Link>
                                    <Link
                                        href="/contact"
                                        className="w-full lg:w-auto px-8 py-5 border border-white/10 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white/5 transition-all text-center"
                                    >
                                        Contact Us
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <Footer />
            </motion.main>
        </>
    );
}
