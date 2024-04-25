import { useHobbyContext } from "@/app/context/hobby/hobbyModalContext";
import { useState } from "react";

export default function HobbyIndex() {
    const { hobbies } = useHobbyContext();
    const [show, setShow] = useState(false);

    return (
        <>
            <button className={`text-xs md:text-sm font-bold cursor-pointer`} onClick={() => setShow(!show)}>
                Color Index
            </button>
            {show === true &&
                <legend className="flex flex-col absolute mt-10 text-xs z-20 bg-slate-200/40 border border-slate-600 justify-center w-24">
                    {hobbies?.map(hobby => (
                        <div key={hobby._id} className="flex flex-row justify-between items-center px-4">
                                <div className={`w-2 h-2 rounded-full`} style={{backgroundColor: hobby.color}}/>
                                <p>{hobby.title}</p>
                        </div>
                    ))}
                </legend>
            }
        </>
    );
}