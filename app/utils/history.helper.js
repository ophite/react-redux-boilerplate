import { history } from '../entry/history';
import { mandatory } from './valadation.helper';
import { isEmpty } from './helper';


// TODO ?
export const handlePush = ({ pathname, query, state }) => {
    const historyObject = {};

    if (pathname) {
        historyObject.pathname = pathname;
    }
    if (query) {
        historyObject.query = query;
    }
    if (state) {
        historyObject.state = state;
    }

    if (isEmpty(historyObject)) {
        mandatory('handlePush');
    }

    history.push(historyObject);
};

export const handleReplace = ({ pathname, query, state }) => {
    const historyObject = {};

    if (pathname) {
        historyObject.pathname = pathname;
    }
    if (query) {
        historyObject.query = query;
    }
    if (state) {
        historyObject.state = state;
    }

    if (isEmpty(historyObject)) {
        mandatory('handleReplace');
    }

    appHistory.replace(historyObject);
};

export const handleBack = () => {
    appHistory.goBack();
};

// TODO
