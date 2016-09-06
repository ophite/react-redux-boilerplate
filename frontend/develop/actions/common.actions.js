'use strict';

import typesCommon from './types/common.types';
import modalContainerTypes from '../constants/containersTypes.constant.js';
import appHistory   from '../config/appHistory';
import routes from '../constants/routes.constant';


export const fail = (dispatch) => {
	return (error) => {
		if (error && error.status === 401) {
			// dispatch(brokenToken(true));
			// appHistory.push(routes.trends());
			dispatch(openContainerModal({
				type: modalContainerTypes.AUTH
			}));
		} else if (error && error.status === 404) {
			appHistory.replace(routes.notFound());
		} else {
			dispatch(success(typesCommon.COMMON_ERROR, { error }));
		}
	};
};

export const request = (pendingType, requestParams) => {
	return {
		type: pendingType ? pendingType : typesCommon.COMMON_REQUEST,
		payload: {
			pendingType,
			...requestParams
		}
	};
};

export const success = (type, data = null) => {
	return {
		type,
		payload: data ? { ...data } : data
	};
};

export const openModal = (modalData) => {
	return {
		type: typesCommon.OPEN_MODAL,
		payload: { modalData }
	};
};

export const closeModal = (modalData) => {
	return {
		type: typesCommon.CLOSE_MODAL
	};
};

export const openContainerModal = (containerModalData) => {
	return {
		type: typesCommon.OPEN_CONTAINER_MODAL,
		payload: { containerModalData }
	};
};

export const closeContainerModal = (modalData) => {
	return {
		type: typesCommon.CLOSE_CONTAINER_MODAL
	};
};

export const toggleMenuBar = (hide) => {
	return {
		type: typesCommon.TOGGLE_MENU_BAR,
		hide
	};
};

export const changeWindowWidth = (windowWidth) => {
	return {
		type: typesCommon.CHANGE_WINDOW_WIDTH,
		payload: { windowWidth }
	};
};
