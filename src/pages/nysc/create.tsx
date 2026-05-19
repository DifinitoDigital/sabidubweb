/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import { useState, useRef } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  FaIdCard, FaUsers, FaBuilding, FaGlobe,
  FaCamera, FaUpload, FaCheckCircle, FaChevronLeft, FaArrowRight, FaDownload
} from "react-icons/fa";

const DEFAULT_AVATAR = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iI2NiZDVlMSI+PHBhdGggZD0iTTEyIDEyYzIuMjEgMCA0LTEuNzkgNC00cy0xLjc5LTQtNC00LTQgMS43OS00IDQgMS43OSA0IDQgNHptMCAyYy0yLjY3IDAtOCAxLjM0LTggNHYyaDE2di0yYzAtMi42Ni01LjMzLTQtOC00eiIvPjwvc3ZnPg==";

const CAMP_STATES = [
  "Abia (Mgbhan)", "Adamawa (Girei)", "Akwa Ibom (Nsit Atai)", "Anambra (Umuawulu-Mbaukwu)",
  "Bauchi (Wailo)", "Bayelsa (Kaiama)", "Benue (Wannune)", "Borno (Katsina Camp)",
  "Cross River (Obubra)", "Delta (Issele-Uku)", "Ebonyi (Macgregor)", "Edo (Okada)",
  "Ekiti (Ise-Orun/Emure)", "Enugu (Awgu)", "FCT Abuja (Kubwa)", "Gombe (Amada)",
  "Imo (Eziama Obaire)", "Jigawa (Fanisau)", "Kaduna (Chikun)", "Kano (Karaye)",
  "Katsina (Mani Road)", "Kebbi (Dakingari)", "Kogi (Asaya)", "Kwara (Yikpata)",
  "Lagos (Iyana Ipaja)", "Nasarawa (Keffi)", "Niger (Paiko)", "Ogun (Sagamu)",
  "Ondo (Ikare-Akoko)", "Osun (Ede)", "Oyo (Iseyin)", "Plateau (Mangu)",
  "Rivers (Nonwa Gbam)", "Sokoto (Wamakko)", "Taraba (Jalingo)", "Yobe (Potiskum)",
  "Zamfara (Tsafe)"
];

const NIGERIAN_STATES = [
  "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno",
  "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "Gombe", "Imo",
  "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi", "Kwara", "Lagos",
  "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau", "Rivers",
  "Sokoto", "Taraba", "Yobe", "Zamfara", "FCT Abuja"
];

