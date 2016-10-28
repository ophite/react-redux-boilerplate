'use strict';

import commonTypes from '../actions/types/common.types';


export default (state = DEFAULT_STATE, action) => {
    switch (action.type) {

        case commonTypes.COMMON_HANDLE_ERROR:
            return reduceHandleError(state, action);
        case commonTypes.COMMON_CLEAR_ERROR:
            return reduceClearError(state, action);

        case commonTypes.OPEN_MODAL:
            return reduceOpenModal(state, action);
        case commonTypes.CLOSE_MODAL:
            return reduceCloseModal(state, action);

        case commonTypes.OPEN_CONTAINER_MODAL:
            return reduceOpenContainerModal(state, action);
        case commonTypes.CLOSE_CONTAINER_MODAL:
            return reduceCloseContainerModal(state, action);

        case commonTypes.TOGGLE_MENU_BAR:
            return reduceToggleMenuBar(state, action);

        case commonTypes.CHANGE_WINDOW_WIDTH:
            return reduceChangeWindowWidth(state, action);

        default:
            return state;
    }
};

const reduceHandleError = (state, action) => {
    const { error } = action.payload;
    return {
        ...state,
        error
    };
};

const reduceClearError = (state, action) => {
    return {
        ...state,
        error: null
    };
};

const reduceOpenModal = (state, action) => {
    const { modalData } = action.payload;
    const isOpen = modalData && modalData.isOpen;

    return {
        ...state,
        isModalOpen: isOpen !== null && isOpen !== undefined ? isOpen : true,
        modalData,
    };
};

const reduceCloseModal = (state, action) => {
    return {
        ...state,
        isModalOpen: false,
        modalData: {},
    };
};

const reduceOpenContainerModal = (state, action) => {
    const { containerModalData } = action.payload;

    return {
        ...state,
        isLoading: false,
        isModalOpen: false,
        isContainerModalOpen: true,
        containerModalData,
    };
};

const reduceCloseContainerModal = (state, action) => {
    return {
        ...state,
        isContainerModalOpen: false,
        containerModalData: {},
    };
};

const reduceToggleMenuBar = (state, action) => {
    const isMenuBarVisible = action.hide === true ? false : !state.isMenuBarVisible;

    return {
        ...state,
        isMenuBarVisible,
        isNotificationsBarVisible: false,
    };
};

const reduceChangeWindowWidth = (state, action) => {
    const { windowWidth } = action.payload;
    return {
        ...state,
        windowWidth,
    };
};

const DEFAULT_STATE = {
    isModalOpen: false,
    modalData: {},
    isContainerModalOpen: false,
    containerModalData: {},
    isMenuBarVisible: false,
    windowWidth: window.innerWidth,
    error: null,
};
