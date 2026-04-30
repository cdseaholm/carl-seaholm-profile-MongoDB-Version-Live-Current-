
import connectDB from "@/lib/mongodb";
import { IEntry } from "@/models/old/types/entry";
import { IUserObject } from "@/models/old/types/userObject";
import { IUserObjectIndexed } from "@/models/old/types/userObjectIndexed";
import Session from "@/models/session";
import { IFieldObject } from "@/models/types/field";
import { IUser } from "@/models/types/user";
import MongoUser from "@/models/user";

export async function fixSessionMinutes(userEmail: string) {
    try {
        await connectDB();
        
        const user = await MongoUser.findOne({ email: userEmail }) as IUser;
        if (!user) return { success: false, message: 'User not found' };

        // Get original data
        const entries = user.entries as IEntry[];
        const fieldObjects = user.fieldObjects as IFieldObject[];
        const hobbiesObject = user.userObjects?.find((obj: IUserObject) => obj.title === 'hobbies');
        const hobbyIndexes = hobbiesObject?.indexes as IUserObjectIndexed[];

        console.log('Starting minutes fix...');

        // Get all current sessions
        const sessions = await Session.find({ userId: user._id?.toString() });
        console.log(`Found ${sessions.length} sessions to potentially fix`);

        let fixed = 0;
        let errors = 0;

        // Create a map of sessions by date for quick lookup
        const sessionsByDate = new Map();
        sessions.forEach(session => {
            const dateKey = new Date(session.date).toISOString().split('T')[0];
            if (!sessionsByDate.has(dateKey)) {
                sessionsByDate.set(dateKey, []);
            }
            sessionsByDate.get(dateKey).push(session);
        });

        // Process each hobby's entries
        for (const hobbyIndex of hobbyIndexes) {
            const fieldObject = fieldObjects[hobbyIndex.index];
            if (!fieldObject?.entryIndexes) continue;

            console.log(`Processing ${hobbyIndex.title}...`);

            for (const entryIndex of fieldObject.entryIndexes) {
                const entry = entries[entryIndex];
                if (!entry) continue;

                try {
                    // 🔥 THE FIX: Access the raw document data
                    const rawEntry = (entry as any)._doc || entry;
                    const entryValue = rawEntry.value;

                    if (!entryValue || entryValue === '' || entryValue === 'undefined') {
                        continue;
                    }

                    const minutes = parseFloat(entryValue.toString());
                    if (isNaN(minutes)) {
                        console.log(`Invalid value: "${entryValue}" for entry ${rawEntry._id}`);
                        errors++;
                        continue;
                    }

                    // Find matching session(s) by date and hobby
                    const entryDate = new Date(rawEntry.date).toISOString().split('T')[0];
                    const sessionsForDate = sessionsByDate.get(entryDate) || [];
                    
                    const matchingSession = sessionsForDate.find((s: { hobbyTitle: string; }) => s.hobbyTitle === hobbyIndex.title);
                    
                    if (matchingSession && matchingSession.minutes === 0) {
                        // Update the session
                        await Session.updateOne(
                            { _id: matchingSession._id },
                            { $set: { minutes: minutes } }
                        );
                        
                        console.log(`✅ Fixed ${hobbyIndex.title} on ${entryDate}: 0 → ${minutes} minutes`);
                        fixed++;
                    }

                } catch (error) {
                    console.error(`Error processing entry ${entryIndex}:`, error);
                    errors++;
                }
            }
        }

        console.log(`\n=== FIX COMPLETE ===`);
        console.log(`Fixed: ${fixed} sessions`);
        console.log(`Errors: ${errors}`);

        return { success: true, fixed, errors };

    } catch (error: any) {
        console.error('Error in fixSessionMinutes:', error);
        return { success: false, error: error.message };
    }
}

// Usage function
export async function runMinutesFix() {
    const result = await fixSessionMinutes('cdseaholm@gmail.com');
    console.log('Fix result:', result);
}

interface DateAnalysis {
    entryId: string;
    entryDate: string;
    createdAt: string;
    monthDiff: number;
    yearDiff: number;
    hobbyTitle?: string;
    suspicious: boolean;
    suggestedFix?: string;
}

