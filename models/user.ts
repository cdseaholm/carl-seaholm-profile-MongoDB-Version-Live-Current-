import mongoose, { Model, Schema, models } from "mongoose";
import { IUser } from "./types/user";
import { customFieldSchema } from "./customField";

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: false
        },
        password: {
            type: String,
            required: true
        },
        blogsub: {
            type: Boolean,
            required: true
        },
        customFields: {
            type: [customFieldSchema],
            required: false
        },
        resetPasswordToken: {
            type: String
        },
        resetPasswordExpires: {
            type: String
        }
    },
    {
        timestamps: true
    }
);

const User = models.User || mongoose.model("User", userSchema);

export default User as Model<IUser>;