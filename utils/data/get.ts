import { IUser } from "@/models/types/user";
import { getBaseUrl } from "../helpers/helpers";

export async function GetData() {

    const userID = process.env.ADMIN_USERNAME as string;
    const url = await getBaseUrl()

    try {

        const res = await fetch(`${url}/api/${userID}/getUserInfo`, {
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