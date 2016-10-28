import React from 'react';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux'
import { Router } from 'react-router';

import configureStore from '../store/root.store';
import routes from './routes.jsx';
import appHistory from '../config/appHistory'

const initialState = {};
const store = configureStore(initialState);
const rrsHistory = syncHistoryWithStore(appHistory, store);


const Root = () => {
    return (
        <Provider store={store}>
            <Router children={routes} history={rrsHistory}/>
        </Provider>
    );
};

export default Root;
