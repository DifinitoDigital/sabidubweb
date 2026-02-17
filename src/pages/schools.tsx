import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
};

export default function SchoolsInfo() {
    return (
        <>
            <Head>
                <title>SabiDub for Schools | Modern Institutional Management</title>
                <meta name="description" content="Empower your school with SabiDub's advanced management tools, student tracking, and institutional analytics for educational excellence." />
            </Head>
            <main className="min-h-screen bg-white selection:bg-[#014751] selection:text-white">
                <Navbar />

                {/* Hero Section */}
                <section className="relative pt-32 pb-16 sm:pt-48 sm:pb-20 bg-white overflow-hidden">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {/* Split Header */}
                        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 lg:gap-12 mb-16 lg:mb-28">
                            <motion.div initial="initial" animate="animate" variants={fadeInUp} className="flex-1">
                                <span className="text-gray-400 font-bold text-xs sm:text-sm tracking-widest mb-4 sm:mb-6 block uppercase">/ The Gold Standard in Management</span>
                                <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[90px] font-black text-gray-900 leading-[0.9] lg:leading-[0.85] tracking-tighter">
                                    Management. <br className="hidden sm:block" />
                                    Redefined.
                                </h1>
                            </motion.div>

                            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="lg:max-w-sm">
                                <p className="text-gray-500 text-sm sm:text-[15px] font-medium leading-relaxed mb-6 sm:mb-8">
                                    SabiDub provides high-performance administration tools designed specifically for the rigorous demands of Nigerian secondary and tertiary institutions.
                                </p>
                                <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                                    <Link href="https://portal.sabidub.com/auth/school/signin" className="text-orange-600 font-black text-[10px] sm:text-[11px] uppercase tracking-widest flex items-center gap-1 group">
                                        Access Portal <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" /></svg>
                                    </Link>
                                    <Link href="#" className="text-orange-600 font-black text-[10px] sm:text-[11px] uppercase tracking-widest flex items-center gap-1 group">
                                        View Demo <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" /></svg>
                                    </Link>
                                </div>
                            </motion.div>
                        </div>

                        {/* Feature Cards Grid (5 Cards) */}
                        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
                            {[
                                { title: "Student Tracking", img: "/images/student tracking.png", color: "bg-orange-500", iconColor: "text-white" },
                                { title: "Secure Records", img: "/images/secure record.png", color: "bg-[#014751]", iconColor: "text-white" },
                                { title: "Institutional Sync", img: "/images/institutional sync.png", color: "bg-[#014751]", iconColor: "text-white" },
                                { title: "Admin Portal", img: "/images/admin portal.png", color: "bg-[#014751]", iconColor: "text-white" },
                                { title: "Admission Hub", img: "/images/adminssion hub.png", color: "bg-[#014751]", iconColor: "text-white" },
                            ].map((card, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 * i + 0.3 }}
                                    className="relative aspect-[3/3.8] rounded-[32px] overflow-hidden group cursor-pointer"
                                >
                                    <Image src={card.img} alt={card.title} fill className="object-cover transition-transform duration-1000 group-hover:scale-110" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                                    <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                                        <span className="text-white font-black text-[11px] uppercase tracking-wider leading-tight max-w-[80px]">{card.title}</span>
                                        <div className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-lg ${card.color}`}>
                                            <svg className={`w-4 h-4 ${card.iconColor}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M7 17L17 7M17 7H7M17 7V17" />
                                            </svg>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Features Bento Grid */}
                <section className="py-20 sm:py-32 bg-[#FAF9F6] relative overflow-hidden">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16 sm:mb-24 max-w-3xl mx-auto">
                            <h2 className="text-3xl sm:text-6xl font-black text-gray-900 tracking-tighter mb-6 sm:mb-8 leading-none">Built for Precision, Scaling with <br className="sm:hidden" /> <span className="text-orange-600">Ease.</span></h2>
                            <p className="text-gray-500 font-medium text-base sm:text-lg leading-relaxed">Advanced institutional infrastructure designed to bridge the educational gap in Nigeria.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 auto-rows-auto md:auto-rows-[300px]">
                            {/* Card 1: Student Tracking (Large) */}
                            <motion.div whileHover={{ y: -10 }} className="md:col-span-8 md:row-span-2 bg-white rounded-[32px] sm:rounded-[48px] p-8 sm:p-12 flex flex-col justify-between border border-gray-100 group shadow-sm hover:shadow-xl transition-all relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                                <div className="relative z-10">
                                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-orange-500 text-white rounded-2xl flex items-center justify-center mb-8 sm:mb-10 shadow-lg shadow-orange-500/20">
                                        <svg className="w-7 h-7 sm:w-8 sm:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M21 20c0-2.21-4.03-4-9-4s-9 1.79-9 4" />
                                        </svg>
                                    </div>
                                    <h3 className="text-2xl sm:text-4xl font-black text-gray-900 mb-4 sm:mb-6 tracking-tight">Intelligent Student Tracking</h3>
                                    <p className="text-gray-500 text-base sm:text-lg leading-relaxed font-medium max-w-md">
                                        Visualize student progress from enrollment through academic milestones with precision-targeted analytics and performance prediction.
                                    </p>
                                </div>
                                <div className="flex gap-4 sm:gap-6 relative z-10 mt-8">
                                    <div className="flex-1 h-3 bg-gray-50 rounded-full overflow-hidden">
                                        <motion.div initial={{ width: 0 }} whileInView={{ width: '90%' }} className="h-full bg-orange-500" />
                                    </div>
                                    <div className="flex-1 h-3 bg-gray-50 rounded-full overflow-hidden">
                                        <motion.div initial={{ width: 0 }} whileInView={{ width: '70%' }} className="h-full bg-orange-500/40" />
                                    </div>
                                </div>
                            </motion.div>

                            {/* Card 2: Records (Tall) */}
                            <motion.div whileHover={{ y: -10 }} className="md:col-span-4 md:row-span-2 bg-[#014751] rounded-[32px] sm:rounded-[48px] p-8 sm:p-12 flex flex-col justify-between group overflow-hidden relative border border-gray-800 lg:min-h-0 min-h-[400px]">
                                <div className="absolute top-0 left-0 w-full h-full opacity-10" style={{ backgroundImage: 'radial-gradient(#FFF 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                                <div className="relative z-10">
                                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl flex items-center justify-center mb-8 sm:mb-10">
                                        <svg className="w-7 h-7 sm:w-8 sm:h-8 text-[#AFF8C8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                        </svg>
                                    </div>
                                    <h3 className="text-2xl sm:text-3xl font-black text-white mb-4 sm:mb-6 tracking-tight">Secure Infrastructure</h3>
                                    <p className="text-white/60 text-base sm:text-lg leading-relaxed font-medium">
                                        A high-security repository for academic calendars and verified student records.
                                    </p>
                                </div>
                                <div className="w-full aspect-square bg-white/5 rounded-[32px] border border-white/10 flex items-center justify-center mt-8">
                                    <div className="w-16 h-16 sm:w-20 sm:h-20 border-4 border-[#AFF8C8]/20 rounded-full flex items-center justify-center">
                                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#AFF8C8] rounded-full scale-100 group-hover:scale-125 transition-transform" />
                                    </div>
                                </div>
                            </motion.div>

                            {/* Card 3: Admission (Wide) */}
                            <motion.div whileHover={{ y: -10 }} className="md:col-span-12 bg-orange-500 rounded-[32px] sm:rounded-[48px] p-8 sm:p-12 flex flex-col md:flex-row items-center gap-8 sm:gap-12 group overflow-hidden relative border border-orange-400">
                                <div className="flex-1 relative z-10 text-white">
                                    <h3 className="text-3xl sm:text-4xl font-black mb-4 sm:mb-6 tracking-tight leading-none">Admission Analysis Hub</h3>
                                    <p className="text-white/80 text-lg sm:text-xl leading-relaxed font-medium">
                                        Bridge the gap tools helping secondary students navigate complex tertiary requirements specific to your institution.
                                    </p>
                                </div>
                                <div className="flex-1 flex gap-4 relative z-10 w-full md:w-auto h-auto md:h-full">
                                    <div className="flex-1 bg-white/20 backdrop-blur-md rounded-2xl sm:rounded-3xl border border-white/30 flex flex-col p-6 items-center justify-center">
                                        <div className="text-3xl sm:text-4xl font-black text-white mb-2">98%</div>
                                        <div className="text-[10px] uppercase font-bold tracking-widest text-white/60">Efficiency</div>
                                    </div>
                                    <div className="flex-1 bg-white/90 rounded-2xl sm:rounded-3xl border border-white shadow-xl flex flex-col p-6 items-center justify-center">
                                        <div className="text-3xl sm:text-4xl font-black text-orange-600 mb-2">10k+</div>
                                        <div className="text-[10px] uppercase font-bold tracking-widest text-gray-400">Processed</div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-20 sm:py-24 bg-white">
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 bg-[#014751] rounded-[32px] sm:rounded-[48px] p-10 sm:p-20 relative overflow-hidden text-center">
                        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#FFF 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
                        <h2 className="text-3xl sm:text-5xl font-black text-white mb-6 sm:mb-8 relative z-10">Empower your institution today.</h2>
                        <p className="text-white/60 text-base sm:text-lg mb-10 sm:mb-12 max-w-2xl mx-auto relative z-10 font-medium">
                            Join the growing network of Nigerian schools leveraging SabiDub to enhance educational outcomes and administrative efficiency.
                        </p>
                        <Link href="https://portal.sabidub.com/auth/school/signin" className="inline-block px-10 py-4 sm:px-12 sm:py-5 bg-[#D7FF40] text-black rounded-2xl font-black text-base sm:text-lg transition-transform hover:scale-105 active:scale-95 relative z-10">
                            Get Started for Free
                        </Link>
                    </div>
                </section>

                <Footer />
            </main>
        </>
    );
}
