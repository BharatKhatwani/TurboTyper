import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// import Navbar from "./Components/Navbar";

// ✅ Correct import path


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TYPING SPEED", 
  description: " A TYPING SPEED",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-zinc-950 text-black dark:text-white`}
      >
        {/* ✅ Render component properly */}
       
        {children}
      </body>
    </html>
  );
}
