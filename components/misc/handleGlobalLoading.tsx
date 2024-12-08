
import { useStateStore } from "@/context/stateStore";
import { useEffect, useState } from "react";

export default function HandleGlobalLoading() {


    const globalLoading = useStateStore(state => state.globalLoading);
    const [finished, setFinished] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        try {
            if (globalLoading === null || globalLoading === undefined) {
                throw new Error('Global Loading is not defined');
            } else {
                setFinished(true);
                setLoading(false);
            }
            setLoading(false);
        } catch (error: any) {
            setLoading(false);
            setError(error);
        } finally {
            setLoading(false);
        }
    }, [globalLoading]);

    return {finished, loading, error};
}   