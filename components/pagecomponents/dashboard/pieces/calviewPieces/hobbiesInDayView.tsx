import { useHobbyContext } from "@/app/context/hobby/hobbyModalContext";
import ScrollChild from "@/components/pagetemplates/scrollableChild/scrollChild";

const HobbiesInDayView = () => {

    const {hobbyToShow, setHobbyToShow, daySelected, setDaySelected} = useHobbyContext();

    return (
        <ScrollChild>
            <div className="flex flex-col my-2 bg-slate-300 w-full">
                <div className="flex flex-row justify-between items-center px-5 py-5">
                    <div className="flex flex-col justify-start items-center">
                        <h1 className={`text-sm md:text-base font-bold underline`}>
                            Day Details
                        </h1>
                        <p className="text-sm font-semibold">
                            {daySelected}
                        </p>
                    </div>
                    <button className="flex flex-col text-xs md:text-sm text-gray-400 hover:text-gray-700 font-bold" onClick={() => {
                        setDaySelected('');
                        setHobbyToShow(null);
                    }}>
                        X Close
                    </button>
                </div>
            
                {hobbyToShow?.map((hobby, index) => (
                    <div className="flex flex-row justify-center items-center" style={{overflowX: 'auto'}} key={index}>
                        <div className="flex flex-col w-min justify-center items-start">
                            <div className="flex flex-row justify-center">
                                <h1 className="text-lg font-bold">
                {hobby.title}
                                </h1>
                            </div>
                            <p className="text-sm font-semibold">
                                Amount of time: {hobby.minutesXsessions[0]} minutes
                            </p>
                            <p className="text-sm font-semibold" style={{overflow: 'auto'}}>
                                {hobby.descriptions[0]}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </ScrollChild>
    );
}

export default HobbiesInDayView;