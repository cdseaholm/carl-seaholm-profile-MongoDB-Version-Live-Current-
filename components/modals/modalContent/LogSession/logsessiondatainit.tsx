'use client'

import { useStore } from "@/context/dataStore";
import { useHobbyStore } from "@/context/hobbyStore";
import { useModalStore } from "@/context/modalStore";
import { IUserObject } from "@/models/types/userObject";
import { useEffect, useState } from "react";
import LogSessionModal from "./logsession";
import { AttemptCreateSession } from "@/utils/apihelpers/create/attemptToCreateSession";
import { IEntry } from "@/models/types/entry";
import { IUserObjectIndexed } from "@/models/types/userObjectIndexed";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { User } from "next-auth";
import { CombineNewAndOld } from "@/utils/data/combineData";
import DashZustandInit from "@/utils/data/dashZustandInit";
import { useForm, UseFormReturnType } from "@mantine/form";

function formatDate(dateString: string) {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' } as const;
    return new Date(dateString).toLocaleDateString('en-GB', options).split('/').reverse().join('-');
}

export type newSesh = {
    value: string,
    date: string,
    hobbyTitle: string,
    newIndex: number,
    hobbyTitleIndex: number
}

export type logSessionType = {
    hobbyKeyId: number, session: string; time: string;
}

export type LogSessionFormType = {
    newSessions: logSessionType[]
}

