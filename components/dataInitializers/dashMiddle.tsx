'use client'

import { useModalStore } from "@/context/modalStore";
import { useState, useEffect, useCallback } from "react";
import { DashProps, TransformedDashProps, useStore } from "@/context/dataStore";
import { useSession } from "next-auth/react";
import { useStateStore } from "@/context/stateStore";
import React from "react";
import { newSesh } from "../modals/modalContent/LogSession/logsessiondatainit";
import DashProvider from "./dashProvider";
import { CombineNewAndOld } from "@/utils/data/dashInit/combineData";
import DashZustandInit, { InitializedData } from "@/utils/data/dashInit/dashZustandInit";
import { InitType } from "@/app/(content)/dashboard/page";
import { useHobbyStore } from "@/context/hobbyStore";
import { ColorMapType } from "@/models/types/colorMap";
import { IIndexedEntry } from "@/models/types/entry";
import { IFieldObject } from "@/models/types/field";
import { IUserObject } from "@/models/types/userObject";
import { SetDashParams } from "@/utils/data/dashInit/stats";
import { IUser } from "@/models/types/user";
import { EntriesOTDType } from "@/models/types/otds";
import { PercentageData } from "@/models/types/percentage";
import { DataSets } from "@/models/types/dataSets";
import { TrackerData } from "@/models/types/tracker";

