'use client'

import { useCallback, useEffect, useMemo } from "react";
import LogSessionModal from "./logsession";
import { toast } from "sonner";
import { useForm } from "@mantine/form";
import { LoadingOverlay, Modal } from "@mantine/core";
import { ISession } from "@/models/types/session";
import { HobbySessionInfo, IHobbyData } from "@/models/types/hobbyData";
import { logSessionType } from "@/models/types/log-session";
import LogSessionHooks from "@/components/hooks/log-session-hooks/log-session-hooks";
import { useRouter } from "next/navigation";


export default function LogSessionDataInit({ handleModalOpen, handleLoading, daySelected, handleDaySelected, sessions, modalOpen, hobbyData }: { handleModalOpen: (modal: 'newHobby' | 'logSession' | 'colorIndex' | null) => void, handleLoading: (loading: boolean) => void, daySelected: string, handleDaySelected: (date: string) => void, sessions: ISession[], modalOpen: boolean, hobbyData: IHobbyData[] }) {

    const router = useRouter();

    const logSessionForm = useForm({
        mode: 'uncontrolled',
        initialValues: {
            newSessions: [] as logSessionType[],
        },
        validate: {
            newSessions: (value) => value.length < 0 ? 'Sessions cannot be empty!' : null
        }
    });

    const hobbySessionInfo: HobbySessionInfo[] = useMemo(() => {
        return hobbyData.map((hobby) => {
            const hobbySessions = sessions.filter((session) => {
                return session.hobbyTitle === hobby.title;
            });

            const totalMinutes = hobbySessions.reduce((total, session) => {
                return total + (session.minutes ?? 0);
            }, 0);

            return {
                hobbyData: hobby,
                sessions: hobbySessions,
                totalMinutes,
                totalSessions: hobbySessions.length,
                timeFrequencies: [],
            };
        });
    }, [hobbyData, sessions]);

    const {
        handleSessionCall,
        init,
        initDaySelected,
        handleInitDaySelected,
        handleSessionsOTDCopy,
        closeModal,
        modalLoading
    } = LogSessionHooks({ handleModalOpen, handleLoading, daySelected, hobbyData, logSessionForm, router });

    const isSameDay = (sessionDate: string | Date, selectedDay: string) => {
        const a = new Date(sessionDate);
        const b = new Date(selectedDay);

        return (
            a.getFullYear() === b.getFullYear() &&
            a.getMonth() === b.getMonth() &&
            a.getDate() === b.getDate()
        );
    };

    const initFormHobbies = useCallback(() => {
        //console.log('Initializing form hobbies for day:', daySelected);
        const sessionsForDay = sessions.filter(session =>
            isSameDay(session.date, daySelected)
        );
        const formReady = sessionsForDay.map((object, i) => {
            const timeFrequencies =
                hobbySessionInfo.find((hobby) => hobby.hobbyData.title === object.hobbyTitle)
                    ?.hobbyData.timeFrequency || [];

            const timeFreqOne = timeFrequencies[0]?.time ?? 0;
            const timeFreqTwo = timeFrequencies[1]?.time ?? 0;
            const timeFreqThree = timeFrequencies[2]?.time ?? 0;

            const totalMinutes = object.minutes ?? 0;
            const hours = Math.floor(totalMinutes / 60);
            const minutes = totalMinutes % 60;

            const timeString =
                hours > 0
                    ? `${hours}:${minutes.toString().padStart(2, '0')}`
                    : `${minutes}`;

            return {
                hobbyKeyId: i,
                session: object.hobbyTitle,
                time: timeString,
                mostFrequentlyUseTime: [timeFreqOne, timeFreqTwo, timeFreqThree],
            };
        });
        const sessionsForCopy = sessions.filter(session =>
            isSameDay(session.date, daySelected)
        );
        handleSessionsOTDCopy(sessionsForCopy);
        // setFormReadyHobbies(formReady);
        logSessionForm.setValues({ newSessions: formReady });
        logSessionForm.insertListItem('newSessions', {
            hobbyKeyId: -1,
            session: '',
            time: '',
            mostFrequentlyUseTime: [],
        });
        logSessionForm.resetDirty();
        logSessionForm.clearErrors();
        //console.log('Initialized form hobbies:', formReady);
    }, [daySelected, hobbySessionInfo, logSessionForm, sessions, handleSessionsOTDCopy]);

    useEffect(() => {

        if (!modalOpen) {
            return;
        }

        if (hobbySessionInfo.length === 0) {
            toast.info('Create a Hobby before logging a session');
            handleModalOpen('newHobby');
            return;
        }

        if (init.current === false) {
            initFormHobbies();
            init.current = true;
        } else if (initDaySelected !== daySelected) {
            logSessionForm.setValues({ newSessions: [] });
            handleInitDaySelected(daySelected);
            initFormHobbies();
        }

    }, [daySelected, hobbySessionInfo.length, modalOpen, initDaySelected, logSessionForm, init, handleInitDaySelected, handleModalOpen, initFormHobbies]);

    return (

        <Modal opened={modalOpen} onClose={closeModal} title="Session Management" centered closeOnClickOutside size={'90%'} overlayProps={{
            backgroundOpacity: 0.55, blur: 3, className: 'drop-shadow-xl overflow-hidden'
        }} styles={{
            header: { backgroundColor: '#b9f8cf', color: 'black', borderBottom: '1px solid #334155' },
            body: { backgroundColor: '#b9f8cf', padding: '10px', paddingTop: '10px', maxHeight: '90vh', maxWidth: '90vw', overflow: 'hidden' }
        }}>
            <LoadingOverlay visible={modalLoading} />
            <LogSessionModal handleSessionCall={handleSessionCall} handleModalOpen={handleModalOpen} daySelected={daySelected} handleDaySelected={handleDaySelected} logSessionForm={logSessionForm} hobbyData={hobbyData} />
        </Modal>

    )
}