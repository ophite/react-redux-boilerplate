import * as commonAction from './common.actions';

export const apiGet = (model,
                       params = {},
                       success,
                       conditionalSuccess) => {
    const modelServer = model.toServer(params);
    return (dispatch) => {
        dispatch(model.dispatchRequest({ model }));

        return model
            .apiGet(modelServer)
            .then((data) => {

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
