import { apiClient } from '../api';
import { fail } from './common.actions';

export const modelGet = (model) => {
    const api = apiClient();
    return model.actionGet(api.get.bind(api), model, fail);
};

export const modelActionCall = (model, requestMethodName = 'GET', actionName) => {
    const api = apiClient();
    const requestMethod = requestMethodName === 'GET' ? api.get.bind(api) : api.post.bind(api);
    return model[actionName](requestMethod, model, fail);
};
