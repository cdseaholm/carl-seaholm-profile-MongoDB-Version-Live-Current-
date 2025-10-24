import { IUserObjectIndexed } from "./userObjectIndexed";

export type IUserObject = {
    title: string;
    indexes: IUserObjectIndexed[];
    _id: string;
    createdAt: string;
    updatedAt: string;
};