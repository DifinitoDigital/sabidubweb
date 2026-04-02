import Head from "next/head";
import { useState } from "react";
import {
  FaGavel,
  FaUserShield,
  FaFileContract,
  FaLock,
  FaListUl,
  FaCopyright,
  FaExclamationTriangle,
  FaBan,
  FaGlobe,
  FaEnvelope,
  FaChevronRight,
  FaBalanceScale,
  FaShieldAlt,
  FaUserGraduate,
  FaRegHandshake,
  FaBriefcase,
  FaTrashAlt
} from "react-icons/fa";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";

const stagerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
};

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const sections = [
  {
    icon: <FaExclamationTriangle className="w-6 h-6" />,
    title: "Non-Affiliation & Government Disclaimer",
    content: [
      "SabiDub is a student-first educational platform and is NOT affiliated with, authorized by, or representative of any government entity in Nigeria or elsewhere. We operate as an independent educational tool.",
      "Any government-related information (such as exam dates or admission requirements) provided on this platform is for general educational guidance and is sourced from official public portals like jamb.gov.ng, waecnigeria.org, and neco.gov.ng.",
      "SabiDub does NOT represent the Federal Ministry of Education or any of its subsidiaries. All official administrative decisions, including admissions and examination results, rest solely with the respective government bodies."
    ]
  },
  {
    icon: <FaUserShield className="w-6 h-6" />,
    title: "1. Acceptance of Terms",
    content: [
      "By accessing, browsing, or using the SabiDub platform (the 'Platform'), you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. These terms constitute a legally binding agreement between you and SabiDub.",
      "If you are using the Platform on behalf of an institution, school, or organization, you represent and warrant that you have the authority to bind such entity to these Terms.",
      "We reserve the right to update or modify these Terms at any time without prior notice. Your continued use of the Platform following any changes constitutes acceptance of those changes."
    ]
  },
  {
    icon: <FaUserGraduate className="w-6 h-6" />,
    title: "2. Eligibility & Registration",
    content: [
      "The Platform is designed for secondary (ages 11-18) and tertiary (18+) learners. Users under 18 must obtain explicit parental or legal guardian consent before creating an account.",
      "You must provide accurate, current, and complete information during the registration process. Any fraudulent or misleading information may result in immediate account termination.",
      "Account credentials (username and password) are personal and non-transferable. You are solely responsible for all activities that occur under your account.",
      "Institutions must provide verifiable accreditation details to access specialized institutional features."
    ]
  },
  {
    icon: <FaFileContract className="w-6 h-6" />,
    title: "3. Service Descriptions & Subscriptions",
    content: [
      "SabiDub provides a range of educational services, including but not limited to: Interactive Learning Modules, AR/VR Simulations, AI-driven Tutoring, and Performance Analytics.",
      "Subscriptions are tiered (Basic, High Access, Premium) and are billed on a recurring monthly or annual basis. SabiDub reserves the right to modify pricing with 30 days' notice.",
      "Access to 'Offline Mode' content remains subject to an active subscription. Once a subscription expires, content may be locked until renewal.",
      "Institutional bulk licenses are governed by individual service level agreements (SLAs) in addition to these Terms."
    ]
  },
  {
    icon: <FaLock className="w-6 h-6" />,
    title: "4. Payments, Cancellations & Refunds",
    content: [
      "All financial transactions are processed through secure third-party payment processors. SabiDub does not store full credit card details on its servers.",
      "Refund requests are handled on a case-by-case basis but are generally only eligible if submitted within 7 days of purchase and no digital content has been accessed or downloaded.",
      "Cancellation of a subscription will stop future billing, but no prorated refunds will be issued for the remaining period of the current cycle.",
      "Failure to process a renewal payment may result in downgraded access or temporary account suspension."
    ]
  },
  {
    icon: <FaBan className="w-6 h-6" />,
    title: "5. User Conduct & Acceptable Use",
    content: [
      "You agree not to use the Platform for any purpose that is prohibited by these Terms or by law.",
      "Prohibited actions include: interfering with Platform security, using automated systems (bots) to scrape data, attempting to gain unauthorized access to other users' accounts, and uploading malicious code.",
      "Harassment, bullying, or the use of offensive language in community forums or communication channels will result in an immediate and permanent ban.",
      "You may not use the Platform's content to train external AI models or competitive educational products without written consent."
    ]
  },
  {
    icon: <FaCopyright className="w-6 h-6" />,
    title: "6. Intellectual Property Rights",
    content: [
      "All content on the Platform, including text, graphics, logos, images, video, software, and AR/VR assets, is the property of SabiDub or its licensors.",
      "SabiDub grants you a limited, non-exclusive, non-transferable license to access content for personal, non-commercial educational use only.",
      "Trademarks and branding assets of SabiDub may not be used in connection with any product or service without our express written permission.",
      "Educators who upload original lesson plans retain ownership but grant SabiDub a worldwide, royalty-free license to host and distribute the content within the Platform."
    ]
  },
  {
    icon: <FaExclamationTriangle className="w-6 h-6" />,
    title: "7. Limitations & Disclaimers",
    content: [
      "SabiDub provides its services 'as-is' and 'as-available.' We make no warranties regarding uninterrupted access or the absolute accuracy of every piece of educational content.",
      "While we target 95% system uptime, we are not liable for service interruptions caused by third-party hosting providers or regional internet penetration issues.",
      "The 'Admission Checker' is a predictive informational tool. SabiDub is NOT an admission-granting body and does NOT guarantee or offer admission into any institution. All final admission decisions rest solely with the respective schools/universities.",
      "We do not guarantee specific academic results, exam scores, or university success. Our tools are aids to, not replacements for, diligent study.",
      "In no event shall SabiDub's total liability exceed the total amount paid by the user in the six months preceding the claim."
    ]
  },
  {
    icon: <FaTrashAlt className="w-6 h-6" />,
    title: "8. Termination",
    content: [
      "We reserve the right to terminate or suspend your account at our sole discretion, without notice, for conduct that we believe violates these Terms or is harmful to other users.",
      "You may terminate your account at any time via the account settings. Upon termination, your right to use the Platform ceases immediately.",
      "Provisions of these Terms that by their nature should survive termination shall survive (e.g., intellectual property and liability limitations)."
    ]
  },
  {
    icon: <FaBalanceScale className="w-6 h-6" />,
    title: "9. Governing Law & Dispute Resolution",
    content: [
      "These Terms shall be governed and construed in accordance with the laws of the Federal Republic of Nigeria.",
      "Any dispute arising out of or in connection with these Terms shall first be attempted to be resolved through good-faith mediation.",
      "If mediation fails, the dispute shall be submitted to the exclusive jurisdiction of the state or federal courts located in Abuja, Nigeria."
    ]
  },
  {
    icon: <FaRegHandshake className="w-6 h-6" />,
    title: "10. Entire Agreement",
    content: [
      "These Terms, along with our Privacy Policy and any other legal notices published by SabiDub, constitute the entire agreement between you and SabiDub.",
      "If any provision of these Terms is deemed invalid by a court of competent jurisdiction, the invalidity of such provision shall not affect the validity of the remaining provisions.",
      "No waiver of any term shall be deemed a further or continuing waiver of such term or any other term."
    ]
  },
  {
    icon: <FaShieldAlt className="w-6 h-6" />,
    title: "11. Indemnification",
    content: [
      "You agree to defend, indemnify, and hold harmless SabiDub, its affiliates, officers, and employees from and against any claims, liabilities, damages, and expenses.",
      "This includes, without limitation, reasonable legal and accounting fees arising out of or in any way connected with your access to or use of the Platform or your violation of these Terms.",
      "Your indemnification obligation will survive the termination of your account and your use of the SabiDub platform."
    ]
  },
  {
    icon: <FaGlobe className="w-6 h-6" />,
    title: "12. Force Majeure",
    content: [
      "SabiDub shall not be liable for any failure or delay in performance due to causes beyond its reasonable control, including but not limited to acts of God, war, strikes, or labor disputes.",
      "Other factors include embargoes, government orders, power outages, massive internet failures, or any other force majeure event.",
      "In such events, our obligations under these Terms will be suspended for the duration of the event."
    ]
  }
];