export default function DashMiddle({ userInfo }: { userInfo: IUser }) {

    //utility variables
    const { data: session } = useSession();
    const user = session?.user ? session.user : null;
    const email = user?.email ? user.email : '';
    const adminBoolTruth = email === 'cdseaholm@gmail.com' ? true : false;
    const isBreakpoint = useStateStore((state) => state.widthQuery) < 950 ? true : false;
    const [showGoals, setShowGoals] = useState<boolean>(false);
    const [showCats, setShowCats] = useState<boolean>(false);
    const [showDescriptions, setShowDescriptions] = useState<boolean>(false);
    const [showTotTime, setShowTotTime] = useState<boolean>(false);
    const [keyChange, setKeyChange] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [indexShown, setIndexShown] = useState<boolean>(false);
    const [updateData, setUpdateData] = useState<boolean>(false);

    //global stored variables
    const dashToShow = useModalStore((state) => state.dashToShow);
    const showCalendar = useModalStore((state) => state.showCalendar);
    const dashProps = useStore((state) => state.dashProps);
    const transformedDashProps = useStore(state => state.transformedDashProps);
    const thisMonth = useStore(state => state.thisMonth);
    const daySelected = useStore(state => state.daySelected);

    //global set states
    const setDashToShow = useModalStore((state) => state.setDashToShow);
    const setShowCalendar = useModalStore((state) => state.setShowCalendar);
    const setDashProps = useStore(state => state.setDashProps);
    const setTransformedDashProps = useStore(state => state.setTransformedDashProps);
    const setTitles = useHobbyStore(state => state.setTitles);
    const setCategories = useHobbyStore(state => state.setCategories);
    const setDaySelected = useStore(state => state.setDaySelected);
    const setThisMonth = useStore(state => state.setThisMonth);

    const initStore = useCallback(async () => {
        if (!userInfo) {
            return {} as DashProps;
        }
        let newDashProps = {} as DashProps;
        if (!daySelected) {
            setDaySelected(new Date().toLocaleDateString());
        }
        if (!thisMonth) {
            setThisMonth(new Date().getMonth());
        }
        const timeData = await SetDashParams({ userInfo: userInfo, month: thisMonth }) as InitType;

        if (timeData) {
            const totalTimePerMonth = timeData.totalTimePerMonth ? timeData.totalTimePerMonth : [] as number[];
            const userObjects = timeData.userObjects ? timeData.userObjects : [] as IUserObject[];
            const sessionsFound = timeData.sessionsFound ? timeData.sessionsFound : [] as IIndexedEntry[];
            const colorMap = timeData.colorMap ? timeData.colorMap : [] as ColorMapType[];
            const fieldObjects = timeData.fieldObjects ? timeData.fieldObjects : [] as IFieldObject[];
            const objectToUse = timeData.firstObject ? timeData.firstObject : {} as IUserObject;
            newDashProps = { userInfo: userInfo, thisMonth: thisMonth, daySelected: daySelected, totalTimePerMonth: totalTimePerMonth, userObjects: userObjects, sessionsFound: sessionsFound, colorMap: colorMap, fieldObjects: fieldObjects, objectToUse: objectToUse } as DashProps;

            let transformedDashProps = {} as TransformedDashProps;
            let initEnts = [] as EntriesOTDType[];
            let initPerc = {} as PercentageData;
            let initDataSet = {} as DataSets;
            let initTracker = {} as TrackerData;
            let initTitles = [] as string[];
            let initCats = [] as string[];

            let initialized = await DashZustandInit({ userInfo, thisMonth, daySelected, totalTimePerMonth, userObjects, sessionsFound, colorMap, fieldObjects, objectToUse }) as InitializedData;

            if (initialized) {
                initEnts = [...initialized.ents] as EntriesOTDType[];
                initPerc = { ...initialized.perc } as PercentageData;
                initDataSet = { ...initialized.dataSet } as DataSets;
                initTracker = { ...initialized.tracker } as TrackerData;
                initTitles = [...initialized.setModalData.titles] as string[];
                initCats = [...initialized.setModalData.categories] as string[];

                transformedDashProps = { entriesOTD: initEnts, percentage: initPerc, dataSet: initDataSet, trackerData: initTracker } as TransformedDashProps;
                setTransformedDashProps({ ...transformedDashProps });
                setTitles([...initTitles]);
                setCategories([...initCats]);
            }
        }
        setDashProps({ ...newDashProps });
        return;
    }, [userInfo, daySelected, thisMonth, setDaySelected, setThisMonth, setTransformedDashProps, setTitles, setCategories, setDashProps]);

    const updateStore = useCallback(async () => {
        if (dashProps) {
            let localUserInfo = dashProps.userInfo as IUser
            let totalTimePerMonth = dashProps.totalTimePerMonth as number[];
            let userObjects = dashProps.userObjects as IUserObject[];
            let sessionsFound = dashProps.sessionsFound as IIndexedEntry[];
            let colorMap = dashProps.colorMap as ColorMapType[];
            let fieldObjects = dashProps.fieldObjects as IFieldObject[];
            let objectToUse = dashProps.objectToUse as IUserObject;

            let reInitialized = await DashZustandInit({
                userInfo: localUserInfo,
                thisMonth: thisMonth,
                daySelected: daySelected,
                totalTimePerMonth: totalTimePerMonth,
                userObjects: userObjects,
                sessionsFound: sessionsFound,
                colorMap: colorMap,
                fieldObjects: fieldObjects,
                objectToUse: objectToUse
            });

            if (reInitialized) {
                let reTransformedDashProps = { percentage: reInitialized.perc, dataSet: reInitialized.dataSet, trackerData: reInitialized.tracker, entriesOTD: reInitialized.ents } as TransformedDashProps
                setTransformedDashProps(reTransformedDashProps);
                setTitles(reInitialized.setModalData.titles);
                setCategories(reInitialized.setModalData.categories);
            }
        }
        setUpdateData(false);
    }, [dashProps, thisMonth, daySelected, setTransformedDashProps, setCategories, setTitles]);

    useEffect(() => {
        const init = async () => {
            await initStore();
        }
        init();
        setLoading(false);
    }, [userInfo, initStore]);

    useEffect(() => {
        if (updateData) {
            updateStore();
        }
    }, [updateData, updateStore]);


    const handleLoading = () => {
        setLoading(!loading);
    }

    const handleKeyChange = () => {
        setKeyChange(false)
    }

    const handleGoals = () => {
        setShowGoals(!showGoals);
    }

    const handleCats = () => {
        setShowCats(!showCats);
    }

    const handleDescriptions = () => {
        setShowDescriptions(!showDescriptions);
    }

    const handleTotalTime = () => {
        setShowTotTime(!showTotTime);
    }


    //functions
    const handleDashToShow = (dashToShow: string, handleModalOpen: string | null) => {
        setDashToShow(dashToShow);
        if (handleModalOpen) {
            setShowCalendar(true);
        }
    }

    const handleDaySelected = async (date: string) => {
        setLoading(true);
        setDaySelected(date);
        setLoading(false)
    }

    const closeCalendar = () => {
        setShowCalendar(false);
    }

    const handleDateIncrease = () => {
        const date = new Date(daySelected);
        date.setDate(date.getDate() + 1);
        handleDaySelected(date.toLocaleDateString());
    }

    const handleDateDecrease = () => {
        const date = new Date(daySelected);
        date.setDate(date.getDate() - 1);
        handleDaySelected(date.toLocaleDateString());
    }

    [/**
        
    const handleUserObjectToShow = async (userObjectToShow: string) => {
        const object = userObjects[Number(userObjectToShow)];
        if (!object) {
            return;
        }
        handleSetObjectToUse(object);
    }; 
    
    const handleSetObjectToUse = (objectToUse: IUserObject) => {
        setObjectToUse(objectToUse);
    }
    
    */]

    const handleDashParams = async (newSessions: newSesh[]) => {
        const combined = await CombineNewAndOld({ fieldObjects: dashProps.fieldObjects, sessionsFound: dashProps.sessionsFound, seshCheck: newSessions })
        if (combined) {
            let newEntries = [...combined.combinedEntries] as IIndexedEntry[];
            let newFieldObjects = [...combined.combinedFields] as IFieldObject[];
            let newDashProps = {
                ...dashProps,
                fieldObjects: newFieldObjects,
                sessionsFound: newEntries
            } as DashProps
            setDashProps(newDashProps);
            setUpdateData(true);
        }
    }

    return (
        <DashProvider
            showCalendar={showCalendar}
            adminBoolTruth={adminBoolTruth}
            dashToShow={dashToShow}
            indexShown={indexShown}
            showCats={showCats}
            showDescriptions={showDescriptions}
            showGoals={showGoals}
            showTotTime={showTotTime}
            isBreakpoint={isBreakpoint}
            loading={loading}
            keyChange={keyChange}
            colorMap={dashProps.colorMap}
            daySelected={daySelected}
            sessionsFound={dashProps.sessionsFound}
            entriesOTD={transformedDashProps.entriesOTD}
            tracker={transformedDashProps.trackerData}
            perc={transformedDashProps.percentage}
            dataSet={transformedDashProps.dataSet}
            handleDashParams={handleDashParams}
            closeCalendar={closeCalendar}
            handleDaySelected={handleDaySelected}
            handleDashToShow={handleDashToShow}
            setIndexShown={setIndexShown}
            handleDateIncrease={handleDateIncrease}
            handleDateDecrease={handleDateDecrease}
            handleCats={handleCats}
            handleDescriptions={handleDescriptions}
            handleGoals={handleGoals}
            handleTotalTime={handleTotalTime}
            handleLoading={handleLoading}
            handleKeyChange={handleKeyChange}
        />

    );
}
