// Example: How to use the API URL for email verification in React
//
// const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:4000';
// fetch(`${apiUrl}/auth/verify-school-email?email=${email}&token=${token}`)
//   .then(res => res.json())
//   .then(data => {
//     // handle response
//   });

import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import axios from "axios";
import { LuZap, LuCheck, LuSearch } from "react-icons/lu";

type SchoolType = "secondary" | "tertiary" | "management" | "admission";

// Map SchoolType to API planType
const planTypeMap = {
  secondary: "SECONDARY",
  tertiary: "TERTIARY",
  management: "SCHOOL",
  admission: "ADMISSION_CHECKER"
};

interface SubscriptionFeature {
  id: string;
  name: string;
  description?: string;
}

interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  billingCycle: string;
  duration: number;
  features: SubscriptionFeature[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  planType: string;
  usageLimit: number | null;
  hasUnlimitedAccess: boolean;
  isPopular: boolean;
  isRecommended: boolean;
  billingPeriod: number;
}

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
  const [subscriptionPlans, setSubscriptionPlans] = useState<SubscriptionPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();
  const [selectedPlan1, setSelectedPlan1] = useState<string>('');
  const [selectedPlan2, setSelectedPlan2] = useState<string>('');
  const [showDetailedComparison, setShowDetailedComparison] = useState<boolean>(false);
  const [usageFilter, setUsageFilter] = useState<string>('all');

  interface ComparisonResult {
    plan1Name: string;
    plan2Name: string;
    plan1Price: number;
    plan2Price: number;
    priceDifference: number;
    uniqueToPlan1: string[];
    uniqueToPlan2: string[];
    commonFeatures: string[];
    plan1TotalFeatures: number;
    plan2TotalFeatures: number;
  }

  const [comparisonResult, setComparisonResult] = useState<ComparisonResult | null>(null);

  useEffect(() => {
    // Check if coming from services page with management query
    if (router.query.type === "management") {
      setSchoolType("management");
    }
  }, [router.query]);

  useEffect(() => {
    // Fetch subscription plans from API without filtering by planType
    const fetchSubscriptionPlans = async () => {
      try {
        setLoading(true);
        // Remove the planType parameter to fetch all plans
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || process.env.API_URL || '';
        const response = await axios.get(`${baseUrl}/subscription/plans`);
        setSubscriptionPlans(response.data);
        setError("");
      } catch (err) {
        console.error("Error fetching subscription plans:", err);
        setError("Failed to load subscription plans");
      } finally {
        setLoading(false);
      }
    };

    fetchSubscriptionPlans();
  }, []); // No need to re-fetch when school type changes since we're filtering client-side

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Filter plans client-side based on billing cycle, school type, and usage limit
  let filteredPlans = subscriptionPlans.filter(plan => {
    // console.debug("Filtering plan:", plan.name, plan);

    const billingMatch = schoolType === "admission" ? true : (isYearly ? plan.billingCycle === "YEARLY" : plan.billingCycle === "MONTHLY");
    const schoolTypeMatch = plan.planType === planTypeMap[schoolType];

    const result = billingMatch && schoolTypeMatch;
    return result;
  });

  // If no plans match the school type filter, show all plans for that billing cycle
  if (filteredPlans.length === 0) {
    // console.debug("No plans match school type filter, showing all plans for billing cycle");
    filteredPlans = subscriptionPlans.filter(plan => {
      const billingMatch = isYearly ? plan.billingCycle === "YEARLY" : plan.billingCycle === "MONTHLY";



      return billingMatch;
    });
  }

  // Get all plans and sort by price (highest to lowest)
  const allPlans = filteredPlans.sort((a, b) => b.price - a.price);

  // Helper to format price
  const formatPrice = (price: number) => {
    return `₦${price.toLocaleString()}`;
  };

  const compareSpecificPlans = () => {
    if (!selectedPlan1 || !selectedPlan2) {
      setError('Please select two plans to compare');
      return;
    }

    const plan1 = allPlans.find(p => p.id === selectedPlan1);
    const plan2 = allPlans.find(p => p.id === selectedPlan2);

    if (!plan1 || !plan2) {
      setError('Invalid plan selection');
      return;
    }

    const features1 = plan1.features.map(f => typeof f === 'string' ? f : f.name);
    const features2 = plan2.features.map(f => typeof f === 'string' ? f : f.name);

    const uniqueToFirst = features1.filter(f => !features2.includes(f));
    const uniqueToSecond = features2.filter(f => !features1.includes(f));
    const commonFeatures = features1.filter(f => features2.includes(f));

    setComparisonResult({
      plan1Name: plan1.name,
      plan2Name: plan2.name,
      plan1Price: plan1.price,
      plan2Price: plan2.price,
      priceDifference: Math.abs(plan1.price - plan2.price),
      uniqueToPlan1: uniqueToFirst,
      uniqueToPlan2: uniqueToSecond,
      commonFeatures,
      plan1TotalFeatures: features1.length,
      plan2TotalFeatures: features2.length
    });

    setError("");
  };

  useEffect(() => {
    if (selectedPlan1 && selectedPlan2) {
      compareSpecificPlans();
    }
  }, [selectedPlan1, selectedPlan2, allPlans]);

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
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </Head>

      <style jsx global>{`
        body {
          font-family: 'Outfit', sans-serif;
        }
      `}</style>

      <motion.main
        initial="initial"
        animate="animate"
        className="min-h-screen bg-white relative"
      >
        {/* Navigation */}
        <nav className="px-4 sm:px-6 py-6 sm:py-8 flex items-center justify-between max-w-7xl mx-auto relative z-50">
          <Link href="/" className="flex items-center">
            <div className="relative w-40 h-12">
              <Image
                src="/images/black.png"
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
              className="text-gray-600 hover:text-yellow-600 transition-colors"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-gray-600 hover:text-yellow-600 transition-colors"
            >
              About
            </Link>
            <Link
              href="/services"
              className="text-gray-600 hover:text-yellow-600 transition-colors"
            >
              Services
            </Link>
            <Link
              href="/pricing"
              className="text-gray-900 hover:text-yellow-600 transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="/admission-checker"
              className="text-gray-600 hover:text-yellow-600 transition-colors"
            >
              Admission Checker
            </Link>
            <Link
              href="/contact"
              className="text-gray-600 hover:text-yellow-600 transition-colors"
            >
              Contact
            </Link>
            <button className="bg-yellow-400 text-black px-4 py-2 rounded-md font-medium hover:bg-[#ffdb82] transition-colors">
              Download App
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden flex flex-col items-center justify-center w-10 h-10 bg-white border border-gray-100 shadow-sm rounded-lg hover:bg-gray-50 transition-colors relative z-50"
          >
            <span
              className={`w-5 h-0.5 bg-white mb-1 transition-transform ${isMenuOpen ? "rotate-45 translate-y-1.5" : ""
                }`}
            ></span>
            <span
              className={`w-5 h-0.5 bg-white transition-opacity ${isMenuOpen ? "opacity-0" : ""
                }`}
            ></span>
            <span
              className={`w-5 h-0.5 bg-white mt-1 transition-transform ${isMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
                }`}
            ></span>
          </button>
        </nav>

        {/* Mobile Menu */}
        <div
          className={`md:hidden fixed top-0 right-0 w-full sm:w-80 h-full bg-white border border-gray-100 shadow-sm z-40 transform transition-transform duration-300 ease-in-out ${isMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
        >
          <div className="p-6 h-full overflow-y-auto">
            <div className="flex flex-col space-y-6">
              <div className="flex items-center justify-end mb-8">
                <button
                  onClick={toggleMenu}
                  className="text-gray-600 hover:text-gray-900"
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
                  className="text-gray-600 hover:text-yellow-600 transition-colors py-2 border-b border-gray-200"
                  onClick={toggleMenu}
                >
                  Home
                </Link>
                <Link
                  href="/about"
                  className="text-gray-600 hover:text-yellow-600 transition-colors py-2 border-b border-gray-200"
                  onClick={toggleMenu}
                >
                  About
                </Link>
                <Link
                  href="/services"
                  className="text-gray-600 hover:text-yellow-600 transition-colors py-2 border-b border-gray-200"
                  onClick={toggleMenu}
                >
                  Services
                </Link>
                <Link
                  href="/pricing"
                  className="text-gray-900 hover:text-yellow-600 transition-colors py-2 border-b border-gray-200"
                  onClick={toggleMenu}
                >
                  Pricing
                </Link>
                <Link
                  href="/admission-checker"
                  className="text-gray-600 hover:text-yellow-600 transition-colors py-2 border-b border-gray-200"
                  onClick={toggleMenu}
                >
                  Admission Checker
                </Link>
                <Link
                  href="/contact"
                  className="text-gray-600 hover:text-yellow-600 transition-colors py-2 border-b border-gray-200"
                  onClick={toggleMenu}
                >
                  Contact
                </Link>
              </div>

              <button className="w-full bg-yellow-400 text-black px-4 py-3 rounded-md font-medium hover:bg-[#ffdb82] transition-colors">
                Download App
              </button>

              <div className="mt-6 flex items-center justify-center space-x-4">
                <a href="#" className="text-gray-600 hover:text-yellow-600">
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-600 hover:text-yellow-600">
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-600 hover:text-yellow-600">
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
          className="px-4 sm:px-6 pt-16 pb-8"
        >
          <motion.div
            variants={fadeInUp}
            className="max-w-6xl mx-auto"
          >
            <div className="flex flex-col md:flex-row items-start justify-between gap-6 mb-10">
              <div className="text-left">
                <h1 className="text-4xl md:text-6xl font-black text-gray-900 leading-[1.1] tracking-tight">
                  We've got a plan <br />
                  <span className="italic font-light">that's perfect for you</span>
                </h1>
              </div>

              <div className="flex flex-col items-start md:items-end">
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex items-center -space-x-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 overflow-hidden relative">
                        <img
                          src={`https://i.pravatar.cc/150?u=${i}`}
                          alt="User"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center">
                    <div className="flex text-black text-[10px] mr-1">
                      {"★★★★★".split("").map((s, i) => <span key={i}>{s}</span>)}
                    </div>
                    <span className="text-sm font-bold text-gray-900">5.0</span>
                  </div>
                </div>
                <p className="text-[10px] text-gray-500 font-bold tracking-tight uppercase">
                  FROM 4,000+ REVIEWS
                </p>
              </div>
            </div>

            {/* Billing && School Type Toggles */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
              <div className="flex items-center p-1 bg-gray-100 rounded-lg w-fit">
                <button
                  onClick={() => setIsYearly(false)}
                  className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all duration-200 ${!isYearly ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setIsYearly(true)}
                  className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all duration-200 ${isYearly ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
                >
                  Annual
                </button>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-2 py-1 bg-yellow-400 text-gray-900 text-[10px] rounded-md font-bold">
                  Save 16%
                </span>

                <div className="h-4 w-[1px] bg-gray-200 mx-2 hidden sm:block" />

                <div className="flex items-center gap-1.5">
                  {(["secondary", "tertiary", "management", "admission"] as SchoolType[]).map((type) => (
                    <button
                      key={type}
                      onClick={() => setSchoolType(type)}
                      className={`px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-tight transition-all ${schoolType === type ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-500 hover:bg-gray-100"}`}
                    >
                      {type === "management" ? "School" : type}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* Pricing Plans */}
        <motion.section variants={fadeInUp} className="px-4 sm:px-6 pb-16">
          <div className="max-w-7xl mx-auto">
            {loading ? (
              <div className="text-center text-gray-900 py-12">Loading subscription plans...</div>
            ) : error ? (
              <div className="text-center text-red-500 py-12">{error}</div>
            ) : (
              <motion.div
                variants={staggerChildren}
                className="grid grid-cols-1 md:grid-cols-3 gap-8"
              >
                {allPlans.map((plan, index) => (
                  <motion.div
                    key={`plan-${plan.id}`}
                    variants={fadeInUp}
                    className="flex flex-col bg-white border border-gray-200 rounded-[2rem] overflow-hidden"
                  >
                    {/* Upper Section (Gray) */}
                    <div className="p-7 bg-gray-50 border-b border-gray-100">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-black text-gray-900 tracking-tight">
                          {plan.name}
                        </h3>
                        {plan.isPopular && (
                          <span className="px-3 py-1 bg-yellow-400 text-black text-[9px] font-black rounded-lg uppercase tracking-tight shadow-sm">
                            Popular
                          </span>
                        )}
                      </div>

                      <div className="mb-6">
                        <div className="flex items-baseline gap-2">
                          <span className="text-5xl font-black text-gray-900 tracking-tighter">₦{plan.price.toLocaleString()}</span>
                          <div className="text-[10px] font-black text-gray-400 uppercase leading-none">
                            per user<br />per {isYearly ? "year" : "month"}
                          </div>
                        </div>
                        <p className="text-xs text-gray-500 mt-5 font-bold leading-relaxed max-w-[200px]">
                          {plan.description}
                        </p>
                      </div>

                      <button className="w-full py-3.5 bg-black hover:bg-gray-800 text-white rounded-xl text-[11px] font-black uppercase tracking-widest transition-all shadow-xl shadow-gray-200">
                        Get started
                      </button>
                    </div>

                    {/* Lower Section (White) */}
                    <div className="p-7 pt-6 flex-1 flex flex-col">
                      <div className="mb-5">
                        <span className="text-[9px] font-black text-gray-900 uppercase tracking-widest">Features</span>
                        <p className="text-[11px] text-gray-400 font-bold mt-1">
                          Everything in our {index === 0 ? "free plan" : "Basic plus"}...
                        </p>
                      </div>

                      <ul className="space-y-3.5">
                        {(plan.features || []).map((feature, idx) => (
                          <li
                            key={idx}
                            className="flex items-center text-xs font-bold text-gray-700"
                          >
                            <div className="w-4 h-4 rounded-full bg-yellow-400 flex items-center justify-center mr-2.5 flex-shrink-0">
                              <LuCheck className="w-2.5 h-2.5 text-black stroke-[4]" />
                            </div>
                            {typeof feature === 'string' ? feature : feature?.name || 'Unknown feature'}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                ))}

                {/* Enterprise Plan - Only show for management type */}
                {schoolType === "management" && (
                  <motion.div
                    key="enterprise-plan"
                    variants={fadeInUp}
                    className="flex flex-col bg-white border border-gray-200 rounded-[2rem] overflow-hidden"
                  >
                    {/* Upper Section (Gray) */}
                    <div className="p-7 bg-gray-50 border-b border-gray-100">
                      <div className="mb-5">
                        <h3 className="text-xl font-black text-gray-900 tracking-tight">
                          Enterprise
                        </h3>
                      </div>

                      <div className="mb-6">
                        <div className="flex items-baseline gap-2">
                          <span className="text-4xl font-black text-gray-900 tracking-tighter">Custom</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-5 font-bold leading-relaxed max-w-[200px]">
                          Tailored solutions for large-scale educational institutions.
                        </p>
                      </div>

                      <button className="w-full py-3.5 bg-black hover:bg-gray-800 text-white rounded-xl text-[11px] font-black uppercase tracking-widest transition-all shadow-xl shadow-gray-200">
                        Contact Sales
                      </button>
                    </div>

                    {/* Lower Section (White) */}
                    <div className="p-7 pt-6 flex-1 flex flex-col">
                      <div className="mb-5">
                        <span className="text-[9px] font-black text-gray-900 uppercase tracking-widest">Enterprise Features</span>
                        <p className="text-[11px] text-gray-400 font-bold mt-1">
                          Everything in Premium plus...
                        </p>
                      </div>

                      <ul className="space-y-3.5">
                        {["Single Sign-On (SSO)", "Dedicated Support", "Custom Analytics", "API Access"].map((feature, idx) => (
                          <li
                            key={idx}
                            className="flex items-center text-xs font-bold text-gray-700"
                          >
                            <div className="w-4 h-4 rounded-full bg-yellow-400 flex items-center justify-center mr-2.5 flex-shrink-0">
                              <LuCheck className="w-2.5 h-2.5 text-black stroke-[4]" />
                            </div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}
          </div>
        </motion.section >

        {/* Detailed Plan Comparison */}
        < motion.section
          initial={{ opacity: 0 }
          }
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="px-4 sm:px-6 py-16 bg-gray-50"
        >
          <div className="max-w-7xl mx-auto">
            <motion.h2
              variants={fadeInUp}
              className="text-2xl font-bold text-gray-900 text-center mb-8"
            >
              Plan Comparison
            </motion.h2>

            <motion.p
              variants={fadeInUp}
              className="text-gray-900 text-center mb-8 max-w-2xl mx-auto"
            >
              Select any two plans to see a detailed feature-by-feature comparison
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
            >
              <div>
                <label className="block text-gray-900 mb-2">First Plan</label>
                <select
                  className="w-full bg-white border border-gray-100 shadow-sm text-gray-900 border border-gray-200 rounded-lg p-3"
                  value={selectedPlan1}
                  onChange={(e) => setSelectedPlan1(e.target.value)}
                >
                  <option value="">-- Select Plan --</option>
                  {allPlans.map(plan => (
                    <option key={`plan1-${plan.id}`} value={plan.id}>
                      {plan.name} ({formatPrice(plan.price)})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-900 mb-2">Second Plan</label>
                <select
                  className="w-full bg-white border border-gray-100 shadow-sm text-gray-900 border border-gray-200 rounded-lg p-3"
                  value={selectedPlan2}
                  onChange={(e) => setSelectedPlan2(e.target.value)}
                >
                  <option value="">-- Select Plan --</option>
                  {allPlans.map(plan => (
                    <option key={`plan2-${plan.id}`} value={plan.id}>
                      {plan.name} ({formatPrice(plan.price)})
                    </option>
                  ))}
                </select>
              </div>
            </motion.div>

            {comparisonResult && (
              <motion.div
                variants={fadeInUp}
                className="bg-white border-2 border-gray-900 rounded-[2.5rem] overflow-hidden shadow-2xl"
              >
                <div className="grid grid-cols-1 md:grid-cols-2">
                  {/* Plan 1 Column */}
                  <div className="p-10 md:border-r border-gray-200">
                    <div className="mb-10">
                      <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Plan One</span>
                      <h3 className="text-3xl font-black text-gray-900 mt-2">
                        {comparisonResult.plan1Name}
                      </h3>
                      <div className="text-5xl font-black text-gray-700 mt-4">
                        {formatPrice(comparisonResult.plan1Price)}
                      </div>
                    </div>

                    <div className="space-y-8">
                      <div>
                        <h4 className="text-xs font-black text-gray-900 uppercase tracking-widest mb-6">Unique to this plan</h4>
                        {comparisonResult.uniqueToPlan1.length > 0 ? (
                          <div className="space-y-4">
                            {comparisonResult.uniqueToPlan1.map((feature, index) => (
                              <div key={`unique1-${index}`} className="flex items-center text-sm font-bold text-gray-700">
                                <div className="w-5 h-5 rounded-full bg-yellow-100 flex items-center justify-center mr-3 flex-shrink-0">
                                  <LuZap className="w-3 h-3 text-yellow-600 fill-yellow-600" />
                                </div>
                                {feature}
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-sm text-gray-400 italic">No unique features</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Plan 2 Column */}
                  <div className="p-10 bg-gray-50">
                    <div className="mb-10">
                      <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Plan Two</span>
                      <h3 className="text-3xl font-black text-gray-900 mt-2">
                        {comparisonResult.plan2Name}
                      </h3>
                      <div className="text-5xl font-black text-gray-700 mt-4">
                        {formatPrice(comparisonResult.plan2Price)}
                      </div>
                    </div>

                    <div className="space-y-8">
                      <div>
                        <h4 className="text-xs font-black text-gray-900 uppercase tracking-widest mb-6">Unique to this plan</h4>
                        {comparisonResult.uniqueToPlan2.length > 0 ? (
                          <div className="space-y-4">
                            {comparisonResult.uniqueToPlan2.map((feature, index) => (
                              <div key={`unique2-${index}`} className="flex items-center text-sm font-bold text-gray-700">
                                <div className="w-5 h-5 rounded-full bg-yellow-100 flex items-center justify-center mr-3 flex-shrink-0">
                                  <LuZap className="w-3 h-3 text-yellow-600 fill-yellow-600" />
                                </div>
                                {feature}
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-sm text-gray-400 italic">No unique features</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Common Features Footer */}
                <div className="p-10 border-t border-gray-200 bg-white">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                    <h4 className="text-xs font-black text-gray-900 uppercase tracking-widest">Shared across both plans</h4>
                    <div className="px-4 py-1.5 bg-gray-100 rounded-full text-[10px] font-black uppercase tracking-widest text-gray-500">
                      {comparisonResult.commonFeatures.length} shared features
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 gap-x-8">
                    {comparisonResult.commonFeatures.map((feature, index) => (
                      <div key={`common-${index}`} className="flex items-center text-sm font-semibold text-gray-500">
                        <div className="w-2 h-2 rounded-full bg-gray-300 mr-3 flex-shrink-0" />
                        {feature}
                      </div>
                    ))}
                  </div>

                  <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col items-center">
                    <p className="text-lg font-bold text-gray-900 text-center max-w-xl">
                      {comparisonResult.plan1Price < comparisonResult.plan2Price ? (
                        <>
                          Choosing <span className="text-yellow-600 border-b-2 border-yellow-200">{comparisonResult.plan2Name}</span> gives you <span className="text-yellow-600">{comparisonResult.uniqueToPlan2.length} extra tools</span> for an additional <span className="px-2 py-0.5 bg-yellow-400/20 rounded text-yellow-700 font-black">{formatPrice(comparisonResult.priceDifference)}</span>
                        </>
                      ) : (
                        <>
                          Choosing <span className="text-yellow-600 border-b-2 border-yellow-200">{comparisonResult.plan1Name}</span> gives you <span className="text-yellow-600">{comparisonResult.uniqueToPlan1.length} extra tools</span> for an additional <span className="px-2 py-0.5 bg-yellow-400/20 rounded text-yellow-700 font-black">{formatPrice(comparisonResult.priceDifference)}</span>
                        </>
                      )}
                    </p>
                    <button className="mt-8 px-12 py-4 bg-gray-900 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-black transition-all shadow-xl shadow-gray-200">
                      Upgrade now
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </motion.section >

        {/* Usage Statistics */}
        < motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="px-4 sm:px-6 py-16 bg-gray-50"
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
                className="bg-white border border-gray-100 shadow-sm p-6 rounded-xl"
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-gray-900 font-semibold">User Growth</h3>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
                      <span className="text-sm text-gray-600">
                        Active Users
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-[#4CAF50]"></span>
                      <span className="text-sm text-gray-600">Growth Rate</span>
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
                          stopColor="#FACC15"
                          stopOpacity="0.2"
                        />
                        <stop
                          offset="100%"
                          stopColor="#FACC15"
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
                      stroke="#FACC15"
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
                          stroke="#FACC15"
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
                  <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-600 -ml-6">
                    <span>50K</span>
                    <span>37.5K</span>
                    <span>25K</span>
                    <span>12.5K</span>
                    <span>0</span>
                  </div>

                  {/* X-axis */}
                  <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-600 px-8">
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
                className="bg-white border border-gray-100 shadow-sm p-6 rounded-xl"
              >
                <h3 className="text-gray-900 font-semibold mb-6">
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
                        <span className="text-sm text-gray-600">
                          {stat.label}
                        </span>
                        <span className="text-sm text-yellow-600">
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
                          className="h-full bg-yellow-400 rounded-full"
                          style={{ width: stat.value }}
                        ></div>
                      </motion.div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </motion.section >

        <Footer />
      </motion.main >
    </>
  );
}
