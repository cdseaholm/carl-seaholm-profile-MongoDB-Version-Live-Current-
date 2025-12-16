'use client'

import NavBar from "@/components/nav/Navbar";
import InnerTemplate from "@/components/pagetemplates/innerTemplate/innerTemplate";
import { useDataStore } from "@/context/dataStore";
import { useModalStore } from "@/context/modalStore";
import { useStateStore } from "@/context/stateStore";
import { useUserStore } from "@/context/userStore";
import InitDashboardProps from "@/utils/apihelpers/get/initData/initDashboardParams";
import { PieChartCell } from "@mantine/charts";
import { useSession } from "next-auth/react";
import { useRef, useState, useEffect } from "react";
import LoadingSpinner from "../../projects/school/infoVis-DatasetProject/components/components/misc/loadingSpinner";
import DashHooks from "../hooks/dash-hooks";
import { useDashboardData } from "../hooks/dashboard-data";
import DashButtonBoard from "./button-board/dashButtonBoard";
import SessionsView from "./calendarView";
import StatsView from "./statsView";




export default function DashProvider() {
    // Session & Auth
    const { data: session } = useSession();
    const user = session?.user ? session.user : null;
    const email = user?.email ? user.email : '';
    const adminBoolTruth = email === 'cdseaholm@gmail.com';

    // Local States
    const initialized = useRef(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Zustand states
    const globalLoading = useStateStore(state => state.globalLoading);
    const dashToShow = useModalStore(state => state.dashToShow);
    const daySelected = useDataStore(state => state.daySelected);
    const sessions = useDataStore(state => state.sessions);
    const hobbyData = useDataStore(state => state.hobbyData);
    const monthlyData = useDataStore(state => state.monthlyData);
    const userInfo = useUserStore(state => state.userInfo);
    const hobbyFilters = useDataStore(state => state.filteredHobbies);
    const dateFilters = useDataStore(state => state.filteredDates);
    const perc = useDataStore(state => state.percentagesByHobbies) as PieChartCell[];
    const barData = useDataStore(state => state.barData);
    const barDataTwo = useDataStore(state => state.barDataTwo);
    const tracker = useDataStore(state => state.daysWithPieChart);

    // Custom hooks
    const { 
        handleDashToShow, 
        handleDaySelected, 
        handleDateIncrease, 
        handleDateDecrease, 
        handleGoals, 
        handleCats, 
        handleDescriptions, 
        handleTotalTime, 
        showCats, 
        showDescriptions, 
        showGoals, 
        showTotTime 
    } = DashHooks();

    const { entriesOTD, allHobbies } = useDashboardData(daySelected);

    useEffect(() => {
        const initDashboard = async () => {
            if (globalLoading) {
                console.log('Waiting for base data to load...');
                return;
            }

            if (!initialized.current) {
                setLoading(true);
                const result = await InitDashboardProps({
                    userInfo,
                    sessions,
                    hobbiesData: hobbyData,
                    monthlyInfo: monthlyData,
                    hobbyFilters,
                    dateFilters
                });

                if (result?.status) {
                    initialized.current = true;
                } else {
                    console.error('Dashboard initialization failed:', result?.message);
                    setError(result?.message || 'Unknown error');
                }
                setLoading(false);
            } else {
                setLoading(true);
                const result = await InitDashboardProps({
                    userInfo,
                    sessions,
                    hobbiesData: hobbyData,
                    monthlyInfo: monthlyData,
                    hobbyFilters,
                    dateFilters
                });

                if (result?.status) {
                    console.log('Dashboard re-initialized successfully');
                } else {
                    console.error('Dashboard re-initialization failed:', result?.message);
                    setError(result?.message || 'Unknown error');
                }
                setLoading(false);
            }
        };

        initDashboard();
    }, [globalLoading, sessions.length, hobbyData.length, monthlyData.length, hobbyFilters, dateFilters, userInfo, hobbyData, monthlyData, sessions]);

    if (globalLoading) {
        return <div className="flex items-center justify-center w-full h-full" />;
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center w-full h-full">
                <LoadingSpinner />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center w-full h-full">
                <p className="text-red-500">Error: {error}</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col justify-start items-center bg-white/30 w-screen h-dvh overflow-hidden">
            <NavBar />
            <DashButtonBoard 
                dashToShow={dashToShow} 
                handleDashToShow={handleDashToShow} 
                adminID={adminBoolTruth} 
                handleDaySelected={handleDaySelected} 
                daySelected={daySelected} 
            />
            <InnerTemplate>
                {dashToShow === 'sessions' ? (
                    <SessionsView 
                        handleDateIncrease={handleDateIncrease} 
                        handleDateDecrease={handleDateDecrease} 
                        entriesOTD={entriesOTD} 
                        adminID={adminBoolTruth} 
                        daySelected={daySelected} 
                        handleDaySelected={handleDaySelected} 
                        handleCats={handleCats} 
                        handleDescriptions={handleDescriptions} 
                        handleGoals={handleGoals} 
                        handleTotalTime={handleTotalTime} 
                        showCats={showCats} 
                        showDescriptions={showDescriptions} 
                        showGoals={showGoals} 
                        showTotTime={showTotTime} 
                    />
                ) : dashToShow === 'stats' ? (
                    <StatsView
                        hobbyPerc={Array.isArray(perc) ? perc : []}
                        barChartData={Array.isArray(barData) ? barData : []}
                        barChartDataTwo={Array.isArray(barDataTwo) ? barDataTwo : []}
                        daysWith={Array.isArray(tracker) ? tracker : []}
                        allHobbies={allHobbies}
                        timeFilter={dateFilters}
                    />
                ) : dashToShow === 'hobbies' ? (
                    <div className="flex items-center justify-center w-full h-full">
                        <p className="text-gray-600">Hobbies view coming soon!</p>
                    </div>
                ) : null}
            </InnerTemplate>
        </div>
    );
}