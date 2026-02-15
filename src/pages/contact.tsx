import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar"; // Added Import
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaLinkedin, FaTwitter, FaStar, FaFacebook, FaInstagram } from "react-icons/fa";
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
        <title>Contact Us - SabiDub | We&apos;re Here to Support Your Journey</title>
        <meta
          name="description"
          content="Get in touch with the SabiDub team. Whether you&apos;re a student seeking guidance or a school looking to innovate, we&apos;re ready to help you succeed."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <motion.main
        initial="initial"
        animate="animate"
        className="min-h-screen bg-[#FAF9F6]"
      >
        <Navbar />

        {/* Hero Section */}
        <motion.section
          variants={fadeInUp}
          className="px-4 sm:px-6 pt-32 sm:pt-48 pb-10 relative overflow-hidden"
        >
          {/* Animated Background Blobs */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#014751] opacity-[0.03] rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-yellow-400 opacity-[0.03] rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>

          <div className="max-w-7xl mx-auto text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-block px-4 py-1.5 mb-6 rounded-full bg-[#014751]/5 border border-[#014751]/10"
            >
              <span className="text-[#014751] text-xs font-bold uppercase tracking-widest">Get In Touch</span>
            </motion.div>
            <motion.h1
              variants={fadeInUp}
              className="text-5xl sm:text-6xl md:text-7xl font-black text-[#0F2830] mb-8 tracking-tight"
            >
              Let&apos;s Build the Future of
              <span className="relative inline-block ml-4">
                <span className="relative z-10 text-[#014751] italic font-serif">Learning</span>
                <svg className="absolute -bottom-2 left-0 w-full h-3 text-yellow-400/30 -z-0" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="10" fill="none" />
                </svg>
              </span>
            </motion.h1>
            <motion.p
              variants={fadeIn}
              className="text-gray-600 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed font-medium"
            >
              Whether you have a question about features, pricing, or just want to say hello, our team is ready to connect with you.
            </motion.p>
          </div>
        </motion.section>

        {/* Tailored Support Section - Addressing "Data of each show" */}
        <section className="px-4 sm:px-6 py-10">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div variants={fadeInUp} className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center text-green-600 mb-6">
                <FaStar size={20} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">For Schools</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-4">
                Looking to streamline your administration or gain performance insights? Contact our institutional support team.
              </p>
              <Link href="https://portal.sabidub.com/auth/school/signin" className="text-[#014751] text-xs font-bold uppercase tracking-tighter hover:underline">School Management &rarr;</Link>
            </motion.div>

            <motion.div variants={fadeInUp} className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600 mb-6">
                <FaStar size={20} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Ambassadors</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-4">
                Already part of the program or want to join? Connect with our Ambassador Hub for support and onboarding.
              </p>
              <Link href="https://portal.sabidub.com/ambassador/login" className="text-[#014751] text-xs font-bold uppercase tracking-tighter hover:underline">Ambassador Center &rarr;</Link>
            </motion.div>
          </div>
        </section>

        {/* Grid Section */}
        <section className="px-4 sm:px-6 py-12">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">

            {/* Left: Contact Info */}
            <div className="lg:col-span-5 space-y-8">
              <motion.div
                variants={fadeInUp}
                className="bg-white p-10 rounded-[40px] shadow-sm border border-gray-100 hover:shadow-xl hover:border-[#014751]/10 transition-all duration-500 group"
              >
                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-[#014751]/5 flex items-center justify-center text-[#014751] group-hover:bg-[#014751] group-hover:text-white transition-colors duration-300">
                    <FaEnvelope size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Email Us</h3>
                    <p className="text-gray-500 text-sm mb-4">Our friendly team is here to help.</p>
                    <a href="mailto:isabidub@gmail.com" className="text-[#014751] font-bold text-lg hover:underline decoration-2 underline-offset-4">isabidub@gmail.com</a>
                  </div>
                </div>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                className="bg-white p-10 rounded-[40px] shadow-sm border border-gray-100 hover:shadow-xl hover:border-[#014751]/10 transition-all duration-500 group"
              >
                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-[#014751]/5 flex items-center justify-center text-[#014751] group-hover:bg-[#014751] group-hover:text-white transition-colors duration-300">
                    <FaPhone size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Call Us</h3>
                    <p className="text-gray-500 text-sm mb-4">Mon-Fri from 8am to 6pm.</p>
                    <a href="tel:+23480109117784" className="text-[#014751] font-bold text-lg hover:underline decoration-2 underline-offset-4">+234 801 0911 7784</a>
                  </div>
                </div>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                className="bg-white p-10 rounded-[40px] shadow-sm border border-gray-100 hover:shadow-xl hover:border-[#014751]/10 transition-all duration-500 group"
              >
                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-[#014751]/5 flex items-center justify-center text-[#014751] group-hover:bg-[#014751] group-hover:text-white transition-colors duration-300">
                    <FaMapMarkerAlt size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Office</h3>
                    <p className="text-gray-500 text-sm mb-4">Come say hello at our hub.</p>
                    <p className="text-gray-900 font-bold leading-relaxed">
                      Expansion Extension Layout, G/Lada, Abuja, Nigeria
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right: Contact Form */}
            <div className="lg:col-span-7">
              <motion.div
                variants={fadeInUp}
                className="bg-white p-8 sm:p-12 rounded-[48px] shadow-2xl shadow-[#014751]/5 border border-gray-100 relative overflow-hidden"
              >
                <h2 className="text-3xl font-black text-gray-900 mb-8">Send a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[11px] font-black uppercase tracking-widest text-gray-400 ml-1">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-gray-900 focus:ring-2 focus:ring-[#014751] transition-all placeholder-gray-300 font-medium"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[11px] font-black uppercase tracking-widest text-gray-400 ml-1">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-gray-900 focus:ring-2 focus:ring-[#014751] transition-all placeholder-gray-300 font-medium"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[11px] font-black uppercase tracking-widest text-gray-400 ml-1">Inquiry Type</label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-gray-900 focus:ring-2 focus:ring-[#014751] transition-all font-medium appearance-none"
                      required
                    >
                      <option value="">Select Option</option>
                      <option value="school">I represent a School</option>
                      <option value="ambassador">Ambassador Program</option>
                      <option value="partnership">Partnership</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[11px] font-black uppercase tracking-widest text-gray-400 ml-1">How can we help?</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      placeholder="Tell us what you need..."
                      className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-gray-900 focus:ring-2 focus:ring-[#014751] transition-all placeholder-gray-300 font-medium resize-none"
                      required
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#014751] text-white py-5 rounded-2xl font-black text-sm uppercase tracking-[0.2em] hover:bg-[#023c44] transition-all hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-[#014751]/20"
                  >
                    Send Inquiry
                  </button>
                </form>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Social Feed Concept */}
        <section className="py-24 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl font-black text-gray-900 mb-12">Connect Anywhere</h2>
            <div className="flex flex-wrap justify-center gap-8">
              <motion.a whileHover={{ y: -10 }} href="https://facebook.com" className="flex items-center gap-4 bg-white px-8 py-5 rounded-3xl shadow-sm border border-gray-100 font-bold text-gray-900 hover:text-[#014751] transition-all">
                <FaFacebook size={24} className="text-[#1877F2]" />
                Facebook
              </motion.a>
              <motion.a whileHover={{ y: -10 }} href="https://twitter.com" className="flex items-center gap-4 bg-white px-8 py-5 rounded-3xl shadow-sm border border-gray-100 font-bold text-gray-900 hover:text-[#014751] transition-all">
                <FaTwitter size={24} className="text-[#1DA1F2]" />
                Twitter
              </motion.a>
              <motion.a whileHover={{ y: -10 }} href="https://instagram.com" className="flex items-center gap-4 bg-white px-8 py-5 rounded-3xl shadow-sm border border-gray-100 font-bold text-gray-900 hover:text-[#014751] transition-all">
                <FaInstagram size={24} className="text-[#E4405F]" />
                Instagram
              </motion.a>
              <motion.a whileHover={{ y: -10 }} href="https://linkedin.com" className="flex items-center gap-4 bg-white px-8 py-5 rounded-3xl shadow-sm border border-gray-100 font-bold text-gray-900 hover:text-[#014751] transition-all">
                <FaLinkedin size={24} className="text-[#0077B5]" />
                LinkedIn
              </motion.a>
            </div>
          </div>
        </section>

        <Footer />
      </motion.main>
    </>
  );
}
