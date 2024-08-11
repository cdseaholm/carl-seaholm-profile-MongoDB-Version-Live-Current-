'use client'

import React, { useEffect } from 'react';
import { useModalStore } from '@/context/modalStore';
import { useStateStore } from '@/context/stateStore';
import { IHobby } from '@/models/types/hobby';
import { ITask } from '@/models/types/task';
import { Spinner } from '@/components/misc/Spinner';
import InnerHeader from '@/components/pagetemplates/innerheader/InnerHeader';
import MainChild from '@/components/pagetemplates/mainchild/mainchild';
import { IRecipe } from '@/models/types/recipe';
import { CreateCustomField } from '@/utils/customFields/create';
import { DeleteUser } from '@/utils/userHelpers/delete';
import { toast } from "sonner";
import { useRouter } from 'next/navigation';
import { signOut } from '@/auth';

interface DataState {
    hobbies: IHobby[];
    tasks: ITask[];
    recipes: IRecipe[];
}

export default function ProfilePage() {
    const urlToUse = useStateStore((state) => state.urlToUse);
    const userID = process.env.NEXT_PUBLIC_ADMIN_USERNAME;
    const [data, setData] = React.useState<DataState>({ hobbies: [], tasks: [], recipes: [] });
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);
    const [customFieldTitle, setCustomFieldTitle] = React.useState<string | null>(null);
    const [customFieldValue, setCustomFieldValue] = React.useState<string | null>(null);
    const [customObject, setCustomObject] = React.useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        try {
            Promise.all([
                fetch(urlToUse + '/api/' + userID + '/gethobbies').then((res) => res.json()),
                fetch(urlToUse + '/api/' + userID + '/getTasks').then((res) => res.json()),
                fetch(urlToUse + '/api/' + userID + '/getrecipes').then((res) => res.json())
            ]).then(([data1, data2, data3]) => {
                setData({ hobbies: data1.hobbies, tasks: data2.tasks, recipes: data3.recipes });
            });
        } catch (error) {
            setError(error as string);
        }
        setLoading(false);
    }, [setLoading, urlToUse, userID, setData, setError]);

    const setModalOpen = useModalStore((state) => state.setModalOpen);
    const handleLogout = () => {
        console.log('logout');
    }

    const showPassword = async () => {

    }

    const handleUpdateHobbiesLocal = async () => {
        const updatedFields = await fetch(urlToUse + '/api/' + userID + '/edituser', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ hobbies: data.hobbies, tasks: data.tasks, recipes: data.recipes }),
        });
        if (updatedFields.ok) {
            console.log('Updated hobbies');
        } else {
            console.log('Failed to update hobbies');
        }
    };

    const handleTestCustomField = async () => {
        if (!customFieldTitle || !customFieldValue || !customObject) {
            console.log('Custom Field or Value is empty');
            return;
        }
        const updatedFields = await CreateCustomField({
                fieldTitle: customFieldTitle as string,
                type: 'string' as string,
                value: customFieldValue as any,
            customFieldObjectName: customObject as string,
            urlToUse: urlToUse as string
        });
        if (updatedFields.success) {
            console.log('Updated Custom Fields');
        } else {
            console.log(updatedFields.message);
        }
    }

    const handleDeleteUser = async () => {
        if (!userID) {
            console.log('No user ID');
            return;
        }
        const deleteUser = await DeleteUser({ userID: userID, urlToUse: urlToUse });
        if (deleteUser) {
            signOut();
            router.push('/');
            toast.success('User deleted');
        } else {
            toast.error('Failed to delete user');
        }
    };

    return (
        loading ? <Spinner /> :
            error ? <div>{error}</div> :
                <>
                    <InnerHeader>
                        <h1 className="text-lg underline">Profile</h1>
                    </InnerHeader>
                    <MainChild>
                        <div className="flex flex-col justify-center space-y-4 p-4">
                            <button onClick={() => setModalOpen('edituser')}>
                                Edit Profile
                            </button>
                            <button onClick={() => {
                                handleUpdateHobbiesLocal();
                            }}>
                                Update Hobbies Local
                            </button>
                            <input type="text" placeholder="Custom Object Name" onChange={(e) => { setCustomObject(e.target.value) }} />
                            <input type="text" placeholder="Custom Field Name" onChange={(e) => { setCustomFieldTitle(e.target.value) }} />
                            <input type="text" placeholder="Custom Field Value" onChange={(e) => { setCustomFieldValue(e.target.value) }} />
                            <button onClick={() => {
                                handleTestCustomField();
                            }}>
                                Test Custom Field
                            </button>
                            <button onClick={() => handleDeleteUser()}>
                                Delete Account
                            </button>
                            <button onClick={showPassword}>
                                Change Password
                            </button>
                            <button onClick={handleLogout}>
                                Logout
                            </button>
                        </div>
                    </MainChild>
                </>
    );
};