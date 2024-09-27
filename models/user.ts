import mongoose, { Model, Schema } from "mongoose";
import { IUser } from "./types/user";
import { userObjectSchema } from "./userObject";

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
        userObjects: {
            type: [userObjectSchema],
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

const User = mongoose.models?.User || mongoose.model("User", userSchema);

export default User as Model<IUser>;