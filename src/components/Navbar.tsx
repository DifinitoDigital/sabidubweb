import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
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
                <div className="px-4 sm:px-6 py-4 sm:py-6 flex items-center justify-between max-w-7xl mx-auto">
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
                    <div className="hidden md:flex items-center space-x-8">
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
                            Admission Checker
                        </Link>

                        <Link
                            href="/blog"
                            className={`${subTextColor} hover:text-[#AFF8C8] transition-colors font-medium`}
                        >
                            Blog
                        </Link>


                        <button className="bg-[#014751] text-white px-5 py-2.5 rounded-xl font-bold hover:bg-[#026372] transition-all hover:scale-105 active:scale-95 shadow-lg">
                            Download App
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={toggleMenu}
                        className={`md:hidden flex flex-col items-center justify-center w-10 h-10 ${isTransparent ? 'bg-white/10' : 'bg-white border border-gray-100 shadow-sm'} rounded-lg transition-colors relative z-50`}
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

            {/* Mobile Menu */}
            <div
                className={`md:hidden fixed top-0 right-0 w-full sm:w-80 h-full bg-white border border-gray-100 shadow-sm z-[60] transform transition-transform duration-300 ease-in-out ${isMenuOpen ? "translate-x-0" : "translate-x-full"
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
                                href="/blog"
                                className="text-gray-600 hover:text-[#014751] transition-colors py-2 border-b border-gray-200"
                                onClick={toggleMenu}
                            >
                                Blog
                            </Link>
                        </div>

                        <button className="w-full bg-[#014751] text-white px-4 py-3 rounded-xl font-bold hover:bg-[#026372] transition-colors">
                            Download App
                        </button>
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
