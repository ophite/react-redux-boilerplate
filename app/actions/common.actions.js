import typesCommon from './types/common.types';
import appHistory from '../config/appHistory';
import routes from '../constants/routes.constant';
import { apiGet as apiGetWrapper } from './api.actions';


export const fail = (dispatch, callbackErrors = {}) => {
    return (error) => {
        debugger;
        console.log('error response: ' + JSON.stringify(error));
        if (!error) {
            dispatch({
                type: typesCommon.COMMON_HANDLE_ERROR,
                payload: { message: 'No error in try catch' },
            });
        }

        switch (error.status) {
            case 401:
                {
                    const callback = callbackErrors[typesCommon.COMMON_CALLBACK_NON_AUTH];
                    if (callback) {
                        return callback(dispatch, error);
                    }
                    return;
                // debugger
                // appHistory.push(routes.login());
                }
            case 404:
                {
                    const callback = callbackErrors[typesCommon.COMMON_CALLBACK_404];
                    if (callback) {
                        return callback(dispatch, error);
                    }

                    return;
                // appHistory.replace(routes.notFound());
                }
            case 500:
            case 400:
                {
                    dispatch({
                        type: typesCommon.COMMON_HANDLE_ERROR,
                        payload: { error },
                    });
                }
            default:
                {
                    dispatch({
                        type: typesCommon.COMMON_HANDLE_ERROR,
                        payload: { error },
                    });
                }
        }

        const callback = callbackErrors[typesCommon.COMMON_CALLBACK_ERROR];
        if (callback) {
            return callback(dispatch, error);
        }
    };
};

export const openModal = (modalData) => {
    return {
        type: typesCommon.OPEN_MODAL,
        payload: { modalData },
    };
};

export const closeModal = (modalData) => {
    return {
        type: typesCommon.CLOSE_MODAL,
    };
};

export const openContainerModal = (containerModalData) => {
    return {
        type: typesCommon.OPEN_CONTAINER_MODAL,
        payload: { containerModalData },
    };
};

export const closeContainerModal = (modalData) => {
    return {
        type: typesCommon.CLOSE_CONTAINER_MODAL,
    };
};

export const toggleMenuBar = (hide) => {
    return {
        type: typesCommon.TOGGLE_MENU_BAR,
        hide,
    };
};

export const changeWindowWidth = (windowWidth) => {
    return {
        type: typesCommon.CHANGE_WINDOW_WIDTH,
        payload: { windowWidth },
    };
};


export const failError = (dispatch, error) => {
    throw error;
};

export const fail404 = (dispatch) => {
    return appHistory.replace(routes.notFound());
};

export const failNonAuth = (dispatch) => {
    return appHistory.push(routes.login());
};

export const getCallbackErrors = () => {
    return {
        [typesCommon.COMMON_CALLBACK_404]: fail404,
        [typesCommon.COMMON_CALLBACK_ERROR]: failError,
        [typesCommon.COMMON_CALLBACK_NON_AUTH]: failNonAuth,
    };
};

const isMobile = false;
const apiGet = apiGetWrapper.bind(null, isMobile, getCallbackErrors());
export {
    apiGet,
};
