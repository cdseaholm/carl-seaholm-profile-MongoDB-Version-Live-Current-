'use client'

import { useEffect } from "react";
import LogSessionModal from "./logsession";
import { toast } from "sonner";
import { useForm } from "@mantine/form";
import { LoadingOverlay, Modal } from "@mantine/core";
import { ISession } from "@/models/types/session";
import { HobbySessionInfo } from "@/models/types/hobbyData";
import { logSessionType } from "@/models/types/log-session";
import LogSessionHooks from "@/components/hooks/log-session-hooks/log-session-hooks";
import { useRouter } from "next/navigation";


export default function LogSessionDataInit({ handleModalOpen, handleLoading, daySelected, handleDaySelected, sessions, modalOpen, hobbySessionInfo }: { handleModalOpen: (modal: 'newHobby' | 'logSession' | 'colorIndex' | null) => void, handleLoading: (loading: boolean) => void, daySelected: string, handleDaySelected: (date: string) => void, sessions: ISession[], modalOpen: boolean, hobbySessionInfo: HobbySessionInfo[] }) {

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

    const {
        handleSessionCall,
        init,
        initDaySelected,
        handleInitDaySelected,
        handleSessionsOTDCopy,
        closeModal,
        modalLoading
    } = LogSessionHooks({ handleModalOpen, handleLoading, daySelected, hobbySessionInfo, logSessionForm, router });

    const initFormHobbies = () => {
        const formReady = hobbySessionInfo.map((object, i) => {
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
        handleSessionsOTDCopy(sessionsForCopy);
        // setFormReadyHobbies(formReady);
        logSessionForm.setValues({ newSessions: formReady });
        logSessionForm.resetDirty();
        logSessionForm.clearErrors();
        //console.log('Initialized form hobbies:', formReady);
    }



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
            <LogSessionModal handleSessionCall={handleSessionCall} handleModalOpen={handleModalOpen} daySelected={daySelected} handleDaySelected={handleDaySelected} logSessionForm={logSessionForm} />
        </Modal>

    )
}