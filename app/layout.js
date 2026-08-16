import { Nunito } from "next/font/google";
import "./globals.css";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["200", "400", "600"],
});

export const metadata = {
  title: {
    default: "Aporetik",
    template: "%s | Aporetik",
  },
  description: "Sinema, edebiyat, kültür, gündelik hayat ve akılda kalan sorular üzerine bağımsız bir yayın.",
  keywords: ["aporetik", "sinema", "kültür", "edebiyat", "uzun okuma", "fikir"],
  metadataBase: new URL("https://aporetik.com"),
  alternates: {
    canonical: "https://aporetik.com",
  },
  openGraph: {
    title: "Aporetik",
    description: "Sinema, edebiyat, kültür ve fikir üzerine bağımsız bir yayın.",
    url: "https://aporetik.com",
    siteName: "Aporetik",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Aporetik",
      },
    ],
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aporetik",
    description: "Sinema, edebiyat, kültür ve fikir üzerine bağımsız bir yayın.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Blog",
              name: "Aporetik",
              url: "https://aporetik.com",
              description: "Sinema, edebiyat, kültür ve fikir üzerine bağımsız bir yayın.",
            }),
          }}
        />
      </head>
      <body className={`${nunito.className} bg-[#fbfaf6] text-[#171717] antialiased`}>
        {children}
      </body>
    </html>
  );
}