const NIGERIAN_TRIBES = [
  "Abayon", "Abua", "Achipa", "Adara", "Adim", "Adun", "Affade", "Afizere", "Afo", "Agbo",
  "Agila", "Agwagwune", "Ahan", "Ahwia", "Akaju-Ndem", "Akajuk", "Akoko", "Akpa", "Akpes", "Alago",
  "Amo", "Anaguta", "Anan", "Anang", "Angas", "Ankwei", "Anyama", "Atyap", "Auyoka", "Awori",
  "Ayu", "Babur", "Bachama", "Bada", "Bade", "Bahumono", "Bakulu", "Bali", "Bambuka", "Banda",
  "Bandawa", "Bariba", "Barke", "Bashiri", "Basa", "Bassa-Komo", "Bassa-Nge", "Batonu", "Batsama", "Baushi",
  "Baya", "Bekwarra", "Bette", "Bile", "Biliri", "Binawa", "Bini (Edo)", "Boki", "Bokkos", "Boma",
  "Bombaro", "Boritsu", "Bolewa", "Buduma", "Bumaji", "Bura", "Burak", "Bussa", "Buta", "Bwall",
  "Bwali", "Bwzza", "Challa", "Chamba", "Cham-Mwana", "Chara", "Chawai", "Chip", "Chokobo", "Chukkol",
  "Daba", "Dadiya", "Daka", "Dakarkari", "Danda", "Dandawa", "Daza", "Degema", "Dendi", "Dera",
  "Dghwede", "Dibo", "Doemak", "Doko-Uyanga", "Dong", "Duka", "Duri", "Duwa", "Ebira", "Ebu",
  "Efik", "Efut", "Eggon", "Egun", "Egbema", "Egedde", "Ekoi", "Esan", "Etsako", "Etche",
  "Fali", "Fulani", "Fyam", "Fyer", "Ga'anda", "Gade", "Galambi", "Gambiri", "Ganawuri", "Gbagyi",
  "Gbedde", "Gbo", "Gbotogo", "Gera", "Geruma", "Ghana", "Ghotuo", "Ginde", "Gira", "Gizigz",
  "Gobir", "Goemai", "Gokana", "Gombi", "Gornun", "Gura", "Gurmana", "Gwandara", "Gwari", "Gwom",
  "Gwoza", "Gyem", "Hausa", "Higi", "Holma", "Ibeno", "Ibibio", "Ichen", "Icheve", "Idoma",
  "Igala", "Igbo", "Igede", "Ijaw", "Ika", "Ikulu", "Irigwe", "Isoko", "Itsekiri", "Iyala",
  "Izere", "Jaku", "Jara", "Jassawa", "Jawa", "Jeere", "Jera", "Jidda-Abu", "Jibu", "Jiti",
  "Jorto", "Jukun", "Kaje", "Kajuru", "Kaka", "Kalabari", "Kamaku", "Kambari", "Kamwe", "Kanakuru",
  "Kanembu", "Kanuri", "Karimjo", "Kariya", "Katab", "Kenern", "Keshny", "Kiballo", "Kilba", "Kohumono",
  "Koma", "Kona", "Koro", "Kubi", "Kudachano", "Kufry", "Kugama", "Kugbo", "Kukuruku", "Kulere",
  "Kunini", "Kurama", "Kushi", "Kuteb", "Kuturmi", "Kwalla", "Kwami", "Kwange", "Kwanka", "Kwaro",
  "Kwato", "Kyenga", "Laaru", "Laka", "Lala", "Lame", "Lamja", "Lau", "Lela", "Lelna",
  "Lemoro", "Limbola", "Lindiri", "Longuda", "Lopa", "Lotsu", "Lukshi", "Lungu", "Luri", "Mabo",
  "Mada", "Maha", "Mambilla", "Mangas", "Margi", "Matakarn", "Mbembe", "Mboi", "Mbote", "Mbula",
  "Mbum", "Mbutye", "Medye", "Megili", "Memyang", "Miango", "Milgili", "Mini", "Miri", "Miya",
  "Mobber", "Montol", "Morwa", "Muchia", "Mumuye", "Mundang", "Mupun", "Mushere", "Mwaghavul", "Ndoro",
  "Ngamo", "Nggwahyi", "Ngizim", "Ngoshe", "Nguwimi", "Ninzam", "Njimbin", "Nkari", "Nkum", "Nokere",
  "Nuki", "Nungu", "Nupe", "Nyandang", "Odut", "Ogbia", "Ogoni", "Okobo", "Okpamheri", "Olulumo",
  "Oron", "Owan", "Owe", "Pa'a", "Pai", "Panyam", "Passam", "Pero", "Pyapun", "Quoll",
  "Reshe", "Rindre", "Rishuwa", "Ron", "Rubu", "Rukuba", "Rumada", "Rumaya", "Sakbe", "Sanga",
  "Sarkawa", "Saya", "Shanga", "Shangawa", "Shira", "Shomo", "Shuwa Arab", "Sikdi", "Siri", "Sukur",
  "Sura", "Tangale", "Tarok", "Tiv", "Tula", "Umon", "Uncinda", "Urhobo", "Uvwie", "Uyanga",
  "Verre", "Waja", "Waka", "Warji", "Wula", "Wurkum", "Yagba", "Yako", "Yala", "Yandang",
  "Yergan", "Yoruba", "Yoti", "Yungur", "Zarma", "Zangwal", "Other"
];

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

const PORTRAIT_PLACEHOLDERS = {
  Male: [
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=600"
  ],
  Female: [
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=600"
  ]
};

const compressImage = (file: File, maxDim = 1920, quality = 0.9): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;

        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          resolve(event.target?.result as string);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        const compressedBase64 = canvas.toDataURL("image/jpeg", quality);
        resolve(compressedBase64);
      };
      img.onerror = () => {
        resolve(event.target?.result as string);
      };
      img.src = event.target?.result as string;
    };
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
};

