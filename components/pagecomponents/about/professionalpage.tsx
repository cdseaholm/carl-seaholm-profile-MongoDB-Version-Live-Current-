'use client'

import React, { useState, useCallback, useEffect } from 'react';
import MainChild from '@/components/pagetemplates/mainchild/mainchild';
import { jobsArray, schoolsArray } from '@/components/pagecomponents/professional/jobsarray';
import { JobBite, SchoolBite } from '@/components/pagecomponents/professional/proBites';
import InnerTemplate from '@/components/pagetemplates/innerTemplate/innerTemplate';
import { useStateStore } from '@/context/stateStore';

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

export default function ProfessionalPage() {

  const [category, setCategory] = useState('Timeline');
  const [filteredSchools, setFilteredSchools] = useState(schoolsArray);
  const [filteredJobs, setFilteredJobs] = useState(jobsArray);
  const isBreakpoint = useStateStore((state) => state.widthQuery) < 768 ? true : false;

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

  const updateJobsWithToday = useCallback((jobs: JobType[]) => {
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
  }, []);

  const sortJobsByEndDate = (jobs: JobType[]) => {
    return jobs.sort((a, b) => (a.date.endDate < b.date.endDate) ? 1 : -1);
  };

  /** Effects */
  useEffect(() => {
    let updatedJobs = updateJobsWithToday(jobsArray);
    if (category === 'Timeline') {
      setFilteredJobs(sortJobsByEndDate(updatedJobs));
    } else if (category === 'Education') {
      setFilteredSchools(schoolsArray.sort((a, b) => (a.date.endDate < b.date.endDate) ? 1 : -1));
    } else {
      setFilteredJobs(sortJobsByEndDate(updatedJobs).filter(job => job.category.includes(category)));
    }
  }, [category, updateJobsWithToday]);

  return (
    <MainChild>
      <div className={`flex flex-row w-full justify-between items-center px-5 md:px-10 py-2 md:py-4 w-full`}>
        <h1 className={`text-lg md:text-3xl font-bold`}>
          Carl Seaholm
        </h1>
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
      <InnerTemplate>
        {category === 'Education' && filteredSchools.map((item, index) => (
          <div key={index} className='md:px-8 pb-1 md:pt-1 border border-black shadow-lg my-2 md:mx-2 rounded-md bg-slate-800/50 w-full'>
            <SchoolBite school={item} index={index} isBreakpoint={isBreakpoint} />
          </div>
        ))}
        {category !== 'Education' && filteredJobs.length > 0 &&
          filteredJobs.map((item, index) => (
            <div key={index} className='md:px-8 pb-1 md:pt-1 border border-black shadow-lg my-2 md:mx-2 rounded-md bg-slate-800/50 w-full'>
              <JobBite job={item} index={index} isBreakpoint={isBreakpoint} />
            </div>
          ))}
      </InnerTemplate>
    </MainChild >
  );
}