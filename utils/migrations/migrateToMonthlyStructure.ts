import connectDB from "@/lib/mongodb";
import MongoUser from "@/models/user";
import MonthlyActivity from "@/models/monthData";
import HobbyData from "@/models/hobbyData";
import { IUser } from "@/models/types/user";
import mongoose from "mongoose";
import { AprColors, AugColors, CalendarColors, DecColors, FebColors, JanColors, JulColors, JunColors, MarColors, MayColors, NovColors, OctColors, SepColors } from "@/models/types/calColorInfo";
import Session from "@/models/session";
import { IEntry } from "@/models/old/types/entry";
import { IUserObject } from "@/models/old/types/userObject";
import { IUserObjectIndexed } from "@/models/old/types/userObjectIndexed";
import { IFieldObject } from "@/models/types/field";

interface MigrationStats {
    totalEntries: number;
    hobbiesFound: string[];
    monthsCreated: string[];
    errors: string[];
}

export async function MigrateToNewStructure(userEmail: string): Promise<{ success: boolean; stats: MigrationStats }> {

    if (mongoose.models.MonthlyActivity) {
        delete mongoose.models.MonthlyActivity;
    }
    if (mongoose.models.HobbyData) {
        delete mongoose.models.HobbyData;
    }

    const stats: MigrationStats = {
        totalEntries: 0,
        hobbiesFound: [],
        monthsCreated: [],
        errors: []
    };

    try {
        await connectDB();

        const user = await MongoUser.findOne({ email: userEmail }) as IUser;
        if (!user) {
            throw new Error(`User with email ${userEmail} not found`);
        }

        console.log(`Starting migration for user: ${userEmail}`);
        console.log(`User has ${user.entries?.length || 0} entries`);

        const hobbiesObject = user.userObjects?.find((obj: IUserObject) => obj.title === 'hobbies');
        if (!hobbiesObject) {
            throw new Error('No hobbies object found in user data');
        }

        const hobbyIndexes = hobbiesObject.indexes as IUserObjectIndexed[];
        const fieldObjects = user.fieldObjects as IFieldObject[];
        const entries = user.entries as IEntry[];

        stats.totalEntries = entries.length;
        const monthColorInfos = [
            JanColors, FebColors, MarColors, AprColors, MayColors, JunColors,
            JulColors, AugColors, SepColors, OctColors, NovColors, DecColors
        ] as CalendarColors[];

        // STEP 1: Create HobbyData documents (once per hobby)
        console.log(`Creating hobby data for ${hobbyIndexes.length} hobbies...`);

        for (const hobbyIndex of hobbyIndexes) {
            const fieldObject = fieldObjects[hobbyIndex.index];
            if (!fieldObject) {
                stats.errors.push(`No fieldObject found for hobby ${hobbyIndex.title}`);
                continue;
            }

            stats.hobbiesFound.push(hobbyIndex.title);

            // Extract hobby metadata
            const colorField = fieldObject.fields.find(f => f.name === 'color');
            const categoryField = fieldObject.fields.find(f => f.name === 'category');
            const descriptionField = fieldObject.fields.find(f => f.name === 'description' || f.name === 'descriptions');
            const goalField = fieldObject.fields.find(f => f.name === 'goal');

            const hobbyColor = colorField?.values?.[0] || '#3b82f6';
            const hobbyCategory = categoryField?.values?.[0] || '';
            const hobbyDescription = descriptionField?.values?.[0] || '';
            const hobbyGoal = goalField?.values?.[0] || '';

            // Create hobby document
            await HobbyData.findOneAndUpdate(
                { userId: user._id?.toString(), title: hobbyIndex.title },
                {
                    userId: user._id?.toString(),
                    title: hobbyIndex.title,
                    description: hobbyDescription,
                    category: hobbyCategory,
                    color: hobbyColor,
                    isActive: true,
                    goals: hobbyGoal ? [hobbyGoal] : []
                },
                { upsert: true, new: true }
            );

            console.log(`✅ Created/updated hobby: ${hobbyIndex.title}`);
        }

        // STEP 2: Group sessions by month and hobby
        const monthlyData = new Map<string, {
            month: number;
            userEmail: string;
            userId: string;
            monthColorInfo: CalendarColors;
        }>();

        const allSessions: any[] = [];

        console.log('Processing entries and grouping by month...');

        for (const hobbyIndex of hobbyIndexes) {
            const fieldObject = fieldObjects[hobbyIndex.index];
            if (!fieldObject?.entryIndexes) {
                console.log(`No entries for hobby ${hobbyIndex.title}`);
                continue;
            }

            console.log(`Processing ${fieldObject.entryIndexes.length} entries for hobby ${hobbyIndex.title}`);

            for (const entryIndex of fieldObject.entryIndexes) {
                const entry = entries[entryIndex];
                if (!entry) continue;

                try {
                    const entryDate = new Date(entry.date);
                    if (isNaN(entryDate.getTime())) {
                        stats.errors.push(`Invalid date: ${entry.date}`);
                        continue;
                    }

                    const entryValue = entry.value ? parseFloat(entry.value.toString()) : 0;

                    // Add validation to catch conversion issues
                    if (isNaN(entryValue)) {
                        console.log(`Warning: Could not convert value "${entry.value}" to number for entry ${entry._id}`);
                        stats.errors.push(`Invalid value: ${entry.value} for entry ${entry._id}`);
                        continue;
                    }
                    const month = entryDate.getMonth() + 1; // 1-12
                    const year = entryDate.getFullYear();
                    const monthKey = month.toString();

                    // Create month entry if needed
                    if (!monthlyData.has(monthKey)) {
                        monthlyData.set(monthKey, {
                            month,
                            monthColorInfo: monthColorInfos[month - 1],
                            userId: user._id?.toString() || '',
                            userEmail: userEmail
                        });
                        stats.monthsCreated.push(monthKey);
                    }

                    allSessions.push({
                        userId: user._id?.toString() || '',
                        hobbyTitle: hobbyIndex.title, // Store title directly
                        date: entry.date,
                        minutes: entryValue,
                        month,
                        year,
                        createdAt: entry.createdAt ? new Date(entry.createdAt) : new Date(),
                        updatedAt: entry.updatedAt ? new Date(entry.updatedAt) : new Date()
                    });

                    console.log(`Entry ${entry._id}: "${entry.value}" -> ${entryValue} minutes`);

                } catch (error) {
                    stats.errors.push(`Error processing entry ${entryIndex}: ${error}`);
                }
            }
        }

        // STEP 3: Save MonthlyActivity documents
        console.log(`Saving ${monthlyData.size} monthly activity documents...`);

        console.log(`Saving ${monthlyData.size} monthly activity documents...`);

        for (const [monthKey, data] of monthlyData) {
            try {
                // DEBUG: Log the exact data being saved
                console.log(`Month ${monthKey} hobbyData:`, null, 2);

                const docData = {
                    month: data.month,
                    userEmail: userEmail,
                    userId: user._id?.toString(),
                    monthColorInfo: data.monthColorInfo
                };

                // DEBUG: Log the complete document
                console.log(`Complete document for month ${monthKey}:`, JSON.stringify(docData, null, 2));

                const monthlyActivityDoc = new MonthlyActivity(docData);

                await monthlyActivityDoc.save();
                console.log(`✅ Saved monthly activity for month ${monthKey}`);

            } catch (error: any) {
                console.error(`❌ Failed to save month ${monthKey}:`, error);
                // Log the full error details
                if (error.errors) {
                    Object.keys(error.errors).forEach(field => {
                        console.error(`Field ${field}:`, error.errors[field].message);
                    });
                }
                stats.errors.push(`Failed to save monthly activity for ${monthKey}: ${error}`);
            }
        }

        console.log(`Saving ${allSessions.length} session documents...`);
        try {
            if (allSessions.length > 0) {
                await Session.insertMany(allSessions);
                console.log(`✅ Saved ${allSessions.length} sessions`);
            }
        } catch (error: any) {
            console.error(`❌ Failed to save sessions:`, error);
            stats.errors.push(`Failed to save sessions: ${error}`);
        }

        console.log('Migration completed successfully!');
        return { success: true, stats };

    } catch (error) {
        console.error('Migration failed:', error);
        return { success: false, stats: { ...stats, errors: [`Migration failed: ${error}`] } };
    }
}

