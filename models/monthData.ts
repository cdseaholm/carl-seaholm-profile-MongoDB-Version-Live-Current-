import mongoose, { Model, Schema } from "mongoose";
import { IMonthlyData } from "./types/monthlyData";


export const monthlyDataSchema = new Schema(
    {
        month: {
            type: Number,
            required: true,
            min: 1,
            max: 12,
            index: true
        },
        userEmail: {
            type: String,
            required: false, // Optional for migration compatibility  
            index: true
        },
        userId: {
            type: String,
            required: false, // Optional for migration compatibility
            index: true
        },
        monthColorInfo: {
            type: Schema.Types.Mixed,  // Keep this flexible for color theme data
            required: true
        }
    },
    {
        timestamps: true
    }
);

const MonthlyData = mongoose.models?.MonthlyData || mongoose.model("MonthlyData", monthlyDataSchema);

export default MonthlyData as Model<IMonthlyData>;