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
  description: "Train with purpose. Track your progress. Transform your body and lifestyle with DITO FITNESS — Premium Training Club & Futuristic Fitness Platform.",
  keywords: ["gym", "fitness", "strength training", "personal trainer", "bodybuilding", "fat loss", "DITO FITNESS"],
  openGraph: {
    title: "DITO FITNESS | BUILD YOUR STRONGEST VERSION",
    description: "Premium Fitness Club & Futuristic Training Platform.",
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
      <body className="min-h-screen bg-[#060709] text-[#F8FAFC] font-sans antialiased selection:bg-[#10FFA0] selection:text-[#060709]">
        {children}
      </body>
    </html>
  );
}

