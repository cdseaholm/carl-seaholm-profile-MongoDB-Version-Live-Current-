export const getBaseUrl = () => {
    if (process.env.NODE_ENV === "development") {
        return process.env.NEXT_PUBLIC_BASE_URL;
    }

    return process.env.NEXT_PUBLIC_BASE_LIVEURL;
}

export async function getMongoDBUri() {
    const url = process.env.MONGODB_URI as string;
    if (!url) {
        throw new Error("Please add your MongoDB URI to .env.local");
    }
    const uri = url ? url : '';
    return uri;
}