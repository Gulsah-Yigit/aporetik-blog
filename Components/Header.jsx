"use client";

import { assets } from "@/Assets/assets";
import Image from "next/image";
import Link from "next/link";
import { Playfair_Display, Inter } from "next/font/google";
import { FiSearch, FiSun } from "react-icons/fi";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export default function Header() {
  return (
    <header className="bg-[#fbfaf6] text-[#161616]">
      <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-10">
        <div className={`${inter.className} flex min-h-[66px] items-center justify-between border-b border-black/25 text-[11px]`}>
          <div className="flex items-center gap-5">
            <Link href="/" aria-label="Aporetik ana sayfa" className="shrink-0">
              <Image
                src={assets.logo}
                width={52}
                height={52}
                alt="Aporetik ördek logosu"
                className="h-[46px] w-[46px] object-contain"
                priority
              />
            </Link>
            <span className="hidden h-8 w-px bg-black/30 sm:block" />
            <span className="hidden sm:block">24 Mayıs 2024 Cuma</span>
          </div>

          <div className="flex items-center gap-5 sm:gap-7">
            <button className="hidden items-center gap-2 sm:flex" aria-label="Ara">
              <FiSearch className="h-4 w-4" />
              <span>Ara</span>
            </button>
            <button className="hidden items-center gap-2 md:flex" aria-label="Karanlık mod">
              <FiSun className="h-4 w-4" />
              <span>Karanlık Mod</span>
            </button>
            <button className="rounded-[3px] bg-black px-7 py-3 text-white">Üye Ol</button>
            <button className="hidden sm:block">Giriş Yap</button>
          </div>
        </div>

        <div className="border-b border-black/25 py-7 text-center sm:py-9">
          <Link href="/" className="inline-block">
            <span className={`${playfair.className} text-[clamp(4.7rem,11vw,9.8rem)] font-black leading-[.72] tracking-[-.065em]`}>
              aporetik<span className="text-[#efb53d]">.</span>
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
