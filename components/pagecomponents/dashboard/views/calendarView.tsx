'use client'

import { IHobby } from "@/models/types/hobby";
import listPlugin from '@fullcalendar/list';
import FullCalendar from "@fullcalendar/react";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useModalContext } from "@/app/context/modal/modalContext";
import { useStore } from '@/models/store/store';

const CalendarView = ({filter}: {filter: string;}) => {

    const { data: session } = useSession();
    const { setModalOpen, daySelected, setDaySelected } = useModalContext();
    const [hobbyEvents, setHobbyEvents] = useState<any[]>([]);
    const [forceUpdate, setForceUpdate] = useState(false);
    const { hobbies } = useStore();

    const openModalDayDetails = () => {
        setModalOpen('daydetails');
    }

    useEffect(() => {
        if (daySelected !== '') {
            openModalDayDetails();
        }
    }, [daySelected, openModalDayDetails]);


    useEffect(() => {
        if (hobbies === null || hobbies === undefined) {
            return;
        } else {
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
                return;
            } else {
                setHobbyEvents(hobbiesToSet);
            }
        }
    }, [hobbies, session]);

    return (
        <div className="p-2 items-center" style={{flexGrow: 1, overflow: 'auto'}}>
            <div style={{flexGrow: 1, fontSize: '8px', overflow: 'auto'}}>
                <FullCalendar 
                    plugins={[listPlugin]}  
                    events={hobbyEvents}
                    initialView="listWeek"
                    customButtons={{
                        selectDayCalendarModal: {
                            text: 'Select Day',
                            click: function() {
                                setModalOpen('calendar');
                            }
                        }
                    }}
                    headerToolbar={{
                        left: 'selectDayCalendarModal',
                        center: 'title',
                        right: 'prev,next'
                    }}
                    eventClick={(arg) => {
                            setDaySelected(arg.event.startStr);
                            setForceUpdate(!forceUpdate);
                    }}
                    select={(arg) => {
                            setDaySelected(arg.startStr);
                            setForceUpdate(!forceUpdate);
                    }}
                    height={'auto'}
                    eventContent={(arg) => {
                        return (
                            <div className="flex flex-col justify-start cursor-pointer items-start">
                                <div style={{fontSize: 10}}>
                                    {arg.event.title}
                                </div>
                            </div>
                        )
                    }}
                    
                />
            </div>
    </div>
)};

export default CalendarView;