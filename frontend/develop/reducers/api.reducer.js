export const apiReducer = (state, action) => {
    if (!action.payload) {
        return state;
    }

    const { model } = action.payload;
    if (!model) {
        return state;
    }

    if (!Object.keys(state).length) {
        throw 'No models in state';
    }

    if (!~Object.keys(state).indexOf(model.MODEL_NAME)) {
        return state;
    }

    // const DEFAULT_STATE = {
    //     [model.MODEL_NAME]: model.create()
    // };
    // state = state || DEFAULT_STATE;

    switch (action.type) {

        case model.TYPE_REQUEST:
            return reduceRequestModel(state, action);
        case model.TYPE_FROM_SERVER:
            return reduceGetModel(state, action);
        case model.TYPE_CLEAR:
            return reduceClearModel(state, action);

        default:
            return state;
    }
};

export const getDefaultState = (state, action) => {
    if (!action.payload) {
        return state;
    }
    const { model } = action.payload;
    if (!model) {
        return state;
    }

    const DEFAULT_STATE = {
        [model.MODEL_NAME]: model.create()
    };

    return DEFAULT_STATE;
};

const reduceRequestModel = (state, action) => {
    const { model } = action.payload;
    const stateModel = state[model.MODEL_NAME];

    return {
        ...state,
        ...model.reduceRequest(stateModel, action, state)
    };
};

const reduceGetModel = (state, action) => {
    const { model } = action.payload;
    const stateModel = state[model.MODEL_NAME];

    return {
        ...state,
        ...model.reduceGet(stateModel, action, state)
    };
};

const reduceClearModel = (state, action) => {
    const { model } = action.payload;
    const stateModel = state[model.MODEL_NAME];

    return {
        ...state,
        ...model.reduceClear(stateModel, action, state)
    };
};
