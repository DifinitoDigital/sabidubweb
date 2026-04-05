import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ResetSuccess() {
  const router = useRouter();
  const [redirectType, setRedirectType] = useState<string>('unknown');
  const [isRedirecting, setIsRedirecting] = useState(false);
  const portalUrl = process.env.NEXT_PUBLIC_PORTAL_URL || 'https://portal.sabidub.com';

  useEffect(() => {
    const { redirectType: typeFromQuery } = router.query;
    if (typeFromQuery) {
      setRedirectType(typeFromQuery as string);
    }
  }, [router.query]);

  // Determine login URL based on user type
  const getLoginUrl = () => {
    switch (redirectType) {
      case 'system_staff':
        return `${portalUrl}/auth/staff/signin`;
      case 'school_staff':
        return `${portalUrl}/auth/school/signin`;
      case 'ambassador':
        return `${portalUrl}/ambassador/login`;
      case 'student':
        return 'https://student.portal.sabidub.com/signin';
      default:
        return `${portalUrl}/auth/staff/signin`;
    }
  };

  const getLoginButtonText = () => {
    switch (redirectType) {
      case 'student':
        return 'Login to Student Portal';
      case 'ambassador':
        return 'Login to Ambassador Portal';
      default:
        return 'Login to Your Account';
    }
  };

  const getMessage = () => {
    switch (redirectType) {
      case 'student':
        return 'Your password has been changed successfully. You can now log in to the student portal or return to the SabiDub mobile app.';
      case 'ambassador':
        return 'Your password has been changed successfully. You can now log in to the ambassador dashboard.';
      default:
        return 'Your password has been changed. You can now log in with your new password.';
    }
  };

  const handleLoginClick = () => {
    setIsRedirecting(true);
    // The actual navigation will happen via the href
  };

  return (
    <>
      <Head>
        <title>Password Reset Successful - SabiDub</title>
        <meta name="description" content="Your password has been reset successfully." />
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
              Password Reset Successful!
            </motion.h1>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-gray-600 mb-8"
            >
              {getMessage()}
            </motion.p>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="space-y-3"
            >
              <a
                href={getLoginUrl()}
                onClick={handleLoginClick}
                className="block w-full bg-[#014751] text-white py-3 rounded-lg hover:bg-[#013b43] transition-all font-medium relative overflow-hidden group shadow-lg"
              >
                <span className={`${isRedirecting ? 'opacity-0' : 'opacity-100'} transition-opacity`}>
                  {getLoginButtonText()}
                </span>
                {isRedirecting && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              </a>

              {redirectType === 'student' && (
                <button
                  onClick={() => window.location.href = "sabidub://login"} // Attempt to open app via deep link
                  className="block w-full bg-white border border-[#014751] text-[#014751] py-3 rounded-lg hover:bg-gray-50 transition-all font-bold group relative overflow-hidden"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.5 2H6.5C5.12 2 4 3.12 4 4.5v15C4 20.88 5.12 22 6.5 22h11c1.38 0 2.5-1.12 2.5-2.5v-15C20 3.12 18.88 2 17.5 2zM12 20c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm5-4H7V5h10v11z" /></svg>
                    Return to SabiDub App
                  </span>
                  <div className="absolute inset-0 bg-gray-50 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                </button>
              )}

              <Link
                href="/"
                className="block w-full bg-transparent text-gray-400 py-2 rounded-lg hover:text-gray-600 transition-all font-medium text-xs uppercase tracking-widest"
              >
                Back to Home
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