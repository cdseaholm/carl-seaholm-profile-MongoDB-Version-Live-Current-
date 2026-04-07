'use client'

import { InitialNewHobbyFormValues, NewHobbyFormType, NewHobbyFormValues } from "@/models/types/newHobby";
import { Modal } from "@mantine/core";
import { useForm } from "@mantine/form";
import { toast } from "sonner";
import NewHobbyFormComponents from "./hobbymodal";
import { useSession } from "next-auth/react";
import { AttemptToCreateNewHobby } from "@/utils/apihelpers/create/attemptToCreateNewHobby";
import { IHobbyData } from "@/models/types/hobbyData";
import { ITimeFrequency } from "@/models/types/time-frequency";
import LoadingSpinner from "@/app/(content)/projects/school/infoVis-DatasetProject/components/components/misc/loadingSpinner";
import { IUser } from "@/models/types/user";
import { HobbyCheckMarkType } from "@/app/(content)/dashboard/components/button-board/left-board/left-board";



export default function NewHobbyFormModal({ titles, handleTitles, openModal, handleModal, loading, handleLoading, handleCurrFilters }: { titles: string[], handleTitles: (titles: string[]) => void, loading: boolean, handleCurrFilters: ({dateFilters, hobbyFilters}: { dateFilters: { type: 'range', range: [Date | null, Date | null] }, hobbyFilters: HobbyCheckMarkType[] }) => void, openModal: boolean, handleModal: (modal: 'newHobby' | 'logSession' | 'colorIndex' | null) => void, handleLoading: (loading: boolean) => void }) {

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

    const HandleCreateHobby = async (hobbyFormToMake: NewHobbyFormType) => {
        handleLoading(true);
        try {

            if (user === null || !user || user === {} as IUser) {
                toast.error('You are unauthorized!~user');
                handleLoading(false);
                return;
            }
            if (!userEmail || userEmail === '') {
                toast.error('You are unauthorized!~email')
                handleLoading(false);
                return;
            }

            const newHobbyTitle = hobbyFormToMake.getValues().hobbyTitle;
            if (!newHobbyTitle) {
                toast.warning('Must include title');
                handleLoading(false);
                return;
            }

            if (titles.includes(newHobbyTitle)) {
                toast.warning('This title is already in use!');
                handleLoading(false);
                return;
            } else {
                handleTitles([...titles, newHobbyTitle]);
            }

            const colorToUse = hobbyFormToMake.getValues().hobbyColor;
            const categoryToUse = hobbyFormToMake.getValues().hobbyCategory;

            if (!categoryToUse) {
                toast.error('Category needed!');
                handleLoading(false);
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
                const today = new Date();
                const minusFiveMonths = new Date();
                minusFiveMonths.setMonth(today.getMonth() - 5);
                handleCurrFilters({ dateFilters: { type: 'range', range: [minusFiveMonths, today] }, hobbyFilters: [] });
                handleModal(null);
                handleLoading(false);

            } else {
                console.log('Error creating hobby');
                handleLoading(false);
            }

        } catch (error) {
            console.log('Error creating hobby:', error ? error : 'No error');
            toast.error('Error creating hobby');
            handleLoading(false);
        }

    };

    const resetModal = () => {

        newHobbyForm.reset();
        newHobbyForm.setValues(InitialNewHobbyFormValues);
        
    }

    const toRender = (
        <Modal opened={openModal} onClose={() => { resetModal(); handleModal(null) }} size={'90%'} withCloseButton={true} centered={true} closeOnClickOutside={true}>
            {loading ? (
                <div className="flex items-center justify-center w-full h-full">
                    <LoadingSpinner />
                </div>
            ) : (<NewHobbyFormComponents newHobbyForm={newHobbyForm} HandleCreateHobby={HandleCreateHobby} />
            )}
        </Modal>
    );

    return toRender;
}