import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Footer from "../components/Footer";
import {
  FaGraduationCap,
  FaLaptop,
  FaUsers,
  FaBook,
  FaChalkboardTeacher,
  FaBrain,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { motion } from "framer-motion";

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.5 },
};

const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export default function Services() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <Head>
        <title>Services | SabiDub - Educational Excellence in Nigeria</title>
        <meta
          name="description"
          content="Explore SabiDub's comprehensive educational services designed to bridge the gap between secondary and tertiary education in Nigeria."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <motion.main
        initial="initial"
        animate="animate"
        className="min-h-screen bg-[#111]"
      >
        {/* Navigation */}
        <nav className="px-4 sm:px-6 py-6 sm:py-8 flex items-center justify-between max-w-7xl mx-auto relative z-50">
          <Link href="/" className="flex items-center">
            <div className="relative w-40 h-12">
              <Image
                src="/images/white.png"
                alt="SabiDub Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-gray-400 hover:text-[#FFEDB1] transition-colors"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-gray-400 hover:text-[#FFEDB1] transition-colors"
            >
              About
            </Link>
            <Link
              href="/services"
              className="text-white hover:text-[#FFEDB1] transition-colors"
            >
              Services
            </Link>
            <Link
              href="/pricing"
              className="text-gray-400 hover:text-[#FFEDB1] transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="/contact"
              className="text-gray-400 hover:text-[#FFEDB1] transition-colors"
            >
              Contact
            </Link>
            <button className="bg-[#FFEDB1] text-black px-4 py-2 rounded-md font-medium hover:bg-[#ffdb82] transition-colors">
              Download App
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden flex flex-col items-center justify-center w-10 h-10 bg-[#1a1a1a] rounded-lg hover:bg-[#252525] transition-colors relative z-50"
          >
            <span
              className={`w-5 h-0.5 bg-white mb-1 transition-transform ${
                isMenuOpen ? "rotate-45 translate-y-1.5" : ""
              }`}
            ></span>
            <span
              className={`w-5 h-0.5 bg-white transition-opacity ${
                isMenuOpen ? "opacity-0" : ""
              }`}
            ></span>
            <span
              className={`w-5 h-0.5 bg-white mt-1 transition-transform ${
                isMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
              }`}
            ></span>
          </button>
        </nav>

        {/* Mobile Menu */}
        <div
          className={`md:hidden fixed top-0 right-0 w-full sm:w-80 h-full bg-[#1a1a1a] z-40 transform transition-transform duration-300 ease-in-out ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="p-6 h-full overflow-y-auto">
            <div className="flex flex-col space-y-6">
              <div className="flex items-center justify-end mb-8">
                <button
                  onClick={toggleMenu}
                  className="text-gray-400 hover:text-white"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="flex flex-col space-y-4">
                <Link
                  href="/"
                  className="text-gray-400 hover:text-[#FFEDB1] transition-colors py-2 border-b border-gray-800"
                  onClick={toggleMenu}
                >
                  Home
                </Link>
                <Link
                  href="/about"
                  className="text-gray-400 hover:text-[#FFEDB1] transition-colors py-2 border-b border-gray-800"
                  onClick={toggleMenu}
                >
                  About
                </Link>
                <Link
                  href="/services"
                  className="text-white hover:text-[#FFEDB1] transition-colors py-2 border-b border-gray-800"
                  onClick={toggleMenu}
                >
                  Services
                </Link>
                <Link
                  href="/pricing"
                  className="text-gray-400 hover:text-[#FFEDB1] transition-colors py-2 border-b border-gray-800"
                  onClick={toggleMenu}
                >
                  Pricing
                </Link>
                <Link
                  href="/contact"
                  className="text-gray-400 hover:text-[#FFEDB1] transition-colors py-2 border-b border-gray-800"
                  onClick={toggleMenu}
                >
                  Contact
                </Link>
              </div>

              <button className="w-full bg-[#FFEDB1] text-black px-4 py-3 rounded-md font-medium hover:bg-[#ffdb82] transition-colors">
                Download App
              </button>

              <div className="mt-6 flex items-center justify-center space-x-4">
                <a href="#" className="text-gray-400 hover:text-[#FFEDB1]">
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-[#FFEDB1]">
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-[#FFEDB1]">
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Overlay */}
        {isMenuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-30"
            onClick={toggleMenu}
          ></div>
        )}

        {/* Hero Section */}
        <motion.section
          variants={fadeInUp}
          className="px-4 sm:px-6 pt-16 sm:pt-20 pb-16 sm:pb-24 max-w-7xl mx-auto"
        >
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
              Student Management{" "}
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-[#FFEDB1]"
              >
                Portal
              </motion.span>
            </h1>
            <motion.p
              variants={fadeIn}
              className="text-gray-400 max-w-2xl mx-auto mb-8"
            >
              Comprehensive analytics and management tools for educational
              institutions
            </motion.p>

            {/* Analytics Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <motion.div
                variants={fadeInUp}
                className="bg-[#1a1a1a] p-6 rounded-xl"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white font-semibold">Total Students</h3>
                  <span className="text-[#FFEDB1] text-2xl font-bold">
                    2,847
                  </span>
                </div>
                <div className="flex items-center text-sm">
                  <span className="text-green-400">↑ 12%</span>
                  <span className="text-gray-400 ml-2">vs last month</span>
                </div>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                className="bg-[#1a1a1a] p-6 rounded-xl"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white font-semibold">
                    Average Performance
                  </h3>
                  <span className="text-[#FFEDB1] text-2xl font-bold">78%</span>
                </div>
                <div className="flex items-center text-sm">
                  <span className="text-green-400">↑ 5%</span>
                  <span className="text-gray-400 ml-2">improvement</span>
                </div>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                className="bg-[#1a1a1a] p-6 rounded-xl"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white font-semibold">Active Courses</h3>
                  <span className="text-[#FFEDB1] text-2xl font-bold">24</span>
                </div>
                <div className="flex items-center text-sm">
                  <span className="text-[#FFEDB1]">●</span>
                  <span className="text-gray-400 ml-2">
                    All running smoothly
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Weekly Activity Chart */}
            <motion.div
              variants={fadeInUp}
              className="bg-[#1a1a1a] p-6 rounded-xl mb-12"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-white font-semibold">Student Engagement</h3>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#FFEDB1]"></span>
                    <span className="text-sm text-gray-400">
                      Active Students
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#4CAF50]"></span>
                    <span className="text-sm text-gray-400">
                      Completion Rate
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#2196F3]"></span>
                    <span className="text-sm text-gray-400">Participation</span>
                  </div>
                </div>
              </div>
              <div className="h-64 relative">
                {/* Grid Lines */}
                <div className="absolute inset-0 flex flex-col justify-between">
                  {[0, 1, 2, 3, 4].map((_, index) => (
                    <div
                      key={index}
                      className="w-full h-px bg-gray-800"
                      style={{
                        top: `${(index * 100) / 9}%`,
                      }}
                    ></div>
                  ))}
                </div>

                {/* Bar Graph */}
                <div className="flex items-end justify-between h-full px-2 relative">
                  {[
                    { day: "Mon", height: "75%", highlight: true },
                    { day: "Tue", height: "85%", highlight: true },
                    { day: "Wed", height: "70%", highlight: true },
                    { day: "Thu", height: "65%", highlight: false },
                    { day: "Fri", height: "100%", highlight: false },
                    { day: "Sat", height: "45%", highlight: true },
                    { day: "Sun", height: "40%", highlight: false },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center gap-2 w-[10%]"
                    >
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: item.height }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className={`w-full rounded-t-lg ${
                          item.highlight ? "bg-[#FFEDB1]" : "bg-gray-700"
                        }`}
                        style={{ height: item.height }}
                      ></motion.div>
                      <span className="text-xs text-gray-400">{item.day}</span>
                    </div>
                  ))}

                  {/* Trend Lines */}
                  <svg
                    className="absolute top-0 left-0 w-full h-full"
                    style={{ pointerEvents: "none" }}
                  >
                    {/* Completion Rate Line */}
                    <path
                      d="M40,120 C100,100 160,75 220,65 C280,55 340,85 400,95"
                      fill="none"
                      stroke="#4CAF50"
                      strokeWidth="2"
                      strokeDasharray="5,5"
                      opacity="0.8"
                    />

                    {/* Participation Line */}
                    <path
                      d="M40,140 C100,130 160,95 220,85 C280,75 340,95 400,105"
                      fill="none"
                      stroke="#2196F3"
                      strokeWidth="2"
                      strokeDasharray="5,5"
                      opacity="0.8"
                    />

                    {/* Data Points - Completion Rate */}
                    {[
                      { x: 40, y: 120 },
                      { x: 160, y: 75 },
                      { x: 280, y: 55 },
                      { x: 400, y: 95 },
                    ].map((point, index) => (
                      <circle
                        key={`completion-${index}`}
                        cx={point.x}
                        cy={point.y}
                        r="4"
                        fill="#1a1a1a"
                        stroke="#4CAF50"
                        strokeWidth="2"
                      />
                    ))}

                    {/* Data Points - Participation */}
                    {[
                      { x: 40, y: 140 },
                      { x: 160, y: 95 },
                      { x: 280, y: 75 },
                      { x: 400, y: 105 },
                    ].map((point, index) => (
                      <circle
                        key={`participation-${index}`}
                        cx={point.x}
                        cy={point.y}
                        r="4"
                        fill="#1a1a1a"
                        stroke="#2196F3"
                        strokeWidth="2"
                      />
                    ))}
                  </svg>

                  {/* Y-axis Labels */}
                  <div className="absolute -left-16 top-0 h-full flex flex-col justify-between text-xs text-gray-400">
                    <span>100%</span>
                    <span>75%</span>
                    <span>50%</span>
                    <span>25%</span>
                    <span>0%</span>
                  </div>
                </div>
              </div>

              {/* Legend - Additional Metrics */}
              <div className="mt-4 grid grid-cols-3 gap-4">
                <div className="bg-[#252525] p-3 rounded-lg">
                  <div className="text-sm text-gray-400">Average Time</div>
                  <div className="text-lg text-[#FFEDB1] font-semibold">
                    45 mins
                  </div>
                </div>
                <div className="bg-[#252525] p-3 rounded-lg">
                  <div className="text-sm text-gray-400">Peak Hours</div>
                  <div className="text-lg text-[#FFEDB1] font-semibold">
                    2PM - 4PM
                  </div>
                </div>
                <div className="bg-[#252525] p-3 rounded-lg">
                  <div className="text-sm text-gray-400">Total Sessions</div>
                  <div className="text-lg text-[#FFEDB1] font-semibold">
                    1,247
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Performance Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <motion.div
                variants={fadeInUp}
                className="bg-[#1a1a1a] p-6 rounded-xl"
              >
                <h3 className="text-white font-semibold mb-6">
                  Course Completion Rates
                </h3>
                <div className="space-y-4">
                  {[
                    { course: "Mathematics", rate: "92%" },
                    { course: "Physics", rate: "88%" },
                    { course: "Chemistry", rate: "85%" },
                    { course: "Biology", rate: "90%" },
                  ].map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">{item.course}</span>
                        <span className="text-[#FFEDB1]">{item.rate}</span>
                      </div>
                      <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: item.rate }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className="h-full bg-[#FFEDB1] rounded-full"
                        ></motion.div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                className="bg-[#1a1a1a] p-6 rounded-xl"
              >
                <h3 className="text-white font-semibold mb-6">
                  Student Distribution
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Secondary", value: "45%", color: "#FFEDB1" },
                    { label: "University", value: "35%", color: "#4CAF50" },
                    { label: "Professional", value: "15%", color: "#2196F3" },
                    { label: "Others", value: "5%", color: "#9E9E9E" },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="text-center p-4 bg-[#252525] rounded-lg"
                    >
                      <div
                        className="w-12 h-12 mx-auto mb-2 rounded-full"
                        style={{ backgroundColor: item.color }}
                      ></div>
                      <div className="text-white font-semibold">
                        {item.value}
                      </div>
                      <div className="text-sm text-gray-400">{item.label}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Description Section */}
            <motion.div
              variants={fadeIn}
              className="text-left max-w-3xl mx-auto"
            >
              <h2 className="text-2xl font-bold text-white mb-4">
                Comprehensive Student Management System
              </h2>
              <p className="text-gray-400 mb-6">
                Our advanced student management portal provides educational
                institutions with powerful tools to track, analyze, and improve
                student performance. The system offers real-time analytics,
                detailed progress tracking, and comprehensive reporting
                features.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-[#FFEDB1] font-semibold mb-3">
                    Key Features
                  </h3>
                  <ul className="space-y-2 text-gray-400">
                    <li>• Real-time performance tracking</li>
                    <li>• Automated attendance monitoring</li>
                    <li>• Course progress analytics</li>
                    <li>• Customizable reporting tools</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-[#FFEDB1] font-semibold mb-3">
                    Benefits
                  </h3>
                  <ul className="space-y-2 text-gray-400">
                    <li>• Improved student engagement</li>
                    <li>• Enhanced learning outcomes</li>
                    <li>• Streamlined administration</li>
                    <li>• Data-driven decision making</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.section>

        {/* Main Services */}
        <section className="px-4 sm:px-6 py-16">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-12">
              Workflow Automation Features
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Side - Workflow Steps */}
              <div className="bg-[#1a1a1a] rounded-xl p-8 border border-gray-800">
                <div className="space-y-8">
                  {/* Schedule Event */}
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-[#252525] rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-6 h-6 text-[#FFEDB1]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-medium mb-1">
                        Schedule new event
                      </h3>
                      <p className="text-gray-400 text-sm">
                        Add event to Google Calendar
                      </p>
                      <div className="mt-2 flex items-center">
                        <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded">
                          Approved
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Create Meeting */}
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-[#252525] rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-6 h-6 text-[#FFEDB1]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-medium mb-1">
                        Create meeting in Zoom
                      </h3>
                      <p className="text-gray-400 text-sm">
                        Plan and set up Zoom Meeting
                      </p>
                      <div className="mt-2 flex items-center">
                        <span className="text-xs px-2 py-1 bg-red-100 text-red-800 rounded">
                          Rejected
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Add Delay */}
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-[#252525] rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-6 h-6 text-[#FFEDB1]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-medium mb-1">Add Delay</h3>
                      <p className="text-gray-400 text-sm">Time: 30 minutes</p>
                      <div className="mt-2 flex items-center">
                        <span className="text-xs text-gray-400">Path 2</span>
                      </div>
                    </div>
                  </div>

                  {/* Create Note */}
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-[#252525] rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-6 h-6 text-[#FFEDB1]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-medium mb-1">
                        Create note in Google Docs
                      </h3>
                      <p className="text-gray-400 text-sm">
                        Initiate new Google Docs note
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side - Workflow Preview */}
              <div className="bg-[#1a1a1a] rounded-xl p-8 border border-gray-800">
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-white mb-4">
                    Workflow Preview
                  </h3>
                  <p className="text-gray-400">
                    Visualize and manage your automated workflows with our
                    intuitive interface.
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="bg-[#252525] rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-[#333] rounded-full flex items-center justify-center">
                          <svg
                            className="w-4 h-4 text-[#FFEDB1]"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                            />
                          </svg>
                        </div>
                        <span className="text-white">Active Workflows</span>
                      </div>
                      <span className="text-[#FFEDB1]">12</span>
                    </div>
                  </div>
                  <div className="bg-[#252525] rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-[#333] rounded-full flex items-center justify-center">
                          <svg
                            className="w-4 h-4 text-[#FFEDB1]"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </div>
                        <span className="text-white">Completed Tasks</span>
                      </div>
                      <span className="text-[#FFEDB1]">48</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Admin Portal Features */}
        <section className="px-2 sm:px-6 py-8 sm:py-16">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-8">
              <div className="lg:col-span-1">
                <h3 className="text-2xl font-bold text-white mb-4">
                  Advanced Management Tools
                </h3>
                <p className="text-gray-400 mb-6">
                  Our comprehensive suite of management tools helps streamline
                  your educational institution's operations.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-2 gap-3">
                  <div className="bg-[#1a1a1a] p-4 rounded-xl hover:bg-[#252525] transition-colors duration-300">
                    <h4 className="text-[#FFEDB1] font-semibold mb-2 flex items-center">
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      Materials
                    </h4>
                    <p className="text-gray-400 text-sm">
                      Digital resource management and distribution
                    </p>
                  </div>
                  <div className="bg-[#1a1a1a] p-4 rounded-xl hover:bg-[#252525] transition-colors duration-300">
                    <h4 className="text-[#FFEDB1] font-semibold mb-2 flex items-center">
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                      Community
                    </h4>
                    <p className="text-gray-400 text-sm">
                      Foster collaboration and communication
                    </p>
                  </div>
                  <div className="bg-[#1a1a1a] p-4 rounded-xl hover:bg-[#252525] transition-colors duration-300">
                    <h4 className="text-[#FFEDB1] font-semibold mb-2 flex items-center">
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                        />
                      </svg>
                      Notifications
                    </h4>
                    <p className="text-gray-400 text-sm">
                      Real-time alerts and announcements
                    </p>
                  </div>
                  <div className="bg-[#1a1a1a] p-4 rounded-xl hover:bg-[#252525] transition-colors duration-300">
                    <h4 className="text-[#FFEDB1] font-semibold mb-2 flex items-center">
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      Settings
                    </h4>
                    <p className="text-gray-400 text-sm">
                      Customizable system configuration
                    </p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-2 space-y-4">
                <div className="bg-[#1a1a1a] rounded-xl p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h4 className="text-white font-semibold flex items-center">
                      <svg
                        className="w-5 h-5 text-[#FFEDB1] mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                        />
                      </svg>
                      System Overview
                    </h4>
                    <div className="flex space-x-2">
                      <button className="bg-[#252525] p-2 rounded-lg hover:bg-[#333] transition-colors">
                        <svg
                          className="w-4 h-4 text-[#FFEDB1]"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 6h16M4 12h16M4 18h16"
                          />
                        </svg>
                      </button>
                      <button className="bg-[#252525] p-2 rounded-lg hover:bg-[#333] transition-colors">
                        <svg
                          className="w-4 h-4 text-[#FFEDB1]"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#252525] rounded-lg p-4">
                      <div className="flex justify-between items-center mb-4">
                        <div className="text-sm text-gray-400">
                          System Health
                        </div>
                        <div className="text-[#FFEDB1]">98%</div>
                      </div>
                      <div className="h-2 bg-[#1a1a1a] rounded-full overflow-hidden">
                        <div className="h-full w-[98%] bg-[#FFEDB1] rounded-full"></div>
                      </div>
                    </div>
                    <div className="bg-[#252525] rounded-lg p-4">
                      <div className="flex justify-between items-center mb-4">
                        <div className="text-sm text-gray-400">
                          Storage Used
                        </div>
                        <div className="text-[#FFEDB1]">64%</div>
                      </div>
                      <div className="h-2 bg-[#1a1a1a] rounded-full overflow-hidden">
                        <div className="h-full w-[64%] bg-[#FFEDB1] rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-[#1a1a1a] rounded-xl p-4">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-8 h-8 bg-[#252525] rounded-lg flex items-center justify-center">
                        <svg
                          className="w-4 h-4 text-[#FFEDB1]"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 4v16m8-8H4"
                          />
                        </svg>
                      </div>
                      <h5 className="text-white font-medium">Quick Actions</h5>
                    </div>
                    <button className="w-full bg-[#252525] text-white py-2 px-3 rounded-lg hover:bg-[#333] transition-colors text-sm mb-2">
                      Add New User
                    </button>
                    <button className="w-full bg-[#252525] text-white py-2 px-3 rounded-lg hover:bg-[#333] transition-colors text-sm">
                      Generate Report
                    </button>
                  </div>

                  <div className="bg-[#1a1a1a] rounded-xl p-4">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-8 h-8 bg-[#252525] rounded-lg flex items-center justify-center">
                        <svg
                          className="w-4 h-4 text-[#FFEDB1]"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 10V3L4 14h7v7l9-11h-7z"
                          />
                        </svg>
                      </div>
                      <h5 className="text-white font-medium">Performance</h5>
                    </div>
                    <div className="text-2xl font-bold text-white mb-1">
                      94.8%
                    </div>
                    <div className="text-[#FFEDB1] text-sm">
                      ↑ 2.1% vs last week
                    </div>
                  </div>

                  <div className="bg-[#1a1a1a] rounded-xl p-4">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-8 h-8 bg-[#252525] rounded-lg flex items-center justify-center">
                        <svg
                          className="w-4 h-4 text-[#FFEDB1]"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <h5 className="text-white font-medium">Response Time</h5>
                    </div>
                    <div className="text-2xl font-bold text-white mb-1">
                      1.2s
                    </div>
                    <div className="text-[#FFEDB1] text-sm">
                      ↓ 0.3s improvement
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Student Management Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="px-4 sm:px-6 py-16 bg-[#1a1a1a]"
        >
          <div className="max-w-7xl mx-auto">
            <motion.div
              variants={staggerChildren}
              className="grid md:grid-cols-2 gap-12"
            >
              <motion.div
                variants={fadeInUp}
                className="flex flex-col justify-center"
              >
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
                  Student{" "}
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-[#FFEDB1]"
                  >
                    Management
                  </motion.span>
                </h2>
                <p className="text-gray-400 mb-8">
                  Efficiently manage student records, track attendance, and
                  monitor performance with our comprehensive management system.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-[#FFEDB1] text-black px-6 py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-[#ffdb82] transition-colors"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                    Add New Student
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-[#222] text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-[#333] transition-colors"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    Generate Reports
                  </motion.button>
                </div>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                className="bg-[#222] rounded-xl p-6"
              >
                <h3 className="text-lg font-semibold text-white mb-6">
                  Recent Students
                </h3>
                <motion.div variants={staggerChildren} className="space-y-4">
                  {[
                    { name: "John Doe", id: "STD001", attendance: "95%" },
                    { name: "Alice Smith", id: "STD002", attendance: "88%" },
                    { name: "Robert Johnson", id: "STD003", attendance: "92%" },
                  ].map((student, index) => (
                    <motion.div
                      key={index}
                      variants={fadeInUp}
                      className="flex items-center justify-between p-4 bg-[#1a1a1a] rounded-lg"
                    >
                      <div>
                        <div className="text-white font-medium">
                          {student.name}
                        </div>
                        <div className="text-sm text-gray-400">
                          {student.id}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-[#FFEDB1]">
                          {student.attendance}
                        </div>
                        <div className="text-sm text-gray-400">Attendance</div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="px-4 sm:px-6 py-16 bg-gradient-to-r from-[#0d0d0d] to-[#1a1a1a] relative overflow-hidden"
        >
          <motion.div
            variants={fadeInUp}
            className="container mx-auto relative z-10"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
              Ready to Start Your Learning Journey?
            </h2>
            <p className="text-gray-400 mb-8">
              Join thousands of students already benefiting from our
              comprehensive educational services.
            </p>
            <motion.div
              variants={staggerChildren}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/pricing"
                  className="bg-[#FFEDB1] text-black px-8 py-3 rounded-xl font-medium hover:bg-[#ffdb82] transition-all duration-300 inline-block"
                >
                  View Pricing
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/contact"
                  className="bg-transparent border border-[#FFEDB1] text-[#FFEDB1] px-8 py-3 rounded-xl font-medium hover:bg-[#FFEDB1] hover:text-black transition-all duration-300 inline-block"
                >
                  Contact Us
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.section>

        <Footer />
      </motion.main>
    </>
  );
}
