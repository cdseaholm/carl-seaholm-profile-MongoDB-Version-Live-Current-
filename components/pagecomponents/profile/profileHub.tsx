'use client'

import { signOut } from "@/auth";
import InnerHeader from "@/components/pagetemplates/innerheader/InnerHeader";
import MainChild from "@/components/pagetemplates/mainchild/mainchild";
import { useModalStore } from "@/context/modalStore";
import { IIndexedEntry } from "@/models/types/entry";
import { IHobby } from "@/models/types/hobby";
import { IRecipe } from "@/models/types/recipe";
import { IUser } from "@/models/types/user";
import { IUserObject } from "@/models/types/userObject";
import { AttemptToDeleteHobbies } from "@/utils/data/attemptToDeleteHobbies";
import { AttemptToDeleteRecipes } from "@/utils/data/attemptToDeleteRecipes";
import { AttemptToUpdateOldModel } from "@/utils/data/attemptToUpdateOldModel";
import { HobbiesInit } from "@/utils/data/dashInit/hobbies";
import { DeleteUser } from "@/utils/userHelpers/delete";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

export default function ProfilePage({ hobbies, recipes, userInfo }: { hobbies: IHobby[], recipes: IRecipe[], userInfo: IUser }) {

    const router = useRouter();
    const setModalOpen = useModalStore((state) => state.setModalOpen);
    const handleLogout = () => {
        console.log('logout');
    }
    const {data: session } = useSession();
    const user = session?.user ? session.user : null;
    const userID = user?.email ? user.email : '';

    const handleUpdateHobbiesLocal = async () => {
        const attemptToUpdate = await AttemptToUpdateOldModel({ hobbies: hobbies, recipes: recipes, userID: userID });
        if (attemptToUpdate === true) {
            toast.success('Updated hobbies');
        } else {
            toast.error('Failed to update hobbies');
        }
    };

    const handleDeleteUser = async () => {

        const deleteUser = await DeleteUser();
        if (deleteUser) {
            signOut();
            router.push('/');
            toast.success('User deleted');
        } else {
            toast.error('Failed to delete user');
        }
    };

    const handleDeleteHobbies = async() => {

        const confirm = window.confirm("Are you sure you want to delete ALL hobbies?");
        if (!confirm) {
            return;
        }

        const deleteHobbies = await AttemptToDeleteHobbies()

        if (!deleteHobbies) {
            toast.error("Error deleting hobbies");
        }
        
        toast.success("Hobbies deleted!")
    }

    const handleDeleteRecipes = async() => {

        const confirm = window.confirm("Are you sure you want to delete ALL recipes?");
        if (!confirm) {
            return;
        }

        const deleteRecipes = await AttemptToDeleteRecipes()

        if (!deleteRecipes) {
            toast.error("Error deleting recipes");
        }
        
        toast.success("Recipes deleted!")
    }

    const testCurrentFunction = async() => {

        console.log('user info', userInfo)
        const {worked, sessionsFound, userObjects} = await HobbiesInit({userInfo: userInfo}) as {worked: boolean, sessionsFound: IIndexedEntry[], userObjects: IUserObject[]}

        console.log('worked: ', worked, 'sessions: ', sessionsFound, 'userObject: ', userObjects)

    }

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
                    <button onClick={() => {
                        testCurrentFunction();
                    }}>
                        Test Current Function
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
                    <button onClick={() => handleDeleteHobbies()}>
                        Delete ALL Hobbies
                    </button>
                    <button onClick={() => handleDeleteRecipes()}>
                        Delete ALL Recipes
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