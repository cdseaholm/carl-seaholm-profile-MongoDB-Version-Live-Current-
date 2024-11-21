'use client'

import { IUser } from "@/models/types/user";
import { useModalStore } from "@/context/modalStore";
import { IUserObject } from "@/models/types/userObject";
import { useState, useEffect } from "react";
import { useStore } from "@/context/dataStore";
import { useSession } from "next-auth/react";
import { Spinner } from "../misc/Spinner";
import { IIndexedEntry } from "@/models/types/entry";
import { ColorMapType } from "@/models/types/colorMap";
import { IFieldObject } from "@/models/types/field";
import { EntriesOTDType } from "@/models/types/otds";
import { OfTheDays } from "@/utils/data/initOTDs";
import CalendarModal from "../modals/modalContent/Calendar/calendarmodal";
import CalendarView from "../pagecomponents/dashboard/calendarView";
import DashButtonBoard from "../pagecomponents/dashboard/dashButtonBoard";
import InnerTemplate from "../pagetemplates/innerTemplate/innerTemplate";
import MainChild from "../pagetemplates/mainchild/mainchild";
import StatsView, { dataType } from "../pagecomponents/dashboard/statsView";
import { BeginPercentage, GetDataset, FillTracker } from "@/app/actions/statsActions/statActions";
import { useStateStore } from "@/context/stateStore";
import React from "react";
import { InitCategories } from "@/utils/data/initCategories";
import { useHobbyStore } from "@/context/hobbyStore";

