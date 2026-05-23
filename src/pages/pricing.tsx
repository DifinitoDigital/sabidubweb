
import Head from "next/head";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import axios from "axios";
import { FaBolt as LuZap, FaCheck as LuCheck, FaMagnifyingGlass as LuSearch } from "react-icons/fa6";
import Navbar from "../components/Navbar";

type SchoolType = "school" | "admission" | "secondary" | "tertiary" | "nysc";

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

        // Map backend features to expected format
        // eslint-disable-next-line
        const mappedPlans = response.data.map((plan: any) => ({
          ...plan,
          features: plan.features || (Array.isArray(plan.subscriptionFeatures)
            // eslint-disable-next-line
            ? plan.subscriptionFeatures.map((f: any) => ({
              id: f.id,
              name: f.name,
              description: f.description
            }))
            : [])
        }));

        setSubscriptionPlans(mappedPlans);
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
  const hasAdmissionPlans = subscriptionPlans.some(plan => plan.planType === "ADMISSION_CHECKER");
  const hasSecondaryPlans = subscriptionPlans.some(plan => plan.planType === "SECONDARY");
  const hasTertiaryPlans = subscriptionPlans.some(plan => plan.planType === "TERTIARY");
  const hasNyscPlans = subscriptionPlans.some(plan => plan.planType === "NYSC");

  // Auto-switch away from empty categories
  useEffect(() => {
    if (!loading && subscriptionPlans.length > 0) {
      const currentAvailable = (schoolType === "secondary" && hasSecondaryPlans) ||
                               (schoolType === "tertiary" && hasTertiaryPlans) ||
                               (schoolType === "school" && hasSchoolPlans) ||
                               (schoolType === "admission" && hasAdmissionPlans) ||
                               (schoolType === "nysc" && hasNyscPlans);
      
      if (!currentAvailable) {
        if (hasSecondaryPlans) setSchoolType("secondary");
        else if (hasTertiaryPlans) setSchoolType("tertiary");
        else if (hasSchoolPlans) setSchoolType("school");
        else if (hasAdmissionPlans) setSchoolType("admission");
        else if (hasNyscPlans) setSchoolType("nysc");
      }
    }
  }, [subscriptionPlans, loading, hasSchoolPlans, hasAdmissionPlans, hasSecondaryPlans, hasTertiaryPlans, hasNyscPlans, schoolType]);

  // Filter plans client-side based on billing cycle, school type, and usage limit
  const filteredPlans = subscriptionPlans.filter(plan => {
    const billingMatch = schoolType === "admission" ? true : (isYearly ? plan.billingCycle === "YEARLY" : plan.billingCycle === "MONTHLY");

    let typeMatch = false;
    if (schoolType === "school") {
      typeMatch = plan.planType === "SCHOOL" || plan.planType === "MANAGEMENT";
    } else if (schoolType === "admission") {
      typeMatch = plan.planType === "ADMISSION_CHECKER";
    } else if (schoolType === "secondary") {
      typeMatch = plan.planType === "SECONDARY";
    } else if (schoolType === "tertiary") {
      typeMatch = plan.planType === "TERTIARY";
    } else if (schoolType === "nysc") {
      typeMatch = plan.planType === "NYSC";
    }

    return billingMatch && typeMatch;
  });

  // Get all plans and sort by price (lowest to highest: Basic -> Standard -> Premium)
  const allPlans = [...filteredPlans].sort((a, b) => a.price - b.price);

  // Helper to format price
  const formatPrice = (price: number) => {
    return `₦${price.toLocaleString()}`;
  };

  const compareSpecificPlans = useCallback(() => {
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

    const features1 = plan1.features.map((f: any) => typeof f === 'string' ? f : f.name);
    const features2 = plan2.features.map((f: any) => typeof f === 'string' ? f : f.name);

    const uniqueToFirst = features1.filter((f: any) => !features2.includes(f));
    const uniqueToSecond = features2.filter((f: any) => !features1.includes(f));
    const commonFeatures = features1.filter((f: any) => features2.includes(f));

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
  }, [selectedPlan1, selectedPlan2, allPlans]);

  useEffect(() => {
    if (selectedPlan1 && selectedPlan2) {
      compareSpecificPlans();
    }
  }, [selectedPlan1, selectedPlan2, compareSpecificPlans]);

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
            {schoolType !== "admission" && (
              <p className="text-gray-500 font-medium text-sm md:text-base">
                Free 7-day trial, no credit card required
              </p>
            )}

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
                      Yearly <span className={`text-[9px] px-1.5 py-0.5 rounded-full ${isYearly ? 'bg-white/20 text-white' : 'bg-green-100 text-green-700'}`}>Save 20%</span>
                    </button>
                  </div>
                </div>
              )}

              {/* School Type Toggle */}
              <div className="flex items-center justify-center flex-wrap gap-2 bg-white p-1.5 rounded-2xl border border-gray-200 shadow-sm">
                {(["secondary", "tertiary", "nysc", "school", "admission"] as SchoolType[]).map((type) => {
                  const available =
                    type === "school" ? hasSchoolPlans :
                      type === "admission" ? hasAdmissionPlans :
                        type === "secondary" ? hasSecondaryPlans :
                          type === "nysc" ? hasNyscPlans :
                            hasTertiaryPlans;
                  if (!available) return null;
                  return (
                    <button
                      key={type}
                      onClick={() => setSchoolType(type)}
                      className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase transition-all duration-200 ${schoolType === type ? "bg-[#014751] text-white shadow-lg shadow-[#014751]/20" : "text-gray-400 hover:text-gray-900 hover:bg-gray-50"}`}
                    >
                      {type === "admission" ? "Admission Checker" : type === "school" ? "School" : type === "secondary" ? "Secondary" : type === "nysc" ? "NYSC" : "Tertiary"}
                    </button>
                  );
                })}
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
                        {schoolType !== "admission" && (
                          <div className="flex flex-col ml-3">
                            <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">
                              billed {isYearly ? 'yearly' : 'monthly'}
                            </span>
                            {isYearly && (
                              <span className="text-[11px] text-green-600 font-bold">
                                (Save {formatPrice(plan.price * 0.25)})
                              </span>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Additional Fields */}
                      <div className="mt-4 space-y-2">
                        <div className="flex items-center gap-2 text-xs font-bold text-gray-600">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#014751]"></span>
                          {plan.usageLimit 
                            ? `${plan.usageLimit} ${schoolType === "admission" ? "Credits Limit" : "Users Limit"}` 
                            : (plan.hasUnlimitedAccess ? "Unlimited Access" : "Standard Access")}
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
                        } else if (schoolType === "secondary" || schoolType === "tertiary" || schoolType === "nysc") {
                          window.location.href = "https://student.portal.sabidub.com";
                        } else {
                          window.location.href = "https://portal.sabidub.com/auth/school/signin";
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

            {/* Comparison Tool */}
            {allPlans.length > 1 && (
              <div className="mt-16 md:mt-24">
                <div className="text-center mb-10">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">Comparison</h2>
                  <p className="text-gray-500 text-sm">Select two plans to see a detailed side-by-side breakdown</p>
                </div>

                {/* Dropdowns */}
                <div className="flex flex-col sm:flex-row items-center gap-3 mb-8 justify-center px-2">
                  <div className="relative w-full sm:w-64">
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Plan 1</label>
                    <select
                      value={selectedPlan1}
                      onChange={e => setSelectedPlan1(e.target.value)}
                      className="w-full appearance-none bg-white border-2 border-gray-200 hover:border-[#014751] focus:border-[#014751] rounded-xl px-4 py-3 pr-10 text-sm font-semibold text-gray-800 cursor-pointer transition-all outline-none shadow-sm"
                    >
                      <option value="">Choose a plan…</option>
                      {allPlans.map(plan => (
                        <option key={plan.id} value={plan.id} disabled={plan.id === selectedPlan2}>{plan.name} — {formatPrice(plan.price)}</option>
                      ))}
                    </select>
                    <span className="pointer-events-none absolute right-3 bottom-3.5 text-gray-400">▾</span>
                  </div>

                  <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full text-gray-400 font-bold text-xs shrink-0 sm:mt-6">vs</div>

                  <div className="relative w-full sm:w-64">
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Plan 2</label>
                    <select
                      value={selectedPlan2}
                      onChange={e => setSelectedPlan2(e.target.value)}
                      className="w-full appearance-none bg-white border-2 border-gray-200 hover:border-[#014751] focus:border-[#014751] rounded-xl px-4 py-3 pr-10 text-sm font-semibold text-gray-800 cursor-pointer transition-all outline-none shadow-sm"
                    >
                      <option value="">Choose a plan…</option>
                      {allPlans.map(plan => (
                        <option key={plan.id} value={plan.id} disabled={plan.id === selectedPlan1}>{plan.name} — {formatPrice(plan.price)}</option>
                      ))}
                    </select>
                    <span className="pointer-events-none absolute right-3 bottom-3.5 text-gray-400">▾</span>
                  </div>
                </div>

                {/* Comparison Result */}
                {comparisonResult && (
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35 }}
                    className="bg-white rounded-3xl border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.07)] overflow-hidden"
                  >
                    {/* Header bar — stacks on mobile */}
                    <div className="bg-gray-900 text-white">
                      {/* Mobile: two plan cards stacked with vs badge */}
                      <div className="flex items-stretch divide-x divide-white/10">
                        <div className="flex-1 p-4 sm:p-6 flex flex-col items-center justify-center text-center">
                          <span className="text-sm sm:text-lg font-bold leading-tight">{comparisonResult.plan1Name}</span>
                          <span className="text-white/60 text-[10px] sm:text-xs mt-1 uppercase font-bold tracking-wider">{formatPrice(comparisonResult.plan1Price)} / {isYearly ? 'yr' : 'mo'}</span>
                          {isYearly && schoolType !== "admission" && (
                            <span className="text-[9px] text-[#AFF8C8] font-bold">(Save {formatPrice(comparisonResult.plan1Price * 0.25)})</span>
                          )}
                          <span className="text-[9px] text-white/30 mt-1">{comparisonResult.plan1TotalFeatures} features</span>
                        </div>
                        {/* Price diff — compact on mobile */}
                        <div className="w-20 sm:w-28 shrink-0 flex flex-col items-center justify-center text-center px-2 py-4">
                          {comparisonResult.priceDifference === 0 ? (
                            <span className="text-[10px] bg-white/10 text-white px-2 py-1 rounded-full font-bold">Same</span>
                          ) : (
                            <>
                              <span className="text-[9px] text-white/50 uppercase tracking-wider mb-0.5">diff</span>
                              <span className="text-sm sm:text-lg font-black text-[#AFF8C8] leading-tight">
                                {formatPrice(comparisonResult.priceDifference)}
                              </span>
                            </>
                          )}
                        </div>
                        <div className="flex-1 p-4 sm:p-6 flex flex-col items-center justify-center text-center">
                          <span className="text-sm sm:text-lg font-bold leading-tight">{comparisonResult.plan2Name}</span>
                          <span className="text-white/60 text-[10px] sm:text-xs mt-1 uppercase font-bold tracking-wider">{formatPrice(comparisonResult.plan2Price)} / {isYearly ? 'yr' : 'mo'}</span>
                          {isYearly && schoolType !== "admission" && (
                            <span className="text-[9px] text-[#AFF8C8] font-bold">(Save {formatPrice(comparisonResult.plan2Price * 0.25)})</span>
                          )}
                          <span className="text-[9px] text-white/30 mt-1">{comparisonResult.plan2TotalFeatures} features</span>
                        </div>
                      </div>
                    </div>

                    {/* Verdict & Recommendation */}
                    {(() => {
                      const p1 = allPlans.find(p => p.id === selectedPlan1);
                      const p2 = allPlans.find(p => p.id === selectedPlan2);
                      if (!p1 || !p2) return null;

                      // Weighted scoring — value metrics dominate, price is a light tiebreaker only
                      let p1Score = 0;
                      let p2Score = 0;
                      const p1Reasons: string[] = [];
                      const p2Reasons: string[] = [];

                      // 1. Backend "recommended" flag — highest priority (30 pts)
                      if (p1.isRecommended && !p2.isRecommended) { p1Score += 30; p1Reasons.push("Marked as recommended by SabiDub"); }
                      else if (p2.isRecommended && !p1.isRecommended) { p2Score += 30; p2Reasons.push("Marked as recommended by SabiDub"); }

                      // 2. Unlimited access (20 pts)
                      if (p1.hasUnlimitedAccess && !p2.hasUnlimitedAccess) { p1Score += 20; p1Reasons.push("Offers unlimited access"); }
                      else if (p2.hasUnlimitedAccess && !p1.hasUnlimitedAccess) { p2Score += 20; p2Reasons.push("Offers unlimited access"); }

                      // 3. Higher usage limit (15 pts)
                      const ul1 = p1.usageLimit ?? Infinity;
                      const ul2 = p2.usageLimit ?? Infinity;
                      if (ul1 > ul2 && ul1 !== Infinity) { p1Score += 15; p1Reasons.push(`Supports more users (${p1.usageLimit} vs ${p2.usageLimit})`); }
                      else if (ul2 > ul1 && ul2 !== Infinity) { p2Score += 15; p2Reasons.push(`Supports more users (${p2.usageLimit} vs ${p1.usageLimit})`); }

                      // 4. More total features (10 pts)
                      if (comparisonResult.plan1TotalFeatures > comparisonResult.plan2TotalFeatures) {
                        p1Score += 10;
                        p1Reasons.push(`${comparisonResult.plan1TotalFeatures - comparisonResult.plan2TotalFeatures} more feature${comparisonResult.plan1TotalFeatures - comparisonResult.plan2TotalFeatures > 1 ? 's' : ''} included`);
                      } else if (comparisonResult.plan2TotalFeatures > comparisonResult.plan1TotalFeatures) {
                        p2Score += 10;
                        p2Reasons.push(`${comparisonResult.plan2TotalFeatures - comparisonResult.plan1TotalFeatures} more feature${comparisonResult.plan2TotalFeatures - comparisonResult.plan1TotalFeatures > 1 ? 's' : ''} included`);
                      }

                      // 5. More exclusive-only features (5 pts) — minor, since higher plans bundle lower ones
                      if (comparisonResult.uniqueToPlan1.length > comparisonResult.uniqueToPlan2.length) {
                        p1Score += 5;
                        p1Reasons.push(`${comparisonResult.uniqueToPlan1.length - comparisonResult.uniqueToPlan2.length} additional exclusive feature${comparisonResult.uniqueToPlan1.length - comparisonResult.uniqueToPlan2.length > 1 ? 's' : ''}`);
                      } else if (comparisonResult.uniqueToPlan2.length > comparisonResult.uniqueToPlan1.length) {
                        p2Score += 5;
                        p2Reasons.push(`${comparisonResult.uniqueToPlan2.length - comparisonResult.uniqueToPlan1.length} additional exclusive feature${comparisonResult.uniqueToPlan2.length - comparisonResult.uniqueToPlan1.length > 1 ? 's' : ''}`);
                      }

                      // 6. Lower price — minor tiebreaker only (3 pts), does NOT override value
                      if (comparisonResult.plan1Price < comparisonResult.plan2Price) {
                        p1Score += 3;
                        p1Reasons.push(`Costs ${formatPrice(comparisonResult.priceDifference)} less`);
                      } else if (comparisonResult.plan2Price < comparisonResult.plan1Price) {
                        p2Score += 3;
                        p2Reasons.push(`Costs ${formatPrice(comparisonResult.priceDifference)} less`);
                      }

                      const winner = p1Score > p2Score ? p1 : p2Score > p1Score ? p2 : null;
                      const winnerReasons = winner?.id === p1.id ? p1Reasons : p2Reasons;
                      const tied = !winner;

                      return (
                        <div className={`border-b px-6 py-5 ${tied ? 'bg-amber-50 border-amber-100' : 'bg-gradient-to-r from-emerald-50 via-white to-emerald-50 border-emerald-100'}`}>
                          {tied ? (
                            <div className="text-center">
                              <span className="inline-flex items-center gap-2 text-amber-700 font-bold text-sm">
                                <span className="text-xl">⚖️</span> These plans are evenly matched
                              </span>
                              <p className="text-xs text-amber-600 mt-1">Both plans offer similar value — your choice depends on your specific needs.</p>
                            </div>
                          ) : (
                            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                              <div className="flex items-center gap-3 shrink-0">
                                <span className="text-2xl">🏆</span>
                                <div>
                                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 block">We recommend</span>
                                  <span className="text-base font-black text-gray-900">{winner!.name}</span>
                                </div>
                                {winner!.isRecommended && (
                                  <span className="text-[9px] px-2 py-1 bg-[#014751] text-white font-bold uppercase rounded-full tracking-wider">Staff Pick</span>
                                )}
                              </div>
                              <div className="h-px md:h-8 w-full md:w-px bg-emerald-200 shrink-0" />
                              <div className="flex-1">
                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Why {winner!.name} wins</p>
                                <ul className="flex flex-wrap gap-2">
                                  {winnerReasons.map((reason, i) => (
                                    <li key={i} className="flex items-center gap-1.5 bg-white border border-emerald-100 text-emerald-800 text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm">
                                      <span className="text-emerald-500">✓</span> {reason}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })()}

                    <div className="divide-y divide-gray-100">
                      {/* Mobile: 2-col grid for exclusives, full-width for shared */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
                        {/* Unique to Plan 1 */}
                        <div className="p-5 sm:p-6">
                          <p className="text-[10px] font-black uppercase tracking-widest text-[#014751] bg-[#014751]/5 rounded-lg px-2 py-1.5 mb-4 inline-block">Only in {comparisonResult.plan1Name}</p>
                          {comparisonResult.uniqueToPlan1.length === 0 ? (
                            <p className="text-sm text-gray-400 italic">No exclusive features</p>
                          ) : (
                            <ul className="space-y-2.5">
                              {comparisonResult.uniqueToPlan1.map((f, i) => (
                                <li key={i} className="flex items-start gap-2.5">
                                  <span className="mt-0.5 w-4 h-4 rounded-full bg-[#014751] flex items-center justify-center shrink-0">
                                    <LuCheck className="w-2.5 h-2.5 text-white" />
                                  </span>
                                  <span className="text-sm text-gray-700 font-medium">{f}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>

                        {/* Unique to Plan 2 */}
                        <div className="p-5 sm:p-6">
                          <p className="text-[10px] font-black uppercase tracking-widest text-[#014751] bg-[#014751]/5 rounded-lg px-2 py-1.5 mb-4 inline-block">Only in {comparisonResult.plan2Name}</p>
                          {comparisonResult.uniqueToPlan2.length === 0 ? (
                            <p className="text-sm text-gray-400 italic">No exclusive features</p>
                          ) : (
                            <ul className="space-y-2.5">
                              {comparisonResult.uniqueToPlan2.map((f, i) => (
                                <li key={i} className="flex items-start gap-2.5">
                                  <span className="mt-0.5 w-4 h-4 rounded-full bg-[#014751] flex items-center justify-center shrink-0">
                                    <LuCheck className="w-2.5 h-2.5 text-white" />
                                  </span>
                                  <span className="text-sm text-gray-700 font-medium">{f}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>

                        {/* Shared — full row on mobile, 3rd col on md */}
                        {comparisonResult.commonFeatures.length > 0 && (
                          <div className="p-5 sm:p-6 bg-gray-50/60 sm:col-span-2 md:col-span-1">
                            <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 bg-gray-200/60 rounded-lg px-2 py-1.5 mb-4 inline-block">Shared ({comparisonResult.commonFeatures.length})</p>
                            <ul className="space-y-2.5">
                              {comparisonResult.commonFeatures.map((f, i) => (
                                <li key={i} className="flex items-start gap-2.5">
                                  <span className="mt-0.5 w-4 h-4 rounded-full bg-gray-300 flex items-center justify-center shrink-0">
                                    <LuCheck className="w-2.5 h-2.5 text-white" />
                                  </span>
                                  <span className="text-sm text-gray-500 font-medium">{f}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Get started buttons — stack on mobile */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 sm:p-6 border-t border-gray-100 bg-gray-50">
                      {[selectedPlan1, selectedPlan2].map(planId => {
                        const plan = allPlans.find(p => p.id === planId);
                        if (!plan) return null;
                        return (
                          <button
                            key={planId}
                            onClick={() => {
                              if (schoolType === "admission") router.push("/admission-checker");
                              else if (schoolType === "secondary" || schoolType === "tertiary" || schoolType === "nysc") window.location.href = "https://student.portal.sabidub.com";
                              else window.location.href = "https://portal.sabidub.com/auth/school/signin";
                            }}
                            className="w-full py-3.5 bg-[#014751] text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-[#013b43] transition-all active:scale-95 shadow-md"
                          >
                            Get {plan.name}
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}

                {/* Placeholder when none selected */}
                {!comparisonResult && (
                  <div className="text-center py-16 text-gray-400 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                    <div className="text-4xl mb-3">⚖️</div>
                    <p className="text-sm font-medium">Select two plans above to see the comparison</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
        <Footer />
      </motion.main >
    </>
  );
}
