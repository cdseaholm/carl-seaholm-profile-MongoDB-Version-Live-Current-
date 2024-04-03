'use client'

import React, { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import { schoolsArray, jobsArray } from '@/components/pagecomponents/professionalComponents/jobsarray';
import { SchoolBite, JobBite } from '@/components/pagecomponents/professionalComponents/proBites';
import useMediaQuery from '@/components/listeners/WidthSettings';

export default function DevelopmentDesktop() {
  const isBreakpoint = useMediaQuery(768);
  const [isHovered, setIsHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [category, setCategory] = useState('Timeline');
  const [showDivider, setShowDivider] = useState(false);
  const divRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [filteredSchools, setFilteredSchools] = React.useState(schoolsArray);
  const [filteredJobs, setFilteredJobs] = React.useState(jobsArray);
  const breakBool = isBreakpoint ? true : false;

  /**Variables */

  const imageClick = useCallback(() => {
    setIsHovered(prevHovered => !prevHovered);
    setClicked(prevClicked => !prevClicked);
  }, []);

  const toggle = () => {
    setOpen(!open);
  };

  const style = {
    profilepicture: {
      large: `absolute z-20 top-25 left-10 rounded-full overflow-x-hidden transition-all ease duration-200 ${isHovered ? 'cursor-pointer' : ''}`,
      small: `absolute z-20 top-25 left-10 rounded-full overflow-x-hidden transition-all ease duration-200 ${isHovered ? 'cursor-pointer' : ''}`
    },
  };

  const imageRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (category === 'Timeline') {
      setFilteredJobs(jobsArray.sort((a, b) => (a.date.endDate < b.date.endDate) ? 1 : -1));
    } else if (category === 'Education') {
      setFilteredSchools(schoolsArray.sort((a, b) => (a.date.endDate < b.date.endDate) ? 1 : -1));
    } else {
      setFilteredJobs(jobsArray.sort((a, b) => (a.date.endDate < b.date.endDate) ? 1 : -1).filter(job => job.category.includes(category)));
    }
  }, [category]);

  React.useEffect(() => {
    const handleOutsideClick = (event: { target: any; }) => {
      if (!imageRef.current || !imageRef.current.contains(event.target as HTMLDivElement)) {
        if (!clicked) return;
        imageClick();
      }
    };
    window.addEventListener('mousedown', handleOutsideClick);
    return () => window.removeEventListener('mousedown', handleOutsideClick);
  }, [clicked, imageClick, imageRef]);

  const categories = [
    'Timeline',
    'Developing',
    'Management',
    'Sales',
    'Education'
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
          <div className='flex flex-col bg-white/30 p-2 rounded-md mt-7 justify-center' style={{ minHeight: '65vh', maxHeight: '65vh', overflowY: 'auto',}}>
            <div style={{ maxHeight: '65vh', overflowY: 'auto', scrollbarWidth: 'thin', scrollbarColor: 'rgba(100, 116, 139, 1) rgba(0, 0, 0, 0.1)',}} ref={divRef}>
              {filteredSchools.map((item, index) => (
                <div key={index} className='flex flex-row justify-center'>
                  {category === 'Education' &&
                    <SchoolBite breakBool={breakBool} school={item} index={index}/>
                  }
                </div>
              ))}
              {filteredJobs.length > 0 &&
                filteredJobs.map((item, index) => (
                  <div key={index} className='flex flex-row justify-center'>
                    {category !== 'Education' &&
                      <JobBite breakBool={breakBool} job={item} index={index}/>
                    }
                  </div>
              ))}
            </div>
          </div>
        </div> 
    </main>
  );
}