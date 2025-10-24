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