// import { useDataStore } from "@/context/dataStore";
// import { IHobbyData, ISession } from "@/models/types/monthlyActivityData";
// import { HobbySessionData } from "./initData/initDashboardParams";


// export type DailyHobbySessions = { hobby: IHobbyData, sessions: ISession[] };

// // async function CreateSessions({ sessions, daySelected }: { sessions: IIndexedEntry[], daySelected: Date }) {
// //     let seshsForTheDay = [] as IIndexedEntry[];
// //     sessions.forEach((sesh, _seshIndex) => {
// //         const [year, month, day] = sesh.date.split('-').map(Number);
// //         const date = new Date(year, month - 1, day);
// //         if (date.toDateString() === daySelected.toDateString()) {
// //             seshsForTheDay.push(sesh);
// //         }
// //     });
// //     return seshsForTheDay;
// // }

// export async function OfTheDays({ daySelected }: { daySelected: Date }) {

//     const sessions = useDataStore.getState().sessions as ISession[];
//     const hobbyData = useDataStore.getState().hobbySessionsData as HobbySessionData[];

//     const seshsForTheDay = [] as DailyHobbySessions[];
//     hobbyData.forEach((hobby) => {
//         const monthToUse = daySelected.getMonth() + 1;
//         const yearToUse = daySelected.getFullYear();
//         const newHobbyWithSeshs = { hobby: hobby.hobbyData, sessions: [] as ISession[] };
//         sessions.filter(m => m.month === monthToUse).forEach(m => {
//             if (m.year === yearToUse) {
//                 const newSesh = {
//                     value: m.minutes,
//                     date: m.date,
//                 } as ISession;
//                 newHobbyWithSeshs.sessions.push(newSesh);
//             }
//         });
//         if (newHobbyWithSeshs.sessions.length > 0) {
//             seshsForTheDay.push(newHobbyWithSeshs);
//         }
//     });



//     // hobbyData.map(hobby => {
//     //     const monthToUse = daySelected.getMonth() + 1;
//     //     console.log({ monthToUse });
//     //     const yearToUse = daySelected.getFullYear().toString();
//     //     const newHobbyWithSeshs = { hobby: hobby.hobbyData, sessions: [] as ISession[] };
//     //     hobby.counts.filter(m => m.month === monthToUse).forEach(m => {
//     //         const seshsForTheYear = m.yearCounts.filter(y => y.year === yearToUse);
//     //         const ofThisDay = seshsForTheYear.filter(y => {
//     //             return y.sessions.filter(s => {
//     //                 const [year, month, day] = s.date.split('-').map(Number);
//     //                 const date = new Date(year, month - 1, day);
//     //                 return date.toDateString() === daySelected.toDateString();
//     //             }).length > 0;
//     //         });
//     //         if (ofThisDay && ofThisDay.length > 0) {
//     //             ofThisDay.forEach(o => {
//     //                 o.sessions.forEach(s => {
//     //                     const [year, month, day] = s.date.split('-').map(Number);
//     //                     const date = new Date(year, month - 1, day);
//     //                     if (date.toDateString() === daySelected.toDateString()) {
//     //                         newHobbyWithSeshs.sessions.push(s);
//     //                     }
//     //                 });
//     //             });
//     //         }
//     //     });
//     //     if (newHobbyWithSeshs.sessions.length > 0) {
//     //         seshsForTheDay.push(newHobbyWithSeshs);
//     //     }
//     // });

//     if (!seshsForTheDay) {
//         return;
//     }

//     // seshsForTheDay.forEach((sesh, _index) => {
//     //     fieldObjects.forEach((fieldObject, index) => {
//     //         let seshHobby = {} as IUserObjectIndexed;
//     //         const thisField = fieldObject.entryIndexes.find((entryIndex, _index) => {
//     //             if (entryIndex === sesh.trueIndex) {
//     //                 const newHob = hobbyObject.indexes.find((hobbyIndex) => hobbyIndex.index === index) as IUserObjectIndexed;
//     //                 if (newHob) {
//     //                     seshHobby = newHob;
//     //                 }
//     //                 return true;
//     //             } else {
//     //                 return false;
//     //             }
//     //         });
//     //         if (thisField && seshHobby) {
//     //             const hobTitle = seshHobby.title;
//     //             const fields = fieldObject.fields as IField[];
//     //             const descriptions = fields.find((field) => field.name === 'descriptions')?.values as string[];
//     //             const categories = fields.find((field) => field.name === 'category')?.values as string[];
//     //             const goals = fields.find((field) => field.name === 'goal')?.values as string[];
//     //             const colors = fields.find((field) => field.name === 'color')?.values as string[];
//     //             const totalMinutes = fields.find((field) => field.name === 'totalMinutes')?.values as string[];
//     //             const color = colors ? colors[0] : '' as string;
//     //             const totalMin = totalMinutes ? totalMinutes[0] : '' as string;
//     //             const newEntry = {
//     //                 hobbyTitle: hobTitle,
//     //                 descriptions: descriptions,
//     //                 goals: goals,
//     //                 categories: categories,
//     //                 totalMinutes: totalMin,
//     //                 color: color,
//     //                 date: daySelected,
//     //                 value: sesh.value
//     //             } as EntriesOTDType;
//     //             ents.push(newEntry);
//     //         }
//     //     });
//     // });
//     useDataStore.getState().setEntriesOTD(seshsForTheDay)
// }