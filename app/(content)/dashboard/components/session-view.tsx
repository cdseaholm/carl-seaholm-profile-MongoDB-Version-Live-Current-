'use client'

import { Drawer, Switch } from '@mantine/core';
import { useDisclosure } from "@mantine/hooks";
import HobbyCard from "@/components/misc/hobby-card";
import { HobbySessionInfo } from "@/models/types/hobbyData";
import { Session } from 'next-auth';

export default function SessionsView({ adminID, handleDateDecrease, handleDateIncrease, entriesOTD, daySelected, handleDaySelected, handleCats, handleDescriptions, handleGoals, handleTotalTime, showCats, showDescriptions, showGoals, showTotTime, handleModalOpen, handleDashToShow, session, handleLoading }: { adminID: boolean, handleDateDecrease: () => void, handleDateIncrease: () => void, entriesOTD: HobbySessionInfo[], daySelected: string, handleDaySelected: (daySelected: string) => void, handleCats: () => void, handleDescriptions: () => void, handleGoals: () => void, handleTotalTime: () => void, showCats: boolean, showDescriptions: boolean, showGoals: boolean, showTotTime: boolean, handleModalOpen: (modal: "newHobby" | "logSession" | "colorIndex" | null) => void, handleDashToShow: (dashToShow: "calendar" | "sessions" | "hobbies" | "stats") => void, session: Session | null, handleLoading: (loading: boolean) => void }) {

    const [opened, { open, close }] = useDisclosure(false);

    return (
        <div className="p-2 flex flex-col w-full h-full justify-start items-center space-y-2" style={{ fontSize: '10px' }}>
            <div className={`flex flex-row justify-center w-content space-x-12 pb-5 self-center items-center h-content border-b border-black`}>
                <button className="text-base" onClick={handleDateDecrease}>
                    <p className="hover:bg-gray-400 text-base md:text-lg">{'<'}</p>
                </button>
                <button className={`w-2/3 flex flex-row justify-center items-center h-full w-full`} type="button" onClick={() => {
                    handleDashToShow('calendar');
                }}>
                    <p className="hover:underline text-base md:text-lg font-semibold text-center w-full h-full">
                        {daySelected}
                    </p>
                </button>
                <button className="text-base" onClick={handleDateIncrease}>
                    <p className="hover:bg-gray-400 text-base md:text-lg">{'>'}</p>
                </button>
            </div>
            <div className="flex flex-col justify-start items-center w-full space-y-2 h-full overflow-hidden p-4">
                <Drawer opened={opened} onClose={close} title="Display Options" padding="xl" size="50%" position="bottom" bg={'red'}
                    h={'40dvh'}
                    styles={{
                        content: {
                            backgroundColor: 'rgb(138, 175, 148, 1)',
                        },
                        header: {
                            backgroundColor: 'rgba(138, 175, 148, 1)',
                        }
                    }}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[35dvh] py-8 px-12 rounded-t-md">
                        <Switch onClick={handleCats} size="sm" name="catsSwitch" id="catsSwitch" label="Show Categories" />
                        <Switch onClick={handleDescriptions} size="sm" name="descriptionsSwitch" id="descriptionsSwitch" label="Show Descriptions" />
                        <Switch onClick={handleGoals} size="sm" name="goalsSwitch" id="goalsSwitch" label="Show Goals" />
                        <Switch onClick={handleTotalTime} size="sm" name="totalTimeSwitch" id="totalTimeSwitch" label="Show Total Hobby Time" />
                    </div>
                </Drawer>
                <div className={`flex flex-row ${adminID && adminID ? 'justify-between' : 'justify-end'} items-center w-full h-content border-b border-black pb-2`}>
                    <button type="button" onClick={open} className="rounded-md py-2 h-content border border-neutral-400 w-2/5 sm:w-1/4 truncate hover:bg-gray-300 bg-gray-400 hover:underline">
                        <p className="text-center rounded-md text-sm md:text-md">{'Display Options'}</p>
                    </button>
                    {adminID && adminID &&
                        <button className="rounded-md py-2 h-content border border-neutral-400 w-2/5 sm:w-1/4 truncate hover:bg-gray-300 bg-gray-400 hover:underline" onClick={() => {
                            handleDaySelected(daySelected);
                            handleModalOpen('logSession');
                        }}>
                            <p className="text-center rounded-md text-sm md:text-md">{'Add/Edit'}</p>
                        </button>
                    }
                </div>
                <div className="flex flex-col justify-start items-center w-full h-full w-full scrollbar-webkit h-content p-2" style={{ overflow: 'auto' }}>

                    {entriesOTD && entriesOTD.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 justify-center items-center w-full h-content gap-2">
                            {entriesOTD.map((hobby: HobbySessionInfo, index: number) => (
                                <HobbyCard key={index} hobby={hobby} index={index} showCats={showCats} showDescriptions={showDescriptions} showGoals={showGoals} showTotTime={showTotTime} session={session} handleLoading={handleLoading} hobbySessionInfo={hobby}/>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center text-center space-y-5 w-full h-full p-10">
                            <div className="flex flex-row items-center justify-center text-center text-sm md:text-base font-semibold w-full h-full">
                                No hobbies for this day
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div >
    )
};