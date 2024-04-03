'use client'

import React, { useRef, useState } from 'react';
import useMediaQuery from '@/components/listeners/WidthSettings';
import InnerHeader from '@/components/pagetemplates/innerheader/InnerHeader';
import MainChild from '@/components/pagetemplates/mainchild/mainchild';
import Image from 'next/image';
import { jobsArray, schoolsArray } from '@/components/pagecomponents/professionalComponents/jobsarray';
import { JobBite, SchoolBite } from '@/components/pagecomponents/professionalComponents/proBites';

export default function Professional() {

  const isBreakpoint = useMediaQuery(768);
  const [clicked, setClicked] = useState(false);
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState('Timeline');
  const divRef = useRef<HTMLDivElement>(null);
  const imageRef = React.useRef<HTMLDivElement>(null);
  const [filteredSchools, setFilteredSchools] = React.useState(schoolsArray);
  const [filteredJobs, setFilteredJobs] = React.useState(jobsArray);
  const breakBool = isBreakpoint ? true : false;

  /**Variables */

  const categories = [
    'Timeline',
    'Development',
    'Management',
    'Sales',
    'Education'
  ];

  /**Styles */
  const style = {
    profilepicture: {
      large: `absolute z-20 top-20 left-20 rounded-full overflow-x-hidden transition-all ease duration-200 cursor-pointer`,
      small: `absolute z-20 top-20 left-20 my-3 ml-3 rounded-full overflow-x-hidden transition-all ease duration-200 cursor-pointer`
    },
  };

  /**Effects */
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
        setClicked(false);
      }
    };
    window.addEventListener('mousedown', handleOutsideClick);
    return () => window.removeEventListener('mousedown', handleOutsideClick);
  }, [clicked, imageRef, setClicked]);

  React.useEffect(() => {
    const handleOutsideClick = (event: { target: any; }) => {
      if (!divRef.current || !(divRef.current as HTMLDivElement).contains(event.target as HTMLDivElement)) {
        if (open) {
          setOpen(false);
      }
      }
    };
    window.addEventListener('mousedown', handleOutsideClick);
    return () => window.removeEventListener('mousedown', handleOutsideClick);
  }, [open, divRef, setOpen]);

  const maxWidth = isBreakpoint ? '40vh' : '70vh';
  const minWidth = isBreakpoint ? '40vh' : '70vh';

  return (
    <div>
      <InnerHeader>
        <div />
        <div className={`flex flex-row ${isBreakpoint ? 'justify-between px-1' : 'justify-end'}`}>
          {!isBreakpoint &&
            <div ref={imageRef} className={`${clicked ? style.profilepicture.large : style.profilepicture.small}`}>
                <Image
                onClick={() => setClicked(clicked ? false : true)}
                priority
                src="/images/carlseaholmimage.jpg"
                className={`z-30 rounded-full overflow-x-hidden transition-all ease duration-200 cursor-pointer`}
                height={clicked ? 200 : 70}
                width={clicked ? 200 : 70}
                alt="Carl Seaholm Profile Photo"
                />
            </div>
            }
            <div className='flex flex-col w-100'>
              <h1 className={`flex ${isBreakpoint ? 'text-xl' : 'text-5xl'} font-bold justify-end`}>
                Carl Seaholm
              </h1>
              <div className='flex flex-row justify-evenly items-center'>
                <p className={`${isBreakpoint ? 'text-md' : 'text-base'}`}>
                  Filter:
                </p>
                <div ref={divRef} onClick={open ? () => setOpen(false) : () => setOpen(true)} className='cursor-pointer w-5/12'>
                  <div className={`relative ${isBreakpoint ? 'text-md' : 'text-base'} text-black rounded`}>
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
                    <div ref={divRef} className={`absolute flex flex-col z-30 right-22 top-40 mt-2 justify-end text-left border border-gray-300 rounded-sm bg-clip-padding bg-slate-800 text-white shadow-lg w-32 cursor-pointer`}>
                      {categories.map((item, index) => (
                        <div key={index} onClick={() => {
                            setCategory(item)
                            setOpen(false)
                          }} className='block px-4 py-2 text-sm text-white hover:bg-slate-600'>
                          {item}
                        </div>
                      ))}
                    </div>
                  }
              </div>
            </div>
        </div>
      </InnerHeader>
      <MainChild>
        {filteredSchools.map((item, index) => (
            <div key={index} className='flex flex-row justify-center'>
              {category === 'Education' &&
                <div className='border border-black shadow-lg rounded-md m-2 bg-slate-800/50' style={{maxWidth: maxWidth, minWidth: minWidth}}>
                  <SchoolBite breakBool={breakBool} school={item} index={index}/>
                </div>
              }
            </div>
          ))}
          {filteredJobs.length > 0 &&
            filteredJobs.map((item, index) => (
              <div key={index} className='flex flex-row justify-center'>
                {category !== 'Education' &&
                  <div className='border border-black shadow-lg m-2 rounded-md bg-slate-800/50' style={{maxWidth: maxWidth, minWidth: minWidth, overflowX: 'auto', overflowY: 'auto'}}>
                    <JobBite breakBool={breakBool} job={item} index={index}/>
                  </div>
                }
              </div>
          ))}
      </MainChild>
    </div>
  );
}