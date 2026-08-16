import { assets } from "@/Assets/assets";
import Image from "next/image";
import Link from "next/link";
import { SiInstagram, SiX } from "react-icons/si";

export default function Footer() {
  return (
    <footer className="border-t border-black/10 bg-[#f1ecdf] text-[#1b1b1b]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.2fr_.8fr_.8fr]">
          <div>
            <div className="flex items-center gap-4">
              <Image src={assets.logo} alt="Aporetik logo" width={68} height={68} className="h-auto w-[58px] object-contain" />
              <div>
                <p className="font-serif text-3xl font-semibold tracking-tight">aporetik.</p>
                <p className="mt-1 text-xs uppercase tracking-[0.18em] text-black/45">bi’ bağımsız yayın</p>
              </div>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-6 text-black/60">
              Sinema, kültür, gündelik hayat ve akılda kalan sorular üzerine yazılar.
            </p>
          </div>

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-black/45">Gezin</p>
            <div className="mt-4 grid gap-2 text-sm">
              <Link href="/" className="hover:underline hover:underline-offset-4">Anasayfa</Link>
              <Link href="/content" className="hover:underline hover:underline-offset-4">Tüm Yazılar</Link>
              <Link href="/contact" className="hover:underline hover:underline-offset-4">İletişim</Link>
            </div>
          </div>

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-black/45">Takip et</p>
            <div className="mt-4 flex items-center gap-4">
              <a href="#" aria-label="Instagram" className="rounded-full border border-black/15 p-2.5 transition hover:bg-black hover:text-white"><SiInstagram className="h-4 w-4" /></a>
              <a href="#" aria-label="X" className="rounded-full border border-black/15 p-2.5 transition hover:bg-black hover:text-white"><SiX className="h-4 w-4" /></a>
            </div>
            <a href="mailto:aporetik.blog@gmail.com" className="mt-5 inline-block text-sm underline decoration-black/25 underline-offset-4">aporetik.blog@gmail.com</a>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-black/10 pt-5 text-xs text-black/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Aporetik. Tüm hakları saklıdır.</p>
          <p>İstanbul’dan, merakla.</p>
        </div>
      </div>
    </footer>
  );
}
