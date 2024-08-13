import mongoose, { Model, Schema, models } from "mongoose";
import { IEntry } from "./types/objectEntry";

export const fieldSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        value: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true
        },
        trackable: {
            type: Boolean,
            required: false
        },
        mapPiece: {
            type: Boolean,
            required: false,
            default: false
        }
        //be aware this will need to have stringent validation if true
    },
    {
        timestamps: true
    }
);

const Field = models.Field || mongoose.model("Field", fieldSchema);

export default Field as Model<IEntry>;