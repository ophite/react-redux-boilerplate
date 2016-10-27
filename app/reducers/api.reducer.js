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

    const reduceMethod = model.getReduceMethod(model, action.type);
    if (reduceMethod) {
        return model.reduce(state, action, reduceMethod);
    }

    // here can be added custom reducers
    switch (action.type) {
        default:
            return state;
    }
};
