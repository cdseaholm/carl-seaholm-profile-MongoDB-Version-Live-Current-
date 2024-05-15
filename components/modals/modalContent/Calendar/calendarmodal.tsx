'use client'

import { useHobbyContext } from "@/app/context/hobby/hobbyModalContext";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { DateClickArg } from '@fullcalendar/interaction';
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { IHobby } from "@/models/types/hobby";
import { useModalContext } from "@/app/context/modal/modalContext";
import { set } from "mongoose";

const CalendarView = () => {

    const { data: session } = useSession();
    const { setModalOpen, hobbies, daySelected, setDaySelected } = useModalContext();
    const [hobbyEvents, setHobbyEvents] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    const handleDayClick = (arg: DateClickArg) => {
        console.log(arg.dateStr);
        setDaySelected(arg.dateStr);
    };

    const hydrateHobbies = async () => {
        const hobbiesToSet = hobbies.map((hobby: IHobby) => {
            return {
                title: hobby.title,
                allDay: true,
                start: hobby.dates[0],
                end: hobby.dates[0],
                editable: session?.user?.email === process.env.NEXT_PUBLIC_ADMIN_USERNAME ? true : false,
                color: hobby.color,
            }
        });
        if (hobbiesToSet.length === 0) {
            console.log('No hobbies');
            return;
        } else {
            setHobbyEvents(hobbiesToSet);
        }
    };

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
                    plugins={[dayGridPlugin]}  
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
                        setDaySelected(info.event.startStr);
                        setModalOpen('');
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
                    
                />
        </div>
    )
    };
}

export default CalendarView;