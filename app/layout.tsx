'use client'

import { Inter } from "next/font/google";
import "@/app/globals.css";
import { Providers } from "@/app/providers";
import Navbar from '@/components/nav/Navbar';
import FooterNavBar from "@/components/nav/footer/footerNavbar";
import { SpeedInsights } from "@vercel/speed-insights/next";
import React, { useCallback, useEffect } from "react";
import { usePathname } from "next/navigation";
import { AuthProvider } from "@/app/context/session/SessionContext";
import { AnimatePresence } from "framer-motion";
import MainPageBody from "@/components/pagetemplates/mainpagebody/mainpagebody";
import MotionWrap from "@/components/listeners/motionwrap";
import { useStateStore } from '@/context/stateStore';
import { useStore } from '@/context/dataStore';
import { getHobbies } from './context/functions/getHobbies';
import { getRecipes } from './context/functions/getRecipes';
import { getTasks } from './context/functions/getTasks';
import { getCategories } from './context/functions/getCategories';
import { useHobbyStore } from '@/context/hobbyStore';

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  
  const pathname = usePathname();
  const isDemo = pathname === '/demo_303' ? true : false;
  const userID = process.env.NEXT_PUBLIC_ADMIN_USERNAME;
  const urlToUse = useStateStore((state) => state.urlToUse);
  const setLoading = useStateStore((state) => state.setLoading);
  const setTasks = useStore((state) => state.setTasks);
  const setHobbies = useStore((state) => state.setHobbies);
  const setRecipes = useStore((state) => state.setRecipes);
  const setCategories = useHobbyStore((state) => state.setCategories);

  useEffect(() => {
      document.body.style.overflow = 'hidden';
      return () => {
          document.body.style.overflow = 'unset';
      };
  }, []);

  const getData = useCallback(async () => {
    setLoading(true);
    if (urlToUse === '') {
      console.error('No URL to use');
      setLoading(false);
      return;
    } else {
      try {
        if (userID !== undefined && userID !== null && userID !== '') {
          const hobs = await getHobbies(urlToUse, userID);
          setHobbies(hobs);
          const tsks = await getTasks(urlToUse, userID);
          setTasks(tsks);
          const recipes = await getRecipes(urlToUse, userID);
          setRecipes(recipes);
          const categories = await getCategories(hobs);
          setCategories(categories);
        } else {
          console.log('No user ID');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }
  }, [urlToUse, userID, setHobbies, setTasks, setRecipes, setCategories, setLoading]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <html lang="en">
      <AnimatePresence mode="wait" initial={false} onExitComplete={() => window.scrollTo(0, 0)}>
        <AuthProvider>
          <body className={`${inter.className}`}>
            <div className="bg-white/50 h-dvh">
                <SpeedInsights/>
                <Providers> 
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
                </Providers>
            </div>
          </body>
        </AuthProvider>
      </AnimatePresence>
    </html>
  );
}