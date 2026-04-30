import connectDB from "@/lib/mongodb";
import HobbyData from "@/models/hobbyData";
import MonthlyData from "@/models/monthData";
import Session from "@/models/session";
import { AprColors, AugColors, DecColors, FebColors, JanColors, JulColors, JunColors, MarColors, MayColors, NovColors, OctColors, SepColors } from "@/models/types/calColorInfo";
import { IHobbyData } from "@/models/types/hobbyData";
import { IMonthlyData } from "@/models/types/monthlyData";
import { ISession } from "@/models/types/session";
import { ITimeFrequency } from "@/models/types/time-frequency";
import { IUser } from "@/models/types/user";
import User from "@/models/user";

export async function AddMostUsed() {
    try {
        await connectDB();

        const user = await User.findOne({ email: 'cdseaholm@gmail.com' }) as IUser;
        if (!user) {
            console.log('User not found');
            return { success: false, message: 'User not found' };
        }

        console.log('Starting minutes fix...');

        // Get all current sessions
        const sessions = await Session.find({ userId: user._id?.toString() }) as ISession[];
        console.log(`Found ${sessions.length} sessions to potentially fix`);
        if (!sessions || sessions.length === 0) {
            console.log('No sessions found for user');
            return { success: false, message: 'No sessions found for user' };
        }

        const hobbies = await HobbyData.find({ userId: user._id?.toString() });
        if (!hobbies) {
            console.log('No hobbies found for user');
            return { success: false, message: 'No hobbies found for user' };
        }

        for (const hobby of hobbies) {
            console.log(`Processing hobby: ${hobby.title}`);
            if (!hobby) {
                console.log('Hobby not found, skipping...');
                continue;
            }
            let relationHobby = hobby as IHobbyData;
            if (!relationHobby.title) {
                console.log('Hobby title missing, skipping...');
                continue;
            }
            const timeFrequencies = [] as ITimeFrequency[];
            const hobbySessions = sessions.filter(session => session.hobbyTitle === relationHobby.title?.toString());
            if (hobbySessions.length === 0) {
                console.log(`No sessions found for hobby ${relationHobby.title}`);
                continue;
            }
            hobbySessions.forEach(session => {
                if (session.minutes && session.minutes > 0) {
                    const existing = timeFrequencies.find(tf => tf.time === session.minutes);
                    if (existing) {
                        existing.frequency += 1;
                    } else {
                        timeFrequencies.push({ time: session.minutes, frequency: 1 });
                    }
                }
            });
            // Sort by frequency descending
            timeFrequencies.sort((a, b) => b.frequency - a.frequency);
            // Keep only top 10 most used times
            hobby.timeFrequency = timeFrequencies.slice(0, 10);
            await hobby.save();
            console.log(`Updated hobby ${hobby.title} with top ${hobby.timeFrequency.length} most used times`);
        }

        return { success: true, message: 'Minutes fix completed' };

    } catch (error: any) {
        console.error('Error in fixSessionMinutes:', error);
        return { success: false, error: error.message };
    }
}

export async function FixBorders() {
    try {
        await connectDB();

        const user = await User.findOne({ email: 'cdseaholm@gmail.com' }) as IUser;
        if (!user) {
            console.log('User not found');
            return { success: false, message: 'User not found' };
        }

        const months = await MonthlyData.find({ userId: user._id?.toString() });

        if (!months || months.length === 0) {
            console.log('No months found for user');
            return { success: false, message: 'No months found for user' };
        }

        for (const monthData of months) {
            if (!monthData) {
                console.log('Month data not found, skipping...');
                continue;
            }
            const relationMonth = monthData as IMonthlyData;
            if (!relationMonth) {
                console.log('Month or year missing, skipping...');
                continue;
            }

            const month = relationMonth.month;
            const updatedColors = GetColor(month);
            if (!updatedColors) {
                console.log(`No updatedColors color found for month ${month}, skipping...`);
                continue;
            }
            monthData.monthColorInfo = updatedColors;
            await monthData.save();
            console.log(`Updated month ${relationMonth.month} with updatedColors color ${updatedColors}`);
        }
        return { success: true, message: 'Minutes fix completed' };

    } catch (error: any) {
        console.error('Error in fixSessionMinutes:', error);
        return { success: false, error: error.message };
    }
}

function GetColor(month: number) {
    if (month === 1) {
        const updatedColors = JanColors;
        return updatedColors;
    } else if (month === 2) {
        const updatedColors = FebColors;
        return updatedColors;
    } else if (month === 3) {
        const updatedColors = MarColors;
        return updatedColors;
    } else if (month === 4) {
        const updatedColors = AprColors;
        return updatedColors;
    } else if (month === 5) {
        const updatedColors = MayColors;
        return updatedColors;
    } else if (month === 6) {
        const updatedColors = JunColors;
        return updatedColors;
    } else if (month === 7) {
        const updatedColors = JulColors;
        return updatedColors;
    } else if (month === 8) {
        const updatedColors = AugColors;
        return updatedColors;
    } else if (month === 9) {
        const updatedColors = SepColors;
        return updatedColors;
    } else if (month === 10) {
        const updatedColors = OctColors;
        return updatedColors;
    } else if (month === 11) {
        const updatedColors = NovColors;
        return updatedColors;
    } else if (month === 12) {
        const updatedColors = DecColors;
        return updatedColors;
    } else {
        return JanColors;
    }   
}