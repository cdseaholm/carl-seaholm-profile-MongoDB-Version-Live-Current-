import mongoose, { Schema, models } from "mongoose";

const hobbySchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        dates: {
            type: [String],
            required: false
        },
        descriptions: {
            type: [String],
            required: false
        },
        minutesXsessions: {
            type: [String],
            required: false
        },
        categories: {
            type: [String],
            required: true
        },
        goals: {
            type: [String],
            required: false
        },
        user_email: {
            type: String,
            required: true
        },
        color: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

const Hobby = models.Hobby || mongoose.model("Hobby", hobbySchema);

export default Hobby;