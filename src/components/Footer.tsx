import Link from "next/link";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white text-gray-600 py-24 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Download App Banner */}
        <section className="px-4 sm:px-6 py-8 sm:py-16 bg-white mb-16 pb-16">
          <div className="max-w-5xl mx-auto rounded-2xl bg-gradient-to-r from-gray-50 to-gray-100 p-8 sm:p-12 relative overflow-hidden border border-gray-200 shadow-sm">
            <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-400 opacity-10 rounded-full translate-x-1/3 -translate-y-1/3"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-yellow-400 opacity-10 rounded-full -translate-x-1/3 translate-y-1/3"></div>
            <div className="relative z-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
                Download Our App Free and
                <br className="hidden sm:block" />
                Enjoy Exclusive Features!
              </h2>
              <p className="text-gray-600 max-w-md mb-6 sm:mb-8">
                Enjoy a richer experience, exclusive content, and personalized
                lessons right on your fingertips. Download the app today for a
                better education journey.
              </p>
              <div className="flex flex-col sm:flex-row justify-start gap-4">
                <button className="bg-black text-white px-6 py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 group">
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
                <button className="bg-black text-white px-6 py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 group">
                  <svg
                    className="w-8 h-8 text-[#FFEDB1] group-hover:scale-110 transition-transform"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M19.665 16.811a10.316 10.316 0 0 1-1.021 1.837 4.466 4.466 0 0 1-1.317 1.362c-.516.344-1.086.645-1.711.902-1.688.685-3.539.786-5.349.392-1.249-.269-2.448-.794-3.519-1.543-1.176-.86-2.155-1.994-2.845-3.317a9.976 9.976 0 0 1-1.269-5.063a10.716 10.716 0 0 1 2.517-6.869a10.542 10.542 0 0 1 6.206-3.426a10.577 10.577 0 0 1 3.489-.062a8.33 8.33 0 0 1 1.656.404a9.759 9.759 0 0 1 2.824 1.541c.322.256.646.501.963.76.5.4.851.843 1.058 1.332.1.243.17.494.207.75a4.55 4.55 0 0 1-1.256 3.869a4.902 4.902 0 0 1-2.272 1.341a4.105 4.105 0 0 1-2.084.055c-.219-.036-.436-.08-.656-.107a3.735 3.735 0 0 0-1.138.001a2.582 2.582 0 0 0-1.147.436V11.2h6.309v5.611z" />
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

        <div className="grid grid-cols-1 md:grid-cols-4 gap-16">
          {/* Company Info */}
          <div className="space-y-6">
            <h3 className="text-gray-900 font-semibold text-xl">SabiDub</h3>
            <p className="text-base">
              Empowering Nigerian students with comprehensive educational
              resources and personalized learning experiences.
            </p>
            <div className="flex space-x-6">
              <Link
                href="https://facebook.com"
                className="hover:text-yellow-600 transition-colors"
              >
                <FaFacebook size={24} />
              </Link>
              <Link
                href="https://twitter.com"
                className="hover:text-yellow-600 transition-colors"
              >
                <FaTwitter size={24} />
              </Link>
              <Link
                href="https://instagram.com"
                className="hover:text-yellow-600 transition-colors"
              >
                <FaInstagram size={24} />
              </Link>
              <Link
                href="https://linkedin.com"
                className="hover:text-yellow-600 transition-colors"
              >
                <FaLinkedin size={24} />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-gray-900 font-semibold text-xl mb-6">
              Quick Links
            </h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/"
                  className="hover:text-yellow-600 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-yellow-600 transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="hover:text-yellow-600 transition-colors"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="hover:text-yellow-600 transition-colors"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-yellow-600 transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-gray-900 font-semibold text-xl mb-6">Resources</h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/blog"
                  className="hover:text-yellow-600 transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/help"
                  className="hover:text-yellow-600 transition-colors"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="hover:text-yellow-600 transition-colors"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="hover:text-yellow-600 transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="hover:text-yellow-600 transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-gray-900 font-semibold text-xl mb-6">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:+2348012345678"
                  className="hover:text-yellow-600 transition-colors"
                >
                  +234 801 234 5678
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@sabidu.com"
                  className="hover:text-yellow-600 transition-colors"
                >
                  info@sabidub.com
                </a>
              </li>
              <li className="text-sm">
                123 Education Street,
                <br />
                Lagos, Nigeria
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-gray-200 text-sm text-center">
          <p>&copy; {new Date().getFullYear()} Sabidu. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
