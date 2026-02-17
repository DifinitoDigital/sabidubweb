import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
};

export default function AmbassadorInfo() {
    const [isGuidelinesOpen, setIsGuidelinesOpen] = useState(false);
    return (
        <>
            <Head>
                <title>SabiDub Ambassador Program | Lead. Inspire. Impact.</title>
                <meta name="description" content="Join the SabiDub Ambassador Program and become a student leader driving educational change across campuses in Nigeria." />
            </Head>
            <main className="min-h-screen bg-white selection:bg-[#014751] selection:text-white">
                <Navbar />

                {/* Hero Section */}
                <section className="relative pt-32 pb-12 sm:pt-48 sm:pb-16 bg-white overflow-hidden">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {/* Split Header */}
                        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 lg:gap-12 mb-16 lg:mb-28">
                            <motion.div initial="initial" animate="animate" variants={fadeInUp} className="flex-1">
                                <span className="text-gray-400 font-bold text-xs sm:text-sm tracking-widest mb-4 sm:mb-6 block uppercase">/ Join the 1% of Student Leaders</span>
                                <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[90px] font-black text-gray-900 leading-[0.9] lg:leading-[0.85] tracking-tighter">
                                    Empowering <br className="hidden sm:block" />
                                    Future Leaders
                                </h1>
                            </motion.div>

                            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="lg:max-w-sm">
                                <p className="text-gray-500 text-sm sm:text-[15px] font-medium leading-relaxed mb-6 sm:mb-8">
                                    Become a SabiDub Ambassador and spearhead the educational revolution in Nigeria. Join our elite network and drive change across your campus.
                                </p>
                                <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                                    <Link href="https://portal.sabidub.com/ambassador/login" className="text-[#014751] font-black text-[10px] sm:text-[11px] uppercase tracking-widest flex items-center gap-1 group">
                                        Join THE Hub <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" /></svg>
                                    </Link>
                                    <button
                                        onClick={() => setIsGuidelinesOpen(true)}
                                        className="text-[#014751] font-black text-[10px] sm:text-[11px] uppercase tracking-widest flex items-center gap-1 group cursor-pointer"
                                    >
                                        View Guidelines <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" /></svg>
                                    </button>
                                </div>
                            </motion.div>
                        </div>

                        {/* Feature Cards Grid (5 Cards like the image) */}
                        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
                            {[
                                { title: "Campus Outreach", img: "/images/campus outreach.png", color: "bg-[#D7FF40]", iconColor: "text-black" },
                                { title: "Academic Support", img: "/images/academic support.png", color: "bg-[#014751]", iconColor: "text-white" },
                                { title: "Digital Evolution", img: "/images/digital evolution.png", color: "bg-[#014751]", iconColor: "text-white" },
                                { title: "Student Advocacy", img: "/images/student advocacy.png", color: "bg-[#014751]", iconColor: "text-white" },
                                { title: "Community Build", img: "/images/community build.png", color: "bg-[#014751]", iconColor: "text-white" },
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
                                        {/* Reference-style circular button */}
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

                {/* Testimonials Section */}
                <section className="py-16 sm:py-24 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
                            {[
                                {
                                    quote: "Being a SabiDub Ambassador has completely transformed my campus experience. I've built a network of brilliant students and learned leadership skills that aren't taught in class.",
                                    name: "Tunde A.",
                                    role: "Campus Ambassador",
                                    img: "/images/IMG_5713.JPG"
                                },
                                {
                                    quote: "The platform makes it so easy to organize workshops and track our community's progress. It's the most powerful tool for educational change in Nigeria today.",
                                    name: "Amina B.",
                                    role: "Student Leader",
                                    img: "/images/IMG_5609.JPG"
                                },
                                {
                                    quote: "I joined SabiDub to make an impact, and I stayed for the incredible community. The support from the hub is unmatched, and the growth opportunities are endless.",
                                    name: "Chidi O.",
                                    role: "Network Lead",
                                    img: "/images/IMG_5713.JPG"
                                }
                            ].map((testimonial, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="flex flex-col"
                                >
                                    {/* Star Rating */}
                                    <div className="flex gap-1 mb-6">
                                        {[1, 2, 3, 4, 5].map(star => (
                                            <svg key={star} className="w-4 h-4 text-orange-400 fill-current" viewBox="0 0 20 20">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        ))}
                                    </div>

                                    <p className="text-gray-600 text-[15px] font-medium leading-relaxed mb-10">
                                        &quot;{testimonial.quote}&quot;
                                    </p>

                                    <div className="flex items-center gap-4">
                                        <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0 grayscale">
                                            <Image src={testimonial.img} alt={testimonial.name} fill className="object-cover" />
                                        </div>
                                        <div>
                                            <div className="text-gray-900 font-black text-sm">{testimonial.name}</div>
                                            <div className="text-gray-400 text-xs font-bold uppercase tracking-wider">{testimonial.role}</div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Role Description - Bento Style */}
                <section className="py-20 sm:py-32 bg-white relative">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16 sm:mb-24">
                            <h2 className="text-3xl sm:text-6xl font-black text-gray-900 tracking-tighter leading-none">Your Role in the <br className="sm:hidden" /> <span className="text-[#014751]">Ecosystem.</span></h2>
                            <p className="mt-4 text-gray-500 font-medium text-base sm:text-lg">Lead with purpose. Grow with SabiDub.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto">
                            {/* Card 1: Advocacy (Large Tall) */}
                            <motion.div whileHover={{ y: -10 }} className="md:col-span-4 bg-[#F8F9FA] rounded-[32px] sm:rounded-[48px] p-8 sm:p-10 flex flex-col justify-between border border-gray-100 group overflow-hidden relative">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-[#D7FF40]/10 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
                                <div>
                                    <div className="w-16 h-16 bg-[#014751] text-white rounded-2xl flex items-center justify-center mb-8 shadow-lg">
                                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-3xl font-black text-gray-900 mb-6 tracking-tight">Advocacy</h3>
                                    <p className="text-gray-500 text-lg leading-relaxed font-medium">
                                        Champion educational technology and help peers navigate their path to tertiary success through our advanced tools.
                                    </p>
                                </div>
                                <div className="mt-8 flex items-center gap-3">
                                    <span className="w-12 h-1 bg-gray-200 rounded-full" />
                                    <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Brand Voice</span>
                                </div>
                            </motion.div>

                            {/* Card 2: Leadership (Wide) */}
                            <motion.div whileHover={{ y: -10 }} className="md:col-span-8 bg-[#014751] rounded-[32px] sm:rounded-[48px] p-8 sm:p-10 flex flex-col md:flex-row gap-8 sm:gap-10 items-center border border-gray-100 group relative overflow-hidden">
                                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#FFF 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
                                <div className="flex-1 relative z-10 text-white">
                                    <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-8 border border-white/20">
                                        <svg className="w-8 h-8 text-[#D7FF40]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-3xl sm:text-4xl font-black mb-4 sm:mb-6 tracking-tight">Leadership</h3>
                                    <p className="text-white/70 text-base sm:text-lg leading-relaxed font-medium">
                                        Organize campus workshops, coordinate outreach programs, and build a thriving community of excellence within your institution.
                                    </p>
                                </div>
                                <div className="flex-1 h-full relative min-h-[250px] w-full md:w-auto">
                                    <div className="absolute inset-0 bg-white/5 rounded-3xl border border-white/10 flex flex-col p-6">
                                        <div className="flex justify-between items-center mb-8">
                                            <span className="text-[10px] font-black uppercase text-white tracking-widest">Network Impact</span>
                                            <div className="flex -space-x-2">
                                                {[1, 2, 3].map(i => <div key={i} className="w-8 h-8 rounded-full border-2 border-[#014751] bg-gray-600" />)}
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                                                <motion.div initial={{ width: 0 }} whileInView={{ width: '85%' }} viewport={{ once: true }} className="h-full bg-[#D7FF40]" />
                                            </div>
                                            <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                                                <motion.div initial={{ width: 0 }} whileInView={{ width: '60%' }} viewport={{ once: true }} className="h-full bg-[#D7FF40]/60" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Card 3: Impact (Wide Half) */}
                            <motion.div whileHover={{ y: -10 }} className="md:col-span-6 bg-[#AFF8C8]/20 rounded-[32px] sm:rounded-[48px] p-8 sm:p-10 flex flex-col justify-between border border-[#AFF8C8]/30 group overflow-hidden">
                                <div className="flex items-center gap-6">
                                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-[#014751] shadow-md border border-gray-100">
                                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-3xl font-black text-gray-900 tracking-tight">High Impact</h3>
                                </div>
                                <p className="mt-8 text-gray-600 text-lg leading-relaxed font-medium">
                                    Directly influence the evolution of Nigerian education through firsthand feedback and strategic campus initiatives.
                                </p>
                            </motion.div>

                            {/* Card 4: Community (Small Half) */}
                            <motion.div whileHover={{ y: -10 }} className="md:col-span-6 bg-[#D7FF40] rounded-[32px] sm:rounded-[48px] p-8 sm:p-10 flex items-center justify-between group overflow-hidden relative min-h-[160px]">
                                <div className="relative z-10">
                                    <h3 className="text-4xl font-black text-gray-900 tracking-tighter leading-none mb-2">Network.</h3>
                                    <p className="text-gray-900/60 font-bold uppercase text-[10px] tracking-widest">Connect with 500+ Ambassadors</p>
                                </div>
                                <div className="relative z-10 w-20 h-20 bg-black rounded-full flex items-center justify-center text-white scale-100 group-hover:scale-110 transition-transform">
                                    <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
                                    </svg>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Call to Action */}
                <section className="py-20 sm:py-24 bg-white relative">
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 bg-gray-900 rounded-[32px] sm:rounded-[48px] p-10 sm:p-20 relative overflow-hidden text-center">
                        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#FFF 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
                        <h2 className="text-4xl sm:text-5xl font-black text-white mb-8 relative z-10">Ready to lead the future of education?</h2>
                        <p className="text-white/60 text-lg mb-12 max-w-2xl mx-auto relative z-10 font-medium">
                            Join thousands of students across Nigeria who are already making a difference in their academic communities.
                        </p>
                        <Link href="https://portal.sabidub.com/ambassador/join" className="inline-block px-12 py-5 bg-[#D7FF40] text-black rounded-2xl font-black text-lg transition-transform hover:scale-105 active:scale-95 relative z-10">
                            Apply Now
                        </Link>
                    </div>
                </section>

                <Footer />

                {/* Guidelines Modal */}
                <AnimatePresence>
                    {isGuidelinesOpen && (
                        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setIsGuidelinesOpen(false)}
                                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                            />
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                className="relative w-full max-w-4xl bg-white rounded-t-[32px] sm:rounded-[40px] shadow-2xl overflow-hidden mt-auto sm:mt-0"
                            >
                                <div className="p-6 sm:p-14 overflow-y-auto max-h-[85vh] custom-scrollbar">
                                    <div className="flex justify-between items-center mb-10">
                                        <div className="max-w-[calc(100%-48px)]">
                                            <span className="text-[#014751] font-black text-[10px] uppercase tracking-widest mb-2 block">/ SabiDub Ambassador Program</span>
                                            <h2 className="text-2xl sm:text-4xl font-black text-gray-900 tracking-tight leading-tight">Our Guidelines.</h2>
                                        </div>
                                        <button
                                            onClick={() => setIsGuidelinesOpen(false)}
                                            className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center hover:bg-gray-100 transition-colors"
                                        >
                                            <svg className="w-6 h-6 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>

                                    <div className="space-y-12">
                                        {[
                                            {
                                                step: "01",
                                                title: "Application & Review",
                                                desc: "Submit your basic profile and institution details. Our team reviews applications to ensure the 1% standard of student leadership."
                                            },
                                            {
                                                step: "02",
                                                title: "Acount Activation",
                                                desc: "Upon approval, your SabiDub account is automatically upgraded or created. You'll receive a unique Ambassador ID and dashboard access via email."
                                            },
                                            {
                                                step: "03",
                                                title: "Roles & Hub Management",
                                                desc: "Focus on specific faculties and departments. Organize workshops, coordinate campus outreach, and champion SabiDub's advanced educational tools."
                                            },
                                            {
                                                step: "04",
                                                title: "Impact & Rewards",
                                                desc: "Track your network growth in real-time. Secure monthly base compensation and performance scaling as you drive educational change."
                                            }
                                        ].map((item, idx) => (
                                            <div key={idx} className="flex flex-col sm:flex-row gap-4 sm:gap-8 group">
                                                <div className="text-3xl sm:text-4xl font-black text-[#014751]/10 group-hover:text-[#014751]/20 transition-colors shrink-0 leading-none">{item.step}</div>
                                                <div>
                                                    <h3 className="font-black text-gray-900 mb-1 sm:mb-2 text-lg sm:text-xl">{item.title}</h3>
                                                    <p className="text-gray-500 text-sm leading-relaxed font-medium">{item.desc}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-12 pt-8 border-t border-gray-100">
                                        <button
                                            onClick={() => setIsGuidelinesOpen(false)}
                                            className="w-full py-5 bg-[#014751] text-white rounded-[24px] font-black hover:scale-[1.02] transition-transform active:scale-[0.98]"
                                        >
                                            I&apos;ve Read the Guidelines
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </main>
        </>
    );
}
