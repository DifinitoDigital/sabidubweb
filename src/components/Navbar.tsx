import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronRight } from "react-icons/fa";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isStudentDropdownOpen, setIsStudentDropdownOpen] = useState(false);
    const [isMobileStudentOpen, setIsMobileStudentOpen] = useState(false);
    const router = useRouter();
    const isHome = router.pathname === "/";

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    // Navbar stays transparent on home until scroll. On other pages, it's always white.
    const isTransparent = isHome && !isScrolled;
    const textColor = isTransparent ? "text-white" : "text-gray-900";
    const subTextColor = isTransparent ? "text-white/70" : "text-gray-600";
    const logoSrc = isTransparent ? "/images/white.png" : "/images/black.png";
    const bgColor = isTransparent ? "bg-transparent" : "bg-white border-b border-gray-100";

    return (
        <>
            <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${bgColor}`}>
                <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 flex items-center justify-between max-w-7xl mx-auto">
                    <Link href="/" className="flex items-center">
                        <div className="relative w-40 h-10">
                            <Image
                                src={logoSrc}
                                alt="SabiDub Logo"
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
                        <Link
                            href="/"
                            className={`${textColor} hover:text-[#AFF8C8] transition-colors font-medium`}
                        >
                            Home
                        </Link>
                        <Link
                            href="/about"
                            className={`${subTextColor} hover:text-[#AFF8C8] transition-colors font-medium`}
                        >
                            About
                        </Link>
                        <Link
                            href="/pricing"
                            className={`${subTextColor} hover:text-[#AFF8C8] transition-colors font-medium`}
                        >
                            Pricing
                        </Link>
                        <Link
                            href="/admission-checker"
                            className={`${subTextColor} hover:text-[#AFF8C8] transition-colors font-medium`}
                        >
                            Admission Check
                        </Link>
                        <Link
                            href="/nysc"
                            className={`${subTextColor} hover:text-[#AFF8C8] transition-colors font-medium`}
                        >
                            NYSC Yearbook
                        </Link>

                        <div className="flex items-center space-x-4 ml-4">
                            <Link
                                href="/schools"
                                className={`text-sm ${subTextColor} hover:text-[#AFF8C8] transition-colors font-bold border-l border-gray-200 pl-4`}
                            >
                                Schools
                            </Link>

                            {/* Student Dropdown */}
                            <div
                                className="relative group"
                                onMouseEnter={() => setIsStudentDropdownOpen(true)}
                                onMouseLeave={() => setIsStudentDropdownOpen(false)}
                            >
                                <button
                                    className={`text-sm ${subTextColor} hover:text-[#AFF8C8] transition-colors font-bold flex items-center gap-1`}
                                >
                                    Student
                                    <svg className={`w-3.5 h-3.5 transition-transform duration-200 ${isStudentDropdownOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>

                                <AnimatePresence>
                                    {isStudentDropdownOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 10 }}
                                            className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden py-2 z-[60]"
                                        >
                                            <Link
                                                href="/ambassador"
                                                className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#014751] font-bold transition-colors"
                                                onClick={() => setIsStudentDropdownOpen(false)}
                                            >
                                                Ambassador Hub
                                            </Link>
                                            <Link
                                                href="https://student.portal.sabidub.com/signin"
                                                className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#014751] font-bold transition-colors border-t border-gray-50"
                                                onClick={() => setIsStudentDropdownOpen(false)}
                                            >
                                                Student Portal
                                            </Link>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>


                        <Link
                            href="#download-app"
                            onClick={(e) => {
                                e.preventDefault();
                                document.getElementById('download-app')?.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className="bg-[#014751] text-white px-4 py-2 rounded-lg text-xs font-black uppercase tracking-widest hover:bg-[#026372] transition-all hover:scale-105 active:scale-95 shadow-md flex items-center gap-2 group"
                        >
                            <span>Download</span>
                            <svg className="w-3 h-3 group-hover:translate-y-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                            </svg>
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={toggleMenu}
                        className={`lg:hidden flex flex-col items-center justify-center w-10 h-10 ${isTransparent ? 'bg-white/10' : 'bg-white border border-gray-100 shadow-sm'} rounded-lg transition-colors relative z-50`}
                    >
                        <span
                            className={`w-5 h-0.5 ${isTransparent ? 'bg-white' : 'bg-black'} mb-1 transition-transform ${isMenuOpen ? "rotate-45 translate-y-1.5" : ""
                                }`}
                        ></span>
                        <span
                            className={`w-5 h-0.5 ${isTransparent ? 'bg-white' : 'bg-black'} transition-opacity ${isMenuOpen ? "opacity-0" : ""
                                }`}
                        ></span>
                        <span
                            className={`w-5 h-0.5 ${isTransparent ? 'bg-white' : 'bg-black'} mt-1 transition-transform ${isMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
                                }`}
                        ></span>
                    </button>
                </div>
            </nav>

            {/* Mobile/Tablet Menu */}
            <div
                className={`lg:hidden fixed top-0 right-0 w-full sm:w-80 md:w-96 h-full bg-white border border-gray-100 shadow-sm z-[60] transform transition-transform duration-300 ease-in-out ${isMenuOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                <div className="p-6 h-full overflow-y-auto">
                    <div className="flex flex-col space-y-6">
                        <div className="flex items-center justify-between mb-8">
                            <div className="relative w-32 h-8">
                                <Image src="/images/black.png" alt="Logo" fill className="object-contain" />
                            </div>
                            <button
                                onClick={toggleMenu}
                                className="text-gray-600 hover:text-gray-900"
                            >
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>

                        <div className="flex flex-col space-y-4">
                            <Link
                                href="/"
                                className="text-gray-600 hover:text-[#014751] transition-colors py-2 border-b border-gray-200"
                                onClick={toggleMenu}
                            >
                                Home
                            </Link>
                            <Link
                                href="/about"
                                className="text-gray-600 hover:text-[#014751] transition-colors py-2 border-b border-gray-200"
                                onClick={toggleMenu}
                            >
                                About
                            </Link>

                            <Link
                                href="/pricing"
                                className="text-gray-600 hover:text-[#014751] transition-colors py-2 border-b border-gray-200"
                                onClick={toggleMenu}
                            >
                                Pricing
                            </Link>
                            <Link
                                href="/admission-checker"
                                className="text-gray-600 hover:text-[#014751] transition-colors py-2 border-b border-gray-200"
                                onClick={toggleMenu}
                            >
                                Admission Checker
                            </Link>
                            <Link
                                href="/nysc"
                                className="text-gray-600 hover:text-[#014751] transition-colors py-2 border-b border-gray-200"
                                onClick={toggleMenu}
                            >
                                NYSC Yearbook
                            </Link>
                            <div className="pt-4 pb-2">
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Explore</p>
                                <div className="grid grid-cols-1 gap-3">
                                    <Link
                                        href="/schools"
                                        className="flex items-center justify-between p-4 rounded-xl bg-gray-50 border border-gray-100"
                                        onClick={toggleMenu}
                                    >
                                        <div className="flex flex-col">
                                            <span className="text-xs font-bold text-[#014751]">Education Institutions</span>
                                            <span className="text-[10px] text-gray-500">Register your school</span>
                                        </div>
                                        <FaChevronRight className="w-3 h-3 text-gray-400" />
                                    </Link>

                                    <div className="flex flex-col rounded-xl bg-gray-50 border border-gray-100 overflow-hidden">
                                        <button
                                            onClick={() => setIsMobileStudentOpen(!isMobileStudentOpen)}
                                            className="flex items-center justify-between p-4 w-full"
                                        >
                                            <div className="flex flex-col text-left">
                                                <span className="text-xs font-bold text-[#014751]">Student Community</span>
                                                <span className="text-[10px] text-gray-500">Ambassador & Portal</span>
                                            </div>
                                            <svg className={`w-4 h-4 text-gray-400 transition-transform ${isMobileStudentOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </button>

                                        <AnimatePresence>
                                            {isMobileStudentOpen && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    className="bg-white/50 border-t border-gray-100"
                                                >
                                                    <Link
                                                        href="https://portal.sabidub.com/ambassador/login"
                                                        className="flex items-center gap-3 p-4 hover:bg-gray-50 border-b border-gray-50"
                                                        onClick={toggleMenu}
                                                    >
                                                        <span className="text-xs font-bold text-gray-700">Ambassador Hub</span>
                                                    </Link>
                                                    <Link
                                                        href="https://student.portal.sabidub.com/signin"
                                                        className="flex items-center gap-3 p-4 hover:bg-gray-50"
                                                        onClick={toggleMenu}
                                                    >
                                                        <span className="text-xs font-bold text-gray-700">Student Portal</span>
                                                    </Link>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Link
                            href="#download-app"
                            onClick={(e) => {
                                e.preventDefault();
                                setIsMenuOpen(false);
                                document.getElementById('download-app')?.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className="w-full bg-[#014751] text-white px-4 py-4 rounded-xl font-black uppercase tracking-widest text-center text-sm shadow-md active:scale-95 transition-all flex items-center justify-center gap-2"
                        >
                            <span>Download / Login</span>
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Overlay */}
            {isMenuOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-[55]"
                    onClick={toggleMenu}
                ></div>
            )}
        </>
    );
}
