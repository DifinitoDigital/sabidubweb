import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X } from "lucide-react";
import Link from "next/link";

export default function CookieConsent() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Check if user has already accepted cookies
        const consent = localStorage.getItem("sabidub_cookie_consent");
        if (!consent) {
            // Delay showing the banner for a better UX
            const timer = setTimeout(() => {
                setIsVisible(true);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem("sabidub_cookie_consent", "accepted");
        setIsVisible(false);
    };

    const handleDecline = () => {
        localStorage.setItem("sabidub_cookie_consent", "declined");
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ type: "spring", damping: 25, stiffness: 200 }}
                    className="fixed bottom-6 left-6 right-6 md:left-auto md:max-w-md z-[100]"
                >
                    <div className="bg-white/80 backdrop-blur-xl border border-gray-100 rounded-[32px] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.1)] relative overflow-hidden group">
                        {/* Decorative glow */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFEDB1]/20 rounded-full blur-3xl pointer-events-none" />
                        
                        <div className="relative z-10">
                            <div className="flex items-start gap-4 mb-6">
                                <div className="w-12 h-12 rounded-2xl bg-[#014751]/10 flex items-center justify-center text-[#014751] flex-shrink-0">
                                    <Cookie className="w-6 h-6" />
                                </div>
                                <div className="flex-1 pt-1">
                                    <h3 className="text-gray-900 font-black text-lg mb-1 tracking-tight">Cookies!</h3>
                                    <p className="text-gray-500 text-sm font-medium leading-relaxed">
                                        We use cookies to personalize your experience and analyze our traffic. 
                                        By clicking &quot;Accept All&quot;, you consent to our use of cookies.
                                    </p>
                                </div>
                                <button 
                                    onClick={() => setIsVisible(false)}
                                    className="text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3">
                                <button
                                    onClick={handleAccept}
                                    className="flex-1 bg-[#014751] text-white px-6 py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-[1.02] transition-all active:scale-[0.98] shadow-lg shadow-[#014751]/10"
                                >
                                    Accept All
                                </button>
                                <Link
                                    href="/privacy"
                                    className="flex-1 bg-gray-50 text-gray-600 px-6 py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-gray-100 transition-all text-center flex items-center justify-center"
                                >
                                    Privacy Policy
                                </Link>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
