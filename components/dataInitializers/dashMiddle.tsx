// 'use client'

// import { useModalStore } from "@/context/modalStore";
// import { useState, useEffect } from "react";
// import { useStore } from "@/context/dataStore";
// import { useSession } from "next-auth/react";
// import React from "react";
// import DashProvider from "./dashProvider";
// import { ColorMapType } from "@/models/types/colorMap";

// export default function DashMiddle() {

//     //utility variables
//     const { data: session } = useSession();
//     const user = session?.user ? session.user : null;
//     const email = user?.email ? user.email : '';
//     const adminBoolTruth = email === 'cdseaholm@gmail.com' ? true : false;
//     const [showGoals, setShowGoals] = useState<boolean>(false);
//     const [showCats, setShowCats] = useState<boolean>(false);
//     const [showDescriptions, setShowDescriptions] = useState<boolean>(false);
//     const [showTotTime, setShowTotTime] = useState<boolean>(false);
//     const [loading, setLoading] = useState<boolean>(true);
//     const [indexShown, setIndexShown] = useState<boolean>(false);

//     //global stored variables
//     const dashToShow = useModalStore((state) => state.dashToShow);
//     const showCalendar = useModalStore((state) => state.showCalendar);
//     const dashProps = useStore((state) => state.dashProps);
//     const daySelected = useStore(state => state.daySelected);
//     const entriesOTD = useStore(state => state.entriesOTD);

//     //global set states
//     const setDashToShow = useModalStore((state) => state.setDashToShow);
//     const setShowCalendar = useModalStore((state) => state.setShowCalendar);
//     const setDaySelected = useStore(state => state.setDaySelected);

//     useEffect(() => {
//         setLoading(false);
//     }, []);


//     const handleLoading = () => {
//         setLoading(!loading);
//     }

//     const handleGoals = () => {
//         setShowGoals(!showGoals);
//     }

//     const handleCats = () => {
//         setShowCats(!showCats);
//     }

//     const handleDescriptions = () => {
//         setShowDescriptions(!showDescriptions);
//     }

//     const handleTotalTime = () => {
//         setShowTotTime(!showTotTime);
//     }


//     //functions
//     const handleDashToShow = (dashToShow: string, handleModalOpen: string | null) => {
//         setDashToShow(dashToShow);
//         if (handleModalOpen) {
//             setShowCalendar(true);
//         }
//     }

//     const handleDaySelected = async (date: Date) => {
//         setLoading(true);
//         setDaySelected(date);
//         setLoading(false)
//     }

//     const closeCalendar = () => {
//         setShowCalendar(false);
//     }

//     const handleDateIncrease = () => {
//         const date = new Date(daySelected);
//         date.setDate(date.getDate() + 1);
//         handleDaySelected(date);
//     }

//     const handleDateDecrease = () => {
//         const date = new Date(daySelected);
//         date.setDate(date.getDate() - 1);
//         handleDaySelected(date);
//     }

//     return (
//         <DashProvider
//             showCalendar={showCalendar}
//             adminBoolTruth={adminBoolTruth}
//             dashToShow={dashToShow}
//             indexShown={indexShown}
//             showCats={showCats}
//             showDescriptions={showDescriptions}
//             showGoals={showGoals}
//             showTotTime={showTotTime}
//             loading={loading}
//             colorMap={dashProps ? dashProps.colorMap : [] as ColorMapType[]}
//             daySelected={daySelected}
//             closeCalendar={closeCalendar}
//             handleDaySelected={handleDaySelected}
//             handleDashToShow={handleDashToShow}
//             setIndexShown={setIndexShown}
//             handleDateIncrease={handleDateIncrease}
//             handleDateDecrease={handleDateDecrease}
//             handleCats={handleCats}
//             handleDescriptions={handleDescriptions}
//             handleGoals={handleGoals}
//             handleTotalTime={handleTotalTime}
//             handleLoading={handleLoading}
//             entriesOTD={entriesOTD}
//         />

//     );
// }
