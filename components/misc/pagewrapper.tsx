'use client'

import { Providers } from "@/app/providers";
import MotionWrap from '@/components/listeners/motionwrap';
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { useStateStore } from "@/context/stateStore";
import Navbar from "../nav/Navbar";
import FooterNavBar from "../nav/footer/footerNavbar";
import DBWrapper from "./dbwrapper";


export default function PageWrapper({ children }: Readonly<{ children: React.ReactNode; }>) {

  const pathname = usePathname();
  const targetRef = useRef<HTMLElement>(null);
  const setWidthQuery = useStateStore((state) => state.setWidthQuery);
  const setUrlToUse = useStateStore((state) => state.setUrlToUse);

  useEffect(() => {
    if (targetRef.current === null) {
      return;
    } else {
      const newWidth = targetRef.current.offsetWidth;
      setWidthQuery(newWidth);
    }

    const updateMedia = () => {
      const innerWidth = window.innerWidth;
      setWidthQuery(innerWidth);
    }

    window.addEventListener('resize', updateMedia);
    return () => window.removeEventListener('resize', updateMedia);
  }, [setWidthQuery]);

  useEffect(() => {
    const currentUrl = process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_BASE_URL !== undefined && process.env.NEXT_PUBLIC_BASE_URL !== '' && process.env.NEXT_PUBLIC_BASE_URL !== null ? process.env.NEXT_PUBLIC_BASE_URL
      :
      process.env.NODE_ENV === 'production' && process.env.NEXT_PUBLIC_BASE_LIVEURL !== null && process.env.NEXT_PUBLIC_BASE_LIVEURL !== '' && process.env.NEXT_PUBLIC_BASE_LIVEURL !== undefined ? process.env.NEXT_PUBLIC_BASE_LIVEURL
        : '';
    setUrlToUse(currentUrl);
  }, [setUrlToUse]);



  return (
    <div className="bg-white/50 h-dvh overflow-hidden">
      <Providers>
        <MotionWrap motionKey={pathname}>
          <DBWrapper>
            <main className={'flex flex-col px-2 h-dvh justify-between'} ref={targetRef}>
              <Navbar />
              {children}
              <FooterNavBar />
            </main>
          </DBWrapper>
        </MotionWrap>
      </Providers>
    </div>
  )
}