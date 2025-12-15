'use client'

import { useModalStore } from "@/context/modalStore";
import { Modal } from "@mantine/core";
import ColorIndexContent from "./color-index-content";
import { useDataStore } from "@/context/dataStore";
import { MonthColorNames } from "@/models/types/calColorInfo";

export default function ColorIndexModal() {

    const showColorIndexModal = useModalStore(state => state.showColorIndexModal);
    const setShowColorIndexModal = useModalStore(state => state.setShowColorIndexModal);
    const hobbyColorMap = useDataStore(state => state.hobbySessionInfo)?.map(hobby => {
        return { color: hobby.hobbyData.color, title: hobby.hobbyData.title }
    });
    const monthColorMap = MonthColorNames;

    return (
        <Modal opened={showColorIndexModal} onClose={() => setShowColorIndexModal(false)} title="Colors" centered closeOnClickOutside size={'90%'} overlayProps={{
            backgroundOpacity: 0.55, blur: 3, className: 'drop-shadow-xl overflow-hidden'
        }} styles={{
            header: { backgroundColor: '#e4e6d5ff', color: 'black', borderBottom: '1px solid #334155' },
            body: { backgroundColor: '#e4e6d5ff', padding: '10px', paddingTop: '10px', maxHeight: '90vh', maxWidth: '90vw', overflow: 'hidden' }
        }}>
            <ColorIndexContent hobbyColorMap={hobbyColorMap} monthColorMap={monthColorMap} />
        </Modal>
    )
}