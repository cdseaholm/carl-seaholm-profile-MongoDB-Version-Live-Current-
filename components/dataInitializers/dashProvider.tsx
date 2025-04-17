'use client'

import { EntriesOTDType } from "@/models/types/otds";
import CalendarView from "../pagecomponents/dashboard/calendarView";
import DashButtonBoard from "../pagecomponents/dashboard/dashButtonBoard";
import InnerTemplate from "../pagetemplates/innerTemplate/innerTemplate";
import MainChild from "../pagetemplates/mainchild/mainchild";
import StatsView, { dataType } from "../pagecomponents/dashboard/statsView";
import React, { useEffect, useState } from "react";
import LogSessionDataInit from "../modals/modalContent/LogSession/logsessiondatainit";
import { BarData } from "@/app/actions/statsActions/statActions";
import { Spinner } from "../misc/Spinner";
import { useStore } from "@/context/dataStore";
import { useSession } from "next-auth/react";
import { useModalStore } from "@/context/modalStore";
import { ColorMapType } from "@/models/types/colorMap";

export default function DashProvider() {

    const { data: session } = useSession();
    const user = session?.user ? session.user : null;
    const email = user?.email ? user.email : '';
    const adminBoolTruth = email === 'cdseaholm@gmail.com' ? true : false;
    const [showGoals, setShowGoals] = useState<boolean>(false);
    const [showCats, setShowCats] = useState<boolean>(false);
    const [showDescriptions, setShowDescriptions] = useState<boolean>(false);
    const [showTotTime, setShowTotTime] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [indexShown, setIndexShown] = useState<boolean>(false);

    //global stored variables
    const dashToShow = useModalStore((state) => state.dashToShow);
    const daySelected = useStore(state => state.daySelected);
    const entriesOTD = useStore(state => state.entriesOTD);

    //global set states
    const setDashToShow = useModalStore((state) => state.setDashToShow);
    const setShowCalendar = useModalStore((state) => state.setShowCalendar);
    const setDaySelected = useStore(state => state.setDaySelected);
    const dashProps = useStore(state => state.dashProps);

    useEffect(() => {
        setLoading(false);
    }, []);


    const handleLoading = () => {
        setLoading(!loading);
    }

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

    const handleDaySelected = async (date: Date) => {
        setLoading(true);
        setDaySelected(date);
        setLoading(false)
    }

    const handleDateIncrease = () => {
        const date = new Date(daySelected);
        date.setDate(date.getDate() + 1);
        handleDaySelected(date);
    }

    const handleDateDecrease = () => {
        const date = new Date(daySelected);
        date.setDate(date.getDate() - 1);
        handleDaySelected(date);
    }

    const transformedDashProps = useStore(state => state.transformedDashProps);

    if (!transformedDashProps) {
        console.log('Error with transformed Props')
    }
    const tracker = transformedDashProps.trackerData;
    const perc = transformedDashProps.percentage;
    const dataSet = transformedDashProps.dataSet;

    const otdLength = entriesOTD as EntriesOTDType[] ? entriesOTD.length as number : 0;
    let newData = perc ? perc.newData as dataType[] : [] as dataType[];
    let daysWithHobbies = tracker ? tracker.daysWithHobbies : [] as number[];
    let newBarData = dataSet ? dataSet.newData as BarData[] : [] as BarData[];
    let newBarDataTwo = dataSet ? dataSet.newDataTwo as BarData[] : [] as BarData[];

    return (
        loading ? (
            <Spinner />
        ) : (
            <MainChild>
                <LogSessionDataInit />
                <DashButtonBoard dashToShow={dashToShow} handleDashToShow={handleDashToShow} indexShown={indexShown} setIndexShown={setIndexShown} adminID={adminBoolTruth} colorMap={dashProps ? dashProps.colorMap : [] as ColorMapType[]} handleDaySelected={handleDaySelected} daySelected={daySelected} />
                <InnerTemplate>
                    {
                        dashToShow === 'calendar' ? (
                            <CalendarView handleDateIncrease={handleDateIncrease} handleDateDecrease={handleDateDecrease} entriesOTD={entriesOTD} adminID={adminBoolTruth} daySelected={daySelected} handleDaySelected={handleDaySelected} otdLength={otdLength} handleCats={handleCats} handleDescriptions={handleDescriptions} handleGoals={handleGoals} handleTotalTime={handleTotalTime} showCats={showCats} showDescriptions={showDescriptions} showGoals={showGoals} showTotTime={showTotTime} />
                        ) :
                            dashToShow === 'stats' &&
                            //enter a month changer here to hold the month value since I'm elevating the state here
                            <StatsView data={newData} barChartData={newBarData} barChartDataTwo={newBarDataTwo} daysWithHobbies={daysWithHobbies} handleLoading={handleLoading} loading={loading} />
                        /** : dashToShow === 'todo' &&
                            <ToDoList adminID={adminBoolTruth} setModalOpen={setModalOpen} handleDateDecrease={handleDateDecrease} handleDateIncrease={handleDateIncrease} dateToUse={daySelected} entriesOTD={entriesOTD} /> */
                    }
                </InnerTemplate>
            </MainChild >
        )
    );
}
