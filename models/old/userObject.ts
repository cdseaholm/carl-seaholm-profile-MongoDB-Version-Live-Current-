import mongoose, { Model, Schema } from "mongoose";
import { IUserObject } from "./types/userObject";
import { userObjectIndexedSchema } from "./userObjectIndexed";

export const userObjectSchema = new Schema(
    {
        title: {
            type: String,
            required: false
        },
        indexes: {
            type: [userObjectIndexedSchema],
            required: false
        },
    },
    {
        timestamps: true
    }
);

const UserObject = mongoose.models?.UserObject || mongoose.model("UserObject", userObjectSchema);

export default UserObject as Model<IUserObject>;