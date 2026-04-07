'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import React from 'react';
import { CalendarColors, JanColors } from "@/models/types/calColorInfo";
import { useSession } from "next-auth/react";
import CalendarCore from "./calendar-core";
import { useDash } from "../../context/dashContext";

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

export default function CalendarPicker() {

    const {
        daySelected,
        sessions,
        mixedMonthlyInfo,
        handleDashToShow,
        handleOpenModal,
        handleDaySelected,
        handleLoading,
    } = useDash();

    //state
    const [indexOpen, setIndexOpen] = useState<boolean>(false);
    const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
    const { data: session } = useSession();
    const user = session?.user ? session.user : null;
    const email = user?.email ? user.email : '';
    const adminOrNot = email === 'cdseaholm@gmail.com' ? true : false;
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
    const [thisMonthsColors, setThisMonthsColors] = useState<CalendarColors>(JanColors);

    const visibleSessions = useMemo(() => {
        const monthStart = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
        const monthEnd = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);

        return sessions.filter(session => {
            const sessionDate = new Date(session.date);
            return sessionDate >= monthStart && sessionDate <= monthEnd;
        });
    }, [sessions, currentMonth]);

    //functions

    const handleMonthChange = async (month: Date) => {
        setCurrentMonth(month);
        const monthIndex = month.getMonth() + 1;
        const color = mixedMonthlyInfo.find(m => m.monthInfo.month === monthIndex)?.monthInfo.monthColorInfo;
        if (!color) {
            setThisMonthsColors(JanColors);
        } else {
            setThisMonthsColors(color);
        }

    };

    const setNewDay = async (arg: Date) => {
        handleDaySelected(arg.toLocaleDateString());
    }

    const handleDaySelect = async (arg: Date) => {
        console.log('Selected day:', arg.toLocaleDateString());
        handleLoading(true);
        const sessionsOnThisDay = sessions.filter((session) => {
            const sessionDate = new Date(session.date);
            return (
                sessionDate.getFullYear() === arg.getFullYear() &&
                sessionDate.getMonth() === arg.getMonth() &&
                sessionDate.getDate() === arg.getDate()
            );
        });
        await setNewDay(arg);
        if (sessionsOnThisDay.length < 1 && adminOrNot) {
            handleOpenModal('logSession');
        } else {
            handleDashToShow('sessions');
        }
        handleLoading(false);

    };

    const hydrateObjects = useCallback(async () => {

        const month = currentMonth.getMonth() + 1;
        const color = mixedMonthlyInfo.find(m => m.monthInfo.month === month)?.monthInfo.monthColorInfo;

        if (!color) {
            setThisMonthsColors(JanColors);
        } else {
            setThisMonthsColors(color);
        }

    }, [currentMonth, mixedMonthlyInfo]);

    const handleIndexOpen = () => {
        setIndexOpen(!indexOpen);
    }

    useEffect(() => {

        if (loadedData.current === false) {
            const initObjects = async () => {
                await hydrateObjects();
            }
            initObjects();
            loadedData.current = true;
        }

    }, [hydrateObjects]);

    return (
        <div className="flex flex-col h-full w-full">
            <div className={`flex flex-row justify-start items-center justify-evenly h-content w-full px-4 py-2 border-b border-black`} style={{ backgroundColor: thisMonthsColors.monthColor }}>
                <h2 className="font-semibold text-lg underline" style={{ color: thisMonthsColors.today.text }}>
                    Pick a day
                </h2>
            </div>
            <div className='flex-1 flex flex-col justify-center items-center p-2 min-h-0'>
                <CalendarCore
                    handleDaySelect={handleDaySelect}
                    monthColors={thisMonthsColors}
                    onMonthChange={handleMonthChange}
                    selectedDay={daySelected}
                    sessions={visibleSessions}
                />
            </div>
            <div className='flex-shrink-0 flex flex-row h-auto w-full border-t border-black px-4 py-2 justify-between items-center' style={{ backgroundColor: thisMonthsColors.monthColor }}>
                <button
                    type="button"
                    onClick={handleIndexOpen}
                    onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => {
                        e.currentTarget.style.backgroundColor = thisMonthsColors.hover.regular;
                    }}
                    onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => {
                        e.currentTarget.style.backgroundColor = thisMonthsColors.today.background;
                    }}
                    className={`flex flex-row justify-center items-center p-1 text-sm hover:underline rounded-md ${indexOpen ? 'w-5 h-5' : 'w-content'}`}
                    style={{ backgroundColor: thisMonthsColors.today.background }}
                >
                    <p style={{ color: thisMonthsColors.today.text }} className="text-xs sm:text-sm">
                        {indexOpen ? 'X' : 'Open Color Index'}
                    </p>
                </button>
                {indexOpen &&
                    <div className={`grid grid-cols-2 gap-2 p-2 border border-black rounded-md`} style={{ backgroundColor: thisMonthsColors.regularDay.background }}>
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
        </div>

    )
}