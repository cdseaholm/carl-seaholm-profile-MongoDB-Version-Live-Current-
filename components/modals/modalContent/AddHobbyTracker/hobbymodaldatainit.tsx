'use client'

import { Spinner } from "@/components/misc/Spinner";
import { useHobbyStore } from "@/context/hobbyStore";
import { useModalStore } from "@/context/modalStore";
import { useSession } from "next-auth/react";
import ntc from "ntcjs";
import { useState, useEffect } from "react";
import ModalHobby from "./hobbymodal";
import { toast } from "sonner";
import { User } from "next-auth";
import { useStore } from "@/context/dataStore";
import { IFieldObject } from "@/models/types/field";
import { AttemptToCreateNewHobby } from "@/utils/apihelpers/create/attemptToCreateNewHobby";

export default function HobbyModalDataInit() {
    const { data: session } = useSession();
    const setModalOpen = useModalStore((state) => state.setModalOpen);
    const categoryPassed = useHobbyStore((state) => state.categoryPassed);
    const setRefreshKey = useHobbyStore((state) => state.setRefreshKey);
    const categories = useHobbyStore((state) => state.categories) as string[];
    const titles = useHobbyStore((state) => state.titles) as string[]
    const dashProps = useStore(state => state.dashProps);
    const fieldObjectsStored = dashProps ? dashProps.fieldObjects as IFieldObject[] : [] as IFieldObject[]
    const [colorChoice, setColorChoice] = useState('');
    const [goalChild, setGoalChild] = useState('Goal Value');
    const [goalType, setGoalType] = useState('text');
    const [catCreate, setCatCreate] = useState(false);
    const [goalPlaceHolder, setGoalPlaceHolder] = useState('Pick a Goal Type First');
    const [colorName, setColorName] = useState('Black');
    const [loading, setLoading] = useState(true);

    const handleColorUpdate = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setColorChoice(e.target.value);
        setColorName(ntc.name(e.target.value)[1]);
    };

    const handleModalOpen = () => {
        setModalOpen('logsession')
    }

    useEffect(() => {
        if (colorName === '') {
            setColorName(colorChoice !== null ? ntc.name(colorChoice)[1] : 'Black');
        }
        setLoading(false)
    }, [colorChoice, colorName]);


    const HandleCreateHobby = async (event: React.FormEvent<HTMLFormElement>) => {
        console.log('handleSubmit function called');
        event.preventDefault();
        try {
            const formData = new FormData(event.currentTarget);
            if (!session) {
                toast.error('You are unauthorized!')
                return;
            }
            const user = session.user as User;
            if (!user) {
                toast.error('You are unauthorized!')
                return;
            }
            const userEmail = user.email as string
            if (!userEmail) {
                toast.error('You are unauthorized!')
                return;
            }

            const titleToUse = formData.get('modalHobbyTitle')?.toString();

            if (!titleToUse) {
                toast.warning('Must include title');
                return;
            }

            if (titles.includes(titleToUse)) {
                toast.warning('This title is already in use!')
                return;
            }

            const colorToUse = formData.get('modalHobbyColor')?.toString();
            const colorToPass = colorToUse ? colorToUse as string : '' as string;

            const categoryToUse = catCreate === false ? formData.get('modalHobbyCategory')?.toString() : formData.get('modalHobbyCreate')?.toString();

            if (!categoryToUse) {
                toast.error('Category needed!')
                return;
            }

            const goalToUse = `${goalType}-${formData.get('modalHobbyGoalValue')?.toString()}`;
            const goalToPass = goalToUse ? [goalToUse] as string[] : [] as string[]
            const descriptionToUse = formData.get('modalHobbyDescription')?.toString() as string;
            const descriptionToPass = descriptionToUse ? [descriptionToUse] as string[] : [] as string[];

            if (!fieldObjectsStored) {
                toast.error("Interal error with field objects")
                return;
            }

            let fieldObjectIndex = fieldObjectsStored.length as number
            const headers = { 'Authorization': `Bearer ${userEmail}` };
            const res = await AttemptToCreateNewHobby({ titleToUse: titleToUse, fieldObjectIndex: fieldObjectIndex, colorToUse: colorToPass, categoryToUse: categoryToUse, descriptionToUse: descriptionToPass, goalToUse: goalToPass, userID: userEmail }, headers)

            if (res) {
                console.log('Hobby created');
                setRefreshKey(refreshKey => refreshKey + 1);
                setModalOpen('');
            } else {
                console.log('Error creating hobby');
            }
        } catch (error) {
            console.log('Error creating hobby:', error ? error : 'No error');
        }

    };

    const handleCategoryCreate = () => {
        setCatCreate(!catCreate);
    };

    const changeGoalChild = (goalValueSelected: string) => {
        if (goalValueSelected === '0') {
            setGoalChild('Goal Value');
            setGoalType('text');
            setGoalPlaceHolder('Pick a Goal Type First');
        } else if (goalValueSelected === '1') {
            setGoalChild('Time');
            setGoalType('datetime-local');
            setGoalPlaceHolder('By May-05');
        } else if (goalValueSelected === '2') {
            setGoalChild('Sessions Completed');
            setGoalType('number');
            setGoalPlaceHolder('20 sessions');
        } else if (goalValueSelected === '3') {
            setGoalChild('Distance');
            setGoalType('number');
            setGoalPlaceHolder('200 miles');
        } else if (goalValueSelected === '4') {
            setGoalChild('Financial');
            setGoalType('number');
            setGoalPlaceHolder('$2999');
        } else if (goalValueSelected === '5') {
            setGoalChild('Create your own');
            setGoalType('text');
            setGoalPlaceHolder('Type a Goal Here');
        }
    };

    return (
        loading ? (
            <Spinner />
        ) : (
            <ModalHobby categoryPassed={categoryPassed} categories={categories} goalChild={goalChild} goalPlaceHolder={goalPlaceHolder} handleColorUpdate={handleColorUpdate} HandleCreateHobby={HandleCreateHobby} handleCategoryCreate={handleCategoryCreate} changeGoalChild={changeGoalChild} colorName={colorName} catCreate={catCreate} handleModalOpen={handleModalOpen} />
        )
    )
}