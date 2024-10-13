'use client'

import CalendarModal from "@/components/modals/modalContent/Calendar/calendarmodal"
import InnerTemplate from "@/components/pagetemplates/innerTemplate/innerTemplate"
import MainChild from "@/components/pagetemplates/mainchild/mainchild"
import CalendarView from "./calendarView"
import DashButtonBoard from "./dashButtonBoard"
import StatsMid from "./statsMid"
import ToDoList from "./todolist"
import { IEntry } from "@/models/types/objectEntry"
import { IUserObject } from "@/models/types/userObject"
import { useState, useEffect } from "react"
import { ColorMapType } from "@/models/types/colorMap"

interface DashHubProps {
    showCalendar: boolean
    closeCalendar: () => void
    adminID: boolean
    objectToUse: IUserObject
    handleDaySelected: (date: string) => void
    session: any
    dashToShow: string
    handleDashToShow: (dashToShow: string, handleModalOpen: string | null) => void
    userObjects: IUserObject[]
    handleUserObjectToShow: (index: string) => void
    indexShown: boolean
    setIndexShown: (indexShown: boolean) => void
    handleDateIncrease: () => void
    handleDateDecrease: () => void
    daySelected: string
    totalTime: number[]
    totalCounter: number[]
    thisMonth: number
    setModalOpen: (title: string) => void
}

export default function DashHub({ showCalendar, closeCalendar, adminID, objectToUse, handleDaySelected, session, dashToShow, handleDashToShow, userObjects, handleUserObjectToShow, indexShown, setIndexShown, handleDateIncrease, handleDateDecrease, daySelected, totalTime, totalCounter, thisMonth, setModalOpen }: DashHubProps) {

    const [entriesOTD, setEntriesOTD] = useState<IEntry[]>([]);
    const entries = objectToUse?.entries as IEntry[];

    useEffect(() => {
        if (objectToUse === null || objectToUse === undefined) {
            console.log('no object to use');
            return;
        } else {
            let fieldsToSet = [] as IEntry[];
            entries ? entries.map((entry) => {
                const entryDate = new Date(entry.date).toLocaleDateString();
                const selectedDate = new Date(daySelected).toLocaleDateString();
                if (entryDate === selectedDate) {
                    const oldFields = fieldsToSet;
                    fieldsToSet = [...oldFields, entry];
                }
            }) : [] as IEntry[];
            setEntriesOTD(fieldsToSet);
        }
    }, [objectToUse, daySelected, entries]);

    const colorMap = entries ? Array.from(new Set(entries.map((entry: IEntry) => {
        const color = entry.fields.find(field => field.name === 'color')?.value;
        const title = entry.fields.find(field => field.name === `${objectToUse?.title ? objectToUse.title : ''}Entry`)?.value;
        return JSON.stringify({ color: color, title: title });
    }))).map(color => JSON.parse(color)) as ColorMapType[] : [];


    return (
        <MainChild>
            <CalendarModal show={showCalendar} closeCalendar={closeCalendar} adminIDBool={adminID} objectToUse={objectToUse} handleDaySelected={handleDaySelected} session={session} colorMap={colorMap} />
            <DashButtonBoard dashToShow={dashToShow} handleDashToShow={handleDashToShow} userObjects={userObjects} handleUserObjectToShow={handleUserObjectToShow} indexShown={indexShown} setIndexShown={setIndexShown} adminID={adminID} colorMap={colorMap} />
            <InnerTemplate>
                {
                    dashToShow === 'calendar' ? (
                        <CalendarView handleDateIncrease={handleDateIncrease} handleDateDecrease={handleDateDecrease} entriesOTD={entriesOTD} adminID={adminID} objectTitle={objectToUse?.title ? objectToUse.title : ''} daySelected={daySelected} handleDaySelected={handleDaySelected} />
                    ) :
                        dashToShow === 'stats' ? (
                            //enter a month changer here to hold the month value since I'm elevating the state here
                            <StatsMid objectToUse={objectToUse} totalTime={totalTime} totalCounter={totalCounter} thisMonth={thisMonth} objectTitle={objectToUse?.title ? objectToUse.title : ''} />
                        ) : dashToShow === 'todo' &&
                        <ToDoList adminID={adminID} setModalOpen={setModalOpen} handleDateDecrease={handleDateDecrease} handleDateIncrease={handleDateIncrease} dateToUse={daySelected} entriesOTD={entriesOTD} />
                }
            </InnerTemplate>
        </MainChild>
    )
}