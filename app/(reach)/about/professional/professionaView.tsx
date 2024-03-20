const Job = ({ job }: { job: any }) => (
    <div key={job.company}>
        <h1>{job.company}</h1>
        <h2>{job.title}</h2>
        <h3>{job.date}</h3>
        <p>{job.description}</p>
    </div>
);

const professionalView = ({ category }: { category: string }) => {
    let filteredJobs = jobs;
    let title = 'Timeline';

    switch (category) {
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
    }

    return (
        <div>
            <h1>{title}</h1>
            {filteredJobs.map((job, index) => <Job job={job} key={index} />)}
        </div>
    );
};

export default professionalView;

const jobOne = {
    company: "Company One",
    title: "Software Engineer",
    date: "2019-2020",
    description: "I did yet another thing",
    category: 'Engineering'
};

const jobTwo = {
    company: "Company Two",
    title: "Software Engineer",
    date: "2020-2021",
    description: "I did yet another thing",
    category: 'Management'
};

const jobThree = {
    company: "Company Three",
    title: "Software Engineer",
    date: "2021-2022",
    description: "I did yet another thing",
    category: 'Sales'
};

const jobFour = {
    company: 'Company Four',
    title: 'Software Engineer',
    date: '2022-2023',
    description: 'I did a thing',
    category: 'Sales'
};

const jobs = [jobOne, jobTwo, jobThree, jobFour];