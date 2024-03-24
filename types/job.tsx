export type Job = {
    id: number;
    title: string;
    company: string;
    date: {startDate: Date, endDate: Date};
    descriptions: string[];
    location: string;
    category: string[];
};