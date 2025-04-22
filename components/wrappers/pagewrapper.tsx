'use client'

import { useCallback, useEffect, useRef } from "react";
import { useStateStore } from "@/context/stateStore";
import { getBaseUrl } from "@/utils/helpers/helpers";
import { initData } from "@/utils/apihelpers/get/initData/initData";
import { toast } from "sonner";
import { OfTheDays } from "@/utils/apihelpers/get/initOTDs";
import { DashProps, useStore } from "@/context/dataStore";
import { EntriesOTDType } from "@/models/types/otds";


export default function PageWrapper({ children }: Readonly<{ children: React.ReactNode; }>) {

  const widthRef = useRef<number | null>(null);
  const heightRef = useRef<number | null>(null);
  const setWidthQuery = useStateStore((state) => state.setWidthQuery);
  const setHeightQuery = useStateStore((state) => state.setHeightQuery);
  const daySelected = useStore(state => state.daySelected);
  const dashProps = useStore(state => state.dashProps);
  const setDaySelected = useStore(state => state.setDaySelected);

  const initializeWidths = useCallback((newWidth: number, newHeight: number) => {
    setWidthQuery(newWidth);
    setHeightQuery(newHeight);
  }, [setWidthQuery, setHeightQuery]);

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
    const fetchUrl = async () => {
      try {
        await getBaseUrl();
      } catch (error) {
        console.error("Failed to fetch base URL:", error);
      }
    };
    fetchUrl();
    const initUserData = async () => {
      const initialized = await initData() as { status: boolean, message: string };
      if (!initialized) {
        toast.info('Initalized failed')
      }
      if (initialized.status !== true) {
        toast.info(initialized.message)
      }
    };
    initUserData();
  }, []);

  useEffect(() => {
    const thisDay = new Date();
    const initOTDs = async (dayToUse: Date, dashPropsToUse: DashProps) => {
      await OfTheDays({ objectToUse: dashPropsToUse.objectToUse, sessionsFound: dashPropsToUse.sessionsFound, userObjects: dashPropsToUse.userObjects, daySelected: dayToUse, fieldObjects: dashPropsToUse.fieldObjects }) as EntriesOTDType[];
    }
    if (dashProps === null) {
      return;
    }
    if (daySelected === null) {
      setDaySelected(thisDay);
      initOTDs(thisDay, dashProps);
    } else {
      initOTDs(daySelected, dashProps);
    }
  }, [daySelected, dashProps, setDaySelected])

  return (
    <main className="w-screen h-screen scrollbar-thin scrollbar-webkit bg-white/50" style={{ overflowX: 'hidden', overflowY: 'auto' }}>
      {children}
    </main>
  )
}