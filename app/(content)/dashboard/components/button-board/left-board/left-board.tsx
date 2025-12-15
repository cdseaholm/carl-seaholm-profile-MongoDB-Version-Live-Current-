'use client';

import { Checkbox, Combobox, Group, ScrollArea, useCombobox } from '@mantine/core';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import LeftBoardContent from './left-board-content';
import LoadingSpinner from '@/app/(content)/projects/school/infoVis-DatasetProject/components/components/misc/loadingSpinner';
import { DateRangeType, useDataStore } from '@/context/dataStore';
import { FiFilter } from 'react-icons/fi';
import { useStateStore } from '@/context/stateStore';

export type HobbyCheckMarkType = {
    _id: string;
    title: string;
};

export default function LeftBoard({ hobbies }: { hobbies: { _id: string, title: string }[] }) {

    const [loading, setLoading] = useState(true);

    // Subscribe to store state - this makes component re-render on changes
    const currDateFilters = useDataStore(state => state.filteredDates);
    const currHobbyFilters = useDataStore(state => state.filteredHobbies);
    const setCurrFilteredDates = useDataStore(state => state.setFilteredDates);
    const setCurrFilteredHobbies = useDataStore(state => state.setFilteredHobbies);
    const width = useStateStore(state => state.widthQuery);
    const combobox = useCombobox({

    });

    const today = new Date();
    const minusFiveMonths = new Date();
    minusFiveMonths.setMonth(today.getMonth() - 5);
    // Local state for temporary filter values while dropdown is open
    const [newFilters, setNewFilters] = useState(false);
    const [tabsTypeCopy, setTabsTypeCopy] = useState<string | null>(currDateFilters.type || 'range');
    const [dateValues, setDateValues] = useState<DateRangeType>(currDateFilters);
    const [filteredHobbies, setFilteredHobbies] = useState<HobbyCheckMarkType[]>(currHobbyFilters);

    const hobbiesPlusAll = [{ _id: 'all', title: 'All Hobbies' } as HobbyCheckMarkType, ...hobbies];

    // Sync local state with store when dropdown opens
    useEffect(() => {
        if (combobox.dropdownOpened) {
            setNewFilters(false);
            setDateValues(currDateFilters);
            setFilteredHobbies(currHobbyFilters);
            setTabsTypeCopy(currDateFilters.type);
        }
    }, [combobox.dropdownOpened, currDateFilters, currHobbyFilters]);

    const options = hobbiesPlusAll.map((item) => {
        const allActive = filteredHobbies.length === hobbiesPlusAll.length - 1;
        const activeItem = item._id === 'all' ? allActive : filteredHobbies.some(h => h._id === item._id);

        if (!item) return null;

        return (
            <Combobox.Option value={item.title} key={item._id} active={activeItem} w={'100%'} onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                setNewFilters(true);
                if (item._id === 'all') {
                    if (allActive) {
                        setFilteredHobbies([]);
                    } else {
                        setFilteredHobbies(hobbies.map(hobby => hobby));
                    }
                } else if (allActive) {
                    setFilteredHobbies([item]);
                } else if (filteredHobbies.some(h => h._id === item._id)) {
                    setFilteredHobbies((current) => current.filter((hobby) => hobby._id !== item._id));
                } else {
                    setFilteredHobbies((current) => [...current, item]);
                }
            }}>
                <Group w={'100%'}>
                    <div className='flex flex-row justify-start items-center h-content w-content gap-2 truncate'>
                        <Checkbox
                            checked={activeItem}
                            aria-hidden
                            tabIndex={-1}
                            style={{ pointerEvents: 'none' }}
                            readOnly
                        />
                        <span className='flex flex-row justify-start items-center h-content w-content truncate'>{item.title}</span>
                    </div>
                </Group>
            </Combobox.Option>
        )
    });

    const handleApplyFilters = () => {
        setNewFilters(false);
        setCurrFilteredDates(dateValues);
        setCurrFilteredHobbies(filteredHobbies);
        toast.success('Filters applied');
        combobox.closeDropdown();
    }

    useEffect(() => {
        if (hobbies && hobbies.length > 0) {
            const hobbiesData = hobbies.map(hobbySession => hobbySession);
            // Only set if not already set
            if (currHobbyFilters.length === 0) {
                setFilteredHobbies(hobbiesData);
                setCurrFilteredHobbies(hobbiesData);
            }
            setLoading(false);
        }
    }, [hobbies, currHobbyFilters.length, setCurrFilteredHobbies]);

    return (
        <Combobox
            store={combobox}
            withinPortal={false}
            width={'100%'}
        >
            <Combobox.DropdownTarget>
                <button type='button' className={`flex flex-row justify-center items-center ${width > 400 && 'space-x-2'} hover:bg-gray-300 rounded-md px-4 py-1 sm:py-1 rounded-md bg-gray-400/40 border w-1/3 sm:w-1/4 md:w-1/5 h-content cursor-pointer`} onClick={() => combobox.toggleDropdown()}>
                    {width > 400 && <FiFilter className='h-4 w-4' />}
                    <p className={`text-xs sm:text-sm md:text-base hover:text-gray-800`}>Filter</p>
                </button>
            </Combobox.DropdownTarget>

            <Combobox.Dropdown w={'auto'} h={'auto'}>
                <ScrollArea.Autosize maw={'100%'} mah={width > 640 ? '80%' : 'auto'} type='always' w={'100%'}>
                    {loading ? (
                        <LoadingSpinner />
                    ) : (
                        <LeftBoardContent options={options} dateValues={dateValues} setDateValues={setDateValues} handleApplyFilters={handleApplyFilters} tabsTypeCopy={tabsTypeCopy} setTabsTypeCopy={setTabsTypeCopy} newFilters={newFilters} setNewFilters={setNewFilters} />
                    )}
                </ScrollArea.Autosize>
            </Combobox.Dropdown>
        </Combobox>
    );
}