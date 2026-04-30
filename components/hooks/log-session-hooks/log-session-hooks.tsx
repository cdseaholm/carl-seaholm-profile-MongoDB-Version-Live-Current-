'use client'

import { useRef, useState } from "react";
import { IHobbyData } from "@/models/types/hobbyData";
import { LogSessionFormReturnType } from "@/models/types/log-session";
import { ISession } from "@/models/types/session";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import LogSessionDatabaseHooks from "../database-hooks/log-session-database-hooks";
import { useSession } from "next-auth/react";


export default function LogSessionHooks({
    handleModalOpen,
    handleLoading,
    daySelected,
    hobbyData,
    logSessionForm,
    router
}: {
    handleModalOpen: (modal: 'newHobby' | 'logSession' | 'colorIndex' | null) => void,
    handleLoading: (loading: boolean) => void,
    daySelected: string,
    hobbyData: IHobbyData[],
    logSessionForm: LogSessionFormReturnType,
    router: AppRouterInstance
}) {

    const { data: session } = useSession();

    const init = useRef(false);
    const [modalLoading, setModalLoading] = useState(false);
    const [initDaySelected, setInitDaySelected] = useState<string>(daySelected);
    const [sessionsOTDCopy, setSessionsOTDCopy] = useState<ISession[]>([]);

    const { handleSessionCall: handleSessionCallDB } = LogSessionDatabaseHooks();

    const handleSessionCall = async () => {
        const sessionsToManipulate = logSessionForm.getValues().newSessions.filter((session) => session.time !== null && session.session !== '');

        await handleSessionCallDB({
            sessionsToManipulate,
            hobbyData,
            session: session,
            handleModalLoading: setModalLoading,
            sessionsOTDCopy,
            daySelected,
            handleLoading,
            closeModal,
            router
        });
    }

    const closeModal = () => {
        logSessionForm.setValues({ newSessions: [] });
        logSessionForm.clearErrors();
        logSessionForm.resetDirty();
        setSessionsOTDCopy([]);
        init.current = false;
        handleModalOpen(null);
    }

    const handleInitDaySelected = (date: string) => {
        setInitDaySelected(date);
    }

    const handleSessionsOTDCopy = (sessions: ISession[]) => {
        setSessionsOTDCopy(sessions);
    }

    return {
        handleSessionCall,
        init,
        initDaySelected,
        handleSessionsOTDCopy,
        closeModal,
        handleInitDaySelected,
        modalLoading
    };
}