import { Nunito, Anton } from "next/font/google";
import "./globals.css";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["200", "400", "600"],
});

const anton = Anton({
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata = {
  title: {
    default: "Aporetik",
    template: "%s | Aporetik",
  },
  description: "Kültür, sinema ve edebiyat üzerine bir blog.",
  keywords: ["kültür", "sinema", "edebiyat", "blog", "aporetik"],
  metadataBase: new URL("https://aporetik.com"),
  alternates: {
    canonical: "https://aporetik.com",
  },
  openGraph: {
    title: "Aporetik",
    description: "Kültür, sinema ve edebiyat üzerine bir blog.",
    url: "https://aporetik.com",
    siteName: "Aporetik",
    images: [
      {
        url: "/og-image.png", // senin ekleyeceğin görsel
        width: 1200,
        height: 630,
        alt: "Aporetik Blog",
      },
    ],
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aporetik",
    description: "Kültür, sinema ve edebiyat üzerine bir blog.",
    images: ["/og-image.png"],
    creator: "@senintwitterkullanicin", // varsa Twitter adın
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Blog",
              name: "Aporetik",
              url: "https://aporetik.com",
              description: "Kültür, sinema ve edebiyat üzerine bir blog.",
            }),
          }}
        />
      </head>
      <body className={`${nunito.className} bg-[var(--page-bg)]  antialiased`}>
        {children}
      </body>
    </html>
  );
}
