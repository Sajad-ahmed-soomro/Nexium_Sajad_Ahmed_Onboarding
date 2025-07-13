import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Head from "next/head";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Blog Summariser",
  description: "Blog summariser which summarises blogs and translates into Urdu",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`bg-[hsl(262_83%_60%)] text-white min-h-screen font-sans ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
