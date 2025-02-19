import mongoose, { Model, Schema } from "mongoose";
import { IField } from "./types/field";

export const fieldSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        values: {
            type: [String],
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

const Field = mongoose.models?.Field || mongoose.model("Field", fieldSchema);

export default Field as Model<IField>;