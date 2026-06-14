import Link from "next/link";
import Image from "next/image";
import { Calendar, User } from "lucide-react";

interface Blog {
  id: number;
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  author: string;
  date: string;
  image: string;
  inlineImage?: string;
}

export default function BlogCard({ blog }: { blog: Blog }) {
  const formattedDate = new Date(blog.date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <article className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-yellow-sm transition-all duration-300 border border-[#eeeeee] hover:border-[#eece00] hover:-translate-y-1 flex flex-col h-full text-left">
      
      {/* 📐 Card Image Specs (Listing Page) */}
      <div className="relative w-full h-[240px] overflow-hidden bg-gray-100 rounded-t-xl">
        
        {/* Category badge stays on top-left corner */}
        <div className="absolute top-4 left-4 z-10">
          <span className="font-heading font-black text-[10px] uppercase tracking-[0.1em] bg-[#000000] text-[#eece00] px-3 py-1.5 rounded shadow">
            {blog.category}
          </span>
        </div>

        {/* Hover zoom on image only */}
        <Image
          src={blog.image || "/placeholder.jpg"}
          alt={blog.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        />
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <Link href={`/blog/${blog.slug}`}>
          <h3 className="font-heading font-bold text-[22px] leading-[1.1] tracking-[0.01em] text-black mb-3 line-clamp-2 hover:text-[#eece00] transition-colors duration-200">
            {blog.title}
          </h3>
        </Link>
        <p className="font-body font-normal text-[15px] leading-[1.75] text-[#555555] mb-4 line-clamp-3 flex-grow">
          {blog.excerpt}
        </p>

        {/* Footer */}
        <div className="font-body font-normal text-[13px] text-[#888888] flex items-center justify-between pt-4 border-t border-[#eeeeee] mt-auto">
          <div className="flex items-center gap-1.5">
            <User size={13} className="text-[#eece00]" />
            {blog.author}
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar size={13} className="text-[#eece00]" />
            {formattedDate}
          </div>
        </div>
        <div className="mt-4">
          <Link
            href={`/blog/${blog.slug}`}
            className="font-heading font-black text-[14px] tracking-[0.04em] uppercase text-[#000000] hover:text-[#eece00] inline-flex items-center transition-colors duration-200"
          >
            Read More <span className="ml-1">→</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
