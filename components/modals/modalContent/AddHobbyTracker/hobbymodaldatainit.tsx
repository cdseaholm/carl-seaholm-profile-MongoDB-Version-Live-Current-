'use client'

import { useModalStore } from "@/context/modalStore";
import { InitialNewHobbyFormValues, NewHobbyFormType, NewHobbyFormValues } from "@/models/types/newHobby";
import { Modal } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import NewHobbyFormComponents from "./hobbymodal";
import { useSession } from "next-auth/react";
import { useHobbyStore } from "@/context/hobbyStore";
import { AttemptToCreateNewHobby } from "@/utils/apihelpers/create/attemptToCreateNewHobby";
import { IHobbyData } from "@/models/types/hobbyData";
import { ITimeFrequency } from "@/models/types/time-frequency";
import LoadingSpinner from "@/app/(content)/projects/school/infoVis-DatasetProject/components/components/misc/loadingSpinner";
import { IUser } from "@/models/types/user";
import { useStateStore } from "@/context/stateStore";
import { useDataStore } from "@/context/dataStore";



export default function NewHobbyFormModal() {

    const { data: session } = useSession();

    const newHobbyForm = useForm({
        initialValues: {
            hobbyTitle: '',
            hobbyColor: '#000000',
            hobbyCategory: '',
            hobbyCreate: '',
            hobbyGoalType: '',
            hobbyGoalValue: '',
            hobbyDescription: ''
        } as NewHobbyFormValues,
    }) as NewHobbyFormType;

    const user = session ? session.user as IUser : {} as IUser;
    const userEmail = user ? (user.email as string) : '';
    const titles = useHobbyStore(state => state.titles);
    const setTitles = useHobbyStore(state => state.setTitles);
    const showAddHobbyModal = useModalStore(state => state.showAddHobbyModal);
    const setShowAddHobbyModal = useModalStore(state => state.setShowAddHobbyModal);
    const [loading, setLoading] = useState(true);
    const setGlobalLoading = useStateStore(state => state.setGlobalLoading);
    const setFilteredHobbies = useDataStore(state => state.setFilteredHobbies);
    const setFilteredDates = useDataStore(state => state.setFilteredDates);

    const HandleCreateHobby = async (hobbyFormToMake: NewHobbyFormType) => {
        try {

            if (user === null || !user || user === {} as IUser) {
                toast.error('You are unauthorized!~user')
                return;
            }
            if (!userEmail || userEmail === '') {
                toast.error('You are unauthorized!~email')
                return;
            }

            const newHobbyTitle = hobbyFormToMake.getValues().hobbyTitle;
            if (!newHobbyTitle) {
                toast.warning('Must include title');
                return;
            }

            if (titles.includes(newHobbyTitle)) {
                toast.warning('This title is already in use!')
                return;
            } else {
                setTitles([...titles, newHobbyTitle]);
            }

            const colorToUse = hobbyFormToMake.getValues().hobbyColor;
            const categoryToUse = hobbyFormToMake.getValues().hobbyCategory;

            if (!categoryToUse) {
                toast.error('Category needed!')
                return;
            }
            let newHobbyGoalType = hobbyFormToMake.getValues().hobbyGoalType;

            const newHobbyGoalValue = hobbyFormToMake.getValues().hobbyGoalValue;

            if (newHobbyGoalValue !== '' && newHobbyGoalType === '') {
                newHobbyGoalType = 'Custom Goal'
            }
            const goalToUse = `${newHobbyGoalType}-${newHobbyGoalValue.toString()}`;
            const goalToPass = goalToUse ? goalToUse : ''
            const newHobbyDescription = hobbyFormToMake.getValues().hobbyDescription;

            const hobbyToCreate = {
                userId: '',
                title: newHobbyTitle,
                timeFrequency: [] as ITimeFrequency[],
                description: newHobbyDescription ? newHobbyDescription : '',
                category: categoryToUse ? categoryToUse : '',
                color: colorToUse ? colorToUse : '#3b82f6',
                isActive: true,
                goals: goalToPass !== '' ? [goalToPass] : []
            } as IHobbyData

            const headers = { 'Authorization': `Bearer ${userEmail}` };
            const res = await AttemptToCreateNewHobby({ hobbyToCreate, userEmail }, headers)

            if (res && res === true) {

                toast.success('Hobby created successfully!');
                hobbyFormToMake.reset();
                hobbyFormToMake.setValues(InitialNewHobbyFormValues);
                setFilteredHobbies([]);
                const today = new Date();
                const minusFiveMonths = new Date();
                minusFiveMonths.setMonth(today.getMonth() - 5);
                setFilteredDates({ type: 'range', range: [minusFiveMonths, today] });
                setShowAddHobbyModal(false);
                setGlobalLoading(true);

            } else {
                console.log('Error creating hobby');
            }

        } catch (error) {
            console.log('Error creating hobby:', error ? error : 'No error');
        }

    };

    const resetModal = () => {

        newHobbyForm.reset();
        newHobbyForm.setValues(InitialNewHobbyFormValues);

    }

    const toRender = <Modal opened={showAddHobbyModal} onClose={() => { resetModal(); setShowAddHobbyModal(false); }} size={'90%'} withCloseButton={true} centered={true} closeOnClickOutside={true}>
        {loading ? (
            <div className="flex items-center justify-center w-full h-full">
                <LoadingSpinner />
            </div>
        ) : (<NewHobbyFormComponents newHobbyForm={newHobbyForm} HandleCreateHobby={HandleCreateHobby} />
        )}
    </Modal>;


    useEffect(() => {
        //if (colorName === '') {
        //    setColorName(colorChoice !== null ? ntc.name(colorChoice)[1] : 'Black');
        //}
        setLoading(false)
    }, []);

    return toRender;
}