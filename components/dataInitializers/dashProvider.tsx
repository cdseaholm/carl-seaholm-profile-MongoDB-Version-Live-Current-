'use client'

import { IIndexedEntry } from "@/models/types/entry";
import { EntriesOTDType } from "@/models/types/otds";
import CalendarView from "../pagecomponents/dashboard/calendarView";
import DashButtonBoard from "../pagecomponents/dashboard/dashButtonBoard";
import InnerTemplate from "../pagetemplates/innerTemplate/innerTemplate";
import MainChild from "../pagetemplates/mainchild/mainchild";
import StatsView, { dataType } from "../pagecomponents/dashboard/statsView";
import React, { useEffect, useState } from "react";
import LogSessionDataInit, { newSesh } from "../modals/modalContent/LogSession/logsessiondatainit";
import { ColorMapType } from "@/models/types/colorMap";
import { BarData } from "@/app/actions/statsActions/statActions";
import { PercentageData } from "@/models/types/percentage";
import { TrackerData } from "@/models/types/tracker";
import { DataSets } from "@/models/types/dataSets";
import CalendarModalInit from "../modals/modalContent/Calendar/calendarModalInit";

export default function DashProvider({ colorMap, daySelected, handleDashParams, showCalendar, closeCalendar, adminBoolTruth, handleDaySelected, sessionsFound, dashToShow, handleDashToShow, indexShown, setIndexShown, handleDateIncrease, handleDateDecrease, entriesOTD, handleCats, handleDescriptions, handleGoals, handleTotalTime, showCats, showDescriptions, showGoals, showTotTime, isBreakpoint, loading, handleLoading, keyChange, handleKeyChange, perc, tracker, dataSet }: {
    colorMap: ColorMapType[],
    daySelected: string,
    handleDashParams: (newSessions: newSesh[]) => Promise<void>,
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
    entriesOTD: EntriesOTDType[],
    handleCats: () => void,
    handleDescriptions: () => void,
    handleGoals: () => void,
    handleTotalTime: () => void,
    showCats: boolean,
    showDescriptions: boolean,
    showGoals: boolean,
    showTotTime: boolean,
    isBreakpoint: boolean,
    loading: boolean,
    handleLoading: () => void,
    keyChange: boolean,
    handleKeyChange: () => void,
    perc: PercentageData,
    tracker: TrackerData,
    dataSet: DataSets
}) {

    const [key, setKey] = useState<number>(Math.random());
    const otdLength = entriesOTD as EntriesOTDType[] ? entriesOTD.length as number : 0;
    let newData = perc as PercentageData ? [...perc.newData] as dataType[] : [] as dataType[];
    let calData = perc as PercentageData ? [...perc.calData] as dataType[] : [] as dataType[];
    let daysWithHobbies = tracker as TrackerData ? [...tracker.daysWithHobbies] : [] as number[];
    let monthsNames = dataSet as DataSets ? [...dataSet.monthNames] as string[] : [] as string[];
    let monthColors = dataSet as DataSets ? [...dataSet.monthColors] as string[] : [] as string[];
    let newBarData = dataSet as DataSets ? [...dataSet.newData] as BarData[] : [] as BarData[];
    let newBarDataTwo = dataSet as DataSets ? [...dataSet.newDataTwo] as BarData[] : [] as BarData[];

    useEffect(() => {
        if (keyChange) {
            setKey(Math.random())
        };
        handleKeyChange();
    }, [keyChange, handleKeyChange]);

    return (
        <div className="w-full h-full" key={key}>
            <MainChild>
                <LogSessionDataInit daySelected={daySelected} handleDashParams={handleDashParams} handleLoading={handleLoading} loading={loading} />
                <CalendarModalInit show={showCalendar} closeCalendar={closeCalendar} adminIDBool={adminBoolTruth} handleDaySelected={handleDaySelected} colorMap={colorMap} entries={sessionsFound} data={calData} handleLoading={handleLoading} loading={loading} />
                <DashButtonBoard dashToShow={dashToShow} handleDashToShow={handleDashToShow} indexShown={indexShown} setIndexShown={setIndexShown} adminID={adminBoolTruth} colorMap={colorMap} handleDaySelected={handleDaySelected} daySelected={daySelected} />
                <InnerTemplate>
                    {
                        dashToShow === 'calendar' ? (
                            <CalendarView handleDateIncrease={handleDateIncrease} handleDateDecrease={handleDateDecrease} entriesOTD={entriesOTD} adminID={adminBoolTruth} daySelected={daySelected} handleDaySelected={handleDaySelected} otdLength={otdLength} handleCats={handleCats} handleDescriptions={handleDescriptions} handleGoals={handleGoals} handleTotalTime={handleTotalTime} showCats={showCats} showDescriptions={showDescriptions} showGoals={showGoals} showTotTime={showTotTime} />
                        ) :
                            dashToShow === 'stats' &&
                            //enter a month changer here to hold the month value since I'm elevating the state here
                            <StatsView isBreakpoint={isBreakpoint} data={newData} colorsToChart={monthColors} monthsToChart={monthsNames} barChartData={newBarData} barChartDataTwo={newBarDataTwo} daysWithHobbies={daysWithHobbies} handleLoading={handleLoading} loading={loading} />
                        /** : dashToShow === 'todo' &&
                            <ToDoList adminID={adminBoolTruth} setModalOpen={setModalOpen} handleDateDecrease={handleDateDecrease} handleDateIncrease={handleDateIncrease} dateToUse={daySelected} entriesOTD={entriesOTD} /> */
                    }
                </InnerTemplate>
            </MainChild>
        </div>
    );
}
