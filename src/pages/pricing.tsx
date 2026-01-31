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



  // Determine available categories
  const hasSchoolPlans = subscriptionPlans.some(plan => plan.planType === "SCHOOL" || plan.planType === "MANAGEMENT");
  const hasAdmissionPlans = subscriptionPlans.some(plan => plan.planType === "ADMISSION_CHECKER" || plan.planType === "SECONDARY" || plan.planType === "TERTIARY");

  // Auto-switch away from empty categories
  useEffect(() => {
    if (!loading && subscriptionPlans.length > 0) {
      if (schoolType === "school" && !hasSchoolPlans && hasAdmissionPlans) {
        setSchoolType("admission");
      } else if (schoolType === "admission" && !hasAdmissionPlans && hasSchoolPlans) {
        setSchoolType("school");
      }
    }
  }, [subscriptionPlans, loading, hasSchoolPlans, hasAdmissionPlans, schoolType]);

  // Filter plans client-side based on billing cycle, school type, and usage limit
  const filteredPlans = subscriptionPlans.filter(plan => {
    const billingMatch = schoolType === "admission" ? true : (isYearly ? plan.billingCycle === "YEARLY" : plan.billingCycle === "MONTHLY");

    let typeMatch = false;
    if (schoolType === "school") {
      typeMatch = plan.planType === "SCHOOL" || plan.planType === "MANAGEMENT";
    } else if (schoolType === "admission") {
      typeMatch = plan.planType === "ADMISSION_CHECKER" || plan.planType === "SECONDARY" || plan.planType === "TERTIARY";
    }

    return billingMatch && typeMatch;
  });

  // Get all plans and sort by price (highest to lowest)
  const allPlans = [...filteredPlans].sort((a, b) => b.price - a.price);

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
              {schoolType !== "admission" && (
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
              )}

              {/* School Type Toggle */}
              {(hasSchoolPlans && hasAdmissionPlans) && (
                <div className="flex items-center gap-2 bg-white p-1.5 rounded-2xl border border-gray-200 shadow-sm">
                  {(["school", "admission"] as SchoolType[]).map((type) => {
                    const available = type === "school" ? hasSchoolPlans : hasAdmissionPlans;
                    if (!available) return null;
                    return (
                      <button
                        key={type}
                        onClick={() => setSchoolType(type)}
                        className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase transition-all duration-200 ${schoolType === type ? "bg-[#014751] text-white shadow-lg shadow-[#014751]/20" : "text-gray-400 hover:text-gray-900 hover:bg-gray-50"}`}
                      >
                        {type === "admission" ? "Admission Checker" : "School"}
                      </button>
                    );
                  })}
                </div>
              )}
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
                        {schoolType !== "admission" && (
                          <span className="text-xs text-gray-400 ml-2 font-medium">
                            per {isYearly ? 'year' : 'month'}
                          </span>
                        )}
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

                    <button
                      onClick={() => {
                        if (schoolType === "admission") {
                          router.push("/admission-checker");
                        }
                      }}
                      className="w-full py-4 bg-[#014751] hover:bg-[#013b43] text-white rounded-xl text-xs font-bold uppercase transition-all shadow-lg shadow-[#014751]/10 mb-8 active:scale-95"
                    >
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

            {/* Comparison Table */}
            {allPlans.length > 0 && (
              <div className="mt-16 md:mt-24">
                <div className="text-center mb-12">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Compare all features</h2>
                  <p className="text-gray-500">Detailed breakdown of what's included in each plan</p>
                </div>

                <div className="bg-white rounded-3xl border border-gray-100 shadow-[0_20px_40px_rgba(0,0,0,0.04)] overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[700px]">
                      <thead>
                        <tr className="bg-gray-900 text-white">
                          <th className="p-6 text-xs font-bold uppercase tracking-wider w-[30%]">Features</th>
                          {allPlans.slice(0, 3).map(plan => (
                            <th key={plan.id} className="p-6 text-center w-[23%]">
                              <span className="text-lg font-bold block mb-1">{plan.name}</span>
                              <span className="text-white/60 text-xs font-normal">
                                {formatPrice(plan.price)}
                                {schoolType !== "admission" && <span>/{isYearly ? 'yr' : 'mo'}</span>}
                              </span>
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {(() => {
                          const uniqueFeatures = Array.from(new Set(
                            allPlans.slice(0, 3).flatMap(p =>
                              (p.features || []).map(f => typeof f === 'string' ? f : f.name)
                            )
                          )).sort();

                          const featureRows = uniqueFeatures.map((featureName, idx) => (
                            <tr key={idx} className="group hover:bg-gray-50 transition-colors">
                              <td className="p-5 text-sm font-medium text-gray-700 bg-white group-hover:bg-gray-50 sticky left-0 md:static border-r border-gray-100 md:border-none shadow-[2px_0_5px_rgba(0,0,0,0.05)] md:shadow-none">{featureName}</td>
                              {allPlans.slice(0, 3).map(plan => {
                                const hasFeature = (plan.features || []).some(f =>
                                  (typeof f === 'string' ? f : f.name) === featureName
                                );
                                return (
                                  <td key={plan.id} className="p-5 text-center">
                                    {hasFeature ? (
                                      <div className="flex justify-center">
                                        <div className="w-6 h-6 rounded-full bg-[#014751] flex items-center justify-center text-white">
                                          <LuCheck className="w-3.5 h-3.5" strokeWidth={3} />
                                        </div>
                                      </div>
                                    ) : (
                                      <span className="text-gray-300">-</span>
                                    )}
                                  </td>
                                )
                              })}
                            </tr>
                          ));

                          return (
                            <>
                              {featureRows}
                              {/* Buttons Row */}
                              <tr className="bg-white">
                                <td className="p-5 border-t border-gray-100"></td>
                                {allPlans.slice(0, 3).map(plan => (
                                  <td key={plan.id} className="p-5 text-center border-t border-gray-100">
                                    <button
                                      onClick={() => {
                                        if (schoolType === "admission") {
                                          router.push("/admission-checker");
                                        }
                                      }}
                                      className="w-full py-3 bg-white text-gray-900 border border-gray-300 hover:bg-gray-50 hover:border-gray-400 rounded-xl text-xs font-bold uppercase transition-all whitespace-nowrap"
                                    >
                                      Get started
                                    </button>
                                  </td>
                                ))}
                              </tr>
                            </>
                          );
                        })()}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
        <Footer />
      </motion.main >
    </>
  );
}
