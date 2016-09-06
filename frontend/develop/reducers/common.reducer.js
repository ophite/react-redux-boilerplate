'use strict';

import commonTypes from '../actions/types/common.types';


export default (state = DEFAULT_STATE, action) => {
	switch (action.type) {

		case commonTypes.COMMON_ERROR:
			return reduceError(state, action);
		case commonTypes.COMMON_SUCCESS:
			return reduceSuccess(state, action);
		case commonTypes.COMMON_REQUEST:
			return reduceRequest(state, action);

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

export const reduceRequest = (state, action) => {
	const { key, pendingType, ...args } = action.payload;
	return {
		...state,
		pendingType,
		pendingParams: {
			key,
			pendingType,
			...args
		},
		isLoading: true
	};
};

const reduceSuccess = (state, action) => {
	const { key, pendingType, ...args } = action.payload;
	return {
		...state,
		...XHR_STATE,
		pendingParams: {
			key,
			pendingType,
			...args
		},
		isLoading: false
	};
};

const reduceError = (state, action) => {
	const { error } = action.payload;
	const data = {
		...XHR_STATE,
		error
	};

	throw data;
};

const reduceOpenModal = (state, action) => {
	const { modalData } = action.payload;
	const isOpen = modalData && modalData.isOpen;

	return {
		...state,
		isModalOpen: isOpen !== null && isOpen !== undefined ? isOpen : true,
		modalData
	};
};

const reduceCloseModal = (state, action) => {
	return {
		...state,
		isModalOpen: false,
		modalData: {}
	};
};

const reduceOpenContainerModal = (state, action) => {
	const { containerModalData } = action.payload;

	return {
		...state,
		isLoading: false,
		isModalOpen: false,
		isContainerModalOpen: true,
		containerModalData
	};
};

const reduceCloseContainerModal = (state, action) => {
	return {
		...state,
		isContainerModalOpen: false,
		containerModalData: {}
	};
};

const reduceToggleMenuBar = (state, action) => {
	const isMenuBarVisible = action.hide === true ? false : !state.isMenuBarVisible;

	return {
		...state,
		isMenuBarVisible,
		isNotificationsBarVisible: false
	};
};

const reduceChangeWindowWidth = (state, action) => {
	const { windowWidth } = action.payload;
	return {
		...state,
		windowWidth
	}
};

const DEFAULT_STATE = {
	pendingType: 'default',
	pendingParams: {},
	isModalOpen: false,
	modalData: {},
	isContainerModalOpen: false,
	containerModalData: {},
	isMenuBarVisible: false,
	windowWidth: window.innerWidth
};

export const XHR_STATE = {
	isLoading: false,
	error: null
};
