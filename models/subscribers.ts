
import mongoose from 'mongoose';
import { Subscriber } from '@/models/types/subscribers';


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

const SubscriberModel = mongoose.models.Subscriber || mongoose.model('Subscriber', SubscriberSchema);
 
export default SubscriberModel;