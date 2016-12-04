import { apiClient } from '../api';
import { fail } from './common.actions';
import { METHOD } from '../api/constants';


export const modelGet = (model) => {
    return modelActionCall(model)
};

export const modelPost = (model) => {
    return modelActionCall(model, METHOD.POST)
};

export const modelActionCall = (model, requestMethodName = METHOD.GET) => {
    const api = apiClient();
    const clientApiMethod = requestMethodName === METHOD.GET ? api.get : api.post;
    const modelApiMethod = requestMethodName === METHOD.GET ? model.apiGet : model.apiPost;

    return model.actionApiCall(
        clientApiMethod.bind(api),
        modelApiMethod.bind(model),
        model,
        fail
    );
};
