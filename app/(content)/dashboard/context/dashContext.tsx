'use client'

import { createContext, useContext } from 'react';
import { ISession } from "@/models/types/session";
import { IHobbyData } from "@/models/types/hobbyData";
import { DateRangeType } from "@/models/types/time-types/date-range";
import { IMonthlyData } from "@/models/types/monthlyData";

export type HobbySessionGroup = {
  hobbyData: IHobbyData;
  sessions: ISession[];
};

interface DashContextType {
    dashToShow: 'hobbies' | 'stats' | 'sessions' | 'calendar';
    handleDashToShow: (dashToShow: 'hobbies' | 'stats' | 'sessions' | 'calendar') => void;
    daySelected: string;
    handleDaySelected: (date: string) => void;
    handleDateIncrease: () => void;
    handleDateDecrease: () => void;
    currDateFilters: DateRangeType;
    handleCurrFilters: ({ dateFilters, hobbyFilters }: { dateFilters: DateRangeType, hobbyFilters: { _id: string; title: string }[] }) => Promise<void>;
    currHobbyFilters: { _id: string; title: string }[];
    modalOpen: 'newHobby' | 'logSession' | 'colorIndex' | null;
    handleOpenModal: (modal: 'newHobby' | 'logSession' | 'colorIndex' | null) => void;
    loadingState: boolean;
    handleLoading: (loading: boolean) => void;
    showCats: boolean;
    showDescriptions: boolean;
    showGoals: boolean;
    showTotTime: boolean;
    handleCats: () => void;
    handleDescriptions: () => void;
    handleGoals: () => void;
    handleTotalTime: () => void;
    titles: string[];
    handleTitles: (titles: string[]) => void;
    sessions: ISession[];
    hobbyData: IHobbyData[];
    categoriesToSet: string[];
    titlesToSet: string[];
    adminID: boolean;
    rawMonthlyData: IMonthlyData[];
}

const DashContext = createContext<DashContextType | undefined>(undefined);

export const useDash = () => {
    const context = useContext(DashContext);
    if (!context) {
        throw new Error('useDash must be used within DashProvider');
    }
    return context;
};

export default DashContext;