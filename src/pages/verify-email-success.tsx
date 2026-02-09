import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Example: How to use the API URL for email verification in React
const apiUrl = process.env.NEXT_PUBLIC_API_URL || process.env.API_URL || 'http://localhost:4000';

export default function VerifyEmailSuccess() {
  const [result, setResult] = useState<{ error?: boolean; message?: string; redirectType?: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [userType, setUserType] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const email = params.get('email');
    const token = params.get('token');
    const userTypeParam = params.get('userType');

    // Set userType from URL parameter
    if (userTypeParam) {
      setUserType(userTypeParam);
    }

    fetch(`${apiUrl}/auth/school/verify-email?email=${email}&token=${token}`, {
      headers: {
        'ngrok-skip-browser-warning': '69420'
      },
    })
      .then(res => res.json())
      .then(data => {
        setResult(data);
        setLoading(false);
      })
      .catch(err => {
        setResult({ error: true, message: "Verification failed." });
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    // Confetti effect on load
    const confetti = () => {
      // Updated colors to include the theme primary color #014751
      const colors = ["#014751", "#FFEDB1", "#ffdb82", "#4CAF50", "#ffffff"];
      const confettiCount = 100;

      for (let i = 0; i < confettiCount; i++) {
        createConfetti(colors[Math.floor(Math.random() * colors.length)]);
      }
    };

    const createConfetti = (color: string) => {
      const confetti = document.createElement("div");
      confetti.style.backgroundColor = color;
      confetti.style.width = "10px";
      confetti.style.height = "10px";
      confetti.style.position = "fixed";
      confetti.style.top = "-10px";
      confetti.style.left = Math.random() * window.innerWidth + "px";
      confetti.style.borderRadius = "50%";
      confetti.style.opacity = "0.7";
      confetti.style.pointerEvents = "none";
      document.body.appendChild(confetti);

      const animation = confetti.animate(
        [
          {
            transform: `translate(${Math.random() * 200 - 100}px, 0px)`,
            opacity: "0.7",
          },
          {
            transform: `translate(${Math.random() * 400 - 200}px, ${window.innerHeight
              }px)`,
            opacity: "0",
          },
        ],
        {
          duration: Math.random() * 2000 + 1500,
          easing: "cubic-bezier(.25,.46,.45,.94)",
        }
      );

      animation.onfinish = () => confetti.remove();
    };

    confetti();
  }, []);

  const handleLoginClick = () => {
    setIsRedirecting(true);
  };

  return (
    <>
      <Head>
        <title>
          Email Verified - SabiDub | Educational Excellence in Nigeria
        </title>
        <meta
          name="description"
          content="Your email has been successfully verified. Welcome to SabiDub!"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main className="min-h-screen bg-white flex items-center justify-center px-4 pt-24 pb-12">
        <div className="max-w-md w-full">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white border border-gray-100 shadow-sm rounded-2xl p-8 text-center relative overflow-hidden"
          >
            {/* Success Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-20 h-20 bg-[#014751]/10 rounded-full mx-auto mb-6 flex items-center justify-center"
            >
              <svg
                className="w-12 h-12 text-[#014751]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <motion.path
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </motion.div>

            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-2xl font-bold text-gray-900 mb-4"
            >
              Email Verified Successfully!
            </motion.h1>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-gray-600 mb-8"
            >
              {userType === 'student' || result?.redirectType === 'student'
                ? "Your student account is successfully verified. You can now return to the SabiDub app to log in and start learning."
                : "Thank you for verifying your email address. Your account is now fully activated and you can access all features of SabiDub."}
            </motion.p>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="space-y-4"
            >
              <a
                href={
                  userType === 'staff' || result?.redirectType === 'system_staff'
                    ? "https://portal.sabidub.com/auth/staff/signin"
                    : userType === 'school' || result?.redirectType === 'school_staff'
                      ? "https://portal.sabidub.com/auth/school/signin"
                      : userType === 'student' || result?.redirectType === 'student'
                        ? "/"
                        : "https://portal.sabidub.com/auth/school/signin"
                }
                onClick={handleLoginClick}
                className="block w-full bg-[#014751] text-white py-3 rounded-lg hover:bg-[#013b43] transition-all font-medium relative overflow-hidden group"
              >
                <span className={`${isRedirecting ? 'opacity-0' : 'opacity-100'} transition-opacity`}>
                  {userType === 'student' || result?.redirectType === 'student'
                    ? "Return to Home"
                    : "Login to Your Account"}
                </span>
                {isRedirecting && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              </a>
              <Link
                href="/"
                className="block w-full bg-white border border-gray-200 text-[#014751] py-3 rounded-lg hover:bg-gray-50 transition-all font-medium group relative overflow-hidden"
              >
                <span className="relative z-10">Back to Home</span>
                <div className="absolute inset-0 bg-gray-50 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </Link>
            </motion.div>

            {/* Decorative Elements - Updated to use #014751 theme */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#014751] via-[#026e7d] to-[#014751]"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#014751]/5 rounded-full blur-2xl"></div>
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#014751]/5 rounded-full blur-2xl"></div>
          </motion.div>

          {/* Additional Info */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-8 text-center"
          >
            <p className="text-gray-600 text-sm">
              Need help?{" "}
              <Link
                href="/contact"
                className="text-[#014751] hover:text-[#026e7d] transition-colors font-medium"
              >
                Contact Support
              </Link>
            </p>
          </motion.div>
        </div>
      </main>

      <Footer showAppDownload={false} />
    </>
  );
}
