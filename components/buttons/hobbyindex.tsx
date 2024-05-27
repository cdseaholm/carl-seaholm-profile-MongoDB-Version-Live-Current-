
import { useModalContext } from "@/app/context/modal/modalContext";
import { useState } from "react";
import { useStore } from '@/models/store/store';

export default function HobbyIndex() {

    const [show, setShow] = useState(false);
    const title = show ? 'Close' : 'Color Index';
    const { hobbies } = useStore();

    return (
        <div className="flex flex-col items-end">
            <button className={`text-xs md:text-sm font-bold cursor-pointer`} onClick={() => setShow(!show)}>
                {title}
            </button>
            {show === true &&
                <div className="flex flex-col absolute mt-5 text-xs z-20 bg-slate-200/90 border border-slate-600 justify-center font-bold w-1/5">
                    <div>
                        <p className="text-center underline py-2">Color Index</p>
                    </div>
                    <legend>
                    {hobbies?.map(hobby => (
                        <div key={hobby._id} className="flex flex-row justify-start items-start">
                            <div className="flex flex-row justify-start items-center px-4 space-x-1">
                                <div className="w-2 h-2 flex flex-col shrink">
                                    <div className="w-2 h-2 rounded-full" style={{backgroundColor: hobby.color}}/>
                                </div>
                                <p className="flex-grow">{hobby.title}</p>
                            </div>
                        </div>
                    ))}
                    </legend>
                </div>
            }
        </div>
    );
}