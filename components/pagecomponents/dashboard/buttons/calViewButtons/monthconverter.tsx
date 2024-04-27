import { FiArrowLeft } from "react-icons/fi";
import { FiArrowRight } from "react-icons/fi";

export default function MonthConverter({month, year, handleRightArrowClick, handleLeftArrowClick}: {month: number, year: number , handleRightArrowClick: () => void, handleLeftArrowClick: () => void}) {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
    return (
        <div className="flex flex-row w-full text-sm md:text-base justify-evenly items-center py-2 underline font-bold">
            <FiArrowLeft className="cursor-pointer" onClick={handleLeftArrowClick} />
            <div className="flex flex-col justify-center items-center">
                <p>{monthNames[month - 1]}</p>
                <p>{year}</p>
            </div>
            <FiArrowRight className="cursor-pointer" onClick={handleRightArrowClick} />
        </div>
    );
}