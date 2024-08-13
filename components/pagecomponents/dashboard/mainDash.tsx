'use client'

import ActionButton from "@/components/buttons/actionbutton";
import MainChild from "@/components/pagetemplates/mainchild/mainchild";
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
import { IUserObject } from "@/models/types/userObject";
import { IEntry } from "@/models/types/objectEntry";

export default function MainDashboard({ customFields, session, status, dashToShow, handleDashToShow, adminID }: { customFields: IUserObject[], session: Session | null, status: string, dashToShow: string, handleDashToShow: (dashToShow: string, handleModalOpen: string | null) => void, adminID: boolean }) {

    const adminIDBool = status === 'authenticated' && session?.user?.email === process.env.NEXT_PUBLIC_ADMIN_USERNAME ? true : false;
    const [totalTime, setTotalTime] = useState<number[]>([]);
    const [totalCounter, setTotalCounter] = useState<number[]>([]);
    const [thisMonth, setThisMonth] = useState<number>(new Date().getMonth());
    const [indexShown, setIndexShown] = useState<boolean>(false);
    const setDaySelected = useModalStore((state) => state.setDaySelected);
    const setModalOpen = useModalStore((state) => state.setModalOpen);
    const daySelected = useModalStore((state) => state.daySelected);
    const globalLoading = HandleGlobalLoading();
    const dateToUse = new Date().toLocaleDateString();
    const [objectToUse, setObjectToUse] = useState<IUserObject | null>(customFields[0] ? customFields[0] : null);
    const [entriesOTD, setEntriesOTD] = useState<IEntry[]>([]);

    useEffect(() => {
        if (objectToUse?.entries === null || objectToUse?.entries === undefined) {
            return;
        } else {
            let fieldsToSet = [] as IEntry[];
            objectToUse.entries.map((entry) => {
                if (entry.date === daySelected) {
                    fieldsToSet.push(entry);
                }
            });
            setEntriesOTD(fieldsToSet);
        }
    }, [objectToUse, daySelected]);

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
            if (objectToUse && objectToUse.entries.length > 0) {
                const modelsToPass = objectToUse.entries.map((entry) => {
                    return entry;
                });
                const { totalTimePerMonth, counterPerMonth } = await TotalMinutesCalc({ arrayOfDates: modelsToPass, thisMonth: thisMonth });
                setTotalTime(totalTimePerMonth);
                setTotalCounter(counterPerMonth);
            }
        }
        setStats();
    }, [objectToUse, thisMonth, setTotalTime, setTotalCounter]);
    //need to add in some sort a trackable variable

    const handleCustomFieldToShow = async (customFieldToShow: number) => {
        const field = customFields[customFieldToShow];
        if (!field) {
            return;
        }
        setObjectToUse(field);
    }

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
                            <DashButtons dashToShow={dashToShow} handleDashToShow={handleDashToShow} customFields={customFields} handleCustomFieldToShow={handleCustomFieldToShow} />
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
                            <CalendarView handleDateIncrease={handleDateIncrease} handleDateDecrease={handleDateDecrease} entriesOTD={entriesOTD} adminID={adminID} objectTitle={objectToUse?.title ? objectToUse.title : ''} />
                        }
                        {dashToShow === 'stats' &&
                            //enter a month changer here to hold the month value since I'm elevating the state here
                            <StatsView setIndexShown={setIndexShown} indexShown={indexShown} entriesOTD={entriesOTD} totalTime={totalTime} totalCounter={totalCounter} thisMonth={thisMonth} objectTitle={objectToUse?.title ? objectToUse.title : ''} />
                        }
                        {dashToShow === 'todo' &&
                            <ToDoList adminID={adminID} setModalOpen={setModalOpen} handleDateDecrease={handleDateDecrease} handleDateIncrease={handleDateIncrease} dateToUse={dateToUse} entriesOTD={entriesOTD} />
                        }
                    </main>
                </section>
            </MainChild>
    );
};