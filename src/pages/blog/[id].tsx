import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Footer from "../../components/Footer";

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

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const authorInfo = {
  name: "Jane Doe",
  avatar: "/images/jnr.jpg",
  bio: "Jane is an experienced educator and exam coach, passionate about helping students succeed in WAEC and JAMB.",
  socials: [
    { name: "Twitter", url: "https://twitter.com/", icon: "twitter" },
    { name: "Facebook", url: "https://facebook.com/", icon: "facebook" },
    { name: "LinkedIn", url: "https://linkedin.com/", icon: "linkedin" },
  ],
};

const moreContent = `\n\n### Why Early Preparation Matters\n\nStarting your exam preparation early gives you enough time to cover all topics, revise, and practice. It reduces stress and boosts your confidence.\n\n### Top Resources for WAEC and JAMB\n\n- Official syllabuses\n- Past questions and answers\n- Online study groups\n- Educational apps like SabiDub\n\n### Common Mistakes to Avoid\n\n1. Procrastinating until the last minute\n2. Ignoring weak subjects\n3. Not practicing with past questions\n4. Poor time management during the exam\n\n### Final Tips\n\nStay positive, believe in yourself, and remember to take breaks. Good luck!`;

export default function BlogPostView() {
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState<BlogPost | null>(null);
  const [related, setRelated] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return;

      try {
        setLoading(true);
        // First try to fetch by slug
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || process.env.API_URL || 'http://localhost:4000';
        const response = await fetch(`${baseUrl}/blog/posts/${id}`);

        if (!response.ok) {
          throw new Error('Post not found');
        }

        const postData: BlogPost = await response.json();
        setPost(postData);

        // Fetch related posts
        const relatedResponse = await fetch(`${baseUrl}/blog/posts?limit=3&category=${postData.category}`);
        if (relatedResponse.ok) {
          const relatedData = await relatedResponse.json();
          const filteredRelated = relatedData.posts.filter((p: BlogPost) => p.slug !== id).slice(0, 2);
          setRelated(filteredRelated);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching post:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="text-center text-gray-900">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-400 mb-4"></div>
          <p>Loading post...</p>
        </div>
      </main>
    );
  }

  if (error || !post) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="text-center text-gray-900">
          <p className="text-red-400 mb-4">{error || 'Post not found'}</p>
          <Link href="/blog" className="text-yellow-600 hover:underline">
            ← Back to Blog
          </Link>
        </div>
      </main>
    );
  }

  // Safety check for required post properties
  if (!post.image || !post.author || !post.author.name) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="text-center text-gray-900">
          <p className="text-red-400 mb-4">Invalid post data</p>
          <Link href="/blog" className="text-yellow-600 hover:underline">
            ← Back to Blog
          </Link>
        </div>
      </main>
    );
  }

  return (
    <>
      <Head>
        <title>{post.title} - SabiDub Blog</title>
        <meta name="description" content={post.excerpt || post.title} />
      </Head>
      <motion.main initial="initial" animate="animate" className="min-h-screen bg-white relative overflow-x-hidden">
        {/* Full Background Image */}
        <div className="fixed inset-0 -z-10 w-full h-full">
          <div className="absolute inset-0">
            <Image src={post.image} alt="Blog Background" fill className="object-cover w-full h-full" priority />
            <div className="absolute inset-0 bg-gradient-to-b from-white via-white/90 to-white" />
          </div>
        </div>
        {/* App Bar / Navigation */}
        <nav className="px-4 sm:px-6 py-6 sm:py-8 flex items-center justify-between max-w-7xl mx-auto relative z-[60] bg-white">
          <Link href="/" className="flex items-center relative z-[60]">
            <div className="relative w-40 h-12">
              <Image src="/images/black.png" alt="SabiDub Logo" fill className="object-contain" priority />
            </div>
          </Link>
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-900 hover:text-yellow-600 transition-colors">Home</Link>
            <Link href="/about" className="text-gray-600 hover:text-yellow-600 transition-colors">About</Link>
            <Link href="/services" className="text-gray-600 hover:text-yellow-600 transition-colors">Services</Link>
            <Link href="/pricing" className="text-gray-600 hover:text-yellow-600 transition-colors">Pricing</Link>
            <Link href="/admission-checker" className="text-gray-600 hover:text-yellow-600 transition-colors">Admission Checker</Link>
            <Link href="/contact" className="text-gray-600 hover:text-yellow-600 transition-colors">Contact</Link>
            <button className="bg-yellow-400 text-black px-4 py-2 rounded-md font-medium hover:bg-[#ffdb82] transition-colors">Download App</button>
          </div>
        </nav>
        {/* Hero Section */}
        <section className="relative w-full h-96 sm:h-[500px] mb-12 flex items-end">
          <div className="absolute inset-0">
            <Image
              src={post.image || "/images/2149156427.jpg"}
              alt={post.title}
              fill
              className="object-cover object-center w-full h-full"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent" />
          </div>
          <div className="relative z-10 p-8 max-w-5xl mx-auto w-full">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="inline-block bg-yellow-600/20 backdrop-blur-sm text-yellow-600 px-4 py-2 rounded-full text-sm uppercase tracking-wider font-semibold mb-4">{post.category}</motion.div>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">{post.title}</motion.h1>
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-300 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-yellow-600/20 flex items-center justify-center">
                  <span className="text-yellow-600 font-semibold text-sm">{post.author.name.charAt(0)}</span>
                </div>
                <span className="font-medium">By {post.author.name}</span>
              </div>
              <span className="text-gray-600">•</span>
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                {post.readingTime}
              </span>
              <span className="text-gray-600">•</span>
              <span>{new Date(post.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}</span>
            </div>
            {/* Engagement Metrics */}
            <div className="flex items-center gap-6 text-sm text-gray-600 mb-4">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                </svg>
                <span>{post.viewCount.toLocaleString()} views</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
                <span>{post.likeCount.toLocaleString()} likes</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                </svg>
                <span>{post.commentCount.toLocaleString()} comments</span>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              {post.tags.map((tag) => (
                <span key={tag} className="bg-yellow-600/10 text-yellow-600 px-4 py-2 rounded-full text-sm font-medium border border-yellow-400/20">{tag}</span>
              ))}
            </div>
          </div>
        </section>
        {/* Content Section with Sidebar */}
        <section className="px-4 sm:px-6 py-12 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Article */}
            <div className="lg:col-span-2">
              <div className="mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 leading-tight">{post.title}</h2>
                <p className="text-gray-700 text-xl leading-relaxed mb-6 max-w-3xl font-light">{post.excerpt}</p>
                <div className="w-20 h-1 bg-yellow-400 rounded-full"></div>
              </div>
              <article className="prose prose-invert max-w-none">
                <div className="text-gray-700 text-lg leading-relaxed space-y-4">
                  {post.content.split('\n').map((line, i) => {
                    if (line.startsWith('### ')) {
                      return (
                        <h3 key={i} className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                          {line.replace('### ', '')}
                        </h3>
                      );
                    } else if (line.trim() === '') {
                      return <div key={i} className="h-2"></div>;
                    } else {
                      return (
                        <p key={i} className="text-gray-700 leading-7">
                          {line}
                        </p>
                      );
                    }
                  })}
                </div>
              </article>
              <div className="flex justify-between items-center mt-12 mb-12 pt-6 border-t border-gray-200">
                <button onClick={() => router.push('/blog')} className="flex items-center gap-2 text-yellow-600 hover:text-gray-900 transition-colors font-medium">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back to Blog
                </button>
              </div>
            </div>
            {/* Sidebar */}
            <aside className="lg:col-span-1 space-y-8">
              {/* Author Info */}
              <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl p-8 border border-gray-200/50 text-center">
                <div className="flex flex-col items-center mb-6">
                  <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-yellow-400/20 mb-4">
                    <Image
                      src={post.author.profilePicture || "/images/jnr.jpg"}
                      alt={post.author.name}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="text-gray-900 font-bold text-lg">{post.author.name}</div>
                    <div className="text-yellow-600 text-sm font-medium">Author</div>
                  </div>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">SabiDub Team Member</p>
              </div>
              {/* Share This Post */}
              <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl p-8 border border-gray-200/50 shadow-xl">
                <div className="text-gray-900 font-bold text-lg mb-6">Share this post</div>
                <div className="flex gap-4">
                  {/* Twitter/X */}
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}&via=sabidub`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-yellow-600/10 rounded-full flex items-center justify-center text-gray-600 hover:text-[#1DA1F2] hover:bg-[#1DA1F2]/20 transition-all"
                    title="Share on Twitter/X"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>

                  {/* Facebook */}
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-yellow-600/10 rounded-full flex items-center justify-center text-gray-600 hover:text-[#1877F2] hover:bg-[#1877F2]/20 transition-all"
                    title="Share on Facebook"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </a>

                  {/* LinkedIn */}
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-yellow-600/10 rounded-full flex items-center justify-center text-gray-600 hover:text-[#0A66C2] hover:bg-[#0A66C2]/20 transition-all"
                    title="Share on LinkedIn"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>

                  {/* WhatsApp */}
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(`${post.title} - ${window.location.href}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-yellow-600/10 rounded-full flex items-center justify-center text-gray-600 hover:text-[#25D366] hover:bg-[#25D366]/20 transition-all"
                    title="Share on WhatsApp"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                    </svg>
                  </a>

                  {/* Copy Link */}
                  <button
                    onClick={async () => {
                      try {
                        const url = typeof window !== 'undefined' ? window.location.href : '';
                        if (navigator.clipboard && window.isSecureContext) {
                          await navigator.clipboard.writeText(url);
                        } else {
                          // Fallback for older browsers
                          const textArea = document.createElement('textarea');
                          textArea.value = url;
                          textArea.style.position = 'fixed';
                          textArea.style.left = '-999999px';
                          textArea.style.top = '-999999px';
                          document.body.appendChild(textArea);
                          textArea.focus();
                          textArea.select();
                          document.execCommand('copy');
                          textArea.remove();
                        }
                        setCopied(true);
                        setTimeout(() => setCopied(false), 2000);
                      } catch (err) {
                        console.error('Failed to copy link:', err);
                      }
                    }}
                    className="w-12 h-12 bg-yellow-600/10 rounded-full flex items-center justify-center text-gray-600 hover:text-yellow-600 hover:bg-yellow-600/20 transition-all"
                    title={copied ? "Link copied!" : "Copy link"}
                  >
                    {copied ? (
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                      </svg>
                    ) : (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
              {/* Recent Posts */}
              <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl p-8 border border-gray-200/50 shadow-xl">
                <div className="text-gray-900 font-bold text-lg mb-6">Recent Posts</div>
                <ul className="space-y-4">
                  {related.slice(0, 3).map((p) => (
                    <li key={p.id} className="border-b border-gray-200/50 pb-4 last:border-b-0">
                      <Link href={`/blog/${p.slug}`} className="text-yellow-600 hover:text-gray-900 transition-colors text-sm font-medium block mb-2">
                        {p.title}
                      </Link>
                      <div className="text-xs text-gray-500">{new Date(p.publishedAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}</div>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </section>
        {/* Related Posts */}
        <section className="px-4 sm:px-0 max-w-6xl mx-auto pb-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Related Posts</h3>
            <div className="w-20 h-1 bg-yellow-400 rounded-full mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {related.map((rel) => (
              <Link href={`/blog/${rel.slug}`} key={rel.id} className="bg-gradient-to-br from-white to-gray-50 rounded-3xl overflow-hidden hover:scale-[1.02] transition-all duration-300 flex flex-col group border border-gray-200/50">
                <div className="relative w-full h-56">
                  <Image
                    src={rel.image || "/images/2149156427.jpg"}
                    alt={rel.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <div className="p-8 flex-1 flex flex-col">
                  <div className="inline-block bg-yellow-600/20 text-yellow-600 px-3 py-1 rounded-full text-xs uppercase tracking-wider font-semibold mb-4 w-fit">{rel.category}</div>
                  <h2 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-yellow-600 transition-colors leading-tight">{rel.title}</h2>
                  <p className="text-gray-600 mb-6 flex-1 leading-relaxed">{rel.excerpt}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-yellow-600/20 flex items-center justify-center">
                        <span className="text-yellow-600 font-semibold text-xs">{rel.author.name.charAt(0)}</span>
                      </div>
                      <span className="font-medium">{rel.author.name}</span>
                    </div>
                    <span className="text-gray-500">•</span>
                    <span>{rel.readingTime}</span>
                    <span className="text-gray-500">•</span>
                    <span>{new Date(rel.publishedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}</span>
                  </div>
                  {/* Engagement Metrics for Related Posts */}
                  <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                      </svg>
                      <span>{rel.viewCount.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                      </svg>
                      <span>{rel.likeCount.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                      </svg>
                      <span>{rel.commentCount.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {rel.tags.map((tag) => (
                      <span key={tag} className="bg-yellow-600/10 text-yellow-600 px-3 py-1 rounded-full text-xs font-medium border border-yellow-400/20">{tag}</span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
        <Footer />
      </motion.main>
    </>
  );
} 