export default function DashProvider({ userInfo, totalTimePerMonth, totalCount, userObjects, month, sessionsFound, colorMap, fieldObjects, firstObjectToUse }: { userInfo: IUser, totalTimePerMonth: number[], totalCount: number[], userObjects: IUserObject[], month: number, sessionsFound: IIndexedEntry[], colorMap: ColorMapType[], fieldObjects: IFieldObject[], firstObjectToUse: IUserObject }) {

    const dashToShow = useModalStore((state) => state.dashToShow);
    const setDashToShow = useModalStore((state) => state.setDashToShow);
    const setUserInfo = useStore((state) => state.setUserInfo);
    const setUserObjects = useStore((state) => state.setUserObjects);
    const setCategories = useHobbyStore((state) => state.setCategories);
    const setTitles = useHobbyStore((store) => store.setTitles);
    const [localFieldObjects, setLocalFieldObjects] = useState<IFieldObject[]>(fieldObjects);
    const setFieldObjectsStored = useHobbyStore((store) => store.setFieldObjectsStored);
    const [objectToUse, setObjectToUse] = useState<IUserObject>(firstObjectToUse);
    const showCalendar = useModalStore((state) => state.showCalendar);
    const setShowCalendar = useModalStore((state) => state.setShowCalendar);
    const setGlobalDaySelected = useModalStore((state) => state.setDaySelected);
    const [daySelected, setDaySelected] = useState<string>(new Date().toLocaleDateString());
    const [entriesOTD, setEntriesOTD] = useState<EntriesOTDType[]>([])
    const [thisMonth, setThisMonth] = useState<number>(new Date().getMonth());
    const [indexShown, setIndexShown] = useState<boolean>(false);
    const { data: session } = useSession();
    const user = session?.user ? session.user : null;
    const email = user?.email ? user.email : '';
    const adminBoolTruth = email === 'cdseaholm@gmail.com' ? true : false;
    const [loading, setLoading] = useState<boolean>(true);
    const isBreakpoint = useStateStore((state) => state.widthQuery) < 950 ? true : false;
    const [data, setData] = React.useState<dataType[]>([]);
    const [calData, setCalData] = React.useState<dataType[]>([]);
    const [monthsToChart, setMonthsToChart] = React.useState<string[]>([]);
    const [colorsToChart, setColorsToChart] = React.useState<string[]>([]);
    const [barChartData, setBarChartData] = React.useState<{ date: string, time: number, color: string }[]>([]);
    const [barChartDataTwo, setBarChartDataTwo] = React.useState<{ date: string, time: number, color: string }[]>([]);
    const [daysWithHobbies, setDaysWithHobbies] = React.useState<number[]>([]);
    const [otdLength, setOtdLength] = useState<number>(0);
    const [showGoals, setShowGoals] = useState<boolean>(false);
    const [showCats, setShowCats] = useState<boolean>(false);
    const [showDescriptions, setShowDescriptions] = useState<boolean>(false);
    const [showTotTime, setShowTotTime] = useState<boolean>(false);

    const handleGoals = () => {
        setShowGoals(!showGoals);
    }

    const handleCats = () => {
        setShowCats(!showCats);
    }

    const handleDescriptions = () => {
        setShowDescriptions(!showDescriptions);
    }

    const handleTotalTime = () => {
        setShowTotTime(!showTotTime);
    }

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

    {/**const handleSetObjectToUse = (objectToUse: IUserObject) => {
        setObjectToUse(objectToUse);
        setGlobalObjectToUse(objectToUse);
    } */}

    const handleDaySelected = async (date: string) => {
        setLoading(true)
        setGlobalDaySelected(date);
        setDaySelected(date);
        const newEnts = await OfTheDays({ objectToUse: objectToUse, sessionsFound: sessionsFound, userObjects: userObjects, daySelected: date, fieldObjects: fieldObjects }) as EntriesOTDType[];
        if (newEnts) {
            setEntriesOTD(newEnts)
            const lngth = newEnts.length as number;
            if (lngth) {
                setOtdLength(lngth)
            }
        }
        setLoading(false)

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

    {/**const handleUserObjectToShow = async (userObjectToShow: string) => {
        const object = userObjects[Number(userObjectToShow)];
        if (!object) {
            return;
        }
        handleSetObjectToUse(object);
    }; */}

    //effects 

    useEffect(() => {
        setThisMonth(month);
        setUserObjects(userObjects);
        setUserInfo(userInfo);
        setObjectToUse(firstObjectToUse);
        if (fieldObjects) {
            setFieldObjectsStored(fieldObjects);
            setLocalFieldObjects(fieldObjects)
        }
        const initOTDs = async () => {
            const newEnts = await OfTheDays({ objectToUse: objectToUse, sessionsFound: sessionsFound, userObjects: userObjects, daySelected: daySelected, fieldObjects: localFieldObjects }) as EntriesOTDType[];
            if (newEnts) {
                setEntriesOTD(newEnts)
                const lngth = newEnts.length as number;
                if (lngth) {
                    setOtdLength(lngth)
                }
            }
        }

        const getData = async () => {
            if (!objectToUse) {
                return;
            }
            const perc = await BeginPercentage({ objectToUse: objectToUse, totalTime: totalTimePerMonth, fields: localFieldObjects, sessions: sessionsFound }) as {newData: dataType[], calData: dataType[]};

            if (perc && perc.newData) {
                setData(perc.newData);
            }

            if (perc && perc.calData) {
                setCalData(perc.calData)
            }

            const dataSet = await GetDataset({ objectToUse: objectToUse, thisMonth: thisMonth, fields: fieldObjects, entries: sessionsFound });
            if (dataSet) {
                setBarChartData([...dataSet.newData]);
                setBarChartDataTwo([...dataSet.newDataTwo]);
                setMonthsToChart([...dataSet.monthNames]);
                setColorsToChart([...dataSet.monthColors]);
            }
            const tracker = await FillTracker({ objectToUse: objectToUse, thisMonth: thisMonth, entries: sessionsFound, fields: fieldObjects });
            if (tracker) {
                setDaysWithHobbies([...tracker.daysWithHobbies]);
            }

            const setModalData = await InitCategories({objectToUse: objectToUse, fieldObjects: fieldObjects})
            if (setModalData) {
                let cats = setModalData.categories as string[]
                let titles = setModalData.titles as string[]
                if (cats && titles) {
                    setCategories(cats)
                    setTitles(titles)
                }
            }

        }

        getData();
        initOTDs();
        setLoading(false)

    }, [totalCount, userObjects, userInfo, totalTimePerMonth, objectToUse, daySelected, sessionsFound, fieldObjects, month, setUserInfo, setUserObjects, thisMonth, firstObjectToUse, localFieldObjects, setCategories, setFieldObjectsStored, setTitles]);

    return (
        loading ? (
            <Spinner />
        ) : (
            <MainChild>
                <CalendarModal show={showCalendar} closeCalendar={closeCalendar} adminIDBool={adminBoolTruth} objectToUse={objectToUse} handleDaySelected={handleDaySelected} session={session} colorMap={colorMap} entries={sessionsFound} data={calData} />
                <DashButtonBoard dashToShow={dashToShow} handleDashToShow={handleDashToShow} indexShown={indexShown} setIndexShown={setIndexShown} adminID={adminBoolTruth} colorMap={colorMap} />
                <InnerTemplate>
                    {
                        dashToShow === 'calendar' ? (
                            <CalendarView handleDateIncrease={handleDateIncrease} handleDateDecrease={handleDateDecrease} entriesOTD={entriesOTD} adminID={adminBoolTruth} daySelected={daySelected} handleDaySelected={handleDaySelected} otdLength={otdLength} handleCats={handleCats} handleDescriptions={handleDescriptions} handleGoals={handleGoals} handleTotalTime={handleTotalTime} showCats={showCats} showDescriptions={showDescriptions} showGoals={showGoals} showTotTime={showTotTime}/>
                        ) :
                            dashToShow === 'stats' &&
                            //enter a month changer here to hold the month value since I'm elevating the state here
                            <StatsView isBreakpoint={isBreakpoint} data={data} colorsToChart={colorsToChart} monthsToChart={monthsToChart} barChartData={barChartData} barChartDataTwo={barChartDataTwo} daysWithHobbies={daysWithHobbies} />
                        /** : dashToShow === 'todo' &&
                            <ToDoList adminID={adminBoolTruth} setModalOpen={setModalOpen} handleDateDecrease={handleDateDecrease} handleDateIncrease={handleDateIncrease} dateToUse={daySelected} entriesOTD={entriesOTD} /> */
                    }
                </InnerTemplate>
            </MainChild>
        )
    );
}
