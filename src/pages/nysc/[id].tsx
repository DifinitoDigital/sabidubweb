/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  FaCheckCircle, FaBuilding, FaGlobe, FaIdCard,
  FaArrowLeft, FaPhone, FaEnvelope, FaMapMarkerAlt,
  FaUsers, FaCalendarAlt, FaDownload
} from "react-icons/fa";
import Link from "next/link";

// ─── Types ────────────────────────────────────────────────────────────────────
interface NyscProfile {
  id: string;
  fullName: string;
  email?: string;
  phone?: string;
  stateOfOrigin?: string;
  callUpNo: string;
  deploymentState: string;
  yearOfService: string;
  batch: string;
  stream: string;
  platoonNo: string;
  platoonPosition: string;
  ppa: string;
  tribe: string;
  gender: string;
  badgeTheme: string;
  avatarUrl: string;
  serviceStatus: string;
  createdAt?: string;
}

// ─── Mock Data (mirrors nysc.tsx) ─────────────────────────────────────────────
const MOCK_YEARBOOK: NyscProfile[] = [
  {
    id: "NYSC-25-001",
    fullName: "Tunde Bakare",
    email: "tunde.b@mail.com",
    phone: "+234 810 000 001",
    stateOfOrigin: "Ogun",
    callUpNo: "NYSC/LAG/2025/284091",
    deploymentState: "Lagos (Iyana Ipaja)",
    yearOfService: "2025",
    batch: "Batch A",
    stream: "Stream 1",
    platoonNo: "Platoon 4",
    platoonPosition: "Platoon Leader",
    ppa: "Chevron Nigeria Limited, Lekki",
    tribe: "Yoruba",
    gender: "Male",
    badgeTheme: "emerald",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800",
    serviceStatus: "Serving",
    createdAt: "12/04/2025"
  },
  {
    id: "NYSC-25-002",
    fullName: "Chinedu Okafor",
    email: "chinedu.o@mail.com",
    phone: "+234 812 000 002",
    stateOfOrigin: "Anambra",
    callUpNo: "NYSC/RIV/2025/119053",
    deploymentState: "Rivers (Nonwa Gbam)",
    yearOfService: "2025",
    batch: "Batch B",
    stream: "Stream 2",
    platoonNo: "Platoon 9",
    platoonPosition: "Member",
    ppa: "Shell Petroleum, PH",
    tribe: "Igbo",
    gender: "Male",
    badgeTheme: "classic",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=800",
    serviceStatus: "Serving",
    createdAt: "18/09/2025"
  },
  {
    id: "NYSC-24-003",
    fullName: "Fatima Bello",
    email: "fatima.b@mail.com",
    phone: "+234 809 000 003",
    stateOfOrigin: "Kano",
    callUpNo: "NYSC/KAN/2024/928401",
    deploymentState: "Kano (Karaye)",
    yearOfService: "2024",
    batch: "Batch C",
    stream: "Stream 1",
    platoonNo: "Platoon 2",
    platoonPosition: "OBS Executive",
    ppa: "General Hospital, Kano",
    tribe: "Hausa",
    gender: "Female",
    badgeTheme: "emerald",
    avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800",
    serviceStatus: "Served",
    createdAt: "04/11/2024"
  },
  {
    id: "NYSC-25-004",
    fullName: "Efe Johnson",
    email: "efe.j@mail.com",
    phone: "+234 813 000 004",
    stateOfOrigin: "Delta",
    callUpNo: "NYSC/DEL/2025/834012",
    deploymentState: "Delta (Issele-Uku)",
    yearOfService: "2025",
    batch: "Batch A",
    stream: "Stream 2",
    platoonNo: "Platoon 1",
    platoonPosition: "Welfare Officer",
    ppa: "Ministry of Justice, Asaba",
    tribe: "Urhobo",
    gender: "Female",
    badgeTheme: "sage",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800",
    serviceStatus: "Serving",
    createdAt: "22/05/2025"
  },
  {
    id: "NYSC-24-005",
    fullName: "Aminu Yusuf",
    email: "aminu.y@mail.com",
    phone: "+234 815 000 005",
    stateOfOrigin: "Katsina",
    callUpNo: "NYSC/FCT/2024/552941",
    deploymentState: "FCT Abuja (Kubwa)",
    yearOfService: "2024",
    batch: "Batch B",
    stream: "Stream 1",
    platoonNo: "Platoon 7",
    platoonPosition: "Warrant Officer",
    ppa: "Federal Secretariat, Garki",
    tribe: "Hausa",
    gender: "Male",
    badgeTheme: "classic",
    avatarUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=800",
    serviceStatus: "Served",
    createdAt: "10/08/2024"
  },
  {
    id: "NYSC-23-006",
    fullName: "Adebayo Ogunmola",
    email: "adebayo.o@mail.com",
    phone: "+234 816 000 006",
    stateOfOrigin: "Oyo",
    callUpNo: "NYSC/OYO/2023/482019",
    deploymentState: "Oyo (Iseyin)",
    yearOfService: "2023",
    batch: "Batch C",
    stream: "Stream 2",
    platoonNo: "Platoon 10",
    platoonPosition: "Member",
    ppa: "District Grammar School",
    tribe: "Yoruba",
    gender: "Male",
    badgeTheme: "sage",
    avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800",
    serviceStatus: "Served",
    createdAt: "15/12/2023"
  }
];

