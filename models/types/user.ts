import { IEntry } from "./entry";
import { IFieldObject } from "./field";
import { IUserObject } from "./userObject";


export interface IUser {
    [x: string]: any;
    name: string;
    email: string;
    phone: string;
    password: string;
    blogsub: boolean;
    userObjects: IUserObject[];
    entries: IEntry[];
    fieldObjects: IFieldObject[]
    _id: string;
    createdAt: string;
    updatedAt: string;
    resetPasswordToken: string;
    resetPasswordExpires: string;
}