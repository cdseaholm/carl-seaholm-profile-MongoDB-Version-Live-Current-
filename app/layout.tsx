'use client'

import { Inter } from "next/font/google";
import "@/app/globals.css";
import { Providers } from "@/app/providers";
import Navbar from '@/components/nav/Navbar';
import FooterNavBar from "@/components/nav/footer/footerNavbar";
import { SpeedInsights } from "@vercel/speed-insights/next";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AuthProvider } from "@/app/context/session/SessionContext";
import { AnimatePresence } from "framer-motion";
import { Spinner } from "@/components/misc/Spinner";
import { useStateContext } from "./context/state/StateContext";
import MainPageBody from "@/components/pagetemplates/mainpagebody/mainpagebody";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {

  const pathname = usePathname();
  const { urlToUse, setUrlToUse, loading, setLoading } = useStateContext();

  useEffect(() => {
    if (urlToUse === '') {
       if (process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_BASE_URL !== undefined && process.env.NEXT_PUBLIC_BASE_URL !== '' && process.env.NEXT_PUBLIC_BASE_URL !== null) {
        setUrlToUse(process.env.NEXT_PUBLIC_BASE_URL);
        setLoading(false);
       } else if (process.env.NODE_ENV === 'production' && process.env. NEXT_PUBLIC_BASE_LIVEURL !== null && process.env.NEXT_PUBLIC_BASE_LIVEURL !== '' && process.env.NEXT_PUBLIC_BASE_LIVEURL !== undefined) {
        setUrlToUse(process.env.NEXT_PUBLIC_BASE_LIVEURL);
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, [urlToUse, setLoading, setUrlToUse]);  
  
  useEffect(() => {
      document.body.style.overflow = 'hidden';
      return () => {
          document.body.style.overflow = 'unset';
      };
  }, []);

  return (
    <html lang="en">
      <AnimatePresence mode="wait" initial={false} onExitComplete={() => window.scrollTo(0, 0)}>
        <AuthProvider>
        {pathname !== '/demo_303' &&
        <body className={inter.className}>
          <div className="first">
              <>
              <SpeedInsights/>
              <Providers> 
                {loading && <Spinner />}
                {!loading &&
                <div className="px-5"> 
                  <main className="flex flex-col h-screen">
                    <Navbar />
                      {pathname !== '/' ? ( 
                        <MainPageBody>
                          {children}
                        </MainPageBody>
                      ): (
                        <>{children}</>
                      )}
                    <FooterNavBar />
                  </main>
                </div>
                }
              </Providers>
              </>
            </div>
        </body>
        }

        {pathname === '/demo_303' &&
            <body>
              <main className="min-h-screen bg-gray-800">
                {children}
              </main>
            </body>
          }
          </AuthProvider>
      </AnimatePresence>
    </html>
  );
}