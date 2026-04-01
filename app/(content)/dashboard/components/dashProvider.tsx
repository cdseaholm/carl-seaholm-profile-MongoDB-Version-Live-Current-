'use client'

import NavBar from "@/components/nav/Navbar";
import InnerTemplate from "@/components/pagetemplates/innerTemplate/innerTemplate";
import { PieChartCell } from "@mantine/charts";
import { useSession } from "next-auth/react";
import DashHooks from "../hooks/dash-hooks";
import { LoadingOverlay } from "@mantine/core";
import { useMemo } from "react";
import LogSessionDataInit from "@/components/modals/modalContent/LogSession/logsessiondatainit";
import { ISession } from "@/models/types/session";
import NewHobbyFormModal from "@/components/modals/modalContent/AddHobbyTracker/hobbymodaldatainit";
import ColorIndexModal from "@/components/modals/modalContent/ColorIndex/color-index-modal";
import { HobbySessionInfo, IHobbyData, MonthlyInfo } from "@/models/types/hobbyData";
import DashButtonBoard from "./button-board/dashButtonBoard";
import { usePathname } from "next/navigation";
import DashContext from "../context/dashContext";

export default function DashboardProvider({ 
    initialDaySelected,
    perc, 
    barData, 
    barDataTwo, 
    tracker, 
    sessions, 
    hobbySessionInfo, 
    categoriesToSet, 
    titlesToSet, 
    hobbyData, 
    monthInfo, 
    children 
}: { 
    initialDaySelected: string;
    perc: PieChartCell[];
    barData: any;
    barDataTwo: any;
    tracker: PieChartCell[];
    sessions: ISession[];
    hobbySessionInfo: HobbySessionInfo[];
    categoriesToSet: string[];
    titlesToSet: string[];
    hobbyData: IHobbyData[];
    monthInfo: MonthlyInfo[];
    children: React.ReactNode;
}) {
    const { data: session } = useSession();
    const pathname = usePathname();
    const user = session?.user || null;
    const email = user?.email || '';
    const adminID = email === 'cdseaholm@gmail.com';

    const hobbyColorMap = useMemo(() => 
        hobbySessionInfo?.map(hobby => ({
            color: hobby.hobbyData.color,
            title: hobby.hobbyData.title
        })) || [], 
        [hobbySessionInfo]
    );

    const dashState = DashHooks({ titlesToSet, initialDaySelected });

    const currentView: 'hobbies' | 'stats' | 'sessions' | 'calendar' = pathname.includes('/stats') ? 'stats' 
        : pathname.includes('/sessions') ? 'sessions' 
        : pathname.includes('/calendar') ? 'calendar' 
        : 'hobbies';

    const contextValue = useMemo(() => ({
        ...dashState,
        dashToShow: currentView,
        sessions,
        hobbySessionInfo,
        hobbyData,
        monthInfo,
        perc,
        barData,
        barDataTwo,
        tracker,
        categoriesToSet,
        titlesToSet,
        adminID,
    }), [dashState, currentView, sessions, hobbySessionInfo, hobbyData, monthInfo, perc, barData, barDataTwo, tracker, categoriesToSet, titlesToSet, adminID]);

    console.log('Loading: ', dashState.loadingState);
    return (
        <DashContext.Provider value={contextValue}>
            <LoadingOverlay visible={dashState.loadingState} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
            <div className="flex flex-col justify-start items-center bg-white/30 w-screen h-dvh overflow-hidden">
                <NavBar />
                <DashButtonBoard
                    dashToShow={currentView}
                    handleDashToShow={dashState.handleDashToShow}
                    adminID={adminID}
                    handleDaySelected={dashState.handleDaySelected}
                    daySelected={dashState.daySelected}
                    handleCurrFilteredDates={dashState.handleCurrFilteredDates}
                    handleCurrFilteredHobbies={dashState.handleCurrFilteredHobbies}
                    handleOpenModal={dashState.handleOpenModal}
                    currDateFilters={dashState.currDateFilters}
                    currHobbyFilters={dashState.currHobbyFilters}
                    hobbyData={hobbyData}
                />
                <InnerTemplate>
                    {children}
                </InnerTemplate>
                
                {dashState.modalOpen === 'logSession' && (
                    <LogSessionDataInit 
                        handleModalOpen={dashState.handleOpenModal}
                        handleLoading={dashState.handleLoading}
                        daySelected={dashState.daySelected}
                        handleDaySelected={dashState.handleDaySelected}
                        sessions={sessions}
                        modalOpen={true}
                        hobbySessionInfo={hobbySessionInfo}
                    />
                )}
                
                {dashState.modalOpen === 'newHobby' && (
                    <NewHobbyFormModal 
                        titles={dashState.titles}
                        handleTitles={dashState.handleTitles}
                        handleModal={dashState.handleOpenModal}
                        loading={dashState.loadingState}
                        handleLoading={dashState.handleLoading}
                        handleFilteredHobbies={dashState.handleCurrFilteredHobbies}
                        handleFilteredDates={dashState.handleCurrFilteredDates}
                        openModal={true}
                    />
                )}
                
                {dashState.modalOpen === 'colorIndex' && (
                    <ColorIndexModal 
                        openModal={true}
                        handleOpenModal={dashState.handleOpenModal}
                        hobbyColorMap={hobbyColorMap}
                    />
                )}
            </div>
        </DashContext.Provider>
    );
}