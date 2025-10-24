import mongoose, { Model, Schema } from "mongoose";
import { ISession } from "./types/session";

export const entrySchema = new Schema(
    {
        userId: {
            type: String,
            required: true,
            index: true
        },
        hobbyTitle: {
            type: String,
            required: true,
            index: true
        },
        date: {
            type: String,
            required: true,
        },
        minutes: {
            type: Number,
            required: true,
            default: 0
        },
        month: {
            type: Number,
            required: true,
            min: 1,
            max: 12,
            index: true
        },
        year: {
            type: Number,
            required: true,
            index: true
        }
    },
    {
        timestamps: true,
        _id: true
    }
);

const Session = mongoose.models?.Session || mongoose.model("Session", entrySchema);

export default Session as Model<ISession>;