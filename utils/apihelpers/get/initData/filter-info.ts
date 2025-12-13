
import { HobbyCheckMarkType } from "@/app/(content)/dashboard/components/button-board/left-board/left-board";
import { DateRangeType } from "@/context/dataStore";
import { IHobbyData } from "@/models/types/hobbyData";
import { ISession } from "@/models/types/session";

export type FilterOptions = {
    hobbies?: IHobbyData[];
    dateRange?: [Date | null, Date | null];
};

export async function filterSessions(
    sessions: ISession[], 
    hobbyFilters: HobbyCheckMarkType[], 
    hobbiesData: IHobbyData[], 
    dateFilters: DateRangeType
): Promise<{ filteredSessions: ISession[], filteredHobbies: IHobbyData[] }> {

    if (!sessions || sessions.length === 0) {
        console.log('No sessions provided');
        return { filteredSessions: [], filteredHobbies: [] };
    }

    if (!Array.isArray(hobbiesData)) {
        console.error('hobbiesData is not an array!', typeof hobbiesData, hobbiesData);
        return { filteredSessions: sessions, filteredHobbies: [] };
    }

    let filtered = [...sessions];
    let hobbiesToUse: IHobbyData[] = [];

    // If no filters, return all sessions and all hobbies
    if ((!hobbyFilters || hobbyFilters.length === 0) && (!dateFilters || !dateFilters.type || !dateFilters.range || (dateFilters.range[0] === null && dateFilters.range[1] === null))) {
        console.log('No filters applied, returning all sessions');
        return { filteredSessions: filtered, filteredHobbies: hobbiesData };
    }

    // Filter by hobbies
    if (!hobbyFilters || hobbyFilters.length === 0) {
        // No hobby filter specified, use all hobbies
        hobbiesToUse = [...hobbiesData];
    } else {
        // Filter to specific hobbies
        const hobbyTitles: string[] = [];
        
        hobbyFilters.forEach(filter => {
            const matchedHobby = hobbiesData.find(hobbyData => hobbyData.title === filter.title);
            if (matchedHobby && !hobbiesToUse.some(h => h.title === matchedHobby.title)) {
                hobbiesToUse.push(matchedHobby);
                hobbyTitles.push(matchedHobby.title);
            }
        });

        // Filter sessions by these hobby titles
        filtered = filtered.filter(s => hobbyTitles.includes(s.hobbyTitle));
        //console.log('Filtered by hobbies:', hobbyTitles, 'Sessions count:', filtered.length);
    }

    // Filter by date range
    if (dateFilters) {
        const [start, end] = dateFilters.range;
        
        if (start && end) {
            filtered = filtered.filter(s => {
                const sessionDate = new Date(s.date);
                return sessionDate >= start && sessionDate <= end;
            });
            //console.log('Filtered by date range:', start, 'to', end, 'Sessions count:', filtered.length);
        } else if (start) {
            filtered = filtered.filter(s => {
                const sessionDate = new Date(s.date);
                return sessionDate >= start;
            });
            //console.log('Filtered by start date:', start, 'Sessions count:', filtered.length);
        } else {
            filtered = filtered.filter(s => {
                const sessionDate = new Date(s.date);
                return sessionDate;
            });
            //console.log('Filtered by end date:', end, 'Sessions count:', filtered.length);
        }
    }

    return { filteredSessions: filtered, filteredHobbies: hobbiesToUse };
}