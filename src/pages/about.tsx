import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import Footer from "../components/Footer";
import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import { LuTrophy, LuBookOpen } from "react-icons/lu";

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
        className="min-h-screen bg-white"
      >

        <Navbar />

        {/* Hero Section - Clean White Design */}
        <section className="relative px-6 sm:px-6 pt-32 sm:pt-40 pb-12 sm:pb-16 bg-white">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight"
              >
                Empowering the Next
                <br />
                Generation of Leaders
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto"
              >
                We're revolutionizing education in Nigeria by bridging the gap between
                secondary and tertiary education through innovative digital solutions.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Our Story Section - Redesigned */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="px-6 sm:px-6 pt-8 sm:pt-12 pb-12 sm:pb-16 bg-white relative overflow-hidden"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, #014751 1px, transparent 0)`,
              backgroundSize: '40px 40px'
            }}></div>
          </div>

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left Content */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <span className="inline-block px-4 py-2 bg-[#014751]/10 text-[#014751] rounded-full text-sm font-semibold mb-6">
                  OUR STORY
                </span>

                <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
                  Building the Future of
                  <span className="block mt-2 bg-gradient-to-r from-[#014751] to-[#023840] bg-clip-text text-transparent">
                    Nigerian Education
                  </span>
                </h2>

                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  At SabiDub, we believe every Nigerian student deserves access to
                  world-class education. Our platform bridges the critical gap between
                  secondary and tertiary education, ensuring students are fully prepared
                  for academic excellence.
                </p>

                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  Through innovative technology, expert-curated content, and a deep
                  understanding of the Nigerian curriculum, we're transforming how
                  students learn and succeed.
                </p>

                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-3 px-6 py-3 bg-gray-50 rounded-xl">
                    <div className="w-12 h-12 bg-[#014751] rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">WAEC Aligned</div>
                      <div className="text-sm text-gray-600">Curriculum</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 px-6 py-3 bg-gray-50 rounded-xl">
                    <div className="w-12 h-12 bg-[#014751] rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">24/7 Access</div>
                      <div className="text-sm text-gray-600">Learn Anytime</div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Right Visual Grid */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <div className="grid grid-cols-2 gap-4">
                  {/* Large Featured Image */}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="col-span-2 relative h-64 sm:h-80 rounded-2xl overflow-hidden group"
                  >
                    <Image
                      src="/images/IMG_5562.jpg"
                      alt="Students Learning"
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
                            <path d="M2.5 7.5V20.5C2.5 20.7761 2.72386 21 3 21H11.5V6H3C2.72386 6 2.5 6.22386 2.5 6.5V7.5Z" fill="white" fillOpacity="0.8" />
                            <path d="M12.5 6H21C21.2761 6 21.5 6.22386 21.5 6.5V20.5C21.5 20.7761 21.2761 21 21 21H12.5V6Z" fill="white" fillOpacity="0.8" />
                            <path d="M12 21V6" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                            <path d="M3 6L12 7.5L21 6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                        <span className="text-white font-semibold text-lg">Interactive Learning</span>
                      </div>
                      <p className="text-white/80 text-sm">Engaging content designed for Nigerian students</p>
                    </div>
                  </motion.div>

                  {/* Small Images */}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="relative h-48 rounded-2xl overflow-hidden group"
                  >
                    <Image
                      src="/images/IMG_5569.jpg"
                      alt="Virtual Classroom"
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#014751]/80 to-transparent"></div>
                    <div className="absolute bottom-4 left-4">
                      <span className="text-white font-semibold">Virtual Classes</span>
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="relative h-48 rounded-2xl overflow-hidden bg-gradient-to-br from-[#014751] to-[#023840] flex items-center justify-center"
                  >
                    <div className="text-center p-6">
                      <div className="text-5xl font-bold text-white mb-2">95%</div>
                      <div className="text-white/80 text-sm">Student Success Rate</div>
                    </div>
                  </motion.div>
                </div>

                {/* Floating Badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, type: "spring" }}
                  className="absolute -top-6 -right-6 bg-white rounded-2xl shadow-2xl p-6 border border-gray-100"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-[#FFEDB1] rounded-xl flex items-center justify-center">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 6H17V12C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12V6Z" fill="#F59E0B" />
                        <path d="M7 6H5C3.89543 6 3 6.89543 3 8V10C3 11.1046 3.89543 12 5 12H7" stroke="#B45309" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M17 12H19C20.1046 12 21 11.1046 21 10V8C21 6.89543 20.1046 6 19 6H17" stroke="#B45309" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M12 17V21M12 21H9M12 21H15" stroke="#B45309" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M7 6H17V12C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12V6Z" stroke="#B45309" strokeWidth="2" strokeLinejoin="round" />
                        <path d="M12 9V6" stroke="#B45309" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">Award Winning</div>
                      <div className="text-sm text-gray-600">EdTech Platform</div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Mission & Vision - Editorial Design */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="px-6 sm:px-6 py-20 sm:py-32 bg-white"
        >
          <div className="max-w-7xl mx-auto">
            {/* Header Block */}
            <div className="flex flex-col md:flex-row justify-between items-start border-b border-gray-100 pb-12 mb-12">
              <div className="max-w-3xl">
                <h2 className="text-5xl sm:text-7xl font-bold text-gray-900 leading-[1.1] mb-6">
                  Our Purpose & <br />
                  Defining Principles
                </h2>
                <p className="text-xl text-gray-500 max-w-xl">
                  Tracing our commitment to educational transformation across the Nigerian landscape.
                </p>
              </div>
              <div className="mt-8 md:mt-0 md:pl-12 md:border-l border-gray-100 flex flex-col gap-6 text-sm">
                <div>
                  <p className="text-gray-400 uppercase tracking-widest mb-1">ESTABLISHED</p>
                  <p className="font-bold text-gray-900">18 JUNE 2021</p>
                </div>
                <div>
                  <p className="text-gray-400 uppercase tracking-widest mb-1">CATEGORY</p>
                  <p className="font-bold text-gray-900">EDTECH / NIGERIA</p>
                </div>
                <div>
                  <p className="text-gray-400 uppercase tracking-widest mb-1">STRATEGY TYPE</p>
                  <p className="font-bold text-gray-900">SYSTEMIC IMPACT</p>
                </div>
              </div>
            </div>

            {/* Featured Image */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative w-full h-[400px] sm:h-[600px] mb-20 rounded-2xl overflow-hidden bg-gray-100"
            >
              <Image
                src="/images/IMG_5599.jpg"
                alt="Educational Vision"
                fill
                className="object-cover"
              />
            </motion.div>

            {/* Content Blocks */}
            <div className="grid lg:grid-cols-12 gap-12 items-start">
              <div className="lg:col-span-8">
                <div className="mb-20">
                  <h3 className="text-3xl font-bold text-gray-900 mb-8 pb-4 border-b border-gray-50">
                    Our Mission
                  </h3>
                  <p className="text-2xl text-gray-700 leading-relaxed font-light italic mb-8">
                    "To democratize quality education in Nigeria by providing accessible, affordable, and comprehensive learning resources that empower students to achieve their full potential."
                  </p>
                  <p className="text-lg text-gray-600 leading-relaxed mb-6">
                    We're bridging the critical gap between secondary and tertiary education, ensuring every student—regardless of their background—has the tools necessary for academic excellence. Our approach focuses on systemic impact, leveraging digital innovation to reach learners across the nation.
                  </p>
                </div>

                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-6 uppercase tracking-wider">
                    Our Vision
                  </h4>
                  <p className="text-lg text-gray-600 leading-relaxed mb-6">
                    To become Nigeria's leading educational technology platform, recognized for transforming the educational landscape and creating a generation of confident, well-prepared students ready to excel in higher education and beyond.
                  </p>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    By 2030, we aim to have impacted over 1 million Nigerian learners, setting the standard for digital curriculum delivery and student support systems in West Africa.
                  </p>
                </div>
              </div>

              <div className="lg:col-span-4 lg:pl-12 lg:border-l border-gray-50 flex flex-col gap-12">
                <div>
                  <p className="text-gray-400 uppercase tracking-widest text-xs mb-4">CORE VALUES</p>
                  <ul className="flex flex-col gap-4">
                    {['Inclusion', 'Innovation', 'Excellence', 'Empowerment'].map((val) => (
                      <li key={val} className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#014751]" />
                        <span className="font-bold text-gray-900">{val}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-8 bg-gray-50 rounded-2xl">
                  <p className="text-gray-900 font-bold mb-4 italic">"Growth is not just about numbers; it's about the depth of impact on every individual student."</p>
                  <p className="text-sm text-gray-500">— SabiDub Leadership Team</p>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Founder Section */}
        <section className="relative w-full min-h-[550px] lg:min-h-[700px] bg-white overflow-hidden flex items-end pb-10 lg:pb-20">
          {/* Background Image with Heavy White Gradient */}
          <div className="absolute inset-x-0 top-0 bottom-0 z-0 flex justify-center">
            <div className="relative w-full h-full max-w-6xl">
              <Image

                src="/images/founder.png"
                alt="Hamman Dlama Kwaji"
                fill
                className="object-contain object-top"
                priority
              />
              {/* Deep White Gradient Overlay */}
              <div className="absolute inset-x-0 bottom-0 h-[80%] lg:h-[50%] bg-gradient-to-t from-white via-white/90 to-transparent z-10" />
            </div>
          </div>

          <div className="max-w-5xl mx-auto px-6 relative z-20 w-full">
            <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 lg:gap-8">
              {/* Left Column - Headline */}
              <div className="lg:w-5/12 text-left">
                <div className="inline-flex items-center gap-2 mb-0 lg:mb-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em]">FOUNDER / CEO</span>
                </div>
                <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-[1.2] tracking-tight font-grey-qo">
                  Hamman Dlama Kwaji
                </h2>
              </div>

              {/* Right Column - Bio */}
              <div className="lg:w-5/12 flex flex-col items-start lg:items-end text-left lg:text-right">
                <p className="text-gray-500 text-sm leading-relaxed font-medium">
                  A visionary leader dedicated to transforming education in Nigeria. Hamman combines technical expertise with a passion for student success to bridge the critical gap between secondary and tertiary learning.
                </p>
              </div>
            </div>
          </div>
        </section>


        <Footer />
      </motion.main >
    </>
  );
}
