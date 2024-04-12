import { Hobby } from "@/types/hobby";

export default function CalendarTrackerView({hobby}: { hobby: Hobby}) {

    const thisMonth = new Date().getMonth();
    const daysThisMonth = thisMonth === 1 ? 28 : thisMonth % 2 === 0 ? 30 : 31;
    const days = Array.from({length: daysThisMonth}, (_, i) => i + 1);
    const sessionsDoneThisMonth = hobby.date.filter(session => new Date(session).getMonth() === thisMonth);

    return (
        Array(Math.ceil(days.length / 7)).fill(0).map((_, i) => {
            const weekDays = days.slice(i * 7, i * 7 + 7);
            return (
                <div key={i} className="flex flex-row">
                    {weekDays.map((day, index) => {
                        const didHobby = day in sessionsDoneThisMonth;
                        return (
                            <div key={index} className={`flex flex-col justify-center items-center w-8 h-8 m-1 ${didHobby ? 'bg-green-300' : 'bg-gray-300'}`}>
                                <p className="text-xs">{day}</p>
                            </div>
                        )
                    })}
                </div>
            )
        })
    );    
}