'use client'

import { schoolsArray, jobsArray } from '@/components/pagecomponents/professionalComponents/jobsarray';
import { SchoolBite, JobBite } from '@/components/pagecomponents/professionalComponents/proBites';
import { useStateStore } from '@/context/stateStore';
import React, { useState, useRef } from 'react';

export default function DevelopmentMobile() {
  const [category, setCategory] = useState('Timeline');
  const divRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [filteredSchools, setFilteredSchools] = React.useState(schoolsArray);
  const [filteredJobs, setFilteredJobs] = React.useState(jobsArray);
  const isBreakpoint = useStateStore((state) => state.widthQuery) < 768 ? true : false;

  /**Variables */

  const toggle = () => {
    setOpen(!open);
  }

  const categories = [
    'Timeline',
    'Development',
    'Management',
    'Sales',
    'Education'
  ];

  React.useEffect(() => {
    if (category === 'Timeline') {
      setFilteredJobs(jobsArray.sort((a, b) => (a.date.endDate < b.date.endDate) ? 1 : -1));
    } else if (category === 'Education') {
      setFilteredSchools(schoolsArray.sort((a, b) => (a.date.endDate < b.date.endDate) ? 1 : -1));
    } else {
      setFilteredJobs(jobsArray.sort((a, b) => (a.date.endDate < b.date.endDate) ? 1 : -1).filter(job => job.category.includes(category)));
    }
  }, [category]);

  var headerTwo = category === 'Timeline' ? 'Full Timeline' : category + ' Timeline';

return (
    <main>
                <h1 className="flex text-5xl font-bold pt-5 pr-5 justify-end">Carl Seaholm</h1>
                <h2 className="flex text-lg font-bold pt-5 pr-5 justify-end">{headerTwo}</h2>
                <div className='flex flex-row justify-end items-center pr-4'>
                      <p className='flex pr-2'>
                        Filter:
                      </p>
                      <div ref={divRef} onClick={toggle} className='cursor-pointer w-5/12'>
                          <div className='relative flex z-30 flex text-black rounded'>
                            {category}
                          </div>
                      </div>
                      <div className='flex items-end pl-6'>
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
                              <SchoolBite school={item} index={index} isBreakpoint={isBreakpoint}/>
                            }
                          </div>
                        ))}
                        {filteredJobs.length > 0 &&
                          filteredJobs.map((item, index) => (
                            <div key={index} className='flex flex-row justify-center'>
                              {category !== 'Education' &&
                                <JobBite job={item} index={index} isBreakpoint={isBreakpoint}/>
                              }
                            </div>
                        ))}
                      </div>
      </div> 

    </main>
);
}