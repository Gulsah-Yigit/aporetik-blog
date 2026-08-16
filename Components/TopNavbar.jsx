"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SiInstagram, SiX } from "react-icons/si";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600"] });

const NAV_ITEMS = [
  { label: "Anasayfa", href: "/" },
  { label: "Yazılar", href: "/content" },
  { label: "Uzun Okuma", href: "/content" },
  { label: "Yolda", href: "/content" },
  { label: "İletişim", href: "/contact" },
];

export default function TopNavbar() {
  const pathname = usePathname();

  return (
    <nav className={`${inter.className} sticky top-0 z-40 mt-6 border-y border-black/10 bg-[#fbfaf6]/95 backdrop-blur`}>
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <div className="min-w-0 flex-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <ul className="flex min-w-max items-center gap-5 sm:gap-7">
            {NAV_ITEMS.map((item) => {
              const active = item.href === "/" ? pathname === "/" : pathname?.startsWith(item.href);
              return (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className={`text-[11px] uppercase tracking-[0.18em] transition ${
                      active ? "font-semibold text-black" : "text-black/55 hover:text-black"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="flex shrink-0 items-center gap-3 border-l border-black/10 pl-4">
          <a href="#" aria-label="Instagram" className="text-black/55 transition hover:text-black">
            <SiInstagram className="h-4 w-4" />
          </a>
          <a href="#" aria-label="X" className="text-black/55 transition hover:text-black">
            <SiX className="h-4 w-4" />
          </a>
        </div>
      </div>
    </nav>
  );
}
