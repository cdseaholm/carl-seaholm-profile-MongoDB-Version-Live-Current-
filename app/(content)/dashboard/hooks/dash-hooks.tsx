'use client'

import { useState, useTransition } from "react";
import { DateRangeType } from "@/models/types/time-types/date-range";
import { HobbyCheckMarkType } from "../components/button-board/left-board/left-board";
import { useRouter } from "next/navigation";

export default function DashHooks({ titlesToSet, initialDaySelected }: { titlesToSet: string[], initialDaySelected: string }) {
    const router = useRouter();

    // State
    const [showGoals, setShowGoals] = useState(false);
    const [showCats, setShowCats] = useState(false);
    const [showDescriptions, setShowDescriptions] = useState(false);
    const [showTotTime, setShowTotTime] = useState(false);
    const [currDateFilters, setCurrDateFilters] = useState<DateRangeType>({ type: 'range', range: [null, null] });
    const [currHobbyFilters, setCurrHobbyFilters] = useState<HobbyCheckMarkType[]>([]);
    const [modalOpen, setModalOpen] = useState<'newHobby' | 'logSession' | 'colorIndex' | null>(null);
    const [loading, setLoading] = useState(false);
    const [titles, setTitles] = useState(titlesToSet);
    const [daySelected, setDaySelected] = useState(initialDaySelected);
    const [isPending, startTransition] = useTransition();

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
    const handleCurrFilteredDates = (filters: DateRangeType) => setCurrDateFilters(filters);
    const handleCurrFilteredHobbies = (hobbies: HobbyCheckMarkType[]) => setCurrHobbyFilters(hobbies);
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
        handleCurrFilteredDates,
        handleCurrFilteredHobbies,
        handleOpenModal,
        modalOpen,
        currDateFilters,
        currHobbyFilters,
        loadingState,
        handleLoading,
        handleTitles,
        titles,
        daySelected
    };
}