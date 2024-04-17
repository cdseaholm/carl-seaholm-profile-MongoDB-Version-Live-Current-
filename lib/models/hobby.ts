import mongoose from 'mongoose';
import { Hobby } from '@/lib/types/hobby';
 
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
 
export default mongoose.models.Hobby ||
  mongoose.model('Hobbies', HobbySchema);
