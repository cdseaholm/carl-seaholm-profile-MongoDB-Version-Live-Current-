import React from "react";
import { DetailsAccordianPage } from "@/components/nav/menuDrops/DetailsAccordian";
import { Job } from "@/types/job";
import { School } from "@/types/education";
import Image from "next/image";

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('default', { month: 'long', year: 'numeric' });
};

const SchoolBite = ({ school, breakBool }: { school: School; index: number; breakBool: boolean }) => {
    const [startDate, setStartDate] = React.useState(formatDate(school.date.startDate));
    const [endDate, setEndDate] = React.useState(formatDate(school.date.endDate));

    return (
        <div className="flex flex-row relative p-5 justify-between items-center">
            <div className="flex flex-col w-2/3">
                <div className={`${breakBool === true ? 'text-md' : 'text-lg'} font-bold`}>{school.school}</div>
                <div className={`${breakBool === true ? 'text-sm' : 'text-md'} font-bold font-semibold`}>{school.major}</div>
                <div className={`${breakBool === true ? 'text-sm' : 'text-md'} font-bold`}>{school.location}</div>
                <div className={`${breakBool === true ? 'text-xs' : 'text-sm'} font-bold text-slate-400`}>{startDate} - {endDate}</div>
            </div>
            <div>
                <Image src={school.logo} width={100} height={100} alt={school.logoAlt}/>
            </div>
        </div>
    );
};

const JobBite = ({ job, index, breakBool }: { job: Job; index: number; breakBool: boolean }) => {
    const [startDate, setStartDate] = React.useState(formatDate(job.date.startDate));
    const [endDate, setEndDate] = React.useState(formatDate(job.date.endDate));

    return (
        <div className="flex flex-col">
            <div className="flex flex-row relative p-5 justify-between items-center">
                <div className="flex flex-col w-2/3">
                    <div className={`${breakBool === true ? 'text-md' : 'text-lg'} font-bold`}>{job.title}</div>
                    <div className={`${breakBool === true ? 'text-sm' : 'text-md'} font-bold font-semibold`}>{job.company}</div>
                    <div className={`${breakBool === true ? 'text-sm' : 'text-md'} font-bold`}>{job.location}</div>
                    <div className={`${breakBool === true ? 'text-xs' : 'text-sm'} font-bold text-slate-400`}>{startDate} - {endDate}</div>
                </div>
                <div>
                    <Image src={job.logo} width={100} height={100} alt={job.logoAlt}/>
                </div>
            </div>
            <DetailsAccordianPage 
                details={job.descriptions} 
                detailsIndex={index} 
            />
        </div>
    );
};

export { JobBite, SchoolBite };