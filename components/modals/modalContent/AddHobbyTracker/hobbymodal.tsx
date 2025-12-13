'use client'

import { NewHobbyFormType } from "@/models/types/newHobby"
import { Button, ColorInput, Fieldset, Textarea, TextInput } from "@mantine/core"
import AddHobbyCategory from "./components/add-hobby-category"
import AddHobbyGoal from "./components/add-hobby-goal"

export default function NewHobbyFormComponents({ newHobbyForm, HandleCreateHobby }: { newHobbyForm: NewHobbyFormType, HandleCreateHobby: (newHobbyForm: NewHobbyFormType) => Promise<void> }) {

    return (

        <form id="NewHobbyModalForm" className="w-full h-full" onSubmit={newHobbyForm.onSubmit(() => HandleCreateHobby(newHobbyForm))}>
            <Fieldset className="grid gap-4 mb-4 grid-cols-1" legend="New Hobby Details">
                <TextInput
                    id="modalHobbyTitle"
                    name="modalHobbyTitle"
                    label="Name this Tracker"
                    placeholder="Type a name"
                    required
                    key={newHobbyForm.key('hobbyTitle')}
                    {...newHobbyForm.getInputProps('hobbyTitle')}
                />
                <ColorInput
                    id="modalHobbyColor"
                    name="modalHobbyColor"
                    label="Tracker Color"
                    format="hex"
                    withEyeDropper={false}
                    placeholder="Pick a color, currently ~ black"
                    key={newHobbyForm.key('hobbyColor')}
                    {...newHobbyForm.getInputProps('hobbyColor')}
                    swatchesPerRow={5}
                    swatches={[
                        '#000000', '#FF0000', '#00FF00', '#0000FF', '#FFFF00',
                        '#FF00FF', '#00FFFF', '#800000', '#808000', '#008000',
                        '#800080', '#008080', '#000080', '#FFA500', '#A52A2A',
                        '#FFC0CB', '#808080', '#C0C0C0', '#FFFFFF', '#FFFFE0'
                    ]}
                />
                {/**onChangeEnd for ColorInput if needed */}
                <AddHobbyCategory newHobbyForm={newHobbyForm} />
                <AddHobbyGoal newHobbyForm={newHobbyForm} />
                <Textarea
                    id="modalHobbyDescription"
                    name="modalHobbyDescription"
                    label="Description"
                    placeholder="Write description here"
                    minRows={4}
                    resize="vertical"
                    key={newHobbyForm.key('hobbyDescription')}
                    {...newHobbyForm.getInputProps('hobbyDescription')}
                />
            </Fieldset>
            <div className="flex flex-row justify-center items-center w-full h-content space-x-2">
                <Button type="submit" className="w-full" variant="filled" color="blue">
                    Add new Tracker
                </Button>
            </div>
        </form>
    )
}