import type { Metadata } from "next";
import { Playfair_Display, Bebas_Neue } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
  display: "swap",
});

const bebas_neue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bebas-neue",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Align With Fun",
  description: "Join our Pilates classes and embrace wellness!",

  icons: {
    icon: [
      { url: "/Design_Favicon.svg", sizes: "16x16", type: "image/png" },
      { url: "/Design_Favicon.svg", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      // Android / PWA icons
      { rel: "/Design_Favicon.svg", url: "/Design_Favicon.svg" },
      { rel: "/Design_Favicon.svg", url: "/Design_Favicon.svg" },
    ],
  },

  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${bebas_neue.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
