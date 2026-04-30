'use client'

import { TextInput } from "@mantine/core"
import { UseFormReturnType } from "@mantine/form";

export type nameFormType = {
    name: string
}

export default function NameForm({ nameForm, handleCreateName, handleCancel }: { nameForm: UseFormReturnType<nameFormType, (values: nameFormType) => nameFormType>, handleCreateName: ({ nameForm }: { nameForm: UseFormReturnType<nameFormType, (values: nameFormType) => nameFormType> }) => void, handleCancel: () => void }) {

    return (
        <form id="nameForm" className="w-full h-full" onAbort={() => { nameForm.reset(); nameForm.clearErrors(); handleCancel(); }} onSubmit={nameForm.onSubmit(() => handleCreateName({ nameForm }))}>
            <TextInput
                id="formName"
                name="formName"
                label="Name"
                placeholder="Esteban..."
                mt={'md'}
                withAsterisk
                key={nameForm.key('name')}
                {...nameForm.getInputProps('name')}
                className="overflow-hidden whitespace-nowrap text-ellipsis pb-5"
            />
        </form>
    )
}