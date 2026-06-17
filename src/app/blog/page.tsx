"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlogCard from "@/components/BlogCard";
import SectionHeading from "@/components/SectionHeading";
import blogsData from "@/data/blogs.json";

export default function BlogListingPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = [
    "All",
    "Car Reviews",
    "Buying Guides",
    "Automotive News",
    "Hybrid Cars",
    "Luxury Cars",
    "Comparisons",
    "Maintenance"
  ];

  const filteredBlogs = activeCategory === "All" 
    ? blogsData 
    : blogsData.filter(blog => blog.category === activeCategory);

  return (
    <>
      <Header />
      <main className="pt-[80px] pb-16 bg-[#f9f9f9] min-h-screen">
        
        {/* REDESIGNED BLOG HERO */}
        <section className="bg-[#050505] relative overflow-hidden mb-16 border-b border-[#1a1a1a]">
          
          {/* YELLOW TOP BORDER */}
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#eece00] z-20" />

          {/* GHOST WATERMARK */}
          <div className="absolute top-[-5%] right-[-5%] text-[#ffffff] opacity-[0.02] 
                          font-heading font-black text-[200px] md:text-[300px] leading-none select-none z-0 pointer-events-none">
            BLOG
          </div>

          <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-20 pb-16">
              
              {/* ── LEFT: TEXT & STATS ── */}
              <div className="lg:col-span-7 flex flex-col justify-center">
                
                {/* EYEBROW */}
                <div className="flex items-center gap-2.5 mb-6">
                  <span className="w-2 h-2 rounded-full bg-[#eece00] flex-shrink-0" />
                  <p className="font-heading font-bold text-[11px] uppercase tracking-[0.22em] text-[#eece00]">
                    Latest Updates
                  </p>
                </div>

                {/* H1 */}
                <h1 className="font-heading font-black text-[60px] md:text-[80px]
                               leading-[1.0] tracking-[-0.02em] mb-6">
                  <span className="text-[#ffffff] block">The</span>
                  <span className="block">
                    <span className="text-[#ffffff]">Caruzen </span>
                    <span className="text-[#eece00]">Motors</span>
                  </span>
                  <span className="text-[#eece00] block">Blog</span>
                </h1>

                {/* SUBTEXT */}
                <p className="font-body font-normal text-[16px] md:text-[18px] text-[#888888]
                              leading-[1.6] max-w-[480px] mb-12">
                  Expert car guides, honest reviews, buying tips and the latest automotive news — all in one place.
                </p>

                {/* DIVIDER */}
                <div className="h-[1px] w-full max-w-[480px] bg-[#222222] mb-10" />

                {/* STATS ROW */}
                <div className="flex flex-wrap items-center gap-8 md:gap-12">
                  {/* STAT 1 */}
                  <div>
                    <p className="font-heading font-black text-[36px] md:text-[42px] text-[#eece00] leading-none mb-1">
                      24+
                    </p>
                    <p className="font-heading font-bold text-[10px] text-[#666666] uppercase tracking-[0.15em]">
                      Articles
                    </p>
                  </div>
                  
                  {/* DIVIDER */}
                  <div className="w-[1px] h-[40px] bg-[#222222] hidden md:block" />

                  {/* STAT 2 */}
                  <div>
                    <p className="font-heading font-black text-[36px] md:text-[42px] text-[#eece00] leading-none mb-1">
                      7
                    </p>
                    <p className="font-heading font-bold text-[10px] text-[#666666] uppercase tracking-[0.15em]">
                      Categories
                    </p>
                  </div>

                  {/* DIVIDER */}
                  <div className="w-[1px] h-[40px] bg-[#222222] hidden md:block" />

                  {/* STAT 3 */}
                  <div>
                    <p className="font-heading font-black text-[36px] md:text-[42px] text-[#eece00] leading-none mb-1">
                      Weekly
                    </p>
                    <p className="font-heading font-bold text-[10px] text-[#666666] uppercase tracking-[0.15em]">
                      New Posts
                    </p>
                  </div>
                </div>

              </div>

              {/* ── RIGHT: FEATURED POST CARD ── */}
              <div className="lg:col-span-5 flex items-center justify-center lg:justify-end mt-10 lg:mt-0">
                <div className="w-full max-w-[420px] bg-[#111111] rounded-[16px] overflow-hidden border border-[#222222] relative shadow-2xl group cursor-pointer hover:border-[#444444] transition-all duration-300">
                  
                  {/* BADGE */}
                  <div className="absolute top-5 left-5 bg-[#eece00] text-[#000000] font-heading font-black text-[10px] uppercase tracking-[0.1em] px-3 py-1.5 rounded-[4px] z-10">
                    Featured
                  </div>

                  {/* IMAGE */}
                  <div className="h-[260px] w-full bg-[#1a1a1a] relative overflow-hidden">
                    <img src="/hero2.jpg" alt="Featured Post" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent" />
                  </div>

                  {/* CONTENT */}
                  <div className="p-8 relative bg-[#111111]">
                    <p className="font-heading font-bold text-[10px] text-[#eece00] uppercase tracking-[0.15em] mb-3">
                      Buying Guide
                    </p>
                    <h3 className="font-heading font-black text-[22px] md:text-[24px] text-[#ffffff] leading-[1.3] tracking-[-0.01em] mb-6 group-hover:text-[#eece00] transition-colors">
                      Top 5 Cars Under 40 Lac in Pakistan 2024
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className="font-heading font-bold text-[13px] text-[#eece00]">Read Article</span>
                      <span className="text-[#eece00] font-bold">→</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* ── BOTTOM FILTER BAR ── */}
          <div className="border-t border-[#1a1a1a] bg-[#080808]">
            <div className="max-w-7xl mx-auto px-6 md:px-10 py-5 flex flex-col md:flex-row md:items-center gap-6 overflow-x-auto no-scrollbar">
              <span className="font-heading font-bold text-[11px] text-[#555555] uppercase tracking-[0.15em] whitespace-nowrap">
                Filter:
              </span>
              <div className="flex items-center gap-3">
                {categories.map((cat) => {
                  const isActive = activeCategory === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`font-heading font-bold text-[11px] uppercase tracking-[0.1em] px-5 py-2.5 rounded-[5px] whitespace-nowrap transition-all duration-200 border
                        ${isActive 
                          ? 'bg-[#eece00] text-[#000000] border-[#eece00]' 
                          : 'bg-transparent text-[#888888] border-[#222222] hover:border-[#555555] hover:text-[#ffffff]'
                        }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-6xl mx-auto px-6">

          {/* Blog Grid */}
          {filteredBlogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBlogs.map(blog => (
                <BlogCard key={blog.id} blog={blog} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-[#eeeeee]">
              <h3 className="font-heading font-extrabold text-[24px] text-[#000000] mb-2">No articles found</h3>
              <p className="font-body font-normal text-[15px] text-[#666666]">There are currently no articles in this category.</p>
            </div>
          )}

        </div>
      </main>
      <Footer />
    </>
  );
}
