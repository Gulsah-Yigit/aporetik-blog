"use client";

import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { blog_data } from "@/Assets/assets";

const sampleCopy = [
  {
    title: "Bir Zamanlar Anadolu’da: Zaman, Suç ve Bekleyiş",
    category: "Perdeden",
    description: "Nuri Bilge Ceylan’ın bozkırında zaman neden ilerlemek yerine ağırlaşır? Bir gecenin içinde suç, bürokrasi ve insanlık hâli.",
  },
  {
    title: "Neden Eski Şarkılar Bize Daha Güzel Geliyor?",
    category: "Açmazlar",
    description: "Nostalji yalnızca geçmişi özlemek değil; hafızanın bugünü yeniden düzenleme biçimi olabilir.",
  },
  {
    title: "Korku Sinemasının Başına Ne Geldi?",
    category: "Perdeden",
    description: "Korku filmleri değişti mi, yoksa artık korktuğumuz şeyler mi başka?",
  },
  {
    title: "Telefonlarımız Neden Artık Heyecan Vermiyor?",
    category: "Kültür Notları",
    description: "Bir zamanlar gelecek hissi veren cihazların sıradanlaşmasının kısa tarihi.",
  },
  {
    title: "Yetişkin Olduğumuzda Arkadaş Edinmek Neden Zorlaşıyor?",
    category: "Uzun Okuma",
    description: "Okul bittiğinde sosyal hayatın görünmez altyapısı da dağılıyor. Yakınlık artık tesadüfe bırakılamıyor.",
  },
  {
    title: "David Lynch’in Dünyasında Rüya Görmek",
    category: "Perdeden",
    description: "Lynch’in filmleri cevap vermek yerine neden zihnimizde yeni sorular bırakıyor?",
  },
  {
    title: "Bir Şehri Yaşanabilir Yapan Şey Nedir?",
    category: "Yolda",
    description: "Kaldırımlar, banklar, kiralar ve tesadüfler: şehirle kurduğumuz ilişkinin küçük anatomisi.",
  },
  {
    title: "Kimsenin Vakti Yokmuş Gibi Yaşadığı Bir Çağ",
    category: "Açmazlar",
    description: "Zaman kazandıran araçlar arttıkça neden sürekli daha meşgul hissediyoruz?",
  },
  {
    title: "Bir Kitabı Yarım Bırakmak Neden Bu Kadar Zor?",
    category: "Sayfalar",
    description: "Okuma zevkinden çok tamamlamaya bağlandığımız anlar üzerine küçük bir itiraz.",
  },
  {
    title: "Dosya: Yalnızlığın Yeni Biçimleri",
    category: "Dosya",
    description: "Kalabalık şehirlerden dijital yakınlığa, yalnızlığın gündelik hayattaki yeni yüzleri.",
  },
  {
    title: "İnternet Bizi Aynılaştırıyor mu?",
    category: "Uzun Okuma",
    description: "Aynı estetik, aynı kelimeler, aynı fikirler. Algoritmik beğeninin kültüre etkisi.",
  },
  {
    title: "Filmler Neden Var?",
    category: "Perdeden",
    description: "Hikâye anlatmanın en pahalı yollarından birini neden hâlâ bu kadar önemsiyoruz?",
  },
];

const samplePosts = sampleCopy.map((copy, index) => ({
  ...copy,
  _id: `demo-${index + 1}`,
  image: blog_data[index % blog_data.length]?.image,
  date: new Date(2026, 7, Math.max(1, 16 - index)).toISOString(),
  demo: true,
}));

function cleanText(value = "") {
  return typeof value === "string" ? value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim() : "";
}

function formatDate(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("tr-TR", { day: "2-digit", month: "short" });
}

function getHref(post) {
  return post?.demo ? "/content" : `/blogs/${post?._id || post?.id}`;
}

function StoryMeta({ post, light = false }) {
  return (
    <div className={`flex flex-wrap items-center gap-2 text-[10px] font-medium uppercase tracking-[0.18em] ${light ? "text-white/65" : "text-black/45"}`}>
      <span>{post?.category || "Aporetik"}</span>
      {post?.date ? <><span>·</span><span>{formatDate(post.date)}</span></> : null}
      {post?.demo ? <><span>·</span><span>örnek içerik</span></> : null}
    </div>
  );
}

