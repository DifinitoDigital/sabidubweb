import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import { motion } from "framer-motion";
import Footer from "../../components/Footer";

const posts = [
  {
    id: 1,
    title: "How to Prepare for WAEC and JAMB Exams",
    category: "Education",
    image: "/images/2149156427.jpg",
    date: "2024-06-01",
    excerpt: "Get the best tips and resources to ace your WAEC and JAMB exams with confidence.",
    content: `Preparing for WAEC and JAMB exams can be stressful, but with the right resources and strategies, you can excel. Here are some tips:\n\n1. Start early and create a study plan.\n2. Use past questions and practice regularly.\n3. Join study groups and ask for help when needed.\n4. Take care of your health and get enough rest.\n\nGood luck!`,
    author: "Jane Doe",
    readingTime: "4 min read",
    tags: ["WAEC", "JAMB", "Study"],
  },
  {
    id: 2,
    title: "Top 5 Study Apps for Nigerian Students",
    category: "Technology",
    image: "/images/146757.jpg",
    date: "2024-05-20",
    excerpt: "Discover the best apps to boost your productivity and learning as a student in Nigeria.",
    content: `Technology can boost your learning! Here are the top 5 study apps for Nigerian students:\n\n1. SabiDub App\n2. Google Classroom\n3. Khan Academy\n4. Quizlet\n5. Coursera\n\nTry them out and see which works best for you!`,
    author: "John Smith",
    readingTime: "3 min read",
    tags: ["Apps", "Productivity"],
  },
  {
    id: 3,
    title: "Balancing School and Social Life",
    category: "Student Life",
    image: "/images/128895.jpg",
    date: "2024-05-10",
    excerpt: "Learn how to manage your time and enjoy both academic and social success.",
    content: `Balancing academics and social life is important. Here are some tips:\n\n- Prioritize your tasks\n- Make time for friends and hobbies\n- Don't be afraid to say no\n- Stay organized\n\nRemember, it's all about balance!`,
    author: "Amina Ibrahim",
    readingTime: "5 min read",
    tags: ["Balance", "Student Life"],
  },
  {
    id: 4,
    title: "SabiDub Platform: New Features Announced!",
    category: "Announcements",
    image: "/images/2151104075.jpg",
    date: "2024-06-05",
    excerpt: "Check out the latest updates and features now available on SabiDub.",
    content: `We're excited to announce new features on SabiDub!\n\n- Improved dashboard\n- More study resources\n- Enhanced performance tracking\n\nUpdate your app to enjoy these features!`,
    author: "SabiDub Team",
    readingTime: "2 min read",
    tags: ["Platform", "Updates"],
  },
];

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
  const post = posts.find((p) => p.id === Number(id));
  const related = posts.filter((p) => p.id !== Number(id)).slice(0, 2);

  if (!post) {
    return (
      <main className="min-h-screen bg-[#111] flex items-center justify-center px-4">
        <div className="text-center text-white">Post not found.</div>
      </main>
    );
  }

  return (
    <>
      <Head>
        <title>{post.title} - SabiDub Blog</title>
        <meta name="description" content={post.excerpt || post.title} />
      </Head>
      <motion.main initial="initial" animate="animate" className="min-h-screen bg-[#111] relative overflow-x-hidden">
        {/* Full Background Image */}
        <div className="fixed inset-0 -z-10 w-full h-full">
          <div className="absolute inset-0">
            <Image src={post.image} alt="Blog Background" fill className="object-cover w-full h-full" priority />
            <div className="absolute inset-0 bg-gradient-to-b from-[#111]/80 via-[#111]/90 to-[#111]" />
          </div>
        </div>
        {/* App Bar / Navigation */}
        <nav className="px-4 sm:px-6 py-6 sm:py-8 flex items-center justify-between max-w-7xl mx-auto relative z-[60] bg-[#111]">
          <Link href="/" className="flex items-center relative z-[60]">
            <div className="relative w-40 h-12">
              <Image src="/images/white.png" alt="SabiDub Logo" fill className="object-contain" priority />
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
        </nav>
        {/* Hero Section */}
        <section className="relative w-full h-72 sm:h-96 mb-8 flex items-end">
          <div className="absolute inset-0">
            <Image src={post.image} alt={post.title} fill className="object-cover object-center w-full h-full" priority sizes="100vw" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-[#111]/60 to-transparent" />
          </div>
          <div className="relative z-10 p-8 max-w-4xl mx-auto w-full">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="text-xs text-[#FFEDB1] mb-2 uppercase tracking-wider font-semibold">{post.category}</motion.div>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-3xl sm:text-4xl font-bold text-white mb-2">{post.title}</motion.h1>
            <div className="flex flex-wrap items-center gap-4 text-xs text-gray-300 mb-2">
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
        </section>
        {/* Content Section with Sidebar */}
        <section className="px-4 sm:px-6 py-12 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Article */}
            <div className="lg:col-span-2">
              <div className="mb-12">
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">{post.title}</h2>
                <p className="text-gray-400 text-lg mb-8 max-w-2xl">{post.excerpt}</p>
              </div>
              <article className="prose prose-invert max-w-none text-gray-300 text-lg leading-relaxed">
                {`${post.content}${moreContent}`.split('\n').map((line, i) => (
                  line.startsWith('### ')
                    ? <h3 key={i}>{line.replace('### ', '')}</h3>
                    : <p key={i}>{line}</p>
                ))}
              </article>
              <div className="flex justify-between items-center mt-12 mb-16">
                <button onClick={() => router.push('/blog')} className="text-[#FFEDB1] hover:underline text-sm">← Back to Blog</button>
              </div>
            </div>
            {/* Sidebar */}
            <aside className="lg:col-span-1 space-y-10">
              {/* Author Info */}
              <div className="bg-[#1a1a1a] rounded-2xl p-6 flex flex-col items-center text-center border border-gray-800">
                <Image src={authorInfo.avatar} alt={authorInfo.name} width={80} height={80} className="rounded-full mb-4 object-cover" />
                <div className="text-white font-bold text-lg mb-1">{authorInfo.name}</div>
                <div className="text-gray-400 text-sm mb-2">Author</div>
                <div className="text-gray-400 text-sm mb-3">{authorInfo.bio}</div>
                <div className="flex gap-3 justify-center">
                  {authorInfo.socials.map((s) => (
                    <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#FFEDB1]">
                      {s.icon === "twitter" && (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" /></svg>
                      )}
                      {s.icon === "facebook" && (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                      )}
                      {s.icon === "linkedin" && (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" /></svg>
                      )}
                    </a>
                  ))}
                </div>
              </div>
              {/* Share This Post */}
              <div className="bg-[#1a1a1a] rounded-2xl p-6 border border-gray-800">
                <div className="text-white font-bold mb-3">Share this post</div>
                <div className="flex gap-4">
                  <a href="#" className="text-gray-400 hover:text-[#FFEDB1]" title="Share on Twitter">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" /></svg>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-[#FFEDB1]" title="Share on Facebook">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-[#FFEDB1]" title="Share on LinkedIn">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" /></svg>
                  </a>
                </div>
              </div>
              {/* Recent Posts */}
              <div className="bg-[#1a1a1a] rounded-2xl p-6 border border-gray-800">
                <div className="text-white font-bold mb-3">Recent Posts</div>
                <ul className="space-y-3">
                  {posts.slice(0, 3).map((p) => (
                    <li key={p.id}>
                      <Link href={`/blog/${p.id}`} className="text-[#FFEDB1] hover:underline text-sm">
                        {p.title}
                      </Link>
                      <div className="text-xs text-gray-500">{new Date(p.date).toLocaleDateString()}</div>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </section>
        {/* Related Posts */}
        <section className="px-4 sm:px-0 max-w-5xl mx-auto pb-20">
          <h3 className="text-lg font-bold text-white mb-6">Related Posts</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {related.map((rel) => (
              <Link href={`/blog/${rel.id}`} key={rel.id} className="bg-[#1a1a1a] rounded-2xl overflow-hidden shadow-lg hover:scale-[1.03] transition-transform flex flex-col group border border-gray-800">
                <div className="relative w-full h-48">
                  <Image src={rel.image} alt={rel.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="100vw" />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="text-xs text-[#FFEDB1] mb-2 uppercase tracking-wider font-semibold">{rel.category}</div>
                  <h2 className="text-lg font-bold text-white mb-2 group-hover:text-[#FFEDB1] transition-colors">{rel.title}</h2>
                  <p className="text-gray-400 mb-2 flex-1">{rel.excerpt}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-400">
                    <span>By {rel.author}</span>
                    <span>• {rel.readingTime}</span>
                    <span>• {new Date(rel.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex gap-2 mt-2">
                    {rel.tags.map((tag) => (
                      <span key={tag} className="bg-[#FFEDB1]/10 text-[#FFEDB1] px-2 py-1 rounded-full text-xs">{tag}</span>
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