import mongoose, { Model, Schema } from "mongoose";
import { IUserObject } from "./types/userObject";
import { entrySchema } from "./objectEntry";
import { fieldSchema } from "./field";

export const userObjectSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        fields: {
            type: [fieldSchema],
            required: false
        },
        entries: {
            type: [entrySchema],
            required: false
        },
    },
    {
        timestamps: true
    }
);

const UserObject = mongoose.models?.UserObject || mongoose.model("UserObject", userObjectSchema);

export default UserObject as Model<IUserObject>;