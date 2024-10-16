'use client'

import { signOut } from "@/auth";
import InnerHeader from "@/components/pagetemplates/innerheader/InnerHeader";
import MainChild from "@/components/pagetemplates/mainchild/mainchild";
import { useModalStore } from "@/context/modalStore";
import { useStateStore } from "@/context/stateStore";
import { IHobby } from "@/models/types/hobby";
import { IRecipe } from "@/models/types/recipe";
import { ITask } from "@/models/types/task";
import { DeleteUser } from "@/utils/userHelpers/delete";
import { Spinner } from "@nextui-org/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { toast } from "sonner";

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

    const handleUpdateHobbiesLocal = async () => {
        const updatedFields = await fetch(urlToUse + '/api/' + userID + '/transferOldObjects', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ hobbies: data.hobbies, tasks: data.tasks, recipes: data.recipes }),
        });
        const response = await updatedFields.json();
        if (response.updated) {
            toast.success('Updated hobbies');
        } else {
            toast.error('Failed to update hobbies');
        }
    };

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

    const testToast = () => {
        toast.success('Test toast');
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
                            <button onClick={() => setModalOpen('addNewObject')}>
                                Add New Object
                            </button>
                            <button onClick={() => setModalOpen('addNewEntryToObject')}>
                                Add New Entry to Object
                            </button>
                            <button onClick={() => testToast()}>
                                Test Toast
                            </button>
                            <button onClick={() => handleDeleteUser()}>
                                Delete Account
                            </button>
                            <button onClick={() => setModalOpen('changepassword')}>
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