import { isEmpty } from '../utils/helper';
import { apiClient as ApiClientWrapper } from '../api/index';

class model {

    constructor() {
    };

    static apiGet() {
        throw 'Not implemented method (apiGet)';
    };

    static apiClient() {
        return ApiClientWrapper();
    };

    static create() {
        return {
            isLoading: false
        };
    };

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
    };

    static combineModel(params) {
        return {
            ...params
        };
    };
    debugger

    static reduceRequest(state, action) {
        const { model } = action.payload;
        return {
            [model.MODEL_NAME]: {
                ...state,
                isLoading: true
            }
        };
    };

    static reduceGet(state, action) {
        const { model, modelClient } = action.payload;
        return {
            [model.MODEL_NAME]: {
                ...modelClient,
                isLoading: false
            }
        };
    };

    static reduceClear(state, action) {
        const { model } = action.payload;
        return {
            [model.MODEL_NAME]: {
                ...model.create()
            }
        };
    };
}

export default model;
