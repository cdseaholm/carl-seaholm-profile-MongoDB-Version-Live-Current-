'use client'

import { IIndexedEntry } from "@/models/types/entry";
import { EntriesOTDType } from "@/models/types/otds";
import CalendarView from "../pagecomponents/dashboard/calendarView";
import DashButtonBoard from "../pagecomponents/dashboard/dashButtonBoard";
import InnerTemplate from "../pagetemplates/innerTemplate/innerTemplate";
import MainChild from "../pagetemplates/mainchild/mainchild";
import StatsView, { dataType } from "../pagecomponents/dashboard/statsView";
import React from "react";
import LogSessionDataInit from "../modals/modalContent/LogSession/logsessiondatainit";
import { ColorMapType } from "@/models/types/colorMap";
import { BarData } from "@/app/actions/statsActions/statActions";
import CalendarModalInit from "../modals/modalContent/Calendar/calendarModalInit";
import { Spinner } from "../misc/Spinner";
import { useStore } from "@/context/dataStore";

export default function DashProvider({ colorMap, daySelected, showCalendar, closeCalendar, adminBoolTruth, handleDaySelected, sessionsFound, dashToShow, handleDashToShow, indexShown, setIndexShown, handleDateIncrease, handleDateDecrease, handleCats, handleDescriptions, handleGoals, handleTotalTime, showCats, showDescriptions, showGoals, showTotTime, loading, handleLoading, entriesOTD }: {
    colorMap: ColorMapType[],
    daySelected: string,
    showCalendar: boolean, closeCalendar: () => void,
    adminBoolTruth: boolean,
    handleDaySelected: (date: string) => void,
    sessionsFound: IIndexedEntry[],
    dashToShow: string,
    handleDashToShow: (dashToShow: string, handleModalOpen: string | null) => void,
    indexShown: boolean,
    setIndexShown: React.Dispatch<React.SetStateAction<boolean>>,
    handleDateIncrease: () => void,
    handleDateDecrease: () => void,
    handleCats: () => void,
    handleDescriptions: () => void,
    handleGoals: () => void,
    handleTotalTime: () => void,
    showCats: boolean,
    showDescriptions: boolean,
    showGoals: boolean,
    showTotTime: boolean,
    loading: boolean,
    handleLoading: () => void,
    entriesOTD: EntriesOTDType[]
}) {

    const transformedDashProps = useStore(state => state.transformedDashProps);
    
    if (!transformedDashProps) {
        console.log('Error with transformed Props')
    }
    const tracker = transformedDashProps.trackerData;
    const perc = transformedDashProps.percentage;
    const dataSet = transformedDashProps.dataSet;

    const otdLength = entriesOTD as EntriesOTDType[] ? entriesOTD.length as number : 0;
    let newData = perc ? perc.newData as dataType[] : [] as dataType[];
    let calData = perc ? perc.calData as dataType[] : [] as dataType[];
    let daysWithHobbies = tracker ? tracker.daysWithHobbies : [] as number[];
    let newBarData = dataSet ? dataSet.newData as BarData[] : [] as BarData[];
    let newBarDataTwo = dataSet ? dataSet.newDataTwo as BarData[] : [] as BarData[];

    return (
        loading ? (
            <Spinner />
        ) : (
            <MainChild>
                <LogSessionDataInit />
                <CalendarModalInit show={showCalendar} closeCalendar={closeCalendar} adminIDBool={adminBoolTruth} handleDaySelected={handleDaySelected} colorMap={colorMap} entries={sessionsFound} data={calData} handleLoading={handleLoading} loading={loading} />
                <DashButtonBoard dashToShow={dashToShow} handleDashToShow={handleDashToShow} indexShown={indexShown} setIndexShown={setIndexShown} adminID={adminBoolTruth} colorMap={colorMap} handleDaySelected={handleDaySelected} daySelected={daySelected} />
                <InnerTemplate>
                    {
                        dashToShow === 'calendar' ? (
                            <CalendarView handleDateIncrease={handleDateIncrease} handleDateDecrease={handleDateDecrease} entriesOTD={entriesOTD} adminID={adminBoolTruth} daySelected={daySelected} handleDaySelected={handleDaySelected} otdLength={otdLength} handleCats={handleCats} handleDescriptions={handleDescriptions} handleGoals={handleGoals} handleTotalTime={handleTotalTime} showCats={showCats} showDescriptions={showDescriptions} showGoals={showGoals} showTotTime={showTotTime} />
                        ) :
                            dashToShow === 'stats' &&
                            //enter a month changer here to hold the month value since I'm elevating the state here
                            <StatsView data={newData} barChartData={newBarData} barChartDataTwo={newBarDataTwo} daysWithHobbies={daysWithHobbies} handleLoading={handleLoading} loading={loading} />
                        /** : dashToShow === 'todo' &&
                            <ToDoList adminID={adminBoolTruth} setModalOpen={setModalOpen} handleDateDecrease={handleDateDecrease} handleDateIncrease={handleDateIncrease} dateToUse={daySelected} entriesOTD={entriesOTD} /> */
                    }
                </InnerTemplate>
            </MainChild >
        )
    );
}
