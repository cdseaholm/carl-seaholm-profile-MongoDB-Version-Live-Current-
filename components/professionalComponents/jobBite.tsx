type Job = {
    id: number;
    title: string;
    company: string;
    date: string;
    descriptions: string[];
    location: string;
};

const JobBite = ({ job }: { job: Job }) => (
    <div className="py-5">
        <h2 className="text-lg font-bold">{job.title}</h2>
        <h3 className="text-md font-semibold">{job.company}</h3>
        <h4 className="text-md">{job.location}</h4>
        <p className="text-sm text-slate-600">{job.date}</p>
        {job.descriptions.map((description, index) => (
            <li className="text-md py-1" key={job.id}>{description}</li>
        ))}
    </div>
);

export default JobBite;
