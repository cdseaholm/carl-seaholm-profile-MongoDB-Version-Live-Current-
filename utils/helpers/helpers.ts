import { useStateStore } from "@/context/stateStore";

export async function getBaseUrl() {
    let liveBase = process.env.NEXT_PUBLIC_BASE_URL ? process.env.NEXT_PUBLIC_BASE_URL as string : '';
    return liveBase;
}

export async function initBaseUrl() {
    const devBase = process.env.NEXT_PUBLIC_BASE_URL ? process.env.NEXT_PUBLIC_BASE_URL as string : 'null';
    useStateStore.getState().setUrlToUse(devBase);
}

export async function getMongoDBUri() {
    const url = process.env.MONGODB_URI as string;
    if (!url) {
        throw new Error("Please add your MongoDB URI to .env.local");
    }
    const uri = url ? url : '';
    return uri;
}