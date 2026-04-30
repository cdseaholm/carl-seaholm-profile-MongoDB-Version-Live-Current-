'use client'

import { Combobox, InputBase, Select, Tooltip, useCombobox } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { UseFormReturnType } from "@mantine/form";
import { useState } from "react";
import { FiInfo } from "react-icons/fi";
import { LogSessionFormReturnType, LogSessionFormType, logSessionType } from "@/models/types/log-session";
import { useWindowSizes } from "@/context/width-height-store";
import { IHobbyData } from "@/models/types/hobbyData";

export default function LogSessionModal({ daySelected, handleSessionCall, handleModalOpen, handleDaySelected, logSessionForm, hobbyData }: { handleSessionCall: ({ sessionsToManipulate }: { sessionsToManipulate: logSessionType[] }) => void, handleModalOpen: (modal: 'newHobby' | 'logSession' | 'colorIndex' | null) => void, daySelected: string, handleDaySelected: (arg: string) => void, logSessionForm: LogSessionFormReturnType, hobbyData: IHobbyData[] }) {

    const { width } = useWindowSizes();
    const autoCompleteWidth = width && width <= 640 ? '100%' : '40%';
    const usesTouchTooltip = width < 768;
    const [openTooltipIndex, setOpenTooltipIndex] = useState<number | null>(null);
    const emptySessionRow: logSessionType = {
        hobbyKeyId: -1,
        session: '',
        time: '',
        mostFrequentlyUseTime: [],
    };

    const ensureSingleEmptySessionRow = (rows: logSessionType[]) => {
        const filledRows = rows.filter((row) => row.session);

        return [...filledRows, emptySessionRow];
    };

    const sessionsMapped = logSessionForm.getValues().newSessions.map((session, newSeshI) => {

        const selectedByOtherRows = logSessionForm
            .getValues()
            .newSessions
            .filter((_, index) => index !== newSeshI)
            .map((sesh) => sesh.session);

        return (
            <div className="flex flex-col justify-start items-start sm:flex-row sm:justify-between sm:items-center border-1 border-slate/30 p-2 rounded-md w-full h-content text-black max-sm:space-y-2 sm:space-x-2" key={newSeshI}>

                <Select
                    placeholder="Search hobby..."
                    data={hobbyData
                        .map((hobby) => hobby.title)
                        .filter((title) => !selectedByOtherRows.includes(title))
                    }
                    w={autoCompleteWidth}
                    value={session.session || null}
                    allowDeselect
                    onChange={(value) => {
                        const freqUsedTimes =
                            hobbyData
                                .find((hobby) => hobby.title === value)
                                ?.timeFrequency
                                ?.map((freq) => freq.time)
                                .filter((time) => time !== 0) || [];
                        const newSessions = logSessionForm.getValues().newSessions.map((row, index) => {
                            if (index !== newSeshI) {
                                return row;
                            }

                            return {
                                ...row,
                                session: value || '',
                                mostFrequentlyUseTime: freqUsedTimes.slice(0, 3),
                            };
                        });

                        logSessionForm.setValues({
                            newSessions: ensureSingleEmptySessionRow(newSessions),
                        });
                    }}
                />

                <div key={newSeshI} className="flex flex-row sm:justify-end items-center justify-start space-x-2 h-full sm:w-3/5 w-full">
                    {logSessionForm.getValues().newSessions[newSeshI].mostFrequentlyUseTime.length > 0 &&
                        <div className="flex flex-row justify-between items-center w-full h-[36px] border border-gray-400 rounded-md space-x-1 px-2">
                            <Tooltip
                                label="Select from most frequently used times or input your own value"
                                withArrow
                                opened={usesTouchTooltip ? openTooltipIndex === newSeshI : undefined}
                            >
                                <button
                                    type="button"
                                    aria-label="Show time selection help"
                                    className="flex h-[28px] w-[28px] items-center justify-center text-gray-500 hover:text-gray-800"
                                    onClick={() => {
                                        if (usesTouchTooltip) {
                                            setOpenTooltipIndex(openTooltipIndex === newSeshI ? null : newSeshI);
                                        }
                                    }}
                                    onBlur={() => {
                                        if (usesTouchTooltip) {
                                            setOpenTooltipIndex(null);
                                        }
                                    }}
                                >
                                    <FiInfo width={'16px'} />
                                </button>
                            </Tooltip>
                            <div className="flex flex-row justify-center items-center rounded-md flex-1 ml-2 h-[33px] min-w-0">
                                {logSessionForm.getValues().newSessions[newSeshI].mostFrequentlyUseTime.map((time, timeI) =>
                                    width && width <= 640 && timeI >= 2 ? null : (
                                        <button
                                            type="button"
                                            key={timeI}
                                            className="flex-1 min-w-0 flex justify-center items-center bg-blue-100 border border-gray-400 rounded-md hover:bg-blue-400 mx-1 h-[33px]"
                                            onClick={() =>
                                                logSessionForm.setFieldValue(
                                                    `newSessions.${newSeshI}.time`,
                                                    time && time !== 0 ? time.toString() : ""
                                                )
                                            }
                                        >
                                            <p className="text-xs sm:text-sm md:text-base text-center w-full text-black p-2 truncate">
                                                {`${time}`}
                                            </p>
                                        </button>
                                    )
                                )}
                            </div>
                        </div>
                    }

                    <div className="flex flex-row justify-center items-center w-full sm:w-1/3 h-[36px]">
                        <IndividualTimeSelect session={session} logSessionForm={logSessionForm} passedIndex={newSeshI} width={width} />
                    </div>
                </div>
            </div>
        )
    });

    return (
        <form className="flex flex-col justify-start items-center max-w-[90vw] max-h-[75vh] bg-green-200 overflow-hidden" onSubmit={logSessionForm.onSubmit(() => handleSessionCall({ sessionsToManipulate: logSessionForm.getValues().newSessions }))}>
            <div className="flex flex-row justify-between items-end w-full h-content border-b border-gray-400 pb-2 mb-2 h-content">
                <DatePickerInput
                    label="Pick date"
                    placeholder="Session Date"
                    value={new Date(daySelected)}
                    onChange={(date) => {
                        if (date) {
                            handleDaySelected(date.toLocaleDateString());
                        }
                    }}
                    w={'auto'}
                />
            </div>
            <section className={`flex flex-col justify-start items-center w-full h-[70dvh] py-2 px-1 sm:py-3 sm:px-2 bg-slate-100/70 rounded-md shadow-[inset_0_2px_8px_rgba(0,0,0,0.10),inset_0_-2px_8px_rgba(0,0,0,0.10)] border border-gray-300 overflow-auto scrollbar-thin scrollbar-webkit scrollbar-track-rounded-full space-y-2`}>
                {sessionsMapped}
            </section>
            <div className="flex flex-row justify-between space-x-1 items-center border-t border-gray-400 w-full h-content p-2 mt-2">
                <button type="submit" className={`text-white text-[8px] sm:text-sm p-1 sm:px-2 sm:py-1.5 text-center w-1/3 sm:w-1/4 font-medium rounded-lg ${logSessionForm.isDirty() ? "bg-blue-400 hover:bg-blue-200 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" : "bg-gray-400 cursor-not-allowed"}`} data-modal-toggle="crud-modal" disabled={!logSessionForm.isDirty()}>
                    {`Save`}
                </button>
                <button type="button" className={`text-blue-400 bg-transparent hover:text-blue-200 rounded-lg text-[8px] sm:text-sm p-1 sm:px-2 sm:py-1.5 border border-gray-400 dark:hover:bg-gray-600 dark:hover:text-white w-1/3 sm:w-1/4`} data-modal-toggle="crud-modal" onClick={() => { handleModalOpen('newHobby') }}>
                    Create Hobby
                </button>
            </div>
        </form>
    )
}

