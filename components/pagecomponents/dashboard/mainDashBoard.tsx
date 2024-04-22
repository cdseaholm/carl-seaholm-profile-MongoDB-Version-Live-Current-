


import { useHobbyContext } from "@/app/context/hobby/hobbyModalContext";
import { useEffect, useState } from "react";
import CalendarTrackerView from "@/components/pagecomponents/dashboard/trackers/calendarTrackerView";
import StatsView from "@/components/pagecomponents/dashboard/trackers/statsView";
import useMediaQuery from "@/components/listeners/WidthSettings";
import { IHobby } from "@/models/types/hobby";
import { useSession } from "next-auth/react";
import HobbyIndex from "@/components/buttons/hobbyindex";

const MainDashBoard = ({filter, hobbies, adminID}: {filter: string; hobbies: IHobby[] | null; adminID: boolean;}) => {
    const isBreakpoint = useMediaQuery(768);

    const [cal, setCal] = useState(true);
    const [stat, setStat] = useState(false);
    const { daySelected } = useHobbyContext();
    const thisMonth = new Date().getMonth() + 1;
    const daysThisMonth = thisMonth === 2 ? 28 : thisMonth % 2 === 0 ? 30 : 31;
    const sessionDatesColors = hobbies && hobbies.length > 0 ? new Map(hobbies.flatMap(hobby => hobby.dates.map(date => [date, hobby.color]))) : new Map();
    const sessionDates = hobbies && hobbies.length > 0 ? new Map(hobbies.flatMap(hobby => hobby.dates.map(date => [date, hobby]))) : new Map();
    const [hobbyToShow, setHobbyToShow] = useState<IHobby[] | null>(null);

    useEffect(() => {
        if (daySelected !== '') {
            const filteredHobbies = hobbies?.map(hobby => {
                const dateIndex = hobby.dates.findIndex(date => date === daySelected);
                if (dateIndex !== -1) {
                    return {
                        ...hobby,
                        dates: [hobby.dates[dateIndex]],
                        descriptions: [hobby.descriptions[dateIndex]],
                        minuteXsessions: [hobby.minutesXsessions[dateIndex]]
                    };
                }
                return null;
            }).filter(hobby => hobby !== null) as IHobby[] | null;
            setHobbyToShow(filteredHobbies);
            console.log('daySelected', daySelected);
        }
    }, [daySelected, hobbies]);
    

    return (
        <div className={`flex flex-col justify-between ${isBreakpoint ? 'w-full' : 'w-4/5'}`} style={{overflow: 'auto'}}>
            <div className={`flex flex-col justify-between my-2 bg-gray-500 rounded-md`}>
                            {!stat && cal &&
                            <div className="flex flex-col justify-center py-2">
                                {hobbies && hobbies.length > 0 &&
                                    <div className="flex flex-row justify-between px-5 pb-5 items-center">
                                        <h1 className={`${isBreakpoint ? 'text-sm' : 'text-base'} font-bold underline`}>Calendar View</h1>
                                        <HobbyIndex />
                                    </div>
                                }
                                {hobbies && hobbies.length === 0 &&
                                    <div className="flex flex-row justify-center px-5 py-5">
                                        <h1 className={`${isBreakpoint ? 'text-sm' : 'text-base'} font-bold underline`}>Calendar View</h1>
                                    </div>
                                }
                                <div className="flex flex-col justify-center items-center">
                                    <div className="flex flex-col w-min justify-center items-start">
                                        <CalendarTrackerView sessionDatesColors={sessionDatesColors} daysThisMonth={daysThisMonth} /> 
                                    </div>
                                </div>
                            </div>
                            }
                            {stat && !cal &&
                            <div className="flex flex-row justify-between px-5 py-5">
                                <div className="flex flex-col w-full justify-center items-center">
                                    <h1 className="text-2xl font-bold">Stats View</h1>
                                    <div className="flex flex-col w-full justify-center items-center">
                                        <StatsView hobbies={hobbies}daysThisMonth={daysThisMonth} />
                                    </div>
                                </div>
                            </div>
                            }
                <div className="divide-y divide-black divide">
                    <div />
                        <div className="flex flex-row justify-evenly text-sm w-full p-2">
                            <button className={`font-bold hover:bg-gray-400 rounded-lg p-2 ${cal ? 'border border-gray-700' : ''} cursor-pointer ${isBreakpoint ? 'text-xs' : 'text-sm'}`} onClick={() => {setCal(true), setStat(false)}}>
                                Calendar
                            </button>
                            <button className={`font-bold hover:bg-gray-400 rounded-lg p-2 ${stat ? 'border border-gray-700' : ''} cursor-pointer ${isBreakpoint ? 'text-xs' : 'text-sm'}`} onClick={() => {setCal(false), setStat(true)}}>
                                Stats
                            </button>
                    </div>
                </div>
            </div>
            {hobbyToShow !== null && daySelected === '' ? (
                <></>
                ) : (
                <div className="flex flex-col my-2 bg-slate-300"> 
                    {hobbyToShow?.map((hobby, index) => (
                        <div key={index} className="flex flex-col justify-center items-center">
                            <div className="flex flex-row justify-between items-center px-5 py-5">
                                <h1 className={`${isBreakpoint ? 'text-sm' : 'text-base'} font-bold underline`}>Day Details</h1>
                                <p className="text-sm font-semibold">{hobby.dates[0]}</p>
                            </div>
                            <div className="flex flex-row justify-center items-center" style={{overflowX: 'auto'}}>
                                <div className="flex flex-col w-min justify-center items-start">
                                    <div className="flex flex-row justify-center">
                                        <h1 className="text-lg font-bold">{hobby.title}</h1>
                                    </div>
                                    <p className="text-sm font-semibold">Amount of time: {hobby.minutesXsessions[0]} minutes</p>
                                    <p className="text-sm font-semibold" style={{overflow: 'auto'}}>{hobby.descriptions[0]}</p>

                                </div>
                            </div>

                        </div>
                    ))}
                
                </div>
            )}
        </div>
    )
};

export default MainDashBoard;