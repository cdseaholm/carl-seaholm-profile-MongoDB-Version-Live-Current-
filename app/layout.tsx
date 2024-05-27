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
import { useStateContext } from "./context/state/StateContext";
import { useModalContext } from "./context/modal/modalContext";
import { getHobbies } from "./context/functions/getHobbies";
import { getTasks } from "./context/functions/getTasks";
import { Spinner } from "@/components/misc/Spinner";
import { useStore } from "@/models/store/store";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {

  const { urlToUse, loading, setLoading } = useStateContext();
  const { hobbies, tasks } = useStore();
  const { setTasks, setHobbies } = useStore();
  const pathname = usePathname();
  const isDemo = pathname === '/demo_303' ? true : false;
  const userID = process.env.NEXT_PUBLIC_ADMIN_USERNAME;

  const getData = async () => {
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
          const tsk = await getTasks(urlToUse, userID);
          setTasks(tsk);
        } else {
          console.log('No user ID');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
      setLoading(false);
    }
  };

  useEffect(() => {
      document.body.style.overflow = 'hidden';
      return () => {
          document.body.style.overflow = 'unset';
      };
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  useEffect(() => {
    console.log('Initial Hobbies:', hobbies);
    console.log('Initial Tasks:', tasks);
  }, [hobbies, tasks]);

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