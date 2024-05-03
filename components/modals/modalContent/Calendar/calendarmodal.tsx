'use client'

import { useHobbyContext } from "@/app/context/hobby/hobbyModalContext";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';

export default function CalendarModal() {
    const { daySelected, setDaySelected, hobbies } = useHobbyContext();

    const handleDayClick = (arg: DateClickArg) => {
        console.log(arg.dateStr);
        setDaySelected(arg.dateStr);
        // handle the click event
    };
    
    if (hobbies === null) {
        return (
            <div>
                Loading...
            </div>
        )
    } else {

    return (
        <div className="h-full w-full">
            <FullCalendar plugins={[dayGridPlugin, interactionPlugin]} initialView="dayGridMonth" events={hobbies} dateClick={handleDayClick}  showNonCurrentDates={false} fixedWeekCount={false} aspectRatio={3}/>
        </div>
    )
    };
}