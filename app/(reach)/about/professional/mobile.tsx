'use client'

import React, { useState, useRef } from 'react';
import { DropdownPage } from '@/components/dropdown/dropdown';
import professionalView from '../../../../components/professionalComponents/professionaView';
import { Divider } from '@nextui-org/react';

const openInNewTab = (url: string) => {
  const win = window.open(url, '_blank');
  win?.focus();
};

export default function ProfessionalMobile() {
  const [category, setCategory] = useState('Timeline');
  const [showDivider, setShowDivider] = useState(false);
  const divRef = useRef(null);

const handleScroll = () => {
    const divElement = divRef.current as unknown as HTMLDivElement;
    if (divElement) {
        const scrollPosition = divElement.scrollTop;
        if (scrollPosition > 5) {
            setShowDivider(true);
        } else {
            setShowDivider(false);
        }
    }
};

  const categories = [
    'Timeline',
    'Developing',
    'Management',
    'Sales',
  ];

return (
    <main>
                <h1 className="flex text-5xl font-bold pt-5 pr-5 justify-end">Carl Seaholm</h1>
                <h2 className="flex text-lg font-bold pt-5 pr-5 justify-end">Professional Timeline</h2>
                <div className={`${showDivider ? 'divide-y divide-solid divide-slate-800 width-full' : ''}`}>
                    <div className='flex justify-end pt-5 py-5'>
                        <div className='flex flex-col'>
                            {/*}
                            <DropdownPage itemsToFilter={categories} setName={setCategory} nameTitle={category} />
                            */}
                            </div>
                        </div>
                        <div className='flex bg-white/30 p-2 rounded-md 60 mt-5 justify-center' style={{ maxHeight: '100vh', overflowY: 'auto', scrollbarWidth: 'thin', scrollbarColor: 'rgba(100, 116, 139, 1) rgba(0, 0, 0, 0.1)',}}
                        onScroll={handleScroll} ref={divRef}>
                            {professionalView()}
                    </div> 
                </div>

    </main>
);
}