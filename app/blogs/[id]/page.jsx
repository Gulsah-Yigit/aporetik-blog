"use client";
import { assets, blog_data } from "@/Assets/assets";
import Footer from "@/Components/Footer";
import Header from "@/Components/Header";
import TopNavbar from "@/Components/TopNavbar";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const page = ({ params }) => {
  const [data, setData] = useState(null);

  const fetchBlogData = async () => {
    const response = await axios.get("/api/blog", {
      params: {
        id: params.id,
      },
    });
    setData(response.data);
  };

  useEffect(() => {
    fetchBlogData();
  }, []);

  // tarih biçimleyici
  function formatDate(d) {
    if (!d) return "";
    const dt = new Date(d);
    if (isNaN(dt)) return "";
    return dt.toLocaleDateString("tr-TR", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  // okuma süresi (dakika)
  function calcReadingTime(html = "") {
    // basitçe HTML etiketlerini ayıkla ve 200 wpm kabul et
    const text = html.replace(/<[^>]+>/g, " ");
    const words = text.trim().split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.round(words / 200));
  }

  return data ? (
    <>
      {/* Yeni eklediklerimiz */}
      <Header />
      <TopNavbar />

      <div className="min-h-[60vh] bg-neutral-100/80 py-12">
        <article className="mx-auto max-w-3xl bg-white border border-neutral-300 shadow-sm rounded-sm px-6 sm:px-10 py-10 sm:py-12">
          {/* meta */}
          <div className="flex items-center justify-between text-sm text-neutral-500">
            <span>
              {formatDate(data?.createdAt || data?.date) || "—"}
              {" · "}
              {calcReadingTime(data?.description)} min read
            </span>
          </div>

          {/* title */}
          <h1 className="mt-6 text-3xl sm:text-[34px] leading-tight font-semibold tracking-tight text-neutral-900">
            {data.title}
          </h1>

          {/* subtitle (optional) */}
          {data?.subtitle && (
            <p className="mt-4 text-[15px] sm:text-base text-neutral-600">
              {data.subtitle}
            </p>
          )}

          {/* hero image */}
          {data?.image && (
            <div className="mt-8">
              <Image
                src={data.image}
                width={1000}
                height={600}
                alt=""
                className="w-full h-auto"
                priority
              />
            </div>
          )}

          {/* content */}
          <div
            className="blog-content mt-8"
            dangerouslySetInnerHTML={{ __html: data.description }}
          />

          {/* local styles for raw HTML */}
          <style jsx>{`
            .blog-content {
              color: #262626;
              font-size: 16px;
              line-height: 1.75;
            }
            .blog-content p {
              margin: 1rem 0;
            }
            .blog-content h2 {
              margin: 2rem 0 0.75rem;
              font-weight: 600;
              font-size: 1.375rem;
            }
            .blog-content h3 {
              margin: 1.5rem 0 0.5rem;
              font-weight: 600;
              font-size: 1.125rem;
            }
            .blog-content a {
              color: #2563eb;
              text-decoration: underline;
            }
            .blog-content ul,
            .blog-content ol {
              padding-left: 1.25rem;
              margin: 0.75rem 0;
            }
            .blog-content blockquote {
              margin: 1.25rem 0;
              padding: 0.75rem 1rem;
              border-left: 4px solid #8b5cf6;
              background: #fafafa;
              font-style: italic;
              color: #404040;
            }
            .blog-content img {
              max-width: 100%;
              height: auto;
              border-radius: 4px;
            }
          `}</style>
          {/* Etiketler */}
          {data?.tags?.length > 0 && (
            <div className="mt-12">
              <div className="flex flex-wrap gap-2">
                {data.tags.map((tag, i) => (
                  <Link
                    key={i}
                    href={`/tag/${tag}`}
                    className="px-3 py-1 bg-gray-200 text-sm rounded-full hover:bg-gray-300 transition"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="mt-12 text-center">
            <Link
              href="/"
              className="inline-block px-6 py-2 bg-[#444444] text-white rounded hover:bg-gray-800 transition"
            >
              ← Geri Dön
            </Link>
          </div>
        </article>
      </div>

      <Footer />
    </>
  ) : null;
};

export default page;
