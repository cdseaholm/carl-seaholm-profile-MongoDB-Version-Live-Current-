import { IField } from "./field";

export type IEntry = {
    fields: IField[];
    date: string;
    _id: string;
    createdAt: string;
    updatedAt: string;
}