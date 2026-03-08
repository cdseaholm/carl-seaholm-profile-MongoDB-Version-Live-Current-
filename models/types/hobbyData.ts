import { IMonthlyData } from "./monthlyData";
import { ISession } from "./session";
import { ITimeFrequency } from "./time-frequency";

export interface IHobbyData {
    userId: string;
    title: string;
    description?: string;
    timeFrequency: ITimeFrequency[];
    category?: string;
    color: string;
    isActive: boolean;
    goals: string[];
    createdAt: string;
    updatedAt?: string;
    _id?: string;
}

export type HobbySessionInfo = { hobbyData: IHobbyData, totalMinutes: number, totalSessions: number, sessions: ISession[], timeFrequencies: ITimeFrequency[] };
export type MonthlyInfo = { monthInfo: IMonthlyData, totalMinutes: number, totalSessions: number };