import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Footer from "../components/Footer";
import { useRouter } from "next/router";
import Navbar from "../components/Navbar";

// Types for the API response
interface Author {
  id: string;
  name: string;
  email: string;
  profilePicture: string;
}

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  tags: string[];
  readingTime: string;
  isPublished: boolean;
  isFeatured: boolean;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
  author: Author;
}

interface BlogResponse {
  posts: BlogPost[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

const categories = [
  "All",
  "Education",
  "Technology",
  "Student Life",
  "Tips",
  "Announcements",
];

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

export default function BlogPage() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);



  // Fetch posts from API
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams({
          page: currentPage.toString(),
          limit: '10'
        });

        if (selectedCategory !== "All") {
          params.append('category', selectedCategory);
        }

        const baseUrl = process.env.NEXT_PUBLIC_API_URL || process.env.API_URL || 'http://localhost:4000';
        const response = await fetch(`${baseUrl}/blog/posts?${params.toString()}`);

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          throw new Error('Server returned non-JSON response');
        }

        const data: BlogResponse = await response.json();
        setPosts(data.posts);
        setTotalPages(data.totalPages);
        setError(null);
      } catch (err) {
        console.error('Error fetching posts:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch posts');
        setPosts([]);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [selectedCategory, currentPage]);

  const filteredPosts = posts;
  const featured = posts.find((p) => p.isFeatured) || posts[0];
  const trending = posts.filter((p) => !p.isFeatured && p.id !== featured?.id).slice(0, 2);

  return (
    <>
      <Head>
        <title>Blog - SabiDub</title>
        <meta name="description" content="Read the latest articles, tips, and news from SabiDub." />
      </Head>
      <motion.main initial="initial" animate="animate" className="min-h-screen bg-white relative overflow-x-hidden pt-24">
        <Navbar />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {/* Featured Post - Large Style per reference */}
          {featured && (
            <Link href={`/blog/${featured.slug}`}>
              <motion.div
                variants={fadeInUp}
                initial="initial"
                animate="animate"
                className="relative w-full h-[450px] sm:h-[650px] rounded-[32px] sm:rounded-[50px] overflow-hidden mb-16 sm:mb-24 group shadow-3xl cursor-pointer"
              >
                <Image
                  src={featured.image || "/images/placeholder.png"}
                  alt={featured.title}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  priority
                />

                {/* Refined Glassmorphism Overlay */}
                <div className="absolute inset-x-4 bottom-4 sm:inset-x-12 sm:bottom-12">
                  <div className="bg-white/10 backdrop-blur-3xl border border-white/20 p-6 sm:p-10 rounded-[24px] sm:rounded-[40px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
                    <div className="relative z-10">
                      <span className="text-white/70 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] mb-2 sm:mb-3 block">Featured</span>
                      <h2 className="text-xl sm:text-4xl font-bold text-white mb-2 sm:mb-4 leading-tight tracking-tight max-w-5xl">
                        {featured.title}
                      </h2>
                      <p className="text-white/80 text-[11px] sm:text-sm line-clamp-2 max-w-4xl leading-relaxed mb-4 sm:mb-6">
                        {featured.excerpt}
                      </p>
                      <div className="flex items-center gap-2 group/link">
                        <span className="text-white text-[10px] sm:text-xs font-bold uppercase tracking-widest">Read more</span>
                        <div className="p-1 rounded-full bg-white/10 group-hover/link:bg-white group-hover/link:rotate-45 transition-all duration-300">
                          <svg className="w-3 h-3 text-white group-hover/link:text-gray-900 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    {/* Decorative element inside glass */}
                    <div className="absolute -right-32 -bottom-32 w-96 h-96 bg-white/5 rounded-full blur-[100px] pointer-events-none" />
                  </div>
                </div>
              </motion.div>
            </Link>
          )}

          {/* Recent Posts Section */}
          <div className="mb-12">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-black text-gray-900">Recent blog posts</h2>
              <Link href="/blog" className="px-4 py-2 bg-[#F0F7FF] text-[#014751] rounded-lg text-xs font-bold hover:bg-[#E0F0FF] transition-all">
                View all posts
              </Link>
            </div>

            {/* Loading State */}
            {loading && (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#014751]"></div>
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="bg-red-50 p-6 rounded-2xl text-center">
                <p className="text-red-600 font-bold mb-4">{error}</p>
                <button onClick={() => window.location.reload()} className="bg-[#014751] text-white px-6 py-2 rounded-full text-sm">Retry</button>
              </div>
            )}

            {/* Posts Grid */}
            {!loading && !error && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12">
                {posts.filter(p => p.id !== featured?.id).map((post) => (
                  <motion.div
                    key={post.id}
                    variants={fadeInUp}
                    className="group relative flex flex-col"
                  >
                    <Link href={`/blog/${post.slug}`} className="block">
                      <div className="relative w-full aspect-[4/3] rounded-[24px] sm:rounded-[32px] overflow-hidden mb-4 sm:mb-6 shadow-sm border border-gray-100">
                        <Image
                          src={post.image || "/images/placeholder.png"}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        {/* Hover Overlay with Button */}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
                          <div className="flex items-center gap-2 bg-white/90 px-6 py-2.5 rounded-full text-gray-900 font-black text-xs shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                            Read more
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7-7 7" />
                            </svg>
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                          <span className="text-[10px] font-black uppercase tracking-widest text-[#014751] bg-[#014751]/5 px-2.5 py-1 rounded-full">{post.category}</span>
                          <span className="text-[9px] sm:text-[10px] font-bold text-gray-400 uppercase tracking-widest">{post.readingTime} read</span>
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3 group-hover:text-[#014751] transition-colors leading-tight">{post.title}</h3>
                        <p className="text-gray-500 text-xs sm:text-sm line-clamp-2">{post.excerpt}</p>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {!loading && totalPages > 1 && (
              <div className="flex justify-center items-center gap-4 mt-16 pb-20">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                </button>
                <div className="flex gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-12 h-12 rounded-full font-bold text-sm transition-all ${currentPage === page ? "bg-[#014751] text-white shadow-lg shadow-[#014751]/20" : "hover:bg-gray-50 text-gray-600"}`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </button>
              </div>
            )}
          </div>

          {/* Newsletter Box */}
          <section className="mt-12">
            <div className="bg-[#0F2830] rounded-[40px] p-12 sm:p-20 relative overflow-hidden">
              <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto">
                <div className="w-16 h-16 bg-[#AFF8C8]/10 rounded-2xl flex items-center justify-center mb-8">
                  <svg className="w-8 h-8 text-[#AFF8C8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v12a2 2 0 01-2 2z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l9 6 9-6" />
                  </svg>
                </div>
                <h2 className="text-3xl sm:text-5xl font-black text-white mb-4 sm:mb-6">Stay ahead of the curve</h2>
                <p className="text-gray-400 text-base sm:text-lg mb-8 sm:mb-10 leading-relaxed">Join 5,000+ students and educators receiving our weekly newsletter on the future of Nigerian education.</p>
                <form className="w-full max-w-md flex flex-col sm:flex-row gap-4">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-6 py-4 rounded-full bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#AFF8C8]/30 transition-all font-medium"
                  />
                  <button className="px-10 py-4 bg-[#AFF8C8] text-[#014751] rounded-full font-black text-sm hover:scale-105 active:scale-95 transition-all shadow-xl shadow-[#AFF8C8]/10">
                    Subscribe
                  </button>
                </form>
              </div>
              {/* Decorative blobs */}
              <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-[#AFF8C8]/5 rounded-full blur-[120px]" />
              <div className="absolute bottom-[-10%] right-[-5%] w-80 h-80 bg-white/5 rounded-full blur-[100px]" />
            </div>
          </section>
        </div>

        <Footer showAppDownload={false} />
      </motion.main>
    </>
  );
}
