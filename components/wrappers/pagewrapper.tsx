'use client'

import { useCallback, useEffect, useRef, useState } from "react";
import { useStateStore } from "@/context/stateStore";
import { initData, SetBaseData } from "@/utils/apihelpers/get/initData/initData";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { Box, LoadingOverlay } from "@mantine/core";
import MainWrapper from "./mainWrapper";
import { Providers } from "../providers/providers";



export default function PageWrapper({ children }: Readonly<{ children: React.ReactNode; }>) {

  const init = useRef(false);
  const { data: _session, status } = useSession();
  const globalLoading = useStateStore((state) => state.globalLoading);
  const setGlobalLoading = useStateStore(state => state.setGlobalLoading);
  const [localLoading, setLocalLoading] = useState(true);
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
    if (!init.current) {
      init.current = true;
      setGlobalLoading(true);

      const initUserData = async () => {
        //console.log('Initializing base data...');
        const result = await initData({ urlToUse: urlToUse });
        //console.log('Base data init result:', result.status, result.message);
        await SetBaseData(result.sessionInfo, result.hobbyData, result.monthlyInfo, result.userInfo);
        // const settingResult = await SetBaseData(result.sessionInfo, result.hobbyData, result.monthlyInfo, result.userInfo);
        // console.log('Base data set result:', settingResult.status, settingResult.message);
        setGlobalLoading(false);
      }

      initUserData();
    }
  }, [setGlobalLoading, urlToUse]);

  useEffect(() => {
    if (init.current && globalLoading) {
      console.log('Re-fetching data due to globalLoading trigger...');
      
      const refetchData = async () => {
        const result = await initData({ urlToUse: urlToUse });
        console.log('Re-fetch result:', result.status, result.message);
        await SetBaseData(result.sessionInfo, result.hobbyData, result.monthlyInfo, result.userInfo);
        setGlobalLoading(false);
      };

      refetchData();
    }
  }, [globalLoading, urlToUse, setGlobalLoading]);

  useEffect(() => {
    setLocalLoading(globalLoading);
  }, [globalLoading]);

  const isLoading = status === 'loading' || localLoading;

  const toLoad = pathname.includes('/projects/school/infoVis-DatasetProject') ? (
    <main className="h-screen w-screen overflow-hidden bg-white">
      <div className="h-screen w-screen overflow-hidden infoVis">
        <div className="flex h-screen flex-col items-center justify-start w-screen overflow-hidden bg-linear-to-b from-slate-900/90 to-slate-400/30">{children}</div>
      </div>
    </main>
  ) : (
    <div className="flex flex-col justify-start items-center w-screen h-dvh bg-white/50 overflow-hidden">
      <div className="flex flex-col justify-start items-center w-screen h-dvh bg-slate-900/50 overflow-hidden">
        <Box pos={'relative'} w={'100dvw'} h={'100dvh'}>
          <LoadingOverlay
            visible={isLoading}
            zIndex={1000}
            overlayProps={{ radius: "sm", blur: 2 }}
          />
          <Providers />
          <div className="flex flex-col justify-start items-center w-screen h-full overflow-hidden">
            <MainWrapper>
              {children}
            </MainWrapper>
          </div>
        </Box>
      </div>
    </div>
  )



  return toLoad
}