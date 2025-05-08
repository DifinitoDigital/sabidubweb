import React, { useEffect, useState } from "react";

const now = new Date();
let year = now.getFullYear();
const targetMonth = 8; // September (0-indexed)
const targetDay = 30;

if (
  now.getMonth() > targetMonth ||
  (now.getMonth() === targetMonth && now.getDate() > targetDay)
) {
  year += 1;
}
const GLOBAL_RELEASE_DATE = new Date(year, targetMonth, targetDay, 0, 0, 0);
function getTimeLeft(targetDate: Date) {
  const now = new Date();
  const diff = targetDate.getTime() - now.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds };
}

export default function CountdownPage() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft(GLOBAL_RELEASE_DATE));
  const [mounted, setMounted] = useState(false);
  const [email, setEmail] = useState("");
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => setTimeLeft(getTimeLeft(GLOBAL_RELEASE_DATE)), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmail("");
    setShowDialog(true);
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden font-sans">
      {/* Full-bleed background image */}
      <img
        src="/images/background.jpg"
        alt="Background"
        className="fixed inset-0 w-full h-full object-cover z-0"
        style={{ pointerEvents: 'none' }}
      />
      {/* Overlay for web color scheme */}
      <div className="fixed inset-0 bg-[#111]/80 z-0" />

      {/* SabiDub logo at the very top center */}
      <div className="fixed top-10 left-1/2 transform -translate-x-1/2 z-20">
        <img
                    src="/images/white.png"
                    alt="SabiDub Logo"
          className="w-200 h-auto"
          style={{ maxWidth: '150px', minWidth: '90px' }}
                  />
                </div>
      {/* Main content centered */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full min-h-screen px-2 sm:px-0">
        {/* Subtext: Releases in */}
        <div className="mb-8 text-[#FFEDB1] text-xs sm:text-base md:text-lg tracking-[0.4em] font-semibold uppercase text-center">
          Releases in
              </div>
        {/* Countdown */}
        <div className="flex flex-wrap items-end justify-center space-x-2 sm:space-x-4 md:space-x-8 mb-2 w-full max-w-full">
          <div className="flex flex-col items-center">
            <span className="text-4xl sm:text-6xl md:text-8xl font-extrabold text-white drop-shadow-lg">
              {mounted ? String(timeLeft.days).padStart(2, "0") : "00"}
                      </span>
            <span className="mt-2 text-xs sm:text-base md:text-lg text-[#FFEDB1] tracking-widest">days</span>
                    </div>
          <span className="text-4xl sm:text-6xl md:text-8xl font-extrabold text-white/80">:</span>
          <div className="flex flex-col items-center">
            <span className="text-4xl sm:text-6xl md:text-8xl font-extrabold text-white drop-shadow-lg">
              {mounted ? String(timeLeft.hours).padStart(2, "0") : "00"}
                        </span>
            <span className="mt-2 text-xs sm:text-base md:text-lg text-[#FFEDB1] tracking-widest">hours</span>
                      </div>
          <span className="text-4xl sm:text-6xl md:text-8xl font-extrabold text-white/80">:</span>
          <div className="flex flex-col items-center">
            <span className="text-4xl sm:text-6xl md:text-8xl font-extrabold text-white drop-shadow-lg">
              {mounted ? String(timeLeft.minutes).padStart(2, "0") : "00"}
                </span>
            <span className="mt-2 text-xs sm:text-base md:text-lg text-[#FFEDB1] tracking-widest">minutes</span>
              </div>
          <span className="text-4xl sm:text-6xl md:text-8xl font-extrabold text-white/80">:</span>
          <div className="flex flex-col items-center">
            <span className="text-4xl sm:text-6xl md:text-8xl font-extrabold text-white drop-shadow-lg">
              {mounted ? String(timeLeft.seconds).padStart(2, "0") : "00"}
                        </span>
            <span className="mt-2 text-xs sm:text-base md:text-lg text-[#FFEDB1] tracking-widest">seconds</span>
                    </div>
                      </div>
        {/* Email input glassy */}
        <form
          onSubmit={handleSubmit}
          className="mt-10 flex items-center w-full max-w-md mx-auto bg-black/20 backdrop-blur-md rounded-full border border-[#FFEDB1]/30 px-2 sm:px-4 py-2"
          style={{ boxShadow: '0 4px 32px 0 rgba(0,0,0,0.15)' }}
        >
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Type your email and get notified..."
            className="flex-1 bg-transparent border-none outline-none text-white placeholder-white/70 px-2 text-base sm:text-lg"
            required
          />
          <button
            type="submit"
            className="ml-2 px-3 sm:px-4 py-2 rounded-full bg-[#FFEDB1] text-black border border-[#FFEDB1] hover:bg-[#4CAF50] hover:text-white transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
            </button>
        </form>
          </div>
      {/* Social icons at bottom center */}
      <div className="fixed bottom-12 left-0 w-full flex justify-center space-x-6 z-20">
        <a href="#" className="text-[#FFEDB1] hover:text-[#4CAF50]">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
          </svg>
        </a>
        <a href="#" className="text-[#FFEDB1] hover:text-[#4CAF50]">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
          </svg>
        </a>
        <a href="#" className="text-[#FFEDB1] hover:text-[#4CAF50]">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
          </svg>
        </a>
      </div>
      {/* Powered by Difinito at the bottom center */}
      <div className="fixed bottom-0 left-0 w-full px-2 pb-2 z-20 text-xs sm:text-sm md:text-base tracking-[0.4em] text-white/60 font-regular uppercase text-center bg-transparent">
        POWERED BY DIFINITO
      </div>
      {/* Confirmation Dialog */}
      {showDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="relative bg-white/10 backdrop-blur-lg border border-[#FFEDB1] rounded-2xl p-8 max-w-md w-[120vw] sm:w-[40rem] text-center shadow-2xl">
            {/* Close X icon */}
                    <button
              onClick={() => setShowDialog(false)}
              className="absolute top-3 right-3 text-[#FFEDB1] hover:text-white text-xl font-bold focus:outline-none"
              aria-label="Close"
            >
              &times;
                    </button>
            {/* Checkmark icon */}
            <div className="flex justify-center mb-3">
              {/* <svg className="w-12 h-12 text-[#4CAF50]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" stroke="#4CAF50" strokeWidth="2" fill="#4CAF50" fillOpacity="0.15" />
                <path d="M8 12.5l2.5 2.5 5-5" stroke="#4CAF50" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg> */}
                      </div>
            <div className="text-2xl mb-2 text-[#FFEDB1] font-extrabold tracking-wide">Thank you!</div>
            <div className="text-white mb-6 text-base font-medium">Your email has been noted.<br />You'll be notified as soon as the app is released.</div>
                    <button
              onClick={() => setShowDialog(false)}
              className="px-8 py-2 rounded-full bg-[#FFEDB1] text-black font-bold text-lg shadow hover:bg-[#4CAF50] hover:text-white transition-all"
            >
              OK
                    </button>
                      </div>
                      </div>
                    )}
                  </div>
  );
} 