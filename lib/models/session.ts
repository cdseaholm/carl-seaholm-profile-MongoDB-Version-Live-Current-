import mongoose from 'mongoose';
import { Session } from '@/lib/types/session';
 
export const SessionSchema = new mongoose.Schema<Session>({
    sessionid: {
        type: String,
        required: true,
    },
    user_id: {
        type: String,
        required: true,
    },
    expires_at: {
        type: Date,
        required: true,
    },
    fresh: {
        type: Boolean,
        required: true,
    },
});
 
export default mongoose.models.Session ||
  mongoose.model<Session>('Session', SessionSchema);
