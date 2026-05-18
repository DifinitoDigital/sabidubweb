/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  FaDownload, FaSearch,
  FaIdCard, FaUsers, FaChevronLeft, FaChevronRight,
  FaQrcode, FaArrowRight, FaStar, FaBuilding, FaGlobe,
  FaCamera, FaUpload, FaCheckCircle
} from "react-icons/fa";

// Default Silhouette SVG base64 for profile picture placeholder
const DEFAULT_AVATAR = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iI2RjZTJlNSI+PHBhdGggZD0iTTEyIDEyYzIuMjEgMCA0LWUtMS43OS00IDRTOC4yMSA4IDEyIDhzNC0xLjc5IDQtNHMtMS43OS00LTQtNHptMCAyYy0yLjY3IDAtOCAxLjM0LTggNHYyaDE2di0yYzAtMi42Ni01LjMzLTQtOC00erIvPjwvc3ZnPg==";

// NYSC State Camps list for convenience
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

// Pre-populated yearbook directory for served/serving corp members
const MOCK_YEARBOOK = [
  {
    id: "NYSC-25-001",
    fullName: "Tunde Bakare",
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
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250",
    serviceStatus: "Serving",
    createdAt: "12/04/2025"
  },
  {
    id: "NYSC-25-002",
    fullName: "Chinedu Okafor",
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
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=250",
    serviceStatus: "Serving",
    createdAt: "18/09/2025"
  },
  {
    id: "NYSC-24-003",
    fullName: "Fatima Bello",
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
    avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250",
    serviceStatus: "Served",
    createdAt: "04/11/2024"
  },
  {
    id: "NYSC-25-004",
    fullName: "Efe Johnson",
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
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250",
    serviceStatus: "Serving",
    createdAt: "22/05/2025"
  },
  {
    id: "NYSC-24-005",
    fullName: "Aminu Yusuf",
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
    avatarUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=250",
    serviceStatus: "Served",
    createdAt: "10/08/2024"
  },
  {
    id: "NYSC-23-006",
    fullName: "Adebayo Ogunmola",
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
    avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=250",
    serviceStatus: "Served",
    createdAt: "15/12/2023"
  }
];

