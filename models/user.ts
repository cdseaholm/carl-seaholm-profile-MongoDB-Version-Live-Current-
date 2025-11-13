import mongoose, { Model, Schema } from "mongoose";
import { IUser } from "./types/user";
import { entrySchema } from "./session";
import { fieldObjectSchema } from "./old/fieldObject";
import { userObjectSchema } from "./old/userObject";

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
        //keep these to migrate to new structure
        //migrateToNewStructure will remove these after migration
        userObjects: {
            type: [userObjectSchema],
            required: false
        },
        entries: {
            type: [entrySchema],
            required: false
        },
        fieldObjects: {
            type: [fieldObjectSchema],
            required: false
        },
        resetPasswordToken: {
            type: String,
            default: ''
        },
        resetPasswordExpires: {
            type: String,
            default: ''
        },
    },
    {
        timestamps: true
    }
);

const User = mongoose.models?.User || mongoose.model("User", userSchema);

export default User as Model<IUser>;