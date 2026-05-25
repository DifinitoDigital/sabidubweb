import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import SuniVoiceWidget from "../components/SuniVoiceWidget";
import { useSuniNarration } from "../hooks/useSuniNarration";
import { useSectionObserver } from "../hooks/useSectionObserver";
import { suniSections } from "../data/suniScript";

interface Author {
  id: string;
  name: string;
  email: string;
  profilePicture: string;
}

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  tags: string[];
  readingTime: string;
  isPublished: boolean;
  isFeatured: boolean;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
  author: Author;
}

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

export default function Home() {
  const [isGetStartedOpen, setIsGetStartedOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [userName, setUserName] = useState("Guest");
  const [institutionCount, setInstitutionCount] = useState<number | null>(null);
  const [featuredInstitutions, setFeaturedInstitutions] = useState<any[]>([]);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? -1 : index);
  };

  // ── Suni narration ─────────────────────────────────────────────────────
  const sectionIds = suniSections.map((s) => s.id);
  const {
    prefs,
    updatePrefs,
    isPlaying,
    autoplayBlocked,
    currentSectionId,
    isSupported,
    attemptAutoplay,
    handleFirstGesture,
    onSectionActive,
    replaySection,
    replayIntro,
  } = useSuniNarration();

  const activeSectionId = useSectionObserver(sectionIds);

  // Autoplay on mount
  useEffect(() => {
    attemptAutoplay();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle first-gesture on the whole document to unblock autoplay
  // Ignore if the target is the chip itself (chip has its own onClick)
  useEffect(() => {
    if (!autoplayBlocked) return;
    const handler = (e: PointerEvent) => {
      const chip = document.getElementById('suni-autoplay-chip');
      if (chip && chip.contains(e.target as Node)) return; // chip handles it
      handleFirstGesture();
    };
    document.addEventListener('pointerdown', handler, { once: true });
    return () => document.removeEventListener('pointerdown', handler);
  }, [autoplayBlocked, handleFirstGesture]);

  // Fire narration when scroll section changes
  useEffect(() => {
    if (activeSectionId) {
      onSectionActive(activeSectionId);
    }
  }, [activeSectionId, onSectionActive]);

  const handleMuteToggle = useCallback(() => {
    updatePrefs({ muted: !prefs.muted });
  }, [prefs.muted, updatePrefs]);

  const handleVolumeChange = useCallback((v: number) => {
    updatePrefs({ volume: v, muted: v === 0 });
  }, [updatePrefs]);

  const handleRateChange = useCallback((v: number) => {
    updatePrefs({ rate: v });
  }, [updatePrefs]);

  const handleDisableToggle = useCallback(() => {
    updatePrefs({ disabled: !prefs.disabled });
  }, [prefs.disabled, updatePrefs]);

  const handleVoiceModeToggle = useCallback(() => {
    updatePrefs({ voiceMode: prefs.voiceMode === 'audio' ? 'speech' : 'audio' });
  }, [prefs.voiceMode, updatePrefs]);

  const handleReplaySection = useCallback(() => {
    if (activeSectionId) replaySection(activeSectionId);
  }, [activeSectionId, replaySection]);
  // ── End Suni ───────────────────────────────────────────────────────────

  const [featuredPosts, setFeaturedPosts] = useState<BlogPost[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
        const response = await fetch(`${baseUrl}/blog/posts?limit=5`);
        if (response.ok) {
          const data = await response.json();
          setFeaturedPosts(data.posts);
        }
      } catch (error) {
        console.error("Error fetching blog posts:", error);
      } finally {
        setLoadingPosts(false);
      }
    };

    fetchPosts();
  }, []);

  // Fetch total institution count and specific featured logos (UniAbuja, Unilag, OAU)
  useEffect(() => {
    const fetchInstitutionData = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

        // 1. Fetch total count
        const countRes = await fetch(`${baseUrl}/institutions/all?page=1&limit=1&slim=true`);
        if (countRes.ok) {
          const countData = await countRes.json();
          if (countData?.meta?.total !== undefined) {
            setInstitutionCount(countData.meta.total);
          }
        }

        // 2. Fetch specific universities for the hero logos
        const searchTerms = ["University of Abuja", "University of Lagos", "Obafemi Awolowo University"];
        const featuredResults = await Promise.all(
          searchTerms.map(async (term) => {
            const res = await fetch(`${baseUrl}/institutions/all?search=${encodeURIComponent(term)}&limit=1&slim=true`);
            if (res.ok) {
              const data = await res.json();
              return data?.data?.[0] || { name: term, id: term };
            }
            return { name: term, id: term };
          })
        );

        setFeaturedInstitutions(featuredResults);
      } catch (err) {
        console.error("Failed to fetch institution data:", err);
      }
    };
    fetchInstitutionData();
  }, []);



  return (
    <>
      <Head>
        <title>SabiDub | Bridging Educational Gaps in Nigeria</title>
        <meta
          name="description"
          content="SabiDub is a student-first educational ecosystem that simplifies school management while providing students with advanced admission analysis and career guidance tools."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen bg-white relative">

        {/* Suni Voice Widget — always visible */}
        <SuniVoiceWidget
          isPlaying={isPlaying}
          muted={prefs.muted}
          volume={prefs.volume}
          rate={prefs.rate}
          disabled={prefs.disabled}
          voiceMode={prefs.voiceMode}
          autoplayBlocked={autoplayBlocked}
          isSupported={isSupported}
          currentSectionId={currentSectionId}
          activeSectionId={activeSectionId}
          onMuteToggle={handleMuteToggle}
          onVolumeChange={handleVolumeChange}
          onRateChange={handleRateChange}
          onDisableToggle={handleDisableToggle}
          onVoiceModeToggle={handleVoiceModeToggle}
          onReplaySection={handleReplaySection}
          onReplayIntro={replayIntro}
          onFirstGesture={handleFirstGesture}
        />

        <Navbar />

        {/* Hero Section — intro narration */}
        <section data-suni-section="intro" className="relative px-4 sm:px-6 pt-32 sm:pt-48 pb-12 sm:pb-24 min-h-[90vh] flex flex-col justify-center overflow-hidden bg-black">
          {/* Background Image & Overlays */}
          <div className="absolute inset-0">
            <Image
              src="/images/IMG_5609.JPG"
              alt="Education Background"
              fill
              className="object-cover opacity-60"
              priority
            />
            {/* Layer 1: Solid Black Overlay */}
            <div className="absolute inset-0 bg-black/40"></div>
            {/* Layer 2: Black to Transparent Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-black via-black/20 to-transparent"></div>
          </div>

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-4">
              <p className="text-white/80 flex items-center justify-center gap-2">
                <span className="w-1 h-1 rounded-full bg-[#AFF8C8]"></span>
                Empowering Nigerian Education
              </p>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center mb-6">
              Bridging Educational Excellence <br className="hidden sm:block" /> in Nigeria
            </h1>

            <p className="text-white/70 text-center max-w-2xl mx-auto mb-8 px-4">
              Connecting secondary and tertiary education through innovative
              technology, ensuring students are well-prepared for academic success
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8 sm:mb-16 px-4">
              <button
                onClick={() => setIsGetStartedOpen(true)}
                className="bg-[#014751] text-white px-6 py-3 rounded-md font-medium w-full sm:w-auto text-center active:scale-95 transition-all shadow-lg"
              >
                Get Started
              </button>
              <button className="border border-white/20 text-white px-6 py-3 rounded-md font-medium hover:bg-white/10 transition-colors w-full sm:w-auto">
                Request a demo
              </button>
            </div>
          </div>


          {/* App Screenshot */}
          <div className="relative w-full max-w-5xl mx-auto px-4">
            <div className="bg-gradient-to-b from-yellow-400/20 to-transparent absolute inset-0 rounded-3xl"></div>
            <div className="relative bg-white border border-gray-200 shadow-xl rounded-[32px] p-6 sm:p-10 sm:px-12">
              <div className="flex flex-wrap items-center gap-6 mb-8">
                <div className="flex items-center gap-2">
                  <div className="w-3.5 h-3.5 bg-[#014751] rounded-full"></div>
                  <span className="text-gray-900 font-bold text-base">95% Success</span>
                </div>
                <div className="text-gray-500 font-medium text-base">WAEC</div>
                <div className="text-gray-500 font-medium text-base">NECO</div>
                <div className="text-gray-500 font-medium text-base">JAMB</div>
              </div>

              <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
                <div>
                  <div className="text-gray-500 text-sm mb-1 font-medium">
                    Students Progress
                  </div>
                  <div className="text-gray-900 text-3xl sm:text-4xl font-black tracking-tight">
                    84.3% Average
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  {/* University logo avatars */}
                  <div className="flex -space-x-3">
                    {featuredInstitutions.length > 0 ? (
                      featuredInstitutions.map((inst, idx) => (
                        <div
                          key={inst.id || idx}
                          title={inst.name}
                          className="w-10 h-10 rounded-full border-2 border-white shadow-sm flex items-center justify-center text-[10px] font-black text-white select-none overflow-hidden bg-gray-100"
                        >
                          {inst.logo ? (
                            <Image
                              src={inst.logo}
                              alt={inst.name}
                              width={40}
                              height={40}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div
                              className="w-full h-full flex items-center justify-center"
                              style={{
                                background: idx === 0 ? 'linear-gradient(135deg, #006400 60%, #004d00 100%)' :
                                  idx === 1 ? 'linear-gradient(135deg, #003087 60%, #001a5c 100%)' :
                                    'linear-gradient(135deg, #8B0000 60%, #5c0000 100%)'
                              }}
                            >
                              {inst.name?.split(' ').map((n: string) => n[0]).join('').substring(0, 3).toUpperCase() || 'SB'}
                            </div>
                          )}
                        </div>
                      ))
                    ) : (
                      <>
                        {/* Static Fallbacks during load */}
                        <div className="w-10 h-10 rounded-full bg-gray-200 border-2 border-white animate-pulse" />
                        <div className="w-10 h-10 rounded-full bg-gray-300 border-2 border-white animate-pulse" />
                        <div className="w-10 h-10 rounded-full bg-gray-400 border-2 border-white animate-pulse" />
                      </>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-gray-900 font-black text-lg leading-tight">
                      {institutionCount !== null
                        ? `${institutionCount.toLocaleString()}+`
                        : '—'}
                    </span>
                    <span className="text-gray-400 text-xs font-medium">Institutions</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trusted By Section */}
        <section className="py-12 border-t border-gray-100 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 mb-10">
            <p className="text-center text-gray-400 font-medium text-sm tracking-widest uppercase">
              Trusted by Top Educational Institutions in Nigeria
            </p>
          </div>

          {(() => {
            const universities = [
              "University of Abuja",
              "University of Ibadan",
              "University of Lagos",
              "Obafemi Awolowo University",
              "Ahmadu Bello University",
              "University of Nigeria",
              "University of Benin",
              "University of Ilorin",
              "Lagos State University",
              "Federal University of Technology Akure",
              "Federal University of Technology Minna",
              "Bayero University Kano",
              "University of Port Harcourt",
              "Nnamdi Azikiwe University",
              "University of Calabar",
              "Covenant University",
              "Babcock University",
              "Afe Babalola University",
              "Bowen University",
              "American University of Nigeria",
              "Redeemer's University",
            ];
            const UniItem = ({ name, prefix }: { name: string; prefix: string }) => (
              <div
                key={`${prefix}-${name}`}
                className="flex items-center justify-center transition-all cursor-default opacity-60 hover:opacity-100 flex-shrink-0"
              >
                <span className="text-base sm:text-lg font-black text-gray-600 whitespace-nowrap tracking-tight">
                  {name.toUpperCase()}
                </span>
              </div>
            );
            return (
              <div className="relative flex overflow-x-hidden">
                {/* Row 1 — scrolls right */}
                <div className="animate-marquee flex items-center gap-10 sm:gap-16 mb-0">
                  {universities.map((u) => <UniItem key={u} name={u} prefix="a" />)}
                  {/* Duplicate set for seamless loop */}
                  {universities.map((u) => <UniItem key={`dup-${u}`} name={u} prefix="b" />)}
                </div>

                {/* Gradient edge masks */}
                <div className="absolute inset-y-0 left-0 w-24 sm:w-40 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
                <div className="absolute inset-y-0 right-0 w-24 sm:w-40 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
              </div>
            );
          })()}
        </section>


        {/* Unified Product Showcase — whatwedo narration */}
        <section data-suni-section="whatwedo" className="px-4 sm:px-6 py-24 bg-white relative overflow-hidden border-t border-gray-100">
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-6xl font-black text-gray-900 mb-6 tracking-tighter">
                Empowering Academic Ambition.
                <br />
                <span className="text-gray-400">Guided by SabiDub technology.</span>
              </h2>
              <p className="text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed">
                SabiDub connects secondary and tertiary education through innovative technology,
                ensuring students are well-prepared for academic success at every level.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 auto-rows-auto md:auto-rows-[240px]">

              {/* Card 1: Success Analytics (Large) */}
              <div className="md:col-span-12 lg:col-span-8 md:row-span-2 bg-[#F8F9FA] border border-gray-200/50 rounded-[32px] p-6 sm:p-8 overflow-hidden relative group min-h-[320px] sm:min-h-0">
                <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#014751]/10 border border-[#014751]/20 text-[#014751] text-[10px] font-bold uppercase tracking-wider mb-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#014751] animate-pulse"></span>
                    Academic Analytics
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-gray-900 mb-2">Predictive intelligence for every academic step</h3>
                  <p className="text-gray-500 max-w-md text-sm sm:text-base leading-relaxed font-medium">
                    Precision monitoring from O-Level to Degree. SabiDub maps your growth with data-driven clarity.
                  </p>
                  <div className="flex gap-4 mt-4">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-[#014751]"></div>
                      <span className="text-[10px] font-bold text-gray-600 uppercase">Growth</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-[#014751]/30"></div>
                      <span className="text-[10px] font-bold text-gray-600 uppercase">Target</span>
                    </div>
                  </div>
                </div>

                {/* Mockup Chart Visual */}
                <div className="absolute bottom-0 right-0 left-0 h-1/2 flex items-end px-8">
                  <div className="w-full h-full flex items-end gap-1">
                    {[40, 70, 45, 90, 65, 80, 55, 95, 75, 85, 60, 100].map((h, i) => (
                      <div key={i} className="flex-1 bg-gradient-to-t from-[#014751]/40 to-transparent rounded-t-lg transition-all duration-1000 group-hover:from-[#014751]/60" style={{ height: `${h}%`, opacity: 0.2 + (i * 0.05) }}></div>
                    ))}
                  </div>
                  {/* Line Overlay */}
                  <svg className="absolute left-0 bottom-[10%] w-full h-2/3 opacity-20" preserveAspectRatio="none">
                    <path d="M0 100 Q 100 20, 200 80 T 400 30 T 600 70 T 800 10 T 1000 50" fill="none" stroke="#014751" strokeWidth="2" />
                    <circle cx="400" cy="30" r="4" fill="#014751" />
                  </svg>
                </div>
              </div>

              {/* Card 2: Modular Learning (Small/Tall) */}
              <div className="md:col-span-6 lg:col-span-4 md:row-span-2 bg-gray-900 border border-gray-800 rounded-[32px] p-8 flex flex-col justify-between group overflow-hidden min-h-[320px] sm:min-h-0">
                <div className="relative z-10">
                  <h3 className="text-xl font-bold text-white mb-4">Modular Mastery</h3>
                  <div className="space-y-3 font-mono text-[10px] text-gray-400">
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-emerald-400">
                      <span className="text-gray-500">01</span> .core-foundation {"{"} ... {"}"}
                    </div>
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-emerald-400">
                      <span className="text-gray-500">02</span> .admission-bridge {"{"} ... {"}"}
                    </div>
                    <div className="p-3 rounded-xl bg-[#014751]/40 border border-[#014751]/50 text-white group-hover:scale-105 transition-transform shadow-lg">
                      <span className="text-white/60">03</span> .success-protocol {"{"} ... {"}"}
                    </div>
                  </div>
                </div>
                <div className="mt-8 relative z-10">
                  <p className="text-xs text-gray-500 mb-2 font-bold uppercase tracking-widest">Architecting Paths</p>
                  <p className="text-sm text-gray-300">Defining clear success routes for every Nigerian scholar.</p>
                </div>
              </div>

              {/* Card 3: Seamless Transition (Small) */}
              <div className="md:col-span-6 lg:col-span-4 md:row-span-1 bg-[#F8F9FA] border border-gray-200/50 rounded-[32px] p-8 flex flex-col justify-center items-center text-center overflow-hidden group relative min-h-[220px] sm:min-h-0">
                <div className="absolute top-4 right-6 flex gap-1">
                  <div className="w-1 h-1 rounded-full bg-teal-500/30 animate-ping"></div>
                  <div className="w-1 h-1 rounded-full bg-teal-500/20"></div>
                </div>
                <div className="text-5xl sm:text-6xl font-black text-gray-900 tracking-tighter group-hover:scale-110 transition-transform duration-500 blur-[0.5px] group-hover:blur-0">
                  Fluid.
                </div>
                <div className="flex items-center gap-3 mt-4">
                  <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em] font-bold">Secondary</p>
                  <svg className="w-4 h-4 text-[#014751]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M17 8l4 4m0 0l-4 4m4-4H3" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" /></svg>
                  <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em] font-bold">Tertiary</p>
                </div>
              </div>

              {/* Card 4: Integrations (Small) */}
              <div className="md:col-span-6 lg:col-span-4 md:row-span-1 bg-[#F8F9FA] border border-gray-200/50 rounded-[32px] p-8 flex flex-col justify-between group relative overflow-hidden min-h-[220px] sm:min-h-0">
                {/* Decorative background grid/dots */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#014751 1px, transparent 0)', backgroundSize: '15px 15px' }}></div>

                <div className="flex flex-wrap gap-2.5 items-center relative z-10">
                  <div className="w-10 h-10 rounded-xl bg-white shadow-sm border border-gray-100 flex flex-col items-center justify-center text-gray-900 group-hover:scale-110 transition-transform duration-500">
                    <span className="font-black text-[9px] leading-tight">JAMB</span>
                    <div className="w-1 h-1 bg-green-500 rounded-full mt-0.5"></div>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-white shadow-sm border border-gray-100 flex items-center justify-center text-[#014751] font-bold text-[9px] italic group-hover:scale-110 transition-transform delay-75 duration-500 leading-tight">WAEC</div>
                  <div className="w-10 h-10 rounded-xl bg-white shadow-sm border border-gray-100 flex items-center justify-center text-gray-400 font-bold text-[9px] group-hover:scale-110 transition-transform delay-100 duration-500 opacity-60 leading-tight">NECO</div>
                  <div className="w-10 h-10 rounded-xl bg-[#014751] flex items-center justify-center text-white group-hover:scale-110 transition-transform delay-150 duration-500 relative">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" /></svg>
                    <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
                  </div>
                </div>
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-1.5">
                    <h4 className="text-sm font-bold text-gray-900">Universal Sync</h4>
                    <span className="text-[7px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full font-black uppercase tracking-tighter">API ACTIVE</span>
                  </div>
                  <p className="text-[10px] text-gray-500 font-bold leading-relaxed">Instant verification across JAMB, WAEC & Institutional databases.</p>
                  <div className="mt-4 flex items-center gap-2">
                    <div className="h-[2px] w-8 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 w-2/3 animate-[shimmer_2s_infinite]"></div>
                    </div>
                    <span className="text-[8px] text-gray-400 font-bold uppercase tracking-widest">Last Synced: Just now</span>
                  </div>
                </div>
              </div>

              {/* Card 5: Profile/CMS (Small) */}
              <div className="md:col-span-6 lg:col-span-4 md:row-span-1 bg-white border border-gray-100 rounded-[32px] p-6 relative overflow-hidden group shadow-sm hover:shadow-md transition-all duration-500 min-h-[220px] sm:min-h-0">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#014751] text-white flex items-center justify-center text-xs font-black border-2 border-white shadow-sm">
                      {userName?.substring(0, 1) || 'G'}
                    </div>
                    <div>
                      <p className="text-xs font-black text-gray-900">Hello, {userName || 'Guest'}</p>
                      <p className="text-[9px] text-gray-400 font-black tracking-[0.1em] uppercase">Academic Hub Active</p>
                    </div>
                  </div>
                  <div className="flex gap-1.5 pt-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-teal-500 shadow-[0_0_8px_rgba(20,184,166,0.6)] animate-pulse"></div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-gray-50/80 rounded-2xl p-4 border border-gray-100">
                    <div className="flex justify-between items-end mb-2">
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Total Progress</span>
                      <span className="text-sm font-black text-[#014751]">87%</span>
                    </div>
                    <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-[#014751] to-teal-400 w-[87%] rounded-full shadow-inner"></div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <div className="flex-1 bg-gray-50/50 rounded-xl p-2.5 border border-gray-100 flex flex-col items-center">
                      <span className="text-[8px] text-gray-400 font-bold uppercase mb-1 whitespace-nowrap">Missions Done</span>
                      <span className="text-xs font-black text-gray-900">12/15</span>
                    </div>
                    <div className="flex-1 bg-[#014751]/5 rounded-xl p-2.5 border border-[#014751]/10 flex flex-col items-center">
                      <span className="text-[8px] text-[#014751]/60 font-bold uppercase mb-1 whitespace-nowrap">Current Rank</span>
                      <span className="text-xs font-black text-[#014751]">#4</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 6: Ride With Me (Large/Wide) */}
              <div className="md:col-span-12 lg:col-span-12 bg-[#EFF6FF] border border-blue-100 rounded-[32px] p-6 sm:p-8 pb-10 sm:pb-12 relative overflow-hidden group shadow-sm hover:shadow-md transition-all duration-500 min-h-[260px] md:h-auto flex flex-col md:flex-row gap-6 justify-between">
                {/* Left Side: Info */}
                <div className="flex flex-col justify-between flex-1 relative z-10">
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-600 text-[8px] font-black uppercase tracking-wider mb-3">
                      🚗 Ride with Me
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">Camp Transit Link Up</h3>
                    <p className="text-gray-500 text-xs font-semibold leading-relaxed max-w-[320px]">
                      Find corpers travelling the same route as you — form a pod, move to camp together, split the fare, and arrive safe. Works for the trip to camp, interstate travel, and the journey back home after camp.
                    </p>
                  </div>
                  <div className="mt-6 flex items-center gap-3">
                    <span className="text-[9px] font-mono text-blue-600 font-bold bg-white px-2 py-1.5 rounded-lg shadow-sm border border-blue-100/50">Verified Co-Travelers</span>
                    <div className="flex -space-x-2">
                      <div className="w-6 h-6 rounded-full border border-white bg-gray-200 overflow-hidden relative">
                        <Image src="/images/one-one.png" fill alt="R1" className="object-cover animate-[pulse_3s_infinite]" />
                      </div>
                      <div className="w-6 h-6 rounded-full border border-white bg-gray-300 overflow-hidden relative">
                        <Image src="/images/one-v-one.png" fill alt="R2" className="object-cover animate-[pulse_3s_infinite_1.5s]" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Side: Travel Pod Widget */}
                <div className="flex-1 min-w-[280px] bg-white/65 backdrop-blur-md rounded-2xl p-4 border border-blue-100/60 relative z-10 flex flex-col justify-between shadow-sm">
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Active Pods</span>
                      <span className="inline-flex items-center gap-1 text-[8px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full border border-green-100">
                        <span className="w-1 h-1 rounded-full bg-green-500 animate-ping"></span> Live
                      </span>
                    </div>
                    <div className="space-y-2">
                      {/* Route 1 — To Camp */}
                      <div className="flex items-center justify-between p-3 rounded-xl bg-blue-50/50 border border-blue-100/30 hover:bg-blue-50 transition-colors">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">🏕️</span>
                          <div>
                            <p className="text-[10px] font-black text-gray-900 leading-tight">Departure State → NYSC Camp</p>
                            <p className="text-[8px] text-gray-400 font-bold uppercase mt-0.5">To Camp · Pod Link Up</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-[8px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">Open</p>
                        </div>
                      </div>
                      {/* Route 2 — Back Home */}
                      <div className="flex items-center justify-between p-3 rounded-xl bg-purple-50/40 border border-purple-100/30 hover:bg-purple-50/70 transition-colors">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">🏠</span>
                          <div>
                            <p className="text-[10px] font-black text-gray-900 leading-tight">NYSC Camp → Home State</p>
                            <p className="text-[8px] text-gray-400 font-bold uppercase mt-0.5">Back Home · Pod Link Up</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-[8px] font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">Open</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Pod CTA */}
                  <div className="mt-3 pt-3 border-t border-blue-100/50 flex justify-between items-center">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs">👥</span>
                      <span className="text-[9px] text-gray-500 font-bold uppercase">Split Fare · Travel as One</span>
                    </div>
                    <button className="text-[9px] font-black uppercase bg-[#014751] hover:bg-[#01373e] text-white px-3 py-1.5 rounded-lg shadow-sm hover:scale-105 transition-all">
                      Find a Pod
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>




        {/* Vision Section — problem narration */}
        <section data-suni-section="problem" className="py-24 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-center text-center">
              <div className="bg-[#014751]/5 px-4 py-1.5 rounded-full text-[10px] text-[#014751] font-bold uppercase tracking-widest border border-[#014751]/10 mb-8">
                Our Vision
              </div>
              <h2 className="text-5xl sm:text-7xl md:text-8xl font-neonderthaw text-gray-900 tracking-tight leading-tight">
                Prevent academic hurdle.
              </h2>
              <p className="mt-8 text-gray-500 max-w-2xl text-xl sm:text-2xl font-medium leading-relaxed">
                Empowering Nigerian students through holistic wellness and academic excellence.
                Your journey to success starts here.
              </p>
            </div>
          </div>
        </section>

        {/* Premium Benefits Section — secondary narration */}
        <section data-suni-section="secondary" className="px-4 sm:px-6 py-16 sm:py-24 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="mb-12">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
                Unlock Premium Benefits with
                <br className="hidden sm:block" />
                Our Advanced Features
              </h2>
              <p className="text-gray-500 max-w-2xl text-lg">
                Simplify your educational journey with our easy-to-use, scalable SabiDub platform.
                Built for Nigerian students, our tools make complex learning simple.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

              {/* Card 1: Pathways */}
              <div className="md:col-span-4 bg-[#F8F9FA] rounded-[40px] p-8 sm:p-10 flex flex-col min-h-[420px] md:h-[480px] overflow-hidden relative border border-gray-100/50">
                <div className="relative z-10">
                  <h3 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">Pathways</h3>
                  <p className="text-gray-500 text-base leading-relaxed max-w-[280px]">
                    Dive into a <span className="font-bold text-gray-900">world of knowledge</span> tailored to your goals. Explore curated courses...
                  </p>
                </div>

                <div className="absolute inset-x-0 bottom-0 top-[45%] px-4 pb-4">
                  <div className="relative w-full h-full rounded-[30px] overflow-hidden shadow-sm">
                    <Image src="/images/digital-evolution.png" alt="Pathways" fill className="object-cover" />

                    {/* Tags Overlay - Matching the image design */}
                    <div className="absolute bottom-6 left-0 right-0 flex justify-center items-center px-4">
                      <div className="flex bg-white/40 backdrop-blur-md rounded-2xl p-1.5 gap-2 border border-white/20 shadow-xl">
                        <span className="px-4 py-2 bg-white/90 text-gray-800 rounded-xl text-[10px] font-bold shadow-sm whitespace-nowrap">Coding</span>
                        <span className="px-4 py-2 bg-white/90 text-gray-800 rounded-xl text-[10px] font-bold shadow-sm whitespace-nowrap">Design</span>
                        <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white flex-shrink-0">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7-7 7" />
                          </svg>
                        </div>
                        <span className="px-4 py-2 bg-white/90 text-gray-800 rounded-xl text-[10px] font-bold shadow-sm whitespace-nowrap">Health</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2: 1 vs 1 World Challenge */}
              <div className="md:col-span-4 bg-[#F8F9FA] rounded-[40px] p-8 sm:p-10 flex flex-col min-h-[420px] md:h-[480px] overflow-hidden border border-gray-100/50 group hover:border-[#014751]/20 transition-all duration-500">
                <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 text-[9px] font-bold uppercase tracking-wider mb-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
                    Live Competition
                  </div>
                  <h3 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">1 vs 1 World</h3>
                  <p className="text-gray-500 text-base leading-relaxed">
                    Challenge peers across <span className="font-bold text-gray-900">institutions, departments, and countries</span>. Real-time competitive learning at its peak.
                  </p>
                </div>

                {/* Avatar Network Hub Visual */}
                <div className="flex-1 flex items-center justify-center relative mt-12 scale-110">
                  <div className="w-56 h-56 relative">
                    {/* Central Avatar */}
                    <div className="absolute inset-0 m-auto w-20 h-20 rounded-full border-[6px] border-white shadow-2xl z-20 overflow-hidden ring-4 ring-[#AFF8C8]/20">
                      <Image src="/images/one-vs-one-center.png" alt="Avatar" fill className="object-cover" />
                    </div>

                    {/* Connecting Lines */}
                    <svg className="absolute inset-0 w-full h-full text-gray-200" viewBox="0 0 100 100">
                      <path d="M50 50 Q 30 30 15 15" stroke="currentColor" strokeWidth="0.5" fill="none" strokeDasharray="3 3" />
                      <path d="M50 50 Q 80 40 90 25" stroke="currentColor" strokeWidth="0.5" fill="none" strokeDasharray="3 3" />
                      <path d="M50 50 Q 20 60 10 80" stroke="currentColor" strokeWidth="0.5" fill="none" strokeDasharray="3 3" />
                      <path d="M50 50 Q 85 70 95 85" stroke="currentColor" strokeWidth="0.5" fill="none" strokeDasharray="3 3" />
                    </svg>

                    {/* Surrounding Avatars with status icons */}
                    <div className="absolute top-0 left-0 w-12 h-12 rounded-full border-4 border-white shadow-lg overflow-hidden bg-white">
                      <Image src="/images/one-one.png" alt="M1" fill className="object-cover" />
                    </div>
                    <div className="absolute top-10 right-2 w-10 h-10 rounded-full border-4 border-white shadow-lg overflow-hidden bg-white">
                      <Image src="/images/one-v-one.png" alt="M2" fill className="object-cover" />
                    </div>
                    <div className="absolute bottom-5 left-0 w-14 h-14 rounded-full border-4 border-white shadow-lg overflow-hidden bg-white transition-transform hover:scale-110">
                      <Image src="/images/one-one-alt.png" alt="M3" fill className="object-cover" />
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#AFF8C8] rounded-full border-2 border-white flex items-center justify-center">
                        <span className="text-[10px] saturate-150">✍️</span>
                      </div>
                    </div>
                    <div className="absolute bottom-4 right-6 w-11 h-11 rounded-full border-4 border-white shadow-lg overflow-hidden bg-white">
                      <Image src="/images/one-vs-one.png" alt="M4" fill className="object-cover" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 3: Discovery (Tall) */}
              <div className="md:col-span-4 md:row-span-2 bg-[#F8F9FA] rounded-[40px] pt-12 overflow-hidden border border-gray-100/50 flex flex-col min-h-[600px] md:h-[984px]">
                <div className="px-6 sm:px-10 text-center">
                  <div className="flex items-center justify-between mb-10 sm:mb-20 bg-white shadow-sm px-4 py-3 rounded-2xl border border-gray-100">
                    <span className="font-black text-gray-900 text-sm flex items-center gap-2">
                      <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white text-[10px]">
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                        </svg>
                      </div>
                      SabiDub Ambassador
                    </span>
                    <button className="text-gray-400">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                      </svg>
                    </button>
                  </div>

                  <div className="mb-6">
                    <span className="px-4 py-1.5 bg-white shadow-sm border border-gray-100 text-gray-500 rounded-lg text-xs font-bold">Rebound <span className="text-black">C</span></span>
                  </div>

                  <h3 className="text-5xl font-bold text-gray-900 mb-6 leading-tight tracking-tight">Discover learning path</h3>
                  <p className="text-gray-500 text-base mb-12 max-w-[240px] mx-auto leading-relaxed">
                    Stay organized and on track with your <span className="font-bold text-gray-900">personalized</span> schedule.
                  </p>

                  {/* Search Bar Visual - Matching exactly */}
                  <div className="relative max-w-[340px] mx-auto mb-20">
                    <div className="w-full bg-white border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.08)] rounded-[20px] py-4 px-6 text-left text-gray-300 text-xs flex items-center justify-between">
                      Search for education desire...
                      <div className="w-10 h-10 bg-[#014751] rounded-xl flex items-center justify-center text-white transition-transform hover:scale-105">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Topographic Waves Visual - Complex Green Style */}
                <div className="mt-auto relative h-[300px] sm:h-[400px] md:h-[610px] w-full">
                  <div className="absolute inset-0 z-0">
                    <Image src="/images/discover-path.png" alt="Waves" fill className="object-cover object-bottom" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#40916C]/10 to-transparent"></div>
                  </div>
                  {/* Brand Badges at bottom */}
                  <div className="absolute inset-x-0 bottom-12 px-10 flex justify-between items-center z-10 opacity-60">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Circus</span>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Mercury</span>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Remotemiro</span>
                    <div className="w-6 h-6 rounded-full border-2 border-gray-400 flex items-center justify-center">B</div>
                  </div>
                </div>
              </div>

              {/* Card 4: Ecosystem Hub (Elections, Calendar, Study Circles) */}
              <div className="md:col-span-8 bg-gradient-to-br from-[#E9C46A]/30 via-[#40916C]/20 to-[#AFF8C8]/40 rounded-[40px] p-8 sm:p-12 overflow-hidden border border-gray-100/30 min-h-[480px] md:h-[480px] relative group">
                <div className="grid grid-cols-1 md:grid-cols-2 h-full relative z-10">
                  <div className="flex flex-col justify-between py-4">
                    <div>
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#014751]/10 text-[#014751] text-[10px] font-black uppercase tracking-wider mb-6">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#014751] animate-pulse"></span>
                        Admin & Student Services
                      </div>
                      <h3 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#014751] mb-6 sm:mb-8 leading-[1.1] tracking-tighter">Unified<br />Ecosystem</h3>
                      <p className="text-[#014751]/80 text-xl leading-relaxed max-w-[400px]">
                        Transparent <span className="font-bold text-[#014751]">Election Systems</span>, real-time <span className="font-bold text-[#014751]">Academic Calendars</span>, and collaborative <span className="font-bold text-[#014751]">Study Circles</span>. Everything you need to stay organized and engaged.
                      </p>
                    </div>
                  </div>

                  {/* Floating UI Elements Overlay */}
                  <div className="relative hidden md:block">
                    {/* Calendar/Notification Card */}
                    <div className="absolute top-0 -right-4 w-[340px] h-[220px] transform rotate-2 z-10 transition-transform hover:rotate-0 duration-500">
                      <div className="bg-white rounded-3xl shadow-[0_30px_60px_rgba(0,0,0,0.12)] p-6 h-full border border-gray-100">
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-[10px] font-black uppercase text-[#014751]/60 tracking-wider">Academic Calendar</span>
                          <div className="w-8 h-8 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-600">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                          </div>
                        </div>
                        <h4 className="text-lg font-bold text-gray-900 mb-2">Upcoming Exam</h4>
                        <p className="text-xs text-gray-500 mb-4">MTH 101 — Hall A &bull; Starts in 2 hours</p>
                        <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-orange-500 w-3/4"></div>
                        </div>
                      </div>
                    </div>

                    {/* Election System Card */}
                    <div className="absolute -bottom-6 right-[120px] w-[280px] h-[260px] transform -rotate-6 z-20">
                      <div className="bg-[#014751] rounded-3xl shadow-2xl p-6 h-full border border-white/10 text-white">
                        <div className="flex items-center gap-3 mb-6">
                          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-xl">🗳️</div>
                          <div>
                            <p className="text-[10px] font-bold text-white/60 uppercase tracking-widest">Election Live</p>
                            <h4 className="text-sm font-bold">SUG President</h4>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div className="flex justify-between items-center bg-white/5 p-3 rounded-xl border border-white/10">
                            <span className="text-xs">Candidate A</span>
                            <span className="text-xs font-bold">42%</span>
                          </div>
                          <div className="flex justify-between items-center bg-white/20 p-3 rounded-xl border border-white/20">
                            <span className="text-xs">Candidate B</span>
                            <span className="text-xs font-bold">58%</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Study Circle Bubbles */}
                    <div className="absolute top-[180px] -right-10 flex flex-col gap-3 z-0 opacity-40 group-hover:opacity-100 transition-opacity">
                      <div className="bg-white p-3 rounded-2xl shadow-xl flex items-center gap-3 border border-gray-100">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        <span className="text-[10px] font-bold text-gray-800">Study Circle: Physics Hub</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 5: Class Yearbooks & Magazines */}
              <div className="md:col-span-4 bg-[#014751] rounded-[40px] p-8 sm:p-10 flex flex-col min-h-[420px] md:h-[480px] overflow-hidden relative group">
                <div className="relative z-20">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-[9px] font-bold uppercase tracking-wider mb-4 border border-white/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#AFF8C8]"></span>
                    Preserve Memories
                  </div>
                  <h3 className="text-4xl font-bold text-white mb-4 tracking-tight">Magazines</h3>
                  <p className="text-white/70 text-base leading-relaxed">
                    Store and share your <span className="font-bold text-white">Class Yearbooks</span> and faculty magazines. Safeguarding your most precious academic milestones.
                  </p>
                </div>

                <div className="absolute inset-x-0 bottom-0 top-[40%] flex items-end justify-center px-6">
                  <div className="relative w-full h-[80%] bg-white/5 rounded-t-[32px] border-x border-t border-white/10 backdrop-blur-sm p-4 overflow-hidden transform group-hover:translate-y-2 transition-transform duration-500">
                    <div className="w-full h-full rounded-2xl bg-gradient-to-br from-white/10 to-transparent relative p-4 flex flex-col justify-between">
                      <div className="space-y-2">
                        <div className="h-1.5 w-12 bg-[#AFF8C8]/40 rounded-full"></div>
                        <div className="h-1.5 w-20 bg-white/20 rounded-full"></div>
                      </div>
                      <div className="relative h-24 w-full rounded-xl overflow-hidden border border-white/5">
                        <Image src="/images/magazine-packed.png" alt="Magazine" fill className="object-cover opacity-50 transition-opacity group-hover:opacity-80" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Decorative particles */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#AFF8C8] rounded-full blur-[100px] opacity-10 pointer-events-none"></div>
              </div>

              {/* Card 6: Institutional Hubs */}
              <div className="md:col-span-8 bg-[#F8F9FA] rounded-[40px] p-8 sm:p-12 overflow-hidden border border-gray-100/30 min-h-[420px] md:h-[480px] relative group shadow-sm hover:shadow-xl transition-all duration-500">
                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#014751]/10 text-[#014751] text-[9px] font-bold uppercase tracking-wider mb-6">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#014751]"></span>
                      Unified Connectivity
                    </div>
                    <h3 className="text-4xl sm:text-5xl font-black text-gray-900 mb-6 tracking-tight">Department &<br />School Hubs</h3>
                    <p className="text-gray-500 text-lg leading-relaxed max-w-[380px]">
                      Bridge the communication gap. Dedicated digital spaces for <span className="font-bold text-gray-900">Schools, Departments, and Institutions</span> to collaborate and share resources locally and globally.
                    </p>
                  </div>

                  <div className="flex gap-4 mt-8">
                    <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#014751]/5 flex items-center justify-center">🏫</div>
                      <span className="text-xs font-bold text-gray-700">Inter-school</span>
                    </div>
                    <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#014751]/5 flex items-center justify-center">🏢</div>
                      <span className="text-xs font-bold text-gray-700">Departments</span>
                    </div>
                  </div>
                </div>

                {/* Background visual element */}
                <div className="absolute top-12 right-12 opacity-10 group-hover:opacity-20 transition-opacity">
                  <svg width="200" height="200" viewBox="0 0 24 24" fill="none" stroke="#014751" strokeWidth="0.5">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                    <path d="M2 12h20" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Partners Section — partners narration */}
        <section data-suni-section="partners" className="px-4 sm:px-6 py-24 bg-white relative z-10 border-t border-gray-100">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight" suppressHydrationWarning>Backed by strong global partners</h2>
              <p className="text-gray-500 max-w-2xl text-lg leading-relaxed">
                SabiDub is supported by notable investors as well as some of the best education and technology companies on the planet.
              </p>
            </div>

            <div className="flex overflow-x-auto gap-8 pb-8 no-scrollbar snap-x snap-mandatory">
              <motion.div variants={fadeInUp} initial="initial" whileInView="animate" viewport={{ once: true }} className="flex-shrink-0 w-[85vw] sm:w-[450px] snap-start bg-[#F8F9FA] p-10 rounded-[40px] border border-gray-100/50 hover:border-[#014751]/20 transition-all group">
                <div className="h-12 relative mb-10 flex items-center">
                  <Image src="/images/difinito.png" alt="Difinito" width={120} height={40} className="object-contain transition-all" />
                </div>
                <p className="text-gray-600 mb-12 leading-relaxed text-sm font-medium">
                  SabiDub is a visionary platform that bridges the gap for Nigerian students. We are proud to support their efforts in enhancing educational accessibility.
                </p>
                <div className="flex items-center gap-4 mt-auto">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-md bg-white">
                    <Image src="/images/founder.jpg" alt="Founder" fill className="object-cover" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">Founder</h4>
                    <p className="text-[10px] uppercase tracking-wider font-extrabold text-[#014751]">Hamman Dlama</p>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={fadeInUp} initial="initial" whileInView="animate" viewport={{ once: true }} transition={{ delay: 0.1 }} className="flex-shrink-0 w-[85vw] sm:w-[450px] snap-start bg-[#F8F9FA] p-10 rounded-[40px] border border-gray-100/50 hover:border-[#014751]/20 transition-all group">
                <div className="h-12 relative mb-10 flex items-center">
                  <span className="font-black text-gray-900 text-2xl tracking-tighter transition-all">Dr. Oghogho <span className="text-[#014751]">Garrick</span></span>
                </div>
                <p className="text-gray-600 mb-12 leading-relaxed text-sm font-medium">
                  Providing structural transformation by sponsoring 10,000 students in Edo State. Committed to restoring hope and empowering the next generation through SabiDub.
                </p>
                <div className="flex items-center gap-4 mt-auto">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-md bg-white">
                    <Image src="/images/taiye-garrick.jpeg" alt="Dr. Oghogho Taiye Garrick" fill className="object-cover" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">Strategic Partner</h4>
                    <p className="text-[10px] uppercase tracking-wider font-extrabold text-[#014751]">Dr. Oghogho Taiye Garrick (PhD)</p>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={fadeInUp} initial="initial" whileInView="animate" viewport={{ once: true }} transition={{ delay: 0.2 }} className="flex-shrink-0 w-[85vw] sm:w-[450px] snap-start bg-[#F8F9FA] p-10 rounded-[40px] border border-gray-100/50 hover:border-[#014751]/20 transition-all group">
                <div className="h-12 relative mb-10 flex items-center">
                  <Image src="/images/thevoice2u.png" alt="Voice2u" width={140} height={40} className="object-contain transition-all" />
                </div>
                <p className="text-gray-600 mb-12 leading-relaxed text-sm font-medium">
                  The future of education is digital. SabiDub is at the forefront of this change, and we are excited to be part of their journey in transforming student lives.
                </p>
                <div className="flex items-center gap-4 mt-auto">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-md bg-white">
                    <Image src="/images/one-one-alt.png" alt="CEO" fill className="object-cover" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">CEO</h4>
                    <p className="text-[10px] uppercase tracking-wider font-extrabold text-[#014751]">Voice2u</p>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={fadeInUp} initial="initial" whileInView="animate" viewport={{ once: true }} transition={{ delay: 0.3 }} className="flex-shrink-0 w-[85vw] sm:w-[450px] snap-start bg-[#F8F9FA] p-10 rounded-[40px] border border-gray-100/50 hover:border-[#014751]/20 transition-all group">
                <div className="h-12 relative mb-10 flex items-center">
                  <Image src="/images/facesta.png" alt="Facesta" width={120} height={40} className="object-contain transition-all" />
                </div>
                <p className="text-gray-600 mb-12 leading-relaxed text-sm font-medium">
                  SabiDub is redefining how students prepare for their future. We are proud to be part of this transformation in the Nigerian educational ecosystem.
                </p>
                <div className="flex items-center gap-4 mt-auto">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-md bg-white">
                    <Image src="/images/jnr.jpg" alt="CEO" fill className="object-cover" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">Facesta</h4>
                    <p className="text-[10px] uppercase tracking-wider font-extrabold text-[#014751]">CEO & Founder</p>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={fadeInUp} initial="initial" whileInView="animate" viewport={{ once: true }} transition={{ delay: 0.4 }} className="flex-shrink-0 w-[85vw] sm:w-[450px] snap-start bg-[#F8F9FA] p-10 rounded-[40px] border border-gray-100/50 hover:border-[#014751]/20 transition-all group">
                <div className="h-12 relative mb-10 flex items-center">
                  <Image src="/images/melab.png" alt="MELAB" width={120} height={40} className="object-contain transition-all" />
                </div>
                <p className="text-gray-600 mb-12 leading-relaxed text-sm font-medium">
                  The innovation SabiDub brings to the table is exactly what the education sector needs. Their commitment to student success is unparalleled.
                </p>
                <div className="flex items-center gap-4 mt-auto">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-md bg-white">
                    <Image src="/images/abafoni.jpg" alt="CEO" fill className="object-cover" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">Founder/CEO</h4>
                    <p className="text-[10px] uppercase tracking-wider font-extrabold text-[#014751] leading-tight">Abafoni Jesse Jackson</p>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={fadeInUp} initial="initial" whileInView="animate" viewport={{ once: true }} transition={{ delay: 0.5 }} className="flex-shrink-0 w-[85vw] sm:w-[450px] snap-start bg-[#F8F9FA] p-10 rounded-[40px] border border-gray-100/50 hover:border-[#014751]/20 transition-all group">
                <div className="h-12 relative mb-10 flex items-center">
                  <span className="font-black text-gray-900 text-3xl tracking-tighter transition-all">Venndoor</span>
                </div>
                <p className="text-gray-600 mb-12 leading-relaxed text-sm font-medium">
                  SabiDub&apos;s ecosystem is perfectly positioned to capture the next wave of digital transformation in African education. We believe in their vision.
                </p>
                <div className="flex items-center gap-4 mt-auto">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-md bg-white">
                    <Image src="/images/IMG_5562.JPG" alt="CEO" fill className="object-cover" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">Founder/CEO</h4>
                    <p className="text-[10px] uppercase tracking-wider font-extrabold text-[#014751]">Ijeaku Valentine Kelechi</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Digital Ecosystem Section — schooltools narration */}
        <section data-suni-section="schooltools" className="px-4 sm:px-6 py-24 bg-[#FAF9F6] relative overflow-hidden border-t border-gray-100">
          <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#014751 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-16">
              <motion.div variants={fadeInUp} initial="initial" whileInView="animate" className="inline-block px-4 py-1.5 mb-6 rounded-full bg-[#014751]/5 border border-[#014751]/10">
                <span className="text-[#014751] text-[10px] font-black uppercase tracking-widest">Our Network</span>
              </motion.div>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 mb-6 tracking-tighter">
                One Ecosystem. <span className="text-[#014751] italic font-serif">Multiple Gateways.</span>
              </h2>
              <p className="text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed">
                Whether you&apos;re managing an institution, leading as a student ambassador, or supporting our users, SabiDub provides tailored portals for every role.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto px-4">
              {/* School Management Portal */}
              <motion.div
                variants={fadeInUp}
                initial="initial"
                whileInView="animate"
                whileHover={{ scale: 1.01 }}
                className="bg-[#FFEFE4] p-8 sm:p-12 rounded-[24px] relative overflow-hidden group min-h-[420px] flex flex-col justify-between shadow-sm hover:shadow-xl transition-all duration-500"
              >
                {/* Status Badge */}
                <div className="relative z-10 flex mb-12">
                  <div className="bg-white px-5 py-2.5 rounded-full flex items-center gap-3 shadow-sm">
                    <div className="w-2.5 h-2.5 rounded-full bg-orange-500"></div>
                    <span className="text-[13px] font-medium text-gray-800 tracking-tight">Portal / Admin-priority</span>
                  </div>
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 tracking-tight">School Management</h3>
                  <p className="text-gray-600 text-[17px] leading-relaxed max-w-[320px] font-medium opacity-80">
                    High-performance administration tools. Manage student records, academic calendars, and institutional analytics with precision.
                  </p>
                </div>

                {/* CTA */}
                <div className="relative z-10 mt-12 flex flex-wrap items-center gap-6">
                  <Link href="https://portal.sabidub.com/auth/school/signin" className="inline-block group/link">
                    <span className="font-bold text-gray-900 flex items-center gap-2 group-hover/link:gap-3 transition-all duration-300 uppercase text-[13px] tracking-widest">
                      Access Portal <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7-7 7" /></svg>
                    </span>
                    <div className="h-0.5 w-full bg-gray-900 mt-1"></div>
                  </Link>
                </div>

                {/* Geometric Shapes (Chevrons/Arrows) */}
                <div className="absolute top-1/2 right-[-20px] -translate-y-1/2 pointer-events-none opacity-40">
                  <svg width="340" height="340" viewBox="0 0 340 340" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M180 50L280 170L180 290" stroke="url(#orange-grad)" strokeWidth="80" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
                    <path d="M80 50L180 170L80 290" stroke="url(#orange-grad)" strokeWidth="80" strokeLinecap="round" strokeLinejoin="round" />
                    <defs>
                      <linearGradient id="orange-grad" x1="80" y1="170" x2="280" y2="170" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#F97316" />
                        <stop offset="1" stopColor="#F97316" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </motion.div>

              {/* Ambassador Hub */}
              <motion.div
                variants={fadeInUp}
                initial="initial"
                whileInView="animate"
                transition={{ delay: 0.1 }}
                whileHover={{ scale: 1.01 }}
                className="bg-[#F1F1F0] p-8 sm:p-12 rounded-[24px] relative overflow-hidden group min-h-[420px] flex flex-col justify-between shadow-sm hover:shadow-xl transition-all duration-500"
              >
                {/* Status Badge */}
                <div className="relative z-10 flex mb-12">
                  <div className="bg-white px-5 py-2.5 rounded-full flex items-center gap-3 shadow-sm">
                    <div className="w-2.5 h-2.5 rounded-full bg-black"></div>
                    <span className="text-[13px] font-medium text-gray-800 tracking-tight">Open for applications</span>
                  </div>
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 tracking-tight">Ambassador Hub</h3>
                  <p className="text-gray-600 text-[17px] leading-relaxed max-w-[320px] font-medium opacity-80">
                    Dedicated space for student leaders. Coordinate campus activities, manage outreach, and track impact across the network.
                  </p>
                </div>

                {/* CTA */}
                <div className="relative z-10 mt-12 flex flex-wrap items-center gap-6">
                  <Link href="https://portal.sabidub.com/ambassador/login" className="inline-block group/link">
                    <span className="font-bold text-gray-900 flex items-center gap-2 group-hover/link:gap-3 transition-all duration-300 uppercase text-[13px] tracking-widest">
                      Join Hub <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7-7 7" /></svg>
                    </span>
                    <div className="h-0.5 w-full bg-gray-900 mt-1"></div>
                  </Link>
                </div>

                {/* Geometric Shapes (Discs/Circles) */}
                <div className="absolute top-0 right-0 h-full w-1/3 pointer-events-none opacity-20">
                  <svg width="100%" height="100%" viewBox="0 0 200 600" preserveAspectRatio="xMidYMid slice" fill="none">
                    <circle cx="200" cy="150" r="100" fill="url(#bw-grad)" />
                    <circle cx="200" cy="350" r="100" fill="url(#bw-grad)" />
                    <circle cx="200" cy="550" r="100" fill="url(#bw-grad)" />
                    <defs>
                      <linearGradient id="bw-grad" x1="100" y1="400" x2="200" y2="400" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#000" />
                        <stop offset="1" stopColor="#000" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </motion.div>

              {/* Global Student Network */}
              <motion.div
                variants={fadeInUp}
                initial="initial"
                whileInView="animate"
                transition={{ delay: 0.2 }}
                whileHover={{ scale: 1.01 }}
                className="bg-[#E4F2FF] p-8 sm:p-12 rounded-[24px] relative overflow-hidden group min-h-[420px] flex flex-col justify-between shadow-sm hover:shadow-xl transition-all duration-500"
              >
                {/* Status Badge */}
                <div className="relative z-10 flex mb-12">
                  <div className="bg-white px-5 py-2.5 rounded-full flex items-center gap-3 shadow-sm">
                    <div className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse"></div>
                    <span className="text-[13px] font-medium text-gray-800 tracking-tight">Active Network</span>
                  </div>
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 tracking-tight">Student Network</h3>
                  <p className="text-gray-600 text-[17px] leading-relaxed max-w-[320px] font-medium opacity-80">
                    Connect across <span className="font-bold text-[#014751]">Countries, Schools, and Departments</span>. Participate in real-time 1vs1 competitions and access institutional hubs.
                  </p>
                </div>

                {/* CTA */}
                <div className="relative z-10 mt-12">
                  <Link href="/services" className="inline-block group/link">
                    <span className="font-bold text-gray-900 flex items-center gap-2 group-hover/link:gap-3 transition-all duration-300 uppercase text-[13px] tracking-widest">
                      Explore Network <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7-7 7" /></svg>
                    </span>
                    <div className="h-0.5 w-full bg-gray-900 mt-1"></div>
                  </Link>
                </div>

                {/* Decorative background grid/dots */}
                <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#014751 2px, transparent 0)', backgroundSize: '15px 15px' }}></div>

                {/* Visual element (Orb) */}
                <div className="absolute bottom-[-100px] right-[-100px] w-64 h-64 bg-blue-400/20 rounded-full blur-[80px] group-hover:bg-blue-400/30 transition-colors duration-700"></div>
              </motion.div>

              {/* NYSC Digital Hub */}
              <motion.div
                variants={fadeInUp}
                initial="initial"
                whileInView="animate"
                transition={{ delay: 0.3 }}
                whileHover={{ scale: 1.01 }}
                className="bg-[#E6F5EC] p-8 sm:p-12 rounded-[24px] relative overflow-hidden group min-h-[420px] flex flex-col justify-between shadow-sm hover:shadow-xl transition-all duration-500"
              >
                {/* Status Badge */}
                <div className="relative z-10 flex mb-12">
                  <div className="bg-white px-5 py-2.5 rounded-full flex items-center gap-3 shadow-sm">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
                    <span className="text-[13px] font-medium text-gray-800 tracking-tight">NYSC Hub / Active</span>
                  </div>
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 tracking-tight">NYSC Portal</h3>
                  <p className="text-gray-600 text-[17px] leading-relaxed max-w-[320px] font-medium opacity-80">
                    Connect on Served & Serving Corp Members Yearbook, generate digital profile passports, and launch platoon financial directives seamlessly.
                  </p>
                </div>

                {/* CTA */}
                <div className="relative z-10 mt-12">
                  <Link href="/nysc" className="inline-block group/link">
                    <span className="font-bold text-gray-900 flex items-center gap-2 group-hover/link:gap-3 transition-all duration-300 uppercase text-[13px] tracking-widest">
                      Access Hub <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7-7 7" /></svg>
                    </span>
                    <div className="h-0.5 w-full bg-gray-900 mt-1"></div>
                  </Link>
                </div>

                {/* Decorative background grid/dots */}
                <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#059669 2px, transparent 0)', backgroundSize: '15px 15px' }}></div>

                {/* Visual element (Orb) */}
                <div className="absolute bottom-[-100px] right-[-100px] w-64 h-64 bg-emerald-400/20 rounded-full blur-[80px] group-hover:bg-emerald-400/30 transition-colors duration-700"></div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ─── MOBILE APP SECTION ─── */}
        <section className="py-8 sm:py-16 bg-white overflow-hidden relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-[#014751] rounded-[32px] sm:rounded-[48px] p-6 sm:p-12 relative overflow-hidden group">
              {/* Background Elements */}
              <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-700" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#AFF8C8] rounded-full blur-[140px] opacity-20 -translate-y-1/2 translate-x-1/2"></div>

              <div className="grid lg:grid-cols-2 gap-8 sm:gap-16 items-center relative z-10">
                {/* Left Side: Content */}
                <div className="text-left">
                  <motion.div variants={fadeInUp} initial="initial" whileInView="animate" className="inline-block px-3 py-1 mb-6 sm:mb-8 rounded-full bg-white/10 border border-white/20">
                    <span className="text-[#AFF8C8] text-[9px] sm:text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#AFF8C8] animate-pulse"></span>
                      Mobile Experience
                    </span>
                  </motion.div>

                  <h2 className="text-3xl sm:text-5xl font-black text-white mb-4 sm:mb-6 tracking-tighter leading-[1.1]">
                    Your Education,<br />
                    <span className="text-[#AFF8C8] italic font-serif text-[1.1em]">In Your Pocket.</span>
                  </h2>

                  <p className="text-white/70 text-sm sm:text-lg mb-6 sm:mb-8 max-w-xl font-medium leading-relaxed">
                    Take your learning journey anywhere. Access thousands of past questions and track your rank — all without using data in offline mode.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-[#AFF8C8] shrink-0 border border-white/10">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                      </div>
                      <div>
                        <h4 className="text-white font-bold text-xs sm:text-sm mb-1 uppercase tracking-wider">Offline Study</h4>
                        <p className="text-white/40 text-[10px] sm:text-[11px] leading-tight font-medium">Study past questions without internet connection.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-[#AFF8C8] shrink-0 border border-white/10">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                      </div>
                      <div>
                        <h4 className="text-white font-bold text-xs sm:text-sm mb-1 uppercase tracking-wider">Smart Alerts</h4>
                        <p className="text-white/40 text-[10px] sm:text-[11px] leading-tight font-medium">Instant exam and study session reminders.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Side: Mockup */}
                <div className="relative mt-12 lg:mt-0 px-4 sm:px-0">
                  <motion.div
                    animate={{
                      y: [-15, 15, -15],
                      rotate: [-1, 1, -1]
                    }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="relative z-10 w-full max-w-[280px] sm:max-w-[300px] mx-auto filter drop-shadow-[0_35px_35px_rgba(0,0,0,0.5)]"
                  >
                    <Image
                      src="/images/app-mockup.png"
                      alt="SabiDub App Mockup"
                      width={500}
                      height={1000}
                      className="w-full h-auto brightness-110 rounded-[10px]"
                      priority
                    />
                  </motion.div>

                  {/* Tooltip Card */}
                  <motion.div
                    initial={{ x: 20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    className="absolute -bottom-4 right-0 sm:bottom-10 sm:-right-4 bg-white/95 backdrop-blur-xl p-4 sm:p-5 rounded-2xl sm:rounded-3xl shadow-2xl border border-white/40 z-20 max-w-[150px] sm:max-w-[180px]"
                  >
                    <div className="flex items-center gap-2 sm:gap-3 mb-2">
                      <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-600">
                        <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                      </div>
                      <span className="text-[8px] sm:text-[9px] font-black uppercase text-gray-400">Live Sync</span>
                    </div>
                    <p className="text-[10px] sm:text-[11px] font-bold text-gray-900 leading-snug">Synced across all your devices.</p>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Blog/Featured Articles Section — community narration */}
        <section data-suni-section="community" className="py-20 bg-gray-50/50 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-end mb-12">
              <div>
                <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[#0F2830]">
                  Featured <span className="text-[#014751] italic font-serif">Articles</span>
                </h2>
                <p className="mt-2 text-gray-500 font-medium">Insights and guides from our expert educators</p>
              </div>
              <Link
                href="/blog"
                className="hidden sm:flex items-center gap-2 px-6 py-3 bg-white border border-gray-100 rounded-full shadow-sm hover:shadow-md transition-all group"
              >
                <span className="text-sm font-bold text-gray-700">See All Articles</span>
                <div className="w-6 h-6 rounded-full bg-[#014751]/10 flex items-center justify-center group-hover:bg-[#014751] transition-colors">
                  <svg className="w-3 h-3 text-[#014751] group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            </div>
          </div>


          {/* Horizontal Scroll Carousel */}
          <div className="relative group/carousel w-full max-w-[1460px] mx-0 md:mx-auto md:mr-0 pl-4 sm:pl-6 md:pl-0">
            {loadingPosts ? (
              <div className="flex justify-center items-center py-20 w-full">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#014751]"></div>
              </div>
            ) : featuredPosts.length > 0 ? (
              <div
                className="flex gap-4 md:gap-6 pb-8 overflow-x-auto snap-x snap-mandatory no-scrollbar md:pl-[max(1rem,calc((100vw-80rem)/2+1rem))] md:sm:pl-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))] md:lg:pl-[max(2rem,calc((100vw-80rem)/2+2rem))] pr-4 md:pr-20"
              >
                {featuredPosts.slice(0, 3).map((post, index) => (
                  <Link key={post.id} href={`/blog/${post.slug}`}>
                    <motion.div
                      className={`snap-start flex-shrink-0 w-[85vw] md:w-[500px] h-[480px] md:h-[620px] rounded-[32px] md:rounded-[48px] overflow-hidden flex flex-col group cursor-pointer shadow-lg transition-all duration-500 hover:shadow-2xl ${index % 3 === 0 ? 'bg-[#D7FF40]' : index % 3 === 1 ? 'bg-[#F0F1EA]' : 'bg-[#E3E4DC]'
                        }`}
                    >
                      {/* Top Content Area */}
                      <div className="p-6 md:p-8 md:sm:p-12 flex-1 flex flex-col">
                        {/* Tags and Icon */}
                        <div className="flex justify-between items-start mb-4 md:mb-8">
                          <div className="flex gap-2">
                            <span className="px-4 py-1.5 bg-white/90 rounded-full text-[10px] font-bold uppercase tracking-wider text-black">
                              {post.category || 'Featured'}
                            </span>
                          </div>
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center border ${index % 3 === 0 ? 'border-black/10' : 'border-black/5'}`}>
                            <svg className="w-5 h-5 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                            </svg>
                          </div>
                        </div>

                        {/* Text Content */}
                        <div className="flex-1">
                          <h3 className="text-2xl md:text-3xl md:sm:text-4xl md:lg:text-[42px] font-black text-black leading-[1.05] tracking-tighter mb-3 md:mb-4 group-hover:scale-[1.02] transition-transform origin-left line-clamp-3">
                            {post.title}
                          </h3>
                          <p className="text-black/60 font-medium text-sm sm:text-base leading-relaxed line-clamp-2 max-w-[320px]">
                            {post.excerpt || 'Empowering Nigerian students through holistic wellness and academic excellence.'}
                          </p>
                        </div>
                      </div>

                      {/* Bottom Image Area */}
                      <div className="h-[240px] md:h-[280px] md:sm:h-[340px] relative mx-3 md:mx-4 mb-3 md:mb-4 rounded-[24px] md:rounded-[36px] overflow-hidden">
                        <Image
                          src={post.image || "/images/placeholder.png"}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        {/* Button Overlay */}
                        <div className="absolute bottom-4 md:bottom-6 left-4 md:left-6">
                          <div className="bg-white/20 backdrop-blur-xl border border-white/30 px-4 md:px-6 py-2 md:py-3 rounded-full flex items-center gap-2 md:gap-3 shadow-xl group-hover:bg-white transition-all duration-300">
                            <span className="text-white group-hover:text-black text-[10px] md:text-[11px] font-black uppercase tracking-widest">Detail</span>
                            <div className="w-5 md:w-6 h-5 md:h-6 rounded-full bg-white flex items-center justify-center">
                              <svg className="w-2.5 md:w-3 h-2.5 md:h-3 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7-7 7" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white/5 rounded-3xl border-2 border-dashed border-gray-200 mx-4 sm:mx-6 lg:mx-8">
                <p className="text-gray-500 font-medium">No articles available at the moment.</p>
              </div>
            )}
          </div>
        </section>

        {/* FAQ Section — cta narration */}
        <section data-suni-section="cta" className="px-4 sm:px-6 py-8 sm:py-16 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row gap-6 sm:gap-10">
              <div className="w-full md:w-1/3">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                  Frequently
                  <br className="hidden sm:block" />
                  Asked
                  <br className="hidden sm:block" />
                  Questions
                </h2>
                <p className="text-gray-600 mb-4">Ask any questions</p>
                <a
                  href="mailto:support@sabidub.com"
                  className="text-[#014751] font-medium hover:underline"
                >
                  support@sabidub.com
                </a>
              </div>

              <div className="w-full md:w-2/3">
                <div className="space-y-3">
                  <div className="border-b border-gray-200">
                    <button
                      className="w-full py-4 flex items-center justify-between text-left"
                      onClick={() => toggleFaq(0)}
                    >
                      <span className="text-gray-900 font-medium">
                        Can I use the service for both secondary and university
                        education?
                      </span>
                      <span className="text-gray-600">
                        {openFaq === 0 ? "−" : "+"}
                      </span>
                    </button>
                    {openFaq === 0 && (
                      <div className="pb-4">
                        <p className="text-gray-600 text-sm">
                          Yes, our platform supports both secondary and tertiary
                          education needs. We provide resources for
                          WAEC/NECO/JAMB preparation and offer specialized
                          content for various university courses and subjects.
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="border-b border-gray-200">
                    <button
                      className="w-full py-4 flex items-center justify-between text-left"
                      onClick={() => toggleFaq(1)}
                    >
                      <span className="text-gray-900 font-medium">
                        What is the maximum number of subjects I can access?
                      </span>
                      <span className="text-gray-600">
                        {openFaq === 1 ? "−" : "+"}
                      </span>
                    </button>
                    {openFaq === 1 && (
                      <div className="pb-4">
                        <p className="text-gray-600 text-sm">
                          Our standard plan gives you access to all subjects in
                          your current educational level. Premium subscribers
                          get unlimited access to all subjects across secondary
                          and tertiary levels.
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="border-b border-gray-200">
                    <button
                      className="w-full py-4 flex items-center justify-between text-left"
                      onClick={() => toggleFaq(2)}
                    >
                      <span className="text-gray-900 font-medium">
                        How do I update my student account information?
                      </span>
                      <span className="text-gray-600">
                        {openFaq === 2 ? "−" : "+"}
                      </span>
                    </button>
                    {openFaq === 2 && (
                      <div className="pb-4">
                        <p className="text-gray-600 text-sm">
                          You can update your profile information from your
                          account dashboard. Navigate to &quot;Profile Settings&quot; and
                          you&apos;ll be able to edit your personal details,
                          educational information, and preferences.
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="border-b border-gray-200">
                    <button
                      className="w-full py-4 flex items-center justify-between text-left"
                      onClick={() => toggleFaq(3)}
                    >
                      <span className="text-gray-900 font-medium">
                        Are there any benefits for frequent users?
                      </span>
                      <span className="text-gray-600">
                        {openFaq === 3 ? "−" : "+"}
                      </span>
                    </button>
                    {openFaq === 3 && (
                      <div className="pb-4">
                        <p className="text-gray-600 text-sm">
                          Yes! We have a rewards system that gives frequent
                          users access to additional resources, personalized
                          study plans, and special webinars with educational
                          experts as you reach certain milestones.
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="border-b border-gray-200">
                    <button
                      className="w-full py-4 flex items-center justify-between text-left"
                      onClick={() => toggleFaq(4)}
                    >
                      <span className="text-gray-900 font-medium">
                        Can I access my account from multiple devices?
                      </span>
                      <span className="text-gray-600">
                        {openFaq === 4 ? "−" : "+"}
                      </span>
                    </button>
                    {openFaq === 4 && (
                      <div className="pb-4">
                        <p className="text-gray-600 text-sm">
                          Absolutely! Your SabiDub account can be accessed from
                          any device with an internet connection. Your progress,
                          saved resources, and preferences will automatically
                          sync across all your devices.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Add Footer at the bottom of main */}
        < Footer />

        {/* Get Started Selection Bottom Dialog */}
        <AnimatePresence>
          {isGetStartedOpen && (
            <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsGetStartedOpen(false)}
                className="absolute inset-0 bg-black/60 backdrop-blur-md"
              />

              {/* Sheet/Modal */}
              <motion.div
                initial={{ y: "100%", opacity: 0.5 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "100%", opacity: 0.5 }}
                transition={{ type: "spring", damping: 30, stiffness: 300 }}
                className="relative w-full max-w-2xl bg-white dark:bg-[#0A0F14] rounded-t-[2.5rem] sm:rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-2xl overflow-hidden p-6 sm:p-10 select-none z-10"
              >
                {/* Drag handle for mobile */}
                <div className="w-12 h-1 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto mb-6 sm:hidden" onClick={() => setIsGetStartedOpen(false)} />

                <div className="flex justify-between items-start mb-8">
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white uppercase tracking-tight">
                      Get Started with <span className="text-[#014751]">SabiDub</span>
                    </h2>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1.5">
                      Select your destination in our ecosystem
                    </p>
                  </div>
                  <button
                    onClick={() => setIsGetStartedOpen(false)}
                    className="p-2 rounded-xl bg-gray-55 hover:bg-gray-100 text-gray-400 dark:text-gray-500 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                  {/* Student / Corper Option */}
                  <a
                    href="https://student.portal.sabidub.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col justify-between p-6 rounded-3xl bg-[#E6F5EC]/60 hover:bg-[#E6F5EC] border border-emerald-100 hover:border-emerald-200 transition-all duration-300 shadow-sm hover:shadow-lg text-left animate-[fadeIn_0.5s_ease-out]"
                  >
                    <div>
                      <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">
                        🎓
                      </div>
                      <h3 className="text-lg font-black text-gray-900 mb-2">Student or Corper</h3>
                      <p className="text-xs text-gray-600 font-medium leading-relaxed opacity-90">
                        Access e-learning, JAMB cut-off analytics, NYSC Yearbook passport builder, platoon budgets, and safe ride-sharing networks.
                      </p>
                    </div>
                    <div className="mt-8 text-xs font-black text-[#014751] uppercase tracking-wider flex items-center gap-2">
                      Access Portal
                      <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </a>

                  {/* School Admin Option */}
                  <a
                    href="https://portal.sabidub.com/auth/school/signin"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col justify-between p-6 rounded-3xl bg-[#FFF5EF]/60 hover:bg-[#FFF5EF] border border-orange-100 hover:border-orange-200 transition-all duration-300 shadow-sm hover:shadow-lg text-left animate-[fadeIn_0.5s_ease-out_0.1s]"
                  >
                    <div>
                      <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">
                        🏫
                      </div>
                      <h3 className="text-lg font-black text-gray-900 mb-2">School Administrator</h3>
                      <p className="text-xs text-gray-600 font-medium leading-relaxed opacity-90">
                        Manage institutional student records, process terms/semesters results, schedule timetables, and run secure school elections.
                      </p>
                    </div>
                    <div className="mt-8 text-xs font-black text-orange-700 uppercase tracking-wider flex items-center gap-2">
                      Access Admin
                      <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </a>
                </div>

                <div className="text-center">
                  <button
                    onClick={() => setIsGetStartedOpen(false)}
                    className="text-[10px] font-black uppercase text-gray-400 tracking-widest hover:text-gray-600"
                  >
                    Close Dialog
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </main >
    </>
  );
}
