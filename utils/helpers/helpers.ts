export const getBaseUrl = () => {
    if (process.env.NODE_ENV === "development") {
        return process.env.NEXT_PUBLIC_BASE_URL;
    }

    return process.env.NEXT_PUBLIC_BASE_LIVEURL;
}