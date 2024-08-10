'use client'

import { useStore } from "@/context/dataStore";
import { useStateStore } from "@/context/stateStore";
import React, { useState } from "react";
import { useEffect } from "react";
import { Spinner } from "./Spinner";
import { useHobbyStore } from "@/context/hobbyStore";
import { useTaskStore } from "@/context/taskStore";
import { getCategories } from "@/app/context/functions/getCategories";
import { IUser } from "@/models/types/user";

export default function DBWrapper({ children }: Readonly<{ children: React.ReactNode }>) {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const setUserInfo = useStore((state) => state.setUserInfo);
    const setHobbies = useStore((state) => state.setHobbies);
    const setTasks = useTaskStore((state) => state.setTasks);
    const setRecipes = useStore((state) => state.setRecipes);
    const setCategories = useHobbyStore((state) => state.setCategories);
    const urlToUse = useStateStore((state) => state.urlToUse);
    const userID = process.env.NEXT_PUBLIC_ADMIN_USERNAME;

    useEffect(() => {
        try {
            Promise.all([
                fetch(urlToUse + '/api/' + userID + '/getUserInfo')
                    .then((response) => response.json())
            ]).then(async ([userData]) => {
                if (!userData.userInfo) {
                    console.log('userData.userInfo is undefined');
                    return;
                }
                const userInfo = userData.userInfo as IUser;
                if (!userInfo.customFields as any) {
                    userInfo.customFields = {
                        hobbies: [],
                        tasks: [],
                        recipes: [],
                        categories: []
                    }
                }
                const categories = await getCategories(userInfo.customFields.hobbies);
                setUserInfo(userInfo);
                setHobbies(userInfo.customFields.hobbies);
                setTasks(userInfo.customFields.tasks);
                setRecipes(userInfo.customFields.recipes);
                setCategories(categories);
                setLoading(false);
            });
        } catch (error) {
            setError(error as string);
        }
    }, [setUserInfo, urlToUse, userID]);

    if (error) {
        return (
            <div>
                <p>{error}</p>
            </div>
        );
    }

    return (
        loading ?
            <Spinner />
            :
            <div className={`w-full h-full`}>
                {children}
            </div>
    );
}