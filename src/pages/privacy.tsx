import Head from "next/head";
import { useState } from "react";
import {
  FaShieldAlt,
  FaUserLock,
  FaDatabase,
  FaShareAlt,
  FaServer,
  FaUserEdit,
  FaChild,
  FaGlobeAfrica,
  FaBell,
  FaEnvelope,
  FaChevronRight,
  FaFileContract,
  FaSearchPlus,
  FaBiohazard,
  FaCookie,
  FaTools,
  FaHistory
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
    icon: <FaShieldAlt className="w-6 h-6" />,
    title: "Government Data & Official Disclaimer",
    content: [
      "SabiDub provides educational guidance independently and is NOT representative of any government entity. We do not provide official government services or representative administrative functions.",
      "We strictly source government-related academic data from official domain sources (.gov.ng) to ensure accuracy, but we do not claim ownership or official endorsement from these entities (e.g. JAMB, WAEC).",
      "User progress data on SabiDub is used solely for educational optimization and is not shared with government examination bodies for official record purposes unless explicitly mandated by law."
    ]
  },
  {
    icon: <FaShieldAlt className="w-6 h-6" />,
    title: "1. Privacy Commitment",
    content: [
      "At SabiDub, we recognize that privacy is a fundamental human right. Our commitment is to manage your data with the highest degree of transparency, integrity, and security.",
      "This Privacy Policy describes our practices regarding the collection, use, orchestration, and disclosure of your information when you use our web platform and mobile applications.",
      "By using the SabiDub platform, you expressly consent to the data practices outlined in this Policy, which is built to exceed Nigeria Data Protection Regulation (NDPR) standards."
    ]
  },
  {
    icon: <FaDatabase className="w-6 h-6" />,
    title: "2. Comprehensive Information Collection",
    content: [
      "Identity Data: We collect your full name, email address, age range, school/institution affiliation, and professional teacher credentials (where applicable).",
      "Educational Analytics: We track performance metrics, including module completion rates, quiz scores, simulation engagement levels, and AI tutor interaction logs.",
      "Technical Metadata: This includes IP addresses, unique device identifiers, browser types, operating system versions, and generalized geolocation data to optimize server performance.",
      "Financial Data: Payments for SabiDub Premium are handled by PCI-DSS compliant processors; we do not store full payment card numbers on our infrastructure."
    ]
  },
  {
    icon: <FaTools className="w-6 h-6" />,
    title: "3. Strategic Data Utilization",
    content: [
      "Personalization Engine: We use your learning history to dynamically adjust learning paths and difficulty levels through our adaptive learning algorithms.",
      "Operational Excellence: Data is used to troubleshoot technical issues, detect fraudulent activity, and ensure 95% platform uptime through resource optimization.",
      "Direct Communication: We use contact info to send critical system alerts, subscription status updates, and strictly opt-in educational newsletters.",
      "AR/VR Optimization: Usage data helps us refine the performance of immersive AR/VR simulations for diverse device hardware specifications."
    ]
  },
  {
    icon: <FaShareAlt className="w-6 h-6" />,
    title: "4. Information Disclosure Protocols",
    content: [
      "No Data Sales: SabiDub has a strict policy against selling, renting, or trading your personal identification data to third-party marketers.",
      "Authorized Third Parties: We may share data with cloud providers (e.g., Microsoft Azure), payment gateways, and essential analytics tools under strict non-disclosure agreements.",
      "Institutional Transparency: If your account is part of a school-wide license, your designated educators and administrators will have access to your academic performance data.",
      "Legal Mandates: We will disclose personal information only when legally compelled by Nigerian authorities to comply with judicial proceedings or law enforcement requests."
    ]
  },
  {
    icon: <FaServer className="w-6 h-6" />,
    title: "5. Security & Global Data Governance",
    content: [
      "Advanced Encryption: All data in transit is protected via industry-standard TLS encryption, and sensitive data at rest is secured using AES-256 protocols.",
      "Cloud Infrastructure: Our data is hosted on geographically redundant, secure cloud servers featuring physical access controls and multi-factor authentication.",
      "International Transfers: As SabiDub expands across Africa, your data may be processed on servers located outside Nigeria, always adhering to robust international data protection standards.",
      "Breach Response: In the unlikely event of a data breach, SabiDub maintains a 24-hour notification protocol for both users and regulatory bodies."
    ]
  },
  {
    icon: <FaCookie className="w-6 h-6" />,
    title: "6. Cookie & Tracking Technologies",
    content: [
      "We use 'cookies' and similar tracking pixels to enhance user session persistence and gather anonymized behavioral patterns.",
      "Essential Cookies: Required for platform functionality such as staying logged in and processing cart transactions.",
      "Performance Cookies: Help us understand which modules are most effective and where users experience friction.",
      "You can manage your cookie preferences through your browser settings, though disabling them may limit the functionality of certain interactive features."
    ]
  },
  {
    icon: <FaUserEdit className="w-6 h-6" />,
    title: "7. User Empowerment & Rights",
    content: [
      "Right to Rectification: You have the right to update or correct any inaccuracies in your personal profile through the account settings dashboard.",
      "Right to Erasure ('Right to be Forgotten'): You may request the permanent deletion of your account and all associated data, subject to legal retention requirements.",
      "Data Portability: Upon request, we can provide your academic and performance records in a structured, machine-readable format.",
      "Consent Withdrawal: You may withdraw consent for data processing at any time, noting that this may result in the termination of service access."
    ]
  },
  {
    icon: <FaChild className="w-6 h-6" />,
    title: "8. Protection of Minor Learners",
    content: [
      "SabiDub implements specifically heightened privacy controls for users categorized as secondary school students (under 18).",
      "We do not knowingly allow account creation for users under 11 without direct school administration or parental supervision.",
      "We encourage parents to take an active role in their children's digital education and to monitor their interactions within the learning ecosystem."
    ]
  },
  {
    icon: <FaHistory className="w-6 h-6" />,
    title: "9. Policy Iterations",
    content: [
      "We reserve the right to modify this Privacy Policy to reflect evolving educational technology and changing regulatory landscapes.",
      "Significant modifications will be communicated via the email address linked to your account and through prominent on-platform notifications.",
      "The 'Effective Date' at the top of this document indicates when the latest version took force."
    ]
  },
  {
    icon: <FaServer className="w-6 h-6" />,
    title: "10. Data Storage & Residency",
    content: [
      "Your data is stored securely on cloud-based infrastructure provided by industry leaders like Microsoft Azure and Amazon Web Services.",
      "While we prioritize storage within Africa to minimize latency, your data may be replicated globally for disaster recovery and high availability.",
      "We strictly follow standard data residency protocols to ensure that your information remains under the protection of robust legal frameworks regardless of its physical location."
    ]
  },
  {
    icon: <FaGlobeAfrica className="w-6 h-6" />,
    title: "11. Third-Party Links & Integrations",
    content: [
      "Our Platform may contain links to external educational resources, partner schools, or telecom providers (e.g., MTN, Airtel).",
      "SabiDub does not control and is not responsible for the privacy practices or the content of these external third-party sites.",
      "We encourage you to review the privacy policies of any third-party service before providing them with your personal information."
    ]
  }
];

