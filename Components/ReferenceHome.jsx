"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Playfair_Display, Inter } from "next/font/google";
import styles from "./ReferenceHome.module.css";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600"] });

const SIDE = [
  { image: "/reference/side1.webp", label: "DİZİ ANALİZİ", title: "The Bear: Mutfaktaki Kaosun Şiiri" },
  { image: "/reference/side2.webp", label: "EDEBİYAT", title: "Melankolinin Edebiyattaki İzleri" },
  { image: "/reference/side3.webp", label: "FİLM İNCELEMESİ", title: "Perfect Days: Küçük Şeylerin Mükemmelliği" },
];

const DOSSIER = [
  { image: "/reference/side3.webp", no: "01", title: "Gerçekçilikten Yeni Gerçekçiliğe", author: "E. Batu Akdeniz" },
  { image: "/reference/hero.webp", no: "02", title: "Tarkovski’de Zamanın Ruhu", author: "M. Enes Kaya" },
  { image: "/reference/side1.webp", no: "03", title: "Sinema Salonunun Kaybolan Büyüsü", author: "Ayça İlhan" },
];

const LATEST = [
  { image: "/reference/side3.webp", label: "FİLM İNCELEMESİ", title: "Poor Things: Özgürleşmenin Fantastik Anatomisi", author: "Berkay Erden", date: "12 Mayıs 2024" },
  { image: "/reference/side2.webp", label: "EDEBİYAT", title: "Kafka’nın Dönüşüm’ünde Aile ve Yabancılaşma", author: "Selin Okyay", date: "10 Mayıs 2024" },
  { image: "/reference/side1.webp", label: "DİZİ ANALİZİ", title: "Succession: İktidarın Aile İçi Draması", author: "Ali Eren Demir", date: "8 Mayıs 2024" },
  { image: "/reference/hero.webp", label: "DÜŞÜNCE", title: "Teknoloji Çağında Yalnızlık Üzerine", author: "Deniz Fırat", date: "6 Mayıs 2024" },
];

function SearchIcon() {
  return <span className={styles.iconCircle}>⌕</span>;
}

function SunIcon() {
  return <span className={styles.sun}>☼</span>;
}

