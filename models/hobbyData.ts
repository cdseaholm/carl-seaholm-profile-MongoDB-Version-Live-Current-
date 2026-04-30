import mongoose, { Model, Schema } from "mongoose";
import { IHobbyData } from "./types/hobbyData";

const timeFrequencySchema = new Schema(
    {
        time: { type: Number, required: true },
        frequency: { type: Number, required: true, default: 1 }
    },
    { _id: false }
);

const hobbyDataSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
        index: true
    },
    timeFrequency: {
        type: [timeFrequencySchema],
        default: []
    },
    description: {
        type: String,
        default: ''
    },
    category: {
        type: String,
        default: ''
    },
    color: {
        type: String,
        required: true,
        default: '#3b82f6'
    },
    isActive: {
        type: Boolean,
        default: true
    },
    goals: {
        type: [String],
        default: []
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
    updatedAt: { 
        type: Date, 
        default: Date.now 
    }
}, {
    _id: true,
    timestamps: true
});

const HobbyData = mongoose.models?.HobbyData || mongoose.model("HobbyData", hobbyDataSchema);

export default HobbyData as Model<IHobbyData>;