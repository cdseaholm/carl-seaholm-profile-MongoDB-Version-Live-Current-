'use client'

import NavBar from "@/components/nav/Navbar";
import InnerTemplate from "@/components/pagetemplates/innerTemplate/innerTemplate";
import { useSession } from "next-auth/react";
import DashHooks from "../hooks/dash-hooks";
import { LoadingOverlay } from "@mantine/core";
import { useMemo } from "react";
import LogSessionDataInit from "@/components/modals/modalContent/LogSession/logsessiondatainit";
import { ISession } from "@/models/types/session";
import NewHobbyFormModal from "@/components/modals/modalContent/AddHobbyTracker/hobbymodaldatainit";
import ColorIndexModal from "@/components/modals/modalContent/ColorIndex/color-index-modal";
import { IHobbyData } from "@/models/types/hobbyData";
import DashButtonBoard from "./button-board/dashButtonBoard";
import { usePathname } from "next/navigation";
import DashContext from "../context/dashContext";
import { IMonthlyData } from "@/models/types/monthlyData";

export default function DashboardProvider({
    initialDaySelected,
    sessions,
    categoriesToSet,
    titlesToSet,
    hobbyData,
    children,
    rawMonthlyData
}: {
    initialDaySelected: string;
    sessions: ISession[];
    categoriesToSet: string[];
    titlesToSet: string[];
    hobbyData: IHobbyData[];
    children: React.ReactNode;
    rawMonthlyData: IMonthlyData[];
}) {
    const { data: session } = useSession();
    const pathname = usePathname();
    const user = session?.user || null;
    const email = user?.email || '';
    const adminID = email === 'cdseaholm@gmail.com';

    const hobbyColorMap = useMemo(() => {
        return hobbyData.map((hobby) => ({
            color: hobby.color,
            title: hobby.title,
        }));
    }, [hobbyData]);

    const dashState = DashHooks({ titlesToSet, initialDaySelected });

    const currentView: 'hobbies' | 'stats' | 'sessions' | 'calendar' = pathname.includes('/stats') ? 'stats'
        : pathname.includes('/sessions') ? 'sessions'
            : pathname.includes('/calendar') ? 'calendar'
                : 'hobbies';

    const contextValue = useMemo(() => ({
        ...dashState,
        dashToShow: currentView,
        sessions, 
        hobbyData,
        rawMonthlyData,
        categoriesToSet,
        titlesToSet,
        adminID,
    }), [
        dashState,
        currentView,
        sessions,
        hobbyData,
        rawMonthlyData,
        categoriesToSet,
        titlesToSet,
        adminID,
    ]);

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
                    handleCurrFilters={dashState.handleCurrFilters}
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
                        hobbyData={hobbyData}
                    />
                )}

                {dashState.modalOpen === 'newHobby' && (
                    <NewHobbyFormModal
                        titles={dashState.titles}
                        handleTitles={dashState.handleTitles}
                        handleModal={dashState.handleOpenModal}
                        loading={dashState.loadingState}
                        handleLoading={dashState.handleLoading}
                        handleCurrFilters={dashState.handleCurrFilters}
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