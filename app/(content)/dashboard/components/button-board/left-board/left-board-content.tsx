'use client'

import { DateRangeType } from "@/context/dataStore";
import { Tabs, Tooltip } from "@mantine/core";
import { DatePicker, MonthPicker, YearPicker } from "@mantine/dates"

export default function LeftBoardContent({ options, dateValues, setDateValues, handleApplyFilters, tabsTypeCopy, setTabsTypeCopy, newFilters, setNewFilters }: { options: React.ReactNode[], dateValues: DateRangeType, setDateValues: (value: DateRangeType) => void, handleApplyFilters: () => void, tabsTypeCopy: string | null, setTabsTypeCopy: (tab: string | null) => void, newFilters: boolean, setNewFilters: (value: boolean) => void }) {

    return (
        <div className='flex flex-col justify-start items-center gap-4 p-4 bg-gray-100 p-1 divide-y divide-gray-400 w-[96dvw] sm:w-full h-auto max-h-[80dvh]'>
            <div className="flex flex-row justify-between items-center w-full pb-2">
                <p>
                    {`Current: ${dateValues.range[0] ? dateValues.range[0].toLocaleDateString() : 'N/A'}${dateValues.range[1] ? ` - ${dateValues.range[1].toLocaleDateString()}` : ''}`}
                </p>
                <Tooltip label={newFilters ? 'Apply Filters' : 'No Changes to Apply'} withArrow>
                    <button onClick={handleApplyFilters} type="button" disabled={!newFilters ? true : false}>
                        <p className={`${newFilters ? 'cursor-pointer text-white hover:text-white transition-colors duration-200 bg-blue-600' : 'cursor-not-allowed text-gray-200 bg-gray-600'} px-3 py-1 rounded-md border border-gray-600 px-2 py-1`} >
                            Apply Filters
                        </p>
                    </button>
                </Tooltip>
            </div>
            <div className="w-full flex flex-col sm:flex-row justify-start sm:justify-evenly items-center">
                <Tabs value={tabsTypeCopy} onChange={setTabsTypeCopy} className="w-full flex flex-row justify-center items-center">
                    <Tabs.List>
                        <Tabs.Tab value="range">Date Range</Tabs.Tab>
                        <Tabs.Tab value="day">Single Day</Tabs.Tab>
                        <Tabs.Tab value="month">Month</Tabs.Tab>
                        <Tabs.Tab value="year">Year</Tabs.Tab>
                    </Tabs.List>
                    <div className="mt-2 w-full flex flex-col justify-center items-center">
                        <Tabs.Panel value="range" w={'100%'}>
                            <div className="w-full flex flex-col justify-center items-center">
                                <DatePicker type='range' value={dateValues.range} onChange={(dates) => {
                                    setNewFilters(true);
                                    if (dates[1] === null) {
                                        setDateValues({ type: 'day', range: [dates[0], null] });
                                    } else {
                                        setDateValues({ type: 'range', range: [dates[0], dates[1]] });
                                    }
                                }} />
                            </div>
                        </Tabs.Panel>
                        <Tabs.Panel value="day" w={'100%'}>
                            <div className="w-full flex flex-col justify-center items-center">
                                <DatePicker type='default' value={dateValues.range[0]} onChange={(date) => {
                                    setNewFilters(true);
                                    setDateValues({ type: 'day', range: [date, null] });
                                }} />
                            </div>
                        </Tabs.Panel>
                        <Tabs.Panel value="month" w={'100%'}>
                            <div className="w-full flex flex-col justify-center items-center">
                                <MonthPicker
                                    value={dateValues.range[0]}
                                    onChange={(m) => {
                                        setNewFilters(true);
                                        const monthLength = new Date(m!.getFullYear(), m!.getMonth() + 1, 0).getDate();
                                        const startOfMonth = new Date(m!.getFullYear(), m!.getMonth(), 1);
                                        let endOfMonth = new Date(m!.getFullYear(), m!.getMonth(), monthLength);
                                        if (m!.getFullYear() === new Date().getFullYear() && m!.getMonth() === new Date().getMonth()) {
                                            endOfMonth = new Date();
                                        }
                                        setDateValues({ type: 'month', range: [startOfMonth, endOfMonth] });
                                    }}
                                />
                            </div>
                        </Tabs.Panel>
                        <Tabs.Panel value="year" w={'100%'}>
                            <div className="w-full flex flex-col justify-center items-center">
                                <YearPicker
                                    value={dateValues.range[0]}
                                    onChange={(y) => {
                                        setNewFilters(true);
                                        const startOfYear = new Date(y!.getFullYear(), 0, 1);
                                        let endOfYear = new Date(y!.getFullYear(), 11, 31);
                                        if (y!.getFullYear() === new Date().getFullYear()) {
                                            endOfYear = new Date();
                                        }
                                        setDateValues({ type: 'year', range: [startOfYear, endOfYear] });
                                    }}
                                />
                            </div>
                        </Tabs.Panel>
                    </div>
                </Tabs>
            </div>
            <div className="w-full flex flex-col justify-start items-center py-2">
                <label className="w-full text-start font-semibold">Hobbies:</label>
                <div className={`flex grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 h-full overflow-y-auto gap-2 p-1 w-full`}>
                    {options.map((option) => option)}
                </div>
            </div>
        </div>
    )
}