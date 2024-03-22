import { DetailsAccordianPage } from "../nav/menuDrops/DetailsAccordian";

type Job = {
    id: number;
    title: string;
    company: string;
    date: {startDate: Date, endDate: Date};
    descriptions: string[];
    location: string;
    category: string[];
};

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

export default JobBite;
