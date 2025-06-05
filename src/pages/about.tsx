import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import Footer from "../components/Footer";
import { useState } from "react";
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

export default function About() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <Head>
        <title>
          About SabiDub | Bridging Educational Excellence in Nigeria
        </title>
        <meta
          name="description"
          content="Learn about SabiDub's mission to bridge the gap between secondary and tertiary education in Nigeria"
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
              className="text-white hover:text-[#FFEDB1] transition-colors"
            >
              About
            </Link>
            <Link
              href="/services"
              className="text-gray-400 hover:text-[#FFEDB1] transition-colors"
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
              href="/competition"
              className="text-gray-400 hover:text-[#FFEDB1] transition-colors"
            >
              Competition
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
                  className="text-white hover:text-[#FFEDB1] transition-colors py-2 border-b border-gray-800"
                  onClick={toggleMenu}
                >
                  About
                </Link>
                <Link
                  href="/services"
                  className="text-gray-400 hover:text-[#FFEDB1] transition-colors py-2 border-b border-gray-800"
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
                  href="/competition"
                  className="text-gray-400 hover:text-[#FFEDB1] transition-colors py-2 border-b border-gray-800"
                  onClick={toggleMenu}
                >
                  Competition
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

        {/* Our Story Section */}
        <motion.section
          variants={fadeInUp}
          className="px-6 sm:px-6 pt-16 sm:pt-20 pb-16 sm:pb-24 max-w-7xl mx-auto"
        >
          <motion.div variants={fadeInUp} className="text-center mb-8">
            <p className="text-[#FFEDB1] uppercase tracking-wider text-sm font-medium">
              OUR STORY
            </p>
          </motion.div>

          <div className="flex flex-col lg:flex-row gap-12 mt-8">
            <motion.div variants={fadeInUp} className="lg:w-1/2 px-4 sm:px-0">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
                Empowering Nigerian Education Through{" "}
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-[#FFEDB1]"
                >
                  Digital Innovation
                </motion.span>
              </h1>
              <motion.p variants={fadeIn} className="text-gray-400 mb-8">
                At SabiDub, we're revolutionizing education in Nigeria by
                bridging the gap between secondary and tertiary education.
              </motion.p>

              <motion.div
                variants={staggerChildren}
                className="grid grid-cols-2 sm:grid-cols-4 gap-8 mt-12"
              >
                {[
                  { number: "50k+", label: "Active Students" },
                  { number: "100+", label: "Expert Tutors" },
                  { number: "1k+", label: "Video Lessons" },
                  { number: "95%", label: "Success Rate" },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    variants={fadeInUp}
                    className="text-center"
                  >
                    <motion.h3
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="text-3xl font-bold text-[#FFEDB1] mb-2"
                    >
                      {stat.number}
                    </motion.h3>
                    <p className="text-gray-400">{stat.label}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="lg:w-1/2 grid grid-cols-2 gap-4 px-4 sm:px-0"
            >
              {[
                {
                  src: "/images/2151447790.jpg",
                  alt: "Students Learning",
                  label: "Learning",
                },
                {
                  src: "/images/2151104075.jpg",
                  alt: "Virtual Classroom",
                  label: "Virtual Class",
                },
              ].map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className="relative h-64 rounded-lg overflow-hidden"
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover"
                  />
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 + index * 0.2 }}
                    className="absolute top-4 left-4 bg-[#FFEDB1] px-3 py-1 rounded-full"
                  >
                    <span className="text-black text-sm font-medium">
                      {image.label}
                    </span>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* Mission & Vision Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="px-6 sm:px-6 py-16 bg-[#1a1a1a]"
        >
          <div className="max-w-7xl mx-auto">
            <motion.div
              variants={staggerChildren}
              className="grid md:grid-cols-2 gap-8 md:gap-12"
            >
              {[
                {
                  title: "Our Mission",
                  content: "To democratize quality education in Nigeria...",
                },
                {
                  title: "Our Vision",
                  content:
                    "To become Nigeria's leading educational technology platform...",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className="bg-[#222] p-6 sm:p-8 rounded-xl"
                >
                  <motion.h3
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="text-2xl font-bold text-[#FFEDB1] mb-4"
                  >
                    {item.title}
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="text-gray-400"
                  >
                    {item.content}
                  </motion.p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* Timeline Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="px-6 sm:px-6 py-16 bg-[#111]"
        >
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-12">
              <motion.div variants={fadeInUp} className="lg:w-1/2 px-4 sm:px-0">
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
                  Our Journey To{" "}
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-[#FFEDB1]"
                  >
                    Educational Excellence
                  </motion.span>
                </h2>
                <p className="text-gray-400 mb-8">
                  From our humble beginnings to becoming a leading EdTech
                  platform in Nigeria, we've remained committed to transforming
                  education through innovation and accessibility.
                </p>
                <button className="bg-[#FFEDB1] text-black px-6 py-3 rounded-md font-medium hover:bg-[#ffdb82] transition-colors">
                  Join Our Journey
                </button>
              </motion.div>

              <motion.div variants={fadeInUp} className="lg:w-1/2 px-4 sm:px-0">
                <div className="relative">
                  <div className="absolute left-4 h-full w-0.5 bg-[#333]"></div>
                  <div className="space-y-8">
                    <div className="relative pl-8">
                      <div className="absolute left-0 w-8 h-8 bg-[#FFEDB1] rounded-full -translate-x-1/2 flex items-center justify-center">
                        <span className="text-black font-bold">1</span>
                      </div>
                      <h3 className="text-white font-semibold">2021</h3>
                      <p className="text-gray-400">Platform Launch</p>
                    </div>
                    <div className="relative pl-8">
                      <div className="absolute left-0 w-8 h-8 bg-[#FFEDB1] rounded-full -translate-x-1/2 flex items-center justify-center">
                        <span className="text-black font-bold">2</span>
                      </div>
                      <h3 className="text-white font-semibold">2022</h3>
                      <p className="text-gray-400">Mobile App Release</p>
                    </div>
                    <div className="relative pl-8">
                      <div className="absolute left-0 w-8 h-8 bg-[#FFEDB1] rounded-full -translate-x-1/2 flex items-center justify-center">
                        <span className="text-black font-bold">3</span>
                      </div>
                      <h3 className="text-white font-semibold">2023</h3>
                      <p className="text-gray-400">50,000 Active Users</p>
                    </div>
                    <div className="relative pl-8">
                      <div className="absolute left-0 w-8 h-8 bg-[#FFEDB1] rounded-full -translate-x-1/2 flex items-center justify-center">
                        <span className="text-black font-bold">4</span>
                      </div>
                      <h3 className="text-white font-semibold">2024</h3>
                      <p className="text-gray-400">Pan-Nigerian Expansion</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Features Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="px-6 sm:px-6 py-24 bg-[#1a1a1a] relative overflow-hidden"
        >
          {/* Background Decorative Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#FFEDB1]/5 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#FFEDB1]/5 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('/images/grid.svg')] opacity-5"></div>
          </div>

          <div className="max-w-7xl mx-auto relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <span className="text-[#FFEDB1] text-sm font-medium tracking-wider uppercase mb-4 block">
                  Why Choose Us
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                  Experience Excellence with{" "}
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-[#FFEDB1] relative"
                  >
                    SabiDub
                    <svg
                      className="absolute -bottom-2 left-0 w-full"
                      viewBox="0 0 100 20"
                      preserveAspectRatio="none"
                    >
                      <motion.path
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.5 }}
                        d="M0 12.5C20 12.5 40 17.5 50 17.5C60 17.5 80 12.5 100 12.5"
                        stroke="#FFEDB1"
                        strokeWidth="2"
                        fill="none"
                        strokeDasharray="0 1"
                      />
                    </svg>
                  </motion.span>
                </h2>
                <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                  Discover why thousands of students and educators choose
                  SabiDub for their educational journey
                </p>
              </motion.div>
            </motion.div>

            <motion.div
              variants={staggerChildren}
              className="grid md:grid-cols-3 gap-8 px-4 sm:px-0"
            >
              {[
                {
                  icon: (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  ),
                  title: "Comprehensive Curriculum",
                  description:
                    "Aligned with Nigerian educational standards and designed for optimal learning outcomes.",
                  stats: "20+ Subjects",
                  highlight: "WAEC Aligned",
                },
                {
                  icon: (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  ),
                  title: "Interactive Learning",
                  description:
                    "Engaging video lessons, quizzes, and practical exercises for better understanding.",
                  stats: "1000+ Videos",
                  highlight: "HD Quality",
                },
                {
                  icon: (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  ),
                  title: "Expert Support",
                  description:
                    "Access to qualified tutors and a supportive learning community.",
                  stats: "50+ Experts",
                  highlight: "24/7 Support",
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className="group"
                >
                  <div className="bg-[#222] rounded-2xl p-8 h-full transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl relative">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#FFEDB1] to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

                    {/* Icon */}
                    <div className="w-14 h-14 bg-[#FFEDB1] rounded-xl flex items-center justify-center mb-6 transform transition-transform group-hover:rotate-6">
                      <svg
                        className="w-7 h-7 text-black"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        {feature.icon}
                      </svg>
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-[#FFEDB1] transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 mb-6">{feature.description}</p>

                    {/* Stats & Highlight */}
                    <div className="flex items-center justify-between mt-auto pt-6 border-t border-gray-800">
                      <div className="text-[#FFEDB1] font-semibold">
                        {feature.stats}
                      </div>
                      <span className="bg-[#FFEDB1]/10 text-[#FFEDB1] text-sm py-1 px-3 rounded-full">
                        {feature.highlight}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Bottom CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="mt-16 text-center"
            >
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-[#FFEDB1] text-black px-6 py-3 rounded-lg hover:bg-[#ffdb82] transition-colors font-medium group"
              >
                Start Learning Today
                <svg
                  className="w-5 h-5 transform transition-transform group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            </motion.div>
          </div>
        </motion.section>

        {/* Team Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="px-6 sm:px-6 py-16 bg-[#111]"
        >
          <div className="max-w-7xl mx-auto">
            <motion.div variants={fadeInUp} className="text-center mb-12 px-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                Meet Our{" "}
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-[#FFEDB1]"
                >
                  Expert Team
                </motion.span>
              </h2>
            </motion.div>

            <motion.div
              variants={staggerChildren}
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 px-4 sm:px-0"
            >
              <div className="bg-[#1a1a1a] rounded-xl overflow-hidden group">
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src="/images/team/ceo.jpg"
                    alt="CEO"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-white font-semibold text-lg">
                      Dr. Samuel Okonjo
                    </h3>
                    <p className="text-[#FFEDB1]">CEO & Founder</p>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-gray-400 text-sm">
                    Former Education Policy Advisor with 15+ years experience in
                    EdTech and curriculum development.
                  </p>
                  <div className="flex space-x-4 mt-4">
                    <a href="#" className="text-gray-400 hover:text-[#FFEDB1]">
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                    </a>
                    <a href="#" className="text-gray-400 hover:text-[#FFEDB1]">
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-[#1a1a1a] rounded-xl overflow-hidden group">
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src="/images/team/cto.jpg"
                    alt="CTO"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-white font-semibold text-lg">
                      Amina Ibrahim
                    </h3>
                    <p className="text-[#FFEDB1]">Chief Technology Officer</p>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-gray-400 text-sm">
                    Tech innovator with extensive experience in building
                    scalable educational platforms.
                  </p>
                  <div className="flex space-x-4 mt-4">
                    <a href="#" className="text-gray-400 hover:text-[#FFEDB1]">
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                    </a>
                    <a href="#" className="text-gray-400 hover:text-[#FFEDB1]">
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-[#1a1a1a] rounded-xl overflow-hidden group">
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src="/images/team/academic.jpg"
                    alt="Academic Director"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-white font-semibold text-lg">
                      Prof. Oluwaseun Adeleke
                    </h3>
                    <p className="text-[#FFEDB1]">Academic Director</p>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-gray-400 text-sm">
                    Leading curriculum development with 20+ years of experience
                    in Nigerian education system.
                  </p>
                  <div className="flex space-x-4 mt-4">
                    <a href="#" className="text-gray-400 hover:text-[#FFEDB1]">
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                    </a>
                    <a href="#" className="text-gray-400 hover:text-[#FFEDB1]">
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-[#1a1a1a] rounded-xl overflow-hidden group">
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src="/images/team/product.jpg"
                    alt="Product Lead"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-white font-semibold text-lg">
                      Chioma Nnamdi
                    </h3>
                    <p className="text-[#FFEDB1]">Product Lead</p>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-gray-400 text-sm">
                    Passionate about creating intuitive educational products
                    that drive student engagement.
                  </p>
                  <div className="flex space-x-4 mt-4">
                    <a href="#" className="text-gray-400 hover:text-[#FFEDB1]">
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                    </a>
                    <a href="#" className="text-gray-400 hover:text-[#FFEDB1]">
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="mt-12 text-center px-4 sm:px-0">
              <button className="bg-[#FFEDB1] text-black px-8 py-3 rounded-md font-medium hover:bg-[#ffdb82] transition-colors">
                Join Our Team
              </button>
            </div>
          </div>
        </motion.section>

        <Footer />
      </motion.main>
    </>
  );
}
