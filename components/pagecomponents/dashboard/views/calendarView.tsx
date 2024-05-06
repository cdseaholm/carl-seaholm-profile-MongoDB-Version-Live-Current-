import { IHobby } from "@/models/types/hobby";
import { useHobbyContext } from "@/app/context/hobby/hobbyModalContext";
import listPlugin from '@fullcalendar/list';
import FullCalendar from "@fullcalendar/react";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import dayGridPlugin from '@fullcalendar/daygrid';
import useMediaQuery from "@/components/listeners/WidthSettings";

const CalendarView = ({filter, hobbies}: {filter: string; hobbies: IHobby[] | null}) => {

    const { daySelected, setDaySelected } = useHobbyContext();
    const { data: session } = useSession();
    const [hobbyEvents, setHobbyEvents] = useState<any[]>([]);
    const [initialView, setInitialView] = useState<string>('dayGridMonth');
    const [monthView, setMonthView] = useState<boolean>(false);
    const isBreakpoint = useMediaQuery(768);
    const calHeight = isBreakpoint ? '58%' : '66%';
    const detHeight = isBreakpoint ? '42%' : '34%';
    const width = isBreakpoint ? '100%' : '90%';


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
    }, [hobbies, session]);

    return (
        <div className="flex flex-col justify-between p-2 items-center flex-grow overflow-hidden h-full w-full flex-grow">
            <div className="text-xs overflow-auto w-full" style={{height: calHeight, width: width}}>
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
                            expandRows: false,
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
            {!monthView &&
        <div className="border border-black w-full overflow-hidden" style={{height: detHeight, width: width}}>
            <div className="flex flex-row justify-between items-center border-b border-black p-2">
              <div>
                <p>Day Details</p>
                <p>{daySelected ? daySelected : 'No Day Selected'}</p>
              </div>
              {daySelected !== '' ? <div className="cursor-pointer" onClick={() => setDaySelected('')}>Clear</div> : <div/>}
            </div>
            <div className="overflow-auto" style={{height: '72%'}}>
              {daySelected !== '' && 
                <div className="h-full w-full">
                  {hobbies?.filter(hobby => hobby.dates?.includes(daySelected)).map(hobby => {
                    return (
                      <div key={hobby._id} className="justify-between px-2">
                        <div className="pt-2">
                          <p>{hobby.title}</p>
                          <p>{hobby.categories.join(', ')}</p>
                        </div>
                        <div>
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
)};

export default CalendarView;