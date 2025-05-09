'use client'

import { ModalsProvider } from "@mantine/modals";
import CalendarModalInit from "../modals/modalContent/Calendar/calendarModalInit";

export default function ModalProvider() {

    // const { data: session } = useSession();

    // const handleUpdate = async () => {
    //     await update();
    // };

    return (
        <ModalsProvider>
            <CalendarModalInit />
        </ModalsProvider>
    );
}