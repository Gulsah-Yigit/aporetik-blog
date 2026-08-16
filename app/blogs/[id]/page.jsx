"use client";

import Footer from "@/Components/Footer";
import Header from "@/Components/Header";
import TopNavbar from "@/Components/TopNavbar";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

function formatDate(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("tr-TR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function calcReadingTime(text = "") {
  const clean = text.replace(/<[^>]+>/g, " ");
  const words = clean.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export default function BlogDetailPage({ params }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get("/api/blog", { params: { id: params.id } });
        setData(response.data);
      } catch (error) {
        console.error("blog detail fetch:", error);
      }
    };

    fetchBlog();
  }, [params.id]);

  if (!data) return null;

  return (
    <>
      <Header />
      <TopNavbar />

      <main className="bg-[#fbfaf6]">
        <article>
          <header className="mx-auto max-w-5xl px-4 pb-10 pt-14 text-center sm:px-6 lg:px-8 lg:pt-20">
            <div className="mx-auto flex w-fit items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-black/45">
              <span>{data.category || "Aporetik"}</span>
              <span>•</span>
              <span>{formatDate(data.createdAt || data.date)}</span>
              <span>•</span>
              <span>{calcReadingTime(data.description)} dk</span>
            </div>

            <h1 className="mx-auto mt-5 max-w-4xl font-serif text-[clamp(2.7rem,7vw,6rem)] leading-[.98] tracking-[-0.045em] text-[#171717]">
              {data.title}
            </h1>

            {data.subtitle ? (
              <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-black/55 sm:text-lg">
                {data.subtitle}
              </p>
            ) : null}
          </header>

          {data.image ? (
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="relative aspect-[16/8.3] overflow-hidden rounded-[2rem] bg-black/5">
                <Image
                  src={data.image}
                  alt={data.title || "Aporetik yazısı"}
                  fill
                  priority
                  sizes="(max-width:1280px) 100vw, 1280px"
                  className="object-cover"
                />
              </div>
            </div>
          ) : null}

          <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[180px_minmax(0,720px)_1fr] lg:px-8 lg:py-16">
            <aside className="hidden lg:block">
              <div className="sticky top-24 border-t border-black pt-4">
                <p className="text-[10px] uppercase tracking-[0.2em] text-black/40">Yazı hakkında</p>
                <p className="mt-3 text-sm leading-6 text-black/55">{data.category || "Aporetik"}</p>
                <Link href="/content" className="mt-5 inline-block text-xs underline decoration-black/25 underline-offset-4">Tüm yazılar</Link>
              </div>
            </aside>

            <div className="min-w-0">
              <div className="blog-content font-serif text-[19px] leading-[1.9] text-[#222] sm:text-[21px]">
                {data.description?.split("\n").map((line, index) => {
                  if (!line.trim()) return <div key={index} className="h-3" />;
                  return <p key={index}>{line}</p>;
                })}
              </div>

              {data?.tags?.length > 0 ? (
                <div className="mt-12 flex flex-wrap gap-2 border-t border-black/10 pt-6">
                  {data.tags.map((tag, index) => (
                    <span key={index} className="rounded-full border border-black/15 px-3 py-1.5 text-xs text-black/55">
                      #{tag}
                    </span>
                  ))}
                </div>
              ) : null}

              <div className="mt-14 border-y border-black/10 py-8">
                <p className="text-[11px] uppercase tracking-[0.2em] text-black/40">Devam etmek için</p>
                <Link href="/content" className="mt-2 inline-block font-serif text-3xl underline decoration-black/15 underline-offset-8">
                  Başka bir yazıya geç →
                </Link>
              </div>
            </div>

            <aside className="hidden xl:block">
              <div className="sticky top-24 rounded-[1.6rem] bg-[#f1ecdf] p-5">
                <p className="text-[10px] uppercase tracking-[0.2em] text-black/40">Aporetik notu</p>
                <p className="mt-3 font-serif text-xl leading-snug">Bir yazı bitince başka bir sorunun başladığı yer.</p>
              </div>
            </aside>
          </div>
        </article>
      </main>

      <Footer />
    </>
  );
}
