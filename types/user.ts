
import mongoose from 'mongoose';
 
interface ActualUser {
    firstName: string;
    lastName: string;
    email: string;
    blogsub: boolean;
    password: string;
}
 
const UserSchema = new mongoose.Schema<ActualUser>({
    firstName: {
        type: String,
        required: false,
    },
    lastName: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: true,
    },
    blogsub: {
        type: Boolean,
        required: false,
    },
    password: {
        type: String,
        required: false,
    }
});
 
export default mongoose.models.ActualUser || mongoose.model<ActualUser>('ActualUser', UserSchema);