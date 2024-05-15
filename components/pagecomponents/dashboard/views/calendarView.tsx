import { IHobby } from "@/models/types/hobby";
import listPlugin from '@fullcalendar/list';
import FullCalendar from "@fullcalendar/react";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useModalContext } from "@/app/context/modal/modalContext";

const CalendarView = ({filter}: {filter: string;}) => {

    const { data: session } = useSession();
    const { setModalOpen, hobbies, daySelected, setDaySelected } = useModalContext();
    const [hobbyEvents, setHobbyEvents] = useState<any[]>([]);
    const [forceUpdate, setForceUpdate] = useState(false);

      useEffect(() => {
        if (daySelected !== '') {
            console.log('check', daySelected);
            console.log('check', forceUpdate);
            setModalOpen('daydetails');
        }
      }, [daySelected, forceUpdate, setModalOpen]);


    useEffect(() => {
        if (hobbies === null || hobbies === undefined) {
            console.log('No hobbies');
            return;
        } else {
            console.log(hobbies);
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
                const currentWeekTasks = hobbiesToSet.filter(hobby => {
                    const hobbyDate = new Date(hobby.start);
                    const now = new Date();
                    return hobbyDate > new Date(now.setDate(now.getDate() - now.getDay())) && hobbyDate < new Date(now.setDate(now.getDate() - now.getDay() + 6));
                });
            }}
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
                            console.log('select', arg);
                            console.log('select', daySelected);
                            console.log('select', arg.event.startStr);
                            console.log('select', arg.event.allDay);
                    }}
                    select={(arg) => {
                            setDaySelected(arg.startStr);
                            setForceUpdate(!forceUpdate);
                            console.log('select', arg);
                            console.log('select', daySelected);
                            console.log('select', arg.startStr);
                            console.log('select', arg.allDay);
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