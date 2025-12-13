'use client'

import { useDataStore } from "@/context/dataStore";
import { useModalStore } from "@/context/modalStore";
import { useState } from "react";


export default function DashHooks() {
    // Local states
    const [showGoals, setShowGoals] = useState(false);
    const [showCats, setShowCats] = useState(false);
    const [showDescriptions, setShowDescriptions] = useState(false);
    const [showTotTime, setShowTotTime] = useState(false);

    // Zustand states
    const setDashToShow = useModalStore((state) => state.setDashToShow);
    const setShowCalendar = useModalStore((state) => state.setShowCalendar);
    const setDaySelected = useDataStore(state => state.setDaySelected);

    // handlers
    const handleGoals = () => setShowGoals(!showGoals);
    const handleCats = () => setShowCats(!showCats);
    const handleDescriptions = () => setShowDescriptions(!showDescriptions);
    const handleTotalTime = () => setShowTotTime(!showTotTime);

    const handleDashToShow = (dashToShow: string, handleModalOpen: string | null) => {
        setDashToShow(dashToShow);
        if (handleModalOpen) {
            setShowCalendar(true);
        }
    };

    const handleDaySelected = (date: string) => {
        setDaySelected(date);
    };

    const handleDateIncrease = () => {
        const date = new Date(useDataStore.getState().daySelected);
        date.setDate(date.getDate() + 1);
        handleDaySelected(date.toLocaleDateString());
    };

    const handleDateDecrease = () => {
        const date = new Date(useDataStore.getState().daySelected);
        date.setDate(date.getDate() - 1);
        handleDaySelected(date.toLocaleDateString());
    };

    return {
        handleDashToShow,
        handleDaySelected,
        handleDateIncrease,
        handleDateDecrease,
        handleGoals,
        handleCats,
        handleDescriptions,
        handleTotalTime,
        showGoals,
        showCats,
        showDescriptions,
        showTotTime,
    };
}