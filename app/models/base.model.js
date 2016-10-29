import { isEmpty } from '../utils/helper';
import { apiClient as ApiClientWrapper } from '../api/index';
import { apiGet, apiClear } from '../actions/api.actions';

class model {

    //region init

    constructor() {
    };

    static create() {
        return {
            model: {},
            isLoading: false
        };
    };

    //endregion

    //region helper

    static isEmpty(model) {
        if (isEmpty(model)) {
            return true;
        }

        const tmp = { ...model };
        delete tmp.isLoading;
        if (isEmpty(tmp)) {
            return true;
        }

        return false;
    };

    //endregion

    //region api

    static apiCall(model,
                   params = {},
                   modelApiMethod,
                   errorsAction,
                   success,
                   conditionalSuccess) {

        return (dispatch) => {
            dispatch(model.dispatchRequest({ model }));
            return modelApiMethod(params)
                .then((data) => {

                    // TODO in this place can be custom logic. Need to implement availability to customize this!
                    if (conditionalSuccess) {
                        conditionalSuccess(dispatch, data);
                    } else {
                        const modelClient = model.toClient(data);
                        dispatch(model.dispatchModel({ modelClient, model }));

                        if (success) {
                            success(modelClient, dispatch);
                        }
                    }
                })
                .catch(errorsAction(dispatch));
        };
    }

    static apiGet() {
        throw 'Not implemented method (apiGet)';
    };

    static apiPost() {
        throw 'Not implemented method (apiPost)';
    };

    static apiClient() {
        return ApiClientWrapper();
    }

    //endregion

    //region convert

    static combineModel(params) {
        return {
            ...params
        };
    };

    static toClient() {
        return {};
    }

    static toServer() {
        return {};
    }

    //endregion

    //region dispatch

    static dispatchRequest(params = {}) {
        const { model } = params;
        return {
            type: model.TYPE_REQUEST,
            payload: model.combineModel(params)
        };
    };

    static dispatchModel(params = {}) {
        const { model } = params;
        return {
            type: model.TYPE_FROM_SERVER,
            payload: model.combineModel(params)
        };
    };

    static dispatchClear(params = {}) {
        const { model } = params;
        return {
            type: model.TYPE_CLEAR,
            payload: model.combineModel(params)
        };
    };

    //endregion

    //region action

    static actionGet(model, errorsAction) {
        return (params = {}) => {
            return this.apiCall(model, params, model.apiGet.bind(model), errorsAction);
        }
    };

    static actionPost(model, errorsAction) {
        return (params = {}) => {
            return this.apiCall(model, params, model.apiPost.bind(model), errorsAction);
        }
    };

    static actionClear(model) {
        return () => {
            return apiClear(model);
        }
    };

    //endregion

    //region reducer

    static getReduceMethod(model, type) {
        const reducers = {
            [model.TYPE_REQUEST]: model.reduceRequest,
            [model.TYPE_FROM_SERVER]: model.reduceGet,
            [model.TYPE_CLEAR]: model.reduceClear,
        };

        return reducers[type];
    }

    static reduce(state, action, reduceMethod) {
        const { model } = action.payload;
        const stateModel = state[model.MODEL_NAME];

        return {
            ...state,
            ...reduceMethod(stateModel, action, state)
        };
    };

    static reduceRequest(stateModel, action, state) {
        const { model } = action.payload;
        return {
            [model.MODEL_NAME]: {
                ...stateModel,
                isLoading: true
            }
        };
    };

    static reduceGet(stateModel, action, state) {
        const { model, modelClient } = action.payload;
        return {
            [model.MODEL_NAME]: {
                model: modelClient,
                isLoading: false
            }
        };
    };

    static reduceClear(stateModel, action, state) {
        const { model } = action.payload;
        return {
            [model.MODEL_NAME]: {
                ...model.create()
            }
        };
    };

    //endregion
}

export default model;
