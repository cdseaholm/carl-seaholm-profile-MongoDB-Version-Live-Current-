'use client'

import { Modal } from "@mantine/core";
import ColorIndexContent from "./color-index-content";
import { MonthColorNames } from "@/models/types/calColorInfo";

export default function ColorIndexModal({openModal, handleOpenModal, hobbyColorMap}: { openModal: boolean, handleOpenModal: (modal: 'newHobby' | 'logSession' | 'colorIndex' | null) => void, hobbyColorMap: { color: string, title: string }[] }) {
    
    const monthColorMap = MonthColorNames;

    return (
        <Modal opened={openModal} onClose={() => handleOpenModal(null)} title="Colors" centered closeOnClickOutside size={'90%'} overlayProps={{
            backgroundOpacity: 0.55, blur: 3, className: 'drop-shadow-xl overflow-hidden'
        }} styles={{
            header: { backgroundColor: '#e4e6d5ff', color: 'black', borderBottom: '1px solid #334155' },
            body: { backgroundColor: '#e4e6d5ff', padding: '10px', paddingTop: '10px', maxHeight: '90vh', maxWidth: '90vw', overflow: 'hidden' }
        }}>
            <ColorIndexContent hobbyColorMap={hobbyColorMap} monthColorMap={monthColorMap} />
        </Modal>
    )
}