// High fidelity deep forest green gradients for the vertical portrait cards
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
  const [yearbookList, setYearbookList] = useState<any[]>(MOCK_YEARBOOK);
  const [formStep, setFormStep] = useState(1);
  const [savedPassport, setSavedPassport] = useState<any>(null);
  
  // Filtering States for Yearbook Directory
  const [filterYear, setFilterYear] = useState("All");
  const [filterBatch, setFilterBatch] = useState("All");
  const [filterStream, setFilterStream] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

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

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [isGenerated, setIsGenerated] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    // Load from LocalStorage if exists
    const stored = localStorage.getItem("sabidub_nysc_passport");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setSavedPassport(parsed);
        // Pre-fill form fields
        setFullName(parsed.fullName || "");
        setEmail(parsed.email || "");
        setPhone(parsed.phone || "");
        setStateOfOrigin(parsed.stateOfOrigin || "");
        setCallUpNo(parsed.callUpNo || "");
        setDeploymentState(parsed.deploymentState || "");
        setYearOfService(parsed.yearOfService || "2026");
        setBatch(parsed.batch || "Batch A");
        setStream(parsed.stream || "Stream 1");
        setPlatoonNo(parsed.platoonNo || "");
        setPlatoonPosition(parsed.platoonPosition || "");
        setPpa(parsed.ppa || "");
        setTribe(parsed.tribe || "");
        setBadgeTheme(parsed.badgeTheme || "emerald");
        setGender(parsed.gender || "Male");
        setAvatarUrl(parsed.avatarUrl || DEFAULT_AVATAR);
        setServiceStatus(parsed.serviceStatus || "Serving");
        setIsGenerated(true);

        // Prepend stored passport to yearbook directory if not already there
        setYearbookList(prev => {
          if (prev.some(item => item.id === parsed.id)) return prev;
          return [parsed, ...prev];
        });
      } catch (e) {
        console.error("Error parsing saved passport", e);
      }
    }
  }, []);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 4000);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        triggerToast("Maximum file size is 2MB!");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarUrl(reader.result as string);
        triggerToast("📸 Custom Profile Picture loaded successfully!");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !callUpNo || !deploymentState || !ppa || !tribe) {
      triggerToast("Please fill in all required fields, including PPA and Tribe!");
      return;
    }
    if (avatarUrl === DEFAULT_AVATAR) {
      triggerToast("Please upload your profile photo first!");
      return;
    }

    const data = {
      id: `NYSC-${Math.floor(100000 + Math.random() * 900000)}`,
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
      gender,
      avatarUrl,
      serviceStatus,
      createdAt: new Date().toLocaleDateString(),
    };

    localStorage.setItem("sabidub_nysc_passport", JSON.stringify(data));
    setSavedPassport(data);
    setIsGenerated(true);

    // Update state directory in real time
    setYearbookList(prev => {
      const filtered = prev.filter(item => item.callUpNo !== callUpNo);
      return [data, ...filtered];
    });

    triggerToast("🎉 Profile & Portrait added to Directory!");
    setTimeout(() => {
      document.getElementById("directory-section")?.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  const handleClear = () => {
    const backupId = savedPassport?.id;
    localStorage.removeItem("sabidub_nysc_passport");
    setSavedPassport(null);
    setIsGenerated(false);
    setFormStep(1);
    
    if (backupId) {
      setYearbookList(prev => prev.filter(item => item.id !== backupId));
    }

    // Reset inputs
    setFullName("");
    setEmail("");
    setPhone("");
    setStateOfOrigin("");
    setCallUpNo("");
    setDeploymentState("");
    setPlatoonNo("Platoon 1");
    setPlatoonPosition("Member");
    setPpa("");
    setTribe("");
    setAvatarUrl(DEFAULT_AVATAR);
    setServiceStatus("Serving");
    triggerToast("Profile reset successfully.");
  };

  const downloadAsImage = async () => {
    if (!cardRef.current) return;
    setDownloading(true);
    try {
      const html2canvas = (await import("html2canvas")).default;
      const canvas = await html2canvas(cardRef.current, {
        useCORS: true,
        allowTaint: true,
        backgroundColor: null,
        scale: 3,
      });
      const link = document.createElement("a");
      link.download = `${fullName.replace(/\s+/g, "_") || "nysc"}_passport.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (err) {
      console.error("Download failed:", err);
      triggerToast("Failed to download image. Please try again.");
    } finally {
      setDownloading(false);
    }
  };

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

  const currentTheme = BADGE_STYLES[badgeTheme] || BADGE_STYLES.emerald;

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
        
        {/* Simple Alert Banner */}
        <AnimatePresence>
          {showToast && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50 bg-[#01353D] text-white px-6 py-3 rounded-lg text-xs font-bold flex items-center gap-2 border border-emerald-500/10"
            >
              <span>{toastMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Flat Minimalist Hero Section */}
        <section className="pt-36 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center border-b border-gray-150">
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
            <a
              href="#passport-creator"
              className="bg-[#01353D] text-white px-6 py-3.5 rounded-lg text-xs font-bold hover:bg-[#024a54] transition-colors"
            >
              Add My Profile
            </a>
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
          <div className="bg-white border border-gray-200 rounded-2xl p-6">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between border-b border-gray-100 pb-4 mb-4">
              <div className="text-left">
                <h3 className="text-base font-black text-[#01353D] flex items-center gap-2">
                  🎓 NYSC Directory & Yearbook
                </h3>
                <p className="text-[11px] text-gray-500">Search and filter active and past corp members.</p>
              </div>

              {/* Search input */}
              <div className="relative w-full md:w-80">
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
                onChange={e => setFilterYear(e.target.value)}
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
                onChange={e => setFilterBatch(e.target.value)}
                className="px-3 py-2 bg-gray-55 border border-gray-200 rounded-lg text-xs font-bold text-gray-700 focus:outline-none"
              >
                <option value="All">All Batches</option>
                <option value="Batch A">Batch A</option>
                <option value="Batch B">Batch B</option>
                <option value="Batch C">Batch C</option>
              </select>
              <select
                value={filterStream}
                onChange={e => setFilterStream(e.target.value)}
                className="px-3 py-2 bg-gray-55 border border-gray-200 rounded-lg text-xs font-bold text-gray-700 focus:outline-none"
              >
                <option value="All">All Streams</option>
                <option value="Stream 1">Stream 1</option>
                <option value="Stream 2">Stream 2</option>
              </select>
              <select
                value={filterStatus}
                onChange={e => setFilterStatus(e.target.value)}
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
                }}
                className="py-2 border border-gray-200 text-gray-500 rounded-lg text-xs font-bold hover:bg-gray-50 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          </div>

          {/* Directory Grid with Spacious Padding around cards and 4 columns layout */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-7 md:gap-8 pt-4 pb-8">
            <AnimatePresence>
              {filteredDirectory.map((item) => {
                const cardTheme = BADGE_STYLES[item.badgeTheme as keyof typeof BADGE_STYLES] || BADGE_STYLES.emerald;
                
                return (
                  <motion.div
                    key={item.id}
                    onClick={() => router.push(`/nysc/${item.id}`)}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 15 }}
                    className={`relative aspect-[3/4.2] w-full rounded-2xl overflow-hidden border border-white/10 cursor-pointer hover:border-emerald-500/30 hover:shadow-xl hover:shadow-emerald-950/15 hover:-translate-y-1 transition-all duration-500 group bg-gradient-to-b ${cardTheme.cardGradient}`}
                  >
                    {/* Background Pattern Mesh Overlay */}
                    <div className="absolute inset-0 opacity-[0.06] pointer-events-none mix-blend-overlay">
                      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <path d="M0,45 Q25,25 50,45 T100,45" fill="none" stroke="white" strokeWidth="0.8" />
                        <path d="M0,60 Q25,40 50,60 T100,60" fill="none" stroke="white" strokeWidth="0.8" />
                      </svg>
                    </div>

                    {/* TOP HEADER WATERMARK (Fully standard top-8 to ensure beautiful top padding) */}
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
                      
                      {/* Light bottom gradient — 20% opacity so portrait photo shows through beautifully */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent z-10 pointer-events-none" />
                      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent z-10 pointer-events-none" />
                    </div>

                    {/* BOTTOM TEXT ZONE (Fully padded inwards by px-6 pb-6 to guarantee compatibility) */}
                    <div className="absolute bottom-0 left-0 right-0 px-6 pb-6 pt-5 z-20 flex flex-col text-left space-y-1.5 select-none">
                      
                      {/* Service Status micro label */}
                      <span className="text-[8px] font-black uppercase tracking-[0.15em] text-emerald-400 leading-none">
                        {item.serviceStatus === "Serving" ? "Active Serving" : "Served Alumni"}
                      </span>

                      {/* Large bold white name with INLINE verified icon (standard professional placement) */}
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
                        <span>ID: {item.id}</span>
                        <span>{item.yearOfService} ({item.batch.split(" ")[1]})</span>
                      </div>

                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Empty list illustration */}
          {filteredDirectory.length === 0 && (
            <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center max-w-sm mx-auto">
              <h3 className="text-sm font-bold text-gray-900 mb-1">No matching profiles</h3>
              <p className="text-xs text-gray-500 mb-4">Be the first to publish a profile under this selection stream!</p>
              <a
                href="#passport-creator"
                className="bg-[#01353D] text-white px-5 py-2.5 rounded-lg text-xs font-bold hover:bg-[#024a54] transition-colors"
              >
                Create Profile
              </a>
            </div>
          )}
        </div>

        {/* 2. DIGITAL PASSPORT & PROFILE CREATOR SECTION */}
        <section id="passport-creator" className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto border-t border-gray-150 mt-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-[10px] font-bold text-[#01353D] bg-[#01353D]/5 px-3 py-1 rounded uppercase tracking-wider">
              Profile Registration
            </span>
            <h2 className="text-2xl font-black text-gray-950 tracking-tight mt-2 mb-2">
              Join Digital Yearbook
            </h2>
            <p className="text-xs text-gray-600">
              Upload your profile picture, select your service status, input deployment details, and PPA to register your profile.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-start">
            
            {/* COLUMN A: WIZARD FORM (7 cols) */}
            <div className="lg:col-span-7 bg-white border border-gray-200 rounded-2xl p-6">
              
              {/* Form Step Headers */}
              <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-4">
                <div className="flex items-center gap-1.5">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all ${
                    formStep >= 1 ? "bg-[#01353D] text-white" : "bg-gray-100 text-gray-400"
                  }`}>
                    1
                  </div>
                  <span className="text-[11px] font-bold text-gray-500">Bio Details</span>
                </div>
                <div className="h-[1px] w-8 bg-gray-200" />
                <div className="flex items-center gap-1.5">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all ${
                    formStep >= 2 ? "bg-[#01353D] text-white" : "bg-gray-100 text-gray-400"
                  }`}>
                    2
                  </div>
                  <span className="text-[11px] font-bold text-gray-500">Deployment</span>
                </div>
                <div className="h-[1px] w-8 bg-gray-200" />
                <div className="flex items-center gap-1.5">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all ${
                    formStep >= 3 ? "bg-[#01353D] text-white" : "bg-gray-100 text-gray-400"
                  }`}>
                    3
                  </div>
                  <span className="text-[11px] font-bold text-gray-500">PPA & Theme</span>
                </div>
              </div>

              <form onSubmit={handleGenerate} className="space-y-4">
                
                {/* STEP 1: BIO DETAILS */}
                {formStep === 1 && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-4"
                  >
                    {/* Service Status Toggle */}
                    <div className="text-left">
                      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Service Status *</label>
                      <div className="flex gap-2">
                        {[
                          { key: "Serving", label: "Currently Serving (Active)" },
                          { key: "Served", label: "Served (Alumni / Ex-Corp)" }
                        ].map(status => (
                          <button
                            type="button"
                            key={status.key}
                            onClick={() => setServiceStatus(status.key)}
                            className={`flex-1 py-2.5 border rounded-lg text-xs font-bold transition-all ${
                              serviceStatus === status.key 
                                ? "bg-[#01353D] border-[#01353D] text-white" 
                                : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
                            }`}
                          >
                            {status.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* PROFILE PICTURE UPLOAD AREA */}
                    <div className="text-left">
                      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Profile Picture *</label>
                      <div className="grid sm:grid-cols-3 gap-4 items-center">
                        {/* Current Picture Preview */}
                        <div className="relative w-20 h-20 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden bg-gray-55 mx-auto sm:mx-0">
                          <img src={avatarUrl} alt="Avatar Upload Preview" className="w-full h-full object-cover" />
                        </div>

                        {/* Upload Button */}
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
                          <p className="text-[10px] text-gray-500">Supports JPG, PNG (Max 2MB). Fits portrait/square aspects cleanly.</p>
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
                          onChange={e => setFullName(e.target.value)}
                          placeholder="e.g. Hamman Bakare"
                          className="w-full px-3.5 py-2 bg-gray-55 border border-gray-200 rounded-lg text-xs focus:outline-none focus:border-[#01353D] transition-all"
                        />
                      </div>
                      <div className="text-left">
                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">State of Origin *</label>
                        <select 
                          required
                          value={stateOfOrigin}
                          onChange={e => setStateOfOrigin(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-gray-55 border border-gray-200 rounded-lg text-xs focus:outline-none focus:border-[#01353D] transition-all"
                        >
                          <option value="">Select State</option>
                          {NIGERIAN_STATES.map(s => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-3">
                      <div className="text-left">
                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Email Address *</label>
                        <input 
                          type="email" 
                          required
                          value={email}
                          onChange={e => setEmail(e.target.value)}
                          placeholder="e.g. bakare.t@mail.com"
                          className="w-full px-3.5 py-2 bg-gray-55 border border-gray-200 rounded-lg text-xs focus:outline-none focus:border-[#01353D] transition-all"
                        />
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
                          onChange={e => setTribe(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-gray-55 border border-gray-200 rounded-lg text-xs focus:outline-none focus:border-[#01353D] transition-all"
                        >
                          <option value="">Select Tribe</option>
                          {NIGERIAN_TRIBES.map(t => (
                            <option key={t} value={t}>{t}</option>
                          ))}
                        </select>
                      </div>
                      <div className="text-left">
                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Gender</label>
                        <div className="flex gap-2">
                          {["Male", "Female"].map(g => (
                            <button
                              type="button"
                              key={g}
                              onClick={() => setGender(g)}
                              className={`flex-1 py-2 border rounded-lg text-[11px] font-bold transition-all ${
                                gender === g 
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

                    <div className="flex justify-end pt-2">
                      <button
                        type="button"
                        onClick={() => setFormStep(2)}
                        className="bg-[#01353D] text-white px-5 py-3 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 hover:bg-[#024a54] transition-colors"
                      >
                        Next <FaArrowRight />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* STEP 2: DEPLOYMENT DETAILS */}
                {formStep === 2 && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-4"
                  >
                    <div className="grid sm:grid-cols-2 gap-3">
                      <div className="text-left">
                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Call-up Number *</label>
                        <input 
                          type="text" 
                          required
                          value={callUpNo}
                          onChange={e => setCallUpNo(e.target.value)}
                          placeholder="e.g. NYSC/LAG/2025/284091"
                          className="w-full px-3.5 py-2 bg-gray-55 border border-gray-200 rounded-lg text-xs focus:outline-none focus:border-[#01353D] transition-all"
                        />
                      </div>
                      <div className="text-left">
                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">State of Deployment *</label>
                        <select 
                          required
                          value={deploymentState}
                          onChange={e => setDeploymentState(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-gray-55 border border-gray-200 rounded-lg text-xs focus:outline-none focus:border-[#01353D] transition-all"
                        >
                          <option value="">Select Host State</option>
                          {CAMP_STATES.map(c => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>
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
                          <option value="2026">2026</option>
                          <option value="2025">2025</option>
                          <option value="2024">2024</option>
                          <option value="2023">2023</option>
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
                            <option key={i+1} value={`Platoon ${i+1}`}>{`Platoon ${i+1}`}</option>
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
                          <option value="OBS Executive">Orientation Broadcasting Service (OBS)</option>
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
                        onClick={() => setFormStep(3)}
                        className="bg-[#01353D] text-white px-5 py-3 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 hover:bg-[#024a54] transition-colors"
                      >
                        Next <FaArrowRight />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* STEP 3: PPA DETAILS & THEME */}
                {formStep === 3 && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-4"
                  >
                    <div className="text-left">
                      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Primary Place of Assignment (PPA) *</label>
                      <input 
                        type="text" 
                        required
                        value={ppa}
                        onChange={e => setPpa(e.target.value)}
                        placeholder="e.g. Government Secondary School, Wannune or Chevron Nigeria Ltd"
                        className="w-full px-3.5 py-2 bg-gray-55 border border-gray-200 rounded-lg text-xs focus:outline-none focus:border-[#01353D] transition-all"
                      />
                    </div>

                    <div className="text-left">
                      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Select Green Accent Theme</label>
                      <div className="grid sm:grid-cols-3 gap-2">
                        {Object.entries(BADGE_STYLES).map(([key, value]) => (
                          <button
                            type="button"
                            key={key}
                            onClick={() => setBadgeTheme(key as any)}
                            className={`p-3 rounded-xl border text-left flex flex-col gap-1 transition-all ${
                              badgeTheme === key 
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
                        className="bg-emerald-600 text-white px-6 py-3 rounded-lg text-xs font-black uppercase tracking-wider flex items-center gap-1.5 hover:bg-emerald-700 transition-colors"
                      >
                        Publish Profile
                      </button>
                    </div>
                  </motion.div>
                )}

              </form>

            </div>

            {/* COLUMN B: PASSPORT PREVIEW (5 cols) - HIGH FIDELITY VERTICAL PORTRAIT DIGITAL CARD */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center">
              
              <div className="w-full flex justify-center py-2">
                <div
                  ref={cardRef}
                  className={`w-full max-w-[300px] relative aspect-[3/4.2] rounded-2xl overflow-hidden border border-white/10 group bg-gradient-to-b ${currentTheme.cardGradient}`}
                >
                  {/* Background contour overlay */}
                  <div className="absolute inset-0 opacity-[0.06] pointer-events-none mix-blend-overlay">
                    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none">
                      <path d="M0,45 Q25,25 50,45 T100,45" fill="none" stroke="white" strokeWidth="0.8" />
                      <path d="M0,60 Q25,40 50,60 T100,60" fill="none" stroke="white" strokeWidth="0.8" />
                    </svg>
                  </div>

                  {/* Header labels - fully standard top-8 to ensure beautiful top padding */}
                  <div className="absolute top-8 left-0 right-0 px-6 flex justify-between items-center z-20 text-[7.5px] font-black uppercase tracking-widest text-white/70 select-none">
                    <span>nysc passport</span>
                    <span>Powered by SabiDub</span>
                  </div>

                  {/* Picture container filling background */}
                  <div className="absolute inset-0 w-full h-full z-0">
                    <img 
                      src={avatarUrl} 
                      alt="Avatar Preview" 
                      className="w-full h-full object-cover object-center"
                    />
                    
                    {/* Light bottom gradient — 20% opacity so portrait photo shows through beautifully */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent z-10 pointer-events-none" />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent z-10 pointer-events-none" />
                  </div>

                  {/* Bottom Text Zone (Safe px-6 pb-6 to prevent corner cutoffs!) */}
                  <div className="absolute bottom-0 left-0 right-0 px-6 pb-6 pt-5 z-20 flex flex-col text-left space-y-1.5 select-none">
                    
                    <span className="text-[8px] font-black uppercase tracking-[0.15em] text-emerald-400 leading-none">
                      {serviceStatus === "Serving" ? "Active Serving" : "Served Alumni"}
                    </span>

                    <h3 className="text-sm sm:text-base font-black text-white leading-tight tracking-tight line-clamp-1 flex items-center gap-1.5">
                      {fullName || "Hamman Bakare"}
                      <FaCheckCircle className="text-emerald-400 text-xs shrink-0" />
                    </h3>

                    <p className="text-[10px] text-gray-300 font-semibold leading-tight line-clamp-1">
                      with <span className={`${currentTheme.accentText} font-bold`}>{ppa.split(",")[0] || "GSS Wannune"}</span>
                    </p>

                    <p className="text-[8.5px] text-gray-400 font-medium leading-none pt-0.5 line-clamp-1">
                      {tribe || "Tiv"} Tribe • {platoonNo}
                    </p>

                    <div className="flex justify-between items-center pt-2.5 border-t border-white/10 mt-2 text-[7px] text-gray-500 font-mono">
                      <span>ID: {savedPassport?.id || "NYSC-26-000"}</span>
                      <span>{yearOfService} ({batch.split(" ")[1]})</span>
                    </div>

                  </div>

                </div>
              </div>

              {/* Download Controls */}
              {isGenerated && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-2 mt-4 w-full max-w-[300px]"
                >
                  <button
                    onClick={downloadAsImage}
                    disabled={downloading}
                    className="flex-1 bg-[#01353D] text-white py-2.5 rounded-lg text-xs font-bold hover:bg-[#024a54] disabled:opacity-60 flex items-center justify-center gap-1.5"
                  >
                    {downloading
                      ? <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      : <FaDownload size={10} />}
                    {downloading ? "Saving..." : "Save as Image"}
                  </button>
                  <button
                    onClick={handleClear}
                    className="flex-1 bg-white border border-rose-200 text-rose-600 py-2.5 rounded-lg text-xs font-bold hover:bg-rose-50/50 flex items-center justify-center gap-1.5"
                  >
                    Reset Identity
                  </button>
                </motion.div>
              )}

            </div>

          </div>
        </section>

      </div>

      <Footer />
    </>
  );
}
