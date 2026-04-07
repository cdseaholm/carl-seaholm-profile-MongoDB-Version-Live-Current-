
import { HobbyCheckMarkType } from "@/app/(content)/dashboard/components/button-board/left-board/left-board";
import { IHobbyData } from "@/models/types/hobbyData";
import { ISession } from "@/models/types/session";
import { DateRangeType } from "@/models/types/time-types/date-range";

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

    // Filter by hobbies
    if (!hobbyFilters || hobbyFilters.length === 0) {
        hobbiesToUse = [...hobbiesData];
    } else {
        const hobbyTitles: string[] = [];

        hobbyFilters.forEach(filter => {
            const matchedHobby = hobbiesData.find(hobbyData => hobbyData.title === filter.title);
            if (matchedHobby && !hobbiesToUse.some(h => h.title === matchedHobby.title)) {
                hobbiesToUse.push(matchedHobby);
                hobbyTitles.push(matchedHobby.title);
            }
        });

        filtered = filtered.filter(s => hobbyTitles.includes(s.hobbyTitle));
    }

    // Filter by date range
    if (dateFilters && dateFilters.range) {
        const [start, end] = dateFilters.range;

        if (start && end) {
            // Normalize dates to start/end of day
            const startDate = new Date(start);
            startDate.setHours(0, 0, 0, 0);
            const endDate = new Date(end);
            endDate.setHours(23, 59, 59, 999);

            filtered = filtered.filter(s => {
                const sessionDate = new Date(s.date);
                sessionDate.setHours(0, 0, 0, 0);
                return sessionDate >= startDate && sessionDate <= endDate;
            });
        } else if (start) {
            const startDate = new Date(start);
            startDate.setHours(0, 0, 0, 0);

            filtered = filtered.filter(s => {
                const sessionDate = new Date(s.date);
                sessionDate.setHours(0, 0, 0, 0);
                return sessionDate >= startDate;
            });
        } else if (end) {
            const endDate = new Date(end);
            endDate.setHours(23, 59, 59, 999);

            filtered = filtered.filter(s => {
                const sessionDate = new Date(s.date);
                sessionDate.setHours(0, 0, 0, 0);
                return sessionDate <= endDate;
            });
        }
    }

    return { filteredSessions: filtered, filteredHobbies: hobbiesToUse };
}