import React from 'react';
import JobBite from './jobBite';
import {jobsArray, schoolsArray} from './jobsarray';
import SchoolBite from './schoolBite';

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