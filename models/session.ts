import mongoose from 'mongoose';
import { Session } from '@/models/types/session';
 
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

const SessionModel = mongoose.models.Session || mongoose.model('Session', SessionSchema);
 
export default SessionModel;
