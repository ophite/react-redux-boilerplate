import axios from 'axios';
import queryString from 'query-string';

class ApiClient {

    constructor({ prefix }) {
        this.prefix = prefix;
        // this.authToken = authMethod;
    }

    get(requestUrl, payload = {}, params = {}, auth = null) {
        return this.request({
            url: requestUrl,
            method: 'get',
            body: payload,
            params,
            auth,
        });
    }

    put(requestUrl, payload = {}, auth = null) {
        return this.request({
            url: requestUrl,
            method: 'put',
            body: payload,
            auth,
        });
    }

    post(requestUrl, payload = {}, auth = null) {
        return this.request({
            url: requestUrl,
            method: 'post',
            body: payload,
            auth,
        });
    }

    delete(requestUrl, auth = null) {
        return this.request({
            url: requestUrl,
            method: 'delete',
            auth,
        });
    }

    request({ url, method, params = {}, body, auth = null }) {
        const addAuthorization = (config, auth) => {
            if (!auth) {
                return;
            }

            const token = auth.email + ':' + auth.password;
            config.headers.Authorization = 'Basic ' + btoa(token);
        };

        const config = {
            method,
            baseURL: `${this.prefix}`,
            // withCredentials: true,
            // auth: {
            //     username: username,
            //     password: password
            // },
            url: params && Object.keys(params).length ? `${url}?${queryString.stringify(params)}` : `${url}`,
            headers: {
                'Content-Type': 'application/json',
            },
        };

        addAuthorization(config, auth);

        const isPayloadMethod = !~['get', 'head', 'delete'].indexOf(method);
        // Append 'payload' for data methods
        if (isPayloadMethod) {
            delete body.authParams;
            delete body.urlParams;
            config.data = body;
        }

        return axios(config)
            .then(({ data }) => {
                return Promise.resolve(data);
            })
            .catch((error) => {
                return Promise.reject(error);
            });
    }
}

export default ApiClient;
