import * as commonAction from './common.actions';

export const apiGet = (isMobile,
                       callbackErrors,
                       model,
                       params = {},
                       success,
                       conditionalSuccess) => {
    const modelServer = model.toServer(params);
    return (dispatch) => {
        dispatch(commonAction.request(model.TYPE_REQUEST, { model }));

        return model
            .apiGet(modelServer, isMobile)
            .then((data) => {
                if (conditionalSuccess) {
                    conditionalSuccess(dispatch, data);
                } else {
                    const modelClient = model.toClient(data);
                    dispatchModel(dispatch, modelClient, model);
                    if (success) {
                        success(modelClient, dispatch);
                    }
                }
            })
            .catch(commonAction.fail(dispatch, callbackErrors));
    };
};

export const dispatchModel = (dispatch, modelClient, model) => {
    return dispatch({
        type: model.TYPE_FROM_SERVER,
        payload: model.combineModel({ modelClient, model }),
    });
};
