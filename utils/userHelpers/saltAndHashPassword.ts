import { genSaltSync, hashSync } from 'bcrypt-ts';

export async function SaltAndHashPassword(password: string) {
    const salt = genSaltSync(10);
    const hashedPassword = hashSync(password, salt);
    return hashedPassword;
}