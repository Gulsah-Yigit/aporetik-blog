"use client";

import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import TopNavbar from "@/Components/TopNavbar";
import Header from "@/Components/Header";
import Footer from "@/Components/Footer";

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

function cleanText(value = "") {
  return typeof value === "string" ? value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim() : "";
}

export default function ContentPage() {
  const [blogs, setBlogs] = useState([]);
  const [active, setActive] = useState("Hepsi");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const { data } = await axios.get("/api/blog");
        if (mounted) setBlogs(Array.isArray(data?.blogs) ? data.blogs : []);
      } catch (error) {
        console.error("Bloglar alınamadı:", error);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const categories = useMemo(() => {
    const dynamic = Array.from(new Set(blogs.map((blog) => blog?.category).filter(Boolean)));
    return ["Hepsi", ...dynamic];
  }, [blogs]);

  const filtered = useMemo(
    () => (active === "Hepsi" ? blogs : blogs.filter((blog) => blog.category === active)),
    [active, blogs]
  );

  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <>
      <Header />
      <TopNavbar />

      <main className="bg-[#fbf8f1] pb-20">
        <section className="mx-auto max-w-7xl px-4 pb-10 pt-12 sm:px-6 lg:px-8">
          <div className="grid gap-8 border-b border-black pb-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="text-[11px] uppercase tracking-[0.22em] text-black/45">Aporetik arşiv</p>
              <h1 className="mt-3 max-w-4xl font-serif text-5xl leading-[0.98] sm:text-6xl lg:text-7xl">Yazılar, notlar ve uzun düşünceler.</h1>
            </div>
            <p className="max-w-md text-sm leading-7 text-black/55 lg:text-right">Kronolojik bir liste değil; gezinmeye, tesadüfe ve yeniden keşfetmeye açık bir arşiv.</p>
          </div>

          <div className="mt-6 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActive(category)}
                className={`shrink-0 rounded-full border px-4 py-2 text-sm transition ${
                  active === category
                    ? "border-black bg-black text-white"
                    : "border-black/15 bg-white/60 text-black/70 hover:border-black/35"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        {loading ? (
          <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="h-[420px] animate-pulse rounded-[2rem] bg-black/5" />
          </section>
        ) : null}

        {!loading && featured ? (
          <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Link href={`/blogs/${featured._id || featured.id}`} className="group grid overflow-hidden rounded-[2rem] border border-black/10 bg-white lg:grid-cols-[1.15fr_.85fr]">
              <div className="relative min-h-[360px] bg-black/5 lg:min-h-[500px]">
                <Image
                  src={featured.image || "/placeholder.jpg"}
                  alt={featured.title || "Aporetik"}
                  fill
                  priority
                  className="object-cover transition duration-700 group-hover:scale-[1.02]"
                  sizes="(max-width:1024px) 100vw, 58vw"
                />
              </div>
              <div className="flex flex-col justify-between p-7 sm:p-10 lg:p-12">
                <div>
                  <div className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-black/45">
                    <span>{featured.category || "Aporetik"}</span>
                    {featured.date ? <span>•</span> : null}
                    {featured.date ? <span>{formatDate(featured.date)}</span> : null}
                  </div>
                  <h2 className="mt-5 font-serif text-4xl leading-[1.02] sm:text-5xl">{featured.title}</h2>
                  {featured.description ? (
                    <p className="mt-5 max-w-xl text-[15px] leading-7 text-black/60">{cleanText(featured.description).slice(0, 320)}{cleanText(featured.description).length > 320 ? "…" : ""}</p>
                  ) : null}
                </div>
                <div className="mt-10 flex items-center justify-between border-t border-black/10 pt-5 text-sm">
                  <span>Seçili yazı</span>
                  <span className="underline underline-offset-4">Oku →</span>
                </div>
              </div>
            </Link>
          </section>
        ) : null}

        {!loading && rest.length ? (
          <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
            <div className="mb-7 flex items-end justify-between border-b border-black pb-4">
              <div>
                <p className="text-[11px] uppercase tracking-[0.2em] text-black/45">Arşiv</p>
                <h2 className="font-serif text-4xl">Tüm yazılar</h2>
              </div>
              <span className="text-sm text-black/45">{filtered.length} yazı</span>
            </div>

            <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((item, index) => {
                const excerpt = cleanText(item.description);
                return (
                  <article key={item._id || item.id} className={index % 5 === 0 ? "sm:col-span-2 lg:col-span-2" : ""}>
                    <Link href={`/blogs/${item._id || item.id}`} className="group block">
                      <div className={`relative overflow-hidden rounded-[1.6rem] bg-black/5 ${index % 5 === 0 ? "aspect-[16/8.5]" : "aspect-[4/3]"}`}>
                        <Image
                          src={item.image || "/placeholder.jpg"}
                          alt={item.title || "Aporetik yazısı"}
                          fill
                          className="object-cover transition duration-500 group-hover:scale-[1.025]"
                          sizes={index % 5 === 0 ? "(max-width:1024px) 100vw, 66vw" : "(max-width:768px) 100vw, 33vw"}
                        />
                      </div>
                      <div className="mt-4 flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.16em] text-black/45">
                        <span>{item.category || "Aporetik"}</span>
                        {item.date ? <span>•</span> : null}
                        {item.date ? <span>{formatDate(item.date)}</span> : null}
                      </div>
                      <h3 className={`mt-2 font-serif leading-[1.04] group-hover:underline group-hover:underline-offset-4 ${index % 5 === 0 ? "text-3xl sm:text-4xl" : "text-2xl"}`}>
                        {item.title}
                      </h3>
                      {excerpt ? <p className="mt-3 line-clamp-3 text-sm leading-6 text-black/55">{excerpt}</p> : null}
                    </Link>
                  </article>
                );
              })}
            </div>
          </section>
        ) : null}
      </main>

      <Footer />
    </>
  );
}
