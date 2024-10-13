'use client'

import React, { useState } from 'react';
import MainChild from '@/components/pagetemplates/mainchild/mainchild';
import { jobsArray, schoolsArray } from '@/components/pagecomponents/professionalComponents/jobsarray';
import { JobBite, SchoolBite } from '@/components/pagecomponents/professionalComponents/proBites';

type JobType = {
  company: string;
  title: string;
  date: {
    startDate: string;
    endDate: string;
  };
  descriptions: string[];
  location: string;
  category: string[];
  logo: string;
  logoAlt: string;
}

export default function Professional() {

  const [category, setCategory] = useState('Timeline');
  const [filteredSchools, setFilteredSchools] = React.useState(schoolsArray);
  const [filteredJobs, setFilteredJobs] = React.useState(jobsArray);

  /**Variables */

  const categories = [
    'Timeline',
    'Development',
    'Management',
    'Sales',
    'Education'
  ];

  const getCurrentDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 2).padStart(2, '0');
    return `${year}-${month}`;
  }

  const updateJobsWithToday = (jobs: JobType[]) => {
    const currentDate = getCurrentDate();
    return jobs.map(job => {
      if (job.date.endDate === 'Today') {
        return {
          ...job,
          date: {
            ...job.date,
            endDate: currentDate
          }
        };
      }
      return job;
    });
  };

  const sortJobsByEndDate = (jobs: JobType[]) => {
    return jobs.sort((a, b) => (a.date.endDate < b.date.endDate) ? 1 : -1);
  };

  /** Effects */
  React.useEffect(() => {
    let updatedJobs = updateJobsWithToday(jobsArray);
    if (category === 'Timeline') {
      setFilteredJobs(sortJobsByEndDate(updatedJobs));
    } else if (category === 'Education') {
      setFilteredSchools(schoolsArray.sort((a, b) => (a.date.endDate < b.date.endDate) ? 1 : -1));
    } else {
      setFilteredJobs(jobsArray.sort((a, b) => (a.date.endDate < b.date.endDate) ? 1 : -1).filter(job => job.category.includes(category)));
    }
  }, [category]);

  return (
    <MainChild>
      <div className="flex flex-col h-full px-2 pb-2">
        <div className={`flex flex-row w-full justify-end px-10 py-4`}>
          <div className={`flex flex-col items-end`}>
            <h1 className={`flex text-xl md:text-5xl font-bold justify-end`}>
              Carl Seaholm
            </h1>
            <div className='flex flex-row justify-evenly items-center'>
              <select id='professionalFilter' name='professionalFilter' className='text-xs md:text-sm bg-zinc-200 rounded-lg' defaultValue={'Timeline'} onChange={(e) => {
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
        <div style={{ flexGrow: 1, fontSize: '8px', overflow: 'auto' }} className='scrollbar-thin scrollbar-webkit'>
          {category === 'Education' && filteredSchools.map((item, index) => (
            <div key={index} className='justify-center px-4 py-1'>
              <div className='border border-black shadow-lg rounded-md m-2 bg-slate-800/50'>
                <SchoolBite school={item} index={index} />
              </div>
            </div>
          ))}
          {category !== 'Education' && filteredJobs.length > 0 &&
            filteredJobs.map((item, index) => (
              <div key={index} className='justify-center px-4 py-1'>
                <div className='border border-black shadow-lg m-2 rounded-md bg-slate-800/50'>
                  <JobBite job={item} index={index} />
                </div>
              </div>
            ))}
        </div>
      </div>
    </MainChild>
  );
}