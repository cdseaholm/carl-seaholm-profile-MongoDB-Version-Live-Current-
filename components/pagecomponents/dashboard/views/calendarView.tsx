import { IHobby } from "@/models/types/hobby";
import ScrollChild from "@/components/pagetemplates/scrollableChild/scrollChild";
import { useHobbyContext } from "@/app/context/hobby/hobbyModalContext";
import listPlugin from '@fullcalendar/list';
import FullCalendar from "@fullcalendar/react";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import dayGridPlugin from '@fullcalendar/daygrid';

const CalendarView = ({filter, hobbies}: {filter: string; hobbies: IHobby[] | null}) => {

    const { daySelected, setDaySelected } = useHobbyContext();
    const { data: session } = useSession();
    const [hobbyEvents, setHobbyEvents] = useState<any[]>([]);
    const [initialView, setInitialView] = useState<string>('dayGridMonth');
    const [monthView, setMonthView] = useState<boolean>(false);

    useEffect(() => {
        if (hobbies === null) {
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
                const currentWeekTasks = hobbiesToSet.filter(hobby => {
                    const hobbyDate = new Date(hobby.start);
                    const now = new Date();
                    return hobbyDate > new Date(now.setDate(now.getDate() - now.getDay())) && hobbyDate < new Date(now.setDate(now.getDate() - now.getDay() + 6));
                });
                setInitialView(currentWeekTasks.length > 0 ? 'listWeek' : 'dayGridMonth');
            }}
    }, [hobbies]);

    return (
        <div className="flex flex-col justify-between h-full w-full p-2 items-center space-y-1">
            <div className="text-xs h-3/5 w-11/12">
                <FullCalendar 
                    plugins={[listPlugin, dayGridPlugin]} 
                    initialView={initialView} 
                    events={hobbyEvents}
                    headerToolbar={{
                        left: 'listWeek,dayGridMonth',
                        center: 'title',
                        right: 'prev,next'
                    }}
                    
                    views={{
                        listWeek: { 
                            buttonText:'Week'
                        },
                        dayGridPlugin: {
                            buttonText:'Month',
                            buttonTextFormatted:'Month',
                            viewDidMount: function(view) {
                                setMonthView(true);
                                console.log('view', view);
                            },
                            height: 'auto',
                        }
                    }}
                    eventClick={(info) => {
                        setDaySelected(info.event.startStr);
                    }}
                    select={(info) => {
                        setDaySelected(info.startStr);
                    }}
                    fixedWeekCount={false}
                    contentHeight="auto"
                />
            </div>
            {!monthView &&
    <div className="border border-black h-2/5 w-11/12">
        <div className="flex flex-row justify-between items-center border-b border-black p-2">
            <div className="flex flex-col">
                <p>Day Details</p>
                <p>{daySelected ? daySelected : 'No Day Selected'}</p>
            </div>
            {daySelected !== '' ? <div className="cursor-pointer" onClick={() => setDaySelected('')}>Clear</div> : <div/>}
        </div>
        <div className="w-full h-full" style={{ maxHeight: 'calc(100% - 50px)', overflow: 'auto' }}> {/* Set a max-height and make it scrollable */}
            {daySelected !== '' && 
                <div>
                    {hobbies?.filter(hobby => hobby.dates.includes(daySelected)).map(hobby => {
                        return (
                            <div key={hobby._id} className="flex flex-row justify-between px-2">
                                <div className="flex flex-col pt-2">
                                    <p>{hobby.title}</p>
                                    <p>{hobby.categories.join(', ')}</p>
                                </div>
                                <div className="flex flex-col">
                                    <p>{hobby.dates.join(', ')}</p>
                                    <p>{hobby.goals}</p>
                                    <p>{hobby.descriptions}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            }
        </div>
    </div>
}
</div>
)
};

export default CalendarView;