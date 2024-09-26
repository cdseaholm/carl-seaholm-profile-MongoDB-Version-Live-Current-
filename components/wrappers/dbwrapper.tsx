'use client'

import { useStore } from "@/context/dataStore";
import { useStateStore } from "@/context/stateStore";
import React, { useState } from "react";
import { useEffect } from "react";
import { Spinner } from "../misc/Spinner";
import { GetData } from "@/utils/data/get";
import { toast } from "sonner";
import { IUser } from "@/models/types/user";

export default function DBWrapper({ children }: Readonly<{ children: React.ReactNode }>) {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const setUserInfo = useStore((state) => state.setUserInfo);
    const urlToUse = useStateStore((state) => state.urlToUse);
    const userID = process.env.NEXT_PUBLIC_ADMIN_USERNAME;

    useEffect(() => {
        try {
            const getData = async () => {
                if (!userID) {
                    toast.error('User ID not found');
                    setLoading(false);
                    return;
                }
                const fetchData = await GetData();
                let userInfo = fetchData.userData as IUser;
                if (!userInfo.userObjects || !userInfo) {
                    console.log('userObjects is undefined');
                    setLoading(false);
                    return;
                }
                setUserInfo(userInfo);
            }
            getData();
        } catch (error) {
            setError(error as string);
            setLoading(false);
        }
        setLoading(false);
    }, [setUserInfo, urlToUse, userID]);

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