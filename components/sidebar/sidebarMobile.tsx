'use client'

import React, { useState } from 'react';
import { DropdownPage } from '../dropdown/dropdown';
import { MobileDropDown } from '../dropdown/mobileDropdown';

const SidebarMobile = ({ setTrackerState }: { setTrackerState: (value: string) => void; }) => {
    const [filterNoTrack, setFilterNoTrack] = useState(false);
    const [name, setName] = useState('No Filter');

    const toTrack = [
        {name: 'Brazilian Jiu Jitsu', category: 'physical'},
        {name: 'Coding', category: 'technological'},
        {name: 'Guitar', category: 'musical'},
        {name: 'Gym', category: 'physical'},
        {name: 'Language Learning', category: 'hobbies'},
        {name: 'Piano', category: 'musical'},
        {name: 'Reading', category: 'arts'},
        {name: 'Writing', category: 'arts'},
    ];

    const toTrackCategories = [
        'Arts',
        'Hobbies',
        'Musical',
        'Physical',
        'Technological',
    ];

    const flipFilter = ({which}: {which: string}) => {
        if (which === 'track') {
            if (!filterNoTrack) return;
            setFilterNoTrack(!filterNoTrack);
        } else if (which === 'filter') {
            if (filterNoTrack) return;
            setFilterNoTrack(!filterNoTrack);
        }
    }

    return (
        <div>
            <div className='flex justify-between px-1 pb-1'>
                <h1 onClick={() => flipFilter({which: 'track'})} className={`${filterNoTrack ? `text-slate-600` : `text-white`} items-start text-sm cursor-pointer`}>Trackers</h1>
                                <div className='flex flex-row align-centercursor-pointer' 
                    onClick={() => setFilterNoTrack(!filterNoTrack)}> {filterNoTrack ? '->' : '<-'}
                </div>

                <h1 onClick={() => flipFilter({which: 'filter'})} className={`${!filterNoTrack ? `text-slate-600` : `text-white`} items-start text-sm cursor-pointer`}>Filters</h1>
            </div>
            <div>
                <MobileDropDown 
                    menuStyle={`absolute right-4 z-30 py-1 px-1 text-left border border-gray-300 rounded-sm mt-9 mb-0 bg-clip-padding bg-slate-800/70 text-white shadow-lg w-30 cursor-pointer`} 
                    dropdownStyle={`absolute right-12 mr-2 z-10 flex justify-between w-30 text-black rounded px-1 pl-3 py-1 text-sm`} 
                    itemsToFilter={filterNoTrack ? toTrackCategories : toTrack} 
                    setContextName={(name: string) => () => setName(name)}
                    starterName={name}
                />
            </div>
        </div>
    );
}

export default SidebarMobile;
