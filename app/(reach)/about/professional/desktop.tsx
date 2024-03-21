'use client'

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import professionalView from '../../../../components/professionalComponents/professionaView';

const openInNewTab = (url: string) => {
  const win = window.open(url, '_blank');
  win?.focus();
};

export default function ProfessionalDesktop() {
  const [isHovered, setIsHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [category, setCategory] = useState('Timeline');
  const [showDivider, setShowDivider] = useState(false);
  const divRef = useRef(null);

  const imageClick = () => {
    setIsHovered(!isHovered);
    setClicked(!clicked);
  };

  const style = {
    profilepicture: {
      large: `absolute z-20 top-25 left-10 rounded-full overflow-x-hidden transition-all ease duration-200 ${isHovered ? 'cursor-pointer' : ''}`,
      small: `absolute z-20 top-25 left-10 rounded-full overflow-x-hidden transition-all ease duration-200 ${isHovered ? 'cursor-pointer' : ''}`
    },
  };

  const imageRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleOutsideClick = (event: { target: any; }) => {
      if (!imageRef.current || !imageRef.current.contains(event.target as HTMLDivElement)) {
        if (!clicked) return;
        imageClick();
      }
    };
    window.addEventListener('mousedown', handleOutsideClick);
    return () => window.removeEventListener('mousedown', handleOutsideClick);
  }, [clicked, imageRef]);

  const categories = [
    'Timeline',
    'Developing',
    'Management',
    'Sales',
  ];

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

  return (
    <main>
        <div ref={imageRef} className={`mt-5 ml-5 ${clicked ? style.profilepicture.large : style.profilepicture.small}`}>
            <Image
            onClick={imageClick}
            priority
            src="/images/carlseaholmimage.jpg"
            className={`z-30 rounded-full overflow-x-hidden transition-all ease duration-200 ${isHovered ? 'cursor-pointer' : ''}`}
            height={clicked ? 200 : 100}
            width={clicked ? 200 : 100}
            alt="Carl Seaholm Profile Photo"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            />
        </div>
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