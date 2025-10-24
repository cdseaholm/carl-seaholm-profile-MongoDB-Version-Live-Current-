'use client'

import { useDataStore } from "@/context/dataStore";
import { useModalStore } from "@/context/modalStore";
import { useEffect, useRef, useState } from "react";
import LogSessionModal from "./logsession";
import { toast } from "sonner";
//import { useSession } from "next-auth/react";
//import { User } from "next-auth";
import { useForm, UseFormReturnType } from "@mantine/form";
import { Modal } from "@mantine/core";
import { useSession } from "next-auth/react";
import { useHobbyStore } from "@/context/hobbyStore";
import { HobbySessionInfo } from "@/utils/apihelpers/get/initData/initDashboardParams";
import { ISession } from "@/models/types/session";
import { AttemptCreateSession } from "@/utils/apihelpers/create/attemptToCreateSession";
import { InitGraphs } from "@/utils/apihelpers/get/initData/init-graphs";
import LoadingSpinner from "@/app/(content)/projects/school/infoVis-DatasetProject/components/components/misc/loadingSpinner";

export type newSesh = {
    value: string,
    date: string,
    hobbyTitle: string,
    newIndex: number,
    hobbyTitleIndex: number
}

export type logSessionType = {
    hobbyKeyId: number, session: string; time: string; mostFrequentlyUseTime: number[]
}

export type LogSessionFormType = {
    newSessions: logSessionType[]
}

