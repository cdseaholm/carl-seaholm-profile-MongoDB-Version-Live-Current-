'use client'

import NavBar from "@/components/nav/Navbar";
import InnerTemplate from "@/components/pagetemplates/innerTemplate/innerTemplate";
import { PieChartCell } from "@mantine/charts";
import { useSession } from "next-auth/react";
import DashHooks from "../hooks/dash-hooks";
import { useDashboardData } from "../hooks/dashboard-data";
import dynamic from "next/dynamic";
import { LoadingOverlay } from "@mantine/core";
import { Tracker } from "./statsView";
import { useEffect } from "react";
import LogSessionDataInit from "@/components/modals/modalContent/LogSession/logsessiondatainit";
import { ISession } from "@/models/types/session";
import NewHobbyFormModal from "@/components/modals/modalContent/AddHobbyTracker/hobbymodaldatainit";
import ColorIndexModal from "@/components/modals/modalContent/ColorIndex/color-index-modal";
import { DateRangeType } from "@/models/types/time-types/date-range";
import { HobbySessionInfo, IHobbyData, MonthlyInfo } from "@/models/types/hobbyData";
import CalendarPicker from "./calendar/calendar-picker";
import DashButtonBoard from "./button-board/dashButtonBoard";


const SessionsView = dynamic(() => import('./session-view'), { ssr: false });
const StatsView = dynamic(() => import('./statsView'), { ssr: false });


export default function DashProvider({ initialDaySelected, dateFilters, perc, barData, barDataTwo, tracker, sessions, hobbySessionInfo, categoriesToSet, titlesToSet, hobbyData, monthInfo }: { initialDaySelected: string, dateFilters: DateRangeType, perc: PieChartCell[], barData: any, barDataTwo: any, tracker: Tracker, sessions: ISession[], hobbySessionInfo: HobbySessionInfo[], categoriesToSet: string[], titlesToSet: string[], hobbyData: IHobbyData[], monthInfo: MonthlyInfo[] }) {
    // Session & Auth
    const { data: session } = useSession();
    const user = session?.user ? session.user : null;
    const email = user?.email ? user.email : '';
    const adminBoolTruth = email === 'cdseaholm@gmail.com';
    const hobbyColorMap = hobbySessionInfo?.map(hobby => {
        return { color: hobby.hobbyData.color, title: hobby.hobbyData.title }
    });

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
        showTotTime,
        dashToShow,
        handleCurrFilteredDates,
        handleCurrFilteredHobbies,
        handleOpenModal,
        modalOpen,
        currDateFilters,
        currHobbyFilters,
        loading,
        handleLoading,
        handleTitles,
        titles,
        daySelected
    } = DashHooks({ titlesToSet, categoriesToSet, initialDaySelected });

    useEffect(() => {
        // This effect runs whenever daySelected changes, allowing you to perform any necessary actions based on the new date.
        console.log("Day selected changed:", daySelected);
        // You can also trigger data fetching or other side effects here if needed.
    }, [daySelected]);

    const { entriesOTD, allHobbies } = useDashboardData({ daySelected: daySelected, sessions: sessions, hobbySessionsInfo: hobbySessionInfo, hobbiesData: hobbyData, filteredHobbies: currHobbyFilters });

    const renderChild = (
        dashToShow === 'sessions' ? (
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
                handleModalOpen={handleOpenModal}
                handleDashToShow={handleDashToShow}
                session={session}
                handleLoading={handleLoading}
            />
        ) : dashToShow === 'stats' ? (
            <StatsView
                hobbyPerc={Array.isArray(perc) ? perc : [] as PieChartCell[]}
                barChartData={Array.isArray(barData) ? barData : [] as { date: string, time: number, color: string }[]}
                barChartDataTwo={Array.isArray(barDataTwo) ? barDataTwo : [] as { date: string, time: number, color: string }[]}
                daysWith={tracker && tracker.numberOfDaysWith !== undefined ? [
                    { name: 'Days with', value: tracker.numberOfDaysWith, color: 'green' },
                    { name: 'Days without', value: tracker.numberOfDaysWithout, color: 'red' }
                ] : [] as PieChartCell[]}
                allHobbies={allHobbies}
                timeFilter={dateFilters}
            />
        ) : dashToShow === 'hobbies' ? (
            <div className="flex items-center justify-center w-full h-full">
                <p className="text-gray-600">Hobbies view coming soon!</p>
            </div>
        ) : dashToShow === 'calendar' ? (
            <CalendarPicker
                monthInfo={monthInfo}
                handleLoading={handleLoading}
                handleDaySelected={handleDaySelected}
                handleDashToShow={handleDashToShow}
                sessions={sessions}
                selectedDay={daySelected}
                handleModalOpen={handleOpenModal}
            />
        ) : null);


    return (
        <div className="flex flex-col justify-start items-center bg-white/30 w-screen h-dvh overflow-hidden">
            <NavBar />
            <DashButtonBoard
                dashToShow={dashToShow}
                handleDashToShow={handleDashToShow}
                adminID={adminBoolTruth}
                handleDaySelected={handleDaySelected}
                daySelected={daySelected}
                handleCurrFilteredDates={handleCurrFilteredDates}
                handleCurrFilteredHobbies={handleCurrFilteredHobbies}
                handleOpenModal={handleOpenModal}
                currDateFilters={currDateFilters}
                currHobbyFilters={currHobbyFilters}
                hobbyData={hobbyData}
            />
            <InnerTemplate>
                {renderChild}
            </InnerTemplate>
            <LoadingOverlay visible={loading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
            {modalOpen === 'logSession' &&
                <LogSessionDataInit handleModalOpen={handleOpenModal} handleLoading={handleLoading} daySelected={daySelected} handleDaySelected={handleDaySelected} sessions={sessions} modalOpen={modalOpen === 'logSession'} hobbySessionInfo={hobbySessionInfo} />
            }
            {modalOpen === 'newHobby' &&
                <NewHobbyFormModal titles={titles} handleTitles={handleTitles} handleModal={handleOpenModal} loading={loading} handleLoading={handleLoading} handleFilteredHobbies={handleCurrFilteredHobbies} handleFilteredDates={handleCurrFilteredDates} openModal={modalOpen === 'newHobby'} />
            }
            {modalOpen === 'colorIndex' &&
                <ColorIndexModal openModal={modalOpen === 'colorIndex'} handleOpenModal={handleOpenModal} hobbyColorMap={hobbyColorMap} />
            }
        </div>
    );
}