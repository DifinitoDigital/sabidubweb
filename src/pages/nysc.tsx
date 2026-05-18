/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  FaSearch, FaUsers, FaStar, FaCheckCircle
} from "react-icons/fa";

const DEFAULT_AVATAR = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iI2RjZTJlNSI+PHBhdGggZD0iTTEyIDEyYzIuMjEgMCA0LWUtMS43OS00IDRTOC4yMSA4IDEyIDhzNC0xLjc5IDQtNHMtMS43OS00LTQtNHptMCAyYy0yLjY3IDAtOCAxLjM0LTggNHYyaDE2di0yYzAtMi42Ni01LjMzLTQtOC00erIvPjwvc3ZnPg==";

const BADGE_STYLES = {
  emerald: {
    name: "Forest Emerald Theme",
    cardGradient: "from-[#0a3f2d] via-[#04241a] to-[#01140e]",
    accentText: "text-emerald-400",
    subText: "text-emerald-300/80",
    dot: "bg-emerald-500",
  },
  classic: {
    name: "Classic Green Theme",
    cardGradient: "from-[#045233] via-[#02311e] to-[#00170e]",
    accentText: "text-green-400",
    subText: "text-green-300/80",
    dot: "bg-green-600",
  },
  sage: {
    name: "Sage Green Theme",
    cardGradient: "from-[#3b523e] via-[#243326] to-[#121a13]",
    accentText: "text-emerald-300",
    subText: "text-emerald-400/80",
    dot: "bg-emerald-600",
  }
};

