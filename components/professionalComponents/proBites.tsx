import React from "react";
import { DetailsAccordianPage } from "../nav/menuDrops/DetailsAccordian";
import { Job } from "@/types/job";
import { School } from "@/types/education";

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

export { JobBite, SchoolBite };