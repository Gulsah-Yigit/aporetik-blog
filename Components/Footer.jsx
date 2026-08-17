import { assets } from "@/Assets/assets";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-black/15 bg-[#fbfaf6] text-[#151515]">
      <div className="mx-auto max-w-[1500px] px-5 py-5 sm:px-8 lg:px-10">
        <div className="grid gap-8 md:grid-cols-[1.2fr_.8fr_.8fr_.8fr]">
          <div className="flex items-start gap-4">
            <Image src={assets.logo} alt="Aporetik ördek logosu" width={48} height={48} className="h-[46px] w-[46px] object-contain" />
            <div>
              <p className="font-serif text-2xl font-semibold">aporetik.</p>
              <p className="mt-1 max-w-[230px] text-xs leading-5 text-black/65">Düşünmeyi sevenler için. Bağımsız, nitelikli ve yavaş gazetecilik.</p>
            </div>
          </div>

          <div>
            <p className="text-[9px] font-semibold uppercase">Kurumsal</p>
            <div className="mt-3 grid gap-1 text-[10px] text-black/70">
              <Link href="/">Hakkımızda</Link><Link href="/content">Yazarlar</Link><Link href="/contact">Kariyer</Link><Link href="/contact">İletişim</Link>
            </div>
          </div>

          <div>
            <p className="text-[9px] font-semibold uppercase">Yardım</p>
            <div className="mt-3 grid gap-1 text-[10px] text-black/70">
              <Link href="/contact">SSS</Link><Link href="/">Gizlilik Politikası</Link><Link href="/">Kullanım Şartları</Link><Link href="/">Çerez Politikası</Link>
            </div>
          </div>

          <div>
            <p className="text-[9px] font-semibold uppercase">Arşiv</p>
            <div className="mt-3 grid gap-1 text-[10px] text-black/70">
              <Link href="/content">Tüm Yazılar</Link><Link href="/content">Podcast Arşivi</Link><Link href="/content">Video Arşivi</Link>
            </div>
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-2 border-t border-black/10 pt-4 text-[10px] text-black/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2024 Aporetik. Tüm hakları saklıdır.</p>
          <p>Made with <span className="text-[#e4a516]">♥</span> in İstanbul.</p>
        </div>
      </div>
    </footer>
  );
}
