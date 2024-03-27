import React from 'react';
import {jobsArray, schoolsArray} from './jobsarray';
import { School } from '../../types/education';
import { Job } from '../../types/job';
import { DetailsAccordianPage } from '../nav/menuDrops/DetailsAccordian';

const professionalView = ({category}: {category: string}) => {
    const [filteredJobs, setFilteredJobs] = React.useState(jobsArray);
    const [filteredSchools, setFilteredSchools] = React.useState(schoolsArray);

    if (category === 'Timeline') {
        jobsArray.sort((a, b) => (a.date.endDate < b.date.endDate) ? 1 : -1);
    } else if (category === 'Education') {
        schoolsArray.sort((a, b) => (a.date.endDate < b.date.endDate) ? 1 : -1);
    } else {
        jobsArray.sort((a, b) => (a.date.endDate < b.date.endDate) ? 1 : -1).filter(job => job.category.includes(category));
    }

    return (
        <div>
            {category !== 'Education' &&
            
            filteredJobs.map((job, index) => 
                <div key={index} className='flex flex-row justify-center'>
                    <JobBite job={job} index={index} />
                </div>
            )
            }
            {category === 'Education' &&
            filteredSchools.map((school, index) => 
                <div key={index} className='flex flex-row justify-center'>
                    <SchoolBite school={school} index={index} />
                </div>
            )
            }
        </div>
    );
};

export default professionalView;

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('default', { month: 'long', year: 'numeric' });
};

const SchoolBite = ({ school }: { school: School; index: number; }) => {
    const [startDate, setStartDate] = React.useState(formatDate(school.date.startDate));
    const [endDate, setEndDate] = React.useState(formatDate(school.date.endDate));

    return (
        <div className="relative w-4/5 p-5 items-center">
            <div className="text-lg font-bold">{school.school}</div>
            <div className="text-md font-semibold">{school.major}</div>
            <div className="text-md">{school.location}</div>
            <div className="text-sm text-slate-600">{startDate} - {endDate}</div>
        </div>
    );
};

const JobBite = ({ job, index, }: { job: Job; index: number; }) => {
    const [startDate, setStartDate] = React.useState(formatDate(job.date.startDate));
    const [endDate, setEndDate] = React.useState(formatDate(job.date.endDate));

    return (
        <div className="relative w-4/5 p-5 items-center">
            <div className="text-lg font-bold">{job.title}</div>
            <div className="text-md font-semibold">{job.company}</div>
            <div className="text-md">{job.location}</div>
            <div className="text-sm text-slate-600">{startDate} - {endDate}</div>
            <div className="rounded-md">
                <DetailsAccordianPage details={job.descriptions} detailsIndex={index} />
            </div>
        </div>
    );
};