"use client";

import Image from "next/image";
import Link from "next/link";
import { blog_data } from "@/Assets/assets";
import {
  FiArrowRight,
  FiBookOpen,
  FiBookmark,
  FiFeather,
  FiFilm,
  FiHeadphones,
  FiPlay,
  FiInstagram,
  FiYoutube,
} from "react-icons/fi";
import { SiX, SiSpotify } from "react-icons/si";

const hero = {
  title: "Bir Zamanlar Anadolu’da Zaman ve Suç",
  category: "ÖNE ÇIKAN YAZI",
  description:
    "Nuri Bilge Ceylan’ın sisli yollarında, yalnızca bir cinayet değil, hakikatin kendisi de araştırılır.",
  image: blog_data[0]?.image,
};

const sideStories = [
  { title: "The Bear: Mutfaktaki Kaosun Şiiri", category: "DİZİ ANALİZİ", image: blog_data[1]?.image },
  { title: "Melankolinin Edebiyattaki İzleri", category: "EDEBİYAT", image: blog_data[2]?.image },
  { title: "Perfect Days: Küçük Şeylerin Mükemmelliği", category: "FİLM İNCELEMESİ", image: blog_data[3]?.image },
];

const dossier = [
  { title: "Gerçekçilikten Yeni Gerçekçiliğe", author: "E. Batu Akdeniz", image: blog_data[4]?.image },
  { title: "Tarkovski’de Zamanın Ruhu", author: "M. Enes Kaya", image: blog_data[5]?.image },
  { title: "Sinema Salonunun Kaybolan Büyüsü", author: "Ayça İlhan", image: blog_data[6]?.image },
];

const latest = [
  { title: "Poor Things: Özgürleşmenin Fantastik Anatomisi", category: "FİLM İNCELEMESİ", author: "Berkay Erden", date: "12 Mayıs 2024", image: blog_data[7]?.image },
  { title: "Kafka’nın Dönüşüm’ünde Aile ve Yabancılaşma", category: "EDEBİYAT", author: "Selin Okyay", date: "10 Mayıs 2024", image: blog_data[8]?.image },
  { title: "Succession: İktidarın Aile İçi Draması", category: "DİZİ ANALİZİ", author: "Ali Eren Demir", date: "8 Mayıs 2024", image: blog_data[9]?.image },
  { title: "Teknoloji Çağında Yalnızlık Üzerine", category: "DÜŞÜNCE", author: "Deniz Fırat", date: "6 Mayıs 2024", image: blog_data[10]?.image },
];

const editorPicks = [
  { title: "Andrey Rublev: İnancın Sinemadaki Yüzü", category: "FİLM İNCELEMESİ", image: blog_data[11]?.image },
  { title: "Virginia Woolf’un Kendine Ait Bir Oda’sı", category: "EDEBİYAT", image: blog_data[12]?.image },
  { title: "İnsanın Anlam Arayışı ve Sinemanın Rolü", category: "DÜŞÜNCE", image: blog_data[13]?.image },
];

function Cover({ src, alt, className = "", sizes = "100vw" }) {
  return (
    <div className={`relative isolate overflow-hidden bg-[#d8d4cd] ${className}`}>
      <div className="absolute inset-0 z-0 bg-[#d8d4cd]" />
      <Image
        src={src}
        alt={alt}
        fill
        className="z-10 object-cover opacity-100"
        sizes={sizes}
      />
    </div>
  );
}

