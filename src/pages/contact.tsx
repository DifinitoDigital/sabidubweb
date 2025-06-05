import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Footer from "../components/Footer";
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from "react-icons/fa";

export default function Contact() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <Head>
        <title>Contact Us - SabiDub | Educational Excellence in Nigeria</title>
        <meta
          name="description"
          content="Get in touch with SabiDub for any questions about our educational services. We're here to help you succeed."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen bg-[#111]">
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
              className="text-white hover:text-[#FFEDB1] transition-colors"
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
                  className="text-white hover:text-[#FFEDB1] transition-colors py-2 border-b border-gray-800"
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

        {/* Contact Header */}
        <section className="px-4 sm:px-6 pt-12 sm:pt-20 pb-16">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
              Get in Touch
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Have questions about our services? We're here to help you achieve
              your educational goals.
            </p>
          </div>
        </section>

        {/* Contact Information */}
        <section className="px-4 sm:px-6 py-16 bg-[#0d0d0d]">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-[#1a1a1a] p-6 rounded-xl text-center">
                <div className="text-[#FFEDB1] flex justify-center mb-4">
                  <FaMapMarkerAlt size={32} />
                </div>
                <h3 className="text-white font-semibold mb-2">Visit Us</h3>
                <p className="text-gray-400">
                  123 Education Street
                  <br />
                  Lagos, Nigeria
                </p>
              </div>

              <div className="bg-[#1a1a1a] p-6 rounded-xl text-center">
                <div className="text-[#FFEDB1] flex justify-center mb-4">
                  <FaPhone size={32} />
                </div>
                <h3 className="text-white font-semibold mb-2">Call Us</h3>
                <p className="text-gray-400">
                  <a
                    href="tel:+2348012345678"
                    className="hover:text-[#FFEDB1] transition-colors"
                  >
                    +234 801 234 5678
                  </a>
                </p>
              </div>

              <div className="bg-[#1a1a1a] p-6 rounded-xl text-center">
                <div className="text-[#FFEDB1] flex justify-center mb-4">
                  <FaEnvelope size={32} />
                </div>
                <h3 className="text-white font-semibold mb-2">Email Us</h3>
                <p className="text-gray-400">
                  <a
                    href="mailto:info@sabidu.com"
                    className="hover:text-[#FFEDB1] transition-colors"
                  >
                    info@sabidu.com
                  </a>
                </p>
              </div>

              <div className="bg-[#1a1a1a] p-6 rounded-xl text-center">
                <div className="text-[#FFEDB1] flex justify-center mb-4">
                  <FaClock size={32} />
                </div>
                <h3 className="text-white font-semibold mb-2">Working Hours</h3>
                <p className="text-gray-400">
                  Mon - Fri: 8am - 6pm
                  <br />
                  Sat: 9am - 3pm
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="px-4 sm:px-6 py-16">
          <div className="max-w-3xl mx-auto">
            <div className="bg-[#1a1a1a] rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-8">
                Send Us a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-gray-400 mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-[#111] border border-gray-800 rounded-md px-4 py-2 text-white focus:outline-none focus:border-[#FFEDB1] transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-gray-400 mb-2">
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-[#111] border border-gray-800 rounded-md px-4 py-2 text-white focus:outline-none focus:border-[#FFEDB1] transition-colors"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-gray-400 mb-2">
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full bg-[#111] border border-gray-800 rounded-md px-4 py-2 text-white focus:outline-none focus:border-[#FFEDB1] transition-colors"
                    required
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="support">Technical Support</option>
                    <option value="billing">Billing Question</option>
                    <option value="partnership">Partnership</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-gray-400 mb-2">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="w-full bg-[#111] border border-gray-800 rounded-md px-4 py-2 text-white focus:outline-none focus:border-[#FFEDB1] transition-colors"
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#FFEDB1] text-black py-3 rounded-md font-medium hover:bg-[#ffdb82] transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-12 px-4 sm:px-6 bg-[#111]">
          <div className="max-w-6xl mx-auto">
            <div className="bg-gray-800 w-full h-64 rounded-xl flex items-center justify-center">
              <p className="text-gray-400">Map will be implemented here</p>
            </div>
          </div>
        </section>

        {/* Download App Banner */}
        <section className="px-4 sm:px-6 py-8 sm:py-16 bg-[#111] mb-16">
          <div className="max-w-5xl mx-auto rounded-2xl bg-gradient-to-r from-[#1a1a1a] to-[#252525] p-8 sm:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#FFEDB1] opacity-10 rounded-full translate-x-1/3 -translate-y-1/3"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#FFEDB1] opacity-10 rounded-full -translate-x-1/3 translate-y-1/3"></div>
            <div className="relative z-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6">
                Download Our App Free and
                <br className="hidden sm:block" />
                Enjoy Exclusive Features!
              </h2>
              <p className="text-gray-400 max-w-md mb-6 sm:mb-8">
                Enjoy a richer experience, exclusive content, and personalized
                lessons right on your fingertips. Download the app today for a
                better education journey.
              </p>
              <div className="flex flex-col sm:flex-row justify-start gap-4">
                <button className="bg-[#1a1a1a] text-white px-6 py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-[#252525] transition-all duration-300 transform hover:scale-105 group">
                  <svg
                    className="w-8 h-8 text-[#FFEDB1] group-hover:scale-110 transition-transform"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M17.9 5c.2.1.3.3.4.6v12.8c0 .3-.1.5-.4.6L12 23 6.1 19c-.2-.1-.4-.3-.4-.6V5.6c0-.3.2-.5.4-.6L12 1l5.9 4z" />
                  </svg>
                  <div className="text-left">
                    <div className="text-[10px] text-gray-400">GET IT ON</div>
                    <div className="text-sm font-medium">Google Play</div>
                  </div>
                </button>
                <button className="bg-[#1a1a1a] text-white px-6 py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-[#252525] transition-all duration-300 transform hover:scale-105 group">
                  <svg
                    className="w-8 h-8 text-[#FFEDB1] group-hover:scale-110 transition-transform"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M19.665 16.811a10.316 10.316 0 0 1-1.021 1.837 4.466 4.466 0 0 1-1.317 1.362c-.516.344-1.086.645-1.711.902-1.688.685-3.539.786-5.349.392-1.249-.269-2.448-.794-3.519-1.543-1.176-.86-2.155-1.994-2.845-3.317a9.976 9.976 0 0 1-1.269-5.063 10.716 10.716 0 0 1 2.517-6.869a10.542 10.542 0 0 1 6.206-3.426a10.577 10.577 0 0 1 3.489-.062a8.33 8.33 0 0 1 1.656.404a9.759 9.759 0 0 1 2.824 1.541c.322.256.646.501.963.76.5.4.851.843 1.058 1.332.1.243.17.494.207.75a4.55 4.55 0 0 1-1.256 3.869a4.902 4.902 0 0 1-2.272 1.341a4.105 4.105 0 0 1-2.084.055c-.219-.036-.436-.08-.656-.107a3.735 3.735 0 0 0-1.138.001a2.582 2.582 0 0 0-1.147.436V11.2h6.309v5.611z" />
                  </svg>
                  <div className="text-left">
                    <div className="text-[10px] text-gray-400">
                      Download on the
                    </div>
                    <div className="text-sm font-medium">App Store</div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
