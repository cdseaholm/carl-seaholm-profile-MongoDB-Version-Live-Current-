
import mongoose from 'mongoose';
import { Subscriber } from '@/lib/types/subscribers';


const SubscriberSchema = new mongoose.Schema<Subscriber>({
    email: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: false,
    },
    subscribed: {
        type: Boolean,
        required: true,
    },
    subscribedAt: {
        type: Date,
        required: true,
    },
});
 
export default mongoose.models.Subscriber || mongoose.model<Subscriber>('Subscriber', SubscriberSchema);