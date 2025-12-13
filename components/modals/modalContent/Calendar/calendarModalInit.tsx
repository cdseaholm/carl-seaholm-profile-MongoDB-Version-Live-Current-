'use client'

import { useCallback, useEffect, useRef, useState } from "react";
import React from 'react';
import CalendarModal from './calendarmodal';
import { Modal } from '@mantine/core';
import { useModalStore } from '@/context/modalStore';
import { useDataStore } from '@/context/dataStore';
import { useHobbyStore } from "@/context/hobbyStore";
import { useStateStore } from "@/context/stateStore";
import { CalendarColors, JanColors } from "@/models/types/calColorInfo";
import { useSession } from "next-auth/react";

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
    //context state
    const showCalendar = useModalStore(state => state.showCalendar);
    //state
    const [indexOpen, setIndexOpen] = useState<boolean>(false);
    const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
    const handleGlobalLoading = useStateStore(state => state.setGlobalLoading);
    const { data: session } = useSession();
    const user = session?.user ? session.user : null;
    const email = user?.email ? user.email : '';
    const adminOrNot = email === 'cdseaholm@gmail.com' ? true : false;
    const loadedData = useRef(false);
    const monthInfo = useDataStore(state => state.monthlyInfoCounts);
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
    const handleDaySelected = useDataStore(state => state.setDaySelected);
    const setShowCalendar = useModalStore(state => state.setShowCalendar);
    const setDayData = useHobbyStore(state => state.setDayData);
    const setDashToShow = useModalStore(state => state.setDashToShow);
    const setLogSessionModalOpen = useModalStore((state) => state.setLogSessionModalOpen);
    const [thisMonthsColors, setThisMonthsColors] = useState<CalendarColors>(JanColors);
    const sessions = useDataStore(state => state.sessions);
    const calData = useDataStore.getState().percentagesByHobbies;

    //functions

    const handleMonthChange = async (month: Date) => {
        // const monthIndex = month.getMonth() + 1;
        // Only update if the month actually changed

        setCurrentMonth(month);
        const color = monthInfo.find(m => m.monthInfo.month === month.getMonth())?.monthInfo.monthColorInfo;
        if (!color) {
            setThisMonthsColors(JanColors);
        } else {
            setThisMonthsColors(color);
        }

    };

    const setNewDay = async (arg: Date) => {
        handleDaySelected(arg.toLocaleDateString());
        setDashToShow('calendar');
    }

    const handleDaySelect = async (arg: Date) => {
        handleGlobalLoading(true);
        const sessionsOnThisDay = sessions.filter((session) => {
            const sessionDate = new Date(session.date);
            return (
                sessionDate.getFullYear() === arg.getFullYear() &&
                sessionDate.getMonth() === arg.getMonth() &&
                sessionDate.getDate() === arg.getDate()
            );
        });
        await setNewDay(arg);
        handleGlobalLoading(false);
        if (sessionsOnThisDay.length < 1 && adminOrNot) {
            setLogSessionModalOpen(true)
        }
        setShowCalendar(false);
    };

    const hydrateObjects = useCallback(async () => {
        setDayData(calData)
        // Use currentMonth instead of thisMonth for initial load
        const month = currentMonth.getMonth();
        const color = monthInfo.find(m => m.monthInfo.month === month)?.monthInfo.monthColorInfo;
        if (!color) {
            setThisMonthsColors(JanColors);
        } else {
            setThisMonthsColors(color);
        }

    }, [calData, setDayData, currentMonth, monthInfo]);

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
        <Modal.Root opened={showCalendar} onClose={() => setShowCalendar(false)} centered size={'85%'} padding={0} closeOnClickOutside closeOnEscape>
            <Modal.Overlay backgroundOpacity={.55} blur={3} className="drop-shadow-xl" />
            <Modal.Content
                w={'100%'}
                h={'85vh'}
                style={{
                    maxHeight: '85vh',
                    overflow: 'hidden',
                    margin: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <Modal.Header bg={thisMonthsColors.monthColor} >
                    <div className="flex flex-row justify-between items-center justify-evenly h-content w-full px-4 py-2 border-b border-black">
                        <Modal.Title>
                            <p className="font-semibold text-lg underline">
                                Pick a day
                            </p>
                        </Modal.Title>
                        <Modal.CloseButton styles={{ close: { color: 'black', hover: { backgroundColor: 'rgba(0,0,0,0.1)' } } }} />
                    </div>
                </Modal.Header>
                <Modal.Body className="flex flex-col h-full p-0" style={{ height: 'calc(100% - 60px)', overflow: 'hidden', backgroundColor: thisMonthsColors.monthColor }}>
                    <div className='flex-1 flex flex-col justify-center items-center p-2 min-h-0'>
                        <CalendarModal
                            handleDaySelect={handleDaySelect}
                            monthColors={thisMonthsColors}
                            onMonthChange={handleMonthChange}
                        />
                    </div>
                    <div className='flex-shrink-0 flex flex-row h-auto w-full border-t border-black px-4 py-2 justify-between items-center' style={{ backgroundColor: thisMonthsColors.monthColor }}>
                        <button type="button" onClick={handleIndexOpen} className="py-1 text-blue-800 hover:text-blue-200 text-sm">
                            {indexOpen ? 'Close Color Index' : 'Open Color Index'}
                        </button>
                        {indexOpen &&
                            <div className={`grid grid-cols-2 gap-2 p-2`}>
                                {nummericalColorMap.map((map: numericalColorMap, index: number) => {
                                    const color = map.color;
                                    const numOfSessions = map.numOfSessions;
                                    return (
                                        <div key={index} className='flex flex-row items-center'>
                                            <div className="h-2 w-2 rounded-full mr-2 border border-black" style={{ backgroundColor: color }} />
                                            <p className="text-xs">{numOfSessions === 5 ? `5+ sessions` : `${numOfSessions} sessions`}</p>
                                        </div>
                                    );
                                })}
                            </div>
                        }
                    </div>
                </Modal.Body>
            </Modal.Content>
        </Modal.Root>
    )
}