export default function ReferenceHome() {
  const [dark, setDark] = useState(false);
  const [today, setToday] = useState("24 Mayıs 2024 Cuma");

  useEffect(() => {
    const d = new Date();
    try {
      setToday(d.toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric", weekday: "long" }));
    } catch {}
  }, []);

  return (
    <div className={`${styles.page} ${dark ? styles.dark : ""} ${inter.className}`}>
      <div className={styles.shell}>
        <header>
          <div className={styles.utilityBar}>
            <div className={styles.utilityLeft}>
              <Image src="/reference/duck.webp" alt="Aporetik ördek logosu" width={46} height={46} className={styles.duck} priority />
              <span className={styles.verticalRule} />
              <span className={styles.dateText}>{today}</span>
            </div>
            <div className={styles.utilityRight}>
              <button className={styles.textButton}><SearchIcon /> Ara</button>
              <button className={styles.textButton} onClick={() => setDark((v) => !v)}><SunIcon /> {dark ? "Aydınlık Mod" : "Karanlık Mod"}</button>
              <button className={styles.joinButton}>Üye Ol</button>
              <button className={styles.loginButton}>Giriş Yap</button>
            </div>
          </div>

          <div className={styles.mastheadWrap}>
            <Link href="/" className={`${styles.masthead} ${playfair.className}`}>aporetik<span>.</span></Link>
          </div>

          <nav className={styles.nav}>
            {["FİLM", "DİZİ", "EDEBİYAT", "SANAT", "DÜŞÜNCE", "DOSYA", "PODCAST", "VİDEO"].map((x) => <Link href="#" key={x}>{x}</Link>)}
            <button aria-label="Daha fazla">•••</button>
          </nav>
        </header>

        <main>
          <section className={styles.heroSection}>
            <article className={styles.heroCopy}>
              <div className={styles.kicker}>ÖNE ÇIKAN YAZI <span /></div>
              <h1 className={playfair.className}>Bir Zamanlar<br />Anadolu’da<br />Zaman ve Suç</h1>
              <p>Nuri Bilge Ceylan’ın sisli yollarında, yalnızca bir cinayet değil, hakikatin kendisi de araştırılır.</p>
              <Link href="#" className={styles.readLink}>Yazıyı Oku <span>→</span></Link>
              <div className={styles.heroPager}><b>01</b><span>02</span><span>03</span></div>
            </article>

            <div className={styles.heroImageWrap}>
              <Image src="/reference/hero.webp" alt="Bir Zamanlar Anadolu’da" fill className={styles.cover} priority sizes="(max-width: 800px) 100vw, 42vw" />
            </div>

            <aside className={styles.sideStories}>
              {SIDE.map((story) => (
                <article key={story.title} className={styles.sideStory}>
                  <div className={styles.sideThumb}><Image src={story.image} alt="" fill className={styles.cover} /></div>
                  <div><span>{story.label}</span><h3 className={playfair.className}>{story.title}</h3></div>
                </article>
              ))}
            </aside>
          </section>

          <section className={styles.categoryStrip}>
            {[
              ["◉", "Film İncelemeleri", "Yeni çıkanlar, klasikler ve kült yapımlar"],
              ["▣", "Edebiyat Yazıları", "Roman, öykü, şiir ve yazar dosyaları"],
              ["✎", "Düşünce Yazıları", "Felsefe, toplum ve güncel tartışmalar"],
              ["◒", "Podcast & Video", "Aporetik sesli ve görsel içerikler"],
            ].map(([icon, title, text]) => (
              <div key={title} className={styles.categoryItem}>
                <div className={styles.categoryIcon}>{icon}</div>
                <div><h3 className={playfair.className}>{title}</h3><p>{text}</p></div>
              </div>
            ))}
          </section>
        </main>
      </div>

      <section className={styles.dossierSection}>
        <div className={styles.dossierInner}>
          <div className={styles.dossierIntro}>
            <div className={styles.kickerGold}>DOSYA <span /></div>
            <h2 className={playfair.className}>Sinema: Gerçekliği<br />Yeniden Kurmanın<br />Biçimleri</h2>
            <p>Sinema, yalnızca bir anlatı aracı değil; dünyaya bakışımızı değiştiren güçlü bir düşünme biçimidir.</p>
            <button>Dosyayı Keşfet <span>→</span></button>
          </div>
          <div className={styles.dossierCards}>
            {DOSSIER.map((item) => (
              <article key={item.no} className={styles.dossierCard}>
                <div className={styles.dossierImage}><Image src={item.image} alt="" fill className={styles.cover} /></div>
                <div className={styles.dossierOverlay} />
                <div className={styles.dossierText}><span className={styles.cardNo}>{item.no} <i /></span><h3 className={playfair.className}>{item.title}</h3><p>{item.author}</p></div>
              </article>
            ))}
          </div>
          <button className={styles.roundArrow}>→</button>
        </div>
      </section>

      <div className={styles.shell}>
        <section className={styles.latestArea}>
          <div className={styles.latestMain}>
            <div className={styles.sectionHead}><h2 className={playfair.className}>Son Yazılar</h2><Link href="#">Tüm Yazılar <span>→</span></Link></div>
            <div className={styles.latestGrid}>
              {LATEST.map((item) => (
                <article key={item.title} className={styles.latestCard}>
                  <div className={styles.latestImage}><Image src={item.image} alt="" fill className={styles.cover} /></div>
                  <div className={styles.latestContent}><span>{item.label}</span><h3 className={playfair.className}>{item.title}</h3><p>{item.author}</p><div className={styles.cardFooter}><span>{item.date}</span><span>♡</span></div></div>
                </article>
              ))}
            </div>
          </div>
          <aside className={styles.newsletter}>
            <h2 className={playfair.className}>Aporetik Postası</h2>
            <i />
            <p>Haftanın en iyi yazıları, özel içerikler ve yeni dosyalar e-posta kutunda.</p>
            <input type="email" placeholder="E-posta adresiniz" />
            <button>Abone Ol</button>
            <b>Bizi takip edin.</b>
            <div className={styles.socials}><span>◎</span><span>𝕏</span><span>▶</span><span>◉</span><span>◔</span></div>
          </aside>
        </section>

        <section className={styles.bottomEditorial}>
          <div className={styles.editorsPick}>
            <h2 className={playfair.className}>Editörün Seçkisi</h2>
            {[
              ["/reference/hero.webp", "Andrey Rublev: İnancın Sinemadaki Yüzü", "FİLM İNCELEMESİ"],
              ["/reference/side2.webp", "Virginia Woolf’un Kendine Ait Bir Oda’sı", "EDEBİYAT"],
              ["/reference/side1.webp", "İnsanın Anlam Arayışı ve Sinemanın Rolü", "DÜŞÜNCE"],
            ].map(([im, t, c]) => <div className={styles.pickRow} key={t}><div><Image src={im} alt="" fill className={styles.cover}/></div><p><b className={playfair.className}>{t}</b><span>{c}</span></p></div>)}
          </div>

          <div className={styles.podcast}>
            <h2 className={playfair.className}>Aporetik Podcast</h2>
            <div className={styles.podcastCard}>
              <span>Yeni Bölüm</span><h3 className={playfair.className}>Akira Kurosawa Üzerine<br />Bir Sohbet</h3><p>Konuk: Ertan Yılmaz</p>
              <div className={styles.audioRow}><button>▶</button><div className={styles.wave}>╴╵╷╶╵╷╴╵╷╶╵╷╴╵╷╶╵╷╴╵╷</div><b>42:18</b></div>
            </div>
            <button className={styles.outlineButton}>Tüm Bölümleri Gör <span>→</span></button>
          </div>

          <div className={styles.support}>
            <h2 className={playfair.className}>Aporetik’e Katıl</h2>
            <p>Bağımsız ve nitelikli içeriğin sürdürülmesine destek ol.</p>
            <button className={styles.outlineButton}>Destek Ol <span>→</span></button>
            <div className={styles.supportArt}><div className={styles.yellowDisc}/><div className={styles.readerSilhouette}>♙</div></div>
          </div>
        </section>

        <footer className={styles.footer}>
          <div className={styles.footerBrand}><Image src="/reference/duck.webp" alt="" width={42} height={42}/><div><b className={playfair.className}>aporetik.</b><p>Düşünmeyi sevenler için.<br/>Bağımsız, nitelikli ve yavaş gazetecilik.</p></div></div>
          <div><b>KURUMSAL</b><a>Hakkımızda</a><a>Yazarlar</a><a>Kariyer</a><a>İletişim</a></div>
          <div><b>YARDIM</b><a>SSS</a><a>Gizlilik Politikası</a><a>Kullanım Şartları</a><a>Çerez Politikası</a></div>
          <div><b>ARŞİV</b><a>Tüm Yazılar</a><a>Podcast Arşivi</a><a>Video Arşivi</a></div>
          <p className={styles.copy}>© 2024 Aporetik. Tüm hakları saklıdır.<br/>Made with <span>♥</span> in İstanbul.</p>
        </footer>
      </div>
    </div>
  );
}
