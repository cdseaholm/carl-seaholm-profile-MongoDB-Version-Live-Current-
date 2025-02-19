'use server'

export async function CheckAdminBool(userCheck: string) {
    let admin = process.env.ADMIN_USERNAME as string;
    try {
        if (userCheck === admin) {
            return true;
        }
        return false;
    } catch (error) {
        throw new Error("Failed to check admin status");
    }
}