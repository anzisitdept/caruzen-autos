"use client";

import { notFound, useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import blogsData from "@/data/blogs.json";
import SectionHeading from "@/components/SectionHeading";
import Button from "@/components/Button";
import { Calendar, Tag, ArrowRight } from "lucide-react";

export default function SingleBlogPage() {
  const { slug } = useParams();
  const blog = blogsData.find((b) => b.slug === slug);

  if (!blog) {
    notFound();
  }

  const formattedDate = new Date(blog.date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const recentPosts = blogsData
    .filter((b) => b.id !== blog.id)
    .slice(0, 5);

  const categories = [
    "Car Reviews",
    "Buying Guides",
    "Automotive News",
    "Hybrid Cars",
    "Luxury Cars",
    "Comparisons",
    "Maintenance"
  ];

  return (
    <>
      <Header />
      <main className="pt-20 bg-[#f9f9f9] min-h-screen">
        
        {/* 1. Hero / Banner Image at the top (Full width banner) */}
        <div className="relative w-full h-[440px] bg-black overflow-hidden flex items-end">
          <Image 
            src={blog.image || "/placeholder.jpg"} 
            alt={blog.title} 
            fill 
            priority
            sizes="100vw"
            className="object-cover object-[center_20%] opacity-65" 
          />
          {/* Dark overlay: rgba(0,0,0,0.35) so title text is readable if overlaid */}
          <div className="absolute inset-0 bg-[#000000]/35" />
          
          <div className="absolute inset-x-0 bottom-0 py-12">
            <div className="max-w-6xl mx-auto px-6 text-left">
              <span className="font-heading font-black text-[11px] uppercase tracking-[0.08em] bg-[#eece00] text-[#000000] px-3.5 py-1.5 rounded shadow-sm w-fit mb-4 inline-block">
                {blog.category}
              </span>
              <h1 className="font-heading font-black text-[32px] md:text-[48px] leading-[1.05] tracking-[-0.01em] text-white mb-4.5 max-w-4xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
                {blog.title}
              </h1>
              <div className="font-body font-normal text-[12px] leading-none text-[#cccccc] flex items-center gap-4">
                <div className="flex items-center">
                  <Calendar size={14} className="mr-1.5 text-[#eece00]" />
                  {formattedDate}
                </div>
                <div className="w-px h-3 bg-gray-500" />
                <div>By {blog.author}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 mt-12">
          
          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Article Content (65%) */}
            <div className="lg:w-[65%] flex flex-col gap-8 text-left">
              
              <div>
                <div className="flex items-center gap-3 mb-8 pb-6 border-b border-[#eeeeee]">
                  <div className="font-heading font-black text-sm select-none w-10 h-10 rounded-full bg-[#eece00] flex items-center justify-center text-[#000000]">
                    {blog.author.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-[15px] leading-tight text-black">{blog.author}</h4>
                    <span className="font-body text-[11px] text-gray-500 block mt-0.5">Author</span>
                  </div>
                </div>

                {/* 2. Inline Content Images (inside article body) split by paragraph */}
                <article className="prose prose-lg max-w-none font-body font-normal text-[15px] leading-[1.75] text-[#444444]">
                  {blog.content.split("\n\n").map((para, paraIdx, allParas) => {
                    const isMiddle = paraIdx === Math.floor(allParas.length / 2);
                    return (
                      <div key={paraIdx} className="mb-5">
                        <p className="whitespace-pre-line">{para}</p>
                        
                        {/* 1-2 contextual images in middle of paragraphs */}
                        {isMiddle && blog.inlineImage && (
                          <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden shadow-sm my-8 bg-gray-100 border border-gray-200">
                            <Image 
                              src={blog.inlineImage} 
                              alt={`${blog.title} illustration`} 
                              fill 
                              sizes="(max-width: 768px) 100vw, 800px" 
                              className="object-cover object-center" 
                            />
                            <div className="absolute bottom-3 left-3 bg-[#000000]/70 text-[#eece00] font-heading font-black text-[10px] uppercase tracking-[0.08em] px-3 py-1.5 rounded">
                              Illustration
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </article>

                <div className="mt-12 pt-6 border-t border-[#eeeeee] flex flex-wrap gap-2 items-center">
                  <Tag size={16} className="text-[#eece00] mr-2" />
                  {blog.tags.map(tag => (
                    <span key={tag} className="font-heading font-bold text-[11px] uppercase tracking-[0.04em] bg-white text-gray-600 px-3.5 py-1.5 border border-[#dddddd] rounded-full hover:border-[#eece00] hover:text-black transition-colors cursor-pointer">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar (35%) */}
            <div className="lg:w-[35%] flex flex-col gap-8 text-left">
              
              {/* Recent Posts */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-[#e5e5e5]">
                <SectionHeading label="LATEST" title="Recent Posts" theme="light" />
                <div className="space-y-6 mt-4">
                  {recentPosts.map(post => (
                    <div key={post.id} className="flex gap-4 group">
                      <div className="relative w-16 h-16 shrink-0 rounded-lg overflow-hidden bg-gray-100">
                        <Image src={post.image || "/placeholder.jpg"} alt={post.title} fill sizes="80px" className="object-cover group-hover:scale-110 transition-transform duration-300" />
                      </div>
                      <div className="flex flex-col justify-center">
                        <Link href={`/blog/${post.slug}`}>
                          <h4 className="font-heading font-bold text-[15px] leading-snug tracking-[0.01em] text-black line-clamp-2 group-hover:text-[#eece00] transition-colors duration-200">{post.title}</h4>
                        </Link>
                        <span className="font-body text-[12px] text-[#888888] mt-1.5">{new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Browse by Category */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-[#e5e5e5]">
                <SectionHeading label="TOPICS" title="Browse by Category" theme="light" />
                <ul className="space-y-3 mt-4">
                  {categories.map(category => (
                    <li key={category}>
                      <Link href="/blog" className="font-heading font-bold text-[14px] uppercase tracking-[0.04em] text-[#555555] hover:text-[#eece00] flex justify-between items-center transition-colors duration-200">
                        {category} <ArrowRight size={14} className="text-[#eece00]" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Card */}
              <div className="bg-[#000000] text-white p-8 rounded-xl shadow-sm border-t-4 border-[#eece00] text-center border border-[#222222]">
                <h3 className="font-heading font-black text-[24px] tracking-tight uppercase text-white mb-4">Looking to buy a car?</h3>
                <p className="font-body font-normal text-[14px] leading-relaxed text-gray-400 mb-6">Browse our extensive inventory of verified, premium vehicles.</p>
                <Button href="/cars" variant="primary" className="w-full">
                  View Inventory
                </Button>
              </div>

            </div>

          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
