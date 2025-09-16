// components/FeaturedGrid.jsx
"use client";

import Image from "next/image";
import Link from "next/link";

function formatDate(d) {
  try {
    const dt = new Date(d);
    if (Number.isNaN(dt.getTime())) return null;
    return dt.toLocaleDateString("tr-TR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  } catch {
    return null;
  }
}

function Badge({ children }) {
  if (!children) return null;
  return (
    <span className="inline-block text-[11px] uppercase tracking-wide px-2 py-0.5 bg-[#444444] text-white">
      {children}
    </span>
  );
}

export default function FeaturedGrid({ posts = [] }) {
  if (!Array.isArray(posts) || posts.length === 0) return null;

  // ❶ Görseli olan ilk postu HERO yap, yoksa 0. index
  const hero =
    posts.find((p) => typeof p?.image === "string" && p.image.trim() !== "") ??
    posts[0];

  // ❷ Sağ liste: hero’yu çıkar, kalanlardan 3 adet
  const list = posts.filter((p) => p !== hero).slice(0, 3);

  return (
    <>
      <section className="mt-6 md:mt-8 mb-10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid gap-5 md:grid-cols-[5fr_4fr]">
            {/* SOL: büyük kapak */}
            <Link
              href={`/blogs/${hero._id || hero.id}`}
              className="relative block overflow-hidden"
            >
              {/* ❸ Container: her durumda yükseklik var */}
              <div className="relative w-full aspect-[16/9] md:h-[400px] lg:h-[440px] md:aspect-auto">
                {hero?.image ? (
                  <Image
                    src={hero.image.startsWith("/") ? hero.image : hero.image}
                    alt={hero.title || "featured"}
                    fill
                    sizes="(max-width:768px) 100vw, 56vw"
                    className="object-cover"
                    priority
                  />
                ) : (
                  // ❹ Yedek görsel (public/placeholder.jpg koyabilirisin)
                  <Image
                    src="/placeholder.jpg"
                    alt="placeholder"
                    fill
                    sizes="(max-width:768px) 100vw, 56vw"
                    className="object-cover"
                    priority
                  />
                )}
              </div>
              <div className="absolute inset-x-0 bottom-0 p-4 md:p-6 bg-gradient-to-t from-black/70 via-black/35 to-transparent">
                <div className="mb-2">
                  <Badge>{hero?.category}</Badge>
                </div>
                <h2 className="text-white text-xl md:text-[26px] lg:text-[30px] font-semibold leading-tight">
                  {hero?.title}
                </h2>
                {hero?.date && (
                  <div className="mt-2 text-white/85 text-xs">
                    {formatDate(hero.date)}
                  </div>
                )}
              </div>
            </Link>

            {/* SAĞ: 3 satır */}
            <div className="grid grid-rows-3 gap-4 md:h-[400px] lg:h-[440px]">
              {list.map((p) => (
                <Link
                  key={p._id || p.id}
                  href={`/blogs/${p._id || p.id}`}
                  className="grid grid-cols-[160px_minmax(0,1fr)] gap-4 items-center hover:opacity-95"
                >
                  <div className="relative h-[110px] md:h-full bg-neutral-200/30">
                    <Image
                      src={p.image || "/placeholder.jpg"}
                      alt={p.title || "post"}
                      fill
                      className="object-cover"
                      sizes="(max-width:768px) 45vw, 160px"
                    />
                  </div>

                  <div className="flex flex-col min-w-0 py-1 pr-1">
                    <div className="mb-1">
                      <Badge>{p.category}</Badge>
                    </div>
                    <h3 className="text-[15px] md:text-base font-semibold leading-snug line-clamp-2 hover:underline underline-offset-4">
                      {p.title}
                    </h3>
                    {p?.date && (
                      <div className="mt-1 text-[12px] text-neutral-500">
                        {formatDate(p.date)}
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* full-bleed çizgi + küçük boşluk */}
      <div className="relative">
        <div className="h-px w-[100vw] bg-black/10 left-1/2 -translate-x-1/2 relative" />
      </div>
      <div className="h-10 sm:h-12 md:h-14" />
    </>
  );
}
