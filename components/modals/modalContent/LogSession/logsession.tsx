'use client'

import { Combobox, InputBase, Tooltip, useCombobox } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { UseFormReturnType } from "@mantine/form";
import { LogSessionFormType, logSessionType } from "./logsessiondatainit";
import { useState } from "react";
import { FiInfo } from "react-icons/fi";
import { useStateStore } from "@/context/stateStore";

export default function LogSessionModal({ daySelected, handleSessionCall, handleModalOpen, handleDaySelected, logSessionForm }: { handleSessionCall: ({ logSessionForm }: { logSessionForm: UseFormReturnType<LogSessionFormType, (values: LogSessionFormType) => LogSessionFormType> }) => void, handleModalOpen: (title: string) => void, daySelected: string, handleDaySelected: (arg: Date) => void, logSessionForm: UseFormReturnType<LogSessionFormType, (values: LogSessionFormType) => LogSessionFormType> }) {

    const width = useStateStore(state => state.widthQuery);

    const sessionsMapped = logSessionForm.getValues().newSessions.map((session, newSeshI) => (
        <div className="flex flex-col justify-start items-start sm:flex-row sm:justify-between sm:items-center border-1 border-slate/30 p-2 rounded-md w-full h-content text-black" key={newSeshI}>
            {`${session.session}: `}
            <div key={newSeshI} className="flex flex-row sm:justify-end items-center justify-evenly space-x-2 h-content w-content sm:w-3/5 w-full">
                <Tooltip label="Select from most frequently used times or input your own value" withArrow>
                    <FiInfo className="text-gray-500 hover:text-gray-800 cursor-pointer" />
                </Tooltip>
                {session.mostFrequentlyUseTime.map((time, timeI) => (
                    width && width <= 640 && timeI >= 2 ? null : (
                        <button type="button" key={timeI} className={`flex flex-row justify-center items-center text-black bg-blue-100 border border-gray-400 rounded-md hover:bg-blue-400 w-1/4 sm:w-[15%] h-[30px]`} data-modal-toggle="crud-modal" onClick={() => logSessionForm.setFieldValue(`newSessions.${newSeshI}.time`, time ? time.toString() : '')}>
                            {`${time}`}
                        </button>)
                ))}
                <div className="flex flex-row justify-center items-center w-1/3 sm:w-1/4 h-[30px]">
                    <IndividualTimeSelect session={session} logSessionForm={logSessionForm} passedIndex={newSeshI} />
                </div>
            </div>
        </div>
    ));

    return (
        <form className="flex flex-col justify-start items-center max-w-[90vw] max-h-[75vh] bg-green-200 overflow-hidden" onSubmit={logSessionForm.onSubmit(() => handleSessionCall({ logSessionForm }))}>
            <div className="flex flex-row justify-between items-center w-full h-content border-b border-gray-400 pb-2 mb-2">
                <DatePickerInput
                    label="Pick date"
                    placeholder="Session Date"
                    value={new Date(daySelected)}
                    onChange={(date) => {
                        if (date) {
                            handleDaySelected(date);
                        }
                    }}
                />
                <p className="underline text-[12px] font-semibold">Times to record</p>
            </div>
            <section className={`flex flex-col justify-start items-center w-full h-[85%] md:h-[70vh] py-2 px-1 sm:py-3 sm:px-2 bg-slate-100/70 rounded-md shadow-[inset_0_2px_8px_rgba(0,0,0,0.10),inset_0_-2px_8px_rgba(0,0,0,0.10)] border border-gray-300 overflow-auto scrollbar-thin scrollbar-webkit scrollbar-track-rounded-full space-y-2`}>
                {sessionsMapped}
            </section>
            <div className="flex flex-row justify-between space-x-1 items-center border-t border-gray-400 w-full h-content pt-2 mt-2">
                <button type="submit" className={`text-white text-[8px] sm:text-sm p-1 sm:px-2 sm:py-1.5 text-center w-1/2 sm:w-1/4 font-medium rounded-lg ${logSessionForm.isDirty() ? "bg-blue-400 hover:bg-blue-200 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" : "bg-gray-400 cursor-not-allowed"}`} data-modal-toggle="crud-modal" disabled={!logSessionForm.isDirty()}>
                    {`Save`}
                </button>
                <button type="button" className={`text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-[8px] sm:text-sm p-1 sm:px-2 sm:py-1.5  dark:hover:bg-gray-600 dark:hover:text-white w-1/2 sm:w-1/4`} data-modal-toggle="crud-modal" onClick={() => { handleModalOpen('addhobby') }}>
                    Create Hobby
                </button>
            </div>
        </form>
    )
}

