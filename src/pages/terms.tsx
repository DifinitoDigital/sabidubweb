import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function Terms() {
  return (
    <>
      <Head>
        <title>Terms and Conditions | SabiDub - Educational Excellence in Nigeria</title>
        <meta name="description" content="Read SabiDub's terms and conditions for using our educational platform." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen bg-white relative">
        <Navbar />

        {/* Terms and Conditions Content */}
        <section className="px-4 sm:px-6 py-12 sm:py-20 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Terms and Conditions</h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              These Terms and Conditions ("Terms") govern your use of our website, mobile apps, and services (collectively, "Services").
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-12">
            <div>
              <p className="text-gray-600 mb-8">
                By accessing or using our Services, you agree to be bound by these Terms. If you do not agree, please do not use our Services.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Eligibility</h2>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>You must be at least 11 years old to use SabiDub. Users under 18 require parental or guardian consent.</li>
                <li>Educators and institutions must provide accurate professional or organizational details during registration.</li>
                <li>You must reside in Nigeria or a supported African region (e.g., Kenya, Ghana, South Africa, post-expansion).</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Account Registration</h2>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>To access our Services, you must create an account with accurate information (e.g., name, email, institution).</li>
                <li>You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account.</li>
                <li>Notify us immediately at hello@definito.digital if you suspect unauthorized use of your account.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Subscription Plans</h2>
              <p className="text-gray-600 mb-4">SabiDub offers the following plans:</p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
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
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Acceptable Use</h2>
              <p className="text-gray-600 mb-4">You agree to use SabiDub's Services only for lawful purposes and in accordance with these Terms. You will not:</p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Share, reproduce, or distribute content (e.g., modules, AR/VR simulations) without permission.</li>
                <li>Use the platform to harass, harm, or discriminate against others.</li>
                <li>Attempt to bypass security measures, hack, or disrupt the platform (95% uptime target).</li>
                <li>Upload malicious content, such as viruses or harmful code.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Intellectual Property</h2>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>All content on SabiDub (e.g., learning modules, analytics tools, gamified elements) is owned by SabiDub or its licensors and protected by copyright and intellectual property laws.</li>
                <li>You are granted a non-exclusive, non-transferable license to access content for personal or educational use, subject to your subscription plan.</li>
                <li>You may not copy, modify, or distribute SabiDub content without written permission.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">User-Generated Content</h2>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Educators may upload lesson plans or content, which must comply with these Terms and not infringe on third-party rights.</li>
                <li>SabiDub reserves the right to review, moderate, or remove user-generated content that violates these Terms.</li>
                <li>By uploading content, you grant SabiDub a non-exclusive, royalty-free license to use, display, and distribute it within the platform to enhance educational outcomes.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Termination</h2>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>You may terminate your account at any time by contacting hello@definito.digital.</li>
                <li>We may suspend or terminate your account for violating these Terms, with notice where required by law.</li>
                <li>Upon termination, access to paid features (e.g., High Access, Premium) will cease, but offline content accessed during an active subscription may remain available.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Limitation of Liability</h2>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>SabiDub provides Services "as is" and does not guarantee uninterrupted access (though we target 95% uptime and &lt;2% bug rate).</li>
                <li>We are not liable for indirect damages, such as loss of data or educational outcomes, except where required by law.</li>
                <li>Our liability is limited to the amount paid for your subscription (e.g., ₦1,200–₦3,200/month).</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Modifications to Services</h2>
              <p className="text-gray-600">SabiDub may update or modify Services (e.g., adding AR/VR features, new modules) to improve user experience. Users will be notified of significant changes via email or platform announcements.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Governing Law</h2>
              <p className="text-gray-600">These Terms are governed by the laws of Nigeria. Disputes will be resolved in courts located in Abuja, Nigeria.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to Terms</h2>
              <p className="text-gray-600">We may update these Terms to reflect changes in our Services or legal requirements. You will be notified via email or platform announcements at least 30 days before significant changes take effect.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
              <p className="text-gray-600">For questions about these Terms, contact:</p>
              <ul className="list-none text-gray-600 space-y-2 mt-4">
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