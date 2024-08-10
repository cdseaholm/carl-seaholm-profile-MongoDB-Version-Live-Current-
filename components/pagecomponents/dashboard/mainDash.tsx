'use client'

import ActionButton from "@/components/buttons/actionbutton";
import MainChild from "@/components/pagetemplates/mainchild/mainchild";
import { IHobby } from "@/models/types/hobby";
import { ITask } from "@/models/types/task";
import { Session } from "next-auth";
import { DashButtons } from "@/components/buttons/dashButtons";
import { useModalStore } from "@/context/modalStore";
import { useState, useEffect } from "react";
import CalendarView from "./views/calendarView";
import StatsView from "./views/statsView";
import { TotalMinutesCalc } from "./helpers/totalminutescalc";
import ToDoList from "./views/todolist";
import HandleGlobalLoading from "@/components/misc/handleGlobalLoading";
import { Spinner } from "@/components/misc/Spinner";

export default function MainDashboard({ hobbies, categories, tasks, session, status, dashToShow, handleDashToShow, adminID }: { hobbies: IHobby[], categories: string[], tasks: ITask[], session: Session | null, status: string, dashToShow: string, handleDashToShow: (dashToShow: string, handleModalOpen: string | null) => void, adminID: boolean }) {

    const adminIDBool = status === 'authenticated' && session?.user?.email === process.env.NEXT_PUBLIC_ADMIN_USERNAME ? true : false;
    const [totalTime, setTotalTime] = useState<number[]>([]);
    const [totalCounter, setTotalCounter] = useState<number[]>([]);
    const [thisMonth, setThisMonth] = useState<number>(new Date().getMonth());
    const [indexShown, setIndexShown] = useState<boolean>(false);
    const setDaySelected = useModalStore((state) => state.setDaySelected);
    const setModalOpen = useModalStore((state) => state.setModalOpen);
    const [hobbyEvents, setHobbyEvents] = useState<IHobby[]>([]);
    const daySelected = useModalStore((state) => state.daySelected);
    const globalLoading = HandleGlobalLoading();

    //state
    const [dateToUse, setDateToUse] = useState(new Date().toLocaleDateString());

    useEffect(() => {
        if (hobbies === null || hobbies === undefined) {
            return;
        } else {
            const hobbiesToSet = [] as IHobby[];
            hobbies.forEach((hobby: IHobby) => {
                for (let i = 0; i < hobby.dates.length; i++) {
                    const date = new Date(hobby.dates[i] + 'T00:00');
                    if (date.toLocaleDateString() === daySelected) {
                        hobbiesToSet.push(hobby);
                    }
                }
            });
            setHobbyEvents(hobbiesToSet);
        }
    }, [hobbies, daySelected, setHobbyEvents]);

    const handleDateIncrease = () => {
        const date = new Date(daySelected);
        date.setDate(date.getDate() + 1);
        setDaySelected(date.toLocaleDateString());
    }

    const handleDateDecrease = () => {
        const date = new Date(daySelected);
        date.setDate(date.getDate() - 1);
        setDaySelected(date.toLocaleDateString());
    }

    useEffect(() => {
        const setStats = async () => {
            const thisMonth = new Date().getMonth();
            setThisMonth(thisMonth);
            if (hobbies && hobbies.length > 0) {
                const { totalTimePerMonth, counterPerMonth } = await TotalMinutesCalc({ hobbies, thisMonth: thisMonth });
                setTotalTime(totalTimePerMonth);
                setTotalCounter(counterPerMonth);
            }
        }
        setStats();
    }, [hobbies, thisMonth, setTotalTime, setTotalCounter]);

    //functions
    {/** useEffect(() => {
      if (status === 'authenticated' && session?.user?.email === process.env.NEXT_PUBLIC_ADMIN_USERNAME) {
        setDashToShow('todo');
      } else {
        setDashToShow('stats');
      }
      const getData = async () => {
        if (urlToUse === '' || urlToUse === null || urlToUse === undefined || userID === '' || userID === null || userID === undefined) {
          console.error('Error in getting data, urlToUse or userID is not set');
          console.log('urlToUse:', urlToUse);
          console.log('userID:', userID);
          return;
        } else {
          const hobs = await getHobbies(urlToUse, userID);
          setHobbies(hobs);
          const tsks = await getTasks(urlToUse, userID);
          if (tsks === null || tsks === undefined) {
            console.error('No tasks found');
            return;
          } else {
            setTasksByUser(tsks[0]);
          }
          const categories = await getCategories(hobs);
          setCategories(categories);
        }
      }
      getData();
      setLoading(false);
    }, [setLoading, setTasks, setCategories, urlToUse, userID, status, session, setDashToShow, setHobbies, setTasksByUser]);*/}

    return (
        globalLoading.loading ?
            <Spinner />
            :
            <MainChild>
                <h1 className={`text-lg md:text-xl font-bold text-center`}>
                    Dashboard
                </h1>
                <section className="flex flex-col px-2 pb-2" style={{ height: '96.5%' }}>
                    <div className="flex flex-row justify-between items-center px-5 py-2">
                        <div className="flex flex-row justify-between items-center space-x-5">
                            <DashButtons dashToShow={dashToShow} handleDashToShow={handleDashToShow} />
                        </div>
                        {adminIDBool ?
                            (
                                <ActionButton whichModal="actions" />
                            ) : (
                                <div />
                            )
                        }
                    </div>
                    <main className={`bg-gray-500/70 rounded-md overflow-hidden`} style={{ flexGrow: 1 }}>
                        {dashToShow === 'calendar' &&
                            <CalendarView handleDateIncrease={handleDateIncrease} handleDateDecrease={handleDateDecrease} hobbyEvents={hobbyEvents} adminID={adminID} />
                        }
                        {dashToShow === 'stats' &&
                            //enter a month changer here to hold the month value since I'm elevating the state here
                            <StatsView setIndexShown={setIndexShown} indexShown={indexShown} hobbies={hobbies} totalTime={totalTime} totalCounter={totalCounter} thisMonth={thisMonth} />
                        }
                        {dashToShow === 'todo' &&
                            <ToDoList adminID={adminID} setModalOpen={setModalOpen} handleDateDecrease={handleDateDecrease} handleDateIncrease={handleDateIncrease} dateToUse={dateToUse} tasks={tasks} />
                        }
                    </main>
                </section>
            </MainChild>
    );
};