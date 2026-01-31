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
  const featured = posts.find((p) => p.isFeatured);
  const trending = posts.filter((p) => !p.isFeatured).slice(0, 2);

  return (
    <>
      <Head>
        <title>Blog - SabiDub</title>
        <meta name="description" content="Read the latest articles, tips, and news from SabiDub." />
      </Head>
      <motion.main initial="initial" animate="animate" className="min-h-screen bg-white relative overflow-x-hidden">
        {/* Full Background Image */}
        <div className="fixed inset-0 -z-10 w-full h-full">
          <div className="absolute inset-0">
            <Image src="/images/backgroundw.png" alt="Blog Background" fill className="object-cover w-full h-full" priority />
            <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/90 to-white" />
          </div>
        </div>

        <Navbar />
        {/* Hero Section */}
        <section className="px-4 sm:px-6 pt-32 pb-12 max-w-7xl mx-auto text-center relative">
          <div className="absolute inset-0 pointer-events-none select-none">
            <Image src="/images/backgroundw.png" alt="Blog Hero" fill className="object-cover opacity-10" />
          </div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 relative z-10">SabiDub Blog</motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-gray-600 max-w-2xl mx-auto mb-8 relative z-10">Insights, tips, and stories to empower your educational journey. Explore our latest articles and updates.</motion.p>
          {/* Featured Post */}
          {featured && (
            <motion.div variants={fadeInUp} initial="initial" animate="animate" className="max-w-3xl mx-auto mb-12 relative z-10">
              <Link href={`/blog/${featured.slug}`} className="block group rounded-3xl overflow-hidden shadow-2xl border border-[#014751]/20 bg-white border border-gray-100 shadow-sm hover:scale-[1.01] transition-transform">
                <div className="relative w-full h-64 sm:h-80">
                  <Image src={featured.image} alt={featured.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="100vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-6">
                    <div className="text-xs text-[#014751] mb-2 uppercase tracking-wider font-semibold">{featured.category}</div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 group-hover:text-[#014751] transition-colors">{featured.title}</h2>
                    <p className="text-gray-900 mb-2 max-w-xl">{featured.excerpt}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-600">
                      <span>By {featured.author.name}</span>
                      <span>• {featured.readingTime}</span>
                      <span>• {new Date(featured.publishedAt).toLocaleDateString()}</span>
                    </div>
                    <div className="flex gap-2 mt-2">
                      {featured.tags.map((tag) => (
                        <span key={tag} className="bg-[#014751]/10 text-[#014751] px-2 py-1 rounded-full text-xs">{tag}</span>
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
          <h3 className="text-lg font-bold text-gray-900 mb-6">Trending</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
            {trending.map((post) => (
              <Link href={`/blog/${post.slug}`} key={post.id} className="bg-white border border-gray-100 shadow-sm rounded-2xl overflow-hidden shadow-lg hover:scale-[1.03] transition-transform flex flex-col group border border-gray-200">
                <div className="relative w-full h-48">
                  <Image src={post.image} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="100vw" />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="text-xs text-[#014751] mb-2 uppercase tracking-wider font-semibold">{post.category}</div>
                  <h2 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-[#014751] transition-colors">{post.title}</h2>
                  <p className="text-gray-600 mb-2 flex-1">{post.excerpt}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-600">
                    <span>By {post.author.name}</span>
                    <span>• {post.readingTime}</span>
                    <span>• {new Date(post.publishedAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex gap-2 mt-2">
                    {post.tags.map((tag) => (
                      <span key={tag} className="bg-[#014751]/10 text-[#014751] px-2 py-1 rounded-full text-xs">{tag}</span>
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
                onClick={() => {
                  setSelectedCategory(cat);
                  setCurrentPage(1); // Reset to first page when changing category
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border focus:outline-none focus:ring-2 focus:ring-[#014751]/30 ${selectedCategory === cat ? "bg-[#014751] text-white border-[#014751]" : "bg-white border border-gray-100 shadow-sm text-white border-gray-200 hover:bg-gray-50"}`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#014751]"></div>
              <p className="text-gray-600 mt-4">Loading posts...</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center py-12">
              <div className="bg-white border border-gray-100 shadow-sm rounded-lg p-6 border border-red-500/20">
                <p className="text-red-400 mb-2 font-medium">Error Loading Posts</p>
                <p className="text-gray-600 text-sm mb-4">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="bg-[#014751] text-white px-4 py-2 rounded-md hover:bg-[#013b43] transition-colors text-sm"
                >
                  Try Again
                </button>
              </div>
            </div>
          )}

          {/* Posts Grid */}
          {!loading && !error && (
            <>
              <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10" variants={{ animate: { transition: { staggerChildren: 0.15 } } }} initial="initial" animate="animate">
                {filteredPosts.map((post, idx) => (
                  <motion.div key={post.id} variants={fadeInUp} className="bg-white border border-gray-100 shadow-sm rounded-2xl overflow-hidden shadow-lg hover:scale-[1.03] transition-transform flex flex-col group border border-gray-200">
                    <Link href={`/blog/${post.slug}`} className="block">
                      <div className="relative w-full h-56">
                        <Image src={post.image} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="(max-width: 768px) 100vw, 33vw" />
                      </div>
                      <div className="p-6 flex-1 flex flex-col">
                        <div className="text-xs text-[#014751] mb-2 uppercase tracking-wider font-semibold">{post.category}</div>
                        <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#014751] transition-colors">{post.title}</h2>
                        <p className="text-gray-600 mb-2 flex-1">{post.excerpt}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-600">
                          <span>By {post.author.name}</span>
                          <span>• {post.readingTime}</span>
                          <span>• {new Date(post.publishedAt).toLocaleDateString()}</span>
                        </div>
                        <div className="flex gap-2 mt-2">
                          {post.tags.map((tag) => (
                            <span key={tag} className="bg-[#014751]/10 text-[#014751] px-2 py-1 rounded-full text-xs">{tag}</span>
                          ))}
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-12">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 rounded-md bg-white border border-gray-100 shadow-sm text-gray-900 border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Previous
                  </button>
                  <span className="text-gray-600 px-4">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 rounded-md bg-white border border-gray-100 shadow-sm text-gray-900 border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Next
                  </button>
                </div>
              )}

              {/* No Posts Message */}
              {filteredPosts.length === 0 && !loading && !error && (
                <div className="text-center py-12">
                  <p className="text-gray-600">No posts found in this category.</p>
                </div>
              )}
            </>
          )}
        </section>
        {/* Call to Action */}
        <section className="px-4 sm:px-6 pb-20 max-w-7xl mx-auto">
          <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-10 flex flex-col md:flex-row items-center justify-between gap-8 shadow-lg border border-[#014751]/10">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Stay Updated!</h3>
              <p className="text-gray-600 mb-4">Subscribe to our newsletter for the latest blog updates, tips, and platform news.</p>
              <form className="flex flex-col sm:flex-row gap-3">
                <input type="email" placeholder="Your email address" className="px-4 py-3 rounded-lg bg-gray-50 text-gray-900 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#014751]/20" />
                <button type="submit" className="bg-[#014751] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#013b43] transition-colors">Subscribe</button>
              </form>
            </div>
            <div className="w-40 h-40 relative hidden md:block">
              <Image src="/images/black.png" alt="Newsletter" fill className="object-contain opacity-80" />
            </div>
          </div>
        </section>
        <Footer />
      </motion.main>
    </>
  );
} 