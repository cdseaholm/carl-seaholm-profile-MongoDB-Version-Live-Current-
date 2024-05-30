'use client'

import { IHobby } from "@/models/types/hobby";
import { useEffect, useState } from "react";
import { useStore } from '@/context/dataStore';
import { useModalStore } from "@/context/modalStore";

const CalendarView = () => {

    const setModalOpen = useModalStore((state) => state.setModalOpen);
    const setDaySelected = useModalStore((state) => state.setDaySelected);
    const daySelected = useModalStore((state) => state.daySelected);
    const [hobbyEvents, setHobbyEvents] = useState<any[]>([]);
    const hobbies = useStore((state) => state.hobbies);
    const adminID = useStore((state) => state.adminID);

    const handleDateIncrease = () => { 
        const date = new Date(daySelected);
        date.setDate(date.getDate() + 1);
        setDaySelected(date.toLocaleDateString());
    }

    const handleDateDescrease = () => {
        const date = new Date(daySelected);
        date.setDate(date.getDate() - 1);
        setDaySelected(date.toLocaleDateString());
    }

    useEffect(() => {
        if (daySelected === '' && daySelected !== null && daySelected !== undefined) {
            setDaySelected(new Date().toLocaleString());
            return;
        }
    }, [daySelected, setDaySelected]);

    useEffect(() => {
        if (hobbies === null || hobbies === undefined) {
            return;
        } else {
            const hobbiesToSet = [] as IHobby[];
            hobbies.forEach((hobby: IHobby) => {
                for (let i = 0; i < hobby.dates.length; i++) {
                    const day = new Date(hobby.dates[i]).toLocaleDateString();
                    if (day === daySelected) {
                        hobbiesToSet.push(hobby);
                    }
                }
            });
            setHobbyEvents(hobbiesToSet);
        }
    }, [hobbies, adminID, daySelected, setHobbyEvents]);

    return (
        <div className="p-2 flex flex-col w-full h-full justify-start items-center space-y-10" style={{flexGrow: 1, fontSize: '10px', overflow: 'auto'}}>
            <div className={`flex flex-row justify-evenly w-1/2 pb-5 self-center`}>
                        <button className="text-base" onClick={handleDateDescrease}>
                            <p className="hover:bg-gray-400">{'<'}</p>
                        </button>
                        <h1 className={`text-sm md:text-base font-semibold text-center w-2/3 border-b border-black pb-5`}>       
                            {daySelected ? daySelected : new Date().toLocaleDateString()}
                        </h1>
                        <button className="text-base" onClick={handleDateIncrease}>
                            <p className="hover:bg-gray-400">{'>'}</p>
                        </button>
                    </div>
            {hobbyEvents.length === 0 ? (
                <div>
                    No hobbies for this day
                </div>
            ) : (
                hobbyEvents.map((hobby: IHobby, index: number) => {
                    var timeToShow = '0 minutes';
                    for (let i = 0; i < hobby.minutesXsessions.length; i++) {
                        var timeTot = 0;
                        timeTot += Number(hobby.minutesXsessions[i]);
                        if (timeTot > 60) {
                            const nums = (timeTot / 60).toFixed(2);
                            timeToShow = `${nums} hours`
                        } else {
                            const nums = timeTot.toFixed(2);
                            timeToShow = `${nums} minutes`
                        }
                    }
                    let goal;
                    if (hobby && hobby.goals && hobby.goals[index]) {
                        const goalToUse = hobby.goals[index];
                        const goalParsed = goalToUse.toString().split('-');
                        goal = goalParsed[1];
                    }
                    return (
                        <div key={index} className="flex flex-col justify-between items-start w-4/5">
                            <div className="flex flex-row justify-start items-start w-full">
                                <h1 className={`text-sm md:text-base font-semibold text-center underline`}>
                                    {hobby.title}
                                </h1>
                            </div>
                            <div className="flex flex-row justify-start items-start w-full pl-5 text-xs md:text-sm">
                                <div className="flex flex-col justify-start items-start w-1/2">
                                    <p>
                                        Categories: {hobby.categories && hobby.categories[index] ? hobby.categories[index] : 'No sessions available'}
                                    </p>
                                    <p className={`text-center`}>
                                        Description: {hobby.descriptions && hobby.descriptions[index] ? hobby.descriptions[index] : 'No description available'}
                                    </p>
                                    <p>
                                        Total time: {timeToShow}
                                    </p>
                                    <p>
                                        Goal: {goal ? goal : 'No goal available'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )
                })
            )
            }
        </div>
)};

export default CalendarView;