'use client'

import { EditSessionType } from "@/models/types/edit-session";
import { HobbySessionInfo } from "@/models/types/hobbyData";
import { logSessionType } from "@/models/types/log-session";
import { ISession } from "@/models/types/session";
import { AttemptCreateSession } from "@/utils/apihelpers/create/attemptToCreateSession";
import { AttemptDeleteSession } from "@/utils/apihelpers/delete/delete-session";
import { AttemptEditSession } from "@/utils/apihelpers/edit/edit-session";
import { Session } from "next-auth";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { toast } from "sonner";


export default function LogSessionDatabaseHooks() {

    const handleSessionCall = async ({ closeModal, handleLoading, daySelected, hobbySessionInfo, session, router, sessionsToManipulate, sessionsOTDCopy, handleModalLoading }: { closeModal: () => void, handleLoading: (loading: boolean) => void, daySelected: string, hobbySessionInfo: HobbySessionInfo[], router: AppRouterInstance, sessionsToManipulate: logSessionType[], sessionsOTDCopy: ISession[], session: Session | null, handleModalLoading: (loading: boolean) => void }) => {

        if (!session?.user?.email) {
            toast.error('You must be logged in to log a session');
            return;
        }

        if (!sessionsToManipulate) {
            toast.error('Form not initialized');
            return;
        }

        if (!hobbySessionInfo || hobbySessionInfo.length === 0) {
            toast.error('No hobbies found. Create a hobby first.');
            return;
        }

        handleModalLoading(true);

        const userId = hobbySessionInfo[0]?.hobbyData?.userId;

        if (!userId) {
            console.error('❌ No userId found in hobby data');
            toast.error('User ID not found. Please refresh the page.');
            handleModalLoading(false);
            return;
        }

        try {
            const sessionEntriesToCreate: { hobbyTitle: string, timeInMinutes: number }[] = [];
            const sessionEntriesToEdit: { session: ISession, newTimeInMinutes: number }[] = [];
            const sessionEntriesToDelete: ISession[] = [];

            for (let i = 0; i < sessionsToManipulate.length; i++) {
                const thisSession = sessionsToManipulate[i];

                if (!thisSession) continue;

                const hobbyTitle = thisSession.session;
                const time = thisSession.time;

                const specificHobby = hobbySessionInfo.findIndex((objectIndex) =>
                    objectIndex.hobbyData.title === hobbyTitle
                );

                if (specificHobby === -1) {
                    console.log(`Hobby titled ${hobbyTitle} not found`);
                    continue;
                }

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

                const existingSessionsForHobby = sessionsOTDCopy.filter(
                    (sesh) => sesh.hobbyTitle === hobbyTitle
                );

                let existingSession: ISession | null = null;
                let totalExistingMinutes = 0;

                if (existingSessionsForHobby.length > 1) {
                    console.warn(`⚠️ Found ${existingSessionsForHobby.length} sessions for ${hobbyTitle} on ${daySelected}. Merging...`);

                    totalExistingMinutes = existingSessionsForHobby.reduce(
                        (sum, sesh) => sum + sesh.minutes, 0
                    );

                    existingSession = existingSessionsForHobby[0];

                    for (let j = 1; j < existingSessionsForHobby.length; j++) {
                        sessionEntriesToDelete.push(existingSessionsForHobby[j]);
                    }

                    if (timeInMinutes > 0 && timeInMinutes !== totalExistingMinutes) {
                        sessionEntriesToEdit.push({
                            session: existingSession,
                            newTimeInMinutes: timeInMinutes
                        });
                    } else if (timeInMinutes === 0) {
                        sessionEntriesToDelete.push(existingSession);
                    } else if (timeInMinutes === totalExistingMinutes) {
                        sessionEntriesToEdit.push({
                            session: existingSession,
                            newTimeInMinutes: totalExistingMinutes
                        });
                    }

                } else if (existingSessionsForHobby.length === 1) {
                    existingSession = existingSessionsForHobby[0];
                    totalExistingMinutes = existingSession.minutes;

                    if (timeInMinutes === 0) {
                        sessionEntriesToDelete.push(existingSession);
                    } else if (timeInMinutes !== totalExistingMinutes) {
                        sessionEntriesToEdit.push({
                            session: existingSession,
                            newTimeInMinutes: timeInMinutes
                        });
                    }
                } else {
                    if (timeInMinutes > 0) {
                        sessionEntriesToCreate.push({ hobbyTitle, timeInMinutes });
                    }
                }
            }

            // console.log('📊 Operations summary:', {
            //     create: sessionEntriesToCreate.length,
            //     edit: sessionEntriesToEdit.length,
            //     delete: sessionEntriesToDelete.length
            // });

            if (sessionEntriesToCreate.length === 0 &&
                sessionEntriesToEdit.length === 0 &&
                sessionEntriesToDelete.length === 0) {
                toast.info('No changes detected');
                handleModalLoading(false);
                return;
            }

            const month = new Date(daySelected).getMonth() + 1;
            const year = new Date(daySelected).getFullYear();

            let hasError = false;
            let successCount = 0;

            // Create sessions
            for (const entry of sessionEntriesToCreate) {
                const newSession = {
                    userId: userId,
                    hobbyTitle: entry.hobbyTitle,
                    date: daySelected,
                    minutes: entry.timeInMinutes,
                    month: month,
                    year: year,
                    createdAt: new Date(),
                    updatedAt: new Date()
                } as ISession;

                const result = await AttemptCreateSession({ newSession });

                if (!result?.worked) {
                    console.error('❌ Failed to create session for:', entry.hobbyTitle);
                    toast.error(`Failed to create session for ${entry.hobbyTitle}`);
                    hasError = true;
                } else {
                    successCount++;
                }
            }

            // Edit sessions
            for (const entry of sessionEntriesToEdit) {
                const editPayload = {
                    hobbyTitle: entry.session.hobbyTitle,
                    sessionInfo: entry.session,
                    sessionTime: entry.newTimeInMinutes.toString(),
                    mostFrequentlyUseTime: []
                } as EditSessionType;

                const result = await AttemptEditSession({ editSession: editPayload });

                if (!result?.worked) {
                    console.error('❌ Failed to edit session for:', entry.session.hobbyTitle);
                    toast.error(`Failed to edit session for ${entry.session.hobbyTitle}`);
                    hasError = true;
                } else {
                    successCount++;
                }
            }

            // Delete sessions
            for (const session of sessionEntriesToDelete) {
                const deletePayload = {
                    hobbyTitle: session.hobbyTitle,
                    sessionInfo: session,
                    sessionTime: '0',
                    mostFrequentlyUseTime: []
                } as EditSessionType;

                const result = await AttemptDeleteSession({ deleteSession: deletePayload });

                if (!result?.worked) {
                    console.error('❌ Failed to delete session for:', session.hobbyTitle);
                    toast.error(`Failed to delete session for ${session.hobbyTitle}`);
                    hasError = true;
                } else {
                    successCount++;
                }
            }

            if (!hasError) {
                toast.success(`Successfully processed ${successCount} changes`);
                
                router.refresh();
                
                handleLoading(false);
                closeModal();
            } else {
                toast.warning(`Completed with some errors. ${successCount} operations succeeded.`);
            }

        } catch (error) {
            console.error('💥 Error processing sessions:', error);
            toast.error('An error occurred while processing sessions');
        } finally {
            handleModalLoading(false);
        }
    }

    return {
        handleSessionCall
    };
}