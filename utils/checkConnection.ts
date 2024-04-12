import connect from '@/utils/mongodb';

export default async function checkConnection() {
    const client = await connect;
    if (client) {
        return client;
    } else {
        return null;
    }
}