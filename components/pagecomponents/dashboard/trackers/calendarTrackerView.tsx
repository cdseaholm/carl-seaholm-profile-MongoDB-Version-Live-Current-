import useMediaQuery from "@/components/listeners/WidthSettings";
import { Hobby } from "@/lib/types/hobby";

export default function CalendarTrackerView({hobbies, daysThisMonth}: { hobbies: Hobby[], daysThisMonth: number}) {

    const isBreakpoint = useMediaQuery(768);
    const thisMonth = new Date().getMonth() + 1;
    const thisYear = new Date().getFullYear();

    const days = Array.from({length: daysThisMonth}, (_, i) => i + 1);

    // Create a set of dates from the hobbies' dates
    const sessionDatesColors = new Map(hobbies.flatMap(hobby => hobby.dates.map(date => [date, hobby.title])));

    return (
        Array(Math.ceil(days.length / 7)).fill(0).map((_, i) => {
            const weekDays = days.slice(i * 7, i * 7 + 7);
            return (
                    <div key={i} className="flex flex-col justify-center items-center w-min">
                        <div className="flex flex-row">
                        {weekDays.map((day, index) => {
                            // Create a date string in the same format as the hobby dates
                            const dateString = `${thisYear}-${String(thisMonth).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

                            return (
                                <div key={index} className={`flex flex-col justify-start items-start ${isBreakpoint ? 'w-8 h-8' : 'w-14 h-14'} m-1 bg-gray-300 cursor-pointer hover:border hover:border-black`}>
                                    <p className="text-xs">{day}</p>
                                    {sessionDatesColors.has(dateString) &&
                                        <div className={`w-2 h-2 bg-green rounded-full text-xs`}>{sessionDatesColors.get(dateString)}</div>
                                    }
                                </div>
                            )
                        })}
                        </div>
                    </div>
            )
        })
    );    
}