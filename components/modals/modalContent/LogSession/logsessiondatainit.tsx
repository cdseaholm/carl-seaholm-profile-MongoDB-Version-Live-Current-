'use client'

import { useDataStore } from "@/context/dataStore";
import { useModalStore } from "@/context/modalStore";
import { useEffect, useRef, useState } from "react";
import LogSessionModal from "./logsession";
import { toast } from "sonner";
import { useForm, UseFormReturnType } from "@mantine/form";
import { Modal } from "@mantine/core";
import { useSession } from "next-auth/react";
import { HobbySessionInfo } from "@/utils/apihelpers/get/initData/initDashboardParams";
import { ISession } from "@/models/types/session";
import { AttemptCreateSession } from "@/utils/apihelpers/create/attemptToCreateSession";
import LoadingSpinner from "@/app/(content)/projects/school/infoVis-DatasetProject/components/components/misc/loadingSpinner";
import { useStateStore } from "@/context/stateStore";
import { AttemptDeleteSession } from "@/utils/apihelpers/delete/delete-session";
import { AttemptEditSession } from "@/utils/apihelpers/edit/edit-session";
import { EditSessionType } from "@/models/types/edit-session";

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

export default function LogSessionDataInit() {

    const { data: session } = useSession();
    const init = useRef(false);
    const daySelected = useDataStore(state => state.daySelected);
    const [initDaySelected, setInitDaySelected] = useState<string>(daySelected);
    const [loading, setLoading] = useState(false);
    const [sessionsOTDCopy, setSessionsOTDCopy] = useState<ISession[]>([]);
    const setModalOpen = useModalStore((state) => state.setModalOpen);
    const hobbySessionsInfo = useDataStore(state => state.hobbySessionInfo) as HobbySessionInfo[];
    const logSessionModalOpen = useModalStore((state) => state.logSessionModalOpen);
    const setLogSessionModalOpen = useModalStore((state) => state.setLogSessionModalOpen);
    const setDaySelected = useDataStore(state => state.setDaySelected);
    const setGlobalLoading = useStateStore(state => state.setGlobalLoading);
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
        setSessionsOTDCopy([] as ISession[]);
        init.current = false;
        setLogSessionModalOpen(false);
    }

    const initFormHobbies = () => {
        const formReady = hobbySessionsInfo.map((object, i) => {
            const sessionsForHobbyForDay = sessions.filter((session) => session.hobbyTitle === object.hobbyData.title && session.date === daySelected);
            const timeFreqOne = object.timeFrequencies[0] ? object.timeFrequencies[0].time : 0;
            const timeFreqTwo = object.timeFrequencies[1] ? object.timeFrequencies[1].time : 0;
            const timeFreqThree = object.timeFrequencies[2] ? object.timeFrequencies[2].time : 0;
            if (sessionsForHobbyForDay.length > 0) {
                const totalMinutes = sessionsForHobbyForDay.reduce((acc, session) => acc + session.minutes, 0);
                const hours = Math.floor(totalMinutes / 60);
                const minutes = totalMinutes % 60;
                const timeString = hours > 0 ? `${hours}:${minutes.toString().padStart(2, '0')}` : `${minutes}`;
                return { hobbyKeyId: i, session: object.hobbyData.title, time: timeString, mostFrequentlyUseTime: [timeFreqOne, timeFreqTwo, timeFreqThree] };
            } else {
                return { hobbyKeyId: i, session: object.hobbyData.title, time: '', mostFrequentlyUseTime: [timeFreqOne, timeFreqTwo, timeFreqThree] };
            }
        });
        const sessionsForCopy = sessions.filter((session) => session.date === daySelected);
        setSessionsOTDCopy(sessionsForCopy);
        // setFormReadyHobbies(formReady);
        logSessionForm.setValues({ newSessions: formReady });
        logSessionForm.resetDirty();
        logSessionForm.clearErrors();
        //console.log('Initialized form hobbies:', formReady);
    }

    const handleDaySelected = (arg: Date) => {
        setDaySelected(arg.toLocaleDateString());
    }

    const handleSessionCall = async ({ logSessionForm }: { logSessionForm: UseFormReturnType<LogSessionFormType, (values: LogSessionFormType) => LogSessionFormType> }) => {
        setLoading(true);
        console.log('handleSessionCall function called');

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

        const user = session.user;
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

        // ✅ Three arrays to track operations
        const sessionEntriesToCreate: { hobbyTitle: string, timeInMinutes: number }[] = [];
        const sessionEntriesToEdit: { session: ISession, newTimeInMinutes: number }[] = [];
        const sessionEntriesToDelete: ISession[] = [];

        const allSessions = logSessionForm.getValues().newSessions;

        for (let i = 0; i < allSessions.length; i++) {
            const thisSession = allSessions[i];

            if (!thisSession) {
                continue;
            }

            const hobbyTitle = thisSession.session;
            const time = thisSession.time;

            const specificHobby = hobbySessionsInfo.findIndex((objectIndex) =>
                objectIndex.hobbyData.title === hobbyTitle
            );

            if (specificHobby === -1) {
                console.log(`Hobby titled ${hobbyTitle} not found`);
                continue;
            }

            // ✅ Convert time to minutes (empty string = 0)
            let timeInMinutes = 0;
            if (time && time !== '' && time !== '0' && time !== '00:00') {
                timeInMinutes = time.includes(':')
                    ? parseInt(time.split(':')[0]) * 60 + parseInt(time.split(':')[1])
                    : parseInt(time);

                if (isNaN(timeInMinutes)) {
                    console.log(`Invalid time format for ${hobbyTitle}`);
                    continue;
                }
            }

            // ✅ Find existing sessions for this hobby on this day
            const existingSessionsForHobby = sessionsOTDCopy.filter(
                (sesh) => sesh.hobbyTitle === hobbyTitle
            );

            let existingSession: ISession | null = null;
            let totalExistingMinutes = 0;

            // ✅ Handle duplicates: merge them into one
            if (existingSessionsForHobby.length > 1) {
                console.warn(`Warning: Found ${existingSessionsForHobby.length} sessions for ${hobbyTitle} on ${daySelected}. Merging duplicates...`);

                // Calculate total minutes from all duplicate sessions
                totalExistingMinutes = existingSessionsForHobby.reduce(
                    (sum, sesh) => sum + sesh.minutes,
                    0
                );

                // Keep the first session, delete the rest
                existingSession = existingSessionsForHobby[0];

                // Mark the duplicates for deletion (all except the first)
                for (let j = 1; j < existingSessionsForHobby.length; j++) {
                    sessionEntriesToDelete.push(existingSessionsForHobby[j]);
                    console.log(`DELETE (duplicate): ${hobbyTitle} - session ${existingSessionsForHobby[j]._id}`);
                }

                // If the merged total differs from what user entered, edit the first session
                if (timeInMinutes > 0 && timeInMinutes !== totalExistingMinutes) {
                    sessionEntriesToEdit.push({
                        session: existingSession,
                        newTimeInMinutes: timeInMinutes
                    });
                    console.log(`EDIT (merge): ${hobbyTitle} - from ${totalExistingMinutes} to ${timeInMinutes} minutes`);
                } else if (timeInMinutes === 0) {
                    // User wants to delete, so also delete the first session
                    sessionEntriesToDelete.push(existingSession);
                    console.log(`DELETE (all): ${hobbyTitle} - deleting merged session`);
                } else if (timeInMinutes === totalExistingMinutes) {
                    // Update the first session to match the merged total
                    sessionEntriesToEdit.push({
                        session: existingSession,
                        newTimeInMinutes: totalExistingMinutes
                    });
                    console.log(`EDIT (consolidate): ${hobbyTitle} - updating to merged total ${totalExistingMinutes} minutes`);
                }

            } else if (existingSessionsForHobby.length === 1) {
                // Single session - normal flow
                existingSession = existingSessionsForHobby[0];
                totalExistingMinutes = existingSession.minutes;

                if (timeInMinutes === 0) {
                    // DELETE: User cleared the time
                    sessionEntriesToDelete.push(existingSession);
                    console.log(`DELETE: ${hobbyTitle} - session ${existingSession._id}`);
                } else if (timeInMinutes !== totalExistingMinutes) {
                    // EDIT: User changed the time
                    sessionEntriesToEdit.push({
                        session: existingSession,
                        newTimeInMinutes: timeInMinutes
                    });
                    console.log(`EDIT: ${hobbyTitle} - from ${totalExistingMinutes} to ${timeInMinutes} minutes`);
                }
                // If timeInMinutes === totalExistingMinutes, no change needed

            } else {
                // No existing sessions
                if (timeInMinutes > 0) {
                    // CREATE: User entered time for a hobby with no existing sessions
                    sessionEntriesToCreate.push({ hobbyTitle, timeInMinutes });
                    console.log(`CREATE: ${hobbyTitle} - ${timeInMinutes} minutes`);
                }
            }
        }

        console.log('Operations summary:', {
            create: sessionEntriesToCreate.length,
            edit: sessionEntriesToEdit.length,
            delete: sessionEntriesToDelete.length
        });

        if (sessionEntriesToCreate.length === 0 &&
            sessionEntriesToEdit.length === 0 &&
            sessionEntriesToDelete.length === 0) {
            toast.info('No changes detected');
            setLoading(false);
            return;
        }

        const month = new Date(daySelected).getMonth() + 1;
        const year = new Date(daySelected).getFullYear();
        const headers = { 'Authorization': `Bearer ${email}` };

        let hasError = false;

        // ✅ Process CREATES
        for (const entry of sessionEntriesToCreate) {
            const newSession = {
                userId: '',
                hobbyTitle: entry.hobbyTitle,
                date: daySelected,
                minutes: entry.timeInMinutes,
                month: month,
                year: year,
                createdAt: new Date(),
                updatedAt: new Date()
            } as ISession;

            console.log('Creating session:', entry.hobbyTitle, entry.timeInMinutes);
            const result = await AttemptCreateSession({ newSession }, headers);

            if (!result || result.worked === false) {
                console.error('Failed to create session for:', entry.hobbyTitle);
                toast.error(`Failed to create session for ${entry.hobbyTitle}`);
                hasError = true;
            }
        }

        // ✅ Process EDITS
        for (const entry of sessionEntriesToEdit) {
            const editPayload = {
                hobbyTitle: entry.session.hobbyTitle,
                sessionInfo: entry.session,
                sessionTime: entry.newTimeInMinutes.toString(),
                mostFrequentlyUseTime: []
            } as EditSessionType;

            console.log('Editing session:', entry.session.hobbyTitle, entry.newTimeInMinutes);
            const result = await AttemptEditSession({
                editSession: editPayload,
                userEmail: email
            }, headers);

            if (!result || result.worked === false) {
                console.error('Failed to edit session for:', entry.session.hobbyTitle);
                toast.error(`Failed to edit session for ${entry.session.hobbyTitle}`);
                hasError = true;
            }
        }

        // ✅ Process DELETES
        for (const session of sessionEntriesToDelete) {
            const deletePayload = {
                hobbyTitle: session.hobbyTitle,
                sessionInfo: session,
                sessionTime: '0',
                mostFrequentlyUseTime: []
            } as EditSessionType;

            console.log('Deleting session:', session.hobbyTitle);
            const result = await AttemptDeleteSession({
                deleteSession: deletePayload,
                userEmail: email
            }, headers);

            if (!result || result.worked === false) {
                console.error('Failed to delete session for:', session.hobbyTitle);
                toast.error(`Failed to delete session for ${session.hobbyTitle}`);
                hasError = true;
            }
        }

        if (!hasError) {
            toast.success(`Successfully processed ${sessionEntriesToCreate.length + sessionEntriesToEdit.length + sessionEntriesToDelete.length} changes`);
            setGlobalLoading(true);
            closeModal();
        }

        setLoading(false);
    }

    const handleModalOpen = (title: string) => {
        setModalOpen(title);
        closeModal();
    }

    useEffect(() => {
        if (hobbySessionsInfo.length === 0) {
            toast.info('Create a Hobby before logging a session');
            setLogSessionModalOpen(false);
            return;
        }

        if (init.current === false) {
            initFormHobbies();
            init.current = true;
        } else if (initDaySelected !== daySelected) {
            logSessionForm.setValues({ newSessions: [] });
            setInitDaySelected(daySelected);
            initFormHobbies();
        }
    }, [daySelected, hobbySessionsInfo.length, initDaySelected]);

    return (

        <Modal opened={logSessionModalOpen} onClose={closeModal} title="Session Management" centered closeOnClickOutside size={'90%'} overlayProps={{
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
                <LogSessionModal handleSessionCall={handleSessionCall} handleModalOpen={handleModalOpen} daySelected={daySelected} handleDaySelected={handleDaySelected} logSessionForm={logSessionForm} />
            )}
        </Modal>

    )
}