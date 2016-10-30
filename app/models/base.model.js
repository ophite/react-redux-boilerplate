import { isEmpty } from '../utils/helper';


class model {

    //region init

    constructor() {
    };

    static create() {
        return {
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

    static handleServerResponse(dispatch, params, model, serverResponse) {
        const modelClient = model.toClient(serverResponse);
        dispatch(model.dispatchModel({ modelClient, model }));
    }

    static apiCall(requestMethod,
                   model,
                   params = {},
                   modelApiMethod,
                   failAction) {

        return (dispatch) => {
            const fail = failAction ? failAction(dispatch) : ((error) => {
                throw error
            });

            dispatch(model.dispatchRequest({ model }));
            return modelApiMethod(requestMethod, params)
                .then((serverResponse) => {
                    model.handleServerResponse(dispatch, params, model, serverResponse);
                })
                .catch(fail);
        };
    }

    static apiGet() {
        throw 'Not implemented method (apiGet)';
    };

    static apiPost() {
        throw 'Not implemented method (apiPost)';
    };

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

    static actionGet(requestMethod, model, failAction) {
        return (params = {}) => {
            return this.apiCall(
                requestMethod,
                model,
                params,
                model.apiGet.bind(model),
                failAction
            );
        }
    };

    static actionPost(requestMethod, model, failAction) {
        return (params = {}) => {
            return this.apiCall(
                requestMethod,
                model,
                params,
                model.apiPost.bind(model),
                failAction
            );
        }
    };

    static actionClear(model) {
        return () => {
            return (dispatch) => {
                dispatch(model.dispatchClear({ model }));
            }
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
                ...modelClient,
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
