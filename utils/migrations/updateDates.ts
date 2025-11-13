import connectDB from "@/lib/mongodb";
import Session from "@/models/session";
import { IUser } from "@/models/types/user";
import User from "@/models/user";

export async function updateDates() {

  try {
        await connectDB();
        
        const user = await User.findOne({ email: 'cdseaholm@gmail.com' }) as IUser;
        if (!user) {
            console.log('User not found');
            return { success: false, message: 'User not found' };
        }

        // Get all current sessions
        const sessions = await Session.find({ userId: user._id?.toString() });
        if (!sessions || sessions.length === 0) {
            console.log('No sessions found for user:', user.email);
            return { success: false, message: 'No sessions found' };
        }
        for (const session of sessions) {
            const originalDate = new Date(session.date);
            const correctedDate = originalDate.toLocaleDateString();
            session.date = correctedDate;
            await session.save();
            console.log(`Session ID: ${session._id} date updated from ${originalDate} to ${correctedDate}`);
        }
        console.log(`Updated ${sessions.length} sessions for user ${user.email}`);
        return { success: true, message: 'Dates updated successfully' };

    } catch (error: any) {
        console.error('Error in fixSessionMinutes:', error);
        return { success: false, error: error.message };
    }
}
