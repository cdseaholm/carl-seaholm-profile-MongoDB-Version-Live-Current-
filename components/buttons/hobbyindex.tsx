import { useHobbyContext } from "@/app/context/hobby/hobbyModalContext";
import { useState } from "react";
import useMediaQuery from "../listeners/WidthSettings";

export default function HobbyIndex() {
    const { hobbies } = useHobbyContext();
    const [show, setShow] = useState(false);
    const isBreakpoint = useMediaQuery(768);

    return (
        <div className="flex flex-col">
            <button className={`${isBreakpoint ? 'text-xs' : 'text-sm'} font-bold cursor-pointer`} onClick={() => setShow(!show)}>
                Color Index
            </button>
            {show === true &&
                <legend className="flex absolute mt-5 text-xs z-20 bg-slate-200/40 border border-slate-600 justify-center w-16">
                    {hobbies?.map(hobby => (
                        <div key={hobby._id} className="flex flex-row justify-between items-center px-2">
                                <div className={`w-2 h-2 rounded-full`} style={{backgroundColor: hobby.color}}/>
                                <p>{hobby.title}</p>
                        </div>
                    ))}
                </legend>
            }
        </div>
    );
}