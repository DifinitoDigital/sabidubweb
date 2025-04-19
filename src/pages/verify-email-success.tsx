import Head from "next/head";
import Link from "next/link";
import { useEffect } from "react";
import { motion } from "framer-motion";

// Example: How to use the API URL for email verification in React
const apiUrl ='https://bd22-102-91-5-188.ngrok-free.app';

useEffect(() => {
  const params = new URLSearchParams(window.location.search);
  const email = params.get('email');
  const token = params.get('token');
  console.log('Email from URL:', email);
  console.log('Token from URL:', token);

  // Call backend to verify
  fetch(`${apiUrl}/auth/school/verify-email-success?email=${email}&token=${token}`)
    .then(res => res.json())
    .then(data => {
      console.log('Backend response:', data);
    });
}, []);

export default function VerifyEmailSuccess() {
  useEffect(() => {
    // Confetti effect on load
    const confetti = () => {
      const colors = ["#FFEDB1", "#ffdb82", "#4CAF50", "#ffffff"];
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
            transform: `translate(${Math.random() * 400 - 200}px, ${
              window.innerHeight
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

      <main className="min-h-screen bg-[#111] flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-[#1a1a1a] rounded-2xl p-8 text-center relative overflow-hidden"
          >
            {/* Success Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-20 h-20 bg-[#FFEDB1]/10 rounded-full mx-auto mb-6 flex items-center justify-center"
            >
              <svg
                className="w-12 h-12 text-[#FFEDB1]"
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
              className="text-2xl font-bold text-white mb-4"
            >
              Email Verified Successfully!
            </motion.h1>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-gray-400 mb-8"
            >
              Thank you for verifying your email address. Your account is now
              fully activated and you can access all features of SabiDub.
            </motion.p>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="space-y-4"
            >
              <Link
                href="/dashboard"
                className="block w-full bg-[#FFEDB1] text-black py-3 rounded-lg hover:bg-[#ffdb82] transition-colors font-medium"
              >
                Go to Dashboard
              </Link>
              <Link
                href="/"
                className="block w-full bg-[#252525] text-white py-3 rounded-lg hover:bg-[#333] transition-colors"
              >
                Back to Home
              </Link>
            </motion.div>

            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FFEDB1] via-[#ffdb82] to-[#FFEDB1]"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#FFEDB1]/5 rounded-full blur-2xl"></div>
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#FFEDB1]/5 rounded-full blur-2xl"></div>
          </motion.div>

          {/* Additional Info */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-8 text-center"
          >
            <p className="text-gray-400 text-sm">
              Need help?{" "}
              <Link
                href="/contact"
                className="text-[#FFEDB1] hover:text-[#ffdb82] transition-colors"
              >
                Contact Support
              </Link>
            </p>
          </motion.div>
        </div>
      </main>
    </>
  );
}
