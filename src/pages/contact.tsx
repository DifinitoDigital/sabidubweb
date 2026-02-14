import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar"; // Added Import
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaWhatsapp, FaLinkedin, FaTwitter } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

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

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const fadeIn = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.8 }
  };

  return (
    <>
      <Head>
        <title>Contact Us - SabiDub | Educational Excellence in Nigeria</title>
        <meta
          name="description"
          content="Get in touch with SabiDub for any questions about our educational services. We&apos;re here to help you succeed."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <motion.main
        initial="initial"
        animate="animate"
        className="min-h-screen bg-white"
      >
        <Navbar />
        <motion.section
          variants={fadeInUp}
          className="px-4 sm:px-6 pt-32 sm:pt-48 pb-16 relative overflow-hidden"
        >
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#014751] opacity-5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#014751] opacity-5 rounded-full translate-y-1/2 -translate-x-1/2"></div>

          <div className="max-w-7xl mx-auto text-center relative z-10">
            <motion.h1
              variants={fadeInUp}
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6"
            >
              Let&apos;s Start a
              <span className="text-[#014751] block">Conversation</span>
            </motion.h1>
            <motion.p
              variants={fadeIn}
              className="text-gray-900 text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed"
            >
              Ready to transform your educational journey? We&apos;re here to help you succeed.
              Reach out to us and let&apos;s discuss how SabiDub can support your learning goals.
            </motion.p>
          </div>
        </motion.section>

        {/* Contact Information */}
        <motion.section
          variants={staggerChildren}
          className="px-4 sm:px-6 py-16 bg-gradient-to-b from-white to-gray-50"
        >
          <div className="max-w-7xl mx-auto">
            <motion.div
              variants={fadeInUp}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
            >
              <motion.div
                variants={fadeInUp}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-2xl text-center border border-gray-200 hover:border-[#014751]/30 transition-all duration-300"
              >
                <div className="text-[#014751] flex justify-center mb-6">
                  <div className="p-4 bg-[#014751]/10 rounded-full">
                    <FaMapMarkerAlt size={28} />
                  </div>
                </div>
                <h3 className="text-gray-900 font-semibold text-lg mb-3">Visit Our Office</h3>
                <p className="text-gray-900 leading-relaxed">
                  123 Education Street
                  <br />
                  Victoria Island, Lagos
                  <br />
                  Nigeria
                </p>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-2xl text-center border border-gray-200 hover:border-[#014751]/30 transition-all duration-300"
              >
                <div className="text-[#014751] flex justify-center mb-6">
                  <div className="p-4 bg-[#014751]/10 rounded-full">
                    <FaPhone size={28} />
                  </div>
                </div>
                <h3 className="text-gray-900 font-semibold text-lg mb-3">Call Us Today</h3>
                <p className="text-gray-900">
                  <a
                    href="tel:+2348012345678"
                    className="hover:text-[#014751] transition-colors font-medium"
                  >
                    +234 801 234 5678
                  </a>
                  <br />
                  <span className="text-sm text-gray-600">Mon-Fri: 8AM-6PM</span>
                </p>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-2xl text-center border border-gray-200 hover:border-[#014751]/30 transition-all duration-300"
              >
                <div className="text-[#014751] flex justify-center mb-6">
                  <div className="p-4 bg-[#014751]/10 rounded-full">
                    <FaEnvelope size={28} />
                  </div>
                </div>
                <h3 className="text-gray-900 font-semibold text-lg mb-3">Email Us</h3>
                <p className="text-gray-900">
                  <a
                    href="mailto:info@sabidub.com"
                    className="hover:text-[#014751] transition-colors font-medium"
                  >
                    info@sabidub.com
                  </a>
                  <br />
                  <span className="text-sm text-gray-600">We reply within 24 hours</span>
                </p>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-2xl text-center border border-gray-200 hover:border-[#014751]/30 transition-all duration-300"
              >
                <div className="text-[#014751] flex justify-center mb-6">
                  <div className="p-4 bg-[#014751]/10 rounded-full">
                    <FaClock size={28} />
                  </div>
                </div>
                <h3 className="text-gray-900 font-semibold text-lg mb-3">Working Hours</h3>
                <p className="text-gray-900 leading-relaxed">
                  Monday - Friday: 8AM - 6PM
                  <br />
                  Saturday: 9AM - 3PM
                  <br />
                  <span className="text-sm text-gray-600">Sunday: Closed</span>
                </p>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        {/* Contact Form */}
        <motion.section
          variants={fadeInUp}
          className="px-4 sm:px-6 py-16"
        >
          <div className="max-w-4xl mx-auto">
            <motion.div
              variants={fadeInUp}
              className="bg-gradient-to-br from-white to-gray-50 rounded-3xl p-8 sm:p-12 border border-gray-200 relative overflow-hidden"
            >
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#014751] opacity-5 rounded-full -translate-y-1/2 translate-x-1/2"></div>

              <div className="relative z-10">
                <motion.h2
                  variants={fadeInUp}
                  className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8 text-center"
                >
                  Send Us a Message
                </motion.h2>
                <motion.p
                  variants={fadeIn}
                  className="text-gray-900 text-center mb-8 max-w-2xl mx-auto"
                >
                  Have a question or want to learn more about our services?
                  Fill out the form below and we&apos;ll get back to you as soon as possible.
                </motion.p>

                <motion.form
                  variants={staggerChildren}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <motion.div
                    variants={fadeInUp}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-6"
                  >
                    <div>
                      <label htmlFor="name" className="block text-gray-900 mb-3 font-medium">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-4 text-gray-900 focus:outline-none focus:border-[#014751] focus:ring-2 focus:ring-[#014751]/20 transition-all duration-300 placeholder-gray-400"
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-gray-900 mb-3 font-medium">
                        Your Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-4 text-gray-900 focus:outline-none focus:border-[#014751] focus:ring-2 focus:ring-[#014751]/20 transition-all duration-300 placeholder-gray-400"
                        placeholder="Enter your email address"
                        required
                      />
                    </div>
                  </motion.div>

                  <motion.div variants={fadeInUp}>
                    <label htmlFor="subject" className="block text-gray-900 mb-3 font-medium">
                      Subject *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full bg-white border border-gray-200 rounded-xl px-4 py-4 text-gray-900 focus:outline-none focus:border-[#014751] focus:ring-2 focus:ring-[#014751]/20 transition-all duration-300"
                      required
                    >
                      <option value="">Select a subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="support">Technical Support</option>
                      <option value="billing">Billing Question</option>
                      <option value="partnership">Partnership</option>
                      <option value="feedback">Feedback</option>
                      <option value="other">Other</option>
                    </select>
                  </motion.div>

                  <motion.div variants={fadeInUp}>
                    <label htmlFor="message" className="block text-gray-900 mb-3 font-medium">
                      Your Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={6}
                      className="w-full bg-white border border-gray-200 rounded-xl px-4 py-4 text-gray-900 focus:outline-none focus:border-[#014751] focus:ring-2 focus:ring-[#014751]/20 transition-all duration-300 placeholder-gray-400 resize-none"
                      placeholder="Tell us how we can help you..."
                      required
                    ></textarea>
                  </motion.div>

                  <motion.button
                    variants={fadeInUp}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full bg-gradient-to-r from-yellow-400 to-[#ffdb82] text-black py-4 rounded-xl font-semibold text-lg hover:from-[#ffdb82] hover:to-yellow-400 transition-all duration-300 transform shadow-lg hover:shadow-xl"
                  >
                    Send Message
                  </motion.button>
                </motion.form>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Social Media & Quick Contact */}
        <motion.section
          variants={fadeInUp}
          className="px-4 sm:px-6 py-16 bg-gradient-to-b from-white to-gray-50"
        >
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2
              variants={fadeInUp}
              className="text-3xl font-bold text-gray-900 mb-8"
            >
              Connect With Us
            </motion.h2>
            <motion.p
              variants={fadeIn}
              className="text-gray-900 mb-12 max-w-2xl mx-auto"
            >
              Follow us on social media for the latest updates, educational tips, and exclusive content.
            </motion.p>

            <motion.div
              variants={staggerChildren}
              className="flex flex-wrap justify-center gap-6"
            >
              <motion.a
                variants={fadeInUp}
                whileHover={{ scale: 1.1, y: -5 }}
                href="https://wa.me/2348012345678"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-[#25D366] text-gray-900 px-6 py-4 rounded-xl hover:bg-[#128C7E] transition-all duration-300"
              >
                <FaWhatsapp size={24} />
                <span className="font-semibold">WhatsApp</span>
              </motion.a>

              <motion.a
                variants={fadeInUp}
                whileHover={{ scale: 1.1, y: -5 }}
                href="https://linkedin.com/company/sabidub"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-[#0077B5] text-gray-900 px-6 py-4 rounded-xl hover:bg-[#005885] transition-all duration-300"
              >
                <FaLinkedin size={24} />
                <span className="font-semibold">LinkedIn</span>
              </motion.a>

              <motion.a
                variants={fadeInUp}
                whileHover={{ scale: 1.1, y: -5 }}
                href="https://twitter.com/sabidub"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-[#1DA1F2] text-gray-900 px-6 py-4 rounded-xl hover:bg-[#1a8cd8] transition-all duration-300"
              >
                <FaTwitter size={24} />
                <span className="font-semibold">Twitter</span>
              </motion.a>
            </motion.div>
          </div>
        </motion.section>

        {/* Map Section */}
        <motion.section
          variants={fadeInUp}
          className="py-12 px-4 sm:px-6 bg-white"
        >
          <div className="max-w-6xl mx-auto">
            <motion.div
              variants={fadeInUp}
              className="bg-gradient-to-br from-white to-gray-50 w-full h-80 rounded-2xl flex items-center justify-center border border-gray-200"
            >
              <div className="text-center">
                <div className="text-[#014751] mb-4">
                  <FaMapMarkerAlt size={48} />
                </div>
                <p className="text-gray-900 text-lg">SabiDub HQ Location</p>
                <p className="text-gray-500 text-sm mt-2">Find our primary administrative hub in Victoria Island, Lagos</p>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Download App Banner */}
        <motion.section
          variants={fadeInUp}
          className="px-4 sm:px-6 py-16 bg-gradient-to-b from-white to-gray-50"
        >
          <div className="max-w-5xl mx-auto rounded-3xl bg-gradient-to-r from-white to-gray-50 p-8 sm:p-12 relative overflow-hidden border border-gray-200">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#014751] opacity-5 rounded-full translate-x-1/3 -translate-y-1/3"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#014751] opacity-5 rounded-full -translate-x-1/3 translate-y-1/3"></div>
            <div className="relative z-10">
              <motion.h2
                variants={fadeInUp}
                className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6"
              >
                Download Our App
                <span className="text-[#014751] block">Start Learning Today!</span>
              </motion.h2>
              <motion.p
                variants={fadeIn}
                className="text-gray-900 max-w-2xl mb-8 text-lg leading-relaxed"
              >
                Get access to exclusive features, personalized learning paths, and interactive content.
                Download the SabiDub app and take your education to the next level.
              </motion.p>
              <motion.div
                variants={staggerChildren}
                className="flex flex-col sm:flex-row justify-start gap-4"
              >
                <motion.button
                  variants={fadeInUp}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white border border-gray-100 shadow-sm text-gray-900 px-8 py-4 rounded-xl flex items-center justify-center gap-3 hover:bg-gray-50 transition-all duration-300 transform border border-gray-200 hover:border-[#014751]/30"
                >
                  <svg
                    className="w-8 h-8 text-[#014751]"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M17.9 5c.2.1.3.3.4.6v12.8c0 .3-.1.5-.4.6L12 23 6.1 19c-.2-.1-.4-.3-.4-.6V5.6c0-.3.2-.5.4-.6L12 1l5.9 4z" />
                  </svg>
                  <div className="text-left">
                    <div className="text-[10px] text-gray-600">GET IT ON</div>
                    <div className="text-sm font-medium">Google Play</div>
                  </div>
                </motion.button>
                <motion.button
                  variants={fadeInUp}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white border border-gray-100 shadow-sm text-gray-900 px-8 py-4 rounded-xl flex items-center justify-center gap-3 hover:bg-gray-50 transition-all duration-300 transform border border-gray-200 hover:border-[#014751]/30"
                >
                  <svg
                    className="w-8 h-8 text-[#014751]"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M19.665 16.811a10.316 10.316 0 0 1-1.021 1.837 4.466 4.466 0 0 1-1.317 1.362c-.516.344-1.086.645-1.711.902-1.688.685-3.539.786-5.349.392-1.249-.269-2.448-.794-3.519-1.543-1.176-.86-2.155-1.994-2.845-3.317a9.976 9.976 0 0 1-1.269-5.063 10.716 10.716 0 0 1 2.517-6.869a10.542 10.542 0 0 1 6.206-3.426a10.577 10.577 0 0 1 3.489-.062a8.33 8.33 0 0 1 1.656.404a9.759 9.759 0 0 1 2.824 1.541c.322.256.646.501.963.76.5.4.851.843 1.058 1.332.1.243.17.494.207.75a4.55 4.55 0 0 1-1.256 3.869a4.902 4.902 0 0 1-2.272 1.341a4.105 4.105 0 0 1-2.084.055c-.219-.036-.436-.08-.656-.107a3.735 3.735 0 0 0-1.138.001a2.582 2.582 0 0 0-1.147.436V11.2h6.309v5.611z" />
                  </svg>
                  <div className="text-left">
                    <div className="text-[10px] text-gray-600">Download on the</div>
                    <div className="text-sm font-medium">App Store</div>
                  </div>
                </motion.button>
              </motion.div>
            </div>
          </div>
        </motion.section>

        <Footer />
      </motion.main>
    </>
  );
}
