'use client'

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useStore } from "@/context/dataStore";
import { IUserObject } from "@/models/types/userObject";
import { Spinner } from "@/components/misc/Spinner";
import { useModalStore } from "@/context/modalStore";
import { TotalMinutesCalc } from "@/app/actions/dashActions/totalminutescalc";
import DashHub from "@/components/pagecomponents/dashboard/dashHub";
import { IEntry } from "@/models/types/objectEntry";

export default function DashboardPage() {

  const { data: session } = useSession();
  const [dashToShow, setDashToShow] = useState('stats');
  const userInfo = useStore((state) => state.userInfo);
  const userObjects = userInfo?.userObjects;
  const adminID = session ? session.user ? session.user.email === process.env.NEXT_PUBLIC_ADMIN_USERNAME : false : false;
  const setGlobalObjectToUse = useStore((state) => state.setGlobalObjectToUse);
  const [objectToUse, setObjectToUse] = useState<IUserObject>(userObjects ? userObjects[0] as IUserObject : {} as IUserObject);
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const setGlobalDaySelected = useModalStore((state) => state.setDaySelected);
  const [daySelected, setDaySelected] = useState<string>(new Date().toLocaleDateString());
  const [loading, setLoading] = useState<boolean>(true);
  const [totalTime, setTotalTime] = useState<number[]>([0, 0, 0, 0, 0]);
  const [totalCounter, setTotalCounter] = useState<number[]>([]);
  const [thisMonth, setThisMonth] = useState<number>(new Date().getMonth());
  const [indexShown, setIndexShown] = useState<boolean>(false);
  const setModalOpen = useModalStore((state) => state.setModalOpen);

  //functions
  const handleDashToShow = (dashToShow: string, handleModalOpen: string | null) => {
    setDashToShow(dashToShow);
    if (handleModalOpen) {
      setShowCalendar(true);
    }
  }

  const closeCalendar = () => {
    setShowCalendar(false);
  }

  const handleSetObjectToUse = (objectToUse: IUserObject) => {
    setObjectToUse(objectToUse);
    setGlobalObjectToUse(objectToUse);
  }

  const handleDaySelected = (date: string) => {
    setGlobalDaySelected(date);
    setDaySelected(date);
  }

  const handleDateIncrease = () => {
    const date = new Date(daySelected);
    date.setDate(date.getDate() + 1);
    handleDaySelected(date.toLocaleDateString());
  }

  const handleDateDecrease = () => {
    const date = new Date(daySelected);
    date.setDate(date.getDate() - 1);
    handleDaySelected(date.toLocaleDateString());
  }

  const handleUserObjectToShow = async (userObjectToShow: string) => {
    const object = userObjects[Number(userObjectToShow)];
    if (!object) {
      return;
    }
    handleSetObjectToUse(object);
  };

  //effects 

  useEffect(() => {
    const setStats = async () => {
      const thisMonth = new Date().getMonth();
      setThisMonth(thisMonth);
      const entries = objectToUse ? objectToUse.entries : [] as IEntry[];
      const entriesLength = entries ? entries.length : 0;
      if (objectToUse && entriesLength > 0) {
        const modelsToPass = objectToUse.entries.map((entry) => {
          return entry;
        });
        const { totalTimePerMonth, counterPerMonth } = await TotalMinutesCalc({ entries: modelsToPass, thisMonth: thisMonth });
        setTotalTime(totalTimePerMonth);
        console.log(totalTimePerMonth);
        setTotalCounter(counterPerMonth);
      }
    }
    setStats();
    setLoading(false);
  }, [objectToUse, thisMonth, setTotalTime, setTotalCounter]);

  return (
    loading ? (
      <Spinner />
    ) : (
      <DashHub showCalendar={showCalendar} closeCalendar={closeCalendar} adminID={adminID} objectToUse={objectToUse} handleDaySelected={handleDaySelected} session={session} dashToShow={dashToShow} handleDashToShow={handleDashToShow} userObjects={userObjects} handleUserObjectToShow={handleUserObjectToShow} indexShown={indexShown} setIndexShown={setIndexShown} handleDateIncrease={handleDateIncrease} handleDateDecrease={handleDateDecrease} daySelected={daySelected} totalTime={totalTime} totalCounter={totalCounter} thisMonth={thisMonth} setModalOpen={setModalOpen} />
    )
  );

}