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
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState('Timeline');
  const divRef = useRef(null);

  const imageClick = () => {
    setIsHovered(!isHovered);
    setClicked(!clicked);
  };

  const toggle = () => {
    setOpen(!open);
  };

  const style = {
    profilepicture: {
      large: `absolute z-20 top-25 left-20 rounded-full overflow-x-hidden transition-all ease duration-200 ${isHovered ? 'cursor-pointer' : ''}`,
      small: `absolute z-20 top-25 left-20 my-3 ml-3 rounded-full overflow-x-hidden transition-all ease duration-200 ${isHovered ? 'cursor-pointer' : ''}`
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

  React.useEffect(() => {
    const handleOutsideClick = (event: { target: any; }) => {
      if (!divRef.current || !(divRef.current as HTMLDivElement).contains(event.target as HTMLDivElement)) {
        if (!open) return;
        toggle();
      }
    };
    window.addEventListener('mousedown', handleOutsideClick);
    return () => window.removeEventListener('mousedown', handleOutsideClick);
  }, [open, divRef, toggle]);

  const categories = [
    'Timeline',
    'Developing',
    'Management',
    'Sales',
    'Education'
  ];

  var headerTwo = category === 'Timeline' ? 'Full Timeline' : category + ' Timeline';

  return (
    <main>
      <div className='flex flex-row justify-end'>
        <div ref={imageRef} className={`${clicked ? style.profilepicture.large : style.profilepicture.small}`}>
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
        <div className='flex flex-col pr-2'>
          <h1 className="flex text-5xl font-bold justify-end">Carl Seaholm</h1>
          <h2 className="flex text-lg font-bold justify-end pb-3">{headerTwo}</h2>
          <div className='flex flex-row justify-end items-center pr-2'>
            <p className='flex pr-2'>
              Filter:
            </p>
            <div ref={divRef} onClick={toggle} className='cursor-pointer w-5/12'>
                <div className='relative flex z-30 flex text-black rounded'>
                  {category}
                </div>
            </div>
            <div className='flex items-end'>
                        <svg
                            className="h-4"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                        >
                            <path
                                fillRule="evenodd"
                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            />
                        </svg>
                      </div>
            {open && 
              <div ref={divRef} className='absolute flex flex-col z-30 right-22 top-52 mt-2 justify-end text-left border border-gray-300 rounded-sm bg-clip-padding bg-slate-800/70 text-white shadow-lg w-32 cursor-pointer'>
                {categories.map((item, index) => (
                  <div key={index} onClick={() => {
                    setCategory(item)
                    toggle()
                  }} className='block px-4 py-2 text-sm text-white hover:bg-slate-800'>
                    {item}
                  </div>
                ))}
              </div>
            }
          </div>
        </div>
      </div>
      <div className='flex bg-white/30 p-2 rounded-md 60 mt-7 justify-center' style={{ maxHeight: '65vh', overflowY: 'auto', scrollbarWidth: 'thin', scrollbarColor: 'rgba(100, 116, 139, 1) rgba(0, 0, 0, 0.1)',}} ref={divRef}>
        {professionalView({category: category})}
      </div> 
    </main>
  );
}