import { useCallback, useState } from 'react';

export const useModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [modalData, setModalData] = useState(null);

    const openModal = useCallback(
        (data = null) => {
            if (JSON.stringify(modalData) !== JSON.stringify(data)) {
                setModalData(data);
            }
            setIsOpen(true);
        },
        [modalData]
    );

    const closeModal = useCallback(() => {
        setModalData(null);
        setIsOpen(false);
    }, []);

    return { isOpen, modalData, openModal, closeModal };
};
