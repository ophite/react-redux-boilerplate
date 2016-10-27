import * as commonAction from './common.actions';

export const apiGet = (isMobile,
                       callbackErrors,
                       model,
                       params = {},
                       success,
                       conditionalSuccess) => {
    const modelServer = model.toServer(params);
    return (dispatch) => {
        dispatch(model.dispatchRequest({ model }));

        return model
            .apiGet(modelServer, isMobile)
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
            .catch(commonAction.fail(dispatch, callbackErrors));
    };
};


export const apiClear = (model) => {
    return (dispatch) => {
        dispatch(model.dispatchClear({ model }));
    }
};
