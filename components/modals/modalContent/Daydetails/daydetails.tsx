'use client'

import { useEffect, useState } from "react";
import { useModalContext } from "@/app/context/modal/modalContext";
import useMediaQuery from "@/components/listeners/WidthSettings";
import { useStore } from "@/models/store/store";
import { DayDetailsAccordian } from "@/components/dropdowns/daydetailsaccordian";

const DayDetails = () => {

    const isBreakpoint = useMediaQuery(768);
    const { daySelected, setDaySelected } = useModalContext();
    const [loading, setLoading] = useState(false);
    const { hobbies } = useStore();


    const handleClearDay = () => {
        setDaySelected('');
    }

    useEffect(() => {
        if (daySelected !== '') {
            setLoading(true);
            console.log('detail check', daySelected);
            setLoading(false);
        }
    }, [daySelected]);

    if (loading) {
        return (
            <div>
                <p>Loading...</p>
            </div>
        )
    } else {
        return (
            <div>
                <div className="flex flex-row justify-between items-center border-b border-black p-2">
                    <p>Day Details</p>
                    <p>{daySelected !== '' ? daySelected : 'No Day Selected'}</p>
                    </div>
                    <div className="overflow-auto flex-grow scrollbar-thin scrollbar-webkit">
                    {daySelected !== '' && 
                        <div className="h-full w-full">
                            {hobbies?.filter(hobby => hobby.dates?.includes(daySelected)).map(hobby => {
                                return (
                                <div key={hobby._id} className="justify-between p-2">
                                    <DayDetailsAccordian
                                    title={hobby.title} categories={hobby.categories} goals={hobby.goals} descriptions={hobby.descriptions} detailsIndex={hobbies.indexOf(hobby)} />
                                </div>
                                )
                            })}
                        </div>
                    }
                </div>
            </div>
        )
    }
}

export default DayDetails;