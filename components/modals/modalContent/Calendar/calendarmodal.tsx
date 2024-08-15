'use client'

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { DateClickArg } from '@fullcalendar/interaction';
import { useCallback, useEffect, useState } from "react";
import { DateSelectArg, EventClickArg, EventContentArg } from '@fullcalendar/core/index.js';
import React from 'react';
import { Spinner } from '@/components/misc/Spinner';
import { IEntry } from '@/models/types/objectEntry';
import { IUserObject } from '@/models/types/userObject';
import { Session } from 'next-auth';
import { useAlertStore } from '@/context/alertStore';

interface CalEvent {
    allDay: boolean;
    start: string;
    end: string;
    editable: boolean;
    color: string;
}

const CalendarModal = ({ show, closeCalendar, adminIDBool, objectToUse, handleDaySelected, session, objectTitle }: { show: boolean, closeCalendar: () => void, adminIDBool: boolean, objectToUse: IUserObject | null, handleDaySelected: (dateSelected: string) => void, session: Session | null, objectTitle: string }) => {

    //state
    const [objectsInADay, setObjectsInADay] = useState<CalEvent[]>([]);
    const [indexOpen, setIndexOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const setAlertMessage = useAlertStore((state) => state.setAlertMessage);
    const setAlertParent = useAlertStore((state) => state.setAlertParent);
    const setAlertOpen = useAlertStore((state) => state.setShowAlert);

    //functions
    const handleDayClick = async (arg: DateClickArg) => {
        const date = new Date(arg.dateStr + 'T00:00');
        handleDaySelected(date.toLocaleDateString());
        setAlertMessage('Add a new entry for this day? Or view existing objects on this day?');
        setAlertParent('calendar');
        setAlertOpen(true);
        closeCalendar();
    };

    const handleDaySelect = async (arg: DateSelectArg) => {
        const date = new Date(arg.startStr + 'T00:00');
        handleDaySelected(date.toLocaleDateString());
        closeCalendar();
    };

    const handleEventClick = (arg: EventClickArg | EventContentArg) => {
        if (adminIDBool) {
            const date = new Date(arg.event.startStr + 'T00:00');
            handleDaySelected(date.toLocaleDateString());
            closeCalendar();
        }
    }

    const hydrateObjects = useCallback(async () => {
        const uniqueDates = new Set<string>();
        const calEvents = [] as CalEvent[];

        objectToUse?.entries.map((entry: IEntry) => {
            const dateOfEntry = entry.date;
            if (!uniqueDates.has(dateOfEntry)) {

                uniqueDates.add(entry.date);

                const entryDateToAdd = {
                    allDay: true,
                    start: dateOfEntry,
                    end: dateOfEntry,
                    editable: session?.user?.email === process.env.NEXT_PUBLIC_ADMIN_USERNAME ? true : false,
                    color: 'transparent',
                }

                calEvents.push(entryDateToAdd);
            }

        });

        if (calEvents.length === 0) {
            return;
        } else {
            setObjectsInADay(calEvents);
        }
    }, [objectToUse, session]);

    useEffect(() => {
        setLoading(true);
        if (objectToUse === null || objectToUse === undefined) {
            return;
        } else {
            hydrateObjects();
        }
        setLoading(false);
    }, [objectToUse, session, hydrateObjects, setLoading]);

    const colorMap = Array.from(new Set(objectToUse?.entries.map((entry: IEntry) => {
        const color = entry.fields.find(field => field.name === 'color')?.value;
        const title = entry.fields.find(field => field.name === `${objectTitle}Entry`)?.value;
        return JSON.stringify({ color: color, title: title });
    }))).map(color => JSON.parse(color));

    return (
        <div id="crud-modal" tabIndex={-1} aria-hidden={show ? "false" : "true"} className={`${show ? 'flex' : 'hidden'} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full inset-0 h-full max-h-full backdrop-blur-sm`}>
            <div className={`relative p-4 max-h-full`} style={{ width: `95%` }}>
                <div className={`relative bg-white rounded-lg shadow dark:bg-gray-700`}>
                    <div className={`flex items-center justify-between space-x-4 p-2 border-b rounded-t border-gray-400 w-full`}>

                        <h3 className={`text-lg font-semibold text-gray-900 dark:text-white`}>
                            Calendar
                        </h3>
                        <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal" onClick={() => { closeCalendar() }}>
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    {loading ? (
                        <Spinner />
                    ) : (
                        <div className="h-full w-full p-2" style={{ overflow: 'hidden' }}>
                            <FullCalendar
                                plugins={[interactionPlugin, dayGridPlugin]}
                                events={objectsInADay}
                                headerToolbar={{
                                    left: 'index',
                                    center: 'title',
                                    right: 'prev,next'
                                }}
                                customButtons={{
                                    index: {
                                        text: 'Index',
                                        click: () => {
                                            setIndexOpen(!indexOpen);
                                        }
                                    }
                                }}
                                views={{
                                    dayGridPlugin: {
                                        buttonText: 'Month',
                                        buttonTextFormatted: 'Month',
                                        height: 'auto',
                                        expandRows: false,
                                    }
                                }}
                                eventClick={(info) => {
                                    if (adminIDBool) {
                                        handleEventClick(info);
                                    }
                                }}
                                select={(info) => {
                                    if (adminIDBool) {
                                        handleDaySelect(info);
                                    }
                                }}
                                fixedWeekCount={false}
                                contentHeight="auto"
                                eventDisplay="block"
                                dayCellContent={(arg) => {
                                    return (
                                        <div className="flex flex-col justify-center items-center">
                                            <p>{arg.dayNumberText}</p>
                                        </div>
                                    )
                                }}
                                dayMaxEventRows={10}
                                eventContent={(arg) => {
                                    const entriesThisDay = [] as IEntry[];
                                    objectToUse?.entries.map((entry: IEntry) => {
                                        if (entry.date === arg.event.startStr) {
                                            entriesThisDay.push(entry);
                                        }

                                    });
                                    return (
                                        <div className={`flex flex-row items-center flex-wrap`}>
                                            {entriesThisDay.length > 0 && entriesThisDay.slice(0, 6).map((entry: IEntry, index: number) => {
                                                return (
                                                    <div key={index} className="h-2 w-2 rounded-full mr-2 mb-1 border border-slate-500" style={{ backgroundColor: entry.fields.find(field => field.name === 'color')?.value }} onClick={() => handleEventClick(arg)} />
                                                )
                                            })}
                                            {entriesThisDay.length > 6 && <p>{entriesThisDay.length.toString()}+</p>}
                                        </div>
                                    )
                                }}
                                selectable={true}
                                dateClick={(arg) => {
                                    if (adminIDBool) {
                                        handleDayClick(arg);
                                    }
                                }}
                                dayCellClassNames={adminIDBool ? 'cursor-pointer hover:bg-gray-200' : ''}
                            />
                            {indexOpen &&
                                <div className='flex flex-col w-full border border-black rounded-md px-2'>
                                    <div className='flex flex-row justify-between border-b border-black w-full'>
                                        <h1 className=''>
                                            Color Index:
                                        </h1>
                                        <button className='hover:bg-gray-400 px-1 rounded-md' onClick={() => setIndexOpen(false)}>
                                            Close Index
                                        </button>
                                    </div>
                                    <div className={`grid grid-cols-2 grid-rows-2 p-2 scrollbar-thin scrollbar-webkit space-y-1`} style={{ overflow: 'auto' }}>
                                        {colorMap?.map((map: { color: string, title: string }, index: number) => {
                                            const color = map.color;
                                            const title = map.title;
                                            return (
                                                <React.Fragment key={index}>
                                                    <div key={index} className='flex flex-row items-center'>
                                                        <div className="h-2 w-2 rounded-full mr-2 border border-black" style={{ backgroundColor: color }} />
                                                        <p>{title}</p>
                                                    </div>
                                                </React.Fragment>
                                            );
                                        })}
                                    </div>
                                </div>
                            }
                        </div>
                    )}
                </div>
            </div>
        </div>
    )

}

export default CalendarModal;