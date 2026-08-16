"use client";

import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import TopNavbar from "@/Components/TopNavbar";
import Header from "@/Components/Header";
import Footer from "@/Components/Footer";
import { blog_data } from "@/Assets/assets";

const SAMPLE_COPY = [
  ["Bir Zamanlar Anadolu’da: Zaman, Suç ve Bekleyiş", "Perdeden"],
  ["Neden Eski Şarkılar Bize Daha Güzel Geliyor?", "Açmazlar"],
  ["Korku Sinemasının Başına Ne Geldi?", "Perdeden"],
  ["Telefonlarımız Neden Artık Heyecan Vermiyor?", "Kültür Notları"],
  ["Yetişkin Olduğumuzda Arkadaş Edinmek Neden Zorlaşıyor?", "Uzun Okuma"],
  ["David Lynch’in Dünyasında Rüya Görmek", "Perdeden"],
  ["Bir Şehri Yaşanabilir Yapan Şey Nedir?", "Yolda"],
  ["Kimsenin Vakti Yokmuş Gibi Yaşadığı Bir Çağ", "Açmazlar"],
  ["Bir Kitabı Yarım Bırakmak Neden Bu Kadar Zor?", "Sayfalar"],
  ["İnternet Bizi Aynılaştırıyor mu?", "Uzun Okuma"],
  ["Filmler Neden Var?", "Perdeden"],
  ["Bir Şeyi Sevmeyi Ne Zaman Öğreniriz?", "Kültür Notları"],
];

const SAMPLE_POSTS = SAMPLE_COPY.map(([title, category], index) => ({
  _id: `sample-${index + 1}`,
  title,
  category,
  image: blog_data[index % blog_data.length]?.image,
  date: new Date(2026, 7, 16 - index).toISOString(),
  description: "Aporetik’in editoryal dünyasını göstermek için hazırlanmış örnek içerik. Gerçek yazılar eklendikçe bu alanlar otomatik olarak yerlerini onlara bırakacak.",
  demo: true,
}));

function formatDate(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("tr-TR", { day: "2-digit", month: "short", year: "numeric" });
}

function cleanText(value = "") {
  return typeof value === "string" ? value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim() : "";
}

function hrefFor(post) {
  return post?.demo ? "#" : `/blogs/${post?._id || post?.id}`;
}

