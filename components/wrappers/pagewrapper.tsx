'use client'

import { Providers } from "@/app/providers";
import { useEffect, useRef, useState } from "react";
import { useStateStore } from "@/context/stateStore";
import ToastWrapper from "./toastWrapper";
import { widthContext } from "@/context/context";
import { getBaseUrl } from "@/utils/helpers/helpers";


export default function PageWrapper({ children }: Readonly<{ children: React.ReactNode; }>) {

  const targetRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const setWidthQuery = useStateStore((state) => state.setWidthQuery);
  const setUrlToUse = useStateStore((state) => state.setUrlToUse);

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
    const url = async () => {
      const currentUrl = await getBaseUrl();
      setUrlToUse(currentUrl);
    }
    url();
  }, [setUrlToUse]);

  return (
    <div ref={targetRef} className="h-dvh overflow-hidden">
      <ToastWrapper>
        <Providers>
          <widthContext.Provider value={width}>
            <main className={'flex flex-col h-dvh bg-white/50 '}>
              {children}
            </main>
          </widthContext.Provider>
        </Providers>
      </ToastWrapper>
    </div>
  )
}