import { compareSync } from "bcrypt-ts";

export async function VerifyPassword(password: string, hashedPassword: string) {
    return compareSync(password, hashedPassword);
}