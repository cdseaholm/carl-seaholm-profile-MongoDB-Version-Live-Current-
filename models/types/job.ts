export type Job = {
    title: string;
    company: string;
    date: {startDate: string, endDate: string};
    descriptions: string[];
    location: string;
    category: string[];
    logo: string;
    logoAlt: string;
};