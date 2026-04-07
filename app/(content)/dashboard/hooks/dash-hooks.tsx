'use client'

import { useState, useTransition } from "react";
import { DateRangeType } from "@/models/types/time-types/date-range";
import { HobbyCheckMarkType } from "../components/button-board/left-board/left-board";
import { useRouter } from "next/navigation";
import { PieChartCell } from "@mantine/charts";
import { BarChartDataType } from "@/models/types/dash-types";
import { ISession } from "@/models/types/session";
import InitDashboardProps from "@/utils/apihelpers/get/initData/initDashboardParams";
import { IHobbyData, MonthlyInfo } from "@/models/types/hobbyData";

export default function DashHooks({ titlesToSet, initialDaySelected, percToSet, barDataToSet, barDataTwoToSet, trackerToSet, sessions, hobbyData, mixedMonthlyInfo }: { titlesToSet: string[], initialDaySelected: string, percToSet: PieChartCell[], barDataToSet: BarChartDataType[], barDataTwoToSet: BarChartDataType[], trackerToSet: PieChartCell[], sessions: ISession[], hobbyData: IHobbyData[], mixedMonthlyInfo: MonthlyInfo[] }) {
    const router = useRouter();

    const today = new Date();
    const minusFiveMonths = new Date();
    minusFiveMonths.setMonth(today.getMonth() - 5);

    // State
    const [showGoals, setShowGoals] = useState(false);
    const [showCats, setShowCats] = useState(false);
    const [showDescriptions, setShowDescriptions] = useState(false);
    const [showTotTime, setShowTotTime] = useState(false);
    const [currDateFilters, setCurrDateFilters] = useState<DateRangeType>({
        type: 'range',
        range: [minusFiveMonths, today]
    });
    const [currHobbyFilters, setCurrHobbyFilters] = useState<HobbyCheckMarkType[]>([]);
    const [modalOpen, setModalOpen] = useState<'newHobby' | 'logSession' | 'colorIndex' | null>(null);
    const [loading, setLoading] = useState(false);
    const [titles, setTitles] = useState(titlesToSet);
    const [daySelected, setDaySelected] = useState(initialDaySelected);
    const [isPending, startTransition] = useTransition();

    const [chartData, setChartData] = useState({
        perc: percToSet,        // pass initial server values as params
        barData: barDataToSet,
        barDataTwo: barDataTwoToSet,
        tracker: trackerToSet,
    });

    // Handlers

    const handleDashToShow = (dashToShow: 'hobbies' | 'stats' | 'sessions' | 'calendar') => {
        startTransition(() => {
            if (dashToShow === 'stats') router.push('/dashboard/stats');
            else if (dashToShow === 'sessions') router.push('/dashboard/sessions');
            else if (dashToShow === 'calendar') router.push('/dashboard/calendar');
            else if (dashToShow === 'hobbies') router.push('/dashboard/hobbies');
        });
    };

    const handleDaySelected = (date: string) => {
        setDaySelected(date);
    };

    const handleDateIncrease = () => {
        const currentDate = new Date(daySelected);
        currentDate.setDate(currentDate.getDate() + 1);
        setDaySelected(currentDate.toLocaleDateString());
    };

    const handleDateDecrease = () => {
        const currentDate = new Date(daySelected);
        currentDate.setDate(currentDate.getDate() - 1);
        setDaySelected(currentDate.toLocaleDateString());
    };

    const handleGoals = () => setShowGoals(!showGoals);
    const handleCats = () => setShowCats(!showCats);
    const handleDescriptions = () => setShowDescriptions(!showDescriptions);
    const handleTotalTime = () => setShowTotTime(!showTotTime);
    const handleCurrFilters = async ({ dateFilters, hobbyFilters }: { dateFilters: DateRangeType, hobbyFilters: HobbyCheckMarkType[] }) => {
        setCurrDateFilters(dateFilters);
        setCurrHobbyFilters(hobbyFilters);
        const filteredChartData = await InitDashboardProps({
            sessions: sessions,
            hobbiesData: hobbyData,
            rawMonthlyData: mixedMonthlyInfo.map(info => info.monthInfo),
            hobbyFilters: hobbyFilters,
            dateFilters: dateFilters,
            thisMonth: new Date().getMonth()
        });
        setChartData({
            perc: filteredChartData.percentagesByHobbies,
            barData: filteredChartData.barData,
            barDataTwo: filteredChartData.barDataTwo,
            tracker: filteredChartData.daysWithPie,
        });
    };
    const handleOpenModal = (modal: 'newHobby' | 'logSession' | 'colorIndex' | null) => setModalOpen(modal);
    const handleLoading = (loading: boolean) => setLoading(loading);
    const handleTitles = (titles: string[]) => setTitles(titles);
    const loadingState = isPending || loading;

    return {
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
        showTotTime,
        handleCurrFilters,
        handleOpenModal,
        modalOpen,
        currDateFilters,
        currHobbyFilters,
        loadingState,
        handleLoading,
        handleTitles,
        titles,
        daySelected,
        chartData
    };
}