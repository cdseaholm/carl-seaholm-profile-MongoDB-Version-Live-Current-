'use client'

import { useDataStore } from "@/context/dataStore";
import { Popover } from "@mantine/core";

export default function ColorMapPopover({ buttonClass, textClass }: { buttonClass: string, textClass: string }) {

    const hobbyColorMap = useDataStore(state => state.hobbySessionInfo)?.map(hobby => {
        return { color: hobby.hobbyData.color, title: hobby.hobbyData.title }
    });
    //${isSmallestBreakpoint ? 'right-4' : ''}
    return (
        <Popover width={250} position="bottom" withArrow shadow="md">
            <Popover.Target>
                <button className={`${buttonClass}`}>
                    <p className={`${textClass}`}>Hobby Color Index</p>
                </button>
            </Popover.Target>

            <Popover.Dropdown>
                <section className={`grid grid-flow-row-dense grid-cols-1 w-full h-content`}>
                    {hobbyColorMap && hobbyColorMap.map((map: { color: string, title: string }, index: number) => {
                        const color = map.color;
                        const title = map.title;
                        return (
                            <li key={index} className='flex flex-row items-center justify-start px-1'>
                                <div className="h-2 sm:h-3 w-2 sm:w-3 rounded-full border border-slate-500" style={{ backgroundColor: color }} />
                                <p className='text-xs sm:text-sm md:text-md text-gray-800 px-1'>{title}</p>
                            </li>
                        )
                    })}
                </section>
            </Popover.Dropdown>
        </Popover>
    )
}