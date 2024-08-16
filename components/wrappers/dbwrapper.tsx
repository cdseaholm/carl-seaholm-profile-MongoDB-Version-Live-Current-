'use client'

import { useStore } from "@/context/dataStore";
import { useStateStore } from "@/context/stateStore";
import React, { useState } from "react";
import { useEffect } from "react";
import { Spinner } from "../misc/Spinner";
import { IUser } from "@/models/types/user";
import { IUserObject } from "@/models/types/userObject";

export default function DBWrapper({ children }: Readonly<{ children: React.ReactNode }>) {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const setUserInfo = useStore((state) => state.setUserInfo);
    const setCustomFields = useStore((state) => state.setUserObjects);
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
                    setLoading(false);
                    return;
                }
                const userInfo = userData.userInfo as IUser;
                if (!userInfo.userObjects) {
                    userInfo.userObjects = [] as IUserObject[];
                }
                const userObjects = userInfo.userObjects as IUserObject[];
                setCustomFields(userObjects);
                setLoading(false);
            });
        } catch (error) {
            setError(error as string);
            setLoading(false);
        }
    }, [setUserInfo, urlToUse, userID, setCustomFields]);

    return (
        error ? (

            <div className={`w-full h-full flex justify-center items-center`}>
                <h1 className={`text-red-500`}>{error}</h1>
            </div>

        ) : loading ? (

            <Spinner />

        ) : (

            <div className={`w-full h-full`}>
                {children}
            </div>
            
        )
    );
}