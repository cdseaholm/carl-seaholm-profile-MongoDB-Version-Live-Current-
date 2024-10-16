'use client'

import { signOut } from "@/auth";
import InnerHeader from "@/components/pagetemplates/innerheader/InnerHeader";
import MainChild from "@/components/pagetemplates/mainchild/mainchild";
import { useModalStore } from "@/context/modalStore";
import { IHobby } from "@/models/types/hobby";
import { IRecipe } from "@/models/types/recipe";
import { ITask } from "@/models/types/task";
import { DeleteUser } from "@/utils/userHelpers/delete";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

export default function ProfilePage({ hobbies, tasks, recipes, urlToUse, userID }: { hobbies: IHobby[], tasks: ITask[], recipes: IRecipe[], urlToUse: string, userID: string }) {

    const router = useRouter();
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
            body: JSON.stringify({ hobbies: hobbies, tasks: tasks, recipes: recipes }),
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