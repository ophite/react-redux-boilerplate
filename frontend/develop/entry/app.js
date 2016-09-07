'use strict';

// import '../node_modules/babel-core/polyfill';

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {syncHistoryWithStore} from 'react-router-redux';

import Root from './Root.jsx';
import appHistory from '../config/appHistory';
import configureStore from '../store/root.store';


const initialState = {};
const store = configureStore(initialState);
const history = syncHistoryWithStore(appHistory, store);
const rootView = <Root store={store} history={history}/>;
ReactDOM.render(rootView, document.getElementById('react-view'));
