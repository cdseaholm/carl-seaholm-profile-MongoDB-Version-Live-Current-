'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import { DropdownPage } from '@/components/dropdown/dropdown';
import professionalView from './professionaView';

const openInNewTab = (url: string) => {
  const win = window.open(url, '_blank');
  win?.focus();
};

export default function Professional() {
  const [isHovered, setIsHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [category, setCategory] = useState('Timeline');

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

  const categories = [
    { name: 'Timeline' },
    { name: 'Developing' },
    { name: 'Management' },
    { name: 'Sales' },
  ];

  return (
    <main>
      <div className="childFirst min-w-screen min-h-screen my-10 mx-10">
              <Image
                onClick={imageClick}
                priority
                src="/images/carlseaholmimage.jpg"
                className={`mt-5 ml-5 ${clicked ? style.profilepicture.large : style.profilepicture.small}`}
                height={clicked ? 200 : 100}
                width={clicked ? 200 : 100}
                alt="Carl Seaholm Profile Photo"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              />
          <h1 className="flex text-6xl font-bold pt-5 pr-5 justify-end">Carl Seaholm</h1>
          <div className='flex justify-end pt-5 py-5'>
            <div className='flex flex-col'>
            <DropdownPage itemsToFilter={categories} setName={setCategory} name={category} filterNoTrack={false} toTrackCategories={[]} />
            </div>
          </div>
          <div className='flex justify-center'>
            {professionalView({ category })}
          </div> 
          </div>
    </main>
  );
}