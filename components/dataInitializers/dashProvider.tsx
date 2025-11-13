'use client'

import CalendarView from "../pagecomponents/dashboard/calendarView";
import DashButtonBoard from "../pagecomponents/dashboard/dashButtonBoard";
import InnerTemplate from "../pagetemplates/innerTemplate/innerTemplate";
import MainChild from "../pagetemplates/mainchild/mainchild";
import StatsView from "../pagecomponents/dashboard/statsView";
import React, { useEffect, useState } from "react";
import LogSessionDataInit from "../modals/modalContent/LogSession/logsessiondatainit";
import { Spinner } from "../misc/Spinner";
import { useDataStore } from "@/context/dataStore";
import { useSession } from "next-auth/react";
import { useModalStore } from "@/context/modalStore";
import { PieChartCell } from "@mantine/charts";
import { ISession } from "@/models/types/session";
import { HobbySessionInfo } from "@/utils/apihelpers/get/initData/initDashboardParams";

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
    const daySelected = useDataStore(state => state.daySelected);
    const sessions = useDataStore(state => state.sessions);
    //global stored variables
    const dashToShow = useModalStore((state) => state.dashToShow);
    const hobbySessionsInfo = useDataStore(state => state.hobbySessionInfo) as HobbySessionInfo[];
    const entriesOTD = [] as HobbySessionInfo[];
    hobbySessionsInfo.forEach((hobbySessions: HobbySessionInfo) => {
        const sessionsForDay = sessions.filter((session: ISession) => {
            const sessionDate = new Date(session.date).toLocaleDateString();
            return sessionDate === daySelected
        });
        const sessionsForHobbyForDay = sessionsForDay.filter((session: ISession) => session.hobbyTitle === hobbySessions.hobbyData.title);
        if (sessionsForDay.length > 0) {
            entriesOTD.push({
                ...hobbySessions,
                sessions: sessionsForHobbyForDay
            });
        }
    });
    const otdLength = entriesOTD ? entriesOTD.length : 0;

    //global set states
    const setDashToShow = useModalStore((state) => state.setDashToShow);
    const setShowCalendar = useModalStore((state) => state.setShowCalendar);
    const setDaySelected = useDataStore(state => state.setDaySelected);

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

    const handleDaySelected = async (date: string) => {
        setLoading(true);
        setDaySelected(date);
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

    const perc = useDataStore(state => state.percentagesByHobbies) as PieChartCell[];
    const barData = useDataStore(state => state.barData) as { date: string, time: number, color: string }[];
    const barDataTwo = useDataStore(state => state.barDataTwo) as { date: string, time: number, color: string }[];
    const tracker = useDataStore(state => state.daysWithPieChart) as PieChartCell[];



    return (
        loading ? (
            <Spinner />
        ) : (
            <MainChild>
                <LogSessionDataInit daySelected={daySelected} />
                <DashButtonBoard dashToShow={dashToShow} handleDashToShow={handleDashToShow} adminID={adminBoolTruth} handleDaySelected={handleDaySelected} daySelected={daySelected} />
                <InnerTemplate>
                    {
                        dashToShow === 'calendar' ? (
                            <CalendarView handleDateIncrease={handleDateIncrease} handleDateDecrease={handleDateDecrease} entriesOTD={entriesOTD} adminID={adminBoolTruth} daySelected={daySelected} handleDaySelected={handleDaySelected} otdLength={otdLength} handleCats={handleCats} handleDescriptions={handleDescriptions} handleGoals={handleGoals} handleTotalTime={handleTotalTime} showCats={showCats} showDescriptions={showDescriptions} showGoals={showGoals} showTotTime={showTotTime} />
                        ) :
                            dashToShow === 'stats' &&
                            //enter a month changer here to hold the month value since I'm elevating the state here
                            <StatsView
                                hobbyPerc={Array.isArray(perc) ? perc : []}
                                barChartData={Array.isArray(barData) ? barData : []}
                                barChartDataTwo={Array.isArray(barDataTwo) ? barDataTwo : []}
                                daysWith={Array.isArray(tracker) ? tracker : []}
                                handleLoading={handleLoading}
                                loading={loading}
                            />
                        /** : dashToShow === 'todo' &&
                            <ToDoList adminID={adminBoolTruth} setModalOpen={setModalOpen} handleDateDecrease={handleDateDecrease} handleDateIncrease={handleDateIncrease} dateToUse={daySelected} entriesOTD={entriesOTD} /> */
                    }
                </InnerTemplate>
            </MainChild>
        )
    );
}
