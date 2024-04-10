import { useHobbyContext } from "@/app/context/hobby/hobbyModalContext";
import { Hobby } from "@/types/hobby";
import { useState } from "react";
import CalendarTrackerViewShell from "./calendarTrackerShell";
import StatsViewShell from "./statsViewShell";

const DashTrackerShell = ({ hobby }: { hobby: Hobby }) => {
    const [view, setView] = useState(true);

    const {setOpenLogSessionModal } = useHobbyContext();

    const handleDesireToEdit = () => {
        console.log('Edit button clicked');
    }

    const handleDesireToLog = () => {
        setOpenLogSessionModal(true)
    }

    const thisMonth = new Date().getMonth();
    const daysThisMonth = thisMonth === 1 ? 28 : thisMonth % 2 === 0 ? 30 : 31;
    const days = Array.from({length: daysThisMonth}, (_, i) => i + 1);
    const sessionsDoneThisMonth = hobby.date.filter(session => new Date(session).getMonth() === thisMonth);
    const buttonsForSwitch = ['<', '>'];
    

    return (
        <div className="flex flex-col justify-center w-3/4 my-2 bg-gray-500 rounded-md divide-y divide-black divide">
            <div className="flex flex-row justify-between px-5 py-5">
                <div className="flex flex-col w-full justify-center items-center">
                    <h1 className="text-2xl font-bold">{hobby.title}</h1>
                    <div className="flex flex-col w-full justify-center items-center" style={{overflowX: 'auto'}}>
                        {!view &&
                        <CalendarTrackerViewShell hobby={hobby} /> 
                        }
                        {view &&
                        <StatsViewShell hobby={hobby} />
                        }
                    </div>
                </div>
            </div>
            <div className="flex flex-row justify-evenly text-sm w-full p-2">
                {buttonsForSwitch.map((button, index) => (
                    <button key={index} onClick={() => setView(!view)}>{index === 0 ? 'Stats' : 'Calendar'}</button>
                ))}
            </div>
        </div>
    )
};

export default DashTrackerShell;