'use client'

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { DateClickArg } from '@fullcalendar/interaction';
import { useCallback, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { IHobby } from "@/models/types/hobby";
import { useStore } from "@/context/dataStore";
import { useModalStore } from '@/context/modalStore';
import { useAlertStore } from '@/context/alertStore';
import { DateSelectArg } from '@fullcalendar/core/index.js';
import React from 'react';
import { useStateStore } from '@/context/stateStore';

interface CalEvent {
    allDay: boolean;
    start: string;
    end: string;
    editable: boolean;
    color: string;
}

const CalendarView = () => {

    const { data: session } = useSession();
    const setModalOpen = useModalStore((state) => state.setModalOpen);
    const daySelected = useModalStore((state) => state.daySelected);
    const setDaySelected = useModalStore((state) => state.setDaySelected);
    const setAlertMessage = useAlertStore((state) => state.setAlertMessage);
    const setAlertOpen = useAlertStore((state) => state.setShowAlert);
    const setAlertParent = useAlertStore((state) => state.setAlertParent);
    const setLoading = useStateStore((state) => state.setLoading);
    const setModalParent = useModalStore((state) => state.setModalParent);
    const loading = useStateStore((state) => state.loading);
    const [hobbiesInADay, setHobbiesInADay] = useState<CalEvent[]>([]);
    const [indexOpen, setIndexOpen] = useState<boolean>(false);
    const { hobbies } = useStore();

    const handleDayClick = async (arg: DateClickArg) => {
        const date = new Date(arg.dateStr);
        const day = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()).toLocaleDateString();
        setDaySelected(day);
        setAlertMessage('Add a new hobby for this day? Or view existing hobbies on this day?');
        setAlertParent('calendar');
        setModalParent('calendar');
        setModalOpen('');
        setAlertOpen(true);
    };
    
    const handleDaySelect = async (arg: DateSelectArg) => {
        const date = new Date(arg.startStr);
        const day = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()).toLocaleDateString();
        setDaySelected(day);
        setAlertMessage('Add a new hobby for this day? Or view existing hobbies on this day?');
        setAlertParent('calendar');
        setModalParent('calendar');
        setModalOpen('');
        setAlertOpen(true);
    };

    const hydrateHobbies = useCallback(async () => {
        const uniqueDates = new Set<string>();
        const calEvents = [] as CalEvent[];
    
        hobbies.forEach((hobby: IHobby) => {
            for (let i = 0; i < hobby.dates.length; i++) {
                if (!uniqueDates.has(hobby.dates[i])) { 
                    
                    uniqueDates.add(hobby.dates[i]);
    
                    const hobbyDateToAdd = {
                        allDay: true,
                        start: hobby.dates[i],
                        end: hobby.dates[i],
                        editable: session?.user?.email === process.env.NEXT_PUBLIC_ADMIN_USERNAME ? true : false,
                        color: 'transparent',
                    }
                    calEvents.push(hobbyDateToAdd);
                }
            }
        });
    
        if (calEvents.length === 0) {
            console.log('No hobbies');
            return;
        } else {
            setHobbiesInADay(calEvents);
        }
    }, [hobbies, session]);
    
    useEffect(() => {
        setLoading(true);
        if (hobbies === null || hobbies === undefined) {
          return;
        } else {
          hydrateHobbies();
          setLoading(false);
      }}, [hobbies, session, hydrateHobbies, setLoading]);
    
    if (loading) {
        return (
            <div>
                Loading...
            </div>
        )
    } else {

    return (
        <div className="h-full w-full p-2" style={{overflow: 'hidden'}}>
             <FullCalendar 
                    plugins={[interactionPlugin, dayGridPlugin]}  
                    events={hobbiesInADay}
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
                            buttonText:'Month',
                            buttonTextFormatted:'Month',
                            height: 'auto',
                            expandRows: false,
                        }
                    }}
                    eventClick={(info) => {
                        info.jsEvent.preventDefault();
                    }}
                    select={(info) => {
                        handleDaySelect(info);
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
                        const hobbiesThisDay = [] as IHobby[];
                        for (let i = 0; i < hobbies.length; i++) {
                            for (let j = 0; j < hobbies[i].dates.length; j++) {
                                if (arg.event.startStr === hobbies[i].dates[j]) {
                                    hobbiesThisDay.push(hobbies[i]);
                                }
                            }
                        }
                        return (
                            <div className='flex flex-row items-center' style={{overflowWrap: 'normal'}}>
                                {hobbiesThisDay.length > 0 && hobbiesThisDay.map((hobby: IHobby, index: number) => {
                                    return (
                                        <div key={index} className="h-2 w-2 rounded-full mr-2 border border-black" style={{backgroundColor: hobby.color}}/>
                                    )
                                })}
                            </div>
                        )
                    }}
                    selectable={true}
                    dateClick={(arg) => {
                        handleDayClick(arg);
                    }}
                    dayCellClassNames={['cursor-pointer hover:bg-gray-200']}
                    
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
                        <div className={`grid grid-cols-2 grid-rows-2 p-2 scrollbar-thin scrollbar-webkit space-y-1`} style={{overflow: 'auto'}}>
                            {hobbies.map((hobby: IHobby, index: number) => {
                                return (
                                    <div key={index} className='flex flex-row items-center'>
                                        <React.Fragment key={index}>
                                            <div className="h-2 w-2 rounded-full mr-2 border border-black" style={{backgroundColor: hobby.color}}/>
                                            <p>{hobby.title}</p>
                                        </React.Fragment>
                                    </div>
                                )})
                            }
                        </div>
                    </div>
                }
        </div>
    )
    };
}

export default CalendarView;