export default function Terms() {
  return (
    <>
      <Head>
        <title>Terms & Conditions | SabiDub - Comprehensive Legal Framework</title>
        <meta name="description" content="View the full Terms of Service for SabiDub. Detailed information on user eligibility, subscriptions, intellectual property, and legal disclaimers." />
      </Head>

      <main className="min-h-screen bg-[#F8FAFB] relative">
        <Navbar />

        {/* Hero Section */}
        <section className="pt-32 pb-12 bg-white border-b border-gray-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#014751]/5 text-[#014751] text-xs font-bold mb-4">
                <FaGavel className="w-3.5 h-3.5" />
                Legal Framework
              </div>
              <h1 className="text-3xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight tracking-[-0.03em]">Terms & Conditions</h1>
              <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
                Version 2.0 | Effective Date: February 14, 2026. This document governs the digital relationship between you and the SabiDub platform.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-12 px-4 sm:px-6">
          <motion.div
            className="max-w-4xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagerContainer}
          >
            <motion.div variants={fadeInUp} className="prose prose-lg max-w-none mb-8 text-gray-600 leading-relaxed">
              <p className="text-justify text-sm md:text-base opacity-80">
                Please read these Terms & Conditions carefully. By using our platform, you signify your unreserved acceptance of all terms outlined herein. SabiDub provides a comprehensive educational ecosystem built on the pillars of transparency, security, and academic excellence. This agreement ensures a fair and productive environment for all students, educators, and partner institutions within our network.
              </p>
            </motion.div>

            <div className="space-y-3">
              {sections.map((section, idx) => (
                <motion.div
                  key={idx}
                  variants={fadeInUp}
                  className="bg-white p-4 md:p-5 rounded-[16px] border border-gray-100 shadow-sm transition-all group"
                >
                  <div className="flex flex-col md:flex-row items-start gap-4">
                    <div className="w-8 h-8 rounded-[10px] bg-[#014751]/5 text-[#014751] flex items-center justify-center shrink-0 transition-colors duration-300">
                      {section.icon}
                    </div>
                    <div className="flex-1">
                      <h2 className="text-lg md:text-xl font-extrabold text-gray-900 mb-3">{section.title}</h2>
                      <div className="space-y-3">
                        {section.content.map((text, tIdx) => (
                          <div key={tIdx} className="flex gap-2 text-gray-600 leading-[1.5]">
                            <span className="text-[#AFF8C8] mt-1 shrink-0">
                              <FaChevronRight className="w-2.5 h-2.5" />
                            </span>
                            <p className="text-xs md:text-sm">{text}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Contact Footer */}
            <motion.div
              variants={fadeInUp}
              className="mt-4 p-6 md:p-10 rounded-[32px] bg-[#014751] text-white text-center relative overflow-hidden shadow-2xl"
            >
              <div className="relative z-10">
                <FaEnvelope className="w-10 h-10 text-[#AFF8C8] mx-auto mb-6" />
                <h3 className="text-2xl md:text-3xl font-black mb-4">Need Legal Clarification?</h3>
                <p className="text-white/70 mb-8 max-w-xl mx-auto text-sm md:text-base">
                  Our legal and compliance team is dedicated to transparency. If any part of these terms remains unclear, please do not hesitate to reach out.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <a
                    href="mailto:isabidub@gmail.com"
                    className="inline-flex items-center justify-center gap-2 bg-[#AFF8C8] text-[#014751] px-8 py-4 rounded-xl font-black text-base transition-transform hover:scale-[1.03]"
                  >
                    Contact Legal Team
                  </a>
                </div>
              </div>

              {/* Decorative Blur */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#AFF8C8]/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2"></div>
            </motion.div>
          </motion.div>
        </section>

        <Footer />
      </main>
    </>
  );
}