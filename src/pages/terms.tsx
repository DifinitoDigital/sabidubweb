import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import Footer from "../components/Footer";

export default function Terms() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <>
      <Head>
        <title>Terms and Conditions | SabiDub - Educational Excellence in Nigeria</title>
        <meta name="description" content="Read SabiDub's terms and conditions for using our educational platform." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen bg-[#111] relative">
        {/* Navigation */}
        <nav className="px-4 sm:px-6 py-6 sm:py-8 flex items-center justify-between max-w-7xl mx-auto relative z-50">
          <Link href="/" className="flex items-center">
            <div className="relative w-40 h-12">
              <Image
                src="/images/white.png"
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
              className="text-gray-400 hover:text-[#FFEDB1] transition-colors"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-gray-400 hover:text-[#FFEDB1] transition-colors"
            >
              About
            </Link>
            <Link
              href="/services"
              className="text-gray-400 hover:text-[#FFEDB1] transition-colors"
            >
              Services
            </Link>
            <Link
              href="/pricing"
              className="text-gray-400 hover:text-[#FFEDB1] transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="/competition"
              className="text-gray-400 hover:text-[#FFEDB1] transition-colors"
            >
              Competition
            </Link>
            <Link
              href="/contact"
              className="text-gray-400 hover:text-[#FFEDB1] transition-colors"
            >
              Contact
            </Link>
            <button className="bg-[#FFEDB1] text-black px-4 py-2 rounded-md font-medium hover:bg-[#ffdb82] transition-colors">
              Download App
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden flex flex-col items-center justify-center w-10 h-10 bg-[#1a1a1a] rounded-lg hover:bg-[#252525] transition-colors relative z-50"
          >
            <span
              className={`w-5 h-0.5 bg-white mb-1 transition-transform ${
                isMenuOpen ? "rotate-45 translate-y-1.5" : ""
              }`}
            ></span>
            <span
              className={`w-5 h-0.5 bg-white transition-opacity ${
                isMenuOpen ? "opacity-0" : ""
              }`}
            ></span>
            <span
              className={`w-5 h-0.5 bg-white mt-1 transition-transform ${
                isMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
              }`}
            ></span>
          </button>
        </nav>

        {/* Mobile Menu */}
        <div
          className={`md:hidden fixed top-0 right-0 w-full sm:w-80 h-full bg-[#1a1a1a] z-40 transform transition-transform duration-300 ease-in-out ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="p-6 h-full overflow-y-auto">
            <div className="flex flex-col space-y-6">
              <div className="flex items-center justify-end mb-8">
                <button
                  onClick={toggleMenu}
                  className="text-gray-400 hover:text-white"
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
                  className="text-gray-400 hover:text-[#FFEDB1] transition-colors py-2 border-b border-gray-800"
                  onClick={toggleMenu}
                >
                  Home
                </Link>
                <Link
                  href="/about"
                  className="text-gray-400 hover:text-[#FFEDB1] transition-colors py-2 border-b border-gray-800"
                  onClick={toggleMenu}
                >
                  About
                </Link>
                <Link
                  href="/services"
                  className="text-gray-400 hover:text-[#FFEDB1] transition-colors py-2 border-b border-gray-800"
                  onClick={toggleMenu}
                >
                  Services
                </Link>
                <Link
                  href="/pricing"
                  className="text-gray-400 hover:text-[#FFEDB1] transition-colors py-2 border-b border-gray-800"
                  onClick={toggleMenu}
                >
                  Pricing
                </Link>
                <Link
                  href="/competition"
                  className="text-gray-400 hover:text-[#FFEDB1] transition-colors py-2 border-b border-gray-800"
                  onClick={toggleMenu}
                >
                  Competition
                </Link>
                <Link
                  href="/contact"
                  className="text-gray-400 hover:text-[#FFEDB1] transition-colors py-2 border-b border-gray-800"
                  onClick={toggleMenu}
                >
                  Contact
                </Link>
              </div>

              <button className="w-full bg-[#FFEDB1] text-black px-4 py-3 rounded-md font-medium hover:bg-[#ffdb82] transition-colors">
                Download App
              </button>
            </div>
          </div>
        </div>

        {/* Overlay */}
        {isMenuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-30"
            onClick={toggleMenu}
          ></div>
        )}

        {/* Terms and Conditions Content */}
        <section className="px-4 sm:px-6 py-12 sm:py-20 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">Terms and Conditions</h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              These Terms and Conditions ("Terms") govern your use of our website, mobile apps, and services (collectively, "Services").
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-12">
            <div>
              <p className="text-gray-400 mb-8">
                By accessing or using our Services, you agree to be bound by these Terms. If you do not agree, please do not use our Services.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Eligibility</h2>
              <ul className="list-disc list-inside text-gray-400 space-y-2">
                <li>You must be at least 11 years old to use SabiDub. Users under 18 require parental or guardian consent.</li>
                <li>Educators and institutions must provide accurate professional or organizational details during registration.</li>
                <li>You must reside in Nigeria or a supported African region (e.g., Kenya, Ghana, South Africa, post-expansion).</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Account Registration</h2>
              <ul className="list-disc list-inside text-gray-400 space-y-2">
                <li>To access our Services, you must create an account with accurate information (e.g., name, email, institution).</li>
                <li>You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account.</li>
                <li>Notify us immediately at hello@definito.digital if you suspect unauthorized use of your account.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Subscription Plans</h2>
              <p className="text-gray-400 mb-4">SabiDub offers the following plans:</p>
              <ul className="list-disc list-inside text-gray-400 space-y-2">
                <li>Basic Plan (₦1,200/month): Core modules, offline mode, basic analytics.</li>
                <li>High Access Plan (₦2,800/month): Full library, adaptive learning, gamified content, educator tools.</li>
                <li>Premium Plan (₦3,200/month): All High Access features, AR/VR simulations, advanced analytics, priority support.</li>
                <li>Institutional Plans: Bulk discounts (e.g., ₦2,500/user/month for 50+ users on Premium).</li>
                <li>Freemium Trial: 30-day free access to limited features, with upsell to paid plans.</li>
                <li>Payments are processed securely via third-party providers. Annual subscriptions offer discounts (e.g., ₦12,000/year for Basic, saving ₦2,400).</li>
                <li>Refunds are available within 7 days of purchase if no content is accessed; contact hello@definito.digital.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Acceptable Use</h2>
              <p className="text-gray-400 mb-4">You agree to use SabiDub's Services only for lawful purposes and in accordance with these Terms. You will not:</p>
              <ul className="list-disc list-inside text-gray-400 space-y-2">
                <li>Share, reproduce, or distribute content (e.g., modules, AR/VR simulations) without permission.</li>
                <li>Use the platform to harass, harm, or discriminate against others.</li>
                <li>Attempt to bypass security measures, hack, or disrupt the platform (95% uptime target).</li>
                <li>Upload malicious content, such as viruses or harmful code.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Intellectual Property</h2>
              <ul className="list-disc list-inside text-gray-400 space-y-2">
                <li>All content on SabiDub (e.g., learning modules, analytics tools, gamified elements) is owned by SabiDub or its licensors and protected by copyright and intellectual property laws.</li>
                <li>You are granted a non-exclusive, non-transferable license to access content for personal or educational use, subject to your subscription plan.</li>
                <li>You may not copy, modify, or distribute SabiDub content without written permission.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">User-Generated Content</h2>
              <ul className="list-disc list-inside text-gray-400 space-y-2">
                <li>Educators may upload lesson plans or content, which must comply with these Terms and not infringe on third-party rights.</li>
                <li>SabiDub reserves the right to review, moderate, or remove user-generated content that violates these Terms.</li>
                <li>By uploading content, you grant SabiDub a non-exclusive, royalty-free license to use, display, and distribute it within the platform to enhance educational outcomes.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Termination</h2>
              <ul className="list-disc list-inside text-gray-400 space-y-2">
                <li>You may terminate your account at any time by contacting hello@definito.digital.</li>
                <li>We may suspend or terminate your account for violating these Terms, with notice where required by law.</li>
                <li>Upon termination, access to paid features (e.g., High Access, Premium) will cease, but offline content accessed during an active subscription may remain available.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Limitation of Liability</h2>
              <ul className="list-disc list-inside text-gray-400 space-y-2">
                <li>SabiDub provides Services "as is" and does not guarantee uninterrupted access (though we target 95% uptime and &lt;2% bug rate).</li>
                <li>We are not liable for indirect damages, such as loss of data or educational outcomes, except where required by law.</li>
                <li>Our liability is limited to the amount paid for your subscription (e.g., ₦1,200–₦3,200/month).</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Modifications to Services</h2>
              <p className="text-gray-400">SabiDub may update or modify Services (e.g., adding AR/VR features, new modules) to improve user experience. Users will be notified of significant changes via email or platform announcements.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Governing Law</h2>
              <p className="text-gray-400">These Terms are governed by the laws of Nigeria. Disputes will be resolved in courts located in Abuja, Nigeria.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Changes to Terms</h2>
              <p className="text-gray-400">We may update these Terms to reflect changes in our Services or legal requirements. You will be notified via email or platform announcements at least 30 days before significant changes take effect.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Contact Us</h2>
              <p className="text-gray-400">For questions about these Terms, contact:</p>
              <ul className="list-none text-gray-400 space-y-2 mt-4">
                <li>Email: hello@definito.digital</li>
                <li>Phone: +234-810-911-7784</li>
                <li>Address: SabiDub Headquarters, Abuja, Nigeria</li>
              </ul>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
} 