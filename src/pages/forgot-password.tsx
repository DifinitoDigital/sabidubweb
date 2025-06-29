import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";

const forgotPassword = async (email: string) => {
  const response = await fetch('https://d198-102-91-69-62.ngrok-free.app/auth/forgot-password', {
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
      <main className="min-h-screen bg-[#111] flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-[#1a1a1a] rounded-2xl p-8 relative overflow-hidden"
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
                  d="M16 12v1a4 4 0 01-8 0v-1m8 0V8a4 4 0 00-8 0v4m8 0H8"
                />
              </svg>
            </motion.div>
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-2xl font-bold text-white mb-2 text-center"
            >
              Forgot Your Password?
            </motion.h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-gray-400 mb-8 text-center"
            >
              Enter your email address and we'll send you a link to reset your password.
            </motion.p>
            <motion.form
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className={`w-full px-4 py-3 bg-[#252525] border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                    error ? 'border-red-500 focus:ring-red-500/20' : 'border-gray-600 focus:ring-[#FFEDB1]/20 focus:border-[#FFEDB1]'
                  } text-white placeholder-gray-400`}
                  placeholder="Enter your email"
                  disabled={loading}
                />
                {error && <p className="mt-1 text-sm text-red-400">{error}</p>}
              </div>
              {result && (
                <motion.div
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className={`mb-2 p-3 rounded-lg text-sm ${
                    result.error ? 'bg-red-500/10 text-red-400' : 'bg-green-500/10 text-green-400'
                  }`}
                >
                  {result.message}
                </motion.div>
              )}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#FFEDB1] text-black py-3 rounded-lg hover:bg-[#ffdb82] transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                    Sending...
                  </div>
                ) : (
                  'Send Reset Link'
                )}
              </button>
              <Link
                href="/login"
                className="block w-full bg-[#252525] text-white py-3 rounded-lg hover:bg-[#333] transition-colors text-center"
              >
                Back to Login
              </Link>
            </motion.form>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FFEDB1] via-[#ffdb82] to-[#FFEDB1]"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#FFEDB1]/5 rounded-full blur-2xl"></div>
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#FFEDB1]/5 rounded-full blur-2xl"></div>
          </motion.div>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-8 text-center"
          >
            <p className="text-gray-400 text-sm">
              Need help?{' '}
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