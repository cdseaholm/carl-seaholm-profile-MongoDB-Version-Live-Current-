export type ISession = {
    _id: string;
    userId: string;
    hobbyTitle: string; // or hobbyId if you want to normalize further
    date: string; // '2025-10-07'
    minutes: number;
    month: number;
    year: number;
    createdAt: Date;
    updatedAt: Date;
}