export default function LogSessionDataInit() {

    const { data: session, update } = useSession();
    const user = session ? session.user as User : {} as User;
    const email = user ? user.email : '';
    const setModalOpen = useModalStore((state) => state.setModalOpen);
    const setRefreshKey = useHobbyStore((state) => state.setRefreshKey);
    const userInfo = useStore((state) => state.dashProps);
    const userObjects = userInfo ? userInfo.userObjects : [] as IUserObject[]
    const setModalParent = useModalStore((state) => state.setModalParent);
    const modalOpen = useModalStore((state) => state.modalOpen);
    const titles = useHobbyStore(state => state.titles);
    const [sessions, setSessions] = useState([{ hobby: '', time: '' }]);
    const dashProps = useStore(state => state.dashProps);
    const thisMonth = useStore(state => state.thisMonth);
    const thisYear = new Date().getFullYear();
    const daySelected = useStore(state => state.daySelected);
    const setDaySelected = useStore(state => state.setDaySelected);
    const [formReadyHobbies, setFormReadyHobbies] = useState<logSessionType[]>([]);

    const logSessionForm = useForm({
        mode: 'uncontrolled',
        initialValues: {
            newSessions: [] as { hobbyKeyId: number, session: string, time: string }[]
        },
        validate: {
            newSessions: (value) => value.length < 0 ? 'Sessions cannot be empty!' : null
        }
    });

    const handleDaySelected = (arg: Date) => {
        setDaySelected(arg);
    }

    const handleResetSessions = () => {
        setSessions([{ hobby: '', time: '' }]);
    }

    const handleCreate = async ({ logSessionForm }: { logSessionForm: UseFormReturnType<LogSessionFormType, (values: LogSessionFormType) => LogSessionFormType> }) => {
        console.log('handleLogSession function called');

        // if (!id) {
        //     console.log('You must be logged in to log a session');
        //     return;
        // }

        if (!userObjects) {
            toast.warning('Create a Hobby before logging a session');
            return;
        }

        if (!dashProps) {
            toast.warning('Error with dash props');
            return;
        }

        const hobbies = userObjects.find((object: IUserObject) => object.title === 'hobbies');
        const hobbyIndexes = hobbies ? hobbies.indexes : [] as IUserObjectIndexed[];

        if (!hobbies) {
            console.log('Hobbies object not found');
            return;
        }

        const sessionEntries = [];
        for (let i = 0; ; i++) {
            const thisSession = logSessionForm.getValues().newSessions[i];

            if (!thisSession) {
                break;
            }

            const hobbyTitle = thisSession.session;
            const time = thisSession.time;

            if (hobbyTitle === null || hobbyTitle === undefined || hobbyTitle === '' || time === null || time === undefined || time === '') {
                break;
            }

            const specificHobby = hobbyIndexes ? hobbyIndexes.find((objectIndex, _index) => objectIndex.title === hobbyTitle)?.index as number : -1;

            sessionEntries.push({ hobbyTitle, time, specificHobby });
        }

        if (sessionEntries.length === 0) {
            console.log('Must pick at least one Hobby and Time to attribute this Sesh to');
            return;
        }

        let sessionsToAdd = [] as newSesh[];

        const date = formatDate(daySelected.toLocaleDateString())
        for (const session of sessionEntries) {
            const newSession = { value: session.time, date: date } as IEntry;
            const headers = { 'Authorization': `Bearer ${email}` };
            const create = await AttemptCreateSession({ newEntry: newSession, hobbyTitle: session.hobbyTitle }, headers);
            if (!create || create.worked === false) {
                console.log('Error creating session for hobby:', session.hobbyTitle);
                return;
            }
            let newSeshMade = {
                value: session.time,
                date: date,
                hobbyTitle: session.hobbyTitle,
                newIndex: create.newIndex,
                hobbyTitleIndex: session.specificHobby,
            } as newSesh
            if (newSeshMade) {
                sessionsToAdd.push(newSeshMade);
            }
        }

        const combined = await CombineNewAndOld({ fieldObjects: dashProps.fieldObjects, sessionsFound: dashProps.sessionsFound, seshCheck: sessionsToAdd });

        if (!combined) {
            console.log('Error combining 162 Log Sesh')
            return;
        }

        const reInit = await DashZustandInit({
            userInfo: dashProps.userInfo,
            thisMonth: thisMonth,
            totalTimePerMonth: dashProps.totalTimePerMonth,
            sessionsFound: dashProps.sessionsFound,
            fieldObjects: dashProps.fieldObjects,
            objectToUse: dashProps.objectToUse,
            thisYear: thisYear
        });

        if (!reInit) {
            console.log('Error with reInit')
            return;
        }


        handleResetSessions();
        setModalOpen('');
        await update();
        setRefreshKey(prevKey => prevKey + 1);
    }

    const handleModalOpen = (title: string) => {
        setModalOpen(title);
    }

    useEffect(() => {
        let newFormReady = [] as logSessionType[]
        titles.forEach((title, index) => {
            const mapping = { hobbyKeyId: index, session: title, time: '0' } as logSessionType;
            const newMapp = [...newFormReady, mapping];
            newFormReady = newMapp;
        });
        setFormReadyHobbies(newFormReady)
    }, [titles])

    return (
        <div id="crud-modal" tabIndex={-1} aria-hidden={modalOpen === 'logsession' ? "true" : "false"} className={`${modalOpen === 'logsession' ? 'flex' : 'hidden'} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full inset-0 h-full max-h-full backdrop-blur-sm`}>
            <div className={`relative p-4 w-[90vw] sm:w-80[vw] max-h-full`}>
                <div className={`relative bg-white rounded-lg shadow dark:bg-gray-700`}>
                    <div className={`flex items-center justify-between space-x-4 p-2 border-b rounded-t border-gray-400 w-full`}>
                        <h3 className={`text-lg font-semibold text-gray-900 dark:text-white`}>
                            Log Session
                        </h3>
                        <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal" onClick={() => { setModalOpen(''); setModalParent(''); handleResetSessions(); logSessionForm.clearErrors(); logSessionForm.reset() }}>
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    <LogSessionModal handleCreate={handleCreate} handleModalOpen={handleModalOpen} sessions={sessions} handleResetSessions={handleResetSessions} daySelected={daySelected} handleDaySelected={handleDaySelected} logSessionForm={logSessionForm} hobbyTitles={formReadyHobbies} />
                </div>
            </div>
        </div>

    )
}