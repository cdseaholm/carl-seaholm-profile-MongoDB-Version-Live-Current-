'use client'

import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Navbar from '../components/nav/Navbar';
import FooterNavBar from "@/components/nav/footer/footerNavbar";
import { SpeedInsights } from "@vercel/speed-insights/next";
import React, { use, useEffect } from "react";
import { usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {

      document.body.style.overflow = 'hidden';

      return () => {
          document.body.style.overflow = 'unset';
      };
  }, []);

  return (
    <html lang="en">
      {pathname !== '/demo_303' &&
      <body className={inter.className}>
        <div className="first">
          <div className="h-dvh">
            <SpeedInsights/>
            <Providers>
              <Navbar />
              <main>
                {children}
              </main>
              <FooterNavBar />
            </Providers>
          </div>
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