import React from "react";
import { DetailsAccordianPage } from "@/components/dropdowns/DetailsAccordian";
import { Job } from "@/models/types/job";
import { School } from "@/models/types/education";
import Image from "next/image";

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('default', { month: 'long', year: 'numeric' });
};

const SchoolBite = ({ school }: { school: School; index: number; }) => {
    const [startDate, setStartDate] = React.useState(formatDate(school.date.startDate));
    const [endDate, setEndDate] = React.useState(formatDate(school.date.endDate));

    return (
        <div className="flex flex-row relative p-5 justify-between items-center">
            <div className="flex flex-col w-2/3">
                <div className={`text-base md:text-lg font-bold`}>{school.school}</div>
                <div className={`text-sm md:text-base font-bold font-semibold text-stone-700`}>{school.major}</div>
                <div className={`text-sm md:text-base font-bold`}>{school.location}</div>
                <div className={`text-xs md:text-sm font-bold text-slate-400`}>{startDate} - {endDate}</div>
            </div>
            <div>
                <Image src={school.logo} width={80} height={80} alt={school.logoAlt} style={{width: 'auto', height: 'auto'}}/>
            </div>
        </div>
    );
};

const JobBite = ({ job, index }: { job: Job; index: number; }) => {
    const [startDate, setStartDate] = React.useState(formatDate(job.date.startDate));
    const [endDate, setEndDate] = React.useState(formatDate(job.date.endDate));

    return (
        <div className="flex flex-col">
            <div className="flex flex-row relative p-5 justify-between items-center">
                <div className="flex flex-col w-2/3">
                    <div className={`text-base md:text-lg font-bold`}>{job.title}</div>
                    <div className={`text-sm md:text-base font-bold font-semibold overflow-wrap text-stone-700`}>{job.company}</div>
                    <div className={`text-sm md:text-base font-bold`}>{job.location}</div>
                    <div className={`text-xs md:text-sm font-bold text-slate-400`}>{startDate} - {endDate}</div>
                </div>
                <div>
                    <Image src={job.logo} width={80} height={80} alt={job.logoAlt} style={{width: 'auto', height: 'auto'}}/>
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