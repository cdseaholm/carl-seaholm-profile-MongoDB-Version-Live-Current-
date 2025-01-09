import { IUser } from "@/models/types/user";
import { getBaseUrl } from "../helpers/helpers";

export async function GetData() {

    const url = await getBaseUrl();
    console.log(url)
    if (!url) {
        return { message: 'Error getting url', data: {} as IUser }
    }

    try {

        const res = await fetch(`${url}/api/getUserInfo`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await res.json();

        if (data.status !== 200) {
            return { message: 'Error getting data', data: {} as IUser };
        }

        return { message: 'Data retrieved', data: data.userInfo as IUser };

    } catch (error) {
        return { message: 'Error getting data', data: {} as IUser };
    }
}