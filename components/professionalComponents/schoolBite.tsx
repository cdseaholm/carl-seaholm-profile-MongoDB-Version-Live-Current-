import React from 'react';

type School = {
    id: number;
    school: string;
    degree: string;
    major: string;
    date: {startDate: Date, endDate: Date};
    location: string;
};

const JobBite = ({ school }: { school: School; index: number; }) => (
    <div className="relative p-5">
        <h2 className="text-lg font-bold">{school.school}</h2>
        <h3 className="text-md font-semibold">{school.major}</h3>
        <h4 className="text-md">{school.location}</h4>
        <p className="text-sm text-slate-600">{`${school.date.startDate.toLocaleString('default', { month: 'long', year: 'numeric' })} - ${school.date.endDate.toLocaleString('default', { month: 'long', year: 'numeric' })}`}</p>
    </div>
);

export default JobBite;