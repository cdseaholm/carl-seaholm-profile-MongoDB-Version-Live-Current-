'use client'

import React, { useRef, useState } from 'react';
import useMediaQuery from '@/components/listeners/WidthSettings';
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
  const [loading, setLoading] = React.useState(false);

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
  }, [clicked, imageRef]);

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
  }, [open, divRef]);

  return (
    <MainChild>
        <div />
        {loading ? (
          <div className="justify-center items-center">
            <h1>Loading...</h1>
          </div>
        ) : (
          <div className="flex flex-col h-full px-2 pb-2">
            <div className={`flex flex-row justify-between px-1 pb-5 md:justify-end`}>
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
                <div className={`flex flex-row w-ful ${isBreakpoint ? 'items-start' : 'items-end'}`}>
                  <div className={`flex flex-col ${isBreakpoint ? 'items-start' : 'items-end'}`}>
                    <h1 className={`flex text-xl md:text-5xl font-bold justify-end`}>
                      Carl Seaholm
                    </h1>
                    <div className='flex flex-row justify-evenly items-center'>
                      <select className='text-xs md:text-sm bg-zinc-200 rounded-lg' defaultValue={'Timeline'} onChange={(e) => {
                        setCategory(e.target.value);
                      }}>
                        {categories.map((item, index) => (
                          <option 
                            key={index} 
                            value={item}
                            className='block px-2 py-1 text-sm text-black hover:bg-slate-600'>
                            {item}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            <div style={{flexGrow: 1, fontSize: '8px', overflow: 'auto'}} className='scrollbar-thin scrollbar-webkit'>
            {category === 'Education' && filteredSchools.map((item, index) => (
              <div key={index} className='justify-center p-4'>
                <div className='border border-black shadow-lg rounded-md m-2 bg-slate-800/50'>
                  <SchoolBite school={item} index={index}/>
                </div>
              </div>
            ))}
            {category !== 'Education' && filteredJobs.length > 0 &&
              filteredJobs.map((item, index) => (
                <div key={index} className='justify-center p-4'>
                  <div className='border border-black shadow-lg m-2 rounded-md bg-slate-800/50'>
                    <JobBite job={item} index={index}/>
                  </div>
                </div>
              ))}
          </div>
        </div>
        )}
      </MainChild>
  );
}