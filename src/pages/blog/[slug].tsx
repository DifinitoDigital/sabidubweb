import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import { motion } from "framer-motion";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { GetServerSideProps } from "next";

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

interface BlogPostViewProps {
  post: BlogPost;
  related: BlogPost[];
}

export const getServerSideProps: GetServerSideProps<BlogPostViewProps> = async (context) => {
  const { slug } = context.params as { slug: string };
  const baseUrl = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

  try {
    const response = await fetch(`${baseUrl}/blog/posts/${slug}`);

    if (!response.ok) {
      return { notFound: true };
    }

    const post: BlogPost = await response.json();

    // Fetch related posts
    let related: BlogPost[] = [];
    const relatedResponse = await fetch(`${baseUrl}/blog/posts?limit=3&category=${post.category}`);
    if (relatedResponse.ok) {
      const relatedData = await relatedResponse.json();
      related = relatedData.posts.filter((p: BlogPost) => p.slug !== slug).slice(0, 2);
    }

    return {
      props: {
        post,
        related,
      },
    };
  } catch (err) {
    console.error('Error in getServerSideProps:', err);
    return { notFound: true };
  }
};

export default function BlogPostView({ post, related }: BlogPostViewProps) {
  const router = useRouter();

  // Safety check for required post properties
  if (!post || !post.image || !post.author || !post.author.name) {
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

  // Ensure image URL is absolute for social media previews
  const siteUrl = "https://www.sabidub.com";
  const safeImage = post.image?.replace(/ /g, '%20');
  const imageUrl = safeImage 
    ? (safeImage.startsWith('http') ? safeImage : `${siteUrl}${safeImage}`)
    : `${siteUrl}/images/black.png`;

  return (
    <>
      <Head>
        <title key="title">{post.title} - SabiDub Blog</title>
        <meta name="description" content={post.excerpt || post.title} key="description" />

        {/* Open Graph / Facebook / WhatsApp */}
        <meta property="og:type" content="article" key="og-type" />
        <meta property="og:url" content={`${siteUrl}/blog/${post.slug}`} key="og-url" />
        <meta property="og:title" content={post.title} key="og-title" />
        <meta property="og:description" content={post.excerpt || post.title} key="og-desc" />
        <meta property="og:image" content={imageUrl} key="og-image" />
        <meta property="og:image:secure_url" content={imageUrl} key="og-image-secure" />
        <meta property="og:image:alt" content={post.title} key="og-image-alt" />
        <meta property="og:site_name" content="SabiDub" key="og-site-name" />

        {/* Schema.org for Google+ / Pinterest */}
        <meta itemProp="name" content={post.title} />
        <meta itemProp="description" content={post.excerpt || post.title} />
        <meta itemProp="image" content={imageUrl} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" key="twitter-card" />
        <meta name="twitter:site" content="@SabiDub" key="twitter-site" />
        <meta name="twitter:url" content={`${siteUrl}/blog/${post.slug}`} key="twitter-url" />
        <meta name="twitter:title" content={post.title} key="twitter-title" />
        <meta name="twitter:description" content={post.excerpt || post.title} key="twitter-desc" />
        <meta name="twitter:image" content={imageUrl} key="twitter-image" />
      </Head>
      <motion.main initial="initial" animate="animate" className="min-h-screen bg-white relative overflow-x-hidden pt-24">
        {/* Full Background Image */}
        <div className="fixed inset-0 -z-10 w-full h-full">
          <div className="absolute inset-0">
            <Image src={post.image} alt="Blog Background" fill className="object-cover w-full h-full" priority />
            <div className="absolute inset-0 bg-gradient-to-b from-white via-white/90 to-white" />
          </div>
        </div>
        <Navbar />
        {/* Hero Section */}
        <section className="relative w-full min-h-[500px] sm:min-h-[600px] flex items-end pb-12 sm:pb-20">
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
          <div className="relative z-10 p-6 sm:p-8 max-w-5xl mx-auto w-full">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="inline-block bg-[#014751]/10 backdrop-blur-sm text-[#014751] px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-[10px] sm:text-xs uppercase tracking-wider font-bold mb-4">{post.category}</motion.div>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-2xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">{post.title}</motion.h1>
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-600 mb-4">

              <span className="text-gray-400">•</span>
              <span className="flex items-center gap-2 bg-[#014751]/10 px-3 py-1.5 rounded-full">
                <svg className="w-4 h-4 text-[#014751]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                <span className="font-bold text-[#014751]">{post.readingTime}</span>
              </span>
              <span className="text-gray-400">•</span>
              <span className="font-medium">{new Date(post.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}</span>
            </div>
            <div className="flex flex-wrap gap-2 sm:gap-3 mt-6">
              {post.tags.map((tag) => (
                <span key={tag} className="bg-[#014751]/10 text-[#014751] px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-[10px] sm:text-sm font-medium border border-[#014751]/20">{tag}</span>
              ))}
            </div>
          </div>
        </section>
        {/* Content Section with Sidebar */}
        <section className="px-4 sm:px-6 py-12 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Article */}
            <div className="lg:col-span-2">
              <div className="mb-10 sm:mb-12">
                {/* <h2 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-4 leading-tight">{post.title}</h2> */}
                <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-6 max-w-3xl font-light italic">
                  {post.excerpt}
                </p>
                <div className="w-20 h-1.5 bg-[#AFF8C8] rounded-full"></div>
              </div>
              <article className="prose prose-invert max-w-none">
                <div className="text-gray-700 text-sm sm:text-base leading-relaxed space-y-4">
                  {post.content.split('\n').map((line, i) => {
                    if (line.startsWith('### ')) {
                      return (
                        <h3 key={i} className="text-xl sm:text-2xl font-bold text-gray-900 mt-8 mb-4">
                          {line.replace('### ', '')}
                        </h3>
                      );
                    } else if (line.trim() === '') {
                      return <div key={i} className="h-4"></div>;
                    } else {
                      return (
                        <p key={i} className="text-gray-700 leading-normal">
                          {line}
                        </p>
                      );
                    }
                  })}
                </div>
              </article>
              <div className="flex justify-between items-center mt-12 mb-12 pt-6 border-t border-gray-200">
                <button onClick={() => router.push('/blog')} className="flex items-center gap-2 text-[#014751] hover:text-gray-900 transition-colors font-medium">
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
              <div className="flex items-center gap-3 bg-gray-50 rounded-2xl p-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                  <Image
                    src={post.author.profilePicture || "/images/jnr.jpg"}
                    alt={post.author.name}
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-gray-900 font-bold text-sm leading-tight">By {post.author.name}</span>
                  <span className="text-gray-400 text-xs font-medium">SabiDub Team</span>
                </div>
              </div>

            </aside>
          </div>
        </section>
        {/* Related Posts */}
        <section className="px-4 sm:px-0 max-w-6xl mx-auto pb-20">
          <div className="text-center mb-12">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Read this next</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
            {related.map((rel) => (
              <Link href={`/blog/${rel.slug}`} key={rel.id} className="block group">
                <div className="relative w-full h-48 sm:h-64 rounded-xl overflow-hidden mb-4 sm:mb-6">
                  <Image
                    src={rel.image || "/images/2149156427.jpg"}
                    alt={rel.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 group-hover:text-[#014751] transition-colors leading-tight">
                    {rel.title}
                  </h2>
                  <p className="text-gray-500 text-base sm:text-lg leading-relaxed line-clamp-2 sm:line-clamp-3">
                    {rel.excerpt}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
        <Footer showAppDownload={false} />
      </motion.main>
    </>
  );
} 