export default function EditorialHome() {
  const [realPosts, setRealPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const { data } = await axios.get("/api/blog");
        if (mounted) setRealPosts(Array.isArray(data?.blogs) ? data.blogs : []);
      } catch (error) {
        console.error("editorial home fetch:", error);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  const posts = useMemo(() => {
    const normalized = realPosts.map((post) => ({
      ...post,
      description: cleanText(post.description),
    }));
    return [...normalized, ...samplePosts].slice(0, 18);
  }, [realPosts]);

  const content = useMemo(() => ({
    hero: posts[0],
    side: posts.slice(1, 4),
    latest: posts.slice(4, 10),
    dossier: posts.slice(10, 13),
    more: posts.slice(13, 17),
  }), [posts]);

  if (loading && realPosts.length === 0) {
    return <main className="mx-auto max-w-[1380px] px-5 py-10"><div className="h-[540px] animate-pulse rounded-[28px] bg-black/[.04]" /></main>;
  }

  return (
    <main className="bg-[#fbfaf6] text-[#171717]">
      <section className="mx-auto max-w-[1380px] px-5 pb-16 pt-7 sm:px-8 lg:px-10">
        <div className="mb-5 flex items-center justify-between border-b border-black/15 pb-3 text-[10px] uppercase tracking-[.22em] text-black/50">
          <span>Bağımsız kültür, fikir ve merak yayını</span>
          <span className="hidden sm:block">İstanbul · 2026</span>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.75fr)_minmax(300px,.72fr)]">
          <Link href={getHref(content.hero)} className="group relative min-h-[520px] overflow-hidden rounded-[28px] bg-neutral-900 lg:min-h-[610px]">
            <Image src={content.hero.image} alt={content.hero.title} fill priority className="object-cover transition duration-700 group-hover:scale-[1.015]" sizes="(max-width:1024px) 100vw, 72vw" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/5" />
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-9 lg:p-12">
              <StoryMeta post={content.hero} light />
              <h1 className="mt-4 max-w-5xl font-serif text-[clamp(2.6rem,6vw,5.7rem)] leading-[.92] tracking-[-.035em] text-white">{content.hero.title}</h1>
              <p className="mt-5 max-w-2xl text-sm leading-6 text-white/72 sm:text-base">{content.hero.description}</p>
              <span className="mt-6 inline-block border-b border-white/45 pb-1 text-xs uppercase tracking-[.18em] text-white/85">Yazıya git ↗</span>
            </div>
          </Link>

          <aside className="flex flex-col rounded-[28px] bg-[#efb53d] p-6 sm:p-8">
            <div className="flex items-center justify-between border-b border-black/25 pb-4">
              <span className="text-[11px] font-semibold uppercase tracking-[.2em]">Kenar Notları</span>
              <span className="font-serif text-2xl italic">03</span>
            </div>
            <div className="flex-1 divide-y divide-black/20">
              {content.side.map((post, index) => (
                <Link key={post._id || post.id} href={getHref(post)} className="group grid grid-cols-[34px_1fr] gap-3 py-7 first:pt-6">
                  <span className="font-serif text-xl italic text-black/35">{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <StoryMeta post={post} />
                    <h2 className="mt-2 font-serif text-[1.45rem] leading-[1.05] tracking-[-.015em] group-hover:underline group-hover:underline-offset-4">{post.title}</h2>
                  </div>
                </Link>
              ))}
            </div>
            <p className="border-t border-black/20 pt-5 text-xs leading-5 text-black/60">Kültür gündeminden uzun okumalara; hızlıca göz atılacak üç şey.</p>
          </aside>
        </div>
      </section>

      <section className="border-y border-black/10 bg-[#f4efe4]">
        <div className="mx-auto flex max-w-[1380px] gap-8 overflow-x-auto px-5 py-5 sm:px-8 lg:px-10">
          {["Açmazlar", "Kültür Notları", "Sayfalar", "Perdeden", "Yolda", "Uzun Okuma"].map((item, index) => (
            <Link key={item} href="/content" className="flex shrink-0 items-center gap-3 text-xs uppercase tracking-[.16em] text-black/65 hover:text-black">
              <span className="font-serif text-base italic text-[#b67b09]">0{index + 1}</span>{item}
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1380px] px-5 py-16 sm:px-8 lg:px-10">
        <div className="mb-8 grid gap-4 border-b border-black pb-5 md:grid-cols-[1fr_auto] md:items-end">
          <div><p className="text-[10px] uppercase tracking-[.22em] text-black/40">Yeni düşenler</p><h2 className="mt-1 font-serif text-5xl tracking-[-.03em] sm:text-6xl">Son Yazılar</h2></div>
          <Link href="/content" className="text-xs uppercase tracking-[.16em] underline underline-offset-4">Arşivin tamamı</Link>
        </div>

        <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-12">
          {content.latest.map((post, index) => {
            const wide = index === 0 || index === 5;
            return (
              <Link key={post._id || post.id} href={getHref(post)} className={`group ${wide ? "lg:col-span-6" : "lg:col-span-3"}`}>
                <div className={`relative overflow-hidden rounded-[22px] bg-black/5 ${wide ? "aspect-[16/10]" : "aspect-[4/5]"}`}>
                  <Image src={post.image} alt={post.title} fill className="object-cover transition duration-500 group-hover:scale-[1.02]" sizes={wide ? "(max-width:1024px) 100vw, 50vw" : "(max-width:1024px) 50vw, 25vw"} />
                </div>
                <div className="mt-4"><StoryMeta post={post} /></div>
                <h3 className={`mt-2 font-serif leading-[1.03] tracking-[-.02em] group-hover:underline group-hover:underline-offset-4 ${wide ? "text-3xl sm:text-4xl" : "text-2xl"}`}>{post.title}</h3>
                {wide ? <p className="mt-3 max-w-xl text-sm leading-6 text-black/55">{post.description}</p> : null}
              </Link>
            );
          })}
        </div>
      </section>

      <section className="bg-[#161616] text-white">
        <div className="mx-auto max-w-[1380px] px-5 py-16 sm:px-8 lg:px-10">
          <div className="mb-9 flex items-end justify-between border-b border-white/15 pb-5">
            <div><p className="text-[10px] uppercase tracking-[.22em] text-[#efb53d]">Aporetik Dosya</p><h2 className="mt-2 font-serif text-5xl tracking-[-.03em] sm:text-7xl">Biraz daha derine.</h2></div>
            <span className="hidden font-serif text-7xl italic text-white/10 md:block">#01</span>
          </div>

          <div className="grid gap-6 lg:grid-cols-[.65fr_1.35fr]">
            <div className="flex flex-col justify-between rounded-[24px] border border-white/15 p-7">
              <div><p className="text-sm leading-7 text-white/60">Aynı meselenin etrafında dolaşan yazılar, filmler, kitaplar ve notlar. Ana sayfanın daha yavaş bölümü.</p><blockquote className="mt-10 font-serif text-3xl italic leading-tight text-white/90">“Bazı sorular cevaplanmak için değil, biraz daha iyi sorulmak içindir.”</blockquote></div>
              <Link href="/content" className="mt-12 w-fit border-b border-white/40 pb-1 text-xs uppercase tracking-[.17em]">Dosyayı aç ↗</Link>
            </div>
            <div className="grid gap-5 sm:grid-cols-3">
              {content.dossier.map((post) => (
                <Link key={post._id || post.id} href={getHref(post)} className="group">
                  <div className="relative aspect-[3/4] overflow-hidden rounded-[24px] bg-white/5">
                    <Image src={post.image} alt={post.title} fill className="object-cover transition duration-500 group-hover:scale-[1.02]" sizes="(max-width:768px) 100vw, 24vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/5 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-5"><StoryMeta post={post} light /><h3 className="mt-2 font-serif text-2xl leading-[1.05]">{post.title}</h3></div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1380px] px-5 py-16 sm:px-8 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[1fr_370px]">
          <div>
            <div className="border-b border-black pb-4"><p className="text-[10px] uppercase tracking-[.22em] text-black/40">Editörün masası</p><h2 className="font-serif text-5xl tracking-[-.03em]">Biraz daha oku</h2></div>
            <div className="divide-y divide-black/10">
              {content.more.map((post, index) => (
                <Link key={post._id || post.id} href={getHref(post)} className="group grid grid-cols-[36px_110px_1fr] gap-4 py-5 sm:grid-cols-[48px_150px_1fr] sm:items-center">
                  <span className="self-start pt-1 font-serif text-xl italic text-black/25">0{index + 1}</span>
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[16px] bg-black/5"><Image src={post.image} alt={post.title} fill className="object-cover" sizes="150px" /></div>
                  <div><StoryMeta post={post} /><h3 className="mt-2 font-serif text-xl leading-tight group-hover:underline group-hover:underline-offset-4 sm:text-2xl">{post.title}</h3></div>
                </Link>
              ))}
            </div>
          </div>

          <aside className="h-fit rounded-[28px] bg-[#efb53d] p-7 lg:sticky lg:top-5">
            <p className="text-[10px] uppercase tracking-[.22em]">Aporetik Postası</p>
            <h3 className="mt-4 font-serif text-4xl leading-[.98] tracking-[-.025em]">Haftada bir.<br/>Gürültüsüz.</h3>
            <p className="mt-4 text-sm leading-6 text-black/60">Yeni yazılar, izlenecekler ve internette kaybolmadan önce saklamak istediğimiz birkaç şey.</p>
            <form className="mt-7" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="e-posta adresin" className="w-full rounded-full border border-black/20 bg-[#fbfaf6] px-5 py-3.5 text-sm outline-none focus:border-black" />
              <button className="mt-3 w-full rounded-full bg-black px-5 py-3.5 text-sm font-medium text-white">Postaya katıl</button>
            </form>
            <p className="mt-4 text-[10px] leading-4 text-black/45">Spam yok. Sadece Aporetik.</p>
          </aside>
        </div>
      </section>
    </main>
  );
}
