'use client'

import { useRouter } from "next/navigation";
import LandingPage from "./landingPage"
import { useStateStore } from "@/context/stateStore";
import { useState, useEffect } from "react";
import { Spinner } from "@/components/misc/Spinner";

export default function LandingMiddle() {

    const router = useRouter();
    const [dashShow, setDashShow] = useState(true);
    const [proShow, setProShow] = useState(true);
    const [loading, setLoading] = useState(true);
    const [fadeInBegin, setFadeInBegin] = useState(false);
    const [fadeOutBegin, setFadeOutBegin] = useState(false);

    useEffect(() => {
        setLoading(false);
        setFadeInBegin(true);
    }, []);

    const navigateToDashboard = async () => {
        setProShow(false);
        setFadeOutBegin(true);
        setTimeout(() => {
            router.replace('/dashboard');
        }, 750);
    };

    const navigateToProfessional = async () => {
        setDashShow(false);
        setFadeOutBegin(true);
        setTimeout(() => {
            router.replace('/about/professional');
        }, 750);
    };

    const isBreakpoint = useStateStore((state) => state.widthQuery) < 768 ? true : false;
    const size = isBreakpoint ? 50 : 100;
    return (
        loading ? (
            <Spinner />
        ) : (
            <LandingPage navigateToDashboard={navigateToDashboard} navigateToProfessional={navigateToProfessional} size={size} dashShow={dashShow} proShow={proShow} fadeInBegin={fadeInBegin} fadeOutBegin={fadeOutBegin}/>
        )
    );
}