// components/TopNavbar.jsx
"use client";

import { SiInstagram, SiX } from "react-icons/si";
import Link from "next/link"; // Next.js için

const NAV_ITEMS = [
  { label: "Anasayfa", href: "/" },
  { label: "Yazılar", href: "/content" },
  { label: "İletişim", href: "/iletisim" },
];

export default function TopNavbar() {
  return (
    <nav className="w-full mt-10">
      {/* üst çizgi */}
      <div className="h-px bg-black/15" />

      {/* iç bar */}
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-[repeat(3,1fr)_120px] text-sm md:text-base text-black">
          {/* Menü hücreleri */}
          {NAV_ITEMS.map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-center py-2.5 md:py-3 border-x border-black/15"
            >
              <Link
                href={item.href}
                className={`transition-colors ${
                  item.label === "Anasayfa"
                    ? "text-[#7C3AED]"
                    : "hover:text-[#7C3AED]"
                }`}
              >
                {item.label}
              </Link>
            </div>
          ))}

          {/* Sosyal ikonlar */}
          <div className="flex items-center justify-center gap-4 py-2.5 md:py-3 border-x border-black/15">
            <a href="#" aria-label="Instagram" className="hover:opacity-70">
              <SiInstagram className="w-5 h-5" />
            </a>
            <a href="#" aria-label="Twitter/X" className="hover:opacity-70">
              <SiX className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      {/* alt çizgi */}
      <div className="h-px bg-black/15" />
    </nav>
  );
}
