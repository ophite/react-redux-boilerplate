import typesCommon from './types/common.types';
import { history } from '../entry/history';
import routes from '../constants/routes.constant';


//region error

export const failError = (dispatch, error) => {
    throw error;
};

export const fail404 = (dispatch) => {
    return history.replace(routes.notFound());
};

export const failNonAuth = (dispatch) => {
    return history.push(routes.login());
};

export const getCallbackErrors = () => {
    return {
        [typesCommon.COMMON_CALLBACK_404]: fail404,
        [typesCommon.COMMON_CALLBACK_ERROR]: failError,
        [typesCommon.COMMON_CALLBACK_NON_AUTH]: failNonAuth,
    };
};

export const fail = (dispatch) => {
    const callbackErrors = getCallbackErrors();

    return (error) => {
        debugger;
        console.log('error response: ' + JSON.stringify(error));
        if (!error) {
            dispatch({
                type: typesCommon.COMMON_HANDLE_ERROR,
                payload: { message: 'No error in try catch' },
            });
        }

        console.log('error stack:' + error.stack);

        switch (error.status) {
            case 401:
            {
                const callback = callbackErrors[typesCommon.COMMON_CALLBACK_NON_AUTH];
                if (callback) {
                    return callback(dispatch, error);
                }
                return;
                // debugger
                // history.push(routes.login());
            }
            case 404:
            {
                const callback = callbackErrors[typesCommon.COMMON_CALLBACK_404];
                if (callback) {
                    return callback(dispatch, error);
                }

                return;
                // history.replace(routes.notFound());
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

//endregion

//region modal

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

//endregion

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
