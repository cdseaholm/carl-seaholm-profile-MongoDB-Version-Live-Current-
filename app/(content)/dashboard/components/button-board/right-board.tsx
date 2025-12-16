'use client'

import { useModalStore } from "@/context/modalStore";
import { IoIosStats } from "react-icons/io";
import { FaCalendar } from "react-icons/fa";
import { useDataStore } from "@/context/dataStore";
import { Menu } from "@mantine/core";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import { toast } from "sonner";
import { PiListHeartLight } from "react-icons/pi";
import { useStateStore } from "@/context/stateStore";
import { IoMdColorPalette } from "react-icons/io";

export default function RightBoard({ dashToShow, handleDashToShow, handleDaySelected, daySelected, adminID }: { dashToShow: 'hobbies' | 'stats' | 'sessions', handleDashToShow: (dashToShow: 'hobbies' | 'stats' | 'sessions') => void, handleDaySelected: (date: string) => void, daySelected: string, adminID: boolean }) {

    //const buttonClass = `flex flex-row justify-center items-center space-x-2 hover:bg-gray-300 rounded-md px-2 py-2 sm:py-1 rounded-md bg-gray-400/40 border w-content`;
    const onTextClass = `text-xs sm:text-sm md:text-base text-gray-800 cursor-pointer`;
    const offTextClass = `text-xs sm:text-sm md:text-base text-gray-500 underline cursor-not-allowed`;
    const setShowCalendar = useModalStore(state => state.setShowCalendar);
    const setFilteredDates = useDataStore(state => state.setFilteredDates);
    const setFilteredHobbies = useDataStore(state => state.setFilteredHobbies);
    const [chevUp, setChevUp] = useState(false);
    const setNewHobbyModalOpen = useModalStore((state) => state.setShowAddHobbyModal);
    const setLogSessionModalOpen = useModalStore((state) => state.setLogSessionModalOpen);
    const width = useStateStore(state => state.widthQuery);
    const setShowColorIndexModal = useModalStore(state => state.setShowColorIndexModal);

    return (
        <div className="flex flex-row items-center justify-end space-x-2 w-full">
            <Menu shadow="md" width={200} onOpen={() => setChevUp(true)} onClose={() => setChevUp(false)} closeOnClickOutside={true} closeOnEscape={true} closeOnItemClick={true} styles={{

            }}>
                <Menu.Target>
                    <div className={`flex flex-row justify-center items-center ${width > 400 && 'space-x-2'} hover:bg-gray-300 rounded-md px-4 py-1 sm:py-1 rounded-md bg-gray-400/40 border w-1/3 sm:w-1/4 md:w-1/5 h-content cursor-pointer`}>
                        <p className={`text-xs sm:text-sm md:text-base hover:text-gray-800`}>Actions</p>
                        {width > 400 && chevUp ? <ChevronUpIcon className="h-4 w-4 transform rotate-180" /> : width > 400 && !chevUp ? <ChevronDownIcon className="h-4 w-4" /> : null}
                    </div>
                </Menu.Target>

                <Menu.Dropdown>
                    <Menu.Label>Application</Menu.Label>
                    <Menu.Item leftSection={<FaCalendar size={14} />} onClick={() => {
                        setFilteredDates({ range: [null, null], type: 'range' });
                        setFilteredHobbies([]);
                        setShowCalendar(true);
                    }}>
                        <p className={onTextClass}>{'View Calendar'}</p>
                    </Menu.Item>
                    <Menu.Item leftSection={<PiListHeartLight size={14} />} disabled={dashToShow === 'sessions'} onClick={() => {
                        setFilteredDates({ range: [null, null], type: 'range' });
                        setFilteredHobbies([]);
                        handleDaySelected(daySelected);
                        handleDashToShow('sessions');
                    }}>
                        <p className={`${dashToShow === 'sessions' ? offTextClass : onTextClass}`}>
                            View Sessions
                        </p>
                    </Menu.Item>
                    <Menu.Item leftSection={<IoIosStats size={14} />} onClick={() => {
                        setFilteredDates({ range: [null, null], type: 'range' });
                        setFilteredHobbies([]);
                        handleDashToShow('stats');
                    }} disabled={dashToShow === 'stats'}>
                        <p className={`${dashToShow === 'stats' ? offTextClass : onTextClass}`}>{"View Stats"}</p>
                    </Menu.Item>
                    <Menu.Item leftSection={<PiListHeartLight size={14} />} disabled={dashToShow === 'hobbies'} onClick={() => {
                        toast.info('Coming soon!');
                    }}>
                        <p className={`${dashToShow === 'hobbies' ? offTextClass : onTextClass}`}>
                            View Hobbies
                        </p>
                    </Menu.Item>
                    <Menu.Item leftSection={<IoMdColorPalette size={14} />} onClick={() => {
                        setShowColorIndexModal(true);
                    }}>
                        <p className={onTextClass}>
                            View Color Indexes
                        </p>
                    </Menu.Item>

                    {adminID &&
                        <>
                            <Menu.Divider />
                            <Menu.Label>Admin</Menu.Label>
                            <Menu.Item onClick={() => setNewHobbyModalOpen(true)}>
                                <p className={onTextClass}>
                                    Add Tracker
                                </p>
                            </Menu.Item>
                            <Menu.Item onClick={() => setLogSessionModalOpen(true)}>
                                <p className={onTextClass}>
                                    Log Session
                                </p>
                            </Menu.Item>
                            <Menu.Item onClick={() => toast.info('Edit soon to come')}>
                                <p className={onTextClass}>
                                    Edit
                                </p>
                            </Menu.Item>
                        </>
                    }
                </Menu.Dropdown>
            </Menu>

        </div>
    )
}