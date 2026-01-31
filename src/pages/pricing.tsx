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
import Navbar from "../components/Navbar";

type SchoolType = "school" | "admission";

// Map SchoolType to API planType
const planTypeMap = {
  school: ["SCHOOL", "MANAGEMENT"],
  admission: ["ADMISSION_CHECKER"]
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

  const [isYearly, setIsYearly] = useState(false);
  const [schoolType, setSchoolType] = useState<SchoolType>("school");
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
      setSchoolType("school");
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



  // Filter plans client-side based on billing cycle, school type, and usage limit
  let filteredPlans = subscriptionPlans.filter(plan => {
    // console.debug("Filtering plan:", plan.name, plan);

    const billingMatch = schoolType === "admission" ? true : (isYearly ? plan.billingCycle === "YEARLY" : plan.billingCycle === "MONTHLY");

    let typeMatch = false;
    if (schoolType === "school") {
      typeMatch = plan.planType === "SCHOOL" || plan.planType === "MANAGEMENT";
    } else if (schoolType === "admission") {
      typeMatch = plan.planType === "ADMISSION_CHECKER" || plan.planType === "SECONDARY" || plan.planType === "TERTIARY";
    }

    const result = billingMatch && typeMatch;
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
      </Head>

      <motion.main
        initial="initial"
        animate="animate"
        className="min-h-screen bg-white relative"
      >

        <Navbar />

        {/* Pricing Header */}
        <section className="pt-32 pb-20 text-center px-4">
          <motion.div variants={fadeInUp} className="max-w-4xl mx-auto mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our pricing</h1>
            <p className="text-gray-500 font-medium text-sm md:text-base">
              Free 7-day trial, no credit card required
            </p>

            <div className="mt-8 flex flex-col items-center gap-6">
              {/* Billing Toggle */}
              <div className="bg-gray-100 p-1.5 rounded-full inline-flex items-center relative">
                <div className="relative z-10 grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setIsYearly(false)}
                    className={`px-6 py-2 rounded-full text-xs font-bold transition-all ${!isYearly ? 'bg-gray-900 text-white shadow-md' : 'text-gray-500 hover:text-gray-900'}`}
                  >
                    Monthly
                  </button>
                  <button
                    onClick={() => setIsYearly(true)}
                    className={`px-6 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-2 ${isYearly ? 'bg-gray-900 text-white shadow-md' : 'text-gray-500 hover:text-gray-900'}`}
                  >
                    Annual <span className={`text-[9px] px-1.5 py-0.5 rounded-full ${isYearly ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-600'}`}>-20%</span>
                  </button>
                </div>
              </div>

              {/* School Type Toggle */}
              <div className="flex items-center gap-2 bg-white p-1.5 rounded-2xl border border-gray-200 shadow-sm">
                {(["school", "admission"] as SchoolType[]).map((type) => (
                  <button
                    key={type}
                    onClick={() => setSchoolType(type)}
                    className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase transition-all duration-200 ${schoolType === type ? "bg-[#014751] text-white shadow-lg shadow-[#014751]/20" : "text-gray-400 hover:text-gray-900 hover:bg-gray-50"}`}
                  >
                    {type === "admission" ? "Admission Checker" : "School"}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Pricing Plans Table */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="bg-white border border-gray-100 shadow-[0_30px_60px_rgba(0,0,0,0.05)] rounded-2xl overflow-hidden flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-gray-100 text-left">
              {loading ? (
                <div className="w-full py-20 text-center"><div className="animate-pulse">Loading plans...</div></div>
              ) : allPlans.length > 0 ? (
                allPlans.slice(0, 3).map((plan, index) => (
                  <div key={plan.id} className="flex-1 p-8 lg:p-10 flex flex-col hover:bg-gray-50/50 transition-colors">
                    <div className="mb-6">
                      <h3 className="font-bold text-xl text-gray-900 mb-2">{plan.name}</h3>
                      <p className="text-sm text-gray-500 font-medium min-h-[40px]">{plan.description}</p>
                    </div>

                    <div className="mb-8">
                      <div className="flex items-baseline">
                        <span className="text-4xl lg:text-5xl font-bold text-gray-900">
                          {formatPrice(plan.price)}
                        </span>
                        <span className="text-xs text-gray-400 ml-2 font-medium">
                          per {isYearly ? 'year' : 'month'}
                        </span>
                      </div>

                      {/* Additional Fields */}
                      <div className="mt-4 space-y-2">
                        <div className="flex items-center gap-2 text-xs font-bold text-gray-600">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#014751]"></span>
                          {plan.usageLimit ? `${plan.usageLimit} Users Limit` : (plan.hasUnlimitedAccess ? "Unlimited Access" : "Standard Access")}
                        </div>
                        {plan.isRecommended && (
                          <div className="inline-block px-2 py-1 bg-[#014751]/10 text-[#014751] text-[10px] font-bold uppercase rounded-md">
                            Recommended
                          </div>
                        )}
                      </div>
                    </div>

                    <button className="w-full py-4 bg-[#014751] hover:bg-[#013b43] text-white rounded-xl text-xs font-bold uppercase transition-all shadow-lg shadow-[#014751]/10 mb-8 active:scale-95">
                      Get started
                    </button>

                    <div className="space-y-4 flex-1">
                      <ul className="space-y-4">
                        {(plan.features || []).map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <LuCheck className="w-5 h-5 text-gray-900 shrink-0" strokeWidth={2.5} />
                            <span className="text-sm text-gray-600 font-medium">
                              {typeof feature === 'string' ? feature : feature.name}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))
              ) : (
                <div className="w-full py-20 text-center text-gray-500">No plans available for this selection.</div>
              )}
            </div>

            {/* Enterprise / Bottom Card */}
            <div className="mt-8 bg-white rounded-2xl border border-gray-100 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden group hover:shadow-xl transition-all duration-500">
              {/* Subtle background glow */}
              <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-50/50 rounded-full blur-3xl group-hover:bg-indigo-100/40 transition-colors"></div>

              <div className="max-w-2xl relative z-10">
                <span className="text-indigo-600 font-black text-[10px] uppercase tracking-[0.2em] mb-3 block">Enterprise</span>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 leading-tight tracking-tight">
                  For organizations to operate with scalability, control, and security
                </h3>
                <div className="flex flex-wrap gap-x-10 gap-y-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-indigo-50 flex items-center justify-center">
                      <LuCheck className="w-3 h-3 text-indigo-600" />
                    </div>
                    <span className="text-sm text-gray-500 font-semibold">SAML SSO</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-indigo-50 flex items-center justify-center">
                      <LuCheck className="w-3 h-3 text-indigo-600" />
                    </div>
                    <span className="text-sm text-gray-500 font-semibold">Dedicated Success Manager</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-indigo-50 flex items-center justify-center">
                      <LuCheck className="w-3 h-3 text-indigo-600" />
                    </div>
                    <span className="text-sm text-gray-500 font-semibold">Advanced Analytics</span>
                  </div>
                </div>
              </div>
              <div className="shrink-0 relative z-10 w-full md:w-auto">
                <button className="w-full md:w-auto px-10 py-5 bg-white hover:bg-gray-50 text-gray-900 border border-gray-200 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all shadow-[0_10px_30px_rgba(0,0,0,0.05)] hover:shadow-[0_15px_35px_rgba(0,0,0,0.08)] active:scale-95">
                  Contact Sales
                </button>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </motion.main >
    </>
  );
}
