import Link from "next/link";
import { useState } from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface FooterProps {
  showAppDownload?: boolean;
}

const Footer = ({ showAppDownload = true }: FooterProps) => {
  const [isComingSoonOpen, setIsComingSoonOpen] = useState(false);
  return (
    <footer className="bg-white text-gray-600 py-24 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* App Download Section - Premium Design */}
        {showAppDownload && (
          <section id="download-app" className="py-12 bg-white">
            <div className="relative bg-[#F8F9FA] rounded-[40px] p-8 sm:p-16 overflow-hidden">
              {/* Decorative Circles */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#FFEDB1]/30 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#FFEDB1]/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />

              <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
                <div className="max-w-2xl text-left">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight mb-6">
                    Get the App or Login to<br />
                    Enjoy Exclusive Features!
                  </h2>
                  <p className="text-lg text-gray-600 leading-relaxed mb-10 max-w-xl">
                    Enjoy a richer experience, exclusive content, and personalized lessons
                    right on your fingertips. Download the app today for a better
                    education journey.
                  </p>

                  <div className="flex flex-col gap-6">
                    <div className="flex flex-wrap gap-4">
                      <button
                        onClick={() => setIsComingSoonOpen(true)}
                        className="flex items-center gap-3 bg-black text-white px-6 py-3 rounded-2xl hover:bg-gray-900 transition-all duration-300 group shadow-lg"
                      >
                        <div className="w-8 h-8 relative">
                          <svg viewBox="0 0 24 24" className="fill-white" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3.609 1.814L13.792 12 3.61 22.186a2.23 2.23 0 0 1-.61-1.571V3.385c0-.6.22-1.156.61-1.571zM15.563 10.23L4.354 1.258a1.69 1.69 0 0 1 .632-.123c.48 0 .93.2 1.26.54l11.45 8.555-2.133 1.93zM15.563 13.77l2.133 1.931L6.246 24.255c-.33.34-.78.54-1.26.54-.22 0-.437-.044-.633-.124L15.563 13.77zm4.828-1.77L16.48 9.176l-2.008 1.817 1.542 1.541-1.542 1.542 2.008 1.817 3.911-2.824a1.69 1.69 0 0 0 .54-1.26c0-.43-.195-.835-.54-1.23z" />
                          </svg>
                        </div>
                        <div className="text-left">
                          <p className="text-[10px] uppercase tracking-wider opacity-60 leading-none mb-1">Coming Soon to</p>
                          <p className="text-sm font-bold leading-none">Google Play</p>
                        </div>
                      </button>

                      <button
                        onClick={() => setIsComingSoonOpen(true)}
                        className="flex items-center gap-3 bg-black text-white px-6 py-3 rounded-2xl hover:bg-gray-900 transition-all duration-300 group shadow-lg"
                      >
                        <div className="w-8 h-8 relative">
                          <svg viewBox="0 0 24 24" className="fill-white" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.1 2.48-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.36 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                          </svg>
                        </div>
                        <div className="text-left">
                          <p className="text-[10px] uppercase tracking-wider opacity-60 leading-none mb-1">Coming Soon on</p>
                          <p className="text-sm font-bold leading-none">App Store</p>
                        </div>
                      </button>
                    </div>

                    <Link
                      href="https://student.portal.sabidub.com/signin"
                      className="inline-flex items-center gap-2 text-[#014751] font-black text-sm uppercase tracking-widest hover:translate-x-1 transition-transform group"
                    >
                      <span>Signup or Login with the web</span>
                      <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </div>
                </div>

                <div className="hidden lg:block relative">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#FFEDB1] rounded-full blur-[100px] opacity-20" />
                  <div className="relative z-10 w-full h-[400px] rounded-3xl overflow-hidden shadow-2xl transform rotate-2">
                    <Image
                      src="/images/footer-image.png"
                      alt="App Interface"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-16">
          {/* Company Info */}
          <div className="space-y-6">
            <Link href="/" className="inline-block">
              <div className="relative w-40 h-12">
                <Image
                  src="/images/black.png"
                  alt="SabiDub Logo"
                  fill
                  className="object-contain object-left"
                />
              </div>
            </Link>
            <p className="text-base">
              Empowering Nigerian students with comprehensive educational
              resources and personalized learning experiences.
            </p>
            <div className="flex space-x-6">
              <Link
                href="https://facebook.com"
                className="hover:text-yellow-600 transition-colors"
              >
                <FaFacebook size={24} />
              </Link>
              <Link
                href="https://twitter.com"
                className="hover:text-yellow-600 transition-colors"
              >
                <FaTwitter size={24} />
              </Link>
              <Link
                href="https://instagram.com"
                className="hover:text-yellow-600 transition-colors"
              >
                <FaInstagram size={24} />
              </Link>
              <Link
                href="https://linkedin.com"
                className="hover:text-yellow-600 transition-colors"
              >
                <FaLinkedin size={24} />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-gray-900 font-semibold text-xl mb-6">
              Quick Links
            </h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/"
                  className="hover:text-yellow-600 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-yellow-600 transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="hover:text-yellow-600 transition-colors"
                >
                  Our Services
                </Link>
              </li>
              <li>
                <Link
                  href="/leaderboard"
                  className="hover:text-yellow-600 transition-colors"
                >
                  Leaderboard
                </Link>
              </li>
              <li>
                <Link
                  href="/admission-checker"
                  className="hover:text-yellow-600 transition-colors"
                >
                  Admission Checker
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="hover:text-yellow-600 transition-colors"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-yellow-600 transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-gray-900 font-semibold text-xl mb-6">Resources</h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/blog"
                  className="hover:text-yellow-600 transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/help"
                  className="hover:text-yellow-600 transition-colors"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  href="https://portal.sabidub.com/auth/school/signin"
                  className="hover:text-yellow-600 transition-colors"
                >
                  School Management
                </Link>
              </li>
              <li>
                <Link
                  href="https://portal.sabidub.com/ambassador/login"
                  className="hover:text-yellow-600 transition-colors"
                >
                  Ambassador Hub
                </Link>
              </li>
              <li>
                <Link
                  href="https://portal.sabidub.com/tutor-support/login"
                  className="hover:text-yellow-600 transition-colors"
                >
                  Tutor Support Portal
                </Link>
              </li>
              <li>
                <Link
                  href="https://portal.sabidub.com/tutor-support/signup"
                  className="hover:text-yellow-600 transition-colors"
                >
                  Join as Tutor Support
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="hover:text-yellow-600 transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="hover:text-yellow-600 transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link
                  href="https://portal.sabidub.com/auth/school/signup"
                  className="hover:text-yellow-600 transition-colors"
                >
                  Register a School
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-gray-900 font-semibold text-xl mb-6">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:+2348012345678"
                  className="hover:text-yellow-600 transition-colors"
                >
                  +234 801 0911 7784
                </a>
              </li>
              <li>
                <a
                  href="mailto:isabidub@gmail.com"
                  className="hover:text-yellow-600 transition-colors"
                >
                  isabidub@gmail.com
                </a>
              </li>
              <li className="text-sm">
                Expansion Extension Layout, G/Lada
                <br />
                Abuja, Nigeria
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-gray-200 text-sm text-center">
          <p suppressHydrationWarning>&copy; {new Date().getFullYear()} SabiDub. All rights reserved.</p>
        </div>
      </div>

      {/* Coming Soon Modal */}
      <AnimatePresence>
        {isComingSoonOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsComingSoonOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-sm bg-white rounded-[40px] shadow-2xl overflow-hidden p-10 text-center"
            >
              <div className="w-20 h-20 bg-[#FFEDB1]/30 rounded-full flex items-center justify-center mx-auto mb-8">
                <svg className="w-10 h-10 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-4 tracking-tight">Coming Soon!</h3>
              <p className="text-gray-500 font-medium leading-relaxed mb-10">
                We&apos;re currently polishing the iOS version of SabiDub to ensure you get the best experience. Stay tuned!
              </p>
              <button
                onClick={() => setIsComingSoonOpen(false)}
                className="w-full py-4 bg-[#014751] text-white rounded-2xl font-black hover:scale-[1.02] transition-transform active:scale-[0.98]"
              >
                Got it
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </footer>
  );
};

export default Footer;
