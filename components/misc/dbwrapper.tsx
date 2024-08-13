'use client'

import { useStore } from "@/context/dataStore";
import { useStateStore } from "@/context/stateStore";
import React, { useState } from "react";
import { useEffect } from "react";
import { Spinner } from "./Spinner";
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
                    return;
                }
                const userInfo = userData.userInfo as IUser;
                if (!userInfo.customFields) {
                    userInfo.customFields = [] as IUserObject[];
                }
                const customFields = userInfo.customFields as IUserObject[];
                setCustomFields(customFields);
                setLoading(false);
            });
        } catch (error) {
            setError(error as string);
        }
    }, [setUserInfo, urlToUse, userID, setCustomFields]);

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