import mongoose, { Model, Schema } from "mongoose";
import { IUserObjectIndexed } from "./types/userObjectIndexed";

export const userObjectIndexedSchema = new Schema(
    {
        title: {
            type: String,
            required: false
        },
        index: {
            type: Number,
            required: false
        },
    },
    {
        timestamps: true
    }
);

const UserObjectIndexed = mongoose.models?.UserObjectIndexed || mongoose.model("UserObjectIndexed", userObjectIndexedSchema);

export default UserObjectIndexed as Model<IUserObjectIndexed>;