class model {

    //region init

    static MODEL_NAME = '';
    static TYPE_REQUEST = '';
    static TYPE_FROM_SERVER = '';
    static TYPE_CLEAR = '';

    constructor() {
    };

    static create() {
        return {
            isLoading: false
        };
    };

    //endregion

    //region mapper

    static mapToClient() {
        return {};
    }

    static mapToServer() {
        return {};
    }

    //endregion

    //region action api

    /*
     * params: passed from component for url
     * clientApiMethod: GET, POST, PUT, DELETE
     * modelApiMethod: API method in model (GET, POST, PUT, DELETE)
     * model: one of models in redux-models
     * history: API for history
     * failAction: error handling actions (404, 500, 401, etc ...)
     * */
    static actionApiCall(clientApiMethod, modelApiMethod, model, failAction) {
        return (params = {}) => {
            return (dispatch) => {

                const fail = failAction ?
                    failAction(dispatch) :
                    ((error) => {
                        throw error
                    });

                /* 1 request */
                dispatch(model.dispatchRequest({ model }));
                return modelApiMethod(clientApiMethod, params)
                    .then((serverResponse) => {
                        /* 2 response*/
                        model.processServerResponse(
                            dispatch,
                            params,
                            model,
                            serverResponse
                        );
                    })
                    /* 3 error */
                    .catch(fail);
            };
        };
    }

    static processServerResponse(dispatch, params, model, serverResponse, history) {
        const modelClient = model.mapToClient(serverResponse);
        dispatch(model.dispatchModel({ modelClient, model }));
    }

    static dispatchRequest(params = {}) {
        const { model } = params;
        return {
            type: model.TYPE_REQUEST,
            payload: params
        };
    };

    static dispatchModel(params = {}) {
        const { model } = params;
        return {
            type: model.TYPE_FROM_SERVER,
            payload: params
        };
    };

    static apiGet() {
        throw 'Not implemented method (apiGet)';
    };

    static apiPost() {
        throw 'Not implemented method (apiPost)';
    };

    //endregion

    //region actions

    static actionClear(model) {
        return () => {
            return (dispatch) => {
                dispatch(model.dispatchClear({ model }));
            }
        }
    };

    static dispatchClear(params = {}) {
        const { model } = params;
        return {
            type: model.TYPE_CLEAR,
            payload: params
        };
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

