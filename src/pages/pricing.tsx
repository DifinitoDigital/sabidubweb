import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Footer from "../components/Footer";
import { motion } from "framer-motion";

type SchoolType = "secondary" | "tertiary" | "management";

type PlanFeatures = {
  monthly: string;
  yearly: string;
  features: string[];
};

type SchoolPlan = {
  basic: PlanFeatures;
  premium: PlanFeatures;
};

type PricingData = {
  [key in SchoolType]: SchoolPlan;
};

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.5 },
};

const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export default function Pricing() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isYearly, setIsYearly] = useState(false);
  const [schoolType, setSchoolType] = useState<SchoolType>("secondary");
  const router = useRouter();

  useEffect(() => {
    // Check if coming from services page with management query
    if (router.query.type === "management") {
      setSchoolType("management");
    }
  }, [router.query]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const pricingData: PricingData = {
    secondary: {
      basic: {
        monthly: "₦2,500",
        yearly: "₦24,000",
        features: [
          "Access to core subjects",
          "Basic study materials",
          "Progress tracking",
        ],
      },
      premium: {
        monthly: "₦5,000",
        yearly: "₦48,000",
        features: [
          "All Basic features",
          "Advanced study materials",
          "AI-powered assistance",
          "Live tutoring sessions",
        ],
      },
    },
    tertiary: {
      basic: {
        monthly: "₦3,500",
        yearly: "₦36,000",
        features: [
          "Access to course materials",
          "Research resources",
          "Study groups",
        ],
      },
      premium: {
        monthly: "₦7,000",
        yearly: "₦72,000",
        features: [
          "All Basic features",
          "Project assistance",
          "Career guidance",
          "Industry connections",
        ],
      },
    },
    management: {
      basic: {
        monthly: "₦15,000",
        yearly: "₦150,000",
        features: [
          "Student management system",
          "Basic analytics",
          "Staff management",
        ],
      },
      premium: {
        monthly: "₦25,000",
        yearly: "₦250,000",
        features: [
          "All Basic features",
          "Advanced analytics",
          "Custom integrations",
          "Priority support",
        ],
      },
    },
  };

  const comparisonData = {
    secondary: {
      features: [
        {
          name: "Core Study Materials",
          basic: "✓",
          premium: "✓",
          enterprise: "✓",
        },
        {
          name: "Practice Tests",
          basic: "Limited",
          premium: "Unlimited",
          enterprise: "Unlimited",
        },
        {
          name: "AI Study Assistant",
          basic: "✗",
          premium: "✓",
          enterprise: "✓",
        },
        {
          name: "Live Tutoring",
          basic: "✗",
          premium: "5hrs/month",
          enterprise: "Unlimited",
        },
        {
          name: "Progress Tracking",
          basic: "Basic",
          premium: "Advanced",
          enterprise: "Custom",
        },
      ],
    },
    tertiary: {
      features: [
        {
          name: "Course Materials",
          basic: "✓",
          premium: "✓",
          enterprise: "✓",
        },
        {
          name: "Research Resources",
          basic: "Limited",
          premium: "Full Access",
          enterprise: "Full Access + API",
        },
        {
          name: "Project Assistance",
          basic: "✗",
          premium: "✓",
          enterprise: "✓",
        },
        {
          name: "Career Guidance",
          basic: "✗",
          premium: "Monthly",
          enterprise: "Weekly",
        },
        {
          name: "Industry Connections",
          basic: "✗",
          premium: "Limited",
          enterprise: "Full Access",
        },
      ],
    },
    management: {
      features: [
        {
          name: "Student Management",
          basic: "Up to 500",
          premium: "Up to 2000",
          enterprise: "Unlimited",
        },
        {
          name: "Analytics Dashboard",
          basic: "Basic",
          premium: "Advanced",
          enterprise: "Custom",
        },
        {
          name: "Staff Management",
          basic: "✓",
          premium: "✓",
          enterprise: "✓",
        },
        {
          name: "Custom Integration",
          basic: "✗",
          premium: "Limited APIs",
          enterprise: "Full API Access",
        },
        {
          name: "Support Level",
          basic: "Email",
          premium: "Priority",
          enterprise: "24/7 Dedicated",
        },
      ],
    },
  };

  return (
    <>
      <Head>
        <title>Pricing - SabiDub | Educational Excellence in Nigeria</title>
        <meta
          name="description"
          content="Choose the perfect plan for your educational journey with SabiDub. Flexible pricing options for students at all levels."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <motion.main
        initial="initial"
        animate="animate"
        className="min-h-screen bg-[#111] relative"
      >
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
              className="text-white hover:text-[#FFEDB1] transition-colors"
            >
              Pricing
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
                  className="text-white hover:text-[#FFEDB1] transition-colors py-2 border-b border-gray-800"
                  onClick={toggleMenu}
                >
                  Pricing
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

              <div className="mt-6 flex items-center justify-center space-x-4">
                <a href="#" className="text-gray-400 hover:text-[#FFEDB1]">
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-[#FFEDB1]">
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-[#FFEDB1]">
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
                  </svg>
                </a>
              </div>
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

        {/* Pricing Header */}
        <motion.section
          variants={fadeInUp}
          className="px-4 sm:px-6 pt-12 sm:pt-20 pb-8"
        >
          <motion.div
            variants={fadeInUp}
            className="max-w-7xl mx-auto text-center"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
              Simple, Transparent{" "}
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-[#FFEDB1]"
              >
                Pricing
              </motion.span>
            </h1>
            <motion.p
              variants={fadeIn}
              className="text-gray-400 max-w-2xl mx-auto mb-8"
            >
              Choose the perfect plan for your educational journey. All plans
              include access to our core features.
            </motion.p>

            {/* School Type Toggle */}
            <motion.div
              variants={staggerChildren}
              className="flex items-center justify-center gap-4 mb-8"
            >
              {[
                { type: "secondary", label: "Secondary School" },
                { type: "tertiary", label: "Tertiary Institution" },
                { type: "management", label: "School Management" },
              ].map((item) => (
                <motion.button
                  key={item.type}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSchoolType(item.type as SchoolType)}
                  className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                    schoolType === item.type
                      ? "bg-[#FFEDB1] text-black"
                      : "bg-[#1a1a1a] text-gray-400 hover:text-white"
                  }`}
                >
                  {item.label}
                </motion.button>
              ))}
            </motion.div>

            {/* Billing Toggle */}
            <motion.div
              variants={fadeInUp}
              className="flex items-center justify-center gap-6 mb-12"
            >
              <span
                className={`text-sm font-medium cursor-pointer transition-colors duration-300 ${
                  !isYearly
                    ? "text-[#FFEDB1]"
                    : "text-gray-400 hover:text-gray-300"
                }`}
                onClick={() => setIsYearly(false)}
              >
                Monthly
              </span>
              <button
                onClick={() => setIsYearly(!isYearly)}
                className={`relative inline-flex items-center h-7 rounded-full w-16 transition-colors duration-300 focus:outline-none ${
                  isYearly ? "bg-[#FFEDB1]" : "bg-gray-700"
                }`}
              >
                <span className="sr-only">Toggle Billing Period</span>
                <span
                  className={`absolute transform transition-transform duration-300 ease-in-out h-6 w-6 rounded-full bg-white shadow-md ${
                    isYearly ? "translate-x-9" : "translate-x-1"
                  }`}
                ></span>
                <span
                  className={`absolute inset-0 flex items-center justify-center text-[8px] font-bold ${
                    isYearly ? "text-black pl-1" : "text-white pr-1"
                  }`}
                >
                  {isYearly ? "ON" : "OFF"}
                </span>
              </button>
              <span
                className={`text-sm font-medium cursor-pointer transition-colors duration-300 ${
                  isYearly
                    ? "text-[#FFEDB1]"
                    : "text-gray-400 hover:text-gray-300"
                }`}
                onClick={() => setIsYearly(true)}
              >
                Yearly <span className="text-[#FFEDB1] ml-1">(Save 20%)</span>
              </span>
            </motion.div>
          </motion.div>
        </motion.section>

        {/* Pricing Plans */}
        <motion.section variants={fadeInUp} className="px-4 sm:px-6 pb-16">
          <div className="max-w-7xl mx-auto">
            <motion.div
              variants={staggerChildren}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {/* Basic Plan */}
              <motion.div
                variants={fadeInUp}
                whileHover={{ scale: 1.02 }}
                className="bg-[#1a1a1a] rounded-2xl p-8 border border-gray-800"
              >
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Basic
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Perfect for getting started
                  </p>
                </div>
                <div className="mb-6">
                  <div className="text-3xl font-bold text-white">
                    {isYearly
                      ? pricingData[schoolType].basic.yearly
                      : pricingData[schoolType].basic.monthly}
                    <span className="text-gray-400 text-sm font-normal">
                      {isYearly ? "/year" : "/month"}
                    </span>
                  </div>
                </div>
                <ul className="space-y-4 mb-8">
                  {pricingData[schoolType].basic.features.map(
                    (feature, index) => (
                      <li
                        key={index}
                        className="flex items-center text-gray-400"
                      >
                        <svg
                          className="w-5 h-5 text-[#FFEDB1] mr-3"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        {feature}
                      </li>
                    )
                  )}
                </ul>
                {schoolType === "management" && (
                  <button className="w-full bg-[#111] text-white py-3 rounded-lg hover:bg-gray-800 transition-colors">
                    Get Started
                  </button>
                )}
              </motion.div>

              {/* Premium Plan */}
              <motion.div
                variants={fadeInUp}
                whileHover={{ scale: 1.02 }}
                className="bg-[#1a1a1a] rounded-2xl p-8 border-2 border-[#FFEDB1] relative"
              >
                <div className="absolute -top-4 right-4 bg-[#FFEDB1] text-black px-4 py-1 rounded-full text-sm font-medium">
                  Popular
                </div>
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Premium
                  </h3>
                  <p className="text-gray-400 text-sm">
                    {schoolType === "management"
                      ? "Best for school administrators"
                      : "Best for serious students"}
                  </p>
                </div>
                <div className="mb-6">
                  <div className="text-3xl font-bold text-white">
                    {isYearly
                      ? pricingData[schoolType].premium.yearly
                      : pricingData[schoolType].premium.monthly}
                    <span className="text-gray-400 text-sm font-normal">
                      {isYearly ? "/year" : "/month"}
                    </span>
                  </div>
                </div>
                <ul className="space-y-4 mb-8">
                  {pricingData[schoolType].premium.features.map(
                    (feature, index) => (
                      <li
                        key={index}
                        className="flex items-center text-gray-400"
                      >
                        <svg
                          className="w-5 h-5 text-[#FFEDB1] mr-3"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        {feature}
                      </li>
                    )
                  )}
                </ul>
                {schoolType === "management" && (
                  <button className="w-full bg-[#FFEDB1] text-black py-3 rounded-lg hover:bg-[#ffdb82] transition-colors">
                    Get Premium
                  </button>
                )}
              </motion.div>

              {/* Enterprise Plan */}
              <motion.div
                variants={fadeInUp}
                whileHover={{ scale: 1.02 }}
                className="bg-[#1a1a1a] rounded-2xl p-8 border border-gray-800"
              >
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Enterprise
                  </h3>
                  <p className="text-gray-400 text-sm">
                    For large institutions
                  </p>
                </div>
                <div className="mb-6">
                  <div className="text-3xl font-bold text-white">Custom</div>
                  <p className="text-gray-400 text-sm">Contact for pricing</p>
                </div>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center text-gray-400">
                    <svg
                      className="w-5 h-5 text-[#FFEDB1] mr-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    All Premium features
                  </li>
                  <li className="flex items-center text-gray-400">
                    <svg
                      className="w-5 h-5 text-[#FFEDB1] mr-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Custom integration
                  </li>
                  <li className="flex items-center text-gray-400">
                    <svg
                      className="w-5 h-5 text-[#FFEDB1] mr-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Dedicated support
                  </li>
                  <li className="flex items-center text-gray-400">
                    <svg
                      className="w-5 h-5 text-[#FFEDB1] mr-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Analytics dashboard
                  </li>
                </ul>
                {schoolType === "management" && (
                  <button className="w-full bg-[#111] text-white py-3 rounded-lg hover:bg-gray-800 transition-colors">
                    Contact Sales
                  </button>
                )}
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        {/* Comparison Table */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="px-4 sm:px-6 py-16"
        >
          <div className="max-w-7xl mx-auto">
            <motion.h2
              variants={fadeInUp}
              className="text-2xl font-bold text-white text-center mb-12"
            >
              Feature Comparison
            </motion.h2>
            <motion.div variants={fadeInUp} className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-800">
                    <th className="text-left py-4 px-4 text-gray-400 font-medium">
                      Features
                    </th>
                    <th className="text-center py-4 px-4 text-gray-400 font-medium">
                      Basic
                    </th>
                    <th className="text-center py-4 px-4 text-[#FFEDB1] font-medium">
                      Premium
                    </th>
                    <th className="text-center py-4 px-4 text-gray-400 font-medium">
                      Enterprise
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData[schoolType].features.map((feature, index) => (
                    <tr key={index} className="border-b border-gray-800">
                      <td className="py-4 px-4 text-white">{feature.name}</td>
                      <td className="text-center py-4 px-4 text-gray-400">
                        {feature.basic}
                      </td>
                      <td className="text-center py-4 px-4 text-[#FFEDB1]">
                        {feature.premium}
                      </td>
                      <td className="text-center py-4 px-4 text-gray-400">
                        {feature.enterprise}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          </div>
        </motion.section>

        {/* Usage Statistics */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="px-4 sm:px-6 py-16 bg-[#0d0d0d]"
        >
          <div className="max-w-7xl mx-auto">
            <motion.div
              variants={staggerChildren}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {/* User Growth Chart */}
              <motion.div
                variants={fadeInUp}
                whileHover={{ scale: 1.02 }}
                className="bg-[#1a1a1a] p-6 rounded-xl"
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-white font-semibold">User Growth</h3>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-[#FFEDB1]"></span>
                      <span className="text-sm text-gray-400">
                        Active Users
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-[#4CAF50]"></span>
                      <span className="text-sm text-gray-400">Growth Rate</span>
                    </div>
                  </div>
                </div>
                <div className="h-64 relative">
                  {/* Line Graph */}
                  <svg className="w-full h-full" style={{ padding: "20px 0" }}>
                    <defs>
                      <linearGradient
                        id="lineGradient"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="0%"
                          stopColor="#FFEDB1"
                          stopOpacity="0.2"
                        />
                        <stop
                          offset="100%"
                          stopColor="#FFEDB1"
                          stopOpacity="0"
                        />
                      </linearGradient>
                    </defs>
                    {/* Area under the line */}
                    <path
                      d={`M40,180 C100,160 160,120 220,100 C280,80 340,60 400,40 L400,220 L40,220 Z`}
                      fill="url(#lineGradient)"
                    />
                    {/* Main line */}
                    <path
                      d={`M40,180 C100,160 160,120 220,100 C280,80 340,60 400,40`}
                      fill="none"
                      stroke="#FFEDB1"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                    {/* Growth rate line */}
                    <path
                      d={`M40,160 C100,140 160,130 220,90 C280,70 340,50 400,30`}
                      fill="none"
                      stroke="#4CAF50"
                      strokeWidth="2"
                      strokeDasharray="5,5"
                    />
                    {/* Data points */}
                    {[
                      { x: 40, y: 180 },
                      { x: 160, y: 120 },
                      { x: 280, y: 80 },
                      { x: 400, y: 40 },
                    ].map((point, index) => (
                      <g key={index}>
                        <circle
                          cx={point.x}
                          cy={point.y}
                          r="6"
                          fill="#1a1a1a"
                          stroke="#FFEDB1"
                          strokeWidth="3"
                        />
                        <circle
                          cx={point.x}
                          cy={point.y - 20}
                          r="4"
                          fill="#1a1a1a"
                          stroke="#4CAF50"
                          strokeWidth="2"
                        />
                      </g>
                    ))}
                  </svg>

                  {/* Y-axis */}
                  <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-400 -ml-6">
                    <span>50K</span>
                    <span>37.5K</span>
                    <span>25K</span>
                    <span>12.5K</span>
                    <span>0</span>
                  </div>

                  {/* X-axis */}
                  <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-400 px-8">
                    <span>Q1</span>
                    <span>Q2</span>
                    <span>Q3</span>
                    <span>Q4</span>
                  </div>
                </div>
              </motion.div>

              {/* Usage Analytics */}
              <motion.div
                variants={fadeInUp}
                whileHover={{ scale: 1.02 }}
                className="bg-[#1a1a1a] p-6 rounded-xl"
              >
                <h3 className="text-white font-semibold mb-6">
                  Usage Analytics
                </h3>
                <motion.div variants={staggerChildren} className="space-y-4">
                  {[
                    { label: "Study Time", value: "85%" },
                    { label: "Practice Tests", value: "92%" },
                    { label: "Resource Access", value: "78%" },
                  ].map((stat, index) => (
                    <motion.div key={index} variants={fadeInUp}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-400">
                          {stat.label}
                        </span>
                        <span className="text-sm text-[#FFEDB1]">
                          {stat.value}
                        </span>
                      </div>
                      <motion.div
                        className="h-2 bg-gray-800 rounded-full overflow-hidden"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: index * 0.2 }}
                      >
                        <div
                          className="h-full bg-[#FFEDB1] rounded-full"
                          style={{ width: stat.value }}
                        ></div>
                      </motion.div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        <Footer />
      </motion.main>
    </>
  );
}
