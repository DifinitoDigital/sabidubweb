import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";

// Reset password API function
const resetPassword = async (token: string, newPassword: string) => {
  const response = await fetch('https://d198-102-91-69-62.ngrok-free.app/auth/reset-password', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token, newPassword })
  });
  return response.json();
};

export default function ResetPassword() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ error?: boolean; message?: string } | null>(null);
  const [errors, setErrors] = useState<{ newPassword?: string; confirmPassword?: string }>({});
  const [token, setToken] = useState<string>('');

  useEffect(() => {
    // Get token from URL parameters
    const params = new URLSearchParams(window.location.search);
    const urlToken = params.get('token');
    if (urlToken) {
      setToken(urlToken);
    } else {
      setResult({ error: true, message: "Invalid or missing reset token." });
    }
  }, []);

  const validateForm = () => {
    const newErrors: { newPassword?: string; confirmPassword?: string } = {};

    if (!formData.newPassword) {
      newErrors.newPassword = "Password is required";
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = "Password must be at least 8 characters long";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.newPassword)) {
      newErrors.newPassword = "Password must contain at least one uppercase letter, one lowercase letter, and one number";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const response = await resetPassword(token, formData.newPassword);
      setResult(response);
      
      if (!response.error) {
        // Redirect to login page after successful reset
        setTimeout(() => {
          router.push('/login');
        }, 2000);
      }
    } catch (error) {
      setResult({ error: true, message: "An error occurred. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  if (result?.error && !token) {
    return (
      <>
        <Head>
          <title>Invalid Reset Token - SabiDub | Educational Excellence in Nigeria</title>
          <meta name="description" content="Invalid or expired password reset token." />
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
                className="w-20 h-20 bg-red-500/10 rounded-full mx-auto mb-6 flex items-center justify-center"
              >
                <svg
                  className="w-12 h-12 text-red-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </motion.div>

              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-2xl font-bold text-white mb-4"
              >
                Invalid Reset Token
              </motion.h1>

              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-gray-400 mb-8"
              >
                The password reset link is invalid or has expired. Please request a new password reset.
              </motion.p>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="space-y-4"
              >
                <Link
                  href="/forgot-password"
                  className="block w-full bg-[#FFEDB1] text-black py-3 rounded-lg hover:bg-[#ffdb82] transition-colors font-medium"
                >
                  Request New Reset
                </Link>
                <Link
                  href="/"
                  className="block w-full bg-[#252525] text-white py-3 rounded-lg hover:bg-[#333] transition-colors"
                >
                  Back to Home
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Reset Password - SabiDub | Educational Excellence in Nigeria</title>
        <meta name="description" content="Reset your SabiDub account password securely." />
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
            {/* Success/Error Message */}
            {result && (
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className={`mb-6 p-4 rounded-lg ${
                  result.error 
                    ? 'bg-red-500/10 border border-red-500/20' 
                    : 'bg-green-500/10 border border-green-500/20'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    result.error ? 'bg-red-500/20' : 'bg-green-500/20'
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

            {/* Reset Icon */}
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
                  d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                />
              </svg>
            </motion.div>

            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-2xl font-bold text-white mb-2 text-center"
            >
              Reset Your Password
            </motion.h1>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-gray-400 mb-8 text-center"
            >
              Enter your new password below to complete the reset process.
            </motion.p>

            <motion.form
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              {/* New Password Input */}
              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-300 mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 bg-[#252525] border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                    errors.newPassword 
                      ? 'border-red-500 focus:ring-red-500/20' 
                      : 'border-gray-600 focus:ring-[#FFEDB1]/20 focus:border-[#FFEDB1]'
                  } text-white placeholder-gray-400`}
                  placeholder="Enter your new password"
                  disabled={loading}
                />
                {errors.newPassword && (
                  <p className="mt-1 text-sm text-red-400">{errors.newPassword}</p>
                )}
              </div>

              {/* Confirm Password Input */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 bg-[#252525] border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                    errors.confirmPassword 
                      ? 'border-red-500 focus:ring-red-500/20' 
                      : 'border-gray-600 focus:ring-[#FFEDB1]/20 focus:border-[#FFEDB1]'
                  } text-white placeholder-gray-400`}
                  placeholder="Confirm your new password"
                  disabled={loading}
                />
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-400">{errors.confirmPassword}</p>
                )}
              </div>

              {/* Password Requirements */}
              <div className="bg-[#252525] p-4 rounded-lg">
                <p className="text-sm text-gray-400 mb-2">Password requirements:</p>
                <ul className="text-xs text-gray-500 space-y-1">
                  <li className={`flex items-center gap-2 ${formData.newPassword.length >= 8 ? 'text-green-400' : ''}`}>
                    <span>{formData.newPassword.length >= 8 ? '✓' : '○'}</span>
                    At least 8 characters long
                  </li>
                  <li className={`flex items-center gap-2 ${/(?=.*[a-z])/.test(formData.newPassword) ? 'text-green-400' : ''}`}>
                    <span>{/(?=.*[a-z])/.test(formData.newPassword) ? '✓' : '○'}</span>
                    One lowercase letter
                  </li>
                  <li className={`flex items-center gap-2 ${/(?=.*[A-Z])/.test(formData.newPassword) ? 'text-green-400' : ''}`}>
                    <span>{/(?=.*[A-Z])/.test(formData.newPassword) ? '✓' : '○'}</span>
                    One uppercase letter
                  </li>
                  <li className={`flex items-center gap-2 ${/(?=.*\d)/.test(formData.newPassword) ? 'text-green-400' : ''}`}>
                    <span>{/(?=.*\d)/.test(formData.newPassword) ? '✓' : '○'}</span>
                    One number
                  </li>
                </ul>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#FFEDB1] text-black py-3 rounded-lg hover:bg-[#ffdb82] transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                    Resetting Password...
                  </div>
                ) : (
                  'Reset Password'
                )}
              </button>

              {/* Back to Login */}
              <Link
                href="/login"
                className="block w-full bg-[#252525] text-white py-3 rounded-lg hover:bg-[#333] transition-colors text-center"
              >
                Back to Login
              </Link>
            </motion.form>

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