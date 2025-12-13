'use client'

import { useModalStore } from "@/context/modalStore";
import { IoIosStats } from "react-icons/io";
import { FaCalendar } from "react-icons/fa";
import { useDataStore } from "@/context/dataStore";
import { Menu } from "@mantine/core";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import { toast } from "sonner";
import { PiListHeartLight } from "react-icons/pi";

export default function RightBoard({ dashToShow, handleDashToShow, handleDaySelected, daySelected, adminID }: { dashToShow: string, handleDashToShow: (dashToShow: string, handleModalOpen: string | null) => void, handleDaySelected: (date: string) => void, daySelected: string, adminID: boolean }) {

    //const buttonClass = `flex flex-row justify-center items-center space-x-2 hover:bg-gray-300 rounded-md px-2 py-2 sm:py-1 rounded-md bg-gray-400/40 border w-content`;
    const onTextClass = `text-xs sm:text-sm md:text-base text-gray-800 cursor-pointer`;
    const offTextClass = `text-xs sm:text-sm md:text-base text-gray-500 underline cursor-not-allowed`;
    const setShowCalendar = useModalStore(state => state.setShowCalendar);
    const setFilteredDates = useDataStore(state => state.setFilteredDates);
    const setFilteredHobbies = useDataStore(state => state.setFilteredHobbies);
    const [chevUp, setChevUp] = useState(false);
    const setNewHobbyModalOpen = useModalStore((state) => state.setShowAddHobbyModal);
    const setLogSessionModalOpen = useModalStore((state) => state.setLogSessionModalOpen);

    return (
        <div className="flex flex-row items-center justify-end space-x-2">
            <Menu shadow="md" width={200} onOpen={() => setChevUp(true)} onClose={() => setChevUp(false)} closeOnClickOutside={true} closeOnEscape={true} closeOnItemClick={true}>
                <Menu.Target>
                    <div className="flex flex-row justify-center items-center space-x-2 hover:bg-gray-300 rounded-md px-4 py-1 sm:py-1 rounded-md bg-gray-400/40 border w-content cursor-pointer" >
                        <p>Actions</p>
                        {chevUp ? <ChevronDownIcon className="h-5 w-5 transform rotate-180" /> : <ChevronDownIcon className="h-5 w-5" />}
                    </div>
                </Menu.Target>

                <Menu.Dropdown>
                    <Menu.Label>Application</Menu.Label>
                    <Menu.Item leftSection={<FaCalendar size={14} />} onClick={() => {
                        setFilteredDates({ range: [null, null], type: 'range' });
                        setFilteredHobbies([]);
                        setShowCalendar(true);
                        handleDaySelected(daySelected);
                        handleDashToShow('calendar', null);
                    }} disabled={dashToShow === 'calendar'}>
                        <p className={`${dashToShow === 'calendar' ? offTextClass : onTextClass}`}>{'View Calendar'}</p>
                    </Menu.Item>
                    <Menu.Item leftSection={<IoIosStats size={14} />} onClick={() => {
                        setFilteredDates({ range: [null, null], type: 'range' });
                        setFilteredHobbies([]);
                        handleDashToShow('stats', null);
                    }} disabled={dashToShow === 'stats'}>
                        <p className={`${dashToShow === 'stats' ? offTextClass : onTextClass}`}>{"View Stats"}</p>
                    </Menu.Item>
                    <Menu.Item leftSection={<PiListHeartLight size={14} />} disabled={dashToShow === 'hobbies'} onClick={() => {
                        toast.info('Coming soon!');
                    }}>
                        <p className={`${dashToShow === 'hobbies' ? offTextClass : onTextClass}`}>
                            Veiw Hobbies
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