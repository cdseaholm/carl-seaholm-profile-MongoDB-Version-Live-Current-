'use client'

import { IUser } from "@/models/types/user";
import DashHub from "../pagecomponents/dashboard/dashHub";
import { TotalMinutesCalc } from "@/app/actions/dashActions/totalminutescalc";
import { useModalStore } from "@/context/modalStore";
import { IEntry } from "@/models/types/objectEntry";
import { IUserObject } from "@/models/types/userObject";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useStore } from "@/context/dataStore";

export default function DashProvider({ userInfo }: { userInfo: IUser }) {
    
    const { data: session } = useSession();
    const dashToShow = useModalStore((state) => state.dashToShow);
    const setDashToShow = useModalStore((state) => state.setDashToShow);
    const userObjects = userInfo ? userInfo.userObjects as IUserObject[] : [] as IUserObject[];
    const adminID = session ? session.user ? session.user.email === process.env.NEXT_PUBLIC_ADMIN_USERNAME : false : false;
    const setGlobalObjectToUse = useStore((state) => state.setGlobalObjectToUse);
    const [objectToUse, setObjectToUse] = useState<IUserObject>(userObjects ? userObjects[0] as IUserObject : {} as IUserObject);
    const showCalendar = useModalStore((state) => state.showCalendar);
    const setShowCalendar = useModalStore((state) => state.setShowCalendar);
    const setGlobalDaySelected = useModalStore((state) => state.setDaySelected);
    const [daySelected, setDaySelected] = useState<string>(new Date().toLocaleDateString());
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
                setTotalCounter(counterPerMonth);
            }
        }
        setStats();
    }, [objectToUse, thisMonth, setTotalTime, setTotalCounter]);


    return (
        <DashHub showCalendar={showCalendar} closeCalendar={closeCalendar} adminID={adminID} objectToUse={objectToUse} handleDaySelected={handleDaySelected} session={session} dashToShow={dashToShow} handleDashToShow={handleDashToShow} userObjects={userObjects} handleUserObjectToShow={handleUserObjectToShow} indexShown={indexShown} setIndexShown={setIndexShown} handleDateIncrease={handleDateIncrease} handleDateDecrease={handleDateDecrease} daySelected={daySelected} totalTime={totalTime} totalCounter={totalCounter} thisMonth={thisMonth} setModalOpen={setModalOpen} />
    );
}