export default function NyscHub() {
  const router = useRouter();
  const [yearbookList, setYearbookList] = useState<any[]>([]);
  const [savedPassport, setSavedPassport] = useState<any>(null);

  // Filtering States for Yearbook Directory
  const [filterYear, setFilterYear] = useState("All");
  const [filterBatch, setFilterBatch] = useState("All");
  const [filterStream, setFilterStream] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Infinite Scroll Pagination State
  const [visibleCount, setVisibleCount] = useState(20);

  const fetchYearbook = async () => {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || process.env.API_URL || 'http://localhost:4000';
      const response = await fetch(`${baseUrl}/profile/registered-as/NYSC`);
      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data)) {
          const mapped = data.map((student: any) => {
            const details = student.nyscDetails || {};
            return {
              id: student.id,
              fullName: details.fullName || student.name || 'Anonymous',
              stateOfOrigin: details.stateOfOrigin || undefined,
              callUpNo: details.callUpNo || 'N/A',
              deploymentState: details.deploymentState || 'N/A',
              yearOfService: details.yearOfService || '2026',
              batch: details.batch || 'Batch A',
              stream: details.stream || 'Stream 1',
              platoonNo: details.platoonNo || 'Platoon 1',
              platoonPosition: details.platoonPosition || 'Member',
              ppa: details.ppa || 'N/A',
              tribe: details.tribe || 'N/A',
              gender: details.gender || student.gender || 'Male',
              badgeTheme: details.badgeTheme || 'emerald',
              avatarUrl: details.avatarUrl || student.profilePicture || DEFAULT_AVATAR,
              serviceStatus: details.serviceStatus || 'Serving',
              createdAt: details.createdAt ? new Date(details.createdAt).toLocaleDateString() : new Date().toLocaleDateString(),
            };
          });
          
          setYearbookList(mapped);
        }
      }
    } catch (e) {
      console.error("Error loading yearbook from backend", e);
    }
  };

  useEffect(() => {
    fetchYearbook();

    const stored = localStorage.getItem("sabidub_nysc_passport");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setSavedPassport(parsed);
        setYearbookList(prev => {
          if (prev.some(item => item.id === parsed.id || item.callUpNo === parsed.callUpNo)) return prev;
          return [parsed, ...prev];
        });
      } catch (e) {
        console.error("Error parsing saved passport", e);
      }
    }
  }, []);

  // Infinite Scroll scroll handler to load more profiles
  useEffect(() => {
    const handleScroll = () => {
      const threshold = 150; // pixels from bottom to trigger loading more
      const totalHeight = document.documentElement.scrollHeight;
      const scrollPosition = window.innerHeight + window.scrollY;

      if (totalHeight - scrollPosition < threshold) {
        setVisibleCount(prev => prev + 20);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Filtering Logic
  const filteredDirectory = yearbookList.filter(item => {
    const matchesYear = filterYear === "All" || item.yearOfService === filterYear;
    const matchesBatch = filterBatch === "All" || item.batch === filterBatch;
    const matchesStream = filterStream === "All" || item.stream === filterStream;
    const matchesStatus = filterStatus === "All" || item.serviceStatus === filterStatus;

    const query = searchQuery.toLowerCase().trim();
    const matchesSearch = !query ||
      item.fullName.toLowerCase().includes(query) ||
      item.ppa.toLowerCase().includes(query) ||
      item.tribe.toLowerCase().includes(query) ||
      item.deploymentState.toLowerCase().includes(query) ||
      item.callUpNo.toLowerCase().includes(query);

    return matchesYear && matchesBatch && matchesStream && matchesStatus && matchesSearch;
  });

  // Slice paginated items
  const paginatedDirectory = filteredDirectory.slice(0, visibleCount);

  return (
    <>
      <Head>
        <title>Served & Serving Corp Members Yearbook</title>
        <meta
          name="description"
          content="Browse the directory of served and currently serving corp members. Filter by stream, status, or year, and generate your digital yearbook passport."
        />
      </Head>

      <Navbar />

      <div className="bg-[#FCFDFD] text-gray-900 min-h-screen pt-24 pb-12 overflow-x-hidden">
        
        {/* Flat Minimalist Hero Section */}
        <section className="pt-16 sm:pt-36 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center border-b border-gray-150">
          <span className="bg-[#01353D]/5 text-[#01353D] px-3.5 py-1.5 rounded-md text-[10px] font-black uppercase tracking-widest inline-flex items-center gap-1.5 mb-4">
            <FaStar className="text-yellow-500" /> COMMUNITY PORTAL
          </span>

          <h1 className="text-3xl sm:text-5xl font-black text-gray-950 tracking-tight leading-tight max-w-4xl mx-auto mb-4">
            Served & Serving Corp Members Yearbook
          </h1>

          <p className="text-sm text-gray-600 max-w-2xl mx-auto mb-8 leading-relaxed">
            Welcome to the open NYSC directory! Connect with fellow corp members, document your primary assignment (PPA), and publish your yearbook profile card.
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => router.push('/nysc/create')}
              className="bg-[#01353D] text-white px-6 py-3.5 rounded-lg text-xs font-bold hover:bg-[#024a54] transition-colors shadow-sm"
            >
              Join Digital Yearbook
            </button>
            <a
              href="#directory-section"
              className="bg-white text-gray-700 border border-gray-200 px-6 py-3.5 rounded-lg text-xs font-bold hover:bg-gray-50 transition-colors"
            >
              Browse Directory ({filteredDirectory.length})
            </a>
          </div>
        </section>

        {/* 1. DIRECTORY LIST SECTION */}
        <div id="directory-section" className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mt-12 space-y-6">

          {/* Filter Panel */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between border-b border-gray-100 pb-4 mb-4">
              <div className="text-left w-full lg:w-auto">
                <h3 className="text-base font-black text-[#01353D] flex items-center gap-2">
                  🎓 NYSC Directory & Yearbook
                </h3>
                <p className="text-[11px] text-gray-500">Search and filter active and past corp members.</p>
              </div>

              {/* ── Total Corp Members Bold Counter Block ── */}
              <div className="flex items-center justify-between gap-6 bg-[#01353D]/5 border border-[#01353D]/10 rounded-2xl px-5 py-3 w-full lg:w-auto shadow-sm">
                <div className="text-left">
                  <span className="block text-[8px] font-black text-[#01353D] uppercase tracking-widest leading-none mb-1">Total Corps Members</span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-3xl sm:text-4xl font-black text-[#01353D] tracking-tight leading-none">
                      {yearbookList.length}
                    </span>
                    <span className="text-[9px] font-black text-emerald-600 bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 rounded uppercase tracking-wider">Live</span>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-xl bg-[#01353D] flex items-center justify-center text-white text-base shadow-sm shadow-[#01353D]/20">
                  <FaUsers />
                </div>
              </div>

              {/* Search input */}
              <div className="relative w-full lg:w-80">
                <FaSearch className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search by name, tribe, PPA..."
                  className="w-full pl-9 pr-4 py-2.5 bg-gray-55 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-[#01353D] transition-all"
                />
              </div>
            </div>

            {/* Minimal Filters */}
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
              <select
                value={filterYear}
                onChange={e => {
                  setFilterYear(e.target.value);
                  setVisibleCount(20); // Reset visible count on filter change
                }}
                className="px-3 py-2 bg-gray-55 border border-gray-200 rounded-lg text-xs font-bold text-gray-700 focus:outline-none"
              >
                <option value="All">All Years</option>
                <option value="2026">2026</option>
                <option value="2025">2025</option>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
              </select>
              <select
                value={filterBatch}
                onChange={e => {
                  setFilterBatch(e.target.value);
                  setVisibleCount(20);
                }}
                className="px-3 py-2 bg-gray-55 border border-gray-200 rounded-lg text-xs font-bold text-gray-700 focus:outline-none"
              >
                <option value="All">All Batches</option>
                <option value="Batch A">Batch A</option>
                <option value="Batch B">Batch B</option>
                <option value="Batch C">Batch C</option>
              </select>
              <select
                value={filterStream}
                onChange={e => {
                  setFilterStream(e.target.value);
                  setVisibleCount(20);
                }}
                className="px-3 py-2 bg-gray-55 border border-gray-200 rounded-lg text-xs font-bold text-gray-700 focus:outline-none"
              >
                <option value="All">All Streams</option>
                <option value="Stream 1">Stream 1</option>
                <option value="Stream 2">Stream 2</option>
              </select>
              <select
                value={filterStatus}
                onChange={e => {
                  setFilterStatus(e.target.value);
                  setVisibleCount(20);
                }}
                className="px-3 py-2 bg-gray-55 border border-gray-200 rounded-lg text-xs font-bold text-gray-700 focus:outline-none"
              >
                <option value="All">All Statuses</option>
                <option value="Serving">Currently Serving</option>
                <option value="Served">Served (Alumni)</option>
              </select>
              <button
                onClick={() => {
                  setFilterYear("All");
                  setFilterBatch("All");
                  setFilterStream("All");
                  setFilterStatus("All");
                  setSearchQuery("");
                  setVisibleCount(20);
                }}
                className="py-2 border border-gray-200 text-gray-500 rounded-lg text-xs font-bold hover:bg-gray-50 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          </div>

          {/* Directory Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-7 md:gap-8 pt-4">
            <AnimatePresence>
              {paginatedDirectory.map((item) => {
                const cardTheme = BADGE_STYLES[item.badgeTheme as keyof typeof BADGE_STYLES] || BADGE_STYLES.emerald;

                return (
                  <motion.div
                    key={item.id}
                    onClick={() => router.push(`/nysc/${item.id}`)}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 15 }}
                    className={`relative aspect-[3/4.2] w-full rounded-2xl overflow-hidden border border-white/10 cursor-pointer hover:border-[#01353D]/30 hover:shadow-xl hover:shadow-emerald-950/10 hover:-translate-y-1 transition-all duration-500 group bg-gradient-to-b ${cardTheme.cardGradient}`}
                  >
                    {/* Background Pattern Mesh Overlay */}
                    <div className="absolute inset-0 opacity-[0.06] pointer-events-none mix-blend-overlay">
                      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <path d="M0,45 Q25,25 50,45 T100,45" fill="none" stroke="white" strokeWidth="0.8" />
                        <path d="M0,60 Q25,40 50,60 T100,60" fill="none" stroke="white" strokeWidth="0.8" />
                      </svg>
                    </div>

                    {/* TOP HEADER WATERMARK */}
                    <div className="absolute top-8 left-0 right-0 px-6 flex justify-between items-center z-20 text-[7.5px] font-black uppercase tracking-widest text-white/70 select-none">
                      <span>nysc passport</span>
                      <span>Powered by SabiDub</span>
                    </div>

                    {/* FULL BLEED PORTRAIT PHOTO */}
                    <div className="absolute inset-0 w-full h-full z-0">
                      <img
                        src={item.avatarUrl}
                        alt={item.fullName}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent z-10 pointer-events-none" />
                      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent z-10 pointer-events-none" />
                    </div>

                    {/* BOTTOM TEXT ZONE */}
                    <div className="absolute bottom-0 left-0 right-0 px-6 pb-6 pt-5 z-20 flex flex-col text-left space-y-1.5 select-none">
                      
                      {/* Service Status micro label */}
                      <span className="text-[8px] font-black uppercase tracking-[0.15em] text-emerald-400 leading-none">
                        {item.serviceStatus === "Serving" ? "Active Serving" : "Served Alumni"}
                      </span>

                      {/* Large bold white name with verified icon */}
                      <h3 className="text-sm sm:text-base font-black text-white leading-tight tracking-tight line-clamp-1 flex items-center gap-1.5">
                        {item.fullName}
                        <FaCheckCircle className="text-emerald-400 text-xs shrink-0" />
                      </h3>

                      {/* PPA Subtitle */}
                      <p className="text-[10px] text-gray-300 font-semibold leading-tight line-clamp-1">
                        with <span className={`${cardTheme.accentText} font-bold`}>{item.ppa.split(",")[0]}</span>
                      </p>

                      {/* Extra Details line */}
                      <p className="text-[8.5px] text-gray-400 font-medium leading-none pt-0.5 line-clamp-1">
                        {item.tribe} Tribe • {item.platoonNo}
                      </p>

                      {/* Faint footer border line */}
                      <div className="flex justify-between items-center pt-2.5 border-t border-white/10 mt-2 text-[7px] text-gray-500 font-mono">
                        <span>NYSC {item.yearOfService}</span>
                        <span>{item.batch}</span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Infinite Scroll loading indicator */}
          {visibleCount < filteredDirectory.length && (
            <div className="flex justify-center items-center py-10">
              <div className="w-5 h-5 border-2 border-t-transparent border-[#01353D] rounded-full animate-spin" />
              <span className="ml-2.5 text-[9px] font-black text-gray-500 uppercase tracking-widest">Loading more memories...</span>
            </div>
          )}

          {/* Empty list illustration */}
          {filteredDirectory.length === 0 && (
            <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center max-w-sm mx-auto shadow-sm">
              <h3 className="text-sm font-bold text-gray-900 mb-1">No matching profiles</h3>
              <p className="text-xs text-gray-500 mb-4">Be the first to publish a profile under this stream selection!</p>
              <button
                onClick={() => router.push('/nysc/create')}
                className="bg-[#01353D] text-white px-5 py-2.5 rounded-lg text-xs font-bold hover:bg-[#024a54] transition-colors"
              >
                Join Digital Yearbook
              </button>
            </div>
          )}
        </div>

      </div>

      <Footer />
    </>
  );
}
