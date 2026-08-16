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
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-[1fr_auto_1fr] items-start gap-3">
          <Link href="/" className="justify-self-start" aria-label="Aporetik ana sayfa">
            <Image
              src={assets.logo}
              width={82}
              height={82}
              alt="Aporetik logo"
              className="h-auto w-[58px] sm:w-[72px] object-contain"
              priority
            />
          </Link>

          <div className="pt-2 text-center sm:pt-0">
            <Link href="/" className="inline-block">
              <span
                className={`${playfair.className} block text-[clamp(3.1rem,9vw,8.7rem)] font-black leading-[.78] tracking-[-0.065em] text-[#1a1a1a]`}
              >
                aporetik.
              </span>
            </Link>
            <p className={`${inter.className} mt-3 hidden text-[10px] uppercase tracking-[0.28em] text-black/42 sm:block`}>
              sinema · kültür · fikir · merak
            </p>
          </div>

          <div className={`${inter.className} justify-self-end pt-1 text-right`}>
            <p className="hidden max-w-[190px] text-[11px] leading-5 text-black/45 md:block">
              Dünyaya biraz daha uzun bakmak için bağımsız notlar.
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
