import { IHobby } from "@/models/types/hobby";
import { useHobbyContext } from "@/app/context/hobby/hobbyModalContext";
import listPlugin from '@fullcalendar/list';
import FullCalendar from "@fullcalendar/react";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import dayGridPlugin from '@fullcalendar/daygrid';
import useMediaQuery from "@/components/listeners/WidthSettings";
import { FiChevronsUp } from "react-icons/fi";
import { FiChevronsDown } from "react-icons/fi";
import useHeightMediaQuery from "@/components/listeners/HeightSettings";
import { set } from "mongoose";

const CalendarView = ({filter, hobbies}: {filter: string; hobbies: IHobby[] | null}) => {

    const { daySelected, setDaySelected } = useHobbyContext();
    const { data: session } = useSession();
    const [hobbyEvents, setHobbyEvents] = useState<any[]>([]);
    const [initialView, setInitialView] = useState<string>('dayGridMonth');
    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    const [monthView, setMonthView] = useState<boolean>(false);
    const isBreakpoint = useMediaQuery(768);
    const isHeightBreakpoint = useHeightMediaQuery(768);
    const tooSmall = useHeightMediaQuery(560);
    const calHeight = isBreakpoint ? '66%' : '67%';
    const detHeight = isBreakpoint ? '38%' : '32%';
    const width = isBreakpoint ? '95%' : '90%';
    const heightTwo = isHeightBreakpoint ? '80%' : calHeight;
    const finalHeight = tooSmall ? '100%' : heightTwo;
    const finalWidth = isHeightBreakpoint ? '100%' : width;
    const detExpanded = isExpanded ? '77%': detHeight;
    const detWidth = isExpanded ? '86%' : width;
    const finalDetHeight = isHeightBreakpoint ? '12%' : detExpanded;
    const detHeightExpanded = isExpanded && isHeightBreakpoint ? '50%' : finalDetHeight;


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

    const handleClearDay = () => {
            setDaySelected('');
            setIsExpanded(false);
    }

    return (
        <div className="flex flex-col justify-between p-2 items-center overflow-hidden h-full w-full flex-grow">
            <div className="overflow-auto w-full" style={{height: finalHeight, width: finalWidth, fontSize: '8px'}}>
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
                        if (!isHeightBreakpoint) {
                            setDaySelected(info.event.startStr);
                        } else {
                            setDaySelected(info.event.startStr);
                            setIsExpanded(true);
                        }
                    }}
                    select={(info) => {
                        if (!isHeightBreakpoint) {
                            setDaySelected(info.startStr);
                        } else {
                            setDaySelected(info.startStr);
                            setIsExpanded(true);
                        }
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
                <div className={`${isExpanded ? 'absolute z-20 border border-black overflow-hidden bg-neutral-200 transition-all duration-200 ease-in-out' : 'border border-black overflow-hidden transition-all duration-200 ease-in-out'} ${tooSmall && !isExpanded ? 'hidden' : ''}`} style={{height: detHeightExpanded, width: detWidth}}>
                    <div className="flex flex-row justify-between items-center border-b border-black px-2">
                    <div className="py-2">
                        <p>Day Details</p>
                        <p>{daySelected ? daySelected : 'No Day Selected'}</p>
                    </div>
                        {daySelected !== '' ? 
                            <div className="flex flex-col space-y-1 justify-between items-end py-1">
                                {isExpanded ? 
                                <FiChevronsDown className="cursor-pointer hover:bg-stone-500" onClick={() => setIsExpanded(false)}/> :
                                <FiChevronsUp className="cursor-pointer hover:bg-stone-500" onClick={() => setIsExpanded(true)} />
                                }
                                <div className="cursor-pointer hover:bg-stone-500" onClick={handleClearDay}>
                                    Clear
                                </div>
                            </div>: 
                            <div/>
                        }
                    </div>
                    <div className="overflow-auto flex-grow scrollbar-thin scrollbar-webkit">
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