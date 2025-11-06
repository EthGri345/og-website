import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "OnlyGoon | $OG - Exclusive Access Portal",
  description: "Enter the OnlyGoon portal. Join an exclusive community with premium features and benefits. Unlock access to $OG token ecosystem.",
  keywords: ["OnlyGoon", "$OG", "crypto", "token", "exclusive", "community", "portal"],
  authors: [{ name: "OnlyGoon" }],
  openGraph: {
    title: "OnlyGoon | $OG - Exclusive Access Portal",
    description: "Enter the OnlyGoon portal. Join an exclusive community with premium features and benefits.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "OnlyGoon | $OG - Exclusive Access Portal",
    description: "Enter the OnlyGoon portal. Join an exclusive community with premium features and benefits.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#ff3d8f",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
