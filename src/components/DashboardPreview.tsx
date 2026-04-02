import { motion } from "framer-motion";
import Image from "next/image";

export default function DashboardPreview() {
  return (
    <div className="relative w-full max-w-5xl mx-auto px-4 mt-[-100px] z-20">
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="bg-white/80 backdrop-blur-2xl border border-white shadow-[0_50px_100px_rgba(1,71,81,0.15)] rounded-[40px] p-4 sm:p-10 relative overflow-hidden"
      >
        {/* Browser Top Bar */}
        <div className="flex items-center gap-2 mb-8 px-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#FF5F56]"></div>
            <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
            <div className="w-3 h-3 rounded-full bg-[#27C93F]"></div>
          </div>
          <div className="ml-4 flex-1 h-8 bg-gray-50 rounded-lg flex items-center px-4 border border-gray-100">
            <div className="w-4 h-4 text-gray-300 mr-2">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
            </div>
            <span className="text-[11px] text-gray-400 font-medium">portal.sabidub.com/student/dashboard</span>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-8">
          {/* Sidebar Mock */}
          <div className="hidden md:col-span-3 lg:col-span-2 md:flex flex-col gap-6">
            <div className="aspect-square w-12 bg-[#014751] rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-[#014751]/20">S</div>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className={`h-11 rounded-xl flex items-center px-4 gap-3 ${i === 1 ? 'bg-[#014751]/5 text-[#014751]' : 'text-gray-400'}`}>
                   <div className={`w-5 h-5 rounded-md ${i === 1 ? 'bg-[#014751]/10' : 'bg-gray-100'}`}></div>
                   <div className={`h-2 rounded-full ${i === 1 ? 'bg-[#014751]/20 w-16' : 'bg-gray-100 w-12'}`}></div>
                </div>
              ))}
            </div>
          </div>

          {/* Main Dashboard Content */}
          <div className="col-span-12 md:col-span-9 lg:col-span-10">
            {/* Header */}
            <div className="flex justify-between items-end mb-10">
              <div>
                <div className="h-2 w-24 bg-gray-100 rounded-full mb-3"></div>
                <h3 className="text-3xl font-black text-gray-900 tracking-tight">Good Morning, Ahmed</h3>
              </div>
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-100 overflow-hidden shadow-sm">
                    <Image src={`/images/one-${i % 2 === 0 ? 'one' : 'v-one'}.png`} alt="Avatar" width={40} height={40} className="object-cover" />
                  </div>
                ))}
                <div className="w-10 h-10 rounded-full border-2 border-white bg-[#AFF8C8] flex items-center justify-center text-[10px] font-black text-[#014751]">+12</div>
              </div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {/* Card 1: Performance */}
              <div className="bg-[#0F2830] rounded-3xl p-6 text-white overflow-hidden relative group">
                <div className="h-2 w-16 bg-white/10 rounded-full mb-4"></div>
                <div className="text-4xl font-black mb-2 tracking-tighter">84.3%</div>
                <p className="text-white/40 text-xs font-bold uppercase tracking-widest leading-none">Global Rank Avg</p>
                
                <div className="mt-8 flex items-end gap-1.5 h-12">
                  {[40, 70, 45, 90, 65, 80, 50].map((h, i) => (
                    <motion.div 
                      key={i}
                      initial={{ height: 0 }}
                      whileInView={{ height: `${h}%` }}
                      transition={{ delay: 0.1 * i, duration: 1 }}
                      className="flex-1 bg-[#AFF8C8] rounded-t-sm opacity-60"
                    ></motion.div>
                  ))}
                </div>
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                   <svg className="w-5 h-5 text-[#AFF8C8]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                </div>
              </div>

              {/* Card 2: Upcoming Quiz */}
              <div className="bg-gray-50 rounded-3xl p-6 border border-gray-100 flex flex-col justify-between hover:border-[#014751]/20 transition-all duration-300">
                <div>
                   <div className="flex justify-between mb-6">
                      <div className="px-3 py-1 bg-[#E9C46A]/20 text-[#9B7F35] rounded-lg text-[10px] font-black uppercase tracking-wider">Economics Quiz</div>
                      <span className="text-[10px] font-bold text-gray-400 tracking-wider">Starts in 2h</span>
                   </div>
                   <h4 className="font-bold text-lg text-gray-900 leading-tight mb-2">Demand & Supply Advanced Theory</h4>
                   <p className="text-xs text-gray-500 font-medium">Topic Hall 3A &bull; Instructor Prof. Dlama</p>
                </div>
                <button className="w-full h-12 bg-white border border-gray-200 rounded-xl mt-6 text-sm font-bold text-[#014751] hover:bg-gray-50 transition-colors shadow-sm">Remind Me</button>
              </div>

              {/* Card 3: Resources */}
              <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm relative overflow-hidden group">
                 <div className="relative z-10">
                    <h4 className="font-black text-gray-900 mb-6">Recommended Resources</h4>
                    <div className="space-y-4">
                       {[
                         { name: 'Quantum Mechanics.pdf', size: '2.4MB', color: 'blue' },
                         { name: 'JAMB Syllabus 2024.doc', size: '1.2MB', color: 'green' }
                       ].map((doc, i) => (
                         <div key={i} className="flex items-center gap-4 group/doc">
                            <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-gray-400 group-hover/doc:bg-[#014751]/5 group-hover/doc:text-[#014751] transition-colors">
                               <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                            </div>
                            <div className="flex-1">
                               <p className="text-[11px] font-bold text-gray-800 leading-none mb-1">{doc.name}</p>
                               <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{doc.size}</span>
                            </div>
                         </div>
                       ))}
                    </div>
                 </div>
                 <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-[#AFF8C8]/20 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-700"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Floating Elements */}
        <motion.div 
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-6 -right-6 bg-white p-4 rounded-2xl shadow-2xl border border-gray-100 hidden sm:flex items-center gap-3 z-30"
        >
           <div className="w-10 h-10 rounded-full bg-[#AFF8C8] flex items-center justify-center text-xl">🏆</div>
           <div>
              <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">New Achievement</p>
              <h5 className="text-xs font-bold text-gray-900">Top 1% Learner</h5>
           </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
