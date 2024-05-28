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

const CalendarView = () => {

    const { data: session } = useSession();
    const setModalOpen = useModalStore((state) => state.setModalOpen);
    const daySelected = useModalStore((state) => state.daySelected);
    const setDaySelected = useModalStore((state) => state.setDaySelected);
    const setAlertMessage = useAlertStore((state) => state.setAlertMessage);
    const setAlertOpen = useAlertStore((state) => state.setShowAlert);
    const setAlertParent = useAlertStore((state) => state.setAlertParent);
    const [hobbyEvents, setHobbyEvents] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const { hobbies } = useStore();

    const handleDayClick = async (arg: DateClickArg) => {
        console.log(arg.dateStr);
        setDaySelected(arg.dateStr);
        console.log('Day selected:', daySelected);
        setAlertMessage('Add a new hobby for this day? Or view existing hobbies on this day?');
        setAlertParent('calendar');
        setAlertOpen(true);
    };

    const hydrateHobbies = useCallback(async () => {
        const hobbiesToSet = [] as any[];
        hobbies.forEach((hobby: IHobby) => {
            for (let i = 0; i < hobby.dates.length; i++) {
                const hobbyToAdd = {
                    title: hobby.title,
                    allDay: true,
                    start: hobby.dates[i],
                    end: hobby.dates[i],
                    editable: session?.user?.email === process.env.NEXT_PUBLIC_ADMIN_USERNAME ? true : false,
                    color: hobby.color,
                }
                hobbiesToSet.push(hobbyToAdd);
            }
        });
        
        if (hobbiesToSet.length === 0) {
            console.log('No hobbies');
            return;
        } else {
            setHobbyEvents(hobbiesToSet);
        }
    }, [hobbies, session, setHobbyEvents]);
    
    useEffect(() => {
        setLoading(true);
        if (hobbies === null || hobbies === undefined) {
          return;
        } else {
          hydrateHobbies();
          setLoading(false);
      }}, [hobbies, session, hydrateHobbies]);
    
    if (loading) {
        return (
            <div>
                Loading...
            </div>
        )
    } else {

    return (
        <div className="h-full w-full p-2">
             <FullCalendar 
                    plugins={[interactionPlugin, dayGridPlugin]}  
                    events={hobbyEvents}
                    headerToolbar={{
                        left: 'title',
                        center: '',
                        right: 'prev,next'
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
                        setDaySelected(info.startStr);
                        setModalOpen('');
                    }}
                    fixedWeekCount={false}
                    contentHeight="auto"
                    eventDisplay="list-item"
                    dayCellContent={(arg) => {
                        return (
                            <div className="flex flex-col justify-center items-center">
                                <p>{arg.dayNumberText}</p>
                            </div>
                        )
                    }}
                    dayMaxEventRows={1}
                    moreLinkClick={(info) => {
                        const date = info.date;
                        const year = date.getFullYear();
                        const month = ("0" + (date.getMonth() + 1)).slice(-2);
                        const day = ("0" + date.getDate()).slice(-2);
                        const selectedDate = `${year}-${month}-${day}`;
                        setDaySelected(selectedDate);
                    
                        const eventsOfTheDay = hobbyEvents.filter(event => event.start?.includes(selectedDate));
                    }}
                    eventContent={(arg) => {
                        return (
                            <div className="flex items-center truncate">
                                <div className="h-2 w-2 rounded-full mr-2" style={{backgroundColor: arg.event.backgroundColor}}></div>
                                <div className="truncate w-3/4">
                                    {arg.event.title}
                                </div>
                            </div>
                        )
                    }}
                    selectable={true}
                    dateClick={(arg) => {
                        handleDayClick(arg);
                    }}
                    
                />
        </div>
    )
    };
}

export default CalendarView;