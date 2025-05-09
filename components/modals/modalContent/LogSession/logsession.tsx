'use client'

import { Checkbox, Combobox, Group, Input, InputBase, Pill, PillsInput, useCombobox } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { UseFormReturnType } from "@mantine/form";
import { LogSessionFormType, logSessionType } from "./logsessiondatainit";
import { useState } from "react";
import { toast } from "sonner";

export default function LogSessionModal({ daySelected, handleCreate, hobbyTitles, handleModalOpen, sessions, handleResetSessions, handleDaySelected, logSessionForm }: { handleCreate: ({ logSessionForm }: { logSessionForm: UseFormReturnType<LogSessionFormType, (values: LogSessionFormType) => LogSessionFormType> }) => void, hobbyTitles: logSessionType[], handleModalOpen: (title: string) => void, sessions: { hobby: string, time: string }[], handleResetSessions: () => void, daySelected: Date, handleDaySelected: (arg: Date) => void, logSessionForm: UseFormReturnType<LogSessionFormType, (values: LogSessionFormType) => LogSessionFormType> }) {

    const activeHobbies = logSessionForm.getValues().newSessions.map((hob) => hob.session);
    const combobox = useCombobox({
        onDropdownClose: () => combobox.resetSelectedOption(),
        onDropdownOpen: () => combobox.updateSelectedOptionIndex('active'),
    });

    const handleValueRemove = (index: number) => {
        logSessionForm.removeListItem('newSessions', index)
    }

    const handleValueSelect = (val: string) => {
        const valToUse = hobbyTitles.find((hob) => hob.session === val);
        if (!valToUse) {
            toast.info('Error with selection');
            return
        }
        activeHobbies.includes(valToUse.session) ? handleValueRemove(activeHobbies.findIndex((hob) => hob === valToUse.session)) : logSessionForm.insertListItem('newSessions', valToUse)
    }

    const values = logSessionForm.getValues().newSessions.map((item, index) => (
        <Pill key={item.session} withRemoveButton onRemove={() => handleValueRemove(index)}>
            {item.session}
        </Pill>
    ));

    const options = hobbyTitles.map((item, index) => {
        return (
            <Combobox.Option value={item.session} key={index} active={activeHobbies.includes(item.session)}>
                <Group gap="sm">
                    <Checkbox
                        checked={activeHobbies.includes(item.session)}
                        onChange={() => { }}
                        aria-hidden
                        tabIndex={-1}
                        style={{ pointerEvents: 'none' }}
                    />
                    <span>{item.session}</span>
                </Group>
            </Combobox.Option>
        )
    });

    return (
        <div style={{ maxHeight: '80vh', overflowY: 'hidden', height: '600px' }}>
            <form className="p-4 md:p-5 flex flex-col justify-start items-center w-full h-full" onSubmit={logSessionForm.onSubmit(() => handleCreate({ logSessionForm }))}>
                <div className="grid gap-4 mb-4 grid-cols-1 w-full h-content">
                    <DatePickerInput
                        label="Pick date"
                        placeholder="Session Date"
                        value={daySelected}
                        onChange={(date) => {
                            if (date) {
                                handleDaySelected(date);
                            }
                        }}
                    />
                    <Combobox store={combobox} withinPortal={false} onOptionSubmit={handleValueSelect}>
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

                        <Combobox.Dropdown>
                            <Combobox.Options>{options}</Combobox.Options>
                        </Combobox.Dropdown>
                    </Combobox>
                </div>
                <div className={`grid md:grid-cols-2 grid-cols-1 gap-2 h-full w-full overflow-y-auto space-y-2 border rounded-t-md border-gray-300 p-2`}>
                    {logSessionForm.getValues().newSessions.map((session, index) => (
                        <div className="flex flex-col justify-start items-center border-2 space-x-2 box-content border-white/30 p-4 rounded-md w-content h-full space-y-2 text-white" key={index}>
                            {`${session.session}'s time to record: `}
                            <div key={index} className="flex flex-row items-start justify-center space-x-2">
                                <p className="text-sm font-medium text-gray-900 dark:text-white my-2 pb-12">
                                    {index + 1}.
                                </p>
                                <IndividualTimeSelect session={session} logSessionForm={logSessionForm} passedIndex={index} />
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex flex-row justify-between space-x-1 items-center border-t border-gray-400 pt-2 w-full h-content">
                    <button type="submit" className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-1.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        {`+ Save ${sessions.length > 1 ? 'Sessions' : 'Session'}`}
                    </button>
                    <button type="button" className={`text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white pr-5`} data-modal-toggle="crud-modal" onClick={() => { handleModalOpen('addhobby'); handleResetSessions() }}>
                        Create new Tracker
                    </button>
                </div>
            </form>
        </div>
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
                    const newLog = { session: session.session, hobbyKeyId: session.hobbyKeyId, time: search } as logSessionType
                    logSessionForm.replaceListItem('newSessions', passedIndex, newLog);
                } else {
                    const newLog = { session: session.session, hobbyKeyId: session.hobbyKeyId, time: val } as logSessionType
                    logSessionForm.replaceListItem('newSessions', passedIndex, newLog);
                }
                combobox.closeDropdown();
            }}
            width={'auto'}
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
                                time: inputValue, // Keep the value as a string
                            });
                        }
                    }}
                    onClick={() => combobox.openDropdown()}
                    onFocus={() => combobox.openDropdown()}
                    onBlur={() => {
                        combobox.closeDropdown();
                        setSearch(search || '');
                    }}
                    placeholder="Search value"
                    rightSectionPointerEvents="none"
                    onKeyDown={(event) => {
                        if (event.key === 'Backspace') {
                            event.preventDefault();
                            const newValue = search.slice(0, -1); // Remove the last character
                            setSearch(newValue); // Update the search state
                            logSessionForm.replaceListItem('newSessions', passedIndex, {
                                ...session,
                                time: newValue, // Keep the value as a string
                            });
                        }
                    }}
                />
            </Combobox.Target>

            <Combobox.Dropdown>
                <Combobox.Options>
                    <div className="grid grid-cols-5 text-black w-content h-content" style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(5, minmax(50px, 1fr))', // Ensure each column has a minimum width of 50px
                        gap: '8px', // Spacing between items
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