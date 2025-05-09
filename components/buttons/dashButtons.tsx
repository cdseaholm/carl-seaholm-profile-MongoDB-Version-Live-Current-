'use client'

import { useModalStore } from "@/context/modalStore";
import { useStateStore } from "@/context/stateStore";

export function DashButtons({ indexShown, setIndexShown, colorMap, handleDashToShow, dashToShow, handleDaySelected, daySelected }: { handleDashToShow: (dashToShow: string, handleModalOpen: string | null) => void, dashToShow: string, indexShown: boolean, setIndexShown: (indexShown: boolean) => void, colorMap: { color: string, title: string }[], handleDaySelected: (date: Date) => void, daySelected: Date }) {
    const isSmallestBreakpoint = useStateStore((state) => state.widthQuery) < 400 ? true : false;

    const setShowCalendar = useModalStore(state => state.setShowCalendar);

    const buttonClass = `hover:bg-gray-300 rounded-md px-1 rounded-md bg-gray-400/40 border w-1/3`;
    const textClass = `text-sm sm:text-base hover:text-gray-800`

    return (
        <div className="flex flex-row justify-start items-center space-x-1 md:space-x-5 pr-2 w-full sm:w-1/2 p-2">
            {/**<select id='dropDownObjectSelect' name="dropDownObjectSelect" className="text-xs md:text-base hover:bg-gray-400 bg-transparent border-none rounded-md" onChange={(e) => {
                handleUserObjectToShow(e.target.value);
            }} defaultValue={userObjects ? userObjects[0]?.title : ''}>
                {userObjects ? userObjects.map((field: IUserObject, index: number) => {
                    const firstChar = field.title.charAt(0).toUpperCase();
                    const newTitle = firstChar + field.title.slice(1);
                    return (
                        <option key={index} value={index}>{newTitle}</option>
                    )
                }) : []}
            </select> */}
            {dashToShow !== 'calendar' ?
                (
                    <button className={`${buttonClass}`} onClick={() => {
                        handleDaySelected(daySelected);
                        setShowCalendar(true);
                    }}>
                        <p className={`${textClass}`}>{'Calendar'}</p>
                    </button>
                ) : (
                    <button className={`${buttonClass}`} onClick={() => {
                        setShowCalendar(true);
                    }}>
                        <p className={`${textClass}`}>{'Select Day'}</p>
                    </button>
                )
            }
            <button className={`${buttonClass}`} onClick={() => {
                handleDashToShow('stats', null);
            }}>
                <p className={`${textClass}`}>{"Stats"}</p>
            </button>
            <button className={`${buttonClass}`} onClick={() => setIndexShown(!indexShown)}>
                <p className={`${textClass}`}>Color Index</p>
                {indexShown && (
                    <div className={`absolute z-30 flex flex-col justify-start bg-gray-300 border border-black ${isSmallestBreakpoint ? 'right-4' : ''}`}>
                        {colorMap?.map((map: { color: string, title: string }, index: number) => {
                            const color = map.color;
                            const title = map.title;
                            return (
                                <li key={index} className='flex flex-row items-center justify-start px-1'>
                                    <div className="h-2 w-2 rounded-full border border-slate-500" style={{ backgroundColor: color }} />
                                    <p className='text-xs text-gray-800 px-1'>{title}</p>
                                </li>
                            )
                        })}
                    </div>
                )}
            </button>
        </div>
    )
}