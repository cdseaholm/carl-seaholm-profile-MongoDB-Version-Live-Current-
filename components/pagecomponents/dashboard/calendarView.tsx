'use client'

import { useModalStore } from "@/context/modalStore";
import { EntriesOTDType } from "@/models/types/otds";
import { FiAlignLeft, FiClock, FiCrosshair, FiList, FiWatch } from "react-icons/fi";
import { Switch } from '@mantine/core';

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

export default function CalendarView({ adminID, handleDateDecrease, handleDateIncrease, entriesOTD, daySelected, handleDaySelected, otdLength, handleCats, handleDescriptions, handleGoals, handleTotalTime, showCats, showDescriptions, showGoals, showTotTime }: { adminID: boolean, handleDateDecrease: () => void, handleDateIncrease: () => void, entriesOTD: EntriesOTDType[], daySelected: Date, handleDaySelected: (daySelected: Date) => void, otdLength: number, handleCats: () => void, handleDescriptions: () => void, handleGoals: () => void, handleTotalTime: () => void, showCats: boolean, showDescriptions: boolean, showGoals: boolean, showTotTime: boolean }) {

    const setModalOpen = useModalStore((state) => state.setModalOpen);
    const setModalParent = useModalStore((state) => state.setModalParent);

    return (
        <div className="p-2 flex flex-col w-full h-full justify-start items-center space-y-2" style={{ fontSize: '10px' }}>
            <div className={`flex flex-row justify-evenly w-1/2 pb-5 self-center items-start`}>
                <button className="text-base" onClick={handleDateDecrease}>
                    <p className="hover:bg-gray-400">{'<'}</p>
                </button>
                <h1 className={`text-sm md:text-base font-semibold text-center w-2/3 border-b border-black pb-5`}>
                    {daySelected.toLocaleDateString()}
                </h1>
                <button className="text-base" onClick={handleDateIncrease}>
                    <p className="hover:bg-gray-400">{'>'}</p>
                </button>
            </div>
            {otdLength && otdLength === 0 ? (
                <div className="flex flex-col items-center justify-center text-center space-y-5">
                    <div className="flex flex-row items-center justify-center text-center text-sm md:text-base">
                        No hobbies for this day
                    </div>
                </div>
            ) : (
                <div className="flex flex-col justify-start items-center w-full space-y-12 scrollbar-webkit h-full" style={{ overflow: 'auto' }}>
                    <div className="grid grid-cols-2 md:grid-cols-4 justify-items-center align-items-center gap-4 border-b border-neutral-600 py-4">
                        <Switch onClick={handleCats} size="sm" name="catsSwitch" id="catsSwitch" label="Show Categories" />
                        <Switch onClick={handleDescriptions} size="sm" name="descriptionsSwitch" id="descriptionsSwitch" label="Show Descriptions" />
                        <Switch onClick={handleGoals} size="sm" name="goalsSwitch" id="goalsSwitch" label="Show Goals" />
                        <Switch onClick={handleTotalTime} size="sm" name="totalTimeSwitch" id="totalTimeSwitch" label="Show Total Hobby Time" />
                    </div>
                    <div className="grid grid-cols-2 justify-center items-center w-full h-full">
                        {entriesOTD && entriesOTD.map((entry: EntriesOTDType, index: number) => {
                            
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
                                    <div key={index} className="flex flex-col justify-center items-center h-full w-full lg:w-4/5 pb-12">
                                        <div className="flex flex-row justify-start items-start w-full">
                                            <h1 className={`text-sm md:text-base font-semibold underline w-full pl-6`}>
                                                {title || 'No title available'}
                                            </h1>
                                        </div>
                                        <div className="flex flex-row justify-center items-center w-full pl-5 text-xs md:text-sm">
                                            <div className="flex flex-col justify-start items-start w-full">
                                                <p className={`text-center flex-row flex items-center justify-center`}>
                                                    <FiWatch title="This session's time" className="m-2" /> {val}
                                                </p>
                                                {showCats && <p className={`text-center flex-row flex items-center justify-center`}>
                                                    <FiList title="Categories" className="m-2" /> {category && category !== 'null' ? category : 'No categories available'}
                                                </p>}
                                                {showDescriptions && <p className={`text-center flex-row flex items-center justify-center`}>
                                                    <FiAlignLeft title="Details" className="m-2" /> {description && description !== 'null' ? description : 'No description available'}
                                                </p>}
                                                {showGoals && <p className={`text-center flex-row flex items-center justify-center`}>
                                                    <FiCrosshair title="Goals" className="m-2" /> {goal ? goal : 'No goal available'}
                                                </p>}
                                                {showTotTime && <p className={`text-center flex-row flex items-center justify-center`}>
                                                    <FiClock title="Total time" className="m-2" /> {timeToShow}
                                                </p>}

                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                            return null
                        })}
                    </div>

                    {adminID && adminID &&
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

};