export default function Privacy() {
  return (
    <>
      <Head>
        <title>Privacy Policy | SabiDub - Digital Data Security</title>
        <meta name="description" content="Read SabiDub's comprehensive Privacy Policy. Learn how we secure student data, handle educational analytics, and protect your digital rights." />
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
                <FaShieldAlt className="w-3.5 h-3.5" />
                Data Protection Office
              </div>
              <h1 className="text-3xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight tracking-[-0.03em]">Privacy Policy</h1>
              <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
                Version 3.1 | Effective Date: February 14, 2026. This policy establishes the standard of care we apply to your personal and academic information.
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
            <motion.div variants={fadeInUp} className="prose prose-lg max-w-none mb-8 text-gray-600 leading-relaxed text-justify">
              <p className="text-sm md:text-base opacity-80">
                Your privacy is paramount. This document serves as a standard agreement between you and SabiDub regarding your digital footprint. We operate on a &apos;Privacy by Design&apos; principle, ensuring that data protection is integrated into every line of code and every educational feature we offer. Whether you are a student exploring AR/VR simulations or an educator managing lesson plans, your information is shielded by world-class security protocols.
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
                <h3 className="text-2xl md:text-3xl font-black mb-4">Privacy Concierge</h3>
                <p className="text-white/70 mb-8 max-w-xl mx-auto text-sm md:text-base">
                  Exercising your digital rights should be easy. Our dedicated Data Protection Office (DPO) is here to assist with any information requests or privacy concerns.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <a
                    href="mailto:isabidub@gmail.com"
                    className="inline-flex items-center justify-center gap-2 bg-[#AFF8C8] text-[#014751] px-8 py-4 rounded-xl font-black text-base transition-transform hover:scale-[1.03]"
                  >
                    Contact DPO Team
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