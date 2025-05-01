"use client";

import {
    CheckIcon,
    Combobox,
    Group,
    Pill,
    PillsInput,
    useCombobox,
} from "@mantine/core";
import { FilterType } from "../../types/filterType";

export default function FilterButton({ handleFilter, currentFilter, dataTitles, which, whichChart }: {
    handleFilter: (filterKey: number, which: string) => void; currentFilter: FilterType; dataTitles: FilterType[]; which: string, whichChart: string
}) {

    const combobox = useCombobox({
        onDropdownClose: () => combobox.resetSelectedOption(),
        onDropdownOpen: () => combobox.updateSelectedOptionIndex("active"),
    });

    const options = dataTitles.map((item) => {
        return (
            <Combobox.Option
                value={item.val}
                key={item.val}
                active={currentFilter.filterKey === item.filterKey}
                onClick={() => {
                    handleFilter(item.filterKey, which);
                }}
                w={170}
                disabled={whichChart === 'Bar' && item.val === 'quality' || whichChart === 'Line' && item.val === 'quality'}
            >
                <Group gap="sm">
                    {currentFilter.filterKey === item.filterKey ? <CheckIcon size={12} /> : null}
                    <Group gap={7}>
                        <span>{item.label}</span>
                    </Group>
                </Group>
            </Combobox.Option>
        );
    });

    return (
        <Combobox store={combobox} withinPortal={false} width={180}>
            <Combobox.DropdownTarget>
                <PillsInput
                    label={`${whichChart === 'Scatter' ? `${which === 'x' ? 'X' : 'Y'} Attribute Filter` : `${which === 'x' ? '1' : '2'} Comparison Type`}`}
                    className="w-[150px]"
                    pointer
                    onClick={() => combobox.toggleDropdown()}
                    rightSection={
                        <div
                            className="cursor-pointer"
                            onClick={() => {
                                handleFilter(-1, which);
                            }}
                        >
                            X
                        </div>
                    }
                    w={180}
                >
                    <Pill.Group>
                        {currentFilter.label}
                    </Pill.Group>
                </PillsInput>
            </Combobox.DropdownTarget>

            <Combobox.Dropdown w={180}>
                <Combobox.Options w={180}>{options}</Combobox.Options>
            </Combobox.Dropdown>
        </Combobox>
    );
}
