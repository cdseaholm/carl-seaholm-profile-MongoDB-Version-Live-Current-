export async function getBaseUrl() {
    let liveBase = process.env.URL ? process.env.URL as string : '';
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