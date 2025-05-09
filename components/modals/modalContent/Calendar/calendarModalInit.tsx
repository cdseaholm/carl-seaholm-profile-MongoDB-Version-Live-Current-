'use client'

import { useCallback, useEffect, useRef, useState } from "react";
import React from 'react';
import { IIndexedEntry } from '@/models/types/entry';
import { dataType } from '@/components/pagecomponents/dashboard/statsView';
import CalendarModal from './calendarmodal';
import { Modal } from '@mantine/core';
import { useModalStore } from '@/context/modalStore';
import { useStore } from '@/context/dataStore';
import { useHobbyStore } from "@/context/hobbyStore";

export interface CalEvent {
    allDay: boolean;
    start: string;
    end: string;
    editable: boolean;
    color: string;
}

type numericalColorMap = {
    numOfSessions: number,
    color: string
}

export default function CalendarModalInit() {

    //state
    const [indexOpen, setIndexOpen] = useState<boolean>(false);
    const loadedData = useRef(false);
    const nummericalColorMap = [
        {
            numOfSessions: 1,
            color: 'red'
        },
        {
            numOfSessions: 2,
            color: 'orange'
        },
        {
            numOfSessions: 3,
            color: 'yellow'
        },
        {
            numOfSessions: 4,
            color: 'blue'
        },
        {
            numOfSessions: 5,
            color: 'green'
        }
    ] as numericalColorMap[]
    //context
    const handleDaySelected = useStore(state => state.setDaySelected);
    const setShowCalendar = useModalStore(state => state.setShowCalendar);
    const setDayData = useHobbyStore(state => state.setDayData);
    const setDashToShow = useModalStore(state => state.setDashToShow);
    const setModalOpen = useModalStore(state => state.setModalOpen);
    const showCalendar = useModalStore(state => state.showCalendar);
    const dashProps = useStore((state) => state.dashProps);

    const sessionsFound = dashProps ? dashProps.sessionsFound : [] as IIndexedEntry[];
    const transformedDashProps = useStore(state => state.transformedDashProps);
    const perc = transformedDashProps.percentageByHobbies;
    let calData = perc ? perc.calData as dataType[] : [] as dataType[];

    //functions

    const handleDaySelect = (arg: Date) => {
        const sessionsOnThisDay = sessionsFound.filter((session) => {
            const sessionDate = new Date(session.date);
            return (
                sessionDate.getFullYear() === arg.getFullYear() &&
                sessionDate.getMonth() === arg.getMonth() &&
                sessionDate.getDate() === arg.getDate()
            );
        });

        handleDaySelected(arg);
        setDashToShow('calendar');
        if (sessionsOnThisDay.length < 1) {
            setModalOpen('logsession');
        }
        setShowCalendar(false);
    };

    const hydrateObjects = useCallback(async () => {

        setDayData(calData)

    }, [calData, setDayData]);

    const handleIndexOpen = () => {
        setIndexOpen(!indexOpen);
    }

    useEffect(() => {
        if (showCalendar) {
            if (loadedData.current === false) {
                const initObjects = async () => {
                    await hydrateObjects();
                }
                initObjects();
                loadedData.current = true;
            }
        }
    }, [hydrateObjects, showCalendar]);

    return (
        <Modal.Root opened={showCalendar} onClose={() => setShowCalendar(false)} centered>
            <Modal.Overlay backgroundOpacity={.55} blur={3} className="drop-shadow-xl" />
            <Modal.Content>
                <Modal.Header>
                    <div className="flex flex-row justify-between items-center justify-evenly h-content w-full">
                        <Modal.Title>
                            <p className="font-semibold text-lg underline">
                                Pick a day
                            </p>
                        </Modal.Title>

                        <Modal.CloseButton />
                    </div>
                </Modal.Header>
                <div className='flex flex-col justify-start items-center'>
                    <CalendarModal handleDaySelect={handleDaySelect} />
                    <div className='flex flex-row h-content w-full border-t border-black px-2 justify-between items-start'>
                        <button type="button" onClick={handleIndexOpen} className="py-1 text-blue-500 hover:text-blue-200">
                            {indexOpen ? 'Close Color Index' : 'Open Color Index'}
                        </button>
                        {indexOpen &&
                            <div className={`grid grid-cols-2 grid-rows-2 p-2 scrollbar-thin scrollbar-webkit space-y-1`} style={{ overflow: 'auto' }}>
                                {nummericalColorMap.map((map: numericalColorMap, index: number) => {
                                    const color = map.color;
                                    const numOfSessions = map.numOfSessions;
                                    return (
                                        <React.Fragment key={index}>
                                            <div key={index} className='flex flex-row items-center'>
                                                <div className="h-2 w-2 rounded-full mr-2 border border-black" style={{ backgroundColor: color }} />
                                                <p>{numOfSessions === 5 ? `5+ sessions` : `${numOfSessions} sessions`}</p>
                                            </div>
                                        </React.Fragment>
                                    );
                                })}
                            </div>
                        }
                    </div>
                </div>
            </Modal.Content>
        </Modal.Root>
    )
}