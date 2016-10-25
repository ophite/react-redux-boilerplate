import typesModal from './types/modal.types';

export const openModal = (key) => ({
    type: typesModal.OPEN_MODAL,
    key,
});

export const closeModal = () => ({
    type: typesModal.CLOSE_MODAL,
});
