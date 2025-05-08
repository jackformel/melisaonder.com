import React from 'react';
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { GeistSans } from 'geist/font/sans';
// import Script from 'next/script'; // Removed Script import
import "../styles/globals.css";
// import DarkModeToggle from "./components/shared/DarkModeToggle"; // Removed DarkModeToggle import

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
});

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair-display',
  // Add weights if needed, e.g., weight: ['400', '700']
});

// GeistSans is imported directly and provides a variable name

export const metadata: Metadata = {
  title: "Melisa Onder", // Simplified title
  description: "Melisa Onder's Portfolio.", // Simplified description
  // Removed openGraph for now, can be added back later
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfairDisplay.variable} ${GeistSans.variable} ${inter.variable}`}>
      <head>
        {/* Basic head elements, analytics removed for now */}
      </head>
      <body className={`font-sans antialiased bg-white text-black`}>
        {/* Removed dark mode toggle button */}
        {children}
      </body>
    </html>
  );
} 