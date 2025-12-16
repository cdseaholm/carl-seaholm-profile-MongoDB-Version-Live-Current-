'use client'

import { DatePicker, DatePickerProps } from '@mantine/dates';
import React, { useState, useEffect } from 'react';
import { useDataStore } from '@/context/dataStore';
import { useStateStore } from '@/context/stateStore';
import { Tooltip } from '@mantine/core';
import { CalendarColors, JanColors } from '@/models/types/calColorInfo';

export default function CalendarModal({ handleDaySelect, monthColors, onMonthChange }: {
    handleDaySelect: (arg: Date) => void;
    monthColors: CalendarColors;
    onMonthChange?: (month: Date) => void;
}) {

    const selectedDay = useDataStore(state => state.daySelected);
    const width = useStateStore(state => state.widthQuery);
    const [displayedMonth, setDisplayedMonth] = useState<Date>(new Date());
    let thisMonthsColors = monthColors as CalendarColors;
    if (!thisMonthsColors) {
        thisMonthsColors = JanColors as CalendarColors;
    }

    //should add a loading state for any month change to avoid flicker

    useEffect(() => {
        if (onMonthChange) {
            onMonthChange(displayedMonth);
        }
    }, [displayedMonth, onMonthChange]);

    const DayRenderer: DatePickerProps['renderDay'] = (date) => {
        const day = date.getDate();
        const sessions = useDataStore(state => state.sessions);

        const sessionsByDate = sessions.reduce((acc: Record<string, number>, session) => {
            const sessionDate = new Date(session.date).toLocaleDateString();
            acc[sessionDate] = (acc[sessionDate] || 0) + 1;
            return acc;
        }, {});
        //console.log('Day: ', day, 'Date: ', date.toLocaleDateString(), 'SessionsByDate:', sessionsByDate);
        const currentDateKey = date.toLocaleDateString();
        const sessionCount = sessionsByDate[currentDateKey] || 0;

        // Check if it's today
        const today = new Date();
        const isToday = date.toLocaleDateString() === today.toLocaleDateString();

        // Check if it's selected
        const isSelected = selectedDay && date.toLocaleDateString() === selectedDay;

        // Check if it's a weekend (Saturday = 6, Sunday = 0)
        const isWeekend = date.getDay() === 0 || date.getDay() === 6;

        // Check if it's outside current month
        const currentMonth = today.getMonth();
        const isOutsideMonth = date.getMonth() !== currentMonth || date.getFullYear() !== today.getFullYear();

        const sessionColor =
            sessionCount === 1
                ? { color: '#ff3a3aff', colorName: 'Red' }
                : sessionCount === 2
                    ? { color: '#fca728ff', colorName: 'Orange' }
                    : sessionCount === 3
                        ? { color: '#fff63aff', colorName: 'Yellow' }
                        : sessionCount === 4
                            ? { color: '#0451f8ff', colorName: 'Blue' }
                            : sessionCount > 4
                                ? { color: '#05c205ff', colorName: 'Green' }
                                : { color: 'transparent', colorName: '' };

        // Get the appropriate day styles based on state
        const getDayStyles = () => {
            const baseStyles = {
                position: 'relative' as const,
                width: '100%',
                height: '100%',
                display: 'flex' as const,
                alignItems: 'center' as const,
                justifyContent: 'center' as const,
                transition: 'all 0.2s ease',
                fontSize: '0.8rem',
                borderRadius: '0.25rem',
                minHeight: '1.75rem',
                maxHeight: '3rem',
                maxWidth: width > 640 ? '98%' : '100%',
                padding: '2px',
            };

            // Handle special combinations first
            if (isToday && isWeekend) {
                return {
                    ...baseStyles,
                    backgroundColor: thisMonthsColors.todayWeekend.background,
                    color: thisMonthsColors.todayWeekend.text,
                    border: `2px solid ${thisMonthsColors.todayWeekend.border}`,
                    boxShadow: thisMonthsColors.todayWeekend.shadow,
                    fontWeight: 'bold' as const,
                };
            } else if (isWeekend && isOutsideMonth) {
                return {
                    ...baseStyles,
                    backgroundColor: thisMonthsColors.outsideWeekend.background,
                    color: thisMonthsColors.outsideWeekend.text,
                    border: `1px solid ${thisMonthsColors.outsideWeekend.border}`,
                    opacity: thisMonthsColors.outsideWeekend.opacity,
                };
            } else if (isToday) {
                return {
                    ...baseStyles,
                    backgroundColor: thisMonthsColors.today.background,
                    color: thisMonthsColors.today.text,
                    fontWeight: 'bold' as const,
                    border: `2px solid ${thisMonthsColors.today.border}`,
                    boxShadow: thisMonthsColors.today.shadow,
                };
            } else if (isSelected) {
                return {
                    ...baseStyles,
                    backgroundColor: thisMonthsColors.today.background,
                    color: thisMonthsColors.today.text,
                    border: `2px solid ${thisMonthsColors.today.border}`,
                    fontWeight: 'bold' as const,
                };
            } else if (isOutsideMonth) {
                return {
                    ...baseStyles,
                    backgroundColor: thisMonthsColors.outsideMonth.background,
                    color: thisMonthsColors.outsideMonth.text,
                    border: `1px solid ${thisMonthsColors.outsideMonth.border}`,
                    opacity: thisMonthsColors.outsideMonth.opacity,
                };
            } else if (isWeekend) {
                return {
                    ...baseStyles,
                    backgroundColor: thisMonthsColors.weekend.background,
                    color: thisMonthsColors.weekend.text,
                    border: `1px solid ${thisMonthsColors.weekend.border}`,
                };
            } else {
                return {
                    ...baseStyles,
                    backgroundColor: thisMonthsColors.regularDay.background,
                    color: thisMonthsColors.regularDay.text,
                    border: `1px solid ${thisMonthsColors.regularDay.border}`,
                };
            }
        };

        return (
            <div
                style={getDayStyles()}
                onMouseEnter={(e) => {
                    if (!isOutsideMonth) {
                        const target = e.currentTarget;
                        if (isToday || isSelected) {
                            target.style.backgroundColor = thisMonthsColors.today.background;
                        } else if (isWeekend) {
                            target.style.backgroundColor = thisMonthsColors.hover.weekend;
                        } else {
                            target.style.backgroundColor = thisMonthsColors.hover.regular;
                        }
                    }
                }}
                onMouseLeave={(e) => {
                    const target = e.currentTarget;
                    const styles = getDayStyles();
                    target.style.backgroundColor = styles.backgroundColor as string;
                }}
            >
                {sessionCount > 0 && (
                    <Tooltip label={`${sessionColor.colorName}: ${sessionCount} session${sessionCount > 1 ? 's' : ''} logged`} withArrow position="top" color="dark">
                        <div
                            style={{
                                position: 'absolute',
                                top: '2px',
                                right: '2px',
                                width: width > 640 ? '1.2vw' : '12px',
                                height: width > 640 ? '1.2vw' : '12px',
                                borderRadius: '50%',
                                border: '1px solid #000',
                                backgroundColor: sessionColor.color as string,
                                zIndex: 1,
                            }}
                        />
                    </Tooltip>
                )}
                <div>{day}</div>
            </div>
        );
    };

    return (
        <div className='flex flex-col justify-start items-center w-full h-full max-h-full overflow-hidden'>
            <DatePicker
                renderDay={DayRenderer}
                onChange={(date) => {
                    if (date) {
                        handleDaySelect(date);
                    }
                }}
                onMonthSelect={(month) => {
                    if (month) {
                        setDisplayedMonth(month);
                    }
                }}
                date={displayedMonth}
                onDateChange={setDisplayedMonth}
                value={new Date(selectedDay)}
                styles={{
                    // Calendar header with controls
                    calendarHeader: {
                        width: '100%',
                        padding: '0.25rem 0.5rem',
                        fontSize: '0.9rem',
                        marginBottom: '0.25rem',
                        color: thisMonthsColors.textOnMonth,
                        display: 'flex',
                        alignItems: 'center',
                    },
                    calendarHeaderLevel: {
                        fontSize: '1rem',
                        fontWeight: '600',
                        display: 'flex',
                        alignItems: 'center',
                        flex: '1',
                        justifyContent: 'center',
                        margin: '0',
                        padding: '0',
                    },
                    calendarHeaderControl: {
                        width: '1.75rem',
                        height: '1.75rem',
                        color: thisMonthsColors.textOnMonth,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    },
                    // Month table - this is the main calendar grid
                    month: {
                        width: '100%',
                        fontSize: '0.8rem',
                        tableLayout: 'fixed',
                        height: '100%',
                    },
                    // Weekday headers
                    weekdaysRow: {
                        height: '2rem',
                        color: thisMonthsColors.textOnMonth,
                        backgroundColor: thisMonthsColors.monthColor,
                        borderBottom: thisMonthsColors.weekend.border,
                    },
                    weekday: {
                        fontSize: '0.7rem',
                        fontWeight: '500',
                        textAlign: 'center',
                        padding: '0.25rem 0',
                        width: 'calc(100% / 7)',
                        border: thisMonthsColors.weekend.border,
                        height: '100%',
                        color: thisMonthsColors.weekend.text,
                        backgroundColor: thisMonthsColors.weekend.background,
                    },
                    // Month rows and cells
                    monthRow: {
                        height: '3rem'
                    },
                    monthCell: {
                        width: 'calc(100% / 7)',
                        height: '2.25rem',
                        textAlign: 'center',
                        verticalAlign: 'middle',
                        padding: '0',
                        position: 'relative'
                    },
                    // Day buttons - minimal styling since DayRenderer handles everything
                    day: {
                        width: '100%',
                        height: '100%',
                        border: 'none',
                        backgroundColor: 'transparent',
                        padding: '0',
                        margin: '0',
                        cursor: 'pointer',
                    },
                }}
            />
        </div>
    )
}