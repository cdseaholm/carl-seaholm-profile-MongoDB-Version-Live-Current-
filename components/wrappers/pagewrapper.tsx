'use client'

import { useEffect, useState } from "react";
import { useStateStore } from "@/context/stateStore";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Box, LoadingOverlay } from "@mantine/core";
import MainWrapper from "./mainWrapper";
import { Providers } from "../providers/providers";
import { isValidRoute } from "@/lib/routes/route";

export default function PageWrapper({ children }: Readonly<{ children: React.ReactNode; }>) {

  //const init = useRef(false);
  const { data: _session, status } = useSession();
  const globalLoading = useStateStore((state) => state.globalLoading);
  const [localLoading, setLocalLoading] = useState<boolean>(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!isValidRoute(pathname)) {
      router.replace('/');
      return;
    }

    setLocalLoading(globalLoading);
  }, [globalLoading, pathname, router]);

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