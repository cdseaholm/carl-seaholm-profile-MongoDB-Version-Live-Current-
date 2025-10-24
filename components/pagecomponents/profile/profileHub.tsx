'use client'

import InnerHeader from "@/components/pagetemplates/innerheader/InnerHeader";
import MainChild from "@/components/pagetemplates/mainchild/mainchild";
import { useModalStore } from "@/context/modalStore";
import { HobbiesInit } from "@/utils/apihelpers/get/hobbies";
import { DeleteUser } from "@/utils/apihelpers/delete/delete";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";
import { AttemptToDeleteHobbies } from "@/utils/apihelpers/delete/attemptToDeleteHobbies";
import { AttemptToDeleteRecipes } from "@/utils/apihelpers/delete/attemptToDeleteRecipes";
import { useUserStore } from "@/context/userStore";
import { IRecipe } from "@/models/types/recipe";
import { IHobby } from "@/models/types/hobby";
import { useHobbyStore } from "@/context/hobbyStore";
import LoadingSpinner from "@/app/(content)/projects/school/infoVis-DatasetProject/components/components/misc/loadingSpinner";
import { AttemptToUpdateOldModel } from "@/utils/apihelpers/edit/attemptToUpdateOldModel";
import { IIndexedEntry } from "@/models/old/types/entry";
import { IUserObject } from "@/models/old/types/userObject";

export default function ProfilePage() {

    const [loading, setIsLoading] = React.useState(false);
    const router = useRouter();
    const setModalOpen = useModalStore((state) => state.setModalOpen);
    const handleLogout = () => {
        console.log('logout');
    }
    const { data: session } = useSession();
    const user = session?.user ? session.user : null;
    const userID = user?.email ? user.email : '';
    const headers = { 'Authorization': `Bearer ${userID}` };
    const hobbies = useHobbyStore(state => state.userHobbies) as IHobby[];
    const recipes = [] as IRecipe[]
    const userInfo = useUserStore(state => state.userInfo);

    const handleUpdateHobbiesLocal = async () => {
        const attemptToUpdate = await AttemptToUpdateOldModel({ hobbies: hobbies, recipes: recipes, userID: userID }, headers);
        if (attemptToUpdate === true) {
            toast.success('Updated hobbies');
        } else {
            toast.error('Failed to update hobbies');
        }
    };

    const handleDeleteUser = async () => {
        const headers = { 'Authorization': `Bearer ${userID}` };
        const deleteUser = await DeleteUser(headers);
        if (deleteUser) {
            signOut();
            router.push('/');
            toast.success('User deleted');
        } else {
            toast.error('Failed to delete user');
        }
    };

    const handleDeleteHobbies = async () => {

        const confirm = window.confirm("Are you sure you want to delete ALL hobbies?");
        if (!confirm) {
            return;
        }

        const deleteHobbies = await AttemptToDeleteHobbies(headers)

        if (!deleteHobbies) {
            toast.error("Error deleting hobbies");
        }

        toast.success("Hobbies deleted!")
    }

    const handleDeleteRecipes = async () => {

        const confirm = window.confirm("Are you sure you want to delete ALL recipes?");
        if (!confirm) {
            return;
        }

        const deleteRecipes = await AttemptToDeleteRecipes(headers)

        if (!deleteRecipes) {
            toast.error("Error deleting recipes");
        }

        toast.success("Recipes deleted!")
    }

    const testCurrentFunction = async () => {

        const { worked, sessionsFound, userObjects } = await HobbiesInit({ userInfo: userInfo }) as { worked: boolean, sessionsFound: IIndexedEntry[], userObjects: IUserObject[] }

        console.log('worked: ', worked, 'sessions: ', sessionsFound, 'userObject: ', userObjects)

    }

    const testToast = () => {
        toast.success('Test toast');
    };

    const handleMigrateToMonthly = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('/api/migrate/monthly', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const result = await response.json();

            if (result.success) {
                console.log('Migration successful:', result.stats);
                // Handle success
            } else {
                console.error('Migration failed:', result.error);
                // Handle error
            }
        } catch (error) {
            console.error('Migration request failed:', error);
        } finally {
            setIsLoading(false);
        }
    }

    const handleMinutesFix = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('/api/migrate/minutes-fix', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const result = await response.json();

            if (result.success) {
                console.log('Migration successful:', result.stats);
                // Handle success
            } else {
                console.error('Migration failed:', result.error);
                // Handle error
            }
        } catch (error) {
            console.error('Migration request failed:', error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        loading ? (
            <LoadingSpinner />
        ) : (
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
                        <button onClick={() => handleMigrateToMonthly()}>
                            Migrate to Monthly Structure
                        </button>
                        <button onClick={() => handleMinutesFix()}>
                            Fix Session Minutes
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
        )
    );
};