import React from 'react';
import JobBite from './jobBite';
import jobsArray from './jobsarray';

const professionalView = () => {
    let title = 'Timeline';

    {/*switch (category) {
        case 'Timeline':
            filteredJobs = jobs.sort((a, b) => (a.date > b.date) ? 1 : -1);
            break;
        case 'Developing':
        case 'Management':
        case 'Sales':
            filteredJobs = jobs.filter(job => job.category === category);
            title = category;
            break;
        default:
            break;
    }*/}
    

    return (
        <div>
            {jobsArray.map((job, index) => <JobBite key={index} job={job}/>)}
        </div>
    );
};

export default professionalView;