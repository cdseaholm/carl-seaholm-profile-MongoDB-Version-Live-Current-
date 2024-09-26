import mongoose, { Schema, models, Model } from "mongoose";
import { ISubscriber } from "./types/subscriber";

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

export default Subscriber as Model<ISubscriber>;