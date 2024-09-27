import mongoose, { Model, Schema } from "mongoose";
import { IEntry } from "./types/objectEntry";
import { fieldSchema } from "./field";

export const entrySchema = new Schema(
    {
        fields: {
            type: [fieldSchema],
            required: true
        },
        date: {
            type: String,
            required: true
        },
        //be aware this will need to have stringent validation if true
    },
    {
        timestamps: true
    }
);

const Entry = mongoose.models?.Entry || mongoose.model("Entry", entrySchema);

export default Entry as Model<IEntry>;