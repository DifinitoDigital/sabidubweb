import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ResetSuccess() {
  return (
    <>
      <Head>
        <title>Password Reset Successful - SabiDub</title>
        <meta name="description" content="Your password has been reset successfully." />
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
                <path
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
              Password Reset Successful!
            </motion.h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-gray-400 mb-8"
            >
              Your password has been changed. You can now log in with your new password.
            </motion.p>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="space-y-4"
            >
              <Link
                href="/login"
                className="block w-full bg-[#FFEDB1] text-black py-3 rounded-lg hover:bg-[#ffdb82] transition-colors font-medium"
              >
                Login
              </Link>
              <div className="text-gray-400 text-sm mt-4">
                Are you logging in as a student?<br />
                <span className="text-xs text-gray-500">If not, go back to the app and log in.</span>
              </div>
              <Link
                href="/"
                className="block w-full bg-[#252525] text-white py-3 rounded-lg hover:bg-[#333] transition-colors font-medium mt-2"
              >
                Go Back to App
              </Link>
            </motion.div>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FFEDB1] via-[#ffdb82] to-[#FFEDB1]"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#FFEDB1]/5 rounded-full blur-2xl"></div>
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#FFEDB1]/5 rounded-full blur-2xl"></div>
          </motion.div>
        </div>
      </main>
    </>
  );
} 