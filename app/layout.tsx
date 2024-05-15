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
import MotionWrap from "@/components/listeners/motionwrap";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {

  const pathname = usePathname();
  const { urlToUse, setUrlToUse } = useStateContext();
  const [loading, setLoading] = useState(true);
  const [isDemo, setIsDemo] = useState(false);

  useEffect(() => {
    if (pathname === '/demo_303') {
      setIsDemo(true);
    } else {
      setIsDemo(false);
    }
  }, [pathname]);

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
          <body className={`${inter.className}`}>
            <div className="bg-white/50 h-dvh">
                <SpeedInsights/>
                <Providers> 
                  {loading && <Spinner />}
                  {!loading &&
                    <MotionWrap motionKey={pathname}>
                      <main className={`${isDemo ? 'min-h-screen object-fill bg-gray-800': 'flex flex-col px-5 h-dvh justify-between'}`}>
                        {!isDemo && <Navbar />}
                          {pathname !== '/' ? ( 
                            <MainPageBody>
                              {children}
                            </MainPageBody>
                          ): (
                            <>{children}</>
                          )}
                        {!isDemo && <FooterNavBar />}
                        </main>
                    </MotionWrap>
                  }
                </Providers>
            </div>
          </body>
        </AuthProvider>
      </AnimatePresence>
    </html>
  );
}