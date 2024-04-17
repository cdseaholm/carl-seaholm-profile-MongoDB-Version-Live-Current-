import getUser from "@/utils/auth";
import { cache } from "react";

export const validateRequest = cache(async () => {
    const userValid = await getUser();
    return userValid;
});