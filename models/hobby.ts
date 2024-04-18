import mongoose from 'mongoose';
import { Hobby } from '@/models/types/hobby';
 
export const HobbySchema = new mongoose.Schema<Hobby>({
    title: {
        type: String,
        required: true,
    },
    dates: {
        type: [String],
        required: false,
    },
    descriptions: {
        type: [String],
        required: false,
    },
    minutesXsessions: {
        type: [String],
        required: false,
    },
    categories: {
        type: [String],
        required: false,
    },
    goals: {
        type: [String],
        required: false,
    },
    user_email: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: false,
    }
});

const HobbyModel = mongoose.models.Hobby || mongoose.model('Hobby', HobbySchema);
 
export default HobbyModel;
