'use client'

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import MainDashboard from "@/components/pagecomponents/dashboard/mainDash";
import { useStore } from "@/context/dataStore";
import { IUserObject } from "@/models/types/userObject";
import { IEntry } from "@/models/types/objectEntry";
import { Spinner } from "@/components/misc/Spinner";
import { useModalStore } from "@/context/modalStore";

export default function DashboardPage() {

  const { data: session, status } = useSession();
  const [dashToShow, setDashToShow] = useState('');
  const userObjects = useStore((state) => state.userObjects);
  const adminID = session?.user?.email === process.env.NEXT_PUBLIC_ADMIN_USERNAME ? true : false;
  const setGlobalObjectToUse = useStore((state) => state.setGlobalObjectToUse);
  const [objectToUse, setObjectToUse] = useState<IUserObject | null>(userObjects[0] ? userObjects[0] : null);
  const [entriesOTD, setEntriesOTD] = useState<IEntry[]>([]);
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const setGlobalDaySelected = useModalStore((state) => state.setDaySelected);
  const [daySelected, setDaySelected] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

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

  useEffect(() => {
    setLoading(true);
    if (objectToUse?.entries === null || objectToUse?.entries === undefined) {
      setLoading(false);
      return;
    } else {
      let fieldsToSet = [] as IEntry[];
      objectToUse.entries.map((entry) => {
        const entryDate = new Date(entry.date).toLocaleDateString();
        const selectedDate = new Date(daySelected).toLocaleDateString();
        if (entryDate === selectedDate) {
          const oldFields = fieldsToSet;
          fieldsToSet = [...oldFields, entry];
        }
      });
      setEntriesOTD(fieldsToSet);
      setLoading(false);
    }
  }, [objectToUse, daySelected]);

  return (
    loading ? (
      <Spinner />
    ) : (
      <MainDashboard userObjects={userObjects} session={session ? session : null} status={status} dashToShow={dashToShow} handleDashToShow={handleDashToShow} adminID={adminID} objectToUse={objectToUse} handleSetObjectToUse={handleSetObjectToUse} entriesOTD={entriesOTD} showCalendar={showCalendar} closeCalendar={closeCalendar} handleDaySelected={handleDaySelected} daySelected={daySelected} />
    )
  );
};