import React from 'react';
import {jobsArray, schoolsArray} from './jobsarray';
import { School } from '../../types/education';
import { Job } from '../../types/job';
import { DetailsAccordianPage } from '../nav/menuDrops/DetailsAccordian';

const professionalView = ({category}: {category: String}) => {
    let filteredJobs = jobsArray;
    let filteredSchools = schoolsArray;
    
    switch (category) {
        case 'Timeline':
            filteredJobs = filteredJobs.sort((a, b) => (a.date.endDate < b.date.endDate) ? 1 : -1);
            break;
            case 'Development':
                filteredJobs = filteredJobs.sort((a, b) => (a.date.endDate < b.date.endDate) ? 1 : -1).filter(job => job.category.includes('Development'));
                break;
            case 'Management':
                filteredJobs = filteredJobs.sort((a, b) => (a.date.endDate < b.date.endDate) ? 1 : -1).filter(job => job.category.includes('Management'));
                break;
            case 'Sales':
                filteredJobs = filteredJobs.sort((a, b) => (a.date.endDate < b.date.endDate) ? 1 : -1).filter(job => job.category.includes('Sales'));
            break;
        case 'Education':
            filteredJobs = filteredJobs.sort((a, b) => (a.date.endDate < b.date.endDate) ? 1 : -1);
            break;
        default:
            filteredJobs = filteredJobs.sort((a, b) => (a.date.endDate < b.date.endDate) ? 1 : -1);
            break;
    }

    return (
        <div>
            {category !== 'Education' &&
            
            filteredJobs.map((job, index) => 
                <div key={index}>
                    <JobBite job={job} index={index} />
                </div>
            )
            }
            {category === 'Education' &&
            filteredSchools.map((school, index) => 
                <div key={index}>
                    <SchoolBite school={school} index={index} />
                </div>
            )
            }
        </div>
    );
};

export default professionalView;

const SchoolBite = ({ school }: { school: School; index: number; }) => (
    <div className="relative p-5">
        <h2 className="text-lg font-bold">{school.school}</h2>
        <h3 className="text-md font-semibold">{school.major}</h3>
        <h4 className="text-md">{school.location}</h4>
        <p className="text-sm text-slate-600">{`${school.date.startDate.toLocaleString('default', { month: 'long', year: 'numeric' })} - ${school.date.endDate.toLocaleString('default', { month: 'long', year: 'numeric' })}`}</p>
    </div>
);

const JobBite = ({ job, index, }: { job: Job; index: number; }) => (
    <div className="relative p-5">
        <h2 className="text-lg font-bold">{job.title}</h2>
        <h3 className="text-md font-semibold">{job.company}</h3>
        <h4 className="text-md">{job.location}</h4>
        <p className="text-sm text-slate-600">{`${job.date.startDate.toLocaleString('default', { month: 'long', year: 'numeric' })} - ${job.date.endDate.toLocaleString('default', { month: 'long', year: 'numeric' })}`}</p>
        <div className="rounded-md">
            <DetailsAccordianPage details={job.descriptions} detailsIndex={index} />
        </div>
    </div>
);