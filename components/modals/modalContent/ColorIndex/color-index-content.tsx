'use client'

export default function ColorIndexContent({ hobbyColorMap, monthColorMap }: { hobbyColorMap: { color: string, title: string }[], monthColorMap: { color: string, title: string }[] }) {

    console.log('Rendering ColorIndexContent with:', { hobbyColorMap, monthColorMap });

    return (
        <section className="flex flex-col w-full max-h-[80dvh] justify-start items-start divide-y divide-gray-400 overflow-y-auto p-2 space-y-2">
            <div className="flex flex-col w-full justify-start items-start h-full">
                <p className="w-full text-start font-semibold underline">Hobby Colors</p>
                <div className={`grid grid-flow-row-dense grid-cols-2 w-full h-full pb-2 gap-2`}>
                    {hobbyColorMap && hobbyColorMap.map((map: { color: string, title: string }, index: number) => {
                        const color = map.color;
                        const title = map.title;
                        return (
                            <li key={index} className='flex flex-row items-center justify-start px-1 w-full'>
                                <div className="h-5 w-5 sm:h-6 sm:w-6 rounded-full border border-slate-500 flex-shrink-0" style={{ backgroundColor: color }} />
                                <p className='text-xs sm:text-sm md:text-md text-gray-800 px-1 truncate flex-1'>{title}</p>
                            </li>
                        )
                    })}
                </div>
            </div>
            <div className="flex flex-col w-full justify-start items-start h-full">
                <p className="w-full text-start font-semibold underline">Month Colors</p>
                <div className={`grid grid-flow-row-dense grid-cols-2 w-full h-full gap-2`}>
                    {monthColorMap && monthColorMap.map((map: { color: string, title: string }, index: number) => {
                        const color = map.color;
                        const title = map.title;
                        return (
                            <li key={index} className='flex flex-row items-center justify-start px-1 w-full'>
                                <div className="h-5 w-5 sm:h-6 sm:w-6 rounded-full border border-slate-500 flex-shrink-0" style={{ backgroundColor: color }} />
                                <p className='text-xs sm:text-sm md:text-md text-gray-800 px-1 truncate flex-1'>{title}</p>
                            </li>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}