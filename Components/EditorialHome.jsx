"use client";

import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

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

function StoryMeta({ post, light = false }) {
  return (
    <div className={`flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] ${light ? "text-white/60" : "text-black/45"}`}>
      <span>{post?.category || "Aporetik"}</span>
      {post?.date ? <span>•</span> : null}
      {post?.date ? <span>{formatDate(post.date)}</span> : null}
    </div>
  );
}

export default function EditorialHome() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const { data } = await axios.get("/api/blog");
        if (mounted) setPosts(Array.isArray(data?.blogs) ? data.blogs : []);
      } catch (error) {
        console.error("editorial home fetch:", error);
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  const content = useMemo(() => {
    const withImage = posts.filter((post) => post?.image);
    const hero = withImage[0] || posts[0];
    const rest = posts.filter((post) => post !== hero);

    return {
      hero,
      side: rest.slice(0, 3),
      latest: rest.slice(3, 9),
      dossier: rest.slice(9, 12).length ? rest.slice(9, 12) : rest.slice(0, 3),
      more: rest.slice(12, 16).length ? rest.slice(12, 16) : rest.slice(3, 7),
    };
  }, [posts]);

  if (loading) {
    return (
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="h-[420px] animate-pulse rounded-[2rem] bg-black/5" />
      </main>
    );
  }

  if (!content.hero) return null;

  const heroId = content.hero._id || content.hero.id;

  return (
    <main className="pb-20">
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8 pb-14">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.55fr)_minmax(320px,.75fr)] lg:items-stretch">
          <Link
            href={`/blogs/${heroId}`}
            className="group relative min-h-[460px] overflow-hidden rounded-[2rem] bg-neutral-900"
          >
            <Image
              src={content.hero.image || "/placeholder.jpg"}
              alt={content.hero.title || "Aporetik"}
              fill
              priority
              className="object-cover transition duration-700 group-hover:scale-[1.02]"
              sizes="(max-width:1024px) 100vw, 68vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 lg:p-10">
              <StoryMeta post={content.hero} light />
              <h2 className="mt-3 max-w-4xl font-serif text-3xl leading-[1.02] text-white sm:text-5xl lg:text-6xl">
                {content.hero.title}
              </h2>
              {content.hero.description ? (
                <p className="mt-4 max-w-2xl text-sm leading-6 text-white/75 sm:text-base">
                  {content.hero.description}
                </p>
              ) : null}
            </div>
          </Link>

          <aside className="rounded-[2rem] border border-black/10 bg-[#f4b942] p-6 sm:p-8">
            <div className="mb-6 flex items-center justify-between border-b border-black/20 pb-4">
              <p className="text-xs font-semibold uppercase tracking-[0.22em]">Şimdi Aporetik’te</p>
              <span className="h-2.5 w-2.5 rounded-full bg-black" />
            </div>
            <div className="divide-y divide-black/15">
              {content.side.map((post, index) => (
                <Link
                  key={post._id || post.id}
                  href={`/blogs/${post._id || post.id}`}
                  className="group grid grid-cols-[40px_1fr] gap-3 py-5 first:pt-0"
                >
                  <span className="font-serif text-2xl italic text-black/35">0{index + 1}</span>
                  <div>
                    <StoryMeta post={post} />
                    <h3 className="mt-2 font-serif text-xl leading-tight transition group-hover:underline group-hover:underline-offset-4">
                      {post.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="border-y border-black/10 bg-[#f7f3ea]">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px px-4 py-4 text-center text-[11px] font-medium uppercase tracking-[0.18em] text-black/65 sm:grid-cols-3 lg:grid-cols-6 sm:px-6 lg:px-8">
          {["Sinema", "Edebiyat", "Sanat", "Fikir", "Uzun Okuma", "Yolda"].map((item) => (
            <span key={item} className="py-2">{item}</span>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between gap-4 border-b border-black pb-4">
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-black/45">Yeni düşenler</p>
            <h2 className="mt-1 font-serif text-4xl sm:text-5xl">Son Yazılar</h2>
          </div>
          <Link href="/content" className="text-sm underline underline-offset-4">Tümünü gör</Link>
        </div>

        <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {content.latest.map((post, index) => (
            <Link key={post._id || post.id} href={`/blogs/${post._id || post.id}`} className="group">
              <div className={`relative overflow-hidden rounded-[1.6rem] bg-black/5 ${index === 0 ? "aspect-[4/3]" : "aspect-[16/10]"}`}>
                <Image
                  src={post.image || "/placeholder.jpg"}
                  alt={post.title || "Aporetik yazısı"}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-[1.025]"
                  sizes="(max-width:768px) 100vw, 33vw"
                />
              </div>
              <StoryMeta post={post} />
              <h3 className="mt-2 font-serif text-2xl leading-[1.08] group-hover:underline group-hover:underline-offset-4">
                {post.title}
              </h3>
              {post.description ? <p className="mt-3 line-clamp-2 text-sm leading-6 text-black/60">{post.description}</p> : null}
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-[#171717] text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[.55fr_1.45fr]">
            <div className="flex flex-col justify-between">
              <div>
                <span className="inline-flex rounded-full border border-white/20 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-white/70">Dosya</span>
                <h2 className="mt-5 font-serif text-5xl leading-none sm:text-6xl">Bir konunun peşine düşünce.</h2>
                <p className="mt-5 max-w-md text-sm leading-7 text-white/55">Tek bir başlık etrafında yazılar, filmler, kitaplar ve düşünceler. Kart değil; küçük bir editoryal dosya.</p>
              </div>
              <Link href="/content" className="mt-8 w-fit text-sm underline decoration-white/50 underline-offset-4">Dosyalara göz at</Link>
            </div>

            <div className="grid gap-5 sm:grid-cols-3">
              {content.dossier.map((post) => (
                <Link key={post._id || post.id} href={`/blogs/${post._id || post.id}`} className="group">
                  <div className="relative aspect-[3/4] overflow-hidden rounded-[1.6rem] bg-white/5">
                    <Image src={post.image || "/placeholder.jpg"} alt={post.title || "Dosya"} fill className="object-cover transition duration-500 group-hover:scale-[1.025]" sizes="(max-width:768px) 100vw, 22vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-5">
                      <StoryMeta post={post} light />
                      <h3 className="mt-2 font-serif text-2xl leading-tight">{post.title}</h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
          <div>
            <div className="mb-6 border-b border-black pb-3">
              <p className="text-[11px] uppercase tracking-[0.2em] text-black/45">Seçki</p>
              <h2 className="font-serif text-4xl">Biraz daha oku</h2>
            </div>
            <div className="divide-y divide-black/10">
              {content.more.map((post) => (
                <Link key={post._id || post.id} href={`/blogs/${post._id || post.id}`} className="group grid gap-4 py-5 sm:grid-cols-[150px_1fr] sm:items-center">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-black/5">
                    <Image src={post.image || "/placeholder.jpg"} alt={post.title || "Aporetik"} fill className="object-cover" sizes="150px" />
                  </div>
                  <div>
                    <StoryMeta post={post} />
                    <h3 className="mt-2 font-serif text-2xl leading-tight group-hover:underline group-hover:underline-offset-4">{post.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <aside className="self-start rounded-[2rem] border border-black/10 bg-[#f7f3ea] p-7 lg:sticky lg:top-6">
            <p className="text-[11px] uppercase tracking-[0.2em] text-black/45">Aporetik Postası</p>
            <h3 className="mt-3 font-serif text-4xl leading-none">Haftada bir, gereksiz gürültü olmadan.</h3>
            <p className="mt-4 text-sm leading-6 text-black/60">Yeni yazılar, izlenecekler ve akılda kalan birkaç şey.</p>
            <form className="mt-6 flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="e-posta adresin" className="min-w-0 flex-1 rounded-full border border-black/15 bg-white px-4 py-3 text-sm outline-none focus:border-black" />
              <button className="rounded-full bg-black px-5 py-3 text-sm text-white">Katıl</button>
            </form>
          </aside>
        </div>
      </section>
    </main>
  );
}
