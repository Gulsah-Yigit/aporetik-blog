// components/BlogItem.jsx
"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function formatDate(d) {
  try {
    const dt = new Date(d);
    if (Number.isNaN(dt.getTime())) return null;
    // 05.09.2025 tarzı
    return dt.toLocaleDateString("tr-TR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  } catch {
    return null;
  }
}

const BlogItem = ({
  title,
  description = "",
  category,
  image,
  id,
  date,
  readTime,
  views,
  comments,
  likes,
}) => {
  const prettyDate = date ? formatDate(date) : null;

  return (
    <article className="w-full bg-white text-black border border-black/15 rounded-xs overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-[360px_minmax(0,1fr)]">
        {/* SOL: görsel */}
        <Link href={`/blogs/${id}`} className="relative block md:h-full">
          <div className="relative w-full aspect-[16/9] md:aspect-auto md:h-full">
            <Image
              src={image}
              alt={title || "cover"}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 360px"
            />
          </div>
        </Link>

        {/* SAĞ: içerik */}
        <div className="p-5 lg:p-6 flex flex-col">
          {/* meta üst satır (tarih • süre • kategori) */}
          {(prettyDate || readTime || category) && (
            <div className="flex items-center gap-2 text-xs text-neutral-500 mb-2 flex-wrap">
              {prettyDate && <span>{prettyDate}</span>}
              {prettyDate && readTime && <span>•</span>}
              {readTime && <span>{readTime}</span>}
              {(prettyDate || readTime) && category && <span>•</span>}
              {category && (
                <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-black/5 text-[11px] uppercase tracking-wide">
                  {category}
                </span>
              )}
            </div>
          )}

          {/* başlık */}
          <h2 className="text-[22px] md:text-[24px] font-semibold leading-tight mb-2">
            <Link
              href={`/blogs/${id}`}
              className="hover:underline underline-offset-4"
            >
              {title}
            </Link>
          </h2>

          {/* açıklama */}
          {description && (
            <div
              className="text-[15px] leading-7 text-neutral-700 mb-4 line-clamp-3"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          )}

          <hr className="border-t border-black/10 my-2" />

          {/* alt meta satırı */}
          <div className="mt-2 flex items-center text-xs text-neutral-500">
            <div className="flex items-center gap-4">
              <span>
                {typeof views === "number" ? `${views} views` : "0 views"}
              </span>
              <span>
                {typeof comments === "number"
                  ? `${comments} comments`
                  : "0 comments"}
              </span>
            </div>
            <button
              type="button"
              className="ml-auto inline-flex items-center gap-1 text-neutral-600 hover:text-black transition-colors"
              aria-label="Beğen"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 1 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
              <span>{typeof likes === "number" ? likes : 0}</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default BlogItem;
