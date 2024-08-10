export interface IUser {
    [x: string]: any;
    name: string;
    email: string;
    phone: string;
    password: string;
    customFields: any;
    _id: string;
    createdAt: string;
    updatedAt: string;
    resetPasswordToken: string;
    resetPasswordExpires: string;
}