export default function LogSessionDataInit({ daySelected }: { daySelected: string }) {

    const { data: session, update } = useSession();
    const init = useRef(false);
    const [initDaySelected, setInitDaySelected] = useState<string>(daySelected);
    const [loading, setLoading] = useState(false);
    const setModalOpen = useModalStore((state) => state.setModalOpen);
    const setRefreshKey = useHobbyStore((state) => state.setRefreshKey);
    const hobbySessionsInfo = useDataStore(state => state.hobbySessionInfo) as HobbySessionInfo[];
    const logSessionModalOpen = useModalStore((state) => state.logSessionModalOpen);
    const setLogSessionModalOpen = useModalStore((state) => state.setLogSessionModalOpen);
    const setDaySelected = useDataStore(state => state.setDaySelected);
    const sessions = useDataStore(state => state.sessions);

    const logSessionForm = useForm({
        mode: 'uncontrolled',
        initialValues: {
            newSessions: [] as logSessionType[],
        },
        validate: {
            newSessions: (value) => value.length < 0 ? 'Sessions cannot be empty!' : null
        }
    });

    const closeModal = () => {
        logSessionForm.setValues({ newSessions: [] });
        logSessionForm.clearErrors();
        logSessionForm.resetDirty();
        init.current = false;
        setLogSessionModalOpen(false);
    }

    const initFormHobbies = () => {
        const formReady = hobbySessionsInfo.map((object, i) => {
            const sessionsForHobbyForDay = sessions.filter((session) => session.hobbyTitle === object.hobbyData.title && session.date === daySelected);
            if (sessionsForHobbyForDay.length > 0) {
                const totalMinutes = sessionsForHobbyForDay.reduce((acc, session) => acc + session.minutes, 0);
                const hours = Math.floor(totalMinutes / 60);
                const minutes = totalMinutes % 60;
                const timeString = hours > 0 ? `${hours}:${minutes.toString().padStart(2, '0')}` : `${minutes}`;
                return { hobbyKeyId: i, session: object.hobbyData.title, time: timeString, mostFrequentlyUseTime: [object.timeFrequencies[0].time, object.timeFrequencies[1].time, object.timeFrequencies[2].time] };
            } else {
                return { hobbyKeyId: i, session: object.hobbyData.title, time: '', mostFrequentlyUseTime: [object.timeFrequencies[0].time, object.timeFrequencies[1].time, object.timeFrequencies[2].time] };
            }
        });
        // setFormReadyHobbies(formReady);
        logSessionForm.setValues({ newSessions: formReady });
        logSessionForm.resetDirty();
        logSessionForm.clearErrors();
        //console.log('Initialized form hobbies:', formReady);
    }

    const handleDaySelected = (arg: Date) => {
        setDaySelected(arg.toLocaleDateString());
    }

    const handleCreate = async ({ logSessionForm }: { logSessionForm: UseFormReturnType<LogSessionFormType, (values: LogSessionFormType) => LogSessionFormType> }) => {

        //for tomorrow, finish up logsession api route fix, make sure we are updating new attributes like timeFrequency
        //make sure data updates properly on front end
        setLoading(true);
        console.log('handleLogSession function called');

        const url = process.env.NEXT_PUBLIC_BASE_URL ? process.env.NEXT_PUBLIC_BASE_URL : '';
        if (url === '') {
            console.log('Bad url');
            setLoading(false);
            return;
        }

        if (!session) {
            console.log('You must be logged in to log a session');
            setLoading(false);
            return;
        }
        const user = session.user
        if (!user) {
            console.log('No user found in session');
            setLoading(false);
            return;
        }
        const email = user.email;
        if (!email) {
            console.log('No email found for user');
            setLoading(false);
            return;
        }

        if (!hobbySessionsInfo) {
            console.log('Hobbies object not found');
            setLoading(false);
            return;
        }

        const sessionEntries = [];
        const allSessions = logSessionForm.getValues().newSessions;

        for (let i = 0; i < allSessions.length; i++) {
            const thisSession = allSessions[i];

            if (!thisSession) {
                continue; // Skip if session doesn't exist
            }

            const hobbyTitle = thisSession.session;
            const time = thisSession.time;
            //console.log(`Processing session ${i}: Hobby - ${hobbyTitle}, Time - ${time}`);

            // Only skip this specific session if it's empty, don't break the entire loop
            if (hobbyTitle === null || hobbyTitle === undefined || hobbyTitle === '' ||
                time === null || time === undefined || time === '' || time === '0' || time === '00:00') {
                //console.log(`Skipping session ${i} due to empty values`);
                continue; // Continue to next session instead of breaking
            }

            const specificHobby = hobbySessionsInfo ? hobbySessionsInfo.findIndex((objectIndex, _index) => objectIndex.hobbyData.title === hobbyTitle) as number : -1;

            sessionEntries.push({ hobbyTitle, time, specificHobby });
        }

        // console.log('Session entries to process:', sessionEntries);

        if (sessionEntries.length === 0) {
            console.log('Must pick at least one Hobby and Time to attribute this Sesh to');
            setLoading(false);
            return;
        }

        const month = new Date(daySelected).getMonth() + 1;
        const year = new Date(daySelected).getFullYear();
        //console.log('Logging sessions for date:', daySelected);
        //console.log('Selected day:', daySelected);
        for (const session of sessionEntries) {
            const newSession = {
                userId: '',
                hobbyTitle: session.hobbyTitle,
                date: daySelected,
                minutes: parseInt(session.time),
                month: month,
                year: year,
                createdAt: new Date(),
                updatedAt: new Date()
            } as ISession;
            const headers = { 'Authorization': `Bearer ${email}` };
            console.log('Creating session for hobby:', session.hobbyTitle, 'with time:', session.time);
            const create = await AttemptCreateSession({ newSession: newSession }, headers);
            if (!create || create.worked === false) {
                console.log('Error creating session for hobby:', session.hobbyTitle);
                setLoading(false);
                return;
            }
        }

        const updatedSessions = useDataStore.getState().sessions;
        const updatedSessionCounts = useDataStore.getState().hobbySessionInfo;
        const updatedMonthCounts = useDataStore.getState().monthlyInfoCounts;

        const initGraphs = await InitGraphs({ sessions: updatedSessions, monthlyInfoCounts: updatedMonthCounts, hobbySessionsCounts: updatedSessionCounts });
        if (!initGraphs) {
            toast.error('Error initializing graphs after creating session');
            setLoading(false);
            return;
        }

        await update();
        closeModal();
        setLoading(false);
        setRefreshKey(prevKey => prevKey + 1);
    }

    const handleModalOpen = (title: string) => {
        setModalOpen(title);
        closeModal();
    }

    useEffect(() => {

        if (init.current === false) {
            initFormHobbies();
        } else if (initDaySelected !== daySelected) {
            logSessionForm.setValues({ newSessions: [] });
            setInitDaySelected(daySelected);
            initFormHobbies();
        } else {
            toast.info('Create a Hobby before logging a session');
            setLogSessionModalOpen(false);
        }

    }, [init.current, daySelected]);

    return (

        <Modal opened={logSessionModalOpen} onClose={closeModal} title="Log Session" centered closeOnClickOutside size={'90%'} overlayProps={{
            backgroundOpacity: 0.55, blur: 3, className: 'drop-shadow-xl overflow-hidden'
        }} styles={{
            header: { backgroundColor: '#b9f8cf', color: 'black', borderBottom: '1px solid #334155' },
            body: { backgroundColor: '#b9f8cf', padding: '10px', paddingTop: '10px', maxHeight: '90vh', maxWidth: '90vw', overflow: 'hidden' }
        }}>
            {loading ? (
                <div className="min-w-[90vw] max-h-[75vh] flex flex-col justify-start items-center bg-green-200 overflow-hidden">
                    <LoadingSpinner />
                </div>
            ) : (
                <LogSessionModal handleCreate={handleCreate} handleModalOpen={handleModalOpen} daySelected={daySelected} handleDaySelected={handleDaySelected} logSessionForm={logSessionForm} />
            )}
        </Modal>

    )
}