// ─── Theme Colours ─────────────────────────────────────────────────────────────
const BADGE_STYLES: Record<string, { cardGradient: string; accentColor: string; accentBg: string }> = {
  emerald: {
    cardGradient: "from-[#0a3f2d] via-[#04241a] to-[#01140e]",
    accentColor: "text-emerald-500",
    accentBg: "bg-emerald-500/10 border-emerald-500/20",
  },
  classic: {
    cardGradient: "from-[#045233] via-[#02311e] to-[#00170e]",
    accentColor: "text-green-500",
    accentBg: "bg-green-500/10 border-green-500/20",
  },
  sage: {
    cardGradient: "from-[#3b523e] via-[#243326] to-[#121a13]",
    accentColor: "text-emerald-400",
    accentBg: "bg-emerald-400/10 border-emerald-400/20",
  },
};

// ─── Detail Row component ──────────────────────────────────────────────────────
function DetailRow({ label, value, icon }: { label: string; value: string; icon?: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-0.5">
      <p className="text-[9px] font-black uppercase tracking-widest text-gray-400">{label}</p>
      <p className="text-sm font-bold text-gray-900 flex items-center gap-1.5">
        {icon && <span className="text-gray-400 text-[11px]">{icon}</span>}
        {value || "—"}
      </p>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function NyscProfileDetail() {
  const router = useRouter();
  const { id } = router.query;
  const cardRef = useRef<HTMLDivElement>(null);

  const [profile, setProfile] = useState<NyscProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    setLoading(true);

    // 1. Check localStorage first (user's own saved passport)
    try {
      const stored = localStorage.getItem("sabidub_nysc_passport");
      if (stored) {
        const parsed: NyscProfile = JSON.parse(stored);
        if (parsed.id === id) {
          setProfile(parsed);
          setLoading(false);
          return;
        }
      }
    } catch {}

    // 2. Fall back to mock data
    const found = MOCK_YEARBOOK.find(m => m.id === id);
    setProfile(found || null);
    setLoading(false);
  }, [id]);

  const theme = BADGE_STYLES[profile?.badgeTheme || "emerald"];
  const isServing = profile?.serviceStatus === "Serving";
  const [downloading, setDownloading] = useState(false);

  const downloadAsImage = async () => {
    if (!cardRef.current) return;
    setDownloading(true);
    try {
      const html2canvas = (await import("html2canvas")).default;
      const canvas = await html2canvas(cardRef.current, {
        useCORS: true,
        allowTaint: true,
        backgroundColor: null,
        scale: 2,
      });
      const link = document.createElement("a");
      link.download = `${profile?.fullName?.replace(/\s+/g, "_") ?? "nysc"}_passport.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (err) {
      console.error("Download failed:", err);
    } finally {
      setDownloading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FCFDFD]">
        <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!profile) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-[#FCFDFD] pt-24">
          <p className="text-lg font-black text-gray-800">Profile not found</p>
          <p className="text-xs text-gray-500">The corp member profile you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/nysc" className="bg-[#01353D] text-white px-5 py-2.5 rounded-lg text-xs font-bold">
            ← Back to Directory
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{profile.fullName} — NYSC Corp Member Profile | SabiDub</title>
        <meta name="description" content={`View the NYSC yearbook profile for ${profile.fullName}, serving at ${profile.ppa}.`} />
      </Head>

      <Navbar />

      <div className="bg-[#F8FAFA] min-h-screen pt-24 pb-20 overflow-x-hidden">

        {/* ── Hero Banner (full-bleed portrait + gradient overlay) ── */}
        <div className="relative w-full h-[420px] overflow-hidden">
          {/* Portrait Image */}
          <img
            src={profile.avatarUrl}
            alt={profile.fullName}
            className="absolute inset-0 w-full h-full object-cover object-top"
          />

          {/* Multi-stop gradient: only bottom 20% is opaque */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#F8FAFA] via-[#F8FAFA]/20 to-transparent pointer-events-none" />
          
          {/* Top dark layer for header text */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent pointer-events-none" />

          {/* Back Button */}
          <div className="absolute top-6 left-4 sm:left-8 z-20">
            <Link
              href="/nysc"
              className="inline-flex items-center gap-1.5 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-3.5 py-2 rounded-lg text-xs font-bold transition-all border border-white/20"
            >
              <FaArrowLeft size={10} /> Back to Directory
            </Link>
          </div>

          {/* Top right watermark */}
          <div className="absolute top-6 right-4 sm:right-8 z-20 text-[8px] font-black uppercase tracking-widest text-white/60 text-right select-none">
            <span className="block">nysc passport</span>
            <span className="block text-white/40">Powered by SabiDub</span>
          </div>
        </div>

        {/* ── Content below the banner ── */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-28 relative z-10">

          {/* Identity Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm"
          >
            {/* Top accent strip */}
            <div className={`h-1 w-full bg-gradient-to-r ${theme.cardGradient}`} />

            <div ref={cardRef} className="p-6 sm:p-8">

              {/* ── Profile Header Row ── */}
              <div className="flex flex-col sm:flex-row sm:items-start gap-5 mb-8">
                {/* Avatar */}
                <div className="shrink-0">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-gray-100 shadow-md">
                    <img src={profile.avatarUrl} alt={profile.fullName} className="w-full h-full object-cover object-top" />
                  </div>
                </div>

                {/* Name and Meta */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <span className={`text-[8px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full border ${
                      isServing
                        ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
                        : "bg-gray-100 text-gray-500 border-gray-200"
                    }`}>
                      {isServing ? "Active Serving" : "Served Alumni"}
                    </span>
                    <span className="text-[8px] font-bold text-gray-400 uppercase tracking-widest border border-gray-200 px-2 py-0.5 rounded-full">
                      {profile.gender}
                    </span>
                  </div>

                  <h1 className="text-2xl sm:text-3xl font-black text-gray-950 tracking-tight leading-tight flex items-center gap-2 flex-wrap">
                    {profile.fullName}
                    <FaCheckCircle className="text-emerald-500 text-base shrink-0" />
                  </h1>

                  <p className="text-sm text-gray-500 mt-0.5 font-medium">
                    {profile.ppa}
                  </p>

                  <p className="text-[11px] text-gray-400 mt-1.5 font-mono tracking-wider">
                    {profile.callUpNo}
                  </p>
                </div>

                {/* Download as Image Action */}
                <button
                  onClick={downloadAsImage}
                  disabled={downloading}
                  className="shrink-0 self-start flex items-center gap-1.5 bg-[#01353D] hover:bg-[#024a54] disabled:opacity-60 text-white px-4 py-2.5 rounded-lg text-xs font-bold transition-colors"
                >
                  {downloading ? (
                    <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <FaDownload size={10} />
                  )}
                  {downloading ? "Saving..." : "Save as Image"}
                </button>
              </div>

              {/* ── Divider ── */}
              <div className="border-t border-gray-100 mb-8" />

              {/* ── Detail Grid ── */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-6">

                <DetailRow
                  label="State of Origin"
                  value={profile.stateOfOrigin || "—"}
                  icon={<FaMapMarkerAlt />}
                />
                <DetailRow
                  label="Tribe"
                  value={profile.tribe}
                  icon={<FaGlobe />}
                />
                <DetailRow
                  label="Deployment State"
                  value={profile.deploymentState}
                  icon={<FaMapMarkerAlt />}
                />

                <DetailRow
                  label="Service Year"
                  value={profile.yearOfService}
                  icon={<FaCalendarAlt />}
                />
                <DetailRow
                  label="Batch & Stream"
                  value={`${profile.batch} · ${profile.stream}`}
                />
                <DetailRow
                  label="Platoon"
                  value={`${profile.platoonNo} · ${profile.platoonPosition}`}
                  icon={<FaUsers />}
                />

                <div className="col-span-2 sm:col-span-3">
                  <DetailRow
                    label="Primary Place of Assignment (PPA)"
                    value={profile.ppa}
                    icon={<FaBuilding />}
                  />
                </div>

              </div>

              {/* ── Footer watermark ── */}
              <div className="border-t border-gray-100 mt-8 pt-5 flex justify-between items-center">
                <p className="text-[9px] text-gray-400 font-mono">Registered: {profile.createdAt || "—"}</p>
                <p className="text-[9px] font-black uppercase tracking-widest text-gray-300">Powered by SabiDub</p>
              </div>

            </div>
          </motion.div>

          {/* ── Related / Back CTA ── */}
          <div className="mt-6 flex justify-between items-center">
            <Link
              href="/nysc"
              className="inline-flex items-center gap-1.5 text-[#01353D] text-xs font-bold hover:underline"
            >
              <FaArrowLeft size={10} /> Back to Full Directory
            </Link>
            <p className="text-[10px] text-gray-400">
              NYSC Yearbook · Powered by SabiDub
            </p>
          </div>

        </div>
      </div>

      <Footer />
    </>
  );
}
