'use client'

import { Inter } from "next/font/google";
import "@/app/globals.css";
import { Providers } from "@/app/providers";
import Navbar from '@/components/nav/Navbar';
import FooterNavBar from "@/components/nav/footer/footerNavbar";
import { SpeedInsights } from "@vercel/speed-insights/next";
import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
import { AuthProvider } from "@/app/context/session/SessionContext";
import { AnimatePresence } from "framer-motion";
import MainPageBody from "@/components/pagetemplates/mainpagebody/mainpagebody";
import MotionWrap from "@/components/listeners/motionwrap";
import { Spinner } from "@/components/misc/Spinner";
import { useStateStore } from "@/context/stateStore";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  
  const loading = useStateStore((state) => state.loading);
  const pathname = usePathname();
  const isDemo = pathname === '/demo_303' ? true : false;

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
                  {loading ? <div className="flex justify-center items-center h-screen"><Spinner/></div> :
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