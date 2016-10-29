import * as commonAction from './common.actions';

export const apiGet = (model,
                       params = {},
                       success,
                       conditionalSuccess) => {

    return (dispatch) => {
        dispatch(model.dispatchRequest({ model }));
        return model
            .apiGet(params)
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
            .catch(commonAction.fail(dispatch));
    };
};

export const apiPost = (model,
                       params = {},
                       success,
                       conditionalSuccess) => {

    return (dispatch) => {
        dispatch(model.dispatchRequest({ model }));
        return model
            .apiPost(params)
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
            .catch(commonAction.fail(dispatch));
    };
};

export const apiClear = (model) => {
    return (dispatch) => {
        dispatch(model.dispatchClear({ model }));
    }
};