export default function EditorialHome() {
  return (
    <main className="bg-[#fbfaf6] text-[#111]">
      <section className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-10">
        <div className="grid min-h-[520px] border-b border-black/20 lg:grid-cols-[.88fr_1.55fr_.82fr]">
          <div className="flex flex-col justify-center px-6 py-10 lg:px-9">
            <div className="mb-5 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[.08em]">
              <span>{hero.category}</span>
              <span className="h-px w-8 bg-[#e4a516]" />
            </div>
            <h1 className="max-w-[390px] font-serif text-[clamp(2.8rem,4.2vw,4.5rem)] leading-[.98] tracking-[-.025em]">
              {hero.title}
            </h1>
            <p className="mt-5 max-w-[360px] text-[15px] leading-7 text-black/70">
              {hero.description}
            </p>
            <Link href="/content" className="mt-7 inline-flex w-fit items-center gap-3 text-sm font-semibold">
              Yazıyı Oku <FiArrowRight />
            </Link>
            <div className="mt-8 flex gap-7 text-xs text-black/45">
              <span className="border-b-2 border-[#e4a516] pb-2 text-black">01</span>
              <span className="pb-2">02</span>
              <span className="pb-2">03</span>
            </div>
          </div>

          <Cover
            src={hero.image}
            alt={hero.title}
            className="min-h-[420px] lg:min-h-[520px]"
            sizes="(max-width:1024px) 100vw, 50vw"
          />

          <div className="flex flex-col justify-center px-5 py-7 lg:px-7">
            {sideStories.map((story, index) => (
              <Link
                key={story.title}
                href="/content"
                className={`grid grid-cols-[105px_1fr] gap-4 py-5 ${index !== sideStories.length - 1 ? "border-b border-black/10" : ""}`}
              >
                <Cover src={story.image} alt={story.title} className="h-[86px] rounded-[7px]" sizes="105px" />
                <div className="self-center">
                  <p className="text-[9px] font-medium uppercase text-black/45">{story.category}</p>
                  <h3 className="mt-2 font-serif text-[17px] leading-[1.15]">{story.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="my-5 grid overflow-hidden rounded-[10px] border border-black/10 bg-white/35 md:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: FiFilm, title: "Film İncelemeleri", text: "Yeni çıkanlar, klasikler ve kült yapımlar" },
            { icon: FiBookOpen, title: "Edebiyat Yazıları", text: "Roman, öykü, şiir ve yazar dosyaları" },
            { icon: FiFeather, title: "Düşünce Yazıları", text: "Felsefe, toplum ve güncel tartışmalar" },
            { icon: FiHeadphones, title: "Podcast & Video", text: "Aporetik sesli ve görsel içerikleri" },
          ].map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className={`flex items-center gap-5 px-7 py-6 ${index !== 3 ? "lg:border-r lg:border-black/10" : ""}`}>
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#f9e8bd]">
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-serif text-xl leading-tight">{item.title}</h3>
                  <p className="mt-1 text-xs leading-5 text-black/65">{item.text}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="bg-[#0d0f0f] text-white">
        <div className="mx-auto grid max-w-[1500px] gap-8 px-5 py-10 sm:px-8 lg:grid-cols-[.95fr_2fr_auto] lg:px-10">
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-3 text-[10px] font-semibold uppercase text-[#e4a516]">
              <span>DOSYA</span><span className="h-px w-8 bg-[#e4a516]" />
            </div>
            <h2 className="mt-4 max-w-[330px] font-serif text-4xl leading-[1.08] sm:text-5xl">
              Sinema: Gerçekliği Yeniden Kurmanın Biçimleri
            </h2>
            <p className="mt-4 max-w-[360px] text-sm leading-6 text-white/70">
              Sinema, yalnızca bir anlatı aracı değil; dünyaya bakışımızı değiştiren güçlü bir düşünme biçimidir.
            </p>
            <Link href="/content" className="mt-6 inline-flex w-fit items-center gap-3 rounded-[4px] bg-[#efb53d] px-5 py-3 text-xs font-semibold text-black">
              Dosyayı Keşfet <FiArrowRight />
            </Link>
          </div>

          <div className="grid gap-5 sm:grid-cols-3">
            {dossier.map((story, index) => (
              <Link key={story.title} href="/content" className="group rounded-[10px] border border-[#c8901f]/35 bg-[#111] p-3">
                <Cover src={story.image} alt={story.title} className="aspect-[4/3] rounded-[8px] bg-[#222]" sizes="28vw" />
                <div className="mt-4 flex items-center gap-3 text-[10px] text-[#e4a516]"><span>0{index + 1}</span><span className="h-px w-6 bg-[#e4a516]" /></div>
                <h3 className="mt-2 font-serif text-xl leading-[1.1]">{story.title}</h3>
                <p className="mt-3 text-xs text-white/70">{story.author}</p>
              </Link>
            ))}
          </div>

          <div className="hidden items-center lg:flex">
            <button className="flex h-11 w-11 items-center justify-center rounded-full border border-[#c8901f]/60"><FiArrowRight /></button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1500px] px-5 py-9 sm:px-8 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_280px]">
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-serif text-3xl">Son Yazılar</h2>
              <Link href="/content" className="flex items-center gap-2 text-xs font-semibold">Tüm Yazılar <FiArrowRight /></Link>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {latest.map((story) => (
                <article key={story.title} className="overflow-hidden rounded-[7px] border border-black/10 bg-white">
                  <Cover src={story.image} alt={story.title} className="aspect-[16/10]" sizes="25vw" />
                  <div className="p-4">
                    <p className="text-[9px] uppercase text-black/40">{story.category}</p>
                    <h3 className="mt-2 min-h-[54px] font-serif text-[17px] leading-[1.16]">{story.title}</h3>
                    <p className="mt-3 text-xs">{story.author}</p>
                    <div className="mt-4 flex items-center justify-between text-[10px] text-black/50">
                      <span>{story.date}</span><FiBookmark className="h-4 w-4 text-black" />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <aside className="border-l border-black/10 pl-7">
            <h2 className="font-serif text-3xl">Aporetik Postası</h2>
            <span className="mt-3 block h-px w-8 bg-[#e4a516]" />
            <p className="mt-5 text-sm leading-6 text-black/70">Haftanın en iyi yazıları, özel içerikler ve yeni dosyalar e-posta kutunda.</p>
            <form className="mt-6 space-y-3" onSubmit={(e) => e.preventDefault()}>
              <input className="w-full border border-black/15 bg-white px-4 py-3 text-sm outline-none" placeholder="E-posta adresiniz" />
              <button className="w-full bg-black py-3 text-sm text-white">Abone Ol</button>
            </form>
            <p className="mt-7 text-xs font-semibold">Bizi takip edin.</p>
            <div className="mt-4 flex items-center gap-5 text-xl">
              <FiInstagram /><SiX /><FiYoutube /><SiSpotify /><FiHeadphones />
            </div>
          </aside>
        </div>
      </section>

      <section className="mx-auto max-w-[1500px] border-t border-black/10 px-5 py-5 sm:px-8 lg:px-10">
        <div className="grid gap-7 lg:grid-cols-[.75fr_1.4fr_1fr]">
          <div>
            <h2 className="font-serif text-3xl">Editörün Seçkisi</h2>
            <div className="mt-5 space-y-4">
              {editorPicks.map((story) => (
                <Link key={story.title} href="/content" className="grid grid-cols-[86px_1fr] gap-4">
                  <Cover src={story.image} alt={story.title} className="h-[60px] rounded-[5px]" sizes="86px" />
                  <div><h3 className="font-serif text-[15px] leading-[1.15]">{story.title}</h3><p className="mt-2 text-[9px] uppercase text-black/45">{story.category}</p></div>
                </Link>
              ))}
            </div>
          </div>

          <div className="border-x border-black/10 px-7">
            <h2 className="font-serif text-3xl">Aporetik Podcast</h2>
            <div className="mt-5 overflow-hidden rounded-[8px] bg-[#0f1010] p-6 text-white">
              <div className="grid items-center gap-5 sm:grid-cols-[1.2fr_.8fr]">
                <div>
                  <p className="text-[10px] text-[#e4a516]">Yeni Bölüm</p>
                  <h3 className="mt-3 font-serif text-3xl leading-tight">Akira Kurosawa Üzerine Bir Sohbet</h3>
                  <p className="mt-3 text-xs text-white/70">Konuk: Ertan Yılmaz</p>
                  <div className="mt-6 flex items-center gap-4"><span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#efb53d] text-black"><FiPlay /></span><span className="h-px flex-1 bg-white/30" /><span className="text-xs">42:18</span></div>
                </div>
                <Cover src={blog_data[14]?.image} alt="Podcast" className="aspect-square rounded-full bg-[#222]" sizes="220px" />
              </div>
            </div>
            <button className="mt-4 flex items-center gap-3 border border-black/25 px-5 py-3 text-xs">Tüm Bölümleri Gör <FiArrowRight /></button>
          </div>

          <div className="relative overflow-hidden px-2 pb-3">
            <h2 className="font-serif text-3xl">Aporetik’e Katıl</h2>
            <p className="mt-6 max-w-[280px] text-sm leading-6 text-black/70">Bağımsız ve nitelikli içeriğin sürdürülmesine destek ol.</p>
            <button className="mt-6 flex items-center gap-3 border border-black px-5 py-3 text-xs font-semibold">Destek Ol <FiArrowRight /></button>
            <div className="absolute bottom-1 right-3 h-32 w-32 rounded-full bg-[#efb53d] opacity-90" />
            <div className="relative z-10 mt-6 ml-auto w-[62%] border-b border-black/25 pb-4 text-right font-serif text-5xl italic text-black/20">oku.</div>
          </div>
        </div>
      </section>
    </main>
  );
}
