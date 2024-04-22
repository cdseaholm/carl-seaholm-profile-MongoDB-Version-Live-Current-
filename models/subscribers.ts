export interface Subscriber {
    email: string;
    name: string;
    subscribed: boolean;
}

import mongoose, { Schema, models } from "mongoose";

const subscriberSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        subscribed: {
            type: Boolean,
            required: true
        },
    },
    {
        timestamps: true
    }
);

const Subscriber = models.Subscriber || mongoose.model("Subscriber", subscriberSchema);

export default Subscriber;