function IndividualTimeSelect({ session, logSessionForm, passedIndex, width }: { session: logSessionType, logSessionForm: UseFormReturnType<LogSessionFormType, (values: LogSessionFormType) => LogSessionFormType>, passedIndex: number, width: number }) {

    const [search, setSearch] = useState<string>('');
    const [optionRows, setOptionRows] = useState<string[]>(['0', '5', '10', '15', '20', '25', '30', '35', '40', '45', '50', '60', '90', '120', '180', '210', '240', '300', '330', '360'])
    const combobox = useCombobox({
        onDropdownClose: () => combobox.resetSelectedOption(),
    });
    const widthToUse = width && width <= 640 ? '100%' : '220px';

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
                } else if (val === '0') {
                    logSessionForm.setFieldValue(`newSessions.${passedIndex}.time`, '');
                } else {
                    logSessionForm.setFieldValue(`newSessions.${passedIndex}.time`, val);
                }
                combobox.closeDropdown();
            }}
            width={widthToUse}
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
                            height: '36px',
                            minHeight: '36px',
                            padding: '0 8px',
                            fontSize: width && width <= 640 ? '12px' : '14px',
                            lineHeight: '30px',
                        },
                        wrapper: {
                            height: '36px',
                        },
                        root: {
                            height: '36px',
                        }
                    }}
                    w={width && width <= 640 ? '100%' : '220px'}
                />
            </Combobox.Target>

            <Combobox.Dropdown w={width && width < 640 ? '80dvw' : '300px'}>
                <Combobox.Options>
                    <div className={`flex grid-cols-5 text-black ${width < 640 ? 'w-[80dvw]' : 'w-content'}`} style={{
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
                                <p className="text-xs sm:text-sm md:text-base text-center text-black cursor-pointer">
                                    {num}
                                </p>
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
