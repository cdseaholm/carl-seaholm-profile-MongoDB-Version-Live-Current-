'use client'

import { IUserObject } from "@/models/types/userObject";

export function DashButtons({ indexShown, setIndexShown, colorMap, handleDashToShow, dashToShow, userObjects, handleUserObjectToShow }: { handleDashToShow: (dashToShow: string, handleModalOpen: string | null) => void, dashToShow: string, userObjects: IUserObject[], handleUserObjectToShow: (userObjectToShow: string) => void, indexShown: boolean, setIndexShown: (indexShown: boolean) => void, colorMap: { color: string, title: string }[] }) {
    return (
        <>
            <select id='dropDownObjectSelect' name="dropDownObjectSelect" className="text-base hover:bg-gray-400 bg-transparent border-none rounded-md" onChange={(e) => {
                handleUserObjectToShow(e.target.value);
            }} defaultValue={userObjects ? userObjects[0]?.title : ''}>
                {userObjects ? userObjects.map((field: IUserObject, index: number) => {
                    const firstChar = field.title.charAt(0).toUpperCase();
                    const newTitle = firstChar + field.title.slice(1);
                    return (
                        <option key={index} value={index}>{newTitle}</option>
                    )
                }) : []}
            </select>
            {dashToShow !== 'calendar' ?
                (
                    <button className="text-base hover:bg-gray-400 rounded-md p-1" onClick={() => {
                        handleDashToShow('calendar', 'calendar');
                    }}>
                        {'Calendar'}
                    </button>
                ) : (
                    <button className="text-base hover:bg-gray-400 rounded-md p-1" onClick={() => {
                        handleDashToShow('calendar', 'calendar');
                    }}>
                        {'Select Day'}
                    </button>
                )
            }
            <button className="text-base hover:bg-gray-400 rounded-md p-1" onClick={() => {
                handleDashToShow('stats', null);
            }}>
                {"Stats"}
            </button>
            <button className='text-end text-sm text-blue-800 hover:text-gray-500 cursor-pointer px-2' onClick={() => setIndexShown(!indexShown)}>
                Color Index
                {indexShown && (
                    <div className='absolute z-10 flex flex-col justify-start bg-gray-300 border border-black'>
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
        </>
    )
}