export async function validateMigration(userEmail: string): Promise<{ isValid: boolean; report: any }> {
    try {
        await connectDB();

        const user = await MongoUser.findOne({ email: userEmail }) as IUser;
        if (!user) {
            return { isValid: false, report: { error: 'User not found' } };
        }

        const originalEntries = user.entries?.length || 0;

        // Check HobbyData documents
        const hobbyDataDocs = await HobbyData.find({ userId: user._id?.toString() });

        // Check MonthlyActivity documents
        const monthlyActivities = await MonthlyActivity.find({ userEmail });

        let migratedEntries = 0;
        const hobbyBreakdown: Record<string, number> = {};
        const monthBreakdown: string[] = [];

        for (const activity of monthlyActivities) {
            const activityObj = activity.toObject();
            monthBreakdown.push(`Month ${activityObj.month}`);

            const sessions = await mongoose.model('Session').find({ month: activityObj.month, userId: user._id?.toString() });
            for (const session of sessions) {
                migratedEntries += 1;
                const hobby = hobbyDataDocs.find(h => h._id?.toString() === session.hobbyId);
                if (hobby) {
                    hobbyBreakdown[hobby.title] = (hobbyBreakdown[hobby.title] || 0) + 1;
                }
            }
        }

        const report = {
            originalEntries,
            migratedEntries,
            hobbyDataDocuments: hobbyDataDocs.length,
            monthlyActivityDocuments: monthlyActivities.length,
            hobbyBreakdown,
            monthBreakdown,
            hobbies: hobbyDataDocs.map(h => ({ title: h.title, category: h.category })),
            isValid: originalEntries === migratedEntries
        };

        console.log('Validation Report:', report);
        return { isValid: report.isValid, report };

    } catch (error) {
        console.error('Validation error:', error);
        return { isValid: false, report: { error: error?.toString() } };
    }
}