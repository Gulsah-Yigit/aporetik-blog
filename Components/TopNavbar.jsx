// components/TopNavbar.jsx
"use client";

import { SiInstagram, SiX } from "react-icons/si";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Inter, Nunito } from "next/font/google";

export const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["200", "400", "600"],
});

const NAV_ITEMS = [
  { label: "Anasayfa", href: "/" },
  { label: "Yazılar", href: "/content" },
  { label: "İletişim", href: "/contact" },
];

export default function TopNavbar() {
  const pathname = usePathname();

  return (
    <nav className={`w-full mt-8 mb- ${inter.className} antialiased`}>
      {/* üst çizgi (istersen kaldır) */}
      <div className="h-px bg-black/10" />

      <div className="mx-auto max-w-6xl px-4">
        {/* 3 kolon: [hayalet] [ORTA MENÜ] [ikonlar] => menü tam ortada */}
        <div className="grid grid-cols-[1fr_auto_1fr] items-center py-1.5">
          {/* solda görünmez kopya -> tam ortalama */}
          <div className="justify-self-start opacity-0 pointer-events-none select-none">
            <div className="flex items-center gap-4">
              <SiInstagram className="w-5 h-5" />
              <SiX className="w-5 h-5" />
            </div>
          </div>

          {/* ORTA MENÜ */}
          <ul className="justify-self-center flex items-center gap-3 sm:gap-5">
            {NAV_ITEMS.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname?.startsWith(item.href);
              return (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    className={`${inter.className}
                                align-baseline text-[10px] sm:text-xs md:text-sm
                                font-normal tracking-[0.2em] text-black/60
                      ${
                        isActive
                          ? "text-black font-xl"
                          : "text-[#444444] hover:text-black"
                      }
                    `}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* SAĞ İKONLAR */}
          <div className="justify-self-end flex items-center gap-4">
            <a
              href="#"
              aria-label="Instagram"
              className="text-[#444444] hover:text-black"
            >
              <SiInstagram className="w-5 h-5" />
            </a>
            <a
              href="#"
              aria-label="Twitter/X"
              className="text-[#444444] hover:text-black"
            >
              <SiX className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      {/* alt çizgi (istersen kaldır) */}
      <div className="h-px bg-black/10" />
    </nav>
  );
}