export default function ContentPage() {
  const [realBlogs, setRealBlogs] = useState([]);
  const [active, setActive] = useState("Hepsi");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const { data } = await axios.get("/api/blog");
        if (mounted) setRealBlogs(Array.isArray(data?.blogs) ? data.blogs : []);
      } catch (error) {
        console.error("Bloglar alınamadı:", error);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  const blogs = useMemo(() => [...realBlogs, ...SAMPLE_POSTS], [realBlogs]);

  const categories = useMemo(() => {
    const dynamic = Array.from(new Set(blogs.map((blog) => blog?.category).filter(Boolean)));
    return ["Hepsi", ...dynamic];
  }, [blogs]);

  const filtered = useMemo(() => active === "Hepsi" ? blogs : blogs.filter((blog) => blog.category === active), [active, blogs]);
  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <>
      <Header />
      <TopNavbar />

      <main className="bg-[#fbfaf6] pb-20 text-[#171717]">
        <section className="mx-auto max-w-[1380px] px-5 pb-10 pt-12 sm:px-8 lg:px-10">
          <div className="grid gap-8 border-b border-black pb-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="text-[10px] uppercase tracking-[.22em] text-black/40">Aporetik arşiv</p>
              <h1 className="mt-3 max-w-5xl font-serif text-[clamp(3.4rem,8vw,7.5rem)] leading-[.88] tracking-[-.05em]">Yazılar, notlar ve uzun düşünceler.</h1>
            </div>
            <p className="max-w-sm text-sm leading-7 text-black/55 lg:text-right">Kronolojik bir liste değil; gezinmeye, tesadüfe ve yeniden keşfetmeye açık bir arşiv.</p>
          </div>

          <div className="mt-6 flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {categories.map((category) => (
              <button key={category} onClick={() => setActive(category)} className={`shrink-0 rounded-full border px-4 py-2 text-xs uppercase tracking-[.12em] transition ${active === category ? "border-black bg-black text-white" : "border-black/15 bg-transparent text-black/60 hover:border-black/35"}`}>
                {category}
              </button>
            ))}
          </div>
        </section>

        {loading && realBlogs.length === 0 ? (
          <section className="mx-auto max-w-[1380px] px-5 sm:px-8 lg:px-10"><div className="h-[420px] animate-pulse rounded-[28px] bg-black/[.04]" /></section>
        ) : null}

        {!loading && featured ? (
          <section className="mx-auto max-w-[1380px] px-5 sm:px-8 lg:px-10">
            <Link href={hrefFor(featured)} className="group grid overflow-hidden rounded-[28px] border border-black/10 bg-[#f4efe4] lg:grid-cols-[1.2fr_.8fr]">
              <div className="relative min-h-[390px] bg-black/5 lg:min-h-[540px]">
                <Image src={featured.image || "/placeholder.jpg"} alt={featured.title || "Aporetik"} fill priority className="object-cover transition duration-700 group-hover:scale-[1.015]" sizes="(max-width:1024px) 100vw, 60vw" />
              </div>
              <div className="flex flex-col justify-between p-7 sm:p-10 lg:p-12">
                <div>
                  <div className="flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[.18em] text-black/45"><span>{featured.category || "Aporetik"}</span>{featured.date ? <><span>·</span><span>{formatDate(featured.date)}</span></> : null}{featured.demo ? <><span>·</span><span>örnek içerik</span></> : null}</div>
                  <h2 className="mt-5 font-serif text-4xl leading-[.98] tracking-[-.03em] sm:text-6xl">{featured.title}</h2>
                  <p className="mt-5 max-w-xl text-[15px] leading-7 text-black/58">{cleanText(featured.description).slice(0, 340)}</p>
                </div>
                <div className="mt-10 flex items-center justify-between border-t border-black/10 pt-5 text-xs uppercase tracking-[.15em]"><span>{featured.demo ? "Örnek yerleşim" : "Seçili yazı"}</span><span className="underline underline-offset-4">Oku ↗</span></div>
              </div>
            </Link>
          </section>
        ) : null}

        {!loading && rest.length ? (
          <section className="mx-auto max-w-[1380px] px-5 py-14 sm:px-8 lg:px-10">
            <div className="mb-8 flex items-end justify-between border-b border-black pb-4"><div><p className="text-[10px] uppercase tracking-[.2em] text-black/40">Arşiv</p><h2 className="font-serif text-5xl tracking-[-.03em]">Tüm yazılar</h2></div><span className="text-xs uppercase tracking-[.14em] text-black/40">{filtered.length} içerik</span></div>

            <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-12">
              {rest.map((item, index) => {
                const wide = index % 5 === 0;
                const excerpt = cleanText(item.description);
                return (
                  <article key={item._id || item.id} className={wide ? "lg:col-span-6" : "lg:col-span-3"}>
                    <Link href={hrefFor(item)} className="group block">
                      <div className={`relative overflow-hidden rounded-[22px] bg-black/5 ${wide ? "aspect-[16/10]" : "aspect-[4/5]"}`}>
                        <Image src={item.image || "/placeholder.jpg"} alt={item.title || "Aporetik yazısı"} fill className="object-cover transition duration-500 group-hover:scale-[1.02]" sizes={wide ? "(max-width:1024px) 100vw, 50vw" : "(max-width:768px) 50vw, 25vw"} />
                      </div>
                      <div className="mt-4 flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[.16em] text-black/45"><span>{item.category || "Aporetik"}</span>{item.date ? <><span>·</span><span>{formatDate(item.date)}</span></> : null}{item.demo ? <><span>·</span><span>örnek</span></> : null}</div>
                      <h3 className={`mt-2 font-serif leading-[1.02] tracking-[-.02em] group-hover:underline group-hover:underline-offset-4 ${wide ? "text-3xl sm:text-4xl" : "text-2xl"}`}>{item.title}</h3>
                      {wide && excerpt ? <p className="mt-3 line-clamp-3 text-sm leading-6 text-black/55">{excerpt}</p> : null}
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
