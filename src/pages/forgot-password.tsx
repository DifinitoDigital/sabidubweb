import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const forgotPassword = async (email: string) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || process.env.API_URL || 'http://localhost:4000';
  const response = await fetch(`${baseUrl}/auth/forgot-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email })
  });
  return response.json();
};

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ error?: boolean; message?: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);
    if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    setLoading(true);
    try {
      const response = await forgotPassword(email);
      setResult(response);
    } catch (err) {
      setResult({ error: true, message: 'An error occurred. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Forgot Password - SabiDub | Educational Excellence in Nigeria</title>
        <meta name="description" content="Request a password reset for your SabiDub account." />
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
            className="bg-white border border-gray-100 shadow-sm rounded-2xl p-8 relative overflow-hidden"
          >
            {/* Icon */}
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
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </motion.div>

            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-2xl font-bold text-gray-900 mb-2 text-center"
            >
              Forgot Your Password?
            </motion.h1>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-gray-600 mb-8 text-center"
            >
              Enter your email address and we&apos;ll send you a link to reset your password.
            </motion.p>

            <motion.form
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className={`w-full px-4 py-3 bg-white border rounded-lg focus:outline-none focus:ring-2 transition-colors ${error
                    ? 'border-red-500 focus:ring-red-500/20'
                    : 'border-gray-200 focus:ring-[#014751]/20 focus:border-[#014751]'
                    } text-gray-900 placeholder-gray-400`}
                  placeholder="Enter your email"
                  disabled={loading}
                />
                {error && <p className="mt-1 text-sm text-red-400">{error}</p>}
              </div>

              {/* Success/Error Message */}
              {result && (
                <motion.div
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className={`p-4 rounded-lg border ${result.error
                    ? 'bg-red-500/10 border-red-500/20'
                    : 'bg-green-500/10 border-green-500/20'
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${result.error ? 'bg-red-500/20' : 'bg-green-500/20'
                      }`}>
                      {result.error ? (
                        <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      ) : (
                        <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <p className={`text-sm ${result.error ? 'text-red-400' : 'text-green-400'}`}>
                      {result.message}
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#014751] text-white py-3 rounded-lg hover:bg-[#013b43] transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
              >
                <span className={`${loading ? 'opacity-0' : 'opacity-100'} transition-opacity`}>
                  Send Reset Link
                </span>
                {loading && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              </button>

              {/* Back to Login */}
              <Link
                href="/login"
                className="block w-full bg-white border border-gray-200 text-[#014751] py-3 rounded-lg hover:bg-gray-50 transition-all text-center font-medium group relative overflow-hidden"
              >
                <span className="relative z-10">Back to Login</span>
                <div className="absolute inset-0 bg-gray-50 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </Link>

              {/* Back to Home */}
              <Link
                href="/"
                className="block w-full bg-white border border-gray-200 text-[#014751] py-3 rounded-lg hover:bg-gray-50 transition-all text-center font-medium group relative overflow-hidden"
              >
                <span className="relative z-10">Back to Home</span>
                <div className="absolute inset-0 bg-gray-50 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </Link>
            </motion.form>

            {/* Decorative Elements */}
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
              Need help?{' '}
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