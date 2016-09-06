import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { Router } from 'react-router';

import routes from './config/appRoutes.jsx';
import configureStore from './store/root.store';
import appHistory from './config/appHistory';
// import { syncHistoryWithStore } from 'react-router-redux';

const initialState = {};
const store = configureStore(initialState);
// const rrsHistory = syncHistoryWithStore(appHistory, store);

ReactDOM.render(
    <Provider store={store}>
        <Router children={routes} history={appHistory} />
    </Provider>,

    document.getElementById('react-view')
);

