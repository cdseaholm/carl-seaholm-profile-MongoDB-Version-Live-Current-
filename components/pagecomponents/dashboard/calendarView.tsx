'use client'

import { Spinner } from "@/components/misc/Spinner";
import { useModalStore } from "@/context/modalStore";
import { EntriesOTDType } from "@/models/types/otds";
import { useEffect, useState } from "react";

function ConvertTime(object: string) {
    let timeToShow = '' as string;
    if (object) {
        let parsedT = Number(object);

        if (parsedT > 60) {

            let newTHours = Math.floor(parsedT / 60);
            let newTMins = parsedT % 60;
            timeToShow = `${newTHours} hours, ${newTMins} minutes`;

        }
    } else {
        timeToShow = `${object} minutes`
    }
    return timeToShow;
}

export default function CalendarView({ adminID, handleDateDecrease, handleDateIncrease, entriesOTD, daySelected, handleDaySelected, otdLength }: { adminID: boolean, handleDateDecrease: () => void, handleDateIncrease: () => void, entriesOTD: EntriesOTDType[], daySelected: string, handleDaySelected: (daySelected: string) => void, otdLength: number }) {

    const setModalOpen = useModalStore((state) => state.setModalOpen);
    const setModalParent = useModalStore((state) => state.setModalParent);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        setLoading(false);
    }, [entriesOTD, otdLength]);

    return (
        loading ? (
            <Spinner />
        ) : (
            <div className="p-2 flex flex-col w-full h-full justify-start items-center space-y-10" style={{ fontSize: '10px' }}>
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
                {otdLength === 0 ? (
                    <div className="flex flex-col items-center justify-center text-center space-y-5">
                        <div className="flex flex-row items-center justify-center text-center text-sm md:text-base">
                            No hobbies for this day
                        </div>
                        <div className="flex flex-row justify-center items-center w-full">
                            <button className="text-sm md:text-base border border-neutral-400 rounded-md m-1 p-1" onClick={() => {
                                setModalOpen('logsession');
                                setModalParent('calendar')
                                handleDaySelected(daySelected);
                            }}>
                                <p className="hover:bg-gray-400 text-center p-1 rounded-md">{'+ Add Another Session to Today'}</p>
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col justify-start items-center w-full space-y-5 scrollbar-webkit h-full" style={{ overflow: 'auto' }}>
                        {entriesOTD.map((entry: EntriesOTDType, index: number) => {
                            if (entry) {
                                const timeToShow = ConvertTime(entry.totalMinutes);
                                let goal;
                                if (entry.goals) {
                                    const goalParsed = entry.goals?.toString().split('-') as string[];
                                    goal = goalParsed[1];
                                }
                                const categories = entry.categories;
                                let category = '';
                                if (entry.categories) {
                                    category = categories[0] as string
                                }
                                const descriptions = entry.descriptions;
                                let description = '';
                                if (entry.descriptions) {
                                    description = descriptions[0] as string
                                }
                                let val = '0';
                                if (entry.value) {
                                    let parsedVal = Number(entry.value);
                                    if (parsedVal && parsedVal > 59) {
                                        let newHours = Math.floor(parsedVal / 60);
                                        let newMins = parsedVal % 60;
                                        val = `${newHours} hours, ${newMins} minutes`;
                                    } else {
                                        val = `${entry.value} minutes`
                                    }
                                }

                                const title = entry.hobbyTitle as string
                                return (
                                    <div key={index} className="flex flex-col justify-between items-start h-full w-full md:w-3/5 lg:1/2">
                                        <div className="flex flex-row justify-start items-start w-full">
                                            <h1 className={`text-sm md:text-base font-semibold text-center underline`}>
                                                {title || 'No title available'}
                                            </h1>
                                        </div>
                                        <div className="flex flex-row justify-start items-start w-full pl-5 text-xs md:text-sm">
                                            <div className="flex flex-col justify-start items-start w-full">
                                                <p>
                                                    <span className="font-semibold underline">Categories:</span> {category && category !== 'null' ? category : 'No categories available'}
                                                </p>
                                                <p className={`text-center`}>
                                                    <span className="font-semibold underline">Description:</span> {description && description !== 'null' ? description : 'No description available'}
                                                </p>
                                                <p>
                                                    <span className="font-semibold underline">This session:</span> {val}
                                                </p>
                                                <p>
                                                    <span className="font-semibold underline">Total time:</span> {timeToShow}
                                                </p>
                                                <p>
                                                    <span className="font-semibold underline">Goal:</span> {goal ? goal : 'No goal available'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                            return null
                        })}
                        {adminID &&
                            <div className="flex flex-row justify-center items-center w-full">
                                <button className="text-sm md:text-base border border-neutral-400 rounded-md m-1 p-1" onClick={() => {
                                    setModalOpen('logsession');
                                    setModalParent('calendar')
                                    handleDaySelected(daySelected);
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
    )
};