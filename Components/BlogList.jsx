// components/BlogList.jsx
"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import BlogItem from "./BlogItem";
import SidebarAbout from "./SidebarAbout";

const FILTERS = ["Hepsi", "Yolda", "Uzun Okuma"];
// istediğim kategoriler: Açmazlar – Kültür Notları – Sayfalar – Perdeden – Yolda – Uzun Okuma

export default function BlogList() {
  const [menu, setMenu] = useState("Hepsi");
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await axios.get("/api/blog");
      setBlogs(res.data.blogs || []);
    })();
  }, []);

  const filtered = blogs.filter((b) =>
    menu === "Hepsi" ? true : b.category === menu
  );

  return (
    <section className="section-fade">
      <div className="mx-auto max-w-6xl px-4 lg:px-0 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_360px] gap-x-12 gap-y-12">
        {/* SOL SÜTUN: Filtre + Liste */}
        <div>
          {/* Filtre menüsü */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 my-6">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setMenu(f)}
                className={`px-4 py-1.5 rounded-lg border border-black/10 transition-colors ${
                  menu === f ? "bg-black text-white" : "hover:bg-black/5"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Kartlar */}
          <div className="space-y-8 mb-16">
            {filtered.map((item) => (
              <BlogItem
                key={item._id}
                id={item._id}
                image={item.image}
                title={item.title}
                description={item.description}
                category={item.category}
              />
            ))}
          </div>
        </div>

        {/* SAĞ SÜTUN: Hakkımda */}
        <SidebarAbout />
      </div>
    </section>
  );
}