export default function CreateNyscProfile() {
  const router = useRouter();

  // Profile Form States
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [stateOfOrigin, setStateOfOrigin] = useState("");
  const [callUpNo, setCallUpNo] = useState("");
  const [deploymentState, setDeploymentState] = useState("");
  const [yearOfService, setYearOfService] = useState("2026");
  const [batch, setBatch] = useState("Batch A");
  const [stream, setStream] = useState("Stream 1");
  const [platoonNo, setPlatoonNo] = useState("Platoon 1");
  const [platoonPosition, setPlatoonPosition] = useState("Member");
  const [ppa, setPpa] = useState("");
  const [tribe, setTribe] = useState("");
  const [badgeTheme, setBadgeTheme] = useState<keyof typeof BADGE_STYLES>("emerald");
  const [gender, setGender] = useState("Male");
  const [avatarUrl, setAvatarUrl] = useState(DEFAULT_AVATAR);
  const [serviceStatus, setServiceStatus] = useState("Serving");
  const [galleryUrls, setGalleryUrls] = useState<string[]>([]);
  const [story, setStory] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [downloadingPreview, setDownloadingPreview] = useState(false);
  const [formStep, setFormStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 4500);
  };

  const downloadPreviewCard = async () => {
    if (!cardRef.current) return;
    setDownloadingPreview(true);
    try {
      const html2canvas = (await import("html2canvas")).default;
      const canvas = await html2canvas(cardRef.current, {
        useCORS: true,
        allowTaint: true,
        backgroundColor: null,
        scale: 2.5,
      });
      const link = document.createElement("a");
      link.download = `${fullName.replace(/\s+/g, "_") || "my_nysc"}_passport.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
      triggerToast("💖 Yearbook passport downloaded successfully!");
    } catch (err) {
      console.error("Preview card download failed:", err);
      triggerToast("❌ Failed to save preview image.");
    } finally {
      setDownloadingPreview(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const compressed = await compressImage(file);
        setAvatarUrl(compressed);
        triggerToast("📸 Profile photo compressed & loaded successfully!");
      } catch (err) {
        console.error(err);
        triggerToast("❌ Failed to process the image.");
      }
    }
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !callUpNo || !deploymentState || !ppa || !tribe) {
      triggerToast("Please fill in all required fields, including PPA and Tribe!");
      return;
    }
    if (avatarUrl === DEFAULT_AVATAR) {
      triggerToast("Please upload your profile photo first!");
      return;
    }

    setSubmitting(true);
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || process.env.API_URL || 'http://localhost:4000';
      const response = await fetch(`${baseUrl}/profile/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "NYSC",
          fullName,
          email,
          phone,
          stateOfOrigin,
          callUpNo,
          deploymentState,
          yearOfService,
          batch,
          stream,
          platoonNo,
          platoonPosition,
          ppa,
          tribe,
          badgeTheme,
          gender: gender ? gender.toUpperCase() : undefined,
          avatarUrl,
          serviceStatus,
          galleryUrls: galleryUrls.filter(Boolean),
          story,
        }),
      });

      const resData = await response.json();
      if (response.ok && resData) {
        const details = resData.nyscDetails || {};
        const savedData = {
          id: resData.id,
          fullName: details.fullName || resData.name,
          email: details.email,
          phone: details.phone,
          stateOfOrigin: details.stateOfOrigin,
          callUpNo: details.callUpNo,
          deploymentState: details.deploymentState,
          yearOfService: details.yearOfService,
          batch: details.batch,
          stream: details.stream,
          platoonNo: details.platoonNo,
          platoonPosition: details.platoonPosition,
          ppa: details.ppa,
          tribe: details.tribe,
          badgeTheme: details.badgeTheme,
          gender: details.gender,
          avatarUrl: details.avatarUrl || resData.profilePicture,
          serviceStatus: details.serviceStatus,
          createdAt: new Date().toLocaleDateString(),
        };

        localStorage.setItem("sabidub_nysc_passport", JSON.stringify(savedData));
        triggerToast("🎉 Profile published successfully!");
        
        // Push back to the previous yearbook directory page!
        setTimeout(() => {
          router.push('/nysc');
        }, 1500);
      } else {
        triggerToast(`❌ Error: ${resData.message || "Failed to register profile"}`);
      }
    } catch (err) {
      console.error("API error", err);
      triggerToast("❌ API Connection error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const activeTheme = BADGE_STYLES[badgeTheme];

  return (
    <>
      {/* ── Circular Progress Loader Overlay when Submitting ── */}
      {submitting && (
        <div className="fixed inset-0 z-50 bg-[#F8FAFA]/80 backdrop-blur-md flex flex-col items-center justify-center">
          <div className="relative flex items-center justify-center">
            <div className="w-16 h-16 rounded-full border-4 border-[#01353D]/10 border-t-[#01353D] animate-spin" />
          </div>
          <h3 className="mt-5 text-xs font-black text-[#01353D] uppercase tracking-widest animate-pulse">Publishing Your Yearbook Card...</h3>
          <p className="text-[10px] text-gray-500 mt-1">Compressing assets and establishing secure identity.</p>
        </div>
      )}
      <Head>
        <title>Join Digital Yearbook | SabiDub</title>
        <meta name="description" content="Add your digital card to the SabiDub NYSC yearbook." />
      </Head>

      <Navbar />

      <main className="bg-[#F8FAFA] min-h-screen pt-28 pb-20 overflow-x-hidden">
        {/* Title Block */}
        <div className="max-w-4xl mx-auto px-6 text-center mb-8">
          <h1 className="text-3xl font-black text-gray-950 tracking-tight leading-none mb-2">
            Join Digital Yearbook
          </h1>
          <p className="text-xs text-gray-500 max-w-md mx-auto">
            Upload your profile picture, select your service status, input deployment details, and PPA to register your yearbook card.
          </p>
        </div>

        {/* Builder Container */}
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-5 gap-8 items-start">
          {/* 1. The Form Column */}
          <div className="md:col-span-3 bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 shadow-sm">
            {/* Step Headers */}
            <div className="flex justify-between items-center pb-6 border-b border-gray-100 mb-6">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black transition-all ${formStep >= 1 ? "bg-[#01353D] text-white" : "bg-gray-100 text-gray-400"}`}>1</span>
                <span className={`text-[10px] sm:text-[11px] font-bold transition-all ${formStep === 1 ? "text-gray-900 font-extrabold" : "text-gray-400"}`}>Bio</span>
              </div>
              <div className="flex-1 h-[1px] bg-gray-200 mx-1.5 sm:mx-3" />
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black transition-all ${formStep >= 2 ? "bg-[#01353D] text-white" : "bg-gray-100 text-gray-400"}`}>2</span>
                <span className={`text-[10px] sm:text-[11px] font-bold transition-all ${formStep === 2 ? "text-gray-900 font-extrabold" : "text-gray-400"}`}>Deployment</span>
              </div>
              <div className="flex-1 h-[1px] bg-gray-200 mx-1.5 sm:mx-3" />
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black transition-all ${formStep >= 3 ? "bg-[#01353D] text-white" : "bg-gray-100 text-gray-400"}`}>3</span>
                <span className={`text-[10px] sm:text-[11px] font-bold transition-all ${formStep === 3 ? "text-gray-900 font-extrabold" : "text-gray-400"}`}>PPA & Story</span>
              </div>
            </div>

            <form onSubmit={handleGenerate} className="space-y-4">
              {/* STEP 1: BIO DETAILS */}
              {formStep === 1 && (
                <div className="space-y-4">
                  <div className="text-left">
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Service Status *</label>
                    <div className="flex gap-2">
                      {[
                        { key: "Serving", labelMobile: "Serving", labelDesktop: "Currently Serving (Active)" },
                        { key: "Served", labelMobile: "Served", labelDesktop: "Served (Alumni)" }
                      ].map(status => (
                        <button
                          type="button"
                          key={status.key}
                          onClick={() => setServiceStatus(status.key)}
                          className={`flex-1 py-2.5 px-2 border rounded-lg text-xs font-bold transition-all ${serviceStatus === status.key
                            ? "bg-[#01353D] border-[#01353D] text-white"
                            : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
                            }`}
                        >
                          <span className="hidden sm:inline">{status.labelDesktop}</span>
                          <span className="inline sm:hidden">{status.labelMobile}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="text-left">
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Profile Picture *</label>
                    <div className="grid sm:grid-cols-3 gap-4 items-center">
                      <div className="relative w-20 h-20 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden bg-gray-55 mx-auto sm:mx-0">
                        <img 
                          src={avatarUrl} 
                          alt="Avatar Preview" 
                          className="w-full h-full object-cover" 
                        />
                      </div>
                      <div className="sm:col-span-2 text-center sm:text-left space-y-2">
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="bg-white border border-gray-200 text-gray-700 px-4 py-2.5 rounded-lg text-xs font-bold hover:bg-gray-50 transition-colors flex items-center justify-center sm:justify-start gap-1.5 w-full sm:w-auto"
                        >
                          <FaUpload /> Upload Profile Photo
                        </button>
                        <input
                          type="file"
                          ref={fileInputRef}
                          onChange={handleImageUpload}
                          accept="image/*"
                          className="hidden"
                        />
                        <p className="text-[10px] text-gray-500">Supports JPG, PNG, WEBP (Auto-compressed).</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-3">
                    <div className="text-left">
                      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={e => { setFullName(e.target.value); setErrors(prev => ({ ...prev, fullName: "" })); }}
                        placeholder="e.g. Hamman Bakare"
                        className={`w-full px-3.5 py-2 bg-gray-55 border ${errors.fullName ? "border-red-500 bg-red-50" : "border-gray-200"} rounded-lg text-xs focus:outline-none focus:border-[#01353D] transition-all`}
                      />
                      {errors.fullName && <p className="text-red-500 text-[9px] mt-1 font-bold">{errors.fullName}</p>}
                    </div>
                    <div className="text-left">
                      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">State of Origin *</label>
                      <select
                        required
                        value={stateOfOrigin}
                        onChange={e => { setStateOfOrigin(e.target.value); setErrors(prev => ({ ...prev, stateOfOrigin: "" })); }}
                        className={`w-full px-3.5 py-2.5 bg-gray-55 border ${errors.stateOfOrigin ? "border-red-500 bg-red-50" : "border-gray-200"} rounded-lg text-xs focus:outline-none focus:border-[#01353D] transition-all`}
                      >
                        <option value="">Select State</option>
                        {NIGERIAN_STATES.map(s => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                      {errors.stateOfOrigin && <p className="text-red-500 text-[9px] mt-1 font-bold">{errors.stateOfOrigin}</p>}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-3">
                    <div className="text-left">
                      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={e => { setEmail(e.target.value); setErrors(prev => ({ ...prev, email: "" })); }}
                        placeholder="e.g. bakare.t@mail.com"
                        className={`w-full px-3.5 py-2 bg-gray-55 border ${errors.email ? "border-red-500 bg-red-50" : "border-gray-200"} rounded-lg text-xs focus:outline-none focus:border-[#01353D] transition-all`}
                      />
                      {errors.email && <p className="text-red-500 text-[9px] mt-1 font-bold">{errors.email}</p>}
                    </div>
                    <div className="text-left">
                      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Phone Number</label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        placeholder="e.g. +234 812 345 6789"
                        className="w-full px-3.5 py-2 bg-gray-55 border border-gray-200 rounded-lg text-xs focus:outline-none focus:border-[#01353D] transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-3">
                    <div className="text-left">
                      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Tribe / Cultural Group *</label>
                      <select
                        required
                        value={tribe}
                        onChange={e => { setTribe(e.target.value); setErrors(prev => ({ ...prev, tribe: "" })); }}
                        className={`w-full px-3.5 py-2.5 bg-gray-55 border ${errors.tribe ? "border-red-500 bg-red-50" : "border-gray-200"} rounded-lg text-xs focus:outline-none focus:border-[#01353D] transition-all`}
                      >
                        <option value="">Select Tribe</option>
                        {NIGERIAN_TRIBES.map(t => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                      {errors.tribe && <p className="text-red-500 text-[9px] mt-1 font-bold">{errors.tribe}</p>}
                    </div>
                    <div className="text-left">
                      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Gender</label>
                      <div className="flex gap-2">
                        {["Male", "Female"].map(g => (
                          <button
                            type="button"
                            key={g}
                            onClick={() => setGender(g)}
                            className={`flex-1 py-2 border rounded-lg text-[11px] font-bold transition-all ${gender === g
                              ? "bg-[#01353D] border-[#01353D] text-white"
                              : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
                              }`}
                          >
                            {g}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between pt-2">
                    <button
                      type="button"
                      onClick={() => router.push('/nysc')}
                      className="border border-gray-200 text-gray-500 px-5 py-3 rounded-lg text-xs font-bold uppercase tracking-wider"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const newErrors: Record<string, string> = {};
                        if (!fullName.trim()) newErrors.fullName = "Full Name is required";
                        if (!stateOfOrigin) newErrors.stateOfOrigin = "State of Origin is required";
                        if (!email.trim()) newErrors.email = "Email Address is required";
                        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) newErrors.email = "Invalid email format";
                        if (!tribe) newErrors.tribe = "Tribe is required";

                        setErrors(newErrors);
                        if (Object.keys(newErrors).length > 0) {
                          triggerToast("Please fill in the highlighted required fields.");
                          return;
                        }
                        if (avatarUrl === DEFAULT_AVATAR) {
                          triggerToast("Please upload your profile photo first!");
                          return;
                        }
                        setFormStep(2);
                      }}
                      className="bg-[#01353D] text-white px-5 py-3 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 hover:bg-[#024a54] transition-colors"
                    >
                      Next <FaArrowRight />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: DEPLOYMENT DETAILS */}
              {formStep === 2 && (
                <div className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div className="text-left">
                      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Call-up Number *</label>
                      <input
                        type="text"
                        required
                        value={callUpNo}
                        onChange={e => { setCallUpNo(e.target.value); setErrors(prev => ({ ...prev, callUpNo: "" })); }}
                        placeholder="e.g. NYSC/LAG/2025/284091"
                        className={`w-full px-3.5 py-2.5 bg-gray-55 border ${errors.callUpNo ? "border-red-500 bg-red-50" : "border-gray-200"} rounded-lg text-xs focus:outline-none focus:border-[#01353D] transition-all uppercase`}
                      />
                      {errors.callUpNo && <p className="text-red-500 text-[9px] mt-1 font-bold">{errors.callUpNo}</p>}
                    </div>
                    <div className="text-left">
                      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Deployment Camp State *</label>
                      <select
                        required
                        value={deploymentState}
                        onChange={e => { setDeploymentState(e.target.value); setErrors(prev => ({ ...prev, deploymentState: "" })); }}
                        className={`w-full px-3.5 py-2.5 bg-gray-55 border ${errors.deploymentState ? "border-red-500 bg-red-50" : "border-gray-200"} rounded-lg text-xs focus:outline-none focus:border-[#01353D] transition-all`}
                      >
                        <option value="">Select Camp State</option>
                        {CAMP_STATES.map(s => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                      {errors.deploymentState && <p className="text-red-500 text-[9px] mt-1 font-bold">{errors.deploymentState}</p>}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-3 gap-3">
                    <div className="text-left">
                      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Year *</label>
                      <select
                        value={yearOfService}
                        onChange={e => setYearOfService(e.target.value)}
                        className="w-full px-3 py-2.5 bg-gray-55 border border-gray-200 rounded-lg text-xs focus:outline-none focus:border-[#01353D] transition-all"
                      >
                        {Array.from({ length: 2026 - 1973 + 1 }, (_, i) => 2026 - i).map(year => (
                          <option key={year} value={year.toString()}>{year}</option>
                        ))}
                      </select>
                    </div>
                    <div className="text-left">
                      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Batch *</label>
                      <select
                        value={batch}
                        onChange={e => setBatch(e.target.value)}
                        className="w-full px-3 py-2.5 bg-gray-55 border border-gray-200 rounded-lg text-xs focus:outline-none focus:border-[#01353D] transition-all"
                      >
                        <option value="Batch A">Batch A</option>
                        <option value="Batch B">Batch B</option>
                        <option value="Batch C">Batch C</option>
                      </select>
                    </div>
                    <div className="text-left">
                      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Stream *</label>
                      <select
                        value={stream}
                        onChange={e => setStream(e.target.value)}
                        className="w-full px-3 py-2.5 bg-gray-55 border border-gray-200 rounded-lg text-xs focus:outline-none focus:border-[#01353D] transition-all"
                      >
                        <option value="Stream 1">Stream 1</option>
                        <option value="Stream 2">Stream 2</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-3">
                    <div className="text-left">
                      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Platoon Assignment</label>
                      <select
                        value={platoonNo}
                        onChange={e => setPlatoonNo(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-gray-55 border border-gray-200 rounded-lg text-xs focus:outline-none focus:border-[#01353D] transition-all"
                      >
                        {[...Array(12)].map((_, i) => (
                          <option key={i + 1} value={`Platoon ${i + 1}`}>{`Platoon ${i + 1}`}</option>
                        ))}
                      </select>
                    </div>
                    <div className="text-left">
                      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Platoon Position</label>
                      <select
                        value={platoonPosition}
                        onChange={e => setPlatoonPosition(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-gray-55 border border-gray-200 rounded-lg text-xs focus:outline-none focus:border-[#01353D] transition-all"
                      >
                        <option value="Member">Regular Platoon Member</option>
                        <option value="Platoon Leader">Platoon Leader (President)</option>
                        <option value="Welfare Officer">Welfare Officer</option>
                        <option value="OBS Executive">OBS Executive</option>
                        <option value="Warrant Officer">Warrant Officer</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex justify-between pt-2">
                    <button
                      type="button"
                      onClick={() => setFormStep(1)}
                      className="border border-gray-200 text-gray-500 px-5 py-3 rounded-lg text-xs font-bold uppercase tracking-wider"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const newErrors: Record<string, string> = {};
                        if (!callUpNo.trim()) newErrors.callUpNo = "Call-up Number is required";
                        if (!deploymentState) newErrors.deploymentState = "Deployment State is required";
                        
                        setErrors(newErrors);
                        if (Object.keys(newErrors).length > 0) {
                          triggerToast("Please fill in the highlighted required fields.");
                          return;
                        }
                        setFormStep(3);
                      }}
                      className="bg-[#01353D] text-white px-5 py-3 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 hover:bg-[#024a54] transition-colors"
                    >
                      Next <FaArrowRight />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: PPA DETAILS, STORY, & THEME */}
              {formStep === 3 && (
                <div className="space-y-4">
                  <div className="text-left">
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Primary Place of Assignment (PPA) *</label>
                    <input
                      type="text"
                      required
                      value={ppa}
                      onChange={e => { setPpa(e.target.value); setErrors(prev => ({ ...prev, ppa: "" })); }}
                      placeholder="e.g. Government Secondary School, Wannune or Chevron Nigeria Ltd"
                      className={`w-full px-3.5 py-2 bg-gray-55 border ${errors.ppa ? "border-red-500 bg-red-50" : "border-gray-200"} rounded-lg text-xs focus:outline-none focus:border-[#01353D] transition-all`}
                    />
                    {errors.ppa && <p className="text-red-500 text-[9px] mt-1 font-bold">{errors.ppa}</p>}
                  </div>

                  <div className="text-left">
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">My NYSC Story & Experience</label>
                    <textarea
                      value={story}
                      onChange={e => setStory(e.target.value)}
                      placeholder="Share your memorable service experience, challenges, achievements or camp memories with the community..."
                      rows={4}
                      className="w-full px-3.5 py-2 bg-gray-55 border border-gray-200 rounded-lg text-xs focus:outline-none focus:border-[#01353D] transition-all resize-none"
                    />
                  </div>

                  <div className="text-left">
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">NYSC Memory Gallery (All 3 pictures required: Camp, PPA & POP) *</label>
                    <p className="text-[9px] text-gray-400 mb-2">Please upload all three photos to showcase your complete service journey.</p>
                    <div className="grid grid-cols-3 gap-2">
                      {[0, 1, 2].map((index) => {
                        const labels = ["CAMP Photo", "PPA Photo", "POP Photo"];
                        const isUploaded = galleryUrls[index] !== undefined;
                        return (
                          <div key={index} className={`relative aspect-square border ${errors.galleryUrls && !isUploaded ? "border-red-500 bg-red-50" : "border-dashed border-gray-200 bg-gray-55"} rounded-xl overflow-hidden hover:bg-gray-100/50 transition-all flex flex-col items-center justify-center cursor-pointer p-1`}>
                            {isUploaded ? (
                              <>
                                <img src={galleryUrls[index]} alt={labels[index]} className="w-full h-full object-cover rounded-lg" />
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setGalleryUrls(prev => {
                                      const updated = [...prev];
                                      delete updated[index];
                                      return updated;
                                    });
                                  }}
                                  className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full text-[8px]"
                                >
                                  ✕
                                </button>
                              </>
                            ) : (
                              <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer text-center">
                                <span className="text-lg text-gray-400 font-bold">+</span>
                                <span className="text-[8px] font-black text-gray-500 uppercase tracking-wider">{labels[index]}</span>
                                <input
                                  type="file"
                                  accept="image/*"
                                  className="hidden"
                                  onChange={async (e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                      try {
                                        const compressed = await compressImage(file);
                                        setGalleryUrls(prev => {
                                          const updated = [...prev];
                                          updated[index] = compressed;
                                          return updated;
                                        });
                                        setErrors(prev => ({ ...prev, galleryUrls: "" }));
                                        triggerToast(`📸 ${labels[index]} compressed & loaded successfully!`);
                                      } catch (err) {
                                        console.error(err);
                                        triggerToast("❌ Failed to process gallery photo.");
                                      }
                                    }
                                  }}
                                />
                              </label>
                            )}
                          </div>
                        );
                      })}
                    </div>
                    {errors.galleryUrls && <p className="text-red-500 text-[9px] mt-1 font-bold">{errors.galleryUrls}</p>}
                  </div>

                  <div className="text-left">
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Select Green Accent Theme</label>
                    <div className="grid sm:grid-cols-3 gap-2">
                      {Object.entries(BADGE_STYLES).map(([key, value]) => (
                        <button
                          type="button"
                          key={key}
                          onClick={() => setBadgeTheme(key as any)}
                          className={`p-3 rounded-xl border text-left flex flex-col gap-1 transition-all ${badgeTheme === key
                            ? "border-[#01353D] bg-[#01353D]/5"
                            : "border-gray-200 bg-white hover:bg-gray-50"
                            }`}
                        >
                          <div className="flex items-center gap-1.5">
                            <span className="text-[10px] font-bold text-gray-800">{value.name.split(" ")[0]}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between pt-2">
                    <button
                      type="button"
                      onClick={() => setFormStep(2)}
                      className="border border-gray-200 text-gray-500 px-5 py-3 rounded-lg text-xs font-bold uppercase tracking-wider"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      onClick={(e) => {
                        const newErrors: Record<string, string> = {};
                        if (!ppa.trim()) newErrors.ppa = "PPA is required";
                        
                        const uploadedCount = galleryUrls.filter(Boolean).length;
                        if (uploadedCount < 3) {
                          newErrors.galleryUrls = "Please upload all 3 pictures (Camp, PPA, and POP)";
                        }

                        setErrors(newErrors);
                        if (Object.keys(newErrors).length > 0) {
                          e.preventDefault();
                          triggerToast("Please complete all required fields and upload all 3 photos.");
                          return;
                        }
                      }}
                      disabled={submitting}
                      className="bg-emerald-600 text-white px-6 py-3 rounded-lg text-xs font-black uppercase tracking-wider flex items-center gap-1.5 hover:bg-emerald-700 transition-colors disabled:bg-emerald-300"
                    >
                      {submitting ? "Publishing..." : "Publish Profile"}
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>

          {/* 2. The Live Preview Card Column */}
          <div className="md:col-span-2 sticky top-28 space-y-4 text-center">
            <span className="block text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Live Yearbook Card Preview</span>
            <div className={`relative aspect-[3/4.2] w-full max-w-[320px] mx-auto rounded-3xl overflow-hidden border border-white/10 shadow-xl bg-gradient-to-b ${activeTheme.cardGradient}`}>
              {/* Background Pattern Mesh Overlay */}
              <div className="absolute inset-0 opacity-[0.06] pointer-events-none mix-blend-overlay z-10">
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <path d="M0,45 Q25,25 50,45 T100,45" fill="none" stroke="white" strokeWidth="0.8" />
                  <path d="M0,60 Q25,40 50,60 T100,60" fill="none" stroke="white" strokeWidth="0.8" />
                </svg>
              </div>

              {/* TOP WATERMARK */}
              <div className="absolute top-6 left-0 right-0 px-6 flex justify-between items-center z-20 text-[7.5px] font-black uppercase tracking-widest text-white/70 select-none">
                <span>nysc passport</span>
                <span>Powered by SabiDub</span>
              </div>

              {/* FULL BLEED PORTRAIT PHOTO BACKGROUND JUST LIKE NYSC.tsx */}
              {avatarUrl !== DEFAULT_AVATAR ? (
                <div className="absolute inset-0 w-full h-full z-0 bg-black">
                  <div
                    className="relative z-10 w-full h-full bg-no-repeat bg-center bg-cover"
                    style={{ backgroundImage: `url(${avatarUrl})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent z-10 pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent z-10 pointer-events-none" />
                </div>
              ) : (
                /* Centered "No Face" Silhouette Avatar when no photo uploaded yet */
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-0">
                  <div className="w-20 h-20 rounded-full border-2 border-white/20 bg-white/5 flex items-center justify-center overflow-hidden">
                    <img
                      src={DEFAULT_AVATAR}
                      alt="No Face Silhouette"
                      className="w-12 h-12 opacity-60 filter invert"
                    />
                  </div>
                </div>
              )}

              {/* BOTTOM TEXT ZONE (Pushed up slightly and condensed to space-y-0.5 for premium tight spacing) */}
              <div className="absolute bottom-4 left-6 right-6 z-20 flex flex-col text-left space-y-0.5 select-none">
                {/* Service Status micro label */}
                <span className="text-[9px] font-black uppercase tracking-[0.15em] text-emerald-400 leading-[1.2] py-[1px]">
                  {serviceStatus === "Serving" ? "Active Serving" : "Served Alumni"}
                </span>

                {/* Large bold white name with verified icon */}
                <h3 className="text-base font-black text-white leading-[1.2] truncate flex items-center gap-1.5 py-[1px]">
                  {fullName || "YOUR FULL NAME"}
                  <FaCheckCircle className="text-emerald-400 text-xs shrink-0" />
                </h3>

                {/* PPA Subtitle */}
                <p className="text-[11px] text-gray-300 font-semibold leading-[1.2] truncate py-[1px]">
                  with <span className={`${activeTheme.accentText} font-bold`}>{(ppa || "PPA Assignment").split(",")[0]}</span>
                </p>

                {/* Extra Details line */}
                <p className="text-[9.5px] text-gray-400 font-medium leading-[1.2] truncate py-[1px]">
                  {tribe || "TRIBE"} Tribe • {stateOfOrigin || "STATE OF ORIGIN"} • {platoonNo || "Platoon 1"}
                </p>

                {/* Faint footer border line */}
                <div className="flex justify-between items-center pt-1.5 border-t border-white/10 mt-2 text-[8.5px] text-gray-200 font-mono leading-[1.2] py-[1px]">
                  <span className="truncate max-w-[130px] font-bold">{deploymentState || "DEPLOY STATE"} • {(callUpNo || "CALL-UP NO").replace(/^NYSC\//i, "")}</span>
                  <span className="shrink-0 font-bold">NYSC {yearOfService} ({batch})</span>
                </div>
              </div>
            </div>

            {/* Off-screen download target with rounded-none (border radius 0) and spacing optimized for canvas rendering */}
            <div className="absolute left-[-9999px] top-[-9999px] pointer-events-none select-none">
              <div
                ref={cardRef}
                className={`relative aspect-[3/4.2] w-[350px] rounded-none overflow-hidden bg-gradient-to-b ${activeTheme.cardGradient}`}
                style={{ fontFamily: 'Inter, sans-serif' }}
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
                  {avatarUrl !== DEFAULT_AVATAR ? (
                    <div
                      className="relative z-10 w-full h-full bg-no-repeat bg-center bg-cover"
                      style={{ backgroundImage: `url(${avatarUrl})` }}
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
                  <span className="text-[9px] font-black uppercase tracking-[0.15em] text-emerald-400 leading-[1.2] py-[1px]">
                    {serviceStatus === "Serving" ? "Active Serving" : "Served Alumni"}
                  </span>

                  {/* Large bold name with verified icon */}
                  <h3 className="text-base font-black text-white leading-[1.2] flex items-center gap-1.5 py-[1px]">
                    {fullName || "YOUR FULL NAME"}
                    <FaCheckCircle className="text-emerald-400 text-xs shrink-0" />
                  </h3>

                  {/* PPA Subtitle */}
                  <p className="text-[11px] text-gray-300 font-semibold leading-[1.2] py-[1px]">
                    with <span className={`${activeTheme.accentText} font-bold`}>{(ppa || "PPA Assignment").split(",")[0]}</span>
                  </p>

                  {/* Extra Details line */}
                  <p className="text-[9.5px] text-gray-400 font-medium leading-[1.2] py-[1px]">
                    {tribe || "TRIBE"} Tribe • {stateOfOrigin || "STATE OF ORIGIN"} • {platoonNo || "Platoon 1"}
                  </p>

                  {/* Faint footer border line */}
                  <div className="flex justify-between items-center pt-1.5 border-t border-white/10 mt-2 text-[8.5px] text-gray-200 font-mono leading-[1.2] py-[1px]">
                    <span className="font-bold">{deploymentState || "DEPLOY STATE"} • {(callUpNo || "CALL-UP NO").replace(/^NYSC\//i, "")}</span>
                    <span className="shrink-0 font-bold">NYSC {yearOfService} ({batch})</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Download Preview Card Action */}
            <button
              type="button"
              onClick={downloadPreviewCard}
              disabled={downloadingPreview}
              className="w-full max-w-[320px] mx-auto flex items-center justify-center gap-2 bg-[#01353D] hover:bg-[#024a54] disabled:opacity-60 text-white py-3 rounded-xl text-xs font-bold transition-all shadow-md select-none border border-white/10"
            >
              {downloadingPreview ? (
                <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <FaDownload size={10} />
              )}
              {downloadingPreview ? "Saving card image..." : "Download Preview Card"}
            </button>
          </div>
        </div>
      </main>

      {/* Floating Toast Notification */}
      {showToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#01353D] text-white px-5 py-3 rounded-xl shadow-lg border border-white/10 text-xs font-bold animate-bounce">
          {toastMessage}
        </div>
      )}

      {downloadingPreview && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex flex-col items-center justify-center select-none animate-fadeIn">
          <div className="bg-white/10 border border-white/20 p-8 rounded-2xl shadow-2xl max-w-sm w-[90%] text-center flex flex-col items-center gap-5">
            {/* Spinning gradient ring */}
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 rounded-full border-4 border-emerald-400/20" />
              <div className="absolute inset-0 rounded-full border-4 border-t-emerald-400 animate-spin" />
            </div>
            
            <div className="space-y-1.5">
              <h4 className="text-white text-sm font-black uppercase tracking-widest">Generating Preview Card</h4>
              <p className="text-gray-300 text-[10px] leading-relaxed">Preparing high-definition graphics, rendering custom fonts, and packaging your NYSC preview passport card...</p>
            </div>

            {/* Simulated progress step anim */}
            <div className="w-full bg-white/10 h-[3px] rounded-full overflow-hidden">
              <div className="bg-gradient-to-r from-emerald-400 to-teal-500 h-full rounded-full w-4/5 animate-pulse" />
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
