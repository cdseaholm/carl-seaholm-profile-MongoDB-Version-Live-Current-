export type School = {
    id: number;
    school: string;
    degree: string;
    major: string;
    date: {startDate: Date, endDate: Date};
    location: string;
};