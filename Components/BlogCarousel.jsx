import BlogCarouselCard from "./BlogCarouselCard";
import { Bowlby_One_SC } from "next/font/google";
import React, { useEffect, useState } from "react";
import axios from "axios";

const bowlby = Bowlby_One_SC({ subsets: ["latin"], weight: "400" });

export default function BlogCarousel() {
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    const { data } = await axios.get("/api/blog");
    const latest = [...data.blogs]
      .sort((a, b) => {
        if (a.createdAt && b.createdAt) {
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        }
        return b._id.localeCompare(a._id);
      })
      .slice(0, 6);
    setBlogs(latest);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6">
      <h2
        className={`${bowlby.className} text-xl sm:text-2xl font-bold mb-4 text-center text-[#444444]`}
      >
        Yeniler
      </h2>

      <div className="no-scrollbar flex gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2 pt-1">
        {blogs.map((item) => (
          <BlogCarouselCard
            key={item._id}
            id={item._id}
            image={item.image}
            title={item.title}
            description={item.description}
            category={item.category}
          />
        ))}
      </div>
    </section>
  );
}
