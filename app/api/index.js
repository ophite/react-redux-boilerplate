import config from '../config/apiConfig';
import ApiClientWeb from '../api/ApiClient';

const apiClient = () => {
    let client = new ApiClientWeb({ prefix: config.baseUrl });
    return client;
};

export {
    apiClient,
};
