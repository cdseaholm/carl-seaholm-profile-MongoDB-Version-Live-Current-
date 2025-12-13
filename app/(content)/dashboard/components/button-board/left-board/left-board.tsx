'use client';

import { Checkbox, Combobox, Group, useCombobox } from '@mantine/core';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import LeftBoardContent from './left-board-content';
import LoadingSpinner from '@/app/(content)/projects/school/infoVis-DatasetProject/components/components/misc/loadingSpinner';
import { DateRangeType, useDataStore } from '@/context/dataStore';
import { FiFilter } from 'react-icons/fi';

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
            width={'auto'}

        >
            <Combobox.DropdownTarget>
                <button type='button' className={`flex flex-row justify-center items-center space-x-2 hover:bg-gray-300 rounded-md px-8 py-2 sm:py-1 rounded-md bg-gray-400/40 border w-content`} onClick={() => combobox.toggleDropdown()}>
                    <FiFilter className='h-4 w-4' />
                    <p className={`text-xs sm:text-sm md:text-base hover:text-gray-800`}>Filter</p>
                </button>
            </Combobox.DropdownTarget>

            <Combobox.Dropdown>
                {loading ? (
                    <LoadingSpinner />
                ) : (
                    <LeftBoardContent options={options} dateValues={dateValues} setDateValues={setDateValues} handleApplyFilters={handleApplyFilters} tabsTypeCopy={tabsTypeCopy} setTabsTypeCopy={setTabsTypeCopy} newFilters={newFilters} setNewFilters={setNewFilters} />
                )}
            </Combobox.Dropdown>
        </Combobox>
    );
}