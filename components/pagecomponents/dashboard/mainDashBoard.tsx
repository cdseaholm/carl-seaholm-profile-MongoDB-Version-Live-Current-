

import { Hobby } from "@/lib/types/hobby";
import { ActualUser } from "@/lib/types/user";
import { useHobbyContext } from "@/app/context/hobby/hobbyModalContext";
import { useEffect, useState } from "react";
import CalendarTrackerView from "@/components/pagecomponents/dashboard/trackers/calendarTrackerView";
import StatsView from "@/components/pagecomponents/dashboard/trackers/statsView";

const MainDashBoard = ({filter, hobbies, user, adminID}: {filter: string; hobbies: Hobby[]; user: ActualUser | null; adminID: boolean;}) => {

    const [view, setView] = useState(false);

    const {setOpenLogSessionModal } = useHobbyContext();

    const handleDesireToEdit = () => {
        console.log('Edit button clicked');
    }

    const handleDesireToLog = () => {
        setOpenLogSessionModal(true)
    }

    const thisMonth = new Date().getMonth() + 1;
    const daysThisMonth = thisMonth === 2 ? 28 : thisMonth % 2 === 0 ? 30 : 31;

    
    
    const buttonsForSwitch = ['<', '>'];
    

    return (
        <div className="flex flex-col justify-between w-4/5 my-2 bg-gray-500 rounded-md" style={{overflowX: 'auto'}}>
                        {!view &&
                        <div className="flex flex-row justify-center px-5 py-5">
                            <div className="flex flex-col w-min justify-center items-center">
                                <h1 className="text-2xl font-bold">Calendar View</h1>
                                <div className="flex flex-col w-min justify-center items-start">
                                    <CalendarTrackerView hobbies={hobbies} daysThisMonth={daysThisMonth} /> 
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
            <div>
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
        </div>
    )
};

export default MainDashBoard;