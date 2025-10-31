// import connectDB from "@/lib/mongodb";
// import MonthlyActivity from "@/models/old/userData";
// import HobbyMetadata from "@/models/hobbyData";

// export interface HobbyStats {
//     hobbyTitle: string;
//     totalMinutes: number;
//     totalSessions: number;
//     averageSessionLength: number;
//     color: string;
//     category: string;
//     monthsActive: number;
// }

// export interface MonthlyStats {
//     year: number;
//     month: number;
//     totalMinutes: number;
//     totalSessions: number;
//     hobbies: string[];
// }

// export class MonthlyActivityService {
    
//     static async getHobbyStats(userEmail: string, startDate?: Date, endDate?: Date): Promise<HobbyStats[]> {
//         await connectDB();

//         const query: any = { userEmail };
        
//         if (startDate || endDate) {
//             const dateFilter: any = {};
//             if (startDate) {
//                 dateFilter.$gte = {
//                     year: startDate.getFullYear(),
//                     month: startDate.getMonth() + 1
//                 };
//             }
//             if (endDate) {
//                 dateFilter.$lte = {
//                     year: endDate.getFullYear(),
//                     month: endDate.getMonth() + 1
//                 };
//             }
//             // Note: This is a simplified date filter - for complex date ranges,
//             // you might need to use aggregation pipeline
//         }

//         const activities = await MonthlyActivity.find(query);
//         const hobbyMetadata = await HobbyMetadata.find({ isActive: true });
        
//         const hobbyStatsMap = new Map<string, {
//             totalMinutes: number;
//             totalSessions: number;
//             monthsActive: Set<string>;
//         }>();

//         // Aggregate data from all monthly activities
//         for (const activity of activities) {
//             const activityObj = activity.toObject();
//             for (const [hobbyTitle, hobbyData] of Object.entries(activityObj.hobbies)) {
//                 const data = hobbyData as any;
//                 const monthKey = `${activity.year}-${activity.month}`;
                
//                 if (!hobbyStatsMap.has(hobbyTitle)) {
//                     hobbyStatsMap.set(hobbyTitle, {
//                         totalMinutes: 0,
//                         totalSessions: 0,
//                         monthsActive: new Set()
//                     });
//                 }

//                 const stats = hobbyStatsMap.get(hobbyTitle)!;
//                 stats.totalMinutes += data.totalMinutes || 0;
//                 stats.totalSessions += data.sessionCount || 0;
//                 stats.monthsActive.add(monthKey);
//             }
//         }

//         // Convert to HobbyStats array
//         const result: HobbyStats[] = [];
//         for (const [hobbyTitle, stats] of hobbyStatsMap) {
//             const metadata = hobbyMetadata.find(m => m.title === hobbyTitle);
            
//             result.push({
//                 hobbyTitle,
//                 totalMinutes: stats.totalMinutes,
//                 totalSessions: stats.totalSessions,
//                 averageSessionLength: stats.totalSessions > 0 ? stats.totalMinutes / stats.totalSessions : 0,
//                 color: metadata?.color || '#3b82f6',
//                 category: metadata?.category || '',
//                 monthsActive: stats.monthsActive.size
//             });
//         }

//         return result.sort((a, b) => b.totalMinutes - a.totalMinutes);
//     }

//     static async getMonthlyBreakdown(userEmail: string, year?: number): Promise<MonthlyStats[]> {
//         await connectDB();

//         const query: any = { userEmail };
//         if (year) {
//             query.year = year;
//         }

//         const activities = await MonthlyActivity.find(query).sort({ year: 1, month: 1 });
        
//         return activities.map(activity => {
//             const activityObj = activity.toObject();
//             const hobbies = Object.keys(activityObj.hobbies);
            
//             let totalMinutes = 0;
//             let totalSessions = 0;

//             for (const hobbyData of Object.values(activityObj.hobbies)) {
//                 const data = hobbyData as any;
//                 totalMinutes += data.totalMinutes || 0;
//                 totalSessions += data.sessionCount || 0;
//             }

//             return {
//                 year: activity.year,
//                 month: activity.month,
//                 totalMinutes,
//                 totalSessions,
//                 hobbies
//             };
//         });
//     }

//     static async getSessionsForDay(userEmail: string, date: Date): Promise<any[]> {
//         await connectDB();

//         const year = date.getFullYear();
//         const month = date.getMonth() + 1;
//         const dayString = date.toISOString().split('T')[0];

//         const activity = await MonthlyActivity.findOne({ userEmail, year, month });
        
//         if (!activity) {
//             return [];
//         }

//         const sessions: any[] = [];
//         const activityObj = activity.toObject();

//         for (const [hobbyTitle, hobbyData] of Object.entries(activityObj.hobbies)) {
//             const data = hobbyData as any;
//             if (data.sessions) {
//                 for (const session of data.sessions) {
//                     const sessionDate = new Date(session.date).toISOString().split('T')[0];
//                     if (sessionDate === dayString) {
//                         sessions.push({
//                             ...session,
//                             hobbyTitle,
//                             color: data.color
//                         });
//                     }
//                 }
//             }
//         }

//         return sessions.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
//     }

//     static async getYearsWithData(userEmail: string): Promise<number[]> {
//         await connectDB();

//         const activities = await MonthlyActivity.find({ userEmail }).select('year').distinct('year');
//         return activities.sort((a, b) => b - a);
//     }
// }