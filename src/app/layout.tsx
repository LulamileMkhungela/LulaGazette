import type { Metadata } from "next";
import localFont from "next/font/local";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { AudienceProvider } from "@/context/AudienceContext";
import "./globals.css";

const figtree = localFont({
  src: [
    { path: "../../public/fonts/Figtree-Light.woff2", weight: "300", style: "normal" },
    { path: "../../public/fonts/Figtree-Regular.woff2", weight: "400", style: "normal" },
    { path: "../../public/fonts/Figtree-Medium.woff2", weight: "500", style: "normal" },
    { path: "../../public/fonts/Figtree-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-figtree",
  display: "swap",
});

const playfair = localFont({
  src: [{ path: "../../public/fonts/PlayfairDisplay.ttf", weight: "400 800", style: "normal" }],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "LulaGazette | South African Legal Information",
    template: "%s | LulaGazette",
  },
  description:
    "LulaGazette — South African Acts, cases, court forms, regulations and plain-language guides for individuals and lawyers.",
  icons: { icon: "/favicon.svg" },
  authors: [{ name: "Lulamile Mkhungela" }],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-ZA">
      <body className={`${figtree.variable} ${playfair.variable} font-sans`}>
        <AudienceProvider>
          <div className="relative flex min-h-screen min-w-0 max-w-full flex-col">
            <div className="app-layout-scroll min-h-0 min-w-0 max-w-full flex-1 overflow-x-hidden overflow-y-auto scroll-smooth">
              <Header />
              <main className="min-w-0 flex-1 bg-white">{children}</main>
              <Footer />
            </div>
          </div>
        </AudienceProvider>
      </body>
    </html>
  );
}
