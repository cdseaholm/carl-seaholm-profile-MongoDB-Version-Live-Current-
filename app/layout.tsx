'use client'

import type { Metadata } from "next";
import { Cormorant_Garamond, Poppins, Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Navbar from '../components/nav/Navbar';
import FooterNavBar from "@/components/nav/footer/footerNavbar";
import { SpeedInsights } from "@vercel/speed-insights/next";
import React from "react";
import { usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

const cormorantGaramond = Cormorant_Garamond({ 
  subsets: ["latin"],
  variable: "--font-cormorant-garamond",
  weight: ["400"],
});

const poppins = Poppins({ 
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "600"],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <html lang="en">
      {pathname !== '/demo_303' &&
      <body className={`firstiter ${cormorantGaramond.variable} ${poppins.variable}`}>
        <div className="first">
        <SpeedInsights/>
        <Providers>
          <Navbar />
          <main className="h-dvh">
            {children}
          </main>
          <FooterNavBar />
        </Providers>
        </div>
      </body>
      }

      {pathname === '/demo_303' &&
        <body className='seconditer'>
            <main className="min-h-screen">
              {children}
            </main>
        </body>
        }
    </html>
  );
}