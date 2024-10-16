import React from "react";
import { DetailsAccordianPage } from "@/components/dropdowns/DetailsAccordian";
import { Job } from "@/models/types/job";
import { School } from "@/models/types/education";
import ImageFormat from "@/components/helpers/imageFormat";

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('default', { month: 'long', year: 'numeric' });
};

const SchoolBite = ({ school, index , isBreakpoint}: { school: School, index: number, isBreakpoint: boolean }) => {
    const startDate = formatDate(school.date.startDate);
    const endDate = formatDate(school.date.endDate);
    const size = isBreakpoint ? 50 : 80;

    return (
        <div className="flex flex-row relative p-5 justify-between items-center">
            <div className="flex flex-col w-2/3">
                <div className={`text-base md:text-lg font-bold text-black underline`}>{school.school}</div>
                <div className={`text-sm md:text-base font-bold font-semibold overflow-wrap text-neutral-900`}>{school.major}</div>
                <div className={`text-sm md:text-base font-bold text-slate-400`}>{school.location}</div>
                <div className={`text-xs md:text-sm font-bold text-blue-300/60`}>{startDate} - {endDate}</div>
            </div>
            <div>
                <ImageFormat imSize={size} image={school.logo} index={index} blur={false} priority={true} />
            </div>
        </div>
    );
};

const JobBite = ({ job, index, isBreakpoint }: { job: Job, index: number, isBreakpoint: boolean }) => {
    const startDate = formatDate(job.date.startDate);
    const endDate = formatDate(job.date.endDate);
    const size = isBreakpoint ? 50 : 80;

    return (
        <div className="flex flex-col">
            <div className="flex flex-row relative p-5 justify-between items-center">
                <div className="flex flex-col w-2/3">
                    <div className={`text-base md:text-lg font-bold text-black underline`}>{job.title}</div>
                    <div className={`text-sm md:text-base font-bold font-semibold overflow-wrap text-neutral-900`}>{job.company}</div>
                    <div className={`text-sm md:text-base font-bold text-slate-400`}>{job.location}</div>
                    <div className={`text-xs md:text-sm font-bold text-blue-300/60`}>{startDate} - {endDate}</div>
                </div>
                <div>
                    <ImageFormat imSize={size} image={job.logo} index={index} blur={false} priority={true} />
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