import mongoose from 'mongoose';

interface Session {
  user_id: string;
  expires_at: Date;
}
 
export const SessionSchema = new mongoose.Schema<Session>({
  user_id: {
    type: String,
    required: true,
  },
  expires_at: {
    type: Date,
    required: true,
  },
});
 
export default mongoose.models.Session ||
  mongoose.model<Session>('Session', SessionSchema);
