'use strict';

import React, {Component, PropTypes} from 'react';
import {Router} from 'react-router';
import {Provider} from 'react-redux';

import Routes from './Routes.jsx';


class Root extends Component {

	render() {
		const { store, history } = this.props;
		return (
			<Provider store={store}>
				<Router children={Routes} history={history}/>
			</Provider>
		);
	}
}

Root.propTypes = {
	store: PropTypes.object,
	routes: PropTypes.object,
	history: PropTypes.object
};

export default Root;
