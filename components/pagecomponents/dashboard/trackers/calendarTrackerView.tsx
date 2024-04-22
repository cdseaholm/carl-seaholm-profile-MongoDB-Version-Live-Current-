import { useHobbyContext } from "@/app/context/hobby/hobbyModalContext";
import { useModalContext } from "@/app/context/modal/modalContext";
import useMediaQuery from "@/components/listeners/WidthSettings";

export default function CalendarTrackerView({sessionDatesColors, daysThisMonth}: { sessionDatesColors: Map<any, any>, daysThisMonth: number}) {

    const { setDaySelected } = useHobbyContext();
    const isBreakpoint = useMediaQuery(768);
    const thisMonth = new Date().getMonth() + 1;
    const thisYear = new Date().getFullYear();

    const days = Array.from({length: daysThisMonth}, (_, i) => i + 1);

    const handleDayClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
        const day = event.currentTarget.value;
        console.log('day', day);
        console.log('event', event.currentTarget)
        if (day) {
            setDaySelected(day);
        }
    }

    return (
        Array(Math.ceil(days.length / 7)).fill(0).map((_, i) => {
            const weekDays = days.slice(i * 7, i * 7 + 7);
            return (
                    <div key={i} className="flex flex-col justify-center items-center">
                        <div className="flex flex-row">
                        {weekDays.map((day, index) => {
                            const dateString = `${thisYear}-${String(thisMonth).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

                            return (
                                <button value={`${thisYear}-${String(thisMonth).padStart(2, '0')}-${String(day).padStart(2, '0')}`} key={index} className={`flex flex-col justify-start items-start ${isBreakpoint ? 'w-8 h-8' : 'w-12 h-12'} m-1 bg-gray-300 cursor-pointer hover:border hover:border-black`} onClick={handleDayClick}>
                                    <p className="text-xs">
                                        {day}
                                    </p>
                                    {sessionDatesColors.has(dateString) &&
                                        <div className={`w-2 h-2 rounded-full`} style={{backgroundColor: sessionDatesColors.get(dateString)}}/>
                                    }
                                </button>
                            )
                        })}
                        </div>
                    </div>
            )
        })
    );    
}