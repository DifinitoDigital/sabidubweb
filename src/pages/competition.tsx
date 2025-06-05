import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { FaUsers, FaCalendarAlt, FaPlane, FaEnvelope, FaPhone, FaChalkboardTeacher, FaStar } from "react-icons/fa";
import Footer from "../components/Footer";

export default function Competition() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <>
      <Head>
        <title>Competition | SabiDub - Educational Excellence in Nigeria</title>
        <meta name="description" content="Learn about SabiDub's competition and training program for aspiring tech professionals in Nigeria." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen bg-[#111] relative">
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
              className="text-white hover:text-[#FFEDB1] transition-colors"
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
                  className="text-white hover:text-[#FFEDB1] transition-colors py-2 border-b border-gray-800"
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
        <section className="px-4 sm:px-6 pt-12 sm:pt-20 pb-12 sm:pb-24 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
                Welcome to <span className="text-[#FFEDB1]">SabiDub Initiative Africa</span>
            </h1>
              <p className="text-gray-300 text-lg mb-6 max-w-xl mx-auto md:mx-0">
                A transformative two-week training program designed to launch your tech career. <br />
                <span className="text-[#FFEDB1] font-semibold">Life Feels Empty Without Beautiful Design</span>
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <a href="#register" className="bg-[#FFEDB1] text-black px-6 py-3 rounded-md font-medium hover:bg-[#ffdb82] transition-colors">Closed Now</a>
                <a href="#contact" className="border border-gray-600 text-white px-6 py-3 rounded-md font-medium hover:bg-[#1a1a1a] transition-colors">Contact Us</a>
              </div>
            </div>
            <div className="flex-1 flex justify-center md:justify-end">
              <div className="w-72 h-72 rounded-3xl overflow-hidden shadow-xl bg-[#222] flex items-center justify-center relative">
                <Image src="/images/2149156427.jpg" alt="Team" width={288} height={288} className="object-cover w-full h-full" />
                <div className="absolute bottom-4 right-4 bg-[#FFEDB1] text-[#111] px-4 py-2 rounded-full font-semibold text-sm shadow">June 2, 2025</div>
              </div>
            </div>
          </div>
        </section>

        {/* Impact/Stats Section */}
        <section className="px-4 sm:px-6 py-12 bg-gradient-to-r from-[#FFEDB1]/10 to-transparent">
          <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            <div>
              <FaCalendarAlt className="mx-auto text-3xl text-[#FFEDB1] mb-2" />
              <div className="text-2xl font-bold text-white">2 Weeks</div>
              <div className="text-gray-400 text-sm">Intensive Training</div>
            </div>
            <div>
              <FaChalkboardTeacher className="mx-auto text-3xl text-[#FFEDB1] mb-2" />
              <div className="text-2xl font-bold text-white">Live Projects</div>
              <div className="text-gray-400 text-sm">Real Experience</div>
            </div>
            <div>
              <FaPlane className="mx-auto text-3xl text-[#FFEDB1] mb-2" />
              <div className="text-2xl font-bold text-white">100% Travel</div>
              <div className="text-gray-400 text-sm">Flights & Transport</div>
            </div>
            <div>
              <FaUsers className="mx-auto text-3xl text-[#FFEDB1] mb-2" />
              <div className="text-2xl font-bold text-white">Community</div>
              <div className="text-gray-400 text-sm">Join SabiDub Family</div>
            </div>
          </div>
        </section>

        {/* Features/Content Section */}
        <section className="px-4 sm:px-6 py-16 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <FaChalkboardTeacher className="text-3xl text-[#FFEDB1]" />
                <h2 className="text-2xl font-bold text-white">Program Overview</h2>
              </div>
              <p className="text-gray-300 mb-4">SabiDub is a fast-growing technology company specializing in software development, digital innovation, and empowering local tech talent. Our mission is to cultivate the next generation of African developers through intensive training and real-world experience.</p>
              <p className="text-gray-300">The program will officially begin on <span className='text-[#FFEDB1] font-semibold'>June 6, 2025</span>, at <span className='text-[#FFEDB1] font-semibold'>Wellington Blu Hotel and Suites, Enugu, Nigeria</span>. The closing ceremony is on <span className='text-[#FFEDB1] font-semibold'>June 14, 2025</span>. Participants are expected to arrive on <span className='text-[#FFEDB1] font-semibold'>June 6, 2025</span>, with registration and orientation taking place on <span className='text-[#FFEDB1] font-semibold'>June 7, 2025</span>.</p>
            </div>
            <div>
              <div className="flex items-center gap-4 mb-4">
                <FaChalkboardTeacher className="text-3xl text-[#FFEDB1]" />
                <h2 className="text-2xl font-bold text-white">What to Expect</h2>
              </div>
              <p className="text-gray-300 mb-4">During the training, you'll cover essential programming skills, hands-on software development, and collaborative project work—led by experienced professionals in the tech industry.</p>
              <p className="text-gray-300">After completing the training, all participants will transition into part-time roles with Sabidub for one to two months, working on live projects alongside our teams.</p>
            </div>
          </div>
        </section>

        {/* Travel & Accommodation and Contact Section */}
        <section className="px-4 sm:px-6 py-16 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <FaPlane className="text-3xl text-[#FFEDB1]" />
              <h2 className="text-2xl font-bold text-white">Travel & Accommodation</h2>
            </div>
            <p className="text-gray-300 mb-4">For candidates residing outside their selected state, flight tickets will be arranged and sent accordingly. If you are not traveling by air, your transportation costs will be fully covered or reimbursed.</p>
            <p className="text-gray-300">A detailed schedule will be sent to your email within 24 hours of confirmation. Please monitor your inbox (and spam folder) for updates.</p>
          </div>
          <div id="contact">
            <div className="flex items-center gap-4 mb-4">
              <FaEnvelope className="text-3xl text-[#FFEDB1]" />
              <h2 className="text-2xl font-bold text-white">Contact Information</h2>
            </div>
            <p className="text-gray-300 mb-4">For any questions or travel assistance, please contact our coordination team:</p>
            <div className="space-y-2">
              <p className="text-white font-semibold">Warm regards,</p>
              <p className="text-white">Hamman Dlama</p>
              <p className="text-gray-300">Program Coordinator</p>
              <p className="text-gray-300">Sabi Dub</p>
              <p className="text-gray-300 flex items-center gap-2"><FaEnvelope className="inline text-[#FFEDB1]" /> isabidub@gmail.com</p>
              <p className="text-gray-300 flex items-center gap-2"><FaPhone className="inline text-[#FFEDB1]" /> +44-7379-133937</p>
            </div>
            <p className="text-gray-300 mt-4">We're proud to have you as part of this journey. Welcome to the SabiDub family!</p>
          </div>
        </section>

        {/* Competition Timeline */}
        <section className="px-4 sm:px-6 py-16 max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-[#FFEDB1] mb-4 text-center">Sabidub Initiative Africa – 2-Week Training Timetable</h2>
          <div className="text-center mb-2">
            <span className="text-[#FFEDB1] text-lg">Location:</span> <span className="text-[#FFEDB1] font-bold">Wellington Blu Hotel and Suites, Enugu, Nigeria</span>
          </div>
          <div className="text-center mb-6">
            <span className="text-[#FFEDB1] text-lg">Duration:</span> <span className="text-[#FFEDB1] font-bold">June 6th – June 14th, 2025</span>
          </div>
          <div className="text-center text-[#FFEDB1] text-sm mb-10">Note: Daily sessions begin with morning devotion and end with reflections or wrap-ups. Sundays are excluded.</div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex-1 flex flex-col items-center">
              <div className="bg-[#FFEDB1] text-[#111] w-12 h-12 flex items-center justify-center rounded-full font-bold text-xl mb-2">6</div>
              <div className="text-white font-semibold mb-1">June 2025</div>
              <div className="text-gray-400 text-sm text-center">Training Program Begins</div>
            </div>
            <div className="h-12 w-1 bg-[#FFEDB1]/30 hidden md:block"></div>
            <div className="flex-1 flex flex-col items-center">
              <div className="bg-[#FFEDB1] text-[#111] w-12 h-12 flex items-center justify-center rounded-full font-bold text-xl mb-2">14</div>
              <div className="text-white font-semibold mb-1">June 2025</div>
              <div className="text-gray-400 text-sm text-center">Closing Ceremony</div>
            </div>
          </div>
        </section>

        {/* What You'll Gain */}
        <section className="px-4 sm:px-6 py-16 max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">What You'll Gain</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <div className="bg-[#1a1a1a] rounded-2xl p-8 flex flex-col items-center text-center">
              <FaChalkboardTeacher className="text-4xl text-[#FFEDB1] mb-4" />
              <div className="text-white font-semibold mb-2">Hands-on Coding Experience</div>
              <div className="text-gray-400 text-sm">Work on real projects and build your portfolio.</div>
            </div>
            <div className="bg-[#1a1a1a] rounded-2xl p-8 flex flex-col items-center text-center">
              <FaUsers className="text-4xl text-[#FFEDB1] mb-4" />
              <div className="text-white font-semibold mb-2">Mentorship</div>
              <div className="text-gray-400 text-sm">Learn from industry experts and experienced developers.</div>
            </div>
            <div className="bg-[#1a1a1a] rounded-2xl p-8 flex flex-col items-center text-center">
              <FaPlane className="text-4xl text-[#FFEDB1] mb-4" />
              <div className="text-white font-semibold mb-2">Networking</div>
              <div className="text-gray-400 text-sm">Connect with peers and professionals in the tech industry.</div>
            </div>
            <div className="bg-[#1a1a1a] rounded-2xl p-8 flex flex-col items-center text-center">
              <FaStar className="text-4xl text-[#FFEDB1] mb-4" />
              <div className="text-white font-semibold mb-2">Certificate of Completion</div>
              <div className="text-gray-400 text-sm">Receive a certificate to boost your resume and LinkedIn.</div>
            </div>
            <div className="bg-[#1a1a1a] rounded-2xl p-8 flex flex-col items-center text-center">
              <FaEnvelope className="text-4xl text-[#FFEDB1] mb-4" />
              <div className="text-white font-semibold mb-2">Career Support</div>
              <div className="text-gray-400 text-sm">Get guidance on your next steps in tech.</div>
            </div>
            <div className="bg-[#1a1a1a] rounded-2xl p-8 flex flex-col items-center text-center">
              <FaChalkboardTeacher className="text-4xl text-[#FFEDB1] mb-4" />
              <div className="text-white font-semibold mb-2">Real Project Portfolio</div>
              <div className="text-gray-400 text-sm">Showcase your work to future employers.</div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="px-4 sm:px-6 py-16 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <div className="text-white font-semibold mb-2">Who can apply for the SabiDub competition?</div>
              <div className="text-gray-400 text-sm">The program is open to aspiring tech professionals and students across Africa who are passionate about software development and digital innovation.</div>
            </div>
            <div>
              <div className="text-white font-semibold mb-2">Is travel and accommodation really covered?</div>
              <div className="text-gray-400 text-sm">Yes! All travel and accommodation expenses are fully covered or reimbursed for participants coming from outside the host state.</div>
            </div>
            <div>
              <div className="text-white font-semibold mb-2">What happens after the training?</div>
              <div className="text-gray-400 text-sm">Participants will transition into part-time roles with SabiDub, working on live projects for one to two months.</div>
            </div>
            <div>
              <div className="text-white font-semibold mb-2">How do I get updates about the program?</div>
              <div className="text-gray-400 text-sm">A detailed schedule and all updates will be sent to your email. Please check your inbox and spam folder regularly.</div>
            </div>
          </div>
        </section>

        {/* Why Join/Testimonial Section */}
        <section className="px-4 sm:px-6 py-16 bg-[#1a1a1a]">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block bg-[#FFEDB1]/10 text-[#FFEDB1] px-3 py-1 rounded-full text-sm font-medium mb-3">
              <span className="flex items-center gap-1"><FaStar className="inline" /> Why Join?</span>
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">Be Part of the Next Generation of African Tech Talent</h2>
            <p className="text-gray-400 mb-8">Gain hands-on experience, mentorship, and a real pathway into the tech industry. SabiDub is more than a program—it's a launchpad for your career.</p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <div className="bg-[#222] rounded-2xl p-6 flex-1 min-w-[250px]">
                <div className="flex items-center gap-3 mb-2">
                  <Image src="/images/146757.jpg" alt="Alumni" width={48} height={48} className="rounded-full" />
                  <div>
                    <div className="text-white font-semibold">Nima A.A</div>
                    <div className="text-gray-400 text-xs">SabiDub Alumni</div>
                  </div>
                </div>
                <p className="text-gray-300 text-sm">“SabiDub gave me the skills and confidence to start my tech career. The real-world projects and mentorship were invaluable!”</p>
              </div>
              <div className="bg-[#222] rounded-2xl p-6 flex-1 min-w-[250px]">
                <div className="flex items-center gap-3 mb-2">
                  <Image src="/images/128895.jpg" alt="Alumni" width={48} height={48} className="rounded-full" />
                  <div>
                    <div className="text-white font-semibold">Samuel J.T</div>
                    <div className="text-gray-400 text-xs">SabiDub Alumni</div>
                  </div>
                </div>
                <p className="text-gray-300 text-sm">“The SabiDub program was a turning point for me. I learned so much and made connections that helped me land my first job.”</p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="px-4 sm:px-6 py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Join the SabiDub Competition?</h2>
            <p className="text-gray-400 mb-8">Take the next step in your tech journey. Register now and be part of something big!</p>
            <a href="#register" className="bg-[#FFEDB1] text-black px-8 py-3 rounded-md font-medium hover:bg-[#ffdb82] transition-colors">Closed Now</a>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
} 