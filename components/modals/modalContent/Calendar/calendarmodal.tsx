'use client'

import { DatePicker, DatePickerProps } from '@mantine/dates';
import React from 'react';
import { Indicator } from '@mantine/core';
import { useStore } from '@/context/dataStore';
import { useHobbyStore } from '@/context/hobbyStore';

const DayRenderer: DatePickerProps['renderDay'] = (date) => {
    const day = date.getDate();
    const dayData = useHobbyStore(state => state.dayData);

    const sessionsByDate = dayData.reduce((acc: Record<string, number>, session) => {
        const sessionDate = new Date(session.date).toDateString();
        acc[sessionDate] = (acc[sessionDate] || 0) + 1;
        return acc;
    }, {});


    const currentDateKey = date.toDateString();
    const sessionCount = sessionsByDate[currentDateKey] || 0;

    const color =
        sessionCount === 1
            ? 'red'
            : sessionCount === 2
            ? 'yellow'
            : sessionCount === 3
            ? 'orange'
            : sessionCount === 4
            ? 'blue'
            : sessionCount > 4
            ? 'green'
            : 'transparent';

    return (
        <Indicator size={6} color={color} offset={-5}>
            <div>{day}</div>
        </Indicator>
    );
};

export default function CalendarModal({ handleDaySelect }: { handleDaySelect: (arg: Date) => void }) {

    const selectedDay = useStore(state => state.daySelected);

    return (
        <DatePicker
            renderDay={DayRenderer}
            onChange={(date) => {
                if (date) {
                    handleDaySelect(date);
                }
            }}
            value={selectedDay}
            size='xl'
        />
    )
}