export async function analyzeDateConsistency(userEmail: string) {
    try {
        await connectDB();
        
        const user = await MongoUser.findOne({ email: userEmail }) as IUser;
        if (!user) return { success: false, message: 'User not found' };

        const entries = user.entries as IEntry[];
        console.log(`Analyzing ${entries.length} entries for date consistency...`);

        const analysis: DateAnalysis[] = [];
        const monthCounts: Record<string, number> = {};

        entries.forEach(entry => {
            try {
                // Get the raw entry data
                const rawEntry = (entry as any)._doc || entry;
                
                const entryDate = new Date(rawEntry.date);
                const createdDate = new Date(rawEntry.createdAt);
                
                if (isNaN(entryDate.getTime()) || isNaN(createdDate.getTime())) {
                    return; // Skip invalid dates
                }

                // Calculate differences
                const entryMonth = entryDate.getMonth();
                const entryYear = entryDate.getFullYear();
                const createdMonth = createdDate.getMonth();
                const createdYear = createdDate.getFullYear();

                const monthDiff = (createdYear - entryYear) * 12 + (createdMonth - entryMonth);
                const yearDiff = createdYear - entryYear;

                // Count entries by month for distribution analysis
                const monthKey = `${entryYear}-${String(entryMonth + 1).padStart(2, '0')}`;
                monthCounts[monthKey] = (monthCounts[monthKey] || 0) + 1;

                // Determine if this entry is suspicious
                const suspicious = Math.abs(monthDiff) > 2 || Math.abs(yearDiff) > 0;

                let suggestedFix = undefined;
                if (suspicious) {
                    // Suggest the entry date should be closer to created date
                    const suggestedDate = new Date(createdDate);
                    suggestedDate.setDate(entryDate.getDate()); // Keep the day
                    suggestedFix = suggestedDate.toISOString().split('T')[0];
                }

                analysis.push({
                    entryId: rawEntry._id?.toString(),
                    entryDate: rawEntry.date,
                    createdAt: rawEntry.createdAt,
                    monthDiff,
                    yearDiff,
                    suspicious,
                    suggestedFix
                });

            } catch (error) {
                console.error(`Error analyzing entry:`, error);
            }
        });

        // Sort analysis by how suspicious they are
        analysis.sort((a, b) => {
            if (a.suspicious && !b.suspicious) return -1;
            if (!a.suspicious && b.suspicious) return 1;
            return Math.abs(b.monthDiff) - Math.abs(a.monthDiff);
        });

        // Generate report
        const suspiciousEntries = analysis.filter(a => a.suspicious);
        const totalSuspicious = suspiciousEntries.length;

        console.log('\n=== DATE CONSISTENCY ANALYSIS ===');
        console.log(`Total entries analyzed: ${analysis.length}`);
        console.log(`Suspicious entries found: ${totalSuspicious}`);
        console.log(`Percentage suspicious: ${Math.round(totalSuspicious / analysis.length * 100)}%`);

        console.log('\n=== ENTRIES BY MONTH ===');
        Object.entries(monthCounts)
            .sort(([a], [b]) => a.localeCompare(b))
            .forEach(([month, count]) => {
                const isSeptember2025 = month === '2025-09';
                console.log(`${month}: ${count} entries ${isSeptember2025 ? '← SUSPICIOUS HIGH COUNT' : ''}`);
            });

        console.log('\n=== TOP 20 MOST SUSPICIOUS ENTRIES ===');
        suspiciousEntries.slice(0, 20).forEach(entry => {
            console.log(`Entry ${entry.entryId}:`);
            console.log(`  Entry Date: ${entry.entryDate}`);
            console.log(`  Created: ${new Date(entry.createdAt).toISOString().split('T')[0]}`);
            console.log(`  Difference: ${entry.monthDiff} months, ${entry.yearDiff} years`);
            console.log(`  Suggested Fix: ${entry.suggestedFix}`);
            console.log('');
        });

        return {
            success: true,
            totalEntries: analysis.length,
            suspiciousCount: totalSuspicious,
            monthCounts,
            suspiciousEntries: suspiciousEntries.slice(0, 50), // Return top 50 for review
            analysis
        };

    } catch (error: any) {
        console.error('Error in analyzeDateConsistency:', error);
        return { success: false, error: error.message };
    }
}

export async function fixDateInconsistencies(userEmail: string, dryRun: boolean = true) {
    try {
        const analysisResult = await analyzeDateConsistency(userEmail);
        if (!analysisResult.success) return analysisResult;

        const { suspiciousEntries } = analysisResult;

        if (!suspiciousEntries || suspiciousEntries.length === 0) {
            console.log('No suspicious entries to fix.');
            return { success: true, message: 'No suspicious entries found' };
        }
        
        if (dryRun) {
            console.log('\n=== DRY RUN MODE ===');
            console.log(`Would fix ${suspiciousEntries.length} entries`);
            return { success: true, dryRun: true, wouldFix: suspiciousEntries.length };
        }

        console.log('\n=== FIXING DATE INCONSISTENCIES ===');
        
        await connectDB();
        const user = await MongoUser.findOne({ email: userEmail }) as IUser;
        if (!user) return { success: false, message: 'User not found' };

        let fixed = 0;
        let errors = 0;

        for (const suspicious of suspiciousEntries) {
            try {
                if (!suspicious.suggestedFix) continue;

                // Update the entry in the user document
                await MongoUser.updateOne(
                    { 
                        email: userEmail,
                        'entries._id': suspicious.entryId 
                    },
                    { 
                        $set: { 
                            'entries.$.date': suspicious.suggestedFix,
                            'entries.$.updatedAt': new Date()
                        } 
                    }
                );

                // Also update any corresponding session
                //const oldDate = new Date(suspicious.entryDate);
                const newDate = new Date(suspicious.suggestedFix);
                
                await Session.updateMany(
                    {
                        userId: user._id?.toString(),
                        date: suspicious.entryDate
                    },
                    {
                        $set: {
                            date: suspicious.suggestedFix,
                            month: newDate.getMonth() + 1,
                            year: newDate.getFullYear(),
                            updatedAt: new Date()
                        }
                    }
                );

                console.log(`✅ Fixed entry ${suspicious.entryId}: ${suspicious.entryDate} → ${suspicious.suggestedFix}`);
                fixed++;

            } catch (error) {
                console.error(`❌ Error fixing entry ${suspicious.entryId}:`, error);
                errors++;
            }
        }

        console.log(`\n=== FIX COMPLETE ===`);
        console.log(`Fixed: ${fixed} entries`);
        console.log(`Errors: ${errors}`);

        return { success: true, fixed, errors };

    } catch (error: any) {
        console.error('Error in fixDateInconsistencies:', error);
        return { success: false, error: error.message };
    }
}

// Usage functions
export async function runDateAnalysis() {
    return await analyzeDateConsistency('cdseaholm@gmail.com');
}

export async function runDateFix(dryRun: boolean = true) {
    return await fixDateInconsistencies('cdseaholm@gmail.com', dryRun);
}