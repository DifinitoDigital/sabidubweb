import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import Footer from "../components/Footer";

export default function Privacy() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <>
      <Head>
        <title>Privacy Policy | SabiDub - Educational Excellence in Nigeria</title>
        <meta name="description" content="Learn about how SabiDub protects your privacy and handles your data." />
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

        {/* Privacy Policy Content */}
        <section className="px-4 sm:px-6 py-12 sm:py-20 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">Privacy Policy</h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              At SabiDub, we are committed to protecting the privacy and security of our users, including students, educators, and institutions.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-12">
            <div>
              <p className="text-gray-400 mb-8">
                This Privacy Policy outlines how we collect, use, store, and protect your personal information when you use our website, platform, mobile apps, or services (collectively, "Services"). By using SabiDub's Services, you agree to the practices described in this policy.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Information We Collect</h2>
              <p className="text-gray-400 mb-4">We collect the following types of information to provide and improve our Services:</p>
              <ul className="list-disc list-inside text-gray-400 space-y-2">
                <li>Personal Information: When you register for an account (Basic, High Access, or Premium Plan), we may collect your name, email address, phone number, age, educational institution, and payment details (for paid plans).</li>
                <li>Usage Data: We collect data on how you interact with our Services, such as courses accessed, time spent on modules, quiz results, and engagement with interactive features (e.g., gamified content, AR/VR simulations).</li>
                <li>Device and Technical Information: We collect information about your device, including IP address, browser type, operating system, and mobile device identifiers, to ensure compatibility and optimize performance.</li>
                <li>Analytics Data: We use real-time analytics to track progress and personalize learning paths, such as performance metrics and learning patterns.</li>
                <li>Location Data: With your consent, we may collect general location data (e.g., city or region) to provide localized content (e.g., Hausa, Yoruba, Igbo modules) and offline access options.</li>
                <li>Educator Data: For educators, we collect professional details, such as teaching credentials and lesson plans, to support professional development tools.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">How We Use Your Information</h2>
              <ul className="list-disc list-inside text-gray-400 space-y-2">
                <li>Provide and personalize our Services, including adaptive learning paths, gamified content, and real-time analytics.</li>
                <li>Process payments for subscriptions (Basic: ₦1,200/month, High Access: ₦2,800/month, Premium: ₦3,200/month) and institutional plans.</li>
                <li>Improve platform functionality, content, and user experience through analytics and feedback.</li>
                <li>Communicate with you about account updates, promotions (e.g., 20% launch discount), and educational resources via email, SMS, or push notifications (with your consent).</li>
                <li>Ensure compliance with legal and regulatory requirements in Nigeria and other operating regions.</li>
                <li>Support partnerships with telecoms (e.g., MTN, Airtel) and NGOs to enhance accessibility.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">How We Share Your Information</h2>
              <p className="text-gray-400 mb-4">We do not sell your personal information. We may share information in the following cases:</p>
              <ul className="list-disc list-inside text-gray-400 space-y-2">
                <li>With Partners: With educational institutions, telecom providers, or NGOs to deliver subsidized access or data bundles, only with your consent.</li>
                <li>Service Providers: With trusted third parties (e.g., cloud providers like Azure, payment processors) to support platform operations, ensuring they adhere to strict data protection standards.</li>
                <li>Legal Compliance: When required by law or to protect SabiDub's rights, safety, or property.</li>
                <li>Aggregated Data: We may share anonymized, aggregated data (e.g., learning trends) with partners or for research purposes.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Data Security</h2>
              <p className="text-gray-400">We use a robust cloud infrastructure to protect your data, including encryption, secure servers, and access controls. Our platform maintains 95% uptime and adheres to industry-standard security protocols. However, no system is completely secure, and we cannot guarantee absolute protection against unauthorized access.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Data Retention</h2>
              <p className="text-gray-400">We retain personal information only as long as necessary to provide our Services or comply with legal obligations. Usage data (e.g., analytics) is retained for up to 5 years to improve platform performance. You may request deletion of your account by contacting hello@definito.digital.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Your Rights</h2>
              <p className="text-gray-400 mb-4">As a user, you have the right to:</p>
              <ul className="list-disc list-inside text-gray-400 space-y-2">
                <li>Access, correct, or delete your personal information.</li>
                <li>Opt out of marketing communications (e.g., email or SMS promotions).</li>
                <li>Request a copy of your data in a portable format.</li>
                <li>Withdraw consent for location or analytics data collection (though this may limit some features, like personalized learning).</li>
              </ul>
              <p className="text-gray-400 mt-4">To exercise these rights, contact us at hello@definito.digital. We will respond within 24 hours, as per our support metrics.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Children's Privacy</h2>
              <p className="text-gray-400">SabiDub targets secondary (ages 11-18) and tertiary (ages 18-25+) students. For users under 18, we require parental or guardian consent to collect personal information. Schools using institutional plans must ensure compliance with local child protection laws.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">International Data Transfers</h2>
              <p className="text-gray-400">As SabiDub expands across Africa (e.g., Kenya, Ghana), data may be transferred to servers outside Nigeria. We ensure compliance with data protection laws in all operating regions, including Nigeria's Data Protection Regulation (NDPR).</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Third-Party Links</h2>
              <p className="text-gray-400">Our Services may include links to third-party websites (e.g., partner institutions, telecoms). We are not responsible for their privacy practices and encourage you to review their policies.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Changes to This Policy</h2>
              <p className="text-gray-400">We may update this Privacy Policy to reflect changes in our Services or legal requirements. We will notify users via email or platform announcements at least 30 days before significant changes take effect.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Contact Us</h2>
              <p className="text-gray-400">For questions or concerns about this Privacy Policy, contact:</p>
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