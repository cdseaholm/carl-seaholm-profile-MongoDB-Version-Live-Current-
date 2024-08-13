'use client'

import { useModalStore } from "@/context/modalStore";
import { IEntry } from "@/models/types/objectEntry";

function ConvertTime(object: IEntry) {
    let timeToShow = null as string | null;
    if (!object.fields.map((field) => field.name === 'minutesXsessions')) {
        var timeTot = 0;
        for (let i = 0; i < object.fields.length; i++) {

            const min = object.fields.find((field) => field.name === 'minutesXsessions')?.value;
            timeTot += Number(min);
            timeTot += Number(object.fields.find((field) => field.name === 'minutesXsessions')?.value);
        };
        if (timeTot > 60) {
            const nums = (timeTot / 60).toFixed(2);
            timeToShow = `${nums} hours`
        } else {
            const nums = timeTot.toFixed(2);
            timeToShow = `${nums} minutes`
        }
    } else {
        timeToShow = null;
    }
    return timeToShow;
}

const CalendarView = ({ adminID, handleDateDecrease, handleDateIncrease, entriesOTD, objectTitle }: { adminID: boolean, handleDateDecrease: () => void, handleDateIncrease: () => void, entriesOTD: IEntry[], objectTitle: string}) => {

    const setDaySelected = useModalStore((state) => state.setDaySelected);
    const daySelected = useModalStore((state) => state.daySelected);
    const setModalOpen = useModalStore((state) => state.setModalOpen);
    const setModalParent = useModalStore((state) => state.setModalParent);

    return (
        <div className="p-2 flex flex-col w-full h-full justify-start items-center space-y-10" style={{ flexGrow: 1, fontSize: '10px', overflow: 'hidden' }}>
            <div className={`flex flex-row justify-evenly w-1/2 pb-5 self-center`}>
                <button className="text-base" onClick={handleDateDecrease}>
                    <p className="hover:bg-gray-400">{'<'}</p>
                </button>
                <h1 className={`text-sm md:text-base font-semibold text-center w-2/3 border-b border-black pb-5`}>
                    {daySelected ? daySelected : new Date().toLocaleDateString()}
                </h1>
                <button className="text-base" onClick={handleDateIncrease}>
                    <p className="hover:bg-gray-400">{'>'}</p>
                </button>
            </div>
            {entriesOTD.length === 0 ? (
                <div className="flex flex-col items-center justify-center text-center space-y-5">
                    <div className="flex flex-row items-center justify-center text-center text-sm md:text-base">
                        No hobbies for this day
                    </div>
                    <div className="flex flex-row justify-center items-center w-full">
                        <button className="text-sm md:text-base border border-neutral-400 rounded-md m-1 p-1" onClick={() => {
                            setModalOpen('logsession');
                            setModalParent('calendar')
                            setDaySelected(daySelected);
                        }}>
                            <p className="hover:bg-gray-400 text-center p-1 rounded-md">{'+ Add Another Session to Today'}</p>
                        </button>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col justify-start items-center w-full space-y-5 scrollbar-webkit h-full" style={{ overflow: 'auto' }}>
                    {entriesOTD.map((entry: IEntry, index: number) => {
                        const timeToShow = ConvertTime(entry);
                        let goal;
                        if (entry.fields.find((field) => field.name === 'goals')) {
                            const hobbyGoals = entry.fields.find((field) => field.name === 'goals');
                            const goalToUse = hobbyGoals?.value;
                            const goalParsed = goalToUse?.toString().split('-') as string[];
                            goal = goalParsed[1] as string;
                        }
                        return (
                            <div key={index} className="flex flex-col justify-between items-start w-4/5">
                                <div className="flex flex-row justify-start items-start w-full">
                                    <h1 className={`text-sm md:text-base font-semibold text-center underline`}>
                                        {objectTitle}
                                    </h1>
                                </div>
                                <div className="flex flex-row justify-start items-start w-full pl-5 text-xs md:text-sm">
                                    <div className="flex flex-col justify-start items-start w-1/2">
                                        <p>
                                            Categories: {entry.fields.find((field) => field.name === 'categories')?.value.flat().join(', ') || 'No categories available'}
                                        </p>
                                        <p className={`text-center`}>
                                            Description: {entry.fields.find((field) => field.name === 'descriptions')?.value.join('') || 'No description available'}
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
                    })}
                    {adminID &&
                        <div className="flex flex-row justify-center items-center w-full">
                            <button className="text-sm md:text-base border border-neutral-400 rounded-md m-1 p-1" onClick={() => {
                                setModalOpen('logsession');
                                setModalParent('calendar')
                                setDaySelected(daySelected);
                            }}>
                                <p className="hover:bg-gray-400 text-center p-1 rounded-md">{'+ Add Another Session to Today'}</p>
                            </button>
                        </div>
                    }
                </div>
            )
            }
        </div>
    )
};

export default CalendarView;