import mongoose, { Model, Schema } from "mongoose";
import { IEntry } from "./types/entry";

export const entrySchema = new Schema(
    {
        value: {
            type: Schema.Types.Mixed,
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