'use client'

import { useModalStore } from "@/context/modalStore";
import { FiAlignLeft, FiClock, FiCrosshair, FiList, FiWatch } from "react-icons/fi";
import { Switch } from '@mantine/core';
import { IHobbyData } from "@/models/types/hobbyData";
import { HobbySessionInfo } from "@/utils/apihelpers/get/initData/initDashboardParams";
import { toast } from "sonner";

function ConvertTime(time: number) {
    let timeToShow = '0 minutes' as string;
    if (time) {

        if (time > 60) {

            let newTHours = Math.floor(time / 60);
            let newTMins = time % 60;
            timeToShow = `${newTHours} hours, ${newTMins} minutes`;

        } else {
            timeToShow = `${time} minutes`
        }
    }
    return timeToShow;
}

export default function CalendarView({ adminID, handleDateDecrease, handleDateIncrease, entriesOTD, daySelected, handleDaySelected, otdLength, handleCats, handleDescriptions, handleGoals, handleTotalTime, showCats, showDescriptions, showGoals, showTotTime }: { adminID: boolean, handleDateDecrease: () => void, handleDateIncrease: () => void, entriesOTD: HobbySessionInfo[], daySelected: string, handleDaySelected: (daySelected: string) => void, otdLength: number, handleCats: () => void, handleDescriptions: () => void, handleGoals: () => void, handleTotalTime: () => void, showCats: boolean, showDescriptions: boolean, showGoals: boolean, showTotTime: boolean }) {

    const setLogSessionModalOpen = useModalStore((state) => state.setLogSessionModalOpen);
    const setModalParent = useModalStore((state) => state.setModalParent);
    const infoClass = 'text-start flex-row flex items-center justify-start py-2 text-sm md:text-base';

    return (
        <div className="p-2 flex flex-col w-full h-full justify-start items-center space-y-2" style={{ fontSize: '10px' }}>
            <div className={`flex flex-row justify-evenly w-1/2 pb-5 self-center items-start`}>
                <button className="text-base" onClick={handleDateDecrease}>
                    <p className="hover:bg-gray-400">{'<'}</p>
                </button>
                <h1 className={`text-sm md:text-base font-semibold text-center w-2/3 border-b border-black pb-5`}>
                    {daySelected}
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
                    <div className="grid grid-cols-1 sm:grid-cols-2 justify-center items-center w-full h-full gap-2">
                        {entriesOTD && entriesOTD.map((hobby: HobbySessionInfo, index: number) => {
                            const hobbyInfo = hobby.hobbyData as IHobbyData;
                            const category = hobbyInfo.category;
                            const description = hobbyInfo.description;
                            const goals = hobbyInfo.goals;
                            if (!hobby.sessions || hobby.sessions.length === 0) {
                                return null; // Skip rendering if no sessions
                            }
                            if (hobby.sessions.length > 1) {
                                console.log('Multiple sessions for this hobby on this day, showing first only');
                            }
                            const sesh = hobby.sessions[0];
                            const specVal = ConvertTime(sesh.minutes as number);
                            const hobbyVal = ConvertTime(hobby ? hobby.totalMinutes : 0);
                            const title = hobbyInfo.title as string;

                            return (
                                <div key={index} className="flex flex-col justify-center items-center border border-neutral-400 rounded-md p-2 inset-shadow-md bg-orange-50 rounded-md w-full h-content divide-y-1">
                                    <div className="flex flex-row justify-between items-center w-full px-4 py-1" style={{ width: '100%' }}>
                                        <h1 className={`text-sm md:text-base font-semibold underline flex-1`}>
                                            {title || 'No title available'}
                                        </h1>
                                        <div className="flex flex-row justify-end items-center space-x-2 flex-shrink-0">
                                            <button type="button" onClick={() => toast.info('Edit session functionality coming soon!')} className="rounded-md p-1">
                                                <p className="text-sm md:text-base hover:underline text-blue-400 hover:text-blue-200">Edit</p>
                                            </button>
                                            <button type="button" onClick={() => toast.info('Delete session functionality coming soon!')} className="rounded-md p-1">
                                                <p className="text-sm md:text-base hover:underline text-red-400 hover:text-red-200">Delete</p>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2 w-full p-2">
                                        <p className={infoClass}>
                                            <FiWatch title="This session's time" className="m-2" /> {specVal}
                                        </p>
                                        {showCats && <p className={infoClass}>
                                            <FiList title="Categories" className="m-2" /> {category && category !== 'null' ? category : 'No categories available'}
                                        </p>}
                                        {showDescriptions && <p className={infoClass}>
                                            <FiAlignLeft title="Details" className="m-2" /> {description && description !== 'null' ? description : 'No description available'}
                                        </p>}
                                        {showGoals && <p className={`${infoClass} span-cols-2`}>
                                            <FiCrosshair title="Goals" className="m-2" /> {goals[0] ? goals[0] : 'No goal available'}
                                        </p>}
                                        {showTotTime && <p className={infoClass}>
                                            <FiClock title="Total time For this hobby" className="m-2" /> {hobbyVal}
                                        </p>}
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                    {adminID && adminID &&
                        <div className="flex flex-row justify-center items-center w-full">
                            <button className="text-sm md:text-base border border-neutral-400 rounded-md m-1 p-1" onClick={() => {
                                handleDaySelected(daySelected);
                                setLogSessionModalOpen(true)
                                setModalParent('calendar');
                            }}>
                                <p className="hover:bg-gray-400 text-center p-1 rounded-md">{'+ Add Another Session to Today'}</p>
                            </button>
                        </div>
                    }

                </div>
            )
            }
        </div >
    )

};