export async function getBaseUrl() {
    if (process.env.NODE_ENV === "development") {
        let devBase = process.env.BASE_URL as string;
        return devBase;
    }
    let liveBase = process.env.BASE_LIVEURL as string;
    return liveBase;
}

export async function getMongoDBUri() {
    const url = process.env.MONGODB_URI as string;
    if (!url) {
        throw new Error("Please add your MongoDB URI to .env.local");
    }
    const uri = url ? url : '';
    return uri;
}