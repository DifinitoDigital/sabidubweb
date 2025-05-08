import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Footer from "../components/Footer";

export default function Home() {
  const [openFaq, setOpenFaq] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userName, setUserName] = useState("Guest");

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? -1 : index);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <Head>
        <title>SabiDub | Bridging Educational Excellence in Nigeria</title>
        <meta
          name="description"
          content="SabiDub - Connecting secondary and tertiary education in Nigeria through innovative technology and comprehensive learning solutions"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen bg-[#111] relative">
        {/* Navigation */}
        <nav className="px-4 sm:px-6 py-6 sm:py-8 flex items-center justify-between max-w-7xl mx-auto relative z-[60] bg-[#111]">
          <Link href="/" className="flex items-center relative z-[60]">
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
              className="text-white hover:text-[#FFEDB1] transition-colors"
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
              href="/pricing"
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
            className="md:hidden flex flex-col items-center justify-center w-10 h-10 bg-[#1a1a1a] rounded-lg hover:bg-[#252525] transition-colors relative z-[60]"
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

        {/* Sliding Menu - Mobile Only */}
        <div
          className={`md:hidden fixed top-0 right-0 w-full sm:w-80 h-full bg-[#1a1a1a] z-[50] transform transition-transform duration-300 ease-in-out ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="p-6 h-full overflow-y-auto">
            <div className="flex flex-col space-y-6">
              <div className="flex items-center justify-between mb-8">
                <div className="relative w-32 h-8">
                  <Image
                    src="/images/white.png"
                    alt="SabiDub Logo"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
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
                  href="#"
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
                  href="#"
                  className="text-gray-400 hover:text-[#FFEDB1] transition-colors py-2 border-b border-gray-800"
                  onClick={toggleMenu}
                >
                  Contact
                </Link>
              </div>

              <div className="mt-auto pt-6">
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
        </div>

        {/* Overlay */}
        {isMenuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-[40]"
            onClick={toggleMenu}
          ></div>
        )}

        {/* Hero Section */}
        <section className="px-4 sm:px-6 pt-12 sm:pt-20 pb-12 sm:pb-24 max-w-7xl mx-auto">
          <div className="text-center mb-4">
            <p className="text-gray-400 flex items-center justify-center gap-2">
              <span className="w-1 h-1 rounded-full bg-[#FFEDB1]"></span>
              Empowering Nigerian Education
            </p>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center mb-6">
            Bridging Educational Excellence
            <br className="hidden sm:block" />
            in Nigeria
          </h1>

          <p className="text-gray-400 text-center max-w-2xl mx-auto mb-8 px-4">
            Connecting secondary and tertiary education through innovative
            technology, ensuring students are well-prepared for academic success
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8 sm:mb-16 px-4">
            <button className="bg-[#FFEDB1] text-black px-6 py-3 rounded-md font-medium w-full sm:w-auto">
              Get Started
            </button>
            <button className="border border-gray-600 text-white px-6 py-3 rounded-md font-medium hover:bg-[#1a1a1a] transition-colors w-full sm:w-auto">
              Request a demo
            </button>
          </div>

          {/* App Screenshot */}
          <div className="relative max-w-4xl mx-auto px-4">
            <div className="bg-gradient-to-b from-[#FFEDB1]/20 to-transparent absolute inset-0 rounded-3xl"></div>
            <div className="relative bg-[#1a1a1a] rounded-3xl p-4 sm:p-8">
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-[#FFEDB1] rounded-full"></div>
                  <span className="text-white">95% Success</span>
                </div>
                <div className="text-gray-400">WAEC</div>
                <div className="text-gray-400">NECO</div>
                <div className="text-gray-400">JAMB</div>
              </div>

              <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
                <div>
                  <div className="text-gray-400 text-sm mb-1">
                    Students Progress
                  </div>
                  <div className="text-white text-2xl font-semibold">
                    84.3% Average
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-gray-600"></div>
                    <div className="w-8 h-8 rounded-full bg-gray-700"></div>
                    <div className="w-8 h-8 rounded-full bg-gray-800"></div>
                  </div>
                  <span className="text-gray-400">500+ Schools</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trusted By Section */}
        <section className="px-4 sm:px-6 py-8 sm:py-16 border-t border-gray-800">
          <div className="max-w-7xl mx-auto">
            <p className="text-center text-gray-400 mb-8 sm:mb-12">
              Trusted by Top Educational Institutions in Nigeria
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4 sm:gap-8 items-center justify-items-center opacity-50">
              <div className="text-gray-400 font-medium text-center">
                University of Lagos
              </div>
              <div className="text-gray-400 font-medium text-center">
                University of Ibadan
              </div>
              <div className="text-gray-400 font-medium text-center">
                Covenant University
              </div>
              <div className="text-gray-400 font-medium text-center">
                Obafemi Awolowo
              </div>
              <div className="text-gray-400 font-medium text-center">
                Ahmadu Bello
              </div>
              <div className="text-gray-400 font-medium text-center">
                University of Nigeria
              </div>
              <div className="text-gray-400 font-medium text-center">
                Federal Ministry of Education
              </div>
              <div className="text-gray-400 font-medium text-center">
                WAEC Nigeria
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="px-6 py-16">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row gap-12">
              <div className="md:w-1/2">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
                  Start Your Educational
                  <br />
                  Journey Today
                </h2>
                <p className="text-gray-400 mb-8">
                  SabiDub bridges the gap between secondary and tertiary
                  education, providing a seamless learning experience for
                  Nigerian students.
                </p>

                <div className="space-y-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-[#1a1a1a] flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-6 h-6 text-[#FFEDB1]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-2">
                        Create Your Student Profile
                      </h3>
                      <p className="text-gray-400">
                        Sign up and create your academic profile to track your
                        educational journey from secondary school through
                        university.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-[#1a1a1a] flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-6 h-6 text-[#AFF8C8]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-2">
                        Access Quality Learning Resources
                      </h3>
                      <p className="text-gray-400">
                        Get access to comprehensive study materials for WAEC,
                        NECO, JAMB and university courses with real-time
                        progress tracking.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-[#1a1a1a] flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-6 h-6 text-[#FFEDB1]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-2">
                        Connect with Educational Experts
                      </h3>
                      <p className="text-gray-400">
                        Get guidance from educational mentors who provide
                        academic advice and help you navigate your educational
                        journey.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="md:w-1/2">
                <div className="bg-[#1a1a1a] rounded-3xl p-4 sm:p-6">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-10 h-10 rounded-full bg-gray-800"></div>
                    <div>
                      <div className="text-white">Hello, {userName}</div>
                      <div className="text-gray-400 text-sm">S.S.3 Student</div>
                    </div>
                  </div>

                  <div className="bg-[#111] rounded-xl p-4 sm:p-6 mb-6">
                    <div className="text-gray-400 text-sm mb-2">
                      Academic Progress
                    </div>
                    <div className="text-white text-xl sm:text-2xl font-semibold mb-4">
                      87% Complete
                    </div>
                    <div className="flex flex-wrap gap-2 sm:gap-4">
                      <button className="bg-[#FFEDB1] text-black px-3 sm:px-4 py-2 rounded-full text-sm">
                        Study
                      </button>
                      <button className="bg-gray-800 text-white px-3 sm:px-4 py-2 rounded-full text-sm">
                        Tests
                      </button>
                      <button className="bg-gray-800 text-white px-3 sm:px-4 py-2 rounded-full text-sm">
                        Resources
                      </button>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <div className="text-white font-medium">Your Courses</div>
                      <button className="text-[#FFEDB1] text-sm">
                        See All
                      </button>
                    </div>
                    <div className="flex flex-wrap justify-start sm:justify-between gap-3 sm:gap-6">
                      {[
                        "Mathematics",
                        "English",
                        "Physics",
                        "Chemistry",
                        "Biology",
                      ].map((subject, i) => (
                        <div
                          key={i}
                          className="text-center w-[calc(20%-8px)] sm:w-auto"
                        >
                          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-800 mb-2 flex items-center justify-center text-[#AFF8C8] text-xs">
                            {subject.substring(0, 2)}
                          </div>
                          <div className="text-gray-400 text-[10px] sm:text-xs">
                            {subject}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Additional Features */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                  {/* Security and Compliance */}
                  <div className="bg-[#1a1a1a] p-6 rounded-xl">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-gray-800 flex items-center justify-center flex-shrink-0">
                        <svg
                          className="w-6 h-6 text-[#FFEDB1]"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-white font-medium mb-1">
                          Security and compliance
                        </h3>
                        <p className="text-gray-400 text-sm">
                          We work hard to secure and protect
                        </p>
                        <button className="text-[#FFEDB1] text-sm mt-2 flex items-center">
                          Learn More <span className="ml-1">→</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Integrations */}
                  <div className="bg-[#1a1a1a] p-6 rounded-xl">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-gray-800 flex items-center justify-center flex-shrink-0">
                        <svg
                          className="w-6 h-6 text-[#AFF8C8]"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 6h16M4 12h16m-7 6h7"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-white font-medium mb-1">
                          Integrations
                        </h3>
                        <p className="text-gray-400 text-sm">
                          Link to learning management tools
                        </p>
                        <button className="text-[#FFEDB1] text-sm mt-2 flex items-center">
                          Learn More <span className="ml-1">→</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Educational Features Section */}
        <section className="px-6 py-16 border-t border-gray-800">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
              <div className="md:col-span-2">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  Bridging Educational Excellence in Nigeria
                </h2>
                <p className="text-gray-400 mb-6">
                  SabiDub connects secondary and tertiary education through
                  innovative technology, ensuring students have the resources
                  they need to succeed at every level of their academic journey.
                </p>
              </div>

              <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Unified Learning Journey */}
                <div className="bg-[#1a1a1a] p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-white mb-3">
                    Unified Learning Journey
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">
                    Create a seamless path from secondary to tertiary education
                    with structured preparation and integrated resources.
                  </p>
                  <div className="bg-[#111] p-4 rounded-lg flex items-center">
                    <div className="w-12 h-12 rounded-lg bg-[#FFEDB1]/10 flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-6 h-6 text-[#FFEDB1]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                        />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm text-gray-400">
                        Completion rate
                      </div>
                      <div className="text-xl text-white font-semibold">
                        94.7%
                      </div>
                    </div>
                  </div>
                </div>

                {/* Academic Excellence */}
                <div className="bg-[#1a1a1a] p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-white mb-3">
                    Academic Excellence
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">
                    Access comprehensive exam prep tools and interactive
                    learning resources with detailed performance tracking.
                  </p>
                  <div className="bg-[#111] p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white text-sm">Progress</span>
                      <span className="text-[#AFF8C8] text-xs px-2 py-1 bg-[#AFF8C8]/10 rounded">
                        +12.5%
                      </span>
                    </div>
                    <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#AFF8C8]"
                        style={{ width: "65%" }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Student Development */}
                <div className="bg-[#1a1a1a] p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-white mb-3">
                    Student Development
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">
                    Build professional portfolios, develop critical thinking
                    skills, and engage in collaborative learning.
                  </p>
                  <div className="bg-[#111] p-4 rounded-lg flex flex-col">
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-8 h-8 rounded-full bg-[#FFEDB1]/20 flex items-center justify-center">
                        <svg
                          className="w-4 h-4 text-[#FFEDB1]"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 10V3L4 14h7v7l9-11h-7z"
                          />
                        </svg>
                      </div>
                      <div className="text-right">
                        <span className="text-white block">875</span>
                        <span className="text-gray-500 text-xs">students</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Educational Insights */}
                <div className="bg-[#1a1a1a] p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-white mb-3">
                    Educational Insights
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">
                    Gain data-driven insights into your learning style and
                    receive personalized recommendations.
                  </p>
                  <div className="bg-[#111] p-4 rounded-lg">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-[#FFEDB1] mr-2"></div>
                        <span className="text-xs text-gray-400">WAEC</span>
                      </div>
                      <span className="text-xs text-white">58%</span>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-[#AFF8C8] mr-2"></div>
                        <span className="text-xs text-gray-400">
                          University
                        </span>
                      </div>
                      <span className="text-xs text-white">42%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* The Challenge Section */}
        <section className="px-6 py-16 bg-[#0d0d0d]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                The Challenge We're Solving
              </h2>
              <p className="text-gray-400 max-w-3xl mx-auto">
                In Nigeria's educational landscape, we face a critical gap
                between secondary and tertiary education.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="bg-[#1a1a1a] p-8 rounded-2xl">
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#FFEDB1]/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-[#FFEDB1]">✓</span>
                    </div>
                    <p className="text-gray-300">
                      Lack of proper guidance during the transition from
                      secondary to tertiary education
                    </p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#FFEDB1]/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-[#FFEDB1]">✓</span>
                    </div>
                    <p className="text-gray-300">
                      Limited access to quality educational resources
                    </p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#FFEDB1]/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-[#FFEDB1]">✓</span>
                    </div>
                    <p className="text-gray-300">
                      Disconnected learning experiences between different
                      educational levels
                    </p>
                  </li>
                </ul>
              </div>
              <div className="bg-[#1a1a1a] p-8 rounded-2xl">
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#AFF8C8]/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-[#AFF8C8]">✓</span>
                    </div>
                    <p className="text-gray-300">
                      Insufficient preparation for higher education challenges
                    </p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#AFF8C8]/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-[#AFF8C8]">✓</span>
                    </div>
                    <p className="text-gray-300">
                      Poor tracking of academic progress across educational
                      journey
                    </p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#AFF8C8]/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-[#AFF8C8]">✓</span>
                    </div>
                    <p className="text-gray-300">
                      Lack of integrated systems connecting secondary and
                      tertiary education
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Why SabiDub Section */}
        <section className="px-6 py-16">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Why SabiDub?
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Bridge the Gap */}
              <div className="bg-[#1a1a1a] rounded-2xl p-8 hover:bg-[#212121] transition-colors border border-gray-800">
                <div className="w-14 h-14 rounded-lg bg-[#FFEDB1]/10 flex items-center justify-center mb-6">
                  <svg
                    className="w-8 h-8 text-[#FFEDB1]"
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
                </div>
                <h3 className="text-white font-semibold text-xl mb-4">
                  Bridge the Gap
                </h3>
                <ul className="text-gray-400 space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="text-[#FFEDB1]">•</span>
                    <span>Connect secondary schools with universities</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FFEDB1]">•</span>
                    <span>Prepare for higher education challenges</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FFEDB1]">•</span>
                    <span>Early exposure to tertiary requirements</span>
                  </li>
                </ul>
              </div>

              {/* Empower Students */}
              <div className="bg-[#1a1a1a] rounded-2xl p-8 hover:bg-[#212121] transition-colors border border-gray-800">
                <div className="w-14 h-14 rounded-lg bg-[#AFF8C8]/10 flex items-center justify-center mb-6">
                  <svg
                    className="w-8 h-8 text-[#AFF8C8]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905 0 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                    />
                  </svg>
                </div>
                <h3 className="text-white font-semibold text-xl mb-4">
                  Empower Students
                </h3>
                <ul className="text-gray-400 space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="text-[#AFF8C8]">•</span>
                    <span>Access to quality educational resources</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#AFF8C8]">•</span>
                    <span>Real-time performance tracking</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#AFF8C8]">•</span>
                    <span>Career guidance and development</span>
                  </li>
                </ul>
              </div>

              {/* Transform Education */}
              <div className="bg-[#1a1a1a] rounded-2xl p-8 hover:bg-[#212121] transition-colors border border-gray-800">
                <div className="w-14 h-14 rounded-lg bg-[#FFEDB1]/10 flex items-center justify-center mb-6">
                  <svg
                    className="w-8 h-8 text-[#FFEDB1]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                    />
                  </svg>
                </div>
                <h3 className="text-white font-semibold text-xl mb-4">
                  Transform Education
                </h3>
                <ul className="text-gray-400 space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="text-[#FFEDB1]">•</span>
                    <span>Modernize Nigerian education system</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FFEDB1]">•</span>
                    <span>Create data-driven educational insights</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FFEDB1]">•</span>
                    <span>Foster academic excellence</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Our Impact */}
        <section className="px-6 py-16 bg-[#111]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-6">
              <div className="inline-block bg-[#FFEDB1]/10 text-[#FFEDB1] px-3 py-1 rounded-full text-sm font-medium mb-3">
                <span className="flex items-center gap-1">
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
                  </svg>
                  Impact
                </span>
              </div>
              <h2 className="text-3xl font-bold text-white">
                Educational Growth{" "}
                <span className="text-[#FFEDB1]">Made Easy</span>
              </h2>
              <p className="text-gray-400 mt-2">
                Study less and learn more effectively for all your exams
              </p>
            </div>

            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="relative">
                <div className="bg-[#1a1a1a] rounded-3xl p-5 relative z-10">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 bg-[#FFEDB1]/20 rounded-full flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-[#FFEDB1]"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 3c-2.33 0-4.31 1.46-5.11 3.5h10.22c-.8-2.04-2.78-3.5-5.11-3.5z" />
                      </svg>
                    </div>
                    <img
                      src="/images/favicon white.png"
                      alt="SabiDub"
                      className="h-6"
                    />
                  </div>

                  <div className="mt-10 relative">
                    <div className="absolute -left-6 -top-6">
                      <div className="w-12 h-12 rounded-full bg-[#1a1a1a] shadow-sm flex items-center justify-center overflow-hidden">
                        <img
                          src="/images/jnr.jpg"
                          alt="Student"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>

                    <div className="bg-[#FFEDB1] text-[#111] p-6 rounded-xl rounded-tl-none">
                      <h3 className="text-lg font-medium mb-2">
                        Increase your
                        <br />
                        Academic Performance{" "}
                        <span className="text-xs bg-[#111]/10 rounded px-1 py-0.5 ml-1">
                          📈 Globally
                        </span>
                      </h3>
                      <p className="text-sm text-[#111]/80">
                        SabiDub has helped me bridge the gap between secondary
                        and university education, making my transition seamless
                        and boosting my scores.
                      </p>

                      <button className="mt-4 bg-[#111] text-[#FFEDB1] px-4 py-2 rounded-full text-sm font-medium">
                        Get Started →
                      </button>
                    </div>

                    <div className="absolute -right-4 -bottom-4">
                      <div className="w-12 h-12 rounded-full bg-[#1a1a1a] shadow-sm flex items-center justify-center overflow-hidden">
                        <img
                          src="/images/jnr.jpg"
                          alt="Student"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 w-full h-1/2 bg-[#FFEDB1]/10 -z-10 rounded-3xl"></div>
              </div>

              <div>
                <div className="flex items-center mb-8">
                  <div className="w-12 h-12 bg-[#FFEDB1]/20 rounded-full flex items-center justify-center mr-4">
                    <svg
                      className="w-6 h-6 text-[#FFEDB1]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Easy Growth</h3>
                    <p className="text-gray-400 text-sm">Easy Education.</p>
                  </div>
                </div>

                <div className="space-y-8 pl-4 border-l-2 border-gray-800">
                  <div className="relative">
                    <div className="absolute -left-[25px] top-0 w-12 h-12 bg-[#FFEDB1]/20 rounded-full flex items-center justify-center">
                      <div className="w-6 h-6 bg-[#FFEDB1] rounded-full"></div>
                    </div>
                    <div className="pl-8">
                      <h4 className="text-white font-medium">
                        We make Education Simple
                      </h4>
                      <p className="text-gray-400 text-sm mt-1">
                        Our platform connects secondary and tertiary education,
                        closing the gap between educational levels.
                      </p>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="absolute -left-[25px] top-0 w-12 h-12 bg-[#AFF8C8]/20 rounded-full flex items-center justify-center">
                      <div className="w-6 h-6 bg-[#AFF8C8] rounded-full"></div>
                    </div>
                    <div className="pl-8">
                      <h4 className="text-white font-medium">
                        High-Quality Services
                      </h4>
                      <p className="text-gray-400 text-sm mt-1">
                        Unlimited educational resources, study materials, and
                        practice tests with real-time performance tracking.
                      </p>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="absolute -left-[25px] top-0 w-12 h-12 bg-[#FFEDB1]/20 rounded-full flex items-center justify-center">
                      <div className="w-6 h-6 bg-[#FFEDB1] rounded-full"></div>
                    </div>
                    <div className="pl-8">
                      <h4 className="text-white font-medium">
                        Measurable Results
                      </h4>
                      <p className="text-gray-400 text-sm mt-1">
                        95% of our students report better grades and smoother
                        transitions to university education.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Impact Statistics */}
        <section className="px-6 py-16 bg-[#1a1a1a]">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-[#FFEDB1] text-4xl font-bold mb-2">
                  500K+
                </div>
                <p className="text-gray-400">Active Students</p>
              </div>
              <div>
                <div className="text-[#AFF8C8] text-4xl font-bold mb-2">
                  95%
                </div>
                <p className="text-gray-400">Success Rate</p>
              </div>
              <div>
                <div className="text-[#FFEDB1] text-4xl font-bold mb-2">
                  1000+
                </div>
                <p className="text-gray-400">Educational Resources</p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="px-6 py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Transform Your Educational Journey?
            </h2>
            <p className="text-gray-400 mb-8">
              Join thousands of students already benefiting from our
              comprehensive educational platform
            </p>
            <button className="bg-[#FFEDB1] text-black px-8 py-3 rounded-md font-medium hover:bg-[#AFF8C8] transition-colors">
              Get Started Today
            </button>
          </div>
        </section>

        {/* Premium Benefits Section */}
        <section className="px-4 sm:px-6 py-8 sm:py-16 bg-[#111]">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 gap-6 sm:gap-10">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                  Unlock Premium Benefits with
                  <br className="hidden sm:block" />
                  Our Advanced Features
                </h2>
                <p className="text-gray-400 mb-6">
                  Simplify your educational journey with our easy-to-use,
                  scalable SabiDub platform. Built for Nigerian students, our
                  tools make complex educational processes simple.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-6 sm:mt-10">
              {/* AI-Powered Learning */}
              <div className="bg-[#1a1a1a] p-4 sm:p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-white mb-3">
                  AI-Powered Assistance
                </h3>
                <p className="text-gray-400 text-sm mb-6">
                  Access a tailored AI assistant that adapts to your learning
                  needs, delivering personalized educational insights.
                </p>
                <div className="flex items-center justify-center">
                  <div className="w-full flex flex-col items-center">
                    <div className="text-right w-full">
                      <span className="text-[#FFEDB1] font-bold">
                        ₦ 18,073.49
                      </span>
                    </div>
                    <div className="h-14 w-full mt-2">
                      <div className="w-full h-10 bg-gradient-to-r from-[#FFEDB1]/40 to-[#FFEDB1] rounded-md flex items-center justify-start pl-4">
                        <span className="text-xs text-gray-800">
                          Main Subjects
                        </span>
                      </div>
                    </div>
                    <div className="text-right w-full mt-1">
                      <span className="text-[#AFF8C8] text-xs">+9.5%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Exclusive Resources */}
              <div className="bg-[#1a1a1a] p-4 sm:p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-white mb-3">
                  Exclusive Features
                </h3>
                <p className="text-gray-400 text-sm mb-6">
                  Unlock advanced features like enhanced analytics, deeper
                  customization, and priority mentorship.
                </p>
                <div className="flex items-center justify-center">
                  <div className="bg-[#111] rounded-lg p-4 w-full">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">
                        Unlock all features
                      </span>
                      <span className="text-xs bg-[#FFEDB1] text-gray-800 px-2 py-1 rounded-full">
                        625+ resources
                      </span>
                    </div>
                    <div className="mt-6">
                      <img
                        src="/images/jnr.jpg"
                        alt="Student Profile"
                        className="w-16 h-16 rounded-full mx-auto"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Growth Rate */}
              <div className="bg-[#1a1a1a] p-4 sm:p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-white mb-3">
                  Growth rate
                </h3>
                <p className="text-gray-400 text-sm mb-6">
                  The growth rate is a crucial metric in educational management
                  that measures the increase in a student's performance.
                </p>
                <div className="flex flex-col items-center">
                  <div className="text-[#AFF8C8] text-4xl font-bold">36%</div>
                  <div className="text-gray-600 text-sm">Growth rate</div>
                  <div className="w-full h-16 mt-2">
                    <div className="flex items-end justify-between h-full">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                        <div
                          key={i}
                          className={`w-2 ${
                            i === 7
                              ? "h-full bg-[#AFF8C8]"
                              : "h-1/2 bg-gray-200"
                          } rounded-sm mx-1`}
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Activity Manager */}
              <div className="bg-[#1a1a1a] p-4 sm:p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-white mb-3">
                  Study Planner Tools
                </h3>
                <p className="text-gray-400 text-sm mb-6">
                  A Study Planner is a tool that allows students to manage
                  tasks, track assignments, and organize study sessions
                  efficiently.
                </p>
                <div className="bg-[#111] rounded-lg p-3 w-full">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm text-[#0F2830] font-semibold">
                      Study manager
                    </span>
                    <span className="text-xs text-gray-500">View details</span>
                  </div>
                  <div className="space-y-2">
                    {["Mathematics", "English", "Physics"].map((subject) => (
                      <div
                        key={subject}
                        className="flex items-center bg-white p-2 rounded text-[#0F2830]"
                      >
                        <div
                          className={`w-3 h-3 rounded-full ${
                            subject === "Mathematics"
                              ? "bg-[#0F2830]"
                              : subject === "English"
                              ? "bg-[#AFF8C8]"
                              : "bg-gray-400"
                          } mr-2`}
                        ></div>
                        <span className="text-xs">{subject}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="px-6 py-16 bg-[#111]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                What Our Students Say
              </h2>
              <p className="text-gray-400 max-w-3xl mx-auto">
                Hear from our students about how SabiDub has transformed their
                educational journey
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Testimonial 1 */}
              <div className="bg-[#1a1a1a] p-6 rounded-xl">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-[#FFEDB1]/20 flex items-center justify-center">
                    <span className="text-[#FFEDB1] text-xl font-semibold">
                      C
                    </span>
                  </div>
                  <div>
                    <div className="text-white font-medium">Chioma Okonkwo</div>
                    <div className="text-gray-400 text-sm">SS3 Student</div>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className="w-5 h-5 text-[#FFEDB1]"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-400 mb-4">
                  "SabiDub has been instrumental in my WAEC preparation. The
                  personalized study plans and practice tests have boosted my
                  confidence significantly."
                </p>
                <div className="text-[#FFEDB1] text-sm">Verified Student</div>
              </div>

              {/* Testimonial 2 */}
              <div className="bg-[#1a1a1a] p-6 rounded-xl">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-[#AFF8C8]/20 flex items-center justify-center">
                    <span className="text-[#AFF8C8] text-xl font-semibold">
                      O
                    </span>
                  </div>
                  <div>
                    <div className="text-white font-medium">
                      Oluwaseun Adeleke
                    </div>
                    <div className="text-gray-400 text-sm">
                      University Freshman
                    </div>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className="w-5 h-5 text-[#FFEDB1]"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-400 mb-4">
                  "The transition from secondary school to university was smooth
                  thanks to SabiDub. Their resources helped me maintain my
                  academic excellence."
                </p>
                <div className="text-[#FFEDB1] text-sm">Verified Student</div>
              </div>

              {/* Testimonial 3 */}
              <div className="bg-[#1a1a1a] p-6 rounded-xl">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-[#FFEDB1]/20 flex items-center justify-center">
                    <span className="text-[#FFEDB1] text-xl font-semibold">
                      A
                    </span>
                  </div>
                  <div>
                    <div className="text-white font-medium">Amina Ibrahim</div>
                    <div className="text-gray-400 text-sm">SS2 Student</div>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className="w-5 h-5 text-[#FFEDB1]"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-400 mb-4">
                  "The AI-powered assistance and personalized study plans have
                  helped me improve my grades dramatically. I'm more confident
                  than ever!"
                </p>
                <div className="text-[#FFEDB1] text-sm">Verified Student</div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="px-4 sm:px-6 py-8 sm:py-16 bg-[#111]">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row gap-6 sm:gap-10">
              <div className="w-full md:w-1/3">
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
                  Frequently
                  <br className="hidden sm:block" />
                  Asked
                  <br className="hidden sm:block" />
                  Questions
                </h2>
                <p className="text-gray-400 mb-4">Ask any questions</p>
                <a
                  href="mailto:support@sabidub.com"
                  className="text-[#FFEDB1] font-medium hover:underline"
                >
                  support@sabidub.com
                </a>
              </div>

              <div className="w-full md:w-2/3">
                <div className="space-y-3">
                  <div className="border-b border-gray-800">
                    <button
                      className="w-full py-4 flex items-center justify-between text-left"
                      onClick={() => toggleFaq(0)}
                    >
                      <span className="text-white font-medium">
                        Can I use the service for both secondary and university
                        education?
                      </span>
                      <span className="text-gray-400">
                        {openFaq === 0 ? "−" : "+"}
                      </span>
                    </button>
                    {openFaq === 0 && (
                      <div className="pb-4">
                        <p className="text-gray-400 text-sm">
                          Yes, our platform supports both secondary and tertiary
                          education needs. We provide resources for
                          WAEC/NECO/JAMB preparation and offer specialized
                          content for various university courses and subjects.
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="border-b border-gray-800">
                    <button
                      className="w-full py-4 flex items-center justify-between text-left"
                      onClick={() => toggleFaq(1)}
                    >
                      <span className="text-white font-medium">
                        What is the maximum number of subjects I can access?
                      </span>
                      <span className="text-gray-400">
                        {openFaq === 1 ? "−" : "+"}
                      </span>
                    </button>
                    {openFaq === 1 && (
                      <div className="pb-4">
                        <p className="text-gray-400 text-sm">
                          Our standard plan gives you access to all subjects in
                          your current educational level. Premium subscribers
                          get unlimited access to all subjects across secondary
                          and tertiary levels.
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="border-b border-gray-800">
                    <button
                      className="w-full py-4 flex items-center justify-between text-left"
                      onClick={() => toggleFaq(2)}
                    >
                      <span className="text-white font-medium">
                        How do I update my student account information?
                      </span>
                      <span className="text-gray-400">
                        {openFaq === 2 ? "−" : "+"}
                      </span>
                    </button>
                    {openFaq === 2 && (
                      <div className="pb-4">
                        <p className="text-gray-400 text-sm">
                          You can update your profile information from your
                          account dashboard. Navigate to "Profile Settings" and
                          you'll be able to edit your personal details,
                          educational information, and preferences.
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="border-b border-gray-800">
                    <button
                      className="w-full py-4 flex items-center justify-between text-left"
                      onClick={() => toggleFaq(3)}
                    >
                      <span className="text-white font-medium">
                        Are there any benefits for frequent users?
                      </span>
                      <span className="text-gray-400">
                        {openFaq === 3 ? "−" : "+"}
                      </span>
                    </button>
                    {openFaq === 3 && (
                      <div className="pb-4">
                        <p className="text-gray-400 text-sm">
                          Yes! We have a rewards system that gives frequent
                          users access to additional resources, personalized
                          study plans, and special webinars with educational
                          experts as you reach certain milestones.
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="border-b border-gray-800">
                    <button
                      className="w-full py-4 flex items-center justify-between text-left"
                      onClick={() => toggleFaq(4)}
                    >
                      <span className="text-white font-medium">
                        Can I access my account from multiple devices?
                      </span>
                      <span className="text-gray-400">
                        {openFaq === 4 ? "−" : "+"}
                      </span>
                    </button>
                    {openFaq === 4 && (
                      <div className="pb-4">
                        <p className="text-gray-400 text-sm">
                          Absolutely! Your SabiDub account can be accessed from
                          any device with an internet connection. Your progress,
                          saved resources, and preferences will automatically
                          sync across all your devices.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Smooth Learning Experience */}
        <section className="px-6 py-16 bg-[#111]">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row gap-12">
              <div className="md:w-1/2">
                <h2 className="text-2xl font-bold text-white mb-4">
                  Smooth and Easy
                  <br />
                  Educational
                  <br />
                  Experience
                </h2>
                <p className="text-gray-400 mb-6">
                  With user-friendly features, comprehensive and logical tests,
                  and careful attention to educational standards, our platform
                  simplifies learning processes.
                </p>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <svg
                      className="w-5 h-5 text-[#FFEDB1]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-gray-700">
                      Seamless transition between educational levels
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg
                      className="w-5 h-5 text-[#FFEDB1]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-gray-700">
                      Comprehensive exchange across different subjects
                    </span>
                  </div>
                </div>

                <button className="mt-6 bg-[#111] text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors">
                  Get Started
                </button>
              </div>

              <div className="md:w-1/2">
                <div className="bg-[#1a1a1a] p-6 rounded-lg shadow-sm">
                  <div className="flex justify-between mb-8">
                    <div>
                      <img
                        src="/images/favicon white.png  "
                        alt="SabiDub"
                        className="w-8 h-8 mb-2"
                      />
                      <div className="text-xs text-gray-500">Study Tracker</div>
                    </div>
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                      <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                      <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <div className="text-xs text-gray-500">From Subject</div>
                      <div className="flex items-center gap-1">
                        <div className="w-5 h-5 bg-gray-200 rounded-full flex items-center justify-center">
                          <span className="text-[8px]">Ma</span>
                        </div>
                        <span className="text-sm text-white">Mathematics</span>
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 ">To Subject</div>
                      <div className="flex items-center gap-1">
                        <div className="w-5 h-5 bg-gray-200 rounded-full flex items-center justify-center">
                          <span className="text-[8px]">Ph</span>
                        </div>
                        <span className="text-sm text-white">Physics</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-lg mb-4">
                    <div className="text-center text-2xl font-bold text-gray-800 mb-1">
                      ₦ 3,200.00
                    </div>
                    <div className="flex justify-center">
                      <div className="text-xs text-gray-500">Study Credits</div>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <div className="w-10 h-6 rounded-full bg-gray-200 flex items-center justify-center">
                      <div className="w-5 h-5 rounded-full bg-[#FFEDB1]"></div>
                    </div>
                    <div className="border-t border-dashed border-gray-300 w-32 h-0 mt-3"></div>
                    <div className="w-10 h-6 rounded-full bg-gray-200 flex items-center justify-center">
                      <div className="w-5 h-5 rounded-full bg-[#AFF8C8]"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="px-6 py-12 bg-[#111]">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap justify-between items-center">
              <div className="flex items-center gap-3 mb-4 md:mb-0">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-[#1a1a1a] border-2 border-[#111]"
                    ></div>
                  ))}
                </div>
                <div>
                  <div className="text-white font-bold">120K+</div>
                  <div className="text-xs text-gray-400">
                    Our platform is a trusted choice for many students
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-4 md:mb-0">
                <div className="text-yellow-500 text-xl">★</div>
                <div>
                  <div className="text-white font-bold">4.9</div>
                  <div className="text-xs text-gray-500">
                    Our high rating proves our platform's quality and positive
                    user reviews
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <div>
                  <div className="text-white font-bold">89+</div>
                  <div className="text-xs text-gray-500">
                    Our global presence ensures reliable, efficient local
                    solutions
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Add Footer at the bottom of main */}
        <Footer />
      </main>
    </>
  );
}
