'use client'

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useStore } from "@/context/dataStore";
import { IUserObject } from "@/models/types/userObject";
import { IEntry } from "@/models/types/objectEntry";
import { Spinner } from "@/components/misc/Spinner";
import { useModalStore } from "@/context/modalStore";
import ActionButton from "@/components/buttons/actionbutton";
import { DashButtons } from "@/components/buttons/dashButtons";
import CalendarModal from "@/components/modals/modalContent/Calendar/calendarmodal";
import { TotalMinutesCalc } from "@/app/actions/dashActions/totalminutescalc";
import CalendarView from "@/components/pagecomponents/dashboard/calendarView";
import ToDoList from "@/components/pagecomponents/dashboard/todolist";
import MainChild from "@/components/pagetemplates/mainchild/mainchild";
import InnerTemplate from "@/components/pagetemplates/innerTemplate/innerTemplate";
import StatsMid from "@/components/pagecomponents/dashboard/statsMid";

export default function DashboardPage() {

  const { data: session } = useSession();
  const [dashToShow, setDashToShow] = useState('stats');
  const userObjects = useStore((state) => state.userObjects);
  const adminID = session?.user?.email === process.env.NEXT_PUBLIC_ADMIN_USERNAME ? true : false;
  const setGlobalObjectToUse = useStore((state) => state.setGlobalObjectToUse);
  const [objectToUse, setObjectToUse] = useState<IUserObject | null>(userObjects ? userObjects[0] as IUserObject : null);
  const [entriesOTD, setEntriesOTD] = useState<IEntry[]>([]);
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const setGlobalDaySelected = useModalStore((state) => state.setDaySelected);
  const [daySelected, setDaySelected] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [totalTime, setTotalTime] = useState<number[]>([]);
  const [totalCounter, setTotalCounter] = useState<number[]>([]);
  const [thisMonth, setThisMonth] = useState<number>(new Date().getMonth());
  const [indexShown, setIndexShown] = useState<boolean>(false);
  const setModalOpen = useModalStore((state) => state.setModalOpen);
  const dateToUse = new Date().toLocaleDateString();

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
    if (objectToUse === null || objectToUse === undefined) {
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

  useEffect(() => {
    const setStats = async () => {
      const thisMonth = new Date().getMonth();
      setThisMonth(thisMonth);
      if (objectToUse && objectToUse.entries.length > 0) {
        const modelsToPass = objectToUse.entries.map((entry) => {
          return entry;
        });
        const { totalTimePerMonth, counterPerMonth } = await TotalMinutesCalc({ entries: modelsToPass, thisMonth: thisMonth });
        setTotalTime(totalTimePerMonth);
        setTotalCounter(counterPerMonth);
      }
    }
    setStats();
  }, [objectToUse, thisMonth, setTotalTime, setTotalCounter]);

  const handleUserObjectToShow = async (userObjectToShow: number) => {
    const object = userObjects[userObjectToShow];
    if (!object) {
      return;
    }
    handleSetObjectToUse(object);
  };

  return (
    loading ? (
      <Spinner />
    ) : (
      <MainChild>
        <CalendarModal show={showCalendar} closeCalendar={closeCalendar} adminIDBool={adminID} objectToUse={objectToUse} handleDaySelected={handleDaySelected} session={session} objectTitle={objectToUse?.title ? objectToUse.title : ''} />
        <h1 className={`text-lg md:text-xl font-bold text-center`}>
          Dashboard
        </h1>
        <div className="flex flex-row justify-between items-center px-5 py-2">
          <div className="flex flex-row justify-between items-center space-x-5">
            <DashButtons dashToShow={dashToShow} handleDashToShow={handleDashToShow} userObjects={userObjects} handleUserObjectToShow={handleUserObjectToShow} />
          </div>
          {adminID ?
            (
              <ActionButton whichModal="actions" />
            ) : (
              <div />
            )
          }
        </div>
        <InnerTemplate>
          {loading ? (
            <Spinner />
          ) : (
            dashToShow === 'calendar' ? (
              <CalendarView handleDateIncrease={handleDateIncrease} handleDateDecrease={handleDateDecrease} entriesOTD={entriesOTD} adminID={adminID} objectTitle={objectToUse?.title ? objectToUse.title : ''} daySelected={daySelected} handleDaySelected={handleDaySelected} />
            ) :
              dashToShow === 'stats' ? (
                //enter a month changer here to hold the month value since I'm elevating the state here
                <StatsMid setIndexShown={setIndexShown} indexShown={indexShown} objectToUse={objectToUse} totalTime={totalTime} totalCounter={totalCounter} thisMonth={thisMonth} objectTitle={objectToUse?.title ? objectToUse.title : ''} />
              ) : dashToShow === 'todo' &&
              <ToDoList adminID={adminID} setModalOpen={setModalOpen} handleDateDecrease={handleDateDecrease} handleDateIncrease={handleDateIncrease} dateToUse={dateToUse} entriesOTD={entriesOTD} />
          )}
        </InnerTemplate>
      </MainChild>
    )
  );

}