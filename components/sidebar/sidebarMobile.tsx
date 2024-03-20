import React, { useState } from 'react';
import { DropdownPage } from '../dropdown/dropdown';

const SidebarMobile = ({ setTrackerState }: { setTrackerState: (value: string) => void; }) => {
    const [filterNoTrack, setFilterNoTrack] = useState(false);
    const [name, setName] = useState(filterNoTrack ? 'No Filter' : 'All');

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
        {name: 'Arts'},
        {name: 'Hobbies'},
        {name: 'Musical'},
        {name: 'Physical'},
        {name: 'Technological'},
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
                {DropdownPage({ itemsToFilter: toTrack, setName: setName, name: name, filterNoTrack: filterNoTrack, toTrackCategories: toTrackCategories})}
            </div>
        </div>
    );
}

export default SidebarMobile;
