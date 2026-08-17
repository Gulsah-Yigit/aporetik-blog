"use client";

import Link from "next/link";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], weight: ["500", "600"] });

const NAV_ITEMS = ["FİLM", "DİZİ", "EDEBİYAT", "SANAT", "DÜŞÜNCE", "DOSYA", "PODCAST", "VİDEO"];

export default function TopNavbar() {
  return (
    <nav className={`${inter.className} bg-[#fbfaf6]`}>
      <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-10">
        <div className="flex items-center border-b border-black/25">
          <div className="min-w-0 flex-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex min-w-max items-center justify-center gap-8 py-3 text-[11px] lg:gap-14">
              {NAV_ITEMS.map((label) => (
                <Link key={label} href="/content" className="transition hover:text-[#b77a08]">
                  {label}
                </Link>
              ))}
            </div>
          </div>
          <Link href="/content" aria-label="Daha fazla" className="ml-5 shrink-0 pb-4 pt-2 text-xl leading-none">•••</Link>
        </div>
      </div>
    </nav>
  );
}
