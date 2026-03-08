'use client'

import { useState } from "react";
import { HobbyCheckMarkType } from "../components/button-board/left-board/left-board";
import { DateRangeType } from "@/models/types/time-types/date-range";


export default function DashHooks({ titlesToSet, categoriesToSet, initialDaySelected }: { titlesToSet: string[], categoriesToSet: string[], initialDaySelected: string }) {
    // Local states
    const [loading, setLoading] = useState(false);
    const [showGoals, setShowGoals] = useState(false);
    const [showCats, setShowCats] = useState(false);
    const [showDescriptions, setShowDescriptions] = useState(false);
    const [showTotTime, setShowTotTime] = useState(false);
    const [dashToShow, setDashToShow] = useState<'sessions' | 'stats' | 'hobbies' | 'calendar'>('stats');
    const [daySelected, setDaySelected] = useState(initialDaySelected || new Date().toLocaleDateString());
    const [currDateFilters, setCurrDateFilters] = useState<DateRangeType>({ type: 'range', range: [null, null] });
    const [currHobbyFilters, setCurrHobbyFilters] = useState<HobbyCheckMarkType[]>([] as HobbyCheckMarkType[]);
    const [modalOpen, setModalOpen] = useState<'newHobby' | 'logSession' | 'colorIndex' | null>(null);
    const [titles, setTitles] = useState<string[]>(titlesToSet);
    const [categories, setCategories] = useState<string[]>(categoriesToSet);

    // handlers
    const handleGoals = () => setShowGoals(!showGoals);
    const handleCats = () => setShowCats(!showCats);
    const handleDescriptions = () => setShowDescriptions(!showDescriptions);
    const handleTotalTime = () => setShowTotTime(!showTotTime);

    const handleDashToShow = (dashToShow: 'hobbies' | 'stats' | 'sessions' | 'calendar') => {
        setDashToShow(dashToShow);
        setLoading(false);
    };

    const handleDaySelected = (date: string) => {
        setDaySelected(date);
    };

    const handleDateIncrease = () => {
        const date = new Date(daySelected);
        date.setDate(date.getDate() + 1);
        handleDaySelected(date.toLocaleDateString());
    };

    const handleDateDecrease = () => {
        const date = new Date(daySelected);
        date.setDate(date.getDate() - 1);
        handleDaySelected(date.toLocaleDateString());
    };

    const handleCurrFilteredDates = (filters: DateRangeType) => {
        setCurrDateFilters(filters);
        setLoading(false);
    };

    const handleCurrFilteredHobbies = (hobbies: HobbyCheckMarkType[]) => {
        setCurrHobbyFilters(hobbies);
        setLoading(false);
    };

    const handleOpenModal = (modal: 'newHobby' | 'logSession' | 'colorIndex' | null) => {
        setModalOpen(modal);
        setLoading(false);
    }

    const handleLoading = (loading: boolean) => {
        setLoading(loading);
    }

    const handleTitles = (titles: string[]) => {
        setTitles(titles);
    }

    const handleCategories = (categories: string[]) => {
        setCategories(categories);
    }

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
        daySelected,
        dashToShow,
        handleCurrFilteredDates,
        handleCurrFilteredHobbies,
        handleOpenModal,
        currDateFilters,
        currHobbyFilters,
        modalOpen,
        loading,
        handleLoading,
        titles,
        handleTitles,
        categories,
        handleCategories
    };
}

{/**
    
    handleDayData from Date-Picker is using PercentageType[] and I can't see where zustand was supplying dayData too, so removing for now until I find a better spot
    */}