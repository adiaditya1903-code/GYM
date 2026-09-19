import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "DITO FITNESS | BUILD YOUR STRONGEST VERSION",
  description: "DITO FITNESS is a premier modern athletic training sanctuary. High-performance strength training, hypertrophy periodization, and bespoke athletic conditioning.",
  keywords: ["gym", "DITO FITNESS", "strength training", "bodybuilding", "personal training", "athletic performance", "Almatti"],
  openGraph: {
    title: "DITO FITNESS | BUILD YOUR STRONGEST VERSION",
    description: "Premium Fitness Brand & Modern Training Sanctuary.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable} dark scroll-smooth`}>
      <body className="min-h-screen bg-[#080808] text-white font-sans antialiased selection:bg-[#D7FF00] selection:text-[#080808]">
        {children}
      </body>
    </html>
  );
}
