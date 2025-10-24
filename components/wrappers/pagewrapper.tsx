'use client'

import { useCallback, useEffect, useRef, useState } from "react";
import { useStateStore } from "@/context/stateStore";
import { initData } from "@/utils/apihelpers/get/initData/initData";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import LoadingSpinner from "@/app/(content)/projects/school/infoVis-DatasetProject/components/components/misc/loadingSpinner";
import { Providers } from "@/app/context/providers";
import { Overlay } from "@mantine/core";
import NavWrapper from "./navWrapper";
import MainWrapper from "./mainWrapper";



export default function PageWrapper({ children }: Readonly<{ children: React.ReactNode; }>) {

  const [loading, setLoading] = useState(false);
  const { data: _session, status } = useSession();
  const globalLoading = useStateStore((state) => state.globalLoading);
  const widthRef = useRef<number | null>(null);
  const heightRef = useRef<number | null>(null);
  const setWidthQuery = useStateStore((state) => state.setWidthQuery);
  const setHeightQuery = useStateStore((state) => state.setHeightQuery);
  const urlToUse = process.env.NEXT_PUBLIC_BASE_URL ? process.env.NEXT_PUBLIC_BASE_URL : '';
  const pathname = usePathname();

  const initializeWidths = useCallback((newWidth: number, newHeight: number) => {
    setWidthQuery(newWidth);
    setHeightQuery(newHeight);
  }, [setWidthQuery, setHeightQuery]);

  // const handleUpdate = async () => {
  //   await update();
  // };

  const updateMedia = useCallback(() => {
    const newWidth = window.innerWidth;
    const newHeight = window.innerHeight;
    if (!newWidth || !newHeight) {
      return;
    }
    widthRef.current = newWidth;
    heightRef.current = newHeight;

    setWidthQuery(newWidth);
    setHeightQuery(newHeight);
  }, [setWidthQuery, setHeightQuery]);

  useEffect(() => {
    const newWidth = window.innerWidth;
    const newHeight = window.innerHeight;
    if (!newWidth || !newHeight) {
      return;
    }
    widthRef.current = newWidth;
    heightRef.current = newHeight;
    initializeWidths(newWidth, newHeight);

    window.addEventListener('resize', updateMedia);
    return () => window.removeEventListener('resize', updateMedia);
  }, [updateMedia, initializeWidths]);

  useEffect(() => {
    const initUserData = async () => {
      await initData({ urlToUse: urlToUse }) as { status: boolean, message: string };
    }
    initUserData();
    setLoading(false);
  }, [urlToUse]);

  if (pathname.includes('/projects/school/infoVis-DatasetProject')) {
    return (
      <main className="h-screen w-screen overflow-hidden bg-white">
        <div className="h-screen w-screen overflow-hidden infoVis">
          <div className="flex h-screen flex-col items-center justify-start w-screen overflow-hidden bg-linear-to-b from-slate-900/90 to-slate-400/30">{children}</div>
        </div>
      </main>
    )
  } else {

    return (


      <div className="flex flex-col justify-start items-center w-screen h-screen bg-white/50 overflow-hidden">
        <div className="flex flex-col justify-start items-center w-screen h-screen bg-slate-900/50 overflow-hidden">
          {status === 'loading' ? (
            <LoadingSpinner />
          ) : (
            <>
              <NavWrapper />
              {/* <Providers handleUpdate={handleUpdate} session={session} /> */}
              <Providers />
              <MainWrapper>
                {loading ? (
                  <LoadingSpinner />
                ) : (
                  <>
                    {children}
                  </>
                )}
              </MainWrapper>
              {globalLoading && (
                <Overlay
                  gradient="linear-gradient(145deg, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0) 100%)"
                  opacity={0.85}
                >
                  <LoadingSpinner />
                </Overlay>
              )}
            </>
          )}
        </div>
      </div>
    )
  }
}