
import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { BettingProvider } from "@/components/providers/BettingProvider";
import AppLoader from "@/components/AppLoader";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "NexusBet | The Future of Betting",
  description: "Next-gen betting platform",
  icons: {
    icon: [
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: "/favicon/favicon.ico",
    apple: "/favicon/apple-touch-icon.png",
  },
  manifest: "/favicon/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className="antialiased bg-slate-100 dark:bg-[#050508] text-slate-900 dark:text-white transition-colors duration-300">
        <BettingProvider>
          <AppLoader />
          {children}
        </BettingProvider>
      </body>
    </html>
  );
}
