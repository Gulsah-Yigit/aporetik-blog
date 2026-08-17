import Header from "@/Components/Header";
import TopNavbar from "@/Components/TopNavbar";
import Footer from "@/Components/Footer";
import { blog_data } from "@/Assets/assets";
import Image from "next/image";
import Link from "next/link";

const DEMOS = [
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

export default async function DemoArticle({ params }) {
  const { id } = await params;
  const index = Math.max(0, Math.min(DEMOS.length - 1, Number(String(id).replace("demo-", "")) - 1 || 0));
  const [title, category] = DEMOS[index];
  const image = blog_data[index % blog_data.length]?.image;

  return (
    <>
      <Header />
      <TopNavbar />
      <main className="bg-[#fbfaf6] text-[#171717]">
        <article className="mx-auto max-w-[1180px] px-5 pb-24 pt-12 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-[10px] uppercase tracking-[.22em] text-black/45">{category} · örnek içerik</p>
            <h1 className="mt-5 font-serif text-[clamp(3rem,7vw,6.8rem)] leading-[.92] tracking-[-.045em]">{title}</h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-black/55">Bu sayfa yalnızca Aporetik’in yeni yazı detay tasarımını görmen için hazırlanmış örnek bir içeriktir.</p>
          </div>

          <div className="relative mx-auto mt-10 aspect-[16/9] max-w-6xl overflow-hidden rounded-[28px] bg-black/5">
            <Image src={image} alt={title} fill priority className="object-cover" sizes="100vw" />
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl gap-10 lg:grid-cols-[180px_1fr]">
            <aside className="text-xs uppercase tracking-[.14em] text-black/40">
              <p>16 Ağustos 2026</p>
              <p className="mt-2">7 dk okuma</p>
              <p className="mt-2">Aporetik</p>
            </aside>

            <div className="space-y-7 font-serif text-[1.2rem] leading-[1.85] text-black/80 sm:text-[1.28rem]">
              <p>Bir şeyi anlamaya çalışırken çoğu zaman hemen cevaba koşuyoruz. Oysa bazen asıl mesele, soruyu biraz daha uzun süre taşımak. Aporetik’in yazı dili de tam burada başlıyor.</p>
              <p>Bu örnek metin gerçek bir makale değil; yeni tasarımın paragraf ritmini, satır uzunluğunu, boşluklarını ve okuma hissini göstermek için burada. Gerçek içerikler eklendiğinde aynı yapı korunacak.</p>
              <blockquote className="my-10 border-l-2 border-[#efb53d] pl-6 text-2xl italic leading-relaxed text-black">“İyi bir yazı bazen cevap vermekten çok, okurun zihninde yeni bir kapı açar.”</blockquote>
              <p>Başlıklar, görseller, alıntılar ve ara bölümler daha sonra admin panelinden gelen gerçek içerikle beslenebilir. Tasarımın amacı metni süslemek değil; metnin nefes alabileceği bir alan yaratmak.</p>
              <h2 className="pt-5 text-3xl font-semibold leading-tight">Peki sonra ne olacak?</h2>
              <p>Örnek yazılar kaldırılacak, gerçek içerikler ana sayfada ve arşivde otomatik yerleşecek. İstersen bazı yazıları ana manşet, dosya ya da editör seçkisi olarak işaretleyebileceğimiz alanlar da ekleyebiliriz.</p>
            </div>
          </div>

          <div className="mx-auto mt-14 max-w-5xl border-t border-black/10 pt-6">
            <Link href="/" className="text-xs uppercase tracking-[.16em] underline underline-offset-4">← Ana sayfaya dön</Link>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
