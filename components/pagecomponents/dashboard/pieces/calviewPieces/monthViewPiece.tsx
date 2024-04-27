import { useHobbyContext } from "@/app/context/hobby/hobbyModalContext";
import MonthConverter from "@/components/pagecomponents/dashboard/buttons/calViewButtons/monthconverter";
import { IHobby } from "@/models/types/hobby";
import { useState } from "react";

const MonthViewPiece = ({ daySelected, hobbies }: {daySelected: string; hobbies: IHobby[] | null}) => {

    //states
    const [month, setMonth] = useState<number>(new Date().getMonth() + 1);
    const [year, setYear] = useState<number>(new Date().getFullYear());

    //functions
    const { setDaySelected } = useHobbyContext();
    const daysThisMonth = month === 2 ? 28 : month % 2 === 0 ? 30 : 31;
    const days = Array.from({length: daysThisMonth}, (_, i) => i + 1);
    const sessionDatesColors = hobbies && hobbies.length > 0 ? new Map(hobbies.flatMap(hobby => hobby.dates.map(date => [date, hobby.color]))) : new Map();
    const sessionDatesColorsArray = Array.from(sessionDatesColors, ([date, color]) => ({ date, color }));
    sessionDatesColorsArray.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    const num = parseInt(month.toString());

    const handleDayClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
        const day = event.currentTarget.value;
        if (day) {
            setDaySelected(day);
        }
    };

    const handleLeftArrowClick = () => {
        if (month === 1) {
            setMonth(12)
            setYear(year - 1);
        } else {
            setMonth(month - 1);
        }
    };

    const handleRightArrowClick = () => {
        if (month === 12) {
            setMonth(1)
            setYear(year + 1);
        } else {
            setMonth(month + 1);
        }
    };

    return (
        <div className={`flex flex-col justify-between items-center ${daySelected ? 'border-b border-black' : ''} h-2/5 pb-2`}>
                <MonthConverter month={num} year={year} handleLeftArrowClick={handleLeftArrowClick} handleRightArrowClick={handleRightArrowClick} />
                <div className="flex flex-col justify-center items-center w-full h-4/5">
                    <div className="flex flex-col justify-start items-start">
                        {Array(Math.ceil(days.length / 7)).fill(0).map((_, i) => {
                            const weekDays = days.slice(i * 7, i * 7 + 7);
                            return (
                                <div key={i} className="flex flex-col justify-center items-center">
                                    <div className="flex flex-row">
                                    {weekDays.map((day, index) => {
                                        const dateString = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                                        const dayHobbies = sessionDatesColorsArray.filter(item => item.date === dateString);
                                        return (
                                            <button value={dateString} key={index} className={`flex flex-col justify-start items-start w-8 h-8 md:w-12 md:h-12 m-1 bg-gray-300 cursor-pointer hover:border hover:border-black`} onClick={handleDayClick}>
                                                <p className="text-xs">
                                                    {day}
                                                </p>
                                                {dayHobbies.map((hobby, hobbyIndex) => (
                                                    <div key={hobbyIndex} className={`w-2 h-2 rounded-full mt-1`} style={{backgroundColor: hobby.color}}/>
                                                ))}
                                            </button>
                                        )
                                    })}
                                    </div>
                                </div>
                            )
                        })}
                        </div>
                    </div>
            </div>
    )
};

export default MonthViewPiece;