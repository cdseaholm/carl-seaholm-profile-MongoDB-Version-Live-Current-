'use client'

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import React from 'react';
import { ColorMapType } from '@/models/types/colorMap';
import { dataType } from '@/components/pagecomponents/dashboard/statsView';
import { DateSelectArg, EventClickArg, EventContentArg } from '@fullcalendar/core/index.js';
import { CalEvent } from './calendarModalInit';

export default function CalendarModal({ adminIDBool, colorMap, data, handleIndexOpen, handleDaySelect, handleEventClick, handleDayClick, indexOpen, objectsInADay }: { adminIDBool: boolean, colorMap: ColorMapType[], data: dataType[], handleIndexOpen: () => void, handleDaySelect: (arg: DateSelectArg) => void, handleEventClick: (arg: EventClickArg | EventContentArg) => void, handleDayClick: (arg: DateClickArg) => void, indexOpen: boolean, objectsInADay: CalEvent[] }) {

    return (

        <div className="h-full w-full p-2 bg-white" style={{ overflow: 'hidden' }}>
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
                            handleIndexOpen
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
                    const entriesThisDay = [] as dataType[];
                    if (!data) {
                        return;
                    }
                    data.map((d: dataType) => {
                        if (d.date === arg.event.startStr) {
                            entriesThisDay.push(d);
                        }

                    });
                    return (
                        <div className={`flex flex-row items-center flex-wrap`}>
                            {entriesThisDay && entriesThisDay.length > 0 && entriesThisDay.slice(0, 6).map((entry: dataType, index: number) => {
                                return (
                                    <div key={index} className="h-2 w-2 rounded-full mr-2 mb-1 border border-slate-500" style={{ backgroundColor: entry.color }} onClick={() => handleEventClick(arg)} />
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
                dayCellClassNames={'cursor-pointer hover:bg-blue-300'}
            />
            {indexOpen &&
                <div className='flex flex-col w-full border border-black rounded-md px-2'>
                    <div className='flex flex-row justify-between border-b border-black w-full'>
                        <h1 className=''>
                            Color Index:
                        </h1>
                        <button className='hover:bg-gray-400 px-1 rounded-md' onClick={() => handleIndexOpen}>
                            Close Index
                        </button>
                    </div>
                    <div className={`grid grid-cols-2 grid-rows-2 p-2 scrollbar-thin scrollbar-webkit space-y-1`} style={{ overflow: 'auto' }}>
                        {colorMap && colorMap.map((map: { color: string, title: string }, index: number) => {
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

    )

}