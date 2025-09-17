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
  title: "Aporetik",
  description: "bi' blog",
  icons: {
    icon: "/icon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${nunito.className} bg-[var(--page-bg)]  antialiased`}>
        {children}
      </body>
    </html>
  );
}
