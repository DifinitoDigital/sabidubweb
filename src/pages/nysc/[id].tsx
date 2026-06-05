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
  FaUsers, FaCalendarAlt, FaDownload, FaCamera, FaPaperPlane,
  FaWhatsapp, FaFacebook, FaTwitter, FaCopy, FaShareAlt, FaTimes
} from "react-icons/fa";
import Link from "next/link";
import { GetServerSideProps } from "next";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || process.env.API_URL;

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
  galleryUrls?: string[];
  story?: string;
  serviceStatus: string;
  createdAt?: string;
}

// ─── Mock Data (mirrors nysc.tsx) ─────────────────────────────────────────────
const MOCK_YEARBOOK: NyscProfile[] = [];
const DEFAULT_AVATAR = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iI2NiZDVlMSI+PHBhdGggZD0iTTEyIDEyYzIuMjEgMCA0LTEuNzkgNC00cy0xLjc5LTQtNC00LTQgMS43OS00IDQgMS43OSA0IDQgNHptMCAyYy0yLjY3IDAtOCAxLjM0LTggNHYyaDE2di0yYzAtMi42Ni01LjMzLTQtOC00eiIvPjwvc3ZnPg==";

// ─── Theme Colours ─────────────────────────────────────────────────────────────
const BADGE_STYLES: Record<string, {
  cardGradient: string;
  accentText: string;
  subText: string;
  dot: string;
  cardGradientStyle: string;
  accentColor: string;
  subTextColor: string;
  dotColor: string;
}> = {
  emerald: {
    cardGradient: "from-[#0a3f2d] via-[#04241a] to-[#01140e]",
    accentText: "text-emerald-400",
    subText: "text-emerald-300/80",
    dot: "bg-emerald-500",
    cardGradientStyle: "linear-gradient(to bottom, #0a3f2d, #04241a, #01140e)",
    accentColor: "#34d399",
    subTextColor: "rgba(110, 231, 183, 0.8)",
    dotColor: "#10b981",
  },
  classic: {
    cardGradient: "from-[#045233] via-[#02311e] to-[#00170e]",
    accentText: "text-green-400",
    subText: "text-green-300/80",
    dot: "bg-green-600",
    cardGradientStyle: "linear-gradient(to bottom, #045233, #02311e, #00170e)",
    accentColor: "#4ade80",
    subTextColor: "rgba(134, 239, 172, 0.8)",
    dotColor: "#16a34a",
  },
  sage: {
    cardGradient: "from-[#3b523e] via-[#243326] to-[#121a13]",
    accentText: "text-emerald-300",
    subText: "text-emerald-400/80",
    dot: "bg-emerald-600",
    cardGradientStyle: "linear-gradient(to bottom, #3b523e, #243326, #121a13)",
    accentColor: "#6ee7b7",
    subTextColor: "rgba(52, 211, 153, 0.8)",
    dotColor: "#059669",
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

// In-memory cache to store full fetched profiles so that back-and-forth navigation is instantaneous!
const profileCache: Record<string, NyscProfile> = {};

// ─── Page Props (from getServerSideProps) ──────────────────────────────────────
interface PageProps {
  initialProfile: NyscProfile | null;
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function NyscProfileDetail({ initialProfile }: PageProps) {
  const router = useRouter();
  const { id } = router.query;
  const cardRef = useRef<HTMLDivElement>(null);

  const [profile, setProfile] = useState<NyscProfile | null>(initialProfile);
  const [loading, setLoading] = useState(!initialProfile);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [previewIndex, setPreviewIndex] = useState(0);

  useEffect(() => {
    if (!id) return;

    let hasCached = false;
    // 1. Check in-memory cache first!
    if (profileCache[id as string]) {
      setProfile(profileCache[id as string]);
      setLoading(false);
      hasCached = true;
    } else {
      // 2. Check localStorage (user's own saved passport)
      try {
        const stored = localStorage.getItem("sabidub_nysc_passport");
        if (stored) {
          const parsed: NyscProfile = JSON.parse(stored);
          if (parsed.id === id) {
            setProfile(parsed);
            hasCached = true;
          }
        }
      } catch { }
    }

    if (!hasCached) {
      setLoading(true);
    }

    // 3. Fetch from backend API to ensure fresh data and full galleryUrls
    const loadProfile = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || process.env.API_URL || 'http://localhost:4000';
        const response = await fetch(`${baseUrl}/profile/${id}`);
        if (response.ok) {
          const resData = await response.json();
          if (resData) {
            const details = resData.nyscDetails || {};
            const mappedProfile: NyscProfile = {
              id: resData.id,
              fullName: details.fullName || resData.name || 'Anonymous',
              email: details.email || undefined,
              phone: details.phone || resData.number || undefined,
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
              gender: details.gender || resData.gender || 'Male',
              badgeTheme: details.badgeTheme || 'emerald',
              avatarUrl: details.avatarUrl || resData.profilePicture || DEFAULT_AVATAR,
              galleryUrls: details.galleryUrls || [],
              story: details.story || undefined,
              serviceStatus: details.serviceStatus || 'Serving',
              createdAt: details.createdAt ? new Date(details.createdAt).toLocaleDateString() : new Date().toLocaleDateString(),
            };
            setProfile(mappedProfile);
            profileCache[id as string] = mappedProfile; // Cache it
            setLoading(false);
            return;
          }
        }
      } catch (err) {
        console.error("Error loading profile from backend", err);
      }

      // 4. Fall back to mock data
      const found = MOCK_YEARBOOK.find(m => m.id === id);
      if (found) {
        setProfile(found);
        profileCache[id as string] = found; // Cache it
      } else {
        setProfile(null);
      }
      setLoading(false);
    };

    loadProfile();
  }, [id]);

  const theme = BADGE_STYLES[profile?.badgeTheme || "emerald"];
  const isServing = profile?.serviceStatus === "Serving";
  const [downloading, setDownloading] = useState(false);
  const [sharing, setSharing] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const [navigatorShareSupported, setNavigatorShareSupported] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && navigator.share) {
      setNavigatorShareSupported(true);
    }
  }, []);

  const downloadAsImage = async () => {
    if (!cardRef.current || !profile) return;
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
      link.download = `${profile.fullName.replace(/\s+/g, "_")}_passport.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (err) {
      console.error("Download failed:", err);
    } finally {
      setDownloading(false);
    }
  };

  const shareToWhatsapp = () => {
    if (!profile) return;
    const shareText = `Check out my digital NYSC yearbook card on SabiDub! 🎓✨ Join the national yearbook directory, connect with fellow corp members, and create your own card here:`;
    const shareUrl = `${window.location.origin}/nysc/${profile.id}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + "\n\n" + shareUrl)}`, "_blank");
  };

  const shareToFacebook = () => {
    if (!profile) return;
    const shareUrl = `${window.location.origin}/nysc/${profile.id}`;
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, "_blank");
  };

  const shareToTwitter = () => {
    if (!profile) return;
    const shareText = `Check out my digital NYSC yearbook card on SabiDub! 🎓✨`;
    const shareUrl = `${window.location.origin}/nysc/${profile.id}`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`, "_blank");
  };

  const shareNativeText = async () => {
    if (!profile) return;
    const shareText = `Check out my digital NYSC yearbook card on SabiDub! 🎓✨ Join the national yearbook directory, connect with fellow corp members, and create your own card here:`;
    const shareUrl = `${window.location.origin}/nysc/${profile.id}`;
    try {
      await navigator.share({
        title: `${profile.fullName}'s NYSC Yearbook Card`,
        text: shareText,
        url: shareUrl,
      });
    } catch (err) {
      console.log("Native text share failed:", err);
    }
  };

  const handleCopyLink = async () => {
    if (!profile) return;
    const shareText = `Check out my digital NYSC yearbook card on SabiDub! 🎓✨ Join the national yearbook directory, connect with fellow corp members, and create your own card here:`;
    const shareUrl = `${window.location.origin}/nysc/${profile.id}`;
    try {
      await navigator.clipboard.writeText(`${shareText}\n\n${shareUrl}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Clipboard copy failed:", err);
    }
  };

  const shareCard = async () => {
    if (!cardRef.current || !profile) return;
    setSharing(true);
    try {
      const html2canvas = (await import("html2canvas")).default;
      const canvas = await html2canvas(cardRef.current, {
        useCORS: true,
        allowTaint: true,
        backgroundColor: null,
        scale: 2,
      });

      const shareText = `Check out my digital NYSC yearbook card on SabiDub! 🎓✨ Join the national yearbook directory, connect with fellow corp members, and create your own card here:`;
      const shareUrl = `${window.location.origin}/nysc/${profile.id}`;

      if (navigator.share) {
        canvas.toBlob(async (blob) => {
          if (!blob) {
            await navigator.share({
              title: `${profile.fullName}'s NYSC Yearbook Card`,
              text: `${shareText}\n\n${shareUrl}`,
            }).catch(err => console.log("Text share failed:", err));
            return;
          }

          const file = new File([blob], `${profile.fullName.replace(/\s+/g, "_")}_passport.png`, { type: "image/png" });

          // Pre-copy text/link to clipboard as a helpful fallback for platforms that strip text from file share
          try {
            await navigator.clipboard.writeText(`${shareText}\n\n${shareUrl}`);
          } catch {}

          if (navigator.canShare && navigator.canShare({ files: [file] })) {
            await navigator.share({
              files: [file],
              title: `${profile.fullName}'s NYSC Yearbook Card`,
              text: `${shareText}\n\n${shareUrl}`,
            }).catch(err => console.log("File share failed:", err));
          } else {
            await navigator.share({
              title: `${profile.fullName}'s NYSC Yearbook Card`,
              text: `${shareText}\n\n${shareUrl}`,
            }).catch(err => console.log("Text fallback failed:", err));
          }
        }, "image/png");
      } else {
        await navigator.clipboard.writeText(`${shareText}\n\n${shareUrl}`);
        alert("📋 Share message and yearbook link copied to clipboard! Paste it on WhatsApp, Twitter, or Facebook to share.");
      }
    } catch (err) {
      console.error("Sharing failed:", err);
    } finally {
      setSharing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8FAFA]">
        <div className="w-10 h-10 border-4 border-[#01353D]/10 border-t-[#01353D] rounded-full animate-spin" />
        <p className="mt-4 text-[10px] font-black text-[#01353D] uppercase tracking-widest animate-pulse">Loading yearbook profile...</p>
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

  // Title-case: capitalise first letter of each word, rest lowercase
  const toTitleCase = (str: string) =>
    str ? str.replace(/\S+/g, w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()) : str;

  const nameParts = profile.fullName ? profile.fullName.trim().split(/\s+/) : [];
  const displayName = toTitleCase(nameParts.length >= 3 ? nameParts.slice(0, 2).join(' ') : profile.fullName);

  return (
    <>
      <Head>
        <title>{profile.fullName} — NYSC Corp Member Profile | SabiDub</title>
        <meta name="description" content={`View the NYSC yearbook profile for ${profile.fullName}, serving at ${profile.ppa}. Join the SabiDub NYSC digital yearbook.`} />

        {/* Open Graph — Facebook, WhatsApp, LinkedIn, etc. */}
        <meta property="og:type" content="profile" />
        <meta property="og:title" content={`${profile.fullName} — NYSC Yearbook Card`} />
        <meta property="og:description" content={`${profile.fullName} is ${profile.serviceStatus === 'Serving' ? 'serving' : 'a served alumni'} at ${profile.ppa}. View their NYSC digital passport and join the SabiDub yearbook directory.`} />
        <meta property="og:url" content={`https://www.sabidub.com/nysc/${profile.id}`} />
        {profile.avatarUrl && profile.avatarUrl !== DEFAULT_AVATAR && (
          <meta property="og:image" content={profile.avatarUrl} />
        )}
        <meta property="og:image:width" content="600" />
        <meta property="og:image:height" content="800" />
        <meta property="og:site_name" content="SabiDub" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${profile.fullName} — NYSC Yearbook Card | SabiDub`} />
        <meta name="twitter:description" content={`${profile.fullName} is ${profile.serviceStatus === 'Serving' ? 'serving' : 'a served alumni'} at ${profile.ppa}. Join the SabiDub NYSC yearbook!`} />
        {profile.avatarUrl && profile.avatarUrl !== DEFAULT_AVATAR && (
          <meta name="twitter:image" content={profile.avatarUrl} />
        )}
      </Head>

      <Navbar />

      <div className="bg-[#F8FAFA] min-h-screen pt-16 sm:pt-24 pb-20 overflow-x-hidden">

        {/* ── Hero Banner (full-bleed portrait + gradient overlay) ── */}
        <div className="relative w-full h-[420px] overflow-hidden bg-[#01353D]">
          {/* Portrait Image */}
          {profile.avatarUrl !== DEFAULT_AVATAR ? (
            <img
              src={profile.avatarUrl}
              alt={profile.fullName}
              className="absolute inset-0 w-full h-full object-cover object-top"
            />
          ) : (
            <div className="absolute inset-0 bg-[#01353D] flex items-center justify-center">
              <div className="w-24 h-24 rounded-full border-2 border-white/20 bg-white/5 flex items-center justify-center overflow-hidden">
                <img
                  src={DEFAULT_AVATAR}
                  alt="No Face Silhouette"
                  className="w-12 h-12 opacity-60 filter invert"
                />
              </div>
            </div>
          )}

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

          {/* Off-screen download target for html2canvas to capture the exact premium digital card design */}
          <div className="absolute left-[-9999px] top-[-9999px] pointer-events-none select-none">
            <div
              ref={cardRef}
              className="relative aspect-[3/4.2] w-[350px] rounded-none overflow-hidden"
              style={{ fontFamily: 'Inter, sans-serif', background: theme.cardGradientStyle }}
            >
              {/* Pattern mesh */}
              <div className="absolute inset-0 opacity-[0.06] pointer-events-none mix-blend-overlay z-10">
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <path d="M0,45 Q25,25 50,45 T100,45" fill="none" stroke="white" strokeWidth="0.8" />
                  <path d="M0,60 Q25,40 50,60 T100,60" fill="none" stroke="white" strokeWidth="0.8" />
                </svg>
              </div>

              {/* TOP WATERMARK */}
              <div className="absolute top-6 left-0 right-0 px-6 flex justify-between items-center z-20 text-[8px] font-black uppercase tracking-widest text-white/70 select-none">
                <span>nysc passport</span>
                <span>Powered by SabiDub</span>
              </div>

              {/* FULL BLEED PORTRAIT PHOTO */}
              <div className="absolute inset-0 w-full h-full z-0 bg-black">
                {profile.avatarUrl !== DEFAULT_AVATAR ? (
                  <div
                    className="relative z-10 w-full h-full bg-no-repeat bg-center bg-cover"
                    style={{ backgroundImage: `url(${profile.avatarUrl})` }}
                  />
                ) : (
                  /* Center silhouette if avatar is default */
                  <div className="w-full h-full flex items-center justify-center bg-black/50">
                    <div className="w-20 h-20 rounded-full border-2 border-white/20 bg-white/5 flex items-center justify-center overflow-hidden">
                      <img
                        src={DEFAULT_AVATAR}
                        alt="No Face Silhouette"
                        className="w-12 h-12 opacity-60 filter invert"
                      />
                    </div>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent z-10 pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent z-10 pointer-events-none" />
              </div>

              {/* BOTTOM TEXT ZONE (pushed up by bottom-8, space-y-0.5 for small spacing) */}
              <div className="absolute bottom-8 left-6 right-6 z-20 flex flex-col text-left space-y-0.5 select-none">
                {/* Service Status micro label */}
                <span className="text-[9px] font-black uppercase tracking-[0.15em] leading-[1.2] py-[1px]" style={{ color: theme.accentColor }}>
                  {profile.serviceStatus === "Serving" ? "Active Serving" : "Served Alumni"}
                </span>

                {/* Large bold name with verified icon */}
                <h3 className="text-base font-black text-white leading-[1.2] flex items-center gap-1.5 py-[1px]">
                  {displayName}
                  <FaCheckCircle className="text-xs shrink-0" style={{ color: theme.accentColor }} />
                </h3>

                {/* PPA Subtitle */}
                <p className="text-[11px] text-gray-300 font-semibold leading-[1.2] py-[1px]">
                  with <span className="font-bold" style={{ color: theme.accentColor }}>{(profile.ppa || "PPA Assignment").split(",")[0]}</span>
                </p>

                {/* Extra Details line */}
                <p className="text-[9.5px] text-gray-400 font-medium leading-[1.2] py-[1px]">
                  {profile.tribe} Tribe • {profile.stateOfOrigin || "STATE OF ORIGIN"} • {profile.platoonNo}
                </p>

                {/* Faint footer border line */}
                <div className="flex justify-between items-center pt-1.5 border-t border-white/10 mt-2 text-[8.5px] text-gray-200 font-mono leading-[1.2] py-[1px]">
                  <span className="font-bold">{profile.deploymentState || "DEPLOY STATE"} • {(profile.callUpNo || "STATE CODE").replace(/^NYSC\//i, "")}</span>
                  <span className="shrink-0 font-bold">NYSC {profile.yearOfService} ({profile.batch})</span>
                </div>
              </div>
            </div>
          </div>

          {/* Identity Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white border border-gray-200 rounded-2xl shadow-sm"
          >
            {/* Top accent strip */}
            <div className={`h-1 w-full bg-gradient-to-r ${theme.cardGradient}`} />

            <div className="p-6 sm:p-8">

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
                    <span className={`text-[8px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full border ${isServing
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

                {/* Action Buttons */}
                <div className="shrink-0 self-start flex flex-row sm:flex-col gap-2 w-full sm:w-auto mt-2 sm:mt-0">
                  {/* Download as Image Action */}
                  <button
                    onClick={downloadAsImage}
                    disabled={downloading}
                    className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 bg-[#01353D] hover:bg-[#024a54] disabled:opacity-60 text-white px-4 py-2.5 rounded-lg text-xs font-bold transition-colors w-full"
                  >
                    {downloading ? (
                      <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <FaDownload size={10} />
                    )}
                    {downloading ? "Saving..." : "Save as Image"}
                  </button>

                  {/* Share Action */}
                  <button
                    onClick={() => setShowShareModal(true)}
                    className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 border border-[#01353D] text-[#01353D] hover:bg-[#01353D]/5 px-4 py-2.5 rounded-lg text-xs font-bold transition-colors w-full"
                  >
                    <FaPaperPlane size={10} />
                    Share Card
                  </button>
                </div>
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
                  value={profile.tribe || "—"}
                  icon={<FaGlobe />}
                />
                <DetailRow
                  label="Deployment State"
                  value={profile.deploymentState || "—"}
                  icon={<FaMapMarkerAlt />}
                />

                <DetailRow
                  label="Service Year"
                  value={profile.yearOfService || "—"}
                  icon={<FaCalendarAlt />}
                />
                <DetailRow
                  label="Batch & Stream"
                  value={`${profile.batch || "—"} · ${profile.stream || "—"}`}
                />
                <DetailRow
                  label="Platoon"
                  value={`${profile.platoonNo || "—"} · ${profile.platoonPosition || "—"}`}
                  icon={<FaUsers />}
                />

                <div className="col-span-2 sm:col-span-3">
                  <DetailRow
                    label="Primary Place of Assignment (PPA)"
                    value={profile.ppa || "—"}
                    icon={<FaBuilding />}
                  />
                </div>

              </div>

              {/* ── Story / Memoir Section (Vibrant, Sleek Glassmorphism Card Style) ── */}
              {profile.story && (
                <div className="mt-8 pt-8 border-t border-gray-100">
                  <h3 className="text-xs font-black uppercase tracking-widest text-[#01353D] mb-3">My Service Story & Experience</h3>
                  <div className="bg-[#F8FAFA] border border-gray-150 rounded-xl p-4 sm:p-5 relative">
                    <span className="absolute -top-3 left-6 bg-[#01353D] text-white px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest">Memoir</span>
                    <p className="text-xs text-gray-700 leading-relaxed font-serif italic">
                      &ldquo;{profile.story}&rdquo;
                    </p>
                  </div>
                </div>
              )}

              {/* ── Memoir Gallery Section (Story-Style Memory Cards Layout) ── */}
              {profile.galleryUrls && profile.galleryUrls.filter(Boolean).length > 0 && (
                <div className="mt-8 pt-8 border-t border-gray-100">
                  <h3 className="text-xs font-black uppercase tracking-widest text-[#01353D] mb-4">NYSC Memory Gallery</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                    {profile.galleryUrls.filter(Boolean).map((url, idx) => {
                      const labels = ["CAMP MEMORY", "PPA MILESTONE", "POP GRADUATION"];
                      return (
                        <div
                          key={idx}
                          onClick={() => { setPreviewImage(url); setPreviewIndex(idx); }}
                          className="relative aspect-[9/16] w-full rounded-2xl overflow-hidden shadow-lg border border-gray-150 bg-black group hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all duration-300 cursor-pointer"
                        >
                          {/* Top Progress Indicators */}
                          <div className="absolute top-2.5 inset-x-2.5 flex gap-1 z-20">
                            {[0, 1, 2].map((i) => (
                              <div
                                key={i}
                                className={`h-[2px] flex-1 rounded-full ${i === idx ? "bg-white" : "bg-white/30"
                                  }`}
                              />
                            ))}
                          </div>

                          {/* Top Header Bar Overlay */}
                          <div className="absolute top-5 inset-x-3 flex items-center justify-between z-20">
                            <div className="flex items-center gap-2">
                              <img
                                src={profile.avatarUrl !== DEFAULT_AVATAR ? profile.avatarUrl : DEFAULT_AVATAR}
                                alt="Avatar"
                                className="w-7 h-7 rounded-full border border-white/20 object-cover"
                              />
                              <div className="flex flex-col text-left">
                                <span className="text-[10px] font-black text-white leading-tight drop-shadow-sm tracking-wider">
                                  {labels[idx]}
                                </span>
                                <span className="text-[8px] font-medium text-white/70 leading-none">
                                  {profile.fullName}
                                </span>
                              </div>
                            </div>
                            <div className="text-white/50 hover:text-white/90 text-[10px] font-bold p-1 cursor-pointer">
                              ✕
                            </div>
                          </div>

                          {/* Background Gradients Overlay */}
                          <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/60 to-transparent pointer-events-none z-10" />
                          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/80 via-black/25 to-transparent pointer-events-none z-10" />

                          {/* Full Bleed Image */}
                          <img
                            src={url}
                            alt={labels[idx]}
                            loading="lazy"
                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = 'none';
                            }}
                          />

                          {/* Left Bottom Information Pill */}
                          <div className="absolute bottom-3.5 left-3 z-20 bg-white/15 backdrop-blur-md border border-white/20 rounded-full px-2.5 py-1.5 flex items-center gap-1.5 text-white text-[8px] font-black tracking-wide leading-none uppercase">
                            <FaCamera size={9} className="opacity-90" />
                            <span>
                              {idx === 0 && (profile.deploymentState ? profile.deploymentState.split(" ")[0] : "CAMP")}
                              {idx === 1 && (profile.ppa ? profile.ppa.split(",")[0] : "PPA")}
                              {idx === 2 && (profile.yearOfService || "POP")}
                            </span>
                          </div>

                          {/* Right Bottom floating action controls */}
                          <div className="absolute bottom-3.5 right-3 flex items-center gap-2 z-20">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                if (navigator.share) {
                                  navigator.share({
                                    title: `${profile.fullName}'s ${labels[idx]}`,
                                    url: window.location.href
                                  }).catch(() => { });
                                } else {
                                  navigator.clipboard.writeText(window.location.href);
                                  alert("Profile link copied!");
                                }
                              }}
                              className="w-7 h-7 rounded-full bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/80 hover:text-white active:scale-90 transition-all hover:bg-white/25"
                              title="Share profile link"
                            >
                              <FaPaperPlane size={9} />
                            </button>
                            <div
                              className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white hover:bg-white/35 active:scale-90 transition-all cursor-pointer"
                              title="View full photo"
                            >
                              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-none stroke-current" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="15 3 21 3 21 9" />
                                <polyline points="9 21 3 21 3 15" />
                                <line x1="21" y1="3" x2="14" y2="10" />
                                <line x1="3" y1="21" x2="10" y2="14" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

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

      {downloading && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex flex-col items-center justify-center select-none animate-fadeIn">
          <div className="bg-white/10 border border-white/20 p-8 rounded-2xl shadow-2xl max-w-sm w-[90%] text-center flex flex-col items-center gap-5">
            {/* Spinning gradient ring */}
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 rounded-full border-4 border-emerald-400/20" />
              <div className="absolute inset-0 rounded-full border-4 border-t-emerald-400 animate-spin" />
            </div>

            <div className="space-y-1.5">
              <h4 className="text-white text-sm font-black uppercase tracking-widest">Generating Digital Card</h4>
              <p className="text-gray-300 text-[10px] leading-relaxed">Preparing high-definition graphics, rendering custom fonts, and packaging your NYSC digital passport...</p>
            </div>

            {/* Simulated progress step anim */}
            <div className="w-full bg-white/10 h-[3px] rounded-full overflow-hidden">
              <div className="bg-gradient-to-r from-emerald-400 to-teal-500 h-full rounded-full w-4/5 animate-pulse" />
            </div>
          </div>
        </div>
      )}

      {previewImage && profile.galleryUrls && (() => {
        const images = profile.galleryUrls.filter(Boolean);
        const labels = ["CAMP MEMORY", "PPA MILESTONE", "POP GRADUATION"];
        const current = images[previewIndex] || images[0];
        const total = images.length;
        const goPrev = () => setPreviewIndex(i => (i - 1 + total) % total);
        const goNext = () => setPreviewIndex(i => (i + 1) % total);

        return (
          <div className="fixed inset-0 bg-black/95 backdrop-blur-lg z-[100] flex flex-col">
            {/* Top Bar */}
            <div className="flex-none flex items-center justify-between px-5 py-4 border-b border-white/10">
              <div>
                <span className="text-[9px] font-black text-emerald-400 uppercase tracking-widest block">nysc memory board</span>
                <span className="text-white text-xs font-bold">{profile.fullName}&apos;s Service Journey</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-gray-400 text-[10px] font-mono">{previewIndex + 1} / {total}</span>
                <button
                  className="bg-white/10 hover:bg-white/20 active:bg-white/30 text-white rounded-full w-8 h-8 flex items-center justify-center transition-colors border border-white/10 text-sm font-black"
                  onClick={() => setPreviewImage(null)}
                >✕</button>
              </div>
            </div>

            {/* Main Image Area */}
            <div className="flex-1 relative flex items-center justify-center overflow-hidden px-14 sm:px-20">

              {/* Prev Arrow */}
              {total > 1 && (
                <button
                  onClick={goPrev}
                  className="absolute left-2 sm:left-4 z-10 bg-white/10 hover:bg-white/25 active:bg-white/40 text-white rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-lg font-black border border-white/10 transition-all"
                >‹</button>
              )}

              {/* Active Image */}
              <div className="w-full h-full max-w-lg mx-auto relative">
                <img
                  key={current}
                  src={current}
                  alt={labels[previewIndex] || "Memory"}
                  className="w-full h-full object-contain rounded-xl select-none"
                  draggable={false}
                />
                {/* Label badge */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                  <span className="bg-emerald-400 text-black px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest shadow-lg">
                    {labels[previewIndex] || "Service Photo"}
                  </span>
                </div>
              </div>

              {/* Next Arrow */}
              {total > 1 && (
                <button
                  onClick={goNext}
                  className="absolute right-2 sm:right-4 z-10 bg-white/10 hover:bg-white/25 active:bg-white/40 text-white rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-lg font-black border border-white/10 transition-all"
                >›</button>
              )}
            </div>

            {/* Dot Indicators + Thumbnails */}
            <div className="flex-none py-4 px-4 border-t border-white/10">
              {/* Dot indicators */}
              <div className="flex justify-center gap-2 mb-3">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPreviewIndex(i)}
                    className={`rounded-full transition-all ${i === previewIndex ? 'w-5 h-2 bg-emerald-400' : 'w-2 h-2 bg-white/30 hover:bg-white/60'}`}
                  />
                ))}
              </div>
              {/* Thumbnail strip */}
              <div className="flex gap-3 justify-center overflow-x-auto pb-1">
                {images.map((url, i) => (
                  <div
                    key={i}
                    onClick={() => setPreviewIndex(i)}
                    className={`shrink-0 w-14 h-14 rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${i === previewIndex ? 'border-emerald-400 scale-105' : 'border-white/10 opacity-50 hover:opacity-80'}`}
                  >
                    <img src={url} alt={labels[i]} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      })()}

      {/* ── Share Modal (Glassmorphism & Interactive Option Selection) ── */}
      {showShareModal && profile && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-white border border-gray-200/50 rounded-2xl max-w-sm w-full shadow-2xl overflow-hidden relative p-6 text-gray-800"
          >
            {/* Close Button */}
            <button
              onClick={() => setShowShareModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors p-1"
            >
              <FaTimes size={16} />
            </button>

            {/* Header */}
            <div className="mb-5">
              <span className="text-[9px] font-black text-[#01353D] uppercase tracking-widest block mb-1">Share Options</span>
              <h3 className="text-base font-black text-[#01353D]">Share Profile Card</h3>
              <p className="text-[10px] text-gray-500 mt-0.5">Select your preferred way to share your digital NYSC yearbook card.</p>
            </div>

            {/* Link Preview Info Note */}
            <div className="bg-[#01353D]/5 border border-[#01353D]/10 rounded-xl p-3 mb-5 text-[10px] leading-relaxed text-[#01353D]/80">
              <span className="font-bold block mb-0.5">✨ Recommended Link Share:</span>
              Sharing the link will automatically generate a beautiful digital card preview image on WhatsApp, Facebook, and Twitter.
            </div>

            {/* Direct Social Media Sharing Buttons (Row layout) */}
            <div className="grid grid-cols-3 gap-2.5 mb-5">
              {/* WhatsApp */}
              <button
                onClick={shareToWhatsapp}
                className="flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl bg-emerald-50 hover:bg-emerald-100/80 active:scale-95 transition-all text-emerald-600 font-bold"
              >
                <FaWhatsapp size={20} />
                <span className="text-[9px] font-black uppercase tracking-wider">WhatsApp</span>
              </button>

              {/* Facebook */}
              <button
                onClick={shareToFacebook}
                className="flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl bg-blue-50 hover:bg-blue-100/80 active:scale-95 transition-all text-blue-600 font-bold"
              >
                <FaFacebook size={20} />
                <span className="text-[9px] font-black uppercase tracking-wider">Facebook</span>
              </button>

              {/* Twitter / X */}
              <button
                onClick={shareToTwitter}
                className="flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl bg-gray-50 hover:bg-gray-100/85 active:scale-95 transition-all text-gray-900 font-bold"
              >
                <FaTwitter size={20} />
                <span className="text-[9px] font-black uppercase tracking-wider">Twitter</span>
              </button>
            </div>

            {/* Interactive List Options */}
            <div className="space-y-2">
              {/* Copy message and link */}
              <button
                onClick={handleCopyLink}
                className="w-full flex items-center justify-between px-3.5 py-3 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-700 text-xs font-bold transition-all active:scale-98"
              >
                <span className="flex items-center gap-2">
                  <FaCopy size={12} className="text-gray-400" />
                  {copied ? "Copied Share Message!" : "Copy Share Text & Link"}
                </span>
                {copied && <span className="text-[10px] text-emerald-500 font-bold">✓ Copied</span>}
              </button>

              {/* Native System Share Sheet (if supported) */}
              {navigatorShareSupported && (
                <button
                  onClick={shareNativeText}
                  className="w-full flex items-center gap-2 px-3.5 py-3 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-700 text-xs font-bold transition-all active:scale-98"
                >
                  <FaShareAlt size={12} className="text-gray-400" />
                  Share via Native App Menu
                </button>
              )}

              {/* Divider */}
              <div className="relative flex py-2 items-center">
                <div className="flex-grow border-t border-gray-200"></div>
                <span className="flex-shrink mx-3 text-[9px] font-black text-gray-400 uppercase tracking-widest">or send photo</span>
                <div className="flex-grow border-t border-gray-200"></div>
              </div>

              {/* Share Generated Image file */}
              <button
                onClick={async () => {
                  setShowShareModal(false);
                  await shareCard();
                }}
                disabled={sharing}
                className="w-full flex items-center justify-between px-3.5 py-3 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-700 text-xs font-bold transition-all active:scale-98 disabled:opacity-50"
              >
                <span className="flex items-center gap-2">
                  <FaCamera size={12} className="text-gray-400" />
                  {sharing ? "Generating Image..." : "Share Card Image (PNG File)"}
                </span>
                {sharing && <span className="w-3.5 h-3.5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />}
              </button>
            </div>
          </motion.div>
        </div>
      )}

      <Footer />
    </>
  );
}

// ─── Server-side data fetch for Open Graph meta tags ────────────────────────
export const getServerSideProps: GetServerSideProps<PageProps> = async ({ params }) => {
  const id = params?.id as string;
  if (!id) {
    return { props: { initialProfile: null } };
  }

  try {
    const res = await fetch(`${API_BASE}/profile/${encodeURIComponent(id)}`, {
      headers: { 'Accept': 'application/json' },
    });

    if (!res.ok) {
      return { props: { initialProfile: null } };
    }

    const resData = await res.json();
    if (!resData) {
      return { props: { initialProfile: null } };
    }

    const details = resData.nyscDetails || {};
    const mappedProfile: NyscProfile = {
      id: resData.id,
      fullName: details.fullName || resData.name || 'Anonymous',
      email: details.email || undefined,
      phone: details.phone || resData.number || undefined,
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
      gender: details.gender || resData.gender || 'Male',
      badgeTheme: details.badgeTheme || 'emerald',
      avatarUrl: details.avatarUrl || resData.profilePicture || DEFAULT_AVATAR,
      galleryUrls: details.galleryUrls || [],
      story: details.story || undefined,
      serviceStatus: details.serviceStatus || 'Serving',
      createdAt: details.createdAt
        ? new Date(details.createdAt).toLocaleDateString()
        : new Date().toLocaleDateString(),
    };

    return { props: { initialProfile: mappedProfile } };
  } catch (err) {
    console.error('SSR profile fetch failed:', err);
    return { props: { initialProfile: null } };
  }
};
