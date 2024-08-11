export async function getUrl() {
    if (process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_BASE_URL) {
        return process.env.NEXT_PUBLIC_BASE_URL;
    }

    if (process.env.NODE_ENV === 'production' && process.env.NEXT_PUBLIC_BASE_LIVEURL) {
        return process.env.NEXT_PUBLIC_BASE_LIVEURL;
    }

    return '';
}