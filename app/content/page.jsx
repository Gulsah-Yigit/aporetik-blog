"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import TopNavbar from "@/Components/TopNavbar";
import Header from "@/Components/Header";

const FILTERS = ["Hepsi", "Yolda", "Uzun Okuma"];

function formatDate(d) {
  try {
    const dt = new Date(d);
    if (Number.isNaN(dt.getTime())) return null;
    return dt.toLocaleDateString("tr-TR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  } catch {
    return null;
  }
}

const Page = () => {
  const [menu, setMenu] = useState("Hepsi");
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get("/api/blog");
        setBlogs(res.data.blogs || []);
      } catch (error) {
        console.error("Bloglar alınamadı:", error);
      }
    })();
  }, []);

  const filtered = blogs.filter((b) =>
    menu === "Hepsi" ? true : b.category === menu
  );

  return (
    <div>
      <Header />
      <TopNavbar />

      <section className="section-fade">
        <div className="mx-auto max-w-6xl px-4 lg:px-0">
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

          <div className="grid gap-8 md:grid-cols-2 mb-16">
            {filtered.map((item) => {
              const prettyDate = item.date ? formatDate(item.date) : null;

              const cleanDescription =
                typeof item.description === "string"
                  ? item.description.replace(/<[^>]*>/g, "").trim()
                  : "";

              return (
                <article
                  key={item._id}
                  className="border border-black/10 rounded-xl overflow-hidden bg-white hover:shadow-[0_6px_0_#00000012] transition-shadow"
                >
                  <Link href={`/blogs/${item._id}`} className="block">
                    <div className="relative w-full aspect-[16/9] bg-gray-100">
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.title || "cover"}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-sm text-gray-400">
                          Görsel yok
                        </div>
                      )}
                    </div>
                  </Link>

                  <div className="p-5 sm:p-6">
                    {(prettyDate || item.readTime || item.category) && (
                      <div className="flex items-center gap-2 text-xs text-neutral-500 mb-2 flex-wrap">
                        {prettyDate && <span>{prettyDate}</span>}
                        {prettyDate && item.readTime && <span>•</span>}
                        {item.readTime && <span>{item.readTime}</span>}
                        {(prettyDate || item.readTime) && item.category && (
                          <span>•</span>
                        )}
                        {item.category && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-black/5 text-[11px] uppercase tracking-wide">
                            {item.category}
                          </span>
                        )}
                      </div>
                    )}

                    <Link href={`/blogs/${item._id}`}>
                      <h2 className="text-[22px] md:text-[24px] font-semibold leading-tight hover:underline underline-offset-4">
                        {item.title}
                      </h2>
                    </Link>

                    {cleanDescription && (
                      <p className="mt-3 text-[15px] leading-7 text-neutral-700 whitespace-pre-line line-clamp-4">
                        {cleanDescription.slice(0, 220)}
                        {cleanDescription.length > 220 ? "..." : ""}
                      </p>
                    )}

                    <hr className="border-t border-black/10 my-3" />

                    <div className="flex items-center text-xs text-neutral-500">
                      <span>0 views</span>
                      <span className="mx-4">0 comments</span>
                      <span className="ml-auto inline-flex items-center gap-1">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 1 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z"
                            stroke="currentColor"
                            strokeWidth="1.5"
                          />
                        </svg>
                        0
                      </span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Page;