import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import {
  FaMagnifyingGlass as FaSearch,
  FaBookOpen,
  FaUserPlus,
  FaCreditCard,
  FaShieldHalved as FaShieldAlt,
  FaRegCommentDots,
  FaCircleQuestion as FaQuestionCircle,
  FaChevronDown,
  FaDesktop,
  FaGlobe,
  FaLifeRing
} from "react-icons/fa6";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { motion, AnimatePresence } from "framer-motion";

const categories = [
  {
    icon: <FaUserPlus className="w-6 h-6" />,
    title: "Account & Onboarding",
    description: "Learn how to set up your account, verify your identity, and get started.",
    links: ["Create Account", "Login Issues", "Security Settings"]
  },
  {
    icon: <FaCreditCard className="w-6 h-6" />,
    title: "Subscription & Billing",
    description: "Understand our flexible pricing plans, billing cycles, and payments.",
    links: ["Pricing Plans", "Payment Methods", "Refund Policy"]
  },
  {
    icon: <FaBookOpen className="w-6 h-6" />,
    title: "Learning Resources",
    description: "Discover how to access modules, take exams, and track your progress.",
    links: ["Subject Modules", "Exam Prep", "Progress Reports"]
  },
  {
    icon: <FaShieldAlt className="w-6 h-6" />,
    title: "Premium Features",
    description: "Explore AR/VR simulations, AI assistance, and advanced analytics.",
    links: ["AI Tutor", "AR/VR Setup", "Performance Insights"]
  },
  {
    icon: <FaDesktop className="w-6 h-6" />,
    title: "Platform Support",
    description: "Troubleshoot technical issues across web and mobile platforms.",
    links: ["App Download", "Offline Mode", "Technical Errors"]
  },
  {
    icon: <FaGlobe className="w-6 h-6" />,
    title: "Partnerships",
    description: "Information for institutions, NGOs, and telecom partners.",
    links: ["Institutional Plans", "Telecom Bundles", "SabiDub Ambassadors"]
  }
];

const faqs = [
  {
    question: "How do I access SabiDub offline?",
    answer: "Our Basic Plan and above include an offline mode. You can download specific learning modules while connected to the internet and access them anytime without data."
  },
  {
    question: "Which devices are supported?",
    answer: "SabiDub is fully functional on standard smartphones, tablets, and desktops via our web platform and dedicated mobile apps."
  },
  {
    question: "What happens if I have payment issues?",
    answer: "All payments are processed securely. If you experience any issues, please contact our support team at isabidub@gmail.com with your transaction reference."
  },
  {
    question: "Are there discounts for institutions?",
    answer: "Yes, we offer competitive bulk pricing for schools and institutions. Contact our partnership team for a custom quote tailored to your student body size."
  }
];

export default function Help() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  return (
    <>
      <Head>
        <title>Help Center | SabiDub - Educational Excellence in Nigeria</title>
        <meta name="description" content="Get professional support and explore our resources to maximize your SabiDub experience." />
      </Head>

      <main className="min-h-screen bg-white relative">
        <Navbar />

        {/* Hero Search Section */}
        <section className="pt-32 pb-16 bg-[#014751] text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
            <motion.div
              initial="initial"
              animate="animate"
              variants={fadeInUp}
            >
              <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">How can we help you?</h1>
              <p className="text-white/70 text-lg mb-12 max-w-2xl mx-auto">
                Search our knowledge base or browse categories below to find answers to your questions.
              </p>

              <div className="max-w-2xl mx-auto relative group">
                <FaSearch className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#014751] transition-colors" />
                <input
                  type="text"
                  placeholder="Search for articles, guides, and more..."
                  className="w-full bg-white text-gray-900 py-5 pl-16 pr-6 rounded-2xl border-none focus:ring-4 focus:ring-[#AFF8C8]/30 transition-all text-lg"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Categories Grid */}
        <section className="py-24 px-4 sm:px-6 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-8 rounded-[32px] bg-[#F8F9FA] border border-gray-100 hover:border-[#014751]/40 transition-all group"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#014751]/10 text-[#014751] flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#014751] group-hover:text-white transition-all">
                  {category.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{category.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-6">
                  {category.description}
                </p>
                <div className="space-y-3">
                  {category.links.map((link, lIdx) => (
                    <Link key={lIdx} href="#" className="flex items-center gap-2 text-sm font-bold text-[#014751] hover:underline">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#014751]/30"></span>
                      {link}
                    </Link>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Featured FAQ Section */}
        <section className="py-24 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 tracking-tight">Popular Questions</h2>
              <p className="text-gray-500">Quick answers to our most frequently asked questions.</p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-gray-100 overflow-hidden"
                >
                  <button
                    onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                    className="w-full p-6 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-bold text-gray-900">{faq.question}</span>
                    <FaChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${activeFaq === idx ? 'rotate-180' : 'rotate-0'}`} />
                  </button>
                  <AnimatePresence>
                    {activeFaq === idx && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="px-6 pb-6 overflow-hidden"
                      >
                        <p className="text-gray-600 text-sm leading-relaxed border-t border-gray-50 pt-4">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Support CTA */}
        <section className="py-24 px-4 sm:px-6 max-w-7xl mx-auto">
          <div className="bg-[#014751] rounded-[48px] p-8 md:p-16 relative overflow-hidden flex flex-col items-center text-center">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#AFF8C8]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#AFF8C8]/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

            <FaLifeRing className="w-16 h-16 text-[#AFF8C8] mb-8" />
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6">Still need help?</h2>
            <p className="text-white/70 max-w-xl mb-12 text-lg">
              Our dedicated support team is available to assist you with any questions or technical difficulties.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 w-full max-w-lg">
              <a href="mailto:isabidub@gmail.com" className="flex-1 bg-white text-[#014751] py-4 px-8 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-[#AFF8C8] transition-all">
                <FaRegCommentDots className="w-5 h-5" />
                Email Support
              </a>
              <a href="tel:+2348109117784" className="flex-1 bg-white/10 backdrop-blur-md text-white border border-white/20 py-4 px-8 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-white/20 transition-all">
                <FaQuestionCircle className="w-5 h-5" />
                Call Center
              </a>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}