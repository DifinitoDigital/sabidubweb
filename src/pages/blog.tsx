import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import Footer from "../components/Footer";

const categories = [
  "All",
  "Education",
  "Technology",
  "Student Life",
  "Tips",
  "Announcements",
];

const posts = [
  {
    id: 1,
    title: "How to Prepare for WAEC and JAMB Exams",
    category: "Education",
    excerpt: "Get the best tips and resources to ace your WAEC and JAMB exams with confidence.",
    image: "/images/2149156427.jpg",
    date: "2024-06-01",
    author: "Jane Doe",
    readingTime: "4 min read",
    tags: ["WAEC", "JAMB", "Study"],
    featured: true,
  },
  {
    id: 2,
    title: "Top 5 Study Apps for Nigerian Students",
    category: "Technology",
    excerpt: "Discover the best apps to boost your productivity and learning as a student in Nigeria.",
    image: "/images/146757.jpg",
    date: "2024-05-20",
    author: "John Smith",
    readingTime: "3 min read",
    tags: ["Apps", "Productivity"],
    featured: false,
  },
  {
    id: 3,
    title: "Balancing School and Social Life",
    category: "Student Life",
    excerpt: "Learn how to manage your time and enjoy both academic and social success.",
    image: "/images/128895.jpg",
    date: "2024-05-10",
    author: "Amina Ibrahim",
    readingTime: "5 min read",
    tags: ["Balance", "Student Life"],
    featured: false,
  },
  {
    id: 4,
    title: "SabiDub Platform: New Features Announced!",
    category: "Announcements",
    excerpt: "Check out the latest updates and features now available on SabiDub.",
    image: "/images/2151104075.jpg",
    date: "2024-06-05",
    author: "SabiDub Team",
    readingTime: "2 min read",
    tags: ["Platform", "Updates"],
    featured: false,
  },
];

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const filteredPosts =
    selectedCategory === "All"
      ? posts
      : posts.filter((post) => post.category === selectedCategory);

  const featured = posts.find((p) => p.featured);
  const trending = posts.filter((p) => !p.featured).slice(0, 2);

  return (
    <>
      <Head>
        <title>Blog - SabiDub</title>
        <meta name="description" content="Read the latest articles, tips, and news from SabiDub." />
      </Head>
      <motion.main initial="initial" animate="animate" className="min-h-screen bg-[#111] relative overflow-x-hidden">
        {/* Full Background Image */}
        <div className="fixed inset-0 -z-10 w-full h-full">
          <div className="absolute inset-0">
            <Image src="/images/backgroundw.png" alt="Blog Background" fill className="object-cover w-full h-full" priority />
            <div className="absolute inset-0 bg-gradient-to-b from-[#111]/80 via-[#111]/90 to-[#111]" />
          </div>
        </div>
        {/* App Bar / Navigation */}
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
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-white hover:text-[#FFEDB1] transition-colors">Home</Link>
            <Link href="/about" className="text-gray-400 hover:text-[#FFEDB1] transition-colors">About</Link>
            <Link href="/services" className="text-gray-400 hover:text-[#FFEDB1] transition-colors">Services</Link>
            <Link href="/pricing" className="text-gray-400 hover:text-[#FFEDB1] transition-colors">Pricing</Link>
            <Link href="/competition" className="text-gray-400 hover:text-[#FFEDB1] transition-colors">Competition</Link>
            <Link href="/contact" className="text-gray-400 hover:text-[#FFEDB1] transition-colors">Contact</Link>
            <button className="bg-[#FFEDB1] text-black px-4 py-2 rounded-md font-medium hover:bg-[#ffdb82] transition-colors">Download App</button>
          </div>
          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden flex flex-col items-center justify-center w-10 h-10 bg-[#1a1a1a] rounded-lg hover:bg-[#252525] transition-colors relative z-[60]"
          >
            <span className={`w-5 h-0.5 bg-white mb-1 transition-transform ${isMenuOpen ? "rotate-45 translate-y-1.5" : ""}`}></span>
            <span className={`w-5 h-0.5 bg-white transition-opacity ${isMenuOpen ? "opacity-0" : ""}`}></span>
            <span className={`w-5 h-0.5 bg-white mt-1 transition-transform ${isMenuOpen ? "-rotate-45 -translate-y-1.5" : ""}`}></span>
          </button>
        </nav>
        {/* Sliding Menu - Mobile Only */}
        <div
          className={`md:hidden fixed top-0 right-0 w-full sm:w-80 h-full bg-[#1a1a1a] z-[50] transform transition-transform duration-300 ease-in-out ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}
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
                <button onClick={toggleMenu} className="text-gray-400 hover:text-white">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="flex flex-col space-y-4">
                <Link href="/" className="text-gray-400 hover:text-[#FFEDB1] transition-colors py-2 border-b border-gray-800" onClick={toggleMenu}>Home</Link>
                <Link href="/about" className="text-gray-400 hover:text-[#FFEDB1] transition-colors py-2 border-b border-gray-800" onClick={toggleMenu}>About</Link>
                <Link href="/services" className="text-gray-400 hover:text-[#FFEDB1] transition-colors py-2 border-b border-gray-800" onClick={toggleMenu}>Services</Link>
                <Link href="/pricing" className="text-gray-400 hover:text-[#FFEDB1] transition-colors py-2 border-b border-gray-800" onClick={toggleMenu}>Pricing</Link>
                <Link href="/competition" className="text-gray-400 hover:text-[#FFEDB1] transition-colors py-2 border-b border-gray-800" onClick={toggleMenu}>Competition</Link>
                <Link href="/contact" className="text-gray-400 hover:text-[#FFEDB1] transition-colors py-2 border-b border-gray-800" onClick={toggleMenu}>Contact</Link>
              </div>
              <div className="mt-auto pt-6">
                <button className="w-full bg-[#FFEDB1] text-black px-4 py-3 rounded-md font-medium hover:bg-[#ffdb82] transition-colors">Download App</button>
              </div>
            </div>
          </div>
        </div>
        {/* Overlay */}
        {isMenuOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-[40]" onClick={toggleMenu}></div>
        )}
        {/* Hero Section */}
        <section className="px-4 sm:px-6 pt-16 pb-12 max-w-7xl mx-auto text-center relative">
          <div className="absolute inset-0 pointer-events-none select-none">
            <Image src="/images/backgroundw.png" alt="Blog Hero" fill className="object-cover opacity-10" />
          </div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-4xl sm:text-5xl font-bold text-white mb-4 relative z-10">SabiDub Blog</motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-gray-400 max-w-2xl mx-auto mb-8 relative z-10">Insights, tips, and stories to empower your educational journey. Explore our latest articles and updates.</motion.p>
          {/* Featured Post */}
          {featured && (
            <motion.div variants={fadeInUp} initial="initial" animate="animate" className="max-w-3xl mx-auto mb-12 relative z-10">
              <Link href={`/blog/${featured.id}`} className="block group rounded-3xl overflow-hidden shadow-2xl border border-[#FFEDB1]/20 bg-[#1a1a1a] hover:scale-[1.01] transition-transform">
                <div className="relative w-full h-64 sm:h-80">
                  <Image src={featured.image} alt={featured.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="100vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-[#111]/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-6">
                    <div className="text-xs text-[#FFEDB1] mb-2 uppercase tracking-wider font-semibold">{featured.category}</div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 group-hover:text-[#FFEDB1] transition-colors">{featured.title}</h2>
                    <p className="text-gray-300 mb-2 max-w-xl">{featured.excerpt}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-400">
                      <span>By {featured.author}</span>
                      <span>• {featured.readingTime}</span>
                      <span>• {new Date(featured.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex gap-2 mt-2">
                      {featured.tags.map((tag) => (
                        <span key={tag} className="bg-[#FFEDB1]/10 text-[#FFEDB1] px-2 py-1 rounded-full text-xs">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          )}
        </section>
        {/* Trending Posts */}
        <section className="px-4 sm:px-6 pb-8 max-w-7xl mx-auto">
          <h3 className="text-lg font-bold text-white mb-6">Trending</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
            {trending.map((post) => (
              <Link href={`/blog/${post.id}`} key={post.id} className="bg-[#1a1a1a] rounded-2xl overflow-hidden shadow-lg hover:scale-[1.03] transition-transform flex flex-col group border border-gray-800">
                <div className="relative w-full h-48">
                  <Image src={post.image} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="100vw" />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="text-xs text-[#FFEDB1] mb-2 uppercase tracking-wider font-semibold">{post.category}</div>
                  <h2 className="text-lg font-bold text-white mb-2 group-hover:text-[#FFEDB1] transition-colors">{post.title}</h2>
                  <p className="text-gray-400 mb-2 flex-1">{post.excerpt}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-400">
                    <span>By {post.author}</span>
                    <span>• {post.readingTime}</span>
                    <span>• {new Date(post.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex gap-2 mt-2">
                    {post.tags.map((tag) => (
                      <span key={tag} className="bg-[#FFEDB1]/10 text-[#FFEDB1] px-2 py-1 rounded-full text-xs">{tag}</span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
        {/* Category Filter & All Posts */}
        <section className="px-4 sm:px-6 pb-20 max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-3 justify-center mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border focus:outline-none focus:ring-2 focus:ring-[#FFEDB1]/30 ${selectedCategory === cat ? "bg-[#FFEDB1] text-black border-[#FFEDB1]" : "bg-[#1a1a1a] text-white border-gray-700 hover:bg-[#252525]"}`}
              >
                {cat}
              </button>
            ))}
          </div>
          <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10" variants={{ animate: { transition: { staggerChildren: 0.15 } } }} initial="initial" animate="animate">
            {filteredPosts.map((post, idx) => (
              <motion.div key={post.id} variants={fadeInUp} className="bg-[#1a1a1a] rounded-2xl overflow-hidden shadow-lg hover:scale-[1.03] transition-transform flex flex-col group border border-gray-800">
                <Link href={`/blog/${post.id}`} className="block">
                  <div className="relative w-full h-56">
                    <Image src={post.image} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="(max-width: 768px) 100vw, 33vw" />
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="text-xs text-[#FFEDB1] mb-2 uppercase tracking-wider font-semibold">{post.category}</div>
                    <h2 className="text-xl font-bold text-white mb-2 group-hover:text-[#FFEDB1] transition-colors">{post.title}</h2>
                    <p className="text-gray-400 mb-2 flex-1">{post.excerpt}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-400">
                      <span>By {post.author}</span>
                      <span>• {post.readingTime}</span>
                      <span>• {new Date(post.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex gap-2 mt-2">
                      {post.tags.map((tag) => (
                        <span key={tag} className="bg-[#FFEDB1]/10 text-[#FFEDB1] px-2 py-1 rounded-full text-xs">{tag}</span>
                      ))}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </section>
        {/* Call to Action */}
        <section className="px-4 sm:px-6 pb-20 max-w-7xl mx-auto">
          <div className="bg-[#1a1a1a] rounded-2xl p-10 flex flex-col md:flex-row items-center justify-between gap-8 shadow-lg border border-[#FFEDB1]/10">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">Stay Updated!</h3>
              <p className="text-gray-400 mb-4">Subscribe to our newsletter for the latest blog updates, tips, and platform news.</p>
              <form className="flex flex-col sm:flex-row gap-3">
                <input type="email" placeholder="Your email address" className="px-4 py-3 rounded-lg bg-[#252525] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#FFEDB1]/20" />
                <button type="submit" className="bg-[#FFEDB1] text-black px-6 py-3 rounded-lg font-medium hover:bg-[#ffdb82] transition-colors">Subscribe</button>
              </form>
            </div>
            <div className="w-40 h-40 relative hidden md:block">
              <Image src="/images/white.png" alt="Newsletter" fill className="object-contain opacity-80" />
            </div>
          </div>
        </section>
        <Footer />
      </motion.main>
    </>
  );
} 