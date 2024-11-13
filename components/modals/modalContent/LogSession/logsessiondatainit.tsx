'use client'

import { Spinner } from "@/components/misc/Spinner";
import { useStore } from "@/context/dataStore";
import { useHobbyStore } from "@/context/hobbyStore";
import { useModalStore } from "@/context/modalStore";
import { IUserObject } from "@/models/types/userObject";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import LogSessionModal from "./logsession";
import { AttemptCreateSession } from "@/utils/data/attemptToCreateSession";
import { IEntry } from "@/models/types/entry";

export default function LogSessionDataInit({ daySelected }: { daySelected: string }) {

    const { data: session } = useSession();
    const user = session?.user ? session.user : null;
    const id = user?.email ? user.email : null;
    const setModalOpen = useModalStore((state) => state.setModalOpen);
    const setRefreshKey = useHobbyStore((state) => state.setRefreshKey);
    const userObjects = useStore((state) => state.userObjects);
    const modalParent = useModalStore((state) => state.modalParent);
    const [hobbyTitles, setHobbyTitles] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const getHobbiesToSet = async () => {
            try {
                if (userObjects) {
                    const hobs = userObjects.filter((userObject) => userObject.title === 'hobbies') as IUserObject[];
                    const hobbiedIndex = hobs[0]?.indexes.map((hobby) => {
                        return hobby?.title ? hobby.title : '';
                    }) as string[]

                    setHobbyTitles(hobbiedIndex);
                }
            } catch (error) {
                console.error('Error initializing hobbies', error);
            }
        };
        getHobbiesToSet();
        setLoading(false);
    }, [userObjects]);

    const handleCreate = async (event: React.FormEvent<HTMLFormElement>) => {
        console.log('handleLogSession function called');
        event.preventDefault();
        const form = new FormData(event.currentTarget);
    
        if (!id) {
            console.log('You must be logged in to log a session');
            return;
        }
    
        const date = form.get('modalSessionDate');
        if (date === null || date === undefined || date === '') {
            console.log('Date is required');
            return;
        }
    
        const hobbies = userObjects.find((object: IUserObject) => object.title === 'hobbies');
        if (!hobbies) {
            console.log('Hobbies object not found');
            return;
        }
    
        const sessionEntries = [];
        for (let i = 0; ; i++) {
            const hobbyTitle = form.get(`modalSessionHobby-${i}`) as string;
            const time = form.get(`modalSessionTime-${i}`) as string;
    
            if (hobbyTitle === null || hobbyTitle === undefined || hobbyTitle === '' || time === null || time === undefined || time === '') {
                break;
            }
    
            sessionEntries.push({ hobbyTitle, time });
        }
    
        if (sessionEntries.length === 0) {
            console.log('Must pick at least one Hobby and Time to attribute this Sesh to');
            return;
        }
    
        for (const session of sessionEntries) {
            const newSession = { value: session.time, date: date } as IEntry;
            const create = await AttemptCreateSession({ userID: id as string, newEntry: newSession, hobbyTitle: session.hobbyTitle });
            if (!create) {
                console.log('Error creating session for hobby:', session.hobbyTitle);
                return;
            }
        }
    
        setModalOpen('');
        setRefreshKey(prevKey => prevKey + 1);
    }
    
    const handleModalOpen = (title: string) => {
        setModalOpen(title);
    }
    
    return (
        loading ? (
            <Spinner />
        ) : (
            <LogSessionModal daySelected={daySelected} handleCreate={handleCreate} hobbyTitles={hobbyTitles} modalParent={modalParent} handleModalOpen={handleModalOpen} />
        )
    )
}