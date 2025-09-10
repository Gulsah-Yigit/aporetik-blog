// components/BlogCarousel.tsx
"use client";
import BlogCarouselCard from "./BlogCarouselCard";
import { blog_data } from "@/Assets/assets";
import { Bowlby_One_SC } from "next/font/google";

const bowlby = Bowlby_One_SC({
  subsets: ["latin"],
  weight: "400", // Bu font tek ağırlıkta geliyor
});

export default function BlogCarousel() {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6">
      <h2
        className={`${bowlby.className} text-xl sm:text-2xl font-bold mb-4 text-center text-[#77B26D]`}
      >
        Tazeler
      </h2>
      <div className="no-scrollbar justify-center flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2 pt-1">
        {blog_data.map((item) => (
          <BlogCarouselCard
            key={item.id}
            id={item.id}
            title={item.title}
            image={item.image}
          />
        ))}
      </div>
    </section>
  );
}
