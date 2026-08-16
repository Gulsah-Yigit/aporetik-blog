"use client";

import { assets } from "@/Assets/assets";
import Image from "next/image";
import Link from "next/link";
import { Playfair_Display, Inter } from "next/font/google";

export const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  display: "swap",
});

export const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export default function Header() {
  return (
    <header className="bg-[#fbfaf6] pt-5 sm:pt-7">
      <div className="mx-auto max-w-[1380px] px-5 sm:px-8 lg:px-10">
        <div className={`${inter.className} flex items-center justify-between border-b border-black/10 pb-3 text-[9px] uppercase tracking-[.2em] text-black/45 sm:text-[10px]`}>
          <span>Bağımsız yayın · İstanbul</span>
          <span className="hidden sm:block">Sinema · Edebiyat · Kültür · Fikir</span>
          <span>2026</span>
        </div>

        <div className="relative flex min-h-[118px] items-end justify-center pb-4 pt-7 sm:min-h-[156px] sm:pb-6 sm:pt-8 lg:min-h-[188px]">
          <Link href="/" className="relative inline-flex items-end" aria-label="Aporetik ana sayfa">
            <Image
              src={assets.logo}
              width={72}
              height={72}
              alt="Aporetik ördek logosu"
              className="absolute -left-7 -top-3 h-auto w-[42px] object-contain sm:-left-10 sm:-top-5 sm:w-[54px] lg:-left-12 lg:-top-7 lg:w-[64px]"
              priority
            />
            <span className={`${playfair.className} block text-[clamp(4.1rem,12.2vw,10.5rem)] font-black leading-[.72] tracking-[-.075em] text-[#171717]`}>
              aporetik.
            </span>
          </Link>

          <p className={`${inter.className} absolute bottom-1 right-0 hidden max-w-[220px] text-right text-[10px] leading-4 tracking-[.04em] text-black/40 lg:block`}>
            Dünyaya biraz daha uzun bakmak için notlar, filmler, kitaplar ve sorular.
          </p>
        </div>
      </div>
    </header>
  );
}
