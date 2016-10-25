import { isEmpty } from '../utils/helper';
import { apiClient as ApiClientWrapper } from '../api/index';

class model {

    constructor() {
    }

    static apiGet() {
        throw 'Not implemented method (apiGet)';
    }

    static apiClient() {
        return ApiClientWrapper();
    }

    static create() {
        return {
            isLoading: false,
        };
    }

    static toClient() {
        return {};
    }

    static toServer() {
        return {};
    }

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
    }

    static combineModel(params) {
        return {
            ...params,
        };
    }

    static reduceRequest(stateModel, action, state) {
        const { model } = action.payload;
        return {
            [model.MODEL_NAME]: {
                ...stateModel,
                isLoading: true,
            },
        };
    }

    static reduceGet(stateModel, action, state) {
        const { model, modelClient } = action.payload;
        return {
            [model.MODEL_NAME]: {
                ...modelClient,
                isLoading: false,
            },
        };
    }

    static reduceClear(stateModel, action, state) {
        const { model } = action.payload;
        return {
            [model.MODEL_NAME]: {
                ...model.create(),
            },
        };
    }
}

export default model;
