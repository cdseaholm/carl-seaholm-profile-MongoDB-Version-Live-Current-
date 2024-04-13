import mongoose from 'mongoose';

interface Hobby {
    title: string;
    dates: string[];
    descriptions: string[];
    minutesXsessions: string[];
    categories: string[];
    goals: string[];
    user_email: string;
    expires_at: Date;
}
 
export const HobbySchema = new mongoose.Schema<Hobby>({
    title: {
        type: String,
        required: true,
    },
    dates: {
        type: [String],
        required: true,
    },
    descriptions: {
        type: [String],
        required: true,
    },
    minutesXsessions: {
        type: [String],
        required: true,
    },
    categories: {
        type: [String],
        required: true,
    },
    goals: {
        type: [String],
        required: true,
    },
    user_email: {
        type: String,
        required: true,
    },
    expires_at: {
    type: Date,
    required: true,
  },
});
 
export default mongoose.models.Hobby ||
  mongoose.model<Hobby>('Hobby', HobbySchema);
