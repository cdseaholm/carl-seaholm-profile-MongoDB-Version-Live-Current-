'use client'

import React, { useState, useRef } from 'react';
import professionalView from '../../../../components/professionalComponents/professionaView';
import { MobileDropDown } from '../../../../components/dropdown/mobileDropdown';

export default function ProfessionalMobile() {
  const [category, setCategory] = useState('Timeline');
  const divRef = useRef(null);

  const categories = [
    'Timeline',
    'Development',
    'Management',
    'Sales',
    'Education'
  ];

  var headerTwo = category === 'Timeline' ? 'Full Timeline' : category + ' Timeline';

return (
    <main>
                <h1 className="flex text-5xl font-bold pt-5 pr-5 justify-end">Carl Seaholm</h1>
                <h2 className="flex text-lg font-bold pt-5 pr-5 justify-end">{headerTwo}</h2>
                <div className='flex justify-end pt-5 py-5'>
                  <div className='flex flex-col'>
                    <MobileDropDown 
                      menuStyle={`absolute right-4 z-30 py-1 px-1 text-left border border-gray-300 rounded-sm mt-9 mb-0 bg-clip-padding bg-slate-800/70 text-white shadow-lg w-30 cursor-pointer`} 
                      dropdownStyle={`absolute right-12 mr-2 z-10 flex justify-between w-30 text-black rounded px-1 pl-3 py-1 text-sm`} 
                      itemsToFilter={categories} 
                      setContextName={(category: string) => setCategory(category) } 
                      contextName={category}
                    />
                  </div>
                </div>
                <div className='flex bg-white/30 p-2 rounded-md 60 mt-7 mx-2 justify-center' style={{ maxHeight: '79vh', overflowY: 'auto', scrollbarWidth: 'thin', scrollbarColor: 'rgba(100, 116, 139, 1) rgba(0, 0, 0, 0.1)'}} ref={divRef}>
                  {professionalView({category: category})}
                </div> 

    </main>
);
}