import mongoose, { Model, Schema } from "mongoose";
import { fieldSchema } from "./field";
import { IFieldObject } from "../types/field";

export const fieldObjectSchema = new Schema(
    {
        fields: {
            type: [fieldSchema],
            required: true
        },
        entryIndexes: {
            type: [Number],
            required: true
        }
        //be aware this will need to have stringent validation if true
    },
    {
        timestamps: true
    }
);

const FieldObject = mongoose.models?.FieldObject || mongoose.model("FieldObject", fieldObjectSchema);

export default FieldObject as Model<IFieldObject>;