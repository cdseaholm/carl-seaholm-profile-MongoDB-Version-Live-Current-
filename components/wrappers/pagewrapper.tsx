'use client'

import { Providers } from "@/app/providers";
import { useEffect, useRef, useState } from "react";
import { useStateStore } from "@/context/stateStore";
import DBWrapper from "./dbWrapper";
import ToastWrapper from "./toastWrapper";
import MotionWrap from "./motionWrap";
import { usePathname } from "next/navigation";
import { widthContext } from "@/context/context";


export default function PageWrapper({ children }: Readonly<{ children: React.ReactNode; }>) {

  const targetRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const setWidthQuery = useStateStore((state) => state.setWidthQuery);
  const setUrlToUse = useStateStore((state) => state.setUrlToUse);
  const pathname = usePathname();

  useEffect(() => {
    if (targetRef.current === null) {
      return;
    } else {
      const newWidth = targetRef.current.offsetWidth;
      setWidthQuery(newWidth);
      setWidth(newWidth);
    }

    const updateMedia = () => {
      const innerWidth = window.innerWidth;
      setWidthQuery(innerWidth);
      setWidth(innerWidth);
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
    <div ref={targetRef} className="bg-white/50 h-dvh overflow-hidden">
      <ToastWrapper>
        <Providers>
          <MotionWrap motionKey={pathname}>
            <DBWrapper>
              <widthContext.Provider value={width}>
                <main className={'flex flex-col h-dvh'}>
                  {children}
                </main>
              </widthContext.Provider>
            </DBWrapper>
          </MotionWrap>
        </Providers>
      </ToastWrapper>
    </div>
  )
}