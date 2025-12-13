'use client'

import { NewHobbyFormType } from "@/models/types/newHobby";
import { Combobox, Input, InputBase, TextInput, useCombobox } from "@mantine/core";
import { useState } from "react";

export default function AddHobbyGoal({ newHobbyForm }: { newHobbyForm: NewHobbyFormType }) {

    const goalTypes = [

        'Time',
        'Sessions Completed',
        'Distance',
        'Financial',
        'Custom Goal'
    ];

    const combobox = useCombobox({
        onDropdownClose: () => combobox.resetSelectedOption(),
    });

    const [value, setValue] = useState<string | null>(null);

    const options = goalTypes.map((item) => (
        <Combobox.Option value={item} key={item}>
            {item}
        </Combobox.Option>
    ));

    return (
        <div className="flex flex-col justify-start items-start md:flex-row md:justify-between md:items-end w-full max-md:space-y-2 h-content">
            <Combobox
                store={combobox}
                withinPortal={false}
                onOptionSubmit={(val) => {
                    setValue(val);
                    combobox.closeDropdown();
                    newHobbyForm.setFieldValue('hobbyGoalType', val);
                }}
                width={'auto'}
            >
                <Combobox.Target>
                    <InputBase
                        component="button"
                        type="button"
                        pointer
                        label="Choose or Create Goal Type, then enter a goal value"
                        rightSection={<Combobox.Chevron />}
                        onClick={() => combobox.toggleDropdown()}
                        rightSectionPointerEvents="none"
                    >
                        {value || <Input.Placeholder>Pick value</Input.Placeholder>}
                    </InputBase>
                </Combobox.Target>

                <Combobox.Dropdown>
                    <Combobox.Options>{options}</Combobox.Options>
                </Combobox.Dropdown>
            </Combobox>
            <TextInput
                id="modalHobbyGoalValue"
                name="modalHobbyGoalValue"
                width={'auto'}
                placeholder="e.g., 10 hours/week"
                key={newHobbyForm.key('hobbyGoalValue')}
                {...newHobbyForm.getInputProps('hobbyGoalValue')}
            />
        </div>
    )
}
