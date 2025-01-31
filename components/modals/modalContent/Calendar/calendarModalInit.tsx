'use client'

import { DateClickArg } from '@fullcalendar/interaction';
import { useCallback, useEffect, useState } from "react";
import { DateSelectArg, EventClickArg, EventContentArg } from '@fullcalendar/core/index.js';
import React from 'react';
import { IIndexedEntry } from '@/models/types/entry';
import { ColorMapType } from '@/models/types/colorMap';
import { dataType } from '@/components/pagecomponents/dashboard/statsView';
import CalendarModal from './calendarmodal';
import { Spinner } from '@/components/misc/Spinner';
import { modals } from '@mantine/modals';
import { Text } from '@mantine/core';
import { toast } from 'sonner';
import { useModalStore } from '@/context/modalStore';

export interface CalEvent {
    allDay: boolean;
    start: string;
    end: string;
    editable: boolean;
    color: string;
}

export default function CalendarModalInit({ show, closeCalendar, adminIDBool, handleDaySelected, colorMap, entries, data, loading, handleLoading }: { show: boolean, closeCalendar: () => void, adminIDBool: boolean, handleDaySelected: (dateSelected: string) => void, colorMap: ColorMapType[], entries: IIndexedEntry[], data: dataType[], loading: boolean, handleLoading: () => void }) {

    //state
    const [objectsInADay, setObjectsInADay] = useState<CalEvent[]>([]);
    const [indexOpen, setIndexOpen] = useState<boolean>(false);
    const setModalOpen = useModalStore((state) => state.setModalOpen);
    const setDashToShow = useModalStore((state) => state.setDashToShow);

    //functions
    const handleDayClick = (arg: DateClickArg) => {
        const date = new Date(arg.dateStr + 'T00:00');
        handleDaySelected(date.toLocaleDateString());
        modals.openConfirmModal({
            title: 'Please confirm',
            children: (
                <Text size="sm">
                    Do you want to add sessions to this date or just view sessions done on this day?
                </Text>
            ),
            labels: { confirm: 'Add a session', cancel: 'View day' },
            onCancel: () => toast.info('Viewing date'),
            onConfirm: () => {
                setDashToShow('calendar');
                setModalOpen('logsession');
            },
        });
        closeCalendar();
    };

    const handleDaySelect = (arg: DateSelectArg) => {
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

        if (!entries) {
            return;
        }

        entries.map((entry: IIndexedEntry) => {
            if (entry) {
                const dateOfEntry = entry.date;
                if (!uniqueDates.has(dateOfEntry) && dateOfEntry) {

                    uniqueDates.add(dateOfEntry);

                    const entryDateToAdd = {
                        allDay: true,
                        start: dateOfEntry,
                        end: dateOfEntry,
                        editable: adminIDBool,
                        color: 'transparent',
                    }

                    calEvents.push(entryDateToAdd);
                }
            }
        });

        if (!calEvents) {
            return;
        }

        setObjectsInADay(calEvents);

    }, [entries, adminIDBool]);

    const handleIndexOpen = () => {
        setIndexOpen(!indexOpen);
    }

    useEffect(() => {
        const initObjects = async () => {
            await hydrateObjects();
        }

        initObjects();
        if (loading) {
            handleLoading();
        }
    }, [loading, handleLoading, hydrateObjects]);

    return (
        <div id="crud-modal" tabIndex={-1} aria-hidden={!show} className={`${show ? 'flex' : 'hidden'} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full inset-0 h-full max-h-full backdrop-blur-sm`}>
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
                        <CalendarModal adminIDBool={adminIDBool} colorMap={colorMap} data={data} handleIndexOpen={handleIndexOpen} handleDaySelect={handleDaySelect} handleEventClick={handleEventClick} handleDayClick={handleDayClick} indexOpen={indexOpen} objectsInADay={objectsInADay} />
                    )}
                </div>
            </div>
        </div>
    )

}