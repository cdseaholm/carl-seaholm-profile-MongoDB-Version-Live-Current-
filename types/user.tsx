import { Session } from "lucia";
import { Hobby } from "./hobby";

export type ActualUser = {
    id: number;
    name: string | null;
    email: string;
    password: string;
    blogsub: boolean;
};