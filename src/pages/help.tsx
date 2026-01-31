import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { FaUsers, FaCalendarAlt, FaPlane, FaEnvelope, FaPhone, FaChalkboardTeacher, FaStar, FaQuestionCircle, FaDownload, FaCreditCard, FaBook, FaLaptop } from "react-icons/fa";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar"; // Added import

export default function Help() {

  return (
    <>
      <Head>
        <title>Help Center | SabiDub - Educational Excellence in Nigeria</title>
        <meta name="description" content="Get help and support for using SabiDub's educational platform." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen bg-white relative">
        <Navbar />

        {/* Help Center Content */}
        <section className="px-4 sm:px-6 py-12 sm:py-20 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Help Center</h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Welcome to the SabiDub Help Center. Your resource for getting the most out of our EdTech platform.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-12">
            <div>
              <p className="text-gray-600 mb-8">
                Whether you're a student, educator, or institutional user, we're here to support you with our accessible, engaging, and effective learning solutions. Our support team targets &lt;24-hour resolution and 90% satisfaction rates.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Getting Started</h2>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">How to Create an Account</h3>
              <ol className="list-decimal list-inside text-gray-600 space-y-2">
                <li>Visit www.sabidub.com or download the SabiDub app (iOS/Android).</li>
                <li>Click "Sign Up" and provide your name, email, phone number, and (if applicable) institution details.</li>
                <li>For users under 18, obtain parental/guardian consent via the registration form.</li>
                <li>Choose a plan (Basic: ₦1,200/month, High Access: ₦2,800/month, Premium: ₦3,200/month) or start with a 30-day freemium trial.</li>
                <li>Verify your email to activate your account.</li>
              </ol>
              <p className="text-gray-600 mt-4">Metric: 85% onboarding success rate.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Accessing the Platform</h2>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Log in via website or app using your credentials.</li>
                <li>Offline mode available for Basic Plan users in areas with limited internet (36% penetration in Africa).</li>
                <li>Compatible with smartphones (40%+ penetration in Nigeria), tablets, and desktops.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Subscription and Billing</h2>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Choosing a Plan</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Basic Plan (₦1,200/month): Core modules, offline access, basic analytics.</li>
                <li>High Access Plan (₦2,800/month): Full library, adaptive learning, gamified content.</li>
                <li>Premium Plan (₦3,200/month): AR/VR simulations, advanced analytics, priority support.</li>
                <li>Institutional Plans: Bulk discounts (e.g., ₦2,500/user/month for 50+ users).</li>
                <li>Annual subscriptions save up to 20% (e.g., ₦12,000/year for Basic).</li>
                <li>Launch Discount: 20% off first 3 months (e.g., Basic: ₦960/month).</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Payment Issues</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Payments are processed securely via third-party providers (e.g., Paystack).</li>
                <li>Contact hello@definito.digital for billing disputes or refunds (within 7 days if no content accessed).</li>
                <li>For institutional subscriptions, contact our sales team for invoicing: hello@definito.digital.</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Free Trial</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>30-day freemium access to limited features.</li>
                <li>Upgrade to a paid plan via the platform or app to unlock full features (e.g., AR/VR, advanced analytics).</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Using SabiDub Features</h2>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Interactive Learning Modules</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Access 50+ modules (English at launch, Hausa/Yoruba by Year 2).</li>
                <li>Engage with gamified content and AR/VR simulations (Premium Plan).</li>
                <li>Use adaptive learning paths for personalized education based on performance.</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Educator Tools</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Access AI-driven lesson planning and real-time analytics (High Access/Premium).</li>
                <li>Explore professional development courses (Premium Plan).</li>
                <li>Upload lesson plans (subject to moderation; see Terms).</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Offline Mode</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Download content for offline use (Basic Plan and above).</li>
                <li>Ideal for rural users with limited internet access.</li>
                <li>Sync progress when reconnected.</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Analytics and Progress Tracking</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>View real-time analytics on quiz results, module completion, and engagement (High Access/Premium).</li>
                <li>Educators: Track class performance and customize lessons.</li>
                <li>Institutions: Access aggregated data for academic insights.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Troubleshooting</h2>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Login Issues</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Reset password via "Forgot Password" link on login page.</li>
                <li>Ensure correct email and password; check spam for verification emails.</li>
                <li>Contact hello@definito.digital if issues persist.</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Platform Errors</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>We target &lt;2% bug rate and 95% uptime.</li>
                <li>Clear browser cache or reinstall app for technical glitches.</li>
                <li>Report issues via hello@definito.digital for resolution within 24 hours.</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Content Access</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Ensure active subscription (Basic, High Access, Premium).</li>
                <li>Check device compatibility (smartphone, tablet, or desktop).</li>
                <li>For offline mode, download content while connected.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Promotions and Rewards</h2>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Launch Campaign (Feb-Apr 2025): 20% off first 3 months (e.g., Basic: ₦960).</li>
                <li>Back-to-School (May-Jul 2025): 25% off Premium for 100+ users (₦2,400/user/month).</li>
                <li>Referral Program: Earn ₦500 credit per paid referral.</li>
                <li>Gamification Contest (Aug-Oct 2025): Complete 10 modules for a chance to win ₦10,000 vouchers or free High Access month.</li>
                <li>Loyalty Program: Earn 100 points/month (redeemable for ₦100 discounts).</li>
                <li>Student Ambassadors: Join to promote SabiDub and earn free Basic Plan access.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Partnerships</h2>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Collaborations with telecoms (e.g., MTN, Airtel) for data bundles.</li>
                <li>NGO partnerships for subsidized access in underserved areas.</li>
                <li>Contact partnerships@sabidub.com for inquiries.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Support</h2>
              <ul className="list-none text-gray-600 space-y-2">
                <li>Email: hello@definito.digital (response within 24 hours)</li>
                <li>Phone: +234-810-911-7784 (12-hour support shifts)</li>
                <li>Live Chat: Available on website/app (High Access/Premium users)</li>
                <li>FAQ Bot: Access via website for instant answers to common questions</li>
                <li>Address: SabiDub Headquarters, Abuja, Nigeria</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Feedback</h2>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Share feedback via hello@definito.digital or in-app surveys to help us achieve 80% user satisfaction.</li>
                <li>Join our "Future of Learning" webinars for live demos and Q&A.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Additional Resources</h2>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Tutorials: Access pre-recorded onboarding videos on www.sabidub.com/support.</li>
                <li>Blog: Visit www.sabidub.com/blog for tips on using adaptive learning, gamification, and educator tools.</li>
                <li>Community: Follow us on Instagram, X, and WhatsApp for updates and success stories.</li>
              </ul>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
} 