import mongoose, { Model, Schema, models } from "mongoose";
import { ICustomField } from "./types/customField";

export const customFieldSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        fieldTitles: {
            type: Array,
            required: true
        },
        values: {
            type: Array,
            required: true
        },
        typesOfValues: {
            type: Array,
            required: true
        }, 
    },
    {
        timestamps: true
    }
);

const CustomField = models.CustomField || mongoose.model("CustomField", customFieldSchema);

export default CustomField as Model<ICustomField>;