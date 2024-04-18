

import { Hobby } from "@/models/types/hobby";
import { ActualUser } from "@/models/types/user";
import { useHobbyContext } from "@/app/context/hobby/hobbyModalContext";
import { useEffect, useState } from "react";
import CalendarTrackerView from "@/components/pagecomponents/dashboard/trackers/calendarTrackerView";
import StatsView from "@/components/pagecomponents/dashboard/trackers/statsView";
import useMediaQuery from "@/components/listeners/WidthSettings";

const MainDashBoard = ({filter, hobbies, user, adminID}: {filter: string; hobbies: Hobby[]; user: ActualUser | null; adminID: boolean;}) => {
    const isBreakpoint = useMediaQuery(768);

    const [view, setView] = useState(false);

    const {setOpenLogSessionModal, daySelected } = useHobbyContext();

    const handleDesireToEdit = () => {
        console.log('Edit button clicked');
    }

    const handleDesireToLog = () => {
        setOpenLogSessionModal(true)
    }

    const thisMonth = new Date().getMonth() + 1;
    const daysThisMonth = thisMonth === 2 ? 28 : thisMonth % 2 === 0 ? 30 : 31;
    const buttonsForSwitch = ['<', '>'];
    const sessionDatesColors = hobbies && hobbies.length > 0 ? new Map(hobbies.flatMap(hobby => hobby.dates.map(date => [date, hobby.title]))) : new Map();
    

    return (
        <div className={`flex flex-col justify-between ${isBreakpoint ? 'w-full' : 'w-4/5'}`}>
            <div className={`flex flex-col justify-between my-2 bg-gray-500 rounded-md`} style={{overflowX: 'auto'}}>
                            {!view &&
                            <div className="flex flex-row justify-center px-5 py-5">
                                <div className="flex flex-col w-min justify-center items-center">
                                    <h1 className="text-2xl font-bold">Calendar View</h1>
                                    <div className="flex flex-col w-min justify-center items-start">
                                        <CalendarTrackerView sessionDatesColors={sessionDatesColors} daysThisMonth={daysThisMonth} /> 
                                    </div>
                                </div>
                            </div>
                            }
                            {view &&
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
                    {user !== null && adminID === true && 
                    <div className="flex flex-row justify-evenly text-sm w-full p-2">
                        <button onClick={handleDesireToEdit}>
                            Edit
                        </button>
                        <button onClick={handleDesireToLog}>
                            Log Session
                        </button>
                        {buttonsForSwitch.map((button, index) => (
                            <button key={index} onClick={() => setView(!view)}>{index === 0 ? 'Stats' : 'Calendar'}</button>
                        ))}
                    </div>
                    }
                    {!user &&
                        <div className="flex flex-row justify-evenly text-sm w-full p-2">
                        {buttonsForSwitch.map((button, index) => (
                            <button key={index} onClick={() => setView(!view)}>{index === 0 ? 'Stats' : 'Calendar'}</button>
                        ))}
                    </div>
                    }
                </div>
            </div>
            {daySelected === '' ? (
                <></>
                ) : (
                <div className="flex flex-col my-2 bg-slate-300"> 
                    {daySelected !== '' && hobbies.filter(hobby => hobby.dates.includes(daySelected)).map((hobby, index) => (
                        <div key={index} className="flex flex-row justify-between items-center p-2">
                            <div className="flex flex-col">
                                <div className="text-sm">
                                    {hobby.title}
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