function IndividualTimeSelect({ session, logSessionForm, passedIndex }: { session: logSessionType, logSessionForm: UseFormReturnType<LogSessionFormType, (values: LogSessionFormType) => LogSessionFormType>, passedIndex: number }) {

    const [search, setSearch] = useState<string>('');
    const [optionRows, setOptionRows] = useState<string[]>(['5', '10', '15', '20', '25', '30', '35', '40', '45', '50', '60', '90', '120', '180', '210', '240', '300', '330', '360', '390'])
    const combobox = useCombobox({
        onDropdownClose: () => combobox.resetSelectedOption(),
    });

    const exactOptionMatch = optionRows.some((item) => item === search);
    const filteredOptions = exactOptionMatch
        ? optionRows
        : optionRows.filter((item) => item.includes(search.trim()));

    return (
        <Combobox
            store={combobox}
            withinPortal={false}
            onOptionSubmit={(val) => {
                if (val === '$create') {
                    setOptionRows((curr) => [...curr, search]);
                    const newLog = { session: session.session, hobbyKeyId: session.hobbyKeyId, time: search, mostFrequentlyUseTime: session.mostFrequentlyUseTime } as logSessionType
                    logSessionForm.setFieldValue(`newSessions.${passedIndex}`, newLog);
                } else {
                    const newLog = { session: session.session, hobbyKeyId: session.hobbyKeyId, time: val, mostFrequentlyUseTime: session.mostFrequentlyUseTime } as logSessionType
                    logSessionForm.setFieldValue(`newSessions.${passedIndex}`, newLog);
                }
                combobox.closeDropdown();
            }}
        >
            <Combobox.Target>
                <InputBase
                    pointer
                    rightSection={<Combobox.Chevron />}
                    value={logSessionForm.getValues().newSessions[passedIndex].time}
                    onChange={(event) => {
                        const inputValue = event.currentTarget.value;
                        if (/^\d*$/.test(inputValue)) {
                            setSearch(inputValue);
                            logSessionForm.replaceListItem('newSessions', passedIndex, {
                                ...session,
                                time: inputValue,
                            });
                        }
                    }}
                    onClick={() => combobox.openDropdown()}
                    onFocus={() => combobox.openDropdown()}
                    onBlur={() => {
                        combobox.closeDropdown();
                        setSearch(search || '');
                    }}
                    placeholder="Search"
                    rightSectionPointerEvents="none"
                    onKeyDown={(event) => {
                        if (event.key === 'Backspace') {
                            event.preventDefault();
                            const newValue = search.slice(0, -1);
                            setSearch(newValue);
                            logSessionForm.replaceListItem('newSessions', passedIndex, {
                                ...session,
                                time: newValue,
                            });
                        }
                    }}
                    // ✅ Match button dimensions exactly
                    styles={{
                        input: {
                            height: '30px',
                            minHeight: '30px',
                            padding: '0 8px',
                            fontSize: '14px',
                            lineHeight: '30px',
                        },
                        wrapper: {
                            height: '30px',
                        },
                        root: {
                            height: '30px',
                        }
                    }}
                />
            </Combobox.Target>

            <Combobox.Dropdown>
                <Combobox.Options>
                    <div className="grid grid-cols-5 text-black w-content h-content" style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(5, minmax(50px, 1fr))',
                        gap: '8px',
                    }}>
                        {filteredOptions.map((num) => (
                            <Combobox.Option
                                key={num}
                                value={num}
                                className="flex flex-row items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-md text-black cursor-pointer w-content h-content"
                            >
                                {num}
                            </Combobox.Option>
                        ))}
                    </div>
                    {!exactOptionMatch && search.trim().length > 0 && (
                        <Combobox.Option value="$create" w={'100%'}>
                            <p className="text-black w-full text-center">+ Create {search}</p>
                        </Combobox.Option>
                    )}
                </Combobox.Options>
            </Combobox.Dropdown>
        </Combobox>
    );
}

{/* <Combobox store={combobox} withinPortal={false} onOptionSubmit={handleValueSelect}>
                    <Combobox.DropdownTarget>
                        <PillsInput pointer onClick={() => combobox.toggleDropdown()}>
                            <Pill.Group>
                                {values.length > 0 ? (
                                    values
                                ) : (
                                    <Input.Placeholder>{`Choose the hobbies you'd like to record sessions for`}</Input.Placeholder>
                                )}

                                <Combobox.EventsTarget>
                                    <PillsInput.Field
                                        type="hidden"
                                        onBlur={() => combobox.closeDropdown()}
                                        onKeyDown={(event) => {
                                            if (event.key === 'Backspace') {
                                                event.preventDefault();
                                                handleValueRemove(values.length - 1);
                                            }
                                        }}
                                    />
                                </Combobox.EventsTarget>
                            </Pill.Group>
                        </PillsInput>
                    </Combobox.DropdownTarget>

                    {/* <Combobox.Dropdown>
                        <Combobox.Options>{options}</Combobox.Options>
                    </Combobox.Dropdown> */}
//</Combobox > */}

//const activeHobbies = logSessionForm.getValues().newSessions.map((hob) => hob.session);
// const combobox = useCombobox({
//     onDropdownClose: () => combobox.resetSelectedOption(),
//     onDropdownOpen: () => combobox.updateSelectedOptionIndex('active'),
// });

// const handleValueRemove = (index: number) => {
//     logSessionForm.removeListItem('newSessions', index)
// }

// const handleValueSelect = (val: string) => {
//     const valToUse = hobbyTitles.find((hob) => hob.session === val);
//     if (!valToUse) {
//         toast.info('Error with selection');
//         return
//     }
//     activeHobbies.includes(valToUse.session) ? handleValueRemove(activeHobbies.findIndex((hob) => hob === valToUse.session)) : logSessionForm.insertListItem('newSessions', valToUse)
// }

// const values = logSessionForm.getValues().newSessions.map((item, index) => (
//     <Pill key={item.session} withRemoveButton onRemove={() => handleValueRemove(index)}>
//         {item.session}
//     </Pill>
// ));

// const options = hobbyTitles.map((item, index) => {
//     return (
//         <Combobox.Option value={item.session} key={index} active={activeHobbies.includes(item.session)}>
//             <Group gap="sm">
//                 <Checkbox
//                     checked={activeHobbies.includes(item.session)}
//                     onChange={() => { }}
//                     aria-hidden
//                     tabIndex={-1}
//                     style={{ pointerEvents: 'none' }}
//                 />
//                 <span>{item.session}</span>
//             </Group>
//         </Combobox.Option>
//     )
// });