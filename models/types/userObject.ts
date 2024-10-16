import { IEntry } from "./objectEntry";
import { IField } from "./field";


export type IUserObject = {
    title: string;
    fields: IField[];
    entries: IEntry[];
    _id: string;
    createdAt: string;
    updatedAt: string;
};