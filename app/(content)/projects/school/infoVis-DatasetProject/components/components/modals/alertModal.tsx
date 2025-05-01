import { modals } from "@mantine/modals";
import { FormErrors } from "@mantine/form";

export const AlertModal = ({ message }: { message: FormErrors }) => modals.openConfirmModal({
    title: 'Error with your name',
    children: (
        <p>
            {message.name}
        </p>
    ),
    labels: { confirm: 'Okay', cancel: 'Close' },
    onCancel: () => console.log('Cancel'),
    onConfirm: () => console.log('Confirmed'),
});