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
import { useHobbyContext } from "./context/hobby/hobbyModalContext";
import { Spinner } from "@/components/misc/Spinner";
import { useModalContext } from "./context/modal/modalContext";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {

  const pathname = usePathname();
  const { urlToUse, setUrlToUse } = useHobbyContext();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (urlToUse === '') {
       //if (process.env.NEXT_PUBLIC_BASE_URL !== undefined) {
        //setUrlToUse(process.env.NEXT_PUBLIC_BASE_URL);
       // setIsLoading(false);
       //}
      if (process.env.NEXT_PUBLIC_BASE_LIVEURL !== undefined && process.env.NEXT_PUBLIC_BASE_LIVEURL !== '' && process.env.NEXT_PUBLIC_BASE_LIVEURL !== null) {
      setUrlToUse(process.env.NEXT_PUBLIC_BASE_LIVEURL);
      }
    } else {
      setIsLoading(false);
    }
  }, [setUrlToUse, urlToUse]);  
  
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
            <div className="h-screen">
              <>
              <SpeedInsights/>
              <Providers> 
              {isLoading ? (
                <Spinner />
                ) : (
                  <>
                <Navbar />
                  <main>
                    {children}
                  </main>
                  <FooterNavBar />
                  </>
                  )}
              </Providers>
              </>
            </div>
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