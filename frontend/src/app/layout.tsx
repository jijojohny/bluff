import type { Metadata } from "next";
import localFont from "next/font/local";
import { Bebas_Neue } from "next/font/google";
import "./globals.css";
import { Providers } from "@/lib/wagmi/providers";
import { Navbar } from "@/components/layout/navbar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const display = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "bluff. — anonymous confessions on Citrea",
  description:
    "Drop anonymous confessions tagged to Indian states and cities on Citrea (Bitcoin L2). Pay cBTC to unlock full confessions. Explore India's emotional heat map in real time.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${display.variable} antialiased bg-background text-foreground font-sans`}
      >
        <div className="min-h-screen box-border p-3 sm:p-4 md:p-5">
          <div className="min-h-[calc(100vh-1.5rem)] sm:min-h-[calc(100vh-2rem)] border-[3px] sm:border-4 border-accent flex flex-col">
            <Providers>
              <Navbar />
              <main className="flex-1 min-h-0">{children}</main>
            </Providers>
          </div>
        </div>
      </body>
    </html>
  );
}
