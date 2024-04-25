


import { useHobbyContext } from "@/app/context/hobby/hobbyModalContext";
import { use, useEffect, useState } from "react";
import { IHobby } from "@/models/types/hobby";
import HobbyIndex from "@/components/buttons/hobbyindex";
import useMediaQuery from "@/components/listeners/WidthSettings";
import { useModalContext } from "@/app/context/modal/modalContext";
import MonthConverter from "@/components/misc/functions/monthconverter";

const MainDashBoard = ({filter, hobbies}: {filter: string; hobbies: IHobby[] | null;}) => {
    const { daySelected } = useHobbyContext();
    const { calDash, setCalDash } = useModalContext();
    const thisMonth = new Date().getMonth() + 1;
    const daysThisMonth = thisMonth === 2 ? 28 : thisMonth % 2 === 0 ? 30 : 31;
    const sessionDatesColors = hobbies && hobbies.length > 0 ? new Map(hobbies.flatMap(hobby => hobby.dates.map(date => [date, hobby.color]))) : new Map();
    const [hobbyToShow, setHobbyToShow] = useState<IHobby[] | null>(null);
    const isBreakpoint = useMediaQuery(768);
    const { setDaySelected } = useHobbyContext();
    const thisYear = new Date().getFullYear();

    const days = Array.from({length: daysThisMonth}, (_, i) => i + 1);

    const handleDayClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
        const day = event.currentTarget.value;
        console.log('day', day);
        console.log('event', event.currentTarget)
        if (day) {
            setDaySelected(day);
        }
    }
    const num = parseInt(thisMonth.toString());

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
        <div className={`flex flex-col justify-between w-full md:w-4/5`} style={{overflow: 'auto'}}>
            <div className={`flex flex-col justify-between my-2 bg-gray-500 rounded-md`}>
                            <div className="flex flex-col justify-center py-2">
                                
                                    {!isBreakpoint && 
                                        <div className="flex max-sm:flex-col sm:flex-row justify-start justify-around items-center px-5 pb-5">
                                            <div className="flex flex-col">
                                                    <button className={`font-bold hover:bg-gray-400 rounded-lg p-1 ${calDash ? 'border border-gray-700' : ''} cursor-pointer text-xs`} onClick={() => {setCalDash(true)}}>
                                                        Calendar
                                                    </button>
                                                    <button className={`font-bold hover:bg-gray-400 rounded-lg p-2 ${!calDash ? 'border border-gray-700' : ''} cursor-pointer text-xs`} onClick={() => {setCalDash(false)}}>
                                                        Stats
                                                    </button>
                                            </div>
                                            {hobbies && hobbies.length > 0 &&
                                                <HobbyIndex />
                                            }
                                        </div>
                                    }
                                
                                <div className="flex flex-col justify-center items-center">
                                    <div className="flex flex-col w-min justify-center items-start">
                                        <MonthConverter month={num}/>
                                        {Array(Math.ceil(days.length / 7)).fill(0).map((_, i) => {
                                            const weekDays = days.slice(i * 7, i * 7 + 7);
                                            return (
                                                    <div key={i} className="flex flex-col justify-center items-center">
                                                        <div className="flex flex-row">
                                                        {weekDays.map((day, index) => {
                                                            const dateString = `${thisYear}-${String(thisMonth).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

                                                            return (
                                                                <button value={`${thisYear}-${String(thisMonth).padStart(2, '0')}-${String(day).padStart(2, '0')}`} key={index} className={`flex flex-col justify-start items-start w-8 h-8 md:w-12 md:h-12 m-1 bg-gray-300 cursor-pointer hover:border hover:border-black`} onClick={handleDayClick}>
                                                                    <p className="text-xs">
                                                                        {day}
                                                                    </p>
                                                                    {sessionDatesColors.has(dateString) &&
                                                                        <div className={`w-2 h-2 rounded-full`} style={{backgroundColor: sessionDatesColors.get(dateString)}}/>
                                                                    }
                                                                </button>
                                                            )
                                                        })}
                                                        </div>
                                                    </div>
                                            )
                                        })} 
                                    </div>
                                </div>
                                <div className="divide-y divide-black divide">
                                        <div />

                                        <div />
                                </div>
                                <div className="flex flex-col my-2 bg-slate-300"> 
                                        {hobbyToShow?.map((hobby, index) => (
                                            <div key={index} className="flex flex-col justify-center items-center">
                                                <div className="flex flex-row justify-between items-center px-5 py-5">
                                                    <h1 className={`text-sm md:text-base font-bold underline`}>Day Details</h1>
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
                            </div>
                            

                            
            </div>
            
        </div>
    